/* ============================================================
   THE WEB OF MATHEMATICS — atoms-puzzles.js
   Puzzles & games (domain: discrete)
     hanoi · nim · fifteen · life · fourcolour
   ============================================================ */
(function () {
"use strict";
const { C, rng } = AtomKit;
const cv = (el, h) => AtomKit.canvas(el, h);
const PAL = [C.gold, C.teal, C.pink, C.blue, C.green, C.violet, C.red, "#ffd9a0"];

/* ---------------------------------------------------------------- Tower of Hanoi */
let hRaf = null;
registerAtom({
  id: "hanoi", name: "Tower of Hanoi", domain: "discrete", fields: ["enumerative", "graph-theory"],
  html: `<h3>Tower of Hanoi — why 2ⁿ − 1 moves, and not one fewer</h3>
    <p class="ahint">Move the whole tower to the right-hand peg. Only the top disc may move, and never onto a smaller one. Click a peg to pick up its top disc, click another to drop it — or let the recursion solve it.</p>
    <div class="achips"><label class="achip" style="cursor:default">discs <input type="range" class="hn-n" min="3" max="9" value="5" style="width:90px;vertical-align:middle"> <b class="hn-nv">5</b></label>
      <button class="achip hn-solve">▶ solve</button><button class="achip hn-reset">reset</button></div>
    <canvas class="acv hn-cv"></canvas>
    <div class="aout hn-out"></div>
    <p class="awhy">To move n discs, first move the top n − 1 out of the way, move the biggest, then move the n − 1 back on top: M(n) = 2M(n − 1) + 1 = 2ⁿ − 1, and no shorter solution exists because the biggest disc must move at least once. Édouard Lucas sold the puzzle in 1883 with a legend of 64 golden discs in a temple; at one move a second they would take 2⁶⁴ − 1 seconds — about 585 billion years. The positions of the puzzle form a graph that looks like the Sierpiński triangle.</p>`,
  build(p) {
    const c = p.querySelector(".hn-cv"), out = p.querySelector(".hn-out"), nI = p.querySelector(".hn-n");
    let n, pegs, moves, held = null, queue = [], t = 0;
    const reset = () => { n = +nI.value; p.querySelector(".hn-nv").textContent = n; pegs = [Array.from({ length: n }, (_, i) => n - i), [], []]; moves = 0; held = null; queue = []; draw(); };
    const solve = (k, a, b, via, acc) => { if (!k) return acc; solve(k - 1, a, via, b, acc); acc.push([a, b]); solve(k - 1, via, b, a, acc); return acc; };
    function draw() {
      const { ctx, w, h } = cv(c, 220), pw = w / 3, base = h - 24, dh = Math.min(18, (h - 60) / (n + 1));
      ctx.fillStyle = "rgba(255,255,255,.15)"; ctx.fillRect(10, base, w - 20, 6);
      for (let k = 0; k < 3; k++) {
        const x = pw * (k + .5); ctx.fillStyle = held === k ? C.gold : "rgba(255,255,255,.25)"; ctx.fillRect(x - 3, base - (n + 1.5) * dh, 6, (n + 1.5) * dh);
        pegs[k].forEach((d, i) => { const ww = 18 + (pw - 34) * d / n; ctx.fillStyle = PAL[(d - 1) % PAL.length]; ctx.globalAlpha = held === k && i === pegs[k].length - 1 ? .5 : 1;
          ctx.beginPath(); ctx.roundRect(x - ww / 2, base - (i + 1) * dh, ww, dh - 2, 5); ctx.fill(); ctx.globalAlpha = 1; });
      }
      const done = pegs[2].length === n;
      out.innerHTML = `moves: <span class="g">${moves}</span>   minimum: 2^${n} − 1 = ${2 ** n - 1}${done ? (moves === 2 ** n - 1 ? '   <span class="t">solved in the minimum!</span>' : '   <span class="t">solved</span>') : ""}`;
    }
    const move = (a, b) => { const top = pegs[a][pegs[a].length - 1]; if (top === undefined) return false; const tb = pegs[b][pegs[b].length - 1]; if (tb !== undefined && tb < top) return false; pegs[b].push(pegs[a].pop()); moves++; return true; };
    c.addEventListener("click", e => { if (queue.length) return; const r = c.getBoundingClientRect(), k = Math.min(2, Math.floor((e.clientX - r.left) / (r.width / 3)));
      if (held === null) { if (pegs[k].length) held = k; } else { if (k !== held) move(held, k); held = null; } draw(); });
    p.querySelector(".hn-solve").addEventListener("click", () => { reset(); queue = solve(n, 0, 2, 1, []); });
    p.querySelector(".hn-reset").addEventListener("click", reset);
    nI.addEventListener("input", reset);
    this._tick = () => { if (queue.length && ++t % Math.max(3, 12 - n) === 0) { const [a, b] = queue.shift(); move(a, b); draw(); } hRaf = requestAnimationFrame(this._tick); };
    reset();
  },
  start() { if (this._tick) hRaf = requestAnimationFrame(this._tick); },
  stop() { if (hRaf) cancelAnimationFrame(hRaf); hRaf = null; }
});

/* ---------------------------------------------------------------- Nim */
registerAtom({
  id: "nim", name: "Nim & the XOR trick", domain: "discrete", fields: ["enumerative"],
  html: `<h3>Nim — a game solved by binary arithmetic</h3>
    <p class="ahint">Take any number of stones from one heap (click a stone: it and everything to its right go). Whoever takes the last stone wins. You move first against the computer. Turn on hints to see the secret.</p>
    <div class="achips"><button class="achip nm-new" data-h="3,4,5">heaps 3 4 5</button><button class="achip nm-new" data-h="1,3,5,7">1 3 5 7</button><button class="achip nm-new" data-h="2,5,6,9">2 5 6 9</button><button class="achip nm-hint">hints</button></div>
    <div class="nm-heaps" style="margin:.6rem 0"></div>
    <div class="aout nm-out"></div>
    <p class="awhy">Write the heap sizes in binary and add them without carrying (XOR). Charles Bouton proved in 1901 that the player to move loses, with best play, exactly when this nim-sum is 0 — and from a nonzero nim-sum there is always a move back to 0. The Sprague–Grundy theorem (1935–39) shows every impartial game is secretly a Nim heap.</p>`,
  build(p) {
    let heaps, hint = false, over = false, msg = "";
    const box = p.querySelector(".nm-heaps"), out = p.querySelector(".nm-out");
    const xr = () => heaps.reduce((a, b) => a ^ b, 0);
    const bin = v => v.toString(2).padStart(4, "0");
    function draw() {
      box.innerHTML = heaps.map((h, i) => `<div style="display:flex;align-items:center;gap:6px;margin:5px 0"><span style="font:11px IBM Plex Mono;color:#9a93b8;min-width:124px;white-space:nowrap">heap ${i + 1}: ${h}${hint ? ` = ${bin(h)}` : ""}</span>${Array.from({ length: h }, (_, j) => `<button data-i="${i}" data-j="${j}" style="width:22px;height:22px;border-radius:50%;border:0;background:${PAL[i % PAL.length]};cursor:pointer;box-shadow:0 0 8px ${PAL[i % PAL.length]}66"></button>`).join("")}</div>`).join("");
      box.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { if (over) return; heaps[+b.dataset.i] = +b.dataset.j; after("you"); }));
      const x = xr();
      out.innerHTML = (hint ? `nim-sum = ${heaps.map(bin).join(" ⊕ ")} = <span class="${x ? "g" : "r"}">${bin(x)}</span>  ${x ? "→ the player to move can win" : "→ the player to move is lost (if the opponent is perfect)"}\n` : "") + msg;
    }
    function after(who) {
      if (heaps.every(h => !h)) { over = true; msg = who === "you" ? '<span class="t">You took the last stone — you win!</span>' : '<span class="r">The computer took the last stone.</span>'; draw(); return; }
      if (who === "you") {
        const x = xr(); let move = null;
        if (x) { heaps.forEach((h, i) => { if (!move && (h ^ x) < h) move = [i, h ^ x]; }); msg = `computer: heap ${move[0] + 1} → ${move[1]} (back to nim-sum 0)`; }
        else { const i = heaps.findIndex(h => h > 0); move = [i, heaps[i] - 1]; msg = `computer: heap ${i + 1} → ${move[1]} (it is in a losing position, stalling)`; }
        heaps[move[0]] = move[1]; after("cpu");
      } else draw();
    }
    const newGame = s => { heaps = s.split(",").map(Number); over = false; msg = "your move"; draw(); };
    p.querySelectorAll(".nm-new").forEach(b => b.addEventListener("click", () => newGame(b.dataset.h)));
    p.querySelector(".nm-hint").addEventListener("click", e => { hint = !hint; e.target.classList.toggle("on", hint); draw(); });
    newGame("3,4,5");
  }
});

