/* ============================================================
   THE WEB OF MATHEMATICS — atoms-chance.js
   Probability & statistics (domain: probability)
     birthday · bayes · simpson · arctic
   ============================================================ */
(function () {
"use strict";
const { C, rng } = AtomKit;
const cv = (el, h) => AtomKit.canvas(el, h);
function sized(c, h) { let d = cv(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = cv(c, h); return d; }; }
function looper() {
  const L = { raf: null, fn: null,
    start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } },
    stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } };
  return L;
}
const chips = (p, sel, cb) => p.querySelectorAll(sel).forEach(b => b.addEventListener("click", () => { p.querySelectorAll(sel).forEach(x => x.classList.toggle("on", x === b)); cb(b); }));
const pct = x => (100 * x).toFixed(x < .001 ? 3 : 1) + "%";
function frame(ctx, w, h, xr, yr, opt = {}) {
  const L = opt.L || 40, R = w - (opt.R || 10), T = opt.T || 10, B = (opt.H || h) - 22;
  const X = x => L + (x - xr[0]) / (xr[1] - xr[0]) * (R - L), Y = y => B - (y - yr[0]) / (yr[1] - yr[0]) * (B - T);
  ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.lineWidth = 1;
  (opt.xt || []).forEach(x => { ctx.strokeStyle = "rgba(255,255,255,.07)"; ctx.beginPath(); ctx.moveTo(X(x), T); ctx.lineTo(X(x), B); ctx.stroke(); ctx.fillStyle = "#8d86a8"; ctx.fillText(opt.xl ? opt.xl(x) : x, X(x) - 8, B + 14); });
  (opt.yt || []).forEach(y => { ctx.strokeStyle = "rgba(255,255,255,.07)"; ctx.beginPath(); ctx.moveTo(L, Y(y)); ctx.lineTo(R, Y(y)); ctx.stroke(); ctx.fillStyle = "#8d86a8"; ctx.fillText(opt.yl ? opt.yl(y) : y, 2, Y(y) + 3); });
  ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(R, B); ctx.stroke();
  return { X, Y, L, R, T, B };
}

