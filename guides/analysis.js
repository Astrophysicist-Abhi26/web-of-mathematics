// ANALYSIS — field guides for Real Analysis, Measure Theory, Complex Analysis, Functional
// Analysis, Harmonic Analysis, ODEs, PDEs, Calculus of Variations, Dynamical Systems and
// Fractal Geometry. Each registers with GuideKit (guide-kit.js).
(function () {
"use strict";
const { register, canvas, C } = GuideKit;
const MT = s => "https://mathshistory.st-andrews.ac.uk/Biographies/" + s + "/";
const fx = (v, d = 4) => (Math.abs(v) < 1e-12 ? 0 : v).toFixed(d).replace("-", "−");
// run fn every frame while the lab is on the page; returns a stop function
function loop(root, fn) {
  let raf = null, on = true;
  const tick = () => { if (!on || !root.isConnected) { raf = null; return; } if (fn() === false) { raf = null; return; } raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);
  return () => { on = false; if (raf) cancelAnimationFrame(raf); };
}
function axes(ctx, w, h, pad) { ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(pad, pad / 2); ctx.lineTo(pad, h - pad); ctx.lineTo(w - pad / 2, h - pad); ctx.stroke(); }

/* ================================================================ REAL ANALYSIS */
register("real-analysis", {
  kicker: "THE RIGOUR OF THE INFINITE · ABOUT 25 MIN",
  hook: "Can you add up the same numbers in a different order and get a different answer?",
  intro: "Calculus worked for a hundred and fifty years before anyone could say what a limit, a continuous function or even a real number is. Bolzano, Cauchy and Weierstrass supplied the definitions; Dedekind and Cantor built the real numbers themselves. The need was genuine: infinite sums behave strangely. Riemann proved that the alternating harmonic series can be reordered to add up to any number you like. Try it.",
  timeline: [[1734, "Berkeley: 'ghosts of departed quantities'"], [1817, "Bolzano: intermediate values"], [1821, "Cauchy: Cours d'analyse"], [1854, "Riemann: rearrangements"], [1861, "Weierstrass: ε–δ"], [1872, "Dedekind: cuts"]],
  labs: [{
    kicker: "RIEMANN 1854 · REARRANGEMENT", title: "1 − ½ + ⅓ − ¼ + ⋯ = whatever you like",
    intro: "In its natural order the series converges to ln 2 ≈ 0.693. Choose a target. The lab uses the same terms, each exactly once, but takes positive ones (1, ⅓, ⅕, …) until the sum passes the target and negative ones (½, ¼, …) until it drops below, over and over.",
    html: `<div class="gk-chips rr-mode"><button class="gk-chip" data-m="nat">natural order</button><button class="gk-chip on" data-m="re">rearranged</button></div>
      <div class="it-control"><label><span>target</span><output data-o="t">1.50</output></label><input type="range" data-i="t" min="-2" max="3" step="0.01" value="1.5"></div>
      <div class="it-control"><label><span>terms</span><output data-o="n">400</output></label><input type="range" data-i="n" min="20" max="3000" step="10" value="400"></div>
      <canvas class="gk-canvas rr-cv"></canvas>
      <div class="gk-out rr-out"></div>`,
    caveat: "It works because the positive terms alone add up to +∞ and the negative terms to −∞, while the terms themselves shrink to 0. For an absolutely convergent series, such as 1 − ¼ + ⅑ − ⋯, every rearrangement has the same sum (Dirichlet, 1837).",
    init(root) {
      let mode = "re";
      const tI = root.querySelector("[data-i=t]"), nI = root.querySelector("[data-i=n]"), out = root.querySelector(".rr-out"), cv = root.querySelector(".rr-cv");
      function run() {
        const T = +tI.value, N = +nI.value;
        root.querySelector("[data-o=t]").textContent = T.toFixed(2); root.querySelector("[data-o=n]").textContent = N;
        const S = [], terms = []; let s = 0, p = 1, q = 2;
        for (let n = 1; n <= N; n++) {
          let d;
          if (mode === "nat") d = (n % 2 ? 1 : -1) / n;
          else if (s <= T) { d = 1 / p; p += 2; } else { d = -1 / q; q += 2; }
          s += d; S.push(s); if (terms.length < 12) terms.push(d);
        }
        const tgt = mode === "nat" ? Math.LN2 : T;
        const { ctx, w, h } = canvas(cv, 220), pad = 28;
        const lo = Math.min(-0.2, tgt - .6, ...S.slice(0, 60)), hi = Math.max(1.2, tgt + .6, ...S.slice(0, 60));
        const X = i => pad + (w - pad * 1.5) * i / (N - 1), Y = v => h - pad - (h - pad * 1.5) * (v - lo) / (hi - lo);
        axes(ctx, w, h, pad);
        ctx.strokeStyle = C.teal; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(pad, Y(tgt)); ctx.lineTo(w - pad / 2, Y(tgt)); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = C.gold; ctx.lineWidth = 1.4; ctx.beginPath(); S.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))); ctx.stroke();
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText(fx(tgt, 3), 2, Y(tgt) - 3); ctx.fillText("partial sums Sₙ", pad + 6, 14);
        const fr = d => d > 0 ? `+ 1/${Math.round(1 / d)}` : `− 1/${Math.round(-1 / d)}`;
        out.innerHTML = `${terms.map(fr).join(" ").replace(/^\+ /, "")} ⋯\n` +
          `S_${N} = <span class="g">${fx(s, 6)}</span>   target ${fx(tgt, 6)}   gap ${fx(Math.abs(s - tgt), 6)}\n` +
          (mode === "re" ? `<span class="d">used the first ${(p - 1) / 2} positive and first ${(q - 2) / 2} negative terms, each exactly once.</span>` : `<span class="d">natural order: the sum creeps towards ln 2, the gap shrinking like 1/(2n).</span>`);
      }
      root.querySelectorAll(".rr-mode .gk-chip").forEach(b => b.addEventListener("click", () => { mode = b.dataset.m; root.querySelectorAll(".rr-mode .gk-chip").forEach(x => x.classList.toggle("on", x === b)); run(); }));
      tI.addEventListener("input", run); nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1665–1734 — calculus without foundations", who: "Isaac Newton 1665 · Gottfried Leibniz 1684 · George Berkeley 1734 · Leonhard Euler",
      lead: "Calculus worked brilliantly for a century and a half without anyone being able to say what an infinitesimal was.",
      formula: "dy/dx = lim_(h→0) (f(x + h) − f(x)) / h",
      what: "Newton's fluxions and Leibniz's differentials used quantities that were 'vanishingly small': nonzero when you divided by them, zero when you wanted them gone. Euler handled infinite series with extraordinary skill — and sometimes wrote things like 1 − 1 + 1 − ⋯ = ½.",
      how: "The working method was to compute with h ≠ 0, simplify, then set h = 0. With good judgement it gave right answers; without it, wrong ones, and nobody could say exactly which steps were legitimate.",
      story: "Bishop Berkeley's The Analyst (1734) mocked infinitesimals as 'the ghosts of departed quantities', and he had a point. Lagrange tried to base calculus on power series instead (1797); Fourier's series (1807) then showed that functions could be far wilder than anyone had imagined.",
      today: "Abraham Robinson's nonstandard analysis (1960s) finally made infinitesimals rigorous, using model theory — Leibniz vindicated, three hundred years on." },
    { icon: "⚙️", title: "1817–1861 — limits and ε–δ", who: "Bernard Bolzano 1817 · Augustin-Louis Cauchy 1821 · Karl Weierstrass 1861",
      lead: "A limit is a promise: name any tolerance, and I can meet it.",
      formula: "∀ε > 0 ∃δ > 0 : |x − a| < δ ⇒ |f(x) − f(a)| < ε",
      what: "Cauchy's Cours d'analyse (1821) defined limit, continuity and convergence in words. Weierstrass's lectures in Berlin, from 1861, gave the precise form above: no motion, no infinitesimals, only inequalities between numbers.",
      how: "Bolzano (1817) proved the intermediate value theorem from what we now call the least-upper-bound property. Weierstrass then built a function that is continuous everywhere and differentiable nowhere (1872), ending geometric intuition as a reliable guide.",
      story: "Cauchy 'proved' in 1821 that a limit of continuous functions is continuous; Fourier series contradict it. The missing idea, uniform convergence, was found by Seidel and by Stokes in 1847 and made standard by Weierstrass.",
      today: "Every analysis course still begins with the ε–δ language — the ε–δ game among the playable atoms lets you play it against the computer." },
    { icon: "🏛", title: "1854 — Riemann: integrals and rearrangements", who: "Bernhard Riemann, Habilitationsschrift 1854 (published 1867) · Peter Gustav Lejeune Dirichlet 1837",
      lead: "Riemann defined the integral that bears his name — and showed that some series have no fixed sum.",
      formula: "Σ (−1)ⁿ⁺¹/n = ln 2, yet some rearrangement sums to any real number you choose",
      what: "A series converges <b>absolutely</b> if Σ|aₙ| converges; then every rearrangement has the same sum (Dirichlet, 1837). If it converges only conditionally, Riemann's theorem says its terms can be reordered to converge to any number, or to diverge.",
      how: "The lab's greedy recipe is Riemann's proof: go over the target with positive terms, back under with negative ones, and so on. Each overshoot is at most the last term used, and the terms tend to 0.",
      story: "Both results sit in Riemann's 1854 essay on trigonometric series, which also defined the Riemann integral through upper and lower sums. It was published only in 1867, a year after his death.",
      today: "Order of summation matters in physics: the Madelung sum giving the electrostatic energy of a salt crystal converges only conditionally, and summing it over growing spheres fails to converge at all." },
    { icon: "🔥", title: "1872 — building the real numbers", who: "Richard Dedekind 1872 · Georg Cantor 1872 · Charles Méray 1869",
      lead: "What is √2? For Dedekind, a cut in the rationals; for Cantor, a class of Cauchy sequences.",
      formula: "√2 = ( {q ∈ ℚ : q < 0 or q² < 2}, {q ∈ ℚ : q > 0 and q² > 2} )",
      what: "The rationals have gaps: 1, 1.4, 1.41, 1.414, … bunch together but have no rational limit. Dedekind (1872) defined a real number as a cut of ℚ into a lower and an upper set; Cantor and Méray as a class of Cauchy sequences. Either way ℝ is <b>complete</b>: every nonempty bounded set has a least upper bound.",
      how: "Completeness is exactly what the theorems of calculus need — intermediate values, maxima of continuous functions on closed intervals, limits of increasing bounded sequences. In ℚ all three fail.",
      story: "Dedekind wrote that the idea came to him on 24 November 1858, when he was preparing to teach calculus at the Zürich Polytechnic and felt keenly that its foundation was missing.",
      today: "Computable analysis asks which reals a machine can actually produce. In the Lean proof assistant's mathlib, ℝ is built from Cauchy sequences, as Cantor did." }
  ],
  challenges: [
    "Set the target to 3. Why does it take so many terms to get there? (The positive terms 1/(2k − 1) add up only like ½ ln k.)",
    "Why can't you rearrange 1 − ¼ + ⅑ − 1/16 + ⋯ to change its sum?",
    "Is 0.999… = 1? Answer with a Dedekind cut: which rationals lie below each?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "Stephen Abbott — Understanding Analysis", note: "The friendliest rigorous first course; opens with √2 and Riemann's rearrangements.", url: null },
    { type: "TEXTBOOK", title: "Terence Tao — Analysis I", note: "Builds ℕ, ℤ, ℚ and ℝ from scratch before doing calculus.", url: null },
    { type: "HISTORY", title: "Judith Grabiner — The Origins of Cauchy's Rigorous Calculus", note: "How ε–δ arguments grew out of eighteenth-century approximations (1981).", url: null },
    { type: "CLASSIC · 1872", title: "Richard Dedekind — Continuity and Irrational Numbers", note: "In 'Essays on the Theory of Numbers' (Dover); short and readable.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Karl Weierstrass", note: "The father of modern analysis.", url: MT("Weierstrass") }
  ]
});