/* ---------------------------------------------------------------- 15 puzzle */
registerAtom({
  id: "fifteen", name: "15 puzzle & parity", domain: "discrete", fields: ["group-theory", "enumerative"],
  html: `<h3>The 15 puzzle — half of all positions are impossible</h3>
    <p class="ahint">Click a tile next to the gap to slide it. 'Scramble' makes random legal moves; 'Loyd's challenge' swaps 14 and 15. The invariant below decides, before you start, whether a position can be solved.</p>
    <div class="achips"><button class="achip ft-sc">scramble</button><button class="achip ft-loyd">Loyd's 14–15 challenge</button><button class="achip ft-reset">solved</button></div>
    <div class="ft-grid" style="display:grid;grid-template-columns:repeat(4,56px);gap:5px;margin:.6rem 0"></div>
    <div class="aout ft-out"></div>
    <p class="awhy">Every slide swaps the gap with a tile — an odd permutation of the 16 squares — and moves the gap one step, changing its colour on a chessboard. So (parity of the permutation) + (distance of the gap from its home) never changes parity. Swapping just 14 and 15 flips the first without the second: unsolvable. Johnson and Story proved in 1879 that exactly half of the 16! arrangements can be reached. The 1880 craze was later claimed by Sam Loyd, but the puzzle was Noyes Chapman's.</p>`,
  build(p) {
    let b; const g = p.querySelector(".ft-grid"), out = p.querySelector(".ft-out");
    const reset = () => { b = [...Array(15).keys()].map(i => i + 1).concat(0); draw(); };
    const parity = () => { const a = b.map(v => v || 16); let inv = 0; for (let i = 0; i < 16; i++) for (let j = i + 1; j < 16; j++) if (a[i] > a[j]) inv++; return inv % 2; };
    function draw() {
      g.innerHTML = b.map((v, i) => `<button data-i="${i}" style="height:56px;border-radius:9px;border:1px solid ${v ? "rgba(245,196,81,.5)" : "transparent"};background:${v ? (v === 14 || v === 15 ? "rgba(255,122,200,.18)" : "rgba(245,196,81,.12)") : "transparent"};color:#fff;font:600 18px Fraunces,Georgia;cursor:${v ? "pointer" : "default"}">${v || ""}</button>`).join("");
      g.querySelectorAll("button").forEach(x => x.addEventListener("click", () => slide(+x.dataset.i)));
      const z = b.indexOf(0), dist = (3 - Math.floor(z / 4)) + (3 - z % 4), par = parity(), ok = (par + dist) % 2 === 0, solved = b.every((v, i) => v === (i + 1) % 16);
      out.innerHTML = `permutation parity: ${par ? "odd" : "even"}   gap's distance from home: ${dist}\n${ok ? '<span class="t">invariant even — solvable</span>' : '<span class="r">invariant odd — impossible, however long you try</span>'}${solved ? '   <span class="g">solved!</span>' : ""}`;
    }
    function slide(i) { const z = b.indexOf(0), [r, c2, zr, zc] = [Math.floor(i / 4), i % 4, Math.floor(z / 4), z % 4]; if (Math.abs(r - zr) + Math.abs(c2 - zc) !== 1) return; [b[i], b[z]] = [b[z], b[i]]; draw(); }
    p.querySelector(".ft-sc").addEventListener("click", () => { const r = rng(Date.now() & 0xffff); for (let k = 0; k < 300; k++) { const z = b.indexOf(0), nb = [z - 4, z + 4, z % 4 ? z - 1 : -1, z % 4 < 3 ? z + 1 : -1].filter(x => x >= 0 && x < 16); const i = nb[Math.floor(r() * nb.length)]; [b[i], b[z]] = [b[z], b[i]]; } draw(); });
    p.querySelector(".ft-loyd").addEventListener("click", () => { reset(); [b[13], b[14]] = [b[14], b[13]]; draw(); });
    p.querySelector(".ft-reset").addEventListener("click", reset);
    reset();
  }
});

