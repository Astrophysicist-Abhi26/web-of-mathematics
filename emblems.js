/* ============================================================
   THE WEB OF MATHEMATICS — emblems.js
   Until a photo is added at portraits/<id>.jpg, each pioneer's
   medallion carries a gold line-art emblem of their signature
   idea instead of bare initials. Every emblem is drawn in a
   100 × 100 box centred on (50, 50), inside a radius of ~38.
   Lines inherit stroke/fill from pioneers.js; text sets its own.
   A real photo always wins over an emblem.
   ============================================================ */
(function () {
"use strict";

const T = (x, y, s, txt, extra) =>
  `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" fill="currentColor" stroke="none" font-family="Fraunces, Georgia, serif" ${extra || ""}>${txt}</text>`;
const M = (x, y, s, txt) =>
  `<text x="${x}" y="${y}" font-size="${s}" text-anchor="middle" fill="currentColor" stroke="none" font-family="IBM Plex Mono, monospace">${txt}</text>`;
const dot = (x, y, r) => `<circle cx="${x}" cy="${y}" r="${r || 2.6}" fill="currentColor" stroke="none"/>`;
const poly = (n, r, rot, cx, cy) => {
  const pts = [];
  for (let i = 0; i < n; i++) { const a = (rot || -Math.PI / 2) + i * 2 * Math.PI / n; pts.push(((cx || 50) + r * Math.cos(a)).toFixed(1) + "," + ((cy || 50) + r * Math.sin(a)).toFixed(1)); }
  return `<polygon points="${pts.join(" ")}"/>`;
};
function rng(seed) { let s = seed; return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; }; }
function walk(seed, n, x0, y0, dx, amp) {
  const r = rng(seed); let x = x0, y = y0, d = `M${x} ${y}`;
  for (let i = 0; i < n; i++) { x += dx; y += (r() - .5) * amp; d += ` L${x.toFixed(1)} ${y.toFixed(1)}`; }
  return `<path d="${d}"/>`;
}
function hilbert(order, size, off) {
  const pts = [], n = 1 << order;
  for (let i = 0; i < n * n; i++) {
    let t = i, x = 0, y = 0;
    for (let s = 1; s < n; s *= 2) {
      const rx = 1 & (t / 2), ry = 1 & (t ^ rx);
      if (ry === 0) { if (rx === 1) { x = s - 1 - x; y = s - 1 - y; } const tmp = x; x = y; y = tmp; }
      x += s * rx; y += s * ry; t = Math.floor(t / 4);
    }
    pts.push([off + (x + .5) * size / n, off + (y + .5) * size / n]);
  }
  return `<polyline points="${pts.map(p => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}"/>`;
}
function fibSpiral() {
  // golden rectangle cut into squares 8, 5, 3, 2, 1, 1 with the quarter-arc spiral
  const k = 4.2, x0 = 50 - 6.5 * k, y0 = 50 - 4 * k;
  const sq = [[0, 0, 8], [8, 0, 5], [10, 5, 3], [8, 6, 2], [8, 5, 1], [9, 5, 1]];
  let s = sq.map(([x, y, w]) => `<rect x="${(x0 + x * k).toFixed(1)}" y="${(y0 + y * k).toFixed(1)}" width="${(w * k).toFixed(1)}" height="${(w * k).toFixed(1)}" stroke-width="1.1" opacity=".5"/>`).join("");
  const P = (x, y) => `${(x0 + x * k).toFixed(1)} ${(y0 + y * k).toFixed(1)}`;
  s += `<path d="M${P(0, 8)} A${8 * k} ${8 * k} 0 0 1 ${P(8, 0)} A${5 * k} ${5 * k} 0 0 1 ${P(13, 5)} A${3 * k} ${3 * k} 0 0 1 ${P(10, 8)} A${2 * k} ${2 * k} 0 0 1 ${P(8, 6)} A${k} ${k} 0 0 1 ${P(9, 5)}"/>`;
  return s;
}
function pascalDots() {
  let s = "";
  for (let r = 0; r < 6; r++) for (let c = 0; c <= r; c++) {
    const x = 50 + (c - r / 2) * 11, y = 22 + r * 11;
    // odd binomial coefficients filled: Sierpinski's triangle hides inside
    const odd = (c & (r - c)) === 0;
    s += odd ? dot(x, y, 3) : `<circle cx="${x}" cy="${y}" r="3"/>`;
  }
  return s;
}
function cantorDiag() {
  let s = `<rect x="22" y="22" width="56" height="56"/>`;
  for (let i = 1; i < 5; i++) s += `<path d="M22 ${22 + i * 11.2}H78M${22 + i * 11.2} 22V78" stroke-width="1.2" opacity=".6"/>`;
  for (let i = 0; i < 5; i++) s += `<rect x="${22 + i * 11.2 + 2}" y="${22 + i * 11.2 + 2}" width="7.2" height="7.2" fill="currentColor" stroke="none"/>`;
  return s;
}
function lifeGlider() {
  const cells = [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]]; let s = "";
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s += `<rect x="${28 + i * 11}" y="${28 + j * 11}" width="10" height="10" stroke-width="1" opacity=".45"/>`;
  cells.forEach(([i, j]) => { s += `<rect x="${28 + i * 11 + 1.5}" y="${28 + j * 11 + 1.5}" width="7" height="7" fill="currentColor" stroke="none"/>`; });
  return s;
}
function hexPack() {
  let s = ""; const r = 9;
  for (let row = -2; row <= 2; row++) for (let col = -2; col <= 2; col++) {
    const x = 50 + col * 2 * r + (row % 2 ? r : 0), y = 50 + row * r * Math.sqrt(3);
    if (Math.hypot(x - 50, y - 50) < 30) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r - .8}"/>`;
  }
  return s;
}
function randomGraph() {
  const r = rng(7), pts = [];
  for (let i = 0; i < 9; i++) { const a = i / 9 * 2 * Math.PI; pts.push([50 + 30 * Math.cos(a), 50 + 30 * Math.sin(a)]); }
  let s = "";
  for (let i = 0; i < 9; i++) for (let j = i + 1; j < 9; j++) if (r() < .3) s += `<path d="M${pts[i][0].toFixed(1)} ${pts[i][1].toFixed(1)}L${pts[j][0].toFixed(1)} ${pts[j][1].toFixed(1)}" stroke-width="1.4"/>`;
  return s + pts.map(p => dot(p[0].toFixed(1), p[1].toFixed(1), 3)).join("");
}
function weierstrassW() {
  let d = "";
  for (let i = 0; i <= 120; i++) {
    const x = i / 120, t = x * Math.PI * 2;
    let y = 0; for (let k = 0; k < 6; k++) y += Math.pow(.6, k) * Math.cos(Math.pow(4, k) * t);
    d += (i ? " L" : "M") + (20 + x * 60).toFixed(1) + " " + (50 - y * 11).toFixed(1);
  }
  return `<path d="${d}" stroke-width="1.8"/>`;
}
function mandel() {
  // main cardioid (cusp at c = ¼), the period-2 disc at c = −1, and the next bulb
  const X = x => (50 + (x + .5) * 40).toFixed(1), Y = y => (50 + y * 40).toFixed(1);
  let d = "";
  for (let i = 0; i <= 90; i++) {
    const t = i / 90 * 2 * Math.PI;
    const x = .5 * Math.cos(t) - .25 * Math.cos(2 * t), y = .5 * Math.sin(t) - .25 * Math.sin(2 * t);
    d += (i ? " L" : "M") + X(x) + " " + Y(y);
  }
  return `<path d="${d} Z"/><circle cx="${X(-1)}" cy="50" r="10"/><circle cx="${X(-1.3107)}" cy="50" r="2.4"/><circle cx="${X(-.1226)}" cy="${Y(.7449)}" r="3.8"/><circle cx="${X(-.1226)}" cy="${Y(-.7449)}" r="3.8"/>`;
}
function ellipticCurve() {
  // y² = x³ − x : an oval for −1 ≤ x ≤ 0 and an open branch for x ≥ 1
  const X = x => (50 + (x - .35) * 21).toFixed(1), Y = y => (50 - y * 21).toFixed(1);
  let top = "", bot = "";
  for (let i = 0; i <= 30; i++) { const x = -1 + i / 30, y = Math.sqrt(Math.max(0, x * x * x - x)); top += (i ? " L" : "M") + X(x) + " " + Y(y); bot = " L" + X(x) + " " + Y(-y) + bot; }
  const pts = [];
  for (let i = 30; i >= 0; i--) { const x = 1 + i / 30 * .72; pts.push(X(x) + " " + Y(Math.sqrt(x * x * x - x))); }
  for (let i = 1; i <= 30; i++) { const x = 1 + i / 30 * .72; pts.push(X(x) + " " + Y(-Math.sqrt(x * x * x - x))); }
  const br = "M" + pts.join(" L");
  return `<path d="${top}${bot} Z"/><path d="${br}"/><path d="M14 50 H86" stroke-width="1" opacity=".4"/>`;
}
function saddle() { return `<path d="M20 40 Q50 62 80 40"/><path d="M20 40 Q35 25 50 30 Q65 25 80 40" opacity=".6"/><path d="M26 64 Q50 44 74 64"/><path d="M20 40 L26 64M80 40L74 64" opacity=".6"/>`; }
function kbridges() {
  const A = [42, 50], B = [52, 18], C = [52, 82], Dd = [82, 50];
  const q = (P, Q, bend) => { const mx = (P[0] + Q[0]) / 2 + bend[0], my = (P[1] + Q[1]) / 2 + bend[1]; return `<path d="M${P[0]} ${P[1]} Q${mx} ${my} ${Q[0]} ${Q[1]}"/>`; };
  return q(A, B, [-9, 0]) + q(A, B, [7, 4]) + q(A, C, [-9, 0]) + q(A, C, [7, -4]) + q(A, Dd, [0, 0]) + q(B, Dd, [4, -2]) + q(C, Dd, [4, 2]) +
    [A, B, C, Dd].map(p => dot(p[0], p[1], 3.6)).join("");
}

