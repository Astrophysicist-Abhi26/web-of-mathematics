/* ============================================================
   THE WEB OF MATHEMATICS — atoms-world.js
   Mathematics in the world (music, architecture, life, money, the web, the calendar)
     tuning · rhythm · catenary · sir · turing · kelly · fattails · pagerank · easter
   ============================================================ */
(function () {
"use strict";
const { C, rng } = AtomKit;
const cv = (el, h) => AtomKit.canvas(el, h);
function sized(c, h) { let d = cv(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = cv(c, h); return d; }; }
function looper() {
  const L = { raf: null, fn: null,
    start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } },
    stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } };
  return L;
}
const chips = (p, sel, cb) => p.querySelectorAll(sel).forEach(b => b.addEventListener("click", () => { p.querySelectorAll(sel).forEach(x => x.classList.toggle("on", x === b)); cb(b); }));
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const PAL = [C.gold, C.teal, C.pink, C.blue, C.green, C.violet, C.red, "#ffd9a0"];

/* ---------- a small, polite sound kit (only after a click) ---------- */
let AC = null;
function audio() { if (!AC) { const A = window.AudioContext || window.webkitAudioContext; if (A) AC = new A(); } if (AC && AC.state === "suspended") AC.resume(); return AC; }
function tone(f, t0, dur, type, vol) { const ac = audio(); if (!ac) return; const o = ac.createOscillator(), g = ac.createGain(); o.type = type || "sine"; o.frequency.value = f;
  g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + .02); g.gain.setValueAtTime(vol, t0 + Math.max(.03, dur - .1)); g.gain.linearRampToValueAtTime(0, t0 + dur); o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + dur + .05); }
function drum(t0, f0, f1, dur, vol) { const ac = audio(); if (!ac) return; const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(f0, t0); o.frequency.exponentialRampToValueAtTime(f1, t0 + dur); g.gain.setValueAtTime(vol, t0); g.gain.exponentialRampToValueAtTime(.001, t0 + dur); o.connect(g).connect(ac.destination); o.start(t0); o.stop(t0 + dur + .02); }

/* ================================================================ Tuning: the Pythagorean comma */
const NOTE = ["C", "G", "D", "A", "E", "B", "F♯", "C♯", "G♯", "D♯", "A♯", "E♯", "B♯"];
const tu = looper();
registerAtom({
  id: "tuning", name: "Pythagorean comma & equal temperament", domain: "number", fields: ["diophantine", "elementary-nt"],
  html: `<h3>Why a piano is slightly out of tune — on purpose</h3>
    <p class="ahint">A perfect fifth is the frequency ratio 3 : 2, an octave 2 : 1. Stack twelve fifths and you should land back on C seven octaves up — but (3/2)¹² is not 2⁷. The spiral never closes: that gap is the Pythagorean comma. Press a chord to hear the difference between pure and equal-tempered thirds (sound starts only when you click).</p>
    <div class="achips"><button class="achip tu-n on" data-n="12">stack 12 fifths</button><button class="achip tu-n" data-n="53">stack 53 fifths</button>
      <span class="achk">hear C–E–G:</span><button class="achip tu-p" data-k="just">pure (5 : 4 third)</button><button class="achip tu-p" data-k="tet">equal-tempered</button><button class="achip tu-p" data-k="pyth">Pythagorean (81 : 64)</button><button class="achip tu-f">play the 12 fifths</button></div>
    <canvas class="acv tu-cv"></canvas>
    <div class="aout tu-out"></div>
    <p class="awhy">No whole number of fifths equals a whole number of octaves, because 3ᵐ = 2ⁿ has no solutions — so every tuning is a compromise. The best compromises come from the continued fraction of log₂(3/2) = [0; 1, 1, 2, 2, 3, 1, 5, …], whose convergents 7/12, 24/41, 31/53 say: divide the octave into 12, 41 or 53 equal steps. Twelve-tone equal temperament (Zhu Zaiyu 1584, Simon Stevin c. 1605) shrinks every fifth by 1/12 of the comma, 1.96 cents; the price is thirds that are 14 cents sharp, heard as beating.</p>`,
  build(p) {
    const c = p.querySelector(".tu-cv"), out = p.querySelector(".tu-out"), dims = sized(c, 360);
    let N = 12, t0 = performance.now(), chord = "tet";
    const L = Math.log2(1.5), cents = r => 1200 * Math.log2(r);
    const E = { just: 5 / 4, tet: 2 ** (4 / 12), pyth: 81 / 64 };
    tu.fn = () => {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const shown = Math.min(N, Math.floor((performance.now() - t0) / (N > 12 ? 90 : 450)) + 1), cx = w * .27, cy = h / 2, r0 = Math.min(w * .12, h * .2), dr = (Math.min(w * .25, h * .46) - r0) / N;
      ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.beginPath(); ctx.arc(cx, cy, r0 + dr * N, 0, 7); ctx.stroke();
      for (let k = 0; k < 12; k++) { const a = -Math.PI / 2 + 2 * Math.PI * k / 12; ctx.strokeStyle = "rgba(255,255,255,.07)"; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a) * (r0 + dr * N + 8), cy + Math.sin(a) * (r0 + dr * N + 8)); ctx.stroke(); }
      const pt = k => { const a = -Math.PI / 2 + 2 * Math.PI * ((k * L) % 1), r = r0 + dr * k; return [cx + Math.cos(a) * r, cy + Math.sin(a) * r]; };
      ctx.strokeStyle = "rgba(245,196,81,.55)"; ctx.lineWidth = 1.4; ctx.beginPath(); for (let k = 0; k <= shown; k++) { const s = pt(k); k ? ctx.lineTo(...s) : ctx.moveTo(...s); } ctx.stroke();
      for (let k = 0; k <= shown; k++) { const s = pt(k), last = k === N && shown === N; ctx.fillStyle = k === 0 ? C.teal : last ? C.pink : C.gold; ctx.beginPath(); ctx.arc(...s, last || !k ? 6 : 4, 0, 7); ctx.fill(); if (N === 12) { ctx.fillStyle = "#fff"; ctx.font = "600 11px 'IBM Plex Mono', monospace"; ctx.fillText(NOTE[k], s[0] + 7, s[1] - 6); } }
      if (shown === N) { const gap = (N * L) % 1, gapA = gap > .5 ? gap - 1 : gap, rr = r0 + dr * N + 16; ctx.strokeStyle = C.pink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(cx, cy, rr, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * gapA, gapA < 0); ctx.stroke(); }
      // beats: the 5th harmonic of C against the 4th harmonic of E
      const x0 = w * .56, x1 = w - 14, yM = h * .62, fC = 261.63, fE = fC * E[chord], h1 = 5 * fC, h2 = 4 * fE, beat = Math.abs(h2 - h1);
      ctx.fillStyle = "#cfc9e4"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText(`${chord === "just" ? "pure" : chord === "tet" ? "equal-tempered" : "Pythagorean"} third C–E:`, x0, h * .16);
      ctx.fillText(`5 × C = ${h1.toFixed(1)} Hz, 4 × E = ${h2.toFixed(1)} Hz`, x0, h * .16 + 16); ctx.fillStyle = beat < .5 ? C.teal : C.pink; ctx.fillText(beat < .5 ? "no beating: the overtones coincide" : `→ ${beat.toFixed(1)} beats per second (1 s shown)`, x0, h * .16 + 32);
      ctx.strokeStyle = "rgba(122,168,255,.8)"; ctx.lineWidth = 1; ctx.beginPath(); for (let i = 0; i <= 600; i++) { const tt = i / 600, env = Math.abs(Math.cos(Math.PI * beat * tt)), v = env * Math.sin(2 * Math.PI * 38 * tt); const X = x0 + (x1 - x0) * i / 600, Y = yM - v * h * .18; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 300; i++) { const tt = i / 300, X = x0 + (x1 - x0) * i / 300, Y = yM - Math.abs(Math.cos(Math.PI * beat * tt)) * h * .18; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
      const comma = cents(1.5 ** N / 2 ** Math.round(N * L));
      out.innerHTML = `${shown} fifths stacked${shown === N ? `: (3/2)^${N} ÷ 2^${Math.round(N * L)} = <span class="r">${comma.toFixed(2)} cents</span> off — ${N === 12 ? "the Pythagorean comma" : "Mercator's comma, 53 fifths vs 31 octaves"}` : "…"}\n` +
        `interval        pure ratio   pure cents   equal-tempered   Pythagorean\nmajor third     5/4          386.31       400.00           407.82\nperfect fifth   3/2          701.96       700.00           701.96\nperfect fourth  4/3          498.04       500.00           498.04\n` +
        `continued fraction of log₂(3/2) = [0; 1, 1, 2, 2, 3, 1, 5, …] → convergents 3/5, 7/12, 24/41, <span class="g">31/53</span>, 179/306`;
    };
    chips(p, ".tu-n", b => { N = +b.dataset.n; t0 = performance.now(); });
    p.querySelectorAll(".tu-p").forEach(b => b.addEventListener("click", () => { chord = b.dataset.k; p.querySelectorAll(".tu-p").forEach(x => x.classList.toggle("on", x === b)); const ac = audio(); if (!ac) return; const t = ac.currentTime + .05, fC = 261.63;
      [fC, fC * E[chord], fC * (chord === "tet" ? 2 ** (7 / 12) : 1.5)].forEach(f => tone(f, t, 2.6, "sawtooth", .045)); }));
    p.querySelector(".tu-f").addEventListener("click", () => { const ac = audio(); if (!ac) return; let f = 130.81; const t = ac.currentTime + .05; for (let k = 0; k <= 12; k++) { let ff = f * 1.5 ** k; while (ff > 520) ff /= 2; tone(ff, t + k * .32, .3, "triangle", .08); } t0 = performance.now(); N = 12; p.querySelectorAll(".tu-n").forEach(x => x.classList.toggle("on", x.dataset.n === "12")); });
  },
  start() { tu.start(); }, stop() { tu.stop(); }
});