/* ================================================================ MEASURE THEORY */
register("measure-theory", {
  kicker: "HOW BIG IS A SET? · ABOUT 25 MIN",
  hook: "Can a set have uncountably many points yet length zero — or contain no interval at all and still have length ½?",
  intro: "Measure theory answers 'how big?' for sets far stranger than intervals. Lebesgue's thesis of 1902 defined length for a vast class of sets and built on it an integral that behaves well under limits; Kolmogorov then made it the foundation of probability. The price: with the axiom of choice, some sets can't be measured at all. The lab builds Cantor sets — remove middle pieces forever, and see what is left.",
  timeline: [[1883, "Cantor's middle-thirds set"], [1898, "Borel: measurable sets"], [1902, "Lebesgue's integral"], [1905, "Vitali: a non-measurable set"], [1924, "Banach–Tarski"], [1933, "Kolmogorov: probability"]],
  labs: [{
    kicker: "CANTOR 1883 · SMITH–VOLTERRA–CANTOR", title: "Remove the middles, forever",
    intro: "Each stage removes an open middle piece from every interval that is left. Middle thirds leaves an uncountable 'dust' of total length 0. The fat Cantor set removes ever smaller middles — ¼, then 1/16 from each piece, then 1/64 — and keeps length ½ though it contains no interval at all.",
    html: `<div class="gk-chips ct-mode"><button class="gk-chip on" data-m="third">middle thirds</button><button class="gk-chip" data-m="frac">middle fraction a</button><button class="gk-chip" data-m="fat">fat Cantor (¼ⁿ)</button></div>
      <div class="it-control"><label><span>stages</span><output data-o="k">5</output></label><input type="range" data-i="k" min="0" max="10" value="5"></div>
      <div class="it-control ct-a" hidden><label><span>fraction removed a</span><output data-o="a">0.50</output></label><input type="range" data-i="a" min="0.05" max="0.9" step="0.01" value="0.5"></div>
      <canvas class="gk-canvas ct-cv"></canvas>
      <div class="gk-out ct-out"></div>`,
    caveat: "Middle-thirds Cantor set = numbers in [0, 1] with a base-3 expansion using only the digits 0 and 2. There are as many such expansions as infinite binary strings — uncountably many — yet the removed intervals have total length ⅓ + 2/9 + 4/27 + ⋯ = 1.",
    init(root) {
      let mode = "third";
      const kI = root.querySelector("[data-i=k]"), aI = root.querySelector("[data-i=a]"), out = root.querySelector(".ct-out"), cv = root.querySelector(".ct-cv");
      function stage(I, n, a) {
        return I.flatMap(([l, r]) => {
          const len = r - l, gap = mode === "fat" ? Math.pow(4, -n) : a * len, keep = (len - gap) / 2;
          return [[l, l + keep], [r - keep, r]];
        });
      }
      function run() {
        const K = +kI.value, a = mode === "third" ? 1 / 3 : +aI.value;
        root.querySelector("[data-o=k]").textContent = K; root.querySelector("[data-o=a]").textContent = a.toFixed(2);
        root.querySelector(".ct-a").hidden = mode !== "frac";
        const { ctx, w, h } = canvas(cv, 230), pad = 14, row = (h - pad * 2) / 11;
        let I = [[0, 1]];
        for (let n = 0; n <= K; n++) {
          if (n) I = stage(I, n, a);
          const y = pad + n * row;
          ctx.fillStyle = n === K ? C.gold : `rgba(245,196,81,${.25 + .5 * n / Math.max(1, K)})`;
          for (const [l, r] of I) ctx.fillRect(pad + (w - 2 * pad) * l, y, Math.max(.6, (w - 2 * pad) * (r - l)), row * .62);
          ctx.fillStyle = "#6e6789"; ctx.font = "9px IBM Plex Mono"; ctx.fillText(n, 2, y + row * .55);
        }
        const len = I.reduce((s, [l, r]) => s + r - l, 0);
        const limit = mode === "fat" ? 0.5 : 0, dim = mode === "fat" ? 1 : Math.log(2) / Math.log(2 / (1 - a));
        out.innerHTML = `stage ${K}: ${I.length.toLocaleString()} intervals, each of length ${fx(I[0][1] - I[0][0], 6)}\n` +
          `total length left = <span class="g">${fx(len, 6)}</span>   → ${limit} in the limit\n` +
          (mode === "fat" ? `<span class="t">positive measure ½, yet no interval survives</span> — every piece is eventually split.` :
            `Hausdorff dimension log 2 / log(${fx(2 / (1 - a), 3)}) = <span class="g">${fx(dim, 4)}</span>${mode === "third" ? "  (= log 2 / log 3)" : ""}`) +
          (mode === "third" ? `\n<span class="d">¼ = 0.020202…₃ uses no digit 1, so it survives every stage — though it is never an endpoint.</span>` : "");
      }
      root.querySelectorAll(".ct-mode .gk-chip").forEach(b => b.addEventListener("click", () => { mode = b.dataset.m; root.querySelectorAll(".ct-mode .gk-chip").forEach(x => x.classList.toggle("on", x === b)); run(); }));
      kI.addEventListener("input", run); aI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1829–1898 — sets that break the Riemann integral", who: "Dirichlet 1829 · Henry Smith 1875 · Georg Cantor 1883 · Émile Borel 1898",
      lead: "Fourier series forced mathematicians to integrate over sets that are not intervals.",
      formula: "1_ℚ(x) = 1 if x is rational, 0 otherwise — not Riemann integrable",
      what: "Dirichlet's function (1829) jumps between 0 and 1 inside every interval, so Riemann's upper and lower sums never meet. Cantor's middle-thirds set (1883) is uncountable yet has total length zero — the lab. Borel (1898) proposed measuring every set that can be built from intervals by countably many unions and complements.",
      how: "The key axiom is countable additivity: the measure of a union of countably many disjoint sets is the sum of their measures. The rationals are countably many points of length 0, so ℚ has measure zero.",
      story: "Henry Smith, an Oxford number theorist, had described Cantor-like sets in 1875, including ones of positive length; his paper went unnoticed. Volterra built similar examples in 1881.",
      today: "Cantor sets are the prototype fractals, and 'measure zero' is the precise meaning of 'almost never' in probability." },
    { icon: "⚙️", title: "1902 — Lebesgue's integral", who: "Henri Lebesgue, thesis 'Intégrale, longueur, aire' 1902",
      lead: "Slice the range, not the domain: add up each value times the size of the set where it occurs.",
      formula: "∫ f dμ ≈ Σ yᵢ · μ{ x : yᵢ ≤ f(x) < yᵢ₊₁ }",
      what: "Riemann chops the x-axis into intervals; Lebesgue chops the y-axis and asks how large the set of x with f(x) in each slice is. Every Riemann-integrable function is Lebesgue integrable with the same integral, and many more functions are too: Dirichlet's function has Lebesgue integral 0.",
      how: "Lebesgue compared it to counting money: sort the coins and notes into piles by value first, then count each pile — rather than adding them up in the order they come out of your pocket.",
      story: "Lebesgue was 27 when his thesis appeared. Not everyone welcomed pathological functions: Hermite had written to Stieltjes in 1893 that he turned away 'with fright and horror' from continuous functions without derivatives.",
      today: "The Lebesgue integral is the integral of modern analysis, probability and quantum mechanics; L² spaces, where Fourier series converge, need it. The 'Riemann vs Lebesgue' atom shows the two side by side." },
    { icon: "🏛", title: "1906–1910 — convergence theorems and Lᵖ", who: "Beppo Levi 1906 · Pierre Fatou 1906 · Lebesgue 1908 · Riesz & Fischer 1907 · Riesz 1910",
      lead: "Limits and integrals can be swapped — under conditions you can check.",
      formula: "fₙ → f,  |fₙ| ≤ g,  ∫ g < ∞   ⇒   ∫ fₙ → ∫ f      (dominated convergence)",
      what: "Monotone convergence (Beppo Levi), Fatou's lemma and dominated convergence (Lebesgue) say when lim ∫ = ∫ lim. The spaces Lᵖ of functions with ∫|f|ᵖ < ∞ are complete (Riesz–Fischer, 1907), so L² is a Hilbert space in which every Fourier series converges in the mean.",
      how: "The example to remember: fₙ = n on (0, 1/n) and 0 elsewhere. fₙ(x) → 0 at every point, but ∫ fₙ = 1 for every n — the mass escapes into a spike. A dominating g forbids exactly that.",
      story: "Frigyes Riesz and Ernst Fischer published the Riesz–Fischer theorem independently, both in the Comptes Rendus of 1907.",
      today: "Dominated convergence justifies differentiating under the integral sign, exchanging limits and expectations in probability, and the convergence proofs behind numerical methods." },
    { icon: "🔥", title: "1905–1933 — the unmeasurable, and probability", who: "Giuseppe Vitali 1905 · Stefan Banach & Alfred Tarski 1924 · Andrey Kolmogorov 1933 · Robert Solovay 1970",
      lead: "With the axiom of choice some sets can't be measured — and yet measure became the foundation of probability.",
      formula: "one solid ball → two balls of the same size, by rigid motions of five pieces",
      what: "Vitali (1905) used the axiom of choice to build a subset of [0, 1] that can be given no length consistent with translation. Banach and Tarski (1924) showed that a solid ball can be cut into finitely many pieces and reassembled by rotations and translations into two balls of the same size; Robinson (1947) showed five pieces suffice.",
      how: "The pieces are non-measurable, so volume is simply not defined for them — no contradiction. Solovay (1970) showed that without the axiom of choice it is consistent (assuming an inaccessible cardinal) that every set of reals is measurable.",
      story: "Kolmogorov's Grundbegriffe (1933) defined a probability as a measure of total mass 1, events as measurable sets and random variables as measurable functions, settling the foundations of probability in eighty pages.",
      today: "Every theorem of probability and statistics rests on Kolmogorov's axioms; geometric measure theory measures soap films, fractals and the singular sets of solutions to PDEs." }
  ],
  challenges: [
    "Middle thirds: after how many stages is less than 1% of the length left? Yet uncountably many points survive — why?",
    "Fat Cantor: every interval is eventually split, so the limit set contains no interval. Why is its length still ½?",
    "Middle fraction a: which a makes the dimension exactly ½? Check with the formula log 2 / log(2/(1 − a))."
  ],
  sources: [
    { type: "TEXTBOOK", title: "Sheldon Axler — Measure, Integration & Real Analysis", note: "Open access; motivated by the failures of the Riemann integral.", url: "https://measure.axler.net/" },
    { type: "FREE BOOK", title: "Terence Tao — An Introduction to Measure Theory", note: "From Jordan measure to Lebesgue measure and the convergence theorems.", url: "https://terrytao.wordpress.com/books/an-introduction-to-measure-theory/" },
    { type: "BOOK", title: "Stan Wagon — The Banach–Tarski Paradox", note: "The paradox, its proof and its descendants.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Henri Lebesgue", note: "The thesis that changed integration.", url: MT("Lebesgue") }
  ]
});

/* ================================================================ COMPLEX ANALYSIS */
const CA_PRE = {
  "z³ − 1": { zeros: [[1, 0], [-.5, .866], [-.5, -.866]], poles: [] },
  "(z² − 1)/(z − i)": { zeros: [[1, 0], [-1, 0]], poles: [[0, 1]] },
  "z²": { zeros: [[0, 0], [0, 0]], poles: [] },
  "1/z": { zeros: [], poles: [[0, 0]] },
  "(z − 1)/(z + 1)²": { zeros: [[1, 0]], poles: [[-1, 0], [-1, 0]] }
};
register("complex-analysis", {
  kicker: "CALCULUS WITH i · ABOUT 30 MIN",
  hook: "How can walking once around a loop count the zeros hidden inside it?",
  intro: "Let the variable be complex and calculus becomes rigid and almost magical: a function differentiable once is differentiable infinitely often, its values on a circle determine it inside, and integrals around loops count what the loop encloses. Cauchy built the theory between 1814 and the 1840s; Riemann made it geometric. The lab walks a loop in the z-plane and watches its image wind around zero.",
  timeline: [[1748, "Euler: e^(iθ) = cos θ + i sin θ"], [1806, "Argand: the complex plane"], [1814, "Cauchy–Riemann equations"], [1825, "Cauchy's integral theorem"], [1826, "residues"], [1851, "Riemann's thesis"]],
  labs: [{
    kicker: "CAUCHY · THE ARGUMENT PRINCIPLE", title: "Count zeros by winding around 0",
    intro: "Top: the z-plane, with zeros (gold ○) and poles (red ×) of f. Click to move the circle's centre; the slider sets its radius. Bottom: the image of the circle under f, radially compressed so it fits. The number of times it winds around 0 equals zeros minus poles inside the circle.",
    html: `<div class="gk-chips ca-pre">${Object.keys(CA_PRE).map((k, i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-k="${k}">f = ${k}</button>`).join("")}</div>
      <div class="it-control"><label><span>radius</span><output data-o="r">0.60</output></label><input type="range" data-i="r" min="0.1" max="2.5" step="0.01" value="0.6"></div>
      <canvas class="gk-canvas ca-z" style="cursor:crosshair"></canvas>
      <canvas class="gk-canvas ca-w"></canvas>
      <div class="it-lab-actions"><button class="gk-ghost ca-walk">▶ walk the loop</button></div>
      <div class="gk-out ca-out"></div>`,
    caveat: "(1/2πi) ∮ f′(z)/f(z) dz = Z − P, counting multiplicity. A double zero counts twice: the image of a small circle around 0 under z² goes round twice. The same count, for the loop around −1, is Nyquist's criterion (1932) for whether a feedback amplifier is stable.",
    init(root) {
      let key = "z³ − 1", cen = [.7, .2], s = 0, stop = null;
      const rI = root.querySelector("[data-i=r]"), cz = root.querySelector(".ca-z"), cw = root.querySelector(".ca-w"), out = root.querySelector(".ca-out");
      const f = (x, y) => { let re = 1, im = 0; const { zeros, poles } = CA_PRE[key];
        for (const [a, b] of zeros) { const u = x - a, v = y - b; [re, im] = [re * u - im * v, re * v + im * u]; }
        for (const [a, b] of poles) { const u = x - a, v = y - b, d = u * u + v * v; [re, im] = [(re * u + im * v) / d, (im * u - re * v) / d]; }
        return [re, im]; };
      let geo;
      function draw() {
        const r = +rI.value; root.querySelector("[data-o=r]").textContent = r.toFixed(2);
        const Z = canvas(cz, 190), W = canvas(cw, 190), sc = Z.h / 5.2, ox = Z.w / 2, oy = Z.h / 2, P = (x, y) => [ox + x * sc, oy - y * sc];
        geo = { sc, ox, oy };
        let ctx = Z.ctx; ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(Z.w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, Z.h); ctx.stroke();
        const { zeros, poles } = CA_PRE[key], inside = ([a, b]) => Math.hypot(a - cen[0], b - cen[1]) < r;
        ctx.fillStyle = "rgba(245,196,81,.06)"; ctx.strokeStyle = C.teal; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(...P(...cen), r * sc, 0, 7); ctx.fill(); ctx.stroke();
        zeros.forEach(([a, b], i) => { ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(...P(a, b), 6 + 3 * zeros.slice(0, i).filter(q => q[0] === a && q[1] === b).length, 0, 7); ctx.stroke(); });
        poles.forEach(([a, b]) => { const [x, y] = P(a, b); ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - 5, y - 5); ctx.lineTo(x + 5, y + 5); ctx.moveTo(x + 5, y - 5); ctx.lineTo(x - 5, y + 5); ctx.stroke(); });
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("z-plane", 6, 13);
        // image curve with radial log compression
        const M = 720, pts = []; let wind = 0, prev = null, maxR = 0;
        for (let k = 0; k <= M; k++) { const t = 2 * Math.PI * k / M, w = f(cen[0] + r * Math.cos(t), cen[1] + r * Math.sin(t)); pts.push(w); maxR = Math.max(maxR, Math.hypot(...w));
          const ang = Math.atan2(w[1], w[0]); if (prev !== null) { let d = ang - prev; if (d > Math.PI) d -= 2 * Math.PI; if (d < -Math.PI) d += 2 * Math.PI; wind += d; } prev = ang; }
        const n = Math.round(wind / (2 * Math.PI)), R = W.h / 2 - 10, cx = W.w / 2, cy = W.h / 2, L = Math.log1p(Math.min(maxR, 1e6));
        const Q = ([u, v]) => { const m = Math.hypot(u, v), k = m ? R * Math.log1p(Math.min(m, 1e6)) / L / m : 0; return [cx + u * k, cy - v * k]; };
        ctx = W.ctx; ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(W.w, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, W.h); ctx.stroke();
        ctx.strokeStyle = C.gold; ctx.lineWidth = 1.5; ctx.beginPath(); pts.forEach((w, i) => i ? ctx.lineTo(...Q(w)) : ctx.moveTo(...Q(w))); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, 3, 0, 7); ctx.fill();
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("w = f(z) plane (log-compressed)", 6, 13);
        if (s) { const t = 2 * Math.PI * s; const z = [cen[0] + r * Math.cos(t), cen[1] + r * Math.sin(t)];
          Z.ctx.fillStyle = C.red; Z.ctx.beginPath(); Z.ctx.arc(...P(...z), 4.5, 0, 7); Z.ctx.fill();
          ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(...Q(f(...z)), 4.5, 0, 7); ctx.fill();
          ctx.strokeStyle = "rgba(255,120,71,.5)"; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(...Q(f(...z))); ctx.stroke(); }
        const zi = zeros.filter(inside).length, pi = poles.filter(inside).length;
        const near = zeros.concat(poles).some(([a, b]) => Math.abs(Math.hypot(a - cen[0], b - cen[1]) - r) < .03);
        out.innerHTML = `f(z) = ${key}   circle |z − (${fx(cen[0], 2)} ${cen[1] < 0 ? "−" : "+"} ${fx(Math.abs(cen[1]), 2)}i)| = ${r.toFixed(2)}\n` +
          `zeros inside Z = ${zi}   poles inside P = ${pi}\n` +
          (near ? `<span class="r">the loop passes (almost) through a zero or pole — move it.</span>` : `<span class="g">winding number of f(loop) around 0 = ${n} = Z − P ✓</span>`);
      }
      cz.addEventListener("click", e => { const b = cz.getBoundingClientRect(); cen = [(e.clientX - b.left - geo.ox) / geo.sc, (geo.oy - (e.clientY - b.top)) / geo.sc]; draw(); });
      root.querySelectorAll(".ca-pre .gk-chip").forEach(b => b.addEventListener("click", () => { key = b.dataset.k; root.querySelectorAll(".ca-pre .gk-chip").forEach(x => x.classList.toggle("on", x === b)); draw(); }));
      rI.addEventListener("input", draw);
      const walk = root.querySelector(".ca-walk");
      walk.addEventListener("click", () => {
        if (stop) { stop(); stop = null; walk.textContent = "▶ walk the loop"; s = 0; draw(); return; }
        walk.textContent = "❚❚ stop"; s = 0;
        stop = loop(root, () => { s += 1 / 360; if (s >= 1) s -= 1; draw(); });
      });
      draw();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1545–1831 — impossible numbers become points", who: "Gerolamo Cardano 1545 · Rafael Bombelli 1572 · Euler 1748 · Caspar Wessel 1799 · Jean-Robert Argand 1806 · Gauss 1831",
      lead: "Square roots of negative numbers appeared inside the cubic formula and took 250 years to become ordinary.",
      formula: "e^(iπ) + 1 = 0",
      what: "Cardano's formula for cubics sometimes needs √−1 midway through, even when all three roots are real. Bombelli (1572) wrote down rules for computing with such quantities. Euler's formula e^(iθ) = cos θ + i sin θ (1748) tied them to rotation, and Wessel (1799) and Argand (1806) drew them as points of a plane.",
      how: "Multiplying by i turns the plane through 90°; multiplying by e^(iθ) turns it through θ. Complex multiplication is rotation plus scaling — which is why complex analysis is so geometric.",
      story: "Descartes called these numbers 'imaginary' in 1637, not as a compliment. Gauss's paper of 1831 on biquadratic residues made the plane standard and gave us the name 'complex numbers'.",
      today: "Alternating current, quantum mechanics (wave functions are complex-valued) and all of signal processing run on complex numbers; the ℂ shell on the map is their home." },
    { icon: "⚙️", title: "1814–1825 — holomorphic functions and Cauchy's theorem", who: "Augustin-Louis Cauchy 1814, 1825 · Bernhard Riemann 1851",
      lead: "A function with a complex derivative is so rigid that its integral around any loop vanishes.",
      formula: "u_x = v_y,  u_y = −v_x   ⇒   ∮_γ f(z) dz = 0",
      what: "f = u + iv has a complex derivative exactly when u and v satisfy the Cauchy–Riemann equations; such functions are called holomorphic. Cauchy's integral theorem: around any loop enclosing no singularity, ∮ f dz = 0. From it comes the integral formula, which recovers f inside a disc from its values on the boundary — so f is infinitely differentiable and equal to its Taylor series.",
      how: "Green's theorem turns ∮ f dz into an area integral of exactly the Cauchy–Riemann combinations, which vanish.",
      story: "D'Alembert (1752) and Euler met the Cauchy–Riemann equations in fluid flow long before Cauchy; Riemann made them the very definition of a complex function in his 1851 thesis.",
      today: "Liouville's theorem (a bounded function holomorphic on all of ℂ is constant) gives the shortest proof of the fundamental theorem of algebra, and holomorphic functions model two-dimensional airflow — Joukowski's aerofoil (1910)." },
    { icon: "🏛", title: "1826–1862 — residues and counting zeros", who: "Cauchy 1826, 1831 · Pierre Laurent 1843 · Eugène Rouché 1862",
      lead: "Integrals around loops see only the singularities inside — and count the zeros.",
      formula: "(1/2πi) ∮ f′/f dz = Z − P = winding number of f(γ) around 0",
      what: "Near an isolated singularity f has a Laurent series with negative powers; the coefficient of 1/(z − a) is the residue, and ∮ f dz = 2πi × the sum of the residues inside. Applied to f′/f, whose residues are the orders of zeros and poles, it becomes the argument principle — the lab.",
      how: "Walk the loop and follow arg f(z): each zero inside adds one full turn, each pole takes one away. Rouché's theorem (1862) follows: a small perturbation of f can't change the number of zeros inside.",
      story: "Cauchy's calculus of residues (1826) evaluated real integrals such as ∫ dx/(1 + x²) = π and ∫ (sin x)/x dx = π by detours through the complex plane — a technique physicists still use daily.",
      today: "The argument principle is Nyquist's stability criterion (1932): count how often the frequency response of a feedback loop encircles −1 to know whether an amplifier or an autopilot will oscillate." },
    { icon: "🔥", title: "1851–today — Riemann surfaces and analytic continuation", who: "Riemann 1851, 1857 · Weierstrass · Poincaré & Koebe 1907",
      lead: "Continue a function as far as it will go and it builds its own surface.",
      formula: "√z lives on two sheets;  log z on infinitely many",
      what: "A holomorphic function known on a small disc extends uniquely along paths — analytic continuation. Going once around 0, √z comes back as −√z and log z comes back increased by 2πi. Riemann glued sheets into surfaces on which these become honest single-valued functions.",
      how: "Uniformization (Poincaré and Koebe, 1907): every simply connected Riemann surface is conformally the disc, the plane or the sphere. So every surface carries one of three geometries — hyperbolic, flat or spherical.",
      story: "Riemann's thesis (1851) introduced the surfaces and the mapping theorem: every simply connected proper open subset of the plane can be mapped conformally onto the disc. His proof relied on the Dirichlet principle, which Weierstrass criticised; Hilbert rescued it in 1900.",
      today: "Analytic continuation defines Riemann's zeta function beyond the region where its series converges — which is where the Riemann hypothesis lives. The domain-colouring atom paints such functions." }
  ],
  challenges: [
    "With z³ − 1, put the loop around exactly one of the three zeros; then around all three. How many turns does the image make each time?",
    "With (z² − 1)/(z − i), enclose the zero at 1 and the pole at i together. What is the winding number, and why?",
    "With z², shrink the loop around 0. The image still goes round twice. Why doesn't it unwind as the loop gets smaller?"
  ],
  sources: [
    { type: "BOOK", title: "Tristan Needham — Visual Complex Analysis", note: "The geometric way in, with hundreds of pictures (1997; 25th anniversary edition 2023).", url: null },
    { type: "TEXTBOOK", title: "Stein & Shakarchi — Complex Analysis", note: "Princeton Lectures in Analysis II.", url: null },
    { type: "BOOK", title: "Paul Nahin — An Imaginary Tale: The Story of √−1", note: "The long road from Cardano to Riemann, for general readers.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Augustin-Louis Cauchy", note: "Nearly 800 papers, and the foundations of complex analysis.", url: MT("Cauchy") }
  ]
});

/* ================================================================ FUNCTIONAL ANALYSIS */
register("functional-analysis", {
  kicker: "GEOMETRY IN INFINITE DIMENSIONS · ABOUT 25 MIN",
  hook: "What does a ball look like when distance is measured differently — and why does its shape matter?",
  intro: "Functional analysis treats functions as points of a space and operators as matrices with infinitely many rows and columns. Fredholm, Hilbert, Riesz and Banach built it between 1900 and 1932, and quantum mechanics arrived just in time to need it. Much depends on the shape of the unit ball: round in Hilbert space, a square or a diamond in others. The lab morphs the unit ball of the p-norms.",
  timeline: [[1903, "Fredholm: integral equations"], [1906, "Hilbert: ℓ² · Fréchet: metric spaces"], [1910, "Riesz: Lᵖ"], [1922, "Banach's thesis"], [1932, "Banach's book · von Neumann's QM"], [1936, "Sobolev: weak derivatives"]],
  labs: [{
    kicker: "RIESZ 1910 · THE p-NORMS", title: "The shape of the unit ball",
    intro: "The unit ball of the p-norm in the plane is the set where |x|ᵖ + |y|ᵖ ≤ 1. Slide p. Gold is the ball of ‖·‖ₚ; the dashed teal curve is the ball of the dual norm ‖·‖_q with 1/p + 1/q = 1.",
    html: `<div class="it-control"><label><span>p</span><output data-o="p">2.00</output></label><input type="range" data-i="p" min="0" max="1" step="0.001" value="0.5"></div>
      <div class="gk-chips fa-pre">${[["½", .5], ["1", 1], ["1.5", 1.5], ["2", 2], ["4", 4], ["∞", Infinity]].map(([l, p]) => `<button class="gk-chip" data-p="${p}">p = ${l}</button>`).join("")}</div>
      <canvas class="gk-canvas fa-cv"></canvas>
      <div class="gk-out fa-out"></div>`,
    caveat: "Only p = 2 comes from an inner product, so only there do angles and orthogonal projections make sense — the reason Hilbert space is so much more comfortable than the other Lᵖ spaces. The corners of the ℓ¹ ball on the axes are why ℓ¹ penalties (the LASSO) produce sparse solutions.",
    init(root) {
      const pI = root.querySelector("[data-i=p]"), out = root.querySelector(".fa-out"), cv = root.querySelector(".fa-cv");
      const toP = v => v >= .999 ? Infinity : .4 + Math.pow(v, 2.2) * 12; // slider 0..1 → p
      const fromP = p => p === Infinity ? 1 : Math.pow((p - .4) / 12, 1 / 2.2);
      const norm = (x, y, p) => p === Infinity ? Math.max(Math.abs(x), Math.abs(y)) : Math.pow(Math.pow(Math.abs(x), p) + Math.pow(Math.abs(y), p), 1 / p);
      let P = 2; pI.value = fromP(2);
      function ball(ctx, p, P2, style, dash) {
        ctx.beginPath();
        for (let k = 0; k <= 720; k++) { const t = 2 * Math.PI * k / 720, c = Math.cos(t), s = Math.sin(t), n = norm(c, s, p); const [x, y] = P2(c / n, s / n); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
        ctx.strokeStyle = style; ctx.setLineDash(dash || []); ctx.lineWidth = 2; ctx.stroke(); ctx.setLineDash([]);
      }
      function run() {
        const p = P, q = p === Infinity ? 1 : p === 1 ? Infinity : p > 1 ? p / (p - 1) : null;
        root.querySelector("[data-o=p]").textContent = p === Infinity ? "∞" : p.toFixed(2);
        root.querySelectorAll(".fa-pre .gk-chip").forEach(b => b.classList.toggle("on", +b.dataset.p === p || (b.dataset.p === "Infinity" && p === Infinity)));
        const { ctx, w, h } = canvas(cv, 240), s = h / 3.2, cx = w / 2, cy = h / 2, P2 = (x, y) => [cx + x * s, cy - y * s];
        ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, h); ctx.stroke();
        ctx.fillStyle = "rgba(245,196,81,.10)"; ctx.beginPath();
        for (let k = 0; k <= 720; k++) { const t = 2 * Math.PI * k / 720, c = Math.cos(t), sn = Math.sin(t), n = norm(c, sn, p); const [x, y] = P2(c / n, sn / n); k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.fill();
        ball(ctx, p, P2, C.gold);
        if (q) ball(ctx, q, P2, "rgba(63,208,201,.8)", [5, 4]);
        if (p < 1) { ctx.fillStyle = C.red; [[1, 0], [0, 1], [.5, .5]].forEach(([a, b]) => { ctx.beginPath(); ctx.arc(...P2(a, b), 4, 0, 7); ctx.fill(); });
          ctx.strokeStyle = C.red; ctx.beginPath(); ctx.moveTo(...P2(1, 0)); ctx.lineTo(...P2(0, 1)); ctx.stroke(); }
        const v = [3, 4], nv = norm(...v, p), par = Math.pow(norm(1, 1, p), 2) + Math.pow(norm(1, -1, p), 2);
        out.innerHTML = `p = ${p === Infinity ? "∞" : p.toFixed(3)}   ${q ? `dual q = ${q === Infinity ? "∞" : q.toFixed(3)}   (1/p + 1/q = 1)` : "no dual norm: p < 1"}\n` +
          `‖(3, 4)‖ₚ = ${fx(nv, 3)}    (‖·‖₁ = 7, ‖·‖₂ = 5, ‖·‖∞ = 4)\n` +
          (p < 1 ? `<span class="r">NOT A NORM.</span> (1,0) and (0,1) are on the unit circle but their midpoint has size 2^(1/p − 1) = ${fx(Math.pow(2, 1 / p - 1), 3)} > 1: the ball isn't convex, the triangle inequality fails.\n` : `<span class="t">a norm: the ball is convex.</span>\n`) +
          `parallelogram law with x = (1,0), y = (0,1):  ‖x+y‖² + ‖x−y‖² = ${fx(par, 3)}  vs  2(‖x‖² + ‖y‖²) = 4  ` + (Math.abs(par - 4) < 1e-6 ? `<span class="g">equal — an inner product space</span>` : `<span class="d">unequal</span>`);
      }
      pI.addEventListener("input", () => { P = toP(+pI.value); run(); });
      root.querySelectorAll(".fa-pre .gk-chip").forEach(b => b.addEventListener("click", () => { P = +b.dataset.p; pI.value = fromP(P); run(); }));
      run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1900–1907 — from integral equations to Hilbert space", who: "Ivar Fredholm 1903 · David Hilbert 1904–10 · Erhard Schmidt 1907 · Maurice Fréchet 1906",
      lead: "Solving an integral equation is solving infinitely many linear equations at once.",
      formula: "f(x) − λ ∫ K(x, y) f(y) dy = g(x)",
      what: "Fredholm (1903) treated integral equations as limits of linear systems and proved the Fredholm alternative: either the equation has exactly one solution for every g, or the equation with g = 0 has nonzero solutions — just as for matrices. Hilbert recast the theory in the space ℓ² of square-summable sequences, and Schmidt (1907) gave it geometry: inner products, orthogonality, projections.",
      how: "Fréchet's thesis (1906) defined metric spaces, so the 'distance between two functions' finally had a meaning, and convergence of functions became convergence of points.",
      story: "When Erik Holmgren reported on Fredholm's work in Hilbert's Göttingen seminar in the winter of 1900–01, Hilbert dropped other projects and worked on integral equations for most of a decade.",
      today: "Hilbert space is the stage of quantum mechanics and of signal processing; kernel methods in machine learning work in reproducing-kernel Hilbert spaces." },
    { icon: "⚙️", title: "1910–1932 — Riesz, Banach and the Lᵖ spaces", who: "Frigyes Riesz 1910 · Stefan Banach 1920–32 · Hans Hahn 1927",
      lead: "Measure the size of a function in different ways and you get different geometries.",
      formula: "‖f‖ₚ = (∫|f|ᵖ)^(1/p)      ∫|fg| ≤ ‖f‖ₚ ‖g‖_q,   1/p + 1/q = 1",
      what: "For p ≥ 1 the p-norm really is a norm and Lᵖ is complete: a Banach space. Only p = 2 comes from an inner product; its ball is round and the parallelogram law holds (the lab checks). Riesz showed that the dual of Lᵖ is L^q.",
      how: "Banach's theory rests on three pillars: the Hahn–Banach theorem (functionals extend), the uniform boundedness principle, and the open mapping theorem — all consequences of completeness through Baire's category theorem.",
      story: "Banach worked in the cafés of Lwów. At the Scottish Café problems were written into a notebook kept by the head waiter — the Scottish Book (1935–41). Mazur offered a live goose for problem 153; Per Enflo solved it in 1972 and received the goose.",
      today: "Norms choose models in statistics and machine learning: ridge regression uses ℓ², the LASSO uses ℓ¹ and gets sparse answers because the ℓ¹ ball has corners on the axes." },
    { icon: "🏛", title: "1904–1932 — spectra and quantum mechanics", who: "Hilbert 1904 · Riesz · John von Neumann 1929–32 · Marshall Stone 1930",
      lead: "Infinite matrices have spectra, and spectra are what physicists measure.",
      formula: "A = ∫ λ dE(λ)      (the spectral theorem for self-adjoint operators)",
      what: "A self-adjoint operator on a Hilbert space decomposes along its spectrum — the infinite-dimensional version of diagonalising a symmetric matrix. The spectrum may be discrete (the energy levels of an atom), continuous (a free particle) or both. Compact operators behave almost like matrices: their nonzero spectrum is a sequence of eigenvalues tending to 0.",
      how: "Von Neumann's Mathematical Foundations of Quantum Mechanics (1932) set quantum theory in Hilbert space: states are unit vectors, observables are self-adjoint operators, and possible measurement results are points of the spectrum.",
      story: "Hilbert used the word 'spectrum' in 1904, two decades before it turned out to match the spectral lines of atoms exactly. Unbounded operators such as position and momentum needed von Neumann's theory of 1929.",
      today: "Spectral methods solve PDEs numerically, spectral graph theory clusters data, and von Neumann algebras underlie quantum field theory and quantum information." },
    { icon: "🔥", title: "1936–today — distributions and Sobolev spaces", who: "Sergei Sobolev 1936 · Laurent Schwartz 1945–51 · Peter Lax & Arthur Milgram 1954",
      lead: "Differentiate functions that have no derivatives, by testing them against smooth ones.",
      formula: "⟨T′, φ⟩ = −⟨T, φ′⟩      (Heaviside step)′ = δ",
      what: "A distribution is a continuous linear functional on smooth test functions. Every locally integrable function is one, and every distribution has derivatives of every order. Dirac's δ, zero everywhere except at one point but with integral 1, is the derivative of the step function. Sobolev spaces Hᵏ collect functions whose weak derivatives up to order k are square-integrable.",
      how: "Weak solutions of PDEs live in Sobolev spaces, where Hilbert-space tools (the Riesz representation theorem, Lax–Milgram) prove they exist; regularity theory then shows they are smooth after all.",
      story: "Sobolev introduced generalised functions in 1935–36 while studying the wave equation; Schwartz built the complete theory (Théorie des distributions, 1950–51) and received the Fields Medal in 1950.",
      today: "The finite element method, used to design bridges, aircraft and implants, is Galerkin approximation in a Sobolev space." }
  ],
  challenges: [
    "Compare p = 1 and p = ∞. Which ball has corners on the axes, which on the diagonals — and how does duality swap them?",
    "Slide p below 1. Find two points in the 'ball' whose midpoint lies outside it. Which axiom of a norm fails?",
    "For which p does the parallelogram law hold? What does that tell you about angles in Lᵖ?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "Erwin Kreyszig — Introductory Functional Analysis with Applications", note: "The gentlest full course; needs only linear algebra and analysis.", url: null },
    { type: "TEXTBOOK", title: "Haïm Brezis — Functional Analysis, Sobolev Spaces and PDEs", note: "The standard route from Banach spaces to PDE.", url: null },
    { type: "BOOK", title: "R. Daniel Mauldin (ed.) — The Scottish Book", note: "The problems from the café, with commentary (2nd ed., 2015).", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Stefan Banach", note: "From the cafés of Lwów to Banach spaces.", url: MT("Banach") }
  ]
});

