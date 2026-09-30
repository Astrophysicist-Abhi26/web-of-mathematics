/* ============================================================
   THE WEB OF MATHEMATICS — atoms-puzzles2.js
   More puzzles & games (domain: discrete)
     tictactoe · hex · josephus · prisoners · wheat · kruskal
   ============================================================ */
(function () {
"use strict";
const { C, rng } = AtomKit;
function sized(c, h) { let d = AtomKit.canvas(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = AtomKit.canvas(c, h); return d; }; }
function looper() { const L = { raf: null, fn: null, start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } }, stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } }; return L; }

/* ================================================================ Tic-tac-toe with minimax */
const LINES = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const winner = b => { for (const [a, c, d] of LINES) if (b[a] && b[a] === b[c] && b[a] === b[d]) return b[a]; return b.every(Boolean) ? "draw" : null; };
let MEMO = new Map(), NODES = 0;
function minimax(b, turn) { const k = b.map(x => x || "-").join("") + turn; if (MEMO.has(k)) return MEMO.get(k); NODES++; const w = winner(b); let v;
  if (w) v = w === "X" ? 1 : w === "O" ? -1 : 0; else { v = turn === "X" ? -2 : 2; for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = turn; const s = minimax(b, turn === "X" ? "O" : "X"); b[i] = null; v = turn === "X" ? Math.max(v, s) : Math.min(v, s); } }
  MEMO.set(k, v); return v; }
registerAtom({
  id: "tictactoe", name: "Tic-tac-toe, solved", domain: "discrete", fields: ["enumerative", "graph-theory"],
  html: `<h3>Tic-tac-toe — a game you cannot win against perfect play</h3>
    <p class="ahint">You are X and move first; the computer plays perfectly by searching the whole game tree (minimax). Each empty square shows what the square is worth for you if both sides then play perfectly. You will never see a green square.</p>
    <div class="achips"><button class="achip tt-new">new game (you first)</button><button class="achip tt-cpu">new game (computer first)</button><button class="achip tt-hint on">show values</button></div>
    <div class="ttt-board" style="display:grid;grid-template-columns:repeat(3,76px);gap:6px;margin:.6rem 0"></div>
    <div class="aout tt-out"></div>
    <p class="awhy">There are 255,168 possible games and only 5,478 distinct positions; up to symmetry, 765. Minimax (von Neumann, 1928) scores each position as the best result the player to move can force, assuming the opponent does the same. With best play every game is a draw. Checkers was solved the same way in 2007 (Schaeffer: also a draw), after 18 years of computation; chess and Go are far too large.</p>`,
  build(p) {
    const bd = p.querySelector(".ttt-board"), out = p.querySelector(".tt-out"); let b, over, hint = true;
    const cpu = () => { let best = null, bv = 2; for (let i = 0; i < 9; i++) if (!b[i]) { b[i] = "O"; const v = minimax(b, "X"); b[i] = null; if (v < bv) { bv = v; best = i; } } if (best !== null) b[best] = "O"; };
    function draw() {
      const w = winner(b);
      bd.innerHTML = b.map((v, i) => { let val = ""; if (!v && !w && hint) { b[i] = "X"; const s = minimax(b, "O"); b[i] = null; val = s; }
        const col = val === "" ? "rgba(255,255,255,.04)" : val > 0 ? "rgba(87,224,138,.25)" : val < 0 ? "rgba(255,107,90,.22)" : "rgba(245,196,81,.14)";
        return `<button data-i="${i}" style="height:76px;border-radius:10px;border:1px solid rgba(255,255,255,.18);background:${col};color:${v === "X" ? "#f5c451" : "#3fd0c9"};font:600 34px Fraunces,Georgia;cursor:${v || w ? "default" : "pointer"}">${v || (val === "" ? "" : `<span style="font:11px 'IBM Plex Mono';color:#cfc9e4">${val > 0 ? "win" : val < 0 ? "lose" : "draw"}</span>`)}</button>`; }).join("");
      bd.querySelectorAll("button").forEach(x => x.addEventListener("click", () => { const i = +x.dataset.i; if (b[i] || winner(b)) return; b[i] = "X"; if (!winner(b)) cpu(); draw(); }));
      out.innerHTML = w ? (w === "draw" ? '<span class="g">a draw — the only result against perfect play</span>' : w === "O" ? '<span class="r">the computer wins: every red square was a mistake</span>' : '<span class="t">you win?!</span>') :
        `squares show the result of playing there, if both sides are perfect afterwards   <span class="d">(${MEMO.size.toLocaleString("en")} positions searched and remembered)</span>`;
    }
    const start = first => { b = Array(9).fill(null); if (first) cpu(); draw(); };
    p.querySelector(".tt-new").addEventListener("click", () => start(false)); p.querySelector(".tt-cpu").addEventListener("click", () => start(true));
    p.querySelector(".tt-hint").addEventListener("click", e => { hint = !hint; e.target.classList.toggle("on", hint); draw(); });
    start(false);
  }
});

