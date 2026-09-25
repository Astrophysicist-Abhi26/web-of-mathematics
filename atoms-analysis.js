/* ============================================================
   THE WEB OF MATHEMATICS — atoms-analysis.js
   Playable atoms for the Analysis continent:
     · ε–δ game              (Real Analysis)
     · Riemann vs Lebesgue    (Real Analysis, Measure Theory)
     · Fourier epicycles      (Harmonic Analysis)
     · Domain colouring       (Complex Analysis)
     · The brachistochrone    (Calculus of Variations)
     · Phase portraits        (ODEs, Dynamical Systems)
     · The logistic map       (Dynamical Systems)
     · Mandelbrot & Julia     (Dynamical Systems, Complex Analysis)
   ============================================================ */
(function () {
"use strict";
if (!window.registerAtom) return;
const { canvas, C, reduced } = AtomKit;
const $$ = (root, s) => root.querySelector(s);
const fmt = (x, d = 3) => (Math.abs(x) < 1e-12 ? 0 : x).toFixed(d);

/* ============================================================
   1) ε–δ GAME
   ============================================================ */
(function () {
  const FUN = {
    square: { name: "x²", f: x => x * x, a: 1, lo: -2, hi: 2, note: "continuous everywhere — but notice δ must shrink as a grows" },
    sqrt:   { name: "√|x|", f: x => Math.sqrt(Math.abs(x)), a: 0, lo: -2, hi: 2, note: "continuous at 0, but steep: δ has to be about ε²" },
    recip:  { name: "1/x", f: x => 1 / x, a: 0.5, lo: 0.05, hi: 2.5, note: "continuous on (0, ∞), not uniformly: near 0 δ collapses" },
    step:   { name: "step", f: x => (x >= 0 ? 1 : 0), a: 0, lo: -2, hi: 2, note: "jumps at 0: for ε < 1 no δ works there" },
    sin1x:  { name: "sin(1/x)", f: x => (x === 0 ? 0 : Math.sin(1 / x)), a: 0, lo: -1, hi: 1, note: "oscillates infinitely often near 0 — discontinuous there whatever f(0) is" },
    xsin:   { name: "x·sin(1/x)", f: x => (x === 0 ? 0 : x * Math.sin(1 / x)), a: 0, lo: -1, hi: 1, note: "wild but squeezed between ±|x|: continuous at 0 with δ = ε" }
  };
  let st = { k: "square", a: 1, eps: .5, del: .3 }, cv, ro;
  function worst(F, a, d) {
    // largest |f(x) − f(a)| over |x − a| < δ, sampled densely (and more densely near a)
    const fa = F.f(a); let w = 0, at = a;
    for (let i = 1; i <= 1400; i++) {
      const t = i / 1400, off = d * (t * t * .5 + t * .5);
      for (const x of [a - off, a + off]) {
        if (x < F.lo || x > F.hi) continue;
        const v = Math.abs(F.f(x) - fa); if (v > w) { w = v; at = x; }
      }
    }
    return { w, at };
  }
  function autoDelta(F, a, eps) {
    let lo = 0, hi = (F.hi - F.lo) / 2;
    if (worst(F, a, 1e-7).w >= eps) return 0;
    for (let i = 0; i < 44; i++) { const m = (lo + hi) / 2; if (worst(F, a, m).w < eps) lo = m; else hi = m; }
    return lo;
  }
  function draw(pane) {
    const F = FUN[st.k];
    const { ctx, w: W, h: H } = canvas(cv, 300);
    ctx.clearRect(0, 0, W, H);
    // y-range from the graph
    let ymin = Infinity, ymax = -Infinity;
    for (let i = 0; i <= 400; i++) { const x = F.lo + (F.hi - F.lo) * i / 400, y = F.f(x); if (isFinite(y)) { ymin = Math.min(ymin, y); ymax = Math.max(ymax, y); } }
    ymin = Math.max(ymin, -3); ymax = Math.min(ymax, 4.5); const pad = (ymax - ymin) * .12 + .1; ymin -= pad; ymax += pad;
    const X = x => 30 + (x - F.lo) / (F.hi - F.lo) * (W - 44), Y = y => H - 22 - (y - ymin) / (ymax - ymin) * (H - 36);
    const fa = F.f(st.a);
    // axes
    ctx.strokeStyle = "rgba(255,255,255,.18)"; ctx.lineWidth = 1;
    if (ymin < 0 && ymax > 0) { ctx.beginPath(); ctx.moveTo(30, Y(0)); ctx.lineTo(W - 14, Y(0)); ctx.stroke(); }
    if (F.lo < 0 && F.hi > 0) { ctx.beginPath(); ctx.moveTo(X(0), 10); ctx.lineTo(X(0), H - 22); ctx.stroke(); }
    // ε band (gold) and δ band (teal)
    ctx.fillStyle = "rgba(245,196,81,.13)"; ctx.fillRect(30, Y(fa + st.eps), W - 44, Y(fa - st.eps) - Y(fa + st.eps));
    ctx.fillStyle = "rgba(63,208,201,.12)"; ctx.fillRect(X(st.a - st.del), 10, X(st.a + st.del) - X(st.a - st.del), H - 32);
    ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(245,196,81,.7)";
    for (const y of [fa - st.eps, fa + st.eps]) { ctx.beginPath(); ctx.moveTo(30, Y(y)); ctx.lineTo(W - 14, Y(y)); ctx.stroke(); }
    ctx.strokeStyle = "rgba(63,208,201,.8)";
    for (const x of [st.a - st.del, st.a + st.del]) { ctx.beginPath(); ctx.moveTo(X(x), 10); ctx.lineTo(X(x), H - 22); ctx.stroke(); }
    ctx.setLineDash([]);
    // graph: green inside both bands, red where it escapes the ε band inside the δ band
    let prev = null;
    for (let i = 0; i <= 1600; i++) {
      const x = F.lo + (F.hi - F.lo) * i / 1600, y = F.f(x);
      if (!isFinite(y) || y < ymin - 5 || y > ymax + 5) { prev = null; continue; }
      const inD = Math.abs(x - st.a) < st.del, bad = inD && Math.abs(y - fa) >= st.eps;
      if (prev && Math.abs(y - prev.y) < (ymax - ymin) * .5) {
        ctx.strokeStyle = bad ? C.red : inD ? C.green : "rgba(232,228,244,.75)"; ctx.lineWidth = inD ? 2.4 : 1.6;
        ctx.beginPath(); ctx.moveTo(X(prev.x), Y(prev.y)); ctx.lineTo(X(x), Y(y)); ctx.stroke();
      }
      prev = { x, y };
    }
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(X(st.a), Y(fa), 4, 0, 7); ctx.fill();
    ctx.font = "11px IBM Plex Mono, monospace"; ctx.fillStyle = C.gold; ctx.fillText("f(a) ± ε", 34, Y(fa + st.eps) - 4);
    ctx.fillStyle = C.teal; ctx.fillText("a ± δ", X(st.a + st.del) + 4, 22);
    const { w, at } = worst(F, st.a, st.del);
    const ok = w < st.eps;
    $$(pane, ".ed-out").innerHTML = ok
      ? `<span class="t">✓ it works.</span> Every x with |x − a| &lt; δ = ${fmt(st.del)} gives |f(x) − f(a)| &lt; ε = ${fmt(st.eps)} <span class="d">(worst: ${fmt(w)})</span>`
      : `<span class="r">✗ escapes</span> at x ≈ ${fmt(at)}: |f(x) − f(a)| = ${fmt(w)} ≥ ε. Shrink δ — or ask whether any δ can work.`;
    $$(pane, ".ed-note").textContent = F.note;
  }
  function sync(pane) {
    const F = FUN[st.k];
    const aI = $$(pane, "[data-i=a]"); aI.min = F.lo; aI.max = F.hi; aI.step = (F.hi - F.lo) / 400;
    aI.value = st.a;
    $$(pane, "[data-o=a]").textContent = fmt(st.a, 2);
    $$(pane, "[data-o=e]").textContent = fmt(st.eps, 3);
    $$(pane, "[data-o=d]").textContent = fmt(st.del, 4);
    pane.querySelectorAll(".achip[data-k]").forEach(b => b.classList.toggle("on", b.dataset.k === st.k));
    draw(pane);
  }
  registerAtom({
    id: "epsdelta", name: "ε–δ game", domain: "analysis", fields: ["real-analysis"],
    html: `<h3>The ε–δ game — what 'continuous' really means</h3>
      <p class="ahint">Your opponent names a tolerance ε around f(a). You must answer with a δ so that <i>every</i> x within δ of a lands inside the ε band. If you can always answer, f is continuous at a. Weierstrass turned this game into the definition (1861).</p>
      <div class="achips">${Object.entries(FUN).map(([k, F]) => `<button class="achip" data-k="${k}">${F.name}</button>`).join("")}</div>
      <canvas class="acv"></canvas>
      <div class="abar">
        <label class="achk">a <input type="range" data-i="a"> <span class="mono" data-o="a"></span></label>
        <label class="achk">ε <input type="range" data-i="e" min="0.01" max="1.5" step="0.005"> <span class="mono" data-o="e"></span></label>
        <label class="achk">δ <input type="range" data-i="d" min="0.0005" max="1.5" step="0.0005"> <span class="mono" data-o="d"></span></label>
        <button class="abtn" data-b="auto">find the best δ</button>
      </div>
      <div class="aout ed-out"></div>
      <p class="awhy ed-note"></p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-k]").forEach(b => b.addEventListener("click", () => {
        st.k = b.dataset.k; const F = FUN[st.k]; st.a = F.a; st.eps = .5; st.del = .3;
        $$(pane, "[data-i=e]").value = st.eps; $$(pane, "[data-i=d]").value = st.del; sync(pane);
      }));
      $$(pane, "[data-i=a]").addEventListener("input", e => { st.a = +e.target.value; sync(pane); });
      $$(pane, "[data-i=e]").addEventListener("input", e => { st.eps = +e.target.value; sync(pane); });
      $$(pane, "[data-i=d]").addEventListener("input", e => { st.del = +e.target.value; sync(pane); });
      $$(pane, "[data-b=auto]").addEventListener("click", () => {
        const d = autoDelta(FUN[st.k], st.a, st.eps);
        if (d <= 1e-6) { $$(pane, ".ed-out").innerHTML = `<span class="r">No δ works.</span> However small δ gets, some x within it lands outside the ε band: f is <b>not continuous</b> at a = ${fmt(st.a, 2)}.`; return; }
        st.del = Math.min(1.5, d * .98); $$(pane, "[data-i=d]").value = st.del; sync(pane);
      });
      $$(pane, "[data-i=e]").value = st.eps; $$(pane, "[data-i=d]").value = st.del;
      ro = () => sync(pane); addEventListener("resize", ro);
    },
    start(pane) { sync(pane); }
  });
})();

/* ============================================================
   2) RIEMANN vs LEBESGUE
   ============================================================ */
(function () {
  const FUN = {
    bump:  { name: "bump", f: x => Math.exp(-18 * (x - .45) ** 2) * .9 + .05, exact: null },
    wave:  { name: "sin wave", f: x => .5 + .4 * Math.sin(2 * Math.PI * x) * Math.cos(5 * x), exact: null },
    quad:  { name: "x²", f: x => x * x, exact: 1 / 3 },
    dirichlet: { name: "Dirichlet 1_ℚ", f: null, exact: 0 }
  };
  // numerical exact values
  for (const k in FUN) if (FUN[k].f && FUN[k].exact === null) { let s = 0; const n = 20000; for (let i = 0; i < n; i++) s += FUN[k].f((i + .5) / n); FUN[k].exact = s / n; }
  let st = { k: "bump", mode: "riemann", n: 8 }, cv;
  function draw(pane) {
    const F = FUN[st.k];
    const { ctx, w: W, h: H } = canvas(cv, 280);
    ctx.clearRect(0, 0, W, H);
    const X = x => 30 + x * (W - 50), Y = y => H - 26 - y * (H - 46);
    ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.beginPath(); ctx.moveTo(30, Y(0)); ctx.lineTo(W - 14, Y(0)); ctx.moveTo(30, Y(0)); ctx.lineTo(30, 12); ctx.stroke();
    let approx, label;
    if (st.k === "dirichlet") {
      // 1 on the rationals, 0 on the irrationals: draw as two dotted rows
      ctx.fillStyle = C.gold; for (let i = 0; i < 160; i++) { ctx.fillRect(X(i / 160), Y(1) - 1, 2, 2); ctx.fillRect(X((i + .5) / 160), Y(0) - 1, 2, 2); }
      if (st.mode === "riemann") {
        for (let i = 0; i < st.n; i++) {
          ctx.fillStyle = "rgba(255,120,71,.18)"; ctx.fillRect(X(i / st.n) + 1, Y(1), X(1 / st.n) - X(0) - 2, Y(0) - Y(1));
        }
        $$(pane, ".rl-out").innerHTML = `Every interval, however thin, contains rationals (f = 1) and irrationals (f = 0).\nupper sum = <span class="r">1</span>   lower sum = <span class="t">0</span>   for every n — they never meet.\n<span class="r">Not Riemann integrable.</span>`;
      } else {
        ctx.fillStyle = "rgba(63,208,201,.25)"; ctx.fillRect(30, Y(0) + 6, W - 44, 6);
        $$(pane, ".rl-out").innerHTML = `Slice by value instead: {x : f(x) = 1} = ℚ ∩ [0,1] is countable, so its measure is <span class="t">0</span>;\n{x : f(x) = 0} has measure <span class="t">1</span>.\n∫ f = 1·μ(ℚ∩[0,1]) + 0·μ(irrationals) = <span class="g">0</span>. Lebesgue integrates it without blinking.`;
      }
      return;
    }
    if (st.mode === "riemann") {
      let lo = 0, hi = 0, mid = 0;
      for (let i = 0; i < st.n; i++) {
        const a = i / st.n, b = (i + 1) / st.n;
        let mn = Infinity, mx = -Infinity;
        for (let j = 0; j <= 40; j++) { const v = F.f(a + (b - a) * j / 40); mn = Math.min(mn, v); mx = Math.max(mx, v); }
        const m = F.f((a + b) / 2);
        lo += mn / st.n; hi += mx / st.n; mid += m / st.n;
        ctx.fillStyle = "rgba(255,120,71,.16)"; ctx.fillRect(X(a) + .5, Y(mx), X(b) - X(a) - 1, Y(mn) - Y(mx));
        ctx.fillStyle = "rgba(245,196,81,.35)"; ctx.fillRect(X(a) + .5, Y(mn), X(b) - X(a) - 1, Y(0) - Y(mn));
        ctx.strokeStyle = "rgba(245,196,81,.8)"; ctx.strokeRect(X(a) + .5, Y(m), X(b) - X(a) - 1, Y(0) - Y(m));
      }
      approx = mid; label = `vertical strips (n = ${st.n}):\nlower sum ${fmt(lo, 4)}  ≤  midpoint ${fmt(mid, 4)}  ≤  upper sum ${fmt(hi, 4)}\ngap between upper and lower: <span class="r">${fmt(hi - lo, 4)}</span> → 0 as n grows (f is Riemann integrable)`;
    } else {
      // horizontal slices: measure of {x : f(x) > y_k}
      const levels = st.n; let sum = 0;
      for (let k = 0; k < levels; k++) {
        const y0 = k / levels, y1 = (k + 1) / levels;
        let meas = 0; const N = 800, segs = []; let open = null;
        for (let i = 0; i < N; i++) {
          const x = (i + .5) / N, on = F.f(x) > y1 - 1e-9;
          if (on) { meas += 1 / N; if (open === null) open = i / N; } else if (open !== null) { segs.push([open, i / N]); open = null; }
        }
        if (open !== null) segs.push([open, 1]);
        sum += meas * (y1 - y0);
        ctx.fillStyle = `hsla(${175 + k * 70 / levels}, 70%, 58%, .38)`;
        for (const [a, b] of segs) ctx.fillRect(X(a), Y(y1), X(b) - X(a), Y(y0) - Y(y1));
        ctx.fillStyle = "rgba(63,208,201,.9)";
        for (const [a, b] of segs) ctx.fillRect(X(a), Y(0) + 4 + (k % 4) * 3, X(b) - X(a), 2);
      }
      approx = sum; label = `horizontal slices (${levels} levels): Σ (height of slice) × μ{x : f(x) > level}\n≈ ${fmt(sum, 4)}   — the coloured bars under the axis are the sets {f > level}`;
    }
    // the graph
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.8; ctx.beginPath();
    for (let i = 0; i <= 400; i++) { const x = i / 400, y = F.f(x); i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); }
    ctx.stroke(); ctx.lineWidth = 1;
    $$(pane, ".rl-out").innerHTML = `${label}\nexact ∫₀¹ f = <span class="g">${fmt(F.exact, 4)}</span>   error <span class="d">${fmt(Math.abs(approx - F.exact), 5)}</span>`;
  }
  function sync(pane) {
    pane.querySelectorAll(".achip[data-k]").forEach(b => b.classList.toggle("on", b.dataset.k === st.k));
    pane.querySelectorAll(".achip[data-m]").forEach(b => b.classList.toggle("on", b.dataset.m === st.mode));
    $$(pane, "[data-o=n]").textContent = st.n; draw(pane);
  }
  registerAtom({
    id: "riemann-lebesgue", name: "Riemann vs Lebesgue", domain: "analysis", fields: ["measure-theory", "real-analysis"],
    html: `<h3>Two ways to add up area — Riemann (1854) and Lebesgue (1902)</h3>
      <p class="ahint">Riemann cuts the <i>domain</i> into vertical strips. Lebesgue cuts the <i>range</i> into horizontal slices and asks how big each set {x : f(x) &gt; y} is — "count the coins by value". For nice functions they agree; for the Dirichlet function only Lebesgue gives an answer.</p>
      <div class="achips">${Object.entries(FUN).map(([k, F]) => `<button class="achip" data-k="${k}">${F.name}</button>`).join("")}
        <span style="width:1rem"></span><button class="achip" data-m="riemann">Riemann strips</button><button class="achip" data-m="lebesgue">Lebesgue slices</button></div>
      <canvas class="acv"></canvas>
      <div class="abar"><label class="achk">n <input type="range" data-i="n" min="1" max="60" step="1" value="8"> <span class="mono" data-o="n"></span></label></div>
      <div class="aout rl-out"></div>
      <p class="awhy">Lebesgue's own analogy: paying a debt, Riemann hands over coins in the order they come out of his pocket; Lebesgue first sorts them by value. Sorting is what lets limits pass through the integral — the dominated convergence theorem.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-k]").forEach(b => b.addEventListener("click", () => { st.k = b.dataset.k; sync(pane); }));
      pane.querySelectorAll(".achip[data-m]").forEach(b => b.addEventListener("click", () => { st.mode = b.dataset.m; sync(pane); }));
      $$(pane, "[data-i=n]").addEventListener("input", e => { st.n = +e.target.value; sync(pane); });
    },
    start(pane) { sync(pane); }
  });
})();

/* ============================================================
   3) FOURIER EPICYCLES
   ============================================================ */
(function () {
  const M = 256;
  function samplePath(fn) { const pts = []; for (let i = 0; i < M; i++) pts.push(fn(i / M)); return pts; }
  const SHAPES = {
    heart: t => { const a = 2 * Math.PI * t; return [16 * Math.sin(a) ** 3 / 17, -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a)) / 17]; },
    square: t => { const s = t * 4, k = Math.floor(s), u = s - k; return [[-1 + 2 * u, -1], [1, -1 + 2 * u], [1 - 2 * u, 1], [-1, 1 - 2 * u]][k].map(v => v * .8); },
    star: t => { const a = 2 * Math.PI * t, k = Math.floor(t * 10), u = t * 10 - k;
      const P = i => { const ang = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? .38 : .95; return [r * Math.cos(ang), r * Math.sin(ang)]; };
      const A = P(k), B = P(k + 1); return [A[0] + (B[0] - A[0]) * u, A[1] + (B[1] - A[1]) * u]; },
    infinity: t => { const a = 2 * Math.PI * t, d = 1 + Math.sin(a) ** 2; return [.95 * Math.cos(a) / d, .95 * Math.sin(a) * Math.cos(a) / d]; },
    trefoil: t => { const a = 2 * Math.PI * t; return [(Math.sin(a) + 2 * Math.sin(2 * a)) / 3.2, (Math.cos(a) - 2 * Math.cos(2 * a)) / 3.2]; }
  };
  let st = { shape: "heart", N: 12, pts: null, coef: null, t: 0, trail: [], raf: 0, drawing: false, user: [] }, cv;
  function dft(pts) {
    const n = pts.length, out = [];
    for (let k = -n / 2; k < n / 2; k++) {
      let re = 0, im = 0;
      for (let j = 0; j < n; j++) { const a = -2 * Math.PI * k * j / n; re += pts[j][0] * Math.cos(a) - pts[j][1] * Math.sin(a); im += pts[j][0] * Math.sin(a) + pts[j][1] * Math.cos(a); }
      out.push({ k, re: re / n, im: im / n, amp: Math.hypot(re, im) / n, ph: Math.atan2(im, re) });
    }
    return out.sort((a, b) => b.amp - a.amp);
  }
  function setPath(pts) { st.pts = pts; st.coef = dft(pts); st.t = 0; st.trail = []; }
  function frame(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 340);
    const S = Math.min(W, H) * .4, cx = W / 2, cy = H / 2;
    ctx.clearRect(0, 0, W, H);
    // the target path, faint
    ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.lineWidth = 1; ctx.beginPath();
    st.pts.forEach((p, i) => i ? ctx.lineTo(cx + p[0] * S, cy + p[1] * S) : ctx.moveTo(cx + p[0] * S, cy + p[1] * S)); ctx.closePath(); ctx.stroke();
    let x = cx, y = cy;
    const use = st.coef.slice(0, st.N);
    for (const c of use) {
      const r = c.amp * S, a = c.ph + 2 * Math.PI * c.k * st.t;
      ctx.strokeStyle = "rgba(180,140,255,.28)"; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.stroke();
      const nx = x + r * Math.cos(a), ny = y + r * Math.sin(a);
      ctx.strokeStyle = "rgba(245,196,81,.75)"; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(nx, ny); ctx.stroke();
      x = nx; y = ny;
    }
    st.trail.push([x, y]); if (st.trail.length > M + 2) st.trail.shift();
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2.2; ctx.beginPath();
    st.trail.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, 3.5, 0, 7); ctx.fill();
    const energy = use.reduce((s, c) => s + c.amp * c.amp, 0) / st.coef.reduce((s, c) => s + c.amp * c.amp, 0);
    $$(pane, ".fe-out").innerHTML = `${st.N} circle${st.N === 1 ? "" : "s"} of ${M} · they carry <span class="g">${(energy * 100).toFixed(2)}%</span> of the path's energy (Parseval)\nbiggest: ${use.slice(0, 4).map(c => `k=${c.k} r=${c.amp.toFixed(3)}`).join(" · ")}`;
    st.t += 1 / M / (reduced ? 1 : 1.2); if (st.t >= 1) { st.t -= 1; }
  }
  function loop(pane) { frame(pane); st.raf = requestAnimationFrame(() => loop(pane)); }
  registerAtom({
    id: "epicycles", name: "Fourier epicycles", domain: "analysis", fields: ["harmonic-analysis"],
    html: `<h3>Fourier epicycles — any closed curve is a sum of circles</h3>
      <p class="ahint">A path in the plane is a complex function of time, and Fourier's theorem writes it as Σ cₖ e^{2πikt}: circles of radius |cₖ| spinning at k turns per lap, chained end to end. Add circles and the gold pen converges on the shape. Or draw your own.</p>
      <div class="achips">${Object.keys(SHAPES).map(k => `<button class="achip" data-s="${k}">${k}</button>`).join("")}<button class="achip" data-s="draw">✎ draw your own</button></div>
      <canvas class="acv"></canvas>
      <div class="abar"><label class="achk">circles <input type="range" data-i="n" min="1" max="120" step="1" value="12"> <span class="mono" data-o="n"></span></label></div>
      <div class="aout fe-out"></div>
      <p class="awhy">The same decomposition compresses JPEG images and MP3 audio: keep the big circles, drop the tiny ones. Squares need many circles because of their corners (the Gibbs phenomenon); smooth curves need very few.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      const pick = k => {
        pane.querySelectorAll(".achip[data-s]").forEach(b => b.classList.toggle("on", b.dataset.s === k));
        if (k === "draw") { st.drawing = true; st.user = []; $$(pane, ".fe-out").textContent = "Press and drag on the canvas to draw a closed curve, then let go."; cancelAnimationFrame(st.raf);
          const { ctx, w: W, h: H } = canvas(cv, 340); ctx.clearRect(0, 0, W, H); return; }
        st.drawing = false; st.shape = k; setPath(samplePath(SHAPES[k]));
      };
      pane.querySelectorAll(".achip[data-s]").forEach(b => b.addEventListener("click", () => { pick(b.dataset.s); if (!st.drawing) { cancelAnimationFrame(st.raf); loop(pane); } }));
      $$(pane, "[data-i=n]").addEventListener("input", e => { st.N = +e.target.value; $$(pane, "[data-o=n]").textContent = st.N; st.trail = []; });
      let down = false;
      const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
      cv.addEventListener("pointerdown", e => { if (!st.drawing) return; down = true; st.user = [pos(e)]; cv.setPointerCapture(e.pointerId); });
      cv.addEventListener("pointermove", e => {
        if (!down) return; st.user.push(pos(e));
        const ctx = cv.getContext("2d"); ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath();
        st.user.forEach((p, i) => i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.stroke();
      });
      cv.addEventListener("pointerup", () => {
        if (!down) return; down = false; if (st.user.length < 8) return;
        // resample by arc length to M points, normalised to the unit box
        const u = st.user.concat([st.user[0]]); const L = [0];
        for (let i = 1; i < u.length; i++) L.push(L[i - 1] + Math.hypot(u[i][0] - u[i - 1][0], u[i][1] - u[i - 1][1]));
        const tot = L[L.length - 1], pts = []; let j = 0;
        for (let i = 0; i < M; i++) { const s = tot * i / M; while (L[j + 1] < s) j++; const f = (s - L[j]) / ((L[j + 1] - L[j]) || 1); pts.push([u[j][0] + (u[j + 1][0] - u[j][0]) * f, u[j][1] + (u[j + 1][1] - u[j][1]) * f]); }
        const W = cv.clientWidth, H = 340, S = Math.min(W, H) * .4;
        setPath(pts.map(p => [(p[0] - W / 2) / S, (p[1] - H / 2) / S])); st.drawing = false;
        pane.querySelectorAll(".achip[data-s]").forEach(b => b.classList.remove("on"));
        cancelAnimationFrame(st.raf); loop(pane);
      });
      $$(pane, "[data-o=n]").textContent = st.N;
      pick("heart");
    },
    start(pane) { cancelAnimationFrame(st.raf); if (!st.drawing) loop(pane); },
    stop() { cancelAnimationFrame(st.raf); }
  });
})();

/* ============================================================
   4) DOMAIN COLOURING
   ============================================================ */
(function () {
  // complex helpers on [re, im]
  const add = (a, b) => [a[0] + b[0], a[1] + b[1]], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const mul = (a, b) => [a[0] * b[0] - a[1] * b[1], a[0] * b[1] + a[1] * b[0]];
  const div = (a, b) => { const d = b[0] * b[0] + b[1] * b[1]; return [(a[0] * b[0] + a[1] * b[1]) / d, (a[1] * b[0] - a[0] * b[1]) / d]; };
  const cexp = a => { const e = Math.exp(a[0]); return [e * Math.cos(a[1]), e * Math.sin(a[1])]; };
  const csin = a => [Math.sin(a[0]) * Math.cosh(a[1]), Math.cos(a[0]) * Math.sinh(a[1])];
  const FUN = {
    z:     { name: "z", f: z => z, note: "The colour wheel itself: hue = arg z, going once around the origin." },
    z2:    { name: "z²", f: z => mul(z, z), note: "A double zero at 0: the colours cycle twice around it. The winding number counts zeros." },
    z3m1:  { name: "z³ − 1", f: z => sub(mul(z, mul(z, z)), [1, 0]), note: "Three simple zeros: the cube roots of unity, each ringed by one full colour cycle." },
    inv:   { name: "1/z", f: z => div([1, 0], z), note: "A pole at 0: colours run the other way round, and it glows white (|f| → ∞)." },
    mixed: { name: "(z² − 1)/(z² + 1)", f: z => div(sub(mul(z, z), [1, 0]), add(mul(z, z), [1, 0])), note: "Zeros at ±1 (dark), poles at ±i (bright), with colours circling in opposite senses." },
    exp:   { name: "eᶻ", f: z => cexp(z), note: "Periodic in the imaginary direction (period 2πi): horizontal stripes of colour, never zero." },
    sin:   { name: "sin z", f: z => csin(z), note: "Zeros at every multiple of π, and exponential growth up and down." },
    ess:   { name: "e^(1/z)", f: z => cexp(div([1, 0], z)), note: "An essential singularity at 0: by Picard's theorem it takes every value but 0 infinitely often in any neighbourhood." }
  };
  let st = { k: "mixed", R: 2.5 }, cv;
  function hsl(h, s, l) {
    const a = s * Math.min(l, 1 - l), f = n => { const k = (n + h * 12) % 12; return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
    return [f(0) * 255, f(8) * 255, f(4) * 255];
  }
  function draw(pane) {
    const F = FUN[st.k];
    const W = Math.min(cv.parentElement.clientWidth || 480, 520), H = Math.round(W * .7);
    cv.width = W; cv.height = H; cv.style.height = H + "px";
    const ctx = cv.getContext("2d"), img = ctx.createImageData(W, H), d = img.data;
    const sc = 2 * st.R / W;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      const z = [(i - W / 2) * sc, (H / 2 - j) * sc], w = F.f(z);
      let h = Math.atan2(w[1], w[0]) / (2 * Math.PI); if (h < 0) h += 1;
      const m = Math.hypot(w[0], w[1]);
      let l;
      if (!isFinite(m)) l = 1; else { const lg = Math.log2(m + 1e-12); const frac = lg - Math.floor(lg); l = .5 * (1 - Math.pow(.5, m)) + .12 + frac * .16; }
      const [r, g, b] = hsl(h, .82, Math.min(.97, Math.max(.04, l)));
      const o = (j * W + i) * 4; d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.moveTo(W / 2, 0); ctx.lineTo(W / 2, H); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,.7)"; ctx.font = "10px IBM Plex Mono, monospace";
    ctx.fillText(`${st.R.toFixed(1)}`, W - 26, H / 2 - 4); ctx.fillText(`${st.R.toFixed(1)}i`, W / 2 + 4, 12);
    $$(pane, ".dc-note").textContent = F.note;
  }
  registerAtom({
    id: "domaincolour", name: "Domain colouring", domain: "analysis", fields: ["complex-analysis"],
    html: `<h3>Domain colouring — seeing a complex function whole</h3>
      <p class="ahint">A function ℂ → ℂ needs four dimensions to graph. Instead, colour each point z by its value f(z): <b>hue</b> is the angle arg f(z), <b>brightness</b> rises with |f(z)|, and the faint rings mark each doubling of |f|. Zeros are dark points ringed by the whole rainbow; poles are bright.</p>
      <div class="achips">${Object.entries(FUN).map(([k, F]) => `<button class="achip" data-k="${k}">${F.name}</button>`).join("")}</div>
      <canvas class="acv" style="max-width:520px"></canvas>
      <div class="abar"><label class="achk">window ±<input type="range" data-i="r" min="0.5" max="8" step="0.1" value="2.5"> <span class="mono" data-o="r"></span></label>
        <span class="achk dc-hover"></span></div>
      <p class="awhy dc-note"></p>
      <p class="astatus">Count the colour cycles around any loop: that number is (zeros − poles) inside it — the argument principle, a consequence of Cauchy's integral formula.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-k]").forEach(b => b.addEventListener("click", () => {
        st.k = b.dataset.k; pane.querySelectorAll(".achip[data-k]").forEach(x => x.classList.toggle("on", x === b)); draw(pane);
      }));
      const r = $$(pane, "[data-i=r]");
      r.addEventListener("input", () => { st.R = +r.value; $$(pane, "[data-o=r]").textContent = st.R.toFixed(1); draw(pane); });
      cv.addEventListener("pointermove", e => {
        const b = cv.getBoundingClientRect(), W = cv.width, H = cv.height, sc = 2 * st.R / W;
        const z = [((e.clientX - b.left) * W / b.width - W / 2) * sc, (H / 2 - (e.clientY - b.top) * H / b.height) * sc], w = FUN[st.k].f(z);
        $$(pane, ".dc-hover").textContent = `z = ${z[0].toFixed(2)}${z[1] < 0 ? "−" : "+"}${Math.abs(z[1]).toFixed(2)}i → |f| = ${Math.hypot(w[0], w[1]).toPrecision(3)}, arg f = ${(Math.atan2(w[1], w[0]) * 180 / Math.PI).toFixed(0)}°`;
      });
      $$(pane, "[data-o=r]").textContent = st.R.toFixed(1);
      pane.querySelector(`.achip[data-k="${st.k}"]`).classList.add("on");
    },
    start(pane) { draw(pane); }
  });
})();

