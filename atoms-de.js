/* ============================================================
   THE WEB OF MATHEMATICS — atoms-de.js
   Differential equations (domain: analysis) and star patterns (geometry)
     resonance · kuramoto · chladni · soliton · girih
   ============================================================ */
(function () {
"use strict";
const { C, rng } = AtomKit;
function sized(c, h) { let d = AtomKit.canvas(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = AtomKit.canvas(c, h); return d; }; }
function looper() { const L = { raf: null, fn: null, start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } }, stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } }; return L; }
const chips = (p, sel, cb) => p.querySelectorAll(sel).forEach(b => b.addEventListener("click", () => { p.querySelectorAll(sel).forEach(x => x.classList.toggle("on", x === b)); cb(b); }));
const gauss = R => Math.sqrt(-2 * Math.log(1 - R())) * Math.cos(2 * Math.PI * R());

/* ================================================================ Resonance */
const rs = looper();
registerAtom({
  id: "resonance", name: "Driven oscillator & resonance", domain: "analysis", fields: ["odes"],
  html: `<h3>Resonance — push a swing at the right rhythm</h3>
    <p class="ahint">A mass on a spring, with friction, is pushed by a force that oscillates at frequency ω. Push at the spring's natural frequency ω₀ and small pushes add up to huge swings; push faster or slower and they mostly cancel. Less damping, sharper peak.</p>
    <div class="achips"><label class="achk">driving frequency ω/ω₀ <input type="range" class="res-w" min="0.2" max="2.5" step="0.01" value="0.7"> <b class="res-wv"></b></label><label class="achk">damping ζ <input type="range" class="res-z" min="0.02" max="0.8" step="0.01" value="0.08"> <b class="res-zv"></b></label><button class="achip res-re">restart</button></div>
    <canvas class="acv res-cv"></canvas>
    <div class="aout res-out"></div>
    <p class="awhy">The equation is x″ + 2ζω₀x′ + ω₀²x = F cos ωt. After the start-up transient dies away the mass swings at the driving frequency with amplitude F/√((ω₀² − ω²)² + (2ζω₀ω)²), largest near ω = ω₀. Soldiers break step on bridges for this reason, and the Millennium Bridge in London wobbled in 2000 when walkers fell into step with its sway. The Tacoma Narrows Bridge (1940) is often quoted as resonance, but it actually failed by aeroelastic flutter — a self-excited oscillation, not a push at a fixed rhythm.</p>`,
  build(p) {
    const c = p.querySelector(".res-cv"), out = p.querySelector(".res-out"), dims = sized(c, 330), wI = p.querySelector(".res-w"), zI = p.querySelector(".res-z");
    let x = 0, v = 0, t = 0, trace = [];
    const reset = () => { x = 0; v = 0; t = 0; trace = []; };
    rs.fn = () => {
      const w0 = 2 * Math.PI * .6, om = +wI.value * w0, z = +zI.value, F = 3; p.querySelector(".res-wv").textContent = (+wI.value).toFixed(2); p.querySelector(".res-zv").textContent = z.toFixed(2);
      const acc = (x, v, t) => F * Math.cos(om * t) - 2 * z * w0 * v - w0 * w0 * x, dt = 1 / 240;
      for (let k = 0; k < 4; k++) { const a1 = acc(x, v, t), a2 = acc(x + v * dt / 2, v + a1 * dt / 2, t + dt / 2), a3 = acc(x + (v + a1 * dt / 2) * dt / 2, v + a2 * dt / 2, t + dt / 2), a4 = acc(x + (v + a2 * dt / 2) * dt, v + a3 * dt, t + dt);
        x += dt * (v + dt / 6 * (a1 + a2 + a3)); v += dt / 6 * (a1 + 2 * a2 + 2 * a3 + a4); t += dt; }
      trace.push(x); if (trace.length > 600) trace.shift();
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const A = w0 => F / Math.sqrt((w0 * w0 - om * om) ** 2 + (2 * z * w0 * om) ** 2), Ast = A(w0), sc = h * .36 / (F / (w0 * w0) * Math.max(1.2, 1 / (2 * z)));
      // mass and spring
      const mx = w * .12, top = 20, my = h * .45 + x * sc; ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.fillStyle = "rgba(255,255,255,.3)"; ctx.fillRect(mx - 30, top - 6, 60, 6);
      const drive = top + 12 * Math.cos(om * t); ctx.strokeStyle = C.pink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(mx - 30, drive); ctx.lineTo(mx + 30, drive); ctx.stroke();
      ctx.strokeStyle = "#cfc9e4"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(mx, drive); for (let i = 1; i <= 16; i++) ctx.lineTo(mx + (i % 2 ? 12 : -12), drive + (my - 20 - drive) * i / 16); ctx.lineTo(mx, my - 20); ctx.stroke();
      ctx.fillStyle = C.gold; ctx.fillRect(mx - 20, my - 20, 40, 40);
      // displacement trace
      const x0 = w * .24, x1 = w * .6, ym = h * .45; ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.beginPath(); ctx.moveTo(x0, ym); ctx.lineTo(x1, ym); ctx.stroke();
      ctx.strokeStyle = C.gold; ctx.lineWidth = 1.5; ctx.beginPath(); trace.forEach((y, i) => { const X = x0 + (x1 - x0) * i / 600, Y = ym + y * sc; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
      // response curve
      const gx0 = w * .66, gx1 = w - 14, gy0 = 20, gy1 = h - 30, rmax = 1 / (2 * z * Math.sqrt(1 - z * z || 1)) * 1.1 + 1, R2 = r => 1 / Math.sqrt((1 - r * r) ** 2 + (2 * z * r) ** 2), GX = r => gx0 + (gx1 - gx0) * (r - .2) / 2.3, GY = a => gy1 - (gy1 - gy0) * Math.min(a, rmax) / rmax;
      ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
      ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const r = .2 + 2.3 * i / 200; i ? ctx.lineTo(GX(r), GY(R2(r))) : ctx.moveTo(GX(r), GY(R2(r))); } ctx.stroke();
      ctx.fillStyle = C.pink; ctx.beginPath(); ctx.arc(GX(+wI.value), GY(R2(+wI.value)), 6, 0, 7); ctx.fill(); ctx.fillStyle = "#cfc9e4"; ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.fillText("amplitude vs ω/ω₀", gx0 + 6, gy0 + 4); ctx.fillText("1", GX(1) - 3, gy1 + 12);
      out.innerHTML = `steady amplitude = ${R2(+wI.value).toFixed(2)} × (the stretch the same force would cause if held still)   peak value at resonance ≈ 1/(2ζ) = <span class="g">${(1 / (2 * z)).toFixed(1)}</span>\n<span class="d">pink bar: the pushing support · gold trace: the mass — watch the start-up transient die away</span>`;
    };
    [wI, zI].forEach(i => i.addEventListener("input", reset)); p.querySelector(".res-re").addEventListener("click", reset);
  },
  start() { rs.start(); }, stop() { rs.stop(); }
});

/* ================================================================ Kuramoto */
const ku = looper();
registerAtom({
  id: "kuramoto", name: "Synchrony: the Kuramoto model", domain: "analysis", fields: ["dynamical-systems", "odes"],
  html: `<h3>Synchrony — how fireflies and metronomes fall into step</h3>
    <p class="ahint">Eighty oscillators, each with its own natural speed, run around a circle. Each is gently pulled towards the others' phases with strength K. Below a critical coupling they drift independently; above it, a crowd suddenly locks together.</p>
    <div class="achips"><label class="achk">coupling K <input type="range" class="ku-k" min="0" max="4" step="0.05" value="0.8"> <b class="ku-kv"></b></label><button class="achip ku-r">scramble phases</button></div>
    <canvas class="acv ku-cv"></canvas>
    <div class="aout ku-out"></div>
    <p class="awhy">Yoshiki Kuramoto's model (1975): θᵢ′ = ωᵢ + (K/N) Σⱼ sin(θⱼ − θᵢ). The order parameter r = |average of e^(iθ)| measures synchrony, from 0 (scattered) to 1 (in step). With natural frequencies spread like a bell curve of width σ, synchrony appears at K_c = 2/(π g(0)) = σ√(8/π) ≈ 1.6σ — a phase transition. It describes flashing fireflies in Southeast Asia, pacemaker cells in the heart, power grids and Huygens's pendulum clocks (1665), which synchronised through the beam they hung from.</p>`,
  build(p) {
    const c = p.querySelector(".ku-cv"), out = p.querySelector(".ku-out"), dims = sized(c, 330), kI = p.querySelector(".ku-k"), N = 80, R = rng(9);
    const om = [...Array(N)].map(() => gauss(R)), th = om.map(() => R() * 2 * Math.PI), hist = [];
    ku.fn = () => {
      const K = +kI.value, dt = .04; p.querySelector(".ku-kv").textContent = K.toFixed(2);
      for (let s = 0; s < 4; s++) { let cx = 0, cy = 0; th.forEach(t => { cx += Math.cos(t); cy += Math.sin(t); }); cx /= N; cy /= N; const r = Math.hypot(cx, cy), psi = Math.atan2(cy, cx); for (let i = 0; i < N; i++) th[i] += dt * (om[i] + K * r * Math.sin(psi - th[i])); }
      let cx = 0, cy = 0; th.forEach(t => { cx += Math.cos(t); cy += Math.sin(t); }); cx /= N; cy /= N; const r = Math.hypot(cx, cy); hist.push(r); if (hist.length > 500) hist.shift();
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const CX = w * .25, CY = h / 2, RR = Math.min(w * .19, h * .4);
      ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(CX, CY, RR, 0, 7); ctx.stroke();
      th.forEach((t, i) => { const hue = 180 + 60 * Math.tanh(om[i]); ctx.fillStyle = `hsl(${hue},80%,65%)`; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 8; ctx.beginPath(); ctx.arc(CX + RR * Math.cos(t), CY + RR * Math.sin(t), 4.5, 0, 7); ctx.fill(); }); ctx.shadowBlur = 0;
      ctx.strokeStyle = C.gold; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(CX, CY); ctx.lineTo(CX + RR * cx, CY + RR * cy); ctx.stroke(); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(CX + RR * cx, CY + RR * cy, 5, 0, 7); ctx.fill();
      const x0 = w * .52, x1 = w - 14, y0 = 24, y1 = h - 28; ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); hist.forEach((v, i) => { const X = x0 + (x1 - x0) * i / 500, Y = y1 - (y1 - y0) * v; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke();
      ctx.fillStyle = "#cfc9e4"; ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.fillText("synchrony r over time (1 = perfectly in step)", x0 + 6, y0 - 8);
      out.innerHTML = `K = ${K.toFixed(2)}   critical K_c ≈ 1.60 (natural frequencies spread with σ = 1)   synchrony r = <span class="${r > .5 ? "g" : "t"}">${r.toFixed(2)}</span>   ${K < 1.5 ? "— mostly drifting apart" : K < 2 ? "— near the transition: clusters form and dissolve" : "— a locked crowd, with the fastest and slowest still slipping"}`;
    };
    p.querySelector(".ku-r").addEventListener("click", () => { for (let i = 0; i < N; i++) th[i] = R() * 2 * Math.PI; hist.length = 0; });
  },
  start() { ku.start(); }, stop() { ku.stop(); }
});

/* ================================================================ Chladni figures */
const ch = looper();
const MODES = [[1, 2], [1, 3], [2, 3], [1, 4], [2, 5], [3, 4], [3, 5], [4, 7]];
registerAtom({
  id: "chladni", name: "Chladni figures", domain: "analysis", fields: ["pdes", "harmonic-analysis"],
  html: `<h3>Chladni figures — sand shows where a vibrating plate stands still</h3>
    <p class="ahint">Sprinkle sand on a metal plate and bow its edge. At each resonant frequency the plate vibrates in a standing wave, and the sand is thrown off the moving parts and collects along the nodal lines, which don't move. Pick a mode and watch the sand settle.</p>
    <div class="achips">${MODES.map(([n, m], i) => `<button class="achip chl-m${i === 2 ? " on" : ""}" data-i="${i}">(${n}, ${m})</button>`).join("")}<button class="achip chl-sym">symmetric combination</button><button class="achip chl-re">fresh sand</button></div>
    <canvas class="acv chl-cv"></canvas>
    <div class="aout chl-out"></div>
    <p class="awhy">Ernst Chladni toured Europe with these figures from 1787; Napoleon offered a prize for their theory, won by Sophie Germain in 1816 with the first theory of elastic plates. For a square plate a good approximation of the modes is cos(nπx)cos(mπy) ∓ cos(mπx)cos(nπy) — the sum or difference of two waves with the same frequency. The same mathematics (eigenfunctions of an operator) describes drumheads, the tones of violins and guitars, and electron orbitals.</p>`,
  build(p) {
    const c = p.querySelector(".chl-cv"), out = p.querySelector(".chl-out"), dims = sized(c, 380);
    let mode = MODES[2], sym = false, sand = [], R = rng(2);
    const u = (x, y) => { const [n, m] = mode, a = Math.cos(n * Math.PI * x) * Math.cos(m * Math.PI * y), b = Math.cos(m * Math.PI * x) * Math.cos(n * Math.PI * y); return sym ? a + b : a - b; };
    const fresh = () => { sand = [...Array(5000)].map(() => [R(), R()]); };
    ch.fn = () => {
      for (let it = 0; it < 4; it++) for (const s of sand) { const a = Math.abs(u(s[0], s[1])); s[0] = Math.min(1, Math.max(0, s[0] + (R() - .5) * .04 * a)); s[1] = Math.min(1, Math.max(0, s[1] + (R() - .5) * .04 * a)); }
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const S = Math.min(w * .6, h - 20), x0 = (w - S) / 2, y0 = 10;
      const g = ctx.createLinearGradient(x0, y0, x0 + S, y0 + S); g.addColorStop(0, "#2b2340"); g.addColorStop(1, "#1a1428"); ctx.fillStyle = g; ctx.fillRect(x0, y0, S, S); ctx.strokeStyle = "rgba(245,196,81,.4)"; ctx.strokeRect(x0, y0, S, S);
      ctx.fillStyle = "rgba(255,233,168,.85)"; for (const [x, y] of sand) ctx.fillRect(x0 + x * S, y0 + y * S, 1.4, 1.4);
      const [n, m] = mode; out.innerHTML = `mode (${n}, ${m}): cos(${n}πx)cos(${m}πy) ${sym ? "+" : "−"} cos(${m}πx)cos(${n}πy)   frequency ∝ ${n}² + ${m}² = <span class="g">${n * n + m * m}</span>\n<span class="d">each grain jiggles in proportion to how much its spot moves, so grains drift until they reach a line that stays still</span>`;
    };
    p.querySelectorAll(".chl-m").forEach(b => b.addEventListener("click", () => { p.querySelectorAll(".chl-m").forEach(x => x.classList.toggle("on", x === b)); mode = MODES[+b.dataset.i]; fresh(); }));
    p.querySelector(".chl-sym").addEventListener("click", e => { sym = !sym; e.target.classList.toggle("on", sym); fresh(); }); p.querySelector(".chl-re").addEventListener("click", fresh);
    fresh();
  },
  start() { ch.start(); }, stop() { ch.stop(); }
});

/* ================================================================ Solitons (KdV) */
const so = looper();
registerAtom({
  id: "soliton", name: "Solitons", domain: "analysis", fields: ["pdes", "dynamical-systems"],
  html: `<h3>Solitons — waves that pass through each other and survive</h3>
    <p class="ahint">In the Korteweg–de Vries equation a wave's speed depends on its height, and taller waves are thinner. Start a tall wave behind a short one: it catches up, the two merge into one, and then — astonishingly — they separate again with their shapes intact, only shifted.</p>
    <div class="achips"><label class="achk">tall wave k₁ <input type="range" class="so-a" min="0.8" max="1.6" step="0.01" value="1.3"></label><label class="achk">short wave k₂ <input type="range" class="so-b" min="0.4" max="1" step="0.01" value="0.7"></label><button class="achip so-p on">❚❚ pause</button><button class="achip so-re">restart</button></div>
    <canvas class="acv so-cv"></canvas>
    <div class="aout so-out"></div>
    <p class="awhy">John Scott Russell followed a single "wave of translation" on horseback along the Union Canal near Edinburgh in 1834. Korteweg and de Vries wrote its equation, u_t + 6uu_x + u_xxx = 0, in 1895. In 1965 Norman Zabusky and Martin Kruskal saw on a computer that these waves collide elastically, and named them solitons; the exact two-soliton formula drawn here comes from Ryogo Hirota's method (1971), and the inverse scattering transform (Gardner, Greene, Kruskal, Miura 1967) solves the equation completely. Solitons now carry signals through optical fibres.</p>`,
  build(p) {
    const c = p.querySelector(".so-cv"), out = p.querySelector(".so-out"), dims = sized(c, 320), aI = p.querySelector(".so-a"), bI = p.querySelector(".so-b");
    let t = -9, play = !AtomKit.reduced;
    const U = (x, t, k1, k2) => { const e1 = k1 * (x + 10) - k1 ** 3 * t, e2 = k2 * (x + 3) - k2 ** 3 * t, A = ((k1 - k2) / (k1 + k2)) ** 2, F = x2 => { const a = k1 * (x2 + 10) - k1 ** 3 * t, b = k2 * (x2 + 3) - k2 ** 3 * t; return Math.log(1 + Math.exp(a) + Math.exp(b) + A * Math.exp(a + b)); }, hh = .01; return 2 * (F(x + hh) - 2 * F(x) + F(x - hh)) / (hh * hh); };
    so.fn = () => {
      const k1 = +aI.value, k2 = +bI.value; if (play) { t += .03; if (t > 14) t = -9; }
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const xs = -30, xe = 40, X = x => 14 + (w - 28) * (x - xs) / (xe - xs), ymax = k1 * k1 / 2 * 1.25, Y = u => h - 30 - (h - 60) * u / ymax;
      ctx.strokeStyle = "rgba(122,168,255,.25)"; ctx.beginPath(); ctx.moveTo(14, Y(0)); ctx.lineTo(w - 14, Y(0)); ctx.stroke();
      ctx.beginPath(); for (let i = 0; i <= 700; i++) { const x = xs + (xe - xs) * i / 700, u = U(x, t, k1, k2); i ? ctx.lineTo(X(x), Y(u)) : ctx.moveTo(X(x), Y(u)); } ctx.lineTo(X(xe), Y(0)); ctx.lineTo(X(xs), Y(0)); ctx.closePath();
      const g = ctx.createLinearGradient(0, Y(ymax), 0, Y(0)); g.addColorStop(0, "rgba(63,208,201,.75)"); g.addColorStop(1, "rgba(63,208,201,.08)"); ctx.fillStyle = g; ctx.fill();
      ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 700; i++) { const x = xs + (xe - xs) * i / 700; i ? ctx.lineTo(X(x), Y(U(x, t, k1, k2))) : ctx.moveTo(X(x), Y(U(x, t, k1, k2))); } ctx.stroke();
      const shift = Math.log(((k1 + k2) / (k1 - k2)) ** 2);
      out.innerHTML = `time ${t.toFixed(1)}   tall wave: height k₁²/2 = ${(k1 * k1 / 2).toFixed(2)}, speed k₁² = ${(k1 * k1).toFixed(2)}   short wave: height ${(k2 * k2 / 2).toFixed(2)}, speed ${(k2 * k2).toFixed(2)}\nafter the collision the tall wave is ${(shift / k1).toFixed(2)} units ahead of where it would have been, the short one ${(shift / k2).toFixed(2)} units behind — the only trace of the meeting`;
    };
    const pb = p.querySelector(".so-p"); pb.addEventListener("click", () => { play = !play; pb.classList.toggle("on", play); pb.textContent = play ? "❚❚ pause" : "▶ play"; });
    p.querySelector(".so-re").addEventListener("click", () => t = -9);
  },
  start() { so.start(); }, stop() { so.stop(); }
});

/* ================================================================ Islamic star patterns (Hankin's method) */
const GIR = {
  "4.8.8 (squares & octagons)": { polys(W, H, s) { const o = [], a = s / (1 + Math.SQRT2); for (let i = -1; i * s < W + s; i++) for (let j = -1; j * s < H + s; j++) { const cx = i * s, cy = j * s; o.push(reg(cx, cy, 8, s / 2 / Math.cos(Math.PI / 8), Math.PI / 8)); o.push(reg(cx + s / 2, cy + s / 2, 4, a / Math.SQRT2, Math.PI / 4)); } return o; } },
  "6 (hexagons)": { polys(W, H, s) { const o = [], r = s / Math.sqrt(3); for (let i = -1; i * s < W + s; i++) for (let j = -1; j * r * 1.5 < H + s; j++) o.push(reg(i * s + (j % 2 ? s / 2 : 0), j * r * 1.5, 6, r, Math.PI / 6)); return o; } },
  "3.6.3.6 (hexagons & triangles)": { polys(W, H, s) { const o = [], r = s / 2; for (let i = -1; i * s < W + s; i++) for (let j = -1; j * s * Math.sqrt(3) / 2 < H + s; j++) { const cx = i * s + (j % 2 ? s / 2 : 0), cy = j * s * Math.sqrt(3) / 2; o.push(reg(cx, cy, 6, r, 0)); o.push(reg(cx + s / 2, cy + r / Math.sqrt(3), 3, r / Math.sqrt(3), Math.PI / 2)); o.push(reg(cx + s / 2, cy - r / Math.sqrt(3), 3, r / Math.sqrt(3), -Math.PI / 2)); } return o; } },
  "4 (squares)": { polys(W, H, s) { const o = []; for (let i = -1; i * s < W + s; i++) for (let j = -1; j * s < H + s; j++) o.push(reg(i * s, j * s, 4, s / Math.SQRT2, Math.PI / 4)); return o; } }
};
function reg(cx, cy, n, r, a0) { return [...Array(n)].map((_, k) => [cx + r * Math.cos(a0 + 2 * Math.PI * k / n), cy + r * Math.sin(a0 + 2 * Math.PI * k / n)]); }
function hankin(P, theta) { // rays from each edge midpoint, tilted theta from the edge, meeting the next edge's ray
  const n = P.length, segs = [], cen = P.reduce((s, q) => [s[0] + q[0] / n, s[1] + q[1] / n], [0, 0]);
  for (let i = 0; i < n; i++) {
    const A = P[i], B = P[(i + 1) % n], Cq = P[(i + 2) % n], m1 = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2], m2 = [(B[0] + Cq[0]) / 2, (B[1] + Cq[1]) / 2];
    const e1 = Math.atan2(B[1] - A[1], B[0] - A[0]), e2 = Math.atan2(Cq[1] - B[1], Cq[0] - B[0]), inward = (m, e) => { const nx = Math.cos(e + Math.PI / 2), ny = Math.sin(e + Math.PI / 2); return (cen[0] - m[0]) * nx + (cen[1] - m[1]) * ny > 0 ? 1 : -1; };
    const s1 = inward(m1, e1), s2 = inward(m2, e2), d1 = [Math.cos(e1 + s1 * theta), Math.sin(e1 + s1 * theta)], d2 = [Math.cos(e2 + Math.PI - s2 * theta), Math.sin(e2 + Math.PI - s2 * theta)];
    const det = d1[0] * -d2[1] + d2[0] * d1[1]; if (Math.abs(det) < 1e-9) continue; const dx = m2[0] - m1[0], dy = m2[1] - m1[1], t = (dx * -d2[1] + d2[0] * dy) / det; if (t <= 0) continue;
    const X = [m1[0] + t * d1[0], m1[1] + t * d1[1]]; segs.push([m1, X], [X, m2]);
  }
  return segs;
}
registerAtom({
  id: "girih", name: "Islamic star patterns", domain: "geometry", fields: ["classical-geometry"],
  html: `<h3>Islamic star patterns — rays from the midpoints of a tiling</h3>
    <p class="ahint">Start from a simple tiling of regular polygons. From the midpoint of every edge send out two rays at a fixed contact angle, and stop each ray where it meets its neighbour. Stars and rosettes appear. Change the angle and the tiling.</p>
    <div class="achips">${Object.keys(GIR).map((k, i) => `<button class="achip gi-t${i ? "" : " on"}" data-k="${k}">${k}</button>`).join("")}<label class="achk">contact angle <input type="range" class="gi-a" min="15" max="80" step="0.5" value="67.5"> <b class="gi-av"></b></label><button class="achip gi-g">show the tiling</button></div>
    <canvas class="acv gi-cv"></canvas>
    <div class="aout gi-out"></div>
    <p class="awhy">This "polygons in contact" method was described by E. H. Hankin in 1925 from studying Mughal and Persian designs, and later made systematic by Craig Kaplan (2005). Medieval craftsmen also used a set of five "girih" tiles — decagon, pentagon, bowtie, rhombus and hexagon — decorated with lines that join up across tiles. In 2007 Peter Lu and Paul Steinhardt showed that the girih patterns of the Darb-i Imam shrine in Isfahan (1453) are nearly perfect quasicrystalline, Penrose-like tilings, five centuries before Penrose.</p>`,
  build(p) {
    const c = p.querySelector(".gi-cv"), out = p.querySelector(".gi-out"), dims = sized(c, 400), aI = p.querySelector(".gi-a");
    let T = Object.keys(GIR)[0], grid = false;
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const th = +aI.value * Math.PI / 180, s = Math.min(w, h) / 3.2, P = GIR[T].polys(w, h, s);
      p.querySelector(".gi-av").textContent = (+aI.value).toFixed(1) + "°";
      ctx.fillStyle = "#130a24"; ctx.fillRect(0, 0, w, h);
      if (grid) P.forEach(q => { ctx.strokeStyle = "rgba(122,168,255,.35)"; ctx.lineWidth = 1; ctx.beginPath(); q.forEach((v, i) => i ? ctx.lineTo(...v) : ctx.moveTo(...v)); ctx.closePath(); ctx.stroke(); });
      const segs = P.flatMap(q => hankin(q, th));
      ctx.lineCap = "round"; [[7, "#0e0618"], [5, C.gold], [1.6, "#130a24"]].forEach(([lw, col]) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); segs.forEach(([a, b]) => { ctx.moveTo(...a); ctx.lineTo(...b); }); ctx.stroke(); });
      out.innerHTML = `${T}: contact angle ${(+aI.value).toFixed(1)}°   <span class="d">every segment starts at an edge midpoint of the underlying tiling; turn "show the tiling" on to see it</span>`;
    }
    chips(p, ".gi-t", b => { T = b.dataset.k; draw(); }); aI.addEventListener("input", draw);
    p.querySelector(".gi-g").addEventListener("click", e => { grid = !grid; e.target.classList.toggle("on", grid); draw(); });
    this._go = draw;
  },
  start() { if (this._go) this._go(); }
});
})();
