/* ============================================================
   THE WEB OF MATHEMATICS — atoms-geometry.js
   Geometry (domain: geometry)
     platonic · polytope4d · morley · apollonian · pythagoras · penrose · phyllotaxis
   ============================================================ */
(function () {
"use strict";
const { C } = AtomKit;
const cv = (el, h) => AtomKit.canvas(el, h);
const PHI = (1 + Math.sqrt(5)) / 2;

/* ---------- small vector kit ---------- */
const sub = (a, b) => a.map((x, i) => x - b[i]);
const add = (a, b) => a.map((x, i) => x + b[i]);
const scl = (a, s) => a.map(x => x * s);
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const len = a => Math.sqrt(dot(a, a));
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
// view rotation from a yaw and a pitch — no drift, however long it spins
const view = (yaw, pitch) => v => {
  const x = v[0] * Math.cos(yaw) + v[2] * Math.sin(yaw), z0 = -v[0] * Math.sin(yaw) + v[2] * Math.cos(yaw);
  return [x, v[1] * Math.cos(pitch) - z0 * Math.sin(pitch), v[1] * Math.sin(pitch) + z0 * Math.cos(pitch)];
};
function orbit(c, st) {
  let last = null;
  c.addEventListener("pointerdown", e => { last = [e.clientX, e.clientY]; st.hold = true; try { c.setPointerCapture(e.pointerId); } catch (_) {} });
  c.addEventListener("pointermove", e => {
    if (!last) return;
    st.yaw += (e.clientX - last[0]) * .01; st.pitch = Math.max(-1.5, Math.min(1.5, st.pitch + (e.clientY - last[1]) * .01));
    last = [e.clientX, e.clientY];
  });
  const up = () => { last = null; st.hold = false; };
  c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
}
function looper() {
  const L = { raf: null, fn: null,
    start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } },
    stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } };
  return L;
}
// a canvas that re-sizes itself when the atom box changes width
function sized(c, h) { let d = cv(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = cv(c, h); return d; }; }
const mix = (a, b, t) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
const smooth = t => t * t * (3 - 2 * t);
const clamp01 = t => Math.max(0, Math.min(1, t));

/* ---------- convex hull of a vertex set that surrounds the origin (small n) ---------- */
function hull(V) {
  const F = [], seen = new Set(), n = V.length;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) for (let k = j + 1; k < n; k++) {
    let nr = cross(sub(V[j], V[i]), sub(V[k], V[i])); const L = len(nr); if (L < 1e-9) continue; nr = scl(nr, 1 / L);
    let d = dot(nr, V[i]); if (d < 0) { nr = scl(nr, -1); d = -d; }
    if (V.some(v => dot(nr, v) > d + 1e-6)) continue;
    const key = nr.map(x => Math.round(x * 1e4) || 0).join(); if (seen.has(key)) continue; seen.add(key);
    const on = []; V.forEach((v, q) => { if (Math.abs(dot(nr, v) - d) < 1e-6) on.push(q); });
    const cen = scl(on.reduce((s, q) => add(s, V[q]), [0, 0, 0]), 1 / on.length);
    const u = sub(V[on[0]], cen), w = cross(nr, u), ang = q => Math.atan2(dot(sub(V[q], cen), w), dot(sub(V[q], cen), u));
    on.sort((a, b) => ang(a) - ang(b));
    F.push({ v: on, n: nr, d, c: cen });
  }
  return F;
}

