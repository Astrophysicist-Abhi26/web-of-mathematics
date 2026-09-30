/* ============================================================
   THE WEB OF MATHEMATICS — atoms-stats.js
   Statistics (domain: probability)
     anscombe · tanks · selection · overfit
   ============================================================ */
(function () {
"use strict";
const { C, rng } = AtomKit;
function sized(c, h) { let d = AtomKit.canvas(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = AtomKit.canvas(c, h); return d; }; }
const chips = (p, sel, cb) => p.querySelectorAll(sel).forEach(b => b.addEventListener("click", () => { p.querySelectorAll(sel).forEach(x => x.classList.toggle("on", x === b)); cb(b); }));
const mean = a => a.reduce((s, x) => s + x, 0) / a.length;
const vari = a => { const m = mean(a); return a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1); };
const corr = (x, y) => { const mx = mean(x), my = mean(y); let sxy = 0, sxx = 0, syy = 0; x.forEach((v, i) => { sxy += (v - mx) * (y[i] - my); sxx += (v - mx) ** 2; syy += (y[i] - my) ** 2; }); return sxy / Math.sqrt(sxx * syy); };
const gauss = R => Math.sqrt(-2 * Math.log(1 - R())) * Math.cos(2 * Math.PI * R());
function axes(ctx, x0, y0, w, h, xr, yr) { const X = x => x0 + (x - xr[0]) / (xr[1] - xr[0]) * w, Y = y => y0 + h - (y - yr[0]) / (yr[1] - yr[0]) * h; ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y0 + h); ctx.lineTo(x0 + w, y0 + h); ctx.stroke(); return { X, Y }; }

/* ================================================================ Anscombe's quartet */
const AX = [10, 8, 13, 9, 11, 14, 6, 4, 12, 7, 5];
const ANS = [[AX, [8.04, 6.95, 7.58, 8.81, 8.33, 9.96, 7.24, 4.26, 10.84, 4.82, 5.68]], [AX, [9.14, 8.14, 8.74, 8.77, 9.26, 8.10, 6.13, 3.10, 9.13, 7.26, 4.74]],
  [AX, [7.46, 6.77, 12.74, 7.11, 7.81, 8.84, 6.08, 5.39, 8.15, 6.42, 5.73]], [[8, 8, 8, 8, 8, 8, 8, 19, 8, 8, 8], [6.58, 5.76, 7.71, 8.84, 8.47, 7.04, 5.25, 12.50, 5.56, 7.91, 6.89]]];
registerAtom({
  id: "anscombe", name: "Anscombe's quartet", domain: "probability", fields: ["statistics"],
  html: `<h3>Anscombe's quartet — four data sets with identical statistics</h3>
    <p class="ahint">Each panel has 11 points. Their means, variances, correlation and best-fit line agree to two decimal places — yet one is a straight trend, one a curve, one a line with an outlier, and one is a single lever point. Always plot your data.</p>
    <canvas class="acv an-cv"></canvas>
    <div class="aout an-out"></div>
    <p class="awhy">Francis Anscombe built the quartet in 1973 to show that summary statistics can hide everything that matters. In 2017 Justin Matejka and George Fitzmaurice went further with the "Datasaurus Dozen": thirteen data sets, one shaped like a dinosaur, with the same means, standard deviations and correlation to two decimals.</p>`,
  build(p) {
    const c = p.querySelector(".an-cv"), out = p.querySelector(".an-out"), dims = sized(c, 360);
    const draw = () => { const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const pw = (w - 30) / 4, rows = [];
      ANS.forEach(([x, y], k) => { const x0 = 18 + k * pw, { X, Y } = axes(ctx, x0 + 8, 20, pw - 26, h - 60, [2, 20], [2, 14]);
        const mx = mean(x), my = mean(y), b = corr(x, y) * Math.sqrt(vari(y) / vari(x)), a = my - b * mx;
        ctx.strokeStyle = "rgba(255,122,200,.8)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(X(3), Y(a + 3 * b)); ctx.lineTo(X(19), Y(a + 19 * b)); ctx.stroke();
        ctx.fillStyle = [C.gold, C.teal, C.blue, C.green][k]; x.forEach((v, i) => { ctx.beginPath(); ctx.arc(X(v), Y(y[i]), 4, 0, 7); ctx.fill(); });
        ctx.fillStyle = "#cfc9e4"; ctx.font = "600 12px 'IBM Plex Mono', monospace"; ctx.fillText(["I", "II", "III", "IV"][k], x0 + 12, 14);
        rows.push(`${["I  ", "II ", "III", "IV "][k]}  mean x ${mx.toFixed(2)}  mean y ${my.toFixed(2)}  var x ${vari(x).toFixed(2)}  var y ${vari(y).toFixed(2)}  r ${corr(x, y).toFixed(3)}  line y = ${a.toFixed(2)} + ${b.toFixed(3)}x`); });
      out.innerHTML = rows.join("\n"); };
    this._go = draw;
  },
  start() { if (this._go) this._go(); }
});

