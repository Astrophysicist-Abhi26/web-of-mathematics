/* ============================================================
   THE WEB OF MATHEMATICS — atoms-algebra.js
   Playable atoms for Algebra:
     · Symmetries of a polygon (the dihedral group)  (Group Theory, Galois)
     · Linear maps of the plane                      (Linear Algebra)
     · Times-table circles (arithmetic mod n)        (Elementary NT, Rings)
   ============================================================ */
(function () {
"use strict";
if (!window.registerAtom) return;
const { canvas, C, reduced } = AtomKit;
const $$ = (root, s) => root.querySelector(s);

/* ============================================================
   1) SYMMETRIES OF A POLYGON — the dihedral group Dₙ
   ============================================================ */
(function () {
  let st = { n: 4, g: [0, 0], word: [], anim: null, raf: 0 }, cv;
  // an element (k, f) sends vertex position i to (f ? −i : i) + k (mod n)
  const mod = (a, n) => ((a % n) + n) % n;
  const compose = (g, h, n) => [mod((g[1] ? -h[0] : h[0]) + g[0], n), g[1] ^ h[1]];   // g ∘ h
  const R = [1, 0], Sref = [0, 1];
  const name = (g, n) => g[1] ? (g[0] ? `r${sup(g[0])}s` : "s") : (g[0] ? `r${sup(g[0])}` : "e");
  const sup = k => k === 1 ? "" : String(k).split("").map(d => "⁰¹²³⁴⁵⁶⁷⁸⁹"[d]).join("");
  const COL = i => `hsl(${i * 360 / st.n + 20} 80% 64%)`;
  function positions(W, H) { const R0 = Math.min(W * .22, H * .38); return i => [W * .27 + R0 * Math.sin(2 * Math.PI * i / st.n), H / 2 - R0 * Math.cos(2 * Math.PI * i / st.n)]; }
  function draw(pane, t = 1) {
    const { ctx, w: W, h: H } = canvas(cv, 290);
    ctx.clearRect(0, 0, W, H);
    const P = positions(W, H), n = st.n;
    // animation between the previous element and the current one
    const cur = st.g, prev = st.anim ? st.anim.from : cur, op = st.anim ? st.anim.op : null;
    const place = (i) => {
      const a = compose(prev, [0, 0], n), from = mod((a[1] ? -i : i) + a[0], n);
      if (!op || t >= 1) { const b = cur; return P(mod((b[1] ? -i : i) + b[0], n)); }
      const [x0, y0] = P(from);
      if (op === "r") { const R0 = Math.min(W * .22, H * .38), ang = 2 * Math.PI * (from + t) / n; return [W * .27 + R0 * Math.sin(ang), H / 2 - R0 * Math.cos(ang)]; }
      const cx = W * .27; return [cx + (x0 - cx) * Math.cos(Math.PI * t), y0];   // flip about the vertical axis
    };
    // the fixed outline and axis
    ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(W * .27, 16); ctx.lineTo(W * .27, H - 16); ctx.stroke(); ctx.setLineDash([]);
    const pts = Array.from({ length: n }, (_, i) => place(i));
    ctx.fillStyle = "rgba(180,140,255,.14)"; ctx.strokeStyle = "rgba(180,140,255,.7)"; ctx.lineWidth = 2;
    ctx.beginPath(); pts.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.lineWidth = 1;
    pts.forEach((p, i) => { ctx.fillStyle = COL(i); ctx.beginPath(); ctx.arc(p[0], p[1], 12, 0, 7); ctx.fill(); ctx.fillStyle = "#120b22"; ctx.font = "bold 11px IBM Plex Mono"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(i + 1, p[0], p[1] + .5); });
    // Cayley table on the right
    const els = []; for (let f = 0; f < 2; f++) for (let k = 0; k < n; k++) els.push([k, f]);
    const N = els.length, x0 = W * .52, cell = Math.min((W - x0 - 10) / (N + 1), (H - 12) / (N + 1));
    ctx.font = `${Math.min(11, cell * .42)}px IBM Plex Mono`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    const idx = g => g[1] * n + g[0];
    els.forEach((g, i) => { ctx.fillStyle = "#9a93b8"; ctx.fillText(name(g, n), x0 + (i + 1.5) * cell, 6 + cell / 2); ctx.fillText(name(g, n), x0 + cell / 2, 6 + (i + 1.5) * cell); });
    els.forEach((g, i) => els.forEach((h, j) => {
      const pr = compose(g, h, n), c = idx(pr);
      const hl = pr[0] === cur[0] && pr[1] === cur[1];
      ctx.fillStyle = `hsla(${c * 360 / N},60%,${hl ? 62 : 45}%,${hl ? .95 : .35})`;
      ctx.fillRect(x0 + (j + 1) * cell + .5, 6 + (i + 1) * cell + .5, cell - 1, cell - 1);
      ctx.fillStyle = hl ? "#120b22" : "#e8e4f4"; ctx.fillText(name(pr, n), x0 + (j + 1.5) * cell, 6 + (i + 1.5) * cell);
    }));
    ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
    const w = st.word.length ? st.word.join("") : "(nothing yet)";
    const rs = compose(R, Sref, n), sr = compose(Sref, R, n);
    $$(pane, ".dg-out").innerHTML = `moves (right to left, like functions): ${w}\n= <span class="g">${name(cur, n)}</span> — one of the ${2 * n} symmetries of the ${n}-gon (the dihedral group D${String(n).split("").map(d => "₀₁₂₃₄₅₆₇₈₉"[d]).join("")})\nr·s = ${name(rs, n)} but s·r = ${name(sr, n)}: <span class="r">order matters</span> — the group is not commutative. Yet every element is r^k or r^k s, and s·r = r⁻¹·s.`;
  }
  function apply(pane, op) {
    if (st.anim) return;
    const from = st.g, g = op === "r" ? R : Sref;
    st.g = compose(g, from, st.n); st.word.unshift(op); if (st.word.length > 14) st.word.pop();
    if (reduced) { draw(pane); return; }
    st.anim = { from, op }; const t0 = performance.now();
    const step = now => { const t = Math.min(1, (now - t0) / 500); draw(pane, t * t * (3 - 2 * t)); if (t < 1) st.raf = requestAnimationFrame(step); else { st.anim = null; draw(pane); } };
    st.raf = requestAnimationFrame(step);
  }
  registerAtom({
    id: "dihedral", name: "Symmetries of a polygon", domain: "algebra", fields: ["group-theory", "galois-theory", "representation-theory"],
    html: `<h3>Symmetries of a polygon — your first non-commutative group</h3>
      <p class="ahint">A symmetry is a move that puts the shape back on its own outline. Rotate by one notch (<b>r</b>) or flip across the vertical axis (<b>s</b>); composing moves is the group operation. The table on the right (Cayley, 1854) lists every product, and each row and column contains every element exactly once — the Latin-square property of any group.</p>
      <div class="achips">${[3, 4, 5, 6].map(n => `<button class="achip${n === 4 ? " on" : ""}" data-n="${n}">${["", "", "", "triangle", "square", "pentagon", "hexagon"][n]}</button>`).join("")}</div>
      <canvas class="acv"></canvas>
      <div class="abar"><button class="abtn" data-b="r">↻ r (rotate)</button><button class="abtn" data-b="s">⇋ s (flip)</button><button class="abtn" data-b="reset">reset</button></div>
      <div class="aout dg-out"></div>
      <p class="awhy">Galois's insight (1832) was to study the symmetries of the <i>roots</i> of an equation in exactly this way. The quintic resists solution because its symmetry group, S₅, isn't built from commutative pieces.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-n]").forEach(b => b.addEventListener("click", () => { st.n = +b.dataset.n; st.g = [0, 0]; st.word = []; pane.querySelectorAll(".achip[data-n]").forEach(x => x.classList.toggle("on", x === b)); draw(pane); }));
      $$(pane, "[data-b=r]").addEventListener("click", () => apply(pane, "r"));
      $$(pane, "[data-b=s]").addEventListener("click", () => apply(pane, "s"));
      $$(pane, "[data-b=reset]").addEventListener("click", () => { st.g = [0, 0]; st.word = []; draw(pane); });
    },
    start(pane) { draw(pane); },
    stop() { cancelAnimationFrame(st.raf); st.anim = null; }
  });
})();

/* ============================================================
   2) LINEAR MAPS OF THE PLANE
   ============================================================ */
(function () {
  const PRE = {
    rotate: [Math.cos(Math.PI / 6), -Math.sin(Math.PI / 6), Math.sin(Math.PI / 6), Math.cos(Math.PI / 6)],
    shear: [1, 1, 0, 1], stretch: [2, 0, 0, .5], reflect: [1, 0, 0, -1], project: [1, .5, .5, .25], eigen: [2, 1, 1, 2], spiral: [.9, -.6, .6, .9]
  };
  let st = { m: [2, 1, 1, 2], t: 1, raf: 0 }, cv;
  function draw(pane) {
    const [a, b, c, d] = st.m.map((v, i) => (1 - st.t) * [1, 0, 0, 1][i] + st.t * v);
    const { ctx, w: W, h: H } = canvas(cv, 320);
    ctx.clearRect(0, 0, W, H);
    const S = Math.min(W, H) / 9, ox = W / 2, oy = H / 2;
    const T = (x, y) => [ox + (a * x + b * y) * S, oy - (c * x + d * y) * S];
    // original grid, faint
    ctx.strokeStyle = "rgba(255,255,255,.07)";
    for (let k = -8; k <= 8; k++) { ctx.beginPath(); ctx.moveTo(ox + k * S, 0); ctx.lineTo(ox + k * S, H); ctx.moveTo(0, oy + k * S); ctx.lineTo(W, oy + k * S); ctx.stroke(); }
    // transformed grid
    ctx.strokeStyle = "rgba(180,140,255,.35)";
    for (let k = -8; k <= 8; k++) {
      let p = T(k, -8), q = T(k, 8); ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.stroke();
      p = T(-8, k); q = T(8, k); ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(...q); ctx.stroke();
    }
    // unit square → parallelogram
    const sq = [T(0, 0), T(1, 0), T(1, 1), T(0, 1)], det = a * d - b * c;
    ctx.fillStyle = det >= 0 ? "rgba(245,196,81,.25)" : "rgba(255,120,71,.28)";
    ctx.beginPath(); sq.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.fill();
    const arrow = (p, col, lab) => {
      ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = 2.6; ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(...p); ctx.stroke(); ctx.lineWidth = 1;
      const ang = Math.atan2(p[1] - oy, p[0] - ox); ctx.beginPath(); ctx.moveTo(...p); ctx.lineTo(p[0] - 9 * Math.cos(ang - .4), p[1] - 9 * Math.sin(ang - .4)); ctx.lineTo(p[0] - 9 * Math.cos(ang + .4), p[1] - 9 * Math.sin(ang + .4)); ctx.fill();
      ctx.font = "12px IBM Plex Mono"; ctx.fillText(lab, p[0] + 6, p[1] - 6);
    };
    arrow(T(1, 0), C.teal, "Ae₁"); arrow(T(0, 1), C.pink, "Ae₂");
    // eigenvectors
    const tr = a + d, disc = tr * tr - 4 * det;
    let eig = "";
    if (disc >= -1e-9) {
      const l1 = (tr + Math.sqrt(Math.max(0, disc))) / 2, l2 = (tr - Math.sqrt(Math.max(0, disc))) / 2;
      [l1, l2].forEach((l, k) => {
        let v = Math.abs(b) > 1e-9 ? [b, l - a] : Math.abs(c) > 1e-9 ? [l - d, c] : (k ? [0, 1] : [1, 0]);
        const n = Math.hypot(...v); v = v.map(x => x / n);
        ctx.strokeStyle = k ? "rgba(87,224,138,.7)" : "rgba(245,196,81,.8)"; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.moveTo(ox - v[0] * 9 * S, oy + v[1] * 9 * S); ctx.lineTo(ox + v[0] * 9 * S, oy - v[1] * 9 * S); ctx.stroke(); ctx.setLineDash([]);
      });
      eig = `eigenvalues <span class="g">${l1.toFixed(3)}</span>, <span class="t">${l2.toFixed(3)}</span> — the dashed lines are mapped to themselves, stretched by those factors`;
    } else {
      const re = tr / 2, im = Math.sqrt(-disc) / 2;
      eig = `eigenvalues <span class="r">${re.toFixed(3)} ± ${im.toFixed(3)}i</span> — complex: no line is left in place, the map rotates everything (by ${(Math.atan2(im, re) * 180 / Math.PI).toFixed(1)}°, scaling by ${Math.hypot(re, im).toFixed(3)})`;
    }
    $$(pane, ".lm-out").innerHTML = `A = [ ${a.toFixed(2)}  ${b.toFixed(2)} ; ${c.toFixed(2)}  ${d.toFixed(2)} ]\ndet A = <span class="${det >= 0 ? "g" : "r"}">${det.toFixed(3)}</span> — the area of the gold parallelogram${det < 0 ? " (negative: orientation flipped)" : ""}${Math.abs(det) < 1e-6 ? ' <span class="r">(zero: the plane is crushed onto a line — not invertible)</span>' : ""}\ntrace ${tr.toFixed(3)} · ${eig}`;
  }
  function animate(pane) {
    cancelAnimationFrame(st.raf); const t0 = performance.now();
    const step = now => { st.t = Math.min(1, (now - t0) / 1200); draw(pane); if (st.t < 1) st.raf = requestAnimationFrame(step); };
    st.t = 0; st.raf = requestAnimationFrame(step);
  }
  registerAtom({
    id: "linmap", name: "Linear maps", domain: "algebra", fields: ["linear-algebra", "lie-theory"],
    html: `<h3>Linear maps of the plane — matrices you can see</h3>
      <p class="ahint">A 2×2 matrix moves every point of the plane, keeping grid lines straight, parallel and evenly spaced. Its columns are where the basis vectors land. The <b>determinant</b> is the factor by which areas change; <b>eigenvectors</b> are the directions that don't turn.</p>
      <div class="achips">${Object.keys(PRE).map(k => `<button class="achip" data-p="${k}">${k}</button>`).join("")}</div>
      <canvas class="acv"></canvas>
      <div class="abar">${["a", "b", "c", "d"].map((k, i) => `<label class="achk">${k} <input type="range" data-i="${i}" min="-2" max="2" step="0.05"></label>`).join("")}<button class="abtn" data-b="play">▶ morph from identity</button></div>
      <div class="aout lm-out"></div>
      <p class="awhy">Everything else in linear algebra is here in miniature: rank (how many dimensions survive), the spectral theorem (symmetric matrices have perpendicular eigenvectors — try "eigen"), and Lie groups (the rotations form a circle of matrices).</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      const ins = [0, 1, 2, 3].map(i => $$(pane, `[data-i="${i}"]`));
      const sync = () => ins.forEach((el, i) => el.value = st.m[i]);
      ins.forEach((el, i) => el.addEventListener("input", () => { st.m[i] = +el.value; st.t = 1; draw(pane); }));
      pane.querySelectorAll("[data-p]").forEach(b => b.addEventListener("click", () => { st.m = PRE[b.dataset.p].slice(); sync(); animate(pane); }));
      $$(pane, "[data-b=play]").addEventListener("click", () => animate(pane));
      sync();
    },
    start(pane) { draw(pane); },
    stop() { cancelAnimationFrame(st.raf); }
  });
})();

/* ============================================================
   3) TIMES-TABLE CIRCLES
   ============================================================ */
(function () {
  let st = { n: 200, m: 2, raf: 0, playing: false }, cv;
  function draw(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 340);
    ctx.clearRect(0, 0, W, H);
    const R = Math.min(W, H) * .44, cx = W / 2, cy = H / 2;
    const P = i => { const a = Math.PI + 2 * Math.PI * i / st.n; return [cx + R * Math.cos(a), cy - R * Math.sin(a)]; };
    ctx.strokeStyle = "rgba(255,255,255,.15)"; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    ctx.lineWidth = st.n > 300 ? .5 : .8;
    for (let i = 0; i < st.n; i++) {
      const j = (i * st.m) % st.n;
      ctx.strokeStyle = `hsla(${(i / st.n * 300 + st.m * 40) % 360},80%,65%,.55)`;
      ctx.beginPath(); ctx.moveTo(...P(i)); ctx.lineTo(...P(j)); ctx.stroke();
    }
    ctx.lineWidth = 1;
    const mi = Math.round(st.m), shape = { 2: "a cardioid", 3: "a nephroid", 4: "a three-cusped epicycloid", 5: "four cusps" }[mi];
    $$(pane, ".tt-out").innerHTML = `${st.n} points; join each i to ${st.m % 1 ? st.m.toFixed(2) : st.m}·i (mod ${st.n})` +
      (Math.abs(st.m - mi) < .01 && shape ? ` — the envelope is <span class="g">${shape}</span> (m − 1 cusps)` : "") +
      `\nArithmetic 'mod n' wraps the number line round a circle: this is the ring ℤ/nℤ, Gauss's congruences drawn.`;
  }
  function play(pane) {
    if (st.playing) { st.playing = false; cancelAnimationFrame(st.raf); return; }
    st.playing = true; let last = performance.now();
    const step = now => { if (!st.playing) return; st.m = +(st.m + (now - last) / 1000 * .12).toFixed(4); last = now; if (st.m > 20) st.m = 2; $$(pane, "[data-i=m]").value = st.m; draw(pane); st.raf = requestAnimationFrame(step); };
    st.raf = requestAnimationFrame(step);
  }
  registerAtom({
    id: "timestable", name: "Times-table circles", domain: "algebra", fields: ["elementary-nt", "ring-theory"],
    html: `<h3>Times-table circles — multiplication mod n, drawn</h3>
      <p class="ahint">Put n points round a circle and join every point i to m × i (mod n). Multiplying by 2 draws a cardioid, by 3 a nephroid — the same curves light makes in a coffee cup. Slide m slowly to watch one pattern melt into the next.</p>
      <canvas class="acv"></canvas>
      <div class="abar"><label class="achk">m <input type="range" data-i="m" min="2" max="20" step="0.01" value="2" style="width:200px"></label>
        <label class="achk">n <input type="range" data-i="n" min="10" max="600" step="1" value="200"></label>
        <button class="abtn" data-b="play">▶ / ⏸</button>${[2, 3, 4, 5, 34, 51].map(m => `<button class="abtn" data-m="${m}">×${m}</button>`).join("")}</div>
      <div class="aout tt-out"></div>`,
    build(pane) {
      cv = $$(pane, "canvas");
      $$(pane, "[data-i=m]").addEventListener("input", e => { st.m = +e.target.value; draw(pane); });
      $$(pane, "[data-i=n]").addEventListener("input", e => { st.n = +e.target.value; draw(pane); });
      $$(pane, "[data-b=play]").addEventListener("click", () => play(pane));
      pane.querySelectorAll("[data-m]").forEach(b => b.addEventListener("click", () => { st.m = +b.dataset.m; $$(pane, "[data-i=m]").value = st.m; draw(pane); }));
    },
    start(pane) { draw(pane); },
    stop() { st.playing = false; cancelAnimationFrame(st.raf); }
  });
})();
})();
