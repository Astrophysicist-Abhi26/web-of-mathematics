/* ============================================================
   THE WEB OF MATHEMATICS — atoms-computation.js
   Algorithms & computation (domain: foundations)
     sortrace · tsp · sudoku · pancake · dfa
   ============================================================ */
(function () {
"use strict";
const { C, rng } = AtomKit;
function sized(c, h) { let d = AtomKit.canvas(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = AtomKit.canvas(c, h); return d; }; }
function looper() { const L = { raf: null, fn: null, start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } }, stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } }; return L; }

/* ================================================================ Sorting race */
// Each sorter is a generator yielding after every comparison, so both run at the same "comparisons per frame".
function* bubble(a, st) { const n = a.length; for (let i = 0; i < n; i++) for (let j = 0; j < n - 1 - i; j++) { st.cmp++; st.hi = [j, j + 1]; if (a[j] > a[j + 1]) { [a[j], a[j + 1]] = [a[j + 1], a[j]]; } yield; } }
function* insertion(a, st) { for (let i = 1; i < a.length; i++) { let j = i; while (j > 0) { st.cmp++; st.hi = [j - 1, j]; yield; if (a[j - 1] > a[j]) { [a[j - 1], a[j]] = [a[j], a[j - 1]]; j--; } else break; } } }
function* merge(a, st, lo = 0, hi = a.length) { if (hi - lo < 2) return; const m = (lo + hi) >> 1; yield* merge(a, st, lo, m); yield* merge(a, st, m, hi);
  const L = a.slice(lo, m), R = a.slice(m, hi); let i = 0, j = 0, k = lo; while (i < L.length && j < R.length) { st.cmp++; st.hi = [k, m + j]; a[k++] = L[i] <= R[j] ? L[i++] : R[j++]; yield; } while (i < L.length) a[k++] = L[i++]; while (j < R.length) a[k++] = R[j++]; }
function* quick(a, st, lo = 0, hi = a.length - 1) { if (lo >= hi) return; const pv = a[(lo + hi) >> 1]; let i = lo, j = hi;
  while (i <= j) { while (true) { st.cmp++; st.hi = [i, j]; yield; if (a[i] < pv) i++; else break; } while (true) { st.cmp++; st.hi = [i, j]; yield; if (a[j] > pv) j--; else break; } if (i <= j) { [a[i], a[j]] = [a[j], a[i]]; i++; j--; } }
  yield* quick(a, st, lo, j); yield* quick(a, st, i, hi); }
