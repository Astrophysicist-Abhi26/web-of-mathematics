// FOUNDATIONS — field guides for Logic, Set Theory, Category Theory, Model Theory,
// Computability and Type Theory. Each registers with GuideKit (guide-kit.js) and opens
// in the side panel when its field is clicked.
(function () {
"use strict";
const { register, canvas, rng, C } = GuideKit;
const SEP = s => "https://plato.stanford.edu/entries/" + s + "/";

/* ================================================================ LOGIC */
register("logic", {
  kicker: "THE GRAMMAR OF PROOF · ABOUT 25 MIN",
  hook: "What makes an argument valid — whatever it is about?",
  intro: "Logic studies the form of reasoning rather than its content. 'All A are B; x is an A; so x is a B' is valid whether A means 'men' or 'primes'. Aristotle catalogued such forms; Boole and Frege turned them into mathematics; Gödel proved what that mathematics can and cannot do. The lab lets you feel the most important subtlety in the language of proofs: the order of quantifiers.",
  timeline: [[-350, "Aristotle's syllogisms"], [1847, "Boole: logic as algebra"], [1879, "Frege: quantifiers"], [1929, "Gödel: completeness"], [1931, "Gödel: incompleteness"]],
  labs: [{
    kicker: "QUANTIFIERS · ∀∃ VS ∃∀", title: "Everyone loves someone ≠ someone is loved by everyone",
    intro: "A tiny world of four people. Click a square to say that the row person loves the column person. Then read which sentences are true — and why swapping ∀ and ∃ changes the meaning completely.",
    html: `<div class="gk-chips lg-pre"><button class="gk-chip" data-p="cycle">everyone loves the next person</button><button class="gk-chip" data-p="star">everyone loves Dee</button><button class="gk-chip" data-p="self">self-love only</button><button class="gk-chip" data-p="rand">random</button><button class="gk-chip" data-p="none">nobody</button></div>
      <div class="lg-grid" style="display:grid;grid-template-columns:4.5rem repeat(4,1fr);gap:3px;margin:.5rem 0;max-width:360px"></div>
      <div class="gk-out lg-out"></div>`,
    caveat: "∀x∃y R(x,y) lets the y depend on x; ∃y∀x R(x,y) demands one y that works for every x. Confusing the two is the most common logical error in mathematics — it is exactly the difference between continuity and uniform continuity.",
    init(root) {
      const P = ["Ann", "Bob", "Cy", "Dee"], R = [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1], [1, 0, 0, 0]];
      const grid = root.querySelector(".lg-grid"), out = root.querySelector(".lg-out");
      const presets = { cycle: (i, j) => j === (i + 1) % 4, star: (i, j) => j === 3, self: (i, j) => i === j, none: () => false };
      function draw() {
        grid.innerHTML = `<div></div>${P.map(p => `<div style="font:500 .6rem IBM Plex Mono;color:#9d96b8;text-align:center">→ ${p}</div>`).join("")}` +
          P.map((p, i) => `<div style="font:500 .64rem IBM Plex Mono;color:#d8d2ea;align-self:center">${p} loves</div>` +
            P.map((q, j) => `<div class="gk-cell" data-i="${i}" data-j="${j}" style="background:${R[i][j] ? "rgba(245,196,81,.55)" : "rgba(255,255,255,.05)"}">${R[i][j] ? "♥" : ""}</div>`).join("")).join("");
        grid.querySelectorAll(".gk-cell").forEach(c => c.addEventListener("click", () => { R[+c.dataset.i][+c.dataset.j] ^= 1; draw(); }));
        const all = f => [0, 1, 2, 3].every(f), some = f => [0, 1, 2, 3].some(f);
        const rows = [
          ["∀x ∃y R(x,y)", "everyone loves someone", all(x => some(y => R[x][y])), (() => { const bad = [0, 1, 2, 3].find(x => !some(y => R[x][y])); return bad === undefined ? "each person has a beloved" : `${P[bad]} loves nobody`; })()],
          ["∃y ∀x R(x,y)", "someone is loved by everyone", some(y => all(x => R[x][y])), (() => { const w = [0, 1, 2, 3].find(y => all(x => R[x][y])); return w === undefined ? "no single person works for all" : `${P[w]} is loved by all`; })()],
          ["∀y ∃x R(x,y)", "everyone is loved by someone", all(y => some(x => R[x][y])), ""],
          ["∃x ∀y R(x,y)", "someone loves everyone", some(x => all(y => R[x][y])), ""],
          ["∀x R(x,x)", "everyone loves themselves", all(x => R[x][x]), ""],
          ["∀x∀y (R(x,y) → R(y,x))", "love is always returned", all(x => all(y => !R[x][y] || R[y][x])), ""]
        ];
        out.innerHTML = rows.map(([f, en, v, why]) => `${v ? '<span class="t">TRUE </span>' : '<span class="r">FALSE</span>'}  ${f.padEnd(24)} <span class="d">${en}${why ? " — " + why : ""}</span>`).join("\n") +
          `\n\nNotice: ∃y∀x ⇒ ∀x∃y always holds, but not conversely.`;
      }
      root.querySelectorAll(".lg-pre .gk-chip").forEach(b => b.addEventListener("click", () => {
        const k = b.dataset.p, r = rng(Date.now() & 0xffff);
        for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) R[i][j] = k === "rand" ? (r() < .35 ? 1 : 0) : (presets[k](i, j) ? 1 : 0);
        draw();
      }));
      draw();
    }
  }],
  chapters: [
    { icon: "🏛", title: "c. 350 BCE — Aristotle's syllogisms", who: "Aristotle (Prior Analytics) · the Stoics, especially Chrysippus",
      lead: "The first theory of valid argument: which combinations of 'all', 'some' and 'no' force a conclusion.",
      formula: "All M are P · All S are M ⊢ All S are P      (Barbara)",
      what: "A syllogism has two premises and a conclusion, each saying that all, some or no A are B. Aristotle sorted the 256 possible forms and identified the valid ones by <b>form alone</b>, using letters as variables — perhaps the first use of variables in history.",
      how: "He reduced every valid syllogism to a few 'perfect' ones by conversion rules, an early axiomatic method. The Stoics developed a separate logic of whole propositions — if, and, or — closer to modern propositional logic.",
      story: "For two thousand years Aristotle's logic was taught almost unchanged; Kant (1787) thought it complete. It could not handle relations such as 'every number has a larger one', which is why mathematics had to wait for Frege.",
      today: "Syllogisms survive in philosophy classes and in the description logics behind ontologies and the semantic web, which are decidable fragments of first-order logic." },
    { icon: "⚙️", title: "1847–1879 — logic becomes mathematics", who: "George Boole 1847 · Gottlob Frege 1879 · Charles Peirce 1885",
      lead: "Boole made logic an algebra; Frege added quantifiers and relations, enough to write all of mathematics.",
      formula: "∀ε>0 ∃δ>0 ∀x (|x − a| < δ → |f(x) − f(a)| < ε)",
      what: "First-order (predicate) logic has variables over a domain, relations, functions, and the quantifiers ∀ and ∃. Every definition in this map — continuity, group, prime — is a first-order formula, and quantifier order carries the meaning (the lab).",
      how: "Frege's Begriffsschrift (1879) gave a fully formal notation and rules of inference, so a proof became a finite object that could be checked mechanically. Peirce independently introduced quantifiers (1885), and his notation, not Frege's two-dimensional one, won.",
      story: "Frege spent twenty years deriving arithmetic from logic. In 1902, as the second volume of his Basic Laws went to print, Russell wrote to him that one of its axioms was contradictory. Frege's logic survived; his logicism did not.",
      today: "Predicate logic is the language of mathematics, of database queries (SQL is relational algebra, equivalent to a fragment of first-order logic) and of hardware and software verification." },
    { icon: "🏛", title: "1929 — completeness: truth equals provability", who: "Kurt Gödel 1929 · Leon Henkin's proof 1949 · compactness and Löwenheim–Skolem",
      lead: "In first-order logic every sentence true in all structures has a proof. Semantics and syntax meet.",
      formula: "Γ ⊨ φ  ⟺  Γ ⊢ φ",
      what: "Gödel's completeness theorem says a first-order sentence is provable from axioms Γ exactly when it is true in every structure satisfying Γ. Consequences: <b>compactness</b> (if every finite part of Γ has a model, Γ has one) and the Löwenheim–Skolem theorems (a countable theory with an infinite model has models of every infinite size).",
      how: "Henkin's proof builds a model out of the syntax itself: extend Γ to a maximal consistent set with witnesses for every existential statement, and let the terms of the language be the elements.",
      story: "Gödel proved it in his 1929 doctoral thesis in Vienna, aged 23. Skolem's paradox followed: set theory, which proves uncountable sets exist, has a countable model — 'uncountable' is relative to the model.",
      today: "Compactness is the engine of model theory (next door on the map) and of nonstandard analysis, which builds infinitesimals from it." },
    { icon: "🔥", title: "1931 — incompleteness", who: "Kurt Gödel 1931 · Gerhard Gentzen 1936 · Paris & Harrington 1977",
      lead: "Every consistent, effective theory of arithmetic leaves some true statement unproved — including its own consistency.",
      formula: "G ↔ ¬Prov(⌜G⌝)      'this sentence is not provable'",
      what: "By coding formulas as numbers, Gödel built an arithmetic sentence G that says 'G is not provable'. If the theory is consistent, G is unprovable — hence true. The second theorem: such a theory cannot prove its own consistency.",
      how: "The key is that 'x is the code of a proof of y' is a computable relation, so arithmetic can talk about it. The construction is a diagonal argument, cousin of Cantor's and Turing's.",
      story: "Gödel announced it quietly at a conference in Königsberg in September 1930; von Neumann understood at once. It ended Hilbert's programme. Gentzen (1936) proved arithmetic consistent anyway — using induction up to the ordinal ε₀, which arithmetic itself cannot justify.",
      today: "Natural unprovable statements exist (Paris–Harrington, Goodstein's theorem — see Set Theory), and incompleteness sets hard limits on automated theorem provers, human or machine." }
  ],
  challenges: [
    "In the lab, find a world where ∀x∃y R(x,y) is true but ∃y∀x R(x,y) is false. Then one where both are true.",
    "Write 'f is uniformly continuous' with quantifiers and spot exactly which quantifiers moved compared with 'f is continuous at every a'.",
    "Is 'love is always returned' (symmetry) compatible with 'nobody loves themselves' and 'everyone loves someone'? Build it."
  ],
  sources: [
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — Aristotle's Logic", note: "The syllogistic, and why it mattered for 2,000 years.", url: SEP("aristotle-logic") },
    { type: "FREE TEXTBOOK", title: "forall x: an introduction to formal logic (Magnus & Button)", note: "Free, clear, and widely used; propositional and first-order logic.", url: "https://forallx.openlogicproject.org/" },
    { type: "FOUNDATIONAL PAPER · 1931", title: "Gödel — Über formal unentscheidbare Sätze der Principia Mathematica", note: "The incompleteness theorems.", url: "https://doi.org/10.1007/BF01700692" },
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — Gödel's Incompleteness Theorems", note: "Statements, proofs in outline, and consequences.", url: SEP("goedel-incompleteness") },
    { type: "TEXTBOOK", title: "Herbert Enderton — A Mathematical Introduction to Logic", note: "The standard first graduate text.", url: null }
  ]
});