/* ================================================================ German tank problem & capture–recapture */
registerAtom({
  id: "tanks", name: "German tanks & fish in a lake", domain: "probability", fields: ["statistics"],
  html: `<h3>Counting what you cannot count</h3>
    <p class="ahint"><b>Tanks</b>: the enemy numbers its tanks 1, 2, …, N. You capture a few and read their serial numbers. How big is N? <b>Fish</b>: catch, tag and release M fish; later catch C and count how many are tagged. Both estimates come from simple reasoning about a sample — and both beat guesswork.</p>
    <div class="achips"><button class="achip tk-m on" data-m="tank">German tank problem</button><button class="achip tk-m" data-m="fish">capture–recapture</button><button class="achip tk-go">▶ new sample</button>
      <label class="achk">sample size <input type="range" class="tk-k" min="2" max="30" value="5"> <b class="tk-kv"></b></label></div>
    <canvas class="acv tk-cv"></canvas>
    <div class="aout tk-out"></div>
    <p class="awhy">Allied statisticians used the serial numbers on captured German tanks and parts to estimate production; Ruggles and Brodie (1947) compared the estimates with German records after the war — for June 1941 the statistical estimate was 244 tanks a month, intelligence had said 1,550, and the true figure was 271. The best unbiased estimate from k serials with largest value m is m + m/k − 1: the largest serial plus the average gap. Capture–recapture (Lincoln–Petersen) estimates N ≈ M·C/R, assuming the tagged fish mix back in evenly; it is used for wildlife, and for counting hidden populations such as war casualties.</p>`,
  build(p) {
    const c = p.querySelector(".tk-cv"), out = p.querySelector(".tk-out"), dims = sized(c, 330), kI = p.querySelector(".tk-k");
    let mode = "tank", N = 0, R = rng(Date.now() & 0xffff);
    function draw() {
      const k = +kI.value, { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); p.querySelector(".tk-kv").textContent = k;
      if (mode === "tank") {
        N = 150 + Math.floor(R() * 350); const all = [...Array(N).keys()].map(i => i + 1); for (let i = N - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [all[i], all[j]] = [all[j], all[i]]; }
        const s = all.slice(0, k).sort((a, b) => a - b), m = s[k - 1], est = m + m / k - 1, naive = m, dbl = 2 * mean(s) - 1;
        // sampling distribution of the estimators, 3000 repeats
        const sims = [[], []]; for (let t = 0; t < 3000; t++) { let mx = 0, sm = 0; const seen = new Set(); while (seen.size < k) { const v = 1 + Math.floor(R() * N); if (!seen.has(v)) { seen.add(v); mx = Math.max(mx, v); sm += v; } } sims[0].push(mx + mx / k - 1); sims[1].push(2 * sm / k - 1); }
        const { X } = axes(ctx, 30, 20, w - 60, 40, [0, N * 1.6], [0, 1]);
        s.forEach(v => { ctx.fillStyle = C.gold; ctx.fillRect(X(v) - 1.5, 26, 3, 34); ctx.font = "10px 'IBM Plex Mono', monospace"; }); ctx.fillStyle = "#cfc9e4"; ctx.fillText("captured serial numbers", 34, 16);
        const bins = 60, H0 = h - 110, drawHist = (arr, col, off) => { const cnt = new Array(bins).fill(0); arr.forEach(v => { const b = Math.floor(v / (N * 1.6) * bins); if (b >= 0 && b < bins) cnt[b]++; }); const mx = Math.max(...cnt); cnt.forEach((v, b) => { ctx.fillStyle = col; ctx.fillRect(X(b / bins * N * 1.6) + off, h - 22 - v / mx * H0, (w - 60) / bins / 2 - 1, v / mx * H0); }); };
        drawHist(sims[0], "rgba(63,208,201,.75)", 0); drawHist(sims[1], "rgba(255,122,200,.6)", (w - 60) / bins / 2);
        ctx.strokeStyle = "#fff"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(X(N), 70); ctx.lineTo(X(N), h - 22); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = "#fff"; ctx.fillText("true N", X(N) + 4, 84);
        ctx.fillStyle = C.teal; ctx.fillText("m + m/k − 1 over 3,000 samples", w - 250, 84); ctx.fillStyle = C.pink; ctx.fillText("2·mean − 1 over 3,000 samples", w - 250, 98);
        out.innerHTML = `your ${k} serials: ${s.join(", ")}\nlargest m = ${m} (always too low)   2·mean − 1 = ${dbl.toFixed(0)}   <span class="g">m + m/k − 1 = ${est.toFixed(0)}</span>   true N = <span class="t">${N}</span>\n<span class="d">the teal spread is narrower: the maximum carries more information than the mean</span>`;
      } else {
        N = 300 + Math.floor(R() * 900); const M = 60, Cc = 20 + 4 * k, tagged = new Set(); while (tagged.size < M) tagged.add(Math.floor(R() * N));
        const catchS = new Set(); while (catchS.size < Cc) catchS.add(Math.floor(R() * N)); const Rr = [...catchS].filter(i => tagged.has(i)).length;
        const pos = i => { const R2 = rng(i * 7 + 3); return [20 + R2() * (w - 40), 20 + R2() * (h - 50)]; };
        for (let i = 0; i < N; i++) { const [x, y] = pos(i), inC = catchS.has(i), tg = tagged.has(i); ctx.fillStyle = tg ? C.gold : "rgba(122,168,255,.35)"; ctx.globalAlpha = inC ? 1 : .6; ctx.beginPath(); ctx.ellipse(x, y, inC ? 5 : 3, inC ? 3 : 2, .3, 0, 7); ctx.fill(); if (inC) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 1; ctx.stroke(); } }
        ctx.globalAlpha = 1;
        out.innerHTML = `tagged first: M = ${M} (gold)   second catch: C = ${Cc} (outlined)   tagged in the second catch: R = ${Rr}\nestimate N ≈ M·C/R = <span class="g">${Rr ? (M * Cc / Rr).toFixed(0) : "∞ — no tagged fish caught, catch more"}</span>   true number of fish: <span class="t">${N}</span>`;
      }
    }
    chips(p, ".tk-m", b => { mode = b.dataset.m; draw(); });
    p.querySelector(".tk-go").addEventListener("click", draw); kI.addEventListener("change", draw);
    this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Selection bias: Berkson & Wald */
registerAtom({
  id: "selection", name: "Selection bias: Berkson & Wald", domain: "probability", fields: ["statistics"],
  html: `<h3>Selection bias — patterns created by who gets counted</h3>
    <p class="ahint"><b>Berkson</b>: in the whole population, talent and charm are unrelated. Keep only people who are talented <i>or</i> charming enough to be famous, and among the famous the two look negatively correlated. <b>Wald</b>: which parts of returning bombers should be armoured — the parts full of holes, or the parts without?</p>
    <div class="achips"><button class="achip se-m on" data-m="berk">Berkson's paradox</button><button class="achip se-m" data-m="wald">Wald's bombers</button><label class="achk se-tl">fame threshold <input type="range" class="se-t" min="0" max="2.5" step="0.05" value="1.4"></label><button class="achip se-sh" hidden>show the planes that did not return</button></div>
    <canvas class="acv se-cv"></canvas>
    <div class="aout se-out"></div>
    <p class="awhy">Joseph Berkson noticed in 1946 that two diseases can look associated in hospital patients simply because either one gets you admitted. Abraham Wald, working for the Statistical Research Group in New York during the Second World War, pointed out that the bullet holes on returning planes show where a plane can be hit and still come home; the armour belongs where the returning planes have no holes. Both are survivorship or collider bias: conditioning on an outcome manufactures a pattern.</p>`,
  build(p) {
    const c = p.querySelector(".se-cv"), out = p.querySelector(".se-out"), dims = sized(c, 340), tI = p.querySelector(".se-t");
    let mode = "berk", showLost = false; const R = rng(11), P = [...Array(900)].map(() => [gauss(R), gauss(R)]);
    const hits = [...Array(420)].map(() => { const zone = R(); return zone < .5 ? [(R() - .5) * 1.6, (R() - .5) * .25, "wing"] : zone < .8 ? [(R() - .5) * .25, (R() - .3) * 1.3, "body"] : zone < .9 ? [(R() - .5) * .3, -.62 + (R() - .5) * .12, "engine"] : [(R() - .5) * .5, .62 + (R() - .5) * .1, "tail"]; });
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      if (mode === "berk") {
        const T = +tI.value, { X, Y } = axes(ctx, 40, 14, w - 70, h - 44, [-3.2, 3.2], [-3.2, 3.2]), sel = P.filter(([a, b]) => a + b > T);
        ctx.fillStyle = "#8d86a8"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText("talent →", w - 90, h - 16); ctx.save(); ctx.translate(14, 80); ctx.rotate(-Math.PI / 2); ctx.fillText("charm →", 0, 0); ctx.restore();
        P.forEach(([a, b]) => { const s = a + b > T; ctx.fillStyle = s ? C.gold : "rgba(122,168,255,.28)"; ctx.beginPath(); ctx.arc(X(a), Y(b), s ? 3.2 : 2.4, 0, 7); ctx.fill(); });
        ctx.strokeStyle = "rgba(255,122,200,.7)"; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(X(-3.2), Y(T + 3.2)); ctx.lineTo(X(3.2), Y(T - 3.2)); ctx.stroke(); ctx.setLineDash([]);
        out.innerHTML = `whole population: correlation r = <span class="t">${corr(P.map(q => q[0]), P.map(q => q[1])).toFixed(3)}</span> (no relation)\nonly the "famous" (gold, talent + charm above the line): r = <span class="r">${corr(sel.map(q => q[0]), sel.map(q => q[1])).toFixed(3)}</span> among ${sel.length} people — a negative correlation made by selection alone`;
      } else {
        const cx = w / 2, cy = h / 2, s = Math.min(w, h) * .42, plane = (col) => { ctx.fillStyle = col; ctx.beginPath(); ctx.ellipse(cx, cy, s * .09, s * .7, 0, 0, 7); ctx.fill(); ctx.beginPath(); ctx.moveTo(cx - s * .95, cy); ctx.lineTo(cx + s * .95, cy); ctx.lineTo(cx + s * .95, cy + s * .1); ctx.lineTo(cx - s * .95, cy + s * .1); ctx.fill(); ctx.fillRect(cx - s * .3, cy + s * .55, s * .6, s * .08); [-.5, .5].forEach(e => { ctx.beginPath(); ctx.arc(cx + e * s, cy - s * .02, s * .07, 0, 7); ctx.fill(); }); };
        plane("rgba(160,170,190,.3)");
        hits.forEach(([x, y, z]) => { const lost = z === "engine" || z === "tail"; if (lost && !showLost) return; ctx.fillStyle = lost ? C.red : C.gold; ctx.beginPath(); ctx.arc(cx + x * s * 1.15, cy + y * s * 1.05 + (z === "wing" ? s * .05 : 0), 2.4, 0, 7); ctx.fill(); });
        out.innerHTML = showLost ? `<span class="r">red: hits on planes that never came back</span> — engines and tail. Holes there were fatal, which is why the survivors don't show them. <span class="g">Armour the engines.</span>` : `bullet holes on the bombers that returned (gold): wings and fuselage are riddled, engines and tail almost clean.\n<span class="d">so which parts need armour? press "show the planes that did not return"</span>`;
      }
    }
    chips(p, ".se-m", b => { mode = b.dataset.m; p.querySelector(".se-tl").hidden = mode !== "berk"; p.querySelector(".se-sh").hidden = mode !== "wald"; draw(); });
    tI.addEventListener("input", draw); p.querySelector(".se-sh").addEventListener("click", e => { showLost = !showLost; e.target.classList.toggle("on", showLost); draw(); });
    this._go = draw;
  },
  start() { if (this._go) this._go(); }
});

/* ================================================================ Overfitting */
function cheb(x, n) { const T = [1, x]; for (let k = 2; k <= n; k++) T.push(2 * x * T[k - 1] - T[k - 2]); return T.slice(0, n + 1); }
function lsq(xs, ys, n) { const m = n + 1, A = [...Array(m)].map(() => new Array(m).fill(0)), b = new Array(m).fill(0);
  xs.forEach((x, i) => { const T = cheb(x, n); for (let r = 0; r < m; r++) { b[r] += T[r] * ys[i]; for (let q = 0; q < m; q++) A[r][q] += T[r] * T[q]; } }); for (let r = 0; r < m; r++) A[r][r] += 1e-9;
  for (let col = 0; col < m; col++) { let piv = col; for (let r = col + 1; r < m; r++) if (Math.abs(A[r][col]) > Math.abs(A[piv][col])) piv = r; [A[col], A[piv]] = [A[piv], A[col]]; [b[col], b[piv]] = [b[piv], b[col]];
    for (let r = col + 1; r < m; r++) { const f = A[r][col] / A[col][col]; for (let q = col; q < m; q++) A[r][q] -= f * A[col][q]; b[r] -= f * b[col]; } }
  const c = new Array(m).fill(0); for (let r = m - 1; r >= 0; r--) { let s = b[r]; for (let q = r + 1; q < m; q++) s -= A[r][q] * c[q]; c[r] = s / A[r][r]; } return x => cheb(x, n).reduce((s, t, i) => s + t * c[i], 0); }
registerAtom({
  id: "overfit", name: "Overfitting", domain: "probability", fields: ["statistics"],
  html: `<h3>Overfitting — a model that remembers the noise</h3>
    <p class="ahint">Twelve noisy points are drawn from a smooth curve (dashed). Fit a polynomial of degree d. Low degree misses the shape (bias); high degree threads every point and swings wildly between them (variance). The right-hand plot shows the error on the fitted points and on fresh points from the same curve.</p>
    <div class="achips"><label class="achk">degree d <input type="range" class="of-d" min="0" max="11" value="3"> <b class="of-dv"></b></label><button class="achip of-n">new noisy data</button></div>
    <canvas class="acv of-cv"></canvas>
    <div class="aout of-out"></div>
    <p class="awhy">Training error always falls as the model grows; the error on new data first falls, then rises — the bias–variance trade-off. Statisticians fight it with cross-validation (Stone, 1974), penalties such as ridge and lasso (Tibshirani, 1996) and simpler models. Modern neural networks complicate the picture with "double descent": far beyond the interpolation point, test error can fall again.</p>`,
  build(p) {
    const c = p.querySelector(".of-cv"), out = p.querySelector(".of-out"), dims = sized(c, 330), dI = p.querySelector(".of-d");
    const f = x => Math.sin(2.6 * x) + .3 * x; let seed = 4, xs, ys, tx, ty;
    const data = () => { const R = rng(seed); xs = [...Array(12)].map((_, i) => -1 + 2 * (i + .2 + .6 * R()) / 12); ys = xs.map(x => f(x) + .28 * gauss(R)); tx = [...Array(200)].map(() => -1 + 2 * R()); ty = tx.map(x => f(x) + .28 * gauss(R)); };
    function draw() {
      const d = +dI.value, { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); p.querySelector(".of-dv").textContent = d;
      const g = lsq(xs, ys, d), { X, Y } = axes(ctx, 30, 14, w * .56, h - 40, [-1.05, 1.05], [-2.2, 2.2]);
      ctx.strokeStyle = "rgba(255,255,255,.45)"; ctx.setLineDash([5, 4]); ctx.beginPath(); for (let i = 0; i <= 200; i++) { const x = -1 + 2 * i / 200; i ? ctx.lineTo(X(x), Y(f(x))) : ctx.moveTo(X(x), Y(f(x))); } ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2.4; ctx.beginPath(); for (let i = 0; i <= 400; i++) { const x = -1.02 + 2.04 * i / 400, y = Math.max(-2.2, Math.min(2.2, g(x))); i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); } ctx.stroke();
      ctx.fillStyle = C.teal; xs.forEach((x, i) => { ctx.beginPath(); ctx.arc(X(x), Y(ys[i]), 4.5, 0, 7); ctx.fill(); });
      const err = dd => { const gg = lsq(xs, ys, dd); return [Math.sqrt(mean(xs.map((x, i) => (gg(x) - ys[i]) ** 2))), Math.sqrt(mean(tx.map((x, i) => (gg(x) - ty[i]) ** 2)))]; };
      const E = [...Array(12).keys()].map(err), x0 = w * .64, { X: X2, Y: Y2 } = axes(ctx, x0, 14, w - x0 - 14, h - 40, [0, 11], [0, 1.2]);
      [[0, C.teal, "on the fitted points"], [1, C.pink, "on new data"]].forEach(([k, col, nm], j) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); E.forEach((e, dd) => { const v = Math.min(1.2, e[k]); dd ? ctx.lineTo(X2(dd), Y2(v)) : ctx.moveTo(X2(dd), Y2(v)); }); ctx.stroke(); ctx.fillStyle = col; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText(nm, x0 + 10, 26 + 14 * j); });
      ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.moveTo(X2(d), 14); ctx.lineTo(X2(d), h - 26); ctx.stroke(); ctx.fillStyle = "#8d86a8"; ctx.fillText("degree →", w - 80, h - 8);
      const best = E.reduce((b, e, i) => e[1] < E[b][1] ? i : b, 0);
      out.innerHTML = `degree ${d}: error on the 12 fitted points ${E[d][0].toFixed(3)}   error on new data <span class="${d > best + 2 ? "r" : "g"}">${E[d][1].toFixed(3)}</span>\nbest degree for new data: <span class="t">${best}</span>${d === 11 ? '   <span class="r">degree 11 passes through all 12 points exactly — zero training error, poor prediction</span>' : ""}`;
    }
    dI.addEventListener("input", draw); p.querySelector(".of-n").addEventListener("click", () => { seed++; data(); draw(); });
    data(); this._go = draw;
  },
  start() { if (this._go) this._go(); }
});
})();
