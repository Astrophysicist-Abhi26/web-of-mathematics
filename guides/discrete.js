// DISCRETE & COMBINATORICS — field guides for Enumerative Combinatorics, Graph Theory, Ramsey &
// Extremal Theory, Partitions and Additive Combinatorics.
(function () {
"use strict";
const { register, canvas, rng, C } = GuideKit;
const MT = s => "https://mathshistory.st-andrews.ac.uk/Biographies/" + s + "/";
const chips = (root, sel, cb) => root.querySelectorAll(sel + " .gk-chip").forEach(b => b.addEventListener("click", () => { root.querySelectorAll(sel + " .gk-chip").forEach(x => x.classList.toggle("on", x === b)); cb(b.dataset); }));

/* ================================================================ ENUMERATIVE */
const catalan = n => { let c = 1n; for (let k = 0; k < n; k++) c = c * 2n * BigInt(2 * k + 1) / BigInt(k + 2); return c; };
register("enumerative", {
  kicker: "THE ART OF COUNTING · ABOUT 20 MIN",
  hook: "How many ways can you walk up and down a mountain range without going below sea level?",
  intro: "Enumerative combinatorics counts finite structures exactly. The same numbers keep reappearing in disguise: the Catalan numbers 1, 1, 2, 5, 14, 42, … count mountain ranges, bracketings, binary trees and polygon triangulations — over 200 families in all. The lab draws random mountain ranges (Dyck paths) and counts them.",
  timeline: [[-200, "Pingala: binomial patterns"], [1202, "Fibonacci's rabbits"], [1654, "Pascal's triangle"], [1730, "de Moivre: generating functions"], [1751, "Euler: triangulations"], [1838, "Catalan's bracketings"]],
  labs: [{
    kicker: "EULER 1751 · CATALAN 1838", title: "Mountain ranges and the Catalan numbers",
    intro: "A mountain range of size n uses n up-steps and n down-steps and never dips below the start. Draw random ones, then compare the count with the formula C(n) = (2n choose n)/(n + 1).",
    html: `<div class="it-control"><label><span>size n</span><output data-o="n">6</output></label><input type="range" data-i="n" min="1" max="12" value="6"></div>
      <div class="it-lab-actions"><button class="it-send ca-go">draw another range</button></div>
      <canvas class="gk-canvas ca-cv"></canvas><div class="gk-out ca-out"></div>`,
    caveat: "The reflection trick (André, 1887): among all (2n choose n) up/down sequences, the bad ones that dip below zero correspond exactly to sequences with n + 1 downs, which is why C(n) = (2n choose n) − (2n choose n + 1).",
    init(root) {
      const nI = root.querySelector("[data-i=n]"), cv = root.querySelector(".ca-cv"), out = root.querySelector(".ca-out"), r = rng(7);
      const draw = () => {
        const n = +nI.value; root.querySelector("[data-o=n]").textContent = n;
        let path; do { const s = Array(n).fill(1).concat(Array(n).fill(-1)); for (let i = s.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [s[i], s[j]] = [s[j], s[i]]; } let h = 0, ok = true; for (const x of s) { h += x; if (h < 0) ok = false; } if (ok) path = s; } while (!path);
        const { ctx, w, h } = canvas(cv, 150), dx = (w - 20) / (2 * n), dy = Math.min(dx, (h - 20) / n);
        ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.beginPath(); ctx.moveTo(10, h - 10); ctx.lineTo(w - 10, h - 10); ctx.stroke();
        ctx.strokeStyle = C.gold; ctx.lineWidth = 2.2; ctx.beginPath(); let y = 0; ctx.moveTo(10, h - 10); path.forEach((s, i) => { y += s; ctx.lineTo(10 + (i + 1) * dx, h - 10 - y * dy); }); ctx.stroke();
        const b = (a, k) => { let r = 1n; for (let i = 0; i < k; i++) r = r * BigInt(a - i) / BigInt(i + 1); return r; };
        out.innerHTML = `C(${n}) = (${2 * n} choose ${n}) / ${n + 1} = ${b(2 * n, n)} / ${n + 1} = <span class="g">${catalan(n)}</span>\nfirst Catalan numbers: ${Array.from({ length: 13 }, (_, k) => catalan(k)).join(", ")}\nbrackets for this range: ${path.map(s => s > 0 ? "(" : ")").join("")}`;
      };
      root.querySelector(".ca-go").addEventListener("click", draw); nI.addEventListener("input", draw); draw();
    }
  }],
  chapters: [
    { icon: "🏛", title: "c. 200 BCE–1654 — binomial coefficients", who: "Pingala · al-Karajī c. 1000 · Yang Hui 1261 · Blaise Pascal 1654",
      lead: "The triangle of binomial coefficients was found on three continents before Pascal.",
      formula: "(n choose k) = (n−1 choose k−1) + (n−1 choose k)",
      what: "Pingala's work on poetic metres counted patterns of long and short syllables; al-Karajī and Yang Hui drew the triangle; Pascal's Traité (1654) proved its properties by induction and used it for probability.",
      how: "Each entry counts the k-element subsets of an n-element set; the addition rule splits them by whether they contain the last element.",
      story: "In China it is Yang Hui's triangle, in Iran Khayyam's, in Italy Tartaglia's.",
      today: "Binomial coefficients measure the number of possible genomes, lottery odds and the size of search spaces in algorithms." },
    { icon: "⚙️", title: "1202–1730 — recurrences and generating functions", who: "Fibonacci 1202 · Abraham de Moivre 1730 · Euler",
      lead: "Encode a whole sequence as one power series, and algebra does the counting.",
      formula: "Σ Fₙ xⁿ = x / (1 − x − x²)",
      what: "Fibonacci's rabbit problem (1202) gives Fₙ = Fₙ₋₁ + Fₙ₋₂. De Moivre (1730) solved such recurrences with generating functions, getting Binet's formula. For Catalan numbers the generating function satisfies C(x) = 1 + x C(x)².",
      how: "Solving C = 1 + xC² gives C(x) = (1 − √(1 − 4x)) / 2x, and expanding the square root gives the formula in the lab.",
      story: "Fibonacci's Liber Abaci was mainly a book introducing Hindu–Arabic numerals to European merchants.",
      today: "Analytic combinatorics (Flajolet and Sedgewick) reads asymptotics off generating functions: C(n) ~ 4ⁿ / (n^(3/2)√π)." },
    { icon: "🔥", title: "1751–today — Catalan numbers everywhere", who: "Euler 1751 · Eugène Catalan 1838 · Richard Stanley",
      lead: "One sequence, over two hundred interpretations.",
      formula: "C(n) = (1 / (n + 1)) · (2n choose n)",
      what: "Euler counted triangulations of a convex polygon (1751); Catalan counted bracketings (1838). Stanley's book Catalan Numbers (2015) lists 214 families counted by them.",
      how: "A bijection between two families is a proof that they have the same size — and usually more illuminating than algebra.",
      story: "The numbers appear in a Chinese text by Minggatu from the 1730s, before Euler.",
      today: "They count RNA secondary structures, binary search trees and the ways a stack can reorder data." }
  ],
  challenges: ["Draw several ranges of size 3. Can you list all 5?", "Match the 5 ranges of size 3 with the 5 triangulations of a pentagon.", "Why is C(n) always a whole number although the formula divides by n + 1?"],
  sources: [
    { type: "BOOK", title: "Richard Stanley — Catalan Numbers", note: "214 interpretations and their bijections.", url: null },
    { type: "FREE BOOK", title: "Herbert Wilf — generatingfunctionology", note: "Generating functions, free online.", url: "https://www2.math.upenn.edu/~wilf/DownldGF.html" },
    { type: "DATABASE", title: "OEIS — the On-Line Encyclopedia of Integer Sequences", note: "Look up any sequence; Catalan is A000108.", url: "https://oeis.org/A000108" }
  ]
});

/* ================================================================ GRAPH THEORY */
register("graph-theory", {
  kicker: "DOTS AND LINES · ABOUT 25 MIN",
  hook: "Does the order in which you colour a map change how many colours you need?",
  intro: "Graph theory began when Euler proved in 1736 that nobody could cross Königsberg's seven bridges once each. Graphs now model networks of every kind. Colouring — giving neighbours different colours — is one of its deepest problems: four colours suffice for any map, yet finding the minimum for a general graph is NP-hard. The lab colours graphs greedily and shows how much the order matters.",
  timeline: [[1736, "Euler: Königsberg"], [1852, "Guthrie: four colours?"], [1930, "Kuratowski: planarity"], [1935, "Hall's marriage theorem"], [1976, "Appel & Haken: four colours"], [2016, "Babai: graph isomorphism"]],
  labs: [{
    kicker: "GREEDY COLOURING", title: "Colour vertices one at a time",
    intro: "Take the vertices in some order and give each the smallest colour not used by an already-coloured neighbour. The lab builds a random graph and tries three orders.",
    html: `<div class="gk-chips gc-ord"><button class="gk-chip on" data-o="random">random order</button><button class="gk-chip" data-o="degree">largest degree first</button><button class="gk-chip" data-o="bad">adversarial order</button></div>
      <div class="it-lab-actions"><button class="gk-ghost gc-new">new graph</button></div>
      <canvas class="gk-canvas gc-cv"></canvas><div class="gk-out gc-out"></div>`,
    caveat: "Greedy colouring never uses more than (maximum degree + 1) colours, but on a 'crown' graph it can use n/2 colours when 2 suffice. Brooks' theorem (1941): only complete graphs and odd cycles need the full Δ + 1.",
    init(root) {
      let ord = "random", seed = 3, G;
      const cv = root.querySelector(".gc-cv"), out = root.querySelector(".gc-out");
      const make = () => { const r = rng(seed), n = 16, P = Array.from({ length: n }, () => [r(), r()]), E = [];
        for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]) < .36 && r() < .8) E.push([i, j]);
        G = { n, P, E, adj: P.map((_, i) => E.filter(e => e.includes(i)).map(e => e[0] === i ? e[1] : e[0])) }; };
      const run = () => {
        const { n, P, E, adj } = G, r = rng(seed * 7 + ord.length);
        let order = [...Array(n).keys()];
        if (ord === "random") order.sort(() => r() - .5); else if (ord === "degree") order.sort((a, b) => adj[b].length - adj[a].length); else order.sort((a, b) => adj[a].length - adj[b].length);
        const col = Array(n).fill(-1); order.forEach(v => { const used = new Set(adj[v].map(u => col[u])); let c = 0; while (used.has(c)) c++; col[v] = c; });
        const k = Math.max(...col) + 1, { ctx, w, h } = canvas(cv, 240), X = p => [20 + p[0] * (w - 40), 20 + p[1] * (h - 40)];
        ctx.strokeStyle = "rgba(255,255,255,.25)"; E.forEach(([a, b]) => { ctx.beginPath(); ctx.moveTo(...X(P[a])); ctx.lineTo(...X(P[b])); ctx.stroke(); });
        const pal = [C.gold, C.teal, C.pink, C.green, C.blue, C.red, C.violet, "#fff"];
        P.forEach((p, i) => { ctx.fillStyle = pal[col[i] % 8]; ctx.beginPath(); ctx.arc(...X(p), 8, 0, 7); ctx.fill(); ctx.fillStyle = "#120b18"; ctx.font = "9px IBM Plex Mono"; ctx.textAlign = "center"; ctx.fillText(order.indexOf(i) + 1, X(p)[0], X(p)[1] + 3); });
        out.innerHTML = `${n} vertices, ${E.length} edges, max degree Δ = ${Math.max(...adj.map(a => a.length))}\n<span class="g">greedy used ${k} colours</span> with the ${ord} order (numbers show the order)\nbound: at most Δ + 1 = ${Math.max(...adj.map(a => a.length)) + 1}`;
      };
      chips(root, ".gc-ord", d => { ord = d.o; run(); });
      root.querySelector(".gc-new").addEventListener("click", () => { seed++; make(); run(); }); make(); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1736 — Euler and the bridges of Königsberg", who: "Leonhard Euler 1736 · Carl Hierholzer 1873",
      lead: "The first theorem of graph theory throws away everything but connections.",
      formula: "a connected graph has a walk using every edge once ⇔ it has 0 or 2 vertices of odd degree",
      what: "Königsberg's four land masses were joined by seven bridges, and every land mass had an odd number of them, so no walk crosses each bridge exactly once. Hierholzer (1873) proved the converse.",
      how: "Each pass through a vertex uses two edges, so all but the start and end vertices need even degree.",
      story: "Euler thought the problem barely mathematical — it needed 'the geometry of position' Leibniz had dreamed of. The Königsberg atom lets you try the walk.",
      today: "Route planning for snowploughs and postal deliveries solves Euler's problem at scale." },
    { icon: "⚙️", title: "1852–1976 — the four colour theorem", who: "Francis Guthrie 1852 · Alfred Kempe 1879 · Percy Heawood 1890 · Appel & Haken 1976",
      lead: "Any map can be coloured with four colours — proved by computer.",
      formula: "χ(planar graph) ≤ 4",
      what: "Guthrie asked in 1852 whether four colours suffice for any map. Kempe's 1879 proof survived eleven years until Heawood found the flaw, rescuing it to prove five. Appel and Haken (1976) reduced the problem to 1,936 configurations and checked them by computer.",
      how: "Robertson, Sanders, Seymour and Thomas simplified the proof (1996), and Gonthier formally verified it in Coq (2005).",
      story: "The computer proof was one of mathematics' great controversies — it is a red edge on the map.",
      today: "Colouring algorithms schedule exams, allocate radio frequencies and assign CPU registers in compilers." },
    { icon: "🔥", title: "1930–today — structure: planarity, matchings, minors", who: "Kuratowski 1930 · Philip Hall 1935 · Robertson & Seymour 1983–2004",
      lead: "Forbidden patterns describe whole families of graphs.",
      formula: "planar ⇔ no subdivision of K₅ or K₃,₃",
      what: "Kuratowski (1930) characterised planar graphs by two forbidden graphs. Hall's marriage theorem (1935) says when a perfect matching exists. The Robertson–Seymour graph minor theorem, proved in 23 papers over 21 years, says every minor-closed family is defined by finitely many forbidden minors.",
      how: "Spectral graph theory reads structure from eigenvalues of the adjacency matrix.",
      story: "Babai's 2015 quasi-polynomial algorithm for graph isomorphism was the biggest complexity result in the field for decades.",
      today: "Graphs model social networks, protein interactions and the web; PageRank is a graph eigenvector." }
  ],
  challenges: ["Find a graph where the adversarial order needs more colours than largest-degree-first.", "Why can't a graph with a triangle be coloured with 2 colours?", "Check the greedy bound Δ + 1 on several random graphs."],
  sources: [
    { type: "TEXTBOOK", title: "Reinhard Diestel — Graph Theory", note: "Free electronic edition from the author.", url: "https://diestel-graph-theory.com/" },
    { type: "BOOK", title: "Robin Wilson — Four Colours Suffice", note: "The history of the four colour problem.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Leonhard Euler", note: "The founder of graph theory.", url: MT("Euler") }
  ]
});