const SORTS = { bubble: ["Bubble sort", bubble, "n²"], insertion: ["Insertion sort", insertion, "n²"], merge: ["Merge sort", merge, "n log n"], quick: ["Quicksort", quick, "n log n"] };
let srL = looper();
registerAtom({
  id: "sortrace", name: "Sorting race: n² vs n log n", domain: "foundations", fields: ["computability"],
  html: `<h3>The sorting race — why n log n beats n²</h3>
    <p class="ahint">Two algorithms sort the same shuffled bars, each allowed the same number of comparisons per frame. Pick the racers and the size; double n and watch the slow one fall four times further behind.</p>
    <div class="achips"><label class="achk">left <select class="sr-a"><option value="bubble">Bubble sort</option><option value="insertion">Insertion sort</option><option value="merge">Merge sort</option><option value="quick">Quicksort</option></select></label>
      <label class="achk">right <select class="sr-b"><option value="bubble">Bubble sort</option><option value="insertion">Insertion sort</option><option value="merge" selected>Merge sort</option><option value="quick">Quicksort</option></select></label>
      <label class="achk">n <input type="range" class="sr-n" min="20" max="200" step="10" value="80"> <b class="sr-nv"></b></label>
      <button class="achip sr-go">race again</button></div>
    <canvas class="acv sr-cv"></canvas>
    <div class="aout sr-out"></div>
    <p class="awhy">Any sort that works only by comparing items needs at least log₂(n!) ≈ n log₂ n comparisons in the worst case: each comparison is a yes/no question, and there are n! possible orders to tell apart. Merge sort (von Neumann, 1945) meets that bound; quicksort (Hoare, 1959) does on average. For a million items, n² is a trillion steps and n log n is about twenty million — the difference between a week and a blink.</p>`,
  build(p) {
    const c = p.querySelector(".sr-cv"), out = p.querySelector(".sr-out"), dims = sized(c, 330), nI = p.querySelector(".sr-n"); let R;
    function reset() { const n = +nI.value; p.querySelector(".sr-nv").textContent = n; const g = rng(Date.now() & 0xffff), base = [...Array(n)].map((_, i) => i + 1).sort(() => g() - .5);
      R = [p.querySelector(".sr-a").value, p.querySelector(".sr-b").value].map(k => { const a = base.slice(), st = { cmp: 0, hi: [], done: false }; return { k, a, st, it: SORTS[k][1](a, st) }; }); srL.start(); }
    srL.fn = () => { if (!R) return; const { ctx, w, h } = dims(), n = R[0].a.length, per = Math.max(2, Math.round(n * n / 900)); ctx.clearRect(0, 0, w, h);
      R.forEach((r, s) => { if (!r.st.done) for (let t = 0; t < per; t++) if (r.it.next().done) { r.st.done = true; r.st.hi = []; break; }
        const x0 = s * w / 2 + 12, W = w / 2 - 24, bw = W / n, H = h - 50; ctx.fillStyle = "#cfc9e4"; ctx.font = "12px 'IBM Plex Mono'"; ctx.fillText(`${SORTS[r.k][0]} · ${r.st.cmp.toLocaleString("en")} comparisons${r.st.done ? " ✓" : ""}`, x0, 16);
        r.a.forEach((v, i) => { ctx.fillStyle = r.st.hi.includes(i) ? C.red : r.st.done ? C.green : `hsl(${260 - v / n * 200},70%,62%)`; ctx.fillRect(x0 + i * bw, h - 8 - v / n * H, Math.max(1, bw - 1), v / n * H); }); });
      const [a, b] = R, lg = n * Math.log2(n); out.innerHTML = `n = ${n}:  n² ≈ ${(n * n).toLocaleString("en")}   n log₂ n ≈ ${Math.round(lg).toLocaleString("en")}   <span class="d">log₂(n!) lower bound ≈ ${Math.round(lg - n * 1.4427).toLocaleString("en")}</span>` +
        (a.st.done && b.st.done ? `<br><span class="g">finished: ${SORTS[a.k][0]} ${a.st.cmp.toLocaleString("en")} vs ${SORTS[b.k][0]} ${b.st.cmp.toLocaleString("en")} comparisons</span>` : "");
      if (a.st.done && b.st.done) srL.stop(); };
    ["sr-a", "sr-b"].forEach(k => p.querySelector("." + k).addEventListener("change", reset)); nI.addEventListener("input", reset); p.querySelector(".sr-go").addEventListener("click", reset);
    this._go = reset;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } else srL.start(); }, stop() { srL.stop(); }
});

