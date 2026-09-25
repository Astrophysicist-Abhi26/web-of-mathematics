/* ============================================================
   THE WEB OF MATHEMATICS — atoms-probability.js
   Playable atoms for Probability:
     · Galton board · dice sums · law of large numbers · Monty Hall
                                        (Limit Theorems, Probability Spaces)
     · Random walks & Brownian motion  (Stochastic Processes)
     · Buffon's needle                 (Probability Spaces, Classical Geometry)
   ============================================================ */
(function () {
"use strict";
if (!window.registerAtom) return;
const { canvas, C, rng } = AtomKit;
const $$ = (root, s) => root.querySelector(s);
const R = rng(20260925);
const gaussPdf = (x, m, s) => Math.exp(-((x - m) ** 2) / (2 * s * s)) / (s * Math.sqrt(2 * Math.PI));
function choose(n, k) { let c = 1; for (let i = 1; i <= k; i++) c = c * (n - k + i) / i; return c; }

/* ============================================================
   1) CHANCE LAB: Galton board · dice · LLN · Monty Hall
   ============================================================ */
(function () {
  let st = { tab: "galton", rows: 12, p: .5, bins: [], balls: [], raf: 0, total: 0, dice: 2, lln: [], monty: { stay: [0, 0], sw: [0, 0], pick: null, open: null, prize: null, phase: 0 } }, cv;
  function resetGalton() { st.bins = new Array(st.rows + 1).fill(0); st.balls = []; st.total = 0; }
  function galton(pane, dt) {
    const { ctx, w: W, h: H } = canvas(cv, 340);
    ctx.clearRect(0, 0, W, H);
    const n = st.rows, top = 18, pegH = 190, dx = Math.min(22, (W - 40) / (n + 2)), cx = W / 2;
    const pegY = r => top + r * pegH / n, pegX = (r, k) => cx + (k - r / 2) * dx;
    ctx.fillStyle = "rgba(255,255,255,.45)";
    for (let r = 0; r < n; r++) for (let k = 0; k <= r; k++) { ctx.beginPath(); ctx.arc(pegX(r, k), pegY(r), 2, 0, 7); ctx.fill(); }
    // bins
    const binTop = top + pegH + 10, binH = H - binTop - 6, maxB = Math.max(1, ...st.bins);
    const expect = k => choose(n, k) * st.p ** k * (1 - st.p) ** (n - k);
    const maxE = Math.max(...Array.from({ length: n + 1 }, (_, k) => expect(k)));
    const scale = Math.max(maxB / Math.max(1, st.total), maxE) * 1.08;
    for (let k = 0; k <= n; k++) {
      const x = pegX(n, k) - dx / 2 + 1, h = st.total ? st.bins[k] / st.total / scale * binH : 0;
      ctx.fillStyle = "rgba(245,196,81,.55)"; ctx.fillRect(x, binTop + binH - h, dx - 2, h);
    }
    // normal curve with the same mean and variance
    const m = n * st.p, s = Math.sqrt(n * st.p * (1 - st.p));
    ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const k = -1 + (n + 2) * i / 200, y = gaussPdf(k, m, s) / scale * binH; const x = pegX(n, k); i ? ctx.lineTo(x, binTop + binH - y) : ctx.moveTo(x, binTop + binH - y); }
    ctx.stroke(); ctx.lineWidth = 1;
    // falling balls: each has a random path of left/right bounces
    for (const b of st.balls) {
      b.t += dt * 7; const r = Math.min(n, Math.floor(b.t)), f = b.t - Math.floor(b.t);
      const k0 = b.path.slice(0, r).reduce((a, v) => a + v, 0);
      let x, y;
      if (r >= n) { x = pegX(n, k0); y = binTop + 4; b.done = true; }
      else { const k1 = k0 + b.path[r]; x = pegX(r, k0) + (pegX(r + 1, k1) - pegX(r, k0)) * f; y = pegY(r) - 6 + (pegY(r + 1) - pegY(r)) * f - Math.sin(f * Math.PI) * 6; }
      ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(x, y, 3.2, 0, 7); ctx.fill();
      if (b.done) { st.bins[k0]++; st.total++; }
    }
    st.balls = st.balls.filter(b => !b.done);
    const mean = st.total ? st.bins.reduce((a, c, k) => a + c * k, 0) / st.total : 0;
    $$(pane, ".ch-out").innerHTML = `${st.total} balls · ${n} rows · each bounce goes right with probability ${st.p.toFixed(2)}\nsample mean ${mean.toFixed(2)} (theory np = ${m.toFixed(2)}) · the teal curve is the normal law N(np, np(1−p)) — de Moivre 1733, Laplace 1810`;
  }
  function dropBalls(k) { for (let i = 0; i < k; i++) st.balls.push({ t: -i * .35, path: Array.from({ length: st.rows }, () => (R() < st.p ? 1 : 0)) }); }
  function instant(k) { for (let i = 0; i < k; i++) { let s = 0; for (let r = 0; r < st.rows; r++) s += R() < st.p ? 1 : 0; st.bins[s]++; st.total++; } }
  function dice(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 300);
    ctx.clearRect(0, 0, W, H);
    // exact distribution of the sum of n fair dice by convolution
    let dist = [1];
    for (let d = 0; d < st.dice; d++) { const nx = new Array(dist.length + 6).fill(0); dist.forEach((p, i) => { for (let f = 1; f <= 6; f++) nx[i + f] += p / 6; }); dist = nx; }
    const lo = st.dice, hi = 6 * st.dice, maxP = Math.max(...dist);
    const bw = (W - 40) / (hi - lo + 1);
    for (let s = lo; s <= hi; s++) { const h = dist[s] / maxP * (H - 50); ctx.fillStyle = "rgba(245,196,81,.6)"; ctx.fillRect(20 + (s - lo) * bw + 1, H - 24 - h, bw - 2, h); }
    const m = 3.5 * st.dice, sd = Math.sqrt(st.dice * 35 / 12);
    ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const s = lo - .5 + (hi - lo + 1) * i / 200, y = gaussPdf(s, m, sd) / maxP * (H - 50); const x = 20 + (s - lo + .5) * bw; i ? ctx.lineTo(x, H - 24 - y) : ctx.moveTo(x, H - 24 - y); }
    ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText(lo, 20, H - 8); ctx.fillText(hi, W - 34, H - 8);
    $$(pane, ".ch-out").innerHTML = `The exact distribution of the sum of ${st.dice} fair dice (bars) against the normal curve with the same mean ${m} and spread ${sd.toFixed(2)} (teal).\nOne die is flat; two make a triangle; by six or so the bell has arrived. That is the central limit theorem: sums of many independent pieces look normal, whatever the pieces.`;
  }
  function lln(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 300);
    ctx.clearRect(0, 0, W, H);
    const N = 2000, X = n => 30 + Math.log10(n) / Math.log10(N) * (W - 40), Y = v => H / 2 - (v - .5) * (H - 40) * 1.6;
    ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.beginPath(); ctx.moveTo(30, Y(.5)); ctx.lineTo(W - 10, Y(.5)); ctx.stroke();
    // ±1/(2√n) envelope: one standard deviation of the running mean
    ctx.strokeStyle = "rgba(63,208,201,.5)"; ctx.setLineDash([4, 4]);
    for (const sg of [1, -1]) { ctx.beginPath(); for (let n = 1; n <= N; n++) { const v = .5 + sg * .5 / Math.sqrt(n); n > 1 ? ctx.lineTo(X(n), Y(v)) : ctx.moveTo(X(n), Y(v)); } ctx.stroke(); }
    ctx.setLineDash([]);
    st.lln.forEach((run, i) => {
      ctx.strokeStyle = [C.gold, C.pink, C.violet, C.green, C.blue][i % 5]; ctx.beginPath();
      let s = 0; run.forEach((v, n) => { s += v; const y = Y(s / (n + 1)); n ? ctx.lineTo(X(n + 1), y) : ctx.moveTo(X(1), y); }); ctx.stroke();
    });
    ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("1", 26, H - 6); ctx.fillText("10", X(10) - 4, H - 6); ctx.fillText("100", X(100) - 8, H - 6); ctx.fillText("2000 flips", W - 70, H - 6);
    $$(pane, ".ch-out").innerHTML = `Running fraction of heads in ${st.lln.length} sequences of fair-coin flips (log scale).\nEvery run is drawn to ½ — Jacob Bernoulli's law of large numbers (1713) — and the teal band shows the typical error shrinking like 1/(2√n).`;
  }
  function monty(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 230);
    ctx.clearRect(0, 0, W, H);
    const M = st.monty, dw = Math.min(110, (W - 80) / 3), gap = (W - 3 * dw) / 4;
    for (let i = 0; i < 3; i++) {
      const x = gap + i * (dw + gap), y = 30, open = M.open === i || M.phase === 2;
      ctx.fillStyle = open ? "rgba(255,255,255,.06)" : "rgba(245,196,81,.18)";
      ctx.strokeStyle = M.pick === i ? C.gold : "rgba(255,255,255,.3)"; ctx.lineWidth = M.pick === i ? 3 : 1.5;
      ctx.fillRect(x, y, dw, dw * 1.4); ctx.strokeRect(x, y, dw, dw * 1.4); ctx.lineWidth = 1;
      ctx.font = `${dw * .42}px serif`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
      if (open) ctx.fillText(i === M.prize ? "🚗" : "🐐", x + dw / 2, y + dw * .7);
      else { ctx.fillStyle = "#fff"; ctx.font = "bold 16px IBM Plex Mono"; ctx.fillText(i + 1, x + dw / 2, y + dw * .7); }
    }
    ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
    const rate = a => a[1] ? `${(100 * a[0] / a[1]).toFixed(1)}% of ${a[1]}` : "—";
    const msg = ["Pick a door. One hides a car; two hide goats.", `You picked door ${M.pick + 1}. The host, who knows where the car is, opens door ${M.open + 1}: a goat. Stay or switch?`, M.won ? `<span class="g">You win the car!</span> Pick a door to play again.` : `<span class="r">A goat.</span> Pick a door to play again.`][M.phase];
    $$(pane, ".ch-out").innerHTML = `${msg}\nwins when staying: <span class="t">${rate(M.stay)}</span>   wins when switching: <span class="g">${rate(M.sw)}</span>   (theory: 1/3 vs 2/3)`;
    $$(pane, ".mh-btns").hidden = M.phase !== 1;
  }
  function draw(pane, dt = 0) {
    pane.querySelectorAll(".achip[data-t]").forEach(b => b.classList.toggle("on", b.dataset.t === st.tab));
    pane.querySelectorAll(".ch-ctl").forEach(el => el.hidden = el.dataset.for !== st.tab);
    if (st.tab === "galton") galton(pane, dt); else if (st.tab === "dice") dice(pane); else if (st.tab === "lln") lln(pane); else monty(pane);
  }
  function loop(pane) {
    cancelAnimationFrame(st.raf); let last = performance.now();
    const step = now => { const dt = Math.min(.05, (now - last) / 1000); last = now; if (st.tab === "galton") draw(pane, dt); st.raf = requestAnimationFrame(step); };
    st.raf = requestAnimationFrame(step);
  }
  function playMonty(pane, doorOrSwitch) {
    const M = st.monty;
    if (M.phase !== 1) { // pick
      if (typeof doorOrSwitch !== "number") return;
      M.prize = Math.floor(R() * 3); M.pick = doorOrSwitch; M.won = null;
      const goats = [0, 1, 2].filter(i => i !== M.pick && i !== M.prize); M.open = goats[Math.floor(R() * goats.length)]; M.phase = 1;
    } else {
      const sw = doorOrSwitch === "switch"; if (sw) M.pick = [0, 1, 2].find(i => i !== M.pick && i !== M.open);
      M.won = M.pick === M.prize; const t = sw ? M.sw : M.stay; t[1]++; if (M.won) t[0]++; M.phase = 2;
    }
    draw(pane);
  }
  registerAtom({
    id: "chance", name: "Chance lab: CLT · LLN · Monty Hall", domain: "probability", fields: ["limit-theorems", "prob-spaces"],
    html: `<h3>The chance lab — why randomness becomes predictable</h3>
      <p class="ahint">One ball, one coin, one die: unpredictable. Thousands: a law. The <b>law of large numbers</b> says averages settle down; the <b>central limit theorem</b> says the fluctuations around them follow the bell curve. And the Monty Hall game shows how badly intuition handles conditional probability.</p>
      <div class="achips"><button class="achip" data-t="galton">Galton board</button><button class="achip" data-t="dice">sum of dice</button><button class="achip" data-t="lln">law of large numbers</button><button class="achip" data-t="monty">Monty Hall</button></div>
      <canvas class="acv"></canvas>
      <div class="abar ch-ctl" data-for="galton"><button class="abtn" data-b="d1">drop 1</button><button class="abtn" data-b="d20">drop 20</button><button class="abtn" data-b="d1000">+1000 instantly</button><button class="abtn" data-b="clr">clear</button>
        <label class="achk">rows <input type="range" data-i="rows" min="4" max="16" value="12"></label><label class="achk">p <input type="range" data-i="p" min="0.1" max="0.9" step="0.05" value="0.5"></label></div>
      <div class="abar ch-ctl" data-for="dice" hidden><label class="achk">number of dice <input type="range" data-i="dice" min="1" max="20" value="2"> <span class="mono" data-o="dice"></span></label></div>
      <div class="abar ch-ctl" data-for="lln" hidden><button class="abtn" data-b="run">flip another 2000</button><button class="abtn" data-b="lclr">clear</button></div>
      <div class="abar ch-ctl" data-for="monty" hidden><span class="mh-btns" hidden><button class="abtn" data-b="stay">stay</button><button class="abtn" data-b="switch">switch</button></span><button class="abtn" data-b="sim">simulate 1000 of each</button></div>
      <div class="aout ch-out"></div>`,
    build(pane) {
      cv = $$(pane, "canvas"); resetGalton();
      pane.querySelectorAll(".achip[data-t]").forEach(b => b.addEventListener("click", () => { st.tab = b.dataset.t; if (st.tab === "lln" && !st.lln.length) runLLN(); draw(pane); }));
      $$(pane, "[data-b=d1]").addEventListener("click", () => dropBalls(1));
      $$(pane, "[data-b=d20]").addEventListener("click", () => dropBalls(20));
      $$(pane, "[data-b=d1000]").addEventListener("click", () => instant(1000));
      $$(pane, "[data-b=clr]").addEventListener("click", resetGalton);
      $$(pane, "[data-i=rows]").addEventListener("input", e => { st.rows = +e.target.value; resetGalton(); });
      $$(pane, "[data-i=p]").addEventListener("input", e => { st.p = +e.target.value; resetGalton(); });
      $$(pane, "[data-i=dice]").addEventListener("input", e => { st.dice = +e.target.value; $$(pane, "[data-o=dice]").textContent = st.dice; draw(pane); });
      const runLLN = () => { st.lln.push(Array.from({ length: 2000 }, () => (R() < .5 ? 1 : 0))); if (st.lln.length > 5) st.lln.shift(); };
      $$(pane, "[data-b=run]").addEventListener("click", () => { runLLN(); draw(pane); });
      $$(pane, "[data-b=lclr]").addEventListener("click", () => { st.lln = []; draw(pane); });
      $$(pane, "[data-b=stay]").addEventListener("click", () => playMonty(pane, "stay"));
      $$(pane, "[data-b=switch]").addEventListener("click", () => playMonty(pane, "switch"));
      $$(pane, "[data-b=sim]").addEventListener("click", () => {
        const M = st.monty;
        for (let i = 0; i < 1000; i++) { const prize = Math.floor(R() * 3), pick = Math.floor(R() * 3); M.stay[1]++; if (pick === prize) M.stay[0]++; M.sw[1]++; if (pick !== prize) M.sw[0]++; }
        draw(pane);
      });
      cv.addEventListener("click", e => {
        if (st.tab !== "monty") return;
        const r = cv.getBoundingClientRect(), W = r.width, dw = Math.min(110, (W - 80) / 3), gap = (W - 3 * dw) / 4, x = e.clientX - r.left;
        const i = [0, 1, 2].find(i => x > gap + i * (dw + gap) && x < gap + i * (dw + gap) + dw);
        if (i !== undefined && st.monty.phase !== 1) playMonty(pane, i);
      });
      $$(pane, "[data-o=dice]").textContent = st.dice;
    },
    start(pane) { draw(pane); loop(pane); },
    stop() { cancelAnimationFrame(st.raf); }
  });
})();

