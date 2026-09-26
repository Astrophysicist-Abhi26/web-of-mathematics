/* ============================================================
   THE WEB OF MATHEMATICS — atoms-topology.js
   Topology you can touch (domain: geometry) and the cube group (domain: algebra)
     hairyball · utilities · mugdonut · mobius · rubik
   ============================================================ */
(function () {
"use strict";
const { C } = AtomKit;
const cv = (el, h) => AtomKit.canvas(el, h);
function sized(c, h) { let d = cv(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = cv(c, h); return d; }; }
function looper() {
  const L = { raf: null, fn: null,
    start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } },
    stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } };
  return L;
}
const sub = (a, b) => a.map((x, i) => x - b[i]);
const add = (a, b) => a.map((x, i) => x + b[i]);
const scl = (a, s) => a.map(x => x * s);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const len = a => Math.sqrt(dot(a, a));
const nrm = a => { const l = len(a) || 1; return scl(a, 1 / l); };
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const view = (yaw, pitch) => v => {
  const x = v[0] * Math.cos(yaw) + v[2] * Math.sin(yaw), z0 = -v[0] * Math.sin(yaw) + v[2] * Math.cos(yaw);
  return [x, v[1] * Math.cos(pitch) - z0 * Math.sin(pitch), v[1] * Math.sin(pitch) + z0 * Math.cos(pitch)];
};
const unview = (yaw, pitch) => r => {
  const y = r[1] * Math.cos(pitch) + r[2] * Math.sin(pitch), z0 = -r[1] * Math.sin(pitch) + r[2] * Math.cos(pitch), x = r[0];
  return [x * Math.cos(yaw) - z0 * Math.sin(yaw), y, x * Math.sin(yaw) + z0 * Math.cos(yaw)];
};
function orbit(c, st, when) {
  let last = null;
  c.addEventListener("pointerdown", e => { if (when && !when(e)) return; last = [e.clientX, e.clientY]; st.hold = true; try { c.setPointerCapture(e.pointerId); } catch (_) {} });
  c.addEventListener("pointermove", e => {
    if (!last) return;
    st.yaw += (e.clientX - last[0]) * .01; st.pitch = Math.max(-1.5, Math.min(1.5, st.pitch + (e.clientY - last[1]) * .01));
    last = [e.clientX, e.clientY];
  });
  const up = () => { last = null; st.hold = false; };
  c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
}
const chips = (p, sel, cb) => p.querySelectorAll(sel).forEach(b => b.addEventListener("click", () => { p.querySelectorAll(sel).forEach(x => x.classList.toggle("on", x === b)); cb(b); }));
const smooth = t => t * t * (3 - 2 * t);
const clamp01 = t => Math.max(0, Math.min(1, t));

/* ================================================================ Hairy ball */
const TR = 1, tr = .42;
const torusX = (u, v) => [(TR + tr * Math.cos(v)) * Math.cos(u), tr * Math.sin(v), (TR + tr * Math.cos(v)) * Math.sin(u)];
const torusN = (u, v) => [Math.cos(v) * Math.cos(u), Math.sin(v), Math.cos(v) * Math.sin(u)];
const torusDu = (u, v) => [-(TR + tr * Math.cos(v)) * Math.sin(u), 0, (TR + tr * Math.cos(v)) * Math.cos(u)];
const torusDv = (u, v) => [-tr * Math.sin(v) * Math.cos(u), tr * Math.cos(v), -tr * Math.sin(v) * Math.sin(u)];
const NA = [0, 1, 0], NB = [1, 0, 0];
const tang = (d, n) => sub(d, scl(n, dot(d, n)));
const FIELDS_S = {
  "spin about an axis": x => cross(NA, x),
  "flow pole to pole": x => tang(scl(NA, -1), x),
  "one double cowlick": x => add(scl(NB, 1 - dot(NA, x)), scl(sub(NA, x), dot(x, NB)))
};
const FIELDS_T = {
  "around the ring": (u, v) => nrm(torusDu(u, v)),
  "around the tube": (u, v) => nrm(torusDv(u, v)),
  "downhill (height)": (u, v) => tang([-1, 0, 0], torusN(u, v))
};
// a generic rotation, so no grid vertex sits exactly on a preset zero
const GR = (() => { const a = .37, b = .61, c = .23, ca = Math.cos(a), sa = Math.sin(a), cb = Math.cos(b), sb = Math.sin(b), cc = Math.cos(c), sc = Math.sin(c);
  return v => { let [x, y, z] = v; [y, z] = [ca * y - sa * z, sa * y + ca * z]; [x, z] = [cb * x + sb * z, -sb * x + cb * z]; [x, y] = [cc * x - sc * y, sc * x + cc * y]; return [x, y, z]; }; })();
