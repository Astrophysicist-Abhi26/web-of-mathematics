/* ============================================================
   THE WEB OF MATHEMATICS — atoms-numplay.js
   Number play & secret writing (domain: number)
     collatz · jugs · cipher · rsa
   ============================================================ */
(function () {
"use strict";
const { C, esc } = AtomKit;
const cv = (el, h) => AtomKit.canvas(el, h);
function sized(c, h) { let d = cv(c, h); return () => { if (c.clientWidth && Math.abs(c.clientWidth - d.w) > 1) d = cv(c, h); return d; }; }
function looper() {
  const L = { raf: null, fn: null,
    start() { if (L.fn && !L.raf) { const go = () => { L.fn(); L.raf = requestAnimationFrame(go); }; L.raf = requestAnimationFrame(go); } },
    stop() { if (L.raf) cancelAnimationFrame(L.raf); L.raf = null; } };
  return L;
}
const chips = (p, sel, cb) => p.querySelectorAll(sel).forEach(b => b.addEventListener("click", () => { p.querySelectorAll(sel).forEach(x => x.classList.toggle("on", x === b)); cb(b); }));
const INPUT = "font:.72rem 'IBM Plex Mono',monospace;color:var(--ink);background:#140c24;border:1px solid rgba(255,255,255,.18);border-radius:7px;padding:.3rem .5rem";
const gcd = (a, b) => { while (b) [a, b] = [b, a % b]; return Math.abs(a); };

/* ================================================================ Collatz */
const STOP = (() => { const N = 10000, s = new Uint16Array(N + 1); for (let n = 2; n <= N; n++) { let x = n, k = 0; while (x >= n) { x = x % 2 ? 3 * x + 1 : x / 2; k++; } s[n] = k + s[x]; } return s; })();
registerAtom({
  id: "collatz", name: "Collatz 3n + 1", domain: "number", fields: ["elementary-nt", "dynamical-systems"],
  html: `<h3>The Collatz problem — the simplest unsolved question in mathematics?</h3>
    <p class="ahint">Take any whole number. If it's even, halve it; if it's odd, triple it and add 1. Repeat. Does every start reach 1? Nobody knows. Pick a number and watch its flight.</p>
    <div class="achips"><input class="cz-n" type="text" value="27" style="${INPUT};width:150px"><button class="achip cz-go">fly</button>
      ${[27, 97, 871, 77031, 837799, 63728127, 670617279].map(n => `<button class="achip cz-p" data-n="${n}">${n.toLocaleString("en")}</button>`).join("")}</div>
    <canvas class="acv cz-cv"></canvas>
    <div class="aout cz-out"></div>
    <p class="awhy">Lothar Collatz posed it in 1937. Every start below 2⁶⁸ has been checked by computer (Barina, 2020), and Terence Tao proved in 2019 that almost every orbit eventually falls below any function that tends to infinity, however slowly — "almost" all the way to a proof. Erdős said mathematics is "not yet ready for such problems". The lower plot shows the flight length of every start up to 10,000: a strange, structured cloud nobody can explain.</p>`,
  build(p) {
    const c = p.querySelector(".cz-cv"), out = p.querySelector(".cz-out"), dims = sized(c, 380), inp = p.querySelector(".cz-n");
    function fly() {
      let n; try { n = BigInt(inp.value.replace(/[,\s_]/g, "")); } catch (e) { out.innerHTML = '<span class="r">type a whole number</span>'; return; }
      if (n < 1n) { out.innerHTML = '<span class="r">start from 1 or more</span>'; return; }
      if (n > 10n ** 30n) { out.innerHTML = '<span class="r">let us keep it below 10³⁰</span>'; return; }
      const orbit = [n]; let x = n, peak = n; while (x !== 1n && orbit.length < 20000) { x = x % 2n ? 3n * x + 1n : x / 2n; orbit.push(x); if (x > peak) peak = x; }
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const H1 = 210, L = 46, R = w - 10, lg = v => Math.log10(Number(v)), ymax = lg(peak) * 1.05 || 1, X = i => L + i / Math.max(1, orbit.length - 1) * (R - L), Y = v => H1 - 8 - lg(v) / ymax * (H1 - 24);
      ctx.font = "10px 'IBM Plex Mono', monospace";
      for (let e = 0; e <= ymax; e += Math.max(1, Math.ceil(ymax / 6))) { ctx.strokeStyle = "rgba(255,255,255,.07)"; ctx.beginPath(); ctx.moveTo(L, Y(10 ** e)); ctx.lineTo(R, Y(10 ** e)); ctx.stroke(); ctx.fillStyle = "#8d86a8"; ctx.fillText("10^" + e, 4, Y(10 ** e) + 3); }
      ctx.strokeStyle = C.gold; ctx.lineWidth = 1.6; ctx.beginPath(); orbit.forEach((v, i) => i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))); ctx.stroke();
      const ip = orbit.indexOf(peak); ctx.fillStyle = C.pink; ctx.beginPath(); ctx.arc(X(ip), Y(peak), 5, 0, 7); ctx.fill();
      const top = H1 + 16, H2 = h - top - 18, M = 10000, smax = 262;
      ctx.fillStyle = "#8d86a8"; ctx.fillText("flight length of every start n ≤ 10,000", L, top - 2);
      ctx.fillStyle = "rgba(127,227,214,.55)"; for (let k = 2; k <= M; k++) ctx.fillRect(L + k / M * (R - L), top + H2 - STOP[k] / smax * H2, 1.2, 1.2);
      if (n <= BigInt(M)) { const k = Number(n); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(L + k / M * (R - L), top + H2 - STOP[k] / smax * H2, 5, 0, 7); ctx.fill(); }
      const odd = orbit.filter(v => v % 2n).length;
      out.innerHTML = `start ${n.toLocaleString("en")}: reaches 1 after <span class="g">${orbit.length - 1}</span> steps (${odd - 1} of them 3n + 1)   highest point <span class="t">${peak.toLocaleString("en")}</span>${orbit.length >= 20000 ? '   <span class="r">(stopped after 20,000 steps)</span>' : ""}`;
    }
    p.querySelector(".cz-go").addEventListener("click", fly); inp.addEventListener("keydown", e => { if (e.key === "Enter") fly(); });
    p.querySelectorAll(".cz-p").forEach(b => b.addEventListener("click", () => { inp.value = b.dataset.n; fly(); }));
    this._go = fly;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ Water jugs */
const jg = looper();
registerAtom({
  id: "jugs", name: "Water jugs & gcd", domain: "number", fields: ["elementary-nt"],
  html: `<h3>The water-jug puzzle — Euclid's algorithm with a tap</h3>
    <p class="ahint">You have a 3-litre and a 5-litre jug, a tap and a drain. Measure exactly 4 litres. Fill, empty or pour one jug into the other until it's full or the first is empty. The right-hand grid tracks every state you visit.</p>
    <div class="achips">${[[3, 5, 4], [4, 9, 6], [7, 11, 6], [6, 9, 4], [8, 13, 1]].map(([a, b, t], i) => `<button class="achip jg-pre${i ? "" : " on"}" data-v="${a},${b},${t}">${a} & ${b} → ${t}</button>`).join("")}</div>
    <div class="achips"><button class="achip jg-op" data-o="fa">fill A</button><button class="achip jg-op" data-o="fb">fill B</button><button class="achip jg-op" data-o="ea">empty A</button><button class="achip jg-op" data-o="eb">empty B</button><button class="achip jg-op" data-o="ab">pour A → B</button><button class="achip jg-op" data-o="ba">pour B → A</button><button class="achip jg-solve">▶ shortest solution</button><button class="achip jg-reset">reset</button></div>
    <canvas class="acv jg-cv"></canvas>
    <div class="aout jg-out"></div>
    <p class="awhy">Every amount you can ever hold is a combination xa + yb of the two capacities, so the reachable amounts are exactly the multiples of gcd(a, b) up to the larger jug — Bézout's identity, and the reason 6- and 9-litre jugs can never give 4. Pouring back and forth is Euclid's algorithm run with water. Puzzles like this go back to Tartaglia (16th century) and Bachet (1612); Bruce Willis solves the 3-and-5 version in Die Hard with a Vengeance (1995).</p>`,
  build(p) {
    const c = p.querySelector(".jg-cv"), out = p.querySelector(".jg-out"), dims = sized(c, 330);
    let A = 3, B = 5, T = 4, x = 0, y = 0, moves = 0, path = [[0, 0]], queue = [], last = 0, msg = "", lw = 0, dirty = true;
    const op = (o, s) => { let [u, v] = s; if (o === "fa") u = A; if (o === "fb") v = B; if (o === "ea") u = 0; if (o === "eb") v = 0; if (o === "ab") { const k = Math.min(u, B - v); u -= k; v += k; } if (o === "ba") { const k = Math.min(v, A - u); v -= k; u += k; } return [u, v]; };
    const NAMES = { fa: "fill A", fb: "fill B", ea: "empty A", eb: "empty B", ab: "A → B", ba: "B → A" };
    function bfs() { const prev = new Map([["0,0", null]]), q = [[0, 0]]; while (q.length) { const s = q.shift(); if (s[0] === T || s[1] === T) { const seq = []; let k = s.join(); while (prev.get(k)) { const [pk, o] = prev.get(k); seq.unshift(o); k = pk; } return seq; } for (const o of Object.keys(NAMES)) { const t = op(o, s), k = t.join(); if (!prev.has(k)) { prev.set(k, [s.join(), o]); q.push(t); } } } return null; }
    const reset = () => { x = y = moves = 0; path = [[0, 0]]; queue = []; msg = ""; dirty = true; };
    const doOp = o => { [x, y] = op(o, [x, y]); moves++; path.push([x, y]); msg = NAMES[o]; dirty = true; };
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h);
      const jugW = Math.min(90, w * .12), maxC = Math.max(A, B), unit = (h - 70) / maxC, base = h - 30;
      [[A, x, "A", 30], [B, y, "B", 60 + jugW]].forEach(([cap, v, nm, ox]) => {
        const top = base - cap * unit; ctx.strokeStyle = "rgba(255,255,255,.5)"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(ox, top - 6); ctx.lineTo(ox, base); ctx.lineTo(ox + jugW, base); ctx.lineTo(ox + jugW, top - 6); ctx.stroke();
        const g = ctx.createLinearGradient(0, base - v * unit, 0, base); g.addColorStop(0, "rgba(122,168,255,.95)"); g.addColorStop(1, "rgba(63,120,220,.8)"); ctx.fillStyle = g; ctx.fillRect(ox + 2, base - v * unit, jugW - 4, v * unit);
        ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; for (let k = 1; k <= cap; k++) ctx.fillRect(ox + jugW - 8, base - k * unit, 6, 1);
        ctx.fillStyle = v === T ? C.gold : "#fff"; ctx.font = "600 14px 'IBM Plex Mono', monospace"; ctx.textAlign = "center"; ctx.fillText(`${v} / ${cap}`, ox + jugW / 2, base + 18); ctx.fillText(nm, ox + jugW / 2, top - 12); ctx.textAlign = "start";
      });
      const gx = 110 + 2 * jugW, gw = w - gx - 20, s = Math.min(gw / (A + .5), (h - 50) / (B + .5)), oy = h - 26;
      const P = ([u, v]) => [gx + u * s, oy - v * s];
      ctx.fillStyle = "rgba(255,255,255,.18)"; for (let u = 0; u <= A; u++) for (let v = 0; v <= B; v++) { ctx.beginPath(); ctx.arc(...P([u, v]), 2, 0, 7); ctx.fill(); }
      ctx.strokeStyle = "rgba(245,196,81,.35)"; ctx.lineWidth = 1; ctx.strokeRect(gx, oy - B * s, A * s, B * s);
      ctx.fillStyle = "rgba(245,196,81,.25)"; for (let v = 0; v <= B; v++) for (let u = 0; u <= A; u++) if (u === T || v === T) { ctx.beginPath(); ctx.arc(...P([u, v]), 5, 0, 7); ctx.fill(); }
      ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); path.forEach((q, i) => i ? ctx.lineTo(...P(q)) : ctx.moveTo(...P(q))); ctx.stroke();
      ctx.fillStyle = C.pink; ctx.beginPath(); ctx.arc(...P([x, y]), 6, 0, 7); ctx.fill();
      ctx.fillStyle = "#8d86a8"; ctx.font = "10px 'IBM Plex Mono', monospace"; ctx.fillText("states (A, B) — gold: a jug holds the target", gx, 14);
      const g0 = gcd(A, B), ok = T % g0 === 0 && T <= Math.max(A, B), won = x === T || y === T;
      out.innerHTML = `moves: ${moves}${msg ? "   last: " + msg : ""}   ${won ? '<span class="t">done — ' + T + " litres!</span>" : ""}\ngcd(${A}, ${B}) = <span class="g">${g0}</span>: ${ok ? `${T} is a multiple of ${g0}, so it can be done` : `<span class="r">${T} is not a multiple of ${g0} (or too big) — impossible</span>`}`;
    }
    p.querySelectorAll(".jg-op").forEach(b => b.addEventListener("click", () => { queue = []; doOp(b.dataset.o); }));
    p.querySelector(".jg-solve").addEventListener("click", () => { reset(); const s = bfs(); if (s) queue = s; else msg = "no sequence exists"; });
    p.querySelector(".jg-reset").addEventListener("click", reset);
    chips(p, ".jg-pre", b => { [A, B, T] = b.dataset.v.split(",").map(Number); reset(); });
    jg.fn = () => { const now = performance.now(); if (queue.length && now - last > 700) { last = now; doOp(queue.shift()); } if (c.clientWidth !== lw) { lw = c.clientWidth; dirty = true; } if (dirty) { dirty = false; draw(); } };
    draw();
  },
  start() { jg.start(); }, stop() { jg.stop(); }
});

