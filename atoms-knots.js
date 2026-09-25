/* ============================================================
   THE WEB OF MATHEMATICS — atoms-knots.js
   Knot theory, playable:
     · knots  — a 3D gallery of knots and links with invariants
                computed live from the diagram (knot-engine.js)
     · braids — build a braid word and watch its closure
   ============================================================ */
(function () {
"use strict";
const K = window.KnotEngine, { C, esc } = AtomKit;
const COL = ["#f5c451", "#3fd0c9", "#ff7ac8", "#7aa8ff", "#57e08a", "#b48cff"];
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const TILT = [0.07, 0.05, 0.03];

/* ---------- curve factories ---------- */
const S = K.sample;
const torusLink = (p, q, n) => { const d = gcd(p, q), pp = p / d, qq = q / d, out = [];
  for (let j = 0; j < d; j++) out.push(S(u => { const th = pp * u + 2 * Math.PI * j / (d * qq), ph = qq * u, r = 2 + Math.cos(ph); return [r * Math.cos(th), r * Math.sin(th), Math.sin(ph)]; }, n || Math.round(160 * (p + q) / d)));
  return out; };
const lissajous = (a, b, c, pa, pb) => [S(t => [Math.cos(a * t + pa), Math.cos(b * t + pb), Math.cos(c * t)], 1000)];
const braid = (w, n) => K.braidComponents(w, n);

// Jones-polynomial table built from braid words (checked against the knot tables)
const TABLE_BRAIDS = { "3₁": [[1, 1, 1], 2], "4₁": [[1, -2, 1, -2], 3], "5₁": [[1, 1, 1, 1, 1], 2], "5₂": [[1, 1, 1, 2, -1, 2], 3],
  "6₁": [[1, 1, 2, -1, -3, 2, -3], 4], "6₂": [[1, 1, 1, -2, 1, -2], 3], "6₃": [[1, 1, -2, 1, -2, -2], 3], "7₁": [[1, 1, 1, 1, 1, 1, 1], 2],
  "8₁₉": [[1, 2, 1, 2, 1, 2, 1, 2], 3], "3₁ # 3₁ (granny)": [[1, 1, 1, 2, 2, 2], 3], "3₁ # 3₁* (square)": [[1, 1, 1, -2, -2, -2], 3] };
const ALEX7 = { "3 − 5t + 3t²": "7₂", "2 − 3t + 3t² − 3t³ + 2t⁴": "7₃", "4 − 7t + 4t²": "7₄", "2 − 4t + 5t² − 4t³ + 2t⁴": "7₅", "1 − 5t + 7t² − 5t³ + t⁴": "7₆", "1 − 5t + 9t² − 5t³ + t⁴": "7₇" };
let JT = null;
function table() {
  if (JT) return JT; JT = new Map();
  for (const [name, [w, n]] of Object.entries(TABLE_BRAIDS)) {
    const r = K.invariants(braid(w, n).map(c => K.rotate(c, ...TILT)));
    JT.set(K.jonesKey(r.jones), name); if (!JT.has(K.jonesKey(K.mirrorJ(r.jones)))) JT.set(K.jonesKey(K.mirrorJ(r.jones)), name + " (mirror)");
  }
  return JT;
}
function identify(r) {
  if (r.components > 1) return null;
  if (!r.jones) return "too many crossings to identify here";
  if (K.jonesKey(r.jones) === "0:1") return "the unknot (Jones polynomial = 1)";
  const j = table().get(K.jonesKey(r.jones)); if (j) return j + " — its Jones polynomial matches the table";
  const a = ALEX7[K.fmtAlex(r.alexander)]; if (a && r.crossings <= 9) return a + " — identified by its Alexander polynomial";
  return "not in this page's small table";
}

/* ---------- the gallery ---------- */
const G = [
  { g: "knots", id: "unknot", name: "unknot", make: () => [S(t => [Math.cos(t), Math.sin(t), 0], 240)],
    story: "The trivial knot: a plain loop. Every knot-theory question starts by asking whether a tangle is secretly this. Haken (1961) proved there is an algorithm to decide; in 2021 Lackenby announced one running in quasi-polynomial time." },
  { g: "knots", id: "kink", name: "twisted unknot", make: () => [S(t => { const r = .5 + Math.cos(t); return [r * Math.cos(t) - .3, r * Math.sin(t), .6 * Math.sin(t)]; }, 500)],
    story: "One crossing, but no knot: a Reidemeister I twist undoes it. The writhe is ±1 while every invariant stays trivial — which is why the Jones polynomial needs the (−A³)^(−w) correction." },
  { g: "knots", id: "disguise", name: "unknot in disguise", make: () => braid([2, -1, 3, 1, 2, 3, -3, 1, -2], 4), tilt: TILT,
    story: "Nine crossings, and still the unknot: it is the closure of σ₂σ₁⁻¹σ₃ · σ₁σ₂σ₃ · (σ₂σ₁⁻¹σ₃)⁻¹, a conjugate of a Markov-stabilised trivial braid. Its Jones polynomial is exactly 1. Whether any nontrivial knot has Jones polynomial 1 is an open problem." },
  { g: "knots", id: "trefoil", name: "trefoil 3₁", make: () => [S(t => [Math.sin(t) + 2 * Math.sin(2 * t), Math.cos(t) - 2 * Math.cos(2 * t), -Math.sin(3 * t)], 500)],
    story: "The simplest true knot. It is chiral: Dehn (1914) proved the left- and right-handed trefoils can't be deformed into each other — press 'mirror' and watch the Jones polynomial turn t ↦ 1/t while the Alexander polynomial stays put. It is 3-colourable, the quickest proof that it is knotted." },
  { g: "knots", id: "fig8", name: "figure-eight 4₁", make: () => [S(t => [(2 + Math.cos(2 * t)) * Math.cos(3 * t), (2 + Math.cos(2 * t)) * Math.sin(3 * t), Math.sin(4 * t)], 600)],
    story: "The only knot with four crossings. It is amphichiral — equal to its mirror image, so its Jones polynomial is symmetric in t ↔ 1/t. Its complement carries a hyperbolic structure (Riley 1975) of volume 2.0298…, the smallest of any knot." },
  { g: "knots", id: "5_1", name: "cinquefoil 5₁", make: () => torusLink(2, 5),
    story: "The (2,5) torus knot, also called Solomon's seal or the pentafoil: it winds twice around the torus's axis and five times through its hole. Torus knots T(2,q) are the family of 'foils'." },
  { g: "knots", id: "5_2", name: "three-twist 5₂", make: () => lissajous(2, 3, 7, .2, .7),
    story: "Drawn here as a Lissajous knot — the curve (cos 2t, cos(3t + φ), cos 7t). Lissajous knots were introduced by Bogle, Hearst, Jones and Stoilov (1994); the engine identifies this one as 5₂, the twist knot with three half-twists." },
  { g: "knots", id: "6_1", name: "stevedore 6₁", make: () => lissajous(3, 2, 5, 1.5, .2),
    story: "Named after the stevedore's stopper knot, and another Lissajous knot. It is 'slice': it bounds a smooth disc in the four-dimensional ball, like the square knot. Its determinant 9 makes it 3-colourable." },
  { g: "knots", id: "6_2", name: "6₂", make: () => braid([1, 1, 1, -2, 1, -2], 3), tilt: TILT,
    story: "A chiral six-crossing knot, drawn as the closure of a 3-strand braid. The braid layout sits inside a solid torus; every knot and link can be drawn this way (Alexander, 1923)." },
  { g: "knots", id: "6_3", name: "6₃", make: () => braid([1, 1, -2, 1, -2, -2], 3), tilt: TILT,
    story: "Amphichiral like the figure-eight: look at the symmetric Jones polynomial." },
  { g: "knots", id: "7_1", name: "septafoil 7₁", make: () => torusLink(2, 7), story: "The (2,7) torus knot: seven crossings in a ring." },
  { g: "knots", id: "7_4", name: "endless knot 7₄", make: () => lissajous(3, 2, 7, .1, .7),
    story: "A Lissajous knot with frequencies (3, 2, 7). Its Alexander polynomial 4 − 7t + 4t² pins it down as 7₄, the knot often identified with the 'endless knot' of Buddhist art." },
  { g: "knots", id: "8_19", name: "8₁₉ = T(3,4)", make: () => torusLink(3, 4),
    story: "The (3,4) torus knot, the first non-alternating knot in the tables: no diagram of it alternates over, under, over. It is the knot cut out by the singular curve x³ + y⁴ = 0 on a small sphere around the origin of ℂ² — every torus knot arises this way (Milnor)." },
  { g: "knots", id: "10_124", name: "10₁₂₄ = T(3,5)", make: () => torusLink(3, 5),
    story: "The (3,5) torus knot. Its Jones polynomial t⁴ + t⁶ − t¹⁰ has just three terms, a hallmark of torus knots." },
  { g: "knots", id: "granny", name: "granny knot", make: () => braid([1, 1, 1, 2, 2, 2], 3), tilt: TILT,
    story: "Two trefoils of the same handedness tied in a row: the connected sum 3₁ # 3₁. Compare with the square knot — same Alexander polynomial (t² − t + 1)², different Jones polynomial." },
  { g: "knots", id: "square", name: "square (reef) knot", make: () => braid([1, 1, 1, -2, -2, -2], 3), tilt: TILT,
    story: "A left and a right trefoil: 3₁ # 3₁*. It is amphichiral and slice, while the granny knot is neither — a difference the Alexander polynomial can't see but the Jones polynomial can." },
  { g: "links", id: "hopf", name: "Hopf link", make: () => [S(t => [Math.cos(t), Math.sin(t), 0], 240), S(t => [1 + Math.cos(t), 0, Math.sin(t)], 240)], tilt: [.5, .35, .15],
    story: "Two circles, linked once: linking number ±1. Any two fibres of Hopf's map S³ → S² (1931) form a Hopf link." },
  { g: "links", id: "solomon", name: "Solomon's link", make: () => torusLink(2, 4),
    story: "The (2,4) torus link, an ancient decorative motif — each ring passes twice through the other, so the linking number is 2." },
  { g: "links", id: "whitehead", name: "Whitehead link", make: () => braid([1, 1, 1, 2, -1, -2, -2], 3), tilt: TILT,
    story: "Linking number 0, yet the rings can't be pulled apart. J. H. C. Whitehead (1935) used it to build a contractible 3-manifold that is not ℝ³. Its complement is hyperbolic with volume 3.6638…, that of the regular ideal octahedron." },
  { g: "links", id: "borromean", name: "Borromean rings", make: () => [S(t => [2 * Math.cos(t), Math.sin(t), 0], 360), S(t => [0, 2 * Math.cos(t), Math.sin(t)], 360), S(t => [Math.sin(t), 0, 2 * Math.cos(t)], 360)], tilt: [.6, .45, .2],
    story: "Three rings, no two of which are linked — every pairwise linking number is 0 — yet the three hold together; cut any one and the other two fall free. Seen on the coat of arms of the Borromeo family. They can't be built from flat round circles (Freedman & Skora, 1987); here they are three perpendicular ellipses." },
  { g: "links", id: "chain", name: "chain of three", make: () => [S(t => [Math.cos(t), Math.sin(t), 0], 240), S(t => [1.6 + Math.cos(t), 0, Math.sin(t)], 240), S(t => [3.2 + Math.cos(t), Math.sin(t), 0], 240)], tilt: [.5, .3, .1],
    story: "Three rings in a row: the outer two are unlinked from each other, each linked once with the middle one." },
  { g: "links", id: "t33", name: "three Hopf fibres T(3,3)", make: () => torusLink(3, 3),
    story: "Every pair links once. Any n fibres of the Hopf fibration form the torus link T(n, n)." },
  { g: "families", id: "torus", name: "torus knot T(p, q)", family: "torus" },
  { g: "families", id: "liss", name: "Lissajous knot", family: "liss" }
];

/* ---------- 3D tube viewer ---------- */
function viewer(cv, H) {
  const st = { yaw: .6, pitch: .9, spin: true, comps: [], mode: "3d", data: null, drag: null, hilite: -1 };
  let dims;
  const resize = () => { dims = AtomKit.canvas(cv, H); };
  st.set = (comps, data) => {
    const all = comps.flat(), cx = all.reduce((s, p) => s + p[0], 0) / all.length, cy = all.reduce((s, p) => s + p[1], 0) / all.length, cz = all.reduce((s, p) => s + p[2], 0) / all.length;
    const R = Math.max(...all.map(p => Math.hypot(p[0] - cx, p[1] - cy, p[2] - cz)));
    st.comps = comps.map(c => c.map(p => [(p[0] - cx) / R, (p[1] - cy) / R, (p[2] - cz) / R]));
    st.data = data; st.draw();
  };
  st.draw = () => {
    if (!dims) resize();
    const { ctx, w, h } = dims; ctx.clearRect(0, 0, w, h);
    const sc = Math.min(w, h) * .4, ox = w / 2, oy = h / 2;
    if (st.mode === "diagram" && st.data) return drawDiagram(ctx, w, h);
    const cy = Math.cos(st.yaw), sy = Math.sin(st.yaw), cp = Math.cos(st.pitch), sp = Math.sin(st.pitch);
    // cut each tube into short runs, sort the runs back-to-front, draw each as one stroked path
    const runs = [], RUN = 6;
    st.comps.forEach((c, k) => {
      const P = c.map(([x, y, z]) => { const x1 = x * cy - y * sy, y1 = x * sy + y * cy; const y2 = y1 * cp - z * sp, z2 = y1 * sp + z * cp; const f = 3.2 / (3.2 + z2); return [ox + x1 * sc * f, oy - y2 * sc * f, z2]; });
      for (let i = 0; i < P.length; i += RUN) { const pts = []; for (let j = 0; j <= RUN; j++) pts.push(P[(i + j) % P.length]); runs.push([pts, pts.reduce((s, p) => s + p[2], 0) / pts.length, k]); }
    });
    runs.sort((a, b) => b[1] - a[1]);
    const lw = Math.max(5, sc * .065), path = pts => { ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); };
    ctx.lineJoin = "round";
    for (const [pts, z, k] of runs) {
      const shade = Math.max(.55, Math.min(1, .85 - z * .4));
      path(pts); ctx.lineCap = "butt"; ctx.strokeStyle = "rgba(8,4,16,.92)"; ctx.lineWidth = lw + 4; ctx.stroke();
      ctx.lineCap = "round"; ctx.strokeStyle = COL[k % COL.length]; ctx.globalAlpha = shade; ctx.lineWidth = lw; ctx.stroke();
      ctx.globalAlpha = shade * .6; ctx.strokeStyle = "#fff"; ctx.lineWidth = lw * .25; ctx.save(); ctx.translate(-lw * .16, -lw * .16); path(pts); ctx.stroke(); ctx.restore();
      ctx.globalAlpha = 1;
    }
    ctx.fillStyle = "#6e6789"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("drag to rotate", 10, h - 10);
  };
  function drawDiagram(ctx, w, h) {
    const { acomps, inv } = st.data, all = acomps.flat();
    const xs = all.map(p => p[0]), ys = all.map(p => p[1]), lx = Math.min(...xs), hx = Math.max(...xs), ly = Math.min(...ys), hy = Math.max(...ys);
    const s = Math.min((w - 40) / (hx - lx), (h - 40) / (hy - ly)), Q = ([x, y]) => [w / 2 + (x - (lx + hx) / 2) * s, h / 2 - (y - (ly + hy) / 2) * s];
    ctx.lineCap = "round"; ctx.lineWidth = 3.2;
    acomps.forEach((c, k) => {
      const M = c.length, hide = new Uint8Array(M);
      inv.X.forEach(x => { if (x.under.c !== k) return; const i0 = Math.floor(x.under.pos), cp = Q(x.pt); for (let d = -12; d <= 12; d++) { const i = (i0 + d + M) % M; if (Math.hypot(Q(c[i])[0] - cp[0], Q(c[i])[1] - cp[1]) < 8) hide[i] = 1; } });
      ctx.strokeStyle = COL[k % COL.length];
      for (let i = 0; i < M; i++) { const j = (i + 1) % M; if (hide[i] || hide[j]) continue; ctx.beginPath(); ctx.moveTo(...Q(c[i])); ctx.lineTo(...Q(c[j])); ctx.stroke(); }
      const a = Q(c[0]), b = Q(c[3]), an = Math.atan2(b[1] - a[1], b[0] - a[0]); ctx.fillStyle = COL[k % COL.length]; ctx.beginPath(); ctx.moveTo(b[0] + 7 * Math.cos(an), b[1] + 7 * Math.sin(an)); ctx.lineTo(b[0] + 7 * Math.cos(an + 2.5), b[1] + 7 * Math.sin(an + 2.5)); ctx.lineTo(b[0] + 7 * Math.cos(an - 2.5), b[1] + 7 * Math.sin(an - 2.5)); ctx.fill();
    });
    inv.X.forEach(x => { const [px, py] = Q(x.pt); ctx.fillStyle = x.sign > 0 ? "rgba(87,224,138,.9)" : "rgba(255,120,71,.9)"; ctx.font = "bold 10px IBM Plex Mono"; ctx.fillText(x.sign > 0 ? "+" : "−", px + 6, py - 6); });
    ctx.fillStyle = "#6e6789"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("the diagram the invariants are computed from · + / − crossing signs", 10, h - 10);
  }
  cv.addEventListener("pointerdown", e => { st.drag = [e.clientX, e.clientY, st.yaw, st.pitch]; cv.setPointerCapture(e.pointerId); });
  cv.addEventListener("pointermove", e => { if (!st.drag) return; st.yaw = st.drag[2] + (e.clientX - st.drag[0]) * .01; st.pitch = st.drag[3] + (e.clientY - st.drag[1]) * .01; st.draw(); });
  cv.addEventListener("pointerup", () => { st.drag = null; });
  st.resize = resize;
  return st;
}

function invHTML(r, extra) {
  const lk = r.linking.length ? r.linking.map(l => `lk(${l.i + 1},${l.j + 1}) = ${l.lk}`).join(", ") : "—";
  const id = identify(r);
  return `<table class="kn-inv">
    <tr><th>components</th><td>${r.components}</td><th>crossings (this diagram)</th><td>${r.crossings}</td></tr>
    <tr><th>writhe</th><td>${r.writhe}</td><th>linking numbers</th><td>${lk}</td></tr>
    <tr><th>determinant</th><td>${r.det ?? "—"}</td><th>Fox 3-colourings</th><td>${r.colourings}${r.components === 1 ? (r.colourings > 3 ? " · tricolourable" : " · not tricolourable") : ""}</td></tr>
    <tr><th>Alexander Δ(t)</th><td colspan="3">${K.fmtAlex(r.alexander)}</td></tr>
    <tr><th>Jones V(t)</th><td colspan="3">${r.jones ? K.fmtJones(r.jones) : "<span class='d'>more than 18 crossings: the 2ⁿ-state sum is skipped</span>"}</td></tr>
  </table>${id ? `<p class="kn-id">⟶ ${id}</p>` : ""}${extra || ""}`;
}

const CSS = `
.kn-wrap{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:1rem;align-items:start}
.kn-cv{display:block;width:100%;border:1px solid rgba(255,255,255,.12);border-radius:12px;background:radial-gradient(ellipse at 50% 40%,rgba(80,40,140,.25),rgba(0,0,0,.3));touch-action:none;cursor:grab}
.kn-group{font:500 .6rem "IBM Plex Mono",monospace;letter-spacing:.12em;color:var(--gold);margin:.55rem 0 .25rem}
.kn-inv{width:100%;border-collapse:collapse;font:.66rem/1.4 "IBM Plex Mono",monospace;margin:.5rem 0}
.kn-inv th{color:#9a93b8;font-weight:400;text-align:left;padding:.25rem .4rem;border-top:1px solid rgba(255,255,255,.07);white-space:nowrap}
.kn-inv td{color:#e8e4f4;padding:.25rem .4rem;border-top:1px solid rgba(255,255,255,.07)}
.kn-inv .d{color:#8d86a8}
.kn-id{font:500 .7rem "IBM Plex Mono",monospace;color:#7fe3d6;margin:.3rem 0}
.kn-story{font-size:.8rem;line-height:1.55;color:#bdb6d6;border-left:2px solid var(--gold);padding:.2rem 0 .2rem .7rem;margin:.6rem 0 0}
.kn-ctl{display:flex;gap:.4rem;flex-wrap:wrap;align-items:center;margin:.45rem 0}
.kn-ctl label{font:.66rem "IBM Plex Mono",monospace;color:#cfc9e4;display:flex;gap:.3rem;align-items:center}
.kn-braid{display:block;width:100%;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(0,0,0,.25);margin:.5rem 0}
.kn-word{font:500 .9rem "IBM Plex Mono",monospace;color:var(--gold);min-height:1.4rem;word-break:break-all}
@media (max-width:760px){.kn-wrap{grid-template-columns:1fr}}
`;
(function () { const s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); })();