/* ================================================================ Birthday paradox */
const pShare = n => { let q = 1; for (let k = 0; k < n; k++) q *= (365 - k) / 365; return 1 - q; };
registerAtom({
  id: "birthday", name: "Birthday paradox", domain: "probability", fields: ["prob-spaces", "enumerative"],
  html: `<h3>The birthday paradox — 23 people, better than even odds</h3>
    <p class="ahint">How many people must be in a room before two probably share a birthday? Most guess about 180. The answer is 23, because what matters is the number of <i>pairs</i>: 23 people make 253 of them. Fill a room and see.</p>
    <div class="achips"><label class="achk">people <input type="range" class="bd-n" min="2" max="80" value="23" style="width:180px"> <b class="bd-nv">23</b></label>
      <button class="achip bd-room">new room</button><button class="achip bd-many">run 2,000 rooms</button></div>
    <canvas class="acv bd-cv"></canvas>
    <div class="aout bd-out"></div>
    <p class="awhy">The chance that n birthdays are all different is 365/365 × 364/365 × … × (365 − n + 1)/365, so a match has probability one minus that — 50.7% at n = 23, 97% at 50, 99.9% at 70. With N equally likely values, a repeat is expected after about √(πN/2) tries; cryptographers call this the birthday bound, and it is why a hash function with 128-bit output only resists collisions up to about 2⁶⁴ attempts. Real birthdays aren't uniform, which only makes matches likelier.</p>`,
  build(p) {
    const c = p.querySelector(".bd-cv"), out = p.querySelector(".bd-out"), dims = sized(c, 360), nI = p.querySelector(".bd-n"), R = rng(Date.now() & 0xffff);
    let room = [], sim = null;
    const newRoom = () => { room = Array.from({ length: +nI.value }, () => Math.floor(R() * 365)); draw(); };
    function draw() {
      const { ctx, w, h } = dims(), n = +nI.value; ctx.clearRect(0, 0, w, h); p.querySelector(".bd-nv").textContent = n;
      const { X, Y, B } = frame(ctx, w, h, [1, 80], [0, 1], { H: 220, xt: [10, 20, 23, 30, 40, 50, 60, 70, 80], yt: [0, .25, .5, .75, 1], yl: y => y * 100 + "%" });
      ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(245,196,81,.5)"; ctx.beginPath(); ctx.moveTo(X(1), Y(.5)); ctx.lineTo(X(80), Y(.5)); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = C.teal; ctx.lineWidth = 2.2; ctx.beginPath(); for (let k = 1; k <= 80; k++) k > 1 ? ctx.lineTo(X(k), Y(pShare(k))) : ctx.moveTo(X(k), Y(pShare(k))); ctx.stroke();
      ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(X(n), Y(pShare(n)), 6, 0, 7); ctx.fill();
      if (sim) { ctx.fillStyle = C.pink; ctx.beginPath(); ctx.arc(X(n), Y(sim), 4, 0, 7); ctx.fill(); }
      const cw = (w - 20) / 73, ch = Math.min(cw, 20), oy = 240, cnt = new Array(365).fill(0); room.forEach(d => cnt[d]++);
      for (let d = 0; d < 365; d++) { const x = 10 + (d % 73) * cw, y = oy + Math.floor(d / 73) * (ch + 3); ctx.fillStyle = cnt[d] > 1 ? "#ff5a5a" : cnt[d] ? C.gold : "rgba(255,255,255,.07)"; if (cnt[d] > 1) { ctx.shadowColor = "#ff5a5a"; ctx.shadowBlur = 10; } ctx.fillRect(x + .5, y, cw - 1.5, ch); ctx.shadowBlur = 0; }
      ctx.fillStyle = "#8d86a8"; ctx.fillText("the room: one cell per day of the year (red = shared)", 10, oy - 6);
      const shared = cnt.filter(v => v > 1).length, pairs = n * (n - 1) / 2;
      out.innerHTML = `${n} people make ${pairs} pairs.   P(some shared birthday) = <span class="g">${pct(pShare(n))}</span>${sim !== null ? `   2,000 simulated rooms: <span class="t">${pct(sim)}</span>` : ""}\nthis room: ${shared ? `<span class="r">${shared} shared day${shared > 1 ? "s" : ""}</span>` : "no match this time"}`;
    }
    nI.addEventListener("input", () => { sim = null; newRoom(); });
    p.querySelector(".bd-room").addEventListener("click", newRoom);
    p.querySelector(".bd-many").addEventListener("click", () => { const n = +nI.value; let hit = 0; for (let t = 0; t < 2000; t++) { const s = new Uint8Array(365); for (let k = 0; k < n; k++) { const d = Math.floor(R() * 365); if (s[d]) { hit++; break; } s[d] = 1; } } sim = hit / 2000; draw(); });
    this._go = newRoom;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Bayes */
function lgamma(x) { const g = 7, c = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
  if (x < .5) return Math.log(Math.PI / Math.sin(Math.PI * x)) - lgamma(1 - x); x -= 1; let a = c[0]; const t = x + g + .5; for (let i = 1; i < 9; i++) a += c[i] / (x + i); return .5 * Math.log(2 * Math.PI) + (x + .5) * Math.log(t) - t + Math.log(a); }
const betaPdf = (x, a, b) => x <= 0 || x >= 1 ? 0 : Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) + lgamma(a + b) - lgamma(a) - lgamma(b));
registerAtom({
  id: "bayes", name: "Bayes' theorem", domain: "probability", fields: ["statistics", "prob-spaces"],
  html: `<h3>Bayes' theorem — learning from evidence</h3>
    <p class="ahint">Start with a belief, see data, update. <b>Coin</b>: a coin has an unknown bias p; your belief about p is a curve, and every flip reshapes it. <b>Medical test</b>: why a positive result from a good test can still mean you are probably healthy.</p>
    <div class="achips"><button class="achip by-m on" data-m="coin">coin with a Beta prior</button><button class="achip by-m" data-m="test">medical test</button></div>
    <div class="by-coin"><div class="achips"><button class="achip by-f" data-k="1">flip 1</button><button class="achip by-f" data-k="10">flip 10</button><button class="achip by-f" data-k="100">flip 100</button><button class="achip by-new">new coin</button><button class="achip by-rev">reveal true p</button>
      <label class="achk">prior α <input type="range" class="by-a" min="0.5" max="20" step="0.5" value="1"> <b class="by-av">1</b></label><label class="achk">β <input type="range" class="by-b" min="0.5" max="20" step="0.5" value="1"> <b class="by-bv">1</b></label></div></div>
    <div class="by-test" hidden><div class="achips"><label class="achk">disease is <input type="range" class="by-prev" min="0.001" max="0.3" step="0.001" value="0.01"> <b class="by-pv"></b> common</label>
      <label class="achk">test catches <input type="range" class="by-sens" min="0.5" max="0.999" step="0.001" value="0.9"> <b class="by-sv"></b> of the sick</label>
      <label class="achk">false alarm rate <input type="range" class="by-fp" min="0.001" max="0.3" step="0.001" value="0.09"> <b class="by-fv"></b></label></div></div>
    <canvas class="acv by-cv"></canvas>
    <div class="aout by-out"></div>
    <p class="awhy">Thomas Bayes's essay was published in 1763, after his death, by Richard Price; Laplace made the idea a working method (1774, 1812). P(H | E) = P(E | H) P(H) / P(E): the chance of the hypothesis after the evidence depends on how likely the evidence is under it — and on how likely the hypothesis was to begin with. Forgetting that base rate is the most common error in reading medical tests and courtroom statistics. With a Beta(α, β) prior and h heads in n flips, the posterior is simply Beta(α + h, β + n − h).</p>`,
  build(p) {
    const c = p.querySelector(".by-cv"), out = p.querySelector(".by-out"), dims = sized(c, 330), R = rng((Date.now() >> 3) & 0xffff);
    const aI = p.querySelector(".by-a"), bI = p.querySelector(".by-b");
    let mode = "coin", truth = R(), heads = 0, flips = 0, reveal = false;
    function drawCoin() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const a = +aI.value, b = +bI.value, A = a + heads, Bq = b + flips - heads, N = 400, xs = [], pr = [], po = [];
      p.querySelector(".by-av").textContent = a; p.querySelector(".by-bv").textContent = b;
      for (let i = 1; i < N; i++) { const x = i / N; xs.push(x); pr.push(betaPdf(x, a, b)); po.push(betaPdf(x, A, Bq)); }
      const ymax = Math.max(1.5, ...po.filter(isFinite), ...pr.filter(v => isFinite(v) && v < 50)) * 1.08;
      const { X, Y, B } = frame(ctx, w, h, [0, 1], [0, ymax], { xt: [0, .25, .5, .75, 1] });
      let cum = 0; const tot = po.reduce((s, v) => s + v, 0), cdf = po.map(v => (cum += v) / tot), lo = xs[cdf.findIndex(v => v >= .025)], hi = xs[cdf.findIndex(v => v >= .975)];
      ctx.fillStyle = "rgba(245,196,81,.12)"; ctx.fillRect(X(lo), 10, X(hi) - X(lo), B - 10);
      const path = (ys, col, lw, fill) => { ctx.beginPath(); ctx.moveTo(X(0), Y(0)); xs.forEach((x, i) => ctx.lineTo(X(x), Y(Math.min(ymax, ys[i])))); ctx.lineTo(X(1), Y(0)); if (fill) { ctx.fillStyle = fill; ctx.fill(); } ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); };
      path(pr, "rgba(180,140,255,.7)", 1.5); path(po, C.gold, 2.4, "rgba(245,196,81,.18)");
      if (reveal) { ctx.setLineDash([5, 4]); ctx.strokeStyle = C.pink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(X(truth), 10); ctx.lineTo(X(truth), B); ctx.stroke(); ctx.setLineDash([]); }
      ctx.fillStyle = "#b48cff"; ctx.fillText("prior", w - 150, 22); ctx.fillStyle = C.gold; ctx.fillText("posterior (95% band shaded)", w - 150, 36);
      out.innerHTML = `${flips} flips: ${heads} heads, ${flips - heads} tails   posterior = Beta(${A}, ${Bq})\nbest guess for p: <span class="g">${(A / (A + Bq)).toFixed(3)}</span>   95% credible interval: [${lo.toFixed(3)}, ${hi.toFixed(3)}]${reveal ? `   true p = <span class="r">${truth.toFixed(3)}</span>` : ""}\n<span class="d">a strong prior (large α, β) needs more data to move; with enough flips every reasonable prior ends in the same place</span>`;
    }
    function drawTest() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const prev = +p.querySelector(".by-prev").value, sens = +p.querySelector(".by-sens").value, fp = +p.querySelector(".by-fp").value;
      p.querySelector(".by-pv").textContent = pct(prev); p.querySelector(".by-sv").textContent = pct(sens); p.querySelector(".by-fv").textContent = pct(fp);
      const N = 1000, sick = Math.round(N * prev), tp = Math.round(sick * sens), fpN = Math.round((N - sick) * fp);
      const cols = 50, rows = 20, s = Math.min((w - 20) / cols, (h - 40) / rows), ox = (w - cols * s) / 2;
      for (let i = 0; i < N; i++) {
        const x = ox + (i % cols) * s, y = 8 + Math.floor(i / cols) * s, isSick = i < sick, pos = isSick ? i < tp : i - sick < fpN;
        ctx.fillStyle = isSick ? (pos ? "#ff5a5a" : "#ff9d3c") : (pos ? C.gold : "rgba(255,255,255,.1)");
        ctx.beginPath(); ctx.arc(x + s / 2, y + s / 2, s * .38, 0, 7); ctx.fill();
      }
      const post = tp / Math.max(1, tp + fpN), exact = prev * sens / (prev * sens + (1 - prev) * fp);
      ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillStyle = "#ff5a5a"; ctx.fillText("● sick, tests positive", 12, h - 10); ctx.fillStyle = "#ff9d3c"; ctx.fillText("● sick, missed", 190, h - 10); ctx.fillStyle = C.gold; ctx.fillText("● healthy, false alarm", 310, h - 10);
      out.innerHTML = `of 1,000 people: ${sick} sick → ${tp} test positive;  ${N - sick} healthy → ${fpN} false alarms\nP(sick | positive) = ${tp} / (${tp} + ${fpN}) ≈ <span class="g">${pct(post)}</span>   Bayes exactly: <span class="t">${pct(exact)}</span>\n<span class="d">a positive result from a rare condition is mostly false alarms — the base rate dominates</span>`;
    }
    const draw = () => mode === "coin" ? drawCoin() : drawTest();
    chips(p, ".by-m", b => { mode = b.dataset.m; p.querySelector(".by-coin").hidden = mode !== "coin"; p.querySelector(".by-test").hidden = mode !== "test"; draw(); });
    p.querySelectorAll(".by-f").forEach(b => b.addEventListener("click", () => { for (let k = 0; k < +b.dataset.k; k++) { flips++; if (R() < truth) heads++; } draw(); }));
    p.querySelector(".by-new").addEventListener("click", () => { truth = R(); heads = flips = 0; reveal = false; p.querySelector(".by-rev").classList.remove("on"); draw(); });
    p.querySelector(".by-rev").addEventListener("click", e => { reveal = !reveal; e.target.classList.toggle("on", reveal); draw(); });
    p.querySelectorAll("input[type=range]").forEach(i => i.addEventListener("input", draw));
    this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Simpson's paradox */
const KS = { A: [81 / 87, 192 / 263], B: [234 / 270, 55 / 80] };
registerAtom({
  id: "simpson", name: "Simpson's paradox", domain: "probability", fields: ["statistics"],
  html: `<h3>Simpson's paradox — better in every group, worse overall</h3>
    <p class="ahint">A real study (Charig et al., 1986) compared two kidney-stone treatments. Treatment A did better for small stones <i>and</i> for large stones — yet worse overall. The trick: A was given mostly to the hard, large-stone cases. Slide how the hard cases are shared out and watch the totals flip.</p>
    <div class="achips"><label class="achk">A's patients with large stones <input type="range" class="sp-a" min="0" max="1" step="0.01" value="0.75"> <b class="sp-av"></b></label>
      <label class="achk">B's <input type="range" class="sp-b" min="0" max="1" step="0.01" value="0.23"> <b class="sp-bv"></b></label>
      <button class="achip sp-real on">the real study</button><button class="achip sp-fair">randomised (same mix)</button></div>
    <canvas class="acv sp-cv"></canvas>
    <div class="aout sp-out"></div>
    <p class="awhy">Each treatment's overall rate is a weighted average of its two group rates, and the weights — who got which treatment — can differ. Stone size was a confounder: it made a patient both likelier to get A and likelier to fail. Karl Pearson and Udny Yule saw the effect around 1900; Edward Simpson described it in 1951. Randomised trials exist to break exactly this link, and Judea Pearl's causal diagrams say when to split the data and when not to.</p>`,
  build(p) {
    const c = p.querySelector(".sp-cv"), out = p.querySelector(".sp-out"), dims = sized(c, 330), aI = p.querySelector(".sp-a"), bI = p.querySelector(".sp-b");
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const xa = +aI.value, xb = +bI.value, ra = (1 - xa) * KS.A[0] + xa * KS.A[1], rb = (1 - xb) * KS.B[0] + xb * KS.B[1];
      p.querySelector(".sp-av").textContent = Math.round(xa * 100) + "%"; p.querySelector(".sp-bv").textContent = Math.round(xb * 100) + "%";
      const { X, Y } = frame(ctx, w, h, [0, 1], [.6, 1], { L: 44, xt: [0, .25, .5, .75, 1], xl: x => x * 100 + "%", yt: [.6, .7, .8, .9, 1], yl: y => Math.round(y * 100) + "%" });
      const line = (r, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(X(0), Y(r[0])); ctx.lineTo(X(1), Y(r[1])); ctx.stroke(); };
      line(KS.A, C.teal); line(KS.B, C.pink);
      const dot = (x, r, col, lab) => { ctx.fillStyle = col; ctx.shadowColor = col; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(X(x), Y(r), 8, 0, 7); ctx.fill(); ctx.shadowBlur = 0; ctx.fillStyle = "#fff"; ctx.font = "600 11px 'IBM Plex Mono', monospace"; ctx.fillText(lab, X(x) + 11, Y(r) - 8); };
      dot(xa, ra, C.teal, "A overall " + (ra * 100).toFixed(1) + "%"); dot(xb, rb, C.pink, "B overall " + (rb * 100).toFixed(1) + "%");
      ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.fillText("success rate against the share of hard (large-stone) cases — A's line is above B's everywhere", 48, 22);
      const flip = ra < rb;
      out.innerHTML = `small stones:  A ${(KS.A[0] * 100).toFixed(1)}%  vs  B ${(KS.B[0] * 100).toFixed(1)}%   <span class="t">A better</span>\nlarge stones:  A ${(KS.A[1] * 100).toFixed(1)}%  vs  B ${(KS.B[1] * 100).toFixed(1)}%   <span class="t">A better</span>\noverall:       A ${(ra * 100).toFixed(1)}%  vs  B ${(rb * 100).toFixed(1)}%   ${flip ? '<span class="r">B looks better — the paradox</span>' : '<span class="t">A better, as it should be</span>'}`;
    }
    [aI, bI].forEach(i => i.addEventListener("input", () => { p.querySelectorAll(".sp-real,.sp-fair").forEach(x => x.classList.remove("on")); draw(); }));
    chips(p, ".sp-real,.sp-fair", b => { if (b.classList.contains("sp-real")) { aI.value = 263 / 350; bI.value = 80 / 350; } else { aI.value = bI.value = .49; } draw(); });
    this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Arctic circle */
const azIn = (x, y, n) => Math.abs(x + .5) + Math.abs(y + .5) <= n;
function azStep(D, n, rnd) {
  const occ = new Map(), hor = q => q.d === "N" || q.d === "S";
  D.forEach((q, i) => { occ.set(q.x + "," + q.y, i); occ.set(hor(q) ? (q.x + 1) + "," + q.y : q.x + "," + (q.y + 1), i); });
  const dead = new Set();
  D.forEach((a, i) => {
    if (a.d === "N") { const j = occ.get(a.x + "," + (a.y + 1)); if (j !== undefined && D[j].d === "S" && D[j].x === a.x) { dead.add(i); dead.add(j); } }
    if (a.d === "E") { const j = occ.get((a.x + 1) + "," + a.y); if (j !== undefined && D[j].d === "W" && D[j].y === a.y) { dead.add(i); dead.add(j); } }
  });
  const M = D.filter((_, i) => !dead.has(i)).map(q => ({ x: q.x + (q.d === "E") - (q.d === "W"), y: q.y + (q.d === "N") - (q.d === "S"), d: q.d }));
  const m = n + 1, busy = new Set(); M.forEach(q => { busy.add(q.x + "," + q.y); busy.add(hor(q) ? (q.x + 1) + "," + q.y : q.x + "," + (q.y + 1)); });
  for (let y = -m; y < m; y++) for (let x = -m; x < m; x++) {
    if (((x + y + m) % 2 + 2) % 2 !== 1) continue;
    if (![[x, y], [x + 1, y], [x, y + 1], [x + 1, y + 1]].every(([a, b]) => azIn(a, b, m) && !busy.has(a + "," + b))) continue;
    busy.add(x + "," + y); busy.add((x + 1) + "," + y); busy.add(x + "," + (y + 1)); busy.add((x + 1) + "," + (y + 1));
    if (rnd() < .5) M.push({ x, y: y + 1, d: "N" }, { x, y, d: "S" }); else M.push({ x, y, d: "W" }, { x: x + 1, y, d: "E" });
  }
  return M;
}
const az = looper();
registerAtom({
  id: "arctic", name: "Arctic circle", domain: "probability", fields: ["enumerative", "stochastic-processes", "random-matrices"],
  html: `<h3>The arctic circle — a random tiling that freezes into order</h3>
    <p class="ahint">Tile a diamond-shaped region (the Aztec diamond) with dominoes, choosing uniformly at random among all possible tilings. Inside a circle the tiling is a random jumble; outside it, in the four corners, it is frozen into brick-wall order. The circle appears sharper as the diamond grows. Colours show which way each domino faces.</p>
    <div class="achips"><label class="achk">grow to size <input type="range" class="az-n" min="10" max="150" step="1" value="90"> <b class="az-nv">90</b></label><button class="achip az-go">▶ grow a new tiling</button><button class="achip az-c on">show the circle</button></div>
    <canvas class="acv az-cv"></canvas>
    <div class="aout az-out"></div>
    <p class="awhy">The Aztec diamond of size n has 2^(n(n+1)/2) domino tilings (Elkies, Kuperberg, Larsen and Propp, 1992); their "domino shuffling" grows a perfectly uniform random tiling one size at a time, which is what runs here. Jockusch, Propp and Shor proved in 1995 that the boundary between order and chaos tends to the inscribed circle. The wiggles of that boundary follow the same Tracy–Widom law as the largest eigenvalue of a random matrix (Johansson, 2005).</p>`,
  build(p) {
    const c = p.querySelector(".az-cv"), out = p.querySelector(".az-out"), dims = sized(c, 440), nI = p.querySelector(".az-n");
    let D = [], n = 0, target = 90, circ = true, R = rng(Date.now() & 0xffff), dirty = true, lw = 0;
    const COLS = { N: C.gold, S: C.teal, E: C.pink, W: C.violet };
    const grow = () => { D = []; n = 0; target = +nI.value; R = rng((Date.now() * 7) & 0xffffff); };
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); if (!n) return;
      const s = Math.min(w, h - 8) / (2 * n), cx = w / 2, cy = h / 2;
      for (const q of D) { const hz = q.d === "N" || q.d === "S"; ctx.fillStyle = COLS[q.d]; ctx.fillRect(cx + q.x * s, cy - (q.y + 1) * s - (hz ? 0 : s), (hz ? 2 : 1) * s - (s > 3 ? 1 : 0), (hz ? 1 : 2) * s - (s > 3 ? 1 : 0)); }
      if (circ) { ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 1.6; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.arc(cx, cy, n * s / Math.SQRT2, 0, 7); ctx.stroke(); ctx.setLineDash([]); }
      const lg = n * (n + 1) / 2 * Math.log10(2);
      out.innerHTML = `size ${n}: ${D.length} dominoes   number of possible tilings 2^${n * (n + 1) / 2} ≈ 10^${Math.floor(lg)}${n < target ? "   growing…" : ""}\n<span class="d">gold/teal: horizontal dominoes · pink/violet: vertical — each frozen corner is a single colour</span>`;
    }
    az.fn = () => { if (n < target) { const k = n < 60 ? 2 : 1; for (let i = 0; i < k && n < target; i++) { D = azStep(D, n, R); n++; } dirty = true; } if (c.clientWidth !== lw) { lw = c.clientWidth; dirty = true; } if (dirty) { dirty = false; draw(); } };
    nI.addEventListener("input", () => { p.querySelector(".az-nv").textContent = nI.value; });
    nI.addEventListener("change", grow);
    p.querySelector(".az-go").addEventListener("click", grow);
    p.querySelector(".az-c").addEventListener("click", e => { circ = !circ; e.target.classList.toggle("on", circ); dirty = true; });
    grow();
  },
  start() { az.start(); }, stop() { az.stop(); }
});
})();