const FIB = (() => { const n = 1100, g = Math.PI * (3 - Math.sqrt(5)), o = []; for (let i = 0; i < n; i++) { const y = 1 - 2 * (i + .5) / n, r = Math.sqrt(1 - y * y); o.push([r * Math.cos(g * i), y, r * Math.sin(g * i)]); } return o; })();
const hb = looper();
registerAtom({
  id: "hairyball", name: "Hairy ball theorem", domain: "geometry", fields: ["algebraic-topology", "differential-topology"],
  html: `<h3>You can't comb a hairy ball flat — but you can comb a hairy doughnut</h3>
    <p class="ahint">Every point of the surface grows a hair lying flat along it: a tangent vector field. Drag across the surface to comb it. On a sphere, however you comb, somewhere a cowlick survives (red rings). Each cowlick has an <i>index</i> — how many times the hairs turn as you walk once around it — and the indices always add up to 2. On a torus they add up to 0, and a perfect combing exists.</p>
    <div class="achips"><button class="achip hb-s on" data-s="sphere">sphere</button><button class="achip hb-s" data-s="torus">torus</button><span class="achk">start from</span><span class="hb-presets"></span></div>
    <div class="achips"><button class="achip hb-t on" data-t="comb">✋ comb</button><button class="achip hb-t" data-t="turn">↻ turn</button><button class="achip hb-spin on">auto-rotate</button><button class="achip hb-clr">undo combing</button></div>
    <canvas class="acv hb-cv" style="cursor:crosshair"></canvas>
    <div class="aout hb-out"></div>
    <p class="awhy">Poincaré (1885) and Brouwer (1912) proved that every continuous tangent field on a sphere vanishes somewhere; the Poincaré–Hopf theorem says the indices of the zeros always add up to the Euler characteristic V − E + F — 2 for the sphere, 0 for the torus, 2 − 2g for a surface with g holes. So somewhere on Earth the wind is not blowing, and a fusion reactor's magnetic cage has to be a doughnut, not a ball.</p>`,
  build(p) {
    const c = p.querySelector(".hb-cv"), out = p.querySelector(".hb-out"), dims = sized(c, 420);
    const st = { yaw: .4, pitch: .45, hold: false }; let tool = "comb", spin = !AtomKit.reduced, surf = "sphere", preset = "spin about an axis", strokes = [], zeros = [], zdirty = true, lastZ = 0, prev = null;
    orbit(c, st, () => tool === "turn");
    const presets = () => { const P = surf === "sphere" ? FIELDS_S : FIELDS_T; p.querySelector(".hb-presets").innerHTML = Object.keys(P).map(k => `<button class="achip hb-p${k === preset ? " on" : ""}" data-k="${k}">${k}</button>`).join(" ");
      p.querySelectorAll(".hb-p").forEach(b => b.addEventListener("click", () => { preset = b.dataset.k; strokes = []; zdirty = true; presets(); })); };
    const combAt = (x, n) => { let v = [0, 0, 0]; for (const s of strokes) { const d2 = (x[0] - s.c[0]) ** 2 + (x[1] - s.c[1]) ** 2 + (x[2] - s.c[2]) ** 2; if (d2 < .5) v = add(v, scl(tang(s.d, n), 1.6 * Math.exp(-d2 / .07))); } return v; };
    const fS = x => add(FIELDS_S[preset](x), combAt(x, x));
    const fT = (u, v) => { const X = torusX(u, v); return add(FIELDS_T[preset](u, v), combAt(X, torusN(u, v))); };
    function windLoop(pts, F, e1, e2) {
      const ang = v => Math.atan2(dot(v, e2), dot(v, e1)), wrap = d => { while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; return d; };
      const seg = (P0, P1, a0, a1, depth) => { const d = wrap(a1 - a0); if (Math.abs(d) < .5 || depth > 11) return d; const M = [(P0[0] + P1[0]) / 2, (P0[1] + P1[1]) / 2], am = ang(F(M)); return seg(P0, M, a0, am, depth + 1) + seg(M, P1, am, a1, depth + 1); };
      const A = pts.map(q => ang(F(q))); let tot = 0; for (let i = 0; i < pts.length; i++) tot += seg(pts[i], pts[(i + 1) % pts.length], A[i], A[(i + 1) % pts.length], 0);
      return Math.round(tot / (2 * Math.PI));
    }
    function findZeros() {
      const cells = [];
      if (surf === "sphere") {
        const nt = 36, np = 72, X = ([th, ph]) => GR([Math.sin(th) * Math.cos(ph), Math.cos(th), Math.sin(th) * Math.sin(ph)]), F = q => fS(X(q));
        for (let i = 0; i < nt; i++) for (let j = 0; j < np; j++) {
          const t0 = Math.PI * i / nt, t1 = Math.PI * (i + 1) / nt, p0 = 2 * Math.PI * j / np, p1 = 2 * Math.PI * (j + 1) / np, cen = X([(t0 + t1) / 2, (p0 + p1) / 2]);
          const e1 = nrm(tang(Math.abs(cen[0]) < .9 ? [1, 0, 0] : [0, 0, 1], cen)), e2 = cross(cen, e1);
          const k = windLoop([[t0, p0], [t0, p1], [t1, p1], [t1, p0]], F, e1, e2); if (k) cells.push({ i, j, k, x: cen });
        }
      } else {
        const nu = 64, nv = 24, F = ([u, v]) => fT(u, v);
        for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
          const u0 = 2 * Math.PI * (i + .31) / nu, u1 = 2 * Math.PI * (i + 1.31) / nu, v0 = 2 * Math.PI * (j + .27) / nv, v1 = 2 * Math.PI * (j + 1.27) / nv, u = (u0 + u1) / 2, v = (v0 + v1) / 2;
          const e1 = nrm(torusDu(u, v)), e2 = nrm(tang(torusDv(u, v), e1));
          const k = windLoop([[u0, v0], [u1, v0], [u1, v1], [u0, v1]], F, e1, e2); if (k) cells.push({ i, j, k, x: torusX(u, v) });
        }
      }
      zeros = []; const seen = new Set();
      for (const cl of cells) { if (seen.has(cl)) continue; const grp = [cl]; seen.add(cl);
        for (let q = 0; q < grp.length; q++) for (const o of cells) if (!seen.has(o) && Math.sign(o.k) === Math.sign(cl.k) && Math.abs(o.i - grp[q].i) <= 1 && Math.abs(o.j - grp[q].j) <= 1) { seen.add(o); grp.push(o); }
        zeros.push({ k: grp.reduce((t, g) => t + g.k, 0), x: grp[0].x }); }
      const sum = zeros.reduce((s, z) => s + z.k, 0), chi = surf === "sphere" ? 2 : 0;
      out.innerHTML = `${surf}: ${zeros.length ? `${zeros.length} cowlick${zeros.length > 1 ? "s" : ""}, indices ${zeros.map(z => (z.k > 0 ? "+" : "−") + Math.abs(z.k)).join(" ")}` : '<span class="t">no cowlicks at all — combed perfectly flat</span>'}\n` +
        `sum of indices = <span class="g">${sum}</span> = Euler characteristic χ(${surf}) = ${chi}${strokes.length ? `   <span class="d">(${strokes.length} comb strokes)</span>` : ""}`;
    }
    function screenInfo() { const { w, h } = dims(); return { cx: w / 2, cy: h / 2, R: surf === "sphere" ? Math.min(w, h) * .42 : Math.min(w * .3, h * .62) }; }
    function draw() {
      const { ctx, w, h } = dims(), { cx, cy, R } = screenInfo(), Vw = view(st.yaw, st.pitch); ctx.clearRect(0, 0, w, h);
      const S = q => [cx + q[0] * R, cy - q[1] * R];
      const hair = (x, v, depthOK) => { const q = Vw(x); if (!depthOK(q)) return; const m = len(v), vv = Vw(scl(v, 1 / (m || 1))), L = .085 * Math.min(1, m / .3), a = S(q), b = S(add(q, scl(vv, L)));
        const t = Math.min(1, m / .3); ctx.strokeStyle = `rgba(${Math.round(255 - 10 * t)},${Math.round(90 + 106 * t)},${Math.round(90 - 9 * t)},${.55 + .45 * (q[2] + 1) / 2})`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); };
      if (surf === "sphere") {
        const g = ctx.createRadialGradient(cx - R * .35, cy - R * .4, R * .1, cx, cy, R); g.addColorStop(0, "#3a2466"); g.addColorStop(1, "#130a26");
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.fill(); ctx.strokeStyle = "rgba(180,140,255,.35)"; ctx.stroke();
        for (const x of FIB) hair(x, fS(x), q => q[2] > .02);
      } else {
        const nu = 56, nv = 22, quads = [], Lt = nrm([-.4, .7, .6]);
        for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
          const u = 2 * Math.PI * (i + .5) / nu, v = 2 * Math.PI * (j + .5) / nv, cs = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]].map(([a, b]) => Vw(torusX(2 * Math.PI * a / nu, 2 * Math.PI * b / nv)));
          const n = Vw(torusN(u, v)); if (n[2] <= 0) continue;
          quads.push({ cs, z: cs.reduce((s, q) => s + q[2], 0) / 4, u, v, b: .25 + .6 * Math.max(0, dot(n, Lt)) });
        }
        quads.sort((a, b) => a.z - b.z);
        for (const Q of quads) { ctx.fillStyle = `hsl(265,45%,${10 + 22 * Q.b}%)`; ctx.beginPath(); Q.cs.forEach((q, k) => k ? ctx.lineTo(...S(q)) : ctx.moveTo(...S(q))); ctx.closePath(); ctx.fill(); ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = .6; ctx.stroke(); hair(torusX(Q.u, Q.v), fT(Q.u, Q.v), () => true); }
      }
      for (const z of zeros) { const q = Vw(z.x); if (q[2] < (surf === "sphere" ? 0 : -.2)) continue; const [x, y] = S(q); ctx.strokeStyle = "#ff5a5a"; ctx.lineWidth = 2.4; ctx.shadowColor = "#ff5a5a"; ctx.shadowBlur = 10; ctx.beginPath(); ctx.arc(x, y, 11, 0, 7); ctx.stroke(); ctx.shadowBlur = 0;
        ctx.fillStyle = "#fff"; ctx.font = "600 11px 'IBM Plex Mono', monospace"; ctx.fillText((z.k > 0 ? "+" : "−") + Math.abs(z.k), x + 13, y - 9); }
    }
    function pick(e) {
      const { cx, cy, R } = screenInfo(), r = c.getBoundingClientRect(), sx = (e.clientX - r.left - cx) / R, sy = -(e.clientY - r.top - cy) / R, U = unview(st.yaw, st.pitch);
      if (surf === "sphere") { const d = sx * sx + sy * sy; return d < 1 ? U([sx, sy, Math.sqrt(1 - d)]) : null; }
      const Vw = view(st.yaw, st.pitch); let best = null, bz = -9;
      for (let i = 0; i < 90; i++) for (let j = 0; j < 36; j++) { const u = 2 * Math.PI * i / 90, v = 2 * Math.PI * j / 36, X = torusX(u, v), q = Vw(X); if (Vw(torusN(u, v))[2] <= 0) continue; if (Math.hypot(q[0] - sx, q[1] - sy) < .06 && q[2] > bz) { bz = q[2]; best = X; } }
      return best;
    }
    c.addEventListener("pointerdown", e => { if (tool !== "comb") return; prev = pick(e); st.hold = true; try { c.setPointerCapture(e.pointerId); } catch (_) {} });
    c.addEventListener("pointermove", e => { if (tool !== "comb" || !prev) return; const q = pick(e); if (!q) return; const d = sub(q, prev); if (len(d) > .05) { strokes.push({ c: scl(add(q, prev), .5), d: nrm(d) }); prev = q; zdirty = true; } });
    const up = () => { if (tool === "comb") { prev = null; st.hold = false; } }; c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    chips(p, ".hb-s", b => { surf = b.dataset.s; preset = Object.keys(surf === "sphere" ? FIELDS_S : FIELDS_T)[0]; strokes = []; zdirty = true; presets(); });
    chips(p, ".hb-t", b => { tool = b.dataset.t; c.style.cursor = tool === "comb" ? "crosshair" : "grab"; });
    const sb = p.querySelector(".hb-spin"); sb.classList.toggle("on", spin); sb.addEventListener("click", () => { spin = !spin; sb.classList.toggle("on", spin); });
    p.querySelector(".hb-clr").addEventListener("click", () => { strokes = []; zdirty = true; });
    hb.fn = () => { const now = performance.now(); if (spin && !st.hold) st.yaw += .004; if (zdirty && now - lastZ > 120) { zdirty = false; lastZ = now; findZeros(); } draw(); };
    presets(); findZeros(); draw();
  },
  start() { hb.start(); }, stop() { hb.stop(); }
});