/* ================================================================ SET THEORY */
function goodstein(start, steps) {
  // hereditary base-b representation as a tree: [[coef, exponentTree], ...]
  const rep = (n, b) => { const out = []; let e = 0n; while (n > 0n) { const c = n % b; if (c) out.push([c, rep(e, b)]); n /= b; e++; } return out; };
  const val = (t, b) => t.reduce((s, [c, e]) => s + c * b ** val(e, b), 0n);
  const wrap = x => /[+·]/.test(x) ? `(${x})` : x;
  const show = (t, b) => t.length ? t.slice().reverse().map(([c, e]) => {
    if (e.length === 0) return String(c);
    const one = e.length === 1 && e[0][1].length === 0 && e[0][0] === 1n;
    const pw = one ? `${b}` : `${b}^${wrap(show(e, b))}`;
    return c === 1n ? pw : `${c}·${pw}`;
  }).join(" + ") : "0";
  const rows = []; let n = BigInt(start), b = 2n;
  for (let k = 0; k < steps && n > 0n; k++) {
    const t = rep(n, b); rows.push({ b, n, s: show(t, b) });
    n = val(t, b + 1n) - 1n; b++;
  }
  rows.push({ b, n, s: n === 0n ? "0" : "…" });
  return rows;
}
register("set-theory", {
  kicker: "THE UNIVERSE OF SETS · ABOUT 25 MIN",
  hook: "Can a sequence grow for longer than the age of the universe — and still be guaranteed to reach zero?",
  intro: "Set theory is where every mathematical object lives: numbers, functions and spaces are all built from sets. Cantor showed that infinite sets come in different sizes; Zermelo wrote the axioms that avoid the paradoxes; Gödel and Cohen showed that some natural questions, like the continuum hypothesis, can't be settled by those axioms. The lab plays with Goodstein's sequences, whose termination needs infinite ordinals to prove.",
  timeline: [[1874, "Cantor: ℝ is uncountable"], [1883, "transfinite ordinals"], [1901, "Russell's paradox"], [1908, "Zermelo's axioms"], [1938, "Gödel's L"], [1963, "Cohen's forcing"]],
  labs: [{
    kicker: "GOODSTEIN 1944 · ORDINALS AT WORK", title: "The sequence that must come home",
    intro: "Write n in 'hereditary' base 2 (exponents too), replace every 2 by 3, subtract 1; write the result in hereditary base 3, replace 3s by 4s, subtract 1; and so on. Goodstein's theorem: every such sequence reaches 0. Kirby and Paris (1982) proved Peano arithmetic cannot prove it.",
    html: `<div class="it-control"><label><span>start at n =</span><output data-o="n">4</output></label><input type="range" data-i="n" min="1" max="10" step="1" value="4"></div>
      <div class="gk-out gs-out" style="max-height:18rem;overflow:auto"></div>`,
    caveat: "Why it terminates: replace every base by ω. The terms become ordinals below ε₀ that strictly decrease at each step, and there is no infinite decreasing sequence of ordinals. The proof needs ordinals Peano arithmetic cannot handle — so a true statement about whole numbers is unprovable in the usual axioms for them.",
    init(root) {
      const inp = root.querySelector("[data-i=n]"), out = root.querySelector(".gs-out");
      const run = () => {
        const n = +inp.value; root.querySelector("[data-o=n]").textContent = n;
        const rows = goodstein(n, n <= 3 ? 12 : 9);
        const fmt = v => { const s = v.toString(); return s.length > 24 ? `${s.slice(0, 10)}…(${s.length} digits)` : s; };
        out.innerHTML = rows.map((r, i) => i < rows.length - 1 || r.n === 0n
          ? `<span class="d">base ${String(r.b).padStart(2)}</span>  ${fmt(r.n).padStart(10)}  <span class="g">${r.s.length > 60 ? r.s.slice(0, 60) + "…" : r.s}</span>`
          : `<span class="d">base ${String(r.b).padStart(2)}</span>  ${fmt(r.n).padStart(10)}  …`).join("\n") +
          (n <= 3 ? `\n<span class="t">reached 0.</span>` : n === 4 ? `\n<span class="r">still growing</span> — it keeps growing for about 3·2^402653211 steps before falling to 0.` : `\n<span class="r">exploding</span> — yet it still reaches 0, eventually.`);
      };
      inp.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1874 — infinities come in sizes", who: "Georg Cantor 1874 & 1891 · Richard Dedekind",
      lead: "Two sets have the same size if they can be paired off. The rationals can be listed; the reals cannot.",
      formula: "|ℕ| = |ℤ| = |ℚ| = ℵ₀   <   |ℝ| = 2^ℵ₀      and |X| < |𝒫(X)| for every set X",
      what: "Cantor defined cardinality by one-to-one correspondence and proved that ℝ is strictly bigger than ℕ; his 1891 diagonal argument shows every set is smaller than its set of subsets, so there is no largest infinity. The ⚛ infinity lab plays both arguments.",
      how: "The countable sets can be listed: ℚ by walking the diagonals of a grid of fractions. The diagonal argument builds, from any list of real numbers, one that differs from the n-th in the n-th digit — so no list is complete.",
      story: "Kronecker called Cantor a corrupter of youth; the dispute is one of the red edges on this map. Hilbert later said no one would expel mathematicians from the paradise Cantor had created.",
      today: "Countable versus uncountable is the first question of measure theory, topology and computability: there are countably many programs but uncountably many real numbers, so most reals cannot be computed." },
    { icon: "⚙️", title: "1901–1922 — paradox, then axioms", who: "Bertrand Russell 1901 · Ernst Zermelo 1908 · Abraham Fraenkel & Thoralf Skolem 1922",
      lead: "The set of all sets that don't contain themselves cannot exist. The fix: sets are built in stages, by explicit axioms.",
      formula: "R = {x : x ∉ x}  ⇒  (R ∈ R ⟺ R ∉ R)",
      what: "Unrestricted comprehension — 'for every property there is a set of things with it' — is inconsistent (Russell). ZFC allows only sets carved out of existing sets (Separation), plus Pairing, Union, Power set, Infinity, Replacement, Foundation and Choice.",
      how: "Every set appears at some stage of the cumulative hierarchy V₀ ⊂ V₁ ⊂ … ⊂ V_ω ⊂ …, where each stage is the power set of the one before. No set can contain itself, and there is no 'set of all sets'.",
      story: "Russell's letter reached Frege in 1902 as his life's work went to press. Zermelo, who had found the paradox independently, published his axioms in 1908; Fraenkel and Skolem added Replacement in 1922.",
      today: "ZFC is the working foundation of mathematics: nearly every theorem on this map can in principle be proved from its nine axioms." },
    { icon: "🏛", title: "1904 — the Axiom of Choice", who: "Ernst Zermelo 1904 · Zorn's lemma 1935 · Banach & Tarski 1924",
      lead: "From any collection of non-empty sets one can choose an element of each — even with no rule for choosing.",
      formula: "∀F (∅ ∉ F ⇒ ∃ f : F → ∪F with f(A) ∈ A for all A ∈ F)",
      what: "Choice is equivalent to Zorn's lemma and to the well-ordering theorem. It gives every vector space a basis and every ring a maximal ideal — and also non-measurable sets and the Banach–Tarski paradox (a red edge on the map).",
      how: "Zorn's lemma is how choice is used in practice: if every chain in a partial order has an upper bound, there is a maximal element. For bases: take the linearly independent sets ordered by inclusion.",
      story: "Zermelo used choice to prove that ℝ can be well-ordered (1904). Borel, Baire and Lebesgue objected that an arbitrary infinite choice defines nothing; the argument was settled by treating choice as an explicit axiom, and by Gödel and Cohen's proof that it is independent.",
      today: "Mathematicians use choice freely but note when a result depends on it; constructive mathematics and computer proof assistants often avoid it, because a choice function can't be computed." },
    { icon: "🔥", title: "1938–1963 — questions the axioms cannot answer", who: "Kurt Gödel 1938 · Paul Cohen 1963 · W. Hugh Woodin (today)",
      lead: "The continuum hypothesis — no size strictly between ℕ and ℝ — can be neither proved nor refuted in ZFC.",
      formula: "Con(ZF) ⇒ Con(ZFC + CH) and Con(ZFC + ¬CH)",
      what: "Gödel built the constructible universe L, a model of ZFC where CH holds; Cohen's forcing added new real numbers to a model to make CH fail. So CH is independent of ZFC — the first of hundreds of such results.",
      how: "Forcing builds a 'generic' extension of a model from partial information, controlling exactly which new sets appear. It became the main tool of set theory, together with large-cardinal axioms that measure the strength of theories.",
      story: "Cohen, an analyst who came to logic from outside, received the Fields Medal in 1966 — still the only one awarded for logic. Hilbert had listed CH as the first of his 23 problems in 1900.",
      today: "Set theorists debate whether new axioms should settle CH: Woodin's program once suggested CH is false and now explores 'Ultimate L', where it would be true. Independence reaches into analysis and topology too." }
  ],
  challenges: [
    "Start the lab at n = 3 and check every line by hand: 3 = 2 + 1 → 3 + 1 − 1 = 3 → …",
    "Show that ℚ is countable by listing the positive fractions along the diagonals of an infinite grid.",
    "Why can't there be a set of all sets? Apply Cantor's theorem |X| < |𝒫(X)| to it."
  ],
  sources: [
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — Set Theory", note: "ZFC, ordinals, cardinals, independence, large cardinals.", url: SEP("set-theory") },
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — The Continuum Hypothesis", note: "From Cantor to Woodin.", url: SEP("continuum-hypothesis") },
    { type: "FOUNDATIONAL PAPER · 1963", title: "Paul Cohen — The independence of the continuum hypothesis", note: "Proceedings of the National Academy of Sciences 50.", url: "https://doi.org/10.1073/pnas.50.6.1143" },
    { type: "BOOK", title: "Paul Halmos — Naive Set Theory", note: "The classic short introduction.", url: null },
    { type: "BOOK", title: "Thomas Jech — Set Theory", note: "The standard reference, including forcing.", url: null }
  ]
});

/* ================================================================ CATEGORY THEORY */
register("category-theory", {
  kicker: "MATHEMATICS OF MATHEMATICS · ABOUT 20 MIN",
  hook: "What do the Cartesian product of sets, the gcd of numbers and the word 'and' have in common?",
  intro: "Category theory studies objects only through the arrows between them. It was invented in 1945 to make precise the word 'natural' in algebraic topology, and it turned out to describe the common shape of constructions across all of mathematics. The lab shows one definition — the product — producing four apparently unrelated operations.",
  timeline: [[1945, "Eilenberg & Mac Lane"], [1957, "Grothendieck's Tôhoku"], [1958, "Kan: adjoint functors"], [1963, "Lawvere's thesis"], [2009, "Lurie: higher topoi"]],
  labs: [{
    kicker: "UNIVERSAL PROPERTIES", title: "One definition, four products",
    intro: "The product of A and B is an object P with arrows to A and B such that any other object with arrows to A and B factors through P in exactly one way. Pick a category and two objects; watch the same definition produce different answers.",
    html: `<div class="gk-chips ct-cat"><button class="gk-chip on" data-c="set">finite sets</button><button class="gk-chip" data-c="div">divisibility</button><button class="gk-chip" data-c="prop">propositions</button><button class="gk-chip" data-c="vec">vector spaces</button></div>
      <div class="gk-row"><label class="achk" style="font:500 .66rem IBM Plex Mono;color:var(--dim)">A <input class="gk-input ct-a" value="3" style="width:4rem"></label>
        <label class="achk" style="font:500 .66rem IBM Plex Mono;color:var(--dim)">B <input class="gk-input ct-b" value="4" style="width:4rem"></label></div>
      <div class="gk-out ct-out"></div>`,
    caveat: "Turning the arrows round gives the coproduct: disjoint union of sets, lcm of numbers, 'or' of propositions, and again the direct sum of vector spaces — where products and coproducts coincide.",
    init(root) {
      let cat = "set";
      const gcd = (a, b) => b ? gcd(b, a % b) : a;
      const out = root.querySelector(".ct-out"), A = root.querySelector(".ct-a"), B = root.querySelector(".ct-b");
      const DESC = {
        set: { hint: ["size of A", "size of B"], run: (a, b) => {
          a = Math.max(1, Math.min(6, +a || 1)); b = Math.max(1, Math.min(6, +b || 1));
          const pairs = []; for (let i = 1; i <= a; i++) for (let j = 1; j <= b; j++) pairs.push(`(${i},${"abcdef"[j - 1]})`);
          return `Objects: sets. Arrows: functions.\nA = {1…${a}}, B = {${"abcdef".slice(0, b).split("").join(",")}}\n<span class="g">A × B</span> = ${pairs.join(" ")}  — ${a * b} pairs, with the two projections.\n<span class="d">coproduct A ⊔ B: a disjoint union of ${a + b} elements</span>`; } },
        div: { hint: ["a number", "a number"], run: (a, b) => {
          a = Math.max(1, Math.round(+a || 1)); b = Math.max(1, Math.round(+b || 1)); const g = gcd(a, b);
          return `Objects: positive integers. An arrow m → n exists when m divides n.\nA product P needs arrows P → ${a} and P → ${b} (P divides both), and every other common divisor must divide P.\n<span class="g">product = gcd(${a}, ${b}) = ${g}</span>\n<span class="d">coproduct = lcm(${a}, ${b}) = ${a * b / g}</span>`; } },
        prop: { hint: ["a proposition", "a proposition"], run: (a, b) => {
          a = a || "A"; b = b || "B";
          return `Objects: propositions. An arrow p → q means 'p implies q'.\nThe product must imply both, and be implied by anything that implies both:\n<span class="g">product = (${a}) ∧ (${b})</span>\n<span class="d">coproduct = (${a}) ∨ (${b}); exponential object = (${a}) → (${b}) — logic is a category (a Heyting algebra)</span>`; } },
        vec: { hint: ["dimension of A", "dimension of B"], run: (a, b) => {
          a = Math.max(0, Math.round(+a || 0)); b = Math.max(0, Math.round(+b || 0));
          return `Objects: real vector spaces ℝⁿ. Arrows: linear maps.\n<span class="g">product = ℝ${a} ⊕ ℝ${b} = ℝ${a + b}</span> (pairs of vectors, dimensions add)\n<span class="d">coproduct = the same space! In vector spaces (and abelian groups) finite products and coproducts coincide — the first sign of an 'abelian category'.</span>`; } }
      };
      const run = () => { out.innerHTML = DESC[cat].run(A.value, B.value); };
      root.querySelectorAll(".ct-cat .gk-chip").forEach(b => b.addEventListener("click", () => {
        cat = b.dataset.c; root.querySelectorAll(".ct-cat .gk-chip").forEach(x => x.classList.toggle("on", x === b));
        const d = { set: ["3", "4"], div: ["12", "18"], prop: ["it rains", "it is cold"], vec: ["2", "3"] }[cat]; A.value = d[0]; B.value = d[1]; run();
      }));
      A.addEventListener("input", run); B.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1945 — natural transformations", who: "Samuel Eilenberg & Saunders Mac Lane · 'General theory of natural equivalences'",
      lead: "Why is a vector space 'naturally' isomorphic to its double dual but not to its dual? To answer, they defined categories, functors and natural transformations.",
      formula: "category = objects + arrows + composition (associative, with identities)",
      what: "A category has objects and arrows between them that compose. A functor maps one category to another, preserving composition; a natural transformation is a family of arrows that commutes with every functor-image of an arrow. Homology, for example, is a functor from spaces to groups.",
      how: "Commutative diagrams replace long calculations: to prove two composites equal, paste together squares already known to commute. 'Diagram chasing' became the grammar of algebraic topology and homological algebra.",
      story: "Eilenberg and Mac Lane thought they were writing a clarifying paper for topologists; Mac Lane later joked that it was intended to be the only paper ever needed on the subject.",
      today: "Categories are the lingua franca of algebraic geometry, topology and representation theory, and increasingly of functional programming (monads) and applied mathematics." },
    { icon: "⚙️", title: "1957–1960 — Grothendieck's abelian categories", who: "Alexander Grothendieck · the Tôhoku paper 1957 · EGA and SGA",
      lead: "One framework in which sheaves, modules and chain complexes all behave like abelian groups — so homological algebra works everywhere at once.",
      formula: "abelian category: kernels, cokernels, and every mono is a kernel, every epi a cokernel",
      what: "Grothendieck identified the axioms that make homological algebra possible and showed sheaf cohomology fits them. He then rebuilt algebraic geometry on categorical ideas: a space is determined by the functor of maps into it.",
      how: "The Yoneda lemma says an object X is determined, up to unique isomorphism, by the functor Hom(−, X). Grothendieck used this to define schemes and moduli spaces as 'whatever represents this functor'.",
      story: "The Tôhoku paper, written in Kansas in 1955 and published in a Japanese journal in 1957, was one of the most influential papers of the century; Grothendieck's seminars in Paris then produced thousands of pages.",
      today: "The Yoneda lemma is often called the most important result in category theory; representability and moduli functors run through all of modern geometry." },
    { icon: "⚙️", title: "1958 — adjoint functors", who: "Daniel Kan 1958 · Peter Freyd's adjoint functor theorem",
      lead: "Free and forgetful constructions come in pairs: every way of building the 'best' object of a kind is an adjunction.",
      formula: "Hom(F A, B) ≅ Hom(A, G B)      (F ⊣ G)",
      what: "An adjunction between functors F and G is a natural bijection between maps F(A) → B and maps A → G(B). Free groups, free vector spaces, the Stone–Čech compactification, completions of metric spaces — all are left or right adjoints to a 'forgetful' functor.",
      how: "Universal properties (like the product in the lab) are adjunctions in disguise: the product is right adjoint to the diagonal functor. Right adjoints preserve limits; left adjoints preserve colimits — a very practical rule.",
      story: "Kan found adjoint functors studying simplicial homotopy theory; Mac Lane's slogan followed: 'adjoint functors arise everywhere'.",
      today: "Adjunctions give monads, which structure effects in programming languages such as Haskell, and they organise much of modern algebraic topology." },
    { icon: "🔥", title: "1963–today — topoi and higher categories", who: "F. William Lawvere · Myles Tierney · Jacob Lurie · Clausen & Scholze",
      lead: "Categories that behave like universes of sets, and categories with arrows between arrows between arrows…",
      formula: "topos: a category with finite limits, exponentials and a subobject classifier Ω",
      what: "A topos (Grothendieck, 1963; Lawvere and Tierney, 1970) is a category rich enough to do mathematics inside — its internal logic is intuitionistic. Higher categories allow 2-arrows between arrows, 3-arrows between those, and so on, capturing homotopy.",
      how: "Lurie's Higher Topos Theory (2009) and Higher Algebra built ∞-categories into a working foundation for homotopy theory and derived algebraic geometry. Clausen and Scholze's condensed mathematics (2019) uses a topos to fix the interaction of topology and algebra.",
      story: "Lawvere's 1963 thesis proposed categories as a foundation of mathematics in their own right — an alternative to sets; his elementary theory of the category of sets (1964) axiomatises set theory in categorical terms.",
      today: "∞-categories are now standard in homotopy theory and algebraic geometry, and category theory is spreading into physics (topological field theories), linguistics and databases." }
  ],
  challenges: [
    "In the divisibility category, check that gcd really satisfies the universal property: every common divisor of 12 and 18 divides 6.",
    "Guess the product of two objects in the category of topological spaces. Why does it carry the product topology and not the box topology?",
    "Show that an object with arrows to A and B that is 'better' than the product would contradict uniqueness."
  ],
  sources: [
    { type: "FREE TEXTBOOK", title: "Emily Riehl — Category Theory in Context", note: "Modern, example-driven, free from the author.", url: "https://math.jhu.edu/~eriehl/context.pdf" },
    { type: "WIKI", title: "nLab", note: "The collaborative wiki for category theory and its applications.", url: "https://ncatlab.org/nlab/show/HomePage" },
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — Category Theory", note: "History and philosophy, from 1945 to topoi.", url: SEP("category-theory") },
    { type: "MONOGRAPH · 2009", title: "Jacob Lurie — Higher Topos Theory", note: "The foundation of ∞-categories (arXiv version).", url: "https://arxiv.org/abs/math/0608040" },
    { type: "BOOK", title: "Saunders Mac Lane — Categories for the Working Mathematician", note: "The classic text by the co-founder.", url: null }
  ]
});

/* ================================================================ MODEL THEORY */
register("model-theory", {
  kicker: "TRUTH IN STRUCTURES · ABOUT 20 MIN",
  hook: "The same sentence can be true in one world and false in another. What can sentences tell worlds apart?",
  intro: "Model theory studies the relationship between formal sentences and the structures that satisfy them. It explains why first-order logic can't pin down the natural numbers or the reals up to isomorphism, builds nonstandard models full of infinitesimals, and — surprisingly — proves theorems in number theory and geometry. The lab lets you build finite graphs and read off which sentences they satisfy.",
  timeline: [[1915, "Löwenheim"], [1933, "Tarski: truth"], [1955, "Łoś: ultraproducts"], [1961, "Robinson: infinitesimals"], [1984, "o-minimality"]],
  labs: [{
    kicker: "SATISFACTION ⊨", title: "Build a structure, test the sentences",
    intro: "A structure here is a directed graph on five points: a domain and one binary relation E. Click arrows on and off. Each sentence of first-order logic is either true or false in the structure you build — Tarski's definition of truth, evaluated by brute force.",
    html: `<div class="gk-chips mt-pre"><button class="gk-chip" data-p="cycle">5-cycle</button><button class="gk-chip" data-p="complete">complete</button><button class="gk-chip" data-p="order">linear order</button><button class="gk-chip" data-p="empty">empty</button></div>
      <canvas class="gk-canvas mt-cv" style="cursor:pointer"></canvas>
      <div class="gk-out mt-out"></div>`,
    caveat: "Every one of these sentences talks only about elements, never about sets of elements. That is first-order logic's strength (completeness, compactness) and its limit: no first-order sentence says 'the graph is connected' or 'the domain is finite'.",
    init(root) {
      const n = 5, E = Array.from({ length: n }, () => new Array(n).fill(0)); const cv = root.querySelector(".mt-cv"), out = root.querySelector(".mt-out");
      const presets = { cycle: (i, j) => j === (i + 1) % n, complete: (i, j) => i !== j, order: (i, j) => i < j, empty: () => false };
      let sel = null;
      function pos(W, H) { return Array.from({ length: n }, (_, i) => [W / 2 + Math.min(W, H) * .36 * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / n), H / 2 + Math.min(W, H) * .36 * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / n)]); }
      function draw() {
        const { ctx, w: W, h: H } = canvas(cv, 210); ctx.clearRect(0, 0, W, H); const P = pos(W, H);
        for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) if (E[i][j]) {
          const [x1, y1] = P[i], [x2, y2] = P[j];
          if (i === j) { ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.arc(x1, y1 - 16, 8, 0, 7); ctx.stroke(); continue; }
          const a = Math.atan2(y2 - y1, x2 - x1), sx = x1 + 13 * Math.cos(a), sy = y1 + 13 * Math.sin(a), ex = x2 - 14 * Math.cos(a), ey = y2 - 14 * Math.sin(a);
          const both = E[j][i], off = both ? 4 : 0, ox = -Math.sin(a) * off, oy = Math.cos(a) * off;
          ctx.strokeStyle = C.gold; ctx.fillStyle = C.gold; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(sx + ox, sy + oy); ctx.lineTo(ex + ox, ey + oy); ctx.stroke();
          ctx.beginPath(); ctx.moveTo(ex + ox, ey + oy); ctx.lineTo(ex + ox - 8 * Math.cos(a - .4), ey + oy - 8 * Math.sin(a - .4)); ctx.lineTo(ex + ox - 8 * Math.cos(a + .4), ey + oy - 8 * Math.sin(a + .4)); ctx.fill(); ctx.lineWidth = 1;
        }
        P.forEach(([x, y], i) => { ctx.fillStyle = i === sel ? "#fff" : C.violet; ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.fill(); ctx.fillStyle = "#120b22"; ctx.font = "bold 11px IBM Plex Mono"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("abcde"[i], x, y + .5); });
        ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
        const D = [0, 1, 2, 3, 4], all = f => D.every(f), ex = f => D.some(f), e = (x, y) => !!E[x][y];
        const S = [
          ["∀x ¬E(x,x)", "irreflexive", all(x => !e(x, x))],
          ["∀x∀y (E(x,y) → E(y,x))", "symmetric", all(x => all(y => !e(x, y) || e(y, x)))],
          ["∀x∀y∀z (E(x,y) ∧ E(y,z) → E(x,z))", "transitive", all(x => all(y => all(z => !(e(x, y) && e(y, z)) || e(x, z))))],
          ["∀x∃y E(x,y)", "no dead ends", all(x => ex(y => e(x, y)))],
          ["∃x∀y (x ≠ y → E(x,y))", "someone points to all others", ex(x => all(y => x === y || e(x, y)))],
          ["∀x∀y (x ≠ y → E(x,y) ∨ E(y,x))", "any two are comparable", all(x => all(y => x === y || e(x, y) || e(y, x)))],
          ["∃x∃y∃z (E(x,y) ∧ E(y,z) ∧ E(z,x))", "has a directed 3-cycle", ex(x => ex(y => ex(z => e(x, y) && e(y, z) && e(z, x))))]
        ];
        const strict = S[0][2] && S[2][2] && S[5][2];
        out.innerHTML = S.map(([f, en, v]) => `${v ? '<span class="t">⊨</span>' : '<span class="r">⊭</span>'} ${f.padEnd(36)} <span class="d">${en}</span>`).join("\n") +
          (strict ? `\n<span class="g">This structure is a model of the theory of strict linear orders.</span>` : "") + `\n\nClick a point, then another, to toggle the arrow between them (click a point twice for a loop).`;
      }
      cv.addEventListener("click", ev => {
        const r = cv.getBoundingClientRect(), P = pos(r.width, 210), x = ev.clientX - r.left, y = ev.clientY - r.top;
        const i = P.findIndex(p => Math.hypot(p[0] - x, p[1] - y) < 16); if (i < 0) return;
        if (sel === null) sel = i; else { E[sel][i] ^= 1; sel = null; }
        draw();
      });
      root.querySelectorAll(".mt-pre .gk-chip").forEach(b => b.addEventListener("click", () => { for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) E[i][j] = presets[b.dataset.p](i, j) ? 1 : 0; sel = null; draw(); }));
      for (let i = 0; i < n; i++) E[i][(i + 1) % n] = 1;
      draw();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1915–1922 — Löwenheim–Skolem and Skolem's paradox", who: "Leopold Löwenheim 1915 · Thoralf Skolem 1920–22",
      lead: "If a first-order theory has an infinite model, it has one of every infinite size — even set theory has a countable model.",
      formula: "T countable, T has an infinite model ⇒ T has models of every infinite cardinality",
      what: "First-order logic cannot control the size of infinite structures. The theory of the real numbers has a countable model; arithmetic has uncountable models; set theory, which proves that uncountable sets exist, has a countable model (Skolem's paradox).",
      how: "Downward: close a set under witnesses for every existential statement (Skolem functions) to get a small elementary substructure. Upward: use compactness to add many new constants that must be different.",
      story: "Skolem argued the paradox showed set-theoretic notions are relative: inside the countable model, the bijection with ℕ that would make a set countable simply doesn't exist.",
      today: "Relativity of cardinality is routine in set theory, where forcing constructs countable models on purpose." },
    { icon: "🏛", title: "1933 — Tarski defines truth", who: "Alfred Tarski · 'The concept of truth in formalized languages'",
      lead: "'Snow is white' is true if and only if snow is white — made into a precise, recursive definition of satisfaction.",
      formula: "𝔐 ⊨ ∀x φ(x)  ⟺  𝔐 ⊨ φ(a) for every element a of 𝔐",
      what: "Tarski defined when a structure 𝔐 satisfies a formula, by recursion on the formula: atomic formulas by the structure's relations, connectives by truth tables, quantifiers by ranging over the domain — exactly what the lab computes. He also proved truth for arithmetic cannot be defined within arithmetic.",
      how: "The definition is carried out in a metalanguage stronger than the object language, avoiding the liar paradox. It makes 'model of a theory' and 'logical consequence' precise mathematical notions.",
      story: "Tarski's paper, written in Polish in 1933, founded formal semantics. Later he named the subject 'the theory of models' (1954) and built a school at Berkeley.",
      today: "Tarski's semantics underlies formal semantics of natural language, the meaning of programming languages and databases (a query's answer is the set of satisfying tuples)." },
    { icon: "⚙️", title: "1955–1961 — ultraproducts and infinitesimals", who: "Jerzy Łoś 1955 · Abraham Robinson 1961",
      lead: "Glue infinitely many structures together with an ultrafilter and a sentence is true in the result exactly when it is true in 'most' factors.",
      formula: "∏ 𝔐ᵢ / U ⊨ φ  ⟺  {i : 𝔐ᵢ ⊨ φ} ∈ U      (Łoś's theorem)",
      what: "An ultrapower of ℝ contains infinitely large and infinitely small numbers but satisfies every first-order sentence true in ℝ. Robinson used such models to make Leibniz's infinitesimals rigorous: nonstandard analysis.",
      how: "Represent a hyperreal number by a sequence of reals, identifying sequences that agree 'almost everywhere' according to a non-principal ultrafilter. The sequence (1, 1/2, 1/3, …) becomes a positive infinitesimal.",
      story: "Robinson announced nonstandard analysis in 1961, vindicating the reasoning of the founders of calculus that Berkeley had mocked as 'ghosts of departed quantities'.",
      today: "Ultraproducts prove results in combinatorics and group theory (for example in the proof of Gromov's theorem via asymptotic cones) and connect finite and infinite mathematics." },
    { icon: "🔥", title: "1965–today — model theory meets geometry", who: "Michael Morley 1965 · Saharon Shelah · van den Dries, Pillay, Steinhorn · Ehud Hrushovski 1996",
      lead: "Classify theories by how complicated their models can be — then use the classification to prove theorems about equations.",
      formula: "o-minimal: every definable subset of the line is a finite union of points and intervals",
      what: "Morley's categoricity theorem (1965) launched stability theory, which Shelah developed into a vast classification of theories. o-minimal structures (1984–) are 'tame': their definable sets behave like semialgebraic sets, with no fractals or wild oscillations.",
      how: "Tameness gives finiteness and dimension theory; Pila and Wilkie's counting theorem (2006) for rational points on sets definable in an o-minimal structure became a tool for Diophantine problems.",
      story: "Hrushovski (1996) proved the Mordell–Lang conjecture for function fields with model theory; Pila (2011) proved cases of the André–Oort conjecture using o-minimality — model theory solving problems in number theory.",
      today: "Tsimerman and others completed the André–Oort conjecture for Shimura varieties (2021) by combining o-minimality with arithmetic geometry — one of the field's major recent achievements." }
  ],
  challenges: [
    "Build a structure that satisfies irreflexive, transitive and 'any two are comparable': a strict linear order. How many arrows does it need?",
    "Find a graph with no directed 3-cycle in which every point has an out-arrow. Why must such a graph (on finitely many points) contain some directed cycle?",
    "Explain why no single first-order sentence can say 'the graph is connected' (hint: compactness, with infinitely many new points)."
  ],
  sources: [
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — Model Theory", note: "Structures, satisfaction, and what model theory is for.", url: SEP("model-theory") },
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — Tarski's Truth Definitions", note: "The 1933 definition and the undefinability of truth.", url: SEP("tarski-truth") },
    { type: "BOOK", title: "David Marker — Model Theory: An Introduction", note: "The standard graduate text.", url: null },
    { type: "BOOK", title: "Wilfrid Hodges — A Shorter Model Theory", note: "A classic, readable account.", url: null }
  ]
});