let knV, knRaf = null;
registerAtom({
  id: "knots", name: "Knot & link gallery", domain: "geometry", fields: ["low-dim-topology"], wide: true,
  html: `<h3>Knots and links — turn them in 3D, read their invariants</h3>
    <p class="ahint">Pick a knot or link. Every number on the right is computed live from the diagram the curve casts on the page: crossings and writhe, linking numbers, the Alexander and Jones polynomials, the determinant and the number of 3-colourings.</p>
    <div class="kn-wrap">
      <div><canvas class="kn-cv"></canvas>
        <div class="kn-ctl"><button class="achip on kn-3d">3D</button><button class="achip kn-dg">diagram</button><button class="achip kn-mirror">mirror</button><button class="achip on kn-spin">spin</button></div>
        <div class="kn-fam"></div></div>
      <div><div class="kn-list"></div><div class="kn-out"></div></div>
    </div>`,
  build(pane) {
    const cv = pane.querySelector(".kn-cv"), list = pane.querySelector(".kn-list"), out = pane.querySelector(".kn-out"), fam = pane.querySelector(".kn-fam");
    knV = viewer(cv, 380);
    let cur = G[3], mirror = false, fp = { p: 2, q: 3, a: 3, b: 2, c: 7, pa: .1, pb: .7 };
    const groups = { knots: "KNOTS", links: "LINKS", families: "FAMILIES" };
    list.innerHTML = Object.entries(groups).map(([g, t]) => `<div class="kn-group">${t}</div><div class="achips">${G.filter(x => x.g === g).map(x => `<button class="achip" data-id="${x.id}">${x.name}</button>`).join("")}</div>`).join("");
    const setFam = () => {
      if (cur.family === "torus") fam.innerHTML = `<div class="kn-ctl"><label>p <input type="range" min="2" max="5" value="${fp.p}" data-k="p"> <b>${fp.p}</b></label><label>q <input type="range" min="1" max="11" value="${fp.q}" data-k="q"> <b>${fp.q}</b></label></div>`;
      else if (cur.family === "liss") fam.innerHTML = `<div class="kn-ctl"><label>a <input type="range" min="1" max="5" value="${fp.a}" data-k="a"> <b>${fp.a}</b></label><label>b <input type="range" min="1" max="5" value="${fp.b}" data-k="b"> <b>${fp.b}</b></label><label>c <input type="range" min="3" max="9" value="${fp.c}" data-k="c"> <b>${fp.c}</b></label><label>phase <input type="range" min="0" max="3.14" step="0.01" value="${fp.pa}" data-k="pa"></label></div>`;
      else fam.innerHTML = "";
      fam.querySelectorAll("input").forEach(i => i.addEventListener("change", () => { fp[i.dataset.k] = +i.value; show(); setFam(); }));
    };
    function show() {
      let comps, title = cur.name, note = "";
      if (cur.family === "torus") {
        let { p, q } = fp; if ((p - 1) * q > 18) { q = Math.floor(18 / (p - 1)); fp.q = q; }
        comps = torusLink(p, q); title = `T(${p}, ${q})`;
        const d = gcd(p, q); note = `<p class="kn-story">${d === 1 ? `A torus knot: it winds ${p} times around the axis of a doughnut and ${q} times through its hole. Crossing number ${Math.min(p * (q - 1), q * (p - 1))}.` : `gcd(${p}, ${q}) = ${d}, so this is a ${d}-component torus link.`}${q === 1 ? " With q = 1 it is unknotted." : ""} (Crossings are capped so the Jones state sum stays quick.)</p>`;
      } else if (cur.family === "liss") {
        comps = lissajous(fp.a, fp.b, fp.c, fp.pa, fp.pb); title = `Lissajous (${fp.a}, ${fp.b}, ${fp.c})`;
        note = `<p class="kn-story">x = cos(${fp.a}t + φ), y = cos(${fp.b}t + 0.7), z = cos(${fp.c}t). Frequencies must be pairwise coprime for a knot; if the curve hits itself the result is not a knot. Try (3,2,5), (2,3,7), (3,2,7).</p>`;
        if (gcd(fp.a, fp.b) > 1 || gcd(fp.b, fp.c) > 1 || gcd(fp.a, fp.c) > 1) { out.innerHTML = `<p class="kn-story">Frequencies ${fp.a}, ${fp.b}, ${fp.c} are not pairwise coprime — the curve retraces itself, so it isn't a knot. Change one.</p>`; knV.set(comps, null); return; }
      } else { comps = cur.make(); note = `<p class="kn-story">${cur.story}</p>`; }
      if (mirror) comps = comps.map(c => c.map(([x, y, z]) => [x, y, -z]));
      const acomps = comps.map(c => K.rotate(c, ...(cur.tilt || TILT)));
      const r = K.invariants(acomps);
      knV.set(comps, { acomps, inv: r });
      out.innerHTML = `<div class="kn-group" style="font-size:.75rem;letter-spacing:.04em;color:#fff">${esc(title)}${mirror ? " · mirrored" : ""}</div>` + invHTML(r) + note;
      list.querySelectorAll(".achip").forEach(b => b.classList.toggle("on", b.dataset.id === cur.id));
    }
    list.querySelectorAll(".achip").forEach(b => b.addEventListener("click", () => { cur = G.find(x => x.id === b.dataset.id); mirror = false; pane.querySelector(".kn-mirror").classList.remove("on"); setFam(); show(); }));
    pane.querySelector(".kn-3d").addEventListener("click", e => { knV.mode = "3d"; e.target.classList.add("on"); pane.querySelector(".kn-dg").classList.remove("on"); knV.draw(); });
    pane.querySelector(".kn-dg").addEventListener("click", e => { knV.mode = "diagram"; e.target.classList.add("on"); pane.querySelector(".kn-3d").classList.remove("on"); knV.draw(); });
    pane.querySelector(".kn-mirror").addEventListener("click", e => { mirror = !mirror; e.target.classList.toggle("on", mirror); show(); });
    pane.querySelector(".kn-spin").addEventListener("click", e => { knV.spin = !knV.spin; e.target.classList.toggle("on", knV.spin); });
    setFam(); show();
  },
  start() { knV.resize(); knV.draw(); const tick = () => { if (knV.spin && !knV.drag && knV.mode === "3d") { knV.yaw += .006; knV.draw(); } knRaf = requestAnimationFrame(tick); }; knRaf = requestAnimationFrame(tick); },
  stop() { if (knRaf) cancelAnimationFrame(knRaf); knRaf = null; }
});

