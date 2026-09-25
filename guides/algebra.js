// ALGEBRA — field guides for Linear Algebra, Group Theory, Rings & Modules, Galois Theory,
// Commutative Algebra, Lie Theory, Representation Theory and Homological Algebra.
// Each registers with GuideKit (guide-kit.js) and opens when its field is clicked.
(function () {
"use strict";
const { register, canvas, C } = GuideKit;
const MT = s => "https://mathshistory.st-andrews.ac.uk/Biographies/" + s + "/";
const gcd = (a, b) => { a = Math.abs(a); b = Math.abs(b); while (b) [a, b] = [b, a % b]; return a; };
const isPrime = n => { if (n < 2) return false; for (let p = 2; p * p <= n; p++) if (n % p === 0) return false; return true; };
const factorInt = n => { const f = []; for (let p = 2; p * p <= n; p++) { let e = 0; while (n % p === 0) { n /= p; e++; } if (e) f.push([p, e]); } if (n > 1) f.push([n, 1]); return f; };
const SUP = s => String(s).replace(/[0-9-]/g, c => "⁰¹²³⁴⁵⁶⁷⁸⁹"[c] || "⁻");
const factorStr = n => factorInt(n).map(([p, e]) => e > 1 ? p + SUP(e) : p).join(" · ") || "1";
const HUES = [45, 175, 290, 0, 215, 110, 330, 25, 250, 140, 60, 195];
const hue = (i, a = 1) => `hsla(${HUES[i % HUES.length]}, 80%, 64%, ${a})`;

/* ================================================================ LINEAR ALGEBRA */
// exact fractions [num, den]
const Q = {
  n(a, b = 1) { if (b < 0) { a = -a; b = -b; } const g = gcd(a, b) || 1; return [a / g, b / g]; },
  add: (x, y) => Q.n(x[0] * y[1] + y[0] * x[1], x[1] * y[1]),
  sub: (x, y) => Q.n(x[0] * y[1] - y[0] * x[1], x[1] * y[1]),
  mul: (x, y) => Q.n(x[0] * y[0], x[1] * y[1]),
  div: (x, y) => Q.n(x[0] * y[1], x[1] * y[0]),
  s: x => x[1] === 1 ? String(x[0]).replace("-", "−") : `${x[0]}/${x[1]}`.replace("-", "−"),
  z: x => x[0] === 0, one: x => x[0] === 1 && x[1] === 1
};
const LA_SYS = {
  nine: { name: "Nine Chapters: grain", rows: [[3, 2, 1, 39], [2, 3, 1, 34], [1, 2, 3, 26]], note: "top, middle and low grade grain: bundles and their yield in dou" },
  unique: { name: "one solution", rows: [[1, 1, 1, 6], [0, 2, 5, -4], [2, 5, -1, 27]] },
  many: { name: "infinitely many", rows: [[1, 1, 1, 3], [1, 2, 3, 6], [2, 3, 4, 9]] },
  none: { name: "no solution", rows: [[1, 1, 1, 3], [1, 2, 3, 6], [2, 3, 4, 10]] }
};
function laSteps(rows) {
  const V = ["x", "y", "z"];
  let M = rows.map(r => r.map(v => Q.n(v)));
  const cl = () => M.map(r => r.slice());
  const out = [{ M: cl(), msg: "The augmented matrix [A | b]: one row per equation, one column per unknown.", row: -1, piv: null }];
  let r = 0; const piv = [];
  for (let c = 0; c < 3 && r < 3; c++) {
    let p = r; while (p < 3 && Q.z(M[p][c])) p++;
    if (p === 3) { out.push({ M: cl(), msg: `No pivot in the ${V[c]} column below row ${r}: ${V[c]} will be a free variable.`, row: -1, piv: null }); continue; }
    if (p !== r) { [M[p], M[r]] = [M[r], M[p]]; out.push({ M: cl(), msg: `Swap R${r + 1} ↔ R${p + 1} to get a nonzero pivot.`, row: r, piv: [r, c] }); }
    const pv = M[r][c];
    if (!Q.one(pv)) { M[r] = M[r].map(x => Q.div(x, pv)); out.push({ M: cl(), msg: `R${r + 1} ÷ ${Q.s(pv)} makes the pivot 1.`, row: r, piv: [r, c] }); }
    for (let i = 0; i < 3; i++) if (i !== r && !Q.z(M[i][c])) {
      const k = M[i][c]; M[i] = M[i].map((x, j) => Q.sub(x, Q.mul(k, M[r][j])));
      out.push({ M: cl(), msg: `R${i + 1} − (${Q.s(k)})·R${r + 1} clears ${V[c]} from row ${i + 1}.`, row: i, piv: [r, c] });
    }
    piv.push(c); r++;
  }
  const incons = M.some(row => row.slice(0, 3).every(Q.z) && !Q.z(row[3]));
  let verdict;
  if (incons) verdict = `<span class="r">No solution.</span> A row reads 0 = ${Q.s(M.find(row => row.slice(0, 3).every(Q.z) && !Q.z(row[3]))[3])}: rank A = ${piv.length} but rank [A|b] = ${piv.length + 1}. The three planes have no common point.`;
  else if (piv.length === 3) verdict = `<span class="t">Exactly one solution:</span> x = ${Q.s(M[0][3])}, y = ${Q.s(M[1][3])}, z = ${Q.s(M[2][3])}.  rank A = 3, so the map is invertible (det ≠ 0).`;
  else {
    const free = [0, 1, 2].filter(c => !piv.includes(c));
    const expr = piv.map((c, i) => {
      const terms = free.filter(f => !Q.z(M[i][f])).map(f => { const k = M[i][f], cs = Q.s(Q.n(Math.abs(k[0]), k[1])); return [k[0] > 0 ? "−" : "+", (cs === "1" ? "" : cs) + V[f]]; });
      const c0 = Q.z(M[i][3]) && terms.length ? "" : Q.s(M[i][3]);
      return `${V[c]} = ${c0}${terms.map(([sg, t], j) => !c0 && j === 0 ? (sg === "−" ? "−" : "") + t : ` ${sg} ${t}`).join("")}`;
    }).join(",  ");
    verdict = `<span class="g">Infinitely many solutions:</span> ${free.map(f => V[f]).join(", ")} free; ${expr}.  rank A = ${piv.length} = rank [A|b] < 3, so the solutions form a ${3 - piv.length === 1 ? "line" : "plane"} (rank + nullity = 3).`;
  }
  return { steps: out, verdict };
}
register("linear-algebra", {
  kicker: "MANY EQUATIONS AT ONCE · ABOUT 25 MIN",
  hook: "Why do three equations in three unknowns sometimes have one answer, sometimes none, and sometimes infinitely many?",
  intro: "Linear algebra is the mathematics of things you can add and scale: arrows, signals, polynomials, the pixels of an image. Its oldest problem is solving several linear equations together, and its oldest method is older than algebra itself. Chinese scholars eliminated unknowns on a counting board two thousand years ago; the same procedure, now called Gaussian elimination, runs inside almost every scientific computation on Earth. The lab performs it step by step with exact fractions.",
  timeline: [["1st c. CE", "Nine Chapters: elimination on a board"], [1683, "Seki: determinants"], [1810, "Gauss: elimination for Pallas"], [1844, "Grassmann: Ausdehnungslehre"], [1858, "Cayley: matrix algebra"], [1888, "Peano: vector space axioms"]],
  labs: [{
    kicker: "GAUSSIAN ELIMINATION · FANGCHENG", title: "Eliminate, one row operation at a time",
    intro: "Pick a system and press step. Each move swaps rows, scales a row, or subtracts a multiple of one row from another — none of which changes the solutions. When every pivot column is cleared, the answer, or the reason there is none, can be read off.",
    html: `<div class="gk-chips la-pre">${Object.entries(LA_SYS).map(([k, s]) => `<button class="gk-chip" data-k="${k}">${s.name}</button>`).join("")}</div>
      <table class="gk-table la-tab"></table>
      <div class="gk-out la-msg"></div>
      <div class="it-lab-actions"><button class="it-send la-step">step ▸</button><button class="gk-ghost la-all">solve all</button><button class="gk-ghost la-reset">reset</button></div>`,
    caveat: "Rank is the number of pivots. Solutions exist exactly when rank A = rank [A | b]; they are unique exactly when that rank is 3. The same procedure, arranged as the factorisation A = LU, is what the LINPACK benchmark times on the world's fastest computers.",
    init(root) {
      let key = "nine", st, i;
      const tab = root.querySelector(".la-tab"), msg = root.querySelector(".la-msg");
      const load = k => { key = k; st = laSteps(LA_SYS[k].rows); i = 0; root.querySelectorAll(".la-pre .gk-chip").forEach(b => b.classList.toggle("on", b.dataset.k === k)); draw(); };
      function draw() {
        const s = st.steps[i];
        tab.innerHTML = `<tr><th></th><th>x</th><th>y</th><th>z</th><th>b</th></tr>` + s.M.map((row, r) => `<tr><th>R${r + 1}</th>${row.map((v, c) =>
          `<td class="${s.piv && s.piv[0] === r && s.piv[1] === c ? "hl" : ""}" style="${c === 3 ? "border-left:2px solid rgba(245,196,81,.5)" : ""}${r === s.row ? ";color:#7fe3d6" : ""}">${Q.s(v)}</td>`).join("")}</tr>`).join("");
        const done = i === st.steps.length - 1;
        msg.innerHTML = `<span class="d">step ${i} / ${st.steps.length - 1}</span>  ${s.msg}${key === "nine" && i === 0 ? `\n<span class="d">${LA_SYS.nine.note}</span>` : ""}${done ? "\n\n" + st.verdict : ""}`;
        root.querySelector(".la-step").disabled = done;
      }
      root.querySelectorAll(".la-pre .gk-chip").forEach(b => b.addEventListener("click", () => load(b.dataset.k)));
      root.querySelector(".la-step").addEventListener("click", () => { if (i < st.steps.length - 1) { i++; draw(); } });
      root.querySelector(".la-all").addEventListener("click", () => { i = st.steps.length - 1; draw(); });
      root.querySelector(".la-reset").addEventListener("click", () => { i = 0; draw(); });
      load("nine");
    }
  }],
  chapters: [
    { icon: "🏛", title: "1st century CE — the Nine Chapters' counting board", who: "The Nine Chapters on the Mathematical Art, chapter 8 · commentary by Liu Hui, 263",
      lead: "Chinese mathematicians solved simultaneous linear equations by elimination, with negative numbers, some 1,700 years before Gauss.",
      formula: "3x + 2y + z = 39   ·   2x + 3y + z = 34   ·   x + 2y + 3z = 26",
      what: "Chapter 8, <b>fangcheng</b> ('rectangular arrays'), sets out each problem as columns of counting rods and eliminates unknowns by subtracting multiples of one column from another — Gaussian elimination, with the array turned on its side. To do it, the book introduced rules for negative numbers (red and black rods).",
      how: "The lab's first system is the chapter's opening problem: three grades of grain, bundles and yields. Cross-multiply to clear a coefficient, subtract, repeat, then back-substitute: the top grade yields 9¼ dou a bundle, the middle 4¼, the low 2¾.",
      story: "Liu Hui's commentary (263 CE) justified the rules. In Europe elimination appears in Newton's lecture notes (published 1707 as Arithmetica Universalis), and Gauss used it around 1810 to fit the orbit of the asteroid Pallas by least squares. The name 'Gaussian elimination' is a twentieth-century label.",
      today: "The same algorithm, organised as an LU factorisation, solves the linear systems inside weather forecasts, finite-element engineering and machine learning, and the TOP500 list ranks supercomputers by how fast they run it." },
    { icon: "⚙️", title: "1683–1858 — determinants, then matrices", who: "Seki Takakazu 1683 · Leibniz 1693 · Cramer 1750 · Cauchy 1812 · Sylvester 1850 · Cayley 1858",
      lead: "One number decides whether a square system has a unique solution; later the array itself became something you can multiply.",
      formula: "det [[a, b], [c, d]] = ad − bc      det(AB) = det A · det B",
      what: "The determinant is the factor by which a linear map scales volume, with a sign for orientation. It is nonzero exactly when the map is invertible — when elimination finds three pivots. Cayley's memoir of 1858 treated a matrix as a single quantity with its own non-commutative multiplication.",
      how: "Cramer's rule (1750) writes each unknown as a ratio of determinants; Cauchy proved the product rule in 1812. Sylvester coined 'matrix' in 1850 — Latin for womb — because determinants (minors) are born from it. The Cayley–Hamilton theorem says every square matrix satisfies its own characteristic polynomial.",
      story: "Seki in Japan (1683) and Leibniz in Hanover (1693) found determinants independently. Cayley stated Cayley–Hamilton after checking 2×2 and 3×3 cases, writing that he had not 'thought it necessary to undertake the labour of a formal proof'. Frobenius proved it in general in 1878.",
      today: "det is the product of the eigenvalues; the Jacobian determinant rescales integrals under a change of variables; and a determinant of zero is how software detects a singular, unsolvable system." },
    { icon: "🏛", title: "1844–1888 — vector spaces in the abstract", who: "Hermann Grassmann 1844 · Giuseppe Peano 1888 · Stefan Banach 1922",
      lead: "Grassmann saw that directed quantities of any dimension obey the same laws; Peano turned his vision into axioms.",
      formula: "dim ker T + rank T = dim V      (rank–nullity)",
      what: "A vector space is anything you can add and scale: arrows, polynomials, solutions of a linear differential equation, audio signals. Basis, dimension and rank are the same in all of them. In the lab, rank is the number of pivots, and the free variables number 3 − rank: the dimension of the solution set.",
      how: "Grassmann's Ausdehnungslehre (1844) introduced linear independence, dimension and the exterior (wedge) product of vectors. Peano's Calcolo geometrico (1888) gave the modern axioms of a vector space over ℝ.",
      story: "Grassmann was a schoolteacher in Stettin; his book was almost unreadable and almost unread. He turned to linguistics and became famous for Grassmann's law of Sanskrit and Greek phonology. Mathematicians recognised his algebra only after his death in 1877.",
      today: "Exterior algebra is the language of differential forms and of fermions in physics; vector spaces over the two-element field 𝔽₂ carry error-correcting codes; word embeddings put language into vector spaces of a few hundred dimensions." },
    { icon: "🔥", title: "1829–today — eigenvalues everywhere", who: "Cauchy 1829 · Hilbert 1904 · Francis & Kublanovskaya 1961 (QR algorithm) · Brin & Page 1998",
      lead: "The directions a map merely stretches reveal what it really does.",
      formula: "A v = λ v      det(A − λI) = 0",
      what: "An eigenvector is a direction the map sends to itself, stretched by the eigenvalue λ. A symmetric real matrix has real eigenvalues and perpendicular eigenvectors (the spectral theorem), so in the right basis it is just a list of independent stretches.",
      how: "Nobody computes eigenvalues by solving det(A − λI) = 0; it is numerically unstable. The QR algorithm (Francis and Kublanovskaya, 1961) factors A = QR, forms RQ, and repeats; the matrix converges to triangular form with the eigenvalues on the diagonal.",
      story: "Cauchy proved in 1829 that symmetric matrices have real eigenvalues, while classifying quadric surfaces. The prefix 'eigen' comes from Hilbert's work on integral equations (1904). In 2000 the QR algorithm was named one of the ten most important algorithms of the twentieth century.",
      today: "Google's PageRank is the leading eigenvector of the web's link matrix; principal component analysis, the vibration modes of a bridge and the energy levels of an atom are all eigenvalue problems." }
  ],
  challenges: [
    "In the Nine Chapters system, change the 39 to 40. Every answer changes — by exactly one column of A⁻¹. Which column?",
    "Change one number to turn 'infinitely many' into 'no solution'. What does that do to the three planes?",
    "Why can three linear equations in three unknowns never have exactly two solutions?"
  ],
  sources: [
    { type: "FREE TEXTBOOK", title: "Jim Hefferon — Linear Algebra", note: "Free, careful, with worked answers; starts from elimination.", url: "https://hefferon.net/linearalgebra/" },
    { type: "VIDEO SERIES", title: "3Blue1Brown — Essence of linear algebra", note: "The geometric picture: maps, determinants as areas, eigenvectors.", url: "https://www.3blue1brown.com/topics/linear-algebra" },
    { type: "COURSE", title: "Gilbert Strang — MIT 18.06 Linear Algebra", note: "The classic lectures, with elimination and the four subspaces.", url: "https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/" },
    { type: "TEXTBOOK", title: "Sheldon Axler — Linear Algebra Done Right", note: "The determinant-free approach; the fourth edition is open access.", url: "https://linear.axler.net/" },
    { type: "BIOGRAPHY", title: "MacTutor — Hermann Grassmann", note: "The schoolteacher who invented vector spaces.", url: MT("Grassmann") }
  ]
});

/* ================================================================ GROUP THEORY */
register("group-theory", {
  kicker: "THE MATHEMATICS OF SYMMETRY · ABOUT 25 MIN",
  hook: "Why must the size of a subgroup divide the size of the whole group?",
  intro: "A group is a collection of reversible moves that can be combined: the symmetries of a triangle, the shuffles of a deck, the turns of a Rubik's cube, the hours on a clock. Lagrange found the first theorem about them in 1771 while studying equations; Galois named them; Cayley made them abstract; and a hundred mathematicians spent fifty years classifying the finite simple groups, the atoms of all finite symmetry. The lab shows Lagrange's theorem in clock arithmetic.",
  timeline: [[1771, "Lagrange: permuting roots"], [1832, "Galois: groups"], [1854, "Cayley: abstract groups"], [1872, "Sylow's theorems"], [1963, "Feit–Thompson"], [2004, "simple groups classified"]],
  labs: [{
    kicker: "LAGRANGE 1771 · COSETS", title: "Subgroups tile the group",
    intro: "The dots are the elements of a clock group. Choose a generator g: the gold star is the subgroup ⟨g⟩ it generates, and every other colour is a coset — a shifted copy of it. The copies never overlap and all have the same size, so the size of ⟨g⟩ divides the size of the group.",
    html: `<div class="gk-chips gt-mode"><button class="gk-chip on" data-m="+">(ℤₙ, +) adding on a clock</button><button class="gk-chip" data-m="×">(ℤₙˣ, ×) multiplying units</button></div>
      <div class="it-control"><label><span>n (clock size)</span><output data-o="n">12</output></label><input type="range" data-i="n" min="2" max="36" value="12"></div>
      <div class="it-control"><label><span>generator g</span><output data-o="g">3</output></label><input type="range" data-i="g" min="0" max="11" value="3"></div>
      <canvas class="gk-canvas gt-cv"></canvas>
      <div class="gk-out gt-out"></div>`,
    caveat: "The converse of Lagrange's theorem is false: the rotations of a tetrahedron form a group of 12 elements (A₄) with no subgroup of order 6. Sylow's theorems (1872) rescue it for prime powers.",
    init(root) {
      let mode = "+";
      const nI = root.querySelector("[data-i=n]"), gI = root.querySelector("[data-i=g]"), out = root.querySelector(".gt-out"), cv = root.querySelector(".gt-cv");
      function draw() {
        const n = +nI.value; gI.max = n - 1;
        let g = +gI.value;
        const els = mode === "+" ? [...Array(n).keys()] : [...Array(n).keys()].filter(u => gcd(u, n) === 1);
        if (mode === "×" && gcd(g, n) !== 1) { g = els.reduce((b, u) => Math.abs(u - g) < Math.abs(b - g) ? u : b, els[0]); gI.value = g; }
        root.querySelector("[data-o=n]").textContent = n; root.querySelector("[data-o=g]").textContent = g;
        const op = mode === "+" ? (a, b) => (a + b) % n : (a, b) => (a * b) % n, id = mode === "+" ? 0 : 1 % n;
        const H = [id]; for (let x = op(id, g); x !== id && H.length <= n; x = op(x, g)) H.push(x);
        const cos = [], seen = new Set();
        for (const a of els) if (!seen.has(a)) { const c = H.map(h => op(a, h)); c.forEach(x => seen.add(x)); cos.push(c); }
        const cosOf = {}; cos.forEach((c, i) => c.forEach(x => cosOf[x] = i));
        const { ctx, w, h } = canvas(cv, 250);
        const cx = w / 2, cy = h / 2, R = Math.min(w, h) / 2 - 22, P = k => [cx + R * Math.sin(2 * Math.PI * k / n), cy - R * Math.cos(2 * Math.PI * k / n)];
        ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
        cos.forEach((c, i) => {
          if (c.length < 2) return;
          ctx.strokeStyle = i === 0 ? C.gold : hue(i, .45); ctx.lineWidth = i === 0 ? 2 : 1;
          ctx.beginPath(); c.forEach((x, j) => { const [px, py] = P(x); j ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.closePath(); ctx.stroke();
        });
        for (let k = 0; k < n; k++) {
          const [px, py] = P(k), inG = cosOf[k] !== undefined;
          ctx.fillStyle = !inG ? "rgba(255,255,255,.14)" : cosOf[k] === 0 ? C.gold : hue(cosOf[k]);
          ctx.beginPath(); ctx.arc(px, py, inG ? 5.5 : 3, 0, 7); ctx.fill();
          if (n <= 24) { ctx.fillStyle = inG ? "#e8e4f4" : "#6e6789"; ctx.font = "10px IBM Plex Mono"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
            const [lx, ly] = [cx + (R + 13) * Math.sin(2 * Math.PI * k / n), cy - (R + 13) * Math.cos(2 * Math.PI * k / n)]; ctx.fillText(k, lx, ly); }
        }
        const G = els.length, name = mode === "+" ? `ℤ${n}` : `ℤ${n}ˣ`;
        out.innerHTML = `|${name}| = ${G}${mode === "×" ? "   (the units: numbers coprime to " + n + ", φ(" + n + ") of them)" : ""}\n` +
          `<span class="g">⟨${g}⟩ = {${H.join(", ")}}</span>   order ${H.length}\n` +
          `${cos.length} coset${cos.length > 1 ? "s" : ""} × ${H.length} elements = ${G}   ⇒   ${H.length} divides ${G}\n` +
          (H.length === G ? `<span class="t">${g} generates the whole group — it is cyclic.</span>` : `<span class="d">cosets: ${cos.slice(1, 5).map(c => "{" + c.join(",") + "}").join(" ")}${cos.length > 5 ? " …" : ""}</span>`) +
          (mode === "×" ? `\n<span class="d">so ${g}^${G} ≡ 1 (mod ${n}) — Euler's theorem is Lagrange's theorem.</span>` : "");
      }
      root.querySelectorAll(".gt-mode .gk-chip").forEach(b => b.addEventListener("click", () => {
        mode = b.dataset.m; root.querySelectorAll(".gt-mode .gk-chip").forEach(x => x.classList.toggle("on", x === b));
        if (mode === "×" && +gI.value < 2) gI.value = 2; draw();
      }));
      nI.addEventListener("input", draw); gI.addEventListener("input", draw); draw();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1770–1832 — from equations to groups", who: "Joseph-Louis Lagrange 1771 · Paolo Ruffini 1799 · Augustin Cauchy 1815 · Évariste Galois 1832",
      lead: "Groups were born as the permutations of the roots of polynomial equations.",
      formula: "|G| = [G : H] · |H|",
      what: "Lagrange's 'Réflexions sur la résolution algébrique des équations' (1770–71) asked how an expression in the roots changes when the roots are permuted; the number of different values it takes divides the number of permutations — the seed of Lagrange's theorem. Galois (1832) gathered the permutations that preserve every relation among the roots and called the collection a <b>group</b>.",
      how: "A group needs an associative operation, an identity, and inverses. The left cosets gH of a subgroup H all have |H| elements and never overlap, so they tile G — the lab's colours.",
      story: "Galois died after a duel at twenty in May 1832; Liouville published his memoir in 1846. Cauchy wrote long papers on permutation groups in 1815 and 1844–46, which gave the subject its first theorems.",
      today: "Symmetry in physics is group theory: the Standard Model's gauge group is SU(3) × SU(2) × U(1), and the 230 crystallographic space groups (Fedorov and Schoenflies, 1891) classify every crystal." },
    { icon: "⚙️", title: "1854–1882 — abstraction: Cayley, Jordan, Dyck", who: "Arthur Cayley 1854 · Camille Jordan 1870 · Walther von Dyck 1882",
      lead: "A group can be anything that composes like symmetries, and is determined by its multiplication table.",
      formula: "D₄ = ⟨ r, s | r⁴ = s² = 1, srs = r⁻¹ ⟩",
      what: "Cayley (1854) defined a group by its table and proved that every group is a group of permutations — of its own elements. Dyck (1882) described groups by generators and relations, like the presentation above for the eight symmetries of a square. Quotients G/N collapse a normal subgroup to the identity.",
      how: "Jordan's Traité des substitutions (1870) was the first book on groups; it introduced composition series. The isomorphism theorems took their modern shape with Emmy Noether in 1927.",
      story: "Cayley's 1854 paper was ahead of its time; abstract groups caught on only in the 1880s with Frobenius, Hölder and Dyck. Klein's Erlangen programme (1872) proposed that a geometry is the study of what a group of transformations leaves unchanged.",
      today: "Presentations lead to geometric group theory (on this map) and to a surprise: Novikov (1955) and Boone (1959) showed there is no algorithm that decides whether a word in a finitely presented group equals the identity." },
    { icon: "🏛", title: "1872 — Sylow's theorems: the prime-power pieces", who: "Ludwig Sylow 1872 · Georg Frobenius 1887",
      lead: "Lagrange's converse fails in general, but for prime powers it holds: if pᵏ divides |G|, then G has a subgroup of order pᵏ.",
      formula: "|G| = pᵏm, p ∤ m   ⇒   n_p ≡ 1 (mod p) and n_p | m",
      what: "The Sylow theorems: subgroups of order pᵏ (the largest power of p dividing |G|) exist, are all conjugate, and their number n_p is 1 more than a multiple of p and divides m. Counting with them classifies small groups: every group of order 15 is cyclic, because n₃ = n₅ = 1.",
      how: "The modern proofs let G act on a set — its subsets, or the cosets of a subgroup — and count orbits modulo p. Group actions and orbit-counting (Burnside's lemma) also count necklaces, colourings and chemical isomers.",
      story: "Sylow was a schoolteacher in Halden, Norway, for most of his career; with Sophus Lie he edited the collected works of Abel (1881). He became a professor in Christiania only at 65.",
      today: "The Sylow theorems are the first tool in every classification of finite groups, and computer algebra systems such as GAP compute Sylow subgroups of permutation groups with millions of elements." },
    { icon: "🔥", title: "1832–2004 — the atoms: finite simple groups", who: "Galois (A₅) · Jordan & Hölder 1889 · Feit & Thompson 1963 · Griess 1982 · Aschbacher & Smith 2004",
      lead: "Every finite group is built from simple groups, and all of them are now known.",
      formula: "18 infinite families + 26 sporadic groups;   |Monster| ≈ 8.08 × 10⁵³",
      what: "A simple group has no normal subgroups except the trivial one and itself. By the Jordan–Hölder theorem every finite group has a composition series whose simple factors are unique, like a prime factorisation. The classification: cyclic groups of prime order, alternating groups Aₙ (n ≥ 5), groups of Lie type, and 26 sporadic exceptions, the largest being the Monster with 808,017,424,794,512,875,886,459,904,961,710,757,005,754,368,000,000,000 elements.",
      how: "The Feit–Thompson theorem (1963, 255 pages) — every group of odd order is solvable — opened the way. The whole proof is spread over some 10,000 pages in hundreds of papers by about a hundred authors, from the 1950s to Aschbacher and Smith's quasithin volumes of 2004.",
      story: "Fischer and Griess predicted the Monster in 1973; Griess built it by hand in 1982 as the symmetries of a 196,883-dimensional algebra. McKay noticed that 196,884 = 196,883 + 1 is a coefficient of the j-function from number theory — 'monstrous moonshine', proved by Borcherds (Fields Medal 1998).",
      today: "A streamlined 'second-generation' proof is still being published, and the Feit–Thompson theorem was checked completely by computer in the Coq proof assistant in 2012." }
  ],
  challenges: [
    "In (ℤ₁₂, +), find every g that generates the whole group. What do they have in common with 12?",
    "In the multiplicative mode with n = 7, find a g that generates all six units (a primitive root). Now try n = 8 — why is there none?",
    "Is there an n where the number of cosets is always 1 or n, whatever g you pick (other than 0)? What kind of number is it?"
  ],
  sources: [
    { type: "FREE TEXTBOOK", title: "Thomas Judson — Abstract Algebra: Theory and Applications", note: "Free and open; groups, cosets and Lagrange from the start.", url: "http://abstract.ups.edu/" },
    { type: "SOFTWARE", title: "Group Explorer", note: "Visualise groups as Cayley diagrams, multiplication tables and cycle graphs.", url: "https://nathancarter.github.io/group-explorer/" },
    { type: "SURVEY", title: "Michael Aschbacher — The status of the classification of the finite simple groups (Notices AMS, 2004)", note: "What was proved, by whom, and what remained.", url: "https://www.ams.org/notices/200407/fea-aschbacher.pdf" },
    { type: "BOOK", title: "Mark Ronan — Symmetry and the Monster", note: "The classification told as a story, for general readers (Oxford, 2006).", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Évariste Galois", note: "The life behind the word 'group'.", url: MT("Galois") }
  ]
});

/* ================================================================ RINGS & MODULES */
const gfmt = (a, b) => { if (b === 0) return String(a).replace("-", "−"); const bi = Math.abs(b) === 1 ? "i" : Math.abs(b) + "i";
  if (a === 0) return (b < 0 ? "−" : "") + bi; return `${a}`.replace("-", "−") + (b < 0 ? " − " : " + ") + bi; };
const gdiv = (a, b, c, d) => { const N = c * c + d * d, re = a * c + b * d, im = b * c - a * d; return re % N === 0 && im % N === 0 ? [re / N, im / N] : null; };
const isGP = (a, b) => (a === 0 || b === 0) ? (() => { const n = Math.abs(a + b); return isPrime(n) && n % 4 === 3; })() : isPrime(a * a + b * b);
function gfactor(a, b) {
  const fs = []; let za = a, zb = b;
  for (const [p] of factorInt(a * a + b * b)) {
    let cands;
    if (p === 2) cands = [[1, 1]];
    else if (p % 4 === 3) cands = [[p, 0]];
    else { let x = 1; while (!Number.isInteger(Math.sqrt(p - x * x))) x++; const y = Math.sqrt(p - x * x); cands = [[Math.max(x, y), Math.min(x, y)], [Math.max(x, y), -Math.min(x, y)]]; }
    for (const [pa, pb] of cands) { let e = 0, q; while ((q = gdiv(za, zb, pa, pb))) { [za, zb] = q; e++; } if (e) fs.push([pa, pb, e]); }
  }
  return { u: [za, zb], fs };
}
// ℤ[√−d]
function qring(d) {
  const fmt = ([a, b]) => { const s = d === 1 ? "i" : `√−${d}`; if (b === 0) return String(a).replace("-", "−");
    const bs = (Math.abs(b) === 1 ? "" : Math.abs(b)) + s; if (a === 0) return (b < 0 ? "−" : "") + bs; return `${a}`.replace("-", "−") + (b < 0 ? "−" : "+") + bs; };
  const N = ([a, b]) => a * a + d * b * b;
  const div = ([a, b], [c, e]) => { const n = c * c + d * e * e, re = a * c + d * b * e, im = b * c - a * e; return re % n === 0 && im % n === 0 ? [re / n, im / n] : null; };
  const units = d === 1 ? [[1, 0], [0, 1], [-1, 0], [0, -1]] : [[1, 0], [-1, 0]];
  const mul = ([a, b], [c, e]) => [a * c - d * b * e, a * e + b * c];
  const canon = x => units.map(u => mul(x, u)).sort((p, q) => q[0] - p[0] || q[1] - p[1])[0];
  const ofNorm = m => { const r = []; for (let b = 0; d * b * b <= m; b++) { const a = Math.sqrt(m - d * b * b); if (Number.isInteger(a)) for (const sa of a ? [a, -a] : [0]) for (const sb of b ? [b, -b] : [0]) r.push([sa, sb]); } return r; };
  const divisors = x => { const n = N(x), r = []; for (let m = 2; m < n; m++) if (n % m === 0) for (const y of ofNorm(m)) if (div(x, y)) r.push(y); return r; };
  const irred = x => divisors(x).length === 0;
  const memo = new Map();
  function facts(x) {
    const k = canon(x) + ""; if (memo.has(k)) return memo.get(k);
    let res;
    if (irred(x)) res = [[canon(x)]];
    else {
      const seen = new Map();
      for (const y of divisors(x)) if (irred(y)) for (const f of facts(div(x, y))) {
        const L = [canon(y), ...f].sort((p, q) => q[0] - p[0] || q[1] - p[1]); seen.set(L.map(String).join("|"), L);
      }
      res = [...seen.values()];
    }
    memo.set(k, res); return res;
  }
  return { fmt, N, facts, ofNorm, irred };
}
register("ring-theory", {
  kicker: "ARITHMETIC, GENERALISED · ABOUT 25 MIN",
  hook: "Can a number break into primes in two genuinely different ways?",
  intro: "A ring is anywhere you can add, subtract and multiply: the integers, polynomials, matrices, the Gaussian integers a + bi. The question that forged the subject was unique factorisation. It holds in ℤ and in the Gaussian integers, and fails in ℤ[√−5], where 6 = 2 · 3 = (1 + √−5)(1 − √−5). Kummer rescued it with 'ideal numbers', Dedekind turned those into ideals, and Emmy Noether made the whole theory abstract. The labs factor in both kinds of ring.",
  timeline: [[-300, "Euclid's lemma"], [1801, "Gauss: unique factorisation"], [1832, "Gauss: the integers ℤ[i]"], [1847, "Kummer: ideal numbers"], [1871, "Dedekind: ideals"], [1921, "Noether: abstract rings"]],
  labs: [{
    kicker: "GAUSS 1832 · ℤ[i]", title: "The Gaussian primes",
    intro: "Every lattice point a + bi is a Gaussian integer. Gold dots are Gaussian primes. Click any point to factor it; the chips pick ordinary primes. Watch which ordinary primes break apart and which stay whole.",
    html: `<div class="gk-chips gi-pre">${[2, 3, 5, 7, 11, 13, 17, 29].map(p => `<button class="gk-chip" data-p="${p}">${p}</button>`).join("")}</div>
      <div class="it-control"><label><span>window radius</span><output data-o="R">10</output></label><input type="range" data-i="R" min="5" max="18" value="10"></div>
      <canvas class="gk-canvas gi-cv" style="cursor:crosshair"></canvas>
      <div class="gk-out gi-out"></div>`,
    caveat: "An odd prime p splits as (a + bi)(a − bi) exactly when p = a² + b², which happens exactly when p ≡ 1 (mod 4) — Fermat's two-square theorem, proved by Euler in 1749. ℤ[i] has division with remainder, so factorisation is unique up to the units ±1, ±i.",
    init(root) {
      const cv = root.querySelector(".gi-cv"), out = root.querySelector(".gi-out"), RI = root.querySelector("[data-i=R]");
      let sel = [5, 0], geo = null;
      function draw() {
        const R = +RI.value; root.querySelector("[data-o=R]").textContent = R;
        const { ctx, w, h } = canvas(cv, 280), s = Math.min(w, h) / (2 * R + 1), cx = w / 2, cy = h / 2;
        geo = { s, cx, cy, R };
        ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
        const Rx = Math.floor((w / 2) / s);
        const f = gfactor(sel[0], sel[1]);
        const divs = new Set(f.fs.map(([a, b]) => a + "," + b));
        for (let a = -Rx; a <= Rx; a++) for (let b = -R; b <= R; b++) {
          const x = cx + a * s, y = cy - b * s, gp = isGP(a, b), unit = a * a + b * b === 1;
          ctx.fillStyle = gp ? C.gold : unit ? C.teal : "rgba(255,255,255,.18)";
          ctx.beginPath(); ctx.arc(x, y, gp ? Math.max(2, s * .22) : unit ? s * .2 : 1.3, 0, 7); ctx.fill();
          if (divs.has(a + "," + b)) { ctx.strokeStyle = C.green; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, s * .42, 0, 7); ctx.stroke(); }
        }
        const [sa, sb] = sel; ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx + sa * s, cy - sb * s, s * .5, 0, 7); ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,.18)"; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(cx, cy, Math.hypot(sa, sb) * s, 0, 7); ctx.stroke(); ctx.setLineDash([]);
        const N = sa * sa + sb * sb;
        if (N === 0) { out.innerHTML = "0 is divisible by everything; pick another point."; return; }
        const [ua, ub] = f.u, u = gfmt(ua, ub);
        const body = f.fs.map(([a, b, e]) => `(${gfmt(a, b)})${e > 1 ? SUP(e) : ""}`).join(" · ");
        const prime = isGP(sa, sb);
        out.innerHTML = `z = ${gfmt(sa, sb)}     norm N(z) = ${sa}² + ${sb}² = ${N} = ${factorStr(N)}\n` +
          (N === 1 ? `<span class="t">a unit</span> — it divides everything, like ±1 in ℤ.` :
          `<span class="g">${gfmt(sa, sb)} = ${u === "1" ? "" : u === "−1" ? "−" : u + " · "}${body}</span>\n` +
          (prime ? `<span class="t">a Gaussian prime.</span>` : `<span class="d">green rings mark the prime factors (up to units ±1, ±i).</span>`) +
          (sb === 0 && isPrime(Math.abs(sa)) ? `\n${Math.abs(sa)} ≡ ${Math.abs(sa) % 4} (mod 4): ${Math.abs(sa) === 2 ? "2 = −i(1 + i)² — it ramifies." : Math.abs(sa) % 4 === 1 ? "it splits into two conjugate primes." : "it stays prime in ℤ[i]."}` : ""));
      }
      cv.addEventListener("click", e => {
        const r = cv.getBoundingClientRect(), { s, cx, cy } = geo;
        sel = [Math.round((e.clientX - r.left - cx) / s), Math.round((cy - (e.clientY - r.top)) / s)];
        root.querySelectorAll(".gi-pre .gk-chip").forEach(b => b.classList.remove("on")); draw();
      });
      root.querySelectorAll(".gi-pre .gk-chip").forEach(b => b.addEventListener("click", () => {
        sel = [+b.dataset.p, 0]; if (+RI.value < +b.dataset.p + 1) RI.value = Math.min(18, +b.dataset.p + 1);
        root.querySelectorAll(".gi-pre .gk-chip").forEach(x => x.classList.toggle("on", x === b)); draw();
      }));
      RI.addEventListener("input", draw); draw();
    }
  }, {
    kicker: "KUMMER 1847 · ℤ[√−5]", title: "Where unique factorisation fails",
    intro: "Choose a ring ℤ[√−d] and an ordinary number n. The lab finds every way to write n as a product of irreducibles — elements that cannot be split further — ignoring order and signs.",
    html: `<div class="gk-chips qr-d">${[1, 2, 5, 6].map(d => `<button class="gk-chip${d === 5 ? " on" : ""}" data-d="${d}">ℤ[√−${d}]${d === 1 ? " = ℤ[i]" : ""}</button>`).join("")}</div>
      <div class="gk-chips qr-n">${[6, 9, 10, 14, 21, 26, 30].map(n => `<button class="gk-chip${n === 6 ? " on" : ""}" data-n="${n}">${n}</button>`).join("")}</div>
      <div class="it-control"><label><span>or any n</span><output data-o="n">6</output></label><input type="range" data-i="n" min="2" max="80" value="6"></div>
      <div class="gk-out qr-out"></div>`,
    caveat: "Norms multiply: N(αβ) = N(α)N(β), with N(a + b√−5) = a² + 5b². Nothing in ℤ[√−5] has norm 2 or 3, so 2, 3 and 1 ± √−5 (norms 4, 9, 6, 6) cannot be split — two honest, different factorisations of 6.",
    init(root) {
      let d = 5; const nI = root.querySelector("[data-i=n]"), out = root.querySelector(".qr-out");
      function run() {
        const n = +nI.value; root.querySelector("[data-o=n]").textContent = n;
        root.querySelectorAll(".qr-n .gk-chip").forEach(b => b.classList.toggle("on", +b.dataset.n === n));
        const Rg = qring(d), fs = Rg.facts([n, 0]);
        const norms = []; for (let m = 1; m <= 30; m++) if (Rg.ofNorm(m).length) norms.push(m);
        const missing = [2, 3, 5, 7, 11, 13].filter(m => !norms.includes(m));
        out.innerHTML = `ring ℤ[√−${d}]   norm N(a + b√−${d}) = a² + ${d === 1 ? "" : d}b²\n` +
          `norms up to 30 that occur: ${norms.join(" ")}\n` + (missing.length ? `<span class="d">no element has norm ${missing.join(", ")}</span>\n` : "") + "\n" +
          fs.map(f => `<span class="${fs.length > 1 ? "g" : "t"}">${n} = ${f.map(x => x[1] ? "(" + Rg.fmt(x) + ")" : Rg.fmt(x)).join(" · ")}</span>   <span class="d">norms ${f.map(Rg.N).join(" · ")}</span>`).join("\n") +
          (fs.length > 1 ? `\n\n<span class="r">${fs.length} different factorisations into irreducibles.</span> Kummer's fix: factor ideals, not numbers.` :
            `\n\n<span class="t">Only one factorisation</span>${d <= 2 ? ` — ℤ[√−${d}] has division with remainder, so it is a unique factorisation domain.` : " for this n; try another."}`);
      }
      root.querySelectorAll(".qr-d .gk-chip").forEach(b => b.addEventListener("click", () => { d = +b.dataset.d; root.querySelectorAll(".qr-d .gk-chip").forEach(x => x.classList.toggle("on", x === b)); run(); }));
      root.querySelectorAll(".qr-n .gk-chip").forEach(b => b.addEventListener("click", () => { nI.value = b.dataset.n; run(); }));
      nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "c. 300 BCE–1801 — unique factorisation in ℤ", who: "Euclid, Elements VII.30 · Carl Friedrich Gauss, Disquisitiones Arithmeticae 1801",
      lead: "Every whole number is a product of primes in essentially one way — a fact so familiar that it hides how special it is.",
      formula: "p | ab   ⇒   p | a  or  p | b      (Euclid's lemma)",
      what: "Existence of a prime factorisation is easy; uniqueness rests on Euclid's lemma, which rests on division with remainder. That is the ladder <b>Euclidean ⇒ principal ideal domain ⇒ unique factorisation domain</b>: division gives gcds, gcds give Euclid's lemma, and Euclid's lemma gives uniqueness.",
      how: "Division with remainder gives the Euclidean algorithm and Bézout's identity gcd(a, b) = ax + by. If p divides ab but not a, then 1 = px + ay, so b = pbx + aby is a multiple of p.",
      story: "Euclid proved the lemma but never stated the uniqueness theorem in full; Gauss did, in 1801, and saw that it needed proof. In 1832 he extended the whole theory to the Gaussian integers ℤ[i] to study biquadratic reciprocity.",
      today: "RSA relies on factoring being hard, yet unique factorisation is what makes the answer well defined. Polynomials over a field factor uniquely too, which is why computer algebra can factor them." },
    { icon: "🔥", title: "1847 — the failure, and Kummer's ideal numbers", who: "Gabriel Lamé & Augustin Cauchy 1847 · Ernst Kummer 1844–47",
      lead: "A claimed proof of Fermat's Last Theorem collapsed because factorisation is not unique in every ring.",
      formula: "6 = 2 · 3 = (1 + √−5)(1 − √−5)",
      what: "In ℤ[√−5] the four numbers 2, 3, 1 + √−5, 1 − √−5 are all irreducible (lab 2), so 6 has two different factorisations. The same failure happens in the rings of cyclotomic integers used to attack xᵖ + yᵖ = zᵖ.",
      how: "Kummer invented 'ideal numbers' — phantom prime factors that restore uniqueness — and with them proved Fermat's Last Theorem for every 'regular' prime exponent (1850), including all primes below 37.",
      story: "On 1 March 1847 Lamé announced to the Paris Academy a proof of Fermat's Last Theorem that factored xⁿ + yⁿ over cyclotomic integers. Liouville objected that uniqueness had been assumed. In May, Liouville read out a letter from Kummer: he had shown in 1844 that uniqueness fails (first for p = 23).",
      today: "The failure is measured by the class group; its size, the class number, is one of number theory's central invariants. ℤ[√−5] has class number 2 — the smallest possible failure." },
    { icon: "⚙️", title: "1871 — Dedekind's ideals", who: "Richard Dedekind 1871 · David Hilbert's Zahlbericht 1897",
      lead: "Replace ideal numbers by sets of numbers — ideals — and factorisation becomes unique again.",
      formula: "(6) = (2, 1 + √−5)² · (3, 1 + √−5) · (3, 1 − √−5)",
      what: "An ideal is a subset closed under addition and under multiplication by anything in the ring — all the multiples of one element, or of several. In the rings of integers of number fields (Dedekind domains), every nonzero ideal factors uniquely into prime ideals.",
      how: "The ideal P = (2, 1 + √−5) is not generated by any single element, but P² = (2). The two factorisations of 6 are two ways of grouping the same four prime ideals.",
      story: "Dedekind published ideals as Supplement X to the 1871 edition of Dirichlet's lectures on number theory, which he edited. Emmy Noether used to tell her students: 'Es steht alles schon bei Dedekind' — it is all already in Dedekind.",
      today: "Quotients R/I are everywhere: ℤ/nℤ is clock arithmetic, ℝ[x]/(x² + 1) is the complex numbers, and polynomial ideals (handled by Gröbner bases, 1965) solve systems of equations in robotics and cryptanalysis." },
    { icon: "🏛", title: "1921 — Noether: rings and modules in the abstract", who: "Emmy Noether 1921 · Emil Artin 1927 · van der Waerden's Moderne Algebra 1930–31",
      lead: "Noether replaced computation with structure: chain conditions and modules.",
      formula: "I₁ ⊆ I₂ ⊆ I₃ ⊆ ⋯   eventually stops      (ascending chain condition)",
      what: "Noether's 'Idealtheorie in Ringbereichen' (1921) made rings abstract and found the right finiteness condition: every rising chain of ideals stabilises. Modules generalise vector spaces to scalars in a ring; the structure theorem for modules over a principal ideal domain gives both the classification of finite abelian groups and the Jordan normal form of a matrix.",
      how: "Hilbert's basis theorem (1890) is the model: every ideal of polynomials in finitely many variables is finitely generated — any system of polynomial equations is equivalent to a finite one. Gordan is said to have exclaimed of its non-constructive proof: 'This is not mathematics, it is theology.'",
      story: "Noether taught in Göttingen for years without pay, her lectures announced under Hilbert's name. Van der Waerden's Moderne Algebra, written from her and Artin's lectures, taught the world abstract algebra.",
      today: "Noetherian rings are the ground floor of commutative algebra and algebraic geometry; noncommutative rings of operators run quantum mechanics." }
  ],
  challenges: [
    "Lab 1: click 5, 13 and 29, then 3, 7 and 11. Which ordinary primes split in ℤ[i]? Check your rule on 17 and 19.",
    "Lab 2: find a number other than 6 with two factorisations in ℤ[√−5]. (Hint: look for n with a² + 5b² = n or n².)",
    "Switch to ℤ[i] or ℤ[√−2]. Can you ever find two factorisations? What property of these rings forbids it?"
  ],
  sources: [
    { type: "FREE TEXTBOOK", title: "Thomas Judson — Abstract Algebra: Theory and Applications", note: "Rings, ideals, polynomial rings and unique factorisation domains.", url: "http://abstract.ups.edu/" },
    { type: "EXPOSITORY NOTES", title: "Keith Conrad — expository papers", note: "See 'Factoring in quadratic fields' and 'The Gaussian integers'.", url: "https://kconrad.math.uconn.edu/blurbs/" },
    { type: "CLASSIC · 1871/1877", title: "Richard Dedekind — Theory of Algebraic Integers (trans. John Stillwell)", note: "Ideals, in the words of their inventor, with Stillwell's introduction (Cambridge, 1996).", url: null },
    { type: "TEXTBOOK", title: "Dummit & Foote — Abstract Algebra", note: "The standard reference for rings and modules.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Emmy Noether", note: "The mother of modern algebra.", url: MT("Noether_Emmy") }
  ]
});

/* ================================================================ GALOIS THEORY */
const phi = n => factorInt(n).reduce((s, [p, e]) => s * (p - 1) * p ** (e - 1), 1);
const FERMAT = [3, 5, 17, 257, 65537];
const POLY_NOTES = {
  3: "cos(2π/3) = −1/2 — rational.",
  4: "cos(2π/4) = 0.",
  5: "cos(2π/5) = (√5 − 1)/4 — one square root.",
  6: "cos(2π/6) = 1/2.",
  7: "2cos(2π/7) is a root of x³ + x² − 2x − 1, an irreducible cubic: no tower of square roots reaches it.",
  8: "cos(2π/8) = √2/2.",
  9: "2cos(2π/9) is a root of x³ − 3x + 1 — the same cubic that makes trisecting 120° impossible.",
  17: "16 cos(2π/17) = −1 + √17 + √(34 − 2√17) + 2√(17 + 3√17 − √(34 − 2√17) − 2√(34 + 2√17))  — Gauss, 1796.",
  257: "First constructed by Friedrich Richelot in 1832.",
  65537: "Johann Hermes spent about ten years on it; his manuscript (1894) is kept at the University of Göttingen."
};
register("galois-theory", {
  kicker: "THE SYMMETRY OF EQUATIONS · ABOUT 30 MIN",
  hook: "Which regular polygons can be drawn with only a straightedge and compass?",
  intro: "For two thousand years nobody could construct a regular heptagon, trisect an angle, or find a formula for the roots of a general fifth-degree equation. Galois theory explains all three failures in one stroke: each question about numbers becomes a question about a group of symmetries. Gauss, aged 18, constructed the 17-gon; Wantzel proved the heptagon impossible; Galois saw why the quintic has no formula. The lab tests every polygon up to 120 sides.",
  timeline: [[-300, "Euclid: 3-, 4-, 5-, 15-gons"], [1796, "Gauss: the 17-gon"], [1824, "Abel: no quintic formula"], [1832, "Galois' last letter"], [1837, "Wantzel: impossibility"], [1846, "Liouville publishes Galois"]],
  labs: [{
    kicker: "GAUSS–WANTZEL · CONSTRUCTIBLE POLYGONS", title: "Which n-gons can be constructed?",
    intro: "The vertices of a regular n-gon are the n-th roots of unity. Their symmetry group is (ℤ/n)ˣ, with φ(n) elements. A compass-and-straightedge construction climbs one square root at a time, so the polygon is constructible exactly when φ(n) is a power of 2.",
    html: `<div class="it-control"><label><span>number of sides n</span><output data-o="n">17</output></label><input type="range" data-i="n" min="3" max="120" value="17"></div>
      <div class="gk-chips gp-pre">${[5, 7, 9, 15, 17, 51, 85, 96].map(n => `<button class="gk-chip" data-n="${n}">${n}</button>`).join("")}</div>
      <canvas class="gk-canvas gp-cv"></canvas>
      <div class="gk-out gp-out"></div>`,
    caveat: "Only five Fermat primes 2^(2^k) + 1 are known: 3, 5, 17, 257, 65537. So only 31 odd-sided constructible polygons are known, and whether there are more is open.",
    init(root) {
      const nI = root.querySelector("[data-i=n]"), out = root.querySelector(".gp-out"), cv = root.querySelector(".gp-cv");
      function run() {
        const n = +nI.value; root.querySelector("[data-o=n]").textContent = n;
        root.querySelectorAll(".gp-pre .gk-chip").forEach(b => b.classList.toggle("on", +b.dataset.n === n));
        const f = factorInt(n), ph = phi(n), pow2 = (ph & (ph - 1)) === 0, k = Math.log2(ph);
        const odd = f.filter(([p]) => p !== 2), bad = odd.filter(([p, e]) => e > 1 || !FERMAT.includes(p));
        const { ctx, w, h } = canvas(cv, 240), cx = w / 2, cy = h / 2, R = h / 2 - 16;
        ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
        ctx.beginPath();
        for (let i = 0; i <= n; i++) { const a = 2 * Math.PI * i / n - Math.PI / 2, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.fillStyle = pow2 ? "rgba(245,196,81,.10)" : "rgba(255,120,71,.07)"; ctx.fill();
        ctx.strokeStyle = pow2 ? C.gold : C.red; ctx.lineWidth = 1.6; if (!pow2) ctx.setLineDash([5, 4]); ctx.stroke(); ctx.setLineDash([]);
        for (let i = 0; i < n; i++) { const a = 2 * Math.PI * i / n - Math.PI / 2; ctx.fillStyle = gcd(i, n) === 1 ? (pow2 ? C.gold : C.red) : "rgba(255,255,255,.35)"; ctx.beginPath(); ctx.arc(cx + R * Math.cos(a), cy + R * Math.sin(a), n > 60 ? 1.6 : 2.6, 0, 7); ctx.fill(); }
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.textAlign = "left"; ctx.fillText("bright dots: primitive roots of unity (φ(n) of them)", 8, h - 8);
        const units = [...Array(n).keys()].filter(u => gcd(u, n) === 1);
        out.innerHTML = `n = ${factorStr(n)}\n(ℤ/${n})ˣ = {${units.slice(0, 14).join(", ")}${units.length > 14 ? ", …" : ""}}   φ(${n}) = ${ph} = ${factorStr(ph)}\n` +
          `cos(2π/${n}) has degree φ(n)/2 = ${ph / 2 || 1} over ℚ\n\n` +
          (pow2 ? `<span class="t">CONSTRUCTIBLE.</span> φ(n) = 2${SUP(k)}: a chain of ${k} quadratic step${k === 1 ? "" : "s"} (square roots) climbs from ℚ to the vertices.` :
            `<span class="r">NOT CONSTRUCTIBLE.</span> φ(n) has the odd factor ${ph / (ph & -ph)}; ${bad.map(([p, e]) => e > 1 ? `${p}${SUP(e)} is a repeated odd prime` : `${p} is not a Fermat prime`).join(", ")}.`) +
          (POLY_NOTES[n] ? `\n<span class="g">${POLY_NOTES[n]}</span>` : "");
      }
      root.querySelectorAll(".gp-pre .gk-chip").forEach(b => b.addEventListener("click", () => { nI.value = b.dataset.n; run(); }));
      nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1796 — Gauss constructs the 17-gon", who: "Carl Friedrich Gauss, 30 March 1796 · Disquisitiones Arithmeticae, section VII, 1801",
      lead: "An 18-year-old found the first new constructible polygon since Euclid — and decided to become a mathematician.",
      formula: "16 cos(2π/17) = −1 + √17 + √(34 − 2√17) + 2√(17 + 3√17 − √(34 − 2√17) − 2√(34 + 2√17))",
      what: "A length is constructible exactly when it can be reached from ℚ by a tower of square roots. The primitive 17th roots of unity have degree 16 = 2⁴, and their symmetry group (ℤ/17)ˣ is cyclic of order 16, so four square roots suffice.",
      how: "Gauss grouped the sixteen roots into 'periods' — sums over the subgroups of (ℤ/17)ˣ of orders 8, 4, 2 and 1 — and showed each period satisfies a quadratic equation over the previous ones. It is the Galois correspondence, thirty-five years before Galois.",
      story: "The discovery is the first entry in Gauss's mathematical diary, and it made him choose mathematics over philology. He is said to have asked for a 17-gon on his tombstone; the monument in his birthplace Braunschweig carries a 17-pointed star instead.",
      today: "Gauss found the sufficient condition: n = 2ᵏ times distinct Fermat primes. Wantzel proved it necessary in 1837. Whether a sixth Fermat prime exists is still unknown; none exists below 2^(2^33) + 1." },
    { icon: "🔥", title: "1824–1832 — the quintic, and Galois", who: "Paolo Ruffini 1799 · Niels Henrik Abel 1824 · Évariste Galois 1830–32",
      lead: "No formula in radicals solves every fifth-degree equation — and Galois explained exactly which equations are solvable.",
      formula: "x⁵ − x − 1 = 0   has Galois group S₅, which is not solvable",
      what: "The Galois group of a polynomial permutes its roots while preserving every algebraic relation among them. The equation is solvable by radicals exactly when this group is <b>solvable</b> — built up from abelian layers. S₅ contains the simple non-abelian group A₅ of order 60, so the general quintic has no formula.",
      how: "Adjoining an n-th root (with the n-th roots of unity present) is a cyclic, hence abelian, step. A tower of radicals therefore gives a chain of subgroups with abelian quotients; A₅ has no such chain.",
      story: "Ruffini's 1799 proof had gaps. Abel's 1824 proof was squeezed into a six-page pamphlet to save on printing. Galois, twice rejected by the École Polytechnique and jailed for republican politics, wrote out his theory in a letter to Auguste Chevalier on 29 May 1832, the night before the duel that killed him.",
      today: "The same philosophy explains why ∫ e^(−x²) dx has no elementary formula (Liouville) and grew into differential Galois theory. The absolute Galois group of ℚ is the central object of the Langlands programme." },
    { icon: "🏛", title: "1837 — the ancient problems are impossible", who: "Pierre Wantzel 1837 · Ferdinand von Lindemann 1882",
      lead: "Doubling the cube and trisecting the angle, which resisted the Greeks and everyone after them, cannot be done.",
      formula: "[ℚ(∛2) : ℚ] = 3, not a power of 2   ⇒   the cube cannot be doubled",
      what: "Every compass-and-straightedge step solves at most a quadratic equation, so every constructible number has degree a power of 2 over ℚ. ∛2 has degree 3, and so does cos 20°, a root of 8x³ − 6x − 1; hence no doubling of the cube and no trisection of 60°. Squaring the circle needs √π, and Lindemann proved π transcendental in 1882.",
      how: "The tower law: degrees multiply, [L : K] = [L : M] · [M : K]. A tower of quadratic extensions has degree 2ᵏ, and a number of degree 3 cannot live in it.",
      story: "Wantzel was 23 when he published both impossibility proofs, and the necessity half of the Gauss–Wantzel theorem, in 1837. The work was little noticed; he died at 33.",
      today: "Change the tools and the answer changes: paper folding (origami) solves cubic equations, so it can trisect angles, double the cube and fold a regular heptagon." },
    { icon: "⚙️", title: "1830–1942 — finite fields and the modern theory", who: "Galois 1830 · Ernst Steinitz 1910 · Emil Artin 1942",
      lead: "Galois invented fields with pⁿ elements; Artin recast his theory as linear algebra.",
      formula: "subgroups H ≤ Gal(L/K)   ⟷   intermediate fields K ⊆ M ⊆ L",
      what: "The fundamental theorem: for a Galois extension L/K, subgroups of the Galois group correspond one-to-one, reversing inclusion, with the fields in between. Finite fields 𝔽_(pⁿ) exist for every prime power and are unique; their Galois group is cyclic, generated by the Frobenius map x ↦ xᵖ.",
      how: "Steinitz's 1910 memoir set out the abstract theory of fields; Artin's Notre Dame lectures (1942) gave the now-standard proof via the linear independence of characters.",
      story: "Galois introduced the 'imaginary roots of congruences' in 'Sur la théorie des nombres' (1830) — the finite fields now written GF(pⁿ) in his honour.",
      today: "Finite fields run QR codes, CDs and deep-space links (Reed–Solomon codes over GF(2⁸)), the AES cipher, and elliptic-curve cryptography." }
  ],
  challenges: [
    "List every constructible n-gon with n ≤ 20. Which is the first one Euclid did not know?",
    "The 9-gon is not constructible though 9 = 3² and 3 is a Fermat prime. Why does repetition hurt? Compare φ(9) with φ(15).",
    "Is the 65537-gon constructible according to the lab's rule? What is φ(65537), and how many square roots does it take?"
  ],
  sources: [
    { type: "FREE NOTES", title: "James Milne — Fields and Galois Theory", note: "Complete course notes, from constructibility to infinite Galois theory.", url: "https://www.jmilne.org/math/CourseNotes/ft.html" },
    { type: "TEXTBOOK", title: "Ian Stewart — Galois Theory", note: "Historical and gentle; the standard first course (4th ed., 2015).", url: null },
    { type: "CLASSIC · 1942", title: "Emil Artin — Galois Theory (Notre Dame lectures)", note: "Eighty pages that fixed the modern form of the theory.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Évariste Galois", note: "The duel, the prison, the letter.", url: MT("Galois") },
    { type: "BIOGRAPHY", title: "MacTutor — Pierre Wantzel", note: "The young man who settled the Greek problems.", url: MT("Wantzel") }
  ]
});

/* ================================================================ COMMUTATIVE ALGEBRA */
const SPEC_P = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const val = (n, p) => { let e = 0; n = Math.abs(n); if (!n) return Infinity; while (n % p === 0) { n /= p; e++; } return e; };
const modinv = (a, p) => { a = ((a % p) + p) % p; for (let x = 1; x < p; x++) if (a * x % p === 1) return x; return null; };
register("commutative-algebra", {
  kicker: "THE ALGEBRA OF GEOMETRY · ABOUT 25 MIN",
  hook: "What if every number were a function — and every prime a point where it can vanish?",
  intro: "Commutative algebra studies rings like ℤ and the polynomial rings k[x, y], where the order of multiplication doesn't matter. Its great idea, completed by Grothendieck around 1960, is that every such ring is the ring of functions on a space: its spectrum, whose points are its prime ideals. On Spec ℤ the integer 12 is a function that vanishes twice at the point 2, once at the point 3, and nowhere else. The lab lets you evaluate numbers at primes.",
  timeline: [[1890, "Hilbert: basis theorem"], [1893, "Nullstellensatz"], [1921, "Noether: ideal theory"], [1927, "localization"], [1937, "Krull: dimension"], [1960, "Grothendieck: Spec"]],
  labs: [{
    kicker: "GROTHENDIECK 1960 · SPEC ℤ", title: "Numbers as functions on the primes",
    intro: "Each cell is a point of Spec ℤ, one for each prime p. The 'value' of n at p is n mod p, an element of the field 𝔽ₚ — a different field at every point. Where p divides n, the function vanishes (gold), to order equal to the power of p. Fractions can have poles (red). Click a point to localise there.",
    html: `<div class="gk-row"><input class="gk-input sp-in" value="360" aria-label="an integer or a fraction a/b"><button class="it-send sp-go">evaluate</button></div>
      <div class="gk-chips sp-pre">${["12", "360", "1001", "7/12", "-1", "2^10", "30/49"].map(s => `<button class="gk-chip" data-s="${s}">${s}</button>`).join("")}</div>
      <div class="sp-cells" style="display:grid;grid-template-columns:repeat(8,1fr);gap:4px;margin:.5rem 0"></div>
      <div class="gk-out sp-out"></div>`,
    caveat: "The generic point (0) sits 'everywhere' on Spec ℤ; the value of n there is n itself, in ℚ. A nonzero integer vanishes at only finitely many points, just as a nonzero polynomial has finitely many roots — Spec ℤ behaves like a curve.",
    init(root) {
      const inp = root.querySelector(".sp-in"), cells = root.querySelector(".sp-cells"), out = root.querySelector(".sp-out");
      let loc = null;
      const parse = s => {
        s = s.replace(/\s/g, "").replace("−", "-");
        const pw = s.match(/^(-?\d+)\^(\d+)$/); if (pw) return [Math.pow(+pw[1], +pw[2]), 1];
        const m = s.match(/^(-?\d+)(?:\/(\d+))?$/); if (!m) return null;
        let a = +m[1], b = m[2] ? +m[2] : 1; if (!b || !Number.isSafeInteger(a)) return null; const g = gcd(a, b) || 1; return [a / g, b / g];
      };
      function run() {
        const q = parse(inp.value);
        if (!q) { out.innerHTML = `<span class="r">Type an integer, a fraction a/b, or a power like 2^10.</span>`; return; }
        const [a, b] = q, s = b === 1 ? String(a) : `${a}/${b}`;
        cells.innerHTML = SPEC_P.map(p => {
          const va = val(a, p), vb = val(b, p), ord = va === Infinity ? Infinity : va - vb;
          let txt, col;
          if (a === 0) { txt = "0"; col = C.gold; }
          else if (ord > 0) { txt = "0" + (ord > 1 ? SUP(ord) : ""); col = C.gold; }
          else if (ord < 0) { txt = "∞" + (ord < -1 ? SUP(-ord) : ""); col = C.red; }
          else { const v = ((a % p) + p) % p * modinv(b, p) % p; txt = String(v); col = "#d8d2ea"; }
          return `<button class="gk-cell gk-pick sp-p" data-p="${p}" style="aspect-ratio:auto;flex-direction:column;padding:.3rem 0;${loc === p ? "border-color:#f5c451;background:rgba(245,196,81,.12)" : ""}">
            <span style="font-size:.55rem;color:#9d96b8">(${p})</span><span style="color:${col};font-size:.72rem">${txt}</span></button>`;
        }).join("") + `<div class="gk-cell" style="aspect-ratio:auto;flex-direction:column;padding:.3rem 0;cursor:default"><span style="font-size:.55rem;color:#9d96b8">(0)</span><span style="font-size:.62rem">${s.length > 7 ? "n" : s}</span></div>`;
        cells.querySelectorAll(".sp-p").forEach(c => c.addEventListener("click", () => { loc = loc === +c.dataset.p ? null : +c.dataset.p; run(); }));
        const zeros = a === 0 ? "everywhere" : factorInt(Math.abs(a)).map(([p, e]) => `(${p})${e > 1 ? " ×" + e : ""}`).join(", ") || "nowhere";
        const poles = b === 1 ? "none" : factorInt(b).map(([p, e]) => `(${p})${e > 1 ? " ×" + e : ""}`).join(", ");
        let txt = `n = ${s}\nzeros V(n): <span class="g">${zeros}</span>\npoles: <span class="r">${poles}</span>\n`;
        if (a !== 0 && Math.abs(a) === 1 && b === 1) txt += `<span class="t">A unit: it vanishes nowhere — invertible everywhere on Spec ℤ.</span>\n`;
        if (loc) {
          const ord = a === 0 ? Infinity : val(a, loc) - val(b, loc);
          txt += `\nlocalised at (${loc}): ℤ₍${loc}₎ = fractions whose denominator is prime to ${loc}\n` +
            (a === 0 ? "n = 0 there too." : ord === 0 ? `<span class="t">${s} is a unit in ℤ₍${loc}₎</span> — it doesn't vanish at (${loc}), so we may divide by it.` :
              ord > 0 ? `${s} = ${loc}${SUP(ord)} × (unit) — near (${loc}) only its order of vanishing survives.` : `${s} ∉ ℤ₍${loc}₎: it has a pole at (${loc}).`);
        } else txt += `<span class="d">click a prime to zoom in on that point (localise).</span>`;
        out.innerHTML = txt;
      }
      root.querySelector(".sp-go").addEventListener("click", run);
      inp.addEventListener("keydown", e => { if (e.key === "Enter") run(); });
      root.querySelectorAll(".sp-pre .gk-chip").forEach(b => b.addEventListener("click", () => { inp.value = b.dataset.s; run(); }));
      run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1890–1893 — Hilbert's two theorems", who: "David Hilbert: basis theorem 1890 · Nullstellensatz 1893",
      lead: "Finitely many equations always suffice, and the points of a variety are exactly the maximal ideals.",
      formula: "I(V(J)) = √J      (over ℂ)",
      what: "The basis theorem: every ideal of polynomials in finitely many variables is finitely generated. The Nullstellensatz ('zero-locus theorem'): over an algebraically closed field, polynomial equations have no common solution exactly when 1 is a combination of them, and the points of ℂⁿ correspond to the maximal ideals (x₁ − a₁, …, xₙ − aₙ).",
      how: "This is the dictionary of algebraic geometry: ideals ↔ varieties, radical ideals ↔ zero sets, prime ideals ↔ irreducible pieces, maximal ideals ↔ points.",
      story: "Hilbert's non-constructive basis theorem ended in one stroke decades of heavy explicit computation in invariant theory, the specialty of Paul Gordan, 'the king of invariants'.",
      today: "Gröbner bases (Buchberger, 1965) make the dictionary computable; they solve polynomial systems in robotics, chemistry and cryptanalysis, and sit inside every computer algebra system." },
    { icon: "⚙️", title: "1927–1937 — localization and dimension", who: "Heinrich Grell 1927 · Wolfgang Krull 1928–37 · Claude Chevalley 1944",
      lead: "Zoom in on one point by allowing division by everything that does not vanish there.",
      formula: "ℤ₍ₚ₎ = { a/b : p ∤ b }      dim k[x₁, …, xₙ] = n",
      what: "Localization inverts everything outside a prime ideal, giving a local ring that sees only a neighbourhood of that point — the lab's zoom. Krull dimension is the length of the longest chain of prime ideals: in ℤ it is (0) ⊂ (p), so dim ℤ = 1, and Spec ℤ is a kind of curve. k[x, y] has dimension 2.",
      how: "Krull's principal ideal theorem (1928): in a Noetherian ring, one equation cuts dimension by at most one — the algebraic form of 'one equation, one dimension less'.",
      story: "Localization appears in the work of Grell, a student of Noether, in 1927; Chevalley named and systematised it in 1944. Krull, another member of Noether's circle, wrote the theory of dimension in the 1930s.",
      today: "Local rings are how algebraic geometers study singularities and how number theorists work 'one prime at a time'; completing ℤ₍ₚ₎ gives the p-adic integers." },
    { icon: "⚙️", title: "1926–1946 — integral extensions", who: "Emmy Noether 1926 (normalisation) · Irvin Cohen & Abraham Seidenberg 1946",
      lead: "When one ring sits integrally inside another, primes lift: geometrically, a finite map with finite fibres that hits every point.",
      formula: "x integral over R   ⟺   xⁿ + rₙ₋₁xⁿ⁻¹ + ⋯ + r₀ = 0 with rᵢ ∈ R",
      what: "An element is integral if it satisfies a monic polynomial, like the golden ratio (1 + √5)/2 over ℤ (x² − x − 1 = 0). Integral extensions have 'lying over' and 'going up' (Cohen–Seidenberg, 1946): every prime of the smaller ring has primes of the bigger ring above it, and chains lift.",
      how: "Noether normalisation (1926): every finitely generated algebra over a field is integral over a polynomial ring — every variety is a finite branched cover of affine space, which is how dimension is computed.",
      story: "The ring of integers of a number field is the integral closure of ℤ; how a prime of ℤ breaks up there — 5 = (2 + i)(2 − i) splits, 3 stays prime in ℤ[i] — is going-up made concrete.",
      today: "Integral closure and normalisation are standard algorithms in computer algebra, and splitting of primes in integral extensions is the subject of class field theory." },
    { icon: "🔥", title: "1960 — Grothendieck's spectrum", who: "Jean-Pierre Serre, FAC 1955 · Alexander Grothendieck with Jean Dieudonné, EGA 1960–67",
      lead: "Every commutative ring is the ring of functions on a space — even ℤ.",
      formula: "Spec ℤ = { (0), (2), (3), (5), (7), (11), … }",
      what: "The spectrum of a ring R is the set of its prime ideals, with the Zariski topology: the closed sets are the V(I), the primes containing an ideal I. An element f is a 'function' whose value at the point p is its image in the residue field at p — exactly the lab.",
      how: "Glue spectra together and you get schemes. One language then covers varieties over ℂ, over finite fields and over ℤ — which is how arithmetic becomes geometry.",
      story: "Grothendieck's EGA and his seminars at the IHÉS rebuilt algebraic geometry in the 1960s. The analogy between numbers and functions — Dedekind and Weber, 1882 — had waited eighty years for this language. Grothendieck left mathematics in 1970.",
      today: "Spec is the foundation of arithmetic geometry: Deligne's proof of the Weil conjectures (1974), Wiles's proof of Fermat's Last Theorem (1995) and Scholze's perfectoid spaces all speak it." }
  ],
  challenges: [
    "Evaluate 360. Where does it vanish, and to what order? Now 360/49: what changed?",
    "Find every integer that vanishes at no point of Spec ℤ.",
    "Localise at 5. Which of 12, 15, 7/12 and 30/49 are units in ℤ₍₅₎? Which are not even in it?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "Atiyah & Macdonald — Introduction to Commutative Algebra", note: "The classic 128 pages (1969).", url: null },
    { type: "FREE BOOK", title: "Ravi Vakil — The Rising Sea: Foundations of Algebraic Geometry", note: "Spec, schemes and sheaves, with pictures and humour.", url: "https://math.stanford.edu/~vakil/216blog/" },
    { type: "REFERENCE", title: "The Stacks Project", note: "An open, collaborative, cross-referenced textbook of commutative algebra and algebraic geometry.", url: "https://stacks.math.columbia.edu/" },
    { type: "BOOK", title: "David Mumford — The Red Book of Varieties and Schemes", note: "Home of Mumford's famous 'treasure map' drawing of Spec ℤ[x].", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Alexander Grothendieck", note: "A life in mathematics and after it.", url: MT("Grothendieck") }
  ]
});

/* ================================================================ LIE THEORY */
const mexp = (X, t) => { // exp(tX) for 2×2 X by power series
  let R = [[1, 0], [0, 1]], T = [[1, 0], [0, 1]];
  for (let k = 1; k < 40; k++) {
    T = [[(T[0][0] * X[0][0] + T[0][1] * X[1][0]) * t / k, (T[0][0] * X[0][1] + T[0][1] * X[1][1]) * t / k],
         [(T[1][0] * X[0][0] + T[1][1] * X[1][0]) * t / k, (T[1][0] * X[0][1] + T[1][1] * X[1][1]) * t / k]];
    R = [[R[0][0] + T[0][0], R[0][1] + T[0][1]], [R[1][0] + T[1][0], R[1][1] + T[1][1]]];
  }
  return R;
};
const LIE_X = {
  rotation: { X: [[0, -1], [1, 0]], orbit: "circles — the group SO(2) of rotations", alg: "𝔰𝔬(2): skew-symmetric" },
  boost: { X: [[0, 1], [1, 0]], orbit: "hyperbolas x² − y² = const — Lorentz boosts of special relativity", alg: "symmetric, traceless" },
  shear: { X: [[0, 1], [0, 0]], orbit: "horizontal lines — X² = 0, so exp(tX) = I + tX exactly", alg: "nilpotent" },
  squeeze: { X: [[1, 0], [0, -1]], orbit: "hyperbolas xy = const — area kept, shape squeezed", alg: "diagonal, traceless" },
  spiral: { X: [[-0.25, -1], [1, -0.25]], orbit: "inward spirals — rotation and shrinking together", alg: "trace −½: area decays" }
};
const ROOTS = (() => {
  const ang = (deg, r = 1) => [r * Math.cos(deg * Math.PI / 180), r * Math.sin(deg * Math.PI / 180)];
  const ring = (start, step, n, r) => Array.from({ length: n }, (_, i) => ang(start + i * step, r));
  return {
    "A1×A1": { roots: ring(0, 90, 4, 1), simple: [ang(0), ang(90)], W: 4, deg: 90, dyn: "∘   ∘", alg: "𝔰𝔩₂ × 𝔰𝔩₂ ≅ 𝔰𝔬(4)", dim: 6 },
    A2: { roots: ring(0, 60, 6, 1), simple: [ang(0), ang(120)], W: 6, deg: 120, dyn: "∘—∘", alg: "𝔰𝔩₃ (the Eightfold Way)", dim: 8 },
    B2: { roots: ring(0, 90, 4, 1).concat(ring(45, 90, 4, Math.SQRT2)), simple: [ang(-45, Math.SQRT2), ang(90)], W: 8, deg: 135, dyn: "∘⇒∘", alg: "𝔰𝔬(5) ≅ 𝔰𝔭(4)", dim: 10 },
    G2: { roots: ring(0, 60, 6, 1).concat(ring(30, 60, 6, Math.sqrt(3))), simple: [ang(0), ang(150, Math.sqrt(3))], W: 12, deg: 150, dyn: "∘⇛∘", alg: "𝔤₂ (symmetries of the octonions)", dim: 14 }
  };
})();
register("lie-theory", {
  kicker: "CONTINUOUS SYMMETRY · ABOUT 30 MIN",
  hook: "How can a whole curved group of symmetries be recovered from a few matrices at the identity?",
  intro: "Sophus Lie wanted a Galois theory for differential equations, built on continuous symmetries like rotations. His insight: such a group is determined, near the identity, by its infinitesimal generators — a Lie algebra — and the exponential map turns generators back into motions. Killing and Cartan then classified all the simple ones: four infinite families and five exceptions, G₂, F₄, E₆, E₇ and E₈. The labs flow along exp(tX) and draw the rank-two root systems.",
  timeline: [[1873, "Lie: continuous groups"], [1888, "Killing: the classification"], [1894, "Cartan's thesis"], [1925, "Weyl: compact groups"], [1947, "Dynkin diagrams"], [2007, "E₈ computed"]],
  labs: [{
    kicker: "LIE 1873 · THE EXPONENTIAL MAP", title: "From a generator to a motion: exp(tX)",
    intro: "Choose a generator X, a 2×2 matrix. The faint curves are its flow lines: each point moves along x′ = Xx. The gold square is the unit square after flowing for time t, i.e. transformed by the matrix exp(tX) = I + tX + t²X²/2! + ⋯.",
    html: `<div class="gk-chips lx-pre">${Object.keys(LIE_X).map(k => `<button class="gk-chip${k === "rotation" ? " on" : ""}" data-k="${k}">${k}</button>`).join("")}</div>
      <div class="it-control"><label><span>time t</span><output data-o="t">0.80</output></label><input type="range" data-i="t" min="-3.14" max="3.14" step="0.01" value="0.8"></div>
      <div class="it-lab-actions"><button class="gk-ghost lx-play">▶ flow</button></div>
      <canvas class="gk-canvas lx-cv"></canvas>
      <div class="gk-out lx-out"></div>`,
    caveat: "det exp(tX) = e^(t·tr X): traceless generators give area-preserving motions, the group SL(2, ℝ). Rotation and boost look alike algebraically, yet one flow is periodic and the other runs off to infinity — the difference between a compact and a non-compact group.",
    init(root) {
      let key = "rotation", raf = null;
      const tI = root.querySelector("[data-i=t]"), out = root.querySelector(".lx-out"), cv = root.querySelector(".lx-cv");
      const f = v => (Math.abs(v) < 5e-4 ? 0 : v).toFixed(3).replace("-", "−").padStart(7);
      function draw() {
        const t = +tI.value, X = LIE_X[key].X, E = mexp(X, t);
        root.querySelector("[data-o=t]").textContent = t.toFixed(2);
        const { ctx, w, h } = canvas(cv, 260), s = h / 6.4, cx = w / 2, cy = h / 2, P = ([x, y]) => [cx + x * s, cy - y * s];
        ctx.strokeStyle = "rgba(255,255,255,.1)"; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
        ctx.strokeStyle = "rgba(127,227,214,.22)"; ctx.lineWidth = 1;
        const seeds = []; for (let a = -3; a <= 3; a += 1) for (let b = -2; b <= 2; b += 1) if (a || b) seeds.push([a * .9 + .15, b * .9 + .1]);
        const step = mexp(X, .04), stepB = mexp(X, -.04);
        for (const s0 of seeds) for (const S of [step, stepB]) {
          let p = s0; ctx.beginPath(); ctx.moveTo(...P(p));
          for (let k = 0; k < 160; k++) { p = [S[0][0] * p[0] + S[0][1] * p[1], S[1][0] * p[0] + S[1][1] * p[1]]; if (Math.abs(p[0]) > 9 || Math.abs(p[1]) > 9) break; ctx.lineTo(...P(p)); }
          ctx.stroke();
        }
        const sq = [[0, 0], [1, 0], [1, 1], [0, 1]], M = v => [E[0][0] * v[0] + E[0][1] * v[1], E[1][0] * v[0] + E[1][1] * v[1]];
        ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.beginPath(); sq.forEach((v, i) => i ? ctx.lineTo(...P(v)) : ctx.moveTo(...P(v))); ctx.closePath(); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = "rgba(245,196,81,.22)"; ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); sq.map(M).forEach((v, i) => i ? ctx.lineTo(...P(v)) : ctx.moveTo(...P(v))); ctx.closePath(); ctx.fill(); ctx.stroke();
        const e1 = M([1, 0]); ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(...P(e1), 4, 0, 7); ctx.fill();
        const tr = X[0][0] + X[1][1], det = E[0][0] * E[1][1] - E[0][1] * E[1][0];
        out.innerHTML = `X       = [${f(X[0][0])} ${f(X[0][1])} ]\n          [${f(X[1][0])} ${f(X[1][1])} ]\nexp(tX) = [${f(E[0][0])} ${f(E[0][1])} ]\n          [${f(E[1][0])} ${f(E[1][1])} ]\n\n` +
          `<span class="d">${LIE_X[key].alg}</span>   tr X = ${tr}   det exp(tX) = ${det.toFixed(4)} = e^(${(t * tr).toFixed(2)})\n<span class="g">orbits: ${LIE_X[key].orbit}</span>`;
      }
      const play = root.querySelector(".lx-play");
      play.addEventListener("click", () => {
        if (raf) { cancelAnimationFrame(raf); raf = null; play.textContent = "▶ flow"; return; }
        play.textContent = "❚❚ pause";
        const tick = () => { if (!root.isConnected) { raf = null; return; } let t = +tI.value + .02; if (t > 3.14) t = -3.14; tI.value = t; draw(); raf = requestAnimationFrame(tick); };
        raf = requestAnimationFrame(tick);
      });
      root.querySelectorAll(".lx-pre .gk-chip").forEach(b => b.addEventListener("click", () => { key = b.dataset.k; root.querySelectorAll(".lx-pre .gk-chip").forEach(x => x.classList.toggle("on", x === b)); draw(); }));
      tI.addEventListener("input", draw); draw();
    }
  }, {
    kicker: "KILLING 1888 · ROOT SYSTEMS", title: "The rank-two root systems and their Weyl groups",
    intro: "A simple Lie algebra is fixed by its roots: a symmetric star of vectors, closed under reflection in the mirror perpendicular to any root. Reflect the gold point with s₁ and s₂ (reflections in the two simple roots) and watch it visit every chamber: the Weyl group.",
    html: `<div class="gk-chips rs-pre">${Object.keys(ROOTS).map(k => `<button class="gk-chip${k === "G2" ? " on" : ""}" data-k="${k}">${k.replace("1", "₁").replace("1", "₁").replace("2", "₂")}</button>`).join("")}</div>
      <canvas class="gk-canvas rs-cv"></canvas>
      <div class="it-lab-actions"><button class="gk-ghost rs-s" data-s="0">reflect s₁</button><button class="gk-ghost rs-s" data-s="1">reflect s₂</button><button class="gk-ghost rs-all">whole orbit</button><button class="gk-ghost rs-reset">reset</button></div>
      <div class="gk-out rs-out"></div>`,
    caveat: "The possible angles between roots are 90°, 60°/120°, 45°/135° and 30°/150° — that rigidity is why the whole list of simple Lie algebras is so short. In rank two there are just these four.",
    init(root) {
      let key = "G2", pts;
      const cv = root.querySelector(".rs-cv"), out = root.querySelector(".rs-out");
      const refl = (p, a) => { const k = 2 * (p[0] * a[0] + p[1] * a[1]) / (a[0] * a[0] + a[1] * a[1]); return [p[0] - k * a[0], p[1] - k * a[1]]; };
      const seed = () => { const [a, b] = ROOTS[key].simple; // ρ = ω₁ + ω₂ lies inside the fundamental chamber
        const ra = (a[0] * a[0] + a[1] * a[1]) / 2, rb = (b[0] * b[0] + b[1] * b[1]) / 2, det = a[0] * b[1] - a[1] * b[0];
        const x = [(ra * b[1] - rb * a[1]) / det, (a[0] * rb - b[0] * ra) / det], m = Math.hypot(...x); return [x[0] / m * 1.25, x[1] / m * 1.25]; };
      const reset = () => { pts = [seed()]; draw(); };
      function draw() {
        const R = ROOTS[key], { ctx, w, h } = canvas(cv, 260), s = h / 4.4, cx = w / 2, cy = h / 2, P = ([x, y]) => [cx + x * s, cy - y * s];
        const [a1, a2] = R.simple;
        // fundamental chamber
        ctx.fillStyle = "rgba(245,196,81,.08)"; ctx.beginPath(); ctx.moveTo(cx, cy);
        for (let k = 0; k <= 60; k++) { const th = 2 * Math.PI * k / 60; const v = [Math.cos(th), Math.sin(th)]; if (v[0] * a1[0] + v[1] * a1[1] > 0 && v[0] * a2[0] + v[1] * a2[1] > 0) ctx.lineTo(...P([v[0] * 2.2, v[1] * 2.2])); }
        ctx.closePath(); ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.1)"; ctx.lineWidth = 1;
        for (const r of R.roots) { const m = [-r[1], r[0]], k = 2.4 / Math.hypot(...r); ctx.beginPath(); ctx.moveTo(...P([m[0] * k, m[1] * k])); ctx.lineTo(...P([-m[0] * k, -m[1] * k])); ctx.stroke(); }
        for (const r of R.roots) {
          const long = Math.hypot(...r) > 1.1, isS = R.simple.some(q => Math.hypot(q[0] - r[0], q[1] - r[1]) < 1e-6);
          const [x, y] = P(r); ctx.strokeStyle = isS ? "#fff" : long ? C.gold : C.teal; ctx.lineWidth = isS ? 2.4 : 1.6;
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke();
          const an = Math.atan2(cy - y, x - cx); ctx.fillStyle = ctx.strokeStyle; ctx.beginPath();
          ctx.moveTo(x, y); ctx.lineTo(x - 8 * Math.cos(an - .35), y + 8 * Math.sin(an - .35)); ctx.lineTo(x - 8 * Math.cos(an + .35), y + 8 * Math.sin(an + .35)); ctx.fill();
        }
        ctx.fillStyle = "#fff"; ctx.font = "11px IBM Plex Mono"; ctx.fillText("α₁", ...P([a1[0] * 1.12 + .05, a1[1] * 1.12 - .12])); ctx.fillText("α₂", ...P([a2[0] * 1.12 - .1, a2[1] * 1.12 + .1]));
        pts.forEach((p, i) => { ctx.fillStyle = i === pts.length - 1 ? C.gold : "rgba(245,196,81,.55)"; ctx.beginPath(); ctx.arc(...P(p), i === pts.length - 1 ? 5 : 3.5, 0, 7); ctx.fill(); });
        const nLong = R.roots.filter(r => Math.hypot(...r) > 1.1).length;
        out.innerHTML = `${key}: ${R.roots.length} roots${nLong && nLong < R.roots.length ? ` (${R.roots.length - nLong} short, ${nLong} long)` : ""}, angle between simple roots ${R.deg}°\n` +
          `Dynkin diagram  ${R.dyn}      Lie algebra ${R.alg}, dimension ${R.dim} = 2 + ${R.roots.length}\n` +
          `<span class="g">Weyl group order ${R.W}</span>   points visited: ${pts.length}${pts.length === R.W ? ` <span class="t">— one in every chamber.</span>` : ""}`;
      }
      root.querySelectorAll(".rs-s").forEach(b => b.addEventListener("click", () => {
        const p = refl(pts[pts.length - 1], ROOTS[key].simple[+b.dataset.s]);
        if (!pts.some(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-6)) pts.push(p); else pts.push(pts.splice(pts.findIndex(q => Math.hypot(q[0] - p[0], q[1] - p[1]) < 1e-6), 1)[0]);
        draw();
      }));
      root.querySelector(".rs-all").addEventListener("click", () => {
        const S = ROOTS[key].simple; let frontier = pts.slice();
        while (frontier.length) { const nx = []; for (const p of frontier) for (const a of S) { const q = refl(p, a); if (!pts.some(r => Math.hypot(r[0] - q[0], r[1] - q[1]) < 1e-6)) { pts.push(q); nx.push(q); } } frontier = nx; }
        draw();
      });
      root.querySelector(".rs-reset").addEventListener("click", reset);
      root.querySelectorAll(".rs-pre .gk-chip").forEach(b => b.addEventListener("click", () => { key = b.dataset.k; root.querySelectorAll(".rs-pre .gk-chip").forEach(x => x.classList.toggle("on", x === b)); reset(); }));
      reset();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1873 — Lie's continuous groups", who: "Sophus Lie 1873 · Felix Klein's Erlangen programme 1872",
      lead: "Symmetries that vary continuously — rotation by any angle — form groups that are also smooth spaces.",
      formula: "SO(2) = { [[cos θ, −sin θ], [sin θ, cos θ]] : θ ∈ ℝ }",
      what: "A <b>Lie group</b> is a group that is also a smooth manifold, with smooth multiplication: the rotations SO(3), the invertible matrices GL(n), the Lorentz group of relativity. Lie's goal was to use the continuous symmetries of a differential equation to solve it, as Galois had used the finite symmetries of a polynomial.",
      how: "Every one-parameter subgroup is the flow of a vector field — the lab's curves. The group is generated, near the identity, by these infinitesimal motions.",
      story: "Lie and Klein travelled to Paris together in 1870. When the Franco-Prussian war broke out, Lie set off on foot for Italy and was arrested near Fontainebleau as a German spy — his notebooks full of formulas looked like code. He spent a month in prison, working on mathematics.",
      today: "Noether's theorem (1918) links every continuous symmetry of a physical law to a conserved quantity: time translation gives energy, rotation gives angular momentum." },
    { icon: "⚙️", title: "1888 — Lie algebras and the exponential map", who: "Lie & Friedrich Engel, Theorie der Transformationsgruppen 1888–93 · Hermann Weyl names 'Lie algebras' 1934",
      lead: "Linearise the group at the identity: the tangent space, with its bracket, remembers almost everything.",
      formula: "exp(tX) = I + tX + t²X²/2! + ⋯      [X, Y] = XY − YX",
      what: "The Lie algebra is the tangent space at the identity, with the bracket [X, Y] measuring how far two infinitesimal motions fail to commute. The exponential map sends it back into the group: skew matrices exponentiate to rotations, symmetric traceless ones to hyperbolic boosts, nilpotent ones to shears (lab 1).",
      how: "Lie's theorems: every finite-dimensional real Lie algebra comes from a Lie group, and simply connected groups correspond exactly to Lie algebras. The Baker–Campbell–Hausdorff formula exp X · exp Y = exp(X + Y + ½[X, Y] + ⋯) recovers the multiplication from the bracket.",
      story: "Lie called them 'infinitesimal groups'; the name 'Lie algebra' is Weyl's, from 1934.",
      today: "Quantum mechanics is written in Lie algebras — the angular momentum operators obey [Lₓ, L_y] = iħL_z, the Lie algebra of SU(2). Robotics and computer graphics interpolate rigid motions with exp on SE(3)." },
    { icon: "🏛", title: "1888–1894 — Killing and Cartan classify", who: "Wilhelm Killing 1888–90 · Élie Cartan's thesis 1894",
      lead: "Every simple Lie algebra over ℂ: four infinite families and five exceptions.",
      formula: "Aₙ, Bₙ, Cₙ, Dₙ   ·   G₂ (14), F₄ (52), E₆ (78), E₇ (133), E₈ (248)",
      what: "Killing discovered that a simple complex Lie algebra is determined by its root system — a highly symmetric star of vectors (lab 2). The classical families are 𝔰𝔩(n+1), 𝔰𝔬(2n+1), 𝔰𝔭(2n) and 𝔰𝔬(2n); the five exceptional algebras have dimensions 14, 52, 78, 133 and 248.",
      how: "The roots live in a Euclidean space and are closed under reflection in each other's mirrors (the Weyl group). Integrality forces the angles between roots into a tiny list, and the classification follows by elementary geometry.",
      story: "Killing, a professor at the Lyceum in Braunsberg, East Prussia, found E₈ and the rest in 1888. In 1989 A. J. Coleman called his paper 'the greatest mathematical paper of all time'. Cartan filled its gaps in his 1894 thesis.",
      today: "E₈ turns up in string theory, in the densest sphere packing in eight dimensions (its root lattice — Viazovska, 2016), and in a 2010 experiment on cobalt niobate whose excitations showed E₈'s mass ratios." },
    { icon: "🔥", title: "1925–today — Weyl, Dynkin and representations", who: "Hermann Weyl 1925–26 · Eugene Dynkin 1947 · Murray Gell-Mann 1961 · Atlas of Lie Groups 2007",
      lead: "A diagram with a handful of dots encodes an entire continuous symmetry.",
      formula: "A₂ ∘—∘     B₂ ∘⇒∘     G₂ ∘⇛∘",
      what: "Dynkin (1947) compressed a root system into a graph: one node per simple root, with edges recording the angle between them. Weyl (1925–26) computed the characters of all irreducible representations of compact Lie groups — the Weyl character formula — by averaging over the group.",
      how: "Every simple Lie algebra over ℂ corresponds to one connected Dynkin diagram, and symmetries of the diagram give its outer automorphisms (D₄'s three-fold symmetry is 'triality').",
      story: "Dynkin was 23, in Gelfand's seminar in Moscow, when he introduced the diagrams. In 2007 the Atlas of Lie Groups team finished computing the Kazhdan–Lusztig–Vogan polynomials for the split real form of E₈; the answer took about 60 gigabytes.",
      today: "The gauge groups of physics are chosen from Cartan's list. Gell-Mann's Eightfold Way (1961) sorted hadrons into representations of SU(3) — the A₂ of lab 2 — and a gap in one of them predicted the Ω⁻ particle, found in 1964." }
  ],
  challenges: [
    "Lab 1: choose the boost and play. Which points never move? Why is det exp(tX) always 1?",
    "Choose the spiral. What is tr X, and at what value of t has the square's area halved?",
    "Lab 2: in B₂ press 'whole orbit'. How many points? Now count the mirrors: how is the number of chambers related to them?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "John Stillwell — Naive Lie Theory", note: "Lie groups through matrix groups, for undergraduates (Springer, 2008).", url: null },
    { type: "TEXTBOOK", title: "Brian Hall — Lie Groups, Lie Algebras, and Representations", note: "The standard matrix-first graduate text.", url: null },
    { type: "ARTICLE", title: "John Baez — The Octonions", note: "How the exceptional Lie algebras grow out of the octonions (Bull. AMS 2002).", url: "https://math.ucr.edu/home/baez/octonions/" },
    { type: "PROJECT", title: "Atlas of Lie Groups and Representations", note: "The software and team behind the E₈ computation.", url: "http://www.liegroups.org/" },
    { type: "BIOGRAPHY", title: "MacTutor — Sophus Lie", note: "From a prison in Fontainebleau to continuous groups.", url: MT("Lie") }
  ]
});

/* ================================================================ REPRESENTATION THEORY */
const S3 = { classes: ["e", "(12)", "(123)"], size: [1, 3, 2], irr: [["trivial", [1, 1, 1]], ["sign", [1, -1, 1]], ["standard", [2, 0, -1]]] };
const REP_PRE = {
  "perm (3 points)": [3, 1, 0], "regular": [6, 0, 0], "std ⊗ std": [4, 0, 1], "sign ⊗ perm": [3, -1, 0], "Sym² std": [3, 1, 0], "(2, 1, 1)?": [2, 1, 1]
};
register("representation-theory", {
  kicker: "GROUPS AS MATRICES · ABOUT 25 MIN",
  hook: "Can a table of nine numbers know every way a group can act on a vector space?",
  intro: "A representation turns each element of a group into a matrix, so symmetry becomes linear algebra. Frobenius found in 1896 that the traces of those matrices — the character — tell you everything: characters of irreducible representations are orthonormal, and any representation splits into irreducibles like a vector into coordinates. The lab decomposes representations of S₃, the six symmetries of a triangle.",
  timeline: [[1896, "Frobenius: characters"], [1898, "Maschke's theorem"], [1901, "Young: tableaux"], [1925, "Weyl: compact groups"], [1939, "Wigner: particles"], [1967, "Langlands' letter"]],
  labs: [{
    kicker: "FROBENIUS 1896 · CHARACTERS OF S₃", title: "Decompose a representation by inner products",
    intro: "A character is a list of traces, one per conjugacy class: the identity, the three flips, the two rotations. Pick one — or type your own — and the lab takes its inner product with each row of the character table. A genuine character always gives whole, non-negative multiplicities.",
    html: `<table class="gk-table rt-tab"></table>
      <div class="gk-chips rt-pre">${Object.keys(REP_PRE).map(k => `<button class="gk-chip" data-k="${k}">${k}</button>`).join("")}</div>
      <div class="gk-row">χ = (<input class="gk-input rt-v" type="number" value="3" style="max-width:4rem">,<input class="gk-input rt-v" type="number" value="1" style="max-width:4rem">,<input class="gk-input rt-v" type="number" value="0" style="max-width:4rem">)</div>
      <div class="gk-out rt-out"></div>
      <div class="gk-chips rt-el">${["e", "(12)", "(123)"].map(e => `<button class="gk-chip" data-e="${e}">${e} in the standard rep</button>`).join("")}</div>
      <div class="gk-out rt-mat"><span class="d">click an element to see its 2×2 matrix acting on the plane of the triangle.</span></div>`,
    caveat: "⟨χ, ψ⟩ = (1/|G|) Σ_g χ(g) ψ(g)̄, summed over all six elements — so each class is weighted by its size (1, 3, 2). Irreducible exactly when ⟨χ, χ⟩ = 1.",
    init(root) {
      const tab = root.querySelector(".rt-tab"), out = root.querySelector(".rt-out"), vs = [...root.querySelectorAll(".rt-v")];
      tab.innerHTML = `<tr><th>class</th>${S3.classes.map((c, i) => `<th>${c}<br><span style="font-size:.52rem">size ${S3.size[i]}</span></th>`).join("")}</tr>` +
        S3.irr.map(([n, ch]) => `<tr><td class="tl">${n}</td>${ch.map(v => `<td>${v}</td>`).join("")}</tr>`).join("");
      function run() {
        const chi = vs.map(v => +v.value || 0);
        const ip = (a, b) => a.reduce((s, x, i) => s + S3.size[i] * x * b[i], 0) / 6;
        const m = S3.irr.map(([, ch]) => ip(chi, ch));
        const ok = m.every(x => Number.isInteger(x) && x >= 0) && chi[0] > 0;
        const dec = m.map((x, i) => x ? `${x > 1 ? x + "·" : ""}${S3.irr[i][0]}` : "").filter(Boolean).join(" ⊕ ");
        out.innerHTML = `χ = (${chi.join(", ")})\n` + m.map((x, i) => `⟨χ, ${S3.irr[i][0].padEnd(8)}⟩ = ${Math.round(x * 6)}/6 = <span class="${Number.isInteger(x) && x >= 0 ? "g" : "r"}">${Number.isInteger(x) ? x : x.toFixed(3)}</span>`).join("\n") +
          `\n⟨χ, χ⟩ = ${ip(chi, chi).toFixed(Number.isInteger(ip(chi, chi)) ? 0 : 3)}\n\n` +
          (ok ? `<span class="t">χ = ${dec}</span>   dimension check: ${chi[0]} = ${m.map((x, i) => x ? `${x}×${S3.irr[i][1][0]}` : "").filter(Boolean).join(" + ")}${ip(chi, chi) === 1 ? "   — irreducible." : ""}`
              : `<span class="r">Not the character of any representation</span> — the multiplicities must be whole numbers ≥ 0.`);
        root.querySelectorAll(".rt-pre .gk-chip").forEach(b => b.classList.toggle("on", REP_PRE[b.dataset.k].join() === chi.join()));
      }
      root.querySelectorAll(".rt-pre .gk-chip").forEach(b => b.addEventListener("click", () => { REP_PRE[b.dataset.k].forEach((v, i) => vs[i].value = v); run(); }));
      vs.forEach(v => v.addEventListener("input", run));
      const MAT = { e: [["1", "0"], ["0", "1"]], "(12)": [["1", "0"], ["0", "−1"]], "(123)": [["−1/2", "−√3/2"], ["√3/2", "−1/2"]] };
      const DESC = { e: "does nothing: trace 2 = χ(e), the dimension", "(12)": "a reflection of the triangle: trace 0", "(123)": "rotation by 120°: trace −1/2 − 1/2 = −1" };
      root.querySelectorAll(".rt-el .gk-chip").forEach(b => b.addEventListener("click", () => {
        root.querySelectorAll(".rt-el .gk-chip").forEach(x => x.classList.toggle("on", x === b));
        const M = MAT[b.dataset.e];
        root.querySelector(".rt-mat").innerHTML = `ρ${b.dataset.e} = [ ${M[0][0].padStart(5)}  ${M[0][1].padStart(5)} ]\n${" ".repeat(b.dataset.e.length + 4)}[ ${M[1][0].padStart(5)}  ${M[1][1].padStart(5)} ]\n<span class="g">${DESC[b.dataset.e]}</span>`;
      }));
      run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1896 — Frobenius invents characters", who: "Georg Frobenius 1896 · prompted by Richard Dedekind's letters",
      lead: "A question of Dedekind's about a determinant led Frobenius to the characters of non-abelian groups.",
      formula: "χ(g) = tr ρ(g)      ⟨χ, ψ⟩ = (1/|G|) Σ χ(g) ψ(g)̄",
      what: "A representation ρ sends each group element to an invertible matrix, respecting multiplication. Its character χ(g) is the trace — the same on conjugate elements. The irreducible characters form an orthonormal basis of such class functions; there are as many as there are conjugacy classes, and the squares of their dimensions add up to |G| (for S₃: 1² + 1² + 2² = 6).",
      how: "Dedekind had noticed that the 'group determinant' det(x_(gh⁻¹)) of an abelian group factors into linear pieces, one per character. In 1896 he wrote to Frobenius about the non-abelian case; within months Frobenius had built the theory of characters to explain the factors.",
      story: "The Dedekind–Frobenius letters are a rare record of a theory being born in real time; Dedekind had played with group determinants since the 1880s and handed the problem over.",
      today: "Character tables of finite groups are stored in the GAP system and the ATLAS of Finite Groups (1985), which lists all 194 irreducible characters of the Monster." },
    { icon: "⚙️", title: "1898–1911 — Maschke, Schur, Burnside", who: "Heinrich Maschke 1898 · William Burnside 1904 · Issai Schur 1905",
      lead: "Over ℂ every representation of a finite group splits into irreducibles, and characters prove theorems about groups themselves.",
      formula: "V ≅ m₁V₁ ⊕ m₂V₂ ⊕ ⋯,      mᵢ = ⟨χ_V, χᵢ⟩",
      what: "Maschke's theorem: every invariant subspace has an invariant complement, so representations break completely into irreducibles. Schur's lemma: a map between irreducibles is zero or an isomorphism — and orthogonality follows. The lab computes the multiplicities mᵢ.",
      how: "The proof of Maschke's theorem averages an inner product over the group, making every ρ(g) unitary. Burnside's pᵃqᵇ theorem (1904) — a group whose order has only two prime factors is solvable — was proved with characters; proofs without them came only in the early 1970s.",
      story: "Burnside's 1897 book left linear representations out; by its second edition (1911) he had become their champion.",
      today: "Fourier analysis is the representation theory of the circle: sines and cosines are its characters. Chemists read character tables of molecular symmetry groups to predict which vibrations appear in infrared and Raman spectra." },
    { icon: "🏛", title: "1900–1927 — the symmetric groups, then compact groups", who: "Frobenius 1900 · Alfred Young 1901–52 · Hermann Weyl 1925–26 · Peter & Weyl 1927",
      lead: "The irreducibles of Sₙ are indexed by partitions of n; compact Lie groups follow, with integrals replacing sums.",
      formula: "dim V_λ = n! / Π (hook lengths)",
      what: "The irreducible representations of Sₙ correspond to Young diagrams with n boxes; their dimensions come from the hook length formula (Frame, Robinson and Thrall, 1954). For S₃ the diagrams 3, 2+1 and 1+1+1 give the trivial, standard and sign representations, of dimensions 1, 2, 1. Weyl extended the theory to compact groups by averaging with Haar measure.",
      how: "The Peter–Weyl theorem (1927) generalises Fourier series to any compact group: functions on the group decompose into matrix entries of its irreducible representations.",
      story: "Young, a clergyman who became rector of Birdbrook in Essex, developed his tableaux in nine papers on 'quantitative substitutional analysis' published between 1901 and 1952.",
      today: "Schur–Weyl duality between Sₙ and GL(d) is used in quantum information to analyse n identical qubits, and Young tableaux appear across combinatorics." },
    { icon: "🔥", title: "1939–today — particles and the Langlands programme", who: "Eugene Wigner 1939 · Gell-Mann & Ne'eman 1961 · Robert Langlands 1967",
      lead: "An elementary particle is an irreducible representation; an arithmetic object is secretly an automorphic one.",
      formula: "particle  ↔  irreducible unitary representation of the Poincaré group (mass, spin)",
      what: "Wigner (1939) classified the irreducible unitary representations of the Poincaré group, the symmetries of special relativity: each is labelled by mass and spin, and each is a possible kind of elementary particle. Langlands (1967) conjectured a vast dictionary between Galois representations in number theory and automorphic representations in analysis.",
      how: "Gell-Mann's Eightfold Way sorted hadrons into representations of SU(3) of dimensions 8 and 10; the missing member of the decuplet predicted the Ω⁻, found at Brookhaven in 1964.",
      story: "Langlands set out his conjectures in a 17-page handwritten letter to André Weil in January 1967, with a cover note: 'If you are willing to read it as pure speculation I would appreciate that; if not — I am sure you have a waste basket handy.'",
      today: "Wiles's proof of Fermat's Last Theorem (1995) established a case of Langlands' dictionary; the geometric Langlands conjecture was proved in 2024 by Gaitsgory, Raskin and collaborators in some 800 pages." }
  ],
  challenges: [
    "Decompose the regular representation (6, 0, 0). Why does each irreducible appear as many times as its dimension?",
    "Why can (2, 1, 1) never be a character? Find the smallest change that makes it one.",
    "The table's columns are orthogonal too: check that 1·1 + 1·(−1) + 2·0 = 0 for the first two columns. What does the column sum of squares give?"
  ],
  sources: [
    { type: "FREE TEXTBOOK", title: "Etingof et al. — Introduction to Representation Theory", note: "MIT lecture notes, from groups to quivers, with historical interludes.", url: "https://arxiv.org/abs/0901.0827" },
    { type: "TEXTBOOK", title: "Fulton & Harris — Representation Theory: A First Course", note: "Characters of finite groups, then Lie algebras by example.", url: null },
    { type: "CLASSIC", title: "Jean-Pierre Serre — Linear Representations of Finite Groups", note: "Part I is the shortest complete account of characters.", url: null },
    { type: "HISTORY", title: "Charles Curtis — Pioneers of Representation Theory", note: "Frobenius, Burnside, Schur and Brauer (AMS, 1999).", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Georg Frobenius", note: "The man who made groups linear.", url: MT("Frobenius") }
  ]
});

/* ================================================================ HOMOLOGICAL ALGEBRA */
function kleinGrid(m) {
  const id = (i, j) => { for (let k = 0; k < 4; k++) { if (j === m) j = 0; if (i === m) { i = 0; j = (m - j) % m; } } return i * m + j; };
  const T = []; for (let i = 0; i < m; i++) for (let j = 0; j < m; j++) { T.push([id(i, j), id(i + 1, j), id(i + 1, j + 1)]); T.push([id(i, j), id(i, j + 1), id(i + 1, j + 1)]); }
  return T;
}
const CX = {
  circle: { name: "circle", V: 3, T: [], E: [[0, 1], [1, 2], [0, 2]], note: "a hollow triangle: one loop that bounds nothing" },
  disk: { name: "disk", V: 3, T: [[0, 1, 2]], note: "fill the triangle in and the loop becomes a boundary" },
  eight: { name: "figure eight", V: 5, T: [], E: [[0, 1], [1, 2], [0, 2], [0, 3], [3, 4], [0, 4]], note: "two loops sharing a vertex" },
  sphere: { name: "sphere", V: 4, T: [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]], note: "the surface of a tetrahedron: a hollow 2-dimensional cavity" },
  torus: { name: "torus", V: 7, T: Array.from({ length: 7 }, (_, i) => [[i, (i + 1) % 7, (i + 3) % 7], [i, (i + 2) % 7, (i + 3) % 7]]).flat(), note: "Möbius's 7-vertex torus: every pair of vertices is an edge" },
  rp2: { name: "projective plane", V: 6, T: [[0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 5], [0, 5, 1], [1, 2, 4], [2, 3, 5], [3, 4, 1], [4, 5, 2], [5, 1, 3]], note: "the 6-vertex projective plane: a hemi-icosahedron" },
  klein: { name: "Klein bottle", V: 9, T: kleinGrid(3), note: "a 3 × 3 grid glued like a torus, but with one side flipped" }
};
function homology(cx, mod2) {
  const T = cx.T.map(t => t.slice().sort((a, b) => a - b)), em = new Map();
  const addE = (a, b) => { const k = a < b ? [a, b] : [b, a]; em.set(k.join(), k); };
  (cx.E || []).forEach(([a, b]) => addE(a, b)); T.forEach(([a, b, c]) => { addE(a, b); addE(b, c); addE(a, c); });
  const E = [...em.values()], ei = new Map(E.map((e, i) => [e.join(), i]));
  const d1 = E.map(([a, b]) => { const r = Array(cx.V).fill(0); r[a] -= 1; r[b] += 1; return r; });
  const d2 = T.map(([a, b, c]) => { const r = Array(E.length).fill(0); r[ei.get(b + "," + c)] += 1; r[ei.get(a + "," + c)] -= 1; r[ei.get(a + "," + b)] += 1; return r; });
  const rank = M => { M = M.map(r => r.map(x => mod2 ? ((x % 2) + 2) % 2 : x)); let rk = 0; const R = M.length, Cn = R ? M[0].length : 0;
    for (let c = 0; c < Cn && rk < R; c++) { let p = rk; while (p < R && Math.abs(M[p][c]) < 1e-9) p++; if (p === R) continue; [M[p], M[rk]] = [M[rk], M[p]];
      for (let i = 0; i < R; i++) if (i !== rk && Math.abs(M[i][c]) > 1e-9) { if (mod2) M[i] = M[i].map((x, j) => (x + M[rk][j]) % 2); else { const f = M[i][c] / M[rk][c]; M[i] = M[i].map((x, j) => x - f * M[rk][j]); } }
      rk++; } return rk; };
  // ∂₁∘∂₂ = 0 check
  let dd = true; for (const row of d2) { const s = Array(cx.V).fill(0); row.forEach((c, j) => { if (c) d1[j].forEach((x, k) => s[k] += c * x); }); if (s.some(x => x)) dd = false; }
  const r1 = rank(d1), r2 = T.length ? rank(d2) : 0;
  return { V: cx.V, E: E.length, F: T.length, E_: E, T, r1, r2, b: [cx.V - r1, E.length - r1 - r2, T.length - r2], dd };
}
register("homological-algebra", {
  kicker: "COUNTING HOLES WITH ALGEBRA · ABOUT 25 MIN",
  hook: "How does linear algebra detect the hole in a doughnut?",
  intro: "Homological algebra grew out of topology. To count the holes of a shape, cut it into triangles, form vector spaces of vertices, edges and triangles, and connect them by boundary maps. The boundary of a boundary is always zero, and homology — cycles modulo boundaries — counts the holes in each dimension. Cartan and Eilenberg turned the machinery into a subject of its own in 1956. The lab computes the homology of seven shapes.",
  timeline: [[1895, "Poincaré: Analysis Situs"], [1925, "Noether: homology groups"], [1941, "exact sequences"], [1942, "Eilenberg–Mac Lane: Ext"], [1956, "Cartan–Eilenberg"], [1957, "Grothendieck: Tôhoku"]],
  labs: [{
    kicker: "POINCARÉ 1895 · BETTI NUMBERS", title: "Homology by rank and nullity",
    intro: "Choose a triangulated shape and a field of coefficients. The lab writes down the boundary matrices ∂₁ (edges → vertices) and ∂₂ (triangles → edges), row-reduces them, and reads off the Betti numbers bₖ = dim ker ∂ₖ − rank ∂ₖ₊₁: connected pieces, independent loops, enclosed cavities.",
    html: `<div class="gk-chips hx-pre">${Object.entries(CX).map(([k, c]) => `<button class="gk-chip${k === "torus" ? " on" : ""}" data-k="${k}">${c.name}</button>`).join("")}</div>
      <div class="gk-chips hx-f"><button class="gk-chip on" data-f="Q">coefficients in ℚ</button><button class="gk-chip" data-f="2">coefficients in 𝔽₂ (mod 2)</button></div>
      <canvas class="gk-canvas hx-cv"></canvas>
      <table class="gk-table hx-tab"></table>
      <div class="gk-out hx-out"></div>`,
    caveat: "The Euler characteristic V − E + F equals b₀ − b₁ + b₂ whatever the coefficients. But the Betti numbers themselves can change: the projective plane and the Klein bottle have 'torsion', a loop that bounds only when traversed twice — invisible over ℚ, visible mod 2.",
    init(root) {
      let key = "torus", f2 = false;
      const cv = root.querySelector(".hx-cv"), tab = root.querySelector(".hx-tab"), out = root.querySelector(".hx-out");
      function run() {
        const cx = CX[key], H = homology(cx, f2);
        const { ctx, w, h } = canvas(cv, 210), R = h / 2 - 18, ox = w / 2, oy = h / 2;
        const P = i => [ox + R * Math.sin(2 * Math.PI * i / cx.V), oy - R * Math.cos(2 * Math.PI * i / cx.V)];
        H.T.forEach(([a, b, c], i) => { ctx.fillStyle = `hsla(${(i * 47) % 360}, 70%, 60%, .07)`; ctx.beginPath(); ctx.moveTo(...P(a)); ctx.lineTo(...P(b)); ctx.lineTo(...P(c)); ctx.fill(); });
        ctx.strokeStyle = "rgba(127,227,214,.55)"; ctx.lineWidth = 1.2;
        H.E_.forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(...P(a)); ctx.lineTo(...P(b)); ctx.stroke(); });
        for (let i = 0; i < cx.V; i++) { const [x, y] = P(i); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill(); ctx.fillStyle = "#cfc9e4"; ctx.font = "10px IBM Plex Mono"; ctx.fillText(i, x + 6, y - 5); }
        ctx.fillStyle = "#9a93b8"; ctx.fillText("vertices on a circle, edges as chords; triangles tinted", 8, h - 6);
        const ker1 = H.E - H.r1;
        tab.innerHTML = `<tr><th>k</th><th>simplices dim Cₖ</th><th>rank ∂ₖ</th><th>dim ker ∂ₖ</th><th>rank ∂ₖ₊₁</th><th>bₖ</th></tr>
          <tr><td>0</td><td>${H.V} vertices</td><td>0</td><td>${H.V}</td><td>${H.r1}</td><td class="hl">${H.b[0]}</td></tr>
          <tr><td>1</td><td>${H.E} edges</td><td>${H.r1}</td><td>${ker1}</td><td>${H.r2}</td><td class="hl">${H.b[1]}</td></tr>
          <tr><td>2</td><td>${H.F} triangles</td><td>${H.r2}</td><td>${H.F - H.r2}</td><td>0</td><td class="hl">${H.b[2]}</td></tr>`;
        const chi = H.V - H.E + H.F;
        out.innerHTML = `${cx.name}: ${cx.note}\n∂₁ ∘ ∂₂ = 0  ${H.dd ? '<span class="t">✓ (checked on every triangle)</span>' : '<span class="r">✗</span>'}\n` +
          `<span class="g">Betti numbers over ${f2 ? "𝔽₂" : "ℚ"}: b₀ = ${H.b[0]}, b₁ = ${H.b[1]}, b₂ = ${H.b[2]}</span>\n` +
          `χ = V − E + F = ${H.V} − ${H.E} + ${H.F} = ${chi}  =  ${H.b[0]} − ${H.b[1]} + ${H.b[2]} ✓`;
      }
      root.querySelectorAll(".hx-pre .gk-chip").forEach(b => b.addEventListener("click", () => { key = b.dataset.k; root.querySelectorAll(".hx-pre .gk-chip").forEach(x => x.classList.toggle("on", x === b)); run(); }));
      root.querySelectorAll(".hx-f .gk-chip").forEach(b => b.addEventListener("click", () => { f2 = b.dataset.f === "2"; root.querySelectorAll(".hx-f .gk-chip").forEach(x => x.classList.toggle("on", x === b)); run(); }));
      run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1895 — Poincaré counts holes", who: "Henri Poincaré, Analysis Situs 1895 and five Compléments to 1904 · Enrico Betti 1871",
      lead: "Poincaré attached numbers to shapes — the Betti numbers — and invented chains and boundaries to compute them.",
      formula: "∂[a, b, c] = [b, c] − [a, c] + [a, b]      ∂ ∘ ∂ = 0",
      what: "A k-chain is a formal combination of k-dimensional pieces; the boundary map ∂ sends a triangle to its three edges, with signs, and an edge to its endpoints. Cycles are chains with no boundary; every boundary is a cycle because ∂∂ = 0. The k-th Betti number counts the k-cycles that are not boundaries — holes of dimension k.",
      how: "Euler's V − E + F = 2 for polyhedra reappears as the alternating sum of Betti numbers — a topological invariant that doesn't depend on how the shape was cut up.",
      story: "Analysis Situs (1895) contained mistakes that Poul Heegaard pointed out in 1898. Poincaré repaired them in five supplements, the last of which (1904) ends with the question now called the Poincaré conjecture.",
      today: "Topological data analysis computes the homology of point clouds at every scale (persistent homology, from about 2000) to find loops and voids in data from proteins to neural activity." },
    { icon: "⚙️", title: "1925 — Noether: groups, not numbers", who: "Emmy Noether 1925 · Leopold Vietoris · Heinz Hopf · Pavel Alexandrov",
      lead: "Betti numbers are shadows; the real invariants are homology groups.",
      formula: "Hₖ = ker ∂ₖ / im ∂ₖ₊₁",
      what: "Noether insisted that homology be a group: cycles modulo boundaries. Groups carry information numbers miss — torsion. The projective plane has H₁ = ℤ/2, a loop that bounds only when traversed twice: invisible over ℚ, visible mod 2 (the lab).",
      how: "The universal coefficient theorem says how homology over ℤ determines homology over any field; the correction term is Tor, one of the first derived functors.",
      story: "Noether's point was made in lectures in Göttingen attended by Hopf and Alexandrov, and in a short note of 1925; by 1930 'homology groups' were standard.",
      today: "Homology over 𝔽₂ is exactly what the lab computes, and it underlies Kitaev's toric code (1997): the two logical qubits of a quantum memory on a torus are the two independent loops of H₁." },
    { icon: "🏛", title: "1941–1956 — exact sequences, Ext and Tor", who: "Witold Hurewicz 1941 · Samuel Eilenberg & Saunders Mac Lane 1942 · Henri Cartan & Eilenberg 1956",
      lead: "Measure how badly a construction fails to be exact — and turn the failure into new invariants.",
      formula: "0 → A → B → C → 0   ⇒   ⋯ → Hₖ(A) → Hₖ(B) → Hₖ(C) → Hₖ₋₁(A) → ⋯",
      what: "A sequence of maps is exact when each image is exactly the next kernel. A short exact sequence of chain complexes gives a long exact sequence in homology — the workhorse of every computation. Ext and Tor measure how far Hom and ⊗ are from preserving exactness; Ext¹(A, B) classifies the ways to build a bigger object out of A and B.",
      how: "Resolve an object by free ones, apply a functor, take homology: that is a derived functor, and Cartan–Eilenberg's book made the recipe general.",
      story: "Eilenberg and Mac Lane's 1942 work on Ext for group extensions led them straight to the definition of categories and functors (1945). Cartan and Eilenberg's 'Homological Algebra' (1956) named the subject.",
      today: "Group cohomology, sheaf cohomology and Hochschild homology (which controls deformations of algebras) all come from the same recipe." },
    { icon: "🔥", title: "1946–today — spectral sequences and derived categories", who: "Jean Leray 1946 · Alexander Grothendieck, 'Tôhoku' 1957 · Jean-Louis Verdier 1967 · Maxim Kontsevich 1994",
      lead: "Stop taking homology too early: keep the whole complex, up to quasi-isomorphism.",
      formula: "D(𝒜) = chain complexes, with quasi-isomorphisms made invertible",
      what: "Grothendieck's Tôhoku paper (1957) defined abelian categories and derived functors in general, making sheaf cohomology part of homological algebra. Verdier's derived categories (thesis, 1967) treat complexes as objects in their own right, remembering more than their homology.",
      how: "Spectral sequences compute homology in successive approximations, each page the homology of the previous one — a machine for long exact sequences stacked together.",
      story: "Leray invented sheaves and spectral sequences as a prisoner of war in Oflag XVII-A in Austria (1940–45), where he chose to work on topology rather than fluid mechanics, which might have been useful to the German war effort.",
      today: "Kontsevich's homological mirror symmetry (1994) conjectures an equivalence between derived categories in algebraic geometry and Fukaya categories in symplectic geometry; ∞-categories (Lurie) are the latest heir." }
  ],
  challenges: [
    "Compare the torus and the sphere. Which Betti number differs, and what kind of hole does it count?",
    "Switch the projective plane between ℚ and 𝔽₂. Why do b₁ and b₂ change together? Check that χ does not.",
    "Fill in the circle to get the disk: which rank changed, and why did b₁ drop from 1 to 0?"
  ],
  sources: [
    { type: "FREE TEXTBOOK", title: "Allen Hatcher — Algebraic Topology", note: "Chapter 2 builds simplicial and singular homology from scratch.", url: "https://pi.math.cornell.edu/~hatcher/AT/ATpage.html" },
    { type: "FREE BOOK", title: "Robert Ghrist — Elementary Applied Topology", note: "Homology for data, sensors and networks, with pictures.", url: "https://www2.math.upenn.edu/~ghrist/notes.html" },
    { type: "HISTORY", title: "Charles Weibel — History of Homological Algebra", note: "From Riemann and Betti to derived categories.", url: "https://sites.math.rutgers.edu/~weibel/HA-history.pdf" },
    { type: "TEXTBOOK", title: "Charles Weibel — An Introduction to Homological Algebra", note: "The standard graduate text (Cambridge, 1994).", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Henri Poincaré", note: "The founder of algebraic topology.", url: MT("Poincare") }
  ]
});
})();