/* ================================================================ Euclidean rhythms */
const euclid = (k, n, rot) => [...Array(n).keys()].map(i => ((((i + rot) % n) * k) % n) < k);
const RHY = [["tresillo (Cuba)", 3, 8, 0], ["cinquillo (Cuba)", 5, 8, 3], ["West African bell", 7, 12, 0], ["E(5, 12)", 5, 12, 0], ["E(5, 16) (bossa-like)", 5, 16, 0], ["E(9, 16)", 9, 16, 0]];
const rh = looper(); let rhStop = null;
registerAtom({
  id: "rhythm", name: "Euclidean rhythms", domain: "discrete", fields: ["enumerative", "elementary-nt"],
  html: `<h3>Euclidean rhythms — spreading k beats as evenly as possible over n steps</h3>
    <p class="ahint">Put k drum hits on a cycle of n steps, as evenly as they can go. The result, E(k, n), turns out to be a traditional rhythm again and again: E(3, 8) is the Cuban tresillo, E(5, 8) the cinquillo, E(7, 12) the West African bell pattern. Press play (sound starts only when you click).</p>
    <div class="achips">${RHY.map(([nm], i) => `<button class="achip rh-p${i ? "" : " on"}" data-i="${i}">${nm}</button>`).join("")}</div>
    <div class="achips"><label class="achk">beats k <input type="range" class="rh-k" min="1" max="16" value="3"> <b class="rh-kv"></b></label><label class="achk">steps n <input type="range" class="rh-n" min="2" max="24" value="8"> <b class="rh-nv"></b></label>
      <label class="achk">rotate <input type="range" class="rh-r" min="0" max="23" value="0"></label><label class="achk">tempo <input type="range" class="rh-t" min="60" max="200" value="110"></label><button class="achip rh-play">▶ play</button></div>
    <canvas class="acv rh-cv"></canvas>
    <div class="aout rh-out"></div>
    <p class="awhy">Eric Bjorklund found the spreading algorithm in 2003 while timing neutron-source accelerators at Oak Ridge; Godfried Toussaint noticed in 2005 that it is Euclid's algorithm in disguise, and that its outputs are rhythms found across the world's music. The same "as even as possible" patterns appear in Bresenham's line-drawing algorithm and in Sturmian words.</p>`,
  build(p) {
    const c = p.querySelector(".rh-cv"), out = p.querySelector(".rh-out"), dims = sized(c, 330), kI = p.querySelector(".rh-k"), nI = p.querySelector(".rh-n"), rI = p.querySelector(".rh-r"), tI = p.querySelector(".rh-t");
    let playing = false, step = 0, nextT = 0, lastStep = -1;
    const pattern = () => { const n = +nI.value, k = Math.min(+kI.value, n); return euclid(k, n, +rI.value % n); };
    const gcdSteps = (a, b) => { const s = []; while (b) { s.push(`${a} = ${Math.floor(a / b)}·${b} + ${a % b}`); [a, b] = [b, a % b]; } return s; };
    rh.fn = () => {
      const P = pattern(), n = P.length, k = P.filter(Boolean).length; p.querySelector(".rh-kv").textContent = k; p.querySelector(".rh-nv").textContent = n; kI.max = n; rI.max = n - 1;
      const ac = AC; if (playing && ac) { const spb = 60 / +tI.value / 2; while (nextT < ac.currentTime + .12) { const s = step % n; if (P[s]) drum(nextT, 180, 55, .16, .5); else drum(nextT, 2200, 1800, .025, .05); setTimeout(() => lastStep = s, Math.max(0, (nextT - ac.currentTime) * 1000)); nextT += spb; step++; } }
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const cx = w * .3, cy = h / 2, R = Math.min(w * .22, h * .4), at = i => [cx + R * Math.sin(2 * Math.PI * i / n), cy - R * Math.cos(2 * Math.PI * i / n)];
      ctx.strokeStyle = "rgba(255,255,255,.12)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
      const on = P.map((b, i) => b ? i : -1).filter(i => i >= 0);
      if (on.length > 1) { ctx.fillStyle = "rgba(245,196,81,.12)"; ctx.strokeStyle = "rgba(245,196,81,.7)"; ctx.lineWidth = 1.6; ctx.beginPath(); on.forEach((i, j) => j ? ctx.lineTo(...at(i)) : ctx.moveTo(...at(i))); ctx.closePath(); ctx.fill(); ctx.stroke(); }
      P.forEach((b, i) => { const [x, y] = at(i), hot = i === lastStep && playing; ctx.fillStyle = b ? (hot ? "#fff" : C.gold) : (hot ? C.teal : "rgba(255,255,255,.2)"); ctx.shadowColor = C.gold; ctx.shadowBlur = b ? (hot ? 22 : 8) : 0; ctx.beginPath(); ctx.arc(x, y, b ? 9 : 5, 0, 7); ctx.fill(); ctx.shadowBlur = 0; });
      if (playing && lastStep >= 0) { const [x, y] = at(lastStep); ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(x, y); ctx.stroke(); }
      // the same rhythm as a row of boxes
      const x0 = w * .58, bw = Math.min(30, (w - x0 - 14) / n); P.forEach((b, i) => { ctx.fillStyle = b ? C.gold : "rgba(255,255,255,.08)"; ctx.fillRect(x0 + i * bw, h * .3, bw - 3, 30); if (i === lastStep && playing) { ctx.strokeStyle = C.teal; ctx.strokeRect(x0 + i * bw - 1, h * .3 - 1, bw - 1, 32); } });
      ctx.fillStyle = "#cfc9e4"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText("gaps between beats: " + on.map((i, j) => ((on[(j + 1) % on.length] - i + n) % n) || n).join(" + ") + " = " + n, x0, h * .3 + 52);
      ctx.fillText("Euclid on (" + n + ", " + k + "):", x0, h * .3 + 80); gcdSteps(n, k).forEach((s, i) => ctx.fillText(s, x0 + 8, h * .3 + 98 + i * 16));
      out.innerHTML = `E(${k}, ${n}) = <span class="g">${P.map(b => b ? "x" : ".").join(" ")}</span>   <span class="d">(x = hit, . = rest; the gaps differ by at most 1 — as even as possible)</span>`;
    };
    p.querySelectorAll(".rh-p").forEach(b => b.addEventListener("click", () => { p.querySelectorAll(".rh-p").forEach(x => x.classList.toggle("on", x === b)); const [, k, n, r] = RHY[+b.dataset.i]; nI.value = n; kI.max = n; kI.value = k; rI.value = r; }));
    const pb = p.querySelector(".rh-play"); pb.addEventListener("click", () => { playing = !playing; pb.classList.toggle("on", playing); pb.textContent = playing ? "❚❚ stop" : "▶ play"; const ac = audio(); if (playing && ac) { nextT = ac.currentTime + .05; step = 0; } });
    rhStop = () => { playing = false; pb.classList.remove("on"); pb.textContent = "▶ play"; };
  },
  start() { rh.start(); }, stop() { rh.stop(); if (rhStop) rhStop(); }
});

