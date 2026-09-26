/* ============================================================
   THE WEB OF MATHEMATICS — atoms-calculus.js
   Series, limits & chaos (domain: analysis)
     zeno · taylor · weierstrass · gabriel · rearrange · pendulum · chaosgame
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
const fmt = x => { if (!isFinite(x)) return x > 0 ? "∞" : "−∞"; const a = Math.abs(x); return (a !== 0 && (a < 1e-3 || a >= 1e6) ? x.toExponential(2) : (+x.toPrecision(6)).toString()).replace("-", "−"); };
// graph paper: returns the maps from maths to pixels
function axes(ctx, w, h, xr, yr) {
  const L = 38, R = w - 10, T = 10, B = h - 22;
  const X = x => L + (x - xr[0]) / (xr[1] - xr[0]) * (R - L), Y = y => B - (y - yr[0]) / (yr[1] - yr[0]) * (B - T);
  const step = (a, b) => { const r = (b - a) / 7, p = Math.pow(10, Math.floor(Math.log10(r))), m = r / p; return (m < 1.5 ? 1 : m < 3.5 ? 2 : m < 7.5 ? 5 : 10) * p; };
  ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.lineWidth = 1;
  const sx = step(...xr), sy = step(...yr), lab = v => (+v.toPrecision(4)).toString().replace("-", "−");
  for (let x = Math.ceil(xr[0] / sx) * sx; x <= xr[1] + sx * 1e-6; x += sx) { ctx.strokeStyle = Math.abs(x) < sx * 1e-6 ? "rgba(255,255,255,.3)" : "rgba(255,255,255,.07)"; ctx.beginPath(); ctx.moveTo(X(x), T); ctx.lineTo(X(x), B); ctx.stroke(); ctx.fillStyle = "#8d86a8"; ctx.fillText(lab(Math.abs(x) < sx * 1e-6 ? 0 : x), X(x) - 8, B + 14); }
  for (let y = Math.ceil(yr[0] / sy) * sy; y <= yr[1] + sy * 1e-6; y += sy) { ctx.strokeStyle = Math.abs(y) < sy * 1e-6 ? "rgba(255,255,255,.3)" : "rgba(255,255,255,.07)"; ctx.beginPath(); ctx.moveTo(L, Y(y)); ctx.lineTo(R, Y(y)); ctx.stroke(); ctx.fillStyle = "#8d86a8"; ctx.fillText(lab(Math.abs(y) < sy * 1e-6 ? 0 : y), 2, Y(y) + 3); }
  return { X, Y, L, R, T, B };
}
function curve(ctx, X, Y, f, x0, x1, col, lw, yclip) {
  ctx.strokeStyle = col; ctx.lineWidth = lw || 2; ctx.beginPath(); let pen = false;
  const n = Math.max(200, Math.ceil(X(x1) - X(x0)) * 2);
  for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n, y = f(x); if (!isFinite(y) || (yclip && Math.abs(y) > yclip)) { pen = false; continue; } pen ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); pen = true; }
  ctx.stroke();
}
const chips = (p, sel, cb) => p.querySelectorAll(sel).forEach(b => b.addEventListener("click", () => { p.querySelectorAll(sel).forEach(x => x.classList.toggle("on", x === b)); cb(b); }));

/* ================================================================ Zeno, geometric series, 0.999… */
const ze = looper();
registerAtom({
  id: "zeno", name: "Zeno & 0.999…", domain: "analysis", fields: ["real-analysis"],
  html: `<h3>Infinitely many steps, a finite total — Zeno, geometric series and 0.999… = 1</h3>
    <p class="ahint">Zeno of Elea (c. 450 BCE) argued that motion is impossible: to catch the tortoise, Achilles must first reach where it was, then where it moved to, and so on for ever. The answer took two thousand years — an infinite sum can be finite.</p>
    <div class="achips"><button class="achip ze-m on" data-m="0">halving a square</button><button class="achip ze-m" data-m="1">Achilles & the tortoise</button><button class="achip ze-m" data-m="2">0.999… = 1</button><button class="achip ze-m" data-m="3">any ratio r</button>
      <label class="achk ze-rl" hidden>r <input type="range" class="ze-r" min="-0.95" max="1.1" step="0.01" value="0.6"> <b class="ze-rv">0.6</b></label></div>
    <canvas class="acv ze-cv"></canvas>
    <div class="aout ze-out"></div>
    <p class="awhy">1/2 + 1/4 + 1/8 + … = 1 because the partial sums 1 − 1/2ⁿ get as close to 1 as you like, and "the sum" means exactly that limit — Cauchy's definition of 1821. In general a + ar + ar² + … = a/(1 − r) when |r| &lt; 1. Written in decimals, 0.999… is the series 9/10 + 9/100 + …, whose limit is 1: two decimals, one number. If they were different, some real number would have to sit between them, and none does.</p>`,
  build(p) {
    const c = p.querySelector(".ze-cv"), out = p.querySelector(".ze-out"), dims = sized(c, 330), rI = p.querySelector(".ze-r");
    let mode = 0, t0 = performance.now();
    chips(p, ".ze-m", b => { mode = +b.dataset.m; t0 = performance.now(); p.querySelector(".ze-rl").hidden = mode !== 3; });
    rI.addEventListener("input", () => p.querySelector(".ze-rv").textContent = rI.value);
    const PAL = [C.gold, C.teal, C.pink, C.blue, C.violet, C.green];
    ze.fn = () => {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const el = (performance.now() - t0) / 1000;
      ctx.font = "600 13px 'IBM Plex Mono', monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      if (mode === 0) {
        const S = h - 30, ox = (w - S) / 2, oy = 15, n = AtomKit.reduced ? 16 : Math.min(16, Math.floor(el / .7) + 1);
        ctx.strokeStyle = "rgba(255,255,255,.4)"; ctx.strokeRect(ox, oy, S, S);
        let x = ox, y = oy, rw = S, rh = S;
        for (let k = 1; k <= n; k++) {
          let r; if (k % 2) { r = [x, y, rw / 2, rh]; x += rw / 2; rw /= 2; } else { r = [x, y, rw, rh / 2]; y += rh / 2; rh /= 2; }
          ctx.fillStyle = PAL[(k - 1) % PAL.length]; ctx.globalAlpha = .75; ctx.fillRect(r[0] + 1, r[1] + 1, r[2] - 2, r[3] - 2); ctx.globalAlpha = 1;
          if (r[2] > 34 && r[3] > 20) { ctx.fillStyle = "#120b22"; ctx.fillText("1/" + 2 ** k, r[0] + r[2] / 2, r[1] + r[3] / 2); }
        }
        out.innerHTML = `pieces: ${n}   sum = 1 − 1/2^${n} = <span class="g">${(1 - 2 ** -n).toFixed(Math.min(12, n))}</span>   still missing: 1/${2 ** n}\nevery piece is half of what is left, so the square fills up — but no finite stage fills it. The sum of the whole series is the limit: <span class="t">exactly 1</span>.`;
      } else if (mode === 1) {
        const T = AtomKit.reduced ? .999 : Math.min(1.3, (el % 9) * .17), L = 40, R = w - 30, X = d => L + d / 3 * (R - L), yA = h * .42, yT = h * .62;
        const a = 2 * T, tor = 1 + T, stage = T >= 1 ? Infinity : Math.floor(-Math.log2(1 - T));
        ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.beginPath(); ctx.moveTo(L, h * .75); ctx.lineTo(R, h * .75); ctx.stroke();
        for (let k = 0; k < 14; k++) { const d = 2 - 2 ** -k * 1; ctx.strokeStyle = k < stage ? "rgba(245,196,81,.7)" : "rgba(255,255,255,.15)"; ctx.beginPath(); ctx.moveTo(X(d), h * .75 - 8); ctx.lineTo(X(d), h * .75 + 8); ctx.stroke(); }
        ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; [0, 1, 1.5, 1.75, 2].forEach(d => ctx.fillText(d, X(d), h * .75 + 20));
        ctx.font = "26px serif"; ctx.fillText("🏃", X(Math.min(a, 3)), yA); ctx.fillText("🐢", X(Math.min(tor, 3)), yT);
        ctx.font = "600 12px 'IBM Plex Mono', monospace"; ctx.fillStyle = C.gold; ctx.fillText(T >= 1 ? "caught at t = 1, at position 2!" : `stage ${stage + 1}`, w / 2, 22);
        out.innerHTML = `Achilles runs twice as fast as the tortoise, which starts 1 ahead. Each stage takes half as long as the one before: 1/2 + 1/4 + 1/8 + … = 1\ntime t = ${T.toFixed(3)}   Achilles at ${a.toFixed(3)}   tortoise at ${tor.toFixed(3)}   ${T < 1 ? `stages completed: ${stage}` : '<span class="t">infinitely many stages, finished in finite time: t = 1</span>'}`;
      } else if (mode === 2) {
        const n = AtomKit.reduced ? 4 : 1 + Math.floor(el / 1.3) % 12, lo = 1 - 3 * 10 ** -n, hi = 1 + 1.2 * 10 ** -n, L = 40, R = w - 30, X = v => L + (v - lo) / (hi - lo) * (R - L), y = h * .5;
        ctx.strokeStyle = "rgba(255,255,255,.4)"; ctx.beginPath(); ctx.moveTo(L, y); ctx.lineTo(R, y); ctx.stroke();
        const nines = 1 - 10 ** -n;
        ctx.fillStyle = "rgba(245,196,81,.2)"; ctx.fillRect(X(nines), y - 14, X(1) - X(nines), 28);
        [[nines, "0." + "9".repeat(n), C.teal, -26], [1, "1", C.gold, 28]].forEach(([v, s, col, dy]) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(v), y, 5, 0, 7); ctx.fill(); ctx.font = "600 13px 'IBM Plex Mono', monospace"; ctx.fillText(s, Math.min(R - 60, X(v)), y + dy); });
        ctx.fillStyle = "#8d86a8"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText(`zoom ×10^${n}: the gap is 10^−${n} = 0.${"0".repeat(n - 1)}1`, w / 2, 24);
        out.innerHTML = `with ${n} nines the gap to 1 is 10^−${n}. With infinitely many nines, the gap is smaller than every 10^−n — so it is <span class="g">0</span>.\nthree more ways to see it:   1/3 = 0.333…  so  3 × 1/3 = 0.999… = 1\n                             x = 0.999…,  10x = 9.999…,  10x − x = 9,  so x = 1\n                             9/10 + 9/100 + … = (9/10) / (1 − 1/10) = <span class="t">1</span>`;
      } else {
        const r = +rI.value, N = 30, S = []; let s = 0; for (let k = 0; k <= N; k++) { s += r ** k; S.push(s); }
        const conv = Math.abs(r) < 1, lim = 1 / (1 - r), ymax = conv ? Math.max(2, lim * 1.25) : Math.min(60, Math.max(...S) * 1.1), ymin = Math.min(0, ...S) - .2;
        const { X, Y } = axes(ctx, w, h, [0, N + .5], [ymin, ymax]);
        if (conv) { ctx.setLineDash([5, 5]); ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.moveTo(X(0), Y(lim)); ctx.lineTo(X(N + .5), Y(lim)); ctx.stroke(); ctx.setLineDash([]); }
        const shown = AtomKit.reduced ? N : Math.min(N, Math.floor(el * 8));
        for (let k = 0; k <= shown; k++) { const v = Math.max(ymin, Math.min(ymax, S[k])); ctx.fillStyle = conv ? "rgba(63,208,201,.75)" : "rgba(255,120,71,.75)"; ctx.fillRect(X(k) - 5, Math.min(Y(0), Y(v)), 10, Math.abs(Y(v) - Y(0))); }
        out.innerHTML = `partial sums of 1 + r + r² + … with r = ${r}\n${conv ? `|r| &lt; 1: they settle on 1/(1 − r) = <span class="g">${fmt(lim)}</span> (dashed line)` : r >= 1 ? '<span class="r">r ≥ 1: the sums grow without bound — the series diverges</span>' : '<span class="r">r ≤ −1: the sums swing for ever — the series diverges</span>'}`;
      }
      ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
    };
  },
  start() { ze.start(); }, stop() { ze.stop(); }
});