/* ================================================================ HARMONIC ANALYSIS */
const WAVES = {
  square: { name: "square wave", f: x => Math.sign(Math.sin(x)), c: k => k % 2 ? [0, 4 / (Math.PI * k)] : [0, 0] },
  saw: { name: "sawtooth", f: x => { const y = ((x + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return y / Math.PI; }, c: k => [0, 2 * (k % 2 ? 1 : -1) / (Math.PI * k)] },
  tri: { name: "triangle", f: x => { const y = ((x + Math.PI) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI) - Math.PI; return 1 - 2 * Math.abs(y) / Math.PI; }, c: k => k % 2 ? [8 / (Math.PI * Math.PI * k * k), 0] : [0, 0] }
};
register("harmonic-analysis", {
  kicker: "SIGNALS AS SUMS OF WAVES · ABOUT 25 MIN",
  hook: "Why does a Fourier series overshoot every jump by about 9% — no matter how many terms you add?",
  intro: "Fourier claimed in 1807 that any function is a sum of sines and cosines. Working out exactly when he was right took a century, and harmonic analysis — decomposing functions into frequencies — became one of the widest rivers in mathematics. The lab adds up waves, meets the Gibbs phenomenon, and tames it with Fejér's averaging trick.",
  timeline: [[1753, "D. Bernoulli: strings as sums of sines"], [1807, "Fourier: heat and series"], [1829, "Dirichlet: first convergence proof"], [1899, "Gibbs phenomenon"], [1900, "Fejér: averaging"], [1966, "Carleson's theorem"]],
  labs: [{
    kicker: "GIBBS 1899 · FEJÉR 1900", title: "Build a wave from sines — and watch the overshoot",
    intro: "Gold: the Fourier partial sum S_N using harmonics up to N. Teal: Fejér's average of S₀, …, S_N. Grey: the target. Push N up and look at the jump.",
    html: `<div class="gk-chips hw-pre">${Object.entries(WAVES).map(([k, v], i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-k="${k}">${v.name}</button>`).join("")}</div>
      <div class="it-control"><label><span>harmonics N</span><output data-o="n">9</output></label><input type="range" data-i="n" min="1" max="150" value="9"></div>
      <label class="it-check"><input type="checkbox" class="hw-fej" checked> show Fejér average (teal)</label>
      <canvas class="gk-canvas hw-cv"></canvas>
      <div class="gk-out hw-out"></div>`,
    caveat: "For a jump of height 2 the partial sums peak near (2/π)·Si(π) ≈ 1.17898 — an overshoot of about 8.95% of the jump, however large N is. The overshoot doesn't shrink; it gets narrower. Fejér's averages never overshoot at all, at the price of rounding the corner.",
    init(root) {
      let key = "square";
      const nI = root.querySelector("[data-i=n]"), fej = root.querySelector(".hw-fej"), out = root.querySelector(".hw-out"), cv = root.querySelector(".hw-cv");
      function run() {
        const N = +nI.value, W = WAVES[key]; root.querySelector("[data-o=n]").textContent = N;
        const co = Array.from({ length: N + 1 }, (_, k) => k ? W.c(k) : [0, 0]);
        const S = (x, fe) => { let s = 0; for (let k = 1; k <= N; k++) { const wgt = fe ? 1 - k / (N + 1) : 1; s += wgt * (co[k][0] * Math.cos(k * x) + co[k][1] * Math.sin(k * x)); } return s; };
        const { ctx, w, h } = canvas(cv, 220), pad = 10, X = x => pad + (w - 2 * pad) * (x + Math.PI) / (2 * Math.PI), Y = v => h / 2 - v * (h / 2 - 22);
        ctx.strokeStyle = "rgba(255,255,255,.1)"; ctx.beginPath(); ctx.moveTo(0, Y(0)); ctx.lineTo(w, Y(0)); [1, -1].forEach(v => { ctx.moveTo(0, Y(v)); ctx.lineTo(w, Y(v)); }); ctx.stroke();
        const M = 900, plot = (fn, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); for (let i = 0; i <= M; i++) { const x = -Math.PI + 2 * Math.PI * i / M; i ? ctx.lineTo(X(x), Y(fn(x))) : ctx.moveTo(X(x), Y(fn(x))); } ctx.stroke(); };
        plot(W.f, "rgba(255,255,255,.35)", 1.2);
        if (fej.checked) plot(x => S(x, true), C.teal, 1.6);
        plot(x => S(x, false), C.gold, 1.8);
        let mx = -9, mf = -9; for (let i = 0; i <= 4000; i++) { const x = -Math.PI + 2 * Math.PI * i / 4000; mx = Math.max(mx, S(x, false)); mf = Math.max(mf, S(x, true)); }
        const jump = key === "tri" ? 0 : 2;
        out.innerHTML = `S_N(x) = ${key === "square" ? "(4/π)(sin x + sin 3x/3 + sin 5x/5 + ⋯)" : key === "saw" ? "(2/π)(sin x − sin 2x/2 + sin 3x/3 − ⋯)" : "(8/π²)(cos x + cos 3x/9 + cos 5x/25 + ⋯)"}\n` +
          `max S_N = <span class="g">${fx(mx, 4)}</span>   max of Fejér average = <span class="t">${fx(mf, 4)}</span>   target max = 1\n` +
          (jump ? `overshoot = ${fx(100 * (mx - 1) / jump, 2)}% of the jump   <span class="d">(Gibbs limit ≈ 8.95%)</span>` : `<span class="t">no jump, coefficients ~ 1/k²: uniform convergence, no Gibbs overshoot.</span>`);
      }
      root.querySelectorAll(".hw-pre .gk-chip").forEach(b => b.addEventListener("click", () => { key = b.dataset.k; root.querySelectorAll(".hw-pre .gk-chip").forEach(x => x.classList.toggle("on", x === b)); run(); }));
      nI.addEventListener("input", run); fej.addEventListener("change", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1807 — Fourier's audacious claim", who: "Joseph Fourier, memoir on heat 1807 · Théorie analytique de la chaleur 1822 · Daniel Bernoulli 1753",
      lead: "Any function, Fourier said, is a sum of sines and cosines — even one with corners and jumps.",
      formula: "f(x) = a₀/2 + Σ (aₙ cos nx + bₙ sin nx),   bₙ = (1/π) ∫ f(x) sin nx dx",
      what: "To solve the heat equation Fourier needed to write any initial temperature as a sum of sine modes, each of which decays on its own. He found the coefficients by orthogonality: ∫ sin mx · sin nx dx = 0 whenever m ≠ n. Even the square wave, with its jumps, gets coefficients 4/(πk) for odd k — the lab's first preset.",
      how: "Each coefficient measures how much of one frequency a function contains, like a prism splitting light. Smooth functions have coefficients that fall off fast; jumps make them fall off only like 1/k.",
      story: "The 1807 memoir was judged by Lagrange, Laplace, Monge and Lacroix and not published; Lagrange objected that a sum of smooth sines could never produce a corner. Fourier won the Academy's prize in 1812 and published his book in 1822.",
      today: "JPEG and MP3 compression, MRI scanners, spectrum analysers and every radio receiver decompose signals into frequencies." },
    { icon: "⚙️", title: "1829–1900 — when does it converge?", who: "Dirichlet 1829 · Riemann 1854 · du Bois-Reymond 1873 · Gibbs 1899 · Lipót Fejér 1900",
      lead: "Pointwise convergence turned out to be delicate — and the questions it raised created modern analysis.",
      formula: "σ_N = (S₀ + S₁ + ⋯ + S_N)/(N + 1)  →  f   uniformly, for every continuous f",
      what: "Dirichlet (1829) proved the first convergence theorem: for piecewise smooth functions the series converges, to the midpoint at a jump. Du Bois-Reymond (1873) built a continuous function whose Fourier series diverges at a point. Near a jump the partial sums overshoot by about 9% of the jump however many terms are taken — the Gibbs phenomenon.",
      how: "Fejér (1900), still a student, averaged the partial sums. That replaces the oscillating Dirichlet kernel, which takes negative values, by the Fejér kernel, which is positive — so no overshoot is possible, and the averages converge uniformly for every continuous function.",
      story: "Michelson's mechanical harmonic analyser, which summed 80 terms, drew the overshoot in 1898, and Gibbs explained it in letters to Nature (1898–99). Henry Wilbraham had described it in 1848. Cantor's work on the uniqueness of trigonometric series led him to set theory.",
      today: "Gibbs ringing is the halo around sharp edges in compressed images and MRI reconstructions; windowing, a relative of Fejér's averaging, suppresses it." },
    { icon: "🏛", title: "1822–1965 — transform, convolution, uncertainty", who: "Fourier 1822 · Michel Plancherel 1910 · Heisenberg, Kennard 1927 · Weyl 1928 · Cooley & Tukey 1965",
      lead: "On the whole line, series become integrals — and a function and its spectrum can't both be concentrated.",
      formula: "f̂(ξ) = ∫ f(x) e^(−2πixξ) dx      Δx · Δξ ≥ 1/(4π)",
      what: "The Fourier transform turns convolution into multiplication and differentiation into multiplication by 2πiξ, so linear differential equations with constant coefficients become algebra. Plancherel (1910): it preserves the L² norm. The uncertainty principle: a function and its transform can't both be sharply localised.",
      how: "Convolution with a kernel is a filter — blurring, smoothing, echo — and the Fourier transform diagonalises all such filters at once; that is why it rules linear, time-invariant systems.",
      story: "Heisenberg's uncertainty principle (1927) is this theorem, because momentum is the Fourier dual of position; Kennard (1927) and Weyl (1928) proved the sharp inequality. The fast Fourier transform (Cooley and Tukey, 1965) had been anticipated by Gauss in an unpublished note of about 1805.",
      today: "The FFT computes the transform of n samples in about n log n steps and runs in every phone, radio and scientific instrument." },
    { icon: "🔥", title: "1966–today — Carleson and beyond", who: "Andrey Kolmogorov 1923 · Lennart Carleson 1966 · Richard Hunt 1968 · Calderón & Zygmund 1952",
      lead: "The Fourier series of every square-integrable function converges almost everywhere — a theorem 150 years in the making.",
      formula: "f ∈ L²  ⇒  S_N f(x) → f(x) for almost every x",
      what: "Kolmogorov (1923) found an integrable function whose Fourier series diverges almost everywhere (and in 1926 one that diverges everywhere). Luzin had conjectured that for L² functions this can't happen; Carleson proved it in 1966, and Hunt extended it to Lᵖ for p > 1.",
      how: "The tools are Calderón–Zygmund singular integrals — operators like the Hilbert transform — and time–frequency analysis, which cuts a function into wave packets localised in both position and frequency.",
      story: "Carleson has said that he set out to disprove Luzin's conjecture, found he could not, and so proved it instead.",
      today: "Wavelets (Meyer, Mallat, Daubechies, late 1980s) grew from these ideas; they compress fingerprints for the FBI and images in JPEG 2000. Harmonic analysis also drives work on the Kakeya problem, for which a three-dimensional proof was announced in 2025 by Hong Wang and Joshua Zahl." }
  ],
  challenges: [
    "Square wave: raise N from 9 to 149. Does the overshoot shrink? What does get smaller?",
    "Switch on the Fejér average. What happens to the overshoot, and what is the price at the jump?",
    "The triangle wave's coefficients fall like 1/k². Why does it converge so fast, with no overshoot? (It is the integral of the square wave.)"
  ],
  sources: [
    { type: "VIDEO", title: "3Blue1Brown — But what is a Fourier series?", note: "Drawing with circles, and why the coefficients are integrals.", url: "https://www.3blue1brown.com/lessons/fourier-series" },
    { type: "TEXTBOOK", title: "Stein & Shakarchi — Fourier Analysis: An Introduction", note: "Princeton Lectures in Analysis I.", url: null },
    { type: "BOOK", title: "T. W. Körner — Fourier Analysis", note: "Short chapters, full of history and applications (Cambridge, 1988).", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Joseph Fourier", note: "Revolutionary, prefect of Isère, and the theory of heat.", url: MT("Fourier") }
  ]
});

/* ================================================================ ODEs */
register("odes", {
  kicker: "LAWS OF CHANGE · ABOUT 25 MIN",
  hook: "Why does a simulated planet slowly spiral away from its star — and how do you stop it?",
  intro: "Newton's laws are differential equations: they say how things change, not where they are. Most can't be solved by formula, so computers solve them by stepping forward in time. The lab simulates the simplest oscillator three ways: Euler's method gains energy step by step, a one-line change (symplectic Euler) keeps it bounded forever, and Runge–Kutta is accurate to the pixel.",
  timeline: [[1671, "Newton: fluxional equations"], [1743, "Euler: linear equations"], [1768, "Euler's method"], [1881, "Poincaré: qualitative theory"], [1890, "Picard: existence"], [1901, "Runge–Kutta"]],
  labs: [{
    kicker: "EULER 1768 · RUNGE–KUTTA 1901", title: "Three ways to step through time",
    intro: "The system is x″ = −x (a mass on a spring) or x″ = −sin x (a pendulum), started at x = 1, x′ = 0 and run for five periods. The dashed curve is the exact orbit in the phase plane (x across, x′ up). Change the step size h.",
    html: `<div class="gk-chips od-sys"><button class="gk-chip on" data-s="spring">spring x″ = −x</button><button class="gk-chip" data-s="pend">pendulum x″ = −sin x (big swing)</button></div>
      <div class="it-control"><label><span>step size h</span><output data-o="h">0.100</output></label><input type="range" data-i="h" min="0.01" max="0.5" step="0.005" value="0.1"></div>
      <div class="gk-chips od-m"><button class="gk-chip on" data-m="euler" style="border-color:#ff7847">Euler</button><button class="gk-chip on" data-m="symp" style="border-color:#3fd0c9">symplectic Euler</button><button class="gk-chip on" data-m="rk4" style="border-color:#f5c451">RK4</button></div>
      <canvas class="gk-canvas od-cv"></canvas>
      <div class="gk-out od-out"></div>`,
    caveat: "For the spring, Euler multiplies the energy by exactly 1 + h² at every step, so the orbit spirals outward. Symplectic Euler updates the velocity first and uses the new velocity for the position; it preserves phase-space area and a slightly modified energy, so its error never accumulates.",
    init(root) {
      let sys = "spring"; const on = { euler: true, symp: true, rk4: true };
      const hI = root.querySelector("[data-i=h]"), out = root.querySelector(".od-out"), cv = root.querySelector(".od-cv");
      function run() {
        const h = +hI.value; root.querySelector("[data-o=h]").textContent = h.toFixed(3);
        const x0 = sys === "spring" ? 1 : 2.6, acc = sys === "spring" ? x => -x : x => -Math.sin(x);
        const E = (x, v) => sys === "spring" ? (v * v + x * x) / 2 : v * v / 2 + 1 - Math.cos(x);
        // exact reference: fine RK4
        const rk = (x, v, dt) => { const a1 = acc(x), k1 = [v, a1], k2 = [v + dt / 2 * k1[1], acc(x + dt / 2 * k1[0])], k3 = [v + dt / 2 * k2[1], acc(x + dt / 2 * k2[0])], k4 = [v + dt * k3[1], acc(x + dt * k3[0])];
          return [x + dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), v + dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1])]; };
        const agm = (a, b) => { for (let i = 0; i < 30; i++) [a, b] = [(a + b) / 2, Math.sqrt(a * b)]; return a; };
        const Tper = sys === "spring" ? 2 * Math.PI : 2 * Math.PI / agm(1, Math.cos(x0 / 2)), T = 5 * Tper;
        const ref = []; { let s = [x0, 0]; const dt = Tper / 1500; for (let i = 0; i <= 1500; i++) { ref.push(s); s = rk(...s, dt); } }
        const steps = Math.round(T / h), traj = {};
        for (const m of ["euler", "symp", "rk4"]) {
          let x = x0, v = 0; const P = [[x, v]];
          for (let n = 0; n < steps; n++) {
            if (m === "euler") { const a = acc(x); x = x + h * v; v = v + h * a; }
            else if (m === "symp") { v = v + h * acc(x); x = x + h * v; }
            else [x, v] = rk(x, v, h);
            P.push([x, v]); if (Math.abs(x) > 50) break;
          }
          traj[m] = P;
        }
        const { ctx, w, h: H } = canvas(cv, 250), sc = H / (2 * (x0 + .9)), cx = w / 2, cy = H / 2, Q = ([x, v]) => [cx + x * sc, cy - v * sc];
        ctx.strokeStyle = "rgba(255,255,255,.1)"; ctx.beginPath(); ctx.moveTo(0, cy); ctx.lineTo(w, cy); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();
        ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1.2; ctx.beginPath(); ref.forEach((p, i) => i ? ctx.lineTo(...Q(p)) : ctx.moveTo(...Q(p))); ctx.stroke(); ctx.setLineDash([]);
        const col = { euler: C.red, symp: C.teal, rk4: C.gold };
        for (const m in traj) if (on[m]) { ctx.strokeStyle = col[m]; ctx.lineWidth = m === "rk4" ? 1.2 : 1.4; ctx.beginPath(); traj[m].forEach((p, i) => i ? ctx.lineTo(...Q(p)) : ctx.moveTo(...Q(p))); ctx.stroke(); }
        const E0 = E(x0, 0), row = m => { const P = traj[m], last = P[P.length - 1]; return `${m === "euler" ? "Euler           " : m === "symp" ? "symplectic Euler" : "RK4             "}  energy ×${fx(E(...last) / E0, 4)}`; };
        out.innerHTML = `${steps} steps of h = ${h.toFixed(3)} over five periods (period ${fx(Tper, 3)}${sys === "pend" ? ", vs 2π = 6.283 for small swings" : ""})\n` +
          `<span class="r">${row("euler")}</span>${sys === "spring" ? `   (1 + h²)^${steps} = ${fx(Math.pow(1 + h * h, steps), 4)}` : ""}\n<span class="t">${row("symp")}</span>\n<span class="g">${row("rk4")}</span>`;
      }
      root.querySelectorAll(".od-sys .gk-chip").forEach(b => b.addEventListener("click", () => { sys = b.dataset.s; root.querySelectorAll(".od-sys .gk-chip").forEach(x => x.classList.toggle("on", x === b)); run(); }));
      root.querySelectorAll(".od-m .gk-chip").forEach(b => b.addEventListener("click", () => { on[b.dataset.m] = !on[b.dataset.m]; b.classList.toggle("on", on[b.dataset.m]); run(); }));
      hI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1671–1768 — equations of motion", who: "Isaac Newton 1671, Principia 1687 · the Bernoullis · Leonhard Euler 1743, 1768",
      lead: "Newton's second law turned physics into differential equations.",
      formula: "m x″ = F(x, x′, t)",
      what: "An ordinary differential equation relates an unknown function of one variable to its derivatives. The Bernoullis and Euler solved whole classes by formula; Euler (1743) solved linear equations with constant coefficients by trying x = e^(λt), which reduces them to a polynomial — the characteristic equation.",
      how: "When formulas fail, step. Euler's method (1768) follows the tangent line for a small time h, recomputes the slope, and repeats. Its error over a fixed time is proportional to h.",
      story: "Newton's Method of Fluxions (written 1671, published 1736) classified 'fluxional equations' and solved them by infinite series. Euler's method appears in his Institutionum calculi integralis (1768–70).",
      today: "Every simulation — weather, orbits, epidemics, electronic circuits, neural ODEs — is a numerical ODE solver at heart." },
    { icon: "⚙️", title: "1820–1894 — existence and uniqueness", who: "Cauchy 1820s · Rudolf Lipschitz 1868 · Giuseppe Peano 1886 · Émile Picard 1890 · Ernst Lindelöf 1894",
      lead: "Before computing a solution, make sure there is exactly one.",
      formula: "|f(t, x) − f(t, y)| ≤ L|x − y|   ⇒   x′ = f(t, x), x(0) = x₀ has exactly one solution near t = 0",
      what: "The Picard–Lindelöf theorem: if f is Lipschitz, the initial value problem has a unique solution for a while. Without that condition uniqueness can fail — x′ = √|x| with x(0) = 0 is solved both by x ≡ 0 and by x = t²/4. Peano showed that continuity alone still gives existence.",
      how: "Picard iteration: start from the constant x₀ and repeatedly apply x ↦ x₀ + ∫ f(s, x(s)) ds. For short times this map is a contraction, so the iterates converge — the Banach fixed-point theorem at work.",
      story: "Cauchy proved existence in lectures in the 1820s using the Euler polygons, Lipschitz found his condition in 1868, and Picard introduced the iteration in 1890.",
      today: "Uniqueness is determinism: it is why a state determines its future, and why trajectories in phase space never cross." },
    { icon: "🏛", title: "1881–1901 — Poincaré's qualitative revolution, and Lyapunov", who: "Henri Poincaré 1881–86 · Aleksandr Lyapunov 1892 · Ivar Bendixson 1901",
      lead: "If you can't solve it, draw it: the shape of all solutions at once.",
      formula: "V > 0 and dV/dt < 0 along solutions   ⇒   the equilibrium is stable",
      what: "Poincaré's memoirs on curves defined by differential equations (1881–86) studied the phase portrait: equilibria and their types (saddle, node, focus, centre), periodic orbits and limit cycles. Lyapunov (1892) proved stability without solving: find an 'energy' that always decreases.",
      how: "In the plane, the Poincaré–Bendixson theorem says a bounded trajectory that stays away from equilibria approaches a periodic orbit — so two-dimensional flows can't be chaotic. Chaos needs three dimensions.",
      story: "Lyapunov's 1892 thesis, written in Russian, was translated into French in 1907 and remained little known in the West until control engineers needed it in the 1940s.",
      today: "Lyapunov functions certify the stability of aircraft controllers, power grids and robot motion; the phase-portraits atom lets you explore planar flows." },
    { icon: "🔥", title: "1895–today — Runge–Kutta and geometric integration", who: "Carl Runge 1895 · Martin Kutta 1901 · Carl Størmer 1907 · Loup Verlet 1967 · Ronald Ruth 1983",
      lead: "Better steps — and steps that respect the physics.",
      formula: "x ← x + h(k₁ + 2k₂ + 2k₃ + k₄)/6",
      what: "Runge–Kutta methods sample the slope several times within each step. Classical RK4 has error proportional to h⁴: halve the step and the error drops sixteen-fold. Symplectic methods such as symplectic Euler and leapfrog (Verlet) preserve the geometry of Hamiltonian mechanics, so energy errors stay bounded instead of drifting.",
      how: "In the lab, RK4 stays on the exact orbit to the eye, but over millions of steps even it drifts slowly; symplectic Euler is far less accurate per step yet never drifts. For long simulations, structure beats accuracy.",
      story: "Størmer used the leapfrog scheme in 1907 to trace charged particles in the aurora; Verlet rediscovered it in 1967 for molecular dynamics. Ruth (1983) and others built the theory of symplectic integrators.",
      today: "Solar-system integrations over billions of years (Laskar) and molecular dynamics of proteins use symplectic integrators; adaptive Runge–Kutta (Dormand–Prince, 1980) is the default ODE solver in MATLAB and SciPy." }
  ],
  challenges: [
    "With h = 0.1, how much energy has Euler's method gained after five periods? Predict it from (1 + h²) per step before looking.",
    "Switch to the big-swing pendulum. Why is its period longer than the spring's, and why is its orbit not an ellipse?",
    "Halve h. By roughly what factor does each method's energy error change? Which one is order 1, which order 4?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "Steven Strogatz — Nonlinear Dynamics and Chaos", note: "Phase portraits, bifurcations and chaos, with applications.", url: null },
    { type: "COURSE", title: "MIT 18.03 — Differential Equations", note: "Arthur Mattuck's lectures, with the mathlets.", url: "https://ocw.mit.edu/courses/18-03-differential-equations-spring-2010/" },
    { type: "MONOGRAPH", title: "Hairer, Lubich & Wanner — Geometric Numerical Integration", note: "Why symplectic methods conserve energy so well.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Aleksandr Lyapunov", note: "Stability without solving.", url: MT("Lyapunov") }
  ]
});

/* ================================================================ PDEs */
register("pdes", {
  kicker: "FIELDS THAT CHANGE · ABOUT 25 MIN",
  hook: "Why does heat smooth everything out, while a plucked string keeps its sharp corner?",
  intro: "Partial differential equations govern quantities spread through space: temperature, pressure, electric potential, the height of a vibrating string. The three classical types behave completely differently — diffusion smooths, waves carry shapes at finite speed, and equilibria are as smooth as can be. The lab runs the heat and wave equations on a rod, and shows what happens when a numerical scheme takes too big a step.",
  timeline: [[1747, "d'Alembert: the wave equation"], [1782, "Laplace's equation"], [1807, "Fourier: the heat equation"], [1828, "Green's functions"], [1928, "Courant–Friedrichs–Lewy"], [1957, "De Giorgi & Nash"]],
  labs: [{
    kicker: "COURANT–FRIEDRICHS–LEWY 1928", title: "Heat and waves on a rod — and the stability limit",
    intro: "The rod is cut into 60 cells with its ends held at 0. Each frame advances the explicit finite-difference scheme. The strip below builds a space–time picture (time runs down). Push the step ratio past its limit and watch.",
    html: `<div class="gk-chips pd-eq"><button class="gk-chip on" data-e="heat">heat u_t = u_xx</button><button class="gk-chip" data-e="wave">wave u_tt = u_xx</button></div>
      <div class="gk-chips pd-ic">${[["step", "hot half"], ["spike", "spike"], ["pluck", "pluck"], ["modes", "two sine modes"]].map(([k, l], i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-i="${k}">${l}</button>`).join("")}</div>
      <div class="it-control"><label><span class="pd-lab">r = Δt/Δx²</span><output data-o="r">0.40</output></label><input type="range" data-i="r" min="0.05" max="1.2" step="0.01" value="0.4"></div>
      <div class="it-lab-actions"><button class="it-send pd-play">▶ run</button><button class="gk-ghost pd-reset">reset</button></div>
      <canvas class="gk-canvas pd-cv"></canvas>
      <div class="gk-out pd-out"></div>`,
    caveat: "Heat: stable exactly when r ≤ ½; above that the fastest zig-zag mode is multiplied by |1 − 4r| > 1 at every step. Wave: stable exactly when the Courant number c = Δt/Δx ≤ 1 — the numerical scheme must 'see' at least as far as the true waves travel in one step.",
    init(root) {
      const N = 60; let eq = "heat", ic = "step", u, uOld, n = 0, stop = null, rows = [];
      const rI = root.querySelector("[data-i=r]"), out = root.querySelector(".pd-out"), cv = root.querySelector(".pd-cv"), play = root.querySelector(".pd-play");
      const init0 = () => Array.from({ length: N + 1 }, (_, i) => { const x = i / N;
        if (i === 0 || i === N) return 0;
        return ic === "step" ? (x < .5 ? 1 : 0) : ic === "spike" ? (i === N / 2 ? 1 : 0) : ic === "pluck" ? (x < .3 ? x / .3 : (1 - x) / .7) : .7 * Math.sin(Math.PI * x) + .3 * Math.sin(5 * Math.PI * x); });
      const reset = () => { u = init0(); uOld = u.slice(); n = 0; rows = [u.slice()]; draw(); };
      function step() {
        const r = +rI.value, nu = u.slice();
        if (eq === "heat") for (let i = 1; i < N; i++) nu[i] = u[i] + r * (u[i + 1] - 2 * u[i] + u[i - 1]);
        else { const c2 = r * r; for (let i = 1; i < N; i++) nu[i] = 2 * u[i] - uOld[i] + c2 * (u[i + 1] - 2 * u[i] + u[i - 1]); uOld = u; }
        nu[0] = nu[N] = 0; u = nu.map(v => Math.max(-1e6, Math.min(1e6, v))); n++;
        if (n % 2 === 0) { rows.push(u.slice()); if (rows.length > 90) rows.shift(); }
      }
      function draw() {
        const r = +rI.value, lim = eq === "heat" ? .5 : 1;
        root.querySelector("[data-o=r]").textContent = r.toFixed(2);
        root.querySelector(".pd-lab").textContent = eq === "heat" ? "r = Δt/Δx²  (stable ≤ 0.5)" : "c = Δt/Δx  (stable ≤ 1)";
        const { ctx, w, h } = canvas(cv, 260), top = 150, X = i => 8 + (w - 16) * i / N, Y = v => 75 - Math.max(-1.6, Math.min(1.6, v)) * 55;
        ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.beginPath(); ctx.moveTo(0, Y(0)); ctx.lineTo(w, Y(0)); ctx.stroke();
        ctx.strokeStyle = r > lim ? C.red : C.gold; ctx.lineWidth = 2; ctx.beginPath(); u.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))); ctx.stroke();
        const rh = (h - top - 4) / 90;
        rows.forEach((row, j) => row.forEach((v, i) => { if (i === N) return; const c = Math.max(-1, Math.min(1, v));
          ctx.fillStyle = c >= 0 ? `rgba(245,196,81,${c})` : `rgba(122,168,255,${-c})`; ctx.fillRect(X(i), top + j * rh, (w - 16) / N + .5, rh + .5); }));
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("u(x) now", 10, 14); ctx.fillText("space–time: gold > 0, blue < 0, time ↓", 10, top - 4);
        const mx = Math.max(...u.map(Math.abs)), heat = u.reduce((s, v) => s + v, 0) / N;
        out.innerHTML = `step ${n}   max |u| = ${mx > 999 ? mx.toExponential(1) : fx(mx, 4)}${eq === "heat" ? `   total heat ${fx(heat, 4)}` : ""}\n` +
          (r <= lim ? `<span class="t">${eq === "heat" ? "r" : "c"} = ${r.toFixed(2)} ≤ ${lim}: stable.</span>` :
            `<span class="r">${eq === "heat" ? "r" : "c"} = ${r.toFixed(2)} > ${lim}: UNSTABLE</span> — ${eq === "heat" ? `the zig-zag mode grows by ×${fx(Math.abs(1 - 4 * r), 2)} per step.` : "the scheme can't see as far as the waves travel."}`);
      }
      play.addEventListener("click", () => {
        if (stop) { stop(); stop = null; play.textContent = "▶ run"; return; }
        play.textContent = "❚❚ pause"; stop = loop(root, () => { for (let k = 0; k < (eq === "heat" ? 3 : 1); k++) step(); draw(); });
      });
      root.querySelector(".pd-reset").addEventListener("click", reset);
      root.querySelectorAll(".pd-eq .gk-chip").forEach(b => b.addEventListener("click", () => { eq = b.dataset.e; root.querySelectorAll(".pd-eq .gk-chip").forEach(x => x.classList.toggle("on", x === b)); rI.value = eq === "heat" ? .4 : .9; reset(); }));
      root.querySelectorAll(".pd-ic .gk-chip").forEach(b => b.addEventListener("click", () => { ic = b.dataset.i; root.querySelectorAll(".pd-ic .gk-chip").forEach(x => x.classList.toggle("on", x === b)); reset(); }));
      rI.addEventListener("input", draw); reset();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1747–1807 — three equations, three behaviours", who: "Jean d'Alembert 1747 · Euler · Pierre-Simon Laplace 1782 · Joseph Fourier 1807",
      lead: "The wave, heat and Laplace equations are the prototypes of all linear PDEs.",
      formula: "u_tt = u_xx  (hyperbolic)      u_t = u_xx  (parabolic)      u_xx + u_yy = 0  (elliptic)",
      what: "D'Alembert (1747) solved the vibrating string: u = F(x + t) + G(x − t), two shapes travelling in opposite directions without changing — so a corner in the initial pluck is carried along for ever. Fourier's heat equation smooths any starting profile instantly. Laplace's equation describes gravitational and electric potential in empty space and steady temperatures.",
      how: "The names come from the conics: the sign of a discriminant sorts second-order equations into hyperbolic, parabolic and elliptic, and the type predicts behaviour — finite-speed propagation, smoothing, or equilibrium.",
      story: "D'Alembert, Euler and Daniel Bernoulli argued for decades about which 'functions' could be the initial shape of a string. The dispute forced mathematicians to decide what a function is.",
      today: "These three equations and their nonlinear relatives model acoustics, heat flow, electrostatics, groundwater and option prices: the Black–Scholes equation is a heat equation in disguise." },
    { icon: "⚙️", title: "1828–1850 — Green's functions and potentials", who: "George Green 1828 · Gauss 1839 · Lord Kelvin 1845",
      lead: "Solve for a single point source once; every other solution is a superposition.",
      formula: "u(x) = ∫ G(x, y) f(y) dy,   where  ΔG = δ",
      what: "A Green's function is the response to a unit point source. Once it is known, the solution for any source is an integral of it — the PDE analogue of inverting a matrix. For Laplace's equation in space, G = −1/(4π|x − y|): the potential of Newton and Coulomb.",
      how: "Green's identities relate integrals over a region to integrals over its boundary, turning boundary-value problems into integral equations — the road that led to functional analysis.",
      story: "Green was a self-taught miller from Nottingham. He published his Essay on the Application of Mathematical Analysis to the Theories of Electricity and Magnetism (1828) privately, for 51 subscribers, and entered Cambridge as an undergraduate at 40. Kelvin rediscovered the Essay in 1845 and had it reprinted.",
      today: "Green's functions — 'propagators' — are the basic tool of quantum field theory, and boundary element methods compute with them in engineering." },
    { icon: "🏛", title: "1928 — the CFL condition", who: "Richard Courant, Kurt Friedrichs & Hans Lewy 1928 · John von Neumann 1940s · Crank & Nicolson 1947",
      lead: "A numerical scheme must be able to see as far as the equation does.",
      formula: "heat: Δt/Δx² ≤ ½      wave: Δt/Δx ≤ 1",
      what: "Courant, Friedrichs and Lewy showed that an explicit scheme for the wave equation can converge only if its numerical domain of dependence contains the true one: the Courant number must be at most 1. For the explicit heat scheme the limit is r ≤ ½; beyond it the highest-frequency mode is amplified at every step and explodes (the lab).",
      how: "Von Neumann's stability analysis feeds the scheme a single Fourier mode and computes its amplification factor per step; the scheme is stable if no mode grows.",
      story: "The CFL paper was pure mathematics — difference equations used to prove that solutions exist. After the war, with electronic computers, it became the first rule of computational physics.",
      today: "Weather models, fluid dynamics codes and seismic simulations all choose their time steps by a CFL condition; implicit schemes such as Crank–Nicolson avoid the limit at the cost of solving a linear system every step." },
    { icon: "🔥", title: "1934–today — weak solutions and regularity", who: "Jean Leray 1934 · Sergei Sobolev 1936 · Ennio De Giorgi 1957 · John Nash 1958",
      lead: "First find a solution in a very weak sense; then prove it was smooth all along — or discover it isn't.",
      formula: "∫ ∇u · ∇φ = ∫ f φ   for every smooth test function φ",
      what: "A weak solution satisfies the equation only after integration against test functions, so it needs fewer derivatives; existence then follows from functional analysis. Regularity theory shows that weak solutions are genuinely smooth. De Giorgi (1957) and Nash (1958) independently solved Hilbert's 19th problem this way.",
      how: "Leray (1934) built weak solutions of the Navier–Stokes equations of fluid flow that exist for all time. Whether smooth solutions in three dimensions stay smooth is one of the Clay Millennium Prize problems.",
      story: "Nash learned of De Giorgi's proof only after finishing his own; the coincidence is often said to have cost him a Fields Medal. He received the Abel Prize for this work, with Louis Nirenberg, in 2015.",
      today: "Blow-up versus regularity drives research on the Euler and Navier–Stokes equations; in 2022 Jiajie Chen and Thomas Hou gave a computer-assisted proof of blow-up for the 3D axisymmetric Euler equations in a cylinder with a boundary." }
  ],
  challenges: [
    "Heat with a spike: set r = 0.55 and run. Which shape appears first as it goes unstable, and why that one?",
    "Wave with the pluck: why does the corner never smooth out, when the heat equation removes it at once?",
    "Heat with the hot half and cold ends: does the total heat stay constant? Where does it go?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "Walter Strauss — Partial Differential Equations: An Introduction", note: "The three classical equations, carefully.", url: null },
    { type: "TEXTBOOK", title: "Lawrence C. Evans — Partial Differential Equations", note: "The standard graduate text, from Sobolev spaces to regularity.", url: null },
    { type: "FOUNDATIONAL PAPER · 1928", title: "Courant, Friedrichs & Lewy — On the partial difference equations of mathematical physics", note: "English translation, IBM Journal (1967).", url: "https://doi.org/10.1147/rd.112.0215" },
    { type: "BIOGRAPHY", title: "MacTutor — George Green", note: "The miller of Nottingham.", url: MT("Green") }
  ]
});

/* ================================================================ CALCULUS OF VARIATIONS */
register("variations", {
  kicker: "NATURE'S ECONOMY · ABOUT 25 MIN",
  hook: "Why does light bend as it enters water — and how does it 'know' the quickest path?",
  intro: "The calculus of variations looks for the best function rather than the best number: the fastest slide, the shortest path on a surface, the shape of a soap film. It began with Fermat's principle that light takes the quickest route and with Johann Bernoulli's brachistochrone challenge of 1696; Euler and Lagrange turned it into the method behind all of modern physics. The lab lets you move a light ray and find Snell's law as a minimum.",
  timeline: [[1662, "Fermat: least time"], [1696, "Bernoulli: brachistochrone"], [1744, "Euler: Methodus inveniendi"], [1755, "Lagrange: the δ-method"], [1834, "Hamilton's principle"], [1918, "Noether's theorem"]],
  labs: [{
    kicker: "FERMAT 1662 · SNELL'S LAW", title: "The path of least time",
    intro: "Light goes from A (in air) to B (in a slower medium). Drag the slider to choose where it crosses the surface; the small graph shows the travel time for every crossing point. At the minimum, the two ratios sin θ / v agree — Snell's law.",
    html: `<div class="it-control"><label><span>speed in the lower medium v₂ (v₁ = 1)</span><output data-o="v">0.75</output></label><input type="range" data-i="v" min="0.3" max="1.6" step="0.01" value="0.75"></div>
      <div class="it-control"><label><span>crossing point x</span><output data-o="x">1.00</output></label><input type="range" data-i="x" min="0" max="2" step="0.001" value="1"></div>
      <div class="it-lab-actions"><button class="it-send sn-min">find the quickest path</button></div>
      <canvas class="gk-canvas sn-cv"></canvas>
      <div class="gk-out sn-out"></div>`,
    caveat: "dT/dx = sin θ₁/v₁ − sin θ₂/v₂, so the time is stationary exactly when Snell's law holds; light bends towards the normal when it slows down. The refractive index is n = c/v, so water (v ≈ 0.75c) has n ≈ 1.33.",
    init(root) {
      const vI = root.querySelector("[data-i=v]"), xI = root.querySelector("[data-i=x]"), out = root.querySelector(".sn-out"), cv = root.querySelector(".sn-cv");
      const A = [0, 1], B = [2, -1];
      const T = (x, v2) => Math.hypot(x - A[0], A[1]) + Math.hypot(B[0] - x, B[1]) / v2;
      let stop = null;
      function draw() {
        const v2 = +vI.value, x = +xI.value; root.querySelector("[data-o=v]").textContent = v2.toFixed(2); root.querySelector("[data-o=x]").textContent = x.toFixed(2);
        const { ctx, w, h } = canvas(cv, 260), gw = Math.min(150, w * .38), sc = Math.min((w - gw - 30) / 2.4, (h - 20) / 2.4), ox = 16 + .2 * sc, oy = h / 2, P = ([a, b]) => [ox + a * sc, oy - b * sc];
        ctx.fillStyle = `rgba(122,168,255,${.05 + .12 / v2})`; ctx.fillRect(0, oy, w - gw - 10, h - oy);
        ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w - gw - 10, oy); ctx.stroke();
        const Xp = [x, 0];
        ctx.setLineDash([3, 4]); ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.moveTo(...P([x, 1.1])); ctx.lineTo(...P([x, -1.1])); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = C.gold; ctx.lineWidth = 2.2; ctx.beginPath(); ctx.moveTo(...P(A)); ctx.lineTo(...P(Xp)); ctx.lineTo(...P(B)); ctx.stroke();
        [A, B].forEach((p, i) => { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(...P(p), 4, 0, 7); ctx.fill(); ctx.font = "11px IBM Plex Mono"; ctx.fillText(i ? "B" : "A", P(p)[0] + 6, P(p)[1] + 4); });
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("v₁ = 1", 6, 14); ctx.fillText("v₂ = " + v2.toFixed(2), 6, h - 8);
        // time graph
        const gx = w - gw - 4, gy = 20, gh = h - 50; let lo = 1e9, hi = -1e9, best = 0; for (let k = 0; k <= 200; k++) { const t = T(2 * k / 200, v2); if (t < lo) { lo = t; best = 2 * k / 200; } hi = Math.max(hi, t); }
        const GX = s => gx + gw * s / 2, GY = t => gy + gh - gh * (t - lo) / (hi - lo || 1);
        ctx.strokeStyle = "rgba(255,255,255,.15)"; ctx.strokeRect(gx, gy, gw, gh);
        ctx.strokeStyle = C.teal; ctx.lineWidth = 1.5; ctx.beginPath(); for (let k = 0; k <= 200; k++) { const s = 2 * k / 200; k ? ctx.lineTo(GX(s), GY(T(s, v2))) : ctx.moveTo(GX(s), GY(T(s, v2))); } ctx.stroke();
        ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(GX(x), GY(T(x, v2)), 4, 0, 7); ctx.fill();
        ctx.fillStyle = "#9a93b8"; ctx.fillText("time T(x)", gx + 4, gy - 6); ctx.fillText("x →", gx + gw - 26, gy + gh + 12);
        const s1 = (x - A[0]) / Math.hypot(x - A[0], A[1]), s2 = (B[0] - x) / Math.hypot(B[0] - x, B[1]);
        const ok = Math.abs(s1 - s2 / v2) < .003;
        out.innerHTML = `T(x) = ${fx(T(x, v2), 5)}    shortest possible ≈ ${fx(lo, 5)}\n` +
          `sin θ₁ / v₁ = ${fx(s1, 3)}    sin θ₂ / v₂ = ${fx(s2 / v2, 3)}\n` +
          (ok ? `<span class="t">equal — this is the quickest path, and Snell's law holds (n = v₁/v₂ = ${fx(1 / v2, 3)}).</span>` : `<span class="d">not yet equal: move towards x ≈ ${best.toFixed(2)}, or press the button.</span>`) +
          `\nangles: θ₁ = ${fx(Math.asin(s1) * 180 / Math.PI, 1)}°, θ₂ = ${fx(Math.asin(s2) * 180 / Math.PI, 1)}°`;
      }
      root.querySelector(".sn-min").addEventListener("click", () => {
        if (stop) stop();
        stop = loop(root, () => { const v2 = +vI.value, x = +xI.value, d = (T(x + 1e-4, v2) - T(x - 1e-4, v2)) / 2e-4; const nx = Math.max(0, Math.min(2, x - .25 * d)); xI.value = nx; draw(); if (Math.abs(d) < 1e-4) return false; });
      });
      vI.addEventListener("input", draw); xI.addEventListener("input", draw); draw();
    }
  }],
  chapters: [
    { icon: "🏛", title: "984–1662 — the principle of least time", who: "Hero of Alexandria · Ibn Sahl 984 · Willebrord Snell 1621 · René Descartes 1637 · Pierre de Fermat 1662",
      lead: "Light travels between two points along the path that takes the least time.",
      formula: "sin θ₁ / v₁ = sin θ₂ / v₂",
      what: "Hero of Alexandria showed that a reflected ray takes the shortest path via the mirror. Fermat (1662) went further: light takes the quickest path, and because it is slower in water it bends so as to spend less of its journey there. Minimising the time gives exactly the law of refraction (the lab).",
      how: "The travel time T(x) depends on one number, the crossing point, so ordinary calculus finds its minimum. The variational leap comes when the unknown is a whole curve rather than a point.",
      story: "Ibn Sahl stated the law of refraction in Baghdad in 984; Snell found it again by experiment (1621, unpublished) and Descartes derived it (1637) assuming light moves faster in water. Fermat assumed slower and was right, as Foucault's measurements confirmed in 1850.",
      today: "Fermat's principle is the ancestor of the principle of stationary action; ray tracing in optics design and graphics still uses it." },
    { icon: "⚙️", title: "1696–1744 — the brachistochrone and Euler's method", who: "Johann Bernoulli 1696 · Jakob Bernoulli, Leibniz, Newton, l'Hôpital · Leonhard Euler 1744",
      lead: "Find the curve of fastest descent — a problem with infinitely many unknowns.",
      formula: "d/dx (∂L/∂y′) − ∂L/∂y = 0      (the Euler–Lagrange equation)",
      what: "In June 1696 Johann Bernoulli challenged the mathematicians of Europe to find the curve along which a bead slides fastest between two points. The answer is a cycloid. He solved it with Fermat's principle, treating the bead like light passing through layers where its speed changes. Euler's Methodus inveniendi (1744) turned such problems into a general method: the best curve must satisfy a differential equation.",
      how: "Euler replaced the curve by many points, optimised over them, and let the number of points grow without bound.",
      story: "Newton received the problem on 29 January 1697, solved it before going to bed, and sent the solution anonymously; Bernoulli recognised the author 'as the lion by his claw'.",
      today: "The brachistochrone atom races beads down competing curves; the Euler–Lagrange equation is how every Lagrangian in physics becomes equations of motion." },
    { icon: "🏛", title: "1755–1788 — Lagrange: variations and multipliers", who: "Joseph-Louis Lagrange 1755 · Euler 1766 · Mécanique analytique 1788",
      lead: "A 19-year-old found the calculus that made mechanics pure analysis.",
      formula: "δ ∫ L dt = 0,   L = T − V      with a constraint:  ∇f = λ ∇g",
      what: "Lagrange's δ-method varies the whole curve at once and derives the Euler–Lagrange equation without Euler's discretisation. Euler adopted it and named the subject the 'calculus of variations' (1766). Lagrange multipliers handle constraints: a fixed perimeter (the isoperimetric problem) or a particle confined to a surface.",
      how: "The Mécanique analytique (1788) derived all of mechanics from a single principle with no diagrams; Lagrange announced in the preface that no figures would be found in the work.",
      story: "Lagrange sent his method to Euler in August 1755, aged 19. Euler is said to have held back his own related work so the young man could take the credit.",
      today: "Lagrange multipliers run modern optimisation: shadow prices in economics, support vector machines in machine learning, constrained engineering design." },
    { icon: "🔥", title: "1834–today — action, symmetry and soap films", who: "William Rowan Hamilton 1834 · Joseph Plateau 1873 · Emmy Noether 1918 · Jesse Douglas & Tibor Radó 1930–31",
      lead: "Physics as a single principle: the actual history makes the action stationary.",
      formula: "S = ∫ (T − V) dt,   δS = 0;   continuous symmetry ⇒ conserved quantity",
      what: "Hamilton's principle (1834): a mechanical system follows the path that makes the action stationary. Noether's theorem (1918) links every continuous symmetry of the action to a conserved quantity. Plateau's problem — does every closed wire bound a soap film of least area? — was solved by Douglas and Radó (1930–31); Douglas received one of the first two Fields Medals (1936).",
      how: "The direct method (Hilbert, Tonelli): prove a minimiser exists by compactness and lower semicontinuity, then use the Euler–Lagrange equation to study it — the modern pattern for nonlinear PDEs.",
      story: "Plateau, who had lost his sight, carried out his soap-film experiments with the help of family and colleagues and published his laws of soap films in 1873.",
      today: "Feynman's path integral sums over all paths weighted by e^(iS/ħ); the classical path is where the action is stationary. Optimal transport and optimal control are variational problems at industrial scale." }
  ],
  challenges: [
    "Set v₂ = 0.75 (roughly water) and find the quickest path by hand. Then compare the two ratios sin θ/v.",
    "Make the lower medium faster than the upper (v₂ > 1). Which way does the ray bend now?",
    "Is there a speed for which the quickest path is a straight line? What does the time graph look like then?"
  ],
  sources: [
    { type: "LECTURE", title: "The Feynman Lectures on Physics, Vol. II, ch. 19 — The Principle of Least Action", note: "Feynman's famous lecture, free online.", url: "https://www.feynmanlectures.caltech.edu/II_19.html" },
    { type: "TEXTBOOK", title: "Gelfand & Fomin — Calculus of Variations", note: "The classic short course (Dover).", url: null },
    { type: "BOOK", title: "Paul Nahin — When Least Is Best", note: "Minimum problems from Heron to the brachistochrone, for general readers.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Joseph-Louis Lagrange", note: "From Turin to the Mécanique analytique.", url: MT("Lagrange") }
  ]
});