/* ================================================================ Gaudí's hanging chain */
const ca = looper();
registerAtom({
  id: "catenary", name: "Hanging chains & Gaudí's arches", domain: "analysis", fields: ["variations", "odes"],
  html: `<h3>As hangs the chain, so stands the arch — upside down</h3>
    <p class="ahint">A chain hanging under its own weight settles into a catenary, y = a·cosh(x/a). Every link is pulled only along the chain — pure tension. Turn the curve upside down and the tension becomes pure compression: the perfect shape for a stone arch. Drag the two ends; hang weights to shape it like Gaudí did.</p>
    <div class="achips"><button class="achip ca-f">⤒ flip into an arch</button><button class="achip ca-w">hang three weights</button><label class="achk">chain length <input type="range" class="ca-l" min="1.05" max="2.2" step="0.01" value="1.45"></label></div>
    <canvas class="acv ca-cv" style="cursor:grab"></canvas>
    <div class="aout ca-out"></div>
    <p class="awhy">Robert Hooke published the principle in 1675 as an anagram, "ut pendet continuum flexile, sic stabit contiguum rigidum inversum" — as hangs the flexible line, so but inverted will stand the rigid arch. Galileo had guessed the hanging chain was a parabola; the catenary was found by Leibniz, Huygens and Johann Bernoulli in 1691 as the curve of least potential energy, a problem in the calculus of variations. Antoni Gaudí designed the Colònia Güell church and the Sagrada Família with upside-down models of strings and sandbags; the Gateway Arch in St Louis is a (weighted) catenary.</p>`,
  build(p) {
    const c = p.querySelector(".ca-cv"), out = p.querySelector(".ca-out"), dims = sized(c, 360), lI = p.querySelector(".ca-l");
    const N = 40; let A, B, P, Q, flip = false, weights = false, drag = null, seg;
    function reset() { const { w, h } = dims(); A = [w * .22, h * .22]; B = [w * .78, h * .26]; rebuild(); }
    function rebuild() { const L = Math.hypot(B[0] - A[0], B[1] - A[1]) * +lI.value; seg = L / N; P = []; Q = []; for (let i = 0; i <= N; i++) { const x = A[0] + (B[0] - A[0]) * i / N, y = A[1] + (B[1] - A[1]) * i / N + Math.sin(Math.PI * i / N) * 40; P.push([x, y]); Q.push([x, y]); } }
    const mass = i => weights && [10, 20, 30].includes(i) ? 8 : 1;
    function physics() {
      for (let i = 1; i < N; i++) { const [x, y] = P[i], [px, py] = Q[i]; Q[i] = [x, y]; P[i] = [x + (x - px) * .985, y + (y - py) * .985 + .35]; }
      P[0] = A.slice(); P[N] = B.slice();
      for (let it = 0; it < 40; it++) for (let i = 0; i < N; i++) { const a = P[i], b = P[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], d = Math.hypot(dx, dy) || 1, diff = (d - seg) / d;
        const wa = i === 0 ? 0 : 1 / mass(i), wb = i + 1 === N ? 0 : 1 / mass(i + 1), s = wa + wb; if (!s) continue; a[0] += dx * diff * wa / s; a[1] += dy * diff * wa / s; b[0] -= dx * diff * wb / s; b[1] -= dy * diff * wb / s; }
    }
    function catenaryFit() { // the exact catenary through A and B with the chain's length (y measured upward)
      const [x1, y1, x2, y2] = A[0] <= B[0] ? [A[0], -A[1], B[0], -B[1]] : [B[0], -B[1], A[0], -A[1]], hh = x2 - x1, v = y2 - y1, L = seg * N; if (L * L <= v * v + hh * hh + 1e-6 || hh < 1) return null;
      const target = Math.sqrt(L * L - v * v); let lo = 1e-2, hi = 1e7; for (let k = 0; k < 200; k++) { const m = Math.sqrt(lo * hi); 2 * m * Math.sinh(hh / (2 * m)) > target ? lo = m : hi = m; }
      const a = Math.sqrt(lo * hi), x0 = (x1 + x2) / 2 - a * Math.atanh(v / L), cc = y1 - a * Math.cosh((x1 - x0) / a);
      return x => -(a * Math.cosh((x - x0) / a) + cc);
    }
    ca.fn = () => {
      for (let k = 0; k < 3; k++) physics();
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const mir = ([x, y]) => { if (!flip) return [x, y]; const yl = A[1] + (B[1] - A[1]) * (x - A[0]) / ((B[0] - A[0]) || 1); return [x, 2 * yl - y]; };
      const shift = flip ? h * .52 : 0, M = q => { const m = mir(q); return [m[0], m[1] + shift]; };
      const fit = !weights ? catenaryFit() : null;
      if (flip) { ctx.fillStyle = "rgba(255,255,255,.06)"; ctx.fillRect(0, M(A)[1] + 4, w, h); }
      if (fit) { ctx.strokeStyle = "rgba(63,208,201,.9)"; ctx.setLineDash([6, 5]); ctx.lineWidth = 1.5; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const x = A[0] + (B[0] - A[0]) * i / 80, q = M([x, fit(x)]); i ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.stroke();
        // a parabola with the same ends and the same lowest point, for comparison
        const mid = P.reduce((m, q) => q[1] > m[1] ? q : m, P[0]); ctx.strokeStyle = "rgba(255,122,200,.6)"; ctx.beginPath(); for (let i = 0; i <= 80; i++) { const x = A[0] + (B[0] - A[0]) * i / 80, side = x < mid[0] ? A : B, k = (side[1] - mid[1]) / ((side[0] - mid[0]) ** 2 || 1), q = M([x, mid[1] + k * (x - mid[0]) ** 2]); i ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.stroke(); ctx.setLineDash([]); }
      for (let i = 0; i < N; i++) { const a = M(P[i]), b = M(P[i + 1]); ctx.strokeStyle = flip ? "#c9b48a" : C.gold; ctx.lineWidth = flip ? 9 : 3.2; ctx.lineCap = "round"; ctx.beginPath(); ctx.moveTo(...a); ctx.lineTo(...b); ctx.stroke(); }
      if (flip) for (let i = 2; i < N - 1; i += 5) { const a = M(P[i]), b = M(P[i + 2]), d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1, ux = (b[0] - a[0]) / d, uy = (b[1] - a[1]) / d, m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]; ctx.strokeStyle = C.red; ctx.lineWidth = 1.5; [[-1, 1], [1, -1]].forEach(([s1]) => { ctx.beginPath(); ctx.moveTo(m[0] + s1 * ux * 16, m[1] + s1 * uy * 16); ctx.lineTo(m[0] + s1 * ux * 5, m[1] + s1 * uy * 5); ctx.stroke(); }); }
      if (weights) [10, 20, 30].forEach(i => { const q = M(P[i]); ctx.fillStyle = C.pink; ctx.fillRect(q[0] - 7, q[1] + (flip ? -20 : 6), 14, 14); });
      [A, B].forEach(q => { const m = M(q); ctx.fillStyle = C.teal; ctx.beginPath(); ctx.arc(...m, 8, 0, 7); ctx.fill(); });
      let dev = 0; if (fit) for (let i = 0; i <= N; i++) dev = Math.max(dev, Math.abs(P[i][1] - fit(P[i][0])));
      out.innerHTML = weights ? `with weights the chain bends into straight pieces between them — a funicular polygon, the shape Gaudí read off his hanging models` :
        `gold: the simulated chain   <span class="t">dashed teal: the exact catenary y = a·cosh((x − x₀)/a) + c</span> through the same ends with the same length (largest gap ${dev.toFixed(1)} px)\n<span class="d">pink: a parabola with the same ends and lowest point — close, but not the same curve. ${flip ? "Flipped: every piece of the arch is squeezed along its length (red arrows) — no bending, so stone can stand this way." : ""}</span>`;
    };
    const at = e => { const r = c.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
    c.addEventListener("pointerdown", e => { if (flip) return; const q = at(e); [A, B].forEach(E => { if (Math.hypot(E[0] - q[0], E[1] - q[1]) < 20) drag = E; }); if (drag) try { c.setPointerCapture(e.pointerId); } catch (_) {} });
    c.addEventListener("pointermove", e => { if (!drag) return; const { w, h } = dims(), q = at(e); drag[0] = clamp(q[0], 10, w - 10); drag[1] = clamp(q[1], 10, h * .6); });
    c.addEventListener("pointerup", () => { if (drag) rebuild(); drag = null; });
    p.querySelector(".ca-f").addEventListener("click", e => { flip = !flip; e.target.classList.toggle("on", flip); e.target.textContent = flip ? "⤓ hang it again" : "⤒ flip into an arch"; });
    p.querySelector(".ca-w").addEventListener("click", e => { weights = !weights; e.target.classList.toggle("on", weights); });
    lI.addEventListener("input", rebuild);
    this._go = reset;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } ca.start(); }, stop() { ca.stop(); }
});