/* ================================================================ Three utilities */
const UT_PLANE = [[.18, .2], [.5, .2], [.82, .2], [.18, .8], [.5, .8], [.82, .8]];
const OFFS = [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
// a crossing-free drawing on the torus: the honeycomb with three hexagons, sheared into the square
const UT_TORUS = (() => {
  const s3 = Math.sqrt(3), d = [[0, 1], [s3 / 2, -.5], [-s3 / 2, -.5]], t1 = [s3 / 2, -1.5], shift = [.2, .3];
  const toT = x => { const be = 2 * x[0] / (3 * s3), al = (1.5 * be - x[1]) / 3; return [al + shift[0], be + shift[1]]; };
  const fr = v => v.map(z => z - Math.floor(z));
  const H = [0, 1, 2].map(k => [k * t1[0], k * t1[1]]), W = H.map(h => [h[0] + d[0][0], h[1] + d[0][1]]);
  const pos = H.map(h => fr(toT(h))).concat(W.map(w => fr(toT(w)))), off = {};
  H.forEach((h, k) => d.forEach((dm, m) => {
    const cls = ((k + [0, 1, -1][m]) % 3 + 3) % 3, a = toT(h), e = toT([h[0] + dm[0], h[1] + dm[1]]), base = a.map(Math.floor);
    const end = [e[0] - base[0], e[1] - base[1]], wp = pos[3 + cls];
    off[k + "-" + (3 + cls)] = [Math.round(end[0] - wp[0]), Math.round(end[1] - wp[1])];
  }));
  return { pos, off };
})();
registerAtom({
  id: "utilities", name: "Three utilities on a torus", domain: "geometry", fields: ["graph-theory", "algebraic-topology", "point-set-topology"],
  html: `<h3>Three houses, three utilities — impossible on paper, easy on a doughnut</h3>
    <p class="ahint">Connect each house (gold) to gas, water and electricity (teal) without two pipes crossing. Drag the dots. On the plane the count of crossings never reaches 0. Switch to the torus — a square whose opposite edges are glued — and click a pipe to reroute it through an edge.</p>
    <div class="achips"><button class="achip ut-m on" data-m="plane">plane</button><button class="achip ut-m" data-m="torus">torus</button><button class="achip ut-sol">show a solution</button><button class="achip ut-reset">reset</button></div>
    <canvas class="acv ut-cv"></canvas>
    <div class="aout ut-out"></div>
    <p class="awhy">The graph K₃,₃ is not planar. Proof by Euler: a planar drawing has V − E + F = 2, so with V = 6 and E = 9 it would need F = 5 faces; but every face of this graph has at least 4 edges and each edge borders 2 faces, so 4F ≤ 2E = 18 and F ≤ 4. Kuratowski (1930) showed that K₃,₃ and K₅ are the only obstacles: a graph is planar exactly when it contains neither. On a torus V − E + F = 0, so F = 3 — three hexagons, and every pipe fits.</p>`,
  build(p) {
    const c = p.querySelector(".ut-cv"), out = p.querySelector(".ut-out"), dims = sized(c, 400);
    let mode = "plane", pos, off, drag = null, moved = false;
    const E = []; for (let h = 0; h < 3; h++) for (let u = 3; u < 6; u++) E.push([h, u]);
    const reset = () => { pos = UT_PLANE.map(q => q.slice()); off = {}; E.forEach(([h, u]) => off[h + "-" + u] = [0, 0]); draw(); };
    const frame = () => { const { w, h } = dims(); if (mode === "plane") return { ox: 20, oy: 14, sw: w - 40, sh: h - 28 }; const S = Math.min(w - 40, h - 36); return { ox: (w - S) / 2, oy: (h - S) / 2, sw: S, sh: S }; };
    const seg = e => { const [a, b] = E[e], o = mode === "torus" ? off[a + "-" + b] : [0, 0]; return [pos[a], [pos[b][0] + o[0], pos[b][1] + o[1]]]; };
    function inter(P, Q, R, S) { const d = (Q[0] - P[0]) * (S[1] - R[1]) - (Q[1] - P[1]) * (S[0] - R[0]); if (Math.abs(d) < 1e-12) return null;
      const t = ((R[0] - P[0]) * (S[1] - R[1]) - (R[1] - P[1]) * (S[0] - R[0])) / d, s = ((R[0] - P[0]) * (Q[1] - P[1]) - (R[1] - P[1]) * (Q[0] - P[0])) / d;
      return t > 1e-6 && t < 1 - 1e-6 && s > 1e-6 && s < 1 - 1e-6 ? [P[0] + t * (Q[0] - P[0]), P[1] + t * (Q[1] - P[1])] : null; }
    function crossings() {
      const X = [], bad = new Set(), sh = mode === "torus" ? [-2, -1, 0, 1, 2] : [0];
      for (let e = 0; e < 9; e++) for (let f = e + 1; f < 9; f++) { const [P, Q] = seg(e), [R, S] = seg(f);
        for (const m of sh) for (const n of sh) { const q = inter(P, Q, [R[0] + m, R[1] + n], [S[0] + m, S[1] + n]); if (q) { X.push(q); bad.add(e); bad.add(f); } } }
      return { X, bad };
    }
    function draw() {
      const { ctx, w, h } = dims(), F = frame(), M = ([x, y]) => [F.ox + x * F.sw, F.oy + y * F.sh]; ctx.clearRect(0, 0, w, h);
      const { X, bad } = crossings();
      if (mode === "torus") {
        ctx.fillStyle = "rgba(180,140,255,.07)"; ctx.fillRect(F.ox, F.oy, F.sw, F.sh);
        const arrow = (x0, y0, x1, y1, col, n) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); const mx = (x0 + x1) / 2, my = (y0 + y1) / 2, ang = Math.atan2(y1 - y0, x1 - x0);
          for (let k = 0; k < n; k++) { const ax = mx + Math.cos(ang) * k * 9, ay = my + Math.sin(ang) * k * 9; ctx.beginPath(); ctx.moveTo(ax - 8 * Math.cos(ang - .5), ay - 8 * Math.sin(ang - .5)); ctx.lineTo(ax, ay); ctx.lineTo(ax - 8 * Math.cos(ang + .5), ay - 8 * Math.sin(ang + .5)); ctx.stroke(); } };
        arrow(F.ox, F.oy + F.sh, F.ox + F.sw, F.oy + F.sh, C.pink, 1); arrow(F.ox, F.oy, F.ox + F.sw, F.oy, C.pink, 1);
        arrow(F.ox, F.oy + F.sh, F.ox, F.oy, C.blue, 2); arrow(F.ox + F.sw, F.oy + F.sh, F.ox + F.sw, F.oy, C.blue, 2);
        ctx.save(); ctx.beginPath(); ctx.rect(F.ox, F.oy, F.sw, F.sh); ctx.clip();
      }
      const sh = mode === "torus" ? [-1, 0, 1] : [0];
      E.forEach((_, e) => { const [P, Q] = seg(e); ctx.strokeStyle = bad.has(e) ? "rgba(255,120,71,.95)" : "rgba(127,227,214,.85)"; ctx.lineWidth = 3;
        for (const m of sh) for (const n of sh) { ctx.beginPath(); ctx.moveTo(...M([P[0] + m, P[1] + n])); ctx.lineTo(...M([Q[0] + m, Q[1] + n])); ctx.stroke(); } });
      if (mode === "torus") ctx.restore();
      ctx.fillStyle = "#ff5a5a"; X.forEach(q => { const r = mode === "torus" ? q.map(z => z - Math.floor(z)) : q; ctx.beginPath(); ctx.arc(...M(r), 5, 0, 7); ctx.fill(); });
      const icon = ["🏠", "🏠", "🏠", "🔥", "💧", "⚡"];
      pos.forEach((q, i) => { const [x, y] = M(q); ctx.fillStyle = i < 3 ? C.gold : C.teal; ctx.shadowColor = ctx.fillStyle; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(x, y, 15, 0, 7); ctx.fill(); ctx.shadowBlur = 0; ctx.font = "15px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(icon[i], x, y + 1); ctx.textAlign = "start"; ctx.textBaseline = "alphabetic"; });
      out.innerHTML = `crossings: <span class="${X.length ? "r" : "t"}">${X.length}</span>   ${X.length ? (mode === "plane" ? "on the plane the best possible is 1 — Euler's formula forbids 0" : "click a red pipe to send it through a glued edge, or drag the dots") : '<span class="t">no crossings: K₃,₃ drawn on a torus</span>'}`;
    }
    const at = e => { const r = c.getBoundingClientRect(), F = frame(); return [(e.clientX - r.left - F.ox) / F.sw, (e.clientY - r.top - F.oy) / F.sh]; };
    c.addEventListener("pointerdown", e => { const q = at(e), F = frame(); moved = false; drag = null;
      pos.forEach((v, i) => { if (Math.hypot((v[0] - q[0]) * F.sw, (v[1] - q[1]) * F.sh) < 18) drag = i; });
      if (drag !== null) { try { c.setPointerCapture(e.pointerId); } catch (_) {} return; }
      if (mode !== "torus") return;
      const sh = [-1, 0, 1]; let best = null, bd = 9;
      E.forEach((_, k) => { const [P, Q] = seg(k); for (const m of sh) for (const n of sh) { const A = [(P[0] + m) * F.sw, (P[1] + n) * F.sh], B = [(Q[0] + m) * F.sw, (Q[1] + n) * F.sh], X = [q[0] * F.sw, q[1] * F.sh];
        const dx = B[0] - A[0], dy = B[1] - A[1], t = Math.max(0, Math.min(1, ((X[0] - A[0]) * dx + (X[1] - A[1]) * dy) / (dx * dx + dy * dy))), dd = Math.hypot(A[0] + t * dx - X[0], A[1] + t * dy - X[1]); if (dd < bd) { bd = dd; best = k; } } });
      if (best !== null) { const key = E[best].join("-"), i = OFFS.findIndex(o => o[0] === off[key][0] && o[1] === off[key][1]); off[key] = OFFS[(i + 1) % OFFS.length]; draw(); } });
    c.addEventListener("pointermove", e => { if (drag === null) return; moved = true; let q = at(e); q = mode === "torus" ? q.map(z => z - Math.floor(z)) : q.map(z => Math.max(0, Math.min(1, z))); pos[drag] = q; draw(); });
    const up = () => drag = null; c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    chips(p, ".ut-m", b => { mode = b.dataset.m; if (mode === "plane") pos = pos.map(q => q.map(z => Math.max(.03, Math.min(.97, z)))); draw(); });
    p.querySelector(".ut-sol").addEventListener("click", () => { if (mode === "plane") { mode = "torus"; p.querySelectorAll(".ut-m").forEach(x => x.classList.toggle("on", x.dataset.m === "torus")); } pos = UT_TORUS.pos.map(q => q.slice()); off = JSON.parse(JSON.stringify(UT_TORUS.off)); draw(); });
    p.querySelector(".ut-reset").addEventListener("click", reset);
    this._go = reset;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Mug ↔ doughnut (WebGL ray-marching) */
const MUG_FS = `precision highp float;
uniform vec2 res; uniform float s, yaw;
float sdTorus(vec3 p, vec2 t){ vec2 q = vec2(length(p.xz) - t.x, p.y); return length(q) - t.y; }
float sdCyl(vec3 p, float r, float h){ vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h); return min(max(d.x, d.y), 0.) + length(max(d, 0.)); }
float smin(float a, float b, float k){ float h = clamp(.5 + .5 * (b - a) / k, 0., 1.); return mix(b, a, h) - k * h * (1. - h); }
float map(vec3 p){
  float a = smoothstep(0., .3, s), b = smoothstep(.25, .85, s), c = smoothstep(.4, 1., s), d = smoothstep(.82, 1., s);
  float rb = mix(.8, .26, b) * (1. - d), hb = mix(.8, .26, b) * (1. - d), cx = mix(0., .42, b);
  vec3 q = p - vec3(cx, 0., 0.);
  float body = sdCyl(q, rb, hb) - .05 * (1. - d);
  float cav = sdCyl(q - vec3(0., .25 + a * 1.4, 0.), rb * .84, hb);
  float cup = max(body, -cav);
  vec3 r = p - vec3(.95, 0., 0.);
  float han = sdTorus(vec3(r.x, r.z, r.y), vec2(mix(.42, .55, c), mix(.11, .27, c)));
  han = max(han, -body);
  return smin(cup, han, .08);
}
void main(){
  vec2 uv = (gl_FragCoord.xy - .5 * res) / res.y;
  vec3 ta = vec3(.5, -.05, 0.), ro = ta + vec3(3.3 * sin(yaw), 1.5, 3.3 * cos(yaw));
  vec3 ww = normalize(ta - ro), uu = normalize(cross(ww, vec3(0., 1., 0.))), vv = cross(uu, ww), rd = normalize(uv.x * uu + uv.y * vv + 1.7 * ww);
  float t = 0.; bool hit = false;
  for (int i = 0; i < 120; i++) { float h = map(ro + rd * t); if (h < .0015) { hit = true; break; } t += h * .85; if (t > 9.) break; }
  if (!hit) { gl_FragColor = vec4(0.); return; }
  vec3 p = ro + rd * t; vec2 e = vec2(.0015, 0.);
  vec3 n = normalize(vec3(map(p + e.xyy) - map(p - e.xyy), map(p + e.yxy) - map(p - e.yxy), map(p + e.yyx) - map(p - e.yyx)));
  vec3 L = normalize(vec3(-.5, .85, .55));
  float dif = max(dot(n, L), 0.), rim = pow(1. - max(dot(n, -rd), 0.), 3.), spe = pow(max(dot(reflect(-L, n), -rd), 0.), 40.);
  vec3 base = mix(vec3(.35, .78, .8), vec3(.96, .7, .32), smoothstep(.2, .9, s));
  vec3 col = base * (.16 + .84 * dif) + vec3(.62, .5, 1.) * rim * .55 + vec3(1.) * spe * .55;
  gl_FragColor = vec4(pow(col, vec3(.9)), 1.);
}`;
const mg = looper();
registerAtom({
  id: "mugdonut", name: "Coffee mug = doughnut", domain: "geometry", fields: ["point-set-topology", "algebraic-topology"],
  html: `<h3>A topologist can't tell a coffee mug from a doughnut</h3>
    <p class="ahint">Topology allows stretching, squashing and bending — but no tearing and no gluing. The mug's cup is only a dent: it can be pushed out flat. Its one real hole is the handle, and the doughnut has exactly one hole too. Slide, or let it morph.</p>
    <div class="achips"><label class="achk">mug ⟷ doughnut <input type="range" class="mg-s" min="0" max="1" step="0.005" value="0" style="width:200px"></label><button class="achip mg-play on">❚❚ pause</button><button class="achip mg-spin on">rotate</button></div>
    <div class="mg-wrap" style="position:relative"><canvas class="acv mg-cv" style="cursor:grab"></canvas></div>
    <div class="aout mg-out"></div>
    <p class="awhy">Two shapes are homeomorphic when one can be deformed continuously into the other, with a continuous way back. For closed surfaces the classification theorem (Möbius, Jordan, Dehn and Heegaard, by 1907) says the number of holes — the genus — decides everything for orientable ones: sphere (0), doughnut and mug (1), pretzel (3). A glass is a sphere with a dent; a pair of spectacles frames, genus 2. The joke that a topologist dunks their doughnut in their coffee mug is usually credited to John Kelley's 1955 textbook era; nobody knows who said it first.</p>`,
  build(p) {
    const c = p.querySelector(".mg-cv"), out = p.querySelector(".mg-out"), sI = p.querySelector(".mg-s");
    const H = 380; let play = !AtomKit.reduced, spin = !AtomKit.reduced, yaw = .9, dir = 1, pause = 0, drag = null;
    const gl = c.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    if (!gl) { c.style.display = "none"; out.innerHTML = '<span class="r">This browser has WebGL switched off, so the 3D morph cannot be drawn.</span>'; return; }
    const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s)); return s; };
    const prog = gl.createProgram(); gl.attachShader(prog, sh(gl.VERTEX_SHADER, "attribute vec2 p; void main(){ gl_Position = vec4(p, 0., 1.); }")); gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, MUG_FS)); gl.linkProgram(prog); gl.useProgram(prog);
    const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, "res"), uS = gl.getUniformLocation(prog, "s"), uYaw = gl.getUniformLocation(prog, "yaw");
    let last = performance.now();
    const words = s => s < .15 ? "a coffee mug: one handle, one hole" : s < .4 ? "the cup is only a dent — push it out" : s < .75 ? "shrink the body into the handle's root" : s < .95 ? "thicken the handle" : "a doughnut: still one hole";
    mg.fn = () => {
      const now = performance.now(), dt = Math.min(.1, (now - last) / 1000); last = now;
      if (play && drag === null) { if (pause > 0) pause -= dt; else { let v = +sI.value + dir * dt / 6; if (v >= 1 || v <= 0) { v = Math.max(0, Math.min(1, v)); dir = -dir; pause = 1.4; } sI.value = v; } }
      if (spin && drag === null) yaw += dt * .35;
      const w = c.clientWidth || 600, dpr = Math.min(1.5, window.devicePixelRatio || 1);
      if (c.width !== Math.round(w * dpr) || c.height !== Math.round(H * dpr)) { c.width = Math.round(w * dpr); c.height = Math.round(H * dpr); c.style.height = H + "px"; }
      gl.viewport(0, 0, c.width, c.height); gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(uRes, c.width, c.height); gl.uniform1f(uS, +sI.value); gl.uniform1f(uYaw, yaw); gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      out.innerHTML = `morph ${Math.round(+sI.value * 100)}%: ${words(+sI.value)}   genus = <span class="g">1</span> throughout   Euler characteristic 2 − 2g = <span class="t">0</span>`;
    };
    const pb = p.querySelector(".mg-play"); pb.classList.toggle("on", play); pb.textContent = play ? "❚❚ pause" : "▶ morph";
    pb.addEventListener("click", () => { play = !play; pb.classList.toggle("on", play); pb.textContent = play ? "❚❚ pause" : "▶ morph"; });
    const spb = p.querySelector(".mg-spin"); spb.classList.toggle("on", spin); spb.addEventListener("click", () => { spin = !spin; spb.classList.toggle("on", spin); });
    sI.addEventListener("input", () => { play = false; pb.classList.remove("on"); pb.textContent = "▶ morph"; });
    c.addEventListener("pointerdown", e => { drag = e.clientX; try { c.setPointerCapture(e.pointerId); } catch (_) {} });
    c.addEventListener("pointermove", e => { if (drag === null) return; yaw -= (e.clientX - drag) * .01; drag = e.clientX; });
    const up = () => drag = null; c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
  },
  start() { mg.start(); }, stop() { mg.stop(); }
});