/* ---------- the braid builder ---------- */
const BRAID_PRESETS = [
  ["trefoil", [1, 1, 1], 2], ["figure-eight", [1, -2, 1, -2], 3], ["5₂", [1, 1, 1, 2, -1, 2], 3], ["6₁", [1, 1, 2, -1, -3, 2, -3], 4],
  ["8₁₉", [1, 2, 1, 2, 1, 2, 1, 2], 3], ["Hopf link", [1, 1], 2], ["Whitehead link", [1, 1, 1, 2, -1, -2, -2], 3], ["Borromean rings", [1, -2, 1, -2, 1, -2], 3],
  ["full twist Δ²", [1, 2, 1, 2, 1, 2], 3], ["Markov unknot", [1, 2, 3], 4]
];
let brV, brRaf = null;
registerAtom({
  id: "braids", name: "Braid builder", domain: "geometry", fields: ["low-dim-topology", "group-theory"], wide: true,
  html: `<h3>Braids — every knot is a closed braid</h3>
    <p class="ahint">Choose the number of strands and click generators: σᵢ crosses strand i over strand i + 1, σᵢ⁻¹ under. Join the top of the braid to the bottom and you get a knot or a link (Alexander, 1923) — shown in 3D with its invariants.</p>
    <div class="kn-wrap"><div>
      <div class="kn-ctl"><span class="achip" style="cursor:default">strands</span>${[2, 3, 4].map(n => `<button class="achip br-n${n === 2 ? " on" : ""}" data-n="${n}">${n}</button>`).join("")}</div>
      <div class="kn-ctl br-gens"></div>
      <div class="kn-ctl"><button class="achip br-undo">⌫ undo</button><button class="achip br-clear">clear</button><button class="achip br-artin">apply σ₁σ₂σ₁ → σ₂σ₁σ₂</button></div>
      <div class="kn-word br-word"></div>
      <canvas class="kn-braid br-cv"></canvas>
      <div class="kn-group">PRESETS</div><div class="achips br-pre">${BRAID_PRESETS.map(([n], i) => `<button class="achip" data-i="${i}">${n}</button>`).join("")}</div>
    </div><div><canvas class="kn-cv br-3d"></canvas><div class="br-out"></div></div></div>
    <p class="awhy">Artin (1925) showed braids on n strands form a group B<sub>n</sub> with relations σᵢσⱼ = σⱼσᵢ when |i − j| ≥ 2 and σᵢσᵢ₊₁σᵢ = σᵢ₊₁σᵢσᵢ₊₁. Markov's theorem says two braids close up to the same link exactly when they are related by conjugation and adding or removing a strand with one crossing. Braids of 'anyons' are the proposed gates of topological quantum computers.</p>`,
  build(pane) {
    let n = 2, word = [1, 1, 1];
    const gens = pane.querySelector(".br-gens"), wordEl = pane.querySelector(".br-word"), out = pane.querySelector(".br-out"), bcv = pane.querySelector(".br-cv");
    brV = viewer(pane.querySelector(".br-3d"), 300);
    const name = g => `σ${"₁₂₃"[Math.abs(g) - 1]}${g < 0 ? "⁻¹" : ""}`;
    const paintGens = () => { gens.innerHTML = Array.from({ length: n - 1 }, (_, i) => `<button class="achip" data-g="${i + 1}">${name(i + 1)}</button><button class="achip" data-g="${-(i + 1)}">${name(-(i + 1))}</button>`).join("");
      gens.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { if (word.length < 24) { word.push(+b.dataset.g); update(); } })); };
    function drawBraid() {
      const { ctx, w, h } = AtomKit.canvas(bcv, 34 + 26 * n), L = Math.max(word.length, 1), dx = (w - 40) / L, y = s => 20 + s * 26;
      ctx.lineCap = "round"; ctx.lineWidth = 3.5;
      let perm = Array.from({ length: n }, (_, i) => i); // perm[slot] = strand id
      for (let k = 0; k < L; k++) {
        const g = word[k], x0 = 20 + k * dx, x1 = x0 + dx;
        const i = g ? Math.abs(g) - 1 : -1;
        for (let s = 0; s < n; s++) if (s !== i && s !== i + 1) { ctx.strokeStyle = COL[perm[s] % COL.length]; ctx.beginPath(); ctx.moveTo(x0, y(s)); ctx.lineTo(x1, y(s)); ctx.stroke(); }
        if (g) {
          const under = g > 0 ? i + 1 : i, overS = g > 0 ? i : i + 1;
          const seg = (from, to, gap) => { ctx.strokeStyle = COL[perm[from] % COL.length]; ctx.beginPath();
            for (let j = 0; j <= 20; j++) { const u = j / 20, yy = y(from) + (y(to) - y(from)) * (.5 - .5 * Math.cos(Math.PI * u)); if (gap && u > .36 && u < .64) { ctx.stroke(); ctx.beginPath(); continue; } j ? ctx.lineTo(x0 + u * dx, yy) : ctx.moveTo(x0 + u * dx, yy); } ctx.stroke(); };
          seg(under, under === i ? i + 1 : i, true); seg(overS, overS === i ? i + 1 : i, false);
          [perm[i], perm[i + 1]] = [perm[i + 1], perm[i]];
        }
      }
      ctx.fillStyle = "#6e6789"; ctx.font = "10px IBM Plex Mono"; for (let s = 0; s < n; s++) ctx.fillText(s + 1, 6, y(s) + 3);
    }
    function update() {
      wordEl.innerHTML = word.length ? word.map(name).join(" ") : "<span style='color:#8d86a8'>(identity braid: n unlinked circles)</span>";
      drawBraid();
      const comps = K.braidComponents(word, n), acomps = comps.map(c => K.rotate(c, ...TILT)), r = K.invariants(acomps);
      brV.set(comps, { acomps, inv: r });
      const perm = []; { let p = Array.from({ length: n }, (_, i) => i); for (const g of word) { const i = Math.abs(g) - 1; [p[i], p[i + 1]] = [p[i + 1], p[i]]; } perm.push(...p); }
      out.innerHTML = `<p class="kn-id" style="color:#cfc9e4">closure: ${r.components === 1 ? "a knot" : r.components + "-component link"} · permutation ${perm.map(x => x + 1).join(" ")}</p>` + invHTML(r);
      pane.querySelectorAll(".br-pre .achip").forEach(b => b.classList.remove("on"));
    }
    pane.querySelectorAll(".br-n").forEach(b => b.addEventListener("click", () => { n = +b.dataset.n; word = word.filter(g => Math.abs(g) < n); pane.querySelectorAll(".br-n").forEach(x => x.classList.toggle("on", x === b)); paintGens(); update(); }));
    pane.querySelector(".br-undo").addEventListener("click", () => { word.pop(); update(); });
    pane.querySelector(".br-clear").addEventListener("click", () => { word = []; update(); });
    pane.querySelector(".br-artin").addEventListener("click", () => {
      const s = word.join(","), i = s.indexOf("1,2,1");
      if (n >= 3 && i >= 0 && (i === 0 || s[i - 1] === ",")) { const before = s.slice(0, i).split(",").filter(Boolean).map(Number), after = s.slice(i + 5).split(",").filter(Boolean).map(Number); word = before.concat([2, 1, 2], after); update(); wordEl.innerHTML += ` <span style="color:#57e08a;font-size:.7rem">← braid relation applied: same link, same invariants</span>`; }
      else { if (n < 3) return; word.push(1, 2, 1); update(); wordEl.innerHTML += ` <span style="color:#8d86a8;font-size:.7rem">(appended σ₁σ₂σ₁ — click again to rewrite it)</span>`; }
    });
    pane.querySelectorAll(".br-pre .achip").forEach(b => b.addEventListener("click", () => { const [, w, nn] = BRAID_PRESETS[+b.dataset.i]; n = nn; word = w.slice(); pane.querySelectorAll(".br-n").forEach(x => x.classList.toggle("on", +x.dataset.n === n)); paintGens(); update(); b.classList.add("on"); }));
    paintGens(); update();
  },
  start() { brV.resize(); brV.draw(); const tick = () => { if (brV.spin && !brV.drag) { brV.yaw += .006; brV.draw(); } brRaf = requestAnimationFrame(tick); }; brRaf = requestAnimationFrame(tick); },
  stop() { if (brRaf) cancelAnimationFrame(brRaf); brRaf = null; }
});
})();