/* ================================================================ DYNAMICAL SYSTEMS */
register("dynamical-systems", {
  kicker: "CHAOS AND ERGODICITY · ABOUT 25 MIN",
  hook: "How can a completely deterministic rule be unpredictable — and yet, statistically, perfectly predictable?",
  intro: "A dynamical system is a rule that says where each state goes next. Poincaré discovered in 1890 that the three-body problem hides wildly tangled orbits; Lorenz met the same thing in a weather model in 1963. The other face of chaos is ergodic theory: single orbits are unpredictable, but the fraction of time they spend anywhere can be computed exactly. The labs run the logistic map x ↦ rx(1 − x) and show both faces.",
  timeline: [[1890, "Poincaré: three bodies"], [1931, "Birkhoff: ergodic theorem"], [1954, "KAM theory"], [1958, "Kolmogorov–Sinai entropy"], [1963, "Lorenz: the butterfly"], [1978, "Feigenbaum's constant"]],
  labs: [{
    kicker: "LORENZ 1963 · SENSITIVE DEPENDENCE", title: "Two starts, one part in a billion apart",
    intro: "Two orbits of x ↦ 4x(1 − x) start at x₀ and x₀ + ε. Top: both orbits. Bottom: the gap between them on a log scale. The gap doubles on average at every step, until it is as big as the whole interval.",
    html: `<div class="it-control"><label><span>initial gap ε = 10^−k, k</span><output data-o="k">9</output></label><input type="range" data-i="k" min="2" max="15" value="9"></div>
      <div class="it-control"><label><span>start x₀</span><output data-o="x">0.300</output></label><input type="range" data-i="x" min="0.01" max="0.99" step="0.001" value="0.3"></div>
      <canvas class="gk-canvas bf-cv"></canvas>
      <div class="gk-out bf-out"></div>`,
    caveat: "The Lyapunov exponent of this map is ln 2: every step uses up one binary digit of the starting value. Knowing x₀ to 30 digits buys only about 100 steps of prediction. Weather forecasts face the same wall, at about two weeks.",
    init(root) {
      const kI = root.querySelector("[data-i=k]"), xI = root.querySelector("[data-i=x]"), out = root.querySelector(".bf-out"), cv = root.querySelector(".bf-cv");
      function run() {
        const k = +kI.value, x0 = +xI.value, eps = Math.pow(10, -k), N = 70; root.querySelector("[data-o=k]").textContent = k; root.querySelector("[data-o=x]").textContent = x0.toFixed(3);
        const a = [x0], b = [x0 + eps]; for (let n = 0; n < N; n++) { a.push(4 * a[n] * (1 - a[n])); b.push(4 * b[n] * (1 - b[n])); }
        const d = a.map((v, i) => Math.max(1e-17, Math.abs(v - b[i])));
        const { ctx, w, h } = canvas(cv, 260), pad = 26, X = i => pad + (w - pad - 8) * i / N, h1 = 110;
        const Y1 = v => 8 + (h1 - 8) * (1 - v), Y2 = l => h1 + 20 + (h - h1 - 34) * (-l / 17);
        ctx.strokeStyle = "rgba(255,255,255,.1)"; ctx.strokeRect(pad, 8, w - pad - 8, h1 - 8); ctx.strokeRect(pad, h1 + 20, w - pad - 8, h - h1 - 34);
        [[a, C.gold], [b, C.teal]].forEach(([s, c]) => { ctx.strokeStyle = c; ctx.lineWidth = 1.3; ctx.beginPath(); s.forEach((v, i) => i ? ctx.lineTo(X(i), Y1(v)) : ctx.moveTo(X(i), Y1(v))); ctx.stroke(); });
        ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.beginPath(); ctx.moveTo(X(0), Y2(-k)); ctx.lineTo(X(Math.min(N, k / Math.log10(2))), Y2(0)); ctx.stroke(); ctx.setLineDash([]);
        ctx.strokeStyle = C.red; ctx.lineWidth = 1.5; ctx.beginPath(); d.forEach((v, i) => i ? ctx.lineTo(X(i), Y2(Math.log10(v))) : ctx.moveTo(X(i), Y2(Math.log10(v)))); ctx.stroke();
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("xₙ and yₙ", pad + 4, 20); ctx.fillText("log₁₀ |xₙ − yₙ|   (dashed: doubling each step)", pad + 4, h1 + 32);
        ctx.fillText("0", 8, Y2(0) + 4); ctx.fillText("−" + 16, 2, Y2(-16) + 4);
        const sep = d.findIndex(v => v > .1), m = Math.max(1, (sep < 0 ? N : sep) - 1);
        out.innerHTML = `ε = 10^−${k}: the orbits agree to the eye for ${sep < 0 ? "all " + N : sep} steps\n` +
          `prediction: log₂(0.1/ε) = ${fx(Math.log2(.1 / eps), 1)} steps   <span class="d">(one binary digit lost per step)</span>\n` +
          `<span class="g">Lyapunov exponent ≈ ln(gap growth)/steps = ${fx(Math.log(d[m] / d[0]) / m, 3)}</span>   exact: ln 2 = 0.693`;
      }
      kI.addEventListener("input", run); xI.addEventListener("input", run); run();
    }
  }, {
    kicker: "BIRKHOFF 1931 · ERGODIC AVERAGES", title: "Where does one orbit spend its time?",
    intro: "Follow a single orbit for many steps and histogram where it lands. At r = 4 the histogram converges to a fixed curve, the arcsine density 1/(π√(x(1 − x))) — the same for almost every starting point. Change r and the statistics change.",
    html: `<div class="it-control"><label><span>r</span><output data-o="r">4.000</output></label><input type="range" data-i="r" min="3.4" max="4" step="0.001" value="4"></div>
      <div class="gk-chips eg-pre">${[3.5, 3.6, 3.83, 3.9, 4].map(r => `<button class="gk-chip" data-r="${r}">r = ${r}</button>`).join("")}</div>
      <div class="it-control"><label><span>orbit length</span><output data-o="n">100000</output></label><input type="range" data-i="n" min="2" max="6" step="0.1" value="5"></div>
      <canvas class="gk-canvas eg-cv"></canvas>
      <div class="gk-out eg-out"></div>`,
    caveat: "At r = 4, the substitution x = sin²(πθ) turns the map into θ ↦ 2θ mod 1, which doubles the binary digits of θ: coin tossing in disguise. Ulam and von Neumann proposed it as a random-number generator in 1947.",
    init(root) {
      const rI = root.querySelector("[data-i=r]"), nI = root.querySelector("[data-i=n]"), out = root.querySelector(".eg-out"), cv = root.querySelector(".eg-cv");
      function run() {
        const r = +rI.value, N = Math.round(Math.pow(10, +nI.value)); root.querySelector("[data-o=r]").textContent = r.toFixed(3); root.querySelector("[data-o=n]").textContent = N.toLocaleString();
        root.querySelectorAll(".eg-pre .gk-chip").forEach(b => b.classList.toggle("on", Math.abs(+b.dataset.r - r) < 5e-4));
        const B = 100, hist = new Float64Array(B); let x = .2345, mean = 0;
        for (let i = 0; i < 500; i++) x = r * x * (1 - x);
        for (let i = 0; i < N; i++) { x = r * x * (1 - x); hist[Math.min(B - 1, Math.floor(x * B))]++; mean += x; }
        mean /= N;
        const dens = Array.from(hist, v => v / N * B), occupied = dens.filter(v => v > 0).length;
        const { ctx, w, h } = canvas(cv, 200), pad = 10, X = t => pad + (w - 2 * pad) * t, top = Math.min(8, Math.max(3.2, ...dens) * 1.05), Y = v => h - 16 - (h - 30) * Math.min(v, top) / top;
        ctx.fillStyle = "rgba(245,196,81,.7)"; dens.forEach((v, i) => { ctx.fillRect(X(i / B) + .5, Y(v), (w - 2 * pad) / B - 1, h - 16 - Y(v)); });
        if (r > .9995 * 4) { ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); for (let k = 1; k < 400; k++) { const t = k / 400, v = 1 / (Math.PI * Math.sqrt(t * (1 - t))); k > 1 ? ctx.lineTo(X(t), Y(v)) : ctx.moveTo(X(t), Y(v)); } ctx.stroke(); }
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("0", pad, h - 3); ctx.fillText("1", w - pad - 6, h - 3); ctx.fillText("density of visits", pad + 4, 12);
        out.innerHTML = `r = ${r.toFixed(3)}   ${N.toLocaleString()} steps   time-average of x = <span class="g">${fx(mean, 4)}</span>${r > .9995 * 4 ? "   (space average: exactly ½)" : ""}\n` +
          `bins visited: ${occupied} of ${B}` + (occupied <= 16 ? `   <span class="t">a periodic orbit — all its time on ${occupied} point${occupied > 1 ? "s" : ""}.</span>` : r > .9995 * 4 ? `   <span class="t">teal: the arcsine density — time average = space average.</span>` : `   <span class="d">a chaotic band with its own invariant density.</span>`);
      }
      root.querySelectorAll(".eg-pre .gk-chip").forEach(b => b.addEventListener("click", () => { rI.value = b.dataset.r; run(); }));
      rI.addEventListener("input", run); nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1887–1890 — Poincaré and the three-body problem", who: "Henri Poincaré 1890 · King Oscar II's prize 1889 · Edvard Phragmén",
      lead: "The prize-winning memoir contained a mistake — and its correction discovered chaos.",
      formula: "stable and unstable manifolds cross  ⇒  a homoclinic tangle",
      what: "Poincaré studied the restricted three-body problem through a return map on a slice of phase space. He found homoclinic points, where orbits that leave an unstable periodic orbit come back to it; they force an infinitely folded web. He wrote that one is struck by the complexity of this figure, 'which I will not even attempt to draw'.",
      how: "Instead of formulas Poincaré used geometry and topology: return maps, invariant manifolds, and the recurrence theorem — almost every orbit of a volume-preserving system returns arbitrarily close to where it started.",
      story: "Poincaré won King Oscar II's prize in 1889. While the memoir was being printed, Phragmén queried a step; correcting it, Poincaré found chaos. The printed copies were recalled and destroyed at his own expense — more than the prize money — and the corrected memoir appeared in 1890.",
      today: "The same tangles govern the transport of asteroids, low-fuel spacecraft trajectories and mixing in fluids." },
    { icon: "⚙️", title: "1931 — the ergodic theorems", who: "Ludwig Boltzmann 1870s · John von Neumann 1931–32 · George Birkhoff 1931",
      lead: "Time averages equal space averages — for almost every starting point.",
      formula: "(1/N) Σₙ f(Tⁿx)  →  ∫ f dμ   for μ-almost every x",
      what: "Boltzmann hoped that a gas explores all states of the same energy, so long-time averages equal averages over phase space. Birkhoff's pointwise ergodic theorem (1931) proves it for ergodic systems — those that can't be split into two invariant parts of positive measure. For the logistic map at r = 4 the orbit's histogram converges to the arcsine density (lab 2).",
      how: "Von Neumann proved the mean ergodic theorem (convergence in L²) first; Birkhoff, hearing of it, proved the stronger pointwise version and published first, a priority tangle both men cleared up in print.",
      story: "At r = 4 the logistic map is secretly the doubling map θ ↦ 2θ mod 1 — shifting the binary digits of θ — which is why its statistics are those of coin tossing.",
      today: "Ergodic theory proves theorems in number theory: Furstenberg's ergodic proof of Szemerédi's theorem (1977) is one ancestor of Green and Tao's theorem that the primes contain arbitrarily long arithmetic progressions (2004)." },
    { icon: "🏛", title: "1954–1963 — KAM and the butterfly", who: "Andrey Kolmogorov 1954 · Vladimir Arnold 1963 · Jürgen Moser 1962 · Edward Lorenz 1963",
      lead: "Order survives small perturbations; the weather does not.",
      formula: "ẋ = σ(y − x),  ẏ = x(ρ − z) − y,  ż = xy − βz",
      what: "The KAM theorem: in a nearly integrable Hamiltonian system, most quasi-periodic motions survive a small perturbation, on invariant tori — so a planetary system is mostly stable, with chaos confined to thin gaps. Lorenz's three-variable convection model (1963) showed sensitive dependence on initial conditions: nearby states separate exponentially fast (lab 1).",
      how: "The Lyapunov exponent λ is the average exponential rate of separation: errors grow like e^(λn). For the logistic map at r = 4, λ = ln 2.",
      story: "Lorenz restarted a run from printed values rounded to three decimals (0.506 instead of 0.506127); within simulated weeks the weather was completely different. His 1972 talk asked: 'Does the flap of a butterfly's wings in Brazil set off a tornado in Texas?'",
      today: "Forecasters run ensembles of slightly perturbed simulations to measure how fast errors grow; useful weather prediction is limited to roughly two weeks." },
    { icon: "🔥", title: "1958–today — entropy, universality and the frontier", who: "Kolmogorov & Sinai 1958–59 · Stephen Smale 1967 · Mitchell Feigenbaum 1978 · Artur Avila (Fields 2014)",
      lead: "Chaos can be measured, and its routes are universal.",
      formula: "δ = 4.669201609…   (Feigenbaum's constant)",
      what: "Kolmogorov–Sinai entropy (1958–59) measures how much new information each step produces; for the doubling map it is ln 2. Smale's horseshoe (1967) showed the geometric mechanism of chaos: stretch and fold. Feigenbaum (1978) found that period-doubling cascades in every smooth one-hump map shrink by the same ratio δ ≈ 4.669.",
      how: "Feigenbaum found the constant with an HP-65 programmable calculator; Lanford proved the universality in 1982, with computer assistance. Ornstein (1970) showed that entropy completely classifies Bernoulli shifts — coin-tossing systems.",
      story: "Li and Yorke's 1975 paper 'Period three implies chaos' gave the subject its name; Sharkovsky had proved a stronger theorem in 1964 that the West hadn't read.",
      today: "Avila's work on one-dimensional dynamics and quasi-periodic operators won the Fields Medal in 2014; the logistic-map atom draws the Feigenbaum cascade." }
  ],
  challenges: [
    "Lab 1: with ε = 10⁻⁹, after how many steps do the orbits part? Compare with log₂(10⁸) ≈ 27.",
    "Lab 2: at r = 4 the histogram piles up near 0 and 1. Why does the orbit linger at the ends of the interval?",
    "Set r = 3.83. What happened to the histogram — and what does that say about the orbit?"
  ],
  sources: [
    { type: "FILM", title: "Chaos: a mathematical adventure (Ghys, Alvarez & Leys)", note: "Nine free films, from Poincaré to the Lorenz attractor.", url: "https://www.chaos-math.org/" },
    { type: "FOUNDATIONAL PAPER · 1963", title: "Edward Lorenz — Deterministic Nonperiodic Flow", note: "Journal of the Atmospheric Sciences 20.", url: "https://doi.org/10.1175/1520-0469(1963)020%3C0130:DNF%3E2.0.CO;2" },
    { type: "HISTORY", title: "June Barrow-Green — Poincaré and the Three Body Problem", note: "The prize, the error and the recall (AMS, 1997).", url: null },
    { type: "BOOK", title: "James Gleick — Chaos: Making a New Science", note: "The story of the 1960s–80s, for general readers.", url: null }
  ]
});