/* ---------------------------------------------------------------- Game of Life */
const LIFE = {
  glider: [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]],
  "R-pentomino": [[1, 0], [2, 0], [0, 1], [1, 1], [1, 2]],
  acorn: [[1, 0], [3, 1], [0, 2], [1, 2], [4, 2], [5, 2], [6, 2]],
  pulsar: (() => { const s = []; const q = [2, 3, 4]; for (const a of q) for (const [x, y] of [[a, 0], [a, 5], [0, a], [5, a]]) for (const [sx, sy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) s.push([6 + sx * (x + 1), 6 + sy * (y + 1)]); return s; })(),
  "Gosper glider gun": [[24, 0], [22, 1], [24, 1], [12, 2], [13, 2], [20, 2], [21, 2], [34, 2], [35, 2], [11, 3], [15, 3], [20, 3], [21, 3], [34, 3], [35, 3], [0, 4], [1, 4], [10, 4], [16, 4], [20, 4], [21, 4], [0, 5], [1, 5], [10, 5], [14, 5], [16, 5], [17, 5], [22, 5], [24, 5], [10, 6], [16, 6], [24, 6], [11, 7], [15, 7], [12, 8], [13, 8]]
};
let lRaf = null;
registerAtom({
  id: "life", name: "Game of Life", domain: "discrete", fields: ["dynamical-systems", "computability"],
  html: `<h3>Conway's Game of Life — four rules, infinite surprise</h3>
    <p class="ahint">A live cell with 2 or 3 live neighbours survives; a dead cell with exactly 3 comes alive; everything else dies. Click cells to draw, pick a pattern, and press play.</p>
    <div class="achips">${Object.keys(LIFE).map(k => `<button class="achip lf-p" data-k="${k}">${k}</button>`).join("")}<button class="achip lf-p" data-k="random">random soup</button></div>
    <div class="achips"><button class="achip lf-play on">❚❚ pause</button><button class="achip lf-step">step</button><button class="achip lf-clear">clear</button></div>
    <canvas class="acv lf-cv" style="cursor:crosshair"></canvas>
    <div class="aout lf-out"></div>
    <p class="awhy">John Conway designed the rules in 1970 and Martin Gardner's October 1970 column made them famous. Conway offered $50 for a pattern that grows forever; Bill Gosper's team won it within weeks with the glider gun. Gliders can carry signals, so Life can simulate any computer — which makes its long-term fate undecidable, like the halting problem. The R-pentomino, five cells, takes 1,103 generations to settle.</p>`,
  build(p) {
    const W = 96, H = 60; let g = new Uint8Array(W * H), gen = 0, run = true, t = 0;
    const c = p.querySelector(".lf-cv"), out = p.querySelector(".lf-out");
    const place = (k) => { g = new Uint8Array(W * H); gen = 0; if (k === "random") { const r = rng(Date.now() & 0xfffff); for (let i = 0; i < W * H; i++) g[i] = r() < .28; } else { const pat = LIFE[k], mx = Math.max(...pat.map(q => q[0])), my = Math.max(...pat.map(q => q[1])), ox = k === "Gosper glider gun" ? 4 : Math.floor((W - mx) / 2), oy = k === "Gosper glider gun" ? 4 : Math.floor((H - my) / 2); pat.forEach(([x, y]) => g[(oy + y) * W + ox + x] = 1); } draw(); };
    const step = () => { const n = new Uint8Array(W * H); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let s = 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (dx || dy) s += g[((y + dy + H) % H) * W + (x + dx + W) % W]; const a = g[y * W + x]; n[y * W + x] = (a && (s === 2 || s === 3)) || (!a && s === 3) ? 1 : 0; } g = n; gen++; };
    let dims;
    function draw() {
      dims = cv(c, 330); const { ctx, w, h } = dims, s = Math.min(w / W, h / H);
      ctx.fillStyle = "rgba(0,0,0,.2)"; ctx.fillRect(0, 0, W * s, H * s);
      ctx.fillStyle = C.gold; ctx.shadowColor = "rgba(245,196,81,.7)"; ctx.shadowBlur = 6; let pop = 0;
      for (let i = 0; i < W * H; i++) if (g[i]) { pop++; ctx.fillRect((i % W) * s + .5, Math.floor(i / W) * s + .5, s - 1, s - 1); }
      ctx.shadowBlur = 0; out.innerHTML = `generation ${gen}   population ${pop}   <span class="d">(the board wraps around — a torus)</span>`;
    }
    c.addEventListener("click", e => { const r = c.getBoundingClientRect(), s = Math.min(dims.w / W, dims.h / H), x = Math.floor((e.clientX - r.left) / s), y = Math.floor((e.clientY - r.top) / s); if (x < W && y < H) { g[y * W + x] ^= 1; draw(); } });
    p.querySelectorAll(".lf-p").forEach(b => b.addEventListener("click", () => place(b.dataset.k)));
    const pb = p.querySelector(".lf-play"); pb.addEventListener("click", () => { run = !run; pb.textContent = run ? "❚❚ pause" : "▶ play"; pb.classList.toggle("on", run); });
    p.querySelector(".lf-step").addEventListener("click", () => { step(); draw(); });
    p.querySelector(".lf-clear").addEventListener("click", () => { g = new Uint8Array(W * H); gen = 0; draw(); });
    this._tick = () => { if (run && ++t % 4 === 0) { step(); draw(); } lRaf = requestAnimationFrame(this._tick); };
    place("Gosper glider gun");
  },
  start() { if (this._tick) lRaf = requestAnimationFrame(this._tick); },
  stop() { if (lRaf) cancelAnimationFrame(lRaf); lRaf = null; }
});