/* ============================================================
   5) THE BRACHISTOCHRONE
   ============================================================ */
(function () {
  const g = 9.81, XB = Math.PI, YB = 2;        // end point (π, −2): the cycloid with r = 1
  let st = { raf: 0, t0: 0, running: false, ctrl: [1.2, 1.9], taut: false }, cv;
  function curves() {
    const cyc = [], line = [], user = [], circ = [];
    for (let i = 0; i <= 200; i++) {
      const th = Math.PI * i / 200; cyc.push([th - Math.sin(th), 1 - Math.cos(th)]);
      const t = i / 200; line.push([XB * t, YB * t]);
      const [cx, cy] = st.ctrl, u = 1 - t; user.push([2 * u * t * cx + t * t * XB, 2 * u * t * cy + t * t * YB]);
    }
    // circular arc through A and B, tangent vertical at A (centre on the x-axis direction)
    const R = (XB * XB + YB * YB) / (2 * XB), a1 = Math.atan2(YB, XB - R);
    for (let i = 0; i <= 200; i++) { const a = Math.PI - (Math.PI - a1) * i / 200; circ.push([R + R * Math.cos(a), R * Math.sin(a) * 1]); }
    return [
      { name: "straight line", pts: line, col: "#9a93b8" },
      { name: "circular arc", pts: circ, col: C.teal },
      { name: "your curve (drag ◆)", pts: user, col: C.violet },
      { name: "cycloid", pts: cyc, col: C.gold }
    ];
  }
  // time profile along a curve (y measured downward): dt = ds / sqrt(2 g y)
  function timeProfile(pts) {
    const T = [0];
    for (let i = 1; i < pts.length; i++) {
      const ds = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]);
      const ym = (pts[i][1] + pts[i - 1][1]) / 2;
      if (ym <= 0) { T.push(Infinity); continue; }
      T.push(T[i - 1] + ds / Math.sqrt(2 * g * ym));
    }
    return T;
  }
  function posAt(pts, T, t) {
    if (t >= T[T.length - 1]) return pts[pts.length - 1];
    let j = 1; while (T[j] < t) j++;
    const f = (t - T[j - 1]) / (T[j] - T[j - 1]); return [pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * f, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * f];
  }
  function draw(pane, t) {
    const { ctx, w: W, h: H } = canvas(cv, 280);
    const S = Math.min((W - 60) / XB, (H - 50) / YB), ox = 30, oy = 24;
    const P = p => [ox + p[0] * S, oy + p[1] * S];
    ctx.clearRect(0, 0, W, H);
    if (st.taut) {
      // tautochrone: balls released at different heights on the cycloid reach the bottom together
      const cyc = []; for (let i = 0; i <= 200; i++) { const th = Math.PI * i / 200; cyc.push([th - Math.sin(th), 1 - Math.cos(th)]); }
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); cyc.forEach((p, i) => { const q = P(p); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.stroke(); ctx.lineWidth = 1;
      // θ(t) for release at θ0: with φ = π − θ, φ(t) = φ0 cos(√(g/4) t)  (exact for the cycloid)
      const w = Math.sqrt(g / 4), starts = [.05, .35, .6, .85];
      starts.forEach((f0, k) => {
        const phi0 = Math.PI * (1 - f0), phi = phi0 * Math.cos(Math.min(t, Math.PI / (2 * w)) * w), th = Math.PI - phi;
        const q = P([th - Math.sin(th), 1 - Math.cos(th)]);
        ctx.fillStyle = [C.red, C.teal, C.violet, C.green][k]; ctx.beginPath(); ctx.arc(q[0], q[1], 6, 0, 7); ctx.fill();
      });
      const tb = Math.PI / (2 * w);
      $$(pane, ".br-out").innerHTML = `Four balls released from four heights on the same cycloid all reach the bottom at t = π·√(r/g) = <span class="g">${tb.toFixed(3)} s</span>.\nHuygens found this 'tautochrone' in 1659 and built pendulum clocks on it.`;
      return t < tb + .6;
    }
    const cs = curves();
    let lines = [], allDone = true;
    cs.forEach(c => {
      ctx.strokeStyle = c.col; ctx.lineWidth = c.name === "cycloid" ? 2.4 : 1.6; ctx.beginPath();
      c.pts.forEach((p, i) => { const q = P(p); i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]); }); ctx.stroke();
      const T = timeProfile(c.pts), tot = T[T.length - 1];
      const q = P(posAt(c.pts, T, t));
      ctx.fillStyle = c.col; ctx.beginPath(); ctx.arc(q[0], q[1], 6, 0, 7); ctx.fill();
      if (t < tot) allDone = false;
      lines.push({ name: c.name, tot, col: c.col });
    });
    ctx.lineWidth = 1;
    const cp = P(st.ctrl); ctx.fillStyle = C.violet; ctx.save(); ctx.translate(cp[0], cp[1]); ctx.rotate(Math.PI / 4); ctx.fillRect(-5, -5, 10, 10); ctx.restore();
    const A = P([0, 0]), B = P([XB, YB]); ctx.fillStyle = "#fff"; ctx.font = "11px IBM Plex Mono, monospace";
    ctx.fillText("A", A[0] - 14, A[1] + 4); ctx.fillText("B", B[0] + 8, B[1] + 4);
    lines.sort((a, b) => a.tot - b.tot);
    $$(pane, ".br-out").innerHTML = lines.map((l, i) => `${i === 0 ? "🏆" : "  "} <span style="color:${l.col}">${l.name.padEnd(20)}</span> ${isFinite(l.tot) ? l.tot.toFixed(3) + " s" : "never (goes uphill)"}`).join("\n");
    return !allDone;
  }
  function run(pane) {
    cancelAnimationFrame(st.raf); st.t0 = performance.now(); st.running = true;
    const step = now => { const t = (now - st.t0) / 1000 * .8; const more = draw(pane, t); if (more) st.raf = requestAnimationFrame(step); else st.running = false; };
    st.raf = requestAnimationFrame(step);
  }
  registerAtom({
    id: "brachistochrone", name: "Brachistochrone", domain: "analysis", fields: ["variations", "odes"],
    html: `<h3>The brachistochrone — Johann Bernoulli's 1696 challenge</h3>
      <p class="ahint">Which slide gets a bead from A to B fastest under gravity? Not the straight line — the shortest path is not the quickest. The answer, found by Johann and Jacob Bernoulli, Newton, Leibniz and L'Hôpital, is a <b>cycloid</b>: the curve traced by a point on a rolling wheel. The calculus of variations was born solving it. Drag ◆ to design your own slide.</p>
      <canvas class="acv"></canvas>
      <div class="abar"><button class="abtn" data-b="race">▶ race</button><button class="abtn" data-b="taut">tautochrone</button></div>
      <div class="aout br-out"></div>
      <p class="awhy">Why the cycloid? It dives steeply at first to build speed, then coasts. Bernoulli's trick was optics: light takes the fastest path (Fermat), bending as the 'medium' (speed √(2gy)) changes — Snell's law turns into the cycloid.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      $$(pane, "[data-b=race]").addEventListener("click", () => { st.taut = false; run(pane); });
      $$(pane, "[data-b=taut]").addEventListener("click", () => { st.taut = true; run(pane); });
      let drag = false;
      const toW = e => { const b = cv.getBoundingClientRect(), W = b.width, H = 280, S = Math.min((W - 60) / XB, (H - 50) / YB); return [(e.clientX - b.left - 30) / S, (e.clientY - b.top - 24) / S]; };
      cv.addEventListener("pointerdown", e => { const p = toW(e); if (Math.hypot(p[0] - st.ctrl[0], p[1] - st.ctrl[1]) < .35) { drag = true; cv.setPointerCapture(e.pointerId); } });
      cv.addEventListener("pointermove", e => { if (!drag) return; const p = toW(e); st.ctrl = [Math.max(.05, Math.min(XB, p[0])), Math.max(.05, Math.min(3.2, p[1]))]; if (!st.running) draw(pane, 0); });
      cv.addEventListener("pointerup", () => { drag = false; });
    },
    start(pane) { draw(pane, 0); },
    stop() { cancelAnimationFrame(st.raf); st.running = false; }
  });
})();

/* ============================================================
   6) PHASE PORTRAITS
   ============================================================ */
(function () {
  const SYS = {
    saddle:  { name: "saddle", f: (x, y) => [x, -y], R: 3, note: "Eigenvalues 1 and −1: one direction repels, one attracts. Unstable." },
    sink:    { name: "spiral sink", f: (x, y) => [-.3 * x - y, x - .3 * y], R: 3, note: "Eigenvalues −0.3 ± i: every orbit spirals into the origin. Asymptotically stable (Lyapunov)." },
    center:  { name: "centre", f: (x, y) => [-y, x], R: 3, note: "Eigenvalues ±i: closed orbits. Stable but not asymptotically — and fragile: a tiny damping turns it into a spiral." },
    pendulum:{ name: "pendulum", f: (x, y) => [y, -Math.sin(x)], R: 7, note: "θ″ = −sin θ. Centres at θ = 0, ±2π (hanging), saddles at ±π (balanced upright); the separatrix divides swinging from spinning." },
    vdp:     { name: "Van der Pol", f: (x, y) => [y, 1.2 * (1 - x * x) * y - x], R: 4, note: "Every orbit (except the fixed point) winds onto one isolated closed orbit — a limit cycle, the heartbeat of an oscillator circuit." },
    lv:      { name: "predator–prey", f: (x, y) => [x * (1.1 - .5 * y), y * (-.8 + .4 * x)], R: 6, shift: true, note: "Lotka–Volterra: rabbits x and foxes y chase each other round closed cycles; the conserved quantity is 0.4x − 0.8 ln x + 0.5y − 1.1 ln y." },
    lorenz:  { name: "Lorenz", lorenz: true, R: 30, note: "Lorenz (1963): three simple equations, a strange attractor, and sensitive dependence — two starts 10⁻⁶ apart (gold, red) separate completely." }
  };
  let st = { k: "pendulum", orbits: [], raf: 0, lz: null }, cv;
  function rk4(f, x, y, h) {
    const a = f(x, y), b = f(x + h * a[0] / 2, y + h * a[1] / 2), c = f(x + h * b[0] / 2, y + h * b[1] / 2), d = f(x + h * c[0], y + h * c[1]);
    return [x + h * (a[0] + 2 * b[0] + 2 * c[0] + d[0]) / 6, y + h * (a[1] + 2 * b[1] + 2 * c[1] + d[1]) / 6];
  }
  function view(W, H, S) {
    const R = S.R, sc = Math.min(W, H) / (2 * R);
    const ox = S.shift ? 30 : W / 2, oy = S.shift ? H - 24 : H / 2, scl = S.shift ? Math.min((W - 40) / R, (H - 40) / R) : sc;
    return { X: x => ox + x * scl, Y: y => oy - y * scl, ix: px => (px - ox) / scl, iy: py => (oy - py) / scl };
  }
  function draw(pane) {
    const S = SYS[st.k];
    const { ctx, w: W, h: H } = canvas(cv, 320);
    ctx.clearRect(0, 0, W, H);
    $$(pane, ".pp-note").textContent = S.note;
    if (S.lorenz) return;
    const V = view(W, H, S);
    ctx.strokeStyle = "rgba(255,255,255,.14)"; ctx.beginPath(); ctx.moveTo(0, V.Y(0)); ctx.lineTo(W, V.Y(0)); ctx.moveTo(V.X(0), 0); ctx.lineTo(V.X(0), H); ctx.stroke();
    // direction field
    for (let px = 12; px < W; px += 22) for (let py = 12; py < H; py += 22) {
      const x = V.ix(px), y = V.iy(py), v = S.f(x, y), m = Math.hypot(v[0], v[1]) || 1;
      const L = 8, dx = v[0] / m * L, dy = -v[1] / m * L;
      ctx.strokeStyle = `rgba(180,140,255,${.25 + .35 * Math.min(1, m / 3)})`;
      ctx.beginPath(); ctx.moveTo(px - dx / 2, py - dy / 2); ctx.lineTo(px + dx / 2, py + dy / 2); ctx.stroke();
      ctx.fillStyle = ctx.strokeStyle; ctx.fillRect(px + dx / 2 - 1, py + dy / 2 - 1, 2, 2);
    }
    // trajectories
    st.orbits.forEach((o, n) => {
      ctx.strokeStyle = [C.gold, C.teal, C.pink, C.green, C.blue][n % 5]; ctx.lineWidth = 1.8; ctx.beginPath();
      let [x, y] = o; ctx.moveTo(V.X(x), V.Y(y));
      for (let i = 0; i < 2600; i++) { [x, y] = rk4(S.f, x, y, .01); if (!isFinite(x) || Math.abs(x) > 1e3) break; ctx.lineTo(V.X(x), V.Y(y)); }
      ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(V.X(o[0]), V.Y(o[1]), 3, 0, 7); ctx.fill();
    });
  }
  function lorenz(pane) {
    cancelAnimationFrame(st.raf);
    const { ctx, w: W, h: H } = canvas(cv, 320);
    const s = 10, r = 28, b = 8 / 3, h = .006;
    let A = [1, 1, 1], B = [1 + 1e-6, 1, 1];
    const f = p => [s * (p[1] - p[0]), p[0] * (r - p[2]) - p[1], p[0] * p[1] - b * p[2]];
    const stepE = p => { const k1 = f(p), k2 = f(p.map((v, i) => v + h * k1[i] / 2)), k3 = f(p.map((v, i) => v + h * k2[i] / 2)), k4 = f(p.map((v, i) => v + h * k3[i])); return p.map((v, i) => v + h * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]) / 6); };
    const P = p => [W / 2 + p[0] * W / 64, H - 14 - p[2] * (H - 28) / 52];
    ctx.clearRect(0, 0, W, H);
    let n = 0;
    const tick = () => {
      for (let k = 0; k < 6; k++) {
        const pa = P(A), pb = P(B); A = stepE(A); B = stepE(B); const qa = P(A), qb = P(B);
        ctx.strokeStyle = "rgba(245,196,81,.75)"; ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(qa[0], qa[1]); ctx.stroke();
        ctx.strokeStyle = "rgba(255,120,71,.6)"; ctx.beginPath(); ctx.moveTo(pb[0], pb[1]); ctx.lineTo(qb[0], qb[1]); ctx.stroke();
        n++;
      }
      const d = Math.hypot(A[0] - B[0], A[1] - B[1], A[2] - B[2]);
      $$(pane, ".pp-out").innerHTML = `t = ${(n * h).toFixed(1)}   distance between the two runs: <span class="${d > 1 ? "r" : "t"}">${d.toExponential(2)}</span>`;
      if (n * h < 60) st.raf = requestAnimationFrame(tick);
    };
    tick();
  }
  function sync(pane) {
    pane.querySelectorAll(".achip[data-k]").forEach(b => b.classList.toggle("on", b.dataset.k === st.k));
    $$(pane, ".pp-out").textContent = SYS[st.k].lorenz ? "" : "Click anywhere to launch a trajectory from that point (RK4).";
    if (SYS[st.k].lorenz) { draw(pane); lorenz(pane); } else { cancelAnimationFrame(st.raf); draw(pane); }
  }
  registerAtom({
    id: "phase", name: "Phase portraits", domain: "analysis", fields: ["odes", "dynamical-systems"],
    html: `<h3>Phase portraits — Poincaré's geometric view of differential equations (1881)</h3>
      <p class="ahint">Most differential equations can't be solved by formula. Poincaré's idea: stop solving and <i>look</i>. Each point of the plane is a state; the arrows show where it moves next. Fixed points, cycles and separatrices tell the whole long-term story.</p>
      <div class="achips">${Object.entries(SYS).map(([k, S]) => `<button class="achip" data-k="${k}">${S.name}</button>`).join("")}</div>
      <canvas class="acv"></canvas>
      <div class="abar"><button class="abtn" data-b="clear">clear trajectories</button></div>
      <div class="aout pp-out"></div>
      <p class="awhy pp-note"></p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-k]").forEach(b => b.addEventListener("click", () => { st.k = b.dataset.k; st.orbits = defaults(st.k); sync(pane); }));
      $$(pane, "[data-b=clear]").addEventListener("click", () => { st.orbits = []; sync(pane); });
      cv.addEventListener("click", e => {
        const S = SYS[st.k]; if (S.lorenz) return;
        const b = cv.getBoundingClientRect(), V = view(b.width, 320, S);
        st.orbits.push([V.ix(e.clientX - b.left), V.iy(e.clientY - b.top)]); if (st.orbits.length > 10) st.orbits.shift(); draw(pane);
      });
      st.orbits = defaults(st.k);
    },
    start(pane) { sync(pane); },
    stop() { cancelAnimationFrame(st.raf); }
  });
  function defaults(k) {
    return { pendulum: [[0, 1], [0, 1.8], [0, 2.05], [-6, 2.3], [2.5, 0]], vdp: [[.1, 0], [3, 3]], lv: [[2, 1], [3, 3], [1.2, 2.5]],
      saddle: [[.05, 2.5], [-.05, -2.5], [2.5, .05]], sink: [[2.5, 0], [-2, 2]], center: [[1, 0], [2, 0]] }[k] || [];
  }
})();

