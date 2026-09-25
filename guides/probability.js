// PROBABILITY — field guides for Probability Spaces, Limit Theorems, Stochastic Processes,
// Statistics & Inference and Random Matrix Theory.
(function () {
"use strict";
const { register, canvas, rng, gauss, C } = GuideKit;
const MT = s => "https://mathshistory.st-andrews.ac.uk/Biographies/" + s + "/";
const chips = (root, sel, cb) => root.querySelectorAll(sel + " .gk-chip").forEach(b => b.addEventListener("click", () => { root.querySelectorAll(sel + " .gk-chip").forEach(x => x.classList.toggle("on", x === b)); cb(b.dataset); }));
function hist(cv, data, bins, lo, hi, curve, h = 200) {
  const { ctx, w } = canvas(cv, h), H = new Array(bins).fill(0);
  data.forEach(x => { const k = Math.floor((x - lo) / (hi - lo) * bins); if (k >= 0 && k < bins) H[k]++; });
  const dens = H.map(c => c / data.length / ((hi - lo) / bins)), top = Math.max(...dens, curve ? Math.max(...Array.from({ length: 100 }, (_, i) => curve(lo + (hi - lo) * i / 99))) : 0) * 1.1 || 1;
  const X = x => 8 + (w - 16) * (x - lo) / (hi - lo), Y = v => h - 14 - (h - 24) * v / top;
  dens.forEach((v, i) => { ctx.fillStyle = "rgba(245,196,81,.7)"; ctx.fillRect(X(lo + (hi - lo) * i / bins) + .5, Y(v), (w - 16) / bins - 1, h - 14 - Y(v)); });
  if (curve) { ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const x = lo + (hi - lo) * i / 200; i ? ctx.lineTo(X(x), Y(curve(x))) : ctx.moveTo(X(x), Y(curve(x))); } ctx.stroke(); }
}

/* ================================================================ PROBABILITY SPACES */
register("prob-spaces", {
  kicker: "CHANCE MADE RIGOROUS · ABOUT 20 MIN",
  hook: "In a room of 23 people, why is a shared birthday more likely than not?",
  intro: "Probability began with gamblers' questions and became mathematics when Kolmogorov (1933) defined it as a measure of total mass 1. Many surprises come from counting correctly. The birthday problem is the classic: with 23 people there are 253 pairs, each a chance for a match. The lab computes it exactly and by simulation.",
  timeline: [[1564, "Cardano: games of chance"], [1654, "Pascal–Fermat letters"], [1718, "de Moivre: independence"], [1812, "Laplace's Théorie analytique"], [1909, "Borel–Cantelli"], [1933, "Kolmogorov's axioms"]],
  labs: [{
    kicker: "VON MISES 1939 · THE BIRTHDAY PROBLEM", title: "When do two people share a birthday?",
    intro: "Exact: P(no match) = (365/365)(364/365)⋯((366 − n)/365). The lab also runs 2,000 simulated rooms.",
    html: `<div class="it-control"><label><span>people n</span><output data-o="n">23</output></label><input type="range" data-i="n" min="2" max="80" value="23"></div>
      <canvas class="gk-canvas bd-cv"></canvas><div class="gk-out bd-out"></div>`,
    caveat: "The key is pairs, not people: n people make n(n − 1)/2 pairs, and P(match) ≈ 1 − e^(−n²/730). The same arithmetic makes hash collisions appear after about √N items — the 'birthday attack' in cryptography.",
    init(root) {
      const nI = root.querySelector("[data-i=n]"), cv = root.querySelector(".bd-cv"), out = root.querySelector(".bd-out"), r = rng(11);
      const exact = n => { let q = 1; for (let k = 0; k < n; k++) q *= (365 - k) / 365; return 1 - q; };
      const run = () => { const n = +nI.value; root.querySelector("[data-o=n]").textContent = n; let hits = 0;
        for (let t = 0; t < 2000; t++) { const s = new Set(); let m = false; for (let i = 0; i < n; i++) { const d = Math.floor(r() * 365); if (s.has(d)) { m = true; break; } s.add(d); } if (m) hits++; }
        const { ctx, w, h } = canvas(cv, 150), X = k => 10 + (w - 20) * (k - 1) / 79, Y = p => h - 12 - (h - 22) * p;
        ctx.strokeStyle = "rgba(255,255,255,.15)"; ctx.beginPath(); ctx.moveTo(10, Y(.5)); ctx.lineTo(w - 10, Y(.5)); ctx.stroke();
        ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); for (let k = 1; k <= 80; k++) k > 1 ? ctx.lineTo(X(k), Y(exact(k))) : ctx.moveTo(X(k), Y(exact(k))); ctx.stroke();
        ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(X(n), Y(hits / 2000), 5, 0, 7); ctx.fill();
        out.innerHTML = `${n} people, ${n * (n - 1) / 2} pairs\n<span class="g">exact P(shared birthday) = ${(100 * exact(n)).toFixed(2)}%</span>\nsimulated in 2,000 rooms: <span class="t">${(100 * hits / 2000).toFixed(1)}%</span>`; };
      nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1654 — Pascal, Fermat and the problem of points", who: "Blaise Pascal & Pierre de Fermat 1654 · Christiaan Huygens 1657",
      lead: "How should the stakes be split when a game is interrupted?",
      formula: "fair share = probability of winning × stake",
      what: "The Chevalier de Méré's questions led Pascal and Fermat to a correspondence (1654) that founded probability: count equally likely outcomes, and divide stakes by the chance each player would have won. Huygens's book (1657) introduced expectation.",
      how: "Pascal used his triangle; Fermat listed all continuations of the game.",
      story: "Cardano had written on dice a century earlier, but his book appeared only in 1663.",
      today: "Expected value prices insurance, bets and financial options." },
    { icon: "⚙️", title: "1718–1909 — independence and 'almost surely'", who: "Abraham de Moivre 1718 · Émile Borel 1909 · Francesco Cantelli 1917",
      lead: "Independent events multiply; infinitely many trials need new ideas.",
      formula: "Σ P(Aₙ) < ∞  ⇒  only finitely many Aₙ occur, almost surely",
      what: "De Moivre's Doctrine of Chances (1718) set out the multiplication rule for independent events. Borel (1909) proved that almost every real number is normal — each digit appears with frequency 1/10 — using the lemma now called Borel–Cantelli.",
      how: "Borel–Cantelli turns 'the probabilities add up to something finite' into 'it happens only finitely often'.",
      story: "Yet no one has proved that √2 or π is normal.",
      today: "'Almost surely' statements underpin the strong law of large numbers and the analysis of randomized algorithms." },
    { icon: "🔥", title: "1933 — Kolmogorov's axioms", who: "Andrey Kolmogorov, Grundbegriffe der Wahrscheinlichkeitsrechnung 1933",
      lead: "Probability is a measure of total mass 1; events are measurable sets.",
      formula: "P(Ω) = 1,  P(A) ≥ 0,  P(∪Aₙ) = Σ P(Aₙ) for disjoint Aₙ",
      what: "Kolmogorov answered Hilbert's sixth problem for probability by basing it on Lebesgue's measure theory. Random variables became measurable functions and expectation became an integral; conditional expectation became a Radon–Nikodym derivative.",
      how: "Infinite sequences of coin tosses, Brownian paths and random fields all fit in the same framework.",
      story: "The Grundbegriffe is only about 60 pages long.",
      today: "Every theorem in probability, statistics and machine learning theory starts from these axioms." }
  ],
  challenges: ["Find the smallest n with P > 50%, and with P > 99%.", "How many people for P > 50% that someone shares YOUR birthday?", "Why is the simulated value never exactly the exact one?"],
  sources: [
    { type: "FREE TEXTBOOK", title: "Grinstead & Snell — Introduction to Probability", note: "Free from the AMS.", url: "https://math.dartmouth.edu/~prob/prob/prob.pdf" },
    { type: "BOOK", title: "William Feller — An Introduction to Probability Theory and Its Applications", note: "The classic.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Andrey Kolmogorov", note: "Axioms, turbulence and complexity.", url: MT("Kolmogorov") }
  ]
});

/* ================================================================ LIMIT THEOREMS */
const DISTS = {
  uniform: { name: "uniform", draw: r => r(), mu: .5, sd: Math.sqrt(1 / 12) },
  exp: { name: "exponential", draw: r => -Math.log(1 - r()), mu: 1, sd: 1 },
  coin: { name: "coin (0/1)", draw: r => r() < .5 ? 1 : 0, mu: .5, sd: .5 },
  skew: { name: "lopsided die", draw: r => r() < .8 ? 1 : 10, mu: 2.8, sd: Math.sqrt(.8 * .2) * 9 }
};
register("limit-theorems", {
  kicker: "ORDER FROM MANY ACCIDENTS · ABOUT 25 MIN",
  hook: "Why does the bell curve appear whatever you start with?",
  intro: "Add up many independent random quantities and two laws take over: the average settles down (the law of large numbers) and the fluctuations around it take the shape of the Gaussian bell curve (the central limit theorem) — whatever the original distribution. The lab averages samples from four very different distributions.",
  timeline: [[1713, "Bernoulli: law of large numbers"], [1733, "de Moivre: the normal curve"], [1810, "Laplace: CLT"], [1901, "Lyapunov: general CLT"], [1922, "Lindeberg's condition"], [1938, "Cramér: large deviations"]],
  labs: [{
    kicker: "DE MOIVRE 1733 · LAPLACE 1810", title: "Averages of any distribution become Gaussian",
    intro: "Draw n values, standardise their sum as (Sₙ − nμ)/(σ√n), repeat 4,000 times, and compare the histogram with the standard bell curve.",
    html: `<div class="gk-chips lt-d">${Object.entries(DISTS).map(([k, d], i) => `<button class="gk-chip${i === 1 ? " on" : ""}" data-k="${k}">${d.name}</button>`).join("")}</div>
      <div class="it-control"><label><span>n (values per sum)</span><output data-o="n">1</output></label><input type="range" data-i="n" min="1" max="100" value="1"></div>
      <canvas class="gk-canvas lt-cv"></canvas><div class="gk-out lt-out"></div>`,
    caveat: "The CLT needs finite variance. For the Cauchy distribution the average of n values is again Cauchy — no settling down at all.",
    init(root) {
      let key = "exp"; const nI = root.querySelector("[data-i=n]"), cv = root.querySelector(".lt-cv"), out = root.querySelector(".lt-out"), r = rng(5);
      const phi = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
      const run = () => { const n = +nI.value, D = DISTS[key]; root.querySelector("[data-o=n]").textContent = n; const Z = [];
        for (let t = 0; t < 4000; t++) { let s = 0; for (let i = 0; i < n; i++) s += D.draw(r); Z.push((s - n * D.mu) / (D.sd * Math.sqrt(n))); }
        hist(cv, Z, 40, -4, 4, phi); const within = Z.filter(z => Math.abs(z) < 1).length / Z.length;
        out.innerHTML = `${D.name}: μ = ${D.mu.toFixed(3)}, σ = ${D.sd.toFixed(3)}, n = ${n}\nfraction within 1σ: <span class="g">${(100 * within).toFixed(1)}%</span>   (bell curve: 68.3%)`; };
      chips(root, ".lt-d", d => { key = d.k; run(); }); nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1713 — Bernoulli's golden theorem", who: "Jakob Bernoulli, Ars Conjectandi 1713 · Chebyshev 1867 · Kolmogorov 1930",
      lead: "Frequencies converge to probabilities.",
      formula: "P(|X̄ₙ − μ| > ε) → 0",
      what: "Bernoulli spent twenty years proving that the proportion of successes in n trials approaches the probability — the weak law of large numbers. Chebyshev's inequality (1867) gave a two-line proof; Kolmogorov's strong law (1930) says the convergence happens almost surely.",
      how: "Var(X̄ₙ) = σ²/n, so the average's spread shrinks like 1/√n.",
      story: "Ars Conjectandi was published eight years after Bernoulli's death by his nephew Nicolaus.",
      today: "Monte Carlo simulation and polling rely on it." },
    { icon: "⚙️", title: "1733–1922 — the central limit theorem", who: "Abraham de Moivre 1733 · Laplace 1810 · Aleksandr Lyapunov 1901 · Jarl Lindeberg 1922",
      lead: "Fluctuations of sums are Gaussian.",
      formula: "(Sₙ − nμ)/(σ√n) → N(0, 1)",
      what: "De Moivre (1733) found the normal curve approximating coin-toss counts; Laplace generalised it (1810); Lyapunov (1901) proved it under mild conditions, and Lindeberg (1922) found the sharp condition. The lab shows it for four distributions.",
      how: "Characteristic functions: the Fourier transform of a sum is the product of transforms, and log of that product tends to −t²/2.",
      story: "Galton's board (1889) was built to show it with falling beads — see the chance-lab atom. Pólya named it 'central' in 1920.",
      today: "Error bars, confidence intervals and the Gaussian noise models of engineering all rest on it." },
    { icon: "🔥", title: "1938–today — large deviations", who: "Harald Cramér 1938 · S. R. S. Varadhan 1966",
      lead: "How unlikely are rare events? Exponentially — at a computable rate.",
      formula: "P(X̄ₙ ≥ a) ≈ e^(−n I(a))",
      what: "Cramér (1938), working for a Swedish insurance company, computed the exponential rate at which averages stray far from the mean. Varadhan (1966) built a general theory.",
      how: "The rate function I is the Legendre transform of the log moment generating function — the same entropy-like quantity as in statistical mechanics.",
      story: "Varadhan received the Abel Prize in 2007 for it.",
      today: "Large deviations estimate the risk of insurance ruin, network overloads and rare molecular transitions." }
  ],
  challenges: ["With the lopsided die, how large must n be before the histogram looks symmetric?", "Why does the coin need large n to look smooth?", "Check the 68% rule at n = 50 for each distribution."],
  sources: [
    { type: "FREE TEXTBOOK", title: "Grinstead & Snell — Introduction to Probability", note: "Chapters 8–9: laws of large numbers and CLT.", url: "https://math.dartmouth.edu/~prob/prob/prob.pdf" },
    { type: "BOOK", title: "Hans Fischer — A History of the Central Limit Theorem", note: "From Laplace to modern probability.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Abraham de Moivre", note: "The normal curve's discoverer.", url: MT("De_Moivre") }
  ]
});

/* ================================================================ STOCHASTIC PROCESSES */
register("stochastic-processes", {
  kicker: "RANDOMNESS IN TIME · ABOUT 25 MIN",
  hook: "If tomorrow's weather depends only on today's, what fraction of days will be sunny in the long run?",
  intro: "A stochastic process is a random quantity evolving in time. Markov (1906) studied chains whose next step depends only on the present; Wiener made Brownian motion rigorous; Itô built a calculus for it. The lab runs a three-state weather chain and shows its long-run behaviour does not depend on where it starts.",
  timeline: [[1900, "Bachelier: Brownian motion in finance"], [1905, "Einstein: Brownian motion"], [1906, "Markov chains"], [1923, "Wiener measure"], [1939, "Ville: martingales"], [1944, "Itô calculus"]],
  labs: [{
    kicker: "MARKOV 1906", title: "A weather chain converges",
    intro: "Sunny, cloudy, rainy with fixed transition probabilities. Watch the fraction of days in each state for one long run, and compare with the stationary distribution π solving π = πP.",
    html: `<div class="gk-chips mk-s"><button class="gk-chip on" data-s="0">start sunny</button><button class="gk-chip" data-s="2">start rainy</button></div>
      <div class="it-control"><label><span>days</span><output data-o="n">1000</output></label><input type="range" data-i="n" min="1" max="4.7" step="0.01" value="3"></div>
      <canvas class="gk-canvas mk-cv"></canvas><div class="gk-out mk-out"></div>`,
    caveat: "An irreducible, aperiodic finite chain forgets its start: the distribution after n steps converges to the unique stationary π, and the fraction of time in each state converges too (the ergodic theorem for Markov chains).",
    init(root) {
      const P = [[.7, .2, .1], [.3, .4, .3], [.2, .4, .4]], N = ["sunny", "cloudy", "rainy"], col = [C.gold, "#cfc9e4", C.blue];
      let s0 = 0; const nI = root.querySelector("[data-i=n]"), cv = root.querySelector(".mk-cv"), out = root.querySelector(".mk-out");
      let pi = [1 / 3, 1 / 3, 1 / 3]; for (let k = 0; k < 500; k++) pi = [0, 1, 2].map(j => pi.reduce((s, p, i) => s + p * P[i][j], 0));
      const run = () => { const n = Math.round(Math.pow(10, +nI.value)); root.querySelector("[data-o=n]").textContent = n; const r = rng(9 + s0);
        let s = s0; const cnt = [0, 0, 0], trace = [];
        for (let t = 0; t < n; t++) { cnt[s]++; if (t < 60) trace.push(s); let u = r(), j = 0; while (u > P[s][j]) { u -= P[s][j]; j++; } s = j; }
        const { ctx, w, h } = canvas(cv, 70), cw = (w - 20) / 60; trace.forEach((x, i) => { ctx.fillStyle = col[x]; ctx.fillRect(10 + i * cw, 15, cw - 1, 40); });
        out.innerHTML = `first 60 days above; after ${n} days:\n` + N.map((nm, i) => `${nm.padEnd(7)} observed ${(100 * cnt[i] / n).toFixed(1).padStart(5)}%   stationary ${(100 * pi[i]).toFixed(1)}%`).join("\n"); };
      chips(root, ".mk-s", d => { s0 = +d.s; run(); }); nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1906 — Markov chains", who: "Andrey Markov 1906, 1913",
      lead: "Dependence can still obey a law of large numbers.",
      formula: "P(Xₙ₊₁ = j | Xₙ = i, …) = Pᵢⱼ",
      what: "Markov invented his chains to answer Nekrasov, who claimed the law of large numbers needed independence. In 1913 he analysed the alternation of vowels and consonants in 20,000 letters of Pushkin's Eugene Onegin.",
      how: "The stationary distribution is the left eigenvector of P with eigenvalue 1; the second eigenvalue sets the speed of convergence.",
      story: "The Nekrasov dispute had a political edge — Nekrasov used probability to argue for free will.",
      today: "PageRank, Markov chain Monte Carlo and speech recognition all use Markov chains." },
    { icon: "⚙️", title: "1900–1923 — Brownian motion", who: "Louis Bachelier 1900 · Albert Einstein 1905 · Marian Smoluchowski 1906 · Norbert Wiener 1923",
      lead: "The jittering of pollen grains became a continuous random path.",
      formula: "B(t) − B(s) ~ N(0, t − s), independent increments",
      what: "Bachelier (1900) modelled stock prices with Brownian motion; Einstein (1905) used it to prove atoms exist, predicting a displacement growing like √t, confirmed by Perrin. Wiener (1923) constructed it as a measure on continuous paths — nowhere differentiable, almost surely.",
      how: "Rescaled random walks converge to Brownian motion (Donsker, 1951) — see the random-walks atom.",
      story: "Bachelier's thesis was little appreciated; Perrin won the 1926 Nobel Prize in Physics for confirming Einstein.",
      today: "Diffusion models in AI generate images by reversing a Brownian noising process." },
    { icon: "🔥", title: "1939–1973 — martingales and Itô calculus", who: "Jean Ville 1939 · Joseph Doob 1953 · Kiyosi Itô 1944 · Black, Scholes & Merton 1973",
      lead: "Calculus for rough paths, and the fair game as a mathematical object.",
      formula: "d(B²) = 2B dB + dt",
      what: "A martingale is a fair game: the expected next value equals the current one. Doob's theory (1953) gave convergence and stopping theorems. Itô (1944) defined stochastic integrals; the extra dt term in his chain rule comes from (dB)² = dt.",
      how: "The Black–Scholes formula (1973) prices options by building a risk-free hedge with Itô calculus.",
      story: "Itô developed his calculus in wartime Japan; Merton and Scholes received the 1997 Nobel in Economics.",
      today: "Stochastic differential equations model finance, neuroscience, climate and molecular motion." }
  ],
  challenges: ["Does the starting state change the long-run fractions?", "How many days until the observed fractions are within 1% of π?", "Change nothing but think: what makes a chain fail to forget its start?"],
  sources: [
    { type: "FREE BOOK", title: "Levin & Peres — Markov Chains and Mixing Times", note: "Free from the authors.", url: "https://pages.uoregon.edu/dlevin/MARKOV/" },
    { type: "BOOK", title: "Norris — Markov Chains", note: "The standard introduction.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Andrey Markov", note: "Chains and Pushkin.", url: MT("Markov") }
  ]
});

/* ================================================================ STATISTICS */
register("statistics", {
  kicker: "LEARNING FROM DATA · ABOUT 25 MIN",
  hook: "What does a '95% confidence interval' actually promise?",
  intro: "Statistics turns data into conclusions with honest uncertainty. Gauss and Legendre fitted lines by least squares; Fisher built likelihood and experimental design; Neyman and Pearson defined tests and confidence intervals. The lab draws samples, builds a 95% interval each time, and counts how often it catches the true mean.",
  timeline: [[1763, "Bayes' essay"], [1805, "Legendre: least squares"], [1908, "Student's t"], [1922, "Fisher: likelihood"], [1933, "Neyman–Pearson"], [1937, "Neyman: confidence intervals"]],
  labs: [{
    kicker: "NEYMAN 1937", title: "Catching the true mean",
    intro: "The true mean is 10. Each row is a sample of size n with its interval x̄ ± 1.96σ/√n. Gold intervals catch 10; red ones miss.",
    html: `<div class="it-control"><label><span>sample size n</span><output data-o="n">10</output></label><input type="range" data-i="n" min="2" max="100" value="10"></div>
      <div class="it-lab-actions"><button class="it-send ci-go">draw 50 more samples</button></div>
      <canvas class="gk-canvas ci-cv"></canvas><div class="gk-out ci-out"></div>`,
    caveat: "'95%' describes the procedure, not a single interval: in the long run 95% of intervals made this way contain the truth. Any particular interval either does or doesn't.",
    init(root) {
      const nI = root.querySelector("[data-i=n]"), cv = root.querySelector(".ci-cv"), out = root.querySelector(".ci-out"), r = rng(21); let tot = 0, hit = 0;
      const run = (reset) => { const n = +nI.value; root.querySelector("[data-o=n]").textContent = n; if (reset) { tot = 0; hit = 0; }
        const { ctx, w, h } = canvas(cv, 220), X = v => 10 + (w - 20) * (v - 6) / 8;
        ctx.strokeStyle = C.teal; ctx.beginPath(); ctx.moveTo(X(10), 0); ctx.lineTo(X(10), h); ctx.stroke();
        for (let k = 0; k < 50; k++) { let s = 0; for (let i = 0; i < n; i++) s += 10 + 3 * gauss(r); const m = s / n, e = 1.96 * 3 / Math.sqrt(n), ok = Math.abs(m - 10) < e; tot++; if (ok) hit++;
          ctx.strokeStyle = ok ? C.gold : C.red; ctx.lineWidth = 2; const y = 4 + k * (h - 8) / 50; ctx.beginPath(); ctx.moveTo(X(m - e), y); ctx.lineTo(X(m + e), y); ctx.stroke(); }
        out.innerHTML = `σ = 3 known, n = ${n}, interval width ±${(1.96 * 3 / Math.sqrt(n)).toFixed(2)}\n<span class="g">coverage so far: ${hit} / ${tot} = ${(100 * hit / tot).toFixed(1)}%</span>`; };
      root.querySelector(".ci-go").addEventListener("click", () => run(false)); nI.addEventListener("input", () => run(true)); run(true);
    }
  }],
  chapters: [
    { icon: "🏛", title: "1763–1812 — Bayes and Laplace", who: "Thomas Bayes 1763 · Pierre-Simon Laplace 1774, 1812",
      lead: "Update beliefs with evidence.",
      formula: "P(H | D) = P(D | H) P(H) / P(D)",
      what: "Bayes's essay, published posthumously by Richard Price (1763), inferred the chance of an event from observed successes. Laplace independently developed and used 'inverse probability' widely, for instance estimating the population of France.",
      how: "The posterior is prior times likelihood, renormalised.",
      story: "Bayesians versus frequentists is one of the red disputes on the map.",
      today: "Bayesian methods run spam filters, medical diagnostics and much of modern machine learning." },
    { icon: "⚙️", title: "1805–1922 — least squares and likelihood", who: "Adrien-Marie Legendre 1805 · Gauss 1809 · William Gosset 1908 · Ronald Fisher 1922",
      lead: "Choose the parameters that make the data least surprising.",
      formula: "minimise Σ (yᵢ − a − bxᵢ)²;   maximise L(θ) = Π f(xᵢ; θ)",
      what: "Legendre published least squares in 1805; Gauss claimed earlier use and justified it with the normal error law. Gosset ('Student', 1908) found the t distribution for small samples while working at the Guinness brewery. Fisher (1922) defined maximum likelihood, sufficiency and Fisher information.",
      how: "For Gaussian errors, least squares is maximum likelihood.",
      story: "Guinness forbade publishing under real names, hence 'Student'.",
      today: "Regression is the most-used statistical tool in science." },
    { icon: "🔥", title: "1933–today — tests, intervals and replication", who: "Jerzy Neyman & Egon Pearson 1933 · Neyman 1937 · Bradley Efron 1979",
      lead: "Control error rates of procedures, not beliefs about single events.",
      formula: "P(reject H₀ | H₀ true) = α",
      what: "Neyman and Pearson (1933) framed tests by type I and type II errors; Neyman (1937) defined confidence intervals by their long-run coverage. Efron's bootstrap (1979) estimated uncertainty by resampling the data.",
      how: "Coverage is a property of the method — which the lab measures directly.",
      story: "Fisher and Neyman feuded bitterly over the meaning of tests.",
      today: "The replication crisis has prompted preregistration, effect sizes and more careful reporting of p-values." }
  ],
  challenges: ["Run several hundred samples. How close does coverage get to 95%?", "How does interval width change when n is multiplied by 4?", "Why can't you say 'there is a 95% chance the true mean is in this interval'?"],
  sources: [
    { type: "BOOK", title: "David Salsburg — The Lady Tasting Tea", note: "How statistics changed science in the twentieth century.", url: null },
    { type: "FREE TEXTBOOK", title: "OpenIntro Statistics", note: "Free, widely used introduction.", url: "https://www.openintro.org/book/os/" },
    { type: "BIOGRAPHY", title: "MacTutor — Ronald Fisher", note: "Likelihood and experimental design.", url: MT("Fisher") }
  ]
});

/* ================================================================ RANDOM MATRICES */
register("random-matrices", {
  kicker: "EIGENVALUES OF NOISE · ABOUT 25 MIN",
  hook: "Why do the energy levels of uranium nuclei and the zeros of the zeta function repel each other in the same way?",
  intro: "Fill a large symmetric matrix with random numbers and its eigenvalues are not random at all: their histogram tends to Wigner's semicircle, and neighbouring eigenvalues repel. Wigner introduced random matrices (1955) to model heavy nuclei; Montgomery and Dyson found the same statistics in the zeros of the Riemann zeta function. The lab computes eigenvalues of random matrices.",
  timeline: [[1928, "Wishart matrices"], [1955, "Wigner: semicircle"], [1962, "Dyson: three ensembles"], [1972, "Montgomery–Dyson tea"], [1994, "Tracy–Widom"], [2011, "universality proved"]],
  labs: [{
    kicker: "WIGNER 1955", title: "The semicircle law",
    intro: "Generate an n × n symmetric matrix with independent N(0,1) entries, scale by 1/√n, and find all its eigenvalues (Jacobi's method). The histogram approaches the semicircle √(4 − x²)/2π.",
    html: `<div class="it-control"><label><span>n</span><output data-o="n">60</output></label><input type="range" data-i="n" min="10" max="120" step="10" value="60"></div>
      <div class="it-lab-actions"><button class="it-send rmx-go">new matrices</button></div>
      <canvas class="gk-canvas rmx-cv"></canvas><div class="gk-out rmx-out"></div>`,
    caveat: "The same shape appears whatever the entry distribution, as long as the variance is fixed — universality. Spacings between neighbours follow the Wigner surmise, near zero at small gaps: eigenvalues repel.",
    init(root) {
      const nI = root.querySelector("[data-i=n]"), cv = root.querySelector(".rmx-cv"), out = root.querySelector(".rmx-out"); let seed = 1;
      const eig = A => { const n = A.length; for (let sweep = 0; sweep < 12; sweep++) { let off = 0; for (let p = 0; p < n; p++) for (let q = p + 1; q < n; q++) { off += A[p][q] ** 2; if (Math.abs(A[p][q]) < 1e-12) continue;
          const th = (A[q][q] - A[p][p]) / (2 * A[p][q]), t = Math.sign(th || 1) / (Math.abs(th) + Math.sqrt(th * th + 1)), c = 1 / Math.sqrt(t * t + 1), s = t * c;
          for (let k = 0; k < n; k++) { const akp = A[k][p], akq = A[k][q]; A[k][p] = c * akp - s * akq; A[k][q] = s * akp + c * akq; }
          for (let k = 0; k < n; k++) { const apk = A[p][k], aqk = A[q][k]; A[p][k] = c * apk - s * aqk; A[q][k] = s * apk + c * aqk; } } if (off < 1e-18) break; } return A.map((r, i) => r[i]); };
      const run = () => { const n = +nI.value, r = rng(seed); root.querySelector("[data-o=n]").textContent = n; const all = [];
        const reps = Math.max(1, Math.round(1200 / n));
        for (let m = 0; m < reps; m++) { const A = Array.from({ length: n }, () => Array(n).fill(0)); for (let i = 0; i < n; i++) for (let j = i; j < n; j++) { const v = gauss(r) * (i === j ? Math.SQRT2 : 1) / Math.sqrt(n); A[i][j] = A[j][i] = v; } all.push(...eig(A)); }
        hist(cv, all, 40, -2.5, 2.5, x => Math.abs(x) < 2 ? Math.sqrt(4 - x * x) / (2 * Math.PI) : 0);
        out.innerHTML = `${reps} matrices of size ${n}: ${all.length} eigenvalues\nlargest ≈ ${Math.max(...all).toFixed(3)} (edge of the semicircle: 2)`; };
      root.querySelector(".rmx-go").addEventListener("click", () => { seed++; run(); }); nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1928–1962 — Wishart, Wigner and Dyson", who: "John Wishart 1928 · Eugene Wigner 1955 · Freeman Dyson 1962",
      lead: "When a system is too complex to model, model its Hamiltonian as random.",
      formula: "ρ(x) = √(4 − x²) / 2π,   |x| ≤ 2",
      what: "Wishart studied sample covariance matrices in statistics (1928). Wigner (1955) proposed random symmetric matrices for the energy levels of heavy nuclei and proved the semicircle law. Dyson (1962) classified the three natural ensembles by symmetry: orthogonal, unitary and symplectic (β = 1, 2, 4).",
      how: "The moments of the semicircle are the Catalan numbers — counted by the non-crossing pairings in the trace of Aᵏ.",
      story: "Experimental nuclear spectra from neutron scattering matched Wigner's predictions remarkably well.",
      today: "The Marchenko–Pastur law, the Wishart analogue, tells statisticians which eigenvalues of a covariance matrix are just noise." },
    { icon: "⚙️", title: "1972 — zeta zeros at teatime", who: "Hugh Montgomery & Freeman Dyson 1972 · Andrew Odlyzko 1987",
      lead: "The Riemann zeros space themselves like eigenvalues of random unitary matrices.",
      formula: "pair correlation: 1 − (sin πu / πu)²",
      what: "Montgomery computed the pair correlation of zeta zeros; at tea at the Institute for Advanced Study, Dyson recognised it as the formula for the GUE ensemble. Odlyzko's computations of millions of zeros near 10²⁰ confirmed the match strikingly.",
      how: "This suggests the zeros might be eigenvalues of some self-adjoint operator (the Hilbert–Pólya idea).",
      story: "Montgomery had been introduced to Dyson by Chowla; neither expected the connection.",
      today: "Keating and Snaith (2000) used random matrices to predict moments of the zeta function." },
    { icon: "🔥", title: "1994–today — edges and universality", who: "Craig Tracy & Harold Widom 1994 · Erdős, Schlein, Yau · Tao & Vu 2011",
      lead: "The largest eigenvalue has its own universal law, found far beyond matrices.",
      formula: "λ_max ≈ 2 + n^(−2/3) · TW_β",
      what: "Tracy and Widom (1994) found the distribution of the largest eigenvalue. It reappeared in the longest increasing subsequence of a random permutation (Baik, Deift and Johansson 1999), in growing interfaces (KPZ) and in queueing. Universality for general entry distributions was proved around 2011.",
      how: "Orthogonal polynomials and Painlevé equations give the exact formulas.",
      story: "Tracy–Widom fluctuations were measured in turbulent liquid-crystal experiments by Takeuchi and Sano (2010).",
      today: "Random matrix theory informs wireless communication, deep-learning theory and portfolio risk." }
  ],
  challenges: ["Compare n = 10 and n = 120: which histogram matches the semicircle better?", "Why is the semicircle symmetric?", "Estimate how the largest eigenvalue approaches 2 as n grows."],
  sources: [
    { type: "BOOK", title: "Anderson, Guionnet & Zeitouni — An Introduction to Random Matrices", note: "Free draft from the authors.", url: "https://www.wisdom.weizmann.ac.il/~zeitouni/cupbook.pdf" },
    { type: "BOOK", title: "Madan Lal Mehta — Random Matrices", note: "The classic reference.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Eugene Wigner", note: "Symmetry and random matrices.", url: MT("Wigner") }
  ]
});
})();