/* ---------------------------------------------------------------- Four-colour a map */
registerAtom({
  id: "fourcolour", name: "Four-colour a map", domain: "discrete", fields: ["graph-theory"],
  html: `<h3>Four colours suffice — try it yourself</h3>
    <p class="ahint">Click a country to cycle its colour. Neighbours (sharing a border, not just a corner) must differ; clashes glow red. Stuck? Let the computer backtrack, then try to use only three colours.</p>
    <div class="achips"><button class="achip fc-new">new map</button><button class="achip fc-auto">computer: 4-colour it</button><button class="achip fc-clear">clear colours</button></div>
    <canvas class="acv fc-cv" style="cursor:pointer"></canvas>
    <div class="aout fc-out"></div>
    <p class="awhy">Francis Guthrie asked in 1852 whether four colours always suffice. Kempe's 1879 proof stood for eleven years until Heawood found the flaw (and salvaged five colours). Appel and Haken settled it in 1976 by having a computer check 1,936 configurations — the first major theorem proved that way, and one of the red disputes on the map. Some maps really do need four: a country surrounded by an odd ring of neighbours.</p>`,
  build(p) {
    const c = p.querySelector(".fc-cv"), out = p.querySelector(".fc-out"), CL = [C.gold, C.teal, C.pink, C.blue];
    let sites, lab, adj, col, GW, GH, CELL = 5, dims;
    function make() {
      dims = cv(c, 300); const { w, h } = dims; GW = Math.floor(w / CELL); GH = Math.floor(h / CELL);
      const r = rng(Date.now() & 0xffff), n = 22; sites = Array.from({ length: n }, () => [r() * GW, r() * GH]);
      lab = new Int16Array(GW * GH);
      for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) { let b = 0, bd = 1e9; sites.forEach((s, i) => { const d = (s[0] - x) ** 2 + (s[1] - y) ** 2; if (d < bd) { bd = d; b = i; } }); lab[y * GW + x] = b; }
      adj = sites.map(() => new Set());
      for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) { const a = lab[y * GW + x]; if (x + 1 < GW) { const b = lab[y * GW + x + 1]; if (a !== b) { adj[a].add(b); adj[b].add(a); } } if (y + 1 < GH) { const b = lab[(y + 1) * GW + x]; if (a !== b) { adj[a].add(b); adj[b].add(a); } } }
      col = sites.map(() => -1); draw();
    }
    function draw() {
      dims = cv(c, 300); const { ctx } = dims;
      const bad = new Set(); sites.forEach((_, i) => adj[i].forEach(j => { if (col[i] >= 0 && col[i] === col[j]) { bad.add(i); bad.add(j); } }));
      for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) { const i = lab[y * GW + x]; ctx.fillStyle = col[i] < 0 ? "rgba(255,255,255,.06)" : CL[col[i]]; ctx.globalAlpha = col[i] < 0 ? 1 : .78; ctx.fillRect(x * CELL, y * CELL, CELL, CELL); }
      ctx.globalAlpha = 1;
      for (let y = 0; y < GH; y++) for (let x = 0; x < GW; x++) { const i = lab[y * GW + x]; const edge = (x + 1 < GW && lab[y * GW + x + 1] !== i) || (y + 1 < GH && lab[(y + 1) * GW + x] !== i); if (edge) { ctx.fillStyle = bad.has(i) ? "#ff4040" : "#0e0618"; ctx.fillRect(x * CELL, y * CELL, CELL, CELL); } }
      const used = new Set(col.filter(v => v >= 0)).size, done = col.every(v => v >= 0);
      out.innerHTML = `${sites.length} countries · ${adj.reduce((s, a) => s + a.size, 0) / 2} borders · colours used ${used}   ${bad.size ? `<span class="r">${bad.size} countries clash</span>` : done ? `<span class="t">a proper ${used}-colouring!</span>` : ""}`;
    }
    c.addEventListener("click", e => { const r = c.getBoundingClientRect(), x = Math.floor((e.clientX - r.left) / CELL), y = Math.floor((e.clientY - r.top) / CELL); if (x >= GW || y >= GH) return; const i = lab[y * GW + x]; col[i] = col[i] >= 3 ? -1 : col[i] + 1; draw(); });
    p.querySelector(".fc-auto").addEventListener("click", () => {
      const order = sites.map((_, i) => i).sort((a, b) => adj[b].size - adj[a].size), cc = sites.map(() => -1);
      const bt = k => { if (k === order.length) return true; const v = order[k]; for (let q = 0; q < 4; q++) { if ([...adj[v]].some(u => cc[u] === q)) continue; cc[v] = q; if (bt(k + 1)) return true; } cc[v] = -1; return false; };
      bt(0); col = cc; draw();
    });
    p.querySelector(".fc-clear").addEventListener("click", () => { col = sites.map(() => -1); draw(); });
    p.querySelector(".fc-new").addEventListener("click", make);
    this._make = make;
  },
  start() { if (this._make && !this._made) { this._made = true; this._make(); } }
});
})();