/* ================================================================ Caesar & Vigenère */
const EN = [8.167, 1.492, 2.782, 4.253, 12.702, 2.228, 2.015, 6.094, 6.966, 0.153, 0.772, 4.025, 2.406, 6.749, 7.507, 1.929, 0.095, 5.987, 6.327, 9.056, 2.758, 0.978, 2.360, 0.150, 1.974, 0.074].map(v => v / 100);
const SAMPLE = "Secret writing is as old as writing itself. Julius Caesar shifted every letter of his military messages three places along the alphabet, and for centuries that was enough, because few people could read at all. The shield broke in the ninth century, when the Arab scholar al-Kindi noticed that every language leaves a fingerprint: in English the letter e is by far the most common, then t, a, o and n. Count the letters of a long enough message and the shift gives itself away. The answer was to change the shift from letter to letter using a keyword, the method named after Blaise de Vigenere and called the indecipherable cipher for three hundred years, until Charles Babbage and Friedrich Kasiski found that repeated words betray the length of the key.";
const shiftCh = (ch, k) => { const c0 = ch.charCodeAt(0); if (c0 >= 65 && c0 <= 90) return String.fromCharCode((c0 - 65 + k + 2600) % 26 + 65); if (c0 >= 97 && c0 <= 122) return String.fromCharCode((c0 - 97 + k + 2600) % 26 + 97); return ch; };
function vig(text, key, sign) { const K = key.toLowerCase().replace(/[^a-z]/g, "").split("").map(ch => ch.charCodeAt(0) - 97); if (!K.length) return text; let i = 0; return text.replace(/[a-z]/gi, ch => shiftCh(ch, sign * K[i++ % K.length])); }
const letters = t => t.toLowerCase().replace(/[^a-z]/g, "");
const freq = s => { const f = new Array(26).fill(0); for (const ch of s) f[ch.charCodeAt(0) - 97]++; return f; };
const chi = (f, n, k) => f.reduce((s, v, i) => { const e = EN[(i - k + 26) % 26] * n; return s + (v - e) ** 2 / e; }, 0);
const bestShift = s => { const f = freq(s); let b = 0, bv = Infinity; for (let k = 0; k < 26; k++) { const v = chi(f, s.length, k); if (v < bv) { bv = v; b = k; } } return b; };
const ic = s => { const f = freq(s), n = s.length; return n > 1 ? f.reduce((a, v) => a + v * (v - 1), 0) / (n * (n - 1)) : 0; };
registerAtom({
  id: "cipher", name: "Caesar & Vigenère cracker", domain: "number", fields: ["elementary-nt", "computational-nt"],
  html: `<h3>Breaking codes by counting letters</h3>
    <p class="ahint">Encrypt the text with a Caesar shift or a Vigenère keyword — then press "crack" and watch statistics recover the key without being told it. Edit the text if you like; the attack needs a few hundred letters.</p>
    <div class="achips"><button class="achip ci-m on" data-m="caesar">Caesar</button><button class="achip ci-m" data-m="vig">Vigenère</button>
      <label class="achk">key <input class="ci-k" value="3" spellcheck="false" style="${INPUT};width:110px"></label><button class="achip ci-crack">🔓 crack it</button></div>
    <textarea class="ci-t" spellcheck="false" style="width:100%;height:84px;${INPUT};line-height:1.5;resize:vertical">${SAMPLE}</textarea>
    <canvas class="acv ci-cv" style="margin-top:.4rem"></canvas>
    <div class="aout ci-out"></div>
    <p class="awhy">Al-Kindi's ninth-century <i>Manuscript on Deciphering Cryptographic Messages</i> is the first known description of frequency analysis. Vigenère-style ciphers survived until Babbage (c. 1854, unpublished) and Kasiski (1863): once you know the key length L, every L-th letter is a plain Caesar cipher. The index of coincidence — the chance two random letters of the text match — is about 0.066 for English but 0.038 for random letters, so it peaks at the right key length (William Friedman, 1922).</p>`,
  build(p) {
    const c = p.querySelector(".ci-cv"), out = p.querySelector(".ci-out"), dims = sized(c, 230), kI = p.querySelector(".ci-k"), tI = p.querySelector(".ci-t");
    let mode = "caesar", cracked = null;
    const encrypt = () => mode === "caesar" ? tI.value.replace(/[a-z]/gi, ch => shiftCh(ch, parseInt(kI.value, 10) || 0)) : vig(tI.value, kI.value, 1);
    function draw() {
      const { ctx, w, h } = dims(); ctx.clearRect(0, 0, w, h); const ct = encrypt(), L = letters(ct);
      ctx.font = "10px 'IBM Plex Mono', monospace";
      if (mode === "caesar" || (cracked && cracked.mode === "caesar")) {
        const f = freq(L), n = L.length || 1, bw = (w - 30) / 26, mx = Math.max(.14, ...f.map(v => v / n)), k = cracked ? cracked.k : null;
        for (let i = 0; i < 26; i++) { const x = 20 + i * bw, fh = f[i] / n / mx * (h - 40); ctx.fillStyle = "rgba(255,122,200,.75)"; ctx.fillRect(x + 2, h - 22 - fh, bw - 4, fh);
          if (k !== null) { const e = EN[(i - k + 26) % 26] / mx * (h - 40); ctx.strokeStyle = C.gold; ctx.lineWidth = 1.5; ctx.strokeRect(x + 2, h - 22 - e, bw - 4, e); }
          ctx.fillStyle = "#8d86a8"; ctx.fillText(String.fromCharCode(65 + i), x + bw / 2 - 3, h - 8); }
        ctx.fillStyle = "#cfc9e4"; ctx.fillText(k !== null ? "ciphertext letters (pink) against English shifted by " + k + " (gold outline)" : "letter counts of the ciphertext — press crack", 20, 14);
      } else {
        const K = 12, v = []; for (let m = 1; m <= K; m++) { let s = 0; for (let j = 0; j < m; j++) s += ic(L.split("").filter((_, i) => i % m === j).join("")); v.push(s / m); }
        const bw = (w - 60) / K, top = .08; ctx.fillStyle = "#cfc9e4"; ctx.fillText("index of coincidence if the key had length L (English ≈ 0.066, random ≈ 0.038)", 20, 14);
        v.forEach((val, i) => { const x = 40 + i * bw, fh = val / top * (h - 50); ctx.fillStyle = cracked && cracked.len === i + 1 ? C.gold : "rgba(122,168,255,.7)"; ctx.fillRect(x + 3, h - 22 - fh, bw - 6, fh); ctx.fillStyle = "#8d86a8"; ctx.fillText("L=" + (i + 1), x + bw / 2 - 12, h - 8); });
        [.038, .066].forEach(y => { const Y = h - 22 - y / top * (h - 50); ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(255,255,255,.3)"; ctx.beginPath(); ctx.moveTo(36, Y); ctx.lineTo(w - 10, Y); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = "#8d86a8"; ctx.fillText(y, 4, Y + 3); });
      }
      out.innerHTML = `<span class="d">ciphertext:</span> ${esc(ct.slice(0, 260))}${ct.length > 260 ? "…" : ""}` + (cracked ? `\n<span class="t">cracked:</span> key = <span class="g">${esc(cracked.key)}</span>   <span class="d">${esc(cracked.note)}</span>\n${esc(cracked.plain.slice(0, 200))}…` : "");
    }
    function crack() {
      const ct = encrypt(), L = letters(ct);
      if (L.length < 60) { cracked = { key: "?", note: "too little text to count", plain: "", mode }; return draw(); }
      if (mode === "caesar") { const k = bestShift(L); cracked = { mode, k, key: String(k), note: "the shift that makes the letter counts look most like English (chi-squared test)", plain: ct.replace(/[a-z]/gi, ch => shiftCh(ch, -k)) }; }
      else {
        const K = 12, v = []; for (let m = 1; m <= K; m++) { let s = 0; for (let j = 0; j < m; j++) s += ic(L.split("").filter((_, i) => i % m === j).join("")); v.push(s / m); }
        const top = Math.max(...v), len = v.findIndex(x => x > .9 * top) + 1;
        const key = Array.from({ length: len }, (_, j) => String.fromCharCode(97 + bestShift(L.split("").filter((_, i) => i % len === j).join("")))).join("");
        cracked = { mode, len, key, note: `key length ${len} from the index of coincidence, then each column is a Caesar shift`, plain: vig(ct, key, -1) };
      }
      draw();
    }
    chips(p, ".ci-m", b => { mode = b.dataset.m; kI.value = mode === "caesar" ? "3" : "lemon"; cracked = null; draw(); });
    [kI, tI].forEach(i => i.addEventListener("input", () => { cracked = null; draw(); }));
    p.querySelector(".ci-crack").addEventListener("click", crack);
    this._go = draw;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});

/* ================================================================ RSA toy */
const modpow = (b, e, m) => { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; };
const bgcd = (a, b) => { while (b) [a, b] = [b, a % b]; return a; };
const modinv = (a, m) => { let [r0, r1, s0, s1] = [a, m, 1n, 0n]; while (r1) { const q = r0 / r1; [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % m) + m) % m; };
function isPrime(n) { if (n < 2n) return false; for (const p of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]) { if (n === p) return true; if (n % p === 0n) return false; }
  let d = n - 1n, s = 0; while (!(d & 1n)) { d >>= 1n; s++; }
  for (const a of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n]) { let x = modpow(a, d, n); if (x === 1n || x === n - 1n) continue; let comp = true; for (let r = 1; r < s; r++) { x = x * x % n; if (x === n - 1n) { comp = false; break; } } if (comp) return false; } return true; }
function randPrime(digits) { const lo = 10 ** (digits - 1), hi = 10 ** digits; for (;;) { let n = BigInt(lo + Math.floor(Math.random() * (hi - lo))); if (!(n & 1n)) n++; while (!isPrime(n)) n += 2n; if (n < BigInt(hi)) return n; } }
registerAtom({
  id: "rsa", name: "RSA toy", domain: "number", fields: ["computational-nt", "elementary-nt"],
  html: `<h3>RSA — a lock anyone can close, but only you can open</h3>
    <p class="ahint">Pick two primes p and q. Publish n = pq and an exponent e; keep secret the d with e·d ≡ 1 (mod (p − 1)(q − 1)). Anyone can encrypt m ↦ mᵉ mod n; only d undoes it, because by Euler's theorem m^(ed) ≡ m. Finding d from n alone means factoring n — try it, and see how that scales.</p>
    <div class="achips"><span class="achk">prime size</span>${[2, 3, 4, 6, 8].map(d => `<button class="achip rs-d${d === 3 ? " on" : ""}" data-d="${d}">${d} digits</button>`).join("")}<button class="achip rs-new">new keys</button></div>
    <div class="achips"><label class="achk">message <input class="rs-m" value="Hi, Euler!" spellcheck="false" style="${INPUT};width:180px"></label><button class="achip rs-crack">🔨 attack: factor n</button></div>
    <div class="aout rs-out" style="min-height:180px"></div>
    <p class="awhy">Rivest, Shamir and Adleman published RSA in 1977 (Clifford Cocks had found it in 1973 at GCHQ, in secret). It rests on an asymmetry: multiplying two 300-digit primes is instant, but no known ordinary algorithm factors their product in less than astronomical time — RSA-250, 250 digits, took about 2,700 CPU-years in 2020. Shor's algorithm (1994) would factor quickly on a large quantum computer, which is why "post-quantum" schemes are being deployed now. Encrypting one letter at a time, as here, is only a toy: identical letters give identical ciphertexts, so frequency analysis breaks it.</p>`,
  build(p) {
    const out = p.querySelector(".rs-out"), mI = p.querySelector(".rs-m");
    let digits = 3, P, Q, N, PHI, E, D, attack = "";
    function keys() {
      do { P = randPrime(digits); Q = randPrime(digits); } while (P === Q || P * Q < 256n);
      N = P * Q; PHI = (P - 1n) * (Q - 1n); E = 65537n; if (E >= PHI || bgcd(E, PHI) !== 1n) { E = 3n; while (bgcd(E, PHI) !== 1n) E += 2n; }
      D = modinv(E, PHI); attack = ""; show();
    }
    function show() {
      const msg = [...mI.value].slice(0, 40), codes = msg.map(ch => BigInt(Math.min(ch.codePointAt(0), 1114111)));
      const bad = codes.some(m => m >= N), enc = codes.map(m => modpow(m, E, N)), dec = enc.map(c => modpow(c, D, N));
      out.innerHTML = `p = ${P}   q = ${Q}   <span class="d">(secret)</span>\n` +
        `n = p·q = <span class="g">${N}</span>   φ(n) = (p − 1)(q − 1) = ${PHI}\n` +
        `public key: (n, e = <span class="g">${E}</span>)   private key: d = <span class="t">${D}</span>   check e·d mod φ(n) = ${E * D % PHI}\n\n` +
        (bad ? '<span class="r">some character codes are bigger than n — pick bigger primes</span>' :
        `message as numbers:  ${codes.join(" ")}\nencrypted  mᵉ mod n: <span class="g">${enc.join(" ")}</span>\ndecrypted  cᵈ mod n: ${dec.join(" ")}  →  "<span class="t">${esc(String.fromCodePoint(...dec.map(Number)))}</span>"`) + (attack ? "\n\n" + attack : "");
    }
    function crack() {
      // Pollard's rho: a pseudo-random walk mod n that collides mod the hidden factor after about n^(1/4) steps
      const t0 = performance.now(); let f = 1n, steps = 0;
      for (let c = 1n; f === 1n || f === N; c++) { let x = 2n, y = 2n; f = 1n; while (f === 1n) { x = (x * x + c) % N; y = (y * y + c) % N; y = (y * y + c) % N; f = bgcd(x > y ? x - y : y - x, N); steps++; } }
      const ms = performance.now() - t0, dg = N.toString().length, dd = modinv(E, (f - 1n) * (N / f - 1n));
      attack = `<span class="r">factored n = ${f} × ${N / f} with Pollard's rho in ${ms.toFixed(1)} ms (${steps.toLocaleString("en")} steps) → d = ${dd}: the key is broken</span>\n<span class="d">n has ${dg} digits. Rho needs about n^¼ steps; for a 617-digit RSA-2048 modulus that is ~10^154 — far beyond any computer. The best known method, the number field sieve, still needs about 2^112 ≈ 10^34 operations — RSA-2048 is rated at "112-bit security".</span>`;
      show();
    }
    chips(p, ".rs-d", b => { digits = +b.dataset.d; keys(); });
    p.querySelector(".rs-new").addEventListener("click", keys);
    p.querySelector(".rs-crack").addEventListener("click", crack);
    mI.addEventListener("input", show);
    this._go = keys;
  },
  start() { if (this._go && !this._did) { this._did = true; this._go(); } }
});
})();