/* ================================================================ Platonic solids */
const CUBE = []; for (const x of [-1, 1]) for (const y of [-1, 1]) for (const z of [-1, 1]) CUBE.push([x, y, z]);
const iP = 1 / PHI;
const SOLIDS = [
  { id: "tetra", name: "tetrahedron", p: 3, q: 3, dual: "tetra", sym: 24, hue: 14, el: "fire", V: [[1, 1, 1], [1, -1, -1], [-1, 1, -1], [-1, -1, 1]] },
  { id: "cube", name: "cube", p: 4, q: 3, dual: "octa", sym: 48, hue: 40, el: "earth", V: CUBE },
  { id: "octa", name: "octahedron", p: 3, q: 4, dual: "cube", sym: 48, hue: 175, el: "air", V: [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]] },
  { id: "dodeca", name: "dodecahedron", p: 5, q: 3, dual: "icosa", sym: 120, hue: 275, el: "the heavens",
    V: CUBE.concat(...[1, -1].flatMap(s => [1, -1].map(t => [[0, s * iP, t * PHI], [s * iP, t * PHI, 0], [s * PHI, 0, t * iP]]))) },
  { id: "icosa", name: "icosahedron", p: 3, q: 5, dual: "dodeca", sym: 120, hue: 210, el: "water",
    V: [1, -1].flatMap(s => [1, -1].flatMap(t => [[0, s, t * PHI], [s, t * PHI, 0], [t * PHI, 0, s]])) }
];
SOLIDS.forEach(S => {
  S.V = S.V.map(v => scl(v, 1 / len(v)));
  S.F = hull(S.V);
  const E = new Map(); S.F.forEach(f => f.v.forEach((a, i) => { const b = f.v[(i + 1) % f.v.length]; E.set(Math.min(a, b) + "-" + Math.max(a, b), [a, b]); }));
  S.E = [...E.values()];
  const rho = len(scl(add(S.V[S.E[0][0]], S.V[S.E[0][1]]), .5));      // midradius
  S.DV = S.F.map(f => scl(f.n, rho * rho / f.d));                       // polar reciprocal about the midsphere
  const DE = new Map(); S.F.forEach((f, i) => S.F.forEach((g, j) => { if (j > i && f.v.filter(x => g.v.includes(x)).length === 2) DE.set(i + "-" + j, [i, j]); }));
  S.DE = [...DE.values()];
});
const pl = looper();
registerAtom({
  id: "platonic", name: "Platonic solids", domain: "geometry", fields: ["classical-geometry", "group-theory", "algebraic-topology"],
  html: `<h3>The five Platonic solids — and why there can only be five</h3>
    <p class="ahint">Drag to turn a solid. Switch on its dual: put a vertex in the middle of every face and join neighbours — the cube's dual is the octahedron, the dodecahedron's is the icosahedron, and the tetrahedron is its own. The two edge sets cross at right angles, at their midpoints.</p>
    <div class="achips">${SOLIDS.map((S, i) => `<button class="achip pl-s${i === 1 ? " on" : ""}" data-i="${i}">${S.name}</button>`).join("")}</div>
    <div class="achips"><button class="achip pl-dual">show dual</button><button class="achip pl-spin on">auto-rotate</button></div>
    <canvas class="acv pl-cv" style="cursor:grab"></canvas>
    <div class="aout pl-out"></div>
    <p class="awhy">At each corner at least three regular p-gons must meet, and their angles must add to less than 360° or the corner goes flat. With triangles, 3, 4 or 5 can meet; with squares, 3; with pentagons, 3; hexagons already make 360°. That leaves {3,3}, {4,3}, {3,4}, {5,3}, {3,5} — five solids, no more (Euclid, Elements XIII, the last proposition). Plato gave four of them to the elements. Descartes noticed the missing angles always add to 720°; Euler (1752) found V − E + F = 2, the first topological invariant.</p>`,
  build(p) {
    const c = p.querySelector(".pl-cv"), out = p.querySelector(".pl-out"), dims = sized(c, 360);
    const st = { yaw: .6, pitch: .35, hold: false }; let S = SOLIDS[1], dual = false, spin = !AtomKit.reduced;
    orbit(c, st);
    const light = scl([-.45, .6, .75], 1 / len([-.45, .6, .75]));
    function info() {
      const ia = 180 - 360 / S.p, def = 360 - S.q * ia, D = SOLIDS.find(x => x.id === S.dual);
      out.innerHTML = `<span class="g">${S.name}</span>  Schläfli symbol {${S.p},${S.q}}: ${S.q} ${["", "", "", "triangles", "squares", "pentagons"][S.p]} at every corner\n` +
        `V = ${S.V.length}   E = ${S.E.length}   F = ${S.F.length}      V − E + F = ${S.V.length} − ${S.E.length} + ${S.F.length} = <span class="t">2</span>\n` +
        `missing angle at a corner: 360° − ${S.q}×${ia}° = ${def}°,  × ${S.V.length} corners = <span class="t">720°</span>\n` +
        `dual: ${D.name} (V and F swap: ${D.V.length}, ${D.E.length}, ${D.F.length})   symmetries: ${S.sym} (${S.sym / 2} rotations)   Plato's element: ${S.el}`;
    }
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const R = view(st.yaw, st.pitch), f = Math.min(w, h) * .34, Dd = 5, cx = w / 2, cy = h / 2;
      const P = v => { const r = R(v), k = Dd / (Dd - r[2]); return [cx + r[0] * f * k, cy - r[1] * f * k, r[2]]; };
      const pv = S.V.map(P), faces = S.F.map(F => ({ F, n: R(F.n), z: R(F.c)[2] })).sort((a, b) => a.z - b.z);
      const face = (F, fill, stroke, lw) => { ctx.beginPath(); F.v.forEach((q, i) => i ? ctx.lineTo(pv[q][0], pv[q][1]) : ctx.moveTo(pv[q][0], pv[q][1])); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = stroke; ctx.lineWidth = lw; ctx.stroke(); };
      for (const { F, n } of faces) if (n[2] <= 0) face(F, `hsla(${S.hue},60%,30%,${dual ? .1 : .35})`, `hsla(${S.hue},70%,70%,.25)`, 1);
      if (dual) {
        const dv = S.DV.map(P);
        S.DE.map(([a, b]) => ({ a, b, z: dv[a][2] + dv[b][2] })).sort((x, y) => x.z - y.z).forEach(({ a, b, z }) => {
          ctx.strokeStyle = `rgba(127,227,214,${.45 + .25 * z})`; ctx.lineWidth = 2 + .6 * z; ctx.beginPath(); ctx.moveTo(dv[a][0], dv[a][1]); ctx.lineTo(dv[b][0], dv[b][1]); ctx.stroke(); });
        ctx.fillStyle = "#7fe3d6"; dv.forEach(q => { ctx.beginPath(); ctx.arc(q[0], q[1], 3.2, 0, 7); ctx.fill(); });
      }
      for (const { F, n } of faces) if (n[2] > 0) {
        const b = .25 + .75 * Math.max(0, dot(n, light));
        face(F, `hsla(${S.hue},70%,${22 + 42 * b}%,${dual ? .42 : .92})`, "rgba(245,196,81,.9)", 1.6);
      }
      ctx.fillStyle = C.gold; pv.forEach(q => { if (q[2] > -.2) { ctx.beginPath(); ctx.arc(q[0], q[1], 2.6, 0, 7); ctx.fill(); } });
    }
    p.querySelectorAll(".pl-s").forEach(b => b.addEventListener("click", () => { S = SOLIDS[+b.dataset.i]; p.querySelectorAll(".pl-s").forEach(x => x.classList.toggle("on", x === b)); info(); }));
    p.querySelector(".pl-dual").addEventListener("click", e => { dual = !dual; e.target.classList.toggle("on", dual); });
    const sb = p.querySelector(".pl-spin"); sb.classList.toggle("on", spin); sb.addEventListener("click", () => { spin = !spin; sb.classList.toggle("on", spin); });
    pl.fn = () => { if (spin && !st.hold) st.yaw += .006; draw(); };
    info(); draw();
  },
  start() { pl.start(); }, stop() { pl.stop(); }
});