/* ================================================================ Möbius strip cutter */
const MW = .42;
const mob = (u, v) => { const k = 1 + v * Math.cos(u / 2); return [k * Math.cos(u), v * Math.sin(u / 2), k * Math.sin(u)]; };
const ring = (u, v) => [Math.cos(u), v, Math.sin(u)];
const mo = looper();
registerAtom({
  id: "mobius", name: "Möbius strip cutter", domain: "geometry", fields: ["point-set-topology", "low-dim-topology"],
  html: `<h3>The Möbius strip — one side, one edge, and very strange scissors</h3>
    <p class="ahint">Give a paper band a half-twist before gluing. An ant walking down the middle comes back upside down; it needs two laps to get home. Now cut it: down the middle, or a third of the way in — and compare with an ordinary band.</p>
    <div class="achips"><button class="achip mo-m on" data-m="strip">the strip</button><button class="achip mo-m" data-m="ant">ant walk</button><button class="achip mo-m" data-m="half">cut down the middle</button><button class="achip mo-m" data-m="third">cut a third of the way in</button><button class="achip mo-m" data-m="band">ordinary band, cut</button><button class="achip mo-re">replay</button></div>
    <canvas class="acv mo-cv" style="cursor:grab"></canvas>
    <div class="aout mo-out"></div>
    <p class="awhy">August Möbius and Johann Listing found the strip independently in 1858. It is the simplest non-orientable surface: there is no consistent 'clockwise' on it. Cutting down the middle does not make two pieces, because the centre line doesn't separate it — you get one band twice as long, with two full twists. Cutting a third of the way in, the scissors go round twice before meeting their start, and you get a thinner Möbius strip linked through a long twisted band. Glue two Möbius strips edge to edge and you get a Klein bottle.</p>`,
  build(p) {
    const c = p.querySelector(".mo-cv"), out = p.querySelector(".mo-out"), dims = sized(c, 400);
    const st = { yaw: .35, pitch: .55, hold: false }; orbit(c, st);
    let mode = "strip", t0 = performance.now(), trail = [];
    chips(p, ".mo-m", b => { mode = b.dataset.m; t0 = performance.now(); trail = []; });
    p.querySelector(".mo-re").addEventListener("click", () => { t0 = performance.now(); trail = []; });
    const Lt = nrm([-.35, .8, .5]);
    mo.fn = () => {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); if (!st.hold && !AtomKit.reduced) st.yaw += .003;
      const el = (performance.now() - t0) / 1000, Vw = view(st.yaw, st.pitch), f = Math.min(w, h) * .36, cx = w / 2, cy = h / 2 + 10;
      const P = x => { const q = Vw(x), k = 5 / (5 - q[2]); return [cx + q[0] * f * k, cy - q[1] * f * k, q[2]]; };
      const prims = [];
      const piece = (F, u0, u1, v0, v1, nu, nv, colf, dy) => {
        for (let i = 0; i < nu; i++) for (let j = 0; j < nv; j++) {
          const ua = u0 + (u1 - u0) * i / nu, ub = u0 + (u1 - u0) * (i + 1) / nu, va = v0 + (v1 - v0) * j / nv, vb = v0 + (v1 - v0) * (j + 1) / nv;
          const W = [F(ua, va), F(ub, va), F(ub, vb), F(ua, vb)].map(q => dy ? [q[0], q[1] + dy, q[2]] : q), n = nrm(cross(sub(W[1], W[0]), sub(W[3], W[0])));
          const S = W.map(P), b = .3 + .7 * Math.abs(dot(Vw(n), Lt));
          prims.push({ k: 0, S, z: (S[0][2] + S[1][2] + S[2][2] + S[3][2]) / 4, col: colf((ua + ub) / 2), b });
        }
      };
      const line = (F, pts, col, wd) => { for (let i = 1; i < pts.length; i++) { const A = P(F(...pts[i - 1])), B = P(F(...pts[i])); prims.push({ k: 1, A, B, z: (A[2] + B[2]) / 2 + .03, col, wd }); } };
      const gold = () => [245, 196, 81], teal = () => [63, 208, 201], grad = u => { const t = u / (4 * Math.PI); return [Math.round(245 - 10 * t), Math.round(196 - 120 * t), Math.round(81 + 119 * t)]; };
      const cutT = clamp01(el / 3.2), sep = smooth(clamp01((el - 3.4) / 1.4)), g = .015 + .07 * sep;
      let msg = "";
      if (mode === "strip" || mode === "ant") {
        piece(mob, 0, 2 * Math.PI, -MW, MW, 120, 6, gold);
        const edge = []; for (let i = 0; i <= 240; i++) edge.push([4 * Math.PI * i / 240, MW]); line(mob, edge, [255, 122, 200], 2.5);
        if (mode === "strip") msg = 'the pink curve is the <span class="g">only edge</span>: follow it and you go round twice. One edge, one side — Euler characteristic 0, like a cylinder, but non-orientable.';
        else {
          const u = (el * 1.1) % (4 * Math.PI), du = .002, nAt = uu => { const A = mob(uu, 0), n = nrm(cross(sub(mob(uu + du, 0), A), sub(mob(uu, du), A))); return add(A, scl(n, .06)); };
          const q = P(nAt(u)); trail.push(q); if (trail.length > 160) trail.shift();
          prims.push({ k: 2, q, z: q[2] + .06 });
          for (let i = 1; i < trail.length; i++) prims.push({ k: 1, A: trail[i - 1], B: trail[i], z: (trail[i][2] + trail[i - 1][2]) / 2 + .05, col: [127, 227, 214], wd: 2 });
          const lap = u / (2 * Math.PI);
          msg = `ant has walked ${lap.toFixed(2)} laps — ${lap < 1 ? "heading round" : lap < 1.08 ? '<span class="r">back at the start, but on the other side!</span>' : lap < 1.95 ? "going round again, on the 'other' side" : '<span class="t">two laps: home, the right way up</span>'}`;
        }
      } else if (mode === "half" || mode === "third") {
        const cv0 = mode === "half" ? 0 : MW / 3, laps = mode === "half" ? 2 * Math.PI : 4 * Math.PI;
        if (cutT < 1) {
          piece(mob, 0, 2 * Math.PI, -MW, MW, 120, 6, gold);
          const cut = []; for (let i = 0; i <= 200; i++) cut.push([laps * cutT * i / 200, cv0]); line(mob, cut, [14, 6, 24], 3.5);
          const sc = P(mob(laps * cutT, cv0)); prims.push({ k: 3, q: sc, z: sc[2] + .1 });
          msg = mode === "half" ? `cutting along the centre line… ${Math.round(cutT * 100)}%` : `cutting a third of the way in… the scissors have gone round ${(laps * cutT / (2 * Math.PI)).toFixed(2)} times`;
        } else if (mode === "half") {
          piece(mob, 0, 4 * Math.PI, g, MW, 240, 3, grad);
          msg = 'still <span class="g">one piece</span> (follow the colours: it goes round twice), twice as long, with two full twists — and now it has two sides and two edges';
        } else {
          piece(mob, 0, 4 * Math.PI, MW / 3 + g, MW, 240, 3, grad); piece(mob, 0, 2 * Math.PI, -MW / 3 + g, MW / 3 - g, 120, 2, teal);
          msg = 'two pieces: a thin <span class="t">Möbius strip</span> (teal) and a long band with two full twists, <span class="g">linked</span> together';
        }
      } else {
        if (cutT < 1) { piece(ring, 0, 2 * Math.PI, -MW * .6, MW * .6, 90, 5, gold); const cut = []; for (let i = 0; i <= 150; i++) cut.push([2 * Math.PI * cutT * i / 150, 0]); line(ring, cut, [14, 6, 24], 3.5); const sc = P(ring(2 * Math.PI * cutT, 0)); prims.push({ k: 3, q: sc, z: sc[2] + .1 }); msg = `cutting an ordinary band… ${Math.round(cutT * 100)}%`; }
        else { piece(ring, 0, 2 * Math.PI, g, MW * .6, 90, 3, gold, 2.5 * g); piece(ring, 0, 2 * Math.PI, -MW * .6, -g, 90, 3, teal, -2.5 * g); msg = "an ordinary band falls into <span class=\"g\">two</span> separate bands, as you'd expect"; }
      }
      prims.sort((a, b) => a.z - b.z);
      for (const q of prims) {
        if (q.k === 0) { const col = q.col.map(x => Math.round(x * q.b)); ctx.fillStyle = `rgb(${col})`; ctx.strokeStyle = ctx.fillStyle; ctx.lineWidth = .8; ctx.beginPath(); q.S.forEach((s, i) => i ? ctx.lineTo(s[0], s[1]) : ctx.moveTo(s[0], s[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); }
        else if (q.k === 1) { ctx.strokeStyle = `rgb(${q.col})`; ctx.lineWidth = q.wd; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(q.A[0], q.A[1]); ctx.lineTo(q.B[0], q.B[1]); ctx.stroke(); }
        else if (q.k === 2) { ctx.fillStyle = "#7fe3d6"; ctx.shadowColor = "#7fe3d6"; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(q.q[0], q.q[1], 6, 0, 7); ctx.fill(); ctx.shadowBlur = 0; }
        else { ctx.font = "22px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("✂️", q.q[0], q.q[1]); ctx.textAlign = "start"; ctx.textBaseline = "alphabetic"; }
      }
      out.innerHTML = msg;
    };
  },
  start() { mo.start(); }, stop() { mo.stop(); }
});

/* ================================================================ Rubik's cube group */
const FACE = { U: [1, 1, -1], D: [1, -1, 1], R: [0, 1, -1], L: [0, -1, 1], F: [2, 1, -1], B: [2, -1, 1] };   // axis, layer, turn sense about +axis
const rot90 = (v, ax, dir) => { const [x, y, z] = v; if (ax === 0) return dir > 0 ? [x, -z, y] : [x, z, -y]; if (ax === 1) return dir > 0 ? [z, y, -x] : [-z, y, x]; return dir > 0 ? [-y, x, z] : [y, -x, z]; };
const rotA = (v, ax, th) => { const cs = Math.cos(th), sn = Math.sin(th), [x, y, z] = v; if (ax === 0) return [x, cs * y - sn * z, sn * y + cs * z]; if (ax === 1) return [cs * x + sn * z, y, -sn * x + cs * z]; return [cs * x - sn * y, sn * x + cs * y, z]; };
const SLOTS = []; for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) { const cc = [x, y, z]; for (let ax = 0; ax < 3; ax++) for (const s of [-1, 1]) if (cc[ax] === s) { const n = [0, 0, 0]; n[ax] = s; SLOTS.push({ c: cc, n }); } }
const skey = (cc, n) => cc.join() + "|" + n.join();
const SIDX = new Map(SLOTS.map((s, i) => [skey(s.c, s.n), i]));
const MOVES = {};
for (const f in FACE) { const [ax, layer, d] = FACE[f]; for (const [suf, dir] of [["", d], ["'", -d]]) MOVES[f + suf] = SLOTS.map((s, i) => s.c[ax] === layer ? SIDX.get(skey(rot90(s.c, ax, dir), rot90(s.n, ax, dir))) : i); }
const parseSeq = s => { const o = []; for (const m of String(s).replace(/[’`]/g, "'").matchAll(/([UDLRFB])(2|')?/g)) { if (m[2] === "2") o.push(m[1], m[1]); else o.push(m[1] + (m[2] || "")); } return o; };
function seqOrder(seq) { if (!seq.length) return 1; let pos = SLOTS.map((_, i) => i); for (let k = 1; k <= 5000; k++) { for (const m of seq) pos = pos.map(q => MOVES[m][q]); if (pos.every((q, i) => q === i)) return k; } return null; }
const COLS = { "1,0,0": "#ff5a5a", "-1,0,0": "#ff9d3c", "0,1,0": "#f4f1ff", "0,-1,0": "#f5c451", "0,0,1": "#57e08a", "0,0,-1": "#7aa8ff" };
const rb = looper();
registerAtom({
  id: "rubik", name: "Rubik's cube group", domain: "algebra", fields: ["group-theory"],
  html: `<h3>Rubik's cube — a group with 43 quintillion elements</h3>
    <p class="ahint">Every sequence of turns is an element of a group, and every element has an <i>order</i>: repeat it enough times and the cube comes back to where it started. R U needs 105 repetitions. Turn the faces, type a sequence (like R U R' U'), and watch it cycle home.</p>
    <div class="achips">${["U", "D", "L", "R", "F", "B"].map(f => `<button class="achip rb-mv" data-m="${f}">${f}</button><button class="achip rb-mv" data-m="${f}'">${f}'</button>`).join("")}</div>
    <div class="achips"><input class="rb-in" value="R U" spellcheck="false" style="font:.72rem 'IBM Plex Mono',monospace;color:var(--ink);background:#140c24;border:1px solid rgba(255,255,255,.18);border-radius:7px;padding:.3rem .5rem;width:170px">
      <button class="achip rb-ord">order?</button><button class="achip rb-play">▶ repeat until solved</button>
      ${["R", "R U", "R U R' U'", "R U2 D' B D'", "F R U R' U' F'"].map(q => `<button class="achip rb-pre" data-q="${q}">${q}</button>`).join("")}
      <button class="achip rb-scr">scramble</button><button class="achip rb-reset">reset</button></div>
    <canvas class="acv rb-cv" style="cursor:grab"></canvas>
    <div class="aout rb-out"></div>
    <p class="awhy">Ernő Rubik built the cube in 1974. Its positions form a group of size 43,252,003,274,489,856,000 = 2²⁷·3¹⁴·5³·7²·11: every arrangement of corners and edges, except that the corner twists must add up to a multiple of 3, the edge flips to an even number, and the two permutations must have the same parity. The largest possible order of a single move sequence is 1260 (R U2 D' B D' is one). In 2010 Rokicki, Kociemba, Davidson and Dethridge used 35 CPU-years donated by Google to prove "God's number": every position can be solved in at most 20 turns.</p>`,
  build(p) {
    const c = p.querySelector(".rb-cv"), out = p.querySelector(".rb-out"), dims = sized(c, 380), inp = p.querySelector(".rb-in");
    const st = { yaw: -.6, pitch: .5, hold: false }; orbit(c, st);
    let col, queue = [], anim = null, count = 0, playing = null, lastOrder = "";
    const solvedCols = () => SLOTS.map(s => COLS[s.n.join()]);
    const isSolved = () => { const sc = solvedCols(); return col.every((x, i) => x === sc[i]); };
    const apply = m => { const P = MOVES[m], n = col.slice(); col.forEach((x, i) => n[P[i]] = x); col = n; count++; };
    const info = extra => { out.innerHTML = `turns made: ${count}   ${isSolved() ? '<span class="t">solved</span>' : "scrambled"}${lastOrder ? "\n" + lastOrder : ""}${extra ? "\n" + extra : ""}`; };
    const setOrder = s => { const q = parseSeq(s); if (!q.length) { lastOrder = '<span class="r">type moves like R U R\' U\' (letters U D L R F B, with \' or 2)</span>'; return null; } const o = seqOrder(q); lastOrder = `order of ${s.trim()} = <span class="g">${o}</span>   (${q.length} quarter turns each, ${o * q.length} turns to come home)`; return { q, o }; };
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const Vw = view(st.yaw, st.pitch), f = Math.min(w, h) * .2, cx = w / 2, cy = h / 2, faces = [];
      let th = 0, A = null; if (anim) { const e = smooth(clamp01((performance.now() - anim.t0) / anim.dur)); A = FACE[anim.m[0]]; th = (anim.m.length > 1 ? -A[2] : A[2]) * Math.PI / 2 * e; }
      const P = v => { const q = Vw(v), k = 7 / (7 - q[2]); return [cx + q[0] * f * k, cy - q[1] * f * k, q[2]]; };
      for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
        if (!x && !y && !z) continue; const cc = [x, y, z], turning = A && cc[A[0]] === A[1];
        for (let ax = 0; ax < 3; ax++) for (const s of [-1, 1]) {
          const n = [0, 0, 0]; n[ax] = s; const a1 = [0, 0, 0], a2 = [0, 0, 0]; a1[(ax + 1) % 3] = .47; a2[(ax + 2) % 3] = .47;
          const fc = add(cc, scl(n, .48)); let corners = [add(add(fc, a1), a2), add(sub(fc, a1), a2), sub(sub(fc, a1), a2), sub(add(fc, a1), a2)], nn = n;
          if (turning) { corners = corners.map(v => rotA(v, A[0], th)); nn = rotA(n, A[0], th); }
          if (Vw(nn)[2] <= 0) continue;
          const S = corners.map(P), idx = cc[ax] === s ? SIDX.get(skey(cc, n)) : -1;
          faces.push({ S, z: S.reduce((q, v) => q + v[2], 0) / 4, col: idx >= 0 ? col[idx] : null });
        }
      }
      faces.sort((a, b) => a.z - b.z);
      for (const F of faces) {
        ctx.fillStyle = "#0b0714"; ctx.beginPath(); F.S.forEach((v, i) => i ? ctx.lineTo(v[0], v[1]) : ctx.moveTo(v[0], v[1])); ctx.closePath(); ctx.fill();
        if (F.col) { const m = [0, 1].map(k => F.S.reduce((q, v) => q + v[k], 0) / 4); ctx.fillStyle = F.col; ctx.beginPath(); F.S.forEach((v, i) => { const x = m[0] + (v[0] - m[0]) * .84, y = m[1] + (v[1] - m[1]) * .84; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.closePath(); ctx.fill(); }
      }
    }
    rb.fn = () => {
      const now = performance.now();
      if (anim && now - anim.t0 >= anim.dur) { apply(anim.m); anim = null;
        if (playing) { playing.done++; if (playing.done % playing.len === 0 && isSolved()) { const reps = playing.done / playing.len; playing = null; queue = []; info(`<span class="t">back to solved after ${reps} repetitions</span>`); } else if (!queue.length) queue = playing.q.slice(); }
        else info(); }
      if (!anim && queue.length) anim = { m: queue.shift(), t0: now, dur: playing ? (playing.len * playing.o > 300 ? 28 : 70) : 170 };
      if (!st.hold && !anim && !AtomKit.reduced) st.yaw += .002;
      draw();
      if (playing) out.innerHTML = `${lastOrder}\nrepetition ${Math.floor(playing.done / playing.len) + 1} of ${playing.o}…`;
    };
    p.querySelectorAll(".rb-mv").forEach(b => b.addEventListener("click", () => { playing = null; queue.push(b.dataset.m); }));
    p.querySelector(".rb-ord").addEventListener("click", () => { setOrder(inp.value); info(); });
    p.querySelectorAll(".rb-pre").forEach(b => b.addEventListener("click", () => { inp.value = b.dataset.q; setOrder(inp.value); info(); }));
    p.querySelector(".rb-play").addEventListener("click", () => { const r = setOrder(inp.value); if (!r) return info(); col = solvedCols(); count = 0; anim = null; playing = { q: r.q, len: r.q.length, o: r.o, done: 0 }; queue = r.q.slice(); });
    p.querySelector(".rb-scr").addEventListener("click", () => { playing = null; const K = Object.keys(MOVES); for (let i = 0; i < 25; i++) queue.push(K[Math.floor(Math.random() * K.length)]); });
    p.querySelector(".rb-reset").addEventListener("click", () => { playing = null; queue = []; anim = null; col = solvedCols(); count = 0; lastOrder = ""; info(); });
    inp.addEventListener("keydown", e => { if (e.key === "Enter") { setOrder(inp.value); info(); } });
    col = solvedCols(); setOrder("R U"); info(); draw();
  },
  start() { rb.start(); }, stop() { rb.stop(); }
});
})();
