/* ============================================================
   THE WEB OF MATHEMATICS — atoms-discrete.js
   Playable atoms for Discrete & Combinatorics:
     · Königsberg & Euler paths        (Graph Theory, Low-Dim Topology)
     · The Ramsey party                (Ramsey Theory)
     · Pascal's triangle mod m         (Enumerative Combinatorics)
     · Partitions & Young diagrams     (Partition Theory)
   ============================================================ */
(function () {
"use strict";
if (!window.registerAtom) return;
const { canvas, C } = AtomKit;
const $$ = (root, s) => root.querySelector(s);

/* ============================================================
   1) KÖNIGSBERG & EULER PATHS
   ============================================================ */
(function () {
  const GRAPHS = {
    konigsberg: { name: "Königsberg, 1736", labels: ["North bank", "Kneiphof island", "South bank", "East island"],
      nodes: [[.46, .14], [.38, .5], [.46, .86], [.82, .5]],
      edges: [[0, 1, -.35], [0, 1, .35], [1, 2, -.35], [1, 2, .35], [1, 3, 0], [0, 3, .15], [2, 3, -.15]] },
    envelope: { name: "house of Nikolaus", nodes: [[.3, .85], [.7, .85], [.3, .45], [.7, .45], [.5, .12]],
      edges: [[0, 1, 0], [0, 2, 0], [1, 3, 0], [2, 3, 0], [0, 3, 0], [1, 2, 0], [2, 4, 0], [3, 4, 0]] },
    k5: { name: "K₅", nodes: [0, 1, 2, 3, 4].map(i => [.5 + .36 * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / 5), .5 + .38 * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / 5)]),
      edges: [[0, 1], [0, 2], [0, 3], [0, 4], [1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]].map(e => [e[0], e[1], 0]) },
    cube: { name: "cube", nodes: [[.25, .25], [.65, .25], [.25, .7], [.65, .7], [.38, .12], [.78, .12], [.38, .57], [.78, .57]].map(p => [p[0], p[1] + .12]),
      edges: [[0, 1], [0, 2], [1, 3], [2, 3], [4, 5], [4, 6], [5, 7], [6, 7], [0, 4], [1, 5], [2, 6], [3, 7]].map(e => [e[0], e[1], 0]) }
  };
  let st = { g: "konigsberg", path: [], used: new Set(), cur: null, anim: 0 }, cv;
  const G = () => GRAPHS[st.g];
  const deg = g => { const d = g.nodes.map(() => 0); g.edges.forEach(([a, b]) => { d[a]++; d[b]++; }); return d; };
  function geom(W, H) { return G().nodes.map(([x, y]) => [30 + x * (W - 60), 20 + y * (H - 40)]); }
  function edgePath(P, e) {
    const [a, b, k] = e, A = P[a], B = P[b], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, dx = B[0] - A[0], dy = B[1] - A[1];
    return { A, B, cx: mx - dy * k, cy: my + dx * k };
  }
  function draw(pane) {
    const g = G(), { ctx, w: W, h: H } = canvas(cv, 320);
    ctx.clearRect(0, 0, W, H);
    const P = geom(W, H), d = deg(g);
    if (st.g === "konigsberg") {
      // the river Pregel, faintly
      ctx.fillStyle = "rgba(79,140,255,.12)";
      ctx.beginPath(); ctx.moveTo(0, H * .3); ctx.bezierCurveTo(W * .3, H * .26, W * .6, H * .36, W, H * .34); ctx.lineTo(W, H * .66); ctx.bezierCurveTo(W * .6, H * .64, W * .3, H * .74, 0, H * .7); ctx.closePath(); ctx.fill();
    }
    g.edges.forEach((e, i) => {
      const q = edgePath(P, e), used = st.used.has(i);
      ctx.strokeStyle = used ? C.gold : "rgba(232,228,244,.55)"; ctx.lineWidth = used ? 4 : 2.2;
      ctx.beginPath(); ctx.moveTo(q.A[0], q.A[1]); ctx.quadraticCurveTo(q.cx, q.cy, q.B[0], q.B[1]); ctx.stroke();
    });
    ctx.lineWidth = 1;
    P.forEach((p, i) => {
      const odd = d[i] % 2;
      ctx.fillStyle = i === st.cur ? "#fff" : odd ? C.red : C.teal;
      ctx.beginPath(); ctx.arc(p[0], p[1], 13, 0, 7); ctx.fill();
      ctx.fillStyle = "#120b22"; ctx.font = "bold 11px IBM Plex Mono, monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(d[i], p[0], p[1] + .5);
      if (g.labels) { ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono, monospace"; ctx.fillText(g.labels[i], p[0], p[1] + (p[1] > H / 2 ? 24 : -22)); }
    });
    ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
    const odd = d.filter(x => x % 2).length;
    const verdict = odd === 0 ? `every vertex has even degree → an <span class="t">Euler circuit</span> exists (start anywhere, end where you began)`
      : odd === 2 ? `exactly two odd vertices → an <span class="t">Euler path</span> exists, from one red vertex to the other`
      : `${odd} vertices of odd degree → <span class="r">no walk</span> uses every edge exactly once (Euler, 1736)`;
    $$(pane, ".kb-out").innerHTML = `degrees: ${d.join(", ")} (red = odd) — ${verdict}\n` +
      (st.path.length ? `your walk: ${st.path.map(i => i + 1).join(" → ")}   · ${st.used.size}/${g.edges.length} edges used` : `Click a vertex to start walking; click neighbours to cross edges.`);
  }
  function hierholzer(g) {
    const d = deg(g), odd = d.map((x, i) => x % 2 ? i : -1).filter(i => i >= 0);
    if (odd.length !== 0 && odd.length !== 2) return null;
    const adj = g.nodes.map(() => []); g.edges.forEach(([a, b], i) => { adj[a].push([b, i]); adj[b].push([a, i]); });
    const used = new Set(), stack = [odd.length ? odd[0] : 0], estack = [null], path = [], epath = [];
    while (stack.length) {
      const v = stack[stack.length - 1], nxt = adj[v].find(([, i]) => !used.has(i));
      if (nxt) { used.add(nxt[1]); stack.push(nxt[0]); estack.push(nxt[1]); }
      else { path.push(stack.pop()); epath.push(estack.pop()); }
    }
    return { path: path.reverse(), edges: epath.reverse().slice(1) };
  }
  registerAtom({
    id: "konigsberg", name: "Königsberg bridges", domain: "discrete", fields: ["graph-theory", "low-dim-topology"],
    html: `<h3>The bridges of Königsberg — where graph theory began (Euler, 1736)</h3>
      <p class="ahint">Can you walk through the city crossing each of the seven bridges exactly once? Euler threw away the map and kept only who-connects-to-whom. Each time you pass through a land mass you use two bridges, so every stop in the middle of the walk needs an even number of bridges. Königsberg has four odd ones.</p>
      <div class="achips">${Object.entries(GRAPHS).map(([k, g]) => `<button class="achip" data-g="${k}">${g.name}</button>`).join("")}</div>
      <canvas class="acv" style="cursor:pointer"></canvas>
      <div class="abar"><button class="abtn" data-b="undo">undo</button><button class="abtn" data-b="reset">reset walk</button><button class="abtn" data-b="solve">show an Euler path</button></div>
      <div class="aout kb-out"></div>
      <p class="awhy">Today's Kaliningrad has only five of those bridges — and now an Euler path exists. The same parity argument designs snow-plough and postal routes (the Chinese postman problem).</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      const reset = () => { st.path = []; st.used = new Set(); st.cur = null; clearInterval(st.anim); };
      pane.querySelectorAll(".achip[data-g]").forEach(b => b.addEventListener("click", () => {
        st.g = b.dataset.g; reset(); pane.querySelectorAll(".achip[data-g]").forEach(x => x.classList.toggle("on", x === b)); draw(pane);
      }));
      $$(pane, "[data-b=reset]").addEventListener("click", () => { reset(); draw(pane); });
      $$(pane, "[data-b=undo]").addEventListener("click", () => {
        clearInterval(st.anim);
        if (st.path.length <= 1) { reset(); draw(pane); return; }
        st.path.pop(); st.cur = st.path[st.path.length - 1];
        const arr = [...st.used]; arr.pop(); st.used = new Set(arr); draw(pane);
      });
      $$(pane, "[data-b=solve]").addEventListener("click", () => {
        reset(); const sol = hierholzer(G());
        if (!sol) { draw(pane); $$(pane, ".kb-out").innerHTML += `\n<span class="r">Impossible</span> — no Euler path to show. Try removing a bridge in your head: with two odd land masses it works.`; return; }
        let k = 0; st.path = [sol.path[0]]; st.cur = sol.path[0]; draw(pane);
        st.anim = setInterval(() => { if (k >= sol.edges.length) return clearInterval(st.anim); st.used.add(sol.edges[k]); st.path.push(sol.path[k + 1]); st.cur = sol.path[k + 1]; k++; draw(pane); }, 450);
      });
      cv.addEventListener("click", e => {
        const r = cv.getBoundingClientRect(), P = geom(r.width, 320), x = e.clientX - r.left, y = e.clientY - r.top;
        const i = P.findIndex(p => Math.hypot(p[0] - x, p[1] - y) < 18); if (i < 0) return;
        clearInterval(st.anim);
        if (st.cur === null) { st.cur = i; st.path = [i]; draw(pane); return; }
        const ei = G().edges.findIndex(([a, b], k) => !st.used.has(k) && ((a === st.cur && b === i) || (b === st.cur && a === i)));
        if (ei < 0) return;
        st.used.add(ei); st.path.push(i); st.cur = i; draw(pane);
        if (st.used.size === G().edges.length) $$(pane, ".kb-out").innerHTML += `\n<span class="g">You crossed every edge exactly once!</span>`;
      });
      pane.querySelector(`.achip[data-g="konigsberg"]`).classList.add("on");
    },
    start(pane) { draw(pane); },
    stop() { clearInterval(st.anim); }
  });
})();

/* ============================================================
   2) THE RAMSEY PARTY
   ============================================================ */
(function () {
  let st = { n: 6, col: {}, turn: 1 }, cv;
  const key = (i, j) => i < j ? i + "-" + j : j + "-" + i;
  function nodes(W, H) { const R = Math.min(W, H) * .38; return Array.from({ length: st.n }, (_, i) => [W / 2 + R * Math.cos(-Math.PI / 2 + i * 2 * Math.PI / st.n), H / 2 + R * Math.sin(-Math.PI / 2 + i * 2 * Math.PI / st.n)]); }
  function monoTriangles() {
    const out = [];
    for (let a = 0; a < st.n; a++) for (let b = a + 1; b < st.n; b++) for (let c = b + 1; c < st.n; c++) {
      const x = st.col[key(a, b)], y = st.col[key(b, c)], z = st.col[key(a, c)];
      if (x && x === y && y === z) out.push([a, b, c, x]);
    }
    return out;
  }
  function draw(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 320);
    ctx.clearRect(0, 0, W, H);
    const P = nodes(W, H), tri = monoTriangles();
    tri.forEach(([a, b, c, x]) => { ctx.fillStyle = x === 1 ? "rgba(255,120,71,.18)" : "rgba(79,140,255,.2)"; ctx.beginPath(); ctx.moveTo(...P[a]); ctx.lineTo(...P[b]); ctx.lineTo(...P[c]); ctx.closePath(); ctx.fill(); });
    for (let i = 0; i < st.n; i++) for (let j = i + 1; j < st.n; j++) {
      const c = st.col[key(i, j)];
      ctx.strokeStyle = c === 1 ? C.red : c === 2 ? "#4f8cff" : "rgba(255,255,255,.14)"; ctx.lineWidth = c ? 3.2 : 1.4;
      ctx.setLineDash(c ? [] : [4, 4]); ctx.beginPath(); ctx.moveTo(...P[i]); ctx.lineTo(...P[j]); ctx.stroke();
    }
    ctx.setLineDash([]); ctx.lineWidth = 1;
    P.forEach((p, i) => { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(p[0], p[1], 9, 0, 7); ctx.fill(); ctx.fillStyle = "#120b22"; ctx.font = "bold 10px IBM Plex Mono"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(String.fromCharCode(65 + i), p[0], p[1] + .5); });
    ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
    const total = st.n * (st.n - 1) / 2, done = Object.values(st.col).filter(Boolean).length;
    let msg = `${done}/${total} handshakes coloured · next colour: ${st.turn === 1 ? '<span class="r">red (friends)</span>' : '<span style="color:#7aa8ff">blue (strangers)</span>'}`;
    if (tri.length) msg += `\n<span class="g">Monochromatic triangle!</span> ${tri.map(t => t.slice(0, 3).map(i => String.fromCharCode(65 + i)).join("")).join(", ")} — three mutual ${tri[0][3] === 1 ? "friends" : "strangers"}.`;
    else if (done === total) msg += `\n<span class="t">No monochromatic triangle</span> — possible with ${st.n} people, as the pentagon/pentagram colouring shows.`;
    if (st.n === 6 && !tri.length && done < total) msg += `\n<span class="d">With 6 people you can't avoid it: R(3,3) = 6.</span>`;
    $$(pane, ".rm-out").innerHTML = msg;
  }
  registerAtom({
    id: "ramsey", name: "Ramsey party", domain: "discrete", fields: ["ramsey", "graph-theory"],
    html: `<h3>The Ramsey party — complete disorder is impossible</h3>
      <p class="ahint">At a party, every pair of guests are either friends (red) or strangers (blue). Colour the handshakes by clicking the lines — colours alternate like a two-player game. With <b>6</b> guests you can never avoid three mutual friends or three mutual strangers: the Ramsey number R(3,3) = 6. With 5 you can.</p>
      <div class="achips"><button class="achip" data-n="5">5 guests</button><button class="achip on" data-n="6">6 guests</button></div>
      <canvas class="acv" style="cursor:pointer"></canvas>
      <div class="abar"><button class="abtn" data-b="clear">clear</button><button class="abtn" data-b="pent">5 guests: the escape colouring</button><button class="abtn" data-b="rand">random colouring</button></div>
      <div class="aout rm-out"></div>
      <p class="awhy">Why 6 forces a triangle: guest A has 5 handshakes, so at least 3 share a colour, say red to B, C, D. If any of B, C, D are red friends, that pair plus A is a red triangle; if none are, B, C, D are three mutual strangers. Ramsey numbers grow so fast that R(5,5) is still unknown: somewhere between 43 and 46.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-n]").forEach(b => b.addEventListener("click", () => { st.n = +b.dataset.n; st.col = {}; st.turn = 1; pane.querySelectorAll(".achip[data-n]").forEach(x => x.classList.toggle("on", x === b)); draw(pane); }));
      $$(pane, "[data-b=clear]").addEventListener("click", () => { st.col = {}; st.turn = 1; draw(pane); });
      $$(pane, "[data-b=rand]").addEventListener("click", () => { st.col = {}; for (let i = 0; i < st.n; i++) for (let j = i + 1; j < st.n; j++) st.col[key(i, j)] = Math.random() < .5 ? 1 : 2; draw(pane); });
      $$(pane, "[data-b=pent]").addEventListener("click", () => {
        st.n = 5; pane.querySelectorAll(".achip[data-n]").forEach(x => x.classList.toggle("on", x.dataset.n === "5"));
        st.col = {}; for (let i = 0; i < 5; i++) for (let j = i + 1; j < 5; j++) st.col[key(i, j)] = (j - i === 1 || j - i === 4) ? 1 : 2; draw(pane);
      });
      cv.addEventListener("click", e => {
        const r = cv.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top, P = nodes(r.width, 320);
        let best = null, bd = 12;
        for (let i = 0; i < st.n; i++) for (let j = i + 1; j < st.n; j++) {
          const [ax, ay] = P[i], [bx, by] = P[j], dx = bx - ax, dy = by - ay, t = Math.max(0, Math.min(1, ((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy)));
          const d = Math.hypot(x - ax - t * dx, y - ay - t * dy); if (d < bd && t > .08 && t < .92) { bd = d; best = key(i, j); }
        }
        if (!best) return;
        if (st.col[best]) { delete st.col[best]; } else { st.col[best] = st.turn; st.turn = 3 - st.turn; }
        draw(pane);
      });
    },
    start(pane) { draw(pane); }
  });
})();

/* ============================================================
   3) PASCAL'S TRIANGLE MOD m
   ============================================================ */
(function () {
  let st = { m: 2, rows: 64 }, cv;
  function draw(pane) {
    const { ctx, w: W, h: H } = canvas(cv, 330);
    ctx.clearRect(0, 0, W, H);
    const n = st.rows, cell = Math.min((W - 10) / n, (H - 10) / n * 1.15);
    let row = [1];
    for (let r = 0; r < n; r++) {
      for (let k = 0; k <= r; k++) {
        const v = row[k] % st.m, x = W / 2 + (k - r / 2) * cell, y = 6 + r * cell * .87;
        if (v) { ctx.fillStyle = `hsl(${40 + (v - 1) * 300 / Math.max(1, st.m - 1)} 85% ${55 + 10 * (v / st.m)}%)`; ctx.beginPath(); ctx.arc(x, y, cell * .44, 0, 7); ctx.fill(); }
        else { ctx.fillStyle = "rgba(255,255,255,.05)"; ctx.fillRect(x - .7, y - .7, 1.4, 1.4); }
      }
      const nx = [1]; for (let k = 1; k <= r; k++) nx.push((row[k - 1] + row[k]) % (st.m * 1000003)); nx.push(1); row = nx;
    }
    let odd = 0; for (let r = 0; r < n; r++) odd += 2 ** [...r.toString(2)].filter(c => c === "1").length;
    $$(pane, ".pa-out").innerHTML = st.m === 2
      ? `Odd binomial coefficients in the first ${n} rows: <span class="g">${odd}</span> of ${n * (n + 1) / 2}. Row r has 2^(number of 1s in r's binary expansion) odd entries — and the picture is Sierpiński's triangle.`
      : `Colour = C(r, k) mod ${st.m}. ${[2, 3, 5, 7].includes(st.m) ? `For a prime p, Lucas's theorem (1878) reads C(r, k) mod p off the base-p digits of r and k — hence the self-similar ${st.m}-fold pattern.` : `${st.m} is not prime: the pattern mixes those of its prime factors.`}`;
  }
  registerAtom({
    id: "pascal", name: "Pascal mod m", domain: "discrete", fields: ["enumerative", "elementary-nt"],
    html: `<h3>Pascal's triangle, coloured by remainders</h3>
      <p class="ahint">Each entry C(r, k) = C(r−1, k−1) + C(r−1, k) counts the ways to choose k things from r. Known to Pingala, al-Karajī, Yang Hui and Pascal (1654). Colour only the entries not divisible by m, and fractals appear.</p>
      <canvas class="acv"></canvas>
      <div class="abar"><label class="achk">m <input type="range" data-i="m" min="2" max="12" step="1" value="2"> <span class="mono" data-o="m"></span></label>
        <label class="achk">rows <select data-i="r"><option>32</option><option selected>64</option><option>128</option></select></label></div>
      <div class="aout pa-out"></div>`,
    build(pane) {
      cv = $$(pane, "canvas");
      const m = $$(pane, "[data-i=m]");
      m.addEventListener("input", () => { st.m = +m.value; $$(pane, "[data-o=m]").textContent = st.m; draw(pane); });
      $$(pane, "[data-i=r]").addEventListener("change", e => { st.rows = +e.target.value; draw(pane); });
      $$(pane, "[data-o=m]").textContent = st.m;
    },
    start(pane) { draw(pane); }
  });
})();

/* ============================================================
   4) PARTITIONS & YOUNG DIAGRAMS
   ============================================================ */
(function () {
  let st = { n: 7, conj: false, filter: "all" }, cv;
  function partitions(n, max = n) { if (n === 0) return [[]]; const out = []; for (let k = Math.min(n, max); k >= 1; k--) for (const p of partitions(n - k, k)) out.push([k, ...p]); return out; }
  const conj = p => { const out = []; for (let i = 0; i < (p[0] || 0); i++) out.push(p.filter(x => x > i).length); return out; };
  function pTable(N) { // Euler's pentagonal recurrence
    const p = [1n];
    for (let n = 1; n <= N; n++) { let s = 0n; for (let k = 1; ; k++) { const g1 = k * (3 * k - 1) / 2, g2 = k * (3 * k + 1) / 2; if (g1 > n) break; const sg = k % 2 ? 1n : -1n; s += sg * p[n - g1]; if (g2 <= n) s += sg * p[n - g2]; } p.push(s); }
    return p;
  }
  const P = pTable(200);
  function draw(pane) {
    let parts = partitions(st.n);
    const distinct = parts.filter(p => new Set(p).size === p.length), odd = parts.filter(p => p.every(x => x % 2));
    if (st.filter === "distinct") parts = distinct; else if (st.filter === "odd") parts = odd;
    const shown = parts.slice(0, 60).map(p => st.conj ? conj(p) : p);
    const cellPx = st.n > 9 ? 5 : st.n > 6 ? 7 : 9;
    // lay the diagrams out in rows
    const W = cv.clientWidth || 600, pad = 10, gap = 14;
    let x = pad, y = pad, rowH = 0; const pos = [];
    for (const p of shown) { const w = (p[0] || 1) * cellPx, h = p.length * cellPx; if (x + w > W - pad) { x = pad; y += rowH + gap; rowH = 0; } pos.push([x, y]); x += w + gap; rowH = Math.max(rowH, h); }
    const H = Math.min(420, y + rowH + pad + 4);
    const { ctx } = canvas(cv, H);
    ctx.clearRect(0, 0, W, H);
    shown.forEach((p, i) => {
      const [px, py] = pos[i];
      p.forEach((len, r) => { for (let c = 0; c < len; c++) { ctx.fillStyle = `hsla(${(r * 40 + 30) % 360},75%,62%,.85)`; ctx.fillRect(px + c * cellPx, py + r * cellPx, cellPx - 1, cellPx - 1); } });
    });
    $$(pane, ".pt-out").innerHTML = `p(${st.n}) = <span class="g">${P[st.n]}</span> partitions of ${st.n}${parts.length > 60 ? " (first 60 shown)" : ""}\ninto distinct parts: <span class="t">${distinct.length}</span>   into odd parts: <span class="t">${odd.length}</span>   ← always equal (Euler, 1748)\n<span class="d">p(50) = ${P[50]}, p(100) = ${P[100]}, p(200) = ${P[200]} — computed here with Euler's pentagonal-number recurrence</span>`;
  }
  registerAtom({
    id: "partitions", name: "Partitions", domain: "discrete", fields: ["partitions", "enumerative"],
    html: `<h3>Partitions — ways to write n as a sum, drawn as Young diagrams</h3>
      <p class="ahint">4 = 4 = 3+1 = 2+2 = 2+1+1 = 1+1+1+1, so p(4) = 5. Draw each partition as rows of boxes (a Young diagram). Flipping a diagram across its diagonal — its conjugate — turns 'largest part k' into 'k parts', and proves partition identities without any algebra.</p>
      <canvas class="acv"></canvas>
      <div class="abar"><label class="achk">n <input type="range" data-i="n" min="1" max="12" step="1" value="7"> <span class="mono" data-o="n"></span></label>
        <label class="achk"><input type="checkbox" data-i="c"> conjugate</label>
        <label class="achk">show <select data-i="f"><option value="all">all</option><option value="distinct">distinct parts</option><option value="odd">odd parts</option></select></label></div>
      <div class="aout pt-out"></div>
      <p class="awhy">Hardy and Ramanujan (1918) found p(n) ~ e^{π√(2n/3)}/(4n√3), and Ramanujan noticed p(5k+4) is always divisible by 5 — structure that turned out to come from modular forms.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      const n = $$(pane, "[data-i=n]");
      n.addEventListener("input", () => { st.n = +n.value; $$(pane, "[data-o=n]").textContent = st.n; draw(pane); });
      $$(pane, "[data-i=c]").addEventListener("change", e => { st.conj = e.target.checked; draw(pane); });
      $$(pane, "[data-i=f]").addEventListener("change", e => { st.filter = e.target.value; draw(pane); });
      $$(pane, "[data-o=n]").textContent = st.n;
    },
    start(pane) { draw(pane); }
  });
})();
})();