/* ================================================================ 4D polytopes */
const perms4 = () => { const out = new Map(); for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) for (const s of [1, -1]) for (const t of [1, -1]) { const v = [0, 0, 0, 0]; v[i] = s; v[j] = t; out.set(v.join(), v); } return [...out.values()]; };
const r5 = 1 / Math.sqrt(5);
const P4 = [
  { name: "5-cell", cells: "5 tetrahedra", counts: [5, 10, 10, 5], V: [[1, 1, 1, -r5], [1, -1, -1, -r5], [-1, 1, -1, -r5], [-1, -1, 1, -r5], [0, 0, 0, 4 * r5]] },
  { name: "tesseract", cells: "8 cubes", counts: [16, 32, 24, 8], V: (() => { const o = []; for (let i = 0; i < 16; i++) o.push([0, 1, 2, 3].map(k => (i >> k & 1) ? 1 : -1)); return o; })() },
  { name: "16-cell", cells: "16 tetrahedra", counts: [8, 24, 32, 16], V: [0, 1, 2, 3].flatMap(k => [1, -1].map(s => { const v = [0, 0, 0, 0]; v[k] = s; return v; })) },
  { name: "24-cell", cells: "24 octahedra", counts: [24, 96, 96, 24], V: perms4() }
];
P4.forEach(Q => {
  Q.V = Q.V.map(v => scl(v, 1 / len(v)));
  let m = Infinity; for (let i = 0; i < Q.V.length; i++) for (let j = i + 1; j < Q.V.length; j++) m = Math.min(m, len(sub(Q.V[i], Q.V[j])));
  Q.E = []; for (let i = 0; i < Q.V.length; i++) for (let j = i + 1; j < Q.V.length; j++) if (len(sub(Q.V[i], Q.V[j])) < m + 1e-6) Q.E.push([i, j]);
});
const PLANES = [["XY", 0, 1], ["XZ", 0, 2], ["YZ", 1, 2], ["XW", 0, 3], ["YW", 1, 3], ["ZW", 2, 3]];
const p4 = looper();
registerAtom({
  id: "polytope4d", name: "Tesseract & 4D solids", domain: "geometry", fields: ["classical-geometry", "linear-algebra", "differential-topology"],
  html: `<h3>The tesseract — a shadow from the fourth dimension</h3>
    <p class="ahint">A cube's shadow on paper is a square inside a square. A 4D cube's shadow in our space is a cube inside a cube — and when it turns in a plane that uses the fourth direction W, the inner cube swells and swallows the outer one. Choose the planes of rotation; drag to change your own 3D viewpoint. Gold edges are nearer in W, violet ones farther.</p>
    <div class="achips">${P4.map((Q, i) => `<button class="achip p4-s${i === 1 ? " on" : ""}" data-i="${i}">${Q.name}</button>`).join("")}</div>
    <div class="achips">${PLANES.map(([n], i) => `<button class="achip p4-pl${i === 3 || i === 5 ? " on" : ""}" data-i="${i}">${n}</button>`).join("")}
      <label class="achk">speed <input type="range" class="p4-sp" min="0" max="3" step="0.05" value="1"></label></div>
    <canvas class="acv p4-cv" style="cursor:grab"></canvas>
    <div class="aout p4-out"></div>
    <p class="awhy">In four dimensions rotation happens in a plane, not about an axis — there are six planes, and a 4D object can spin in two of them at once. Ludwig Schläfli found the six regular 4D polytopes around 1852: the 5-cell, the tesseract, the 16-cell, the 24-cell (which has no 3D cousin) and the giant 120-cell and 600-cell. In five dimensions and above there are only three. Charles Howard Hinton coined "tesseract" in 1888 and sold coloured cubes to train the mind to see it.</p>`,
  build(p) {
    const c = p.querySelector(".p4-cv"), out = p.querySelector(".p4-out"), dims = sized(c, 380), sp = p.querySelector(".p4-sp");
    const st = { yaw: .45, pitch: .3, hold: false }; orbit(c, st);
    let Q = P4[1]; const on = [false, false, false, true, false, true], th = [0, 0, 0, 0, 0, 0];
    const info = () => { const [V, E, F, Cc] = Q.counts; out.innerHTML = `<span class="g">${Q.name}</span>: ${V} vertices · ${E} edges · ${F} faces · ${Cc} cells (${Q.cells})\nV − E + F − C = ${V} − ${E} + ${F} − ${Cc} = <span class="t">0</span>  <span class="d">(Euler characteristic of the 3-sphere it wraps)</span>\nrotating in: ${PLANES.filter((_, i) => on[i]).map(q => q[0]).join(" + ") || "nothing — pick a plane"}`; };
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const R = view(st.yaw, st.pitch), f = Math.min(w, h) * .3, cx = w / 2, cy = h / 2;
      const pts = Q.V.map(v => {
        const x = v.slice();
        PLANES.forEach(([, i, j], k) => { if (!th[k]) return; const cs = Math.cos(th[k]), sn = Math.sin(th[k]), a = x[i], b = x[j]; x[i] = cs * a - sn * b; x[j] = sn * a + cs * b; });
        const k4 = 2.4 / (2.4 - x[3]), r = R([x[0] * k4, x[1] * k4, x[2] * k4]), k3 = 6 / (6 - r[2]);
        return { x: cx + r[0] * f * k3, y: cy - r[1] * f * k3, z: r[2], w: x[3] };
      });
      Q.E.map(([a, b]) => ({ a: pts[a], b: pts[b] })).sort((u, v) => (u.a.z + u.b.z) - (v.a.z + v.b.z)).forEach(({ a, b }) => {
        const t = clamp01(((a.w + b.w) / 2 + 1) / 2), col = mix([150, 110, 255], [245, 196, 81], t);
        ctx.strokeStyle = `rgba(${col},${.35 + .55 * t})`; ctx.lineWidth = 1 + 2.2 * t; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); });
      pts.forEach(q => { const t = clamp01((q.w + 1) / 2); ctx.fillStyle = `rgb(${mix([150, 110, 255], [255, 220, 130], t)})`; ctx.beginPath(); ctx.arc(q.x, q.y, 1.8 + 2.2 * t, 0, 7); ctx.fill(); });
    }
    p.querySelectorAll(".p4-s").forEach(b => b.addEventListener("click", () => { Q = P4[+b.dataset.i]; p.querySelectorAll(".p4-s").forEach(x => x.classList.toggle("on", x === b)); info(); }));
    p.querySelectorAll(".p4-pl").forEach(b => b.addEventListener("click", () => { const i = +b.dataset.i; on[i] = !on[i]; b.classList.toggle("on", on[i]); info(); }));
    p4.fn = () => { const s = +sp.value * (AtomKit.reduced ? .3 : 1); on.forEach((o, k) => { if (o) th[k] += .008 * s; }); draw(); };
    info(); draw();
  },
  start() { p4.start(); }, stop() { p4.stop(); }
});

