/* ============================================================
   THE WEB OF MATHEMATICS — atoms-geometry2.js
   Geometry in design (domain: geometry)
     dome · perspective
   ============================================================ */
(function () {
"use strict";
const { C } = AtomKit;
function sized(c, h) { let d = AtomKit.canvas(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = AtomKit.canvas(c, h); return d; }; }
function looper() { const L = { raf: null, fn: null, start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } }, stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } }; return L; }
const nrm = v => { const l = Math.hypot(...v); return v.map(x => x / l); };
const view = (yaw, pitch) => v => { const x = v[0] * Math.cos(yaw) + v[2] * Math.sin(yaw), z0 = -v[0] * Math.sin(yaw) + v[2] * Math.cos(yaw); return [x, v[1] * Math.cos(pitch) - z0 * Math.sin(pitch), v[1] * Math.sin(pitch) + z0 * Math.cos(pitch)]; };

/* ================================================================ Geodesic dome */
const PHI = (1 + Math.sqrt(5)) / 2;
const IV = [[-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0], [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI], [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1]].map(nrm);
const IF = [[0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11], [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8], [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9], [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]];
function geodesic(nu) {
  const key = v => v.map(x => Math.round(x * 1e6)).join(), idx = new Map(), V = [], T = [];
  const vid = v => { const k = key(v); if (!idx.has(k)) { idx.set(k, V.length); V.push(v); } return idx.get(k); };
  for (const [a, b, c] of IF) { const A = IV[a], B = IV[b], Cc = IV[c], P = (i, j) => nrm([0, 1, 2].map(k => A[k] + (B[k] - A[k]) * i / nu + (Cc[k] - A[k]) * j / nu));
    for (let i = 0; i < nu; i++) for (let j = 0; j < nu - i; j++) { T.push([vid(P(i, j)), vid(P(i + 1, j)), vid(P(i, j + 1))]); if (i + j < nu - 1) T.push([vid(P(i + 1, j)), vid(P(i + 1, j + 1)), vid(P(i, j + 1))]); } }
  const E = new Set(); T.forEach(t => [[0, 1], [1, 2], [2, 0]].forEach(([p, q]) => E.add(Math.min(t[p], t[q]) + "-" + Math.max(t[p], t[q]))));
  const lens = new Set(); E.forEach(k => { const [p, q] = k.split("-").map(Number); lens.add(Math.hypot(...V[p].map((x, i) => x - V[q][i])).toFixed(4)); });
  const deg = new Array(V.length).fill(0); E.forEach(k => k.split("-").forEach(i => deg[+i]++));
  return { V, T, E: [...E], nStrut: lens.size, five: deg.filter(d => d === 5).length };
}
const dm = looper();
registerAtom({
  id: "dome", name: "Geodesic dome", domain: "geometry", fields: ["classical-geometry", "algebraic-topology"],
  html: `<h3>Geodesic domes — the strongest way to cover space with triangles</h3>
    <p class="ahint">Take an icosahedron, cut each of its 20 triangles into smaller ones, and push every new corner out onto the sphere. The frequency ν is how many pieces each edge is cut into. Drag to turn it; show only the top half for a dome.</p>
    <div class="achips"><label class="achk">frequency ν <input type="range" class="dm-n" min="1" max="8" value="3"> <b class="dm-nv"></b></label><button class="achip dm-h">dome (top half)</button><button class="achip dm-s on">spin</button></div>
    <canvas class="acv dm-cv" style="cursor:grab"></canvas>
    <div class="aout dm-out"></div>
    <p class="awhy">Walther Bauersfeld built the first geodesic dome for the Zeiss planetarium in Jena in 1926; Buckminster Fuller patented and popularised it from 1954 (Montreal's Expo 67 pavilion, Epcot's Spaceship Earth). Triangles cannot shear, so the frame is rigid and light. Whatever the frequency, exactly 12 corners meet five struts and all the rest meet six — Euler's formula V − E + F = 2 forces it — which is also why a football, a C₆₀ "buckyball" molecule and many virus shells have exactly 12 pentagons.</p>`,
  build(p) {
    const c = p.querySelector(".dm-cv"), out = p.querySelector(".dm-out"), dims = sized(c, 380), nI = p.querySelector(".dm-n");
    let G = geodesic(3), half = false, spin = !AtomKit.reduced, yaw = .5, pitch = .35, drag = null;
    const L = [-.4, .7, .6], Ln = nrm(L);
    dm.fn = () => {
      if (spin && !drag) yaw += .004; const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * .42, Vw = view(yaw, pitch), P = G.V.map(v => { const q = Vw(v); return [w / 2 + q[0] * R, h / 2 + (half ? R * .25 : 0) - q[1] * R, q[2]]; });
      const faces = G.T.filter(t => !half || t.every(i => G.V[i][1] > -1e-6)).map(t => { const a = G.V[t[0]], b = G.V[t[1]], cc = G.V[t[2]], n = nrm(Vw(nrm([0, 1, 2].map(k => a[k] + b[k] + cc[k]))));
        return { t, z: (P[t[0]][2] + P[t[1]][2] + P[t[2]][2]) / 3, n }; }).sort((x, y) => x.z - y.z);
      for (const f of faces) { const front = f.n[2] > 0, br = .25 + .75 * Math.max(0, f.n[0] * Ln[0] + f.n[1] * Ln[1] + f.n[2] * Ln[2]);
        ctx.beginPath(); f.t.forEach((i, k) => k ? ctx.lineTo(P[i][0], P[i][1]) : ctx.moveTo(P[i][0], P[i][1])); ctx.closePath();
        ctx.fillStyle = front ? `hsla(200,55%,${18 + 40 * br}%,.9)` : "rgba(40,30,70,.35)"; ctx.fill(); ctx.strokeStyle = front ? "rgba(245,196,81,.85)" : "rgba(245,196,81,.15)"; ctx.lineWidth = 1.1; ctx.stroke(); }
      if (half) { ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.beginPath(); ctx.moveTo(0, h / 2 + R * .25 + 2); ctx.lineTo(w, h / 2 + R * .25 + 2); ctx.stroke(); }
      const nu = +nI.value, V = G.V.length, E = G.E.length, F = G.T.length;
      out.innerHTML = `ν = ${nu}:   V = ${V} (= 10ν² + 2)   E = ${E} (= 30ν²)   F = ${F} (= 20ν²)   V − E + F = <span class="g">${V - E + F}</span>\ncorners where 5 struts meet: <span class="t">${G.five}</span> (always 12) · different strut lengths needed: ${G.nStrut}`;
    };
    nI.addEventListener("input", () => { G = geodesic(+nI.value); p.querySelector(".dm-nv").textContent = nI.value; }); p.querySelector(".dm-nv").textContent = 3;
    p.querySelector(".dm-h").addEventListener("click", e => { half = !half; e.target.classList.toggle("on", half); });
    p.querySelector(".dm-s").addEventListener("click", e => { spin = !spin; e.target.classList.toggle("on", spin); });
    c.addEventListener("pointerdown", e => { drag = [e.clientX, e.clientY]; try { c.setPointerCapture(e.pointerId); } catch (_) {} });
    c.addEventListener("pointermove", e => { if (!drag) return; yaw += (e.clientX - drag[0]) * .01; pitch = Math.max(-1.4, Math.min(1.4, pitch + (e.clientY - drag[1]) * .01)); drag = [e.clientX, e.clientY]; });
    c.addEventListener("pointerup", () => drag = null);
  },
  start() { dm.start(); }, stop() { dm.stop(); }
});

