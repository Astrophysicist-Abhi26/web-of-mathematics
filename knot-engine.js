/* ============================================================
   THE WEB OF MATHEMATICS — knot-engine.js
   A small knot-theory engine used by the knot atoms.
   Input: a link as a list of closed 3D polylines.
   It projects the link, finds the crossings and computes, straight
   from that diagram:
     · crossings, writhe, pairwise linking numbers
     · the Jones polynomial (Kauffman bracket state sum)
     · the Alexander polynomial (Alexander matrix, exact Bareiss)
     · the determinant |Δ(−1)| and the number of Fox 3-colourings
   Knots can be given by parametric curves or by braid words
   (closed braids are laid out in a solid torus).
   ============================================================ */
(function (root) {
"use strict";

/* ---------- geometry ---------- */
function rotate(pts, ax, ay, az) {
  const [ca, sa, cb, sb, cc, sc] = [Math.cos(ax), Math.sin(ax), Math.cos(ay), Math.sin(ay), Math.cos(az), Math.sin(az)];
  return pts.map(([x, y, z]) => {
    let y1 = y * ca - z * sa, z1 = y * sa + z * ca;          // about x
    let x2 = x * cb + z1 * sb, z2 = -x * sb + z1 * cb;       // about y
    return [x2 * cc - y1 * sc, x2 * sc + y1 * cc, z2];       // about z
  });
}
function sample(f, n) { const r = []; for (let i = 0; i < n; i++) r.push(f(2 * Math.PI * i / n)); return r; }

/* closed braid in a solid torus: word = [±1, ±2, …] on n strands */
function braidComponents(word, n, opts = {}) {
  const R = opts.R || 3, d = opts.d || 0.62, per = opts.per || 26;
  const L = Math.max(word.length, 1), slot = s => (s - (n - 1) / 2) * d;
  // position of the strand that starts a segment in slot s, at fraction u of the segment
  const at = (k, s, u) => {
    const g = word[k];
    if (!g) return [slot(s), 0];
    const i = Math.abs(g) - 1, e = Math.sign(g);
    if (s !== i && s !== i + 1) return [slot(s), 0];
    const th = Math.PI * (0.5 - 0.5 * Math.cos(Math.PI * u)), m = (slot(i) + slot(i + 1)) / 2;
    return s === i ? [m - (d / 2) * Math.cos(th), e * (d / 2) * Math.sin(th)] : [m + (d / 2) * Math.cos(th), -e * (d / 2) * Math.sin(th)];
  };
  const next = (k, s) => { const g = word[k]; if (!g) return s; const i = Math.abs(g) - 1; return s === i ? i + 1 : s === i + 1 ? i : s; };
  const seen = new Set(), comps = [];
  for (let s0 = 0; s0 < n; s0++) {
    if (seen.has(s0)) continue;
    const pts = []; let s = s0;
    do {
      seen.add(s);
      for (let k = 0; k < L; k++) {
        for (let j = 0; j < per; j++) {
          const u = j / per, [r, z] = at(k, s, u), ph = 2 * Math.PI * (k + u) / L;
          pts.push([(R + r) * Math.cos(ph), (R + r) * Math.sin(ph), z]);
        }
        s = next(k, s);
      }
    } while (s !== s0);
    comps.push(pts);
  }
  return comps;
}

/* ---------- Laurent polynomials in one variable: Map exponent → coefficient ---------- */
const P = {
  add(a, b, k = 1) { const r = new Map(a); for (const [e, c] of b) { const v = (r.get(e) || 0) + k * c; v ? r.set(e, v) : r.delete(e); } return r; },
  mul(a, b) { const r = new Map(); for (const [e1, c1] of a) for (const [e2, c2] of b) { const e = e1 + e2, v = (r.get(e) || 0) + c1 * c2; v ? r.set(e, v) : r.delete(e); } return r; },
  shift(a, s) { const r = new Map(); for (const [e, c] of a) r.set(e + s, c); return r; },
  mono(e, c = 1) { return new Map([[e, c]]); },
  eq(a, b) { if (a.size !== b.size) return false; for (const [e, c] of a) if (b.get(e) !== c) return false; return true; }
};

/* ---------- integer polynomials with BigInt coefficients (arrays, index = power) ---------- */
const Z = {
  trim(a) { a = a.slice(); while (a.length && a[a.length - 1] === 0n) a.pop(); return a; },
  sub(a, b) { const n = Math.max(a.length, b.length), r = []; for (let i = 0; i < n; i++) r.push((a[i] || 0n) - (b[i] || 0n)); return Z.trim(r); },
  mul(a, b) { if (!a.length || !b.length) return []; const r = new Array(a.length + b.length - 1).fill(0n); for (let i = 0; i < a.length; i++) if (a[i]) for (let j = 0; j < b.length; j++) r[i + j] += a[i] * b[j]; return Z.trim(r); },
  div(a, b) { // exact division
    a = Z.trim(a); b = Z.trim(b); if (!a.length) return [];
    const q = new Array(Math.max(a.length - b.length + 1, 1)).fill(0n), r = a.slice(), lb = b[b.length - 1];
    for (let i = a.length - b.length; i >= 0; i--) { const c = r[i + b.length - 1] / lb; q[i] = c; if (c) for (let j = 0; j < b.length; j++) r[i + j] -= c * b[j]; }
    return Z.trim(q);
  },
  det(M) { // fraction-free Bareiss
    const n = M.length; if (!n) return [1n];
    M = M.map(r => r.map(Z.trim)); let prev = [1n], sign = 1n;
    for (let k = 0; k < n - 1; k++) {
      if (!M[k][k].length) { let p = k + 1; while (p < n && !M[p][k].length) p++; if (p === n) return []; [M[k], M[p]] = [M[p], M[k]]; sign = -sign; }
      for (let i = k + 1; i < n; i++) for (let j = k + 1; j < n; j++) M[i][j] = Z.div(Z.sub(Z.mul(M[k][k], M[i][j]), Z.mul(M[i][k], M[k][j])), prev);
      prev = M[k][k];
    }
    return Z.mul(M[n - 1][n - 1], [sign]);
  }
};

/* ---------- the diagram ---------- */
function diagram(comps) {
  const segs = [];
  comps.forEach((pts, c) => pts.forEach((p, i) => segs.push({ c, i, a: p, b: pts[(i + 1) % pts.length], n: pts.length })));
  const X = [];
  for (let s = 0; s < segs.length; s++) {
    const A = segs[s];
    const ax0 = Math.min(A.a[0], A.b[0]), ax1 = Math.max(A.a[0], A.b[0]), ay0 = Math.min(A.a[1], A.b[1]), ay1 = Math.max(A.a[1], A.b[1]);
    for (let t = s + 1; t < segs.length; t++) {
      const B = segs[t];
      if (B.c === A.c && (Math.abs(B.i - A.i) <= 1 || Math.abs(B.i - A.i) === A.n - 1)) continue;
      if (Math.max(B.a[0], B.b[0]) < ax0 || Math.min(B.a[0], B.b[0]) > ax1 || Math.max(B.a[1], B.b[1]) < ay0 || Math.min(B.a[1], B.b[1]) > ay1) continue;
      const rx = A.b[0] - A.a[0], ry = A.b[1] - A.a[1], sx = B.b[0] - B.a[0], sy = B.b[1] - B.a[1], den = rx * sy - ry * sx;
      if (Math.abs(den) < 1e-14) continue;
      const qx = B.a[0] - A.a[0], qy = B.a[1] - A.a[1], u = (qx * sy - qy * sx) / den, v = (qx * ry - qy * rx) / den;
      if (u < 0 || u >= 1 || v < 0 || v >= 1) continue;
      const za = A.a[2] + u * (A.b[2] - A.a[2]), zb = B.a[2] + v * (B.b[2] - B.a[2]);
      const [O, U, uo, uu] = za > zb ? [A, B, u, v] : [B, A, v, u];
      const vo = [O.b[0] - O.a[0], O.b[1] - O.a[1]], vu = [U.b[0] - U.a[0], U.b[1] - U.a[1]];
      X.push({ over: { c: O.c, pos: O.i + uo }, under: { c: U.c, pos: U.i + uu },
        sign: Math.sign(vo[0] * vu[1] - vo[1] * vu[0]),            // positive: cross(over, under) > 0
        ccw: vu[0] * vo[1] - vu[1] * vo[0] > 0,                    // cross(under, over) > 0
        pt: [A.a[0] + u * rx, A.a[1] + u * ry] });
    }
  }
  return { comps, X };
}

function invariants(comps, opts = {}) {
  const D = diagram(comps), X = D.X, nc = comps.length, nx = X.length;
  const res = { components: nc, crossings: nx, X };
  res.writhe = X.reduce((s, x) => s + x.sign, 0);
  res.linking = [];
  for (let i = 0; i < nc; i++) for (let j = i + 1; j < nc; j++) res.linking.push({ i, j, lk: X.filter(x => (x.over.c === i && x.under.c === j) || (x.over.c === j && x.under.c === i)).reduce((s, x) => s + x.sign, 0) / 2 });

  // --- PD edges: cut every component at every passage (over or under) ---
  const pass = comps.map(() => []);
  X.forEach((x, k) => { pass[x.over.c].push({ pos: x.over.pos, k, o: 1 }); pass[x.under.c].push({ pos: x.under.pos, k, o: 0 }); });
  let E = 0; const ends = X.map(() => ({})), free = [];
  pass.forEach((ps, c) => {
    ps.sort((a, b) => a.pos - b.pos);
    if (!ps.length) { free.push(c); return; }
    const base = E; E += ps.length;
    ps.forEach((p, j) => { const inE = base + (j - 1 + ps.length) % ps.length, outE = base + j;
      if (p.o) { ends[p.k].oi = inE; ends[p.k].oo = outE; } else { ends[p.k].ui = inE; ends[p.k].uo = outE; } });
  });
  // --- Kauffman bracket → Jones ---
  if (nx <= (opts.maxX || 18)) {
    const pd = X.map((x, k) => { const e = ends[k]; return x.ccw ? [e.ui, e.oi, e.uo, e.oo] : [e.ui, e.oo, e.uo, e.oi]; });
    const tally = new Map(), par = new Int32Array(E);
    const find = a => { while (par[a] !== a) { par[a] = par[par[a]]; a = par[a]; } return a; };
    for (let s = 0; s < (1 << nx); s++) {
      for (let i = 0; i < E; i++) par[i] = i;
      let loops = E, nA = 0;
      for (let k = 0; k < nx; k++) {
        const [a, b, c, d] = pd[k], A = !((s >> k) & 1); if (A) nA++;
        const pairs = A ? [[a, b], [c, d]] : [[a, d], [b, c]];
        for (const [p, q] of pairs) { const rp = find(p), rq = find(q); if (rp !== rq) { par[rp] = rq; loops--; } }
      }
      loops += free.length;
      const key = (2 * nA - nx) + "," + loops; tally.set(key, (tally.get(key) || 0) + 1);
    }
    const delta = new Map([[2, -1], [-2, -1]]); let br = new Map();
    for (const [key, cnt] of tally) { const [ea, l] = key.split(",").map(Number); let term = P.mono(ea, cnt); for (let i = 1; i < l; i++) term = P.mul(term, delta); br = P.add(br, term); }
    const w = res.writhe, f = P.mul(br, P.mono(3 * -w, (w % 2 ? -1 : 1)));   // (−A³)^(−w)
    // V(t) with A = t^(−1/4): exponent of t is −e/4, stored ×4 so half-integers stay integral
    const V = new Map(); for (const [e, c] of f) V.set(-e, c);
    res.jones = V; res.jonesOk = [...V.keys()].every(e => e % 2 === 0);
    // determinant = |V(−1)|, with t^(1/4) = e^(iπ/4)
    let re = 0, im = 0; for (const [e, c] of V) { re += c * Math.cos(Math.PI * e / 4); im += c * Math.sin(Math.PI * e / 4); }
    res.det = Math.round(Math.hypot(re, im));
  }
  // --- Alexander matrix on over-arcs ---
  const under = comps.map(() => []);
  X.forEach((x, k) => under[x.under.c].push({ pos: x.under.pos, k }));
  let nArc = 0; const arcStart = [], arcOf = [], inArc = [], outArc = [];
  under.forEach((us, c) => { us.sort((a, b) => a.pos - b.pos); arcStart[c] = nArc;
    if (!us.length) { arcOf[c] = () => arcStart[c]; nArc++; return; }
    const base = nArc; nArc += us.length;
    us.forEach((u, j) => { inArc[u.k] = base + (j - 1 + us.length) % us.length; outArc[u.k] = base + j; });
    arcOf[c] = pos => { let j = us.length - 1; for (let m = 0; m < us.length; m++) if (pos >= us[m].pos) j = m; return pos < us[0].pos ? base + us.length - 1 : base + j; };
  });
  const over = X.map(x => arcOf[x.over.c](x.over.pos));
  // Fox colourings mod 3
  { const M = X.map((x, k) => { const r = new Array(nArc).fill(0); r[over[k]] += 2; r[inArc[k]] -= 1; r[outArc[k]] -= 1; return r.map(v => ((v % 3) + 3) % 3); });
    let rank = 0; const rows = M.length;
    for (let c = 0; c < nArc && rank < rows; c++) { let p = rank; while (p < rows && !M[p][c]) p++; if (p === rows) continue; [M[p], M[rank]] = [M[rank], M[p]];
      const inv = M[rank][c] === 1 ? 1 : 2; M[rank] = M[rank].map(v => (v * inv) % 3);
      for (let i = 0; i < rows; i++) if (i !== rank && M[i][c]) { const f = M[i][c]; M[i] = M[i].map((v, j) => ((v - f * M[rank][j]) % 3 + 3) % 3); } rank++; }
    res.colourings = Math.pow(3, nArc - rank); }
  // Alexander polynomial
  if (nx === 0) res.alexander = nc === 1 ? [1n] : [];
  else if (nArc > nx) res.alexander = [];                  // a component never passes under: split link
  else {
    const M = X.map((x, k) => { const r = Array.from({ length: nArc }, () => []);
      const addP = (j, p) => { const a = r[j]; for (let i = 0; i < p.length; i++) a[i] = (a[i] || 0n) + p[i]; for (let i = 0; i < a.length; i++) a[i] = a[i] || 0n; };
      addP(over[k], [1n, -1n]);                              // (1 − t)
      if (x.sign > 0) { addP(inArc[k], [0n, 1n]); addP(outArc[k], [-1n]); } else { addP(outArc[k], [0n, 1n]); addP(inArc[k], [-1n]); }
      return r; });
    const minor = M.slice(1).map(r => r.slice(1));
    let a = Z.det(minor); let lo = 0; while (lo < a.length && a[lo] === 0n) lo++; a = a.slice(lo);
    if (a.length && a[a.length - 1] < 0n) a = a.map(c => -c);
    res.alexander = a;
  }
  return res;
}

/* ---------- formatting ---------- */
const SUP = s => String(s).replace(/[0-9\-\/]/g, c => ({ "-": "⁻", "/": "ᐟ" })[c] || "⁰¹²³⁴⁵⁶⁷⁸⁹"[c]);
function fmtPoly(terms, v) { // terms: [[exp(string/number), coeff], …] sorted by exp
  if (!terms.length) return "0";
  return terms.map(([e, c], i) => {
    const mag = Math.abs(Number(c)), sgn = Number(c) < 0 ? (i ? " − " : "−") : (i ? " + " : "");
    const body = e === 0 || e === "0" ? String(mag) : (mag === 1 ? "" : mag) + v + (e === 1 || e === "1" ? "" : SUP(e));
    return sgn + body;
  }).join("");
}
function fmtJones(V) {
  const t = [...V].sort((a, b) => a[0] - b[0]).map(([e, c]) => { const q = e / 4; return [Number.isInteger(q) ? q : (e / 2) + "/2", c]; });
  return fmtPoly(t, "t");
}
function fmtAlex(a) { if (!a.length) return "0"; return fmtPoly(a.map((c, i) => [i, c]).filter(([, c]) => c !== 0n), "t"); }
function jonesKey(V) { return [...V].sort((a, b) => a[0] - b[0]).map(([e, c]) => e + ":" + c).join(","); }
function mirrorJ(V) { const r = new Map(); for (const [e, c] of V) r.set(-e, c); return r; }

root.KnotEngine = { rotate, sample, braidComponents, diagram, invariants, fmtJones, fmtAlex, jonesKey, mirrorJ, P, Z };
})(typeof window !== "undefined" ? window : globalThis);