/* ================================================================ Morley's triangle */
registerAtom({
  id: "morley", name: "Morley's miracle", domain: "geometry", fields: ["classical-geometry"],
  html: `<h3>Morley's miracle — trisect any triangle, get an equilateral one</h3>
    <p class="ahint">Drag the corners. Split each angle into three equal parts; the trisectors next to each side meet in a point. However lopsided the triangle, those three points always form an equilateral triangle.</p>
    <div class="achips"><button class="achip mo-p" data-k="0">scalene</button><button class="achip mo-p" data-k="1">equilateral</button><button class="achip mo-p" data-k="2">right-angled</button><button class="achip mo-p" data-k="3">very obtuse</button></div>
    <canvas class="acv mo-cv" style="cursor:pointer"></canvas>
    <div class="aout mo-out"></div>
    <p class="awhy">Frank Morley found it in 1899 and it was called a miracle because nothing in Euclid predicts it — the Greeks could not even trisect an angle with ruler and compass (Wantzel proved that impossible in 1837). The side of the Morley triangle is 8R·sin(A/3)·sin(B/3)·sin(C/3), R the circumradius. Alain Connes gave a proof in 2004 using the affine group of a field: it works in any field where the trisecting maps exist.</p>`,
  build(p) {
    const c = p.querySelector(".mo-cv"), out = p.querySelector(".mo-out"), dims = sized(c, 360);
    const PRE = [[[.2, .82], [.84, .78], [.38, .12]], [[.25, .72], [.75, .72], [.5, .72 - .25 * Math.sqrt(3)]], [[.3, .85], [.72, .85], [.3, .15]], [[.06, .7], [.94, .7], [.3, .5]]];
    let T;
    const load = k => { const { w, h } = dims(), S = Math.min(w * .95, h / .8); T = PRE[k].map(([x, y]) => ({ x: w / 2 + (x - .5) * S, y: h / 2 + (y - .5) * S })); draw(); };
    const tri = (P, Q, O) => { const a1 = Math.atan2(Q.y - P.y, Q.x - P.x), a2 = Math.atan2(O.y - P.y, O.x - P.x); let d = a2 - a1; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; const t = a1 + d / 3; return { x: Math.cos(t), y: Math.sin(t) }; };
    const meet = (P, u, Q, v) => { const det = -u.x * v.y + v.x * u.y, dx = Q.x - P.x, dy = Q.y - P.y, s = (-dx * v.y + v.x * dy) / det; return { x: P.x + s * u.x, y: P.y + s * u.y }; };
    const ang = (P, Q, O) => Math.acos(Math.max(-1, Math.min(1, ((Q.x - P.x) * (O.x - P.x) + (Q.y - P.y) * (O.y - P.y)) / (Math.hypot(Q.x - P.x, Q.y - P.y) * Math.hypot(O.x - P.x, O.y - P.y)))));
    const D = (P, Q) => Math.hypot(P.x - Q.x, P.y - Q.y);
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const [A, B, Cc] = T;
      const Ma = meet(B, tri(B, Cc, A), Cc, tri(Cc, B, A)), Mb = meet(Cc, tri(Cc, A, B), A, tri(A, Cc, B)), Mc = meet(A, tri(A, B, Cc), B, tri(B, A, Cc));
      ctx.strokeStyle = "rgba(232,228,244,.85)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(A.x, A.y); ctx.lineTo(B.x, B.y); ctx.lineTo(Cc.x, Cc.y); ctx.closePath(); ctx.stroke();
      const seg = (P, Q, col) => { ctx.strokeStyle = col; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(P.x, P.y); ctx.lineTo(Q.x, Q.y); ctx.stroke(); };
      seg(A, Mb, "rgba(63,208,201,.8)"); seg(A, Mc, "rgba(63,208,201,.8)"); seg(B, Ma, "rgba(255,122,200,.8)"); seg(B, Mc, "rgba(255,122,200,.8)"); seg(Cc, Ma, "rgba(122,168,255,.85)"); seg(Cc, Mb, "rgba(122,168,255,.85)");
      ctx.beginPath(); ctx.moveTo(Ma.x, Ma.y); ctx.lineTo(Mb.x, Mb.y); ctx.lineTo(Mc.x, Mc.y); ctx.closePath(); ctx.fillStyle = "rgba(245,196,81,.28)"; ctx.fill(); ctx.strokeStyle = C.gold; ctx.lineWidth = 2.2; ctx.shadowColor = "rgba(245,196,81,.8)"; ctx.shadowBlur = 10; ctx.stroke(); ctx.shadowBlur = 0;
      [[A, C.teal, "A"], [B, C.pink, "B"], [Cc, C.blue, "C"]].forEach(([P, col, n]) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(P.x, P.y, 7, 0, 7); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "600 12px 'IBM Plex Mono', monospace"; ctx.fillText(n, P.x + 9, P.y - 8); });
      const a = ang(A, B, Cc), b = ang(B, A, Cc), g = Math.PI - a - b, R = D(B, Cc) / (2 * Math.sin(a)), deg = x => (x * 180 / Math.PI).toFixed(1) + "°";
      const s = [D(Mb, Mc), D(Ma, Mc), D(Ma, Mb)].map(x => (x / R).toFixed(4));
      out.innerHTML = `angles A = ${deg(a)}  B = ${deg(b)}  C = ${deg(g)}\nMorley sides ÷ circumradius: <span class="g">${s.join("   ")}</span>\n8·sin(A/3)·sin(B/3)·sin(C/3) = <span class="t">${(8 * Math.sin(a / 3) * Math.sin(b / 3) * Math.sin(g / 3)).toFixed(4)}</span>`;
    }
    let drag = null;
    c.addEventListener("pointerdown", e => { const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; let best = 1e9; T.forEach((P, i) => { const d = Math.hypot(P.x - x, P.y - y); if (d < best) { best = d; drag = i; } }); if (best > 40) drag = null; else try { c.setPointerCapture(e.pointerId); } catch (_) {} });
    c.addEventListener("pointermove", e => { if (drag === null) return; const r = c.getBoundingClientRect(), { w, h } = dims(); T[drag] = { x: Math.max(6, Math.min(w - 6, e.clientX - r.left)), y: Math.max(6, Math.min(h - 6, e.clientY - r.top)) }; draw(); });
    const up = () => drag = null; c.addEventListener("pointerup", up); c.addEventListener("pointercancel", up);
    p.querySelectorAll(".mo-p").forEach(b => b.addEventListener("click", () => load(+b.dataset.k)));
    this._load = load;
  },
  start() { if (this._load && !this._did) { this._did = true; this._load(0); } }
});