/* ============================================================
   7) THE LOGISTIC MAP
   ============================================================ */
(function () {
  let st = { r: 3.2, bif: null }, cv, cw;
  function bifurcation(W, H) {
    const img = new Uint8ClampedArray(W * H);
    for (let i = 0; i < W; i++) {
      const r = 2.5 + 1.5 * i / (W - 1); let x = .5;
      for (let k = 0; k < 300; k++) x = r * x * (1 - x);
      for (let k = 0; k < 260; k++) { x = r * x * (1 - x); const j = Math.round((1 - x) * (H - 1)); img[j * W + i] = Math.min(255, img[j * W + i] + 40); }
    }
    return img;
  }
  function draw(pane) {
    const W = Math.max(240, Math.min(560, cv.clientWidth || 360)), H = 220;
    cv.width = W; cv.height = H; cv.style.height = H + "px";
    const ctx = cv.getContext("2d");
    if (!st.bif || st.bif.W !== W) st.bif = { W, img: bifurcation(W, H) };
    const id = ctx.createImageData(W, H);
    for (let p = 0; p < W * H; p++) { const v = st.bif.img[p]; id.data[p * 4] = 245 * v / 255; id.data[p * 4 + 1] = 196 * v / 255; id.data[p * 4 + 2] = 81 * v / 255 + 20; id.data[p * 4 + 3] = 255; }
    ctx.putImageData(id, 0, 0);
    const xr = (st.r - 2.5) / 1.5 * (W - 1);
    ctx.strokeStyle = C.teal; ctx.beginPath(); ctx.moveTo(xr, 0); ctx.lineTo(xr, H); ctx.stroke();
    ctx.fillStyle = "rgba(255,255,255,.6)"; ctx.font = "10px IBM Plex Mono, monospace"; ctx.fillText("r = 2.5", 4, H - 4); ctx.fillText("4.0", W - 22, H - 4);
    // cobweb
    const c2 = AtomKit.canvas(cw, 220), g = c2.ctx, S = Math.min(c2.w, c2.h) - 30, o = 18;
    g.clearRect(0, 0, c2.w, c2.h);
    const X = x => o + x * S, Y = y => c2.h - 12 - y * S;
    g.strokeStyle = "rgba(255,255,255,.25)"; g.beginPath(); g.moveTo(X(0), Y(0)); g.lineTo(X(1), Y(1)); g.stroke();
    g.strokeStyle = "#fff"; g.beginPath(); for (let i = 0; i <= 100; i++) { const x = i / 100; i ? g.lineTo(X(x), Y(st.r * x * (1 - x))) : g.moveTo(X(x), Y(0)); } g.stroke();
    let x = .2; g.strokeStyle = C.gold; g.beginPath(); g.moveTo(X(x), Y(0));
    for (let k = 0; k < 120; k++) { const y = st.r * x * (1 - x); g.lineTo(X(x), Y(y)); g.lineTo(X(y), Y(y)); x = y; }
    g.stroke();
    // period and Lyapunov exponent
    let z = .5; for (let k = 0; k < 2000; k++) z = st.r * z * (1 - z);
    const orbit = []; let lam = 0;
    for (let k = 0; k < 4000; k++) { z = st.r * z * (1 - z); lam += Math.log(Math.abs(st.r * (1 - 2 * z)) + 1e-12); if (k < 64) orbit.push(z); }
    lam /= 4000;
    let period = 0; for (let p = 1; p <= 32; p++) if (orbit.slice(0, 16).every((v, i) => Math.abs(v - orbit[i + p]) < 1e-6)) { period = p; break; }
    $$(pane, ".lg-out").innerHTML = `r = <span class="g">${st.r.toFixed(4)}</span>   ${period ? `settles into a cycle of period <span class="t">${period}</span>` : `<span class="r">no period found — chaos</span>`}\nLyapunov exponent λ ≈ <span class="${lam > 0 ? "r" : "t"}">${lam.toFixed(3)}</span> ${lam > 0 ? "(> 0: nearby starts separate exponentially)" : "(< 0: nearby starts converge)"}`;
  }
  registerAtom({
    id: "logistic", name: "Logistic map", domain: "analysis", fields: ["dynamical-systems"],
    html: `<h3>The logistic map — order, period-doubling and chaos from xₙ₊₁ = r·xₙ(1 − xₙ)</h3>
      <p class="ahint">One line of algebra, iterated. As r grows the long-run behaviour settles to a point, then splits into 2, 4, 8 … values, and beyond r ≈ 3.5699 becomes chaotic — with windows of order inside (look for period 3 near r = 3.83). The ratios between doublings tend to Feigenbaum's constant 4.669…, the same for every such map.</p>
      <div class="arow2"><canvas class="acv lg-bif"></canvas><canvas class="acv lg-cob"></canvas></div>
      <div class="abar"><label class="achk">r <input type="range" data-i="r" min="2.5" max="4" step="0.0005" value="3.2" style="width:260px"></label>
        <button class="abtn" data-r="3.2">period 2</button><button class="abtn" data-r="3.5">period 4</button><button class="abtn" data-r="3.8284">period 3</button><button class="abtn" data-r="3.9">chaos</button></div>
      <div class="aout lg-out"></div>
      <p class="awhy">Li and Yorke's 1975 paper 'Period three implies chaos' gave the subject its name — and Sharkovskii had already proved (1964) that period 3 forces every other period to exist.</p>`,
    build(pane) {
      cv = $$(pane, ".lg-bif"); cw = $$(pane, ".lg-cob");
      const r = $$(pane, "[data-i=r]");
      r.addEventListener("input", () => { st.r = +r.value; draw(pane); });
      pane.querySelectorAll("[data-r]").forEach(b => b.addEventListener("click", () => { st.r = +b.dataset.r; r.value = st.r; draw(pane); }));
      cv.addEventListener("click", e => { const b = cv.getBoundingClientRect(); st.r = 2.5 + 1.5 * (e.clientX - b.left) / b.width; r.value = st.r; draw(pane); });
    },
    start(pane) { draw(pane); }
  });
})();