/* ================================================================ Travelling salesman */
registerAtom({
  id: "tsp", name: "Travelling salesman", domain: "foundations", fields: ["computability"],
  html: `<h3>The travelling salesman — easy to state, brutally hard to solve</h3>
    <p class="ahint">Click to add cities (or scatter some). Find the shortest round trip visiting each once. Compare the greedy "nearest neighbour" tour, the 2-opt fix-up that uncrosses edges, and — for up to 9 cities — the true optimum by checking every tour.</p>
    <div class="achips"><button class="achip tsp-rand">scatter 8 cities</button><button class="achip tsp-rand2">scatter 40 cities</button><button class="achip tsp-clear">clear</button>
      <button class="achip tsp-nn">nearest neighbour</button><button class="achip tsp-2o">improve with 2-opt</button><button class="achip tsp-bf">brute force (≤ 9)</button></div>
    <canvas class="acv tsp-cv" style="cursor:crosshair"></canvas>
    <div class="aout tsp-out"></div>
    <p class="awhy">With n cities there are (n−1)!/2 distinct tours: 20,160 for 9 cities, about 10⁴⁵ for 40. The problem is NP-hard: no known method is fundamentally faster than exponential, and finding one would settle P vs NP (a Clay Millennium Prize). Yet heuristics work astonishingly well in practice — 2-opt tours are typically within 5% of optimal, and in 2006 an 85,900-city chip-layout instance was solved exactly with the Concorde solver.</p>`,
  build(p) {
    const c = p.querySelector(".tsp-cv"), out = p.querySelector(".tsp-out"), dims = sized(c, 380); let P = [], T = null, msg = "";
    const d = (a, b) => Math.hypot(P[a][0] - P[b][0], P[a][1] - P[b][1]), len = t => t.reduce((s, v, i) => s + d(v, t[(i + 1) % t.length]), 0);
    function draw() { const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      if (T && T.length > 1) { ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); T.forEach((v, i) => { const [x, y] = P[v]; i ? ctx.lineTo(x * w, y * h) : ctx.moveTo(x * w, y * h); }); ctx.closePath(); ctx.stroke(); }
      P.forEach(([x, y]) => { ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(x * w, y * h, 5, 0, 7); ctx.fill(); });
      const n = P.length; let f = 1; for (let i = 3; i < n; i++) f *= i; out.innerHTML = `${n} cities · ${n > 2 ? `${f.toLocaleString("en", { maximumSignificantDigits: 4 })} possible tours` : "add cities"}${T ? `   tour length <b>${(len(T) * 100).toFixed(1)}</b>` : ""}${msg ? "<br>" + msg : ""}`; }
    function nn() { if (P.length < 3) return; const left = new Set(P.map((_, i) => i)); let cur = 0; T = [0]; left.delete(0); while (left.size) { let b = null, bd = 1e9; for (const j of left) if (d(cur, j) < bd) { bd = d(cur, j); b = j; } T.push(b); left.delete(b); cur = b; } }
    function twoOpt() { if (!T) nn(); if (!T) return; const n = T.length; let imp = true, k = 0; while (imp && k++ < 200) { imp = false;
      for (let i = 0; i < n - 1; i++) for (let j = i + 2; j < n; j++) { const a = T[i], b = T[i + 1], c2 = T[j], e = T[(j + 1) % n]; if (a === e) continue; if (d(a, c2) + d(b, e) < d(a, b) + d(c2, e) - 1e-12) { T.splice(i + 1, j - i, ...T.slice(i + 1, j + 1).reverse()); imp = true; } } } }
    function brute() { const n = P.length; if (n < 3) return; if (n > 9) { msg = '<span class="r">too many cities for brute force here — that is the whole point</span>'; return; }
      const rest = [...Array(n - 1)].map((_, i) => i + 1); let best = null, bl = 1e9, cnt = 0;
      const perm = (k) => { if (k === rest.length) { cnt++; const t = [0, ...rest], l = len(t); if (l < bl) { bl = l; best = t.slice(); } return; } for (let i = k; i < rest.length; i++) { [rest[k], rest[i]] = [rest[i], rest[k]]; perm(k + 1); [rest[k], rest[i]] = [rest[i], rest[k]]; } };
      perm(0); T = best; msg = `<span class="g">optimal — checked all ${cnt.toLocaleString("en")} orderings</span>`; }
    const act = (f, m) => () => { msg = m || ""; f(); draw(); };
    const scatter = n => { const g = rng(Date.now() & 0xffff); P = [...Array(n)].map(() => [.05 + .9 * g(), .06 + .88 * g()]); T = null; };
    p.querySelector(".tsp-rand").addEventListener("click", act(() => scatter(8)));
    p.querySelector(".tsp-rand2").addEventListener("click", act(() => scatter(40)));
    p.querySelector(".tsp-clear").addEventListener("click", act(() => { P = []; T = null; }));
    p.querySelector(".tsp-nn").addEventListener("click", act(nn, '<span class="t">nearest neighbour: always go to the closest unvisited city</span>'));
    p.querySelector(".tsp-2o").addEventListener("click", act(twoOpt, '<span class="t">2-opt: reverse any segment whose two end-edges cross, until none do</span>'));
    p.querySelector(".tsp-bf").addEventListener("click", act(brute));
    c.addEventListener("click", e => { const r = c.getBoundingClientRect(); P.push([(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height]); T = null; msg = ""; draw(); });
    this._go = () => { scatter(8); nn(); msg = '<span class="t">nearest neighbour tour — try 2-opt and brute force</span>'; draw(); };
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Sudoku backtracking */
const PUZ = ["530070000600195000098000060800060003400803001700020006060000280000419005000080079",
  "000000907000420180000705026100904000050000040000507009920108000034059000507000000",
  "800000000003600000070090200050007000000045700000100030001000068008500010090000400"];
let sdL = looper();
registerAtom({
  id: "sudoku", name: "Sudoku by backtracking", domain: "foundations", fields: ["computability"],
  html: `<h3>Sudoku by backtracking — search with the courage to undo</h3>
    <p class="ahint">The solver fills the first empty cell with the smallest legal digit and moves on; when a cell has no legal digit it backs up and tries the next digit in the previous cell. Watch it guess (gold) and retreat (red).</p>
    <div class="achips"><button class="achip sdk-p on" data-i="0">easy</button><button class="achip sdk-p" data-i="1">medium</button><button class="achip sdk-p" data-i="2">"world's hardest" (Inkala 2012)</button>
      <label class="achk">speed <input type="range" class="sdk-sp" min="1" max="400" value="30"></label><button class="achip sdk-fin">finish instantly</button></div>
    <canvas class="acv sdk-cv"></canvas>
    <div class="aout sdk-out"></div>
    <p class="awhy">Backtracking is depth-first search through a tree of partial solutions, pruning any branch that already breaks a rule. General n²×n² Sudoku is NP-complete (Yato & Seta, 2003), so no shortcut is known for every puzzle — but pruning makes 9×9 easy for a computer. McGuire, Tugemann and Civario proved in 2012, by an exhaustive computer search, that a Sudoku needs at least 17 clues to have a unique solution.</p>`,
  build(p) {
    const c = p.querySelector(".sdk-cv"), out = p.querySelector(".sdk-out"), dims = sized(c, 380); let G, fixed, it, steps, back, last, done, pi = 0;
    const ok = (g, i, v) => { const r = i / 9 | 0, cc = i % 9, br = r - r % 3, bc = cc - cc % 3; for (let k = 0; k < 9; k++) { if (g[r * 9 + k] === v || g[k * 9 + cc] === v || g[(br + (k / 3 | 0)) * 9 + bc + k % 3] === v) return false; } return true; };
    function* solve(g) { const E = []; g.forEach((v, i) => { if (!v) E.push(i); }); let k = 0;
      while (k >= 0 && k < E.length) { const i = E[k]; let v = g[i] + 1; g[i] = 0; while (v <= 9 && !ok(g, i, v)) v++;
        if (v <= 9) { g[i] = v; last = [i, "go"]; k++; } else { g[i] = 0; last = [i, "back"]; back++; k--; } steps++; yield; } done = k >= 0; }
    function draw() { const { ctx, w, h } = dims(), s = Math.min(w, h) / 9.4, x0 = (w - s * 9) / 2, y0 = (h - s * 9) / 2; ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < 81; i++) { const x = x0 + (i % 9) * s, y = y0 + (i / 9 | 0) * s; if (last && last[0] === i) { ctx.fillStyle = last[1] === "go" ? "rgba(245,196,81,.35)" : "rgba(255,107,90,.4)"; ctx.fillRect(x, y, s, s); }
        if (G[i]) { ctx.fillStyle = fixed[i] ? "#f2eefc" : C.teal; ctx.font = `${fixed[i] ? 600 : 400} ${s * .55}px 'IBM Plex Mono'`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(G[i], x + s / 2, y + s / 2 + 1); } }
      for (let k = 0; k <= 9; k++) { ctx.strokeStyle = k % 3 ? "rgba(255,255,255,.15)" : "rgba(255,255,255,.55)"; ctx.lineWidth = k % 3 ? 1 : 2; ctx.beginPath(); ctx.moveTo(x0 + k * s, y0); ctx.lineTo(x0 + k * s, y0 + 9 * s); ctx.moveTo(x0, y0 + k * s); ctx.lineTo(x0 + 9 * s, y0 + k * s); ctx.stroke(); }
      ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
      out.innerHTML = `${steps.toLocaleString("en")} steps · ${back.toLocaleString("en")} backtracks${done ? '   <span class="g">solved ✓</span>' : ""}   <span class="d">${G.filter((v, i) => !fixed[i] && v).length} of ${fixed.filter(x => !x).length} blanks currently filled</span>`; }
    function load(i) { pi = i; G = [...PUZ[i]].map(Number); fixed = G.map(Boolean); it = solve(G); steps = back = 0; last = null; done = false; p.querySelectorAll(".sdk-p").forEach(b => b.classList.toggle("on", +b.dataset.i === i)); draw(); sdL.start(); }
    sdL.fn = () => { if (!it) return; const sp = +p.querySelector(".sdk-sp").value; for (let t = 0; t < sp; t++) if (it.next().done) { it = null; break; } draw(); if (!it) sdL.stop(); };
    p.querySelectorAll(".sdk-p").forEach(b => b.addEventListener("click", () => load(+b.dataset.i)));
    p.querySelector(".sdk-fin").addEventListener("click", () => { if (!it) return; while (!it.next().done); it = null; last = null; draw(); });
    this._go = () => load(0);
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } else sdL.start(); }, stop() { sdL.stop(); }
});

/* ================================================================ Pancake sorting */
registerAtom({
  id: "pancake", name: "Pancake flipping", domain: "foundations", fields: ["computability", "enumerative"],
  html: `<h3>Pancake flipping — the only paper Bill Gates ever published</h3>
    <p class="ahint">Your only move: slide the spatula under a pancake (click it) and flip everything above. Sort the stack, largest at the bottom, in as few flips as you can — or let the simple algorithm do it.</p>
    <div class="achips"><label class="achk">pancakes <input type="range" class="pk-n" min="3" max="12" value="7"> <b class="pk-nv"></b></label>
      <button class="achip pk-new">new stack</button><button class="achip pk-auto">flip for me (next step)</button><button class="achip pk-all">solve</button></div>
    <canvas class="acv pk-cv" style="cursor:pointer"></canvas>
    <div class="aout pk-out"></div>
    <p class="awhy">The simple algorithm — flip the largest unsorted pancake to the top, then flip it down into place — takes at most 2n − 3 flips. How many flips the worst stack needs (the pancake number) is known only up to n = 19. In 1979 Bill Gates and Christos Papadimitriou proved at most (5n + 5)/3 flips suffice; the bound was improved in 2009 to 18n/11. Flips form a group action on permutations, and the question is the diameter of its Cayley graph.</p>`,
  build(p) {
    const c = p.querySelector(".pk-cv"), out = p.querySelector(".pk-out"), dims = sized(c, 340), nI = p.querySelector(".pk-n"); let S, flips, hover = -1, msg = "";
    const sorted = () => S.every((v, i) => v === i + 1); // index 0 = top
    const flip = k => { S = S.slice(0, k + 1).reverse().concat(S.slice(k + 1)); flips++; };
    function step() { if (sorted()) return; let m = S.length; while (m > 0 && S[m - 1] === m) m--; const at = S.indexOf(m);
      if (at === 0) { flip(m - 1); msg = `flip ${m} down into place`; } else { flip(at); msg = `bring pancake ${m} to the top`; } }
    const geo = () => { const { w, h } = dims(), n = S.length, ph = Math.min(28, (h - 40) / n); return { w, h, ph, y0: h - 20 - n * ph }; };
    function draw() { const { ctx } = dims(), { w, h, ph, y0 } = geo(), n = S.length; ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(255,255,255,.2)"; ctx.fillRect(w / 2 - w * .3, h - 18, w * .6, 4);
      S.forEach((v, i) => { const pw = 40 + v / n * (w * .5), x = w / 2 - pw / 2, y = y0 + i * ph; ctx.fillStyle = i <= hover ? C.gold : `hsl(${30 + v / n * 20},${50 + v * 3}%,${45 + v / n * 20}%)`;
        ctx.beginPath(); ctx.roundRect(x, y + 2, pw, ph - 4, ph / 2); ctx.fill(); ctx.fillStyle = "#1a0f22"; ctx.font = "11px 'IBM Plex Mono'"; ctx.textAlign = "center"; ctx.fillText(v, w / 2, y + ph / 2 + 4); });
      ctx.textAlign = "start"; const n2 = 2 * n - 3;
      out.innerHTML = sorted() ? `<span class="g">sorted in ${flips} flips!</span>   <span class="d">simple algorithm's worst case: ${n2}</span>` : `${flips} flips so far   <span class="d">${msg || "hover to preview a flip, click to do it"}</span>`; }
    const idx = e => { const r = c.getBoundingClientRect(), { ph, y0 } = geo(), i = Math.floor((e.clientY - r.top - y0) / ph); return i >= 0 && i < S.length ? i : -1; };
    c.addEventListener("mousemove", e => { hover = idx(e); draw(); }); c.addEventListener("mouseleave", () => { hover = -1; draw(); });
    c.addEventListener("click", e => { const i = idx(e); if (i > 0) { flip(i); msg = ""; draw(); } });
    const reset = () => { const n = +nI.value, g = rng(Date.now() & 0xffff); p.querySelector(".pk-nv").textContent = n; do { S = [...Array(n)].map((_, i) => i + 1).sort(() => g() - .5); } while (sorted()); flips = 0; msg = ""; draw(); };
    p.querySelector(".pk-new").addEventListener("click", reset); nI.addEventListener("change", reset);
    p.querySelector(".pk-auto").addEventListener("click", () => { step(); draw(); });
    p.querySelector(".pk-all").addEventListener("click", () => { while (!sorted()) step(); msg = ""; draw(); });
    this._go = reset;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Finite automaton: multiples of 3 */
let dfaL = looper();
registerAtom({
  id: "dfa", name: "A machine that divides by 3", domain: "foundations", fields: ["computability"],
  html: `<h3>A three-state machine that knows whether a number is divisible by 3</h3>
    <p class="ahint">Feed in binary digits one at a time. The machine has no memory except which of three circles it's in — the remainder so far — yet after any length of input it answers correctly. Reading a bit b takes remainder r to (2r + b) mod 3.</p>
    <div class="achips"><button class="achip dfa-b" data-b="0">feed 0</button><button class="achip dfa-b" data-b="1">feed 1</button><button class="achip dfa-clr">reset</button>
      <label class="achk">or type a number <input type="number" class="dfa-num" min="0" value="2026" style="width:7em"></label><button class="achip dfa-run">run it</button></div>
    <canvas class="acv dfa-cv"></canvas>
    <div class="aout dfa-out"></div>
    <p class="awhy">A finite automaton (Kleene, Rabin & Scott, 1950s) is the simplest model of computation: finitely many states, no scratch memory. The languages it can recognise — the regular languages — are exactly those described by regular expressions, the patterns in every text editor. It can check divisibility by any fixed number, but it cannot check whether brackets balance: that needs unbounded memory, the first rung on the ladder that ends at the Turing machine.</p>`,
  build(p) {
    const c = p.querySelector(".dfa-cv"), out = p.querySelector(".dfa-out"), dims = sized(c, 300); let st = 0, bits = "", queue = [], anim = null, t0 = 0;
    const pos = (s, w, h) => [w / 2 + [-1, 0, 1][s] * Math.min(w * .3, 200), h / 2 + 10];
    function arrow(ctx, a, b, bend, lab, hot) { ctx.strokeStyle = hot ? C.gold : "rgba(255,255,255,.35)"; ctx.lineWidth = hot ? 3 : 1.5; ctx.fillStyle = ctx.strokeStyle;
      if (a === b) { const [x, y] = a; ctx.beginPath(); ctx.arc(x, y - 44, 18, 0, 7); ctx.stroke(); ctx.font = "13px 'IBM Plex Mono'"; ctx.fillText(lab, x - 4, y - 68); return; }
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2 + bend, ang = Math.atan2(b[1] - my, b[0] - mx), ex = b[0] - 30 * Math.cos(ang), ey = b[1] - 30 * Math.sin(ang), sa = Math.atan2(my - a[1], mx - a[0]);
      ctx.beginPath(); ctx.moveTo(a[0] + 30 * Math.cos(sa), a[1] + 30 * Math.sin(sa)); ctx.quadraticCurveTo(mx, my, ex, ey); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(ex - 10 * Math.cos(ang - .4), ey - 10 * Math.sin(ang - .4)); ctx.lineTo(ex - 10 * Math.cos(ang + .4), ey - 10 * Math.sin(ang + .4)); ctx.fill();
      ctx.font = "13px 'IBM Plex Mono'"; ctx.fillText(lab, mx - 4, my + (bend > 0 ? 16 : -6)); }
    function draw() { const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const P = [0, 1, 2].map(s => pos(s, w, h)), hot = anim && anim.from !== undefined ? anim : null;
      // transitions: r --b--> (2r+b)%3
      const E = [[0, 0, "0"], [0, 1, "1"], [1, 0, "1"], [1, 2, "0"], [2, 1, "0"], [2, 2, "1"]];
      E.forEach(([a, b, l]) => { const bend = a === b ? 0 : a < b ? -50 : 50; arrow(ctx, P[a], P[b], Math.abs(a - b) === 2 ? bend * 2 : bend, l, hot && hot.from === a && hot.to === b); });
      [0, 1, 2].forEach(s => { const [x, y] = P[s], on = s === st; ctx.beginPath(); ctx.arc(x, y, 28, 0, 7); ctx.fillStyle = on ? (s === 0 ? "rgba(87,224,138,.35)" : "rgba(245,196,81,.3)") : "rgba(255,255,255,.05)"; ctx.fill();
        ctx.strokeStyle = on ? "#fff" : "rgba(255,255,255,.4)"; ctx.lineWidth = on ? 2.5 : 1.2; ctx.stroke(); if (s === 0) { ctx.beginPath(); ctx.arc(x, y, 23, 0, 7); ctx.stroke(); }
        ctx.fillStyle = "#f2eefc"; ctx.font = "15px 'IBM Plex Mono'"; ctx.textAlign = "center"; ctx.fillText("r=" + s, x, y + 5); ctx.textAlign = "start"; });
      const v = bits ? parseInt(bits.slice(-40), 2) : 0;
      out.innerHTML = `input <b>${bits || "—"}</b>${bits && bits.length <= 40 ? ` = ${v}` : ""}   state r = ${st}   ${bits ? (st === 0 ? '<span class="g">accept: divisible by 3</span>' : '<span class="r">reject: not divisible by 3</span>') : '<span class="d">start in r = 0 (double ring = accepting)</span>'}`; }
    function feed(b) { const from = st; st = (2 * st + b) % 3; bits += b; anim = { from, to: st }; t0 = performance.now(); draw(); }
    dfaL.fn = () => { if (queue.length && performance.now() - t0 > 550) feed(queue.shift()); else if (!queue.length && anim && performance.now() - t0 > 600) { anim = null; draw(); dfaL.stop(); } };
    p.querySelectorAll(".dfa-b").forEach(b => b.addEventListener("click", () => { queue = []; feed(+b.dataset.b); dfaL.start(); }));
    p.querySelector(".dfa-clr").addEventListener("click", () => { queue = []; st = 0; bits = ""; anim = null; draw(); });
    p.querySelector(".dfa-run").addEventListener("click", () => { const n = Math.max(0, Math.floor(+p.querySelector(".dfa-num").value || 0)); st = 0; bits = ""; anim = null; queue = [...n.toString(2)].map(Number); t0 = 0; draw(); dfaL.start(); });
    this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }, stop() { dfaL.stop(); }
});
})();