/* ================================================================ Apollonian gasket */
const GASKETS = [[-1, 2, 2, 3], [-2, 3, 6, 7], [-3, 4, 12, 13], [-6, 11, 14, 15], [-10, 18, 23, 27]];
const ap = looper();
registerAtom({
  id: "apollonian", name: "Apollonian gasket", domain: "geometry", fields: ["classical-geometry", "fractals", "elementary-nt"],
  html: `<h3>The Apollonian gasket — circles all the way down, and every curvature a whole number</h3>
    <p class="ahint">Start with four circles that all touch (the outer one counts with negative curvature). Each curved triangular gap holds exactly one circle touching its three sides — fill it, and repeat for ever. The numbers are curvatures, 1/radius. Click a circle to read it.</p>
    <div class="achips">${GASKETS.map((g, i) => `<button class="achip ap-g${i ? "" : " on"}" data-i="${i}">(${g.join(", ")})</button>`).join("")}<button class="achip ap-re">replay</button></div>
    <canvas class="acv ap-cv" style="cursor:pointer"></canvas>
    <div class="aout ap-out"></div>
    <p class="awhy">Descartes wrote to Princess Elisabeth of Bohemia in 1643: four mutually tangent circles with curvatures a, b, c, d satisfy (a + b + c + d)² = 2(a² + b² + c² + d²). Solve for d and you get two answers, d and d′ = 2(a + b + c) − d — so if the first four are integers, every circle in the gasket is. Frederick Soddy rediscovered it and published the rule as a poem, "The Kiss Precise" (Nature, 1936). The gasket is a fractal of dimension about 1.3057; which integers appear is a live question in number theory.</p>`,
  build(p) {
    const c = p.querySelector(".ap-cv"), out = p.querySelector(".ap-out"), dims = sized(c, 400);
    let circles = [], shown = 0, t0 = 0, sel = null, G;
    function make(g) {
      G = g; const [k1, k2, k3, k4] = g, R = -1 / k1, r2 = 1 / k2, r3 = 1 / k3, r4 = 1 / k4;
      const c1 = { k: k1, x: 0, y: 0 }, c2 = { k: k2, x: R - r2, y: 0 };
      const d12 = R - r2, d13 = R - r3, d23 = r2 + r3, x3 = (d13 * d13 - d23 * d23 + d12 * d12) / (2 * d12);
      const c3 = { k: k3, x: x3, y: Math.sqrt(Math.max(0, d13 * d13 - x3 * x3)) };
      // circle 4 touches 2 and 3 outside: intersect two circles, keep the point that also touches the outer one
      const ra = r2 + r4, rb = r3 + r4, dx = c3.x - c2.x, dy = c3.y - c2.y, dd = Math.hypot(dx, dy), a = (ra * ra - rb * rb + dd * dd) / (2 * dd), hh = Math.sqrt(Math.max(0, ra * ra - a * a));
      const mx = c2.x + a * dx / dd, my = c2.y + a * dy / dd, cand = [[mx - hh * dy / dd, my + hh * dx / dd], [mx + hh * dy / dd, my - hh * dx / dd]];
      const best = cand.sort((u, v) => Math.abs(Math.hypot(...u) - (R - r4)) - Math.abs(Math.hypot(...v) - (R - r4)))[0];
      const c4 = { k: k4, x: best[0], y: best[1] };
      [c1, c2, c3, c4].forEach(q => q.depth = 0);
      circles = [c1, c2, c3, c4];
      const { w, h } = dims(), f = (Math.min(w, h) / 2 - 8) / R;       // pixels per unit length
      const next = (a, b, cc, d) => { const k = 2 * (a.k + b.k + cc.k) - d.k; return { k, x: (2 * (a.k * a.x + b.k * b.x + cc.k * cc.x) - d.k * d.x) / k, y: (2 * (a.k * a.y + b.k * b.y + cc.k * cc.y) - d.k * d.y) / k }; };
      const rec = (a, b, cc, d, depth) => { const n = next(a, b, cc, d); if (f / n.k < .55 || circles.length > 16000) return; n.depth = depth; circles.push(n); rec(n, a, b, cc, depth + 1); rec(n, b, cc, a, depth + 1); rec(n, a, cc, b, depth + 1); };
      rec(c2, c3, c4, c1, 1); rec(c1, c3, c4, c2, 1); rec(c1, c2, c4, c3, 1); rec(c1, c2, c3, c4, 1);
      circles.sort((u, v) => u.depth - v.depth || u.k - v.k);
      shown = 0; t0 = performance.now(); sel = null;
    }
    let lastShown = -1, lastSel = null, lastW = 0;
    function draw(force) {
      const d = dims(), { ctx, w, h } = d; if (!force && shown === lastShown && sel === lastSel && w === lastW) return; lastShown = shown; lastSel = sel; lastW = w;
      ctx.clearRect(0, 0, w, h);
      const R = -1 / G[0], f = (Math.min(w, h) / 2 - 8) / R, cx = w / 2, cy = h / 2, maxK = Math.log(G[3] * 40);
      for (let i = 0; i < shown; i++) {
        const q = circles[i], r = Math.abs(1 / q.k) * f, X = cx + q.x * f, Y = cy - q.y * f;
        ctx.beginPath(); ctx.arc(X, Y, Math.max(.4, r), 0, 7);
        if (q.k < 0) { ctx.strokeStyle = "rgba(245,196,81,.9)"; ctx.lineWidth = 2; ctx.stroke(); continue; }
        const t = clamp01(Math.log(q.k) / maxK);
        ctx.fillStyle = `hsla(${280 - 240 * t},75%,${30 + 30 * t}%,.5)`; ctx.fill();
        ctx.strokeStyle = q === sel ? "#fff" : `hsla(${45 - 20 * t},90%,70%,.75)`; ctx.lineWidth = q === sel ? 2.5 : .8; ctx.stroke();
        if (r > 10) { ctx.fillStyle = "#fff"; ctx.font = `600 ${Math.min(22, r * .7).toFixed(0)}px 'IBM Plex Mono', monospace`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(q.k, X, Y); ctx.textAlign = "start"; ctx.textBaseline = "alphabetic"; }
      }
      const [a, b, cc, dd] = G, lhs = (a + b + cc + dd) ** 2, rhs = 2 * (a * a + b * b + cc * cc + dd * dd);
      out.innerHTML = `Descartes: (−${-a} + ${b} + ${cc} + ${dd})² = <span class="g">${lhs}</span> = 2(${[a, b, cc, dd].map(k => k < 0 ? `(−${-k})²` : k + "²").join(" + ")}) = <span class="g">${rhs}</span>\n` +
        `circles drawn: ${shown}   deepest generation: ${shown ? circles[shown - 1].depth : 0}` + (sel ? `\n<span class="t">selected: curvature ${sel.k}, radius 1/${sel.k} of the unit</span>` : "");
    }
    c.addEventListener("click", e => { const { w, h } = dims(), r = c.getBoundingClientRect(), R = -1 / G[0], f = (Math.min(w, h) / 2 - 8) / R, x = (e.clientX - r.left - w / 2) / f, y = -(e.clientY - r.top - h / 2) / f;
      let best = null; for (let i = 1; i < shown; i++) { const q = circles[i]; if (Math.hypot(x - q.x, y - q.y) < 1 / q.k && (!best || q.k > best.k)) best = q; } sel = best; draw(); });
    p.querySelectorAll(".ap-g").forEach(b => b.addEventListener("click", () => { p.querySelectorAll(".ap-g").forEach(x => x.classList.toggle("on", x === b)); make(GASKETS[+b.dataset.i]); }));
    p.querySelector(".ap-re").addEventListener("click", () => { shown = 0; t0 = performance.now(); });
    ap.fn = () => { if (shown < circles.length) { const el = (performance.now() - t0) / 1000, depth = AtomKit.reduced ? 99 : Math.floor(el * 1.6); let n = shown; while (n < circles.length && circles[n].depth <= depth) n++; shown = n; } draw(); };
    this._go = () => { make(GASKETS[0]); draw(true); };
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } ap.start(); }, stop() { ap.stop(); }
});

