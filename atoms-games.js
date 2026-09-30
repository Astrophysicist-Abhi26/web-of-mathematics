/* ============================================================
   THE WEB OF MATHEMATICS — atoms-games.js
   Game theory & social choice (domain: discrete)
     axelrod · voting · braess · auction · cake · apportion
   ============================================================ */
(function () {
"use strict";
const { C, rng, esc } = AtomKit;
const cv = (el, h) => AtomKit.canvas(el, h);
function sized(c, h) { let d = cv(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = cv(c, h); return d; }; }
function looper() {
  const L = { raf: null, fn: null,
    start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } },
    stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } };
  return L;
}
const chips = (p, sel, cb) => p.querySelectorAll(sel).forEach(b => b.addEventListener("click", () => { p.querySelectorAll(sel).forEach(x => x.classList.toggle("on", x === b)); cb(b); }));
const PAL = [C.gold, C.teal, C.pink, C.blue, C.green, C.violet, C.red, "#ffd9a0"];

/* ================================================================ Axelrod's tournament */
// a strategy sees (my history, their history) of 1 = cooperate, 0 = defect
const STRATS = {
  "Tit for Tat": (m, t) => t.length ? t[t.length - 1] : 1,
  "Always Defect": () => 0,
  "Always Cooperate": () => 1,
  "Grim Trigger": (m, t) => t.includes(0) ? 0 : 1,
  "Pavlov": (m, t) => !m.length ? 1 : (m[m.length - 1] === t[t.length - 1] ? 1 : 0),
  "Tit for Two Tats": (m, t) => t.length > 1 && !t[t.length - 1] && !t[t.length - 2] ? 0 : 1,
  "Suspicious TfT": (m, t) => t.length ? t[t.length - 1] : 0,
  "Random": (m, t, r) => r() < .5 ? 1 : 0,
  "Joss (sneaky)": (m, t, r) => (t.length ? t[t.length - 1] : 1) && r() < .9 ? 1 : 0
};
const PAY = [[1, 5], [0, 3]];   // PAY[me][them]: D/D 1, D/C 5, C/D 0, C/C 3
const ax = looper();
registerAtom({
  id: "axelrod", name: "Prisoner's dilemma tournament", domain: "discrete", fields: ["game-theory"],
  html: `<h3>The prisoner's dilemma — and why nice guys finish first</h3>
    <p class="ahint">Each round two players cooperate or defect: both cooperate → 3 each, both defect → 1 each, a lone defector gets 5 and the sucker 0. In one round, defecting always pays. But play 200 rounds against every rival, as in Robert Axelrod's 1980 tournaments, and see who wins. Then let the population evolve.</p>
    <div class="achips"><button class="achip ax-m on" data-m="t">round-robin tournament</button><button class="achip ax-m" data-m="e">evolution (replicator dynamics)</button>
      <label class="achk">noise <input type="range" class="ax-n" min="0" max="0.1" step="0.005" value="0"> <b class="ax-nv">0%</b></label><button class="achip ax-go">▶ run again</button></div>
    <div class="achips ax-pick">${Object.keys(STRATS).map(k => `<button class="achip ax-s on" data-k="${esc(k)}">${esc(k)}</button>`).join("")}</div>
    <canvas class="acv ax-cv"></canvas>
    <div class="aout ax-out"></div>
    <p class="awhy">Merrill Flood and Melvin Dresher invented the game at RAND in 1950; Albert Tucker gave it the story of two prisoners. Axelrod invited game theorists to submit programs; the winner, submitted by Anatol Rapoport, was four lines long: Tit for Tat — start nice, then copy. It never beats any single opponent, yet it wins overall by being nice, retaliatory, forgiving and clear. With noise, forgiving strategies such as Pavlov (win-stay, lose-shift, Nowak & Sigmund 1993) do better. Evolution here uses replicator dynamics: a strategy's share grows in proportion to how well it scores against the current mix.</p>`,
  build(p) {
    const c = p.querySelector(".ax-cv"), out = p.querySelector(".ax-out"), dims = sized(c, 360), nI = p.querySelector(".ax-n");
    let mode = "t", res = null, evo = null, shown = 0;
    const active = () => [...p.querySelectorAll(".ax-s.on")].map(b => b.dataset.k);
    function match(a, b, R, noise) {
      const ma = [], mb = []; let sa = 0, sb = 0;
      for (let k = 0; k < 200; k++) {
        let x = STRATS[a](ma, mb, R), y = STRATS[b](mb, ma, R);
        if (R() < noise) x = 1 - x; if (R() < noise) y = 1 - y;
        ma.push(x); mb.push(y); sa += PAY[x][y]; sb += PAY[y][x];
      }
      return [sa / 200, sb / 200];
    }
    function run() {
      const S = active(), R = rng(12345), noise = +nI.value, M = S.map(() => S.map(() => 0));
      for (let i = 0; i < S.length; i++) for (let j = i; j < S.length; j++) { let a = 0, b = 0; for (let r = 0; r < 5; r++) { const [x, y] = match(S[i], S[j], R, noise); a += x; b += y; } M[i][j] = a / 5; M[j][i] = b / 5; }
      res = { S, M, tot: S.map((_, i) => M[i].reduce((a, b) => a + b, 0) / S.length) };
      // replicator dynamics from equal shares
      let x = S.map(() => 1 / S.length); const hist = [x];
      for (let g = 0; g < 120; g++) { const f = S.map((_, i) => S.reduce((s, _, j) => s + M[i][j] * x[j], 0)), fb = x.reduce((s, xi, i) => s + xi * f[i], 0); x = x.map((xi, i) => xi * f[i] / fb); hist.push(x); }
      evo = hist; shown = 0;
    }
    ax.fn = () => {
      if (!res) return; const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const { S, tot } = res; shown = Math.min(1, shown + .03);
      ctx.font = "11px 'IBM Plex Mono', monospace";
      if (mode === "t") {
        const order = S.map((_, i) => i).sort((a, b) => tot[b] - tot[a]), bh = Math.min(34, (h - 20) / S.length), mx = 3.2;
        order.forEach((i, r) => { const y = 10 + r * bh, bw = (w - 230) * tot[i] / mx * shown; ctx.fillStyle = PAL[i % PAL.length]; ctx.globalAlpha = .85; ctx.fillRect(180, y, bw, bh - 8); ctx.globalAlpha = 1;
          ctx.fillStyle = "#e8e4f4"; ctx.fillText(S[i], 8, y + bh / 2); ctx.fillText(tot[i].toFixed(2), 186 + bw, y + bh / 2); });
        [1, 3].forEach(v => { const x = 180 + (w - 230) * v / mx; ctx.strokeStyle = "rgba(255,255,255,.2)"; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.moveTo(x, 4); ctx.lineTo(x, h - 4); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = "#8d86a8"; ctx.fillText(v === 3 ? "all cooperate" : "all defect", x + 3, h - 6); });
        out.innerHTML = `average points per round, 200 rounds × 5 repeats against every strategy (including itself)\nwinner: <span class="g">${esc(S[order[0]])}</span>   last: <span class="r">${esc(S[order[order.length - 1]])}</span>`;
      } else {
        const top0 = Math.min(1, Math.max(...evo.flat()) * 1.1), G = evo.length - 1, upto = Math.max(1, Math.round(G * shown)), L = 40, Rr = w - 150, T = 10, B = h - 24;
        ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(Rr, B); ctx.stroke();
        ctx.fillStyle = "#8d86a8"; ctx.fillText("generation →", Rr - 80, B + 16); ctx.fillText(Math.round(top0 * 100) + "%", 4, T + 6); ctx.fillText("0", 26, B);
        S.forEach((s, i) => { ctx.strokeStyle = PAL[i % PAL.length]; ctx.lineWidth = 2; ctx.beginPath(); for (let g = 0; g <= upto; g++) { const X = L + (Rr - L) * g / G, Y = B - (B - T) * evo[g][i] / top0; g ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke();
          const yl = B - (B - T) * evo[upto][i] / top0; if (evo[upto][i] > .03) { ctx.fillStyle = PAL[i % PAL.length]; ctx.fillText(s, Rr + 6, yl + 3); } });
        const fin = evo[G], top = fin.indexOf(Math.max(...fin));
        out.innerHTML = `population shares over 120 generations, starting equal\nafter 120 generations: <span class="g">${esc(S[top])}</span> holds ${(fin[top] * 100).toFixed(0)}% — exploiters thrive while there are suckers to eat, then starve`;
      }
    };
    chips(p, ".ax-m", b => { mode = b.dataset.m; shown = 0; });
    p.querySelectorAll(".ax-s").forEach(b => b.addEventListener("click", () => { b.classList.toggle("on"); if (active().length < 2) b.classList.add("on"); run(); }));
    nI.addEventListener("input", () => { p.querySelector(".ax-nv").textContent = (nI.value * 100).toFixed(1) + "%"; });
    nI.addEventListener("change", run);
    p.querySelector(".ax-go").addEventListener("click", run);
    run();
  },
  start() { ax.start(); }, stop() { ax.stop(); }
});

/* ================================================================ Voting methods */
const PROFILES = {
  "five methods, five winners": [[18, "ADECB"], [12, "BEDCA"], [10, "CBEDA"], [9, "DCEBA"], [4, "EBDCA"], [2, "ECDBA"]],
  "Condorcet cycle": [[1, "ABC"], [1, "BCA"], [1, "CAB"]],
  "spoiler": [[40, "ABC"], [35, "BAC"], [25, "CBA"]],
};
registerAtom({
  id: "voting", name: "Voting methods & Arrow", domain: "discrete", fields: ["game-theory"],
  html: `<h3>Same ballots, different winners — how the counting rule decides the election</h3>
    <p class="ahint">Each row is a group of voters with the same ranking, best first. The same ballots are counted five ways. Change the group sizes with − and + and watch the winners move.</p>
    <div class="achips">${Object.keys(PROFILES).map((k, i) => `<button class="achip vo-p${i ? "" : " on"}" data-k="${k}">${k}</button>`).join("")}</div>
    <div class="vo-ballots" style="display:flex;flex-wrap:wrap;gap:.4rem;margin:.5rem 0"></div>
    <div class="aout vo-out"></div>
    <p class="awhy">Plurality counts first choices; the two-round runoff keeps the top two; instant runoff (IRV) eliminates the weakest one at a time; Borda gives n − 1 points for first place down to 0; a Condorcet winner beats everyone head-to-head — when one exists, which Condorcet (1785) showed it may not. Kenneth Arrow proved in 1951 that no method using rankings can be both fair and consistent in his precise sense, and Gibbard and Satterthwaite (1973–75) that every non-dictatorial method with three or more candidates sometimes rewards voting insincerely.</p>`,
  build(p) {
    const box = p.querySelector(".vo-ballots"), out = p.querySelector(".vo-out"); let prof;
    const cands = () => [...new Set(prof.flatMap(([, r]) => [...r]))].sort();
    function count() {
      const Cs = cands(), tops = act => { const s = {}; act.forEach(c => s[c] = 0); prof.forEach(([n, r]) => { const f = [...r].find(c => act.includes(c)); if (f) s[f] += n; }); return s; };
      const best = s => { const m = Math.max(...Object.values(s)); return Object.keys(s).filter(k => s[k] === m); };
      const pl = tops(Cs), two = Object.entries(pl).sort((a, b) => b[1] - a[1]).slice(0, 2).map(x => x[0]), ro = tops(two);
      let act = Cs.slice(); const irvLog = []; while (act.length > 1) { const s = tops(act); const lo = act.reduce((a, b) => s[a] <= s[b] ? a : b); irvLog.push(lo); act = act.filter(c => c !== lo); }
      const bo = {}; Cs.forEach(c => bo[c] = 0); prof.forEach(([n, r]) => [...r].forEach((c, i) => bo[c] += n * (Cs.length - 1 - i)));
      const margin = (x, y) => prof.reduce((s, [n, r]) => s + (r.indexOf(x) < r.indexOf(y) ? n : -n), 0);
      const cw = Cs.filter(x => Cs.every(y => y === x || margin(x, y) > 0));
      const fmt = s => Object.entries(s).map(([k, v]) => `${k} ${v}`).join(" · ");
      const rows = [["plurality", best(pl), fmt(pl)], ["two-round runoff", best(ro), fmt(ro)], ["instant runoff", act, "eliminated in order: " + irvLog.join(", ")], ["Borda count", best(bo), fmt(bo)],
        ["Condorcet", cw, cw.length ? "beats every rival head-to-head" : "no one — the majorities form a cycle"]];
      const pairs = []; for (let i = 0; i < Cs.length; i++) for (let j = i + 1; j < Cs.length; j++) { const m = margin(Cs[i], Cs[j]); pairs.push(m >= 0 ? `${Cs[i]}>${Cs[j]} by ${m}` : `${Cs[j]}>${Cs[i]} by ${-m}`); }
      const wins = new Set(rows.map(r => r[1].join("")));
      out.innerHTML = rows.map(([n, w, d]) => `${n.padEnd(17)} <span class="${w.length ? "g" : "r"}">${w.length ? w.join(" = ") : "—"}</span>   <span class="d">${d}</span>`).join("\n") +
        `\nhead-to-head: <span class="d">${pairs.join(" · ")}</span>\n${wins.size > 1 ? `<span class="t">${wins.size} different outcomes from one set of ballots</span>` : "every method agrees here"}`;
    }
    function draw() {
      box.innerHTML = prof.map(([n, r], i) => `<div style="border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:.35rem .5rem;font:.72rem 'IBM Plex Mono',monospace;background:rgba(255,255,255,.03)">
        <div style="display:flex;gap:.3rem;align-items:center;margin-bottom:.25rem"><button class="achip" data-i="${i}" data-d="-1" style="padding:.1rem .45rem">−</button><b style="color:var(--gold);min-width:2.2rem;text-align:center">${n}</b><button class="achip" data-i="${i}" data-d="1" style="padding:.1rem .45rem">+</button></div>
        ${[...r].map(ch => `<div style="text-align:center;color:${PAL[ch.charCodeAt(0) - 65]}">${ch}</div>`).join("")}</div>`).join("");
      box.querySelectorAll("button").forEach(b => b.addEventListener("click", () => { const i = +b.dataset.i; prof[i][0] = Math.max(0, prof[i][0] + +b.dataset.d); draw(); }));
      count();
    }
    chips(p, ".vo-p", b => { prof = PROFILES[b.dataset.k].map(([n, r]) => [n, r]); draw(); });
    prof = PROFILES["five methods, five winners"].map(([n, r]) => [n, r]); draw();
  }
});

/* ================================================================ Braess's paradox */
const br = looper();
registerAtom({
  id: "braess", name: "Braess's paradox", domain: "discrete", fields: ["game-theory", "graph-theory"],
  html: `<h3>Braess's paradox — a new road that makes everyone slower</h3>
    <p class="ahint">4,000 drivers travel from S to T and each picks the fastest route for themselves. Two roads get slower the more cars use them (cars ÷ 100 minutes); two take 45 minutes regardless. Open the free shortcut and watch the drivers, each acting sensibly, make every journey worse.</p>
    <div class="achips"><button class="achip bs-sc">open the shortcut C → D</button><button class="achip bs-re">restart</button></div>
    <canvas class="acv bs-cv"></canvas>
    <div class="aout bs-out"></div>
    <p class="awhy">Dietrich Braess found the effect in 1968. Everyone ends at a Nash (Wardrop) equilibrium where no single driver can gain by switching — but that equilibrium is not the best for the group. The 'price of anarchy' measures the gap — here 80 minutes against the 65 a planner could achieve. Roughgarden and Tardos (2002) proved that when travel times grow linearly with traffic it can never exceed 4/3. Cities have seen it in reverse: closing roads in Seoul and New York improved traffic.</p>`,
  build(p) {
    const c = p.querySelector(".bs-cv"), out = p.querySelector(".bs-out"), dims = sized(c, 330), N = 4000;
    let sc = false, f = [N, 0, 0], t = 0, R = rng(5);
    const times = f => { const sC = f[0] + f[2], dT = f[1] + f[2]; return [sC / 100 + 45, 45 + dT / 100, sC / 100 + dT / 100]; };
    const reset = () => { f = [N, 0, 0]; };
    br.fn = () => {
      t++;
      for (let k = 0; k < 3; k++) { const tm = times(f), used = [0, 1, 2].filter(i => f[i] > 0 && (i < 2 || sc)), av = sc ? [0, 1, 2] : [0, 1];
        const worst = used.reduce((a, b) => tm[a] >= tm[b] ? a : b), bestR = av.reduce((a, b) => tm[a] <= tm[b] ? a : b);
        if (tm[worst] - tm[bestR] > .01) { const m = Math.min(f[worst], 20); f[worst] -= m; f[bestR] += m; } }
      if (!sc && f[2]) { f[0] += f[2]; f[2] = 0; }
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const S = [60, h / 2], T = [w - 60, h / 2], Cn = [w / 2, 50], D = [w / 2, h - 50], tm = times(f);
      const edge = (A, B, lab, heavy, on) => { ctx.strokeStyle = on ? (heavy ? "rgba(255,120,71,.8)" : "rgba(127,227,214,.8)") : "rgba(255,255,255,.12)"; ctx.lineWidth = on ? 4 : 2; ctx.beginPath(); ctx.moveTo(...A); ctx.lineTo(...B); ctx.stroke();
        ctx.fillStyle = "#cfc9e4"; ctx.font = "11px 'IBM Plex Mono', monospace"; ctx.fillText(lab, (A[0] + B[0]) / 2 + 8, (A[1] + B[1]) / 2 + (A[1] < B[1] ? -6 : 14)); };
      edge(S, Cn, `cars/100 = ${((f[0] + f[2]) / 100).toFixed(0)} min`, true, true); edge(Cn, T, "45 min", false, true); edge(S, D, "45 min", false, true); edge(D, T, `cars/100 = ${((f[1] + f[2]) / 100).toFixed(0)} min`, true, true);
      edge(Cn, D, sc ? "shortcut: 0 min" : "closed", false, sc);
      const paths = [[S, Cn, T], [S, D, T], [S, Cn, D, T]];
      paths.forEach((P, i) => { const n = Math.round(f[i] / 100); for (let k = 0; k < n; k++) { let u = ((t * .006 + k / Math.max(1, n) + i * .13) % 1) * (P.length - 1); const s = Math.min(P.length - 2, Math.floor(u)), e = u - s, A = P[s], B = P[s + 1];
        ctx.fillStyle = PAL[i]; ctx.beginPath(); ctx.arc(A[0] + (B[0] - A[0]) * e, A[1] + (B[1] - A[1]) * e, 3.5, 0, 7); ctx.fill(); } });
      [[S, "S"], [T, "T"], [Cn, "C"], [D, "D"]].forEach(([q, l]) => { ctx.fillStyle = "#1a1030"; ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(...q, 15, 0, 7); ctx.fill(); ctx.stroke(); ctx.fillStyle = "#fff"; ctx.font = "600 13px 'IBM Plex Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(l, q[0], q[1] + 5); ctx.textAlign = "start"; });
      const used = [0, 1, 2].filter(i => f[i] > 0), avg = used.reduce((s, i) => s + f[i] * tm[i], 0) / N;
      out.innerHTML = `drivers: S–C–T <span style="color:${PAL[0]}">${f[0]}</span>   S–D–T <span style="color:${PAL[1]}">${f[1]}</span>   S–C–D–T <span style="color:${PAL[2]}">${f[2]}</span>\nevery driver's trip: <span class="${avg > 70 ? "r" : "g"}">${avg.toFixed(1)} minutes</span>   ${sc ? (avg > 79 ? "— with the shortcut everyone is 15 minutes slower, and nobody can do better by switching alone" : "— drivers are discovering the shortcut…") : (Math.abs(f[0] - f[1]) < 60 ? "— balanced: 2000 each way, 65 minutes" : "— drivers spreading out…")}`;
    };
    const sb = p.querySelector(".bs-sc"); sb.addEventListener("click", () => { sc = !sc; sb.classList.toggle("on", sc); sb.textContent = sc ? "close the shortcut" : "open the shortcut C → D"; });
    p.querySelector(".bs-re").addEventListener("click", reset);
  },
  start() { br.start(); }, stop() { br.stop(); }
});

/* ================================================================ Auctions */
registerAtom({
  id: "auction", name: "Auctions: Vickrey vs first price", domain: "discrete", fields: ["game-theory", "prob-spaces"],
  html: `<h3>Auctions — why you should bid your true value (but only in the right auction)</h3>
    <p class="ahint">You value the prize at v; your rivals' values are random between 0 and 100. Curves show your expected profit for each possible bid. In a <b>second-price (Vickrey)</b> auction the best bid is exactly v. In a <b>first-price</b> auction you should shade your bid down — yet the seller earns the same on average.</p>
    <div class="achips"><label class="achk">your value v <input type="range" class="au-v" min="5" max="100" value="70"> <b class="au-vv"></b></label>
      <label class="achk">bidders <input type="range" class="au-n" min="2" max="8" value="3"> <b class="au-nv"></b></label><button class="achip au-sim">simulate 20,000 auctions</button></div>
    <canvas class="acv au-cv"></canvas>
    <div class="aout au-out"></div>
    <p class="awhy">William Vickrey (1961) noticed that when the winner pays the second-highest bid, your bid only decides whether you win, never what you pay — so truth-telling is a dominant strategy. In a first-price auction with n bidders and uniform values, the equilibrium bid is (n − 1)/n × your value. The revenue equivalence theorem (Vickrey; Myerson 1981; Riley & Samuelson 1981) says both formats earn the seller (n − 1)/(n + 1) × 100 on average. Auction design earned Milgrom and Wilson the 2020 Nobel prize.</p>`,
  build(p) {
    const c = p.querySelector(".au-cv"), out = p.querySelector(".au-out"), dims = sized(c, 320), vI = p.querySelector(".au-v"), nI = p.querySelector(".au-n");
    let sim = null;
    function draw() {
      const v = +vI.value, n = +nI.value, k = n - 1; p.querySelector(".au-vv").textContent = v; p.querySelector(".au-nv").textContent = n;
      const second = b => { const m = Math.min(b, 100) / 100; return 100 * (v / 100 * m ** k - k / (k + 1) * m ** (k + 1)); };   // ∫ (v − M) dF over M < b
      const first = b => (v - b) * Math.min(1, b * n / (k * 100)) ** k;
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const L = 40, Rr = w - 12, T = 12, B = h - 26, ymax = Math.max(second(v), 1) * 1.15, X = b => L + (Rr - L) * b / 100, Y = y => B - (B - T) * Math.max(-.1 * ymax, y) / ymax;
      ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, B); ctx.lineTo(Rr, B); ctx.stroke();
      ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; [0, 25, 50, 75, 100].forEach(b => ctx.fillText(b, X(b) - 6, B + 14)); ctx.fillText("your bid →", Rr - 70, B - 4); ctx.fillText("expected profit", L + 4, T + 8);
      const curve = (f, col) => { ctx.strokeStyle = col; ctx.lineWidth = 2.4; ctx.beginPath(); for (let b = 0; b <= 100; b += .5) b ? ctx.lineTo(X(b), Y(f(b))) : ctx.moveTo(X(b), Y(f(b))); ctx.stroke(); };
      curve(second, C.teal); curve(first, C.pink);
      const mark = (b, f, col, lab) => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(X(b), Y(f(b)), 6, 0, 7); ctx.fill(); ctx.fillText(lab, X(b) + 8, Y(f(b)) - 8); };
      mark(v, second, C.teal, "second price: bid v"); mark(v * k / n, first, C.pink, `first price: bid ${(k / n).toFixed(2)}·v`);
      ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(245,196,81,.5)"; ctx.beginPath(); ctx.moveTo(X(v), T); ctx.lineTo(X(v), B); ctx.stroke(); ctx.setLineDash([]);
      out.innerHTML = `best bid, second-price: <span class="t">${v}</span> (your value)   best bid, first-price: <span class="r">${(v * k / n).toFixed(1)}</span> (shade by 1/${n})\nexpected profit at the best bid: second-price ${second(v).toFixed(2)}, first-price ${first(v * k / n).toFixed(2)} — the same, as theory predicts\nseller's expected revenue in both: 100 × (n − 1)/(n + 1) = <span class="g">${(100 * k / (n + 1)).toFixed(2)}</span>` +
        (sim ? `\nsimulated with ${n} bidders: first-price revenue <span class="g">${sim[0].toFixed(2)}</span>, second-price revenue <span class="g">${sim[1].toFixed(2)}</span>` : "");
    }
    p.querySelector(".au-sim").addEventListener("click", () => { const n = +nI.value, R = rng(Date.now() & 0xffff); let a = 0, b = 0; for (let t = 0; t < 20000; t++) { const vs = Array.from({ length: n }, () => R() * 100).sort((x, y) => y - x); a += vs[0] * (n - 1) / n; b += vs[1]; } sim = [a / 20000, b / 20000]; draw(); });
    [vI, nI].forEach(i => i.addEventListener("input", () => { if (i === nI) sim = null; draw(); }));
    this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Cake cutting */
const ck = looper();
registerAtom({
  id: "cake", name: "Fair cake cutting", domain: "discrete", fields: ["game-theory", "measure-theory"],
  html: `<h3>Fair division — cutting a cake when everyone likes different bits</h3>
    <p class="ahint">The cake has sections of chocolate, strawberry, vanilla… and each person values them differently (the coloured bars show how much each person cares about each slice). <b>I cut, you choose</b> works for two. For three, a knife sweeps across the cake and anyone who thinks the piece so far is worth a third shouts "stop".</p>
    <div class="achips"><button class="achip ck-m on" data-m="2">I cut, you choose (2 people)</button><button class="achip ck-m" data-m="3">moving knife (3 people)</button><button class="achip ck-new">new tastes</button></div>
    <canvas class="acv ck-cv"></canvas>
    <div class="aout ck-out"></div>
    <p class="awhy">Everyone ends up with at least 1/n of the cake by their own measure — a proportional division. Hugo Steinhaus posed the problem during the Second World War (published 1948); the moving-knife procedure is due to Dubins and Spanier (1961). Proportional is not envy-free: the grid below shows how much each person values each piece, and with three people someone may envy another. A bounded envy-free protocol for any number of people was found only in 2016, by Haris Aziz and Simon Mackenzie.</p>`,
  build(p) {
    const c = p.querySelector(".ck-cv"), out = p.querySelector(".ck-out"), dims = sized(c, 330), K = 12;
    let n = 2, V, t0 = performance.now(), seed = 3;
    const FL = ["#6b3b22", "#ff7ac8", "#f5e6b0", "#57e08a", "#ffb347", "#b48cff"];
    const tastes = () => { const R = rng(seed); V = [0, 1, 2].map(() => { const d = Array.from({ length: K }, () => .1 + R() ** 2 * 2), s = d.reduce((a, b) => a + b); return d.map(x => x / s); }); };
    const meas = (i, a, b) => { let s = 0; for (let k = 0; k < K; k++) { const lo = Math.max(a, k / K), hi = Math.min(b, (k + 1) / K); if (hi > lo) s += V[i][k] * (hi - lo) * K; } return s; };
    const point = (i, a, target) => { let lo = a, hi = 1; for (let it = 0; it < 50; it++) { const m = (lo + hi) / 2; meas(i, a, m) < target ? lo = m : hi = m; } return hi; };
    function plan() {
      if (n === 2) { const cut = point(0, 0, .5), pieces = [[0, cut], [cut, 1]], choose = meas(1, 0, cut) >= meas(1, cut, 1) ? 0 : 1; const own = [1 - choose, choose]; return { cuts: [cut], pieces, own, steps: [{ x: cut, who: 0 }] }; }
      const left = [0, 1, 2], pieces = [], own = [], steps = []; let a = 0;
      while (left.length > 1) { let best = null; for (const i of left) { const x = point(i, a, 1 / 3); if (!best || x < best.x) best = { x, i }; } steps.push({ x: best.x, who: best.i }); pieces.push([a, best.x]); own[best.i] = pieces.length - 1; left.splice(left.indexOf(best.i), 1); a = best.x; }
      pieces.push([a, 1]); own[left[0]] = pieces.length - 1; return { cuts: steps.map(s => s.x), pieces, own, steps };
    }
    ck.fn = () => {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const P = plan(), el = (performance.now() - t0) / 1000, L = 30, Rr = w - 30, cy = 40, ch = 44, X = x => L + (Rr - L) * x;
      for (let k = 0; k < K; k++) { ctx.fillStyle = FL[k % FL.length]; ctx.globalAlpha = .85; ctx.fillRect(X(k / K) + 1, cy, (Rr - L) / K - 2, ch); } ctx.globalAlpha = 1;
      for (let i = 0; i < n; i++) { const y0 = cy + ch + 18 + i * 44; ctx.fillStyle = PAL[i]; ctx.font = "600 11px 'IBM Plex Mono', monospace"; ctx.fillText("P" + (i + 1), 4, y0 + 22); const mx = Math.max(...V[i]); for (let k = 0; k < K; k++) { const bh = 34 * V[i][k] / mx; ctx.globalAlpha = .75; ctx.fillRect(X(k / K) + 3, y0 + 34 - bh, (Rr - L) / K - 6, bh); } ctx.globalAlpha = 1; }
      const knifeT = n === 2 ? Math.min(1, el / 1.5) : Math.min(1, el / 5), kx = n === 2 ? P.cuts[0] * knifeT : knifeT;
      let done = 0; P.steps.forEach(s => { if (kx >= s.x - 1e-9) done++; });
      P.steps.slice(0, done).forEach(s => { ctx.strokeStyle = "#fff"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(X(s.x), cy - 10); ctx.lineTo(X(s.x), h - 20); ctx.stroke(); ctx.fillStyle = PAL[s.who]; ctx.fillText((n === 2 ? "P1 cuts" : `P${s.who + 1}: stop!`), X(s.x) - 30, cy - 14); });
      if (done < P.steps.length) { ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(X(kx), cy - 6); ctx.lineTo(X(kx), cy + ch + 6); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = C.gold; ctx.fillText("🔪", X(kx) - 7, cy - 4); }
      const finished = done === P.steps.length;
      if (finished) P.pieces.forEach((pc, j) => { const who = P.own.indexOf(j); ctx.fillStyle = PAL[who]; ctx.font = "600 12px 'IBM Plex Mono', monospace"; ctx.fillText("→ P" + (who + 1), X((pc[0] + pc[1]) / 2) - 18, cy + ch / 2 + 4); });
      if (finished) {
        const rows = []; for (let i = 0; i < n; i++) { const mine = meas(i, ...P.pieces[P.own[i]]), vals = P.pieces.map(pc => meas(i, ...pc)), envy = vals.some((v, j) => j !== P.own[i] && v > mine + 1e-9);
          rows.push(`P${i + 1} values the pieces at ${vals.map((v, j) => (j === P.own[i] ? "[" : "") + (v * 100).toFixed(1) + "%" + (j === P.own[i] ? "]" : "")).join("  ")}   gets ${(mine * 100).toFixed(1)}% ≥ ${(100 / n).toFixed(1)}% ✓${envy ? '  <span class="r">but envies another piece</span>' : '  <span class="t">no envy</span>'}`); }
        out.innerHTML = rows.join("\n") + `\n<span class="d">[brackets] = the piece that person received, valued by their own tastes</span>`;
      } else out.innerHTML = n === 2 ? "P1 cuts the cake into two pieces worth exactly half each — to P1…" : "the knife sweeps from the left; the first to think the piece is worth a third shouts stop…";
    };
    chips(p, ".ck-m", b => { n = +b.dataset.m; t0 = performance.now(); });
    p.querySelector(".ck-new").addEventListener("click", () => { seed++; tastes(); t0 = performance.now(); });
    tastes();
  },
  start() { ck.start(); }, stop() { ck.stop(); }
});

/* ================================================================ Apportionment */
const POP = [["A", 2724], ["B", 5041], ["C", 7169], ["D", 4555], ["E", 7100]];
function apportion(P, hS, method) {
  const T = P.reduce((a, b) => a + b, 0);
  if (method === "Hamilton") { const q = P.map(p => p * hS / T), s = q.map(Math.floor); let r = hS - s.reduce((a, b) => a + b, 0); q.map((x, i) => [x - s[i], i]).sort((a, b) => b[0] - a[0]).slice(0, r).forEach(([, i]) => s[i]++); return s; }
  // divisor methods: priority p / d(s) for the next seat
  const d = { Jefferson: s => s + 1, Webster: s => s + .5, "Huntington–Hill": s => Math.sqrt(s * (s + 1)) }[method];
  const s = P.map(() => method === "Huntington–Hill" ? 1 : 0); let seats = s.reduce((a, b) => a + b, 0);
  while (seats < hS) { let bi = 0, bv = -1; P.forEach((p, i) => { const v = d(s[i]) === 0 ? Infinity : p / d(s[i]); if (v > bv) { bv = v; bi = i; } }); s[bi]++; seats++; }
  return s;
}
registerAtom({
  id: "apportion", name: "Apportionment & the Alabama paradox", domain: "discrete", fields: ["game-theory"],
  html: `<h3>Sharing seats — the Alabama paradox</h3>
    <p class="ahint">A parliament of h seats is shared among five states in proportion to population. Exact shares are fractions, so something must be rounded. Hamilton's method gives each state its whole-number part, then hands leftover seats to the biggest remainders. Slide the house size from 12 to 13 and watch state B <i>lose</i> a seat when there are more seats to go round.</p>
    <div class="achips"><label class="achk">house size <input type="range" class="aq-h" min="8" max="40" value="12"> <b class="aq-hv"></b></label></div>
    <div class="aout aq-out"></div>
    <p class="awhy">In 1880 the US Census Office found that with Hamilton's method Alabama would get 8 seats in a House of 299 but only 7 in a House of 300 — the Alabama paradox. Divisor methods (Jefferson, Webster, Huntington–Hill) never do that, but they can break the 'quota' rule and give a state more than its share rounded up. Balinski and Young proved in 1982 that no method can avoid both flaws. The US House has used Huntington–Hill since 1941.</p>`,
  build(p) {
    const hI = p.querySelector(".aq-h"), out = p.querySelector(".aq-out"), P = POP.map(x => x[1]), M = ["Hamilton", "Jefferson", "Webster", "Huntington–Hill"];
    function draw() {
      const hS = +hI.value, T = P.reduce((a, b) => a + b, 0); p.querySelector(".aq-hv").textContent = hS;
      const now = M.map(m => apportion(P, hS, m)), prev = M.map(m => apportion(P, hS - 1, m));
      let s = `state  population  exact share   ${M.map(m => m.padEnd(16)).join("")}\n`;
      POP.forEach(([nm, pop], i) => { s += `${nm.padEnd(7)}${String(pop).padEnd(12)}${(pop * hS / T).toFixed(3).padEnd(14)}` + M.map((m, j) => { const lost = now[j][i] < prev[j][i], cell = (lost ? `${now[j][i]} ↓ (was ${prev[j][i]})` : String(now[j][i])).padEnd(16); return lost ? `<span class="r">${cell}</span>` : cell; }).join("") + "\n"; });
      const para = M.filter((_, j) => now[j].some((x, i) => x < prev[j][i]));
      out.innerHTML = s + (para.length ? `<span class="r">Alabama paradox (${para.join(", ")}): going from ${hS - 1} to ${hS} seats, a state loses one.</span>` : `<span class="d">no state loses a seat going from ${hS - 1} to ${hS}</span>`);
    }
    hI.addEventListener("input", draw); this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});
})();