/* ================================================================ Perspective */
const CUBE = []; for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) CUBE.push([x, y, z]);
const CE = []; for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) if ([0, 1, 2].filter(k => CUBE[i][k] !== CUBE[j][k]).length === 1) CE.push([i, j]);
const ps = looper();
registerAtom({
  id: "perspective", name: "Perspective & vanishing points", domain: "geometry", fields: ["classical-geometry", "algebraic-geometry"],
  html: `<h3>Perspective — Dürer's window and the points where parallel lines meet</h3>
    <p class="ahint">Look at a box through a pane of glass and trace what you see: each point is drawn where the ray from your eye crosses the glass. Parallel edges of the box, drawn this way, run together to a vanishing point on the horizon. Turn the box and move your eye.</p>
    <div class="achips"><label class="achk">turn the box <input type="range" class="ps-a" min="0" max="90" value="30"> <b class="ps-av"></b></label><label class="achk">eye distance <input type="range" class="ps-d" min="2" max="12" step="0.1" value="4.5"></label><label class="achk">eye height <input type="range" class="ps-h" min="-1" max="3" step="0.05" value="1.6"></label></div>
    <canvas class="acv ps-cv"></canvas>
    <div class="aout ps-out"></div>
    <p class="awhy">Filippo Brunelleschi demonstrated linear perspective around 1415 with a painted panel of the Florence Baptistery; Alberti wrote down the rules in 1435, and Albrecht Dürer's woodcuts (1525) show artists tracing through a gridded window. Every family of parallel lines meets at one vanishing point, and horizontal families meet on the horizon at eye level. Desargues (1639) turned this into projective geometry, where parallel lines really do meet — "at infinity" — and the projective plane became a central object of algebraic geometry.</p>`,
  build(p) {
    const c = p.querySelector(".ps-cv"), out = p.querySelector(".ps-out"), dims = sized(c, 380), aI = p.querySelector(".ps-a"), dI = p.querySelector(".ps-d"), hI = p.querySelector(".ps-h");
    ps.fn = () => {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const th = +aI.value * Math.PI / 180, D = +dI.value, eyeY = +hI.value; p.querySelector(".ps-av").textContent = aI.value + "°";
      // world: box of size 1.4 on the ground, centred 3 units behind the glass (glass: z = 0, eye at z = −D)
      const box = CUBE.map(([x, y, z]) => { const X = (x - .5) * 1.4, Z = (z - .5) * 1.4; return [X * Math.cos(th) - Z * Math.sin(th), y * 1.4, 3 + X * Math.sin(th) + Z * Math.cos(th)]; });
      const f = h * .55 / 3.2, cx = w * .66, cy = h * .72, proj = ([x, y, z]) => { const t = D / (z + D); return [cx + x * t * f * 1.6, cy - (eyeY + (y - eyeY) * t) * f * 1.6 + eyeY * f * 1.6 - eyeY * f * 1.6]; };
      // picture: horizon at eye height
      const hy = cy - eyeY * f * 1.6; ctx.fillStyle = "rgba(122,168,255,.05)"; ctx.fillRect(w * .36, 10, w * .62, h - 20); ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.strokeRect(w * .36, 10, w * .62, h - 20);
      ctx.setLineDash([6, 5]); ctx.strokeStyle = "rgba(87,224,138,.7)"; ctx.beginPath(); ctx.moveTo(w * .36, hy); ctx.lineTo(w * .98, hy); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = C.green; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText("horizon (eye level)", w * .37, hy - 6);
      // vanishing points of the two horizontal edge directions: direction d = (dx, 0, dz) vanishes at x = dx/dz · D, on the horizon
      const dirs = [[Math.cos(th), Math.sin(th)], [-Math.sin(th), Math.cos(th)]], VP = dirs.map(([dx, dz]) => Math.abs(dz) > 1e-3 ? [cx + dx / dz * D * f * 1.6, hy] : null);
      const P = box.map(q => { const t = D / (q[2] + D); return [cx + q[0] * t * f * 1.6, hy + (eyeY - q[1]) * t * f * 1.6]; });
      CE.forEach(([i, j]) => { const d = [0, 1, 2].find(k => CUBE[i][k] !== CUBE[j][k]); if (d === 1) return; const k = d === 0 ? 0 : 1; const vp = VP[k]; if (!vp) return; [i, j].forEach(q => { ctx.strokeStyle = k ? "rgba(255,122,200,.3)" : "rgba(63,208,201,.3)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(...P[q]); ctx.lineTo(...vp); ctx.stroke(); }); });
      CE.forEach(([i, j]) => { ctx.strokeStyle = C.gold; ctx.lineWidth = 2.4; ctx.beginPath(); ctx.moveTo(...P[i]); ctx.lineTo(...P[j]); ctx.stroke(); });
      VP.forEach((v, k) => { if (!v) return; ctx.fillStyle = k ? C.pink : C.teal; ctx.beginPath(); ctx.arc(v[0], v[1], 6, 0, 7); ctx.fill(); if (v[0] > w * .36 && v[0] < w * .98) ctx.fillText("V" + (k + 1), v[0] + 8, v[1] + 16); });
      // side view: eye, glass, box, rays (Dürer's window)
      const sx = w * .03, sw = w * .3, sy = h * .72, s = sw / (D + 5), X = z => sx + (z + D) * s, Y = y => sy - y * s;
      ctx.fillStyle = "#cfc9e4"; ctx.fillText("side view: eye → glass → box", sx, 22);
      ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.beginPath(); ctx.moveTo(sx, Y(0)); ctx.lineTo(sx + sw, Y(0)); ctx.stroke();
      ctx.strokeStyle = C.blue; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(0), Y(-.5)); ctx.lineTo(X(0), Y(3.2)); ctx.stroke();
      const zs = box.map(q => q[2]), z0 = Math.min(...zs), z1 = Math.max(...zs); ctx.fillStyle = "rgba(245,196,81,.35)"; ctx.fillRect(X(z0), Y(1.4), X(z1) - X(z0), Y(0) - Y(1.4));
      ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(X(-D), Y(eyeY), 6, 0, 7); ctx.fill(); ctx.fillText("eye", X(-D) - 8, Y(eyeY) - 10);
      [[z0, 1.4], [z1, 0], [z1, 1.4], [z0, 0]].forEach(([z, y]) => { ctx.strokeStyle = "rgba(245,196,81,.45)"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(X(-D), Y(eyeY)); ctx.lineTo(X(z), Y(y)); ctx.stroke(); const t = D / (z + D); ctx.fillStyle = C.pink; ctx.beginPath(); ctx.arc(X(0), Y(eyeY + (y - eyeY) * t), 3, 0, 7); ctx.fill(); });
      ctx.fillStyle = C.blue; ctx.fillText("glass", X(0) + 6, Y(3.1));
      out.innerHTML = `${Math.abs(+aI.value % 90) < 1 ? "one-point perspective: one set of edges faces you straight on and stays parallel, the other runs to a single vanishing point" : "two-point perspective: each horizontal direction of the box has its own vanishing point, both on the horizon"}\n<span class="d">a point at depth z is drawn scaled by D/(z + D); vertical edges stay vertical because the glass is upright</span>`;
    };
  },
  start() { ps.start(); }, stop() { ps.stop(); }
});
})();