/* ================================================================ Pythagorean proofs */
const py = looper();
registerAtom({
  id: "pythagoras", name: "Pythagoras: four proofs", domain: "geometry", fields: ["classical-geometry", "elementary-nt"],
  html: `<h3>a² + b² = c² — four ways to see it</h3>
    <p class="ahint">Pick a proof and change the triangle's shape; every picture works for every right triangle. There are hundreds of proofs — Elisha Loomis collected 367 in 1927.</p>
    <div class="achips"><button class="achip py-m on" data-m="0">rearrangement</button><button class="achip py-m" data-m="1">Bhāskara's "Behold!"</button><button class="achip py-m" data-m="2">Garfield's trapezoid</button><button class="achip py-m" data-m="3">similar triangles</button>
      <label class="achk">shape <input type="range" class="py-a" min="18" max="72" step="1" value="34"></label></div>
    <canvas class="acv py-cv"></canvas>
    <div class="aout py-out"></div>
    <p class="awhy">The relation was known long before Pythagoras: the Babylonian tablet Plimpton 322 (c. 1800 BCE) lists fifteen triples like (119, 120, 169), and the Chinese Zhoubi Suanjing gives the square-in-a-square picture. Bhāskara II (12th century) drew his figure with the single word "Behold!". James Garfield published his trapezoid in 1876, five years before he became US President. The similar-triangles proof is the one a young Einstein is said to have found for himself.</p>`,
  build(p) {
    const c = p.querySelector(".py-cv"), out = p.querySelector(".py-out"), dims = sized(c, 340), aI = p.querySelector(".py-a");
    let mode = 0, t0 = performance.now();
    const TC = ["rgba(63,208,201,.75)", "rgba(255,122,200,.72)", "rgba(122,168,255,.75)", "rgba(180,140,255,.75)"];
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const th = +aI.value * Math.PI / 180, a = Math.sin(th), b = Math.cos(th), s = a + b;
      const el = (performance.now() - t0) / 1000, cyc = AtomKit.reduced ? 0 : (el % 7) / 7;
      const T = cyc < .2 ? 0 : cyc < .45 ? smooth((cyc - .2) / .25) : cyc < .7 ? 1 : cyc < .95 ? 1 - smooth((cyc - .7) / .25) : 0;
      const poly = (pts, fill, stroke) => { ctx.beginPath(); pts.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); if (fill) { ctx.fillStyle = fill; ctx.fill(); } if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.4; ctx.stroke(); } };
      const label = (txt, x, y, col, size) => { ctx.fillStyle = col || "#fff"; ctx.font = `600 ${size || 16}px Fraunces, Georgia, serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(txt, x, y); ctx.textAlign = "start"; ctx.textBaseline = "alphabetic"; };
      if (mode === 0 || mode === 1) {
        const L = Math.min(h - 40, w - 40), ox = (w - L) / 2, oy = (h + L) / 2, k = L / s, X = ([x, y]) => [ox + x * k, oy - y * k];
        const trig = (R, ang) => { const u = [Math.cos(ang), Math.sin(ang)], v = [-u[1], u[0]]; return [R, [R[0] + a * u[0], R[1] + a * u[1]], [R[0] + b * v[0], R[1] + b * v[1]]]; };
        poly([[0, 0], [s, 0], [s, s], [0, s]].map(X), "rgba(245,196,81,.07)", "rgba(255,255,255,.35)");
        const A1 = [[[0, 0], 0], [[s, 0], Math.PI / 2], [[s, s], Math.PI], [[0, s], 1.5 * Math.PI]];
        if (mode === 0) {
          const A2 = [[[0, a], 0], [[s, 0], Math.PI / 2], [[a, s], Math.PI], [[a, a], 1.5 * Math.PI]], order = [0, -1, 1, 2];
          if (T < .5) { poly([[a, 0], [s, a], [b, s], [0, b]].map(X), "rgba(245,196,81,.22)"); label("c²", ...X([s / 2, s / 2]), C.gold, 26); }
          else { poly([[0, 0], [a, 0], [a, a], [0, a]].map(X), "rgba(245,196,81,.22)"); poly([[a, a], [s, a], [s, s], [a, s]].map(X), "rgba(245,196,81,.22)"); label("a²", ...X([a / 2, a / 2]), C.gold, 20); label("b²", ...X([a + b / 2, a + b / 2]), C.gold, 26); }
          A1.forEach(([R1, g], i) => { const e = order[i] < 0 ? 0 : smooth(clamp01(T * 3 - order[i])), R = [R1[0] + (A2[i][0][0] - R1[0]) * e, R1[1] + (A2[i][0][1] - R1[1]) * e]; poly(trig(R, g).map(X), TC[i], "rgba(14,6,24,.9)"); });
          out.innerHTML = `Both big squares have side a + b and hold the same four triangles.\nWhat is left over must have the same area:  <span class="g">c²</span>  =  <span class="g">a² + b²</span>\n<span class="d">a = ${a.toFixed(3)}, b = ${b.toFixed(3)}:  a² + b² = ${(a * a + b * b).toFixed(4)},  c² = 1</span>`;
        } else {
          poly([[a, 0], [s, a], [b, s], [0, b]].map(X), null, C.gold);
          const hyp = [[[0, b], [a, 0]], [[a, 0], [s, a]], [[s, a], [b, s]], [[b, s], [0, b]]];
          if (T > .5) { poly([[a, a], [b, a], [b, b], [a, b]].map(X), "rgba(245,196,81,.3)"); label("(b − a)²", ...X([s / 2, s / 2]), C.gold, 13); }
          A1.forEach(([R1, g], i) => { const [P, Q] = hyp[i], M = [(P[0] + Q[0]) / 2, (P[1] + Q[1]) / 2], e = smooth(clamp01(T * 4 - i * .6)) * Math.PI, cs = Math.cos(e), sn = Math.sin(e);
            poly(trig(R1, g).map(([x, y]) => [M[0] + cs * (x - M[0]) - sn * (y - M[1]), M[1] + sn * (x - M[0]) + cs * (y - M[1])]).map(X), TC[i], "rgba(14,6,24,.9)"); });
          ctx.strokeStyle = C.gold; ctx.lineWidth = 2.4; ctx.beginPath(); [[a, 0], [s, a], [b, s], [0, b]].map(X).forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)); ctx.closePath(); ctx.stroke();
          out.innerHTML = `Fold the four corner triangles into the tilted square of side c: they leave a small square of side b − a.\n<span class="g">c²</span> = 4 · ab/2 + (b − a)² = 2ab + b² − 2ab + a² = <span class="g">a² + b²</span>`;
        }
      } else if (mode === 2) {
        const k = Math.min((w - 60) / s, (h - 50) / Math.max(a, b)), ox = (w - s * k) / 2, oy = h - 25, X = ([x, y]) => [ox + x * k, oy - y * k];
        poly([[0, 0], [0, b], [a, 0]].map(X), TC[0], "#0e0618"); poly([[a, 0], [s, 0], [s, a]].map(X), TC[1], "#0e0618"); poly([[0, b], [a, 0], [s, a]].map(X), "rgba(245,196,81,.35)", C.gold);
        label("a", ...X([a / 2, -.06]), "#cfc9e4", 14); label("b", ...X([-.06, b / 2]), "#cfc9e4", 14); label("b", ...X([a + b / 2, -.06]), "#cfc9e4", 14); label("a", ...X([s + .06, a / 2]), "#cfc9e4", 14);
        label("c²/2", ...X([(a + s) / 3, (b + a) / 3 + .02]), C.gold, 18);
        out.innerHTML = `The trapezoid has parallel sides a and b, width a + b: area (a + b)²/2.\nIt is two a·b/2 triangles plus a right isosceles triangle with legs c:\n(a + b)²/2 = ab + <span class="g">c²/2</span>  ⇒  a² + 2ab + b² = 2ab + c²  ⇒  <span class="g">a² + b² = c²</span>`;
      } else {
        const k = Math.min(w - 60, (h - 40) / (a * b) * 1), ox = (w - k) / 2, oy = h - 22, X = ([x, y]) => [ox + x * k, oy - y * k];
        const H = [b * b, 0], Cp = [b * b, a * b];
        poly([[0, 0], H, Cp].map(X), TC[0], "#0e0618"); poly([H, [1, 0], Cp].map(X), TC[1], "#0e0618");
        poly([[0, 0], [1, 0], Cp].map(X), null, C.gold);
        ctx.setLineDash([4, 4]); ctx.strokeStyle = "#fff"; ctx.beginPath(); ctx.moveTo(...X(H)); ctx.lineTo(...X(Cp)); ctx.stroke(); ctx.setLineDash([]);
        label("b", ...X([b * b / 2 - .03, a * b / 2 + .04]), "#fff", 15); label("a", ...X([(1 + b * b) / 2 + .03, a * b / 2 + .04]), "#fff", 15); label("c", ...X([.5, -.05]), C.gold, 15);
        out.innerHTML = `The altitude cuts the triangle into two smaller copies of itself, with hypotenuses b and a.\nSimilar triangles have areas proportional to the squares of their sides, so area = k·(hypotenuse)²:\nk·b² + k·a² = k·c²   ⇒   <span class="g">a² + b² = c²</span>  <span class="d">(the pieces are ${(b * b * 100).toFixed(0)}% and ${(a * a * 100).toFixed(0)}% of the whole)</span>`;
      }
    }
    p.querySelectorAll(".py-m").forEach(b => b.addEventListener("click", () => { mode = +b.dataset.m; t0 = performance.now(); p.querySelectorAll(".py-m").forEach(x => x.classList.toggle("on", x === b)); }));
    py.fn = draw; draw();
  },
  start() { py.start(); }, stop() { py.stop(); }
});

/* ================================================================ Penrose tiling */
function penroseTris(gen) {
  let T = [];
  for (let i = 0; i < 10; i++) {
    let B = [Math.cos((2 * i - 1) * Math.PI / 10), Math.sin((2 * i - 1) * Math.PI / 10)], Q = [Math.cos((2 * i + 1) * Math.PI / 10), Math.sin((2 * i + 1) * Math.PI / 10)];
    if (i % 2 === 0) [B, Q] = [Q, B];
    T.push([0, [0, 0], B, Q]);
  }
  const lerp = (P, Q) => [P[0] + (Q[0] - P[0]) / PHI, P[1] + (Q[1] - P[1]) / PHI];
  for (let g = 0; g < gen; g++) {
    const N = [];
    for (const [col, A, B, Q] of T) {
      if (col === 0) { const P = lerp(A, B); N.push([0, Q, P, B], [1, P, Q, A]); }
      else { const P = lerp(B, A), R = lerp(B, Q); N.push([1, R, Q, A], [1, P, R, B], [0, R, P, A]); }
    }
    T = N;
  }
  return T;
}
const pe = looper();
registerAtom({
  id: "penrose", name: "Penrose tiling", domain: "geometry", fields: ["classical-geometry", "dynamical-systems"],
  html: `<h3>Penrose tiling — order without repetition</h3>
    <p class="ahint">Two rhombs, thin (36°) and thick (72°), cover the plane in a pattern that never repeats — no shift of the plane maps it to itself — yet it has five-fold symmetry everywhere. It is built by <i>deflation</i>: cut every tile into smaller tiles by a fixed rule, then zoom out by the golden ratio. Step through the generations.</p>
    <div class="achips"><label class="achk">generation <input type="range" class="pe-g" min="0" max="8" step="1" value="5"> <b class="pe-gv">5</b></label>
      <label class="achk">zoom <input type="range" class="pe-z" min="1" max="4" step="0.05" value="1.3"></label>
      <button class="achip pe-play">▶ deflate</button><button class="achip pe-tri">show half-tiles</button></div>
    <canvas class="acv pe-cv"></canvas>
    <div class="aout pe-out"></div>
    <p class="awhy">Roger Penrose found these tiles in 1974, building on Robert Berger's 1966 proof that aperiodic sets of tiles exist (his first set had 20,426 tiles). Every finite patch appears again and again, but the whole never repeats, and thick outnumber thin by the golden ratio φ ≈ 1.618 — an irrational number, which is why there can be no period. In 1982 Dan Shechtman found crystals with forbidden five-fold symmetry, quasicrystals, and won the 2011 Nobel Prize in Chemistry. In 2023 David Smith, a hobbyist, found the "hat": a single tile that tiles only aperiodically.</p>`,
  build(p) {
    const c = p.querySelector(".pe-cv"), out = p.querySelector(".pe-out"), dims = sized(c, 400), gI = p.querySelector(".pe-g"), zI = p.querySelector(".pe-z");
    let halves = false, play = false, last = 0, cache = {}, dirty = true;
    const tris = g => cache[g] || (cache[g] = penroseTris(g));
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const g = +gI.value, T = tris(g), f = Math.max(w, h) * .55 * +zI.value, cx = w / 2, cy = h / 2;
      ctx.lineJoin = "round";
      for (const [col, A, B, Q] of T) {
        ctx.beginPath(); ctx.moveTo(cx + A[0] * f, cy - A[1] * f); ctx.lineTo(cx + B[0] * f, cy - B[1] * f); ctx.lineTo(cx + Q[0] * f, cy - Q[1] * f); ctx.closePath();
        ctx.fillStyle = col ? "rgba(122,90,220,.72)" : "rgba(245,196,81,.82)"; ctx.fill();
        if (halves) { ctx.strokeStyle = "rgba(14,6,24,.5)"; ctx.lineWidth = .6; ctx.stroke(); }
      }
      ctx.strokeStyle = "#0e0618"; ctx.lineWidth = Math.max(.6, 2.2 - g * .2); ctx.beginPath();
      for (const [, A, B, Q] of T) { ctx.moveTo(cx + B[0] * f, cy - B[1] * f); ctx.lineTo(cx + A[0] * f, cy - A[1] * f); ctx.lineTo(cx + Q[0] * f, cy - Q[1] * f); }
      ctx.stroke();
      const thin = T.filter(t => !t[0]).length / 2, thick = T.filter(t => t[0]).length / 2;
      p.querySelector(".pe-gv").textContent = g;
      out.innerHTML = `generation ${g}: ${thick} thick rhombs, ${thin} thin rhombs   thick ÷ thin = <span class="g">${thin ? (thick / thin).toFixed(5) : "—"}</span>   φ = <span class="t">${PHI.toFixed(5)}</span>\n<span class="d">(counted as pairs of half-tiles; edge pieces make the early ratios rough)</span>`;
    }
    gI.addEventListener("input", () => dirty = true); zI.addEventListener("input", () => dirty = true);
    p.querySelector(".pe-tri").addEventListener("click", e => { halves = !halves; e.target.classList.toggle("on", halves); dirty = true; });
    const pb = p.querySelector(".pe-play"); pb.addEventListener("click", () => { play = !play; pb.classList.toggle("on", play); pb.textContent = play ? "❚❚ pause" : "▶ deflate"; if (play) { gI.value = 0; dirty = true; } });
    let lw = 0;
    pe.fn = () => { const now = performance.now(); if (play && now - last > 1100) { last = now; gI.value = (+gI.value + 1) % 9; dirty = true; } if (c.clientWidth !== lw) { lw = c.clientWidth; dirty = true; } if (dirty) { dirty = false; draw(); } };
    draw();
  },
  start() { pe.start(); }, stop() { pe.stop(); }
});