/* ================================================================ COMPUTABILITY */
register("computability", {
  kicker: "THE LIMITS OF ALGORITHMS · ABOUT 25 MIN",
  hook: "Is there a question with a yes-or-no answer that no computer can ever answer?",
  intro: "In 1936 Turing and Church independently defined what an algorithm is, and in the same breath proved that some problems have no algorithm at all. Computability theory maps this landscape of the unsolvable. The lab looks at the Collatz problem — trivially easy to compute, apparently impossible to prove — and at a function that grows faster than anything you can write with loops.",
  timeline: [[1928, "Hilbert's Entscheidungsproblem"], [1936, "Turing & Church"], [1944, "Post: degrees"], [1956, "Friedberg–Muchnik"], [1970, "Hilbert's 10th: no"]],
  labs: [{
    kicker: "COLLATZ 1937 · EASY TO RUN, HARD TO PROVE", title: "3n + 1",
    intro: "If n is even, halve it; if odd, triple it and add 1. Every starting number ever tried eventually reaches 1 — checked by computer to beyond 2⁶⁸ — but nobody can prove it always happens. Conway showed (1972) that slight generalisations of the rule are undecidable.",
    html: `<div class="it-control"><label><span>start at n =</span><output data-o="n">27</output></label><input type="range" data-i="n" min="1" max="200" step="1" value="27"></div>
      <canvas class="gk-canvas cz-cv"></canvas>
      <div class="gk-out cz-out"></div>`,
    caveat: "Terence Tao proved in 2019 that almost all Collatz orbits (in the sense of logarithmic density) attain almost bounded values — the strongest result so far. Erdős said of the problem: 'Mathematics may not be ready for such problems.'",
    init(root) {
      const inp = root.querySelector("[data-i=n]"), cv = root.querySelector(".cz-cv"), out = root.querySelector(".cz-out");
      const orbit = n => { const o = [n]; while (n !== 1 && o.length < 1000) { n = n % 2 ? 3 * n + 1 : n / 2; o.push(n); } return o; };
      function run() {
        const n = +inp.value; root.querySelector("[data-o=n]").textContent = n; const o = orbit(n), mx = Math.max(...o);
        const { ctx, w: W, h: H } = canvas(cv, 170); ctx.clearRect(0, 0, W, H);
        ctx.strokeStyle = C.gold; ctx.lineWidth = 1.6; ctx.beginPath();
        o.forEach((v, i) => { const x = 10 + i / Math.max(1, o.length - 1) * (W - 20), y = H - 10 - Math.log(v) / Math.log(mx) * (H - 20); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); ctx.lineWidth = 1;
        let best = 1, bestLen = 0; for (let k = 1; k <= 200; k++) { const L = orbit(k).length; if (L > bestLen) { bestLen = L; best = k; } }
        out.innerHTML = `${n} reaches 1 after <span class="g">${o.length - 1}</span> steps, peaking at <span class="t">${mx.toLocaleString()}</span> (log scale above)\n${o.slice(0, 18).join(" → ")}${o.length > 18 ? " → …" : ""}\n<span class="d">longest below 200: n = ${best}, ${bestLen - 1} steps</span>`;
      }
      inp.addEventListener("input", run); run();
    }
  }, {
    kicker: "ACKERMANN 1928 · BEYOND LOOPS", title: "A computable function no for-loop can match",
    intro: "Functions built from for-loops with bounds fixed in advance (primitive recursive functions) can grow very fast, but Ackermann's function eventually outgrows every one of them — yet it is perfectly computable, by recursion.",
    html: `<table class="gk-table ak-t"></table>`,
    caveat: "A(m, n): A(0, n) = n + 1; A(m, 0) = A(m − 1, 1); A(m, n) = A(m − 1, A(m, n − 1)). Row 4 is already a tower of 2s; A(4, 2) has 19,729 digits.",
    init(root) {
      const t = root.querySelector(".ak-t");
      const val = (m, n) => m === 0 ? String(n + 1) : m === 1 ? String(n + 2) : m === 2 ? String(2 * n + 3) : m === 3 ? String(2 ** (n + 3) - 3) : (n === 0 ? "13" : n === 1 ? "65533" : n === 2 ? "2^65536 − 3 (19,729 digits)" : "2↑↑" + (n + 3) + " − 3");
      t.innerHTML = `<tr><th>A(m,n)</th>${[0, 1, 2, 3, 4].map(n => `<th>n=${n}</th>`).join("")}</tr>` +
        [0, 1, 2, 3, 4].map(m => `<tr><th>m=${m}</th>${[0, 1, 2, 3, 4].map(n => `<td class="${m === 4 ? "hl" : ""}">${val(m, n)}</td>`).join("")}</tr>`).join("");
    }
  }],
  chapters: [
    { icon: "🏛", title: "1928–1936 — what is an algorithm?", who: "David Hilbert & Wilhelm Ackermann 1928 · Alonzo Church · Alan Turing 1936",
      lead: "Hilbert asked for a mechanical procedure to decide the truth of any logical statement. To say 'no', someone first had to define 'mechanical procedure'.",
      formula: "computable = Turing-computable = λ-definable = general recursive      (Church–Turing thesis)",
      what: "Turing's machines, Church's λ-calculus and Gödel–Herbrand–Kleene recursive functions compute exactly the same functions. The Church–Turing thesis says these capture every effective procedure — a claim about the world, supported by the equivalence of every model since.",
      how: "A Turing machine is a finite rule table reading and writing symbols on an unbounded tape. A universal machine can simulate any other from its description — the idea behind the stored-program computer.",
      story: "Church published first (April 1936); Turing's paper, written independently as a 24-year-old at Cambridge, was more convincing about why the definition was right. Turing then went to Princeton to do his PhD with Church.",
      today: "The thesis grounds all of computer science; the Web of Computation, the companion map, grows out of this node." },
    { icon: "🏛", title: "1936 — the halting problem", who: "Alan Turing 1936 · Rice's theorem 1953",
      lead: "No program can decide, for every program and input, whether it will eventually stop.",
      formula: "if H decided halting, D(x) = 'loop forever if H(x, x) says halts' gives D(D) halts ⟺ D(D) doesn't",
      what: "Assume a halting decider H exists. Build D that, given a program x, does the opposite of what H predicts for x run on itself. Asking about D run on D is contradictory, so H cannot exist. Rice's theorem: every non-trivial property of what programs compute is undecidable.",
      how: "It is Cantor's diagonal argument again, applied to the list of all programs. Undecidability then spreads by reduction: if solving problem P would solve halting, P is undecidable too.",
      story: "Turing's result answered Hilbert's Entscheidungsproblem negatively, just as Gödel's theorem had answered his hope for a complete axiomatisation.",
      today: "It is why no tool can find every bug or prove every program correct, and why static analysers must sometimes answer 'don't know'." },
    { icon: "⚙️", title: "1944–1956 — degrees of unsolvability", who: "Emil Post 1944 · Stephen Kleene · Richard Friedberg & Albert Muchnik 1956–57",
      lead: "Some unsolvable problems are more unsolvable than others.",
      formula: "A ≤_T B: A is computable by a machine that may ask an oracle for B",
      what: "Turing reducibility orders problems by relative difficulty; its equivalence classes are the Turing degrees. The halting problem's degree 0′ sits above the computable degree 0, and the jump operation climbs forever: 0 < 0′ < 0″ < …",
      how: "Post asked (1944) whether there are computably enumerable problems strictly between 0 and 0′. Friedberg and Muchnik, independently, answered yes with the priority method, a delicate way of satisfying infinitely many conflicting requirements.",
      story: "Muchnik was a Moscow student and Friedberg an undergraduate at Harvard when they solved Post's problem; the priority method became the signature technique of the field.",
      today: "Degree theory is a mature, intricate subject; its ideas feed into reverse mathematics, algorithmic randomness and the complexity classes of computer science." },
    { icon: "🔥", title: "1955–1970 — undecidability everywhere", who: "Pyotr Novikov 1955 · William Boone 1958 · Davis, Putnam, Robinson & Matiyasevich 1970",
      lead: "Unsolvable problems turned up in the heart of classical mathematics: groups, topology, and Diophantine equations.",
      formula: "Hilbert's 10th problem: no algorithm decides whether P(x₁,…,xₙ) = 0 has an integer solution",
      what: "There is a finitely presented group whose word problem is undecidable (Novikov, Boone); deciding whether two 4-manifolds are homeomorphic is undecidable (Markov, 1958); and no algorithm decides solvability of Diophantine equations (MRDP, 1970).",
      how: "Each proof encodes Turing machines into the mathematical objects: group relations simulate machine steps; exponential growth encoded in a polynomial lets equations simulate computation.",
      story: "Julia Robinson worked on Hilbert's tenth problem for twenty years; Matiyasevich, aged 22, found the last step in 1970 and credited her hypothesis as the key.",
      today: "Undecidability results keep appearing — in dynamical systems, physics (the spectral gap problem, 2015) and matrix mortality — and remind us that some questions can only be answered case by case." }
  ],
  challenges: [
    "Find the starting number below 100 that takes the longest to reach 1. Now below 200 — the lab tells you.",
    "Compute A(2, 3) by hand from the recursive definition. How many calls does it take?",
    "Sketch why 'does this program ever print 42?' is undecidable, by reducing the halting problem to it."
  ],
  sources: [
    { type: "FOUNDATIONAL PAPER · 1936", title: "Alan Turing — On Computable Numbers, with an Application to the Entscheidungsproblem", note: "Turing machines and the halting problem.", url: "https://doi.org/10.1112/plms/s2-42.1.230" },
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — The Church–Turing Thesis", note: "What the thesis says and why it's believed.", url: SEP("church-turing") },
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — Computability and Complexity", note: "An overview of the theory.", url: SEP("computability") },
    { type: "PAPER · 2019", title: "Terence Tao — Almost all orbits of the Collatz map attain almost bounded values", note: "The strongest result on the 3n + 1 problem.", url: "https://arxiv.org/abs/1909.03562" },
    { type: "BOOK", title: "Michael Sipser — Introduction to the Theory of Computation", note: "The standard undergraduate text.", url: null }
  ]
});

/* ================================================================ TYPE THEORY */
register("type-theory", {
  kicker: "PROOFS AS PROGRAMS · ABOUT 20 MIN",
  hook: "Can a computer check a proof so carefully that you'd trust it more than a referee?",
  intro: "Type theory gives every object a type and reads propositions as types whose elements are proofs. Run on a computer, it becomes a proof assistant: you write a proof, and a small program checks every step down to the axioms. The lab is a miniature of Lean's Natural Number Game — prove 2 + 2 = 4 from the definitions of + alone.",
  timeline: [[1908, "Russell's types"], [1940, "Church: simple types"], [1969, "Curry–Howard"], [1972, "Martin-Löf"], [2009, "univalence"], [2024, "AlphaProof · FLT in Lean"]],
  labs: [{
    kicker: "THE NATURAL NUMBER GAME, IN MINIATURE", title: "Prove 2 + 2 = 4 by rewriting",
    intro: "Numbers are built from 0 and succ (+1): 1 = succ 0, 2 = succ 1, and so on. Addition is defined by two rules only: add_zero says a + 0 = a, and add_succ says a + succ b = succ (a + b). Apply rules until both sides are literally the same — then 'rfl' closes the goal.",
    html: `<div class="gk-chips nn-goals"></div>
      <div class="gk-out nn-goal" style="font-size:.85rem"></div>
      <div class="gk-row nn-btns"><button class="gk-ghost" data-r="num">unfold a numeral (n = succ (n−1))</button><button class="gk-ghost" data-r="succ">rw add_succ</button><button class="gk-ghost" data-r="zero">rw add_zero</button><button class="gk-ghost" data-r="rfl">rfl</button><button class="gk-ghost" data-r="undo">undo</button></div>
      <div class="gk-out nn-log"></div>`,
    caveat: "Every step here is a rewrite by a definition — exactly what Lean's kernel checks. But 0 + n = n for a general n can't be proved by rewriting alone: you need induction on n, the next level of the real game.",
    init(root) {
      const GOALS = ["1 + 1 = 2", "2 + 2 = 4", "0 + 3 = 3", "2 + 3 = 5"];
      const Z = { t: "z" }, S = a => ({ t: "s", a }), N = k => (k === 0 ? Z : { t: "n", k }), P = (a, b) => ({ t: "+", a, b });
      const parse = s => { const [l, r] = s.split("="); const side = x => { const p = x.trim().split("+").map(y => N(+y.trim())); return p.length === 2 ? P(p[0], p[1]) : p[0]; }; return [side(l), side(r)]; };
      const show = t => t.t === "z" ? "0" : t.t === "n" ? String(t.k) : t.t === "s" ? `succ (${show(t.a)})`.replace(/\(([0-9a-z]+)\)/, "$1") : `${show(t.a)} + ${show(t.b)}`;
      const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);
      // rewrite the leftmost-outermost match of a rule in the equation
      function rewrite(t, rule) {
        const tryHere = x => {
          if (rule === "num" && x.t === "n") return S(N(x.k - 1));
          if (rule === "succ" && x.t === "+" && x.b.t === "s") return S(P(x.a, x.b.a));
          if (rule === "zero" && x.t === "+" && x.b.t === "z") return x.a;
          return null;
        };
        const go = x => { const h = tryHere(x); if (h) return [h, true]; if (x.t === "s") { const [a, ok] = go(x.a); return [ok ? S(a) : x, ok]; } if (x.t === "+") { let [a, ok] = go(x.a); if (ok) return [P(a, x.b), true]; let [b, ok2] = go(x.b); return [ok2 ? P(x.a, b) : x, ok2]; } return [x, false]; };
        return go(t);
      }
      let goal, hist, log, cur = 1;
      const out = root.querySelector(".nn-goal"), lg = root.querySelector(".nn-log");
      function start(i) { cur = i; goal = parse(GOALS[i]); hist = []; log = []; root.querySelectorAll(".nn-goals .gk-chip").forEach((b, k) => b.classList.toggle("on", k === i)); draw(); }
      function draw(msg) {
        out.innerHTML = `⊢ <span class="g">${show(goal[0])}</span> = <span class="t">${show(goal[1])}</span>`;
        lg.innerHTML = (log.length ? log.map((l, i) => `${i + 1}. ${l}`).join("\n") : "Goal set. Try: unfold the numeral on the right, then use add_succ on the left.") + (msg ? "\n" + msg : "");
      }
      root.querySelector(".nn-goals").innerHTML = GOALS.map((g, i) => `<button class="gk-chip">${g}</button>`).join("");
      root.querySelectorAll(".nn-goals .gk-chip").forEach((b, i) => b.addEventListener("click", () => start(i)));
      root.querySelectorAll(".nn-btns [data-r]").forEach(b => b.addEventListener("click", () => {
        const r = b.dataset.r;
        if (r === "undo") { if (hist.length) { goal = hist.pop(); log.pop(); } draw(); return; }
        if (r === "rfl") { draw(eq(goal[0], goal[1]) ? `<span class="t">rfl ✓  Goal closed — Q.E.D.</span> Both sides are the same term.` : `<span class="r">rfl fails:</span> the two sides are not (yet) identical.`); return; }
        let [l, ok] = rewrite(goal[0], r), g2;
        if (ok) g2 = [l, goal[1]]; else { const [rr, ok2] = rewrite(goal[1], r); if (!ok2) { draw(`<span class="r">rw ${r === "num" ? "numeral" : "add_" + r} failed:</span> no matching subterm.`); return; } g2 = [goal[0], rr]; }
        hist.push(goal); goal = g2; log.push({ num: "unfold numeral", succ: "rw add_succ", zero: "rw add_zero" }[r] + "   ⊢ " + show(goal[0]) + " = " + show(goal[1])); draw();
      }));
      start(1);
    }
  }],
  chapters: [
    { icon: "🏛", title: "1908–1940 — types against paradox", who: "Bertrand Russell 1908 · Alonzo Church 1940",
      lead: "Russell's paradox comes from a set talking about itself. Give every object a level, and forbid mixing levels.",
      formula: "x : A,  f : A → B  ⊢  f x : B",
      what: "In a type theory every term has a type, and functions may only be applied to arguments of the right type. Self-application x x becomes ill-typed, so the paradoxes cannot even be stated.",
      how: "Church's simply typed λ-calculus (1940) has base types and function types; every well-typed program terminates. Richer systems — Girard's System F (1972), Coquand and Huet's Calculus of Constructions (1988) — add polymorphism and dependency while keeping strong normalisation.",
      story: "Russell and Whitehead built Principia Mathematica (1910–13) on a ramified theory of types; it was so cumbersome that 1 + 1 = 2 is only completed in volume II. Church's version was simple enough to last.",
      today: "Every statically typed programming language — Java, Rust, Haskell, TypeScript — descends from these ideas." },
    { icon: "🏛", title: "1969–1972 — propositions are types", who: "Haskell Curry 1934 · William Howard 1969 · Per Martin-Löf 1972",
      lead: "A proof of 'A implies B' is a program that turns proofs of A into proofs of B. Proving and programming are one activity.",
      formula: "A → B  ≈  function type      A ∧ B  ≈  pair      ∀x. P(x)  ≈  dependent function Π",
      what: "Under Curry–Howard, a proposition is the type of its proofs. Dependent types (Martin-Löf) let types mention values, so 'for every n there is a prime above n' is a type, and its elements are programs computing such primes.",
      how: "Type checking then is proof checking. Constructive logic is what you get: A ∨ ¬A has no general proof-program, because it would have to decide every question.",
      story: "Howard's note circulated in 1969 and was published only in 1980. Martin-Löf presented his intuitionistic type theory in the early 1970s as a foundation of constructive mathematics.",
      today: "Coq, Agda and Lean are dependently typed programming languages in which you can write mathematics — and every proof is a program the kernel checks." },
    { icon: "🔥", title: "2005–2024 — the age of formal proof", who: "Georges Gonthier · Thomas Hales · the Lean community · Kevin Buzzard",
      lead: "Big theorems, fully checked by computer: four colours, odd order, Kepler — and increasingly, current research.",
      formula: "kernel ⊢ proof term : statement      (trust the kernel, not the author)",
      what: "Proof assistants have verified the four colour theorem (2005), the Feit–Thompson odd order theorem (2012) and the Kepler conjecture (2014). Lean's mathlib is a single coherent library covering much of an undergraduate and graduate curriculum.",
      how: "Mathematicians write proofs with tactics that automate routine steps; the tiny trusted kernel re-checks the resulting proof term. Large projects split into thousands of lemmas that different people can formalise in parallel.",
      story: "In 2020 Peter Scholze challenged the community to check a hard theorem of his and Clausen's; the Liquid Tensor Experiment did so in Lean by 2022. Tao's team formalised the polynomial Freiman–Ruzsa proof in three weeks (2023).",
      today: "A formalisation of Fermat's Last Theorem began in 2024, and AI systems such as AlphaProof produce Lean proofs of olympiad problems — trustworthy because the kernel checks them." },
    { icon: "🔥", title: "2006–2013 — homotopy type theory", who: "Vladimir Voevodsky · Steve Awodey & Michael Warren · the IAS special year 2012–13",
      lead: "Read types as spaces and equalities as paths. Then 'isomorphic structures are equal' becomes an axiom: univalence.",
      formula: "(A ≃ B) ≃ (A = B)      the univalence axiom",
      what: "Identity types behave like path spaces; with univalence, equivalent types are equal, so every construction automatically respects isomorphism. Higher inductive types let you define spaces like the circle directly.",
      how: "The circle is a type with a point base and a path loop; from these rules one proves π₁(S¹) = ℤ in type theory (Licata and Shulman, 2013), checked by computer.",
      story: "Voevodsky, a Fields medallist in algebraic geometry, became alarmed by errors in published proofs — one of his own among them — and devoted his last decade to foundations that computers can check.",
      today: "Cubical type theory gives univalence a computational meaning, and homotopy type theory is a growing bridge between logic, topology and category theory." }
  ],
  challenges: [
    "Prove 2 + 2 = 4 in the fewest steps. (It can be done in about eight.)",
    "Prove 0 + 3 = 3. Now explain why 0 + n = n for a general n needs induction, not just rewriting.",
    "Write a program of type (A ∧ B) → (B ∧ A). What program proves A → (B → A)?"
  ],
  sources: [
    { type: "INTERACTIVE", title: "The Natural Number Game (Lean 4)", note: "The real game: prove the axioms of arithmetic in Lean, in your browser.", url: "https://adam.math.hhu.de/#/g/leanprover-community/nng4" },
    { type: "FREE BOOK · 2013", title: "Homotopy Type Theory: Univalent Foundations of Mathematics", note: "The collaborative 'HoTT Book' from the IAS special year.", url: "https://homotopytypetheory.org/book/" },
    { type: "PAPER · 2019", title: "The mathlib Community — The Lean Mathematical Library", note: "How a unified library of formal mathematics is built.", url: "https://arxiv.org/abs/1910.09336" },
    { type: "ESSAY", title: "Philip Wadler — Propositions as Types", note: "The best short account of Curry–Howard.", url: "https://homepages.inf.ed.ac.uk/wadler/papers/propositions-as-types/propositions-as-types.pdf" },
    { type: "ENCYCLOPEDIA", title: "Stanford Encyclopedia of Philosophy — Type Theory", note: "From Russell to Martin-Löf.", url: SEP("type-theory") }
  ]
});
})();