/* ================================================================ SIR epidemic */
registerAtom({
  id: "sir", name: "Epidemics: the SIR model", domain: "analysis", fields: ["odes", "dynamical-systems"],
  html: `<h3>How an epidemic rises and falls — and why vaccinating some protects all</h3>
    <p class="ahint">Everyone is Susceptible, Infected or Recovered. Each infected person infects others at rate β and recovers at rate γ; R₀ = β/γ is how many people one case infects in a fully susceptible population. Change R₀, the length of the illness and the share vaccinated.</p>
    <div class="achips"><label class="achk">R₀ <input type="range" class="si-r" min="0.5" max="8" step="0.05" value="2.5"> <b class="si-rv"></b></label>
      <label class="achk">infectious for <input type="range" class="si-d" min="2" max="20" step="1" value="7"> <b class="si-dv"></b> days</label>
      <label class="achk">vaccinated <input type="range" class="si-v" min="0" max="0.95" step="0.01" value="0"> <b class="si-vv"></b></label></div>
    <canvas class="acv si-cv"></canvas>
    <div class="aout si-out"></div>
    <p class="awhy">William Kermack and Anderson McKendrick wrote down these equations in 1927: S′ = −βSI, I′ = βSI − γI, R′ = γI. An outbreak grows only while R₀·S > 1, so once a fraction 1 − 1/R₀ is immune — by vaccination or past infection — each case infects fewer than one other and the epidemic dies out: herd immunity. The total eventually infected solves the final-size equation z = S₀(1 − e^(−R₀ z)), and even without any intervention the disease never reaches everyone.</p>`,
  build(p) {
    const c = p.querySelector(".si-cv"), out = p.querySelector(".si-out"), dims = sized(c, 330), rI = p.querySelector(".si-r"), dI = p.querySelector(".si-d"), vI = p.querySelector(".si-v");
    function draw() {
      const R0 = +rI.value, D = +dI.value, v = +vI.value, g = 1 / D, b = R0 * g, days = 240, dt = .1;
      p.querySelector(".si-rv").textContent = R0.toFixed(2); p.querySelector(".si-dv").textContent = D; p.querySelector(".si-vv").textContent = Math.round(v * 100) + "%";
      let S = (1 - v) * (1 - 1e-4), I = 1e-4 * (1 - v) + 1e-4 * v, Rr = v; const T = [];
      const f = (s, i) => [-b * s * i, b * s * i - g * i];
      for (let t = 0; t <= days; t += dt) { if (Math.abs(t - Math.round(t)) < dt / 2) T.push([t, S, I, Rr]); const k1 = f(S, I), k2 = f(S + dt / 2 * k1[0], I + dt / 2 * k1[1]), k3 = f(S + dt / 2 * k2[0], I + dt / 2 * k2[1]), k4 = f(S + dt * k3[0], I + dt * k3[1]);
        const dS = dt / 6 * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]), dI2 = dt / 6 * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]); S += dS; I += dI2; Rr -= dS + dI2; }
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const L = 40, Rt = w - 12, Tp = 12, B = h - 24, X = t => L + (Rt - L) * t / days, Y = y => B - (B - Tp) * y;
      ctx.strokeStyle = "rgba(255,255,255,.08)"; ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace";
      [0, .25, .5, .75, 1].forEach(y => { ctx.beginPath(); ctx.moveTo(L, Y(y)); ctx.lineTo(Rt, Y(y)); ctx.stroke(); ctx.fillText(y * 100 + "%", 4, Y(y) + 3); }); [0, 60, 120, 180, 240].forEach(t => ctx.fillText(t + " d", X(t) - 8, B + 14));
      const herd = Math.max(0, 1 - 1 / R0); ctx.setLineDash([5, 5]); ctx.strokeStyle = "rgba(87,224,138,.7)"; ctx.beginPath(); ctx.moveTo(L, Y(1 - herd)); ctx.lineTo(Rt, Y(1 - herd)); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = C.green; ctx.fillText("herd-immunity line: S = 1/R₀", Rt - 190, Y(1 - herd) - 5);
      [[1, C.blue, "susceptible"], [2, C.red, "infected"], [3, C.green, "recovered / immune"]].forEach(([k, col, nm], j) => { ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); T.forEach((r, i) => i ? ctx.lineTo(X(r[0]), Y(r[k])) : ctx.moveTo(X(r[0]), Y(r[k]))); ctx.stroke(); ctx.fillStyle = col; ctx.fillText(nm, L + 8 + j * 120, Tp + 10); });
      const peak = T.reduce((m, r) => r[2] > m[2] ? r : m, T[0]), S0 = (1 - v); let z = .5; for (let k = 0; k < 200; k++) z = S0 * (1 - Math.exp(-R0 * z));
      ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(X(peak[0]), Y(peak[2]), 5, 0, 7); ctx.fill();
      out.innerHTML = `R₀ = ${R0.toFixed(2)}, β = ${b.toFixed(3)}/day, γ = 1/${D} per day   effective R at the start = R₀ × S₀ = <span class="${R0 * S0 > 1 ? "r" : "t"}">${(R0 * S0).toFixed(2)}</span>\n` +
        (R0 * S0 > 1 ? `peak: <span class="r">${(peak[2] * 100).toFixed(1)}%</span> infected at once, on day ${Math.round(peak[0])}   eventually infected: <span class="g">${(z * 100).toFixed(1)}%</span> (final-size equation)` : `<span class="t">each case infects fewer than one other — the outbreak fizzles out</span>`) +
        `\nherd-immunity threshold 1 − 1/R₀ = <span class="g">${(herd * 100).toFixed(1)}%</span> immune${v >= herd ? ' <span class="t">— reached by vaccination alone</span>' : ""}`;
    }
    [rI, dI, vI].forEach(i => i.addEventListener("input", draw)); this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Turing patterns (Gray–Scott) */
