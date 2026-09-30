/* ============================================================
   THE WEB OF MATHEMATICS — atoms-paradox.js
   The Banach–Tarski paradox, via the paradoxical free group (domain: foundations)
   ============================================================ */
(function () {
"use strict";
const { C } = AtomKit;
function sized(c, h) { let d = AtomKit.canvas(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = AtomKit.canvas(c, h); return d; }; }
const INV = { a: "A", A: "a", b: "B", B: "b" };               // A = a⁻¹, B = b⁻¹
const DIR = { a: [1, 0], A: [-1, 0], b: [0, -1], B: [0, 1] };
const COLS = { "": "#ffffff", a: C.gold, A: C.teal, b: C.pink, B: C.blue };
const pretty = w => w ? w.replace(/A/g, "a⁻¹").replace(/B/g, "b⁻¹") : "e";
const reduce = w => { const o = []; for (const ch of w) { if (o.length && o[o.length - 1] === INV[ch]) o.pop(); else o.push(ch); } return o.join(""); };
// every reduced word of length ≤ D, with its position in the Cayley tree (steps halve)
function words(D) { const out = [""]; let fr = [""]; for (let d = 0; d < D; d++) { const nx = []; for (const w of fr) for (const g of "aAbB") if (!w || w[w.length - 1] !== INV[g]) nx.push(w + g); out.push(...nx); fr = nx; } return out; }
const posOf = w => { let x = 0, y = 0, s = 1; for (const g of w) { x += DIR[g][0] * s; y += DIR[g][1] * s; s /= 2; } return [x, y]; };
const STEPS = [
  { t: "1 · the free group F₂", m: "four", d: "Every point of the tree is a word in a, b and their inverses with no cancelling pairs. Colour each word by its first letter: F₂ splits into five pieces — the identity e (white) and S(a), S(a⁻¹), S(b), S(b⁻¹)." },
  { t: "2 · shift one piece", m: "shiftA", d: "Multiply every word of S(a⁻¹) (teal) on the left by a. The leading a⁻¹ cancels, and the teal piece spreads out to cover everything except S(a): e, S(a⁻¹), S(b), S(b⁻¹). So S(a) ∪ a·S(a⁻¹) is all of F₂ — made from just two of the four pieces." },
  { t: "3 · and the other two", m: "shiftB", d: "Do the same with b: S(b) ∪ b·S(b⁻¹) is all of F₂ again. Four pieces of F₂ (plus the single point e) have been rearranged into two complete copies of F₂. Nothing was stretched: left multiplication is a 'rigid motion' of the tree." },
  { t: "4 · from the group to the ball", m: "ball", d: "Two rotations of space by arccos(1/3) about perpendicular axes generate a free group F₂ of rotations (Hausdorff 1914). Its orbits cut the sphere into uncountably many copies of the tree; the axiom of choice picks one point from each orbit, and copying the group's decomposition onto every orbit splits the sphere (minus a countable set, which is repaired) — then, radially, the solid ball — into five pieces that reassemble by rotations into two balls, each the same size as the first." }
];
registerAtom({
  id: "banachtarski", name: "Banach–Tarski paradox", domain: "foundations", fields: ["set-theory", "measure-theory", "group-theory"],
  html: `<h3>Banach–Tarski — one ball becomes two, using only rotations</h3>
    <p class="ahint">A solid ball can be cut into five pieces and the pieces moved rigidly to form two balls, each identical to the original. The heart of the trick is not geometry but a group that is "twice itself". Walk through the four steps.</p>
    <div class="achips">${STEPS.map((s, i) => `<button class="achip bt-s${i ? "" : " on"}" data-i="${i}">${s.t}</button>`).join("")}</div>
    <canvas class="acv bt-cv"></canvas>
    <div class="aout bt-out"></div>
    <p class="awhy">Stefan Banach and Alfred Tarski proved it in 1924, building on Hausdorff (1914) and Vitali (1905). The pieces are so wild that they have no volume at all — they are non-measurable sets, which exist only because of the axiom of choice — so no law of volume is broken. In the plane it is impossible (Banach, 1923): the rotation groups of the plane are too tame to contain a free group. Robert Solovay showed in 1970 that without the axiom of choice it is consistent that every set of reals is measurable, and then the paradox disappears. Five pieces is the minimum (Raphael Robinson, 1947).</p>`,
  build(p) {
    const c = p.querySelector(".bt-cv"), out = p.querySelector(".bt-out"), dims = sized(c, 380), W = words(7);
    let step = 0, t0 = performance.now(), raf = null;
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const S = STEPS[step], k = Math.min(1, (performance.now() - t0) / 1600), e = k * k * (3 - 2 * k);
      out.innerHTML = `<span class="g">${S.t}</span>\n${S.d}`;
      if (S.m === "ball") {
        const R = Math.min(w * .13, h * .32), cy = h / 2, ball = (x, col, a) => { const g = ctx.createRadialGradient(x - R * .35, cy - R * .4, R * .1, x, cy, R); g.addColorStop(0, col); g.addColorStop(1, "#140a26"); ctx.globalAlpha = a; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, cy, R, 0, 7); ctx.fill(); ctx.globalAlpha = 1; };
        ball(w * .2, "#7a5fd0", 1); ctx.fillStyle = "#cfc9e4"; ctx.font = "12px 'IBM Plex Mono', monospace"; ctx.textAlign = "center"; ctx.fillText("one ball, cut into 5 non-measurable pieces", w * .2, cy + R + 22);
        const sp = Math.sin(e * Math.PI / 2); for (let i = 0; i < 5; i++) { const a = i / 5 * 6.283 + e; ctx.fillStyle = [C.gold, C.teal, C.pink, C.blue, "#fff"][i]; for (let j = 0; j < 60; j++) { const r = R * Math.sqrt(((j * 37 + i * 11) % 60) / 60), th = a + j * 2.39996; ctx.globalAlpha = .7; ctx.fillRect(w * .2 + r * Math.cos(th) - 1, cy + r * Math.sin(th) - 1, 2, 2); } } ctx.globalAlpha = 1;
        ctx.strokeStyle = "rgba(207,201,228,.6)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(w * .36, cy); ctx.lineTo(w * .48, cy); ctx.stroke(); ctx.fillText("rotate the pieces", w * .42, cy - 10);
        ball(w * .62, "#caa24a", .35 + .65 * sp); ball(w * .84, "#2fa6a0", .35 + .65 * sp); ctx.fillText("two balls, each the same size", w * .73, cy + R + 22); ctx.textAlign = "start";
        return;
      }
      const cx = w / 2, cy = h / 2, sc = Math.min(w, h) * .24;
      const moved = wd => { if (S.m === "shiftA" && wd[0] === "A") return "a"; if (S.m === "shiftB" && wd[0] === "B") return "b"; return null; };
      const edges = [];
      for (const wd of W) {
        let [x, y] = posOf(wd); const g = moved(wd);
        if (g) { const [x2, y2] = posOf(reduce(g + wd)); x += (x2 - x) * e; y += (y2 - y) * e; }
        const col = COLS[wd[0] || ""], dim = (S.m === "shiftA" && wd[0] && "bB".includes(wd[0])) || (S.m === "shiftB" && wd[0] && "aA".includes(wd[0])) || (S.m !== "four" && !wd);
        edges.push({ wd, x: cx + x * sc, y: cy + y * sc, col, dim, len: wd.length });
      }
      const at = {}; edges.forEach(E => at[E.wd] = E);
      edges.forEach(E => { if (!E.wd) return; const P = at[E.wd.slice(0, -1)]; ctx.strokeStyle = E.col; ctx.globalAlpha = E.dim ? .08 : Math.max(.25, 1 - E.len * .11); ctx.lineWidth = Math.max(.6, 3 - E.len * .4); ctx.beginPath(); ctx.moveTo(P.x, P.y); ctx.lineTo(E.x, E.y); ctx.stroke(); });
      ctx.globalAlpha = 1; edges.forEach(E => { if (E.len > 4 || E.dim) return; ctx.fillStyle = E.col; ctx.beginPath(); ctx.arc(E.x, E.y, Math.max(1.5, 6 - E.len), 0, 7); ctx.fill(); });
      ctx.font = "12px 'IBM Plex Mono', monospace"; [["a", "S(a)"], ["A", "S(a⁻¹)"], ["b", "S(b)"], ["B", "S(b⁻¹)"]].forEach(([g, lab]) => { const [dx, dy] = DIR[g]; ctx.fillStyle = COLS[g]; ctx.fillText(lab, cx + dx * sc * 1.55 - 22, cy + dy * sc * 1.55 + 4); });
      if (S.m !== "four") { ctx.fillStyle = "#fff"; ctx.fillText(S.m === "shiftA" ? "S(a)  ∪  a·S(a⁻¹)  =  F₂" : "S(b)  ∪  b·S(b⁻¹)  =  F₂", 14, 22); }
    }
    const loop = () => { draw(); raf = requestAnimationFrame(loop); };
    p.querySelectorAll(".bt-s").forEach(b => b.addEventListener("click", () => { step = +b.dataset.i; t0 = performance.now(); p.querySelectorAll(".bt-s").forEach(x => x.classList.toggle("on", x === b)); }));
    this._start = () => { if (!raf) loop(); }; this._stop = () => { cancelAnimationFrame(raf); raf = null; };
    BT = this;
  },
  start() { if (this._start) this._start(); }, stop() { if (BT && BT._stop) BT._stop(); }
});
let BT = null;
})();
