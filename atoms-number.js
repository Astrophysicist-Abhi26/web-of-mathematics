/* ============================================================
   THE WEB OF MATHEMATICS — atoms-number.js
   Playable atoms for Number Theory:
     · Primes: the sieve, the Ulam spiral, and π(x)   (Elementary & Analytic NT)
     · Euclid's algorithm as squares cut from a rectangle (Elementary NT, Rings)
     · The elliptic curve group law, over ℝ and over 𝔽ₚ (Modular Forms, Algebraic Geometry)
   ============================================================ */
(function () {
"use strict";
if (!window.registerAtom) return;
const { canvas, C } = AtomKit;
const $$ = (root, s) => root.querySelector(s);

// one sieve for everyone, up to 2·10⁶
const NMAX = 2000000;
let SIEVE = null;
function sieve() {
  if (SIEVE) return SIEVE;
  const comp = new Uint8Array(NMAX + 1); comp[0] = comp[1] = 1;
  for (let i = 2; i * i <= NMAX; i++) if (!comp[i]) for (let j = i * i; j <= NMAX; j += i) comp[j] = 1;
  const pi = new Uint32Array(NMAX + 1); let c = 0;
  for (let i = 0; i <= NMAX; i++) { if (!comp[i]) c++; pi[i] = c; }
  return (SIEVE = { comp, pi });
}
const isPrime = n => n >= 2 && n <= NMAX && !sieve().comp[n];

/* ============================================================
   1) PRIMES
   ============================================================ */
(function () {
  let st = { tab: "sieve", N: 200, p: 1, raf: 0, playing: false, ulamN: 160, xmax: 100000 }, cv;
  function drawSieve(pane) {
    const cols = 20, rows = Math.ceil(st.N / cols);
    const { ctx, w: W, h: H } = canvas(cv, Math.min(380, 26 + rows * 17));
    const cw = (W - 8) / cols, ch = (H - 8) / rows;
    ctx.clearRect(0, 0, W, H);
    // which primes have been used to sieve so far
    const used = []; for (let q = 2; q <= st.p; q++) if (isPrime(q)) used.push(q);
    const HUE = q => (q * 47) % 360;
    ctx.font = `${Math.min(11, ch * .6)}px IBM Plex Mono, monospace`; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    for (let n = 1; n <= st.N; n++) {
      const i = (n - 1) % cols, j = Math.floor((n - 1) / cols), x = 4 + i * cw, y = 4 + j * ch;
      let fill = "rgba(255,255,255,.04)", txt = "#cfc9e4";
      const q = used.find(q => n % q === 0 && n !== q);
      if (n === 1) { fill = "rgba(255,255,255,.02)"; txt = "#6e6789"; }
      else if (q) { fill = `hsla(${HUE(q)},70%,55%,.16)`; txt = "#6e6789"; }
      else if (used.includes(n) || (isPrime(n) && st.p * st.p >= n)) { fill = "rgba(245,196,81,.28)"; txt = "#fff"; }
      ctx.fillStyle = fill; ctx.fillRect(x + 1, y + 1, cw - 2, ch - 2);
      if (used.includes(n)) { ctx.strokeStyle = C.gold; ctx.strokeRect(x + 1.5, y + 1.5, cw - 3, ch - 3); }
      ctx.fillStyle = txt; ctx.fillText(n, x + cw / 2, y + ch / 2 + .5);
    }
    const done = st.p * st.p > st.N;
    const next = used.length ? used[used.length - 1] : null;
    $$(pane, ".pr-out").innerHTML = done
      ? `Sieved by every prime up to √${st.N} ≈ ${Math.sqrt(st.N).toFixed(1)} — what survives is prime. <span class="g">${sieve().pi[st.N]}</span> primes up to ${st.N}.\nWhy stop at √N? A composite n ≤ N has a factor ≤ √n.`
      : next ? `Crossed out the multiples of ${used.join(", ")}. Next uncrossed number is the next prime.` : `Press step: 2 is prime, so cross out 4, 6, 8, …`;
  }
  function ulam(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 380);
    ctx.fillStyle = "#0b0716"; ctx.fillRect(0, 0, W, H);
    const n = st.ulamN, cell = Math.max(1, Math.floor(Math.min(W, H) / n));
    const ox = Math.floor(W / 2), oy = Math.floor(H / 2);
    let x = 0, y = 0, dx = 1, dy = 0, seg = 1, segPassed = 0, turns = 0;
    for (let k = 1; k <= n * n; k++) {
      if (isPrime(k)) { ctx.fillStyle = k < 50 ? "#fff" : C.gold; ctx.fillRect(ox + x * cell, oy - y * cell, cell, cell); }
      x += dx; y += dy; segPassed++;
      if (segPassed === seg) { segPassed = 0; [dx, dy] = [-dy, dx]; turns++; if (turns % 2 === 0) seg++; }
    }
    $$(pane, ".pr-out").innerHTML = `The integers 1 … ${(n * n).toLocaleString()} wound in a square spiral, primes lit.\nThe diagonal lines are quadratic polynomials rich in primes — Euler's n² + n + 41 is prime for n = 0 … 39. Ulam doodled this during a boring talk in 1963.`;
  }
  function counting(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 300);
    ctx.clearRect(0, 0, W, H);
    const S = sieve(), X0 = 44, Y0 = H - 26, xm = st.xmax;
    const li = x => { // logarithmic integral Li(x) = ∫₂ˣ dt/ln t, by Simpson
      if (x <= 2) return 0; const n = 200, h = (x - 2) / n; let s = 1 / Math.log(2) + 1 / Math.log(x);
      for (let i = 1; i < n; i++) s += (i % 2 ? 4 : 2) / Math.log(2 + i * h); return s * h / 3; };
    const ymax = li(xm) * 1.05;
    const X = x => X0 + x / xm * (W - X0 - 10), Y = y => Y0 - y / ymax * (Y0 - 12);
    ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.beginPath(); ctx.moveTo(X0, Y0); ctx.lineTo(W - 10, Y0); ctx.moveTo(X0, Y0); ctx.lineTo(X0, 10); ctx.stroke();
    const curve = (f, col, w) => { ctx.strokeStyle = col; ctx.lineWidth = w; ctx.beginPath(); for (let i = 0; i <= 300; i++) { const x = Math.max(2, xm * i / 300); const y = f(x); i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)); } ctx.stroke(); ctx.lineWidth = 1; };
    curve(x => S.pi[Math.floor(x)], C.gold, 2.2);
    curve(x => x / Math.log(x), C.teal, 1.4);
    curve(li, C.violet, 1.4);
    ctx.font = "10px IBM Plex Mono, monospace"; ctx.fillStyle = "#9a93b8";
    ctx.fillText(xm.toLocaleString(), W - 60, Y0 + 14); ctx.fillText(Math.round(ymax).toLocaleString(), 2, 16);
    const p = S.pi[xm], a = xm / Math.log(xm), l = li(xm);
    $$(pane, ".pr-out").innerHTML = `x = ${xm.toLocaleString()}\n<span class="g">π(x) = ${p.toLocaleString()}</span>   <span class="t">x/ln x ≈ ${Math.round(a).toLocaleString()}</span> (ratio ${(p / a).toFixed(4)})   <span style="color:${C.violet}">Li(x) ≈ ${Math.round(l).toLocaleString()}</span> (error ${Math.round(l - p).toLocaleString()})\nThe prime number theorem (1896): π(x) ~ x/ln x. Li(x) is far better; the Riemann Hypothesis says its error is at most about √x·ln x.`;
  }
  function draw(pane) {
    pane.querySelectorAll(".achip[data-t]").forEach(b => b.classList.toggle("on", b.dataset.t === st.tab));
    pane.querySelectorAll(".pr-ctl").forEach(el => el.hidden = el.dataset.for !== st.tab);
    if (st.tab === "sieve") drawSieve(pane); else if (st.tab === "ulam") ulam(pane); else counting(pane);
  }
  function stepSieve(pane) {
    let q = st.p + 1; while (!isPrime(q)) q++;
    if (st.p * st.p > st.N) { stop(); return; }
    st.p = q; drawSieve(pane);
  }
  function stop() { st.playing = false; clearTimeout(st.raf); }
  registerAtom({
    id: "primes", name: "Primes: sieve · spiral · π(x)", domain: "number", fields: ["elementary-nt", "analytic-nt"],
    html: `<h3>The primes — Eratosthenes' sieve, Ulam's spiral, and how many there are</h3>
      <p class="ahint">Eratosthenes (c. 240 BCE): write the numbers down, and for each prime cross out its multiples; what is never crossed out is prime. Then zoom out: the primes look random yet line up on diagonals, and their count follows Gauss's guess x/ln x.</p>
      <div class="achips"><button class="achip" data-t="sieve">sieve</button><button class="achip" data-t="ulam">Ulam spiral</button><button class="achip" data-t="count">counting π(x)</button></div>
      <canvas class="acv"></canvas>
      <div class="abar pr-ctl" data-for="sieve"><button class="abtn" data-b="step">step: next prime</button><button class="abtn" data-b="play">▶ play</button><button class="abtn" data-b="reset">reset</button>
        <label class="achk">up to <select data-i="N"><option>100</option><option selected>200</option><option>400</option></select></label></div>
      <div class="abar pr-ctl" data-for="ulam" hidden><label class="achk">side <input type="range" data-i="u" min="20" max="400" step="2" value="160"></label></div>
      <div class="abar pr-ctl" data-for="count" hidden><label class="achk">x up to <input type="range" data-i="x" min="2" max="6.3" step="0.01" value="5"> </label></div>
      <div class="aout pr-out"></div>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-t]").forEach(b => b.addEventListener("click", () => { stop(); st.tab = b.dataset.t; draw(pane); }));
      $$(pane, "[data-b=step]").addEventListener("click", () => { stop(); stepSieve(pane); });
      $$(pane, "[data-b=reset]").addEventListener("click", () => { stop(); st.p = 1; drawSieve(pane); });
      $$(pane, "[data-b=play]").addEventListener("click", () => {
        if (st.playing) return stop(); st.playing = true;
        const go = () => { if (!st.playing) return; stepSieve(pane); if (st.p * st.p <= st.N) st.raf = setTimeout(go, 900); else stop(); };
        go();
      });
      $$(pane, "[data-i=N]").addEventListener("change", e => { st.N = +e.target.value; st.p = 1; stop(); drawSieve(pane); });
      $$(pane, "[data-i=u]").addEventListener("input", e => { st.ulamN = +e.target.value; ulam(pane); });
      $$(pane, "[data-i=x]").addEventListener("input", e => { st.xmax = Math.min(NMAX, Math.round(Math.pow(10, +e.target.value))); counting(pane); });
    },
    start(pane) { sieve(); draw(pane); },
    stop
  });
})();

/* ============================================================
   2) EUCLID'S ALGORITHM
   ============================================================ */
(function () {
  let st = { a: 89, b: 55 }, cv;
  function steps(a, b) { const out = []; while (b) { const q = Math.floor(a / b), r = a % b; out.push({ a, b, q, r }); a = b; b = r; } return { out, g: a }; }
  function bezout(a, b) { let [r0, r1, s0, s1, t0, t1] = [a, b, 1, 0, 0, 1]; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; [t0, t1] = [t1, t0 - q * t1]; } return [s0, t0]; }
  function draw(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 300);
    ctx.clearRect(0, 0, W, H);
    const A = Math.max(st.a, st.b), B = Math.min(st.a, st.b);
    const S = Math.min((W - 20) / A, (H - 20) / B), ox = 10, oy = 10;
    const { out, g } = steps(A, B);
    // cut squares: the rectangle A×B loses q squares of side B, then the leftover B×r, …
    let x = 0, y = 0, w = A, h = B, horiz = true, k = 0;
    for (const s of out) {
      const side = s.b;
      for (let i = 0; i < s.q; i++) {
        ctx.fillStyle = `hsla(${(k * 37 + 30) % 360},70%,60%,.28)`; ctx.strokeStyle = `hsla(${(k * 37 + 30) % 360},80%,70%,.9)`;
        ctx.fillRect(ox + x * S, oy + y * S, side * S, side * S); ctx.strokeRect(ox + x * S + .5, oy + y * S + .5, side * S - 1, side * S - 1);
        if (side * S > 18) { ctx.fillStyle = "#fff"; ctx.font = `${Math.min(14, side * S / 3)}px IBM Plex Mono, monospace`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(side, ox + (x + side / 2) * S, oy + (y + side / 2) * S); }
        if (horiz) x += side; else y += side;
      }
      if (horiz) w -= s.q * side; else h -= s.q * side;
      horiz = !horiz; k++;
    }
    ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.strokeRect(ox, oy, A * S, B * S); ctx.lineWidth = 1;
    const [s, t] = bezout(A, B);
    $$(pane, ".eu-out").innerHTML = out.map(s => `${s.a} = ${s.q} × ${s.b} + ${s.r}`).join("\n") +
      `\n<span class="g">gcd(${A}, ${B}) = ${g}</span> — the side of the smallest square, which tiles everything above it.\nBézout: ${g} = ${s} × ${A} ${t < 0 ? "−" : "+"} ${Math.abs(t)} × ${B}   ·   ${out.length} division${out.length === 1 ? "" : "s"}` +
      (out.length >= 8 ? `\n<span class="d">Consecutive Fibonacci numbers are the worst case: every quotient is 1 (Lamé, 1844).</span>` : "");
  }
  registerAtom({
    id: "euclid", name: "Euclid's algorithm", domain: "number", fields: ["elementary-nt", "ring-theory"],
    html: `<h3>Euclid's algorithm — the oldest algorithm still in daily use (Elements VII, c. 300 BCE)</h3>
      <p class="ahint">To find the greatest common divisor of a and b, cut the biggest possible squares from an a × b rectangle, then repeat on the leftover strip. The last square tiles every square before it — its side is gcd(a, b). Running the steps backwards writes the gcd as a combination of a and b (Bézout).</p>
      <canvas class="acv"></canvas>
      <div class="abar"><label class="achk">a <input type="range" data-i="a" min="1" max="200" value="89"> <span class="mono" data-o="a"></span></label>
        <label class="achk">b <input type="range" data-i="b" min="1" max="200" value="55"> <span class="mono" data-o="b"></span></label>
        <button class="abtn" data-p="48,18">48, 18</button><button class="abtn" data-p="89,55">Fibonacci 89, 55</button><button class="abtn" data-p="192,72">192, 72</button></div>
      <div class="aout eu-out"></div>
      <p class="awhy">Every RSA key exchange runs this algorithm (to invert numbers modulo n), and in rings where a Euclidean algorithm exists — ℤ, polynomials, the Gaussian integers — factorisation is unique. That is the Euclidean → PID → UFD ladder on the map.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      const a = $$(pane, "[data-i=a]"), b = $$(pane, "[data-i=b]");
      const upd = () => { st.a = +a.value; st.b = +b.value; $$(pane, "[data-o=a]").textContent = st.a; $$(pane, "[data-o=b]").textContent = st.b; draw(pane); };
      a.addEventListener("input", upd); b.addEventListener("input", upd);
      pane.querySelectorAll("[data-p]").forEach(x => x.addEventListener("click", () => { const [p, q] = x.dataset.p.split(","); a.value = p; b.value = q; upd(); }));
      upd();
    },
    start(pane) { draw(pane); }
  });
})();

