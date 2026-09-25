/* ============================================================
   THE WEB OF MATHEMATICS — extras.js
   The depth layer that sits on top of every field panel:

   1. Topic drawers. Every topic card in the side panel gets a
      "deeper" drawer (the idea · a worked example · why it
      matters · the story · people), fed by TOPIC_DETAIL in
      topics-data.js. Guides that replace the raw topic list get
      it appended back at the end, so each field lists its map
      topics. Clicking a topic node on the map (crack.js) scrolls
      to its card and opens the drawer.
   2. Bridges and controversies. The gold bridges and red ⚡ edges
      open a full story: what flows across, every field-level
      bridge they carry, who built them, and (for controversies)
      both sides and where the argument stands today.
   ============================================================ */
(function () {
"use strict";

const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
const body = () => document.getElementById("panel-body");
// data files declare top-level consts, which are globals but not window properties
const DETAIL = () => (typeof TOPIC_DETAIL !== "undefined" ? TOPIC_DETAIL : null);
const PPL = () => (typeof PEOPLE !== "undefined" ? PEOPLE : []);

const CSS = `
  #panel .tp-more{font:500 .6rem "IBM Plex Mono",monospace;color:var(--gold);background:none;border:1px solid rgba(245,196,81,.4);
    border-radius:999px;padding:.22rem .55rem;margin-top:.35rem;cursor:pointer;letter-spacing:.04em}
  #panel .tp-more:hover{background:rgba(245,196,81,.08)}
  #panel .topic.tp-open .tp-more{background:rgba(245,196,81,.14);color:#fff}
  #panel .tp-drawer{display:none;margin:.55rem 0 .2rem;padding:.6rem .7rem;border-left:2px solid var(--gold);
    background:rgba(245,196,81,.045);border-radius:0 8px 8px 0}
  #panel .topic.tp-open .tp-drawer{display:block;animation:tpIn .25s ease}
  @keyframes tpIn{from{opacity:0;transform:translateY(-3px)}to{opacity:1;transform:none}}
  #panel .tp-drawer h4,#panel .ed-sec h4{font:600 .58rem "IBM Plex Mono",monospace;letter-spacing:.12em;text-transform:uppercase;
    color:#9d96b8;margin:.55rem 0 .15rem}
  #panel .tp-drawer h4:first-child{margin-top:0}
  #panel .tp-drawer p{font-size:.82rem;line-height:1.6;color:#ddd7ef;margin:0}
  #panel .tp-drawer p.tp-ex{font-size:.8rem;color:#cfe9dc;background:rgba(0,0,0,.2);border-radius:8px;padding:.45rem .55rem;margin-top:.1rem}
  #panel .tp-src{display:inline-block;margin-top:.55rem;font:500 .64rem "IBM Plex Mono",monospace;color:#7fe3d6;text-decoration:none;
    border-bottom:1px dotted rgba(127,227,214,.5)}
  #panel .tp-src:hover{color:#fff}
  #panel .tp-people{display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.5rem}
  #panel .tp-person{font:500 .6rem "IBM Plex Mono",monospace;color:#d9d3ee;background:rgba(255,255,255,.04);
    border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:.25rem .55rem;cursor:pointer}
  #panel .tp-person:hover{border-color:var(--gold);color:#fff}
  #panel .tp-list-head{display:flex;justify-content:space-between;align-items:baseline;gap:.5rem}
  #panel .tp-all{font:500 .6rem "IBM Plex Mono",monospace;color:#9d96b8;background:none;border:none;cursor:pointer;text-decoration:underline}

  #panel .ed-flow{display:grid;grid-template-columns:1fr auto 1fr;gap:.45rem;align-items:center;margin:.7rem 0}
  #panel .ed-end{border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:.5rem .55rem;text-align:center;cursor:pointer;
    font:500 .66rem/1.35 "IBM Plex Mono",monospace;color:#e8e2f8;background:rgba(255,255,255,.03)}
  #panel .ed-end:hover{border-color:var(--gold)}
  #panel .ed-end small{display:block;color:#9d96b8;font-size:.56rem;margin-top:.2rem}
  #panel .ed-arrow{font:600 .9rem "IBM Plex Mono",monospace;color:var(--gold)}
  #panel .ed-arrow.hot{color:#ff8f7a}
  #panel .ed-sec{margin-bottom:.6rem}
  #panel .ed-sec p{font-size:.84rem;line-height:1.6;color:#ddd7ef;margin:0 0 .4rem}
  #panel .ed-sides{display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin:.4rem 0}
  #panel .ed-side{border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:.55rem .6rem}
  #panel .ed-side b{display:block;font:600 .62rem "IBM Plex Mono",monospace;letter-spacing:.06em;margin-bottom:.3rem}
  #panel .ed-side p{font-size:.78rem;line-height:1.5;margin:0;color:#d8d2ea}
  #panel .ed-side.a b{color:var(--gold)} #panel .ed-side.b b{color:#7fe3d6}
  #panel .ed-verdict{border:1px dashed rgba(255,143,122,.5);border-radius:9px;padding:.55rem .65rem;font-size:.8rem;line-height:1.55;color:#f1dcd6;margin:.5rem 0}
  #panel .ed-vote{display:flex;gap:.4rem;margin:.4rem 0}
  #panel .ed-vote button{flex:1}
  #panel .ed-vote button.on{background:rgba(245,196,81,.16);color:#fff}
  #panel .ed-tally{font:500 .64rem "IBM Plex Mono",monospace;color:#9d96b8}
  @media (max-width:520px){#panel .ed-sides{grid-template-columns:1fr}}
`;
function ensureCSS() {
  if (window.GuideKit && GuideKit.ensureStyles) GuideKit.ensureStyles();
  else if (window.__ensureLearningBaseStyles) window.__ensureLearningBaseStyles();
  if (!document.getElementById("extras-css")) {
    const st = document.createElement("style"); st.id = "extras-css"; st.textContent = CSS; document.head.appendChild(st);
  }
}

/* ------------------------------------------------------------
   1. TOPIC DRAWERS
   ------------------------------------------------------------ */
const MARK = { found:"🏛", fire:"🔥", work:"⚙️", obs:"🪦", rev:"🧟" };

// People on the map whose surname appears in a topic's "who" line
function peopleIn(who) {
  if (!who) return [];
  const out = [];
  for (const p of PPL()) {
    const sur = p.name.split(" ").pop();
    if (sur.length < 4) continue;
    if (new RegExp("(^|[^A-Za-zÀ-ÿ])" + sur.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^A-Za-zÀ-ÿ])").test(who)) out.push(p);
  }
  return out;
}
const para = s => esc(s).replace(/\n\n+/g, "</p><p>");

function drawerHTML(f, t) {
  const x = DETAIL() && DETAIL()[f.id + "|" + t.n];
  if (!x) return "";
  const ppl = peopleIn(t.who);
  return `<div class="tp-drawer">
    <h4>The idea</h4><p>${para(x.i)}</p>
    ${x.ex ? `<h4>A worked example</h4><p class="tp-ex">${para(x.ex)}</p>` : ""}
    ${x.n ? `<h4>Why it matters</h4><p>${para(x.n)}</p>` : ""}
    ${x.s ? `<h4>The story</h4><p>${para(x.s)}</p>` : ""}
    ${x.src ? `<a class="tp-src" href="${esc(x.src[1])}" target="_blank" rel="noopener">↗ ${esc(x.src[0])}</a>` : ""}
    ${ppl.length ? `<div class="tp-people">${ppl.map(p => `<button class="tp-person" data-pid="${p.id}">◉ ${esc(p.name)}</button>`).join("")}</div>` : ""}
  </div>`;
}

function decorate(f) {
  const b = body();
  if (!b || !f || !f.topics) return;
  const cards = b.querySelectorAll(".topic");
  cards.forEach((c, i) => {
    if (c.dataset.tp) return;
    const t = f.topics[i];
    if (!t) return;
    const html = drawerHTML(f, t);
    c.dataset.tp = "1";
    if (!html) return;
    const btn = document.createElement("button");
    btn.className = "tp-more"; btn.type = "button"; btn.textContent = "deeper ▾";
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", ev => { ev.stopPropagation(); toggle(c); });
    c.appendChild(btn);
    c.insertAdjacentHTML("beforeend", html);
    c.querySelectorAll(".tp-person").forEach(p =>
      p.addEventListener("click", ev => { ev.stopPropagation(); if (window.openPioneer) openPioneer(p.dataset.pid); }));
  });
}
function toggle(c, force) {
  const on = force === undefined ? !c.classList.contains("tp-open") : force;
  c.classList.toggle("tp-open", on);
  const btn = c.querySelector(".tp-more");
  if (btn) { btn.textContent = on ? "less ▴" : "deeper ▾"; btn.setAttribute("aria-expanded", String(on)); }
}
// crack.js calls this when a topic node on the map is clicked
window.WOC_TOPIC_OPEN = function (card) {
  document.querySelectorAll("#panel-body .topic.tp-open").forEach(c => { if (c !== card) toggle(c, false); });
  toggle(card, true);
};

// Guides that removed the raw topic list get it back, at the end
function ensureTopicList(f) {
  const b = body();
  if (!b || !f || !f.topics || !f.topics.length) return;
  if (b.querySelector(".topic")) return;
  const host = b.querySelector(".it-module") || b;
  const wrap = document.createElement("div");
  wrap.className = "tp-appended";
  wrap.innerHTML = `<div class="tp-list-head"><h3 class="it-section-title">The ${f.topics.length} topics on the map</h3>
      <button class="tp-all" type="button">open all</button></div>
    <div class="gk-topics">${f.topics.map(t => `<div class="topic${t.y > S.year ? " unborn" : ""}">
      <h3>${MARK[t.s] || ""} ${esc(t.n)}</h3><div class="tmeta">${esc(t.who)} · ${fmtY(t.y)}</div><p>${esc(t.d)}</p></div>`).join("")}</div>`;
  host.appendChild(wrap);
}
function addOpenAll() {
  const b = body();
  if (!b) return;
  const heads = [...b.querySelectorAll(".it-section-title")].filter(h => /topics on the map/.test(h.textContent));
  for (const h of heads) {
    if (h.parentElement.classList.contains("tp-list-head")) continue;
    const row = document.createElement("div"); row.className = "tp-list-head";
    h.replaceWith(row); row.appendChild(h);
    const btn = document.createElement("button"); btn.className = "tp-all"; btn.type = "button"; btn.textContent = "open all";
    row.appendChild(btn);
  }
  b.querySelectorAll(".tp-all").forEach(btn => {
    if (btn.dataset.wired) return; btn.dataset.wired = "1";
    btn.addEventListener("click", () => {
      const cards = [...b.querySelectorAll(".topic")].filter(c => c.querySelector(".tp-drawer"));
      const open = !cards.every(c => c.classList.contains("tp-open"));
      cards.forEach(c => toggle(c, open));
      btn.textContent = open ? "close all" : "open all";
    });
  });
}

/* ------------------------------------------------------------
   Hook into app.js: openField is a global function declaration,
   so every caller (map, crack.js, pioneer panel, search) goes
   through window.openField and picks up this wrapper.
   ------------------------------------------------------------ */
if (typeof window.openField === "function") {
  const orig = window.openField;
  window.openField = function (f, d) {
    const r = orig.apply(this, arguments);
    ensureCSS();
    try {
      ensureTopicList(f);
      decorate(f);
      addOpenAll();
    } catch (e) { console.error("extras", e); }
    return r;
  };
}

/* ------------------------------------------------------------
   2. BRIDGES & CONTROVERSIES
   ------------------------------------------------------------ */
const SEP = s => "https://plato.stanford.edu/entries/" + s + "/";
const EDGE_DETAIL = {
// ---------------- gold bridges ----------------
"Open sets (Hausdorff 1914) → schemes (Grothendieck 1958)": {
  flows: ["Sets, categories, functors", "Spaces: topological and algebraic"],
  story: "Foundations gave geometry its modern language three times over. Hausdorff (1914) defined a topological space as a set with a family of 'open' subsets, turning nearness into set theory. Eilenberg and Mac Lane (1945) invented categories to say precisely what 'natural' means in algebraic topology, where homology is a functor. And Grothendieck (1958–70) rebuilt algebraic geometry on schemes, sheaves and topoi — geometry done entirely in the language of categories.",
  today: "Topos theory, higher categories and condensed mathematics (Clausen and Scholze, from 2019) continue the traffic: new foundations built to serve geometry.",
  people: ["grothendieck"] },
"Boole 1847: logic becomes an algebra": {
  flows: ["Propositional logic", "Boolean algebras and lattices"],
  story: "Boole showed that logical reasoning obeys algebraic laws — x·x = x, x + (1 − x) = 1 — so arguments can be calculated. In the 1920s Lindenbaum and Tarski made it exact: formulas taken up to logical equivalence form a Boolean algebra, and classical propositional logic is the study of those algebras. Dedekind's and Birkhoff's lattices generalised the picture, and Lawvere (1963) turned whole algebraic theories into categories.",
  today: "Every digital circuit is a Boolean algebra (Shannon, 1937). Heyting algebras do the same job for intuitionistic logic, and lattices of abstract values run modern program analysis.",
  people: ["boole", "birkhoff"] },
"Hilbert space 1906: linear algebra goes infinite": {
  flows: ["Linear algebra and representations", "Functional and harmonic analysis"],
  story: "Studying integral equations (1904–10), Hilbert treated functions as vectors with infinitely many coordinates and found that the spectral theorem for symmetric matrices survives. Von Neumann axiomatised Hilbert space in 1929 to give quantum mechanics its mathematics. Meanwhile Peter and Weyl (1927) showed that Fourier series are the representation theory of the circle group, so harmonic analysis became the linear algebra of symmetry.",
  today: "Quantum mechanics, signal processing and kernel methods in machine learning all live in Hilbert spaces; the Langlands programme treats automorphic forms as representations.",
  people: ["hilbert"] },
"Geodesics (Euler 1744) → Ricci flow proves Poincaré (2003)": {
  flows: ["Calculus, variations, PDE", "Shape: curves, surfaces, manifolds"],
  story: "Analysis has been geometry's strongest tool since Euler and Lagrange found geodesics as the critical points of length. Riemann (1857) saw algebraic curves as complex-analytic surfaces; Whitney (1936) made manifolds rigorous with calculus on charts. The climax came when Richard Hamilton's Ricci flow — a heat equation for the metric itself — was pushed through its singularities by Grigori Perelman (2002–03), proving the Poincaré and geometrization conjectures.",
  today: "Geometric analysis — minimal surfaces, harmonic maps, gauge theory, mean curvature flow — is one of the busiest meeting grounds in mathematics.",
  people: ["euler", "riemann", "perelman"] },
"Klein 1872: a geometry is its group of symmetries": {
  flows: ["Groups, rings, Lie theory", "Geometry and topology"],
  story: "Klein's Erlangen programme classified geometries by their symmetry groups: Euclidean geometry studies what rigid motions preserve, projective geometry what projections preserve. The traffic never stopped. Lie groups became the symmetries of differential geometry; Hilbert's Nullstellensatz turned polynomial ideals into shapes; and Noether persuaded topologists that Poincaré's Betti numbers are shadows of homology groups.",
  today: "Algebraic topology, algebraic geometry and geometric group theory are whole continents built on this bridge.",
  people: ["noether", "hilbert", "grothendieck"] },
"Riemann 1859: the zeta function hears the primes": {
  flows: ["Complex analysis", "The distribution of primes"],
  story: "Euler (1737) saw that Σ 1/nˢ = Π (1 − p⁻ˢ)⁻¹, so the primes are encoded in an analytic function. Riemann (1859) extended ζ(s) to the whole complex plane and wrote an explicit formula expressing the count of primes as a sum over its zeros. The prime number theorem (1896) followed from showing that ζ has no zeros on the line Re s = 1.",
  today: "The Riemann Hypothesis — all non-trivial zeros lie on Re s = ½ — is a Millennium Prize Problem. It would pin the error in the prime number theorem down to about √x log x.",
  people: ["euler", "riemann"],
  src: [["Riemann (1859), in D. R. Wilkins's English translation", "https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Zeta/"]] },
"Dedekind 1871: ideals rescue unique factorisation": {
  flows: ["Rings, ideals, Galois groups", "Algebraic number theory"],
  story: "Unique factorisation fails in rings such as ℤ[√−5], where 6 = 2·3 = (1+√−5)(1−√−5). Kummer (1847) invented 'ideal numbers' to repair it for cyclotomic integers; Dedekind (1871) turned them into ideals and proved that every ideal factors uniquely into prime ideals. Hilbert, Takagi and Artin then used Galois groups to describe exactly how primes split in number fields.",
  today: "Class field theory and the Langlands programme continue this bridge; Dedekind's ideals became a basic notion of all of algebra.",
  people: ["noether", "gauss"] },
"Elliptic curves: Eichler–Shimura (1954) → Wiles (1994)": {
  flows: ["Algebraic geometry", "Modular forms and Diophantine equations"],
  story: "An elliptic curve y² = x³ + ax + b is both geometry — over ℂ it is a torus — and arithmetic, since its rational points form a group. Eichler and Shimura showed that modular forms produce elliptic curves; Taniyama and Shimura conjectured that every rational elliptic curve arises this way. Frey, Serre and Ribet showed that a counterexample to Fermat's Last Theorem would give a curve that could not be modular. Wiles, with Taylor, proved enough of the modularity conjecture in 1994 to settle Fermat.",
  today: "Full modularity for rational elliptic curves was completed by Breuil, Conrad, Diamond and Taylor (2001). The Birch and Swinnerton-Dyer conjecture on the rank of elliptic curves is a Millennium Prize Problem.",
  people: ["fermat"] },
"Hardy–Ramanujan 1918: counting partitions exactly": {
  flows: ["Partitions and q-series", "Analytic number theory and modular forms"],
  story: "The number p(n) of ways to write n as a sum of positive integers grows fast: p(100) = 190,569,292. Hardy and Ramanujan used the modular transformation of Euler's generating function to derive an asymptotic series so accurate that a few terms give p(200) exactly; Rademacher (1937) turned it into an exact convergent formula. Ramanujan's congruences, such as p(5n+4) ≡ 0 (mod 5), revealed hidden modular structure.",
  today: "Their circle method is a basic tool of analytic number theory (Vinogradov's three-primes theorem, Waring's problem), and modular forms keep producing new partition congruences.",
  people: ["ramanujan", "euler"] },
"Erdős 1947: prove it exists by choosing at random": {
  flows: ["Probability spaces", "Ramsey and extremal combinatorics"],
  story: "To show that some 2-colouring of the edges of the complete graph on n vertices has no one-coloured k-clique, Erdős didn't build one: he coloured at random and showed that the expected number of one-coloured cliques is less than one when n < 2^{k/2}. So some colouring has none. The probabilistic method — proving existence by showing a random object works with positive probability — became one of combinatorics' main tools.",
  today: "Random graphs (Erdős and Rényi, 1959), the Lovász local lemma and random constructions in coding theory descend from it. Nobody has yet written down explicit colourings as good as Erdős's random ones.",
  people: ["erdos"] },
"Kirchhoff 1847: a graph is a matrix": {
  flows: ["Linear algebra", "Graph theory"],
  story: "Studying electrical networks, Kirchhoff proved the matrix-tree theorem (1847): the number of spanning trees of a graph equals any cofactor of its Laplacian matrix. The eigenvalues of adjacency and Laplacian matrices turned out to reveal connectivity, expansion and colourings — the subject of spectral graph theory.",
  today: "Google's PageRank is an eigenvector. Expander graphs, spectral clustering and Marcus, Spielman and Srivastava's 2013 solution of the Kadison–Singer problem all run on this bridge.",
  people: [] },
"Borel 1909 → Kolmogorov 1933: probability becomes measure theory": {
  flows: ["Measure theory and functional analysis", "Probability"],
  story: "Probability long lacked foundations; Hilbert's sixth problem (1900) asked for them. Borel (1909) used measure theory to prove that almost every real number is normal — the first strong law of large numbers. Kolmogorov (1933) completed the move: a probability space is a measure space of total mass 1, a random variable is a measurable function, and expectation is a Lebesgue integral. Later bridges ran the other way: Kakutani (1944) showed Brownian motion solves the Dirichlet problem.",
  today: "Stochastic analysis — Itô calculus, stochastic PDEs, Hairer's regularity structures (Fields Medal 2014) — is a thriving meeting ground of the two continents.",
  people: ["kolmogorov"] },
"Stone 1936: Boolean algebras are spaces": {
  flows: ["Boolean algebras (order)", "Compact totally disconnected spaces (topology)"],
  story: "Marshall Stone proved that every Boolean algebra is the algebra of clopen subsets of a compact, totally disconnected Hausdorff space — its Stone space, built from the algebra's ultrafilters. The correspondence is a duality: algebra homomorphisms go one way, continuous maps the other. 'One must always topologize,' Stone said.",
  today: "Stone duality inspired Gelfand duality (commutative C*-algebras and compact spaces), Grothendieck's Spec, and domain theory in computer science; model theorists use Stone spaces of types every day.",
  people: ["birkhoff"] },
"Dedekind cuts (1872) → infinitesimals made rigorous (1961)": {
  flows: ["Sets and logic", "The real numbers and calculus"],
  story: "Calculus was invented on the fly and justified later. In 1872 Dedekind and Cantor built the real numbers out of sets of rationals, turning completeness into a theorem and grounding analysis in set theory. Ninety years later logic returned the favour: Abraham Robinson used the compactness theorem to construct hyperreal numbers with genuine infinitesimals, vindicating Leibniz's dx.",
  today: "Constructive analysis (Bishop, 1967) and proof assistants such as Lean's mathlib, which builds ℝ from Cauchy sequences, carry on the work of making analysis exact.",
  people: ["cantor", "leibniz"] },
"Gödel 1931 → Matiyasevich 1970: arithmetic cannot be decided": {
  flows: ["Logic and computability", "Arithmetic and Diophantine equations"],
  story: "Gödel's incompleteness theorem is itself number theory: by coding formulas as integers he found a true statement about whole numbers that Peano arithmetic cannot prove. Turing's halting problem then showed that some questions have no algorithm at all, and Hilbert's tenth problem asked whether Diophantine equations are among them. Davis, Putnam, Julia Robinson and finally Matiyasevich (1970) answered yes: no algorithm decides whether a polynomial equation has integer solutions.",
  today: "Whether the same holds over the rational numbers is still open, a question tied to the arithmetic of elliptic curves. In 2024 two teams (Koymans and Pagano; Alpöge, Bhargava, Ho and Shnidman) announced proofs that it holds over the ring of integers of every number field.",
  people: ["godel", "turing", "hilbert"],
  src: [["Stanford Encyclopedia of Philosophy — Gödel's Incompleteness Theorems", SEP("goedel-incompleteness")]] },
"Cramér 1936 & Erdős–Kac 1940: primes behave like coin flips": {
  flows: ["Probability and limit theorems", "Primes"],
  story: "The primes are completely determined, yet in bulk they look random. Cramér's model treats each n as prime with probability 1/log n; Erdős and Kac proved that the number of prime factors of n obeys the central limit theorem. In 1972 Montgomery and Dyson noticed over tea at Princeton that the spacings of the Riemann zeta zeros match the eigenvalues of large random matrices.",
  today: "Probabilistic heuristics guide conjectures about twin primes and prime gaps; the Green–Tao theorem (2004) and Maynard's bounded gaps (2013) balance randomness against structure.",
  people: ["erdos"] },
"Euler 1736: Königsberg's bridges start graphs and topology": {
  flows: ["Graphs and counting", "Topology"],
  story: "Euler's Königsberg solution kept only which land masses the bridges joined — a graph — and his polyhedron formula V − E + F = 2 counted cells without measuring anything. Both grew into topology: the Euler characteristic of a surface, the four colour problem on the sphere, and Kuratowski's theorem that a graph is planar exactly when it contains no subdivision of K₅ or K₃,₃.",
  today: "Topological graph theory, the Robertson–Seymour graph minor theorem and topological data analysis, which computes the homology of point clouds, all live on this bridge.",
  people: ["euler"] },
"Buffon's needle 1777: π from falling sticks": {
  flows: ["Probability", "Geometry and integral geometry"],
  story: "Buffon asked for the chance that a needle dropped on a ruled floor crosses a line — and found π in the answer. Geometric probability grew into integral geometry: Crofton's formula measures a curve's length by counting how often random lines cross it. Much later it became stochastic geometry, the probabilistic study of random shapes.",
  today: "Monte Carlo estimates of π, random tessellations, and Crofton-type formulas in tomography and computer vision descend from it. Try it in the ⚛ Buffon's needle atom.",
  people: [] },
"Paris–Harrington 1977: a Ramsey truth beyond Peano arithmetic": {
  flows: ["Provability in arithmetic", "Ramsey theory"],
  story: "Gödel's unprovable sentences were artificial. Paris and Harrington found a natural combinatorial one — a mild strengthening of the finite Ramsey theorem — that is true but unprovable in Peano arithmetic, because the numbers it needs grow faster than any function PA can prove to be total. Goodstein's theorem (Kirby and Paris, 1982) and Harvey Friedman's finite forms of Kruskal's tree theorem followed.",
  today: "Reverse mathematics measures exactly which axioms combinatorial theorems need; the strength of Ramsey's theorem for pairs was a central puzzle there, with major progress in the 2010s.",
  people: ["godel"] },
"Martin-Löf 1966: randomness is incompressibility": {
  flows: ["Computability", "Probability"],
  story: "Why is 0110101110010… random but 0101010101… not, when both are equally likely? Probability alone can't say. Kolmogorov, Solomonoff and Chaitin measured a string's complexity by the length of its shortest program; Martin-Löf defined a random sequence as one that passes every effective statistical test. The two definitions agree: random means incompressible.",
  today: "Algorithmic randomness is an active part of computability theory. Chaitin's Ω — the probability that a random program halts — is random and encodes the halting problem.",
  people: ["kolmogorov", "turing"] },

// ---------------- controversies ----------------
"Kronecker vs Cantor, 1880s: is the actual infinite real?": {
  hot: true,
  flows: ["Kronecker: build from the integers", "Cantor: completed infinities"],
  story: "Cantor's set theory treated infinite collections as finished objects that can be compared, counted and ranked in size. Leopold Kronecker, the most powerful mathematician in Berlin, rejected this: mathematics should be built from the natural numbers by finite, constructive steps — 'God made the integers, all else is the work of man', as Heinrich Weber reported him saying. Kronecker opposed Cantor's work in print and in private, and Cantor, who never obtained a post in Berlin, suffered repeated breakdowns.",
  sideA: ["Kronecker's side", "An existence proof that constructs nothing tells us nothing. Numbers defined by infinite processes have no clear meaning, and mathematics built on them risks contradiction — a worry that looked prophetic when Russell's paradox appeared in 1901."],
  sideB: ["Cantor's side", "Infinite sets are as legitimate as finite ones if they are consistent, and their sizes are forced on us by one-to-one correspondence. The results — the uncountability of ℝ, transfinite ordinals — turned out to be indispensable to analysis and topology."],
  verdict: "Mainstream mathematics followed Cantor: ZFC, with the actual infinite, is the standard foundation, and Hilbert's 'paradise' became its motto. But Kronecker's constructive spirit lives on in intuitionism, constructive mathematics and proof assistants, where an existence proof often comes with an algorithm.",
  people: ["cantor", "hilbert"],
  src: [["Stanford Encyclopedia of Philosophy — The Early Development of Set Theory", SEP("settheory-early")]] },
"Brouwer vs Hilbert, 1920s: can we trust the excluded middle?": {
  hot: true,
  flows: ["Brouwer: intuitionism", "Hilbert: classical mathematics"],
  story: "L. E. J. Brouwer argued that mathematics is a mental construction, so a statement is true only when we have a proof of it. The law of excluded middle — every statement is true or false — then fails for infinite domains: we may not claim 'f has a zero' without a way to find it. Brouwer rebuilt analysis on these lines, with startling results: in his analysis every function on the real numbers is continuous. Hilbert answered that 'taking the principle of excluded middle from the mathematician would be the same as prohibiting the telescope to the astronomer or to the boxer the use of his fists', and in 1928 had Brouwer removed from the board of Mathematische Annalen.",
  sideA: ["Hilbert's side", "Classical logic is how mathematicians actually reason, and it works. Infinite objects can be justified by proving the whole system consistent by finite means — Hilbert's programme."],
  sideB: ["Brouwer's side", "A proof that something exists should show how to find it. Classical logic smuggles in claims about infinite totalities that no one can survey. Hermann Weyl briefly joined Brouwer, calling it a revolution."],
  verdict: "Classical mathematics won everyday practice: almost all mathematicians use excluded middle freely. But Gödel (1931) sank Hilbert's plan to prove consistency by finite means, and Brouwer's logic returned through computer science: intuitionistic logic is the logic of programs (Curry–Howard), and proof assistants such as Coq and Lean are built on constructive type theory, with classical axioms added on request.",
  people: ["hilbert", "godel"],
  src: [["Stanford Encyclopedia of Philosophy — Intuitionism in the Philosophy of Mathematics", SEP("intuitionism")],
        ["Stanford Encyclopedia of Philosophy — Hilbert's Program", SEP("hilbert-program")]] },
"The Axiom of Choice: Banach–Tarski doubles a ball": {
  hot: true,
  flows: ["The axiom of choice (sets)", "Volume and congruence (geometry)"],
  story: "In 1904 Zermelo proved that every set can be well-ordered, using a principle he made explicit: from any family of non-empty sets one may choose one element from each. Borel, Baire and Lebesgue objected that choosing infinitely often with no rule is not a construction. The axiom then produced monsters: Vitali's non-measurable set (1905), and in 1924 Banach and Tarski's theorem that a solid ball can be cut into five pieces and reassembled, by rotations and translations alone, into two balls each as big as the first.",
  sideA: ["For choice", "Without it basic facts fail: every vector space has a basis, every field has an algebraic closure, a countable union of countable sets is countable. Gödel (1938) proved it cannot introduce a contradiction that ZF alone would not already contain."],
  sideB: ["Against choice", "It asserts that objects exist which no one can define, and the paradoxes show how wild they are. Solovay (1970) built a model in which every set of reals is measurable, keeping a weaker 'dependent choice' that suffices for most analysis."],
  verdict: "Choice is part of standard ZFC and used without apology, and Cohen (1963) showed it is independent of ZF — a genuine choice of axiom. Banach–Tarski is now read as a theorem about non-measurable sets rather than a paradox about physics: its pieces have no volume, so nothing about volume is violated.",
  people: ["godel", "cantor"],
  src: [["Stanford Encyclopedia of Philosophy — The Axiom of Choice", SEP("axiom-choice")]] },
"Four colours, 1976: is a computer proof a proof?": {
  hot: true,
  flows: ["What counts as a proof (foundations)", "The four colour theorem (graphs)"],
  story: "In 1852 Francis Guthrie asked whether four colours always suffice to colour a map so that neighbouring countries differ. Kempe's 1879 proof stood for eleven years before Heawood found the flaw. In 1976 Kenneth Appel and Wolfgang Haken reduced the problem to 1,936 configurations and had a computer check them, using over a thousand hours of machine time. No human could check the cases by hand; the philosopher Thomas Tymoczko argued (1979) that this brought experiment into mathematics.",
  sideA: ["It is not (yet) a proof", "A proof should give understanding and be checkable by a person. Trusting hardware, compilers and code is an empirical judgement, not a logical one."],
  sideB: ["It is a proof", "A computer check is a very long calculation, and we trust calculations when we can check the program. Every step is logically valid; the only new thing is the length."],
  verdict: "The argument was largely settled by making the computer part more trustworthy. Robertson, Sanders, Seymour and Thomas gave a simpler computer proof in 1996, and in 2005 Georges Gonthier checked the entire theorem in the Coq proof assistant. Computer-assisted proofs are now accepted — the Kepler conjecture (Hales, 1998; formally verified 2014) — and proof assistants such as Lean are entering mainstream mathematics.",
  people: [],
  src: [["Georges Gonthier — Formal Proof: The Four-Color Theorem (Notices of the AMS, 2008)", "https://www.ams.org/notices/200811/tx081101382p.pdf"]] },
"Mochizuki's abc, 2012–: proof or gap?": {
  hot: true,
  flows: ["Inter-universal Teichmüller theory", "The abc conjecture"],
  story: "The abc conjecture (Masser and Oesterlé, 1985) says that if a + b = c for coprime whole numbers, then c is rarely much bigger than the product of the distinct primes dividing abc. It would imply a host of results in Diophantine equations. In August 2012 Shinichi Mochizuki of Kyoto posted four papers, some 500 pages, building 'inter-universal Teichmüller theory' and claiming a proof. Few experts could follow them. In 2018 Peter Scholze and Jakob Stix spent a week in Kyoto with Mochizuki and concluded that a key step, Corollary 3.12, has a serious gap.",
  sideA: ["Mochizuki's side", "The objection comes from oversimplifying the theory — identifying objects that must be kept distinct. The papers were refereed and published in Publications of the RIMS in 2021."],
  sideB: ["Scholze and Stix", "Once the notation is unwound, the inequality at the heart of Corollary 3.12 does not follow. The journal is run by Mochizuki's own institute, where he was chief editor, and few experts outside his circle accept the argument."],
  verdict: "Most of the number theory community does not regard the abc conjecture as proved, and it is generally listed as open. The episode sharpened an old question — what makes a proof accepted: publication, expert consensus, or machine verification? — and prompted calls to formalise the argument in a proof assistant.",
  people: [],
  src: [["Scholze & Stix — Why abc is still a conjecture (2018)", "https://www.math.uni-bonn.de/people/scholze/WhyABCisStillaConjecture.pdf"]] },
"Bayesians vs frequentists: what is a probability?": {
  hot: true,
  flows: ["Probability as long-run frequency", "Probability as degree of belief"],
  story: "Kolmogorov's axioms say how probabilities combine, not what they mean, and two answers have fought for a century. For frequentists — Venn, von Mises, Fisher, Neyman and Pearson — a probability is a long-run relative frequency in repeatable trials, so a hypothesis has no probability. For Bayesians — Laplace, then Ramsey, de Finetti, Jeffreys and Savage — a probability is a rational degree of belief, updated by Bayes' theorem as evidence arrives. Fisher attacked 'inverse probability' in 1922; Jeffreys defended it in 1939; de Finetti argued that coherent betting forces beliefs to obey the axioms.",
  sideA: ["Frequentist", "Priors are subjective, so two scientists can reach different conclusions from the same data. Methods should come with guaranteed error rates over repeated use, as confidence intervals and tests do."],
  sideB: ["Bayesian", "Every inference rests on assumptions; priors make them explicit. Bayes' theorem is the coherent way to update beliefs, and it answers the question scientists actually ask: how probable is my hypothesis, given the data?"],
  verdict: "Mathematically there is no conflict: both sides use the same axioms, and de Finetti's representation theorem links them. In practice statistics has become pragmatic. Bayesian methods boomed with Markov chain Monte Carlo after 1990, frequentist designs rule clinical trials, and machine learning mixes both. The philosophical question — what a probability is — is still open.",
  people: ["kolmogorov", "pascal"],
  src: [["Stanford Encyclopedia of Philosophy — Interpretations of Probability", SEP("probability-interpret")]] },
"Newton vs Leibniz, 1711: who invented calculus?": {
  hot: true,
  flows: ["Newton: fluxions (1665–66)", "Leibniz: differentials (1675; published 1684)"],
  story: "Newton developed his method of fluxions in 1665–66 but published it only in fragments, decades later. Leibniz found the calculus independently around 1675 and published first, in 1684, with a better notation. From 1699 Newton's supporters accused Leibniz of plagiarism, citing papers he had seen on a 1676 visit to London. In 1712 a Royal Society committee — the Society's president was Newton — found for Newton in the Commercium epistolicum; Newton drafted much of it himself.",
  sideA: ["Newton's side", "Newton had the calculus first, by nearly a decade, and Leibniz saw some of his work in 1676, including a copy of De Analysi."],
  sideB: ["Leibniz's side", "His notebooks show an independent discovery with a different idea at its centre (differentials, not velocities), and he published first. The Royal Society's verdict was Newton judging his own case."],
  verdict: "Historians agree the two invented the calculus independently: Newton first (1665–66), Leibniz first to publish (1684). The feud hurt British mathematics, which kept Newton's dot notation and geometric style for a century while the Continent — the Bernoullis, Euler, Lagrange — built analysis in Leibniz's d and ∫. Cambridge's Analytical Society (Babbage, Herschel and Peacock, 1812) finally brought 'the principles of pure D-ism' to England.",
  people: ["newton", "leibniz", "euler"],
  src: [["A. Rupert Hall — Philosophers at War: The Quarrel between Newton and Leibniz (Cambridge, 1980)", null]] }
};
window.EDGE_DETAIL = EDGE_DETAIL;

function tally(key) { try { return JSON.parse(localStorage.getItem("wom-vote-" + key) || "null"); } catch (e) { return null; } }
function saveVote(key, v) { try { localStorage.setItem("wom-vote-" + key, JSON.stringify(v)); } catch (e) {} }

// field-level links between two domains, oldest first
function linksBetween(a, b) {
  const dom = id => { const r = window.fieldById(id); return r ? r.d.id : null; };
  return LINKS.filter(l => { const x = dom(l.from), y = dom(l.to); return (x === a && y === b) || (x === b && y === a); })
    .sort((p, q) => p.y - q.y);
}
function srcHTML(list) {
  return (list || []).map(s => s[1]
    ? `<a class="it-source" href="${esc(s[1])}" target="_blank" rel="noopener"><small>SOURCE</small><strong>${esc(s[0])}</strong><span>${esc(s[1].replace(/^https?:\/\//, "").split("/")[0])}</span><i aria-hidden="true">↗</i></a>`
    : `<div class="it-source"><small>BOOK</small><strong>${esc(s[0])}</strong></div>`).join("");
}

window.openEdgeDetail = function (e, cls) {
  const x = EDGE_DETAIL[e.label];
  const A = DOMAINS.find(d => d.id === e.a), B = DOMAINS.find(d => d.id === e.b);
  const hot = cls !== "bridge";
  openPanel({
    kind: hot ? "Controversy ⚡" : "Gold bridge",
    title: e.label, meta: `${A.name} ↔ ${B.name} · ${fmtY(e.y)}`,
    blurb: x ? "" : (hot ? "A live dispute — the subject's best stories are its arguments."
                         : "A mediating concept: the idea that lets one continent's results flow into the other.")
  });
  ensureCSS();
  const b = body();
  const links = hot ? [] : linksBetween(e.a, e.b);
  const ppl = ((x && x.people) || []).map(id => PPL().find(p => p.id === id)).filter(Boolean);
  const sec = document.createElement("section");
  sec.className = "it-module";
  sec.innerHTML = `
    ${x ? `<div class="ed-flow">
      <div class="ed-end" data-dom="${A.id}">${esc(x.flows[0])}<small>${esc(A.name)}</small></div>
      <div class="ed-arrow${hot ? " hot" : ""}">${hot ? "⚡" : "⇄"}</div>
      <div class="ed-end" data-dom="${B.id}">${esc(x.flows[1])}<small>${esc(B.name)}</small></div>
    </div>
    <div class="ed-sec"><h4>The story</h4><p>${esc(x.story)}</p></div>` : ""}
    ${links.length ? `<div class="ed-sec"><h4>The ${links.length === 1 ? "bridge" : links.length + " bridges"} it carries</h4>
      <div class="mw-links">${links.map((l, i) => window.linkCard(l, null, i === 0)).join("")}</div></div>` : ""}
    ${x && x.sideA ? `<div class="ed-sec"><h4>Both sides</h4><div class="ed-sides">
        <div class="ed-side a"><b>${esc(x.sideA[0])}</b><p>${esc(x.sideA[1])}</p></div>
        <div class="ed-side b"><b>${esc(x.sideB[0])}</b><p>${esc(x.sideB[1])}</p></div></div>
      <div class="ed-verdict"><b>Where it stands.</b> ${esc(x.verdict)}</div>
      <h4>Your call</h4>
      <div class="ed-vote"><button class="gk-ghost" data-v="0">${esc(x.sideA[0])}</button><button class="gk-ghost" data-v="1">${esc(x.sideB[0])}</button></div>
      <div class="ed-tally"></div></div>` : ""}
    ${x && x.today ? `<div class="ed-sec"><h4>Today</h4><p>${esc(x.today)}</p></div>` : ""}
    ${ppl.length ? `<div class="ed-sec"><h4>People</h4><div class="tp-people">${ppl.map(p => `<button class="tp-person" data-pid="${p.id}">◉ ${esc(p.name)}</button>`).join("")}</div></div>` : ""}
    ${x && x.src && x.src.length ? `<h3 class="it-section-title">Read more</h3>${srcHTML(x.src)}` : ""}`;
  b.appendChild(sec);
  if (window.wireGoButtons) wireGoButtons(sec);
  sec.querySelectorAll(".tp-person").forEach(p => p.addEventListener("click", () => window.openPioneer && openPioneer(p.dataset.pid)));
  sec.querySelectorAll(".ed-end").forEach(n => n.addEventListener("click", () => {
    const d = DOMAINS.find(q => q.id === n.dataset.dom); if (d && window.zoomTo) zoomTo(d);
  }));
  if (x && x.sideA) {
    const out = sec.querySelector(".ed-tally");
    const show = v => { out.textContent = v === null ? "Pick a side. Your vote stays in this browser; change it any time."
      : `You sided with: ${[x.sideA[0], x.sideB[0]][v]}. The verdict box above is the current state of the evidence.`;
      sec.querySelectorAll(".ed-vote button").forEach(bt => bt.classList.toggle("on", +bt.dataset.v === v)); };
    show(tally(e.label));
    sec.querySelectorAll(".ed-vote button").forEach(bt => bt.addEventListener("click", () => { saveVote(e.label, +bt.dataset.v); show(+bt.dataset.v); }));
  }
};
})();