const E = {
  euclid: `<circle cx="50" cy="50" r="34"/><path d="M50 16 L79.4 67 L20.6 67 Z"/><path d="M50 16 V67" stroke-width="1.4" opacity=".6"/>${dot(50, 50, 2.4)}`,
  archimedes: `<rect x="23" y="24" width="54" height="52" rx="1"/><ellipse cx="50" cy="24" rx="27" ry="5"/><ellipse cx="50" cy="76" rx="27" ry="5" opacity=".6"/><circle cx="50" cy="50" r="25"/>`,
  diophantus: `<path d="M24 74 L76 74 L76 32 Z"/><path d="M70 74 V68 H76" stroke-width="1.4"/>${M(50, 86, 9, "4")}${M(84, 56, 9, "3")}${M(45, 49, 9, "5")}`,
  hypatia: `<ellipse cx="50" cy="56" rx="30" ry="16"/><path d="M24 20 Q50 88 76 20"/><path d="M14 50 Q30 54 34 34 M86 50 Q70 54 66 34" opacity=".7"/>`,
  brahmagupta: `<circle cx="50" cy="50" r="33"/><polygon points="24,38 58,18 82,52 40,80"/>${T(50, 60, 22, "0")}`,
  khwarizmi: `<rect x="20" y="20" width="60" height="60"/><rect x="34" y="34" width="32" height="32"/><path d="M34 20V34M66 20V34M34 66V80M66 66V80M20 34H34M20 66H34M66 34H80M66 66H80" stroke-width="1.6"/>${T(50, 56, 16, "x²")}`,
  khayyam: `<circle cx="54" cy="56" r="22"/><path d="M16 24 Q50 96 84 24"/>${dot(37, 44)}${dot(73, 44)}`,
  fibonacci: fibSpiral() + `<rect x="31" y="23" width="29" height="29" stroke-width="1.2" opacity=".55"/><rect x="42" y="52" width="18" height="18" stroke-width="1.2" opacity=".55"/>`,
  madhava: `<path d="M22 78 V22 A56 56 0 0 1 78 78 Z" opacity=".6"/><path d="M22 70 H70 V58 H52 V66 H62 V62" stroke-width="1.6"/>${T(58, 44, 13, "π/4")}`,
  cardano: `<path d="M18 66 C30 20 44 20 50 50 S70 80 82 34"/><path d="M14 50 H86" stroke-width="1.1" opacity=".5"/>${M(50, 88, 9, "√−15")}`,
  descartes: `<path d="M20 80 V16 M20 80 H86" /><path d="M20 80 Q48 76 60 50 T80 18" stroke-width="2.2"/>${dot(60, 50, 3)}<path d="M60 50 V80 M20 50 H60" stroke-width="1" stroke-dasharray="3 3"/>`,
  fermat: `${T(50, 46, 17, "xⁿ+yⁿ")}${T(50, 70, 17, "≠ zⁿ")}<path d="M26 78 H74" stroke-width="1" opacity=".5"/>`,
  pascal: pascalDots(),
  newton: `<ellipse cx="50" cy="50" rx="34" ry="21"/>${dot(36, 50, 4.2)}${dot(84, 50, 2.6)}${T(62, 30, 18, "ẋ")}`,
  leibniz: `${T(42, 72, 58, "∫", 'font-style="italic"')}${T(70, 62, 16, "dx")}`,
  bernoulli: (() => { let d = ""; for (let i = 0; i <= 90; i++) { const t = i / 90 * 4.4 * Math.PI, r = 2.2 * Math.exp(.19 * t); d += (i ? " L" : "M") + (50 + r * Math.cos(t)).toFixed(1) + " " + (50 + r * Math.sin(t)).toFixed(1); } return `<path d="${d}"/>`; })(),
  euler: kbridges(),
  lagrange: `${T(50, 60, 26, "δS=0")}<path d="M22 72 Q50 82 78 72" stroke-width="1.4" opacity=".6"/>`,
  laplace: `${T(46, 64, 40, "Δ")}${T(71, 64, 13, "u=0")}<path d="M18 78 Q50 34 82 78" stroke-width="1.2" opacity=".5"/>`,
  fourier: `<path d="M16 62 H30 V38 H50 V62 H70 V38 H84" stroke-width="1.4" opacity=".55"/><path d="M16 62 C22 34 28 36 32 40 S38 38 40 38 S46 36 50 56 S56 66 60 62 S66 60 70 44 S76 34 84 40"/>`,
  gauss: poly(17, 33) + `${T(50, 57, 17, "17")}`,
  germain: `<rect x="20" y="20" width="60" height="60"/><path d="M20 20 L80 80 M80 20 L20 80" stroke-width="1.6"/><circle cx="50" cy="50" r="17" stroke-width="1.6"/>`,
  cauchy: `<path d="M30 30 Q50 14 72 30 Q88 50 70 72 Q50 86 30 72 Q14 50 30 30 Z"/><path d="M66 22 l8 7 -10 2" stroke-width="2"/>${dot(52, 50, 3.4)}${T(50, 92, 11, "∮")}`,
  lobachevsky: `<circle cx="50" cy="50" r="36"/><path d="M26 34 A30 30 0 0 0 64 26 M64 26 A34 34 0 0 0 58 76 M58 76 A30 30 0 0 0 26 34"/>`,
  abel: `${T(50, 58, 24, "x⁵")}<circle cx="50" cy="50" r="31"/><path d="M28 72 L72 28" stroke-width="1.8"/>`,
  galois: `<path d="M50 18 L28 44 L50 82 L72 44 Z M28 44 L72 44 M50 18 V82" stroke-width="1.6"/>${dot(50, 18, 4)}${dot(28, 44, 4)}${dot(72, 44, 4)}${dot(50, 82, 4)}${dot(50, 44, 3)}`,
  hamilton: `${T(50, 52, 22, "i j k")}${M(50, 72, 11, "= −1")}<ellipse cx="50" cy="48" rx="36" ry="14" opacity=".4"/>`,
  boole: `<path d="M22 30 H44 A20 20 0 0 1 44 70 H22 Z"/><path d="M10 40 H22 M10 60 H22 M64 50 H86"/>${M(33, 55, 10, "∧")}`,
  weierstrass: weierstrassW(),
  kronecker: `${T(50, 68, 50, "ℤ")}`,
  riemann: `<path d="M18 50 H82 M50 16 V84" stroke-width="1" opacity=".5"/><path d="M58 16 V84" stroke-dasharray="4 3"/>${dot(58, 26, 2.6)}${dot(58, 37, 2.6)}${dot(58, 63, 2.6)}${dot(58, 74, 2.6)}${T(34, 42, 20, "ζ")}`,
  dedekind: `<path d="M14 58 H86"/><path d="M50 44 V72" stroke-width="2.4"/>${T(32, 44, 13, "A")}${T(68, 44, 13, "B")}${M(50, 88, 10, "√2")}`,
  cantor: cantorDiag(),
  kovalevskaya: `<path d="M50 84 L32 50 Q50 34 68 50 Z"/><ellipse cx="50" cy="48" rx="19" ry="6"/><path d="M50 36 V20"/><path d="M36 22 Q50 14 64 22" stroke-width="1.4"/>`,
  lie: `<circle cx="50" cy="56" r="26"/><path d="M50 30 H82 M76 26 L82 30 76 34" stroke-width="2"/>${dot(50, 30, 3.4)}${T(66, 22, 12, "𝔤")}`,
  klein: `<path d="M58 30 C84 28 86 80 60 80 C46 80 40 72 40 64"/><path d="M58 30 C48 14 22 16 20 34 C18 52 32 60 40 64"/><path d="M54 36 C44 24 28 26 27 36 C26 48 36 55 44 58" stroke-width="1.6" opacity=".7"/><ellipse cx="42" cy="61" rx="4.6" ry="2.6" stroke-width="1.6"/>`,
  frege: `${T(50, 46, 20, "∀x")}${T(50, 72, 20, "∃y")}`,
  poincare: `<ellipse cx="50" cy="50" rx="36" ry="20"/><path d="M34 50 Q50 60 66 50 M38 53 Q50 44 62 53"/><ellipse cx="72" cy="50" rx="6" ry="15" stroke-dasharray="3 2.5"/>`,
  hilbert: hilbert(3, 60, 20),
  russell: `${T(50, 58, 22, "R∈R ?")}<circle cx="50" cy="50" r="33" stroke-dasharray="2 4"/>`,
  zermelo: `${M(50, 57, 14, "{∅,{∅}}")}<circle cx="50" cy="50" r="33"/>`,
  hausdorff: `<circle cx="34" cy="50" r="16" stroke-dasharray="4 3"/><circle cx="68" cy="50" r="16" stroke-dasharray="4 3"/>${dot(34, 50, 3.2)}${dot(68, 50, 3.2)}`,
  lebesgue: `<path d="M16 76 C30 20 46 20 56 50 S74 80 86 30"/><path d="M16 40 H86 M16 52 H86 M16 64 H86" stroke-width="1" opacity=".5"/>`,
  hardy: `<circle cx="50" cy="50" r="31"/><path d="M50 19 A31 31 0 0 1 72 28 M81 50 A31 31 0 0 1 72 72 M50 81 A31 31 0 0 1 28 72 M19 50 A31 31 0 0 1 28 28" stroke-width="5"/>`,
  ramanujan: `${T(50, 60, 26, "1729")}<path d="M22 70 H78" stroke-width="1.2" opacity=".6"/>`,
  noether: `${T(50, 58, 16, "I₁⊂I₂⊂I₃")}<path d="M22 70 H74 M68 65 L74 70 68 75" stroke-width="1.6"/>`,
  birkhoff: `<path d="M50 18 L26 42 L36 70 L50 84 L74 50 Z" stroke-width="1.8"/>${dot(50, 18, 3.6)}${dot(26, 42, 3.6)}${dot(36, 70, 3.6)}${dot(50, 84, 3.6)}${dot(74, 50, 3.6)}`,
  brouwer: `<circle cx="50" cy="50" r="33"/><path d="M50 26 A24 24 0 1 1 28 58" stroke-width="1.8"/><path d="M26 50 l2 9 7 -6" stroke-width="1.8"/>${dot(50, 50, 3.6)}`,
  banach: `<circle cx="50" cy="50" r="26"/><rect x="24" y="24" width="52" height="52"/><path d="M50 24 L76 50 L50 76 L24 50 Z"/>`,
  kolmogorov: walk(11, 24, 16, 60, 2.8, 18) + `<path d="M16 76 H86" stroke-width="1" opacity=".5"/>`,
  vonneumann: `<path d="M26 26 V74 M74 26 V74 M26 26 H30 M26 74 H30 M74 26 H70 M74 74 H70"/>${M(40, 46, 13, "3")}${M(60, 46, 13, "−1")}${M(40, 66, 13, "−2")}${M(60, 66, 13, "4")}`,
  godel: `${T(50, 58, 28, "G")}<path d="M26 34 A30 30 0 1 1 30 70" stroke-width="1.8"/><path d="M24 64 l6 7 4 -8" stroke-width="1.8"/>`,
  turing: `<path d="M12 50 H88 M12 64 H88" /><path d="M24 50 V64 M36 50 V64 M48 50 V64 M60 50 V64 M72 50 V64" stroke-width="1.4"/>${M(42, 61, 10, "1")}${M(54, 61, 10, "0")}${M(66, 61, 10, "1")}<path d="M54 30 L48 42 H60 Z"/>`,
  eilenberg: `${dot(28, 30)}${dot(72, 30)}${dot(28, 70)}${dot(72, 70)}<path d="M34 30 H64 M28 36 V62 M72 36 V62 M34 70 H64" /><path d="M60 26 l4 4 -4 4 M68 58 l4 4 4 -4 M60 66 l4 4 -4 4 M24 58 l4 4 4 -4" stroke-width="1.6"/>`,
  maclane: `${dot(28, 30)}${dot(72, 30)}${dot(50, 72)}<path d="M34 30 H64 M31 36 L47 64 M69 36 L53 64"/><path d="M60 26 l4 4 -4 4" stroke-width="1.6"/>${T(50, 42, 11, "η")}`,
  chern: `${T(50, 60, 26, "c(E)")}<path d="M20 72 C35 60 65 84 80 72" stroke-width="1.6"/>`,
  stone: `<path d="M16 34 H84"/><path d="M16 50 H38 M62 50 H84"/><path d="M16 66 H23 M31 66 H38 M62 66 H69 M77 66 H84"/>`,
  ito: walk(3, 34, 16, 50, 2.06, 9) + `${T(72, 84, 13, "dB")}`,
  nash: `<path d="M20 78 L80 26"/><path d="M20 30 Q50 40 80 76" />${dot(52, 50, 4)}`,
  arobinson: `<path d="M14 50 H86"/><circle cx="50" cy="50" r="14" stroke-dasharray="3 3"/>${dot(50, 50, 2.6)}${T(50, 80, 14, "ε")}`,
  juliarobinson: `${T(50, 52, 16, "P(x)=0")}${M(50, 72, 10, "x ∈ ℤⁿ ?")}`,
  serre: (() => { let s = ""; for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) s += dot(24 + i * 17, 26 + j * 16, 2.4); return s + `<path d="M58 42 L32 58 M75 42 L49 58 M75 58 L49 74" stroke-width="1.8"/>`; })(),
  atiyah: `${T(50, 46, 16, "ind D")}${T(50, 70, 16, "= ∫ Â")}`,
  langlands: `<circle cx="30" cy="50" r="15"/><circle cx="70" cy="50" r="15"/><path d="M45 46 H55 M45 54 H55" stroke-width="1.6"/>${M(30, 54, 9, "Gal")}${M(70, 54, 9, "Aut")}`,
  cohen: `<path d="M50 84 V66 M50 66 L32 48 M50 66 L68 48 M32 48 L22 32 M32 48 L40 30 M68 48 L60 30 M68 48 L78 32 M22 32 L18 20 M40 30 L44 18"/>${dot(44, 18, 2.4)}`,
  conway: lifeGlider(),
  matiyasevich: `${T(50, 54, 22, "F₂ₙ")}${M(50, 74, 10, "∃x P=0")}`,
  thurston: `<path d="M22 30 C22 50 36 56 40 80 M78 30 C78 50 64 56 60 80"/><ellipse cx="50" cy="30" rx="28" ry="8"/><ellipse cx="50" cy="80" rx="10" ry="3" opacity=".7"/><path d="M34 56 Q50 62 66 56" stroke-dasharray="3 2.5"/>`,
  mandelbrot: mandel(),
  uhlenbeck: `<path d="M16 66 Q40 50 50 58 Q60 50 84 66"/><circle cx="50" cy="42" r="14"/>`,
  wiles: ellipticCurve(),
  tao: `<path d="M14 60 H86"/>${[18, 30, 42, 54, 66, 78].map(x => dot(x, 60, 3.4)).join("")}<path d="M18 50 Q24 40 30 50 M30 50 Q36 40 42 50 M42 50 Q48 40 54 50" stroke-width="1.4"/>${M(50, 82, 9, "5 11 17 23 29")}`,
  drinfeld: `<path d="M28 26 C40 44 60 56 72 74 M50 22 C50 40 50 60 50 78 M72 26 C60 44 40 56 28 74" stroke-width="2"/>${dot(28, 26)}${dot(50, 22)}${dot(72, 26)}${M(50, 88, 7, "R₁₂R₁₃R₂₃")}`,
  gaitsgory: `<rect x="16" y="36" width="26" height="26" rx="5"/><rect x="58" y="36" width="26" height="26" rx="5"/><path d="M44 46 H56 M44 52 H56" stroke-width="1.6"/>${M(29, 53, 8, "Bun")}${M(71, 53, 8, "Loc")}${M(50, 80, 8, "G ↔ Ǧ")}`,
  scholze: `${T(46, 62, 34, "K")}${T(68, 44, 20, "♭")}`,
  viazovska: hexPack(),
  grothendieck: `<path d="M12 44 Q24 34 36 44 T60 44 T84 44 M12 58 Q24 48 36 58 T60 58 T84 58 M12 72 Q24 62 36 72 T60 72 T84 72"/>${M(50, 30, 11, "Spec")}`,
  perelman: `<path d="M30 30 C12 30 12 70 30 70 C40 70 44 56 50 56 C56 56 60 70 70 70 C88 70 88 30 70 30 C60 30 56 44 50 44 C44 44 40 30 30 30 Z"/><path d="M50 44 V56" stroke-dasharray="2 2"/>`,
  bayes: `${T(50, 56, 20, "P(H|E)")}<path d="M22 68 H78" stroke-width="1.2" opacity=".6"/>`,
  dyson: (() => { let s = `<path d="M18 70 A32 32 0 0 1 82 70" />`; for (let i = 0; i < 9; i++) { const x = 22 + i * 7, h = 30 * Math.sqrt(Math.max(0, 1 - ((x + 3.5 - 50) / 32) ** 2)); s += `<rect x="${x}" y="${(70 - h).toFixed(1)}" width="5.6" height="${h.toFixed(1)}" fill="currentColor" stroke="none" opacity=".45"/>`; } return s + `<path d="M14 70 H86" stroke-width="1.2"/>`; })(),
  szemeredi: `${[0, 1, 2, 3, 4, 5, 6, 7].map(i => dot(18 + i * 9, 40, i % 3 === 0 ? 3.6 : 2)).join("")}${[0, 1, 2, 3, 4, 5, 6, 7].map(i => dot(18 + i * 9, 62, [1, 3, 5, 7].includes(i) ? 3.6 : 2)).join("")}<path d="M18 30 Q31 22 45 30 Q58 22 72 30" stroke-width="1.4"/>`,
  gromov: `<path d="M22 74 Q46 54 50 22 Q54 54 78 74 Q50 60 22 74 Z"/>${T(50, 90, 11, "δ-thin")}`,
  voevodsky: `${dot(26, 60, 3.6)}${dot(74, 60, 3.6)}<path d="M26 60 C38 30 62 30 74 60"/><path d="M26 60 C38 82 62 82 74 60"/><path d="M50 38 V76" stroke-dasharray="3 3" stroke-width="1.4"/>${T(50, 28, 13, "a = b")}`,
  erdos: randomGraph(),
  weil: (() => { let s = ""; const p = 7; for (let x = 0; x < p; x++) for (let y = 0; y < p; y++) { const on = (y * y) % p === (x * x * x + 2 * x + 3) % p; s += on ? dot(24 + x * 8.7, 76 - y * 8.7, 3.2) : `<circle cx="${(24 + x * 8.7).toFixed(1)}" cy="${(76 - y * 8.7).toFixed(1)}" r="1" fill="currentColor" stroke="none" opacity=".35"/>`; } return s + `<rect x="18" y="18" width="64" height="64" stroke-width="1" opacity=".4"/>`; })(),
  mirzakhani: `<path d="M24 50 C24 30 44 28 50 40 C56 28 76 30 76 50 C76 70 56 72 50 60 C44 72 24 70 24 50 Z"/><ellipse cx="37" cy="50" rx="6" ry="4"/><ellipse cx="63" cy="50" rx="6" ry="4"/><path d="M30 50 C30 36 46 36 50 50 C54 64 70 64 70 50" stroke-dasharray="3 2"/>`
};
window.EMBLEMS = E;
})();
