// ORDER & UNIVERSAL ALGEBRA — field guides for Posets & Lattices, Boolean Algebras and Universal Algebra.
(function () {
"use strict";
const { register, canvas, C } = GuideKit;
const MT = s => "https://mathshistory.st-andrews.ac.uk/Biographies/" + s + "/";
const chips = (root, sel, cb) => root.querySelectorAll(sel + " .gk-chip").forEach(b => b.addEventListener("click", () => { root.querySelectorAll(sel + " .gk-chip").forEach(x => x.classList.toggle("on", x === b)); cb(b.dataset); }));

/* ================================================================ LATTICES */
const MONO = {
  closure: { name: "x ↦ lcm(x, 6)", f: x => x * 6 / gcd(x, 6) },
  shrink: { name: "x ↦ gcd(2x, 60)", f: x => gcd(2 * x, 60) },
  cap: { name: "x ↦ gcd(x·x, 60)", f: x => gcd(x * x, 60) }
};
function gcd(a, b) { while (b) [a, b] = [b, a % b]; return a; }
register("lattices", {
  kicker: "ORDER AS STRUCTURE · ABOUT 20 MIN",
  hook: "Why must every order-preserving map on a complete lattice have a fixed point?",
  intro: "A lattice is an ordered set in which any two elements have a least upper bound and a greatest lower bound: divisors under divisibility (gcd and lcm), subsets under inclusion, propositions under implication. Tarski's fixed-point theorem (1955) says a monotone map on a complete lattice always has a least fixed point, reached from the bottom by iteration in the finite case. The lab iterates on the divisors of 60.",
  timeline: [[1847, "Boole's algebra"], [1897, "Dedekind: dual groups"], [1933, "Birkhoff: lattice theory"], [1937, "complete lattices"], [1955, "Tarski's fixed-point theorem"], [1970, "Scott domains"]],
  labs: [{
    kicker: "KNASTER–TARSKI 1928/1955", title: "Climb to the least fixed point",
    intro: "The divisors of 60 form a lattice (meet = gcd, join = lcm). Pick a monotone map and start at 1, the bottom. Apply it repeatedly: the values rise and stop at the least fixed point.",
    html: `<div class="gk-chips lt-f">${Object.entries(MONO).map(([k, m], i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-k="${k}">${m.name}</button>`).join("")}</div>
      <canvas class="gk-canvas lt-cv"></canvas><div class="gk-out lt-out"></div>`,
    caveat: "Monotone means x | y ⇒ f(x) | f(y). Starting from the bottom, 1 | f(1) | f(f(1)) | ⋯ can only rise, and in a finite lattice it must stop — at a fixed point below every other fixed point.",
    init(root) {
      const D = [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60], cv = root.querySelector(".lt-cv"), out = root.querySelector(".lt-out");
      const rank = d => { let r = 0; for (const p of [2, 3, 5]) while (d % p === 0) { d /= p; r++; } return r; };
      const run = k => {
        const f = MONO[k].f, path = [1]; while (path.length < 12) { const nx = f(path[path.length - 1]); if (nx === path[path.length - 1]) break; path.push(nx); }
        const fixed = D.filter(d => f(d) === d);
        const { ctx, w, h } = canvas(cv, 230), byR = [0, 1, 2, 3, 4].map(r => D.filter(d => rank(d) === r)), pos = {};
        byR.forEach((row, r) => row.forEach((d, i) => pos[d] = [w * (i + 1) / (row.length + 1), h - 20 - r * (h - 40) / 4]));
        ctx.strokeStyle = "rgba(255,255,255,.2)"; D.forEach(a => D.forEach(b => { if (b !== a && b % a === 0 && [2, 3, 5].includes(b / a)) { ctx.beginPath(); ctx.moveTo(...pos[a]); ctx.lineTo(...pos[b]); ctx.stroke(); } }));
        ctx.strokeStyle = C.gold; ctx.lineWidth = 2.5; ctx.beginPath(); path.forEach((d, i) => i ? ctx.lineTo(...pos[d]) : ctx.moveTo(...pos[d])); ctx.stroke();
        D.forEach(d => { ctx.fillStyle = fixed.includes(d) ? C.teal : "#2a2140"; ctx.beginPath(); ctx.arc(...pos[d], 12, 0, 7); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "10px IBM Plex Mono"; ctx.textAlign = "center"; ctx.fillText(d, pos[d][0], pos[d][1] + 3); });
        out.innerHTML = `iterate from 1: ${path.join(" → ")}\n<span class="g">least fixed point: ${path[path.length - 1]}</span>\nall fixed points (teal): {${fixed.join(", ")}} — they form a lattice too (Tarski)`;
      };
      chips(root, ".lt-f", d => run(d.k)); run("closure");
    }
  }],
  chapters: [
    { icon: "🏛", title: "1897–1933 — Dedekind and Birkhoff", who: "Richard Dedekind 1897, 1900 · Garrett Birkhoff 1933",
      lead: "gcd and lcm, intersection and union, obey the same laws.",
      formula: "x ∧ (x ∨ y) = x,   x ∨ (x ∧ y) = x",
      what: "Dedekind studied 'Dualgruppen' (1897, 1900) — lattices — finding the modular law in ideals of rings. Birkhoff's papers from 1933 and his book Lattice Theory (1940) made it a field, including his representation of finite distributive lattices as down-sets of a poset.",
      how: "Every finite lattice is determined by its Hasse diagram; distributive ones are exactly those without the 'pentagon' N₅ or 'diamond' M₃ inside (see the lattices atom).",
      story: "Birkhoff was the son of the dynamicist G. D. Birkhoff.",
      today: "Formal concept analysis builds lattices of concepts from data tables." },
    { icon: "⚙️", title: "1928–1955 — fixed points", who: "Bronisław Knaster & Alfred Tarski 1928 · Tarski 1955 · Anne Davis 1955",
      lead: "Monotone maps on complete lattices always have fixed points — and only complete lattices guarantee it.",
      formula: "least fixed point = ⋀ { x : f(x) ≤ x }",
      what: "Knaster and Tarski proved the theorem for sets (1928); Tarski's general version (1955) says the fixed points form a complete lattice. Davis (1955) proved the converse: a lattice where every monotone map has a fixed point is complete.",
      how: "The Schröder–Bernstein theorem of set theory is a quick corollary.",
      story: "Tarski used it to give semantics to recursion and truth.",
      today: "Static analysers and compilers compute least fixed points over lattices of abstract values (Cousot's abstract interpretation, 1977)." },
    { icon: "🔥", title: "1970–today — domains and computation", who: "Dana Scott 1970 · Christopher Strachey",
      lead: "Programs denote elements of ordered spaces; recursion is a least fixed point.",
      formula: "⟦fix f⟧ = ⊔ₙ fⁿ(⊥)",
      what: "Scott's domain theory (1970) gave the untyped λ-calculus a mathematical model, with 'more defined' as the order. A recursive program's meaning is the least fixed point of a continuous function, reached by iterating from 'undefined' ⊥ — exactly the lab's climb.",
      how: "Continuity (preserving limits of chains) replaces monotonicity to handle infinite iterations.",
      story: "Scott received the Turing Award in 1976 (with Rabin) for earlier work on automata.",
      today: "Datalog engines, type checkers and dataflow analyses all compute lattice fixed points." }
  ],
  challenges: ["Why is x ↦ gcd(2x, 60) monotone for divisibility?", "Find a function on the divisors of 60 that is not monotone.", "Which element is the greatest fixed point of each map?"],
  sources: [
    { type: "TEXTBOOK", title: "Davey & Priestley — Introduction to Lattices and Order", note: "The standard undergraduate text.", url: null },
    { type: "PAPER · 1955", title: "Alfred Tarski — A lattice-theoretical fixpoint theorem and its applications", note: "Pacific Journal of Mathematics 5.", url: "https://doi.org/10.2140/pjm.1955.5.285" },
    { type: "BIOGRAPHY", title: "MacTutor — Garrett Birkhoff", note: "Lattice theory and universal algebra.", url: MT("Birkhoff_Garrett") }
  ]
});

/* ================================================================ BOOLEAN ALGEBRAS */
register("boolean", {
  kicker: "THE ALGEBRA OF LOGIC · ABOUT 20 MIN",
  hook: "How many different logical functions of three inputs are there — and what is the simplest circuit for each?",
  intro: "Boole (1847) showed that logic obeys algebraic laws. Every Boolean function can be written as an OR of AND-terms (disjunctive normal form); Shannon (1937) saw that this is circuit design. Stone (1936) proved every Boolean algebra is an algebra of sets. The lab builds a function from its truth table and simplifies it.",
  timeline: [[1847, "Boole: The Mathematical Analysis of Logic"], [1880, "Peirce: NOR is universal"], [1904, "Huntington's axioms"], [1936, "Stone representation"], [1937, "Shannon's thesis"], [1953, "Karnaugh maps"]],
  labs: [{
    kicker: "SHANNON 1937 · QUINE–McCLUSKEY 1952", title: "From truth table to formula",
    intro: "Click the output bits of a three-input function f(a, b, c). The lab writes its minterm form and a minimal sum of products.",
    html: `<div class="gk-cells bo-cells" style="grid-template-columns:repeat(8,1fr);max-width:360px"></div>
      <div class="gk-chips bo-pre"><button class="gk-chip" data-v="232">majority</button><button class="gk-chip" data-v="150">parity (XOR)</button><button class="gk-chip" data-v="254">a ∨ b ∨ c</button><button class="gk-chip" data-v="226">multiplexer</button></div>
      <div class="gk-out bo-out"></div>`,
    caveat: "There are 2^(2³) = 256 functions of three inputs. Each minterm is an atom of the free Boolean algebra on a, b, c; the function corresponds to the set of atoms where it is true — Stone's theorem in miniature.",
    init(root) {
      let v = 232; const cells = root.querySelector(".bo-cells"), out = root.querySelector(".bo-out");
      const lit = (m, mask) => ["a", "b", "c"].map((x, i) => mask >> (2 - i) & 1 ? (m >> (2 - i) & 1 ? x : "¬" + x) : "").filter(Boolean).join("");
      const minimise = () => { // brute force: smallest set of implicants (cubes) covering the true minterms
        const ones = [...Array(8).keys()].filter(m => v >> m & 1); if (!ones.length) return "0"; if (ones.length === 8) return "1";
        const cubes = []; for (let mask = 0; mask < 8; mask++) for (let m = 0; m < 8; m++) { if (m & ~mask) continue; const cov = [...Array(8).keys()].filter(x => (x & mask) === m); if (cov.every(x => v >> x & 1) && !cubes.some(c => c.mask === mask && c.m === m)) cubes.push({ mask, m, cov }); }
        let best = null; for (let s = 1; s < 1 << Math.min(cubes.length, 18); s++) { const pick = cubes.filter((_, i) => s >> i & 1); if (best && pick.length > best.length) continue; if (ones.every(o => pick.some(c => c.cov.includes(o)))) { const cost = pick.reduce((t, c) => t + [0, 1, 1, 2, 1, 2, 2, 3][c.mask], 0); if (!best || pick.length < best.length || cost < best.cost) { best = pick; best.cost = cost; } } }
        return best.map(c => lit(c.m, c.mask) || "1").join(" ∨ ");
      };
      const run = () => {
        cells.innerHTML = [...Array(8).keys()].map(m => `<div class="gk-cell" data-m="${m}" style="flex-direction:column;aspect-ratio:auto;padding:.3rem 0;background:${v >> m & 1 ? "rgba(245,196,81,.5)" : "rgba(255,255,255,.05)"}"><span style="font-size:.55rem;color:#9d96b8">${(m >> 2) & 1}${(m >> 1) & 1}${m & 1}</span>${v >> m & 1}</div>`).join("");
        cells.querySelectorAll(".gk-cell").forEach(c => c.addEventListener("click", () => { v ^= 1 << +c.dataset.m; run(); }));
        const ones = [...Array(8).keys()].filter(m => v >> m & 1);
        out.innerHTML = `inputs abc above each bit · function number ${v} of 256\nminterm form: ${ones.length ? ones.map(m => lit(m, 7)).join(" ∨ ") : "0"}\n<span class="g">minimal sum of products: ${minimise()}</span>`;
      };
      root.querySelectorAll(".bo-pre .gk-chip").forEach(b => b.addEventListener("click", () => { v = +b.dataset.v; run(); })); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1847–1904 — logic as algebra", who: "George Boole 1847, 1854 · Augustus De Morgan · Charles Peirce 1880 · Edward Huntington 1904",
      lead: "x·x = x: the law that makes logic different from arithmetic.",
      formula: "¬(x ∧ y) = ¬x ∨ ¬y",
      what: "Boole's Mathematical Analysis of Logic (1847) and Laws of Thought (1854) treated propositions as quantities obeying x² = x. De Morgan stated his laws; Peirce (1880) found that a single operation, NOR, can express everything. Huntington (1904) gave axioms for Boolean algebras.",
      how: "Every Boolean function has a disjunctive normal form: an OR of the rows where it is true.",
      story: "Boole, largely self-taught, became professor at Queen's College, Cork.",
      today: "Every digital device is built from Boolean gates." },
    { icon: "⚙️", title: "1936–1937 — Stone and Shannon", who: "Marshall Stone 1936 · Claude Shannon 1937",
      lead: "Every Boolean algebra is a field of sets; every switching circuit is a Boolean expression.",
      formula: "B ≅ clopen subsets of Spec(B), the space of ultrafilters",
      what: "Stone's representation theorem (1936) turns any Boolean algebra into clopen sets of a compact, totally disconnected space — Stone duality, the prototype of algebra–geometry dualities. Shannon's master's thesis (1937) showed relay circuits compute Boolean expressions and could be simplified algebraically.",
      how: "Ultrafilters play the role of points; in a finite algebra they are the atoms (the lab's minterms).",
      story: "Shannon's thesis has been called the most important master's thesis of the twentieth century.",
      today: "Stone duality inspired Grothendieck's Spec and pointless topology; logic synthesis tools minimise circuits with billions of gates." },
    { icon: "🔥", title: "1952–today — minimisation and SAT", who: "Willard Quine 1952 · Edward McCluskey 1956 · Maurice Karnaugh 1953 · Stephen Cook 1971",
      lead: "Simplifying formulas is hard; deciding if one can be true is the original NP-complete problem.",
      formula: "SAT: is there an assignment making φ true?",
      what: "Karnaugh maps and the Quine–McCluskey algorithm minimise small functions (the lab searches by brute force). Cook (1971) proved Boolean satisfiability NP-complete.",
      how: "Modern SAT solvers (conflict-driven clause learning) nonetheless solve industrial instances with millions of variables.",
      story: "SAT solvers settled the Boolean Pythagorean triples problem in 2016 with a 200-terabyte proof.",
      today: "Hardware verification, scheduling and even mathematics (Keller's conjecture, 2020) run on SAT solvers." }
  ],
  challenges: ["Why does parity (XOR) need all four of its minterms?", "Find a function whose minimal form has a single term.", "Show majority = ab ∨ bc ∨ ac from the table."],
  sources: [
    { type: "ORIGINAL · 1854", title: "George Boole — An Investigation of the Laws of Thought", note: "Free at Project Gutenberg.", url: "https://www.gutenberg.org/ebooks/15114" },
    { type: "TEXTBOOK", title: "Givant & Halmos — Introduction to Boolean Algebras", note: "From axioms to Stone duality.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — George Boole", note: "The Laws of Thought.", url: MT("Boole") }
  ]
});

/* ================================================================ UNIVERSAL ALGEBRA */
register("universal-algebra", {
  kicker: "ALGEBRA ABOUT ALGEBRAS · ABOUT 20 MIN",
  hook: "Of all 16 ways to define an operation on {0, 1}, how many are associative?",
  intro: "Universal algebra studies algebraic structures in general: a set with operations, classified by the equations they satisfy. Birkhoff (1935) proved that classes defined by equations — varieties like groups, rings and lattices — are exactly those closed under products, subalgebras and images. The lab tests laws on every binary operation on two elements.",
  timeline: [[1898, "Whitehead: Universal Algebra"], [1935, "Birkhoff's HSP theorem"], [1955, "Tarski's school"], [1963, "Lawvere theories"], [1970, "Knuth–Bendix completion"], [2017, "CSP dichotomy"]],
  labs: [{
    kicker: "BIRKHOFF 1935", title: "Test the laws on every operation on {0, 1}",
    intro: "Click an operation (named by its table x∘y for xy = 00, 01, 10, 11). The lab checks associativity, commutativity, idempotence and identity.",
    html: `<div class="gk-chips ua-ops">${[...Array(16).keys()].map(k => `<button class="gk-chip${k === 8 ? " on" : ""}" data-k="${k}">${[0, 1, 2, 3].map(i => k >> (3 - i) & 1).join("")}</button>`).join("")}</div>
      <div class="gk-out ua-out"></div>`,
    caveat: "8 of the 16 operations are associative (semigroups). Laws like associativity are equations, so the structures satisfying them form a variety, closed under products and substructures — Birkhoff's theorem.",
    init(root) {
      const out = root.querySelector(".ua-out"), NAMES = { 1: "AND", 7: "OR", 6: "XOR", 9: "XNOR", 14: "NAND", 8: "NOR", 3: "x (left)", 5: "y (right)", 13: "x → y"};
      const run = k => { const op = (x, y) => k >> (3 - (2 * x + y)) & 1, V = [0, 1];
        const assoc = V.every(x => V.every(y => V.every(z => op(op(x, y), z) === op(x, op(y, z))))), comm = V.every(x => V.every(y => op(x, y) === op(y, x))), idem = V.every(x => op(x, x) === x);
        const id = V.find(e => V.every(x => op(e, x) === x && op(x, e) === x));
        let count = 0; for (let j = 0; j < 16; j++) { const o = (x, y) => j >> (3 - (2 * x + y)) & 1; if (V.every(x => V.every(y => V.every(z => o(o(x, y), z) === o(x, o(y, z)))))) count++; }
        out.innerHTML = `table: 0∘0=${op(0, 0)}  0∘1=${op(0, 1)}  1∘0=${op(1, 0)}  1∘1=${op(1, 1)}   ${NAMES[k] ? "(" + NAMES[k] + ")" : ""}\nassociative: ${assoc ? "✓" : "✗"}   commutative: ${comm ? "✓" : "✗"}   idempotent: ${idem ? "✓" : "✗"}   identity: ${id === undefined ? "none" : id}\n` +
          (assoc && id !== undefined ? `<span class="t">a monoid</span>` : assoc ? `<span class="g">a semigroup</span>` : `<span class="r">not associative</span>`) + `\n<span class="d">associative operations on {0, 1}: ${count} of 16</span>`; };
      chips(root, ".ua-ops", d => run(+d.k)); run(8);
    }
  }],
  chapters: [
    { icon: "🏛", title: "1898–1935 — from Whitehead to Birkhoff", who: "Alfred North Whitehead 1898 · Garrett Birkhoff 1935",
      lead: "Study all algebras at once, through their equations.",
      formula: "variety = HSP(K): images of subalgebras of products",
      what: "Whitehead's Treatise on Universal Algebra (1898) proposed the idea. Birkhoff (1935) made it precise: a signature lists operations; a variety is defined by equations; the HSP theorem says varieties are exactly the classes closed under homomorphic images (H), subalgebras (S) and products (P).",
      how: "Every variety has free algebras — groups have free groups, rings polynomial rings — built from terms modulo the equations.",
      story: "Birkhoff's paper appeared in the same year as his first lattice papers.",
      today: "Term rewriting and equational reasoning in proof assistants use these ideas." },
    { icon: "⚙️", title: "1950s–1970 — model theory and rewriting", who: "Alfred Tarski · Anatoly Mal'cev · Donald Knuth & Peter Bendix 1970",
      lead: "Deciding which equations follow from others.",
      formula: "(x∘y)∘z → x∘(y∘z)",
      what: "Tarski's school and Mal'cev connected universal algebra to logic. Knuth–Bendix completion (1970) turns a set of equations into a rewriting system that decides the word problem when it terminates.",
      how: "Critical pairs — overlaps between rewrite rules — are resolved until the system is confluent.",
      story: "In 1996 McCune's program EQP proved the Robbins conjecture: that Robbins algebras are Boolean — a problem open since the 1930s.",
      today: "Automated theorem provers use Knuth–Bendix completion." },
    { icon: "🔥", title: "1963–today — Lawvere theories and the CSP dichotomy", who: "F. William Lawvere 1963 · Andrei Bulatov & Dmitriy Zhuk 2017",
      lead: "Universal algebra meets categories — and settles a complexity question.",
      formula: "CSP(Γ) is in P or NP-complete",
      what: "Lawvere (1963) described varieties as categories with finite products. Feder and Vardi conjectured (1993) that every constraint satisfaction problem over a finite template is either polynomial or NP-complete; Bulatov and Zhuk proved it independently in 2017 using polymorphisms — the operations preserving the constraints.",
      how: "A CSP is easy exactly when its polymorphisms satisfy certain equations (e.g. a weak near-unanimity operation).",
      story: "Both proofs were hundreds of pages; the question had been open for 24 years.",
      today: "The algebraic approach now classifies the complexity of counting and optimisation problems too." }
  ],
  challenges: ["Which operations are both associative and commutative with an identity?", "Why is NAND not associative?", "Find the two projections (x∘y = x and x∘y = y): are they associative?"],
  sources: [
    { type: "FREE BOOK", title: "Burris & Sankappanavar — A Course in Universal Algebra", note: "Free online edition.", url: "https://www.math.uwaterloo.ca/~snburris/htdocs/ualg.html" },
    { type: "BOOK", title: "Baader & Nipkow — Term Rewriting and All That", note: "Equational reasoning and completion.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Garrett Birkhoff", note: "The HSP theorem.", url: MT("Birkhoff_Garrett") }
  ]
});
})();
