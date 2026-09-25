// NUMBER THEORY — field guides for Elementary, Analytic and Algebraic Number Theory, Modular Forms,
// Diophantine Equations and Computational Number Theory. Each registers with GuideKit.
(function () {
"use strict";
const { register, canvas, C } = GuideKit;
const MT = s => "https://mathshistory.st-andrews.ac.uk/Biographies/" + s + "/";
const fx = (v, d = 6) => (Math.abs(v) < 1e-12 ? 0 : v).toFixed(d).replace("-", "−");
const isPrime = n => { if (n < 2) return false; for (let p = 2; p * p <= n; p++) if (n % p === 0) return false; return true; };
const primesTo = n => { const r = []; for (let k = 2; k <= n; k++) if (isPrime(k)) r.push(k); return r; };
const chips = (root, sel, cb) => root.querySelectorAll(sel + " .gk-chip").forEach(b => b.addEventListener("click", () => { root.querySelectorAll(sel + " .gk-chip").forEach(x => x.classList.toggle("on", x === b)); cb(b.dataset); }));
const bmod = (a, m) => ((a % m) + m) % m;
const bpow = (b, e, m) => { let r = 1n; b = bmod(b, m); while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; };

/* ================================================================ ELEMENTARY */
const CF_X = { "√2": Math.SQRT2, "golden φ": (1 + Math.sqrt(5)) / 2, "π": Math.PI, "e": Math.E, "√7": Math.sqrt(7), "355/113": 355 / 113 };
register("elementary-nt", {
  kicker: "WHOLE NUMBERS · ABOUT 25 MIN",
  hook: "What is the best fraction for π with a small denominator — and why is 355/113 so astonishingly good?",
  intro: "Elementary number theory studies whole numbers with whole-number tools: divisibility, primes, congruences. Its oldest algorithm, Euclid's, finds greatest common divisors by repeated division; run on a real number instead of a fraction it produces the continued fraction, which gives the best rational approximations there are. The lab expands any number that way.",
  timeline: [[-300, "Euclid: gcd and infinitely many primes"], [1202, "Fibonacci's Liber Abaci"], [1640, "Fermat's little theorem"], [1737, "Euler: continued fractions"], [1796, "Gauss: quadratic reciprocity"], [1801, "Disquisitiones Arithmeticae"]],
  labs: [{
    kicker: "EUCLID · EULER 1737", title: "Continued fractions and best approximations",
    intro: "Take the whole part, flip the remainder, repeat: x = a₀ + 1/(a₁ + 1/(a₂ + ⋯)). Cutting the expansion off gives convergents p/q, and each is closer than any fraction with a smaller denominator.",
    html: `<div class="gk-chips cf-pre">${Object.keys(CF_X).map((k, i) => `<button class="gk-chip${k === "π" ? " on" : ""}" data-k="${k}">${k}</button>`).join("")}</div>
      <div class="gk-out cf-out"></div>`,
    caveat: "A big partial quotient means an unusually good convergent: π = [3; 7, 15, 1, 292, …], so 355/113, which stops just before the 292, is accurate to 7 digits. The golden ratio [1; 1, 1, 1, …] is the hardest number to approximate — its convergents are ratios of Fibonacci numbers.",
    init(root) {
      const out = root.querySelector(".cf-out");
      const run = k => {
        let x = CF_X[k]; const a = [];
        for (let i = 0; i < 9; i++) { const q = Math.floor(x + 1e-12); a.push(q); const r = x - q; if (r < 1e-9) break; x = 1 / r; }
        let p0 = 1, q0 = 0, p1 = a[0], q1 = 1; const rows = [[p1, q1]];
        for (let i = 1; i < a.length; i++) { [p0, p1] = [p1, a[i] * p1 + p0]; [q0, q1] = [q1, a[i] * q1 + q0]; rows.push([p1, q1]); }
        out.innerHTML = `${k} = [${a[0]}; ${a.slice(1).join(", ")}${a.length === 9 ? ", …" : ""}]\n\nconvergent        value              error\n` +
          rows.map(([p, q], i) => `${(p + "/" + q).padEnd(16)}  ${fx(p / q, 10)}   ${(Math.abs(p / q - CF_X[k])).toExponential(2)}${a[i + 1] > 10 ? '  <span class="g">← next quotient ' + a[i + 1] + ': a great one</span>' : ""}`).join("\n");
      };
      chips(root, ".cf-pre", d => run(d.k)); run("π");
    }
  }],
  chapters: [
    { icon: "🏛", title: "c. 300 BCE — Euclid's primes and his algorithm", who: "Euclid, Elements VII and IX",
      lead: "Two proofs from the Elements are still taught unchanged.",
      formula: "gcd(a, b) = gcd(b, a mod b)      p₁p₂⋯pₙ + 1 has a new prime factor",
      what: "Book VII gives the Euclidean algorithm for the greatest common divisor; Book IX proves there are infinitely many primes: multiply any finite list and add 1, and the result has a prime factor not on the list.",
      how: "Run backwards, Euclid's algorithm writes gcd(a, b) = ax + by (Bézout). The continued fraction of a/b is the list of quotients the algorithm produces.",
      story: "The algorithm is often called the oldest nontrivial algorithm still in daily use. Lamé (1844) showed its worst case is consecutive Fibonacci numbers — an early result in the analysis of algorithms.",
      today: "Every RSA key generation and every modular inverse in cryptography runs the extended Euclidean algorithm; the Euclid atom shows it as squares cut from a rectangle." },
    { icon: "⚙️", title: "1640–1801 — congruences", who: "Pierre de Fermat 1640 · Leonhard Euler 1736, 1763 · Carl Friedrich Gauss 1801",
      lead: "Gauss's clock arithmetic turned scattered facts into a theory.",
      formula: "aᵖ ≡ a (mod p)      a^φ(n) ≡ 1 (mod n) when gcd(a, n) = 1",
      what: "Fermat stated his little theorem in a letter of 1640 without proof; Euler proved it (1736) and generalised it with his φ function (1763). Gauss's Disquisitiones Arithmeticae (1801) introduced the notation a ≡ b (mod n) and made congruences an algebra.",
      how: "Modulo a prime every nonzero number has an inverse, so ℤ/p is a field — the finite fields behind most of modern cryptography and coding.",
      story: "Gauss wrote the Disquisitiones at 21; it was published when he was 24 and reshaped number theory for a century.",
      today: "Congruences run check digits (ISBN, IBAN), hashing, pseudo-random generators and public-key cryptography." },
    { icon: "🏛", title: "1737–1796 — continued fractions and reciprocity", who: "Euler 1737 · Lagrange 1770 · Gauss 1796",
      lead: "Two jewels: best approximations, and the law linking p mod q to q mod p.",
      formula: "(p/q)(q/p) = (−1)^((p−1)/2 · (q−1)/2)",
      what: "Euler (1737) developed continued fractions and showed e has a patterned expansion [2; 1, 2, 1, 1, 4, 1, 1, 6, …]; Lagrange (1770) proved quadratic irrationals are exactly the eventually periodic ones. Quadratic reciprocity says whether p is a square mod q is tied to whether q is a square mod p.",
      how: "Legendre stated reciprocity (1785) with a gap in the proof; Gauss gave the first complete proof in 1796, aged 18, and eventually eight different proofs.",
      story: "Gauss called it the theorema aureum, the golden theorem. There are now more than 240 published proofs.",
      today: "Reciprocity was the seed of class field theory and the Langlands programme; continued fractions solve Pell's equation (see Diophantine equations)." }
  ],
  challenges: ["Why does √2 = [1; 2, 2, 2, …] repeat forever while π does not?", "Check that consecutive convergents p/q, p′/q′ satisfy pq′ − p′q = ±1.", "Which convergent of e first matches it to 6 decimal places?"],
  sources: [
    { type: "BOOK", title: "Hardy & Wright — An Introduction to the Theory of Numbers", note: "The classic, with a full chapter on continued fractions.", url: null },
    { type: "FREE BOOK", title: "William Stein — Elementary Number Theory: Primes, Congruences, and Secrets", note: "Number theory with computation and cryptography.", url: "https://wstein.org/ent/" },
    { type: "BIOGRAPHY", title: "MacTutor — Carl Friedrich Gauss", note: "The Disquisitiones and the golden theorem.", url: MT("Gauss") }
  ]
});

/* ================================================================ ANALYTIC */
register("analytic-nt", {
  kicker: "PRIMES THROUGH CALCULUS · ABOUT 25 MIN",
  hook: "How can an infinite sum over all whole numbers know about the primes?",
  intro: "Analytic number theory studies primes with the tools of analysis. Its founding identity is Euler's product (1737): the sum of 1/nˢ over every whole number equals a product over the primes alone — unique factorisation written as calculus. Riemann (1859) extended it to complex s, and the location of its zeros controls how the primes are spread. The lab compares both sides of Euler's identity.",
  timeline: [[1737, "Euler product"], [1837, "Dirichlet: primes in progressions"], [1859, "Riemann's paper"], [1896, "prime number theorem"], [1918, "Hardy–Ramanujan circle method"], [2013, "Zhang: bounded gaps"]],
  labs: [{
    kicker: "EULER 1737", title: "Σ 1/nˢ = Π 1/(1 − p⁻ˢ)",
    intro: "Choose s > 1 and how far to go. Left: the sum over n ≤ N. Right: the product over primes p ≤ N. Both close in on ζ(s); at s = 2 the limit is π²/6.",
    html: `<div class="it-control"><label><span>s</span><output data-o="s">2.00</output></label><input type="range" data-i="s" min="1.05" max="4" step="0.01" value="2"></div>
      <div class="it-control"><label><span>N</span><output data-o="n">100</output></label><input type="range" data-i="n" min="2" max="4" step="0.01" value="2"></div>
      <div class="gk-out ez-out"></div>`,
    caveat: "Expanding each factor 1 + p⁻ˢ + p⁻²ˢ + ⋯ and multiplying produces every 1/nˢ exactly once, because every n factors uniquely into primes. As s → 1 the sum diverges, so the product must too — a proof that there are infinitely many primes.",
    init(root) {
      const sI = root.querySelector("[data-i=s]"), nI = root.querySelector("[data-i=n]"), out = root.querySelector(".ez-out");
      const run = () => {
        const s = +sI.value, N = Math.round(Math.pow(10, +nI.value)); root.querySelector("[data-o=s]").textContent = s.toFixed(2); root.querySelector("[data-o=n]").textContent = N;
        let sum = 0; for (let n = 1; n <= N; n++) sum += Math.pow(n, -s);
        const P = primesTo(N); let prod = 1; for (const p of P) prod /= 1 - Math.pow(p, -s);
        let z = 0; for (let n = 1; n <= 200000; n++) z += Math.pow(n, -s); z += Math.pow(200000, 1 - s) / (s - 1);
        out.innerHTML = `sum over n ≤ ${N}:        ${fx(sum, 8)}\nproduct over ${P.length} primes ≤ ${N}: ${fx(prod, 8)}\n<span class="g">ζ(${s.toFixed(2)}) ≈ ${fx(z, 8)}</span>` + (Math.abs(s - 2) < .005 ? `   π²/6 = ${fx(Math.PI ** 2 / 6, 8)}` : "");
      };
      sI.addEventListener("input", run); nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1737 — Euler's product and the Basel problem", who: "Leonhard Euler 1734–37",
      lead: "Euler summed 1 + 1/4 + 1/9 + ⋯ = π²/6, then connected such sums to the primes.",
      formula: "ζ(s) = Σ n⁻ˢ = Π_p (1 − p⁻ˢ)⁻¹",
      what: "The Basel problem, open since 1650, fell to Euler in 1734. Three years later he proved the product formula and deduced that Σ 1/p diverges — the primes are not too sparse.",
      how: "Every term of the sum appears once in the expanded product: unique factorisation in analytic form.",
      story: "The problem is named after Basel, home of the Bernoullis, who had failed to solve it.",
      today: "The Euler product is the template for every L-function in the Langlands programme." },
    { icon: "⚙️", title: "1837–1896 — Dirichlet, Riemann and the prime number theorem", who: "Dirichlet 1837 · Riemann 1859 · Hadamard & de la Vallée Poussin 1896",
      lead: "Primes thin out like 1/ln x, and the proof went through the complex plane.",
      formula: "π(x) ~ x / ln x",
      what: "Dirichlet (1837) proved every progression a, a + q, a + 2q, … with gcd(a, q) = 1 contains infinitely many primes, inventing L-functions. Riemann's eight-page paper of 1859 extended ζ to complex s and linked primes to its zeros. Hadamard and de la Vallée Poussin independently proved the prime number theorem in 1896 by showing ζ has no zeros on the line Re s = 1.",
      how: "Riemann's explicit formula writes the prime-counting function as a main term minus a sum over the zeros of ζ — like a sound built from its frequencies.",
      story: "Gauss had conjectured π(x) ≈ x/ln x as a teenager from prime tables (c. 1792). The primes atom plots π(x) against x/ln x and Li(x).",
      today: "Elementary proofs (Erdős and Selberg, 1949) exist, but the complex-analytic one still gives the best error terms." },
    { icon: "🔥", title: "1859–today — the Riemann hypothesis and prime gaps", who: "Riemann 1859 · Hardy 1914 · Zhang 2013 · Maynard & Tao 2013",
      lead: "All nontrivial zeros on the line Re s = ½? The most famous open problem in mathematics.",
      formula: "ζ(s) = 0, 0 < Re s < 1  ⇒  Re s = ½ ?",
      what: "The Riemann hypothesis would give the best possible error in the prime number theorem, about √x ln x. Hardy (1914) proved infinitely many zeros lie on the line; more than 10¹³ have been checked numerically.",
      how: "Yitang Zhang (2013) proved there are infinitely many pairs of primes less than 70 million apart; Maynard and Tao's methods and the Polymath project cut this to 246.",
      story: "Zhang, then a lecturer at the University of New Hampshire, submitted his paper at 57; the Annals accepted it within weeks. It is a Millennium Prize problem and on Hilbert's 1900 list.",
      today: "The spacing of zeta zeros matches the eigenvalues of random matrices (see Random Matrix Theory)." }
  ],
  challenges: ["At s = 2 how large must N be for the sum to match π²/6 to 4 decimals?", "Move s towards 1. Which side grows faster, and why must both blow up?", "Why does the product use only primes up to N while the sum uses every n up to N?"],
  sources: [
    { type: "BOOK", title: "John Derbyshire — Prime Obsession", note: "Riemann's hypothesis for general readers.", url: null },
    { type: "TEXTBOOK", title: "Tom Apostol — Introduction to Analytic Number Theory", note: "The standard first course.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Bernhard Riemann", note: "The 1859 paper and its author.", url: MT("Riemann") }
  ]
});

/* ================================================================ ALGEBRAIC */
function padic(a, b, p, k = 14) {
  // digits of a/b in ℤ_p (requires p ∤ b)
  const digits = []; let A = BigInt(a), B = BigInt(b), P = BigInt(p);
  const inv = x => bpow(x, P - 2n, P);
  for (let i = 0; i < k; i++) { const d = bmod(A * inv(B), P); digits.push(Number(d)); A = (A - d * B) / P; }
  return digits;
}
register("algebraic-nt", {
  kicker: "NUMBERS BEYOND ℤ · ABOUT 25 MIN",
  hook: "Can −1 be written as an infinite string of 4s — and make perfect sense?",
  intro: "Algebraic number theory studies number fields like ℚ(i) and ℚ(√−5), where primes may split, stay inert or ramify, and factorisation can fail and be rescued by ideals (see Rings & Modules). Hensel (1897) added a second tool: for each prime p, the p-adic numbers, where closeness means divisibility by a high power of p. The lab writes fractions p-adically.",
  timeline: [[1847, "Kummer: ideal numbers"], [1871, "Dedekind: ideals"], [1882, "ramification"], [1897, "Hensel: p-adic numbers"], [1920, "Takagi: class field theory"], [1950, "Tate's thesis"]],
  labs: [{
    kicker: "HENSEL 1897 · p-ADIC EXPANSIONS", title: "Fractions written backwards to infinity",
    intro: "A p-adic integer is a base-p expansion that goes on forever to the left. Choose a prime and a fraction; the lab computes its digits (rightmost first) and checks them by adding.",
    html: `<div class="gk-chips pa-p">${[2, 3, 5, 7].map(p => `<button class="gk-chip${p === 5 ? " on" : ""}" data-p="${p}">p = ${p}</button>`).join("")}</div>
      <div class="gk-chips pa-x">${["-1", "1/3", "-1/2", "2/7", "25"].map((s, i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-x="${s}">${s.replace("-", "−")}</button>`).join("")}</div>
      <div class="gk-out pa-out"></div>`,
    caveat: "In the 5-adic numbers …44444 + 1 = 0, because every carry ripples to the left for ever: so …44444 = −1. Two numbers are 5-adically close when their difference is divisible by a high power of 5: 5¹⁰⁰ is tiny.",
    init(root) {
      let p = 5, xs = "-1"; const out = root.querySelector(".pa-out");
      const run = () => {
        const [a, b = 1] = xs.split("/").map(Number);
        if (b % p === 0) { out.innerHTML = `<span class="r">${p} divides the denominator: ${xs} is not a ${p}-adic integer (it has negative valuation).</span>`; return; }
        const d = padic(a, b, p); let v = 0, n = Math.abs(a); if (n) while (n % p === 0) { n /= p; v++; }
        const P = BigInt(p) ** 14n, approx = d.reduce((s, x, i) => s + BigInt(x) * BigInt(p) ** BigInt(i), 0n);
        const check = bmod(approx * BigInt(b) - BigInt(a), P) === 0n;
        out.innerHTML = `${xs.replace("-", "−")} in ℤ_${p} = <span class="g">…${d.slice().reverse().join("")}</span>  (base ${p})\n` +
          `valuation v_${p} = ${a ? v : "∞"}   size |x|_${p} = ${a ? (v ? p + "^−" + v : "1") : "0"}\n` +
          `check: (digits) × ${b} − ${a} is divisible by ${p}¹⁴: <span class="${check ? "t" : "r"}">${check ? "yes ✓" : "no"}</span>`;
      };
      chips(root, ".pa-p", d => { p = +d.p; run(); }); chips(root, ".pa-x", d => { xs = d.x; run(); }); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1847–1882 — number fields and ramification", who: "Kummer 1847 · Dedekind 1871 · Kronecker 1882",
      lead: "In bigger number systems, ordinary primes break up in three ways.",
      formula: "5 = (2 + i)(2 − i) splits · 3 stays prime · 2 = −i(1 + i)² ramifies",
      what: "In the ring of integers of a number field, an ordinary prime factors into prime ideals. In ℤ[i]: primes ≡ 1 mod 4 split, primes ≡ 3 mod 4 stay inert, and 2 ramifies (a repeated factor). Only finitely many primes ramify — those dividing the discriminant.",
      how: "The class group measures how far ideals are from being generated by single numbers; it is always finite.",
      story: "Dedekind and Kronecker built rival foundations — ideals versus divisors — both still in use.",
      today: "The Gaussian-primes lab under Rings & Modules shows splitting and inertia pictorially." },
    { icon: "⚙️", title: "1897 — Hensel's p-adic numbers", who: "Kurt Hensel 1897 · Ostrowski 1916",
      lead: "One new number system for each prime.",
      formula: "|x|_p = p^(−v_p(x));   Ostrowski: every absolute value on ℚ is |·| or some |·|_p",
      what: "Hensel defined ℚ_p by completing ℚ with respect to divisibility by p. Ostrowski (1916) proved these, with the ordinary real numbers, are the only completions of ℚ. The local–global principle (Hasse, 1920s): some equations are solvable in ℚ exactly when solvable in ℝ and in every ℚ_p.",
      how: "Hensel's lemma lifts a solution mod p to solutions mod p², p³, … — Newton's method in p-adic form.",
      story: "Hensel was inspired by the analogy between numbers and functions: a p-adic expansion is like a power series around the 'point' p.",
      today: "p-adic methods run through modern number theory, from Wiles's proof of Fermat to Scholze's perfectoid spaces." },
    { icon: "🔥", title: "1920–today — class field theory", who: "Teiji Takagi 1920 · Emil Artin 1927 · John Tate 1950",
      lead: "The abelian extensions of a number field are described by its own arithmetic.",
      formula: "Gal(K^ab/K) ↔ idèle class group of K",
      what: "Class field theory (Takagi 1920, Artin reciprocity 1927) classifies abelian extensions of a number field by data inside the field — the grand generalisation of quadratic reciprocity. Tate's thesis (1950) recast L-functions as integrals over adèles, combining all the p-adic fields at once.",
      how: "The non-abelian version of this dictionary is the Langlands programme.",
      story: "Hilbert's 12th problem — explicit generators for abelian extensions — is still open for most fields.",
      today: "Computations of class groups and units are standard in PARI/GP and SageMath." }
  ],
  challenges: ["Write −1 in ℤ₂ and ℤ₃. What pattern do you see?", "Why is 1/5 not a 5-adic integer?", "Add …444 and 1 in base 5 by hand, carrying."],
  sources: [
    { type: "BOOK", title: "Fernando Gouvêa — p-adic Numbers: An Introduction", note: "A readable first book.", url: null },
    { type: "FREE NOTES", title: "James Milne — Algebraic Number Theory", note: "Complete course notes.", url: "https://www.jmilne.org/math/CourseNotes/ant.html" },
    { type: "BIOGRAPHY", title: "MacTutor — Kurt Hensel", note: "The inventor of p-adic numbers.", url: MT("Hensel") }
  ]
});

/* ================================================================ MODULAR FORMS */
const TAU = (() => { // Δ = q Π (1 − qⁿ)²⁴, coefficients to q^N
  const N = 30; let c = Array(N + 1).fill(0n); c[0] = 1n;
  for (let n = 1; n <= N; n++) for (let r = 0; r < 24; r++) for (let k = N; k >= n; k--) c[k] -= c[k - n];
  return [0n].concat(c.slice(0, N)); // τ(n) = coefficient of qⁿ⁻¹ in Π
})();
const sigma = (n, k) => { let s = 0n; for (let d = 1; d <= n; d++) if (n % d === 0) s += BigInt(d) ** BigInt(k); return s; };
register("modular-forms", {
  kicker: "SYMMETRY IN THE UPPER HALF-PLANE · ABOUT 25 MIN",
  hook: "Why should the coefficients of one power series satisfy a congruence modulo 691?",
  intro: "A modular form is a function on the upper half-plane with an enormous symmetry under the group SL₂(ℤ). Its Fourier coefficients turn out to be arithmetic gold. Ramanujan (1916) studied the discriminant Δ = q Π (1 − qⁿ)²⁴, whose coefficients τ(n) obey astonishing laws. Modularity of elliptic curves proved Fermat's Last Theorem. The lab computes τ(n).",
  timeline: [[1829, "Jacobi: theta functions"], [1916, "Ramanujan's τ"], [1922, "Mordell: rational points"], [1937, "Hecke operators"], [1974, "Deligne: |τ(p)| ≤ 2p^(11/2)"], [1994, "Wiles: modularity ⇒ FLT"]],
  labs: [{
    kicker: "RAMANUJAN 1916", title: "The coefficients of Δ",
    intro: "Expanding q Π (1 − qⁿ)²⁴ gives Σ τ(n) qⁿ. The lab computes τ(n) for n ≤ 30 with exact integers and checks Ramanujan's observations.",
    html: `<div class="gk-out mf-out" style="max-height:20rem;overflow:auto"></div>`,
    caveat: "Mordell (1917) proved τ is multiplicative, τ(mn) = τ(m)τ(n) for coprime m, n; Deligne (1974) proved |τ(p)| ≤ 2p^(11/2). Lehmer's question — is τ(n) ever 0? — is still open.",
    init(root) {
      root.querySelector(".mf-out").innerHTML = "n   τ(n)            τ(n) − σ₁₁(n) mod 691\n" + Array.from({ length: 30 }, (_, i) => i + 1).map(n => `${String(n).padEnd(3)} ${String(TAU[n]).padStart(14)}   ${bmod(TAU[n] - sigma(n, 11), 691n)}`).join("\n") +
        `\n\n<span class="g">every row ends in 0: τ(n) ≡ σ₁₁(n) (mod 691)</span>\nmultiplicative: τ(2)τ(3) = ${TAU[2] * TAU[3]} = τ(6) = ${TAU[6]} ✓`;
    }
  }],
  chapters: [
    { icon: "🏛", title: "1829–1916 — theta functions and Ramanujan's τ", who: "Carl Jacobi 1829 · Srinivasa Ramanujan 1916",
      lead: "Series with hidden symmetry count sums of squares and much more.",
      formula: "Δ(z) = q Π (1 − qⁿ)²⁴ = Σ τ(n) qⁿ,   q = e^(2πiz)",
      what: "Jacobi's theta functions (1829) count the ways to write n as a sum of squares. Ramanujan (1916) conjectured τ is multiplicative, satisfies a recursion at prime powers, and obeys the bound |τ(p)| ≤ 2p^(11/2); the 691 congruence comes from the Eisenstein series.",
      how: "Modular forms of a given weight form a finite-dimensional vector space, so identities between them can be proved by checking a few coefficients.",
      story: "691 appears because it divides the numerator of the Bernoulli number B₁₂ — the constant term of the weight-12 Eisenstein series.",
      today: "The same spaces give Viazovska's proof (2016) that the E₈ lattice is the densest sphere packing in 8 dimensions." },
    { icon: "⚙️", title: "1922–1974 — elliptic curves and Hecke operators", who: "Louis Mordell 1922 · Erich Hecke 1937 · Pierre Deligne 1974",
      lead: "Rational points on cubic curves form a finitely generated group.",
      formula: "y² = x³ + ax + b;   E(ℚ) ≅ ℤʳ ⊕ finite",
      what: "Mordell (1922) proved the rational points of an elliptic curve form a finitely generated group; the rank r is still mysterious (Birch and Swinnerton-Dyer, a Millennium problem). Hecke operators explain multiplicativity of coefficients; Deligne's proof of the Weil conjectures (1974) gave Ramanujan's bound.",
      how: "The elliptic-curve atom shows the chord-and-tangent group law.",
      story: "Deligne received the Fields Medal (1978) and the Abel Prize (2013).",
      today: "Elliptic curves over finite fields secure most internet traffic (see Cryptography)." },
    { icon: "🔥", title: "1955–1994 — modularity and Fermat", who: "Taniyama & Shimura 1955–57 · Frey 1984 · Ribet 1986 · Wiles & Taylor 1994",
      lead: "Every elliptic curve over ℚ is secretly a modular form — and that kills Fermat.",
      formula: "aᵖ + bᵖ = cᵖ  ⇒  y² = x(x − aᵖ)(x + bᵖ) would not be modular",
      what: "Frey (1984) suggested a solution of Fermat's equation would give a very strange elliptic curve; Ribet (1986) proved it could not be modular; Wiles, with Taylor, proved modularity for semistable curves (1994). The full modularity theorem followed in 2001.",
      how: "Wiles matched Galois representations with modular forms via deformation rings — a case of the Langlands programme.",
      story: "Wiles worked in secret for seven years; a gap found in 1993 was closed with Taylor in September 1994.",
      today: "Modularity for curves over other fields is a live research front." }
  ],
  challenges: ["Check τ(4) = τ(2)² − 2¹¹ from the table.", "Find the first n ≤ 30 with τ(n) negative.", "Why must the 691 congruence be tested with exact integers rather than floating point?"],
  sources: [
    { type: "BOOK", title: "Diamond & Shurman — A First Course in Modular Forms", note: "The standard introduction.", url: null },
    { type: "DATABASE", title: "LMFDB — the L-functions and modular forms database", note: "Millions of modular forms, elliptic curves and L-functions.", url: "https://www.lmfdb.org/" },
    { type: "BIOGRAPHY", title: "MacTutor — Srinivasa Ramanujan", note: "From Kumbakonam to Cambridge.", url: MT("Ramanujan") }
  ]
});

/* ================================================================ DIOPHANTINE */
function pell(D) {
  const a0 = Math.floor(Math.sqrt(D)); if (a0 * a0 === D) return null;
  let m = 0, d = 1, a = a0, p0 = 1n, p1 = BigInt(a0), q0 = 0n, q1 = 1n; const cf = [a0];
  for (let i = 0; i < 200; i++) {
    if (p1 * p1 - BigInt(D) * q1 * q1 === 1n) return { x: p1, y: q1, cf };
    m = d * a - m; d = (D - m * m) / d; a = Math.floor((a0 + m) / d); cf.push(a);
    [p0, p1] = [p1, BigInt(a) * p1 + p0]; [q0, q1] = [q1, BigInt(a) * q1 + q0];
  }
  return null;
}
register("diophantine", {
  kicker: "WHOLE-NUMBER SOLUTIONS · ABOUT 25 MIN",
  hook: "Why is the smallest solution of x² − 61y² = 1 a ten-digit number?",
  intro: "A Diophantine equation asks for whole-number or rational solutions. Some are easy, some have enormous smallest solutions, and Hilbert's tenth problem showed no algorithm can decide them all. Pell's equation x² − Dy² = 1 has infinitely many solutions for every non-square D, found through the continued fraction of √D — the method of Brahmagupta and Bhāskara. The lab solves it.",
  timeline: [[250, "Diophantus' Arithmetica"], [628, "Brahmagupta: composition"], [1150, "Bhāskara II: chakravāla"], [1657, "Fermat's challenge"], [1844, "Liouville: transcendental numbers"], [1970, "Matiyasevich: Hilbert's 10th"]],
  labs: [{
    kicker: "BHĀSKARA 1150 · LAGRANGE 1768", title: "Solve x² − Dy² = 1",
    intro: "Pick D. The lab expands √D as a continued fraction and tests each convergent x/y until x² − Dy² = 1.",
    html: `<div class="it-control"><label><span>D</span><output data-o="d">61</output></label><input type="range" data-i="d" min="2" max="120" value="61"></div>
      <div class="gk-out pe-out"></div>`,
    caveat: "Lagrange (1768) proved a solution always exists. Once you have the smallest (x₁, y₁), all others come from (x₁ + y₁√D)ⁿ.",
    init(root) {
      const dI = root.querySelector("[data-i=d]"), out = root.querySelector(".pe-out");
      const run = () => { const D = +dI.value; root.querySelector("[data-o=d]").textContent = D; const r = pell(D);
        if (!r) { out.innerHTML = `${D} is a perfect square: only the trivial solution x = ±1, y = 0.`; return; }
        const nx = r.x * r.x + BigInt(D) * r.y * r.y, ny = 2n * r.x * r.y;
        out.innerHTML = `√${D} = [${r.cf[0]}; ${r.cf.slice(1, 12).join(", ")}${r.cf.length > 12 ? ", …" : ""}]\n<span class="g">smallest solution: x = ${r.x}, y = ${r.y}</span>\ncheck: ${r.x}² − ${D}·${r.y}² = ${r.x * r.x - BigInt(D) * r.y * r.y}\nnext: x = ${nx}, y = ${ny}`; };
      dI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "250–1150 — Diophantus and the Indian solution of Pell", who: "Diophantus of Alexandria · Brahmagupta 628 · Bhāskara II 1150",
      lead: "Indian mathematicians solved 'Pell's equation' five centuries before Europe.",
      formula: "(x₁² − Dy₁²)(x₂² − Dy₂²) = (x₁x₂ + Dy₁y₂)² − D(x₁y₂ + x₂y₁)²",
      what: "Diophantus' Arithmetica treated equations in rational numbers. Brahmagupta (628) found the composition identity above, turning two solutions into a third; Bhāskara II's chakravāla (cyclic) method (1150) solves x² − 61y² = 1 with x = 1766319049.",
      how: "Composition lets you combine near-solutions, whose right-hand sides are small, until the right-hand side is 1.",
      story: "Fermat posed D = 61 as a challenge to European mathematicians in 1657. Euler misattributed the equation to John Pell, who had little to do with it.",
      today: "Pell equations describe units in real quadratic fields and appear in the security analysis of some cryptosystems." },
    { icon: "⚙️", title: "1637–1995 — Fermat's margin", who: "Fermat 1637 · Euler · Kummer · Wiles 1995",
      lead: "A note in the margin of Diophantus launched 358 years of work.",
      formula: "xⁿ + yⁿ = zⁿ has no positive solutions for n ≥ 3",
      what: "Fermat wrote in his copy of the Arithmetica that he had a marvellous proof which the margin was too small to contain. He proved n = 4 by infinite descent; Euler did n = 3; Kummer the regular primes; Wiles the rest (see Modular Forms).",
      how: "Infinite descent: from any solution build a smaller one — impossible for positive integers.",
      story: "The note was published by his son in 1670, after Fermat's death.",
      today: "Faltings (1983) showed curves of genus ≥ 2 have finitely many rational points; the abc conjecture would sharpen much more." },
    { icon: "🔥", title: "1844–1970 — transcendence and undecidability", who: "Liouville 1844 · Hermite 1873 · Lindemann 1882 · Matiyasevich 1970",
      lead: "Some numbers solve no polynomial; some questions have no algorithm.",
      formula: "e and π are transcendental;  Hilbert's 10th problem is unsolvable",
      what: "Liouville (1844) built the first transcendental numbers, too well approximated by rationals to be algebraic. Hermite proved e transcendental (1873), Lindemann π (1882). Matiyasevich (1970), completing work of Davis, Putnam and Robinson, showed there is no algorithm deciding whether a Diophantine equation has integer solutions.",
      how: "Every computably enumerable set is Diophantine, so a decision procedure would solve the halting problem.",
      story: "Julia Robinson's hypothesis was the missing link; Matiyasevich, 22, supplied it with Fibonacci numbers.",
      today: "Whether rational solutions (rather than integer ones) are decidable is still open." }
  ],
  challenges: ["Compare D = 60, 61 and 62. Why is 61 so much harder?", "Use the 'next' solution to check (x₁ + y₁√D)² gives another.", "Which D ≤ 120 has the largest smallest solution?"],
  sources: [
    { type: "BOOK", title: "John Stillwell — Elements of Number Theory", note: "Pell's equation, Gaussian integers and more.", url: null },
    { type: "BOOK", title: "Simon Singh — Fermat's Last Theorem", note: "The story for general readers.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Bhaskara II", note: "The chakravāla method.", url: MT("Bhaskara_II") }
  ]
});

/* ================================================================ COMPUTATIONAL / CRYPTO */
register("computational-nt", {
  kicker: "SECRETS FROM PRIMES · ABOUT 25 MIN",
  hook: "How can you publish a lock that anyone can close but only you can open?",
  intro: "Computational number theory asks how fast arithmetic questions can be answered. Multiplying primes is easy; factoring the product appears hard. Rivest, Shamir and Adleman (1977) turned that gap into public-key cryptography. The lab runs RSA with small numbers you can check by hand.",
  timeline: [[1976, "Diffie–Hellman"], [1977, "RSA"], [1980, "Miller–Rabin test"], [1985, "elliptic-curve cryptography"], [1994, "Shor's quantum algorithm"], [2002, "AKS: primality in P"]],
  labs: [{
    kicker: "RIVEST · SHAMIR · ADLEMAN 1977", title: "A toy RSA",
    intro: "Pick two primes and a message m < n. The public key is (n, e); the private key d satisfies e·d ≡ 1 mod φ(n). Encryption is c = mᵉ mod n; decryption is cᵈ mod n.",
    html: `<div class="gk-chips rs-p">${[[61, 53], [101, 113], [1009, 2003], [7919, 104729]].map(([p, q], i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-p="${p}" data-q="${q}">p = ${p}, q = ${q}</button>`).join("")}</div>
      <div class="it-control"><label><span>message m</span><output data-o="m">65</output></label><input type="range" data-i="m" min="2" max="3000" value="65"></div>
      <div class="gk-out rs-out"></div>`,
    caveat: "Real keys use primes of about 1,024 bits each. Anyone who can factor n can compute φ(n) and then d — which is why a large quantum computer running Shor's algorithm would break RSA.",
    init(root) {
      let p = 61n, q = 53n; const mI = root.querySelector("[data-i=m]"), out = root.querySelector(".rs-out");
      const egcd = (a, b) => { let [x0, x1, r0, r1] = [1n, 0n, a, b]; while (r1) { const t = r0 / r1; [r0, r1] = [r1, r0 - t * r1]; [x0, x1] = [x1, x0 - t * x1]; } return x0; };
      const run = () => {
        const n = p * q, ph = (p - 1n) * (q - 1n); let e = 17n; while (ph % e === 0n) e += 2n;
        const d = bmod(egcd(e, ph), ph), m = BigInt(Math.min(+mI.value, Number(n) - 1)); root.querySelector("[data-o=m]").textContent = m;
        const c = bpow(m, e, n), back = bpow(c, d, n);
        out.innerHTML = `n = p·q = ${n}   φ(n) = ${ph}\npublic key (n, e) = (${n}, ${e})   private d = ${d}   (e·d mod φ = ${e * d % ph})\n\nencrypt: c = ${m}^${e} mod ${n} = <span class="g">${c}</span>\ndecrypt: ${c}^${d} mod ${n} = <span class="t">${back}</span> ${back === m ? "✓" : "✗"}`;
      };
      chips(root, ".rs-p", ds => { p = BigInt(ds.p); q = BigInt(ds.q); run(); }); mI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1976–1977 — public keys", who: "Whitfield Diffie & Martin Hellman 1976 · Rivest, Shamir & Adleman 1977 · Clifford Cocks (GCHQ, 1973)",
      lead: "Two strangers can agree a secret over an open channel.",
      formula: "c = mᵉ mod n,   m = cᵈ mod n,   ed ≡ 1 (mod φ(n))",
      what: "Diffie and Hellman (1976) proposed public-key cryptography and a key exchange based on discrete logarithms; RSA (1977) gave public-key encryption and signatures based on factoring. Decryption works by Euler's theorem.",
      how: "Fast modular exponentiation by repeated squaring makes mᵉ mod n cheap even for 2,048-bit n.",
      story: "Clifford Cocks at GCHQ had found the same idea in 1973; it stayed classified until 1997.",
      today: "RSA and Diffie–Hellman still protect much of the web's HTTPS traffic." },
    { icon: "⚙️", title: "1976–2002 — is it prime?", who: "Miller 1976 · Rabin 1980 · Agrawal, Kayal & Saxena 2002",
      lead: "Testing primality is easy; finding factors is hard.",
      formula: "n − 1 = 2ˢd:  a^d ≡ 1 or a^(2ʳd) ≡ −1 (mod n) for some r, else n is composite",
      what: "The Miller–Rabin test declares a composite 'probably prime' for at most a quarter of bases, so repeated random tests make errors vanishingly unlikely. AKS (2002) gave a deterministic polynomial-time test.",
      how: "Carmichael numbers like 561 fool Fermat's test for every coprime base but not Miller–Rabin: 2^35 ≡ 263 mod 561, and squaring leads to 1 without passing through −1.",
      story: "Kayal and Saxena were undergraduates at IIT Kanpur when they and Agrawal found AKS.",
      today: "Records: the largest known prime is a Mersenne prime found by GIMPS, with over 41 million digits (2024)." },
    { icon: "🔥", title: "1981–today — factoring, elliptic curves and quantum threats", who: "Pomerance 1981 · Lenstra 1987 · Koblitz & Miller 1985 · Shor 1994",
      lead: "Sieves chip away at factoring; elliptic curves and lattices offer new locks.",
      formula: "number field sieve: time ≈ exp((64/9)^(1/3) (ln n)^(1/3) (ln ln n)^(2/3))",
      what: "The quadratic sieve (1981) and number field sieve (1990s) factor numbers of hundreds of digits; RSA-250 fell in 2020. Elliptic-curve cryptography (Koblitz and Miller, 1985) gives equal security with much shorter keys. Shor (1994) showed a quantum computer could factor in polynomial time.",
      how: "In 2024 NIST standardised post-quantum algorithms based on lattices.",
      story: "8051 = 83 × 97 is a good hand exercise: 8051 = 90² − 7², so it factors as (90 − 7)(90 + 7) — Fermat's method.",
      today: "Migration to post-quantum cryptography is under way across the internet." }
  ],
  challenges: ["With p = 61, q = 53, check by hand that 65 encrypts to 2790.", "Why must e be coprime to φ(n)?", "Factor 8051 by writing it as a difference of squares."],
  sources: [
    { type: "FOUNDATIONAL PAPER · 1978", title: "Rivest, Shamir & Adleman — A Method for Obtaining Digital Signatures and Public-Key Cryptosystems", note: "Communications of the ACM 21.", url: "https://doi.org/10.1145/359340.359342" },
    { type: "BOOK", title: "Hoffstein, Pipher & Silverman — An Introduction to Mathematical Cryptography", note: "RSA, elliptic curves and lattices.", url: null },
    { type: "PROJECT", title: "GIMPS — the Great Internet Mersenne Prime Search", note: "Distributed hunt for record primes.", url: "https://www.mersenne.org/" }
  ]
});
})();