const RAMP = [[14, 6, 24], [70, 30, 120], [150, 80, 220], [63, 208, 201], [245, 196, 81], [255, 245, 220]];
const TPRE = { "spots that divide": [.0367, .0649], "coral": [.0545, .062], "maze": [.029, .057], "holes": [.039, .058], "waves": [.014, .054] };
const tg = looper();
registerAtom({
  id: "turing", name: "Turing patterns", domain: "analysis", fields: ["pdes", "dynamical-systems"],
  html: `<h3>How the leopard gets its spots — Turing's reaction–diffusion</h3>
    <p class="ahint">Two chemicals spread out (diffuse) at different speeds and react with each other. From an almost uniform start, spots, stripes and mazes appear on their own. Choose a recipe, then paint with the mouse to seed new patterns.</p>
    <div class="achips">${Object.keys(TPRE).map((k, i) => `<button class="achip tg-p${i ? "" : " on"}" data-k="${k}">${k}</button>`).join("")}<button class="achip tg-r">reseed</button></div>
    <canvas class="acv tg-cv" style="cursor:crosshair"></canvas>
    <div class="aout tg-out"></div>
    <p class="awhy">In 1952, two years before his death, Alan Turing showed in "The Chemical Basis of Morphogenesis" that diffusion — normally a smoothing force — can destabilise a uniform state and create pattern, if an inhibitor spreads faster than an activator. This simulation uses the Gray–Scott reaction (Gray and Scott 1984; patterns catalogued by John Pearson 1993): U + 2V → 3V, with U fed in at rate F and V removed at rate k. Turing mechanisms have since been identified in zebrafish stripes, the ridges of the mouth's palate and the spacing of hair follicles.</p>`,
  build(p) {
    const c = p.querySelector(".tg-cv"), out = p.querySelector(".tg-out"), dims = sized(c, 340);
    const GW = 180, GH = 110; let U = new Float32Array(GW * GH), V = new Float32Array(GW * GH), U2 = new Float32Array(GW * GH), V2 = new Float32Array(GW * GH), F = .0367, K = .0649, iter = 0, R = rng(3);
    const img = document.createElement("canvas"); img.width = GW; img.height = GH; const ictx = img.getContext("2d"), ID = ictx.createImageData(GW, GH);
    const seed = () => { U.fill(1); V.fill(0); for (let s = 0; s < 14; s++) { const x0 = 10 + Math.floor(R() * (GW - 20)), y0 = 8 + Math.floor(R() * (GH - 16)); for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) { const i = (y0 + y) * GW + x0 + x; U[i] = .5; V[i] = .25 + R() * .05; } } iter = 0; };
    const paint = (gx, gy) => { for (let y = -2; y <= 2; y++) for (let x = -2; x <= 2; x++) { const X = (gx + x + GW) % GW, Y = (gy + y + GH) % GH, i = Y * GW + X; U[i] = .5; V[i] = .25; } };
    function stepSim() {
      for (let y = 0; y < GH; y++) { const yu = ((y - 1 + GH) % GH) * GW, yd = ((y + 1) % GH) * GW, yc = y * GW;
        for (let x = 0; x < GW; x++) { const xl = (x - 1 + GW) % GW, xr = (x + 1) % GW, i = yc + x, u = U[i], v = V[i];
          const lu = .2 * (U[yc + xl] + U[yc + xr] + U[yu + x] + U[yd + x]) + .05 * (U[yu + xl] + U[yu + xr] + U[yd + xl] + U[yd + xr]) - u;
          const lv = .2 * (V[yc + xl] + V[yc + xr] + V[yu + x] + V[yd + x]) + .05 * (V[yu + xl] + V[yu + xr] + V[yd + xl] + V[yd + xr]) - v;
          const uvv = u * v * v; U2[i] = u + (1.0 * lu - uvv + F * (1 - u)); V2[i] = v + (.5 * lv + uvv - (K + F) * v); } }
      [U, U2] = [U2, U]; [V, V2] = [V2, V]; iter++;
    }
    tg.fn = () => {
      for (let k = 0; k < (AtomKit.reduced ? 2 : 14); k++) stepSim();
      for (let i = 0; i < GW * GH; i++) { const v = Math.min(1, V[i] * 3), j = i * 4, s = v * (RAMP.length - 1), q = Math.min(RAMP.length - 2, Math.floor(s)), t = s - q; for (let ch = 0; ch < 3; ch++) ID.data[j + ch] = RAMP[q][ch] + (RAMP[q + 1][ch] - RAMP[q][ch]) * t; ID.data[j + 3] = 255; }
      ictx.putImageData(ID, 0, 0);
      const { ctx, w, h } = dims(); ctx.imageSmoothingEnabled = true; ctx.drawImage(img, 0, 0, w, h);
      out.innerHTML = `feed F = ${F}, kill k = ${K}   steps: ${iter}   <span class="d">U diffuses twice as fast as V; the colour shows the amount of V</span>`;
    };
    let down = false; const gpos = e => { const r = c.getBoundingClientRect(); return [Math.floor((e.clientX - r.left) / r.width * GW), Math.floor((e.clientY - r.top) / r.height * GH)]; };
    c.addEventListener("pointerdown", e => { down = true; paint(...gpos(e)); try { c.setPointerCapture(e.pointerId); } catch (_) {} });
    c.addEventListener("pointermove", e => { if (down) paint(...gpos(e)); }); c.addEventListener("pointerup", () => down = false);
    chips(p, ".tg-p", b => { [F, K] = TPRE[b.dataset.k]; seed(); });
    p.querySelector(".tg-r").addEventListener("click", seed);
    seed();
  },
  start() { tg.start(); }, stop() { tg.stop(); }
});