/* ============================================================
   8) MANDELBROT & JULIA
   ============================================================ */
(function () {
  let st = { cx: -.6, cy: 0, span: 3.2, iters: 180, c: [-.8, .156], busy: 0 }, cm, cj;
  // deep space → violet → gold → cream, cycling with log(escape time) so deep zooms keep their contrast
  const STOPS = [[0, [16, 9, 36]], [.3, [96, 52, 170]], [.62, [240, 170, 90]], [1, [255, 240, 205]]];
  function palette(n, it, zz) {
    if (n >= it) return [6, 3, 14];
    const s = Math.max(0, n + 1 - Math.log(Math.log(Math.sqrt(zz))) / Math.LN2);
    const u = Math.log2(s + 1) / 2.4, f = u - Math.floor(u), t = f < .5 ? 2 * f : 2 - 2 * f;
    let k = 1; while (k < STOPS.length - 1 && STOPS[k][0] < t) k++;
    const [t0, c0] = STOPS[k - 1], [t1, c1] = STOPS[k], w = (t - t0) / (t1 - t0), fade = Math.min(1, .25 + s / 4);
    return c0.map((v, i) => (v + (c1[i] - v) * w) * fade);
  }
  function render(canvasEl, W, H, fn) {
    canvasEl.width = W; canvasEl.height = H; canvasEl.style.height = H + "px";
    const ctx = canvasEl.getContext("2d"), img = ctx.createImageData(W, H), d = img.data;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) { const [r, g, b] = fn(i, j); const o = (j * W + i) * 4; d[o] = r; d[o + 1] = g; d[o + 2] = b; d[o + 3] = 255; }
    ctx.putImageData(img, 0, 0); return ctx;
  }
  function drawM(pane) {
    const W = Math.max(260, Math.min(560, (cm.parentElement.clientWidth || 900) - 300)), H = Math.round(W * .72), it = st.iters;
    const sc = st.span / W;
    const ctx = render(cm, W, H, (i, j) => {
      const x0 = st.cx + (i - W / 2) * sc, y0 = st.cy + (H / 2 - j) * sc;
      // quick cardioid / bulb check
      const q = (x0 - .25) ** 2 + y0 * y0;
      if (q * (q + (x0 - .25)) < .25 * y0 * y0 || (x0 + 1) ** 2 + y0 * y0 < 1 / 16) return [10, 6, 22];
      let x = 0, y = 0, n = 0;
      while (n < it && x * x + y * y < 64) { const t = x * x - y * y + x0; y = 2 * x * y + y0; x = t; n++; }
      return palette(n, it, x * x + y * y);
    });
    // mark c
    const px = W / 2 + (st.c[0] - st.cx) / sc, py = H / 2 - (st.c[1] - st.cy) / sc;
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, py, 5, 0, 7); ctx.stroke();
    $$(pane, ".mj-out").innerHTML = `centre ${st.cx.toFixed(6)} ${st.cy < 0 ? "−" : "+"} ${Math.abs(st.cy).toFixed(6)}i · width ${st.span.toExponential(2)} · ${it} iterations`;
  }
  function drawJ(pane) {
    const W = 280, H = 280, it = 200, sc = 3.2 / W, [cr, ci] = st.c;
    render(cj, W, H, (i, j) => {
      let x = (i - W / 2) * sc, y = (H / 2 - j) * sc, n = 0;
      while (n < it && x * x + y * y < 64) { const t = x * x - y * y + cr; y = 2 * x * y + ci; x = t; n++; }
      return palette(n, it, x * x + y * y);
    });
    // is c in the Mandelbrot set?
    let x = 0, y = 0, n = 0; while (n < 400 && x * x + y * y < 4) { const t = x * x - y * y + cr; y = 2 * x * y + ci; x = t; n++; }
    $$(pane, ".mj-c").innerHTML = `c = ${cr.toFixed(3)} ${ci < 0 ? "−" : "+"} ${Math.abs(ci).toFixed(3)}i · ${n >= 400 ? `<span class="t">in M</span>: its Julia set is connected` : `<span class="r">outside M</span>: its Julia set is dust (a Cantor set)`}`;
  }
  registerAtom({
    id: "mandelbrot", name: "Mandelbrot & Julia", domain: "analysis", fields: ["dynamical-systems", "complex-analysis"], wide: true,
    html: `<h3>Mandelbrot & Julia — iterate z ↦ z² + c</h3>
      <p class="ahint">For each complex c, start at 0 and square-and-add forever. The <b>Mandelbrot set</b> (left) is the set of c for which the orbit stays bounded. Each c also has a <b>Julia set</b> (right): the boundary between starting points that escape and those that don't. Click the Mandelbrot set to choose c; drag across it to zoom; double-click to zoom out.</p>
      <div style="display:flex;gap:.8rem;flex-wrap:wrap;align-items:flex-start"><canvas class="acv mj-m" style="flex:0 0 auto;width:auto;cursor:crosshair"></canvas>
        <div style="width:280px;flex:0 0 280px"><canvas class="acv mj-j" style="width:280px"></canvas><p class="astatus mono mj-c"></p></div></div>
      <div class="abar"><label class="achk">iterations <input type="range" data-i="it" min="60" max="1200" step="20" value="180"></label>
        <button class="abtn" data-b="home">reset view</button><button class="abtn" data-z="-0.7453,0.1127,0.006">seahorse valley</button><button class="abtn" data-z="-1.7687,0.0017,0.035">mini-brot</button><button class="abtn" data-z="0.2825,0.0102,0.02">elephants</button></div>
      <div class="aout mj-out"></div>
      <p class="awhy">Julia sets were studied by Gaston Julia and Pierre Fatou around 1918 — with no way to see them. Mandelbrot's computer plots (1980) revealed the set that bears his name; Douady and Hubbard proved it is connected (1982). Whether it is locally connected (the MLC conjecture) is still open.</p>`,
    build(pane) {
      cm = $$(pane, ".mj-m"); cj = $$(pane, ".mj-j");
      const it = $$(pane, "[data-i=it]"); it.addEventListener("change", () => { st.iters = +it.value; drawM(pane); });
      $$(pane, "[data-b=home]").addEventListener("click", () => { Object.assign(st, { cx: -.6, cy: 0, span: 3.2 }); drawM(pane); });
      pane.querySelectorAll("[data-z]").forEach(b => b.addEventListener("click", () => { const [x, y, s] = b.dataset.z.split(",").map(Number); Object.assign(st, { cx: x, cy: y, span: s, iters: Math.max(st.iters, 400) }); it.value = st.iters; drawM(pane); }));
      let start = null;
      const toC = e => { const b = cm.getBoundingClientRect(), W = cm.width, H = cm.height, sc = st.span / W; return [st.cx + ((e.clientX - b.left) * W / b.width - W / 2) * sc, st.cy + (H / 2 - (e.clientY - b.top) * H / b.height) * sc]; };
      cm.addEventListener("pointerdown", e => { start = { e, c: toC(e) }; });
      cm.addEventListener("pointerup", e => {
        if (!start) return; const c = toC(e), dx = Math.abs(e.clientX - start.e.clientX);
        if (dx > 8) { st.cx = (c[0] + start.c[0]) / 2; st.cy = (c[1] + start.c[1]) / 2; st.span = Math.abs(c[0] - start.c[0]) || st.span; drawM(pane); }
        else { st.c = c; drawM(pane); drawJ(pane); }
        start = null;
      });
      cm.addEventListener("dblclick", () => { st.span = Math.min(4, st.span * 3); drawM(pane); });
    },
    start(pane) { drawM(pane); drawJ(pane); }
  });
})();
})();