/* ================================================================ FRACTALS */
const S3_2 = Math.sqrt(3) / 2;
const IFS = {
  sierpinski: { name: "Sierpiński triangle", dim: [3, 2], maps: [[.5, 0, 0, .5, 0, 0], [.5, 0, 0, .5, .5, 0], [.5, 0, 0, .5, .25, S3_2 / 2]] },
  carpet: { name: "Sierpiński carpet", dim: [8, 3], maps: [0, 1, 2, 3, 5, 6, 7, 8].map(k => [1 / 3, 0, 0, 1 / 3, (k % 3) / 3, Math.floor(k / 3) / 3]) },
  vicsek: { name: "Vicsek cross", dim: [5, 3], maps: [1, 3, 4, 5, 7].map(k => [1 / 3, 0, 0, 1 / 3, (k % 3) / 3, Math.floor(k / 3) / 3]) },
  koch: { name: "Koch curve", dim: [4, 3], maps: [[1 / 3, 0, 0, 1 / 3, 0, 0], [1 / 6, -S3_2 / 3, S3_2 / 3, 1 / 6, 1 / 3, 0], [1 / 6, S3_2 / 3, -S3_2 / 3, 1 / 6, .5, S3_2 / 3], [1 / 3, 0, 0, 1 / 3, 2 / 3, 0]] },
  fern: { name: "Barnsley fern", dim: null, maps: [[0, 0, 0, .16, 0, 0], [.85, .04, -.04, .85, 0, 1.6], [.2, -.26, .23, .22, 0, 1.6], [-.15, .28, .26, .24, 0, .44]], p: [.01, .85, .07, .07] }
};
register("fractals", {
  kicker: "ROUGHNESS, MEASURED · ABOUT 25 MIN",
  hook: "Can a shape be 1.585-dimensional?",
  intro: "Fractals have detail at every scale: coastlines, ferns, lungs, the Cantor set. For a century they were 'monsters' built to break theorems; Hausdorff gave them a dimension in 1918, and in the 1970s Mandelbrot, armed with computer graphics, showed that nature is full of them. The lab plays Barnsley's chaos game — random jumps that paint a Sierpiński triangle or a fern — and counts boxes to measure the dimension of what appears.",
  timeline: [[1883, "Cantor set"], [1904, "Koch snowflake"], [1915, "Sierpiński triangle"], [1918, "Hausdorff dimension"], [1967, "Mandelbrot: the coast of Britain"], [1988, "Barnsley: the chaos game"]],
  labs: [{
    kicker: "HUTCHINSON 1981 · BARNSLEY 1988", title: "The chaos game, and counting boxes",
    intro: "Start anywhere. Pick one of the maps at random, apply it, plot the point, repeat. Although every step is random, the picture that emerges is always the same: the unique set made of shrunken copies of itself. Then count how many boxes of side 1/2ᵏ it touches.",
    html: `<div class="gk-chips fr-pre">${Object.entries(IFS).map(([k, v], i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-k="${k}">${v.name}</button>`).join("")}</div>
      <div class="it-lab-actions"><button class="it-send fr-play">❚❚ pause</button><button class="gk-ghost fr-box">count boxes</button></div>
      <canvas class="gk-canvas fr-cv"></canvas>
      <div class="gk-out fr-out"></div>`,
    caveat: "Box counting: if N(ε) boxes of side ε meet the set, the dimension is the slope of log N against log(1/ε). For N copies scaled by r the answer is log N / log(1/r): Sierpiński log 3/log 2 ≈ 1.585, carpet log 8/log 3 ≈ 1.893, Koch log 4/log 3 ≈ 1.262.",
    init(root) {
      let key = "sierpinski", pts = [], stop = null, x = .1, y = .1, bb;
      const cv = root.querySelector(".fr-cv"), out = root.querySelector(".fr-out"), play = root.querySelector(".fr-play");
      const MAX = 60000;
      let cvs;
      function setup() {
        pts = []; x = .1; y = .1; cvs = canvas(cv, 280);
        const I = IFS[key]; // bounding box by a quick burn-in
        let lx = 1e9, hx = -1e9, ly = 1e9, hy = -1e9, a = .1, b = .1;
        for (let i = 0; i < 4000; i++) { const m = pick(I); [a, b] = [m[0] * a + m[1] * b + m[4], m[2] * a + m[3] * b + m[5]]; if (i > 50) { lx = Math.min(lx, a); hx = Math.max(hx, a); ly = Math.min(ly, b); hy = Math.max(hy, b); } }
        bb = { lx, hx, ly, hy, s: Math.min((cvs.w - 20) / (hx - lx || 1), (cvs.h - 20) / (hy - ly || 1)) };
        out.innerHTML = `${I.name}: ${I.maps.length} maps` + (I.dim ? `, each shrinking by 1/${I.dim[1]}   similarity dimension log ${I.dim[0]} / log ${I.dim[1]} = <span class="g">${fx(Math.log(I.dim[0]) / Math.log(I.dim[1]), 4)}</span>` : " (affine, with probabilities 1%, 85%, 7%, 7%)");
      }
      const pick = I => { if (!I.p) return I.maps[Math.floor(Math.random() * I.maps.length)]; let u = Math.random(), k = 0; while (u > I.p[k] && k < I.p.length - 1) { u -= I.p[k]; k++; } return I.maps[k]; };
      function burst(n) {
        const I = IFS[key], { ctx, w, h } = cvs, ox = (w - (bb.hx - bb.lx) * bb.s) / 2, oy = (h - (bb.hy - bb.ly) * bb.s) / 2;
        ctx.fillStyle = key === "fern" ? "rgba(87,224,138,.75)" : "rgba(245,196,81,.75)";
        for (let i = 0; i < n && pts.length < 2 * MAX; i++) {
          const m = pick(I); [x, y] = [m[0] * x + m[1] * y + m[4], m[2] * x + m[3] * y + m[5]];
          pts.push(x, y); ctx.fillRect(ox + (x - bb.lx) * bb.s, h - oy - (y - bb.ly) * bb.s, 1, 1);
        }
      }
      function start() { if (stop) stop(); play.textContent = "❚❚ pause"; stop = loop(root, () => { burst(1500); if (pts.length >= 2 * MAX) { play.textContent = "▶ replay"; stop = null; return false; } }); }
      play.addEventListener("click", () => { if (stop) { stop(); stop = null; play.textContent = "▶ play"; } else { if (pts.length >= 2 * MAX) setup(); start(); } });
      root.querySelector(".fr-box").addEventListener("click", () => {
        const n = pts.length / 2; if (n < 2000) { out.innerHTML += `\n<span class="r">let a few thousand points appear first.</span>`; return; }
        const span = Math.max(bb.hx - bb.lx, bb.hy - bb.ly), rows = [];
        for (let k = 2; k <= 7; k++) { const g = 1 << k, set = new Set(); for (let i = 0; i < pts.length; i += 2) set.add(Math.min(g - 1, Math.floor((pts[i] - bb.lx) / span * g)) * 4096 + Math.min(g - 1, Math.floor((pts[i + 1] - bb.ly) / span * g))); rows.push([k, set.size]); }
        const fit = rows.slice(2), mx = fit.reduce((s, [k]) => s + k, 0) / fit.length, my = fit.reduce((s, [, c]) => s + Math.log2(c), 0) / fit.length;
        const slope = fit.reduce((s, [k, c]) => s + (k - mx) * (Math.log2(c) - my), 0) / fit.reduce((s, [k]) => s + (k - mx) ** 2, 0);
        const I = IFS[key];
        out.innerHTML = `${n.toLocaleString()} points plotted\n` + rows.map(([k, c]) => `ε = 1/${String(1 << k).padEnd(4)} boxes hit N = ${String(c).padStart(5)}   log₂ N = ${fx(Math.log2(c), 2)}`).join("\n") +
          `\n<span class="g">box-counting dimension ≈ ${fx(slope, 3)}</span>   (slope of log N vs log 1/ε, fine scales)` +
          (I.dim ? `\nexact: log ${I.dim[0]} / log ${I.dim[1]} = ${fx(Math.log(I.dim[0]) / Math.log(I.dim[1]), 4)}` : `\nthe fern's dimension has no simple formula; estimates are around 1.7–1.8.`);
      });
      root.querySelectorAll(".fr-pre .gk-chip").forEach(b => b.addEventListener("click", () => { key = b.dataset.k; root.querySelectorAll(".fr-pre .gk-chip").forEach(x => x.classList.toggle("on", x === b)); setup(); start(); }));
      setup(); start();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1872–1916 — the monsters", who: "Karl Weierstrass 1872 · Georg Cantor 1883 · Giuseppe Peano 1890 · Helge von Koch 1904 · Wacław Sierpiński 1915–16",
      lead: "Curves without tangents, curves that fill a square, sets that are pure dust: counterexamples that became a subject.",
      formula: "Koch snowflake: perimeter × 4/3 at each stage → ∞, area → 8/5 of the first triangle",
      what: "Weierstrass's continuous nowhere-differentiable function (1872), Peano's square-filling curve (1890), Koch's snowflake (1904) — a closed curve of infinite length around a finite area — and Sierpiński's triangle and carpet (1915–16) were built to show what analysis permits.",
      how: "All of them are self-similar: made of scaled copies of themselves. That shared structure is exactly what the chaos game exploits.",
      story: "Not everyone was pleased. Hermite wrote to Stieltjes in 1893 that he turned away 'with fright and horror from this lamentable plague of continuous functions which do not have derivatives'.",
      today: "Space-filling curves order data in databases and images; fractal antennas in phones use Koch-like shapes to fit many wavelengths into a small space." },
    { icon: "⚙️", title: "1918 — Hausdorff dimension", who: "Felix Hausdorff 1918 · Abram Besicovitch 1920s–30s",
      lead: "A dimension that can be any non-negative number.",
      formula: "dim = log N / log(1/r)      Sierpiński: log 3 / log 2 ≈ 1.585",
      what: "Hausdorff (1918) defined an s-dimensional measure for every real s ≥ 0: cover the set with small pieces and add up (diameter)ˢ. At one critical value of s the measure jumps from ∞ to 0 — that is the Hausdorff dimension. For a set made of N copies scaled by r, without too much overlap, it equals log N / log(1/r).",
      how: "Box counting is the practical version: count the boxes of side ε that meet the set. N(ε) grows like ε^(−d), and d is the slope in the lab's table.",
      story: "Besicovitch spent decades on the geometry of such sets, including sets of measure zero that contain a unit segment in every direction (1919, 1928) — the Kakeya problem's Besicovitch sets.",
      today: "Dimension estimates describe coastlines, clouds, river networks and fractured surfaces; the Kakeya conjecture is a statement about the Hausdorff dimension of Besicovitch sets." },
    { icon: "🏛", title: "1961–1982 — Mandelbrot and the geometry of nature", who: "Lewis Fry Richardson 1961 · Benoit Mandelbrot 1967, 1975, 1982",
      lead: "Clouds are not spheres, mountains are not cones, coastlines are not circles.",
      formula: "measured length L(ε) ∝ ε^(1 − D);   west coast of Britain D ≈ 1.25",
      what: "Richardson found that the measured length of a coastline grows as the measuring stick shrinks, following a power law. Mandelbrot's 'How long is the coast of Britain?' (Science, 1967) read the exponent as a fractional dimension; he coined the word 'fractal' in 1975 and argued in The Fractal Geometry of Nature (1982) that rough, self-similar shapes are the rule in nature.",
      how: "Statistical self-similarity: a coastline is not literally made of copies of itself, but its small pieces look like its large ones in distribution.",
      story: "The Fractal Geometry of Nature opens: 'Clouds are not spheres, mountains are not cones, coastlines are not circles, and bark is not smooth, nor does lightning travel in a straight line.' Mandelbrot, at IBM, had the computers to make the pictures.",
      today: "Fractal models describe turbulence, price fluctuations (Mandelbrot's cotton prices, 1963), blood vessels and lungs, and generate the landscapes of film and games." },
    { icon: "🔥", title: "1918–today — iterated function systems and dynamics", who: "Pierre Fatou & Gaston Julia 1918–19 · John Hutchinson 1981 · Michael Barnsley 1988 · Mitsuhiro Shishikura 1998",
      lead: "A finite list of contractions determines a unique fractal — and random play draws it.",
      formula: "K = f₁(K) ∪ f₂(K) ∪ ⋯ ∪ f_N(K)",
      what: "Hutchinson (1981) proved that any finite family of contractions has exactly one compact set K made of its own images — its attractor — by applying the Banach fixed-point theorem to the space of shapes. Barnsley's chaos game (1988) draws K by applying randomly chosen maps to a single point (the lab).",
      how: "Fractals also come from dynamics. Julia sets (Fatou and Julia, 1918–19) are where iterating z² + c is chaotic; the Mandelbrot set, first pictured around 1980, catalogues them. Shishikura (1998) proved its boundary has Hausdorff dimension 2.",
      story: "Barnsley's fern needs just four affine maps — 28 numbers with the probabilities. He co-founded a company in the late 1980s to compress images this way.",
      today: "Whether the Mandelbrot set is locally connected (the MLC conjecture) is one of the central open problems of complex dynamics; the Mandelbrot and Julia atom lets you zoom in." }
  ],
  challenges: [
    "Play the Sierpiński triangle, then count boxes. How close is the estimate to log 3 / log 2? Does it improve with more points?",
    "The carpet keeps 8 of 9 sub-squares, the Vicsek cross 5 of 9. Predict both dimensions before counting.",
    "Why doesn't the picture depend on where the first point starts, or on which random choices are made?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "Kenneth Falconer — Fractal Geometry: Mathematical Foundations and Applications", note: "Hausdorff dimension, self-similarity and dynamics.", url: null },
    { type: "PAPER · 1967", title: "Benoit Mandelbrot — How Long Is the Coast of Britain?", note: "Science 156, the paper that started the popular story.", url: "https://doi.org/10.1126/science.156.3775.636" },
    { type: "BOOK", title: "Michael Barnsley — Fractals Everywhere", note: "Iterated function systems and the chaos game.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Felix Hausdorff", note: "Topology, dimension, and a tragic end in 1942.", url: MT("Hausdorff") }
  ]
});
})();