/* ================================================================ Kelly betting */
registerAtom({
  id: "kelly", name: "Kelly betting", domain: "probability", fields: ["stochastic-processes", "limit-theorems"],
  html: `<h3>The Kelly criterion — how much of your money to bet on a good bet</h3>
    <p class="ahint">A coin lands heads with probability p > ½, and you win or lose your stake at even money. Bet everything and one tail ruins you; bet too little and you barely grow. Kelly's answer: bet the fraction f* = 2p − 1 of your wealth each time. Slide f and watch 40 gamblers play 400 rounds.</p>
    <div class="achips"><label class="achk">p(heads) <input type="range" class="ke-p" min="0.5" max="0.8" step="0.01" value="0.6"> <b class="ke-pv"></b></label>
      <label class="achk">fraction bet f <input type="range" class="ke-f" min="0" max="1" step="0.01" value="0.2"> <b class="ke-fv"></b></label><button class="achip ke-k">set f = Kelly</button><button class="achip ke-s">new luck</button></div>
    <canvas class="acv ke-cv"></canvas>
    <div class="aout ke-out"></div>
    <p class="awhy">John Kelly, working at Bell Labs on noisy telephone lines, published the rule in 1956: maximise the expected logarithm of wealth, g(f) = p·ln(1 + f) + (1 − p)·ln(1 − f). By the law of large numbers your wealth then grows like e^(g·n), faster in the long run than any other fixed strategy. Bet twice the Kelly fraction and the growth rate falls to about zero; bet more and you go broke almost surely — even though every single bet is in your favour. Edward Thorp used it at blackjack and then on Wall Street.</p>`,
  build(p) {
    const c = p.querySelector(".ke-cv"), out = p.querySelector(".ke-out"), dims = sized(c, 340), pI = p.querySelector(".ke-p"), fI = p.querySelector(".ke-f"); let seed = 1;
    function draw() {
      const pp = +pI.value, f = +fI.value, n = 400, M = 40, R = rng(seed * 7919), g = x => pp * Math.log(1 + x) + (1 - pp) * Math.log(Math.max(1e-12, 1 - x)), fs = 2 * pp - 1;
      p.querySelector(".ke-pv").textContent = pp.toFixed(2); p.querySelector(".ke-fv").textContent = f.toFixed(2);
      const paths = []; for (let m = 0; m < M; m++) { let lw = 0; const pa = [0]; for (let k = 0; k < n; k++) { lw += Math.log10(R() < pp ? 1 + f : Math.max(1e-300, 1 - f)); pa.push(lw); } paths.push(pa); }
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const L = 44, Rt = w * .68, T = 14, B = h - 24, lo = -6, hi = Math.max(3, Math.ceil(Math.max(...paths.map(q => q[n])))), X = k => L + (Rt - L) * k / n, Y = v => B - (B - T) * (clamp(v, lo, hi) - lo) / (hi - lo);
      ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; for (let e = lo; e <= hi; e += Math.max(1, Math.round((hi - lo) / 6))) { ctx.strokeStyle = e === 0 ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.07)"; ctx.beginPath(); ctx.moveTo(L, Y(e)); ctx.lineTo(Rt, Y(e)); ctx.stroke(); ctx.fillText("10^" + e, 4, Y(e) + 3); }
      paths.forEach((pa, m) => { ctx.strokeStyle = `hsla(${40 + m * 5},80%,62%,.45)`; ctx.lineWidth = 1; ctx.beginPath(); pa.forEach((v, k) => k ? ctx.lineTo(X(k), Y(v)) : ctx.moveTo(X(k), Y(v))); ctx.stroke(); });
      ctx.strokeStyle = "#fff"; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(X(0), Y(0)); ctx.lineTo(X(n), Y(n * g(f) / Math.LN10)); ctx.stroke(); ctx.setLineDash([]);
      // growth-rate curve
      const x0 = w * .73, x1 = w - 12, gT = h * .15, gB = h * .75, gmax = Math.max(.02, g(fs) * 1.3), gmin = -gmax * 1.5, GX = x => x0 + (x1 - x0) * x, GY = v => gB - (gB - gT) * (clamp(v, gmin, gmax) - gmin) / (gmax - gmin);
      ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.moveTo(x0, GY(0)); ctx.lineTo(x1, GY(0)); ctx.stroke(); ctx.fillStyle = "#cfc9e4"; ctx.fillText("growth rate g(f) per bet", x0, gT - 6); ctx.fillText("f →", x1 - 22, GY(0) + 14);
      ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 100; i++) { const x = i / 100 * .995; i ? ctx.lineTo(GX(x), GY(g(x))) : ctx.moveTo(GX(x), GY(g(x))); } ctx.stroke();
      ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(GX(fs), GY(g(fs)), 5, 0, 7); ctx.fill(); ctx.fillText("Kelly", GX(fs) - 12, GY(g(fs)) - 9); ctx.fillStyle = C.pink; ctx.beginPath(); ctx.arc(GX(f), GY(g(f)), 5, 0, 7); ctx.fill();
      const fin = paths.map(q => q[n]).sort((a, b) => a - b), med = fin[M >> 1], broke = fin.filter(v => v < -2).length;
      out.innerHTML = `Kelly fraction f* = 2p − 1 = <span class="g">${fs.toFixed(2)}</span>   your f = ${f.toFixed(2)}   growth g(f) = ${(g(f) * 100).toFixed(2)}% per bet (Kelly: ${(g(fs) * 100).toFixed(2)}%)\nafter ${n} bets: median wealth ×10^${med.toFixed(1)}   gamblers down by 99% or more: <span class="${broke ? "r" : "t"}">${broke} of ${M}</span>   <span class="d">(dashed: e^(g·n))</span>`;
    }
    [pI, fI].forEach(i => i.addEventListener("input", draw));
    p.querySelector(".ke-k").addEventListener("click", () => { fI.value = (2 * +pI.value - 1).toFixed(2); draw(); });
    p.querySelector(".ke-s").addEventListener("click", () => { seed++; draw(); });
    this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Fat tails */
const ft = looper();
registerAtom({
  id: "fattails", name: "Fat tails & averages that never settle", domain: "probability", fields: ["limit-theorems", "statistics"],
  html: `<h3>Fat tails — when the average refuses to settle down</h3>
    <p class="ahint">Keep drawing random numbers and track their running average. For bell-curve data it settles quickly. For a Pareto distribution with tail exponent 1.5 it settles, but slowly and in jumps. For the Cauchy distribution it never settles at all: one wild value can outweigh everything before it.</p>
    <div class="achips"><button class="achip fat-go">draw again</button></div>
    <canvas class="acv fat-cv"></canvas>
    <div class="aout fat-out"></div>
    <p class="awhy">The law of large numbers needs a finite mean. The Cauchy distribution — the shape of a spectral line, or of where a spinning lighthouse beam hits a straight coast — has none: the average of n Cauchy samples is again Cauchy, exactly as spread out as a single sample. Pareto tails, P(X > x) ~ x^(−α), govern city sizes, wealth, earthquakes and market crashes; Benoît Mandelbrot found them in cotton prices in 1963. With α ≤ 2 the variance is infinite and the central limit theorem gives way to stable laws.</p>`,
  build(p) {
    const c = p.querySelector(".fat-cv"), out = p.querySelector(".fat-out"), dims = sized(c, 330);
    const N = 20000, K = 3; let S, shown = 0, seed = 1;
    const gauss = R => Math.sqrt(-2 * Math.log(1 - R())) * Math.cos(2 * Math.PI * R());
    const DIST = [["normal (mean 0)", C.teal, R => gauss(R), 0], ["Pareto α = 1.5 (mean 3)", C.gold, R => Math.pow(1 - R(), -1 / 1.5), 3], ["Cauchy (no mean)", C.pink, R => Math.tan(Math.PI * (R() - .5)), null]];
    function make() { S = DIST.map((d, di) => [...Array(K).keys()].map(k => { const R = rng(seed * 1000 + di * 10 + k), run = new Float64Array(N); let s = 0, mx = 0, tot = 0; for (let i = 0; i < N; i++) { const x = d[2](R); s += x; tot += Math.abs(x); mx = Math.max(mx, Math.abs(x)); run[i] = s / (i + 1); } return { run, share: mx / tot }; })); shown = 1; }
    ft.fn = () => {
      if (shown < N) shown = Math.min(N, Math.ceil(shown * 1.08) + 5);
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const L = 40, Rt = w - 12, T = 12, B = h - 24, lo = -4, hi = 7, X = i => L + (Rt - L) * Math.log10(i + 1) / Math.log10(N), Y = v => B - (B - T) * (clamp(v, lo, hi) - lo) / (hi - lo);
      ctx.font = "10px 'IBM Plex Mono', monospace"; for (let v = lo; v <= hi; v++) { ctx.strokeStyle = "rgba(255,255,255,.06)"; ctx.beginPath(); ctx.moveTo(L, Y(v)); ctx.lineTo(Rt, Y(v)); ctx.stroke(); ctx.fillStyle = "#8d86a8"; ctx.fillText(v, 18, Y(v) + 3); }
      [1, 10, 100, 1000, 10000].forEach(n => ctx.fillText(n.toLocaleString("en"), X(n - 1) - 8, B + 14));
      DIST.forEach((d, di) => { if (d[3] !== null) { ctx.setLineDash([4, 4]); ctx.strokeStyle = d[1]; ctx.globalAlpha = .5; ctx.beginPath(); ctx.moveTo(L, Y(d[3])); ctx.lineTo(Rt, Y(d[3])); ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1; }
        S[di].forEach(({ run }) => { ctx.strokeStyle = d[1]; ctx.lineWidth = 1.4; ctx.beginPath(); for (let i = 0; i < shown; i += Math.max(1, Math.floor(i / 400))) i ? ctx.lineTo(X(i), Y(run[i])) : ctx.moveTo(X(i), Y(run[i])); ctx.stroke(); });
        ctx.fillStyle = d[1]; ctx.fillText(d[0], L + 8 + di * 190, T + 8); });
      out.innerHTML = `running averages of ${shown.toLocaleString("en")} draws (three runs each, log scale in n)\n` + DIST.map((d, di) => `${d[0].padEnd(24)} final averages ${S[di].map(s => s.run[shown - 1].toFixed(2)).join(", ").padEnd(22)} largest single value = ${(Math.max(...S[di].map(s => s.share)) * 100).toFixed(1)}% of the total size`).join("\n");
    };
    p.querySelector(".fat-go").addEventListener("click", () => { seed++; make(); });
    make();
  },
  start() { ft.start(); }, stop() { ft.stop(); }
});

/* ================================================================ PageRank */
const PG = "ABCDEFGH";
const pr = looper();
registerAtom({
  id: "pagerank", name: "PageRank", domain: "algebra", fields: ["linear-algebra", "stochastic-processes"],
  html: `<h3>PageRank — ranking the web with an eigenvector</h3>
    <p class="ahint">A random surfer clicks a random link on each page, and now and then jumps to a random page instead. A page's rank is the share of time the surfer spends there. Watch the surfer (the moving dot) and the counts converge to the exact ranks. Click one page and then another to add or remove a link.</p>
    <div class="achips"><label class="achk">follow a link with probability d <input type="range" class="pgr-d" min="0.5" max="0.99" step="0.01" value="0.85"> <b class="pgr-dv"></b></label><button class="achip pgr-rs">restart the surfer</button><button class="achip pgr-fast">fast-forward</button></div>
    <canvas class="acv pgr-cv" style="cursor:pointer"></canvas>
    <div class="aout pgr-out"></div>
    <p class="awhy">Larry Page and Sergey Brin's 1998 ranking treats the web as a Markov chain. The ranks form the stationary distribution: the eigenvector of the Google matrix G = d·(link matrix) + (1 − d)/N with eigenvalue 1, which exists and is unique because every entry of G is positive (the Perron–Frobenius theorem). Power iteration — multiply by G again and again — finds it. The damping d ≈ 0.85 was the original choice.</p>`,
  build(p) {
    const c = p.querySelector(".pgr-cv"), out = p.querySelector(".pgr-out"), dims = sized(c, 360), dI = p.querySelector(".pgr-d");
    const n = 8; let links = new Set(["0-1", "1-2", "2-0", "3-0", "4-0", "5-4", "6-5", "7-6", "2-3", "1-5", "6-0", "4-2", "5-0"]), sel = -1, cur = 0, visits = new Array(n).fill(0), total = 0, hopT = 0, from = 0, to = 0, fast = false;
    const outs = i => [...Array(n).keys()].filter(j => links.has(i + "-" + j));
    function rank() { const d = +dI.value; let r = new Array(n).fill(1 / n); for (let it = 0; it < 100; it++) { const nr = new Array(n).fill((1 - d) / n); for (let i = 0; i < n; i++) { const o = outs(i); if (!o.length) for (let j = 0; j < n; j++) nr[j] += d * r[i] / n; else o.forEach(j => nr[j] += d * r[i] / o.length); } r = nr; } return r; }
    const hop = () => { const d = +dI.value, o = outs(cur); from = cur; cur = (Math.random() < d && o.length) ? o[Math.floor(Math.random() * o.length)] : Math.floor(Math.random() * n); to = cur; visits[cur]++; total++; };
    const pos = () => { const { w, h } = dims(), cx = w * .3, cy = h / 2, R = Math.min(w * .22, h * .38); return [...Array(n).keys()].map(i => [cx + R * Math.sin(2 * Math.PI * i / n), cy - R * Math.cos(2 * Math.PI * i / n)]); };
    pr.fn = () => {
      const now = performance.now(); if (fast) for (let k = 0; k < 400; k++) hop(); else if (now - hopT > 380) { hopT = now; hop(); }
      const r = rank(), P = pos(), { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); p.querySelector(".pgr-dv").textContent = (+dI.value).toFixed(2);
      links.forEach(k => { const [i, j] = k.split("-").map(Number), a = P[i], b = P[j], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy), nx = -dy / L * 10, ny = dx / L * 10, r1 = 14 + 50 * r[i], r2 = 14 + 50 * r[j];
        const s = [a[0] + dx / L * r1 + nx, a[1] + dy / L * r1 + ny], e = [b[0] - dx / L * (r2 + 4) + nx, b[1] - dy / L * (r2 + 4) + ny];
        ctx.strokeStyle = "rgba(122,168,255,.55)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(...s); ctx.lineTo(...e); ctx.stroke(); const an = Math.atan2(dy, dx); ctx.fillStyle = "rgba(122,168,255,.8)"; ctx.beginPath(); ctx.moveTo(...e); ctx.lineTo(e[0] - 8 * Math.cos(an - .4), e[1] - 8 * Math.sin(an - .4)); ctx.lineTo(e[0] - 8 * Math.cos(an + .4), e[1] - 8 * Math.sin(an + .4)); ctx.fill(); });
      P.forEach((q, i) => { const rad = 14 + 50 * r[i]; ctx.fillStyle = i === sel ? "rgba(255,122,200,.35)" : `rgba(245,196,81,${.15 + r[i]})`; ctx.strokeStyle = i === sel ? C.pink : C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(...q, rad, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = "#fff"; ctx.font = "600 13px 'IBM Plex Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(PG[i], q[0], q[1] + 5); ctx.textAlign = "start"; });
      const k = fast ? 1 : Math.min(1, (now - hopT) / 300), a = P[from], b = P[to]; ctx.fillStyle = C.teal; ctx.shadowColor = C.teal; ctx.shadowBlur = 14; ctx.beginPath(); ctx.arc(a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, 6, 0, 7); ctx.fill(); ctx.shadowBlur = 0;
      const x0 = w * .6, bw = (w - x0 - 14) / n, top = h * .15, bot = h - 34, mx = Math.max(...r, ...visits.map(v => v / Math.max(1, total))) * 1.1;
      ctx.fillStyle = "#cfc9e4"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText("gold: exact PageRank   teal: surfer's share of visits", x0, top - 10);
      for (let i = 0; i < n; i++) { const x = x0 + i * bw, H1 = (bot - top) * r[i] / mx, H2 = (bot - top) * (visits[i] / Math.max(1, total)) / mx; ctx.fillStyle = "rgba(245,196,81,.75)"; ctx.fillRect(x + 2, bot - H1, bw / 2 - 3, H1); ctx.fillStyle = "rgba(63,208,201,.75)"; ctx.fillRect(x + bw / 2, bot - H2, bw / 2 - 3, H2); ctx.fillStyle = "#fff"; ctx.fillText(PG[i], x + bw / 2 - 4, bot + 16); }
      const top3 = r.map((v, i) => [v, PG[i]]).sort((x, y) => y[0] - x[0]);
      out.innerHTML = `PageRank: ${top3.map(([v, nm]) => `${nm} ${(v * 100).toFixed(1)}%`).join("  ")}\nsurfer: ${total.toLocaleString("en")} clicks${sel >= 0 ? `   <span class="g">now click the page ${PG[sel]} should link to (or already links to, to remove it)</span>` : ""}`;
    };
    c.addEventListener("click", e => { const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, P = pos(), i = P.findIndex(q => Math.hypot(q[0] - x, q[1] - y) < 34); if (i < 0) { sel = -1; return; }
      if (sel < 0) sel = i; else { if (sel !== i) { const k = sel + "-" + i; links.has(k) ? links.delete(k) : links.add(k); visits.fill(0); total = 0; } sel = -1; } });
    p.querySelector(".pgr-rs").addEventListener("click", () => { visits.fill(0); total = 0; });
    const fb = p.querySelector(".pgr-fast"); fb.addEventListener("click", () => { fast = !fast; fb.classList.toggle("on", fast); });
    dI.addEventListener("input", () => { visits.fill(0); total = 0; });
  },
  start() { pr.start(); }, stop() { pr.stop(); }
});

/* ================================================================ Gauss's Easter algorithm */
function easterSteps(Y) {
  const a = Y % 19, b = Math.floor(Y / 100), c = Y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
    i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), n = h + l - 7 * m + 114;
  return { a, b, c, d, e, f, g, h, i, k, l, m, month: Math.floor(n / 31), day: n % 31 + 1 };
}
let EHIST = null;
registerAtom({
  id: "easter", name: "The date of Easter", domain: "number", fields: ["elementary-nt"],
  html: `<h3>Computing Easter — the Moon, the week and the calendar in a dozen divisions</h3>
    <p class="ahint">Easter is the first Sunday after the first full moon on or after 21 March — with the "full moon" read from a table, not the sky. Combining the 19-year lunar cycle, the 7-day week and the Gregorian leap-year corrections gives a short chain of divisions with remainder. Pick a year.</p>
    <div class="achips"><label class="achk">year <input type="range" class="ea-y" min="1583" max="2600" value="2026" style="width:220px"> <input class="ea-n" type="number" min="1583" max="999999" value="2026" style="width:90px;font:.72rem 'IBM Plex Mono',monospace;color:var(--ink);background:#140c24;border:1px solid rgba(255,255,255,.18);border-radius:7px;padding:.25rem .4rem"></label></div>
    <canvas class="acv ea-cv"></canvas>
    <div class="aout ea-out"></div>
    <p class="awhy">Carl Friedrich Gauss published a formula for Easter in 1800 (and corrected it in 1816); the version here is the 'anonymous Gregorian algorithm' printed in Nature in 1876 and popularised by Jean Meeus. a = year mod 19 places the year in the Metonic cycle, where 19 solar years almost equal 235 lunar months; h is the age of the Moon on 21 March (the epact); l finds the next Sunday. The pattern of dates repeats only every 5,700,000 years; the chart counts 100,000 years of Easters, and 19 April is the most common date.</p>`,
  build(p) {
    const c = p.querySelector(".ea-cv"), out = p.querySelector(".ea-out"), dims = sized(c, 260), yI = p.querySelector(".ea-y"), nI = p.querySelector(".ea-n");
    function draw(Y) {
      if (!EHIST) { EHIST = new Array(35).fill(0); for (let y = 1583; y < 101583; y++) { const s = easterSteps(y); EHIST[(s.month === 3 ? s.day - 22 : s.day + 9)]++; } }
      const s = easterSteps(Y), idx = s.month === 3 ? s.day - 22 : s.day + 9, { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const L = 30, Rt = w - 10, T = 14, B = h - 30, bw = (Rt - L) / 35, mx = Math.max(...EHIST);
      EHIST.forEach((v, i) => { const H1 = (B - T) * v / mx; ctx.fillStyle = i === idx ? C.gold : i < 10 ? "rgba(63,208,201,.55)" : "rgba(180,140,255,.55)"; ctx.fillRect(L + i * bw + 1, B - H1, bw - 2, H1); });
      ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; [[0, "22 Mar"], [9, "31 Mar"], [10, "1 Apr"], [18, "9 Apr"], [28, "19 Apr"], [34, "25 Apr"]].forEach(([i, t]) => ctx.fillText(t, L + i * bw, B + 14));
      ctx.fillStyle = C.gold; ctx.fillText("▲ " + Y, L + idx * bw - 6, B + 26);
      const M = s.month === 3 ? "March" : "April";
      out.innerHTML = `<span class="g">Easter ${Y}: ${s.day} ${M}</span>\n` +
        `a = Y mod 19 = ${s.a}  (place in the 19-year Moon cycle)      b = ⌊Y/100⌋ = ${s.b}, c = Y mod 100 = ${s.c}\n` +
        `d = ⌊b/4⌋ = ${s.d}, e = b mod 4 = ${s.e}  (century leap years)   f = ⌊(b+8)/25⌋ = ${s.f}, g = ⌊(b−f+1)/3⌋ = ${s.g}  (Moon correction)\n` +
        `h = (19a + b − d − g + 15) mod 30 = <span class="t">${s.h}</span>  (epact: the Moon's age)   i = ⌊c/4⌋ = ${s.i}, k = c mod 4 = ${s.k}\n` +
        `l = (32 + 2e + 2i − h − k) mod 7 = <span class="t">${s.l}</span>  (days to Sunday)   m = ⌊(a + 11h + 22l)/451⌋ = ${s.m}\n` +
        `month = ⌊(h + l − 7m + 114)/31⌋ = ${s.month},  day = (h + l − 7m + 114) mod 31 + 1 = ${s.day}`;
    }
    yI.addEventListener("input", () => { nI.value = yI.value; draw(+yI.value); });
    nI.addEventListener("change", () => { const Y = clamp(Math.round(+nI.value) || 2026, 1583, 999999); nI.value = Y; if (Y <= 2600) yI.value = Y; draw(Y); });
    this._go = () => draw(2026);
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});
})();