/* ================================================================ Taylor series */
const fact = n => { let f = 1; for (let i = 2; i <= n; i++) f *= i; return f; };
const cpow = (re, im, n) => { const r = Math.hypot(re, im) ** n, t = Math.atan2(im, re) * n; return [r * Math.cos(t), r * Math.sin(t)]; };
const cexp = (re, im) => { const e = Math.exp(re); return [e * Math.cos(im), e * Math.sin(im)]; };
const TAY = [
  { n: "sin x", f: Math.sin, xr: [-7, 7], yr: [-2.2, 2.2], R: () => Infinity, c: (a, k) => Math.sin(a + k * Math.PI / 2) / fact(k) },
  { n: "cos x", f: Math.cos, xr: [-7, 7], yr: [-2.2, 2.2], R: () => Infinity, c: (a, k) => Math.cos(a + k * Math.PI / 2) / fact(k) },
  { n: "eˣ", f: Math.exp, xr: [-5, 4], yr: [-2, 9], R: () => Infinity, c: (a, k) => Math.exp(a) / fact(k) },
  { n: "ln(1 + x)", f: x => x > -1 ? Math.log(1 + x) : NaN, xr: [-1.5, 4], yr: [-3, 2.5], R: a => 1 + a, amin: -.9, c: (a, k) => k ? (k % 2 ? 1 : -1) / (k * (1 + a) ** k) : Math.log(1 + a) },
  { n: "√(1 + x)", f: x => x >= -1 ? Math.sqrt(1 + x) : NaN, xr: [-1.5, 4], yr: [-1, 3], R: a => 1 + a, amin: -.9, c: (a, k) => { let b = 1; for (let j = 0; j < k; j++) b *= (.5 - j) / (j + 1); return b * (1 + a) ** (.5 - k); } },
  { n: "1/(1 + x²)", f: x => 1 / (1 + x * x), xr: [-3, 3], yr: [-.6, 1.6], R: a => Math.hypot(a, 1), c: (a, k) => { const z = cpow(-a, 1, -(k + 1)); return -z[1]; },
    why: "smooth on the whole real line, yet the series breaks down at distance √(1 + a²) — because of the complex poles at ±i" },
  { n: "e^(−1/x²)", f: x => x ? Math.exp(-1 / (x * x)) : 0, xr: [-3, 3], yr: [-.4, 1.2], R: a => Math.abs(a),
    c: (a, k) => { if (Math.abs(a) < .03) return 0; const M = 96, rho = .5 * Math.abs(a); let s = 0;
      for (let j = 0; j < M; j++) { const th = 2 * Math.PI * j / M, zr = a + rho * Math.cos(th), zi = rho * Math.sin(th), z2 = cpow(zr, zi, -2), fz = cexp(-z2[0], -z2[1]), ang = -k * th; s += fz[0] * Math.cos(ang) - fz[1] * Math.sin(ang); }
      return s / M / rho ** k; },
    why: a => Math.abs(a) < .03 ? "at a = 0 every derivative is 0, so every Taylor polynomial is the zero function — yet the function is not zero. Smooth is not the same as analytic (Cauchy, 1823)" : "away from 0 the series works, but only out to distance |a|: in the complex plane e^(−1/z²) blows up wildly at z = 0" }
];
const ty = looper();
registerAtom({
  id: "taylor", name: "Taylor series", domain: "analysis", fields: ["real-analysis", "complex-analysis"],
  html: `<h3>Taylor series — a whole function from its derivatives at one point</h3>
    <p class="ahint">The degree-n Taylor polynomial matches the value, slope, curvature … of f at the centre a. Raise n and watch it hug the curve — but only inside the radius of convergence (shaded). Drag on the graph to move the centre.</p>
    <div class="achips">${TAY.map((T, i) => `<button class="achip ty-f${i ? "" : " on"}" data-i="${i}">${T.n}</button>`).join("")}</div>
    <div class="achips"><label class="achk">degree n <input type="range" class="ty-n" min="0" max="30" step="1" value="5"> <b class="ty-nv">5</b></label>
      <label class="achk">centre a <input type="range" class="ty-a" min="-3" max="3" step="0.01" value="0"> <b class="ty-av">0</b></label><button class="achip ty-sw">▶ sweep n</button></div>
    <canvas class="acv ty-cv" style="cursor:ew-resize"></canvas>
    <div class="aout ty-out"></div>
    <p class="awhy">Brook Taylor published the formula in 1715; Madhava of Sangamagrama had the series for sine, cosine and arctangent in 14th-century Kerala. A power series converges on an interval centred at a, and the radius is the distance to the nearest trouble spot in the complex plane — that is why 1/(1 + x²), perfectly smooth on the real line, still has a radius of 1 at a = 0.</p>`,
  build(p) {
    const c = p.querySelector(".ty-cv"), out = p.querySelector(".ty-out"), dims = sized(c, 340), nI = p.querySelector(".ty-n"), aI = p.querySelector(".ty-a");
    let F = TAY[0], sweep = false, last = 0, dirty = true, lw = 0;
    const setRange = () => { aI.min = F.amin !== undefined ? F.amin : F.xr[0] * .8; aI.max = F.xr[1] * .8; if (+aI.value < +aI.min) aI.value = aI.min; if (+aI.value > +aI.max) aI.value = aI.max; };
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const n = +nI.value, a = Math.round(+aI.value * 100) / 100 || 0, R = F.R(a), co = []; for (let k = 0; k <= n; k++) co.push(F.c(a, k));
      p.querySelector(".ty-nv").textContent = n; p.querySelector(".ty-av").textContent = a.toFixed(2);
      const { X, Y, T, B } = axes(ctx, w, h, F.xr, F.yr);
      if (isFinite(R)) { ctx.fillStyle = "rgba(63,208,201,.08)"; const x0 = Math.max(F.xr[0], a - R), x1 = Math.min(F.xr[1], a + R); ctx.fillRect(X(x0), T, X(x1) - X(x0), B - T); }
      const Tn = x => { let s = 0, d = x - a, pw = 1; for (let k = 0; k <= n; k++) { s += co[k] * pw; pw *= d; } return s; };
      curve(ctx, X, Y, F.f, F.xr[0], F.xr[1], "rgba(232,228,244,.85)", 2.2);
      curve(ctx, X, Y, Tn, F.xr[0], F.xr[1], C.gold, 2.2, 1e3);
      ctx.fillStyle = C.pink; ctx.beginPath(); ctx.arc(X(a), Y(F.f(a)), 5, 0, 7); ctx.fill();
      const x1 = a + (isFinite(R) && R > 0 ? R * .5 : 1), e1 = Math.abs(Tn(x1) - F.f(x1));
      const base = a ? `(x ${a < 0 ? "+" : "−"} ${Math.abs(a).toFixed(2)})` : "x";
      const poly = co.slice(0, 5).map((v, k) => Math.abs(v) < 1e-12 ? null : `${v < 0 ? "− " : "+ "}${k && Math.abs(Math.abs(v) - 1) < 1e-9 ? "" : fmt(Math.abs(v))}${k ? base + (k > 1 ? "^" + k : "") : ""}`).filter(Boolean).join(" ").replace(/^\+ /, "") || "0";
      out.innerHTML = `<span class="g">T${n}(x)</span> = ${poly}${n > 4 ? " + …" : ""}\nradius of convergence: ${isFinite(R) ? `<span class="t">${fmt(R)}</span>` : '<span class="t">∞</span> (converges everywhere)'}   error at x = ${fmt(x1)}: ${fmt(e1)}${F.why ? `\n<span class="d">${typeof F.why === "function" ? F.why(a) : F.why}</span>` : ""}`;
    }
    chips(p, ".ty-f", b => { F = TAY[+b.dataset.i]; if (F.n.startsWith("e^")) aI.value = 0; setRange(); dirty = true; });
    nI.addEventListener("input", () => dirty = true); aI.addEventListener("input", () => dirty = true);
    const sw = p.querySelector(".ty-sw"); sw.addEventListener("click", () => { sweep = !sweep; sw.classList.toggle("on", sweep); sw.textContent = sweep ? "❚❚ stop" : "▶ sweep n"; if (sweep) nI.value = 0; });
    let drag = false;
    const setA = e => { const { w } = dims(), r = c.getBoundingClientRect(), fx = (e.clientX - r.left - 38) / (w - 48), v = F.xr[0] + fx * (F.xr[1] - F.xr[0]); aI.value = Math.max(+aI.min, Math.min(+aI.max, v)); dirty = true; };
    c.addEventListener("pointerdown", e => { drag = true; setA(e); try { c.setPointerCapture(e.pointerId); } catch (_) {} });
    c.addEventListener("pointermove", e => { if (drag) setA(e); });
    c.addEventListener("pointerup", () => drag = false);
    ty.fn = () => { const now = performance.now(); if (sweep && now - last > 450) { last = now; nI.value = (+nI.value + 1) % 31; dirty = true; } if (c.clientWidth !== lw) { lw = c.clientWidth; dirty = true; } if (dirty) { dirty = false; draw(); } };
    setRange(); draw();
  },
  start() { ty.start(); }, stop() { ty.stop(); }
});