/* ============================================================
   2) RANDOM WALKS & BROWNIAN MOTION
   ============================================================ */
(function () {
  let st = { mode: "1d", walkers: 60, t: 0, pos: [], trails: [], raf: 0 }, cv;
  function reset() {
    st.t = 0;
    st.pos = Array.from({ length: st.walkers }, () => st.mode === "1d" ? [0] : [0, 0]);
    st.trails = st.pos.map(p => [p.slice()]);
  }
  function frame(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 320);
    ctx.clearRect(0, 0, W, H);
    const steps = 4;
    for (let k = 0; k < steps; k++) {
      st.t++;
      st.pos.forEach((p, i) => {
        if (st.mode === "1d") p[0] += R() < .5 ? 1 : -1;
        else { const a = R() * 2 * Math.PI; p[0] += Math.cos(a); p[1] += Math.sin(a); }
        st.trails[i].push(p.slice()); if (st.trails[i].length > 1200) st.trails[i].shift();
      });
    }
    if (st.mode === "1d") {
      const T = 1200, X = t => 20 + t / T * (W - 30), Y = v => H / 2 - v * (H / 2 - 12) / (2.6 * Math.sqrt(T));
      ctx.strokeStyle = "rgba(63,208,201,.55)"; ctx.setLineDash([4, 4]);
      for (const sg of [1, -1, 2, -2]) { ctx.beginPath(); for (let t = 0; t <= T; t += 10) { const y = Y(sg * Math.sqrt(t)); t ? ctx.lineTo(X(t), y) : ctx.moveTo(X(t), y); } ctx.stroke(); }
      ctx.setLineDash([]);
      const t0 = Math.max(0, st.t - 1200);
      st.trails.forEach((tr, i) => { ctx.strokeStyle = `hsla(${(i * 37) % 360},70%,65%,.45)`; ctx.beginPath(); tr.forEach((p, j) => { const t = t0 + j + (st.t > 1200 ? 0 : 0); j ? ctx.lineTo(X(j), Y(p[0])) : ctx.moveTo(X(j), Y(p[0])); }); ctx.stroke(); });
      const rms = Math.sqrt(st.pos.reduce((s, p) => s + p[0] * p[0], 0) / st.pos.length);
      $$(pane, ".rw-out").innerHTML = `${st.walkers} walkers, ${st.t} steps of ±1\nroot-mean-square distance ${rms.toFixed(1)} vs √t = ${Math.sqrt(st.t).toFixed(1)}: the spread grows like √t, not t (dashed: ±√t and ±2√t).`;
      if (st.t >= 1200) { cancelAnimationFrame(st.raf); return false; }
    } else {
      const S = Math.min(W, H) / (5 * Math.sqrt(Math.max(200, st.t)));
      ctx.strokeStyle = "rgba(63,208,201,.35)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.arc(W / 2, H / 2, Math.sqrt(st.t) * S, 0, 7); ctx.stroke(); ctx.setLineDash([]);
      st.trails.forEach((tr, i) => { ctx.strokeStyle = `hsla(${(i * 37) % 360},70%,65%,.5)`; ctx.beginPath(); tr.forEach((p, j) => { const x = W / 2 + p[0] * S, y = H / 2 + p[1] * S; j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); });
      st.pos.forEach(p => { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(W / 2 + p[0] * S, H / 2 + p[1] * S, 2, 0, 7); ctx.fill(); });
      $$(pane, ".rw-out").innerHTML = `${st.walkers} walkers in the plane, ${st.t} unit steps in random directions. The dashed circle has radius √t.\nPólya (1921): a random walk on the line or the plane returns home with probability 1 — in 3D only about 34% of the time. "A drunk man will find his way home, but a drunk bird may get lost forever" (Kakutani).`;
    }
    return true;
  }
  function loop(pane) { cancelAnimationFrame(st.raf); const go = () => { if (frame(pane) !== false) st.raf = requestAnimationFrame(go); }; st.raf = requestAnimationFrame(go); }
  registerAtom({
    id: "randomwalk", name: "Random walks", domain: "probability", fields: ["stochastic-processes", "limit-theorems"],
    html: `<h3>Random walks — and, in the limit, Brownian motion</h3>
      <p class="ahint">Flip a coin, step left or right; repeat. Each walker is unpredictable, but the crowd spreads like √t — the same law Einstein used in 1905 to prove atoms exist. Shrink the steps and speed up time, and the walk becomes Brownian motion (Wiener, 1923): continuous everywhere, differentiable nowhere.</p>
      <div class="achips"><button class="achip on" data-m="1d">on a line</button><button class="achip" data-m="2d">in the plane</button></div>
      <canvas class="acv"></canvas>
      <div class="abar"><button class="abtn" data-b="go">▶ restart</button><label class="achk">walkers <input type="range" data-i="w" min="1" max="200" value="60"></label></div>
      <div class="aout rw-out"></div>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-m]").forEach(b => b.addEventListener("click", () => { st.mode = b.dataset.m; pane.querySelectorAll(".achip[data-m]").forEach(x => x.classList.toggle("on", x === b)); reset(); loop(pane); }));
      $$(pane, "[data-b=go]").addEventListener("click", () => { reset(); loop(pane); });
      $$(pane, "[data-i=w]").addEventListener("change", e => { st.walkers = +e.target.value; reset(); loop(pane); });
    },
    start(pane) { reset(); loop(pane); },
    stop() { cancelAnimationFrame(st.raf); }
  });
})();

/* ============================================================
   3) BUFFON'S NEEDLE
   ============================================================ */
(function () {
  let st = { L: .8, needles: [], hits: 0, est: [], raf: 0, queue: 0 }, cv, cg;
  const D = 1; // line spacing
  function drop(n) { st.queue += n; }
  function step() {
    const k = Math.min(st.queue, st.queue > 200 ? 60 : 3);
    for (let i = 0; i < k; i++) {
      const y = R() * 6, th = R() * Math.PI, x = R() * 9;
      const y1 = y - st.L / 2 * Math.sin(th), y2 = y + st.L / 2 * Math.sin(th);
      const hit = Math.floor(y1 / D) !== Math.floor(y2 / D);
      st.needles.push([x, y, th, hit]); if (st.needles.length > 1500) st.needles.shift();
      if (hit) st.hits++;
      const N = st.est.length + 1; st.est.push(st.hits ? 2 * st.L * N / (D * st.hits) : null);
    }
    st.queue -= k;
  }
  function draw(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 260);
    ctx.clearRect(0, 0, W, H);
    const S = Math.min(W / 9, H / 6);
    ctx.strokeStyle = "rgba(255,255,255,.35)";
    for (let k = 0; k <= 6; k++) { ctx.beginPath(); ctx.moveTo(0, k * D * S); ctx.lineTo(W, k * D * S); ctx.stroke(); }
    for (const [x, y, th, hit] of st.needles) {
      const dx = st.L / 2 * Math.cos(th) * S, dy = st.L / 2 * Math.sin(th) * S;
      ctx.strokeStyle = hit ? "rgba(245,196,81,.85)" : "rgba(127,227,214,.45)";
      ctx.beginPath(); ctx.moveTo(x * S - dx, y * S - dy); ctx.lineTo(x * S + dx, y * S + dy); ctx.stroke();
    }
    // convergence plot
    const g = AtomKit.canvas(cg, 110), c = g.ctx, N = st.est.length;
    c.clearRect(0, 0, g.w, g.h);
    const Y = v => g.h / 2 - (v - Math.PI) * g.h / 2.4, X = n => 10 + Math.log10(n) / Math.log10(Math.max(10, N)) * (g.w - 20);
    c.strokeStyle = C.teal; c.setLineDash([4, 4]); c.beginPath(); c.moveTo(0, Y(Math.PI)); c.lineTo(g.w, Y(Math.PI)); c.stroke(); c.setLineDash([]);
    c.strokeStyle = C.gold; c.beginPath(); let started = false;
    for (let n = 1; n <= N; n += Math.max(1, Math.floor(N / 600))) { const v = st.est[n - 1]; if (v == null) continue; const y = Math.max(0, Math.min(g.h, Y(v))); started ? c.lineTo(X(n), y) : (c.moveTo(X(n), y), started = true); }
    c.stroke();
    c.fillStyle = "#9a93b8"; c.font = "10px IBM Plex Mono"; c.fillText("π", 2, Y(Math.PI) - 3);
    const est = st.hits ? 2 * st.L * N / (D * st.hits) : NaN;
    $$(pane, ".bf-out").innerHTML = `${N.toLocaleString()} needles · ${st.hits.toLocaleString()} cross a line\nP(cross) = 2ℓ/(πd)  ⇒  π ≈ 2ℓN/(d·hits) = <span class="g">${isFinite(est) ? est.toFixed(5) : "—"}</span>   (π = 3.14159…, error ${isFinite(est) ? Math.abs(est - Math.PI).toFixed(4) : "—"})`;
  }
  function loop(pane) { cancelAnimationFrame(st.raf); const go = () => { if (st.queue > 0) { step(); draw(pane); } st.raf = requestAnimationFrame(go); }; st.raf = requestAnimationFrame(go); }
  registerAtom({
    id: "buffon", name: "Buffon's needle", domain: "probability", fields: ["prob-spaces", "classical-geometry"],
    html: `<h3>Buffon's needle — estimating π by dropping sticks (1777)</h3>
      <p class="ahint">Drop a needle of length ℓ on a floor ruled with lines d apart (ℓ ≤ d). It crosses a line with probability 2ℓ/(πd): the angle matters through sin θ, and averaging sin over half a turn brings in π. So counting crossings measures π — the first geometric probability, and an ancestor of every Monte Carlo method.</p>
      <canvas class="acv"></canvas>
      <canvas class="acv bf-g" style="margin-top:.4rem"></canvas>
      <div class="abar"><button class="abtn" data-b="1">drop 1</button><button class="abtn" data-b="100">drop 100</button><button class="abtn" data-b="5000">drop 5000</button><button class="abtn" data-b="clr">clear</button>
        <label class="achk">ℓ/d <input type="range" data-i="L" min="0.2" max="1" step="0.05" value="0.8"> <span class="mono" data-o="L"></span></label></div>
      <div class="aout bf-out"></div>
      <p class="awhy">The error shrinks only like 1/√N: to gain one more digit of π you need a hundred times more needles. In 1901 Mario Lazzarini claimed 3.1415929 from 3,408 throws — suspiciously good; his numbers were almost certainly chosen to hit 355/113.</p>`,
    build(pane) {
      cv = $$(pane, "canvas"); cg = $$(pane, ".bf-g");
      pane.querySelectorAll("[data-b]").forEach(b => b.addEventListener("click", () => {
        if (b.dataset.b === "clr") { st.needles = []; st.hits = 0; st.est = []; st.queue = 0; draw(pane); return; }
        drop(+b.dataset.b);
      }));
      $$(pane, "[data-i=L]").addEventListener("input", e => { st.L = +e.target.value; $$(pane, "[data-o=L]").textContent = st.L.toFixed(2); st.needles = []; st.hits = 0; st.est = []; draw(pane); });
      $$(pane, "[data-o=L]").textContent = st.L.toFixed(2);
    },
    start(pane) { draw(pane); loop(pane); },
    stop() { cancelAnimationFrame(st.raf); }
  });
})();
})();