/* ================================================================ RAMSEY */
register("ramsey", {
  kicker: "COMPLETE DISORDER IS IMPOSSIBLE · ABOUT 25 MIN",
  hook: "How can you prove something exists without ever finding it?",
  intro: "Ramsey theory says every large enough structure contains a tidy piece: colour the edges of a big enough complete graph red and blue and a one-colour triangle — or a one-colour group of any size k — must appear. How big is big enough? Erdős (1947) proved lower bounds by showing a random colouring works with positive probability, without constructing one. The lab repeats his calculation.",
  timeline: [[1930, "Ramsey's theorem"], [1935, "Erdős–Szekeres"], [1941, "Turán's theorem"], [1947, "Erdős: the probabilistic method"], [1955, "R(4,4) = 18"], [2023, "Campos et al.: exponential improvement"]],
  labs: [{
    kicker: "ERDŐS 1947", title: "Random colourings avoid big one-colour groups",
    intro: "Colour each edge of Kₙ red or blue by a coin toss. The expected number of one-colour Kₖ is (n choose k)·2^(1 − (k choose 2)). If it is below 1, some colouring has none — so R(k,k) > n.",
    html: `<div class="it-control"><label><span>k</span><output data-o="k">10</output></label><input type="range" data-i="k" min="3" max="30" value="10"></div>
      <div class="gk-out rm-out"></div>`,
    caveat: "Erdős's bound R(k,k) > 2^(k/2) comes from exactly this count. Known upper bounds are about 4ᵏ; nobody knows where the truth lies between √2ᵏ and 4ᵏ, and even R(5,5) is unknown (between 43 and 46).",
    init(root) {
      const kI = root.querySelector("[data-i=k]"), out = root.querySelector(".rm-out");
      const lb = (n, k) => { let s = 0; for (let i = 0; i < k; i++) s += Math.log2(n - i) - Math.log2(i + 1); return s + 1 - k * (k - 1) / 2; };
      const run = () => { const k = +kI.value; root.querySelector("[data-o=k]").textContent = k; let n = k; while (lb(n + 1, k) < 0) n++;
        out.innerHTML = `with n = ${n}: expected one-colour K_${k} = 2^${lb(n, k).toFixed(2)} < 1\n<span class="g">so R(${k},${k}) > ${n}</span>   (compare 2^(k/2) = ${Math.pow(2, k / 2).toFixed(0)})\nknown: R(3,3) = 6, R(4,4) = 18, 43 ≤ R(5,5) ≤ 46`; };
      kI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1930–1935 — Ramsey and the happy ending problem", who: "Frank Ramsey 1930 · Paul Erdős & George Szekeres 1935",
      lead: "Order is unavoidable in large enough systems.",
      formula: "R(3,3) = 6: among any six people, three know each other or three are strangers",
      what: "Ramsey proved his theorem (1930) as a lemma in logic. Erdős and Szekeres (1935) rediscovered it via the 'happy ending problem': any five points in general position contain a convex quadrilateral.",
      how: "Pick a vertex: of its five edges, three share a colour; among their endpoints either one edge has that colour (triangle) or all three edges have the other (triangle).",
      story: "Ramsey died in 1930 at 26. The happy ending: Szekeres married Esther Klein, who posed the problem. The Ramsey-party atom plays R(3,3).",
      today: "Ramsey arguments set limits in computer science, from sorting networks to lower bounds for circuits." },
    { icon: "⚙️", title: "1941–1947 — extremal graphs and random graphs", who: "Pál Turán 1941 · Paul Erdős 1947 · Erdős & Rényi 1959",
      lead: "How many edges force a structure — and what does a typical graph look like?",
      formula: "Turán: a graph with more than (1 − 1/r)n²/2 edges contains K_(r+1)",
      what: "Turán (1941) found the most edges a graph can have without a K_(r+1). Erdős (1947) proved lower bounds for Ramsey numbers by counting random colourings; Erdős and Rényi (1959) began the theory of random graphs, with sharp thresholds for connectivity and giant components.",
      how: "The probabilistic method: if a random object has a property with positive probability, an object with that property exists.",
      story: "Turán found his theorem in a Hungarian labour camp in 1940.",
      today: "Random graphs model networks and underpin expander constructions and randomized algorithms." },
    { icon: "🔥", title: "2023 — the first exponential improvement", who: "Campos, Griffiths, Morris & Sahasrabudhe 2023",
      lead: "After 88 years, the upper bound 4ᵏ was beaten.",
      formula: "R(k,k) ≤ (4 − ε)ᵏ",
      what: "Erdős and Szekeres's bound R(k,k) ≤ 4ᵏ had been improved only by sub-exponential factors. In 2023 Campos, Griffiths, Morris and Sahasrabudhe proved R(k,k) ≤ 3.993ᵏ with a 'book' algorithm; later work pushed it towards 3.8ᵏ.",
      how: "Their algorithm grows a structure of red cliques and large common neighbourhoods, keeping careful density bookkeeping.",
      story: "Erdős offered $100 for determining whether lim R(k,k)^(1/k) exists and $250 for its value.",
      today: "Whether the truth is nearer √2 or 4 remains one of combinatorics' central questions." }
  ],
  challenges: ["For k = 3, what bound does the lab give? Compare with R(3,3) = 6.", "Why is the bound only an existence proof?", "How does the bound grow as k doubles?"],
  sources: [
    { type: "BOOK", title: "Alon & Spencer — The Probabilistic Method", note: "The standard book.", url: null },
    { type: "PAPER · 2023", title: "Campos, Griffiths, Morris & Sahasrabudhe — An exponential improvement for diagonal Ramsey", note: "arXiv preprint.", url: "https://arxiv.org/abs/2303.09521" },
    { type: "BIOGRAPHY", title: "MacTutor — Paul Erdős", note: "The man who loved only numbers.", url: MT("Erdos") }
  ]
});

/* ================================================================ PARTITIONS */
const PART = (() => { const N = 200, p = Array(N + 1).fill(0n); p[0] = 1n;
  for (let n = 1; n <= N; n++) { let s = 0n; for (let k = 1; ; k++) { const g1 = k * (3 * k - 1) / 2, g2 = k * (3 * k + 1) / 2; if (g1 > n) break; const sg = k % 2 ? 1n : -1n; s += sg * p[n - g1]; if (g2 <= n) s += sg * p[n - g2]; } p[n] = s; }
  return p; })();
register("partitions", {
  kicker: "WAYS TO BREAK A NUMBER · ABOUT 20 MIN",
  hook: "Why is the number of ways to split 5k + 4 into parts always divisible by 5?",
  intro: "A partition of n writes it as a sum of positive parts, ignoring order: 4 = 3 + 1 = 2 + 2 = 2 + 1 + 1 = 1 + 1 + 1 + 1, so p(4) = 5. The numbers grow fast — p(200) has 13 digits — yet Euler's pentagonal number theorem computes them with a short recurrence, and Ramanujan found hidden congruences. The lab computes p(n).",
  timeline: [[1740, "Euler: generating function"], [1750, "pentagonal number theorem"], [1894, "Rogers' identities"], [1918, "Hardy–Ramanujan formula"], [1919, "Ramanujan's congruences"], [2011, "Ono et al.: p-adic structure"]],
  labs: [{
    kicker: "EULER 1750 · RAMANUJAN 1919", title: "Compute p(n) with pentagonal numbers",
    intro: "p(n) = p(n−1) + p(n−2) − p(n−5) − p(n−7) + p(n−12) + p(n−15) − ⋯ where 1, 2, 5, 7, 12, 15, … are the generalised pentagonal numbers.",
    html: `<div class="it-control"><label><span>n</span><output data-o="n">24</output></label><input type="range" data-i="n" min="1" max="200" value="24"></div>
      <div class="gk-out pt-out"></div>`,
    caveat: "Hardy and Ramanujan's asymptotic p(n) ~ e^(π√(2n/3)) / (4n√3) was refined by Rademacher (1937) into an exact convergent series. MacMahon computed p(200) = 3,972,999,029,388 by hand to test it.",
    init(root) {
      const nI = root.querySelector("[data-i=n]"), out = root.querySelector(".pt-out");
      const run = () => { const n = +nI.value; root.querySelector("[data-o=n]").textContent = n; const v = PART[n], asym = Math.exp(Math.PI * Math.sqrt(2 * n / 3)) / (4 * n * Math.sqrt(3));
        out.innerHTML = `p(${n}) = <span class="g">${v}</span>\nHardy–Ramanujan estimate ≈ ${asym.toExponential(4)}  (ratio ${(Number(v) / asym).toFixed(4)})\n` +
          [[5, 4], [7, 5], [11, 6]].map(([m, r]) => `n ≡ ${r} (mod ${m}): p(n) mod ${m} = ${v % BigInt(m)}${n % m === r ? ' <span class="t">← Ramanujan: always 0</span>' : ""}`).join("\n"); };
      nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1740–1750 — Euler's generating function", who: "Leonhard Euler 1740–50",
      lead: "An infinite product counts all partitions at once.",
      formula: "Σ p(n) qⁿ = Π 1/(1 − qᵏ);   Π (1 − qᵏ) = Σ (−1)ᵏ q^(k(3k−1)/2)",
      what: "Answering a letter from Naudé (1740), Euler wrote the partition generating function as a product. He then found that the reciprocal product has almost all coefficients 0, the rest ±1 at pentagonal numbers — proved in 1750.",
      how: "Multiplying both sides gives the recurrence the lab uses. Euler also proved partitions into distinct parts equal partitions into odd parts (the partitions atom).",
      story: "Franklin (1881) gave a beautiful bijective proof of the pentagonal theorem with Young-diagram moves.",
      today: "Partitions index irreducible representations of the symmetric groups." },
    { icon: "⚙️", title: "1918–1937 — the circle method", who: "G. H. Hardy & Srinivasa Ramanujan 1918 · Hans Rademacher 1937",
      lead: "Analysis gives an exact formula for a purely combinatorial count.",
      formula: "p(n) ~ e^(π√(2n/3)) / (4n√3)",
      what: "Hardy and Ramanujan extracted p(n) from its generating function by a contour integral, splitting the circle into arcs near each root of unity — the circle method. Rademacher turned their asymptotic series into an exact convergent formula.",
      how: "The modular symmetry of the generating function (related to Dedekind's eta function) controls the behaviour near each root of unity.",
      story: "The film The Man Who Knew Infinity (2015) dramatises the collaboration.",
      today: "The circle method is a standard tool for Waring's problem and additive questions about primes." },
    { icon: "🔥", title: "1919–today — Ramanujan's congruences", who: "Ramanujan 1919 · Atkin · Ken Ono 2000 · Dyson's rank 1944",
      lead: "p(5n + 4), p(7n + 5), p(11n + 6) are always divisible by 5, 7, 11.",
      formula: "p(5n + 4) ≡ 0 (mod 5)",
      what: "Ramanujan noticed the congruences in MacMahon's table. Dyson (1944) conjectured a combinatorial reason, the 'rank', that splits the partitions of 5n + 4 into five equal classes; Atkin and Swinnerton-Dyer proved it in 1954. Ono (2000) showed congruences exist for every prime modulus ≥ 5.",
      how: "Modular forms supply the congruences, just as they supply Ramanujan's τ congruence mod 691.",
      story: "Dyson guessed the rank as an undergraduate; the 'crank' explaining mod 11 came from Andrews and Garvan in 1988.",
      today: "Partition theory links combinatorics, modular forms and string theory (counting black-hole states)." }
  ],
  challenges: ["Check p(4) = 5 by listing partitions.", "Is p(9), p(14), p(19) divisible by 5?", "How close is the Hardy–Ramanujan estimate at n = 200?"],
  sources: [
    { type: "BOOK", title: "George Andrews & Kimmo Eriksson — Integer Partitions", note: "An elementary introduction.", url: null },
    { type: "DATABASE", title: "OEIS A000041", note: "The partition numbers.", url: "https://oeis.org/A000041" },
    { type: "BIOGRAPHY", title: "MacTutor — Srinivasa Ramanujan", note: "His notebooks and congruences.", url: MT("Ramanujan") }
  ]
});

/* ================================================================ ADDITIVE */
register("additive-combinatorics", {
  kicker: "STRUCTURE IN SUMS · ABOUT 25 MIN",
  hook: "If a set barely grows when you add it to itself, must it be an arithmetic progression?",
  intro: "Additive combinatorics studies sets of numbers through their sums. A random set's sumset A + A is huge; an arithmetic progression's is as small as possible. Freiman's theorem says small doubling forces progression-like structure, and Szemerédi's theorem says dense sets contain long progressions — the road to Green and Tao's theorem on primes. The lab computes sumsets.",
  timeline: [[1927, "van der Waerden"], [1936, "Erdős–Turán conjecture"], [1964, "Freiman's theorem"], [1975, "Szemerédi's theorem"], [2004, "Green–Tao: primes"], [2016, "cap set bound"]],
  labs: [{
    kicker: "FREIMAN 1964", title: "How much does A + A grow?",
    intro: "Choose a set of 12 numbers. The lab computes A + A = {a + b} and the doubling |A + A| / |A|. Progressions give 2 − 1/|A|; random sets approach the maximum.",
    html: `<div class="gk-chips ad-pre"><button class="gk-chip on" data-s="ap">arithmetic progression</button><button class="gk-chip" data-s="two">two progressions</button><button class="gk-chip" data-s="rand">random</button><button class="gk-chip" data-s="pow">powers of 2</button><button class="gk-chip" data-s="sq">squares</button></div>
      <canvas class="gk-canvas ad-cv"></canvas><div class="gk-out ad-out"></div>`,
    caveat: "|A + A| ≥ 2|A| − 1 with equality only for progressions; at most |A|(|A| + 1)/2 with equality for 'Sidon-like' sets such as powers of 2. Freiman: if |A + A| ≤ K|A|, then A sits efficiently inside a generalised arithmetic progression.",
    init(root) {
      const cv = root.querySelector(".ad-cv"), out = root.querySelector(".ad-out");
      const sets = { ap: () => Array.from({ length: 12 }, (_, i) => 3 + 4 * i), two: () => Array.from({ length: 12 }, (_, i) => i < 6 ? 2 * i : 40 + 2 * (i - 6)), rand: () => { const s = new Set(); while (s.size < 12) s.add(Math.floor(Math.random() * 60)); return [...s].sort((a, b) => a - b); }, pow: () => Array.from({ length: 12 }, (_, i) => 2 ** i), sq: () => Array.from({ length: 12 }, (_, i) => (i + 1) ** 2) };
      const run = k => { const A = sets[k](), S = [...new Set(A.flatMap(a => A.map(b => a + b)))].sort((a, b) => a - b);
        const { ctx, w, h } = canvas(cv, 90), M = Math.max(...S), X = v => 10 + (w - 20) * v / M;
        A.forEach(v => { ctx.fillStyle = C.gold; ctx.fillRect(X(v) - 1, 20, 3, 20); }); S.forEach(v => { ctx.fillStyle = C.teal; ctx.fillRect(X(v) - 1, 55, 2, 20); });
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("A", 2, 34); ctx.fillText("A+A", 2, 88);
        out.innerHTML = `A = {${A.join(", ")}}\n|A| = 12   |A + A| = <span class="g">${S.length}</span>   doubling = ${(S.length / 12).toFixed(2)}\nrange: minimum 2·12 − 1 = 23, maximum 12·13/2 = 78`; };
      chips(root, ".ad-pre", d => run(d.s)); run("ap");
    }
  }],
  chapters: [
    { icon: "🏛", title: "1927–1975 — progressions in dense sets", who: "Bartel van der Waerden 1927 · Klaus Roth 1953 · Endre Szemerédi 1975 · Hillel Furstenberg 1977",
      lead: "Colour the integers with finitely many colours and some colour contains arbitrarily long progressions.",
      formula: "A ⊆ ℕ of positive upper density  ⇒  A contains arithmetic progressions of every length",
      what: "Van der Waerden (1927) proved the colouring version. Erdős and Turán (1936) conjectured the density version; Roth proved it for length 3 (1953) with Fourier analysis, and Szemerédi for all lengths (1975) with a combinatorial tour de force. Furstenberg (1977) re-proved it with ergodic theory.",
      how: "Szemerédi's regularity lemma — every large graph looks like a union of random-like pieces — came out of the proof.",
      story: "Szemerédi received the Abel Prize in 2012.",
      today: "Gowers (1998–2001) introduced higher Fourier analysis to get quantitative bounds; he received the Fields Medal in 1998." },
    { icon: "⚙️", title: "1964 — Freiman's theorem", who: "Gregory Freiman 1964 · Imre Ruzsa 1994",
      lead: "Sets that barely grow under addition must be structured.",
      formula: "|A + A| ≤ K|A|  ⇒  A ⊆ generalised progression of dimension ≤ d(K), size ≤ f(K)|A|",
      what: "Freiman's inverse theorem characterises sets of small doubling. Ruzsa (1994) found a much shorter proof using his covering lemma and Plünnecke's inequalities.",
      how: "The polynomial Freiman–Ruzsa conjecture, a sharper version, was proved over 𝔽₂ⁿ by Gowers, Green, Manners and Tao in 2023.",
      story: "Their 2023 proof was formally verified in Lean within weeks by a crowd-sourced project led by Tao.",
      today: "Small-doubling results feed into computer science (property testing, extractors)." },
    { icon: "🔥", title: "2004–2016 — primes and caps", who: "Ben Green & Terence Tao 2004 · Croot, Lev & Pach 2016 · Ellenberg & Gijswijt 2016",
      lead: "The primes contain arbitrarily long progressions; caps in 𝔽₃ⁿ are exponentially small.",
      formula: "cap set in 𝔽₃ⁿ: |A| ≤ 2.756ⁿ",
      what: "Green and Tao (2004) proved the primes contain arbitrarily long arithmetic progressions, via a relative Szemerédi theorem. The cap set problem asked how large a subset of 𝔽₃ⁿ can avoid three-term progressions; the polynomial method of Croot, Lev and Pach led Ellenberg and Gijswijt to an exponential bound in a few pages (2016).",
      how: "The slice-rank method bounds the rank of a tensor built from the set.",
      story: "The cap set question is equivalent to the largest set of cards with no 'SET' in the card game SET, generalised to n attributes.",
      today: "The longest known progression of primes has 27 terms (found 2019 by PrimeGrid)." }
  ],
  challenges: ["Why do two progressions far apart give doubling about 3?", "Which preset gives the largest possible sumset, and why?", "Compute |A + A| for the squares by hand for A = {1, 4, 9}."],
  sources: [
    { type: "TEXTBOOK", title: "Tao & Vu — Additive Combinatorics", note: "The standard reference.", url: null },
    { type: "PAPER · 2004", title: "Green & Tao — The primes contain arbitrarily long arithmetic progressions", note: "arXiv preprint.", url: "https://arxiv.org/abs/math/0404188" },
    { type: "BIOGRAPHY", title: "MacTutor — Endre Szemerédi", note: "Regularity and progressions.", url: MT("Szemeredi") }
  ]
});
})();
