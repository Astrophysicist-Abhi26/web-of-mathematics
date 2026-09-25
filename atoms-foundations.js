/* ============================================================
   THE WEB OF MATHEMATICS — atoms-foundations.js
   Playable atoms for Foundations and Order:
     · The infinity lab: Hilbert's Hotel & Cantor's diagonal  (Set Theory)
     · Truth tables                                           (Logic, Boolean Algebras)
     · Lattices: divisors, subsets, M₃ and N₅                (Posets & Lattices, Boolean, Universal Algebra)
   ============================================================ */
(function () {
"use strict";
if (!window.registerAtom) return;
const { canvas, C, esc, rng } = AtomKit;
const $$ = (root, s) => root.querySelector(s);

/* ============================================================
   1) THE INFINITY LAB
   ============================================================ */
(function () {
  const R = rng(1874);
  let st = { tab: "hotel", guests: [], move: null, raf: 0, rows: [], msg: "" }, cv;
  const ROOMS = 16;
  function resetHotel() { st.guests = Array.from({ length: ROOMS + 20 }, (_, i) => ({ id: "g" + (i + 1), label: String(i + 1), room: i + 1, col: "#cfc9e4" })); st.msg = "Every room is full: guest n sleeps in room n, for every n = 1, 2, 3, …"; }
  function hotel(pane, t = 1) {
    const { ctx, w: W, h: H } = canvas(cv, 190);
    ctx.clearRect(0, 0, W, H);
    const cw = (W - 20) / ROOMS, y0 = 60;
    for (let r = 1; r <= ROOMS; r++) {
      const x = 10 + (r - 1) * cw;
      ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.strokeRect(x + 2, y0, cw - 4, 70);
      ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.textAlign = "center"; ctx.fillText(r, x + cw / 2, y0 + 86);
    }
    ctx.fillText("… ∞", W - 14, y0 + 86);
    for (const g of st.guests) {
      const from = g.from != null ? g.from : g.room, to = g.room, e = t * t * (3 - 2 * t);
      const r = from + (to - from) * e; if (r > ROOMS + .5 || r < 0) continue;
      const x = 10 + (r - .5) * cw, y = y0 + 35 - Math.sin(Math.PI * e) * (g.from != null && g.from !== g.room ? 30 : 0);
      ctx.fillStyle = g.col; ctx.beginPath(); ctx.arc(x, y, Math.min(11, cw * .36), 0, 7); ctx.fill();
      ctx.fillStyle = "#120b22"; ctx.font = `bold ${Math.min(10, cw * .3)}px IBM Plex Mono`; ctx.textBaseline = "middle"; ctx.fillText(g.label, x, y + .5); ctx.textBaseline = "alphabetic";
    }
    ctx.textAlign = "start";
    $$(pane, ".in-out").innerHTML = st.msg;
  }
  function moveGuests(pane, fn, newcomers, msg) {
    st.guests.forEach(g => { g.from = g.room; g.room = fn(g.room); });
    newcomers.forEach(g => { g.from = 0; st.guests.push(g); });
    st.msg = msg;
    const t0 = performance.now(); cancelAnimationFrame(st.raf);
    const step = now => { const t = Math.min(1, (now - t0) / 1100); hotel(pane, t); if (t < 1) st.raf = requestAnimationFrame(step); else { st.guests.forEach(g => delete g.from); st.guests = st.guests.filter(g => g.room <= ROOMS + 40); } };
    st.raf = requestAnimationFrame(step);
  }
  // the diagonal argument
  function newRows() { st.rows = Array.from({ length: 8 }, () => Array.from({ length: 14 }, () => (R() < .5 ? 1 : 0))); }
  function diagonal(pane) {
    const n = st.rows.length, m = 14, { ctx, w: W, h: H } = canvas(cv, Math.min(420, 44 + (n + 2) * 22));
    ctx.clearRect(0, 0, W, H);
    const cw = Math.min(26, (W - 110) / (m + 1)), ch = 20, x0 = 90, y0 = 10;
    ctx.font = "12px IBM Plex Mono"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    st.rows.forEach((row, i) => {
      ctx.fillStyle = "#9a93b8"; ctx.textAlign = "right"; ctx.fillText(`s${i + 1} = 0.`, x0 - 4, y0 + i * ch + ch / 2); ctx.textAlign = "center";
      row.forEach((b, j) => {
        const diag = i === j;
        if (diag) { ctx.fillStyle = "rgba(245,196,81,.3)"; ctx.fillRect(x0 + j * cw, y0 + i * ch, cw - 1, ch - 1); }
        ctx.fillStyle = diag ? "#fff" : "#cfc9e4"; ctx.fillText(b, x0 + j * cw + cw / 2, y0 + i * ch + ch / 2);
      });
      ctx.fillStyle = "#6e6789"; ctx.fillText("…", x0 + m * cw + 6, y0 + i * ch + ch / 2);
    });
    const yd = y0 + n * ch + 14;
    ctx.fillStyle = C.gold; ctx.textAlign = "right"; ctx.fillText("new = 0.", x0 - 4, yd + ch / 2); ctx.textAlign = "center";
    for (let j = 0; j < m; j++) {
      const v = j < n ? 1 - st.rows[j][j] : "?";
      ctx.fillStyle = j < n ? "rgba(255,120,71,.35)" : "rgba(255,255,255,.05)"; ctx.fillRect(x0 + j * cw, yd, cw - 1, ch - 1);
      ctx.fillStyle = "#fff"; ctx.fillText(v, x0 + j * cw + cw / 2, yd + ch / 2);
    }
    ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
    $$(pane, ".in-out").innerHTML = `Flip the gold diagonal digit of every row: the new sequence differs from s₁ in place 1, from s₂ in place 2, … from sₙ in place n.\nSo it is <span class="r">not on the list</span> — however the list was made. Add it, and the new diagonal produces another missing one. The binary sequences (equivalently, the subsets of ℕ, or the real numbers) are <span class="g">uncountable</span>: a bigger infinity than ℕ.`;
  }
  function draw(pane) {
    pane.querySelectorAll(".achip[data-t]").forEach(b => b.classList.toggle("on", b.dataset.t === st.tab));
    pane.querySelectorAll(".in-ctl").forEach(el => el.hidden = el.dataset.for !== st.tab);
    if (st.tab === "hotel") hotel(pane); else diagonal(pane);
  }
  registerAtom({
    id: "infinity", name: "Hilbert's Hotel · diagonal", domain: "foundations", fields: ["set-theory", "logic"],
    html: `<h3>The infinity lab — Hilbert's Hotel and Cantor's diagonal</h3>
      <p class="ahint">Two sets have the same size if their elements can be paired off one-to-one (Cantor, 1874). For infinite sets this gives strange but consistent answers: a full hotel with infinitely many rooms can always fit more guests — yet some infinities are strictly bigger than others.</p>
      <div class="achips"><button class="achip on" data-t="hotel">Hilbert's Hotel</button><button class="achip" data-t="diag">Cantor's diagonal</button></div>
      <canvas class="acv"></canvas>
      <div class="abar in-ctl" data-for="hotel"><button class="abtn" data-b="one">one new guest</button><button class="abtn" data-b="bus">a bus with infinitely many</button><button class="abtn" data-b="buses">infinitely many buses</button><button class="abtn" data-b="reset">reset</button></div>
      <div class="abar in-ctl" data-for="diag" hidden><button class="abtn" data-b="add">add the new sequence to the list</button><button class="abtn" data-b="shuffle">a different list</button></div>
      <div class="aout in-out"></div>
      <p class="awhy">Hilbert told the hotel story in a 1924 lecture; Cantor's diagonal argument dates from 1891. The same diagonal trick powers Russell's paradox, Gödel's incompleteness theorem and Turing's halting problem.</p>`,
    build(pane) {
      cv = $$(pane, "canvas"); resetHotel(); newRows();
      pane.querySelectorAll(".achip[data-t]").forEach(b => b.addEventListener("click", () => { st.tab = b.dataset.t; draw(pane); }));
      $$(pane, "[data-b=one]").addEventListener("click", () => moveGuests(pane, r => r + 1, [{ id: "new" + Date.now(), label: "★", room: 1, col: C.gold }],
        "Everyone moves from room n to room n + 1 — nobody is left without a room — and room 1 is free for the newcomer. ℕ and ℕ ∪ {★} have the same size."));
      $$(pane, "[data-b=bus]").addEventListener("click", () => moveGuests(pane, r => 2 * r, Array.from({ length: 10 }, (_, k) => ({ id: "b" + k + Date.now(), label: "b" + (k + 1), room: 2 * k + 1, col: C.teal })),
        "Guest in room n moves to room 2n (the even rooms); bus passenger k takes odd room 2k − 1. Infinity plus infinity is the same infinity: |ℕ| + |ℕ| = |ℕ|."));
      $$(pane, "[data-b=buses]").addEventListener("click", () => {
        const primes = [2, 3, 5, 7, 11, 13];
        const newcomers = []; for (let b = 1; b < 4; b++) for (let k = 1; k <= 3; k++) { const room = primes[b] ** k; newcomers.push({ id: `B${b}.${k}` + Date.now(), label: `${b}.${k}`, room, col: [C.pink, C.violet, C.green][b - 1] }); }
        moveGuests(pane, r => 2 ** r, newcomers, "Guest in room n moves to room 2ⁿ; passenger k of bus b (the b-th odd prime p) takes room pᵏ. Unique factorisation keeps every room single. Countably many countable sets, each listed in order, still make a countable set.");
      });
      $$(pane, "[data-b=reset]").addEventListener("click", () => { resetHotel(); hotel(pane); });
      $$(pane, "[data-b=add]").addEventListener("click", () => {
        const nw = st.rows[0].map((_, j) => j < st.rows.length ? 1 - st.rows[j][j] : (R() < .5 ? 1 : 0));
        if (st.rows.length < 13) st.rows.splice(Math.floor(R() * (st.rows.length + 1)), 0, nw); else { newRows(); }
        diagonal(pane);
      });
      $$(pane, "[data-b=shuffle]").addEventListener("click", () => { newRows(); diagonal(pane); });
    },
    start(pane) { draw(pane); },
    stop() { cancelAnimationFrame(st.raf); }
  });
})();

/* ============================================================
   2) TRUTH TABLES
   ============================================================ */
(function () {
  // ¬ ∧ ∨ → ↔ ⊕ with the usual precedence; variables are single lower-case letters
  function tokenize(s) {
    s = s.replace(/<->|<=>|iff/g, "↔").replace(/->|=>|implies/g, "→").replace(/&&|&|\band\b|\^/g, "∧").replace(/\|\||\||\bor\b|\bv\b/g, "∨")
         .replace(/!|~|\bnot\b/g, "¬").replace(/\bxor\b/g, "⊕");
    const out = []; for (const ch of s) { if (/\s/.test(ch)) continue; if (/[a-z]/.test(ch) || "¬∧∨→↔⊕()".includes(ch) || ch === "1" || ch === "0") out.push(ch); else throw new Error(`unexpected '${ch}'`); }
    return out;
  }
  function parse(tokens) {
    let i = 0;
    const peek = () => tokens[i], eat = t => { if (tokens[i] !== t) throw new Error(`expected '${t}'`); i++; };
    const iff = () => { let l = imp(); while (peek() === "↔" || peek() === "⊕") { const op = tokens[i++], r = imp(); const L = l; l = op === "↔" ? (v => L(v) === r(v)) : (v => L(v) !== r(v)); } return l; };
    const imp = () => { const l = or(); if (peek() === "→") { i++; const r = imp(); return v => !l(v) || r(v); } return l; };
    const or = () => { let l = and(); while (peek() === "∨") { i++; const r = and(), L = l; l = v => L(v) || r(v); } return l; };
    const and = () => { let l = not(); while (peek() === "∧") { i++; const r = not(), L = l; l = v => L(v) && r(v); } return l; };
    const not = () => { if (peek() === "¬") { i++; const x = not(); return v => !x(v); } return atom(); };
    const atom = () => {
      const t = peek(); if (t === undefined) throw new Error("unexpected end");
      if (t === "(") { i++; const x = iff(); eat(")"); return x; }
      if (t === "1") { i++; return () => true; } if (t === "0") { i++; return () => false; }
      if (/[a-z]/.test(t)) { i++; return v => v[t]; }
      throw new Error(`unexpected '${t}'`);
    };
    const f = iff(); if (i < tokens.length) throw new Error(`unexpected '${tokens[i]}'`); return f;
  }
  const PRESETS = [
    ["excluded middle", "p ∨ ¬p"], ["contrapositive", "(p → q) ↔ (¬q → ¬p)"], ["De Morgan", "¬(p ∧ q) ↔ (¬p ∨ ¬q)"],
    ["syllogism", "((p → q) ∧ (q → r)) → (p → r)"], ["Peirce's law", "((p → q) → p) → p"], ["a fallacy", "((p → q) ∧ q) → p"], ["NAND is enough", "¬(p ∧ p) ↔ ¬p"]
  ];
  function run(pane) {
    const src = $$(pane, ".tt-in").value, out = $$(pane, ".tt-table"), msg = $$(pane, ".tt-out");
    try {
      const toks = tokenize(src), vars = [...new Set(toks.filter(t => /[a-z]/.test(t)))].sort();
      if (vars.length > 5) throw new Error("at most 5 variables, please");
      const f = parse(toks);
      let rows = "", nT = 0; const N = 1 << vars.length;
      for (let r = 0; r < N; r++) {
        const v = {}; vars.forEach((x, k) => v[x] = !!((N - 1 - r) >> (vars.length - 1 - k) & 1));
        const val = f(v); if (val) nT++;
        rows += `<tr>${vars.map(x => `<td>${v[x] ? "T" : "F"}</td>`).join("")}<td class="${val ? "hl" : ""}"><b>${val ? "T" : "F"}</b></td></tr>`;
      }
      out.innerHTML = `<tr>${vars.map(x => `<th>${x}</th>`).join("")}<th>${esc(src)}</th></tr>${rows}`;
      msg.innerHTML = nT === N ? `<span class="g">Tautology</span> — true in all ${N} rows, whatever p, q, … mean. By Gödel's completeness theorem it is therefore provable.`
        : nT === 0 ? `<span class="r">Contradiction</span> — false in every row.`
        : `<span class="t">Satisfiable</span> — true in ${nT} of ${N} rows, false in ${N - nT}. Deciding satisfiability for big formulas is SAT, the first NP-complete problem (Cook, 1971).`;
    } catch (e) { out.innerHTML = ""; msg.innerHTML = `<span class="r">Can't read that:</span> ${esc(e.message)}. Use letters p, q, r and ¬ ∧ ∨ → ↔ (or not, and, or, ->, <->).`; }
  }
  registerAtom({
    id: "truth", name: "Truth tables", domain: "foundations", fields: ["logic", "boolean"],
    html: `<h3>Truth tables — deciding propositional logic by brute force</h3>
      <p class="ahint">Type a formula in p, q, r … with ¬ (not), ∧ (and), ∨ (or), → (implies), ↔ (iff). With n letters there are 2ⁿ ways to assign truth values; check them all and you know whether the formula is always true, never true, or sometimes. Post and Wittgenstein made this method standard in 1921.</p>
      <div class="abar"><input class="tt-in" value="((p → q) ∧ (q → r)) → (p → r)" style="flex:1;min-width:14rem;font:.8rem IBM Plex Mono,monospace;color:var(--ink);background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.18);border-radius:8px;padding:.45rem .6rem">
        ${["¬", "∧", "∨", "→", "↔"].map(s => `<button class="abtn" data-s="${s}">${s}</button>`).join("")}</div>
      <div class="achips">${PRESETS.map(([n, f]) => `<button class="achip" data-f="${esc(f)}">${n}</button>`).join("")}</div>
      <div style="overflow-x:auto"><table class="tt-table" style="border-collapse:collapse;font:.72rem IBM Plex Mono,monospace;margin:.5rem 0"></table></div>
      <div class="aout tt-out"></div>
      <p class="awhy">Peirce's law is a tautology classically but is not provable in intuitionistic logic — the Brouwer–Hilbert dispute in one line. And every formula can be rewritten with NAND alone: the reason chips are built from one kind of gate.</p>`,
    build(pane) {
      const inp = $$(pane, ".tt-in");
      inp.addEventListener("input", () => run(pane));
      pane.querySelectorAll("[data-s]").forEach(b => b.addEventListener("click", () => { const p = inp.selectionStart || inp.value.length; inp.value = inp.value.slice(0, p) + " " + b.dataset.s + " " + inp.value.slice(p); inp.focus(); run(pane); }));
      pane.querySelectorAll("[data-f]").forEach(b => b.addEventListener("click", () => { inp.value = b.dataset.f; run(pane); }));
      const st = document.createElement("style");
      st.textContent = `.tt-table th,.tt-table td{border:1px solid rgba(255,255,255,.12);padding:.25rem .55rem;text-align:center;color:#d8d2ea}.tt-table th{color:var(--gold);font-weight:500}.tt-table td.hl{background:rgba(245,196,81,.16);color:#fff}`;
      pane.appendChild(st);
    },
    start(pane) { run(pane); }
  });
})();

/* ============================================================
   3) LATTICES
   ============================================================ */
(function () {
  let st = { tab: "div", n: 60, sel: [] }, cv;
  const gcd = (a, b) => b ? gcd(b, a % b) : a;
  function build() {
    if (st.tab === "div") {
      const els = []; for (let d = 1; d <= st.n; d++) if (st.n % d === 0) els.push(d);
      const omega = d => { let c = 0, m = d; for (let p = 2; p * p <= m; p++) while (m % p === 0) { m /= p; c++; } return c + (m > 1 ? 1 : 0); };
      const leq = (a, b) => b % a === 0;
      return { els, label: String, rank: omega, leq, meet: gcd, join: (a, b) => a * b / gcd(a, b), meetN: "gcd", joinN: "lcm" };
    }
    if (st.tab === "sub") {
      const U = ["a", "b", "c"], N = 1 << U.length, els = [...Array(N).keys()];
      return { els, label: m => m ? "{" + U.filter((_, i) => m >> i & 1).join("") + "}" : "∅", rank: m => m.toString(2).split("").filter(c => c === "1").length,
        leq: (a, b) => (a & b) === a, meet: (a, b) => a & b, join: (a, b) => a | b, meetN: "∩", joinN: "∪" };
    }
    // M3 or N5, given by their order relation
    const M3 = st.tab === "m3";
    const els = M3 ? ["0", "a", "b", "c", "1"] : ["0", "a", "b", "c", "1"];
    const up = M3 ? { "0": ["a", "b", "c"], a: ["1"], b: ["1"], c: ["1"], "1": [] } : { "0": ["a", "c"], a: ["b"], b: ["1"], c: ["1"], "1": [] };
    const ups = x => { const out = new Set([x]), st2 = [x]; while (st2.length) for (const y of up[st2.pop()]) if (!out.has(y)) { out.add(y); st2.push(y); } return out; };
    const leq = (a, b) => ups(a).has(b);
    const rank = M3 ? (x => ({ "0": 0, a: 1, b: 1, c: 1, "1": 2 })[x]) : (x => ({ "0": 0, a: 1, b: 2, c: 1.5, "1": 3 })[x]);
    const join = (a, b) => els.filter(z => leq(a, z) && leq(b, z)).find(z => els.filter(w => leq(a, w) && leq(b, w)).every(w => leq(z, w)));
    const meet = (a, b) => els.filter(z => leq(z, a) && leq(z, b)).find(z => els.filter(w => leq(w, a) && leq(w, b)).every(w => leq(w, z)));
    return { els, label: String, rank, leq, meet, join, meetN: "∧", joinN: "∨" };
  }
  function layout(L, W, H) {
    const ranks = {}; L.els.forEach(e => { const r = L.rank(e); (ranks[r] = ranks[r] || []).push(e); });
    const rs = Object.keys(ranks).map(Number).sort((a, b) => a - b), maxR = rs[rs.length - 1] || 1, pos = {};
    rs.forEach(r => { const row = ranks[r]; row.forEach((e, i) => { pos[e] = [W / 2 + (i - (row.length - 1) / 2) * Math.min(90, (W - 60) / Math.max(1, row.length)), H - 26 - (r / maxR) * (H - 52)]; }); });
    return pos;
  }
  function draw(pane) {
    pane.querySelectorAll(".achip[data-t]").forEach(b => b.classList.toggle("on", b.dataset.t === st.tab));
    $$(pane, ".lt-n").hidden = st.tab !== "div";
    const L = build(), { ctx, w: W, h: H } = canvas(cv, 320);
    ctx.clearRect(0, 0, W, H);
    const pos = layout(L, W, H);
    // cover relations: a < b with nothing in between
    for (const a of L.els) for (const b of L.els) {
      if (a === b || !L.leq(a, b)) continue;
      if (L.els.some(c => c !== a && c !== b && L.leq(a, c) && L.leq(c, b))) continue;
      ctx.strokeStyle = "rgba(180,140,255,.55)"; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(...pos[a]); ctx.lineTo(...pos[b]); ctx.stroke();
    }
    ctx.lineWidth = 1;
    const [x, y] = st.sel, m = st.sel.length === 2 ? L.meet(x, y) : null, j = st.sel.length === 2 ? L.join(x, y) : null;
    for (const e of L.els) {
      const [px, py] = pos[e], chosen = st.sel.includes(e);
      ctx.fillStyle = chosen ? C.gold : e === m ? C.teal : e === j ? C.pink : "#2a1d46";
      ctx.strokeStyle = "rgba(255,255,255,.6)";
      ctx.beginPath(); ctx.arc(px, py, 15, 0, 7); ctx.fill(); ctx.stroke();
      ctx.fillStyle = chosen || e === m || e === j ? "#120b22" : "#e8e4f4"; ctx.font = `${L.label(e).length > 3 ? 9 : 11}px IBM Plex Mono`; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText(L.label(e), px, py + .5);
    }
    ctx.textAlign = "start"; ctx.textBaseline = "alphabetic";
    // distributivity check: a ∧ (b ∨ c) = (a ∧ b) ∨ (a ∧ c) for all triples
    let bad = null;
    outer: for (const a of L.els) for (const b of L.els) for (const c of L.els) if (L.meet(a, L.join(b, c)) !== L.join(L.meet(a, b), L.meet(a, c))) { bad = [a, b, c]; break outer; }
    const squarefree = st.tab === "div" && (() => { for (let p = 2; p * p <= st.n; p++) if (st.n % (p * p) === 0) return false; return true; })();
    let txt = st.sel.length === 2 ? `meet ${L.label(x)} ${L.meetN} ${L.label(y)} = <span class="t">${L.label(m)}</span> (greatest element below both)   join ${L.label(x)} ${L.joinN} ${L.label(y)} = <span style="color:${C.pink}">${L.label(j)}</span> (least element above both)\n`
      : "Click two elements to see their meet and join.\n";
    txt += bad ? `<span class="r">Not distributive</span>: ${L.label(bad[0])} ∧ (${L.label(bad[1])} ∨ ${L.label(bad[2])}) ≠ (${L.label(bad[0])} ∧ ${L.label(bad[1])}) ∨ (${L.label(bad[0])} ∧ ${L.label(bad[2])}). Birkhoff: a lattice is distributive iff it contains no copy of M₃ or N₅.`
      : `<span class="g">Distributive</span>: meets and joins distribute over each other, like ∩ and ∪.` + (st.tab === "sub" || squarefree ? ` Every element has a complement too — a <b>Boolean algebra</b>${st.tab === "div" ? ` (${st.n} is square-free)` : ""}.` : "");
    $$(pane, ".lt-out").innerHTML = txt;
  }
  registerAtom({
    id: "lattices", name: "Lattices", domain: "order", fields: ["lattices", "boolean", "universal-algebra"],
    html: `<h3>Lattices — order, drawn as Hasse diagrams</h3>
      <p class="ahint">A lattice is a partial order where every two elements have a greatest lower bound (meet) and a least upper bound (join). Divisors of a number (gcd and lcm), subsets of a set (∩ and ∪) and the subgroups of a group are all lattices. Draw the order with 'bigger' higher and only the covering lines — a Hasse diagram.</p>
      <div class="achips"><button class="achip on" data-t="div">divisors of n</button><button class="achip" data-t="sub">subsets</button><button class="achip" data-t="m3">M₃ (diamond)</button><button class="achip" data-t="n5">N₅ (pentagon)</button></div>
      <canvas class="acv" style="cursor:pointer"></canvas>
      <div class="abar lt-n"><label class="achk">n <select data-i="n">${[12, 30, 36, 60, 72, 105, 210, 360].map(n => `<option${n === 60 ? " selected" : ""}>${n}</option>`).join("")}</select></label></div>
      <div class="aout lt-out"></div>
      <p class="awhy">Dedekind studied these 'dual groups' in 1897 while looking at ideals; Birkhoff made lattice theory a subject (1933–40). Divisors of 30 and subsets of {a, b, c} give the same cube: both are the Boolean algebra with three atoms.</p>`,
    build(pane) {
      cv = $$(pane, "canvas");
      pane.querySelectorAll(".achip[data-t]").forEach(b => b.addEventListener("click", () => { st.tab = b.dataset.t; st.sel = []; draw(pane); }));
      $$(pane, "[data-i=n]").addEventListener("change", e => { st.n = +e.target.value; st.sel = []; draw(pane); });
      cv.addEventListener("click", e => {
        const r = cv.getBoundingClientRect(), L = build(), pos = layout(L, r.width, 320), x = e.clientX - r.left, y = e.clientY - r.top;
        const hit = L.els.find(el => Math.hypot(pos[el][0] - x, pos[el][1] - y) < 17); if (hit === undefined) return;
        st.sel = st.sel.length >= 2 ? [hit] : st.sel.concat([hit]); draw(pane);
      });
    },
    start(pane) { draw(pane); }
  });
})();
})();