/* ================================================================ Hex */
registerAtom({
  id: "hex", name: "Hex", domain: "discrete", fields: ["graph-theory", "point-set-topology"],
  html: `<h3>Hex — the game that can never end in a draw</h3>
    <p class="ahint">Gold wants a chain of stones joining the top and bottom edges; teal wants to join left and right. Take turns clicking cells (two players at one screen). Fill the whole board any way you like: exactly one player will always have a winning chain.</p>
    <div class="achips"><button class="achip hx-new">new game</button><button class="achip hx-fill">fill the rest at random</button><label class="achk">size <input type="range" class="hx-n" min="5" max="13" value="9"> <b class="hx-nv"></b></label></div>
    <canvas class="acv hx-cv" style="cursor:pointer"></canvas>
    <div class="aout hx-out"></div>
    <p class="awhy">Piet Hein invented Hex in 1942 and John Nash rediscovered it at Princeton in 1948. A full board always has exactly one winner — a statement equivalent to the Brouwer fixed-point theorem (David Gale, 1979). Nash's strategy-stealing argument proves the first player can always win, yet no one knows how on large boards: the argument shows a winning strategy exists without giving it.</p>`,
  build(p) {
    const c = p.querySelector(".hx-cv"), out = p.querySelector(".hx-out"), dims = sized(c, 400), nI = p.querySelector(".hx-n"); let N, B, turn, win, path;
    const geo = () => { const { w, h } = dims(), s = Math.min((w - 40) / (N * 1.5 + N * .75), (h - 30) / (N * 1.5)) * .98; return { s, x0: 20 + s, y0: 14 + s }; };
    const ctr = (r, q, g) => [g.x0 + (q + r * .5) * g.s * 1.732, g.y0 + r * g.s * 1.5];
    const nb = (r, q) => [[r - 1, q], [r - 1, q + 1], [r, q - 1], [r, q + 1], [r + 1, q - 1], [r + 1, q]].filter(([a, b]) => a >= 0 && b >= 0 && a < N && b < N);
    function check(pl) { const seen = new Set(), prev = new Map(), q = []; for (let i = 0; i < N; i++) { const s = pl === 1 ? [0, i] : [i, 0]; if (B[s[0]][s[1]] === pl) { q.push(s); seen.add(s + ""); } }
      while (q.length) { const [r, cq] = q.shift(); if ((pl === 1 && r === N - 1) || (pl === 2 && cq === N - 1)) { const P = [[r, cq]]; let k = r + "," + cq; while (prev.has(k)) { k = prev.get(k); P.push(k.split(",").map(Number)); } return P; } for (const [a, b] of nb(r, cq)) if (B[a][b] === pl && !seen.has(a + "," + b)) { seen.add(a + "," + b); prev.set(a + "," + b, r + "," + cq); q.push([a, b]); } } return null; }
    function draw() {
      const { ctx, w, h } = dims(), g = geo(); ctx.clearRect(0, 0, w, h); p.querySelector(".hx-nv").textContent = N;
      const onPath = new Set((path || []).map(x => x + ""));
      for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) { const [x, y] = ctr(r, q, g); ctx.beginPath(); for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; ctx.lineTo(x + g.s * Math.cos(a), y + g.s * Math.sin(a)); } ctx.closePath();
        const v = B[r][q]; ctx.fillStyle = v === 1 ? C.gold : v === 2 ? C.teal : "rgba(255,255,255,.05)"; ctx.globalAlpha = v && path && !onPath.has(r + "," + q) ? .45 : 1; ctx.fill(); ctx.globalAlpha = 1; ctx.strokeStyle = "rgba(14,6,24,.9)"; ctx.lineWidth = 2; ctx.stroke(); }
      const [a1] = [ctr(0, 0, g)], a2 = ctr(0, N - 1, g), b1 = ctr(N - 1, 0, g), b2 = ctr(N - 1, N - 1, g);
      ctx.lineWidth = 5; ctx.strokeStyle = C.gold; ctx.beginPath(); ctx.moveTo(a1[0], a1[1] - g.s * 1.2); ctx.lineTo(a2[0], a2[1] - g.s * 1.2); ctx.moveTo(b1[0], b1[1] + g.s * 1.2); ctx.lineTo(b2[0], b2[1] + g.s * 1.2); ctx.stroke();
      ctx.strokeStyle = C.teal; ctx.beginPath(); ctx.moveTo(a1[0] - g.s * 1.3, a1[1]); ctx.lineTo(b1[0] - g.s * 1.3, b1[1]); ctx.moveTo(a2[0] + g.s * 1.3, a2[1]); ctx.lineTo(b2[0] + g.s * 1.3, b2[1]); ctx.stroke();
      out.innerHTML = win ? `<span class="${win === 1 ? "g" : "t"}">${win === 1 ? "gold" : "teal"} joins its sides!</span>   <span class="d">the winning chain is highlighted</span>` : `${turn === 1 ? '<span class="g">gold</span> (top–bottom)' : '<span class="t">teal</span> (left–right)'} to move`;
    }
    function play(r, q) { if (win || B[r][q]) return; B[r][q] = turn; path = check(turn); if (path) win = turn; turn = 3 - turn; draw(); }
    const reset = () => { N = +nI.value; B = [...Array(N)].map(() => Array(N).fill(0)); turn = 1; win = 0; path = null; draw(); };
    c.addEventListener("click", e => { const r0 = c.getBoundingClientRect(), x = e.clientX - r0.left, y = e.clientY - r0.top, g = geo(); let best = null, bd = 1e9; for (let r = 0; r < N; r++) for (let q = 0; q < N; q++) { const [cx, cy] = ctr(r, q, g), d = Math.hypot(cx - x, cy - y); if (d < bd) { bd = d; best = [r, q]; } } if (best && bd < g.s) play(...best); });
    p.querySelector(".hx-new").addEventListener("click", reset); nI.addEventListener("change", reset);
    p.querySelector(".hx-fill").addEventListener("click", () => { const R = rng(Date.now() & 0xffff); const empty = []; B.forEach((row, r) => row.forEach((v, q) => { if (!v) empty.push([r, q]); })); empty.sort(() => R() - .5); for (const [r, q] of empty) { if (win) break; play(r, q); } });
    this._go = reset;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Josephus */
const jo = looper();
registerAtom({
  id: "josephus", name: "The Josephus problem", domain: "discrete", fields: ["enumerative", "elementary-nt"],
  html: `<h3>The Josephus problem — where to stand in the circle</h3>
    <p class="ahint">n people stand in a circle. Going round, every second person is eliminated until one remains. Where should you stand to survive? Watch it play out, then look at the pattern in binary.</p>
    <div class="achips"><label class="achk">people n <input type="range" class="jo-n" min="2" max="64" value="41"> <b class="jo-nv"></b></label><label class="achk">every k-th <input type="range" class="jo-k" min="2" max="5" value="2"> <b class="jo-kv"></b></label><button class="achip jo-go">▶ run</button></div>
    <canvas class="acv jo-cv"></canvas>
    <div class="aout jo-out"></div>
    <p class="awhy">The historian Flavius Josephus (1st century) tells of surviving a suicide pact in a cave by his choice of position. For every second person, write n = 2ᵐ + ℓ with 0 ≤ ℓ &lt; 2ᵐ; the survivor is J(n) = 2ℓ + 1 — in binary, move the leading 1 of n to the end. For general k there is the recurrence J(n, k) = (J(n − 1, k) + k) mod n.</p>`,
  build(p) {
    const c = p.querySelector(".jo-cv"), out = p.querySelector(".jo-out"), dims = sized(c, 340), nI = p.querySelector(".jo-n"), kI = p.querySelector(".jo-k");
    let alive, order, idx, last = 0, run = false;
    const surv = (n, k) => { let s = 0; for (let m = 2; m <= n; m++) s = (s + k) % m; return s + 1; };
    const reset = () => { const n = +nI.value, k = +kI.value; alive = [...Array(n).keys()]; order = []; let pos = 0; const a = alive.slice(); while (a.length > 1) { pos = (pos + k - 1) % a.length; order.push(a[pos]); a.splice(pos, 1); } idx = 0; run = false; };
    jo.fn = () => {
      const n = +nI.value, k = +kI.value; p.querySelector(".jo-nv").textContent = n; p.querySelector(".jo-kv").textContent = k;
      const now = performance.now(); if (run && idx < order.length && now - last > Math.max(60, 900 / n)) { last = now; idx++; }
      const dead = new Set(order.slice(0, idx)), { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const cx = w * .3, cy = h / 2, R = Math.min(w * .22, h * .4), S = surv(n, k);
      for (let i = 0; i < n; i++) { const a = -Math.PI / 2 + 2 * Math.PI * i / n, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a), isS = idx >= order.length && i === S - 1;
        ctx.fillStyle = dead.has(i) ? "rgba(255,107,90,.25)" : isS ? C.gold : C.teal; ctx.beginPath(); ctx.arc(x, y, n > 40 ? 5 : 8, 0, 7); ctx.fill(); if (n <= 41) { ctx.fillStyle = "#cfc9e4"; ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(i + 1, cx + (R + 16) * Math.cos(a), cy + (R + 16) * Math.sin(a) + 3); ctx.textAlign = "start"; } }
      const x0 = w * .6; ctx.fillStyle = "#cfc9e4"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText("n    binary     survivor (k = 2)", x0, 24);
      for (let m = 1; m <= 16; m++) { const s = surv(m, 2); ctx.fillStyle = m === n ? C.gold : "#9a93b8"; ctx.fillText(`${String(m).padStart(2)}   ${m.toString(2).padStart(6)}  →  ${s.toString(2).padStart(6)} = ${s}`, x0, 24 + 18 * m); }
      out.innerHTML = `n = ${n}, eliminating every ${k === 2 ? "second" : k + "th"} person: the survivor stands in position <span class="g">${S}</span>` + (k === 2 ? `   (${n} = ${n.toString(2)} in binary → move the leading 1 to the end → ${S.toString(2)} = ${S})` : "");
    };
    [nI, kI].forEach(i => i.addEventListener("input", reset)); p.querySelector(".jo-go").addEventListener("click", () => { reset(); run = true; });
    reset();
  },
  start() { jo.start(); }, stop() { jo.stop(); }
});

/* ================================================================ 100 prisoners */
registerAtom({
  id: "prisoners", name: "100 prisoners & 100 drawers", domain: "discrete", fields: ["enumerative", "prob-spaces"],
  html: `<h3>The 100 prisoners — 31% chance from a seemingly hopeless task</h3>
    <p class="ahint">100 numbered prisoners, 100 drawers, each hiding one number at random. Each prisoner may open 50 drawers; all go free only if every one finds their own number. Opening drawers at random, the chance is (1/2)¹⁰⁰. Follow the loop instead — open the drawer with your own number, then the drawer named by the number inside, and so on — and it jumps to about 31%.</p>
    <div class="achips"><button class="achip pz-one">one random room</button><button class="achip pz-many">run 10,000 rooms</button></div>
    <canvas class="acv pz-cv"></canvas>
    <div class="aout pz-out"></div>
    <p class="awhy">Following the numbers traces the cycles of a random permutation. Everyone succeeds exactly when no cycle is longer than 50, which happens with probability 1 − (1/51 + 1/52 + … + 1/100) ≈ 1 − ln 2 ≈ 0.3118 — and remarkably it barely depends on the number of prisoners. Posed by Anna Gál and Peter Bro Miltersen (2003); Eugene Curtin and Max Warshauer proved the loop strategy is optimal (2006).</p>`,
  build(p) {
    const c = p.querySelector(".pz-cv"), out = p.querySelector(".pz-out"), dims = sized(c, 340); let R = rng(Date.now() & 0xffff), sim = null;
    const perm = () => { const a = [...Array(100).keys()]; for (let i = 99; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const cycles = a => { const seen = new Array(100).fill(false), cs = []; for (let i = 0; i < 100; i++) if (!seen[i]) { const cyc = []; let j = i; while (!seen[j]) { seen[j] = true; cyc.push(j); j = a[j]; } cs.push(cyc); } return cs.sort((x, y) => y.length - x.length); };
    function one() {
      const cs = cycles(perm()), { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); let x = 20, y = 20; const ok = cs[0].length <= 50;
      cs.forEach((cyc, k) => { const r = 9 + Math.sqrt(cyc.length) * 8.5; if (x + 2 * r > w - 10) { x = 20; y += 2 * r + 30; } const cx = x + r, cy = y + r, col = cyc.length > 50 ? C.red : [C.gold, C.teal, C.pink, C.blue, C.green, C.violet][k % 6];
        cyc.forEach((_, i) => { const a = 2 * Math.PI * i / cyc.length; ctx.fillStyle = col; ctx.beginPath(); ctx.arc(cx + r * Math.cos(a), cy + r * Math.sin(a), 2.6, 0, 7); ctx.fill(); });
        ctx.strokeStyle = col; ctx.globalAlpha = .45; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; ctx.fillStyle = "#fff"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(cyc.length, cx, cy + 4); ctx.textAlign = "start"; x += 2 * r + 16; });
      out.innerHTML = `cycle lengths: ${cs.map(c2 => c2.length).join(", ")}\nlongest cycle ${cs[0].length}: ${ok ? '<span class="t">everyone finds their number within 50 drawers — freedom</span>' : '<span class="r">longer than 50, so everyone on that cycle fails</span>'}${sim ? `\n10,000 rooms: success ${(sim * 100).toFixed(1)}%   theory 1 − (1/51 + … + 1/100) = 31.18%` : ""}`;
    }
    p.querySelector(".pz-one").addEventListener("click", one);
    p.querySelector(".pz-many").addEventListener("click", () => { let s = 0; for (let t = 0; t < 10000; t++) if (cycles(perm())[0].length <= 50) s++; sim = s / 10000; one(); });
    this._go = one;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Wheat and chessboard */
registerAtom({
  id: "wheat", name: "Wheat and the chessboard", domain: "discrete", fields: ["enumerative"],
  html: `<h3>Wheat on a chessboard — how fast doubling grows</h3>
    <p class="ahint">One grain on the first square, two on the second, four on the third… doubling each time. Hover over the board. The last square alone holds more than all the squares before it put together.</p>
    <canvas class="acv wh-cv"></canvas>
    <div class="aout wh-out"></div>
    <p class="awhy">The legend, told of the inventor of chess and an Indian king, is at least a thousand years old (al-Masudi, 10th century; Ibn Khallikan, 1256). The total is 1 + 2 + 4 + … + 2⁶³ = 2⁶⁴ − 1 = 18,446,744,073,709,551,615 grains — about 1,200 billion tonnes of wheat, more than a thousand years of today's world harvest. The same 2⁶⁴ − 1 is the largest number a 64-bit computer word can hold.</p>`,
  build(p) {
    const c = p.querySelector(".wh-cv"), out = p.querySelector(".wh-out"), dims = sized(c, 380); let hov = 63;
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const s = Math.min((h - 20) / 8, w * .45 / 8), x0 = 14, y0 = 10;
      for (let i = 0; i < 64; i++) { const r = Math.floor(i / 8), q = i % 8, x = x0 + q * s, y = y0 + (7 - r) * s, t = i / 63; ctx.fillStyle = (r + q) % 2 ? "#2a1d46" : "#3b2a5e"; ctx.fillRect(x, y, s, s);
        ctx.fillStyle = `hsla(${45 - 30 * t},90%,${40 + 25 * t}%,${.15 + .85 * t})`; const rr = s * .45 * Math.pow(t, .6); ctx.beginPath(); ctx.arc(x + s / 2, y + s / 2, Math.max(1, rr), 0, 7); ctx.fill(); if (i === hov) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.strokeRect(x + 1, y + 1, s - 2, s - 2); } }
      const bx0 = x0 + 8 * s + 30, bw = w - bx0 - 14, bh = h - 40; ctx.fillStyle = "#cfc9e4"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText("log₁₀ of the grains on each square", bx0, 16);
      for (let i = 0; i < 64; i++) { const v = i * Math.log10(2), hh = bh * v / 19.3; ctx.fillStyle = i === hov ? C.gold : "rgba(63,208,201,.6)"; ctx.fillRect(bx0 + bw * i / 64, h - 20 - hh, bw / 64 - 1, hh); }
      const g = 2n ** BigInt(hov), tot = 2n ** BigInt(hov + 1) - 1n, tonnes = Number(tot) * 6.5e-8 / 1000;
      out.innerHTML = `square ${hov + 1}: 2^${hov} = <span class="g">${g.toLocaleString("en")}</span> grains   all squares up to here: 2^${hov + 1} − 1 = ${tot.toLocaleString("en")}\n≈ ${tonnes < 1 ? (tonnes * 1000).toFixed(tonnes < .001 ? 4 : 1) + " kg" : tonnes.toLocaleString("en", { maximumFractionDigits: 0 }) + " tonnes"} of wheat (65 mg a grain)${hov === 63 ? "   — about 1,600 years of the world's wheat harvest" : ""}`;
    }
    c.addEventListener("mousemove", e => { const r = c.getBoundingClientRect(), { h, w } = dims(), s = Math.min((h - 20) / 8, w * .45 / 8), q = Math.floor((e.clientX - r.left - 14) / s), rr = 7 - Math.floor((e.clientY - r.top - 10) / s); if (q >= 0 && q < 8 && rr >= 0 && rr < 8) { hov = rr * 8 + q; draw(); } });
    this._go = draw;
  },
  start() { if (this._go) this._go(); }
});

/* ================================================================ Kruskal count */
registerAtom({
  id: "kruskal", name: "The Kruskal count", domain: "discrete", fields: ["prob-spaces", "enumerative"],
  html: `<h3>The Kruskal count — a card trick that reads your mind by probability</h3>
    <p class="ahint">Deal a shuffled deck in a row. Secretly pick one of the first ten cards and count forward by its value (picture cards count 5), land on a new card, count again, and so on until you run off the end. Remember your last card. The magician, starting anywhere, usually ends on the same card — because different paths tend to merge and then stay together.</p>
    <div class="achips"><button class="achip kr-d">deal a new deck</button><span class="achk">your starting card:</span>${[...Array(10)].map((_, i) => `<button class="achip kr-s" data-i="${i}">${i + 1}</button>`).join("")}<button class="achip kr-sim">odds over 10,000 decks</button></div>
    <canvas class="acv kr-cv"></canvas>
    <div class="aout kr-out"></div>
    <p class="awhy">Martin Kruskal described the trick in the 1970s (popularised by Martin Gardner). Two walks through the deck meet with high probability, and once they land on the same card they move together for ever — the same "coupling" idea that proves Markov chains mix. With a single deck and picture cards worth 5 the magician succeeds most of the time; longer decks make it more certain. Codebreakers use the same effect in Pollard's kangaroo algorithm for discrete logarithms.</p>`,
  build(p) {
    const c = p.querySelector(".kr-cv"), out = p.querySelector(".kr-out"), dims = sized(c, 260); let deck, start = 0, R = rng(Date.now() & 0xffff), odds = null;
    const val = v => v > 10 ? 5 : v, name = v => ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"][v - 1];
    const deal = () => { deck = []; for (let s = 0; s < 4; s++) for (let v = 1; v <= 13; v++) deck.push(v); for (let i = 51; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [deck[i], deck[j]] = [deck[j], deck[i]]; } };
    const walk = (d, s) => { const P = [s]; let i = s; while (i + val(d[i]) < d.length) { i += val(d[i]); P.push(i); } return P; };
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const cw = (w - 20) / 26, rows = [0, 1], you = walk(deck, start), mag = walk(deck, 0), ys = new Set(you), ms = new Set(mag);
      deck.forEach((v, i) => { const r = Math.floor(i / 26), q = i % 26, x = 10 + q * cw, y = 30 + r * 110, inY = ys.has(i), inM = ms.has(i);
        ctx.fillStyle = inY && inM ? "rgba(245,196,81,.35)" : inY ? "rgba(63,208,201,.28)" : inM ? "rgba(255,122,200,.25)" : "rgba(255,255,255,.06)"; ctx.fillRect(x + 1, y, cw - 2, 60); ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.strokeRect(x + 1, y, cw - 2, 60);
        ctx.fillStyle = [1, 2].includes(Math.floor(i * 7 % 4)) ? "#ff8f7a" : "#e8e4f4"; ctx.font = "600 12px 'IBM Plex Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(name(v), x + cw / 2, y + 34); ctx.textAlign = "start"; });
      const pathLine = (P, col, off) => { ctx.strokeStyle = col; ctx.lineWidth = 2; ctx.beginPath(); P.forEach((i, k) => { const r = Math.floor(i / 26), q = i % 26, x = 10 + q * cw + cw / 2, y = 30 + r * 110 + off; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke(); };
      pathLine(you, C.teal, -8); pathLine(mag, C.pink, 68);
      const same = you[you.length - 1] === mag[mag.length - 1];
      out.innerHTML = `your path (teal) from card ${start + 1} ends on card ${you[you.length - 1] + 1} (${name(deck[you[you.length - 1]])})   the magician (pink) from card 1 ends on card ${mag[mag.length - 1] + 1}   ${same ? '<span class="g">same card — trick works</span>' : '<span class="r">different — the trick failed this time</span>'}` + (odds !== null ? `\nover 10,000 decks, with you starting at a random one of the first ten cards: the magician is right ${(odds * 100).toFixed(1)}% of the time` : "");
    }
    p.querySelector(".kr-d").addEventListener("click", () => { deal(); draw(); });
    p.querySelectorAll(".kr-s").forEach(b => b.addEventListener("click", () => { start = +b.dataset.i; p.querySelectorAll(".kr-s").forEach(x => x.classList.toggle("on", x === b)); draw(); }));
    p.querySelector(".kr-sim").addEventListener("click", () => { let ok = 0; for (let t = 0; t < 10000; t++) { deal(); const a = walk(deck, Math.floor(R() * 10)), b = walk(deck, 0); if (a[a.length - 1] === b[b.length - 1]) ok++; } odds = ok / 10000; deal(); draw(); });
    deal(); this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});
})();