/* ================================================================ Phyllotaxis */
const ph = looper();
registerAtom({
  id: "phyllotaxis", name: "Sunflower & the golden angle", domain: "geometry", fields: ["classical-geometry", "diophantine", "elementary-nt"],
  html: `<h3>Why sunflowers count in Fibonacci numbers</h3>
    <p class="ahint">A plant grows seeds one at a time, each turned a fixed angle from the last. Most angles waste space — the seeds line up in spokes. The golden angle, 360°/φ² ≈ 137.508°, packs them perfectly. Nudge the angle and watch the spokes appear; colour by a Fibonacci number to see the spirals.</p>
    <div class="achips"><button class="achip ph-a on" data-a="137.50776">golden 137.508°</button><button class="achip ph-a" data-a="137.3">137.3°</button><button class="achip ph-a" data-a="137.6">137.6°</button><button class="achip ph-a" data-a="144">144° (2/5 turn)</button><button class="achip ph-a" data-a="99.5">99.5°</button></div>
    <div class="achips"><label class="achk">angle <input type="range" class="ph-r" min="90" max="180" step="0.01" value="137.51" style="width:170px"> <b class="ph-rv"></b></label>
      <span class="achk">colour by</span>${[0, 13, 21, 34, 55].map(m => `<button class="achip ph-m${m ? "" : " on"}" data-m="${m}">${m ? "mod " + m : "age"}</button>`).join("")}</div>
    <canvas class="acv ph-cv"></canvas>
    <div class="aout ph-out"></div>
    <p class="awhy">If the turn is a fraction p/q of a circle, seeds pile into q straight spokes. So the best angle is the "most irrational" number — the one worst approximated by fractions — and that is the golden ratio, whose continued fraction is all 1s (Hurwitz, 1891). Its best approximations have Fibonacci denominators, so a sunflower head shows 21 spirals one way and 34 the other, or 34 and 55. Helmut Vogel's 1979 model r = c√n, θ = n × 137.508° is the one drawn here; Turing was studying Fibonacci phyllotaxis when he died.</p>`,
  build(p) {
    const c = p.querySelector(".ph-cv"), out = p.querySelector(".ph-out"), dims = sized(c, 380), rI = p.querySelector(".ph-r");
    const N = 900; let alpha = 137.50776, mode = 0, n = 0, drawn = -1, lw = 0;
    function cf(x) { const a = []; for (let i = 0; i < 9; i++) { const q = Math.floor(x + 1e-9); a.push(q); const fr = x - q; if (fr < 1e-6) break; x = 1 / fr; } return a; }
    function info() {
      const x = alpha / 360, a = cf(x), den = []; let q0 = 0, q1 = 1; a.forEach((ai, i) => { if (!i) return; const q = ai * q1 + q0; q0 = q1; q1 = q; den.push(q); });
      p.querySelector(".ph-rv").textContent = alpha.toFixed(3) + "°";
      out.innerHTML = `turn per seed = ${alpha.toFixed(4)}° = ${x.toFixed(6)} of a circle\ncontinued fraction [${a[0]}; ${a.slice(1).join(", ")}${a.length >= 9 ? ", …" : ""}]\nbest-fraction denominators: <span class="g">${den.slice(0, 8).join(", ")}</span>  <span class="d">— the spiral counts you can see</span>`;
    }
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2, k = (Math.min(w, h) / 2 - 8) / Math.sqrt(N), a = alpha * Math.PI / 180;
      for (let i = 0; i < n; i++) {
        const r = k * Math.sqrt(i + .5), t = i * a, sz = 1.4 + 2.4 * Math.sqrt(i / N);
        ctx.fillStyle = mode ? `hsl(${(i % mode) / mode * 360},80%,62%)` : `hsl(${48 - 34 * i / N},${85 - 20 * i / N}%,${68 - 22 * i / N}%)`;
        ctx.beginPath(); ctx.arc(cx + r * Math.cos(t), cy - r * Math.sin(t), sz, 0, 7); ctx.fill();
      }
    }
    const setA = v => { alpha = v; rI.value = v; n = AtomKit.reduced ? N : 0; drawn = -1; info(); };
    p.querySelectorAll(".ph-a").forEach(b => b.addEventListener("click", () => { p.querySelectorAll(".ph-a").forEach(x => x.classList.toggle("on", x === b)); setA(+b.dataset.a); }));
    rI.addEventListener("input", () => { p.querySelectorAll(".ph-a").forEach(x => x.classList.remove("on")); alpha = +rI.value; n = N; drawn = -1; info(); });
    p.querySelectorAll(".ph-m").forEach(b => b.addEventListener("click", () => { mode = +b.dataset.m; p.querySelectorAll(".ph-m").forEach(x => x.classList.toggle("on", x === b)); drawn = -1; }));
    ph.fn = () => { if (n < N) n = Math.min(N, n + 9); if (c.clientWidth !== lw) { lw = c.clientWidth; drawn = -1; } if (n !== drawn) { drawn = n; draw(); } };
    setA(alpha); draw();
  },
  start() { ph.start(); }, stop() { ph.stop(); }
});
})();