/* ================================================================ Weierstrass function */
const we = looper();
registerAtom({
  id: "weierstrass", name: "Weierstrass zoom", domain: "analysis", fields: ["real-analysis", "fractals", "harmonic-analysis"],
  html: `<h3>The Weierstrass function — continuous everywhere, smooth nowhere</h3>
    <p class="ahint">W(x) = Σ aⁿ cos(bⁿπx): a sum of ever faster, ever smaller waves. Zoom in on any smooth curve and it straightens into its tangent line (bottom). Zoom in on W and it stays just as jagged (top) — there is no tangent line anywhere.</p>
    <div class="achips"><button class="achip we-play on">❚❚ pause zoom</button><button class="achip we-reset">restart</button>
      <label class="achk">a <input type="range" class="we-a" min="0.2" max="0.9" step="0.01" value="0.5"> <b class="we-av">0.5</b></label>
      <span class="achk">b</span>${[3, 5, 7].map(b => `<button class="achip we-b${b === 3 ? " on" : ""}" data-b="${b}">${b}</button>`).join("")}</div>
    <canvas class="acv we-cv"></canvas>
    <div class="aout we-out"></div>
    <p class="awhy">Weierstrass showed this function to the Berlin Academy in 1872, and it shocked a generation that took for granted that continuous curves are smooth except at a few corners. Hermite wrote that he turned away "with fright and horror from this lamentable plague of functions which have no derivatives". Hardy (1916) proved the condition ab ≥ 1 is enough. Today such curves are ordinary: Brownian paths are nowhere differentiable too, and the graph of W is a fractal of dimension 2 + ln a / ln b.</p>`,
  build(p) {
    const c = p.querySelector(".we-cv"), out = p.querySelector(".we-out"), dims = sized(c, 380), aI = p.querySelector(".we-a");
    let b = 3, play = !AtomKit.reduced, z = 0, lastT = performance.now();
    const x0 = .3183;
    const W = (x, a, N) => { let s = 0, an = 1, bn = 1; for (let n = 0; n < N; n++) { s += an * Math.cos(bn * Math.PI * x); an *= a; bn *= b; } return s; };
    const smoothF = x => Math.sin(3 * x) + .5 * Math.cos(5 * x);
    function panel(ctx, w, top, H, f, s, col, title) {
      const n = Math.min(900, w * 1.5), ys = []; let lo = Infinity, hi = -Infinity;
      for (let i = 0; i <= n; i++) { const y = f(x0 - s + 2 * s * i / n); ys.push(y); lo = Math.min(lo, y); hi = Math.max(hi, y); }
      const pad = (hi - lo) * .08 || 1e-12; lo -= pad; hi += pad;
      ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.strokeRect(8, top, w - 16, H);
      ctx.strokeStyle = col; ctx.lineWidth = 1.4; ctx.beginPath();
      ys.forEach((y, i) => { const X = 8 + (w - 16) * i / n, Y = top + H - (y - lo) / (hi - lo) * H; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
      ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.fillText(title, 14, top + 13);
      return hi - lo;
    }
    we.fn = () => {
      const now = performance.now(), dt = Math.min(.1, (now - lastT) / 1000); lastT = now; if (play) z += dt * .55; if (z > 7.2) z = 0;
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const a = +aI.value, s = 10 ** -z, N = Math.min(40, Math.ceil(Math.log(2000 / s) / Math.log(b)) + 4);
      const Hw = panel(ctx, w, 6, h * .64, x => W(x, a, N), s, C.gold, `W(x), window width ${fmt(2 * s)}`);
      const Hs = panel(ctx, w, h * .64 + 14, h * .36 - 20, smoothF, s, C.teal, "a smooth function, same window");
      p.querySelector(".we-av").textContent = a;
      const ab = a * b, al = -Math.log(a) / Math.log(b);
      out.innerHTML = `zoom ×10^${z.toFixed(1)}   terms used: ${N}   a·b = ${ab.toFixed(2)} ${ab >= 1 ? '<span class="r">≥ 1: nowhere differentiable</span>' : '<span class="t">&lt; 1: this one is smooth — try a bigger a</span>'}\nheight of W in the window: ${fmt(Hw)}   ~ (width)^${al.toFixed(3)}   <span class="d">(a straight line would scale like width¹)</span>\ngraph dimension 2 + ln a/ln b = <span class="g">${(2 - al).toFixed(3)}</span>`;
    };
    const pb = p.querySelector(".we-play"); pb.classList.toggle("on", play); pb.textContent = play ? "❚❚ pause zoom" : "▶ zoom";
    pb.addEventListener("click", () => { play = !play; pb.classList.toggle("on", play); pb.textContent = play ? "❚❚ pause zoom" : "▶ zoom"; });
    p.querySelector(".we-reset").addEventListener("click", () => z = 0);
    chips(p, ".we-b", x => b = +x.dataset.b);
  },
  start() { we.start(); }, stop() { we.stop(); }
});

/* ================================================================ Gabriel's horn */
const ga = looper();
registerAtom({
  id: "gabriel", name: "Gabriel's horn", domain: "analysis", fields: ["real-analysis", "measure-theory"],
  html: `<h3>Gabriel's horn — you can fill it with paint, but you can't paint it</h3>
    <p class="ahint">Spin the curve y = 1/x, from x = 1 to x = L, around the x-axis. Stretch L towards infinity: the volume inside creeps up to π, while the surface area grows without limit.</p>
    <div class="achips"><label class="achk">length L = 10^<input type="range" class="ga-l" min="0.2" max="12" step="0.05" value="1"> <b class="ga-lv"></b></label></div>
    <canvas class="acv ga-cv"></canvas>
    <div class="aout ga-out"></div>
    <p class="awhy">Evangelista Torricelli found in 1643 that this infinitely long solid has finite volume, and the result scandalised philosophers — Hobbes said understanding it would need one to be mad. Volume = π∫1/x² dx = π(1 − 1/L) → π. Area = 2π∫(1/x)√(1 + 1/x⁴) dx is at least 2π ln L → ∞. The "paradox" dissolves once you notice that paint has thickness: a coat of any fixed thickness can't get down the narrow throat.</p>`,
  build(p) {
    const c = p.querySelector(".ga-cv"), out = p.querySelector(".ga-out"), dims = sized(c, 330), lI = p.querySelector(".ga-l");
    const area = L => { const U = Math.log(L), n = 400, hS = U / n; let s = 0; for (let i = 0; i <= n; i++) { const u = i * hS, f = Math.sqrt(1 + Math.exp(-4 * u)); s += f * (i === 0 || i === n ? 1 : i % 2 ? 4 : 2); } return 2 * Math.PI * s * hS / 3; };
    ga.fn = () => {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const L = 10 ** +lI.value, Lv = Math.min(L, 14), cy = h * .42, R0 = h * .3, x0 = 40, kx = (w - 70) / 13, X = x => x0 + (x - 1) * kx, rad = x => R0 / x, t = performance.now() / 1000;
      p.querySelector(".ga-lv").textContent = L < 1e4 ? L.toFixed(L < 10 ? 2 : 0) : L.toExponential(1);
      const g = ctx.createLinearGradient(0, cy - R0, 0, cy + R0); g.addColorStop(0, "rgba(245,196,81,.55)"); g.addColorStop(.5, "rgba(180,140,255,.25)"); g.addColorStop(1, "rgba(245,196,81,.4)");
      ctx.beginPath(); for (let i = 0; i <= 200; i++) { const x = 1 + (Lv - 1) * i / 200; ctx.lineTo(X(x), cy - rad(x)); } for (let i = 200; i >= 0; i--) { const x = 1 + (Lv - 1) * i / 200; ctx.lineTo(X(x), cy + rad(x)); } ctx.closePath(); ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = C.gold; ctx.lineWidth = 1.6; ctx.stroke();
      for (let k = 0; k < 16; k++) { const x = 1 + ((k + (AtomKit.reduced ? 0 : t * .5)) % 16) * (Lv - 1) / 16; if (x > Lv) continue; const r = rad(x); ctx.strokeStyle = `rgba(245,196,81,${.15 + .35 * r / R0})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.ellipse(X(x), cy, Math.max(1, r * .28), r, 0, 0, 7); ctx.stroke(); }
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.ellipse(X(1), cy, R0 * .28, R0, 0, 0, 7); ctx.stroke();
      if (L > 14) { ctx.fillStyle = "#cfc9e4"; ctx.font = "12px 'IBM Plex Mono', monospace"; ctx.fillText(`… continues to x = ${L < 1e4 ? L.toFixed(0) : L.toExponential(1)} →`, X(10.5), cy - 18); }
      const V = Math.PI * (1 - 1 / L), A = area(L), by = h * .82, bw = w - 180;
      const bar = (y, v, max, col, lab) => { ctx.fillStyle = "rgba(255,255,255,.06)"; ctx.fillRect(150, y, bw, 12); ctx.fillStyle = col; ctx.fillRect(150, y, bw * Math.min(1, v / max), 12); ctx.fillStyle = "#cfc9e4"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText(lab, 10, y + 10); };
      bar(by, V, 4, C.teal, `volume ${V.toFixed(4)}`); ctx.fillStyle = C.gold; ctx.fillRect(150 + bw * Math.PI / 4, by - 3, 2, 18);
      bar(by + 22, A, 200, C.pink, `area ${A.toFixed(2)}`);
      out.innerHTML = `L = ${L < 1e6 ? L.toFixed(2) : L.toExponential(2)}\nvolume  π(1 − 1/L) = <span class="t">${V.toFixed(6)}</span>   → π = 3.141593 (gold tick)\nsurface area       = <span class="r">${A.toFixed(3)}</span>   ≥ 2π ln L = ${(2 * Math.PI * Math.log(L)).toFixed(3)} → ∞`;
    };
  },
  start() { ga.start(); }, stop() { ga.stop(); }
});

/* ================================================================ Riemann rearrangement */
const re = looper();
registerAtom({
  id: "rearrange", name: "Riemann rearrangement", domain: "analysis", fields: ["real-analysis"],
  html: `<h3>Riemann's rearrangement theorem — shuffle a series, change its sum</h3>
    <p class="ahint">1 − 1/2 + 1/3 − 1/4 + … = ln 2. Use exactly the same terms in a different order: add positive terms until you pass the target, then negative terms until you fall below it, and repeat. Any target works — even infinity.</p>
    <div class="achips"><button class="achip re-t on" data-t="ln2">ln 2 (the usual order)</button><button class="achip re-t" data-t="1.5">1.5</button><button class="achip re-t" data-t="3.14159265">π</button><button class="achip re-t" data-t="-1">−1</button><button class="achip re-t" data-t="0">0</button><button class="achip re-t" data-t="inf">+∞</button></div>
    <canvas class="acv re-cv"></canvas>
    <div class="aout re-out"></div>
    <p class="awhy">Riemann proved it around 1853 (published 1867): a series that converges but not absolutely — the sum of |terms| is infinite — can be rearranged to add up to any number you like. Only absolutely convergent series have a sum that ignores order. Here the positive terms 1 + 1/3 + 1/5 + … and the negative ones 1/2 + 1/4 + … each diverge; the target just decides how fast to spend them. Taking p positives for every q negatives gives ln 2 + ½ ln(p/q).</p>`,
  build(p) {
    const c = p.querySelector(".re-cv"), out = p.querySelector(".re-out"), dims = sized(c, 320);
    let target = "ln2", S = [], np = 0, nn = 0, s = 0, N = 0;
    const MAX = 1600;
    const reset = t => { target = t; S = [0]; np = 0; nn = 0; s = 0; N = 0; };
    const step = () => {
      if (target === "ln2") { N++; s += (N % 2 ? 1 : -1) / N; if (N % 2) np++; else nn++; }
      else if (target === "inf") { const goal = 1 + Math.sqrt(np + 1) * .25; if (s < goal) { s += 1 / (2 * np + 1); np++; } else { s -= 1 / (2 * nn + 2); nn++; } }
      else { const T = +target; if (s <= T) { s += 1 / (2 * np + 1); np++; } else { s -= 1 / (2 * nn + 2); nn++; } }
      S.push(s);
    };
    re.fn = () => {
      for (let k = 0; k < (AtomKit.reduced ? MAX : 6) && S.length <= MAX; k++) step();
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const T = target === "ln2" ? Math.LN2 : target === "inf" ? null : +target;
      const lo = Math.min(-1.3, ...S.slice(1)), hi = Math.max(1.3, T || 0, ...S) + .2;
      const { X, Y, L, R } = axes(ctx, w, h, [0, MAX], [lo, hi]);
      ctx.setLineDash([5, 5]); ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.beginPath(); ctx.moveTo(L, Y(Math.LN2)); ctx.lineTo(R, Y(Math.LN2)); ctx.stroke();
      if (T !== null) { ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.moveTo(L, Y(T)); ctx.lineTo(R, Y(T)); ctx.stroke(); } ctx.setLineDash([]);
      ctx.strokeStyle = C.teal; ctx.lineWidth = 1.3; ctx.beginPath(); S.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))); ctx.stroke();
      ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.fillText("ln 2", R - 30, Y(Math.LN2) - 4);
      const ratio = nn ? np / nn : 0, pred = T !== null ? Math.exp(2 * (T - Math.LN2)) : null;
      out.innerHTML = `terms used: ${S.length - 1}  (${np} positive, ${nn} negative)   partial sum = <span class="g">${s.toFixed(6)}</span>\n` +
        (target === "inf" ? '<span class="r">the target keeps rising, so the sum runs off to infinity — slowly, like √n</span>' : `positives per negative: ${ratio.toFixed(4)}   theory: e^(2(target − ln 2)) = <span class="t">${pred.toFixed(4)}</span>`);
    };
    chips(p, ".re-t", b => reset(b.dataset.t));
    reset("ln2");
  },
  start() { re.start(); }, stop() { re.stop(); }
});

/* ================================================================ Double pendulum */
const dp = looper();
registerAtom({
  id: "pendulum", name: "Double pendulum", domain: "analysis", fields: ["dynamical-systems", "odes"],
  html: `<h3>The double pendulum — deterministic, and still unpredictable</h3>
    <p class="ahint">Two identical pendulums, started one millionth of a radian apart (gold and red). For a few seconds they move as one; then the gap explodes exponentially and they have nothing to do with each other. Drag a bob to set a new start.</p>
    <div class="achips"><button class="achip dp-p" data-a="2.2,2.6">high energy</button><button class="achip dp-p" data-a="0.5,0.6">gentle (regular)</button><button class="achip dp-p" data-a="3.1,3.1">balanced upright</button><button class="achip dp-tw on">twin</button><button class="achip dp-tr on">trail</button></div>
    <canvas class="acv dp-cv" style="cursor:grab"></canvas>
    <div class="aout dp-out"></div>
    <p class="awhy">The equations are fixed and exact — Lagrange's mechanics, solved here with fourth-order Runge–Kutta — but errors grow like e^(λt). Poincaré saw this in the three-body problem in 1890; Lorenz rediscovered it in weather equations in 1963 and called it the butterfly effect. At low energy the motion is regular (quasi-periodic) and the gap grows only slowly; the blue plot shows log₁₀ of the gap, and a straight rising line means exponential growth.</p>`,
  build(p) {
    const c = p.querySelector(".dp-cv"), out = p.querySelector(".dp-out"), dims = sized(c, 400), g = 9.81;
    let A, B, t, twin = true, trail = true, trA = [], trB = [], hist = [], E0, drag = null;
    const acc = s => { const [t1, t2, w1, w2] = s, d = t1 - t2, den = 3 - Math.cos(2 * t1 - 2 * t2);
      return [w1, w2, (-3 * g * Math.sin(t1) - g * Math.sin(t1 - 2 * t2) - 2 * Math.sin(d) * (w2 * w2 + w1 * w1 * Math.cos(d))) / den,
        (2 * Math.sin(d) * (2 * w1 * w1 + 2 * g * Math.cos(t1) + w2 * w2 * Math.cos(d))) / den]; };
    const rk4 = (s, hS) => { const k1 = acc(s), k2 = acc(s.map((v, i) => v + hS / 2 * k1[i])), k3 = acc(s.map((v, i) => v + hS / 2 * k2[i])), k4 = acc(s.map((v, i) => v + hS * k3[i])); return s.map((v, i) => v + hS / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i])); };
    const energy = ([t1, t2, w1, w2]) => .5 * w1 * w1 + .5 * (w1 * w1 + w2 * w2 + 2 * w1 * w2 * Math.cos(t1 - t2)) - 2 * g * Math.cos(t1) - g * Math.cos(t2);
    const set = (a1, a2) => { A = [a1, a2, 0, 0]; B = [a1, a2 + 1e-6, 0, 0]; t = 0; trA = []; trB = []; hist = []; E0 = energy(A); };
    const geo = () => { const { w, h } = dims(), L = Math.min(h * .24, w * .2); return { px: w * .42, py: h * .47, L }; };
    const pos = (s, G) => { const x1 = G.px + G.L * Math.sin(s[0]), y1 = G.py + G.L * Math.cos(s[0]); return [x1, y1, x1 + G.L * Math.sin(s[1]), y1 + G.L * Math.cos(s[1])]; };
    const wrap = x => Math.atan2(Math.sin(x), Math.cos(x));
    dp.fn = () => {
      if (drag === null) { for (let k = 0; k < 8; k++) { A = rk4(A, 1 / 480); B = rk4(B, 1 / 480); } t += 1 / 60;
        const gap = Math.hypot(wrap(A[0] - B[0]), wrap(A[1] - B[1]), (A[2] - B[2]) * .3, (A[3] - B[3]) * .3); hist.push([t, Math.log10(Math.max(1e-12, gap))]); if (hist.length > 1800) hist.shift(); }
      const { ctx, w, h } = dims(), G = geo(); ctx.clearRect(0, 0, w, h);
      const pa = pos(A, G), pb = pos(B, G);
      if (drag === null) { trA.push([pa[2], pa[3]]); trB.push([pb[2], pb[3]]); if (trA.length > 500) { trA.shift(); trB.shift(); } }
      const drawTrail = (tr, col) => { for (let i = 1; i < tr.length; i++) { ctx.strokeStyle = `rgba(${col},${i / tr.length * .8})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(...tr[i - 1]); ctx.lineTo(...tr[i]); ctx.stroke(); } };
      if (trail) { if (twin) drawTrail(trB, "255,120,71"); drawTrail(trA, "245,196,81"); }
      const arm = (q, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(G.px, G.py); ctx.lineTo(q[0], q[1]); ctx.lineTo(q[2], q[3]); ctx.stroke(); ctx.fillStyle = col; [[q[0], q[1]], [q[2], q[3]]].forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 8, 0, 7); ctx.fill(); }); };
      if (twin) arm(pb, "rgba(255,120,71,.9)"); arm(pa, "rgba(245,196,81,.95)");
      ctx.fillStyle = "#cfc9e4"; ctx.beginPath(); ctx.arc(G.px, G.py, 4, 0, 7); ctx.fill();
      const bx = w - 200, by = h - 88, bw = 186, bh = 76;
      ctx.fillStyle = "rgba(0,0,0,.35)"; ctx.fillRect(bx, by, bw, bh); ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.strokeRect(bx, by, bw, bh);
      ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.fillText("log₁₀ gap  (−6 … 1)", bx + 6, by + 12);
      if (hist.length > 1) { const t0 = hist[0][0], span = Math.max(10, t - t0); ctx.strokeStyle = C.blue; ctx.lineWidth = 1.3; ctx.beginPath(); hist.forEach(([tt, v], i) => { const x = bx + 4 + (tt - t0) / span * (bw - 8), y = by + bh - 4 - (Math.max(-6.5, Math.min(1, v)) + 6.5) / 7.5 * (bh - 18); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); }
      const gap = hist.length ? 10 ** hist[hist.length - 1][1] : 1e-6;
      out.innerHTML = `t = ${t.toFixed(1)} s   gap between the twins: <span class="${gap > .1 ? "r" : "g"}">${gap.toExponential(1)}</span>   energy drift: ${fmt(Math.abs(energy(A) - E0))} <span class="d">(RK4, 480 steps per second)</span>`;
    };
    const near = e => { const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, q = pos(A, geo()); return Math.hypot(x - q[2], y - q[3]) < 20 ? 2 : Math.hypot(x - q[0], y - q[1]) < 20 ? 1 : null; };
    c.addEventListener("pointerdown", e => { drag = near(e); if (drag) try { c.setPointerCapture(e.pointerId); } catch (_) {} else drag = null; });
    c.addEventListener("pointermove", e => { if (!drag) return; const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, G = geo(); let a1 = A[0], a2 = A[1];
      if (drag === 1) a1 = Math.atan2(x - G.px, y - G.py); else { const x1 = G.px + G.L * Math.sin(a1), y1 = G.py + G.L * Math.cos(a1); a2 = Math.atan2(x - x1, y - y1); } set(a1, a2); });
    const up = () => { drag = null; }; c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    p.querySelectorAll(".dp-p").forEach(b => b.addEventListener("click", () => set(...b.dataset.a.split(",").map(Number))));
    p.querySelector(".dp-tw").addEventListener("click", e => { twin = !twin; e.target.classList.toggle("on", twin); });
    p.querySelector(".dp-tr").addEventListener("click", e => { trail = !trail; e.target.classList.toggle("on", trail); });
    set(2.2, 2.6);
  },
  start() { dp.start(); }, stop() { dp.stop(); }
});

/* ================================================================ Chaos game, Koch, fern */
const FERN = [[0, 0, 0, .16, 0, 0, .01], [.85, .04, -.04, .85, 0, 1.6, .85], [.2, -.26, .23, .22, 0, 1.6, .07], [-.15, .28, .26, .24, 0, .44, .07]];
const cg = looper();
registerAtom({
  id: "chaosgame", name: "Chaos game & fractals", domain: "analysis", fields: ["fractals", "dynamical-systems"],
  html: `<h3>The chaos game — randomness that draws a perfect fractal</h3>
    <p class="ahint">Pick a corner at random and jump halfway towards it. Repeat. The first few dots look random; after a few thousand the Sierpiński triangle appears — every time. Change the rules, or build the Koch snowflake one level at a time.</p>
    <div class="achips"><button class="achip cg-m on" data-m="tri">triangle, ½</button><button class="achip cg-m" data-m="sq">square, no repeat</button><button class="achip cg-m" data-m="pent">pentagon, 0.618</button><button class="achip cg-m" data-m="fern">Barnsley fern</button><button class="achip cg-m" data-m="koch">Koch snowflake</button>
      <label class="achk cg-kl" hidden>level <input type="range" class="cg-k" min="0" max="7" step="1" value="3"> <b class="cg-kv">3</b></label></div>
    <canvas class="acv cg-cv"></canvas>
    <div class="aout cg-out"></div>
    <p class="awhy">Michael Barnsley popularised the chaos game in 1988: any shape made of shrunken copies of itself (an iterated function system) is the unique attractor of those maps, and random iteration finds it. The Sierpiński triangle is three half-size copies of itself, so its dimension d solves 3 = 2ᵈ: d = log 3/log 2 ≈ 1.585. The Koch snowflake (1904) has infinite perimeter, (4/3)ⁿ times longer at each level, around a finite area 8/5 of the starting triangle; its dimension is log 4/log 3 ≈ 1.262.</p>`,
  build(p) {
    const c = p.querySelector(".cg-cv"), out = p.querySelector(".cg-out"), dims = sized(c, 400), kI = p.querySelector(".cg-k");
    let mode = "tri", V, pt, count, prev, R = rng(7), slow, lastK = -1, lw = 0;
    const poly = (n, rot) => { const { w, h } = dims(), r = Math.min(w, h) * .47, cx = w / 2, cy = h / 2 + (n === 3 ? r * .2 : 0); return Array.from({ length: n }, (_, i) => [cx + r * Math.cos(rot + 2 * Math.PI * i / n), cy + r * Math.sin(rot + 2 * Math.PI * i / n)]); };
    const COL = [C.gold, C.teal, C.pink, C.blue, C.violet];
    function reset() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); count = 0; prev = -1; slow = 0; lastK = -1;
      if (mode === "tri") V = poly(3, -Math.PI / 2); else if (mode === "sq") V = poly(4, -Math.PI / 4); else if (mode === "pent") V = poly(5, -Math.PI / 2); else V = null;
      pt = mode === "fern" ? [0, 0] : [w / 2 + 3, h / 2 - 7];
      p.querySelector(".cg-kl").hidden = mode !== "koch";
    }
    const fernXY = ([x, y]) => { const { w, h } = dims(), s = h / 10.4; return [w / 2 + x * s, h - 4 - y * s]; };
    function koch() {
      const { ctx, w, h } = dims(), n = +kI.value; if (n === lastK && c.clientWidth === lw) return; lastK = n; lw = c.clientWidth; ctx.clearRect(0, 0, w, h);
      let P = poly(3, -Math.PI / 2).map(([x, y]) => [x, y - Math.min(w, h) * .06]); P.push(P[0]);
      for (let k = 0; k < n; k++) { const Q = []; for (let i = 0; i < P.length - 1; i++) { const [ax, ay] = P[i], [bx, by] = P[i + 1], dx = (bx - ax) / 3, dy = (by - ay) / 3, m1 = [ax + dx, ay + dy], m2 = [ax + 2 * dx, ay + 2 * dy], tip = [m1[0] + dx * .5 + dy * Math.sqrt(3) / 2, m1[1] + dy * .5 - dx * Math.sqrt(3) / 2]; Q.push(P[i], m1, tip, m2); } Q.push(P[P.length - 1]); P = Q; }
      ctx.beginPath(); P.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.fillStyle = "rgba(122,168,255,.18)"; ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 1.3; ctx.stroke();
      p.querySelector(".cg-kv").textContent = n;
      out.innerHTML = `level ${n}: ${3 * 4 ** n} edges   perimeter = 3 × (4/3)^${n} = <span class="r">${(3 * (4 / 3) ** n).toFixed(3)}</span> → ∞\narea = (8/5 − 3/5·(4/9)^${n}) × triangle = <span class="t">${(1.6 - .6 * (4 / 9) ** n).toFixed(5)}</span> → 8/5 = 1.6`;
    }
    cg.fn = () => {
      if (mode === "koch") return koch();
      const { ctx } = dims(), manual = count < 8 && mode !== "fern" && !AtomKit.reduced;
      if (manual && ++slow % 14) return;
      const reps = manual ? 1 : 700;
      if (!manual && count === 8 && mode !== "fern") { const { w, h } = dims(); ctx.clearRect(0, 0, w, h); }
      for (let r = 0; r < reps && count < 120000; r++) {
        let q, col;
        if (mode === "fern") { const u = R(); let acc = 0, m = FERN[3]; for (const f of FERN) { acc += f[6]; if (u < acc) { m = f; break; } } pt = [m[0] * pt[0] + m[1] * pt[1] + m[4], m[2] * pt[0] + m[3] * pt[1] + m[5]]; q = fernXY(pt); col = "rgba(87,224,138,.7)"; }
        else { let i; do { i = Math.floor(R() * V.length); } while (mode === "sq" && i === prev); prev = i; const f = mode === "pent" ? .618 : .5; const old = pt; pt = [pt[0] + (V[i][0] - pt[0]) * f, pt[1] + (V[i][1] - pt[1]) * f]; q = pt; col = COL[i % COL.length];
          if (manual) { ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(...old); ctx.lineTo(...V[i]); ctx.stroke(); ctx.setLineDash([]); } }
        ctx.fillStyle = col; if (manual) { ctx.beginPath(); ctx.arc(q[0], q[1], 3, 0, 7); ctx.fill(); } else ctx.fillRect(q[0], q[1], 1, 1);
        count++;
      }
      if (V) { ctx.fillStyle = "#fff"; V.forEach(([x, y]) => { ctx.beginPath(); ctx.arc(x, y, 4, 0, 7); ctx.fill(); }); }
      const dim = { tri: "log 3 / log 2 ≈ 1.585", sq: "a new fractal: the rule forbids repeating a corner", pent: "five copies at scale 0.382: log 5 / log(1/0.382) ≈ 1.672", fern: "four affine maps, chosen with probabilities 1%, 85%, 7%, 7%" }[mode];
      out.innerHTML = `points: ${count}${count < 8 && mode !== "fern" ? "  (watching the first jumps slowly)" : ""}\n${dim}`;
    };
    chips(p, ".cg-m", b => { mode = b.dataset.m; reset(); });
    kI.addEventListener("input", () => lastK = -1);
    this._reset = reset;
  },
  start() { if (this._reset && !this._did) { this._did = true; this._reset(); } cg.start(); }, stop() { cg.stop(); }
});
})();