/* ============================================================
   3) ELLIPTIC CURVE GROUP LAW
   ============================================================ */
(function () {
  let st = { a: -1, b: 1, P: null, Q: null, mode: "real", p: 61 }, cv;
  const f = x => x * x * x + st.a * x + st.b;
  function add(P, Q) {
    if (!P) return Q; if (!Q) return P;
    let m;
    if (Math.abs(P[0] - Q[0]) < 1e-9) {
      if (Math.abs(P[1] + Q[1]) < 1e-9) return null;        // P + (−P) = O
      m = (3 * P[0] * P[0] + st.a) / (2 * P[1]);             // tangent
    } else m = (Q[1] - P[1]) / (Q[0] - P[0]);
    const x3 = m * m - P[0] - Q[0];
    return [x3, m * (P[0] - x3) - P[1]];
  }
  function drawReal(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 320);
    ctx.clearRect(0, 0, W, H);
    const R = 3, sx = W / (2 * R * 1.3), sy = H / (2 * R);
    const X = x => W / 2 + x * sx, Y = y => H / 2 - y * sy;
    ctx.strokeStyle = "rgba(255,255,255,.15)"; ctx.beginPath(); ctx.moveTo(0, Y(0)); ctx.lineTo(W, Y(0)); ctx.moveTo(X(0), 0); ctx.lineTo(X(0), H); ctx.stroke();
    // the curve, both signs
    ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
    for (const sgn of [1, -1]) {
      ctx.beginPath(); let on = false;
      for (let i = 0; i <= 900; i++) { const x = -R * 1.3 + 2.6 * R * i / 900, v = f(x); if (v < 0) { on = false; continue; } const y = sgn * Math.sqrt(v); if (!on) { ctx.moveTo(X(x), Y(y)); on = true; } else ctx.lineTo(X(x), Y(y)); }
      ctx.stroke();
    }
    ctx.lineWidth = 1;
    const disc = -16 * (4 * st.a ** 3 + 27 * st.b ** 2);
    let txt = `y² = x³ ${st.a < 0 ? "−" : "+"} ${Math.abs(st.a).toFixed(2)}x ${st.b < 0 ? "−" : "+"} ${Math.abs(st.b).toFixed(2)}   discriminant ${disc.toFixed(2)}${Math.abs(disc) < 1e-6 ? ' <span class="r">(singular — not an elliptic curve)</span>' : ""}`;
    const dot = (p, col, lab) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(p[0]), Y(p[1]), 5.5, 0, 7); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "12px IBM Plex Mono, monospace"; ctx.fillText(lab, X(p[0]) + 8, Y(p[1]) - 8); };
    if (st.P) dot(st.P, C.teal, "P");
    if (st.Q) dot(st.Q, C.blue, "Q");
    if (st.P && st.Q) {
      const S = add(st.P, st.Q);
      if (!S) { txt += `\nQ = −P, so the line is vertical and meets the curve 'at infinity': <span class="g">P + Q = O</span>, the identity.`; }
      else {
        const R3 = [S[0], -S[1]];
        ctx.strokeStyle = C.gold; ctx.setLineDash([5, 4]);
        const m = (R3[1] - st.P[1]) / (R3[0] - st.P[0] || 1e-9);
        ctx.beginPath(); ctx.moveTo(X(-R * 1.3), Y(st.P[1] + m * (-R * 1.3 - st.P[0]))); ctx.lineTo(X(R * 1.3), Y(st.P[1] + m * (R * 1.3 - st.P[0]))); ctx.stroke();
        ctx.strokeStyle = C.pink; ctx.beginPath(); ctx.moveTo(X(R3[0]), Y(R3[1])); ctx.lineTo(X(S[0]), Y(S[1])); ctx.stroke(); ctx.setLineDash([]);
        dot(R3, "rgba(245,196,81,.7)", "R");
        dot(S, C.pink, "P+Q");
        txt += `\nThe line through ${st.P === st.Q || (Math.abs(st.P[0] - st.Q[0]) < 1e-9) ? "P (tangent, since P = Q)" : "P and Q"} meets the curve a third time at R; reflect R in the x-axis: <span class="g">P + Q = (${S[0].toFixed(3)}, ${S[1].toFixed(3)})</span>.`;
      }
    } else txt += `\nClick the curve to place ${st.P ? "Q (click P again for P + P)" : "P"}.`;
    $$(pane, ".ec-out").innerHTML = txt;
  }
  function drawFinite(pane) {
    const p = st.p, { ctx, w: W, h: H } = canvas(cv, 320);
    ctx.clearRect(0, 0, W, H);
    const a = ((Math.round(st.a) % p) + p) % p, b = ((Math.round(st.b) % p) + p) % p;
    const S = Math.min((W - 30) / p, (H - 20) / p), ox = 22, oy = H - 10;
    ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.strokeRect(ox, oy - p * S, p * S, p * S);
    let n = 1; // the point at infinity
    for (let x = 0; x < p; x++) {
      const v = (x * x * x + a * x + b) % p;
      for (let y = 0; y < p; y++) if ((y * y) % p === v) { n++; ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(ox + (x + .5) * S, oy - (y + .5) * S, Math.max(1.5, S * .35), 0, 7); ctx.fill(); }
    }
    const hasse = 2 * Math.sqrt(p);
    $$(pane, ".ec-out").innerHTML = `y² = x³ + ${a}x + ${b} over the field 𝔽${p.toString().split("").map(d => "₀₁₂₃₄₅₆₇₈₉"[d]).join("")}: <span class="g">${n} points</span> (counting the point at infinity)\nHasse (1933): |N − (p + 1)| ≤ 2√p → ${n} is within ${(p + 1 - hasse).toFixed(1)} … ${(p + 1 + hasse).toFixed(1)} ✓\nThe symmetry about the middle row is P ↦ −P. Counting such points for every p is what the Birch–Swinnerton-Dyer conjecture and Wiles's modularity are about.`;
  }
  function draw(pane) {
    pane.querySelectorAll(".achip[data-m]").forEach(b => b.classList.toggle("on", b.dataset.m === st.mode));
    $$(pane, ".ec-p").hidden = st.mode !== "finite";
    if (st.mode === "real") drawReal(pane); else drawFinite(pane);
  }
  registerAtom({
    id: "elliptic", name: "Elliptic curve group law", domain: "number", fields: ["modular-forms", "algebraic-geometry", "diophantine", "langlands"],
    html: `<h3>Elliptic curves — points you can add</h3>
      <p class="ahint">On y² = x³ + ax + b, draw the line through two points P and Q: it meets the curve in exactly one more point R. Reflecting R gives P + Q. This chord-and-tangent rule makes the points a <b>group</b> — the structure behind Fermat's Last Theorem, elliptic-curve cryptography, and a Millennium Prize Problem.</p>
      <div class="achips"><button class="achip" data-m="real">over the real numbers</button><button class="achip" data-m="finite">over a finite field 𝔽ₚ</button></div>
      <canvas class="acv"></canvas>
      <div class="abar"><label class="achk">a <input type="range" data-i="a" min="-3" max="3" step="0.05" value="-1"> <span class="mono" data-o="a"></span></label>
        <label class="achk">b <input type="range" data-i="b" min="-3" max="3" step="0.05" value="1"> <span class="mono" data-o="b"></span></label>
        <label class="achk ec-p" hidden>p <select data-i="p"><option>23</option><option>37</option><option selected>61</option><option>97</option><option>151</option></select></label>
        <button class="abtn" data-b="clear">clear points</button></div>
      <div class="aout ec-out"></div>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-m]").forEach(b => b.addEventListener("click", () => { st.mode = b.dataset.m; draw(pane); }));
      const a = $$(pane, "[data-i=a]"), b = $$(pane, "[data-i=b]");
      const upd = () => { st.a = +a.value; st.b = +b.value; $$(pane, "[data-o=a]").textContent = st.a.toFixed(2); $$(pane, "[data-o=b]").textContent = st.b.toFixed(2); st.P = st.Q = null; draw(pane); };
      a.addEventListener("input", upd); b.addEventListener("input", upd);
      $$(pane, "[data-i=p]").addEventListener("change", e => { st.p = +e.target.value; draw(pane); });
      $$(pane, "[data-b=clear]").addEventListener("click", () => { st.P = st.Q = null; draw(pane); });
      cv.addEventListener("click", e => {
        if (st.mode !== "real") return;
        const r = cv.getBoundingClientRect(), W = r.width, H = 320, R = 3, sx = W / (2 * R * 1.3), sy = H / (2 * R);
        const mx = (e.clientX - r.left - W / 2) / sx, my = (H / 2 - (e.clientY - r.top)) / sy;
        // nearest point on the curve
        let best = null, bd = Infinity;
        for (let i = 0; i <= 2400; i++) { const x = -R * 1.3 + 2.6 * R * i / 2400, v = f(x); if (v < 0) continue; for (const sg of [1, -1]) { const y = sg * Math.sqrt(v), d = Math.hypot((x - mx) * sx, (y - my) * sy); if (d < bd) { bd = d; best = [x, y]; } } }
        if (!best || bd > 30) return;
        if (!st.P) st.P = best;
        else if (!st.Q) st.Q = Math.hypot((best[0] - st.P[0]) * sx, (best[1] - st.P[1]) * sy) < 10 ? st.P : best;
        else { st.P = best; st.Q = null; }
        draw(pane);
      });
      upd();
    },
    start(pane) { draw(pane); }
  });
})();
})();
