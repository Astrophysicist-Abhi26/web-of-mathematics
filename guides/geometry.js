// GEOMETRY & TOPOLOGY — field guides for Classical & Non-Euclidean Geometry, Point-Set
// Topology, Algebraic Topology, Differential Topology, Differential Geometry, Low-Dimensional
// Topology & Knots, Algebraic Geometry, Fiber Bundles and Geometric Group Theory.
(function () {
"use strict";
const { register, canvas, C } = GuideKit;
const MT = s => "https://mathshistory.st-andrews.ac.uk/Biographies/" + s + "/";
const fx = (v, d = 3) => (Math.abs(v) < 1e-12 ? 0 : v).toFixed(d).replace("-", "−");
const deg = r => r * 180 / Math.PI;
function loop(root, fn) {
  let raf = null, on = true;
  const tick = () => { if (!on || !root.isConnected) { raf = null; return; } if (fn() === false) { raf = null; return; } raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);
  return () => { on = false; if (raf) cancelAnimationFrame(raf); };
}
const chipGroup = (root, sel, cb) => root.querySelectorAll(sel + " .gk-chip").forEach(b => b.addEventListener("click", () => {
  root.querySelectorAll(sel + " .gk-chip").forEach(x => x.classList.toggle("on", x === b)); cb(b.dataset);
}));

/* ================================================================ CLASSICAL & NON-EUCLIDEAN */
register("classical-geometry", {
  kicker: "FROM EUCLID TO CURVED SPACE · ABOUT 25 MIN",
  hook: "Do the angles of a triangle always add up to 180°?",
  intro: "For two thousand years geometry meant Euclid's Elements: five postulates, 465 propositions, and one awkward axiom about parallel lines. Trying to prove that fifth postulate from the other four, Saccheri, Lambert, Gauss, Bolyai and Lobachevsky found instead a consistent geometry in which it fails. On a sphere a triangle's angles add up to more than 180°, in the hyperbolic plane to less — and the difference is exactly the area. The lab builds the same equilateral triangle in all three worlds.",
  timeline: [[-300, "Euclid's Elements"], [100, "Menelaus: spherical triangles"], [1639, "Desargues: projective geometry"], [1829, "Lobachevsky: hyperbolic geometry"], [1868, "Beltrami: models"], [1872, "Klein: Erlangen programme"]],
  labs: [{
    kicker: "GIRARD 1629 · LOBACHEVSKY 1829", title: "One triangle, three geometries",
    intro: "Each triangle has three sides of the same length s (the sphere and the hyperbolic plane have curvature +1 and −1). Grow s and watch the angles: fixed at 60° in the plane, growing on the sphere, shrinking in the hyperbolic plane.",
    html: `<div class="it-control"><label><span>side length s</span><output data-o="s">1.00</output></label><input type="range" data-i="s" min="0.05" max="2.09" step="0.01" value="1"></div>
      <div class="gk-chips cg-pre"><button class="gk-chip" data-s="0.1">tiny</button><button class="gk-chip" data-s="1.5708">s = π/2</button><button class="gk-chip" data-s="2.09">nearly 2π/3</button></div>
      <canvas class="gk-canvas cg-cv"></canvas>
      <div class="gk-out cg-out"></div>`,
    caveat: "Sphere: cos α = cos s / (1 + cos s). Hyperbolic plane: cos α = cosh s / (1 + cosh s). For tiny triangles both tend to ½, i.e. 60° — every curved geometry looks Euclidean up close. Area = |angle sum − π| (times R² on a sphere of radius R).",
    init(root) {
      const sI = root.querySelector("[data-i=s]"), out = root.querySelector(".cg-out"), cv = root.querySelector(".cg-cv");
      function tri(ctx, cx, cy, R, alpha, col, label, sub) {
        const V = [0, 1, 2].map(k => [cx + R * Math.cos(-Math.PI / 2 + 2 * Math.PI * k / 3), cy + 14 + R * Math.sin(-Math.PI / 2 + 2 * Math.PI * k / 3)]);
        const delta = (alpha - Math.PI / 3) / 2; // angle between each side and its chord
        ctx.fillStyle = col.replace("1)", ".12)"); ctx.strokeStyle = col.replace("1)", "1)"); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(...V[0]);
        for (let k = 0; k < 3; k++) {
          const A = V[k], B = V[(k + 1) % 3], mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, L = Math.hypot(B[0] - A[0], B[1] - A[1]);
          const ox = mx - cx, oy = my - cy - 14, on = Math.hypot(ox, oy), hgt = (L / 2) * Math.tan(delta) * 2; // control-point offset for a quadratic Bézier
          ctx.quadraticCurveTo(mx + ox / on * hgt, my + oy / on * hgt, B[0], B[1]);
        }
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = "#e8e4f4"; ctx.font = "600 11px IBM Plex Mono"; ctx.textAlign = "center"; ctx.fillText(label, cx, 14);
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText(sub, cx, 27);
        ctx.fillStyle = C.gold; ctx.fillText(fx(deg(alpha), 1) + "°", V[1][0] - 4, V[1][1] + 16);
      }
      function run() {
        const s = +sI.value; root.querySelector("[data-o=s]").textContent = s.toFixed(2);
        const aS = Math.acos(Math.min(1, Math.max(-1, Math.cos(s) / (1 + Math.cos(s))))), aE = Math.PI / 3, aH = Math.acos(Math.cosh(s) / (1 + Math.cosh(s)));
        const { ctx, w, h } = canvas(cv, 200), col = w / 3, R = Math.min(col * .36, 62);
        tri(ctx, col * .5, h / 2, R, aS, "rgba(245,196,81,1)", "sphere", "K = +1");
        tri(ctx, col * 1.5, h / 2, R, aE, "rgba(232,228,244,1)", "plane", "K = 0");
        tri(ctx, col * 2.5, h / 2, R, aH, "rgba(63,208,201,1)", "hyperbolic", "K = −1");
        out.innerHTML = `<span class="g">sphere     </span> angle ${fx(deg(aS), 2)}°   sum ${fx(deg(3 * aS), 2)}°   area = sum − π = ${fx(3 * aS - Math.PI, 4)}\n` +
          `plane       angle 60.00°   sum 180.00°   area = (√3/4)s² = ${fx(Math.sqrt(3) / 4 * s * s, 4)}\n` +
          `<span class="t">hyperbolic </span> angle ${fx(deg(aH), 2)}°   sum ${fx(deg(3 * aH), 2)}°   area = π − sum = ${fx(Math.PI - 3 * aH, 4)}\n` +
          (Math.abs(s - Math.PI / 2) < .01 ? `\n<span class="g">Three right angles: the octant triangle covers exactly ⅛ of the sphere (4π/8 = π/2).</span>` :
            s > 2.05 ? `\n<span class="d">At s = 2π/3 the spherical triangle's corners lie on one great circle: each angle reaches 180°.</span>` : "");
      }
      root.querySelectorAll(".cg-pre .gk-chip").forEach(b => b.addEventListener("click", () => { sI.value = b.dataset.s; run(); }));
      sI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "c. 300 BCE — Euclid's Elements", who: "Euclid of Alexandria · Proclus's commentary, c. 450 · David Hilbert's axioms, 1899",
      lead: "Five postulates, and from them 465 propositions: the most influential textbook ever written.",
      formula: "Postulate 5: if a line falling on two lines makes the interior angles on one side less than two right angles, the two lines meet on that side",
      what: "The thirteen books of the Elements build plane and solid geometry, and number theory, from definitions, common notions and five postulates. The fifth — the parallel postulate — is longer and less obvious than the others, and Euclid avoids using it for his first 28 propositions.",
      how: "Existence is proved by construction with straightedge and compass. Proposition 1 constructs an equilateral triangle — and silently assumes that two circles meet, a gap closed only by Hilbert's axioms (1899).",
      story: "The Elements is one of the most reprinted books in history; the first printed edition appeared in Venice in 1482. Proclus reports that already in antiquity people tried to prove the fifth postulate from the others.",
      today: "Euclidean geometry is the flat, curvature-zero case of Riemannian geometry, and it is still how we build, survey and render computer graphics." },
    { icon: "🏛", title: "c. 100–1629 — geometry on a sphere", who: "Menelaus of Alexandria c. 100 · Ptolemy · astronomers of the Islamic world · Albert Girard 1629",
      lead: "Navigators and astronomers used a geometry in which triangles have more than 180°.",
      formula: "area = (α + β + γ − π) R²      (Girard's theorem)",
      what: "On a sphere the 'straight lines' are great circles, and any two of them meet — there are no parallels. A triangle with three right angles covers one eighth of the sphere: its angles exceed 180° by π/2, and its area is πR²/2.",
      how: "Menelaus' Sphaerica proved theorems about spherical triangles; astronomers of the Islamic world developed spherical trigonometry, including the sine rule, partly to compute the qibla, the direction of Mecca. Girard's area formula has a short proof by cutting the sphere into 'lunes'.",
      story: "Spherical geometry never threatened Euclid, because the sphere sat inside Euclidean space: its 'lines' were really curves. The shock came when a curved geometry was found that needs no surrounding space at all.",
      today: "GPS, great-circle flight routes and celestial navigation are spherical trigonometry." },
    { icon: "🔥", title: "1733–1868 — hyperbolic geometry", who: "Giovanni Saccheri 1733 · Johann Lambert 1766 · Gauss (unpublished) · Nikolai Lobachevsky 1829 · János Bolyai 1832 · Eugenio Beltrami 1868",
      lead: "Deny the parallel postulate and you get a consistent geometry in which triangles have less than 180°.",
      formula: "cosh c = cosh a cosh b − sinh a sinh b cos γ      area = π − (α + β + γ)",
      what: "In the hyperbolic plane, through a point off a line pass infinitely many lines that never meet it. Angle sums fall short of 180° by exactly the area, and there are no similar triangles of different sizes — a triangle's angles determine its size.",
      how: "Saccheri (1733) tried to prove the fifth postulate by contradiction, derived dozens of hyperbolic theorems along the way, and declared the result 'repugnant to the nature of the straight line'. Beltrami (1868), then Klein and Poincaré, built models of the hyperbolic plane inside Euclidean geometry, proving it exactly as consistent as Euclid's.",
      story: "János Bolyai wrote to his father in 1823: 'Out of nothing I have created a strange new universe.' When his work appeared in 1832, Gauss replied that to praise it would be to praise himself, since he had had the same ideas for decades. Lobachevsky had already published, in Russian, in 1829.",
      today: "Hyperbolic geometry describes most surfaces and most 3-manifolds (Thurston), the space of velocities in special relativity, and hierarchical data in machine learning. The Poincaré-disk atom lets you walk in it." },
    { icon: "⚙️", title: "1639–1872 — projective geometry and the Erlangen programme", who: "Girard Desargues 1639 · Blaise Pascal 1640 · Jean-Victor Poncelet 1822 · Arthur Cayley 1859 · Felix Klein 1872",
      lead: "Add points at infinity; then a geometry is the study of what a group of transformations preserves.",
      formula: "rigid motions ⊂ affine maps ⊂ projective maps",
      what: "Desargues (1639), inspired by perspective drawing, added points at infinity where parallel lines meet, so any two lines meet exactly once. Klein's Erlangen programme (1872) organised all geometries by their symmetry groups: a geometry's theorems are the properties its group leaves unchanged.",
      how: "Cayley (1859) showed that Euclidean, spherical and hyperbolic distance all come from projective geometry by choosing a conic to preserve — 'projective geometry is all geometry', he wrote.",
      story: "Pascal proved his hexagon theorem on conics at sixteen (1640). Poncelet, captured in Napoleon's retreat from Moscow, worked out projective geometry as a prisoner in Saratov (1813–14) and published it in 1822.",
      today: "Computer graphics and computer vision run on projective (homogeneous) coordinates — a camera is a projective map — and Klein's idea that geometry is symmetry shapes modern physics." }
  ],
  challenges: [
    "Find the side length that gives the spherical triangle three right angles. What fraction of the sphere does it cover?",
    "Push s to its maximum. The spherical angles approach 180° — what has the triangle become?",
    "Hyperbolic angles shrink as s grows, but the area never passes π. Why? (Look at the formula for the area.)"
  ],
  sources: [
    { type: "ONLINE EDITION", title: "David Joyce — Euclid's Elements", note: "All thirteen books, with interactive diagrams and commentary.", url: "https://mathcs.clarku.edu/~djoyce/java/elements/elements.html" },
    { type: "ONLINE EDITION", title: "Oliver Byrne's Euclid (1847), recreated", note: "The first six books in Byrne's colour diagrams.", url: "https://www.c82.net/euclid/" },
    { type: "TEXTBOOK", title: "Marvin Greenberg — Euclidean and Non-Euclidean Geometries", note: "The parallel postulate, its history and the hyperbolic plane.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Nikolai Lobachevsky", note: "The 'Copernicus of geometry'.", url: MT("Lobachevsky") }
  ]
});

/* ================================================================ POINT-SET TOPOLOGY */
const PTS = ["a", "b", "c"], setName = m => m === 0 ? "∅" : m === 7 ? "X" : "{" + PTS.filter((_, i) => m >> i & 1).join(",") + "}";
const isTop = T => { for (const u of T) for (const v of T) if (!T.has(u | v) || !T.has(u & v)) return false; return T.has(0) && T.has(7); };
const ALL_TOPS = (() => { const r = []; for (let m = 0; m < 64; m++) { const T = new Set([0, 7]); for (let k = 0; k < 6; k++) if (m >> k & 1) T.add(k + 1); if (isTop(T)) r.push(m); } return r; })();
register("point-set-topology", {
  kicker: "NEARNESS WITHOUT DISTANCE · ABOUT 20 MIN",
  hook: "In how many different ways can three points be 'near' one another?",
  intro: "Topology keeps only the idea of nearness: which sets are 'open' — sets that leave a little room around each of their points. Hausdorff (1914) captured it in three rules, general enough to cover spaces of functions and strange enough to allow spaces where points cannot be told apart. On a set of just three points there are exactly 29 topologies. The lab lets you build them.",
  timeline: [[1872, "Cantor: limit points"], [1906, "Fréchet: metric spaces"], [1914, "Hausdorff: topological spaces"], [1922, "Kuratowski: closure"], [1925, "Urysohn's lemma"], [1930, "Tychonoff's theorem"]],
  labs: [{
    kicker: "HAUSDORFF 1914 · FINITE TOPOLOGIES", title: "Build a topology on {a, b, c}",
    intro: "∅ and X = {a, b, c} are always open. Switch the other six subsets on or off. The lab checks the axioms — unions and intersections of open sets must be open — and, for a genuine topology, reports its separation and connectedness properties.",
    html: `<div class="gk-chips pt-sets">${[1, 2, 4, 3, 5, 6].map(m => `<button class="gk-chip" data-m="${m}">${setName(m)}</button>`).join("")}</div>
      <div class="gk-chips pt-pre"><button class="gk-chip" data-p="indiscrete">indiscrete</button><button class="gk-chip" data-p="discrete">discrete</button><button class="gk-chip" data-p="chain">nested chain</button><button class="gk-chip" data-p="random">random topology</button></div>
      <canvas class="gk-canvas pt-cv"></canvas>
      <div class="gk-out pt-out"></div>`,
    caveat: "A finite topology is the same thing as a preorder (Alexandrov, 1937): x ≤ y when every open set containing x also contains y. The lab lists it. A finite space is Hausdorff only if it is discrete — which is why the interesting finite spaces are all non-Hausdorff.",
    init(root) {
      let T = new Set([0, 7]); const found = new Set();
      const out = root.querySelector(".pt-out"), cv = root.querySelector(".pt-cv");
      const code = () => [1, 2, 3, 4, 5, 6].reduce((s, m, k) => s | (T.has(m) ? 1 << k : 0), 0);
      const fromCode = c => { T = new Set([0, 7]); for (let k = 0; k < 6; k++) if (c >> k & 1) T.add(k + 1); };
      function draw() {
        root.querySelectorAll(".pt-sets .gk-chip").forEach(b => b.classList.toggle("on", T.has(+b.dataset.m)));
        const { ctx, w, h } = canvas(cv, 170), P = [[w / 2 - 70, h - 45], [w / 2 + 70, h - 45], [w / 2, 42]];
        const opens = [...T].filter(m => m && m !== 7).sort((a, b) => b - a);
        opens.forEach((m, i) => {
          const pts = P.filter((_, k) => m >> k & 1), cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
          const r = pts.length === 1 ? 20 : 26; ctx.strokeStyle = `hsla(${[45, 175, 290, 0, 215, 110][m - 1]}, 80%, 64%, .8)`; ctx.lineWidth = 1.6;
          ctx.beginPath();
          if (pts.length === 1) ctx.arc(cx, cy, r, 0, 7);
          else { const [p, q] = pts, a = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.arc(p[0], p[1], r, a + Math.PI / 2, a + 3 * Math.PI / 2); ctx.arc(q[0], q[1], r, a - Math.PI / 2, a + Math.PI / 2); ctx.closePath(); }
          ctx.stroke();
        });
        ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.ellipse(w / 2, h / 2 + 6, 130, 75, 0, 0, 7); ctx.stroke(); ctx.setLineDash([]);
        P.forEach(([x, y], k) => { ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, 5, 0, 7); ctx.fill(); ctx.font = "12px IBM Plex Mono"; ctx.fillText(PTS[k], x + 8, y + 16); });
        const miss = new Set(); for (const u of T) for (const v of T) { if (!T.has(u | v)) miss.add("∪ " + setName(u | v)); if (!T.has(u & v)) miss.add("∩ " + setName(u & v)); }
        const list = [...T].sort((a, b) => a - b).map(setName).join(", ");
        if (miss.size) { out.innerHTML = `open sets: {${list}}\n<span class="r">NOT a topology</span> — missing ${[...miss].map(s => s.slice(2) + (s[0] === "∪" ? " (a union)" : " (an intersection)")).join(", ")}.`; return; }
        found.add(code());
        const sep = (x, y) => [...T].some(U => (U >> x & 1) !== (U >> y & 1));
        const T0 = [[0, 1], [0, 2], [1, 2]].every(([x, y]) => sep(x, y));
        const T1 = [0, 1, 2].every(x => T.has(7 ^ (1 << x)));
        const conn = ![...T].some(U => U && U !== 7 && T.has(7 ^ U));
        const nb = x => [...T].filter(U => U >> x & 1).reduce((s, U) => s & U, 7);
        const order = []; for (let x = 0; x < 3; x++) for (let y = 0; y < 3; y++) if (x !== y && (nb(x) >> y & 1)) order.push(`${PTS[x]} → ${PTS[y]}`);
        out.innerHTML = `open sets: {${list}}\n<span class="t">a topology ✓</span>   ${T.size} open sets\n` +
          `T₀ (points distinguishable): ${T0 ? "yes" : "no"}   T₁ (points closed): ${T1 ? "yes" : "no"}   Hausdorff: ${T.size === 8 ? "yes" : "no"}   connected: ${conn ? "yes" : "no"}\n` +
          `smallest open set around a, b, c: ${[0, 1, 2].map(x => setName(nb(x))).join(", ")}\n` +
          `specialisation (every neighbourhood of x contains y): ${order.length ? order.join(", ") : "none — discrete"}\n` +
          `<span class="g">you have found ${found.size} of the ${ALL_TOPS.length} topologies on three points.</span>`;
      }
      root.querySelectorAll(".pt-sets .gk-chip").forEach(b => b.addEventListener("click", () => { const m = +b.dataset.m; T.has(m) ? T.delete(m) : T.add(m); draw(); }));
      root.querySelectorAll(".pt-pre .gk-chip").forEach(b => b.addEventListener("click", () => {
        const p = b.dataset.p;
        if (p === "indiscrete") fromCode(0); else if (p === "discrete") fromCode(63);
        else if (p === "chain") { T = new Set([0, 7, 1, 3]); } else fromCode(ALL_TOPS[Math.floor(Math.random() * ALL_TOPS.length)]);
        draw();
      }));
      draw();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1872–1906 — limit points and metric spaces", who: "Georg Cantor 1872 · Maurice Fréchet 1906 · Frigyes Riesz 1907",
      lead: "To talk about convergence of functions you need nearness for things that aren't numbers.",
      formula: "d(x, z) ≤ d(x, y) + d(y, z)",
      what: "Cantor's work on Fourier series (1872) introduced limit points and derived sets. Fréchet's thesis (1906) defined metric spaces — any set with a distance obeying the triangle inequality — together with compactness, so that sequences of functions could converge like sequences of numbers.",
      how: "In a metric space, a set is open if it contains a small ball around each of its points. Topology starts with the observation that most theorems use only the open sets, never the distances themselves.",
      story: "Fréchet introduced the word 'compact' in 1906; Riesz (1907) proposed axioms built on limit points instead of distances.",
      today: "Metric spaces are everywhere: the edit distance between words, the Wasserstein distance between probability distributions, the distances in a search engine's vector space." },
    { icon: "⚙️", title: "1914 — Hausdorff's axioms", who: "Felix Hausdorff, Grundzüge der Mengenlehre 1914 · Kazimierz Kuratowski 1922 · Pavel Alexandrov 1937",
      lead: "Three rules for open sets — and an extra axiom that separates points.",
      formula: "∅ and X are open; any union of open sets is open; a finite intersection of open sets is open",
      what: "A topology on X is a family of subsets, the open sets, satisfying those rules (the lab checks them). Hausdorff also asked that distinct points have disjoint neighbourhoods — today the Hausdorff or T₂ axiom, one rung on a ladder of separation axioms T₀, T₁, T₂, …",
      how: "Continuity becomes one line: f is continuous when the preimage of every open set is open. Homeomorphisms — continuous bijections with continuous inverses — are topology's notion of sameness: the coffee cup and the doughnut.",
      story: "Hausdorff dedicated the Grundzüge to Cantor. A Jewish mathematician in Bonn, he took his own life in January 1942, together with his wife and her sister, when they were about to be deported.",
      today: "Non-Hausdorff spaces are not pathology: the Zariski topology of algebraic geometry and the Scott topology in the semantics of programming languages are both non-Hausdorff, and finite topologies are exactly preorders." },
    { icon: "🏛", title: "1895–1935 — compactness and connectedness", who: "Émile Borel 1895 · Henri Lebesgue · Alexandrov & Urysohn 1920s · Andrey Tychonoff 1930–35",
      lead: "Compactness is the next best thing to being finite.",
      formula: "compact: every open cover has a finite subcover",
      what: "Heine–Borel: a subset of ℝⁿ is compact exactly when it is closed and bounded. On a compact space continuous functions attain their maximum and sequences have convergent subsequences. Connectedness — no splitting into two disjoint nonempty open pieces — gives the intermediate value theorem.",
      how: "Tychonoff's theorem: any product of compact spaces is compact. Kelley (1950) showed it is equivalent to the axiom of choice.",
      story: "The open-cover definition arrived late: Borel (1895) proved it for countable covers of an interval, Lebesgue for arbitrary ones, and Alexandrov and Urysohn made it the definition of compactness in the 1920s.",
      today: "Compactness proves existence: of solutions to PDEs, of equilibria in economics via fixed-point theorems, and in logic, where the compactness theorem is a Tychonoff theorem in disguise." },
    { icon: "🔥", title: "1925–today — quotients and metrisation", who: "Pavel Urysohn 1925 · R. H. Bing, Jun-iti Nagata & Yuri Smirnov 1950–51",
      lead: "Glue points together and new spaces appear; ask when a topology comes from a distance.",
      formula: "torus = square / (opposite edges glued)",
      what: "A quotient space glues or collapses points: glue the ends of an interval to get a circle, opposite edges of a square to get a torus or a Klein bottle. Urysohn's lemma (1925): in a normal space, disjoint closed sets can be separated by a continuous function. With it, Urysohn characterised the second-countable spaces whose topology comes from a metric.",
      how: "The structure-ladder atom shows topology as the first rung above a bare set: then smoothness, then distance, angles and volume.",
      story: "Urysohn drowned in August 1924, aged 26, swimming off the coast of Brittany with Alexandrov, who published much of his work posthumously. The Bing–Nagata–Smirnov theorem (1950–51) finished the metrisation question.",
      today: "Topological data analysis, network topology and the point-free topology of locales (used in constructive mathematics and computer science) all continue the subject." }
  ],
  challenges: [
    "Build a topology that is T₀ but not T₁. What does its specialisation order look like?",
    "Can a topology on three points be Hausdorff without being discrete? Why not?",
    "Find as many of the 29 as you can. How many of them are connected?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "James Munkres — Topology", note: "The standard first course.", url: null },
    { type: "BOOK", title: "Steen & Seebach — Counterexamples in Topology", note: "143 spaces that break the obvious conjectures.", url: null },
    { type: "DATABASE", title: "π-Base", note: "A searchable database of topological spaces and their properties.", url: "https://topology.pi-base.org/" },
    { type: "BIOGRAPHY", title: "MacTutor — Maurice Fréchet", note: "Metric spaces and compactness.", url: MT("Frechet") }
  ]
});

/* ================================================================ ALGEBRAIC TOPOLOGY */
const reduce = w => { const s = []; for (const x of w) { if (s.length && s[s.length - 1] === inv(x)) s.pop(); else s.push(x); } return s; };
const inv = x => x === x.toLowerCase() ? x.toUpperCase() : x.toLowerCase();
const wordStr = w => w.length ? w.map(x => x === x.toLowerCase() ? x : x.toLowerCase() + "⁻¹").join("") : "1 (the trivial loop)";
register("algebraic-topology", {
  kicker: "ALGEBRA THAT SEES HOLES · ABOUT 25 MIN",
  hook: "Can a loop be caught on two posts even though it winds around each of them zero times?",
  intro: "Algebraic topology attaches algebra — groups, rings — to spaces, so that different algebra proves different shape. Poincaré's fundamental group (1895) is made of loops, up to deformation, with the product 'go round one, then the other'. It can be non-commutative, and then it sees things that counting windings cannot. Draw a loop around two posts and read off its word.",
  timeline: [[1895, "Poincaré: π₁ and homology"], [1904, "the Poincaré conjecture"], [1912, "Brouwer: fixed points"], [1935, "Hurewicz: higher homotopy"], [1945, "Eilenberg–Steenrod axioms"], [1951, "Serre's thesis"]],
  labs: [{
    kicker: "POINCARÉ 1895 · THE FUNDAMENTAL GROUP", title: "Read a loop as a word",
    intro: "Drag to draw a closed loop in the plane with two posts, A and B (it closes itself when you let go). Each time it crosses the dashed ray above A from right to left we write a, left to right a⁻¹; likewise b for B. Cancelling aa⁻¹ pairs gives the loop's element of π₁ — the free group on a and b.",
    html: `<div class="gk-chips at-pre"><button class="gk-chip" data-w="a">a</button><button class="gk-chip" data-w="ab">ab</button><button class="gk-chip" data-w="ba">ba</button><button class="gk-chip" data-w="aB">ab⁻¹</button><button class="gk-chip" data-w="abAB">aba⁻¹b⁻¹</button><button class="gk-chip" data-w="">clear</button></div>
      <canvas class="gk-canvas at-cv" style="cursor:crosshair"></canvas>
      <div class="gk-out at-out"></div>`,
    caveat: "π₁ of the plane minus two points is the free group F₂. The commutator aba⁻¹b⁻¹ has winding number 0 around each post, yet it cannot be pulled free: homology (winding numbers) is π₁ made commutative, and forgets the order in which the loop went round.",
    init(root) {
      const cv = root.querySelector(".at-cv"), out = root.querySelector(".at-out");
      let path = [], drawing = false, g;
      const setup = () => { const { ctx, w, h } = canvas(cv, 240); g = { ctx, w, h, A: [w * .35, h * .55], B: [w * .65, h * .55], O: [w / 2, h - 18] }; };
      function word() {
        const res = [];
        const n = path.length; if (n < 3) return res;
        for (let i = 0; i < n; i++) {
          const p = path[i], q = path[(i + 1) % n];
          [["a", g.A], ["b", g.B]].forEach(([s, P]) => {
            if ((p[0] < P[0]) === (q[0] < P[0])) return;
            const t = (P[0] - p[0]) / (q[0] - p[0]), y = p[1] + t * (q[1] - p[1]);
            if (y < P[1]) res.push(q[0] < p[0] ? s : s.toUpperCase());
          });
        }
        return res;
      }
      function draw() {
        const { ctx, w, h, A, B } = g; ctx.clearRect(0, 0, w, h);
        [[A, "A"], [B, "B"]].forEach(([P, l]) => {
          ctx.setLineDash([4, 4]); ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.beginPath(); ctx.moveTo(P[0], P[1]); ctx.lineTo(P[0], 0); ctx.stroke(); ctx.setLineDash([]);
          ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(P[0], P[1], 7, 0, 7); ctx.fill(); ctx.fillStyle = "#fff"; ctx.font = "12px IBM Plex Mono"; ctx.fillText(l, P[0] + 10, P[1] + 4);
        });
        if (path.length > 1) {
          ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); path.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); if (!drawing) ctx.closePath(); ctx.stroke();
          for (let i = 8; i < path.length; i += 16) { const p = path[i - 1], q = path[i], an = Math.atan2(q[1] - p[1], q[0] - p[0]); ctx.fillStyle = C.gold; ctx.beginPath(); ctx.moveTo(q[0] + 6 * Math.cos(an), q[1] + 6 * Math.sin(an)); ctx.lineTo(q[0] + 6 * Math.cos(an + 2.5), q[1] + 6 * Math.sin(an + 2.5)); ctx.lineTo(q[0] + 6 * Math.cos(an - 2.5), q[1] + 6 * Math.sin(an - 2.5)); ctx.fill(); }
          ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(...path[0], 4, 0, 7); ctx.fill();
        }
        if (drawing) { out.innerHTML = "drawing…"; return; }
        const raw = word(), red = reduce(raw), wa = raw.filter(x => x === "a").length - raw.filter(x => x === "A").length, wb = raw.filter(x => x === "b").length - raw.filter(x => x === "B").length;
        out.innerHTML = path.length < 3 ? `<span class="d">drag on the picture to draw a loop, or pick a word.</span>` :
          `crossings read: ${raw.length ? wordStr(raw) : "none"}\n<span class="g">element of π₁ = ${wordStr(red)}</span>\nwinding numbers (homology): around A ${wa}, around B ${wb}\n` +
          (red.length && !wa && !wb ? `<span class="t">caught! Both winding numbers are 0, but the word doesn't cancel: the loop can't be pulled off the posts.</span>` :
           !red.length ? `<span class="t">trivial: the loop can be shrunk to a point without crossing a post.</span>` : "");
      }
      const loopAround = (P, dir, pts) => { const { O } = g; const top = [P[0], P[1] - 40];
        const go = (a, b, n) => { for (let i = 1; i <= n; i++) pts.push([a[0] + (b[0] - a[0]) * i / n, a[1] + (b[1] - a[1]) * i / n]); };
        const start = [P[0] + (dir > 0 ? 34 : -34), P[1]];
        go(pts.length ? pts[pts.length - 1] : O, start, 18);
        for (let i = 1; i <= 60; i++) { const t = (dir > 0 ? -1 : 1) * 2 * Math.PI * i / 60; const a0 = dir > 0 ? 0 : Math.PI; pts.push([P[0] + 34 * Math.cos(a0 + t), P[1] + 34 * Math.sin(a0 + t)]); }
        go(pts[pts.length - 1], O, 18); void top; };
      function preset(w) {
        path = []; if (!w) { draw(); return; }
        const pts = [g.O];
        for (const ch of w) loopAround(ch.toLowerCase() === "a" ? g.A : g.B, ch === ch.toLowerCase() ? 1 : -1, pts);
        path = pts; draw();
      }
      const pos = e => { const r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
      cv.addEventListener("pointerdown", e => { drawing = true; path = [pos(e)]; cv.setPointerCapture(e.pointerId); root.querySelectorAll(".at-pre .gk-chip").forEach(b => b.classList.remove("on")); draw(); });
      cv.addEventListener("pointermove", e => { if (!drawing) return; const p = pos(e), q = path[path.length - 1]; if (Math.hypot(p[0] - q[0], p[1] - q[1]) > 3) { path.push(p); draw(); } });
      cv.addEventListener("pointerup", () => { if (!drawing) return; drawing = false; draw(); });
      root.querySelectorAll(".at-pre .gk-chip").forEach(b => b.addEventListener("click", () => { root.querySelectorAll(".at-pre .gk-chip").forEach(x => x.classList.toggle("on", x === b)); preset(b.dataset.w); }));
      setup(); preset("abAB");
      root.querySelector('.at-pre .gk-chip[data-w="abAB"]').classList.add("on");
    }
  }],
  chapters: [
    { icon: "🏛", title: "1895 — Poincaré's fundamental group", who: "Henri Poincaré, Analysis Situs 1895 · Egbert van Kampen 1933",
      lead: "Loops up to deformation form a group — a fingerprint of the space.",
      formula: "π₁(circle) = ℤ,   π₁(torus) = ℤ²,   π₁(plane minus two points) = F₂",
      what: "Two loops from a base point are equivalent when one can be deformed continuously into the other; composing loops end to end makes the classes a group. A circle's loops are classified by their winding number; the plane with two holes gives the free group on two letters, where order matters (the lab).",
      how: "Van Kampen's theorem (1933) computes π₁ of a space glued from pieces: free products with relations. Every group is π₁ of some two-dimensional complex, so group presentations become spaces.",
      story: "Poincaré introduced π₁ to show that Betti numbers can't tell all 3-manifolds apart. In 1904 he built the Poincaré homology sphere: the homology of a sphere, but a fundamental group with 120 elements.",
      today: "Braid groups — π₁ of spaces of configurations of points — describe topological quantum computing; robot motion planning studies π₁ of configuration spaces." },
    { icon: "⚙️", title: "1851–1913 — covering spaces", who: "Riemann 1851 · Hermann Weyl, Die Idee der Riemannschen Fläche 1913 · Kurt Reidemeister",
      lead: "Unwrap a space and its fundamental group becomes a group of symmetries.",
      formula: "ℝ → S¹,  t ↦ e^(2πit):  deck transformations ≅ ℤ ≅ π₁(S¹)",
      what: "A covering space maps onto a space so that each small patch has several disjoint copies above it — a helix over a circle, a spiral staircase. The universal cover is simply connected, and π₁ acts on it by deck transformations. Subgroups of π₁ correspond to covering spaces: a Galois correspondence for topology.",
      how: "Lift a loop to the cover and see where it ends: lifting to the helix proves π₁(S¹) = ℤ, and with it the fundamental theorem of algebra and Brouwer's fixed-point theorem for the disc.",
      story: "The Riemann surfaces of multivalued functions like √z were the first covering spaces; Weyl's book of 1913 set out the theory cleanly.",
      today: "The universal cover of a surface of genus 2 or more is the hyperbolic plane — the Poincaré-disk atom tiles it with copies of the surface." },
    { icon: "🏛", title: "1912–1945 — degree, fixed points and cohomology", who: "L. E. J. Brouwer 1912 · Heinz Hopf 1931 · Alexander, Kolmogorov, Čech, Whitney 1935–38 · Eilenberg & Steenrod 1945",
      lead: "Topology proves that certain equations must have solutions.",
      formula: "f: Dⁿ → Dⁿ continuous  ⇒  f(x) = x for some x",
      what: "Brouwer's fixed-point theorem (1912): every continuous map of a disc to itself has a fixed point. The degree of a map between spheres counts how many times it wraps. Cohomology, discovered around 1935, adds a product — the cup product — that distinguishes spaces homology alone cannot.",
      how: "A fixed-point-free map of the disc would give a retraction onto the boundary circle, which is impossible because π₁(disc) = 0 while π₁(circle) = ℤ. Hopf's map S³ → S² (1931) has linked circles as fibres, proving π₃(S²) ≠ 0.",
      story: "Brouwer later rejected non-constructive proofs like his own and led the intuitionist movement — the Brouwer–Hilbert dispute is one of the red edges on the map. Eilenberg and Steenrod axiomatised homology in 1945.",
      today: "Fixed-point theorems prove that Nash equilibria exist, and cohomology classifies topological phases of matter." },
    { icon: "🔥", title: "1935–today — higher homotopy groups", who: "Witold Hurewicz 1935 · Jean-Pierre Serre 1951 · John Milnor 1956 · Lin, Wang & Xu 2024",
      lead: "Spheres wrap around spheres in bewildering ways, and computing how is still open.",
      formula: "π₃(S²) = ℤ,   π₄(S²) = ℤ/2,   π₅(S²) = ℤ/2,   π₆(S²) = ℤ/12",
      what: "Hurewicz (1935) defined πₙ: maps of the n-sphere up to deformation. They are abelian for n ≥ 2 but ferociously hard to compute; the homotopy groups of spheres are still not all known. Serre's thesis (1951) used spectral sequences to show they are finite except in a few predictable cases.",
      how: "Milnor (1956) used homotopy theory to find exotic 7-spheres — manifolds homeomorphic but not diffeomorphic to S⁷; there are 28 kinds.",
      story: "Serre won the Fields Medal in 1954 at 27, still the youngest ever. In 2020 Isaksen, Wang and Xu pushed the computation of stable homotopy groups to dimension 90 with machine help; in 2024 Lin, Wang and Xu settled the last case of the Kervaire invariant problem, in dimension 126.",
      today: "Homotopy type theory reads types as spaces (Voevodsky's univalent foundations), connecting this field to the Type Theory field on the map." }
  ],
  challenges: [
    "Draw a loop around A only, then one around both posts together. What words do you get?",
    "Pick aba⁻¹b⁻¹. Both winding numbers are 0 — can you draw a loop with the same winding numbers that is trivial?",
    "Is ab the same element as ba? Compare the two presets and their words."
  ],
  sources: [
    { type: "FREE TEXTBOOK", title: "Allen Hatcher — Algebraic Topology", note: "Chapter 1: the fundamental group and covering spaces.", url: "https://pi.math.cornell.edu/~hatcher/AT/ATpage.html" },
    { type: "TEXTBOOK", title: "William Fulton — Algebraic Topology: A First Course", note: "Motivated by winding numbers and complex analysis.", url: null },
    { type: "CLASSIC", title: "John Milnor — Topology from the Differentiable Viewpoint", note: "Degree and fixed points in 64 pages.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — L. E. J. Brouwer", note: "Fixed points and intuitionism.", url: MT("Brouwer") }
  ]
});

/* ================================================================ DIFFERENTIAL TOPOLOGY */
const gss = (x, y, cx, cy, s) => Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (s * s));
const LAND = (x, y) => 2.2 * ((x - .5) ** 2 + 1.3 * (y - .5) ** 2) - .55 * gss(x, y, .27, .36, .13) - .45 * gss(x, y, .73, .36, .13) - .5 * gss(x, y, .5, .76, .12) + .32 * gss(x, y, .5, .47, .08) + .15 * (x - .5);
const LAND_CRIT = (() => {
  const N = 200, r = { min: [], saddle: [], max: [] };
  for (let i = 2; i < N - 2; i++) for (let j = 2; j < N - 2; j++) {
    const x = i / N, y = j / N, h0 = LAND(x, y), ring = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]].map(([a, b]) => LAND((i + a) / N, (j + b) / N) - h0);
    if (ring.every(v => v > 0)) r.min.push([x, y, h0]); else if (ring.every(v => v < 0)) r.max.push([x, y, h0]);
    else { let ch = 0; for (let k = 0; k < 8; k++) if (Math.sign(ring[k]) !== Math.sign(ring[(k + 1) % 8])) ch++; if (ch >= 4 && !r.saddle.some(s => Math.hypot(s[0] - x, s[1] - y) < .03)) r.saddle.push([x, y, h0]); }
  }
  return r;
})();
register("differential-topology", {
  kicker: "SMOOTH SHAPES AND THEIR CRITICAL POINTS · ABOUT 25 MIN",
  hook: "Can you learn the shape of a landscape just by flooding it and watching the lakes merge?",
  intro: "Differential topology studies smooth manifolds up to smooth deformation, with calculus as its tool. Its most beautiful idea is Morse theory: the critical points of a function — minima, saddles and maxima — determine the shape of the space. As water rises over a landscape, a new lake appears at every minimum, lakes merge or trap an island at every saddle, and islands drown at every maximum. The lab floods a landscape.",
  timeline: [[1885, "Poincaré: index of a vector field"], [1913, "Weyl: charts and atlases"], [1925, "Morse theory"], [1936, "Whitney: embedding"], [1954, "Thom: transversality"], [1956, "Milnor: exotic spheres"]],
  labs: [{
    kicker: "MORSE 1925 · SUBLEVEL SETS", title: "Raise the water level",
    intro: "The picture is a landscape seen from above: darker is lower. Raise the level c and everything below it floods (blue). The lab counts lakes (connected pieces of water) and islands (land surrounded by water) and marks each critical point as the water passes it: ▼ minimum, ✕ saddle, ▲ maximum.",
    html: `<div class="it-control"><label><span>water level c</span><output data-o="c">−0.30</output></label><input type="range" data-i="c" min="-0.5" max="0.5" step="0.002" value="-0.3"></div>
      <div class="it-lab-actions"><button class="it-send mo-play">▶ flood slowly</button></div>
      <canvas class="gk-canvas mo-cv"></canvas>
      <div class="gk-out mo-out"></div>`,
    caveat: "Passing a critical point of index k attaches a k-dimensional cell: a minimum (index 0) starts a lake, a saddle (index 1) adds a bridge that merges two lakes or closes a ring around an island, a maximum (index 2) fills the island in. So #lakes − #islands = #minima − #saddles + #maxima below the water.",
    init(root) {
      const W = 96, H = 64, cI = root.querySelector("[data-i=c]"), out = root.querySelector(".mo-out"), cv = root.querySelector(".mo-cv");
      const grid = []; for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) grid.push(LAND((i + .5) / W, (j + .5) / H));
      const lo = Math.min(...grid), hi = Math.max(...grid);
      function comps(mask, eight, skipBorder) {
        const seen = new Uint8Array(W * H); let n = 0;
        for (let s = 0; s < W * H; s++) if (mask[s] && !seen[s]) {
          let border = false; const st = [s]; seen[s] = 1;
          while (st.length) { const p = st.pop(), i = p % W, j = (p - i) / W; if (i === 0 || j === 0 || i === W - 1 || j === H - 1) border = true;
            for (let di = -1; di <= 1; di++) for (let dj = -1; dj <= 1; dj++) { if (!di && !dj) continue; if (!eight && di && dj) continue; const a = i + di, b = j + dj; if (a < 0 || b < 0 || a >= W || b >= H) continue; const q = b * W + a; if (mask[q] && !seen[q]) { seen[q] = 1; st.push(q); } } }
          if (!(skipBorder && border)) n++;
        }
        return n;
      }
      let stop = null;
      function draw() {
        const c = +cI.value; root.querySelector("[data-o=c]").textContent = fx(c, 2);
        const water = grid.map(v => v <= c), land = water.map(x => !x);
        const lakes = comps(water, false, false), isl = comps(land, true, true);
        const { ctx, w, h } = canvas(cv, 230), sx = w / W, sy = h / H;
        grid.forEach((v, k) => { const i = k % W, j = (k - i) / W, t = (v - lo) / (hi - lo);
          ctx.fillStyle = v <= c ? `hsl(215, 70%, ${22 + 30 * (1 - (c - v) / (c - lo + 1e-9))}%)` : `hsl(${35 + 10 * t}, ${35 + 20 * t}%, ${14 + 42 * t}%)`;
          ctx.fillRect(i * sx, j * sy, sx + .6, sy + .6); });
        const mark = (list, sym, col) => list.forEach(([x, y, v]) => { if (v > c) return; ctx.fillStyle = col; ctx.font = "bold 13px IBM Plex Mono"; ctx.textAlign = "center"; ctx.fillText(sym, x * w, y * h + 5); });
        mark(LAND_CRIT.min, "▼", "#9fd0ff"); mark(LAND_CRIT.saddle, "✕", "#fff"); mark(LAND_CRIT.max, "▲", C.red);
        const nb = k => ["min", "saddle", "max"].map(t => LAND_CRIT[t].filter(p => p[2] <= c).length)[k];
        const m0 = nb(0), m1 = nb(1), m2 = nb(2);
        out.innerHTML = `level ${fx(c, 3)}:   lakes b₀ = <span class="g">${lakes}</span>   islands b₁ = <span class="g">${isl}</span>   lakes − islands = ${lakes - isl}\n` +
          `critical points below: ${m0} minima − ${m1} saddles + ${m2} maxima = ${m0 - m1 + m2}${lakes - isl === m0 - m1 + m2 ? '  <span class="t">✓ agrees</span>' : ""}\n` +
          `<span class="d">critical levels: minima ${LAND_CRIT.min.map(p => fx(p[2], 2)).join(", ")} · saddles ${LAND_CRIT.saddle.map(p => fx(p[2], 3)).join(", ")} · maximum ${LAND_CRIT.max.map(p => fx(p[2], 2)).join(", ")}</span>` +
          (lakes === 1 && !isl && c > LAND_CRIT.max[0][2] ? `\n<span class="t">everything flooded: a disc, χ = 1 = 3 − 3 + 1.</span>` : "");
      }
      const play = root.querySelector(".mo-play");
      play.addEventListener("click", () => {
        if (stop) { stop(); stop = null; play.textContent = "▶ flood slowly"; return; }
        if (+cI.value > .45) cI.value = -.5;
        play.textContent = "❚❚ pause"; stop = loop(root, () => { cI.value = +cI.value + .0015; draw(); if (+cI.value >= .5) { play.textContent = "▶ flood slowly"; stop = null; return false; } });
      });
      cI.addEventListener("input", draw); draw();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1854–1936 — manifolds, charts and atlases", who: "Bernhard Riemann 1854 · Hermann Weyl 1913 · Hassler Whitney 1936",
      lead: "A manifold looks like ordinary space near each point, glued together smoothly.",
      formula: "φ_β ∘ φ_α⁻¹ is smooth wherever two charts overlap",
      what: "A smooth manifold is covered by charts — maps to ℝⁿ — whose changes of coordinates are smooth, like the overlapping pages of an atlas of the Earth. Tangent vectors, vector fields and derivatives make sense without any surrounding space.",
      how: "Whitney (1936) proved every smooth n-manifold embeds in ℝ²ⁿ, so the abstract definition captures exactly the smooth shapes that sit inside some Euclidean space.",
      story: "Riemann's lecture of 1854 spoke of 'n-fold extended quantities'; Weyl's book on Riemann surfaces (1913) gave the first modern definition by charts.",
      today: "Manifolds are the setting of general relativity (space-time), of robotics (configuration spaces) and of machine learning's 'manifold hypothesis' about high-dimensional data." },
    { icon: "⚙️", title: "1885–1926 — vector fields and the index", who: "Henri Poincaré 1885 · Heinz Hopf 1926",
      lead: "You can't comb a hairy ball flat — and the reason is a number.",
      formula: "Σ index(v, p) = χ(M)      (Poincaré–Hopf)",
      what: "The index of an isolated zero of a vector field counts how many times the field turns as you walk once around it: +1 for sources, sinks and centres, −1 for saddles. On a closed manifold the indices always add up to the Euler characteristic. The sphere has χ = 2, so every vector field on it vanishes somewhere — the hairy ball theorem.",
      how: "Morse theory is the gradient version: the critical points of a function are the zeros of its gradient, and on a surface minima and maxima have index +1, saddles −1 — the lab's count.",
      story: "Poincaré proved the theorem for surfaces in 1885; Hopf extended it to all dimensions in 1926.",
      today: "At every moment some point on Earth has zero horizontal wind. The index theorem grew into the Atiyah–Singer index theorem (1963)." },
    { icon: "🏛", title: "1925–1961 — Morse theory", who: "Marston Morse 1925 · Raoul Bott 1959 · Stephen Smale 1961 · John Milnor's lectures 1963",
      lead: "The critical points of a function build the space one cell at a time.",
      formula: "#minima − #saddles + #maxima = χ(M)",
      what: "A Morse function has only non-degenerate critical points. Passing one of index k — k independent downhill directions — attaches a k-dimensional cell to the region below: a minimum starts a new piece, a saddle adds a bridge, a maximum caps a hole. The lab watches it happen.",
      how: "Smale's h-cobordism theorem (1961) used Morse theory to prove the Poincaré conjecture in every dimension from 5 up, by cancelling critical points in pairs. Bott's periodicity theorem (1959) came from Morse theory on spaces of paths.",
      story: "Morse applied his theory to geodesics — critical points of length — and proved that any two points of a sphere are joined by infinitely many geodesics. Smale recalled working on some of his ideas on the beaches of Rio de Janeiro.",
      today: "Persistent homology in data analysis tracks exactly the lab's changing counts across all levels; Floer homology carries Morse theory into infinite dimensions." },
    { icon: "🔥", title: "1954–today — transversality and exotic spheres", who: "René Thom 1954 · John Milnor 1956 · Kervaire & Milnor 1963 · Michael Freedman & Simon Donaldson 1982–83",
      lead: "Generic things meet cleanly — and spheres can carry exotic smooth structures.",
      formula: "28 smooth structures on S⁷;   uncountably many on ℝ⁴",
      what: "Thom's transversality theorem: after an arbitrarily small wiggle, maps meet submanifolds cleanly, so intersection numbers and cobordism become computable (Fields Medal 1958). Milnor (1956) found exotic 7-spheres, homeomorphic to S⁷ but not diffeomorphic to it; Kervaire and Milnor (1963) counted 28.",
      how: "Dimension 4 is uniquely strange: Freedman's topological classification and Donaldson's gauge theory together showed that ℝ⁴ carries exotic smooth structures — uncountably many (Taubes, 1987) — while every other ℝⁿ has just one.",
      story: "Milnor was trying to prove that his manifolds were ordinary spheres, and found a contradiction instead. Whether the 4-sphere has an exotic smooth structure is still open.",
      today: "Differential topology meets physics in gauge theory and topological quantum field theory; transversality explains why generic behaviour is robust in dynamics and data." }
  ],
  challenges: [
    "Raise the water slowly. At which levels does a new lake appear, and where do two lakes merge? Which critical points are those?",
    "When a ring of water closes around an island, which count changes — and what kind of critical point caused it?",
    "At the top everything is flooded. Check that #minima − #saddles + #maxima = 1, the Euler characteristic of a disc."
  ],
  sources: [
    { type: "CLASSIC", title: "John Milnor — Topology from the Differentiable Viewpoint", note: "Degree, Sard's theorem and Poincaré–Hopf in 64 pages.", url: null },
    { type: "CLASSIC", title: "John Milnor — Morse Theory", note: "The lectures that taught a generation (1963).", url: null },
    { type: "TEXTBOOK", title: "Guillemin & Pollack — Differential Topology", note: "Transversality and intersection theory for beginners.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Marston Morse", note: "Critical points and the calculus of variations in the large.", url: MT("Morse") }
  ]
});

/* ================================================================ DIFFERENTIAL GEOMETRY */
const CURVES = {
  ellipse: { name: "ellipse", f: t => [2 * Math.cos(t), 1.2 * Math.sin(t)] },
  flower: { name: "wavy loop", f: t => { const r = 1.5 + .35 * Math.cos(5 * t); return [r * Math.cos(t), r * Math.sin(t)]; } },
  limacon: { name: "limaçon (inner loop)", f: t => { const r = 1.6 * (.5 + Math.cos(t)); return [r * Math.cos(t) - .4, r * Math.sin(t)]; } },
  eight: { name: "figure eight", f: t => [1.9 * Math.cos(t), 1.9 * Math.sin(t) * Math.cos(t)] }
};
register("differential-geometry", {
  kicker: "CURVATURE, FROM CURVES TO SPACE-TIME · ABOUT 30 MIN",
  hook: "How much does a curve turn — and why must a closed curve turn a whole number of times?",
  intro: "Differential geometry measures shape with calculus. It starts with the curvature of a curve — how fast its direction turns — and climbs through Gauss's curvature of surfaces to Riemann's curvature of spaces of any dimension, which Einstein used to describe gravity. The lab rolls the best-fitting circle along plane curves and adds up their curvature.",
  timeline: [[1673, "Huygens: evolutes"], [1827, "Gauss: Theorema Egregium"], [1847, "Frenet: curvature & torsion"], [1854, "Riemann's lecture"], [1915, "Einstein: curved space-time"], [1917, "Levi-Civita: parallel transport"]],
  labs: [{
    kicker: "HUYGENS 1673 · HOPF 1935", title: "The osculating circle and total curvature",
    intro: "Slide along the curve. The circle is the osculating circle — the circle that hugs the curve best at that point; its radius is 1/|κ|. The faint curve is the evolute, traced by the circle's centre. The counter adds up how far the tangent has turned.",
    html: `<div class="gk-chips dg-pre">${Object.entries(CURVES).map(([k, c], i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-k="${k}">${c.name}</button>`).join("")}</div>
      <div class="it-control"><label><span>position t</span><output data-o="t">0.00</output></label><input type="range" data-i="t" min="0" max="6.283" step="0.005" value="0.3"></div>
      <canvas class="gk-canvas dg-cv"></canvas>
      <div class="gk-out dg-out"></div>`,
    caveat: "Hopf's Umlaufsatz (1935): for a closed plane curve, ∮ κ ds = 2π × (turning number), and a simple closed curve has turning number ±1. Where the curve bends the other way κ is negative, which is how the wavy loop still totals exactly 2π and the figure eight totals 0.",
    init(root) {
      let key = "ellipse";
      const tI = root.querySelector("[data-i=t]"), out = root.querySelector(".dg-out"), cv = root.querySelector(".dg-cv");
      const d = (f, t) => { const e = 1e-4, a = f(t - e), b = f(t + e), c = f(t); return { p: c, d1: [(b[0] - a[0]) / (2 * e), (b[1] - a[1]) / (2 * e)], d2: [(b[0] - 2 * c[0] + a[0]) / (e * e), (b[1] - 2 * c[1] + a[1]) / (e * e)] }; };
      const kap = (f, t) => { const { d1, d2 } = d(f, t); return (d1[0] * d2[1] - d1[1] * d2[0]) / Math.pow(d1[0] ** 2 + d1[1] ** 2, 1.5); };
      function run() {
        const f = CURVES[key].f, t = +tI.value; root.querySelector("[data-o=t]").textContent = t.toFixed(2);
        const { ctx, w, h } = canvas(cv, 250), s = Math.min(w / 5.6, h / 3.6), cx = w / 2, cy = h / 2, P = ([x, y]) => [cx + x * s, cy - y * s];
        const M = 1200; let total = 0, upto = 0;
        ctx.strokeStyle = "rgba(180,140,255,.35)"; ctx.lineWidth = 1; ctx.beginPath(); let pen = false;
        for (let i = 0; i < M; i++) { const u = 2 * Math.PI * i / M, k = kap(f, u), { p, d1 } = d(f, u), sp = Math.hypot(...d1), N = [-d1[1] / sp, d1[0] / sp];
          const dk = k * sp * 2 * Math.PI / M; total += dk; if (u <= t) upto += dk;
          if (Math.abs(k) > .18) { const c = [p[0] + N[0] / k, p[1] + N[1] / k]; pen ? ctx.lineTo(...P(c)) : ctx.moveTo(...P(c)); pen = true; } else pen = false; }
        ctx.stroke();
        ctx.strokeStyle = "rgba(255,255,255,.85)"; ctx.lineWidth = 1.8; ctx.beginPath(); for (let i = 0; i <= M; i++) { const q = P(f(2 * Math.PI * i / M)); i ? ctx.lineTo(...q) : ctx.moveTo(...q); } ctx.stroke();
        const { p, d1 } = d(f, t), k = kap(f, t), sp = Math.hypot(...d1), T = [d1[0] / sp, d1[1] / sp], N = [-T[1], T[0]];
        if (Math.abs(k) > 1e-3) { const c = [p[0] + N[0] / k, p[1] + N[1] / k]; ctx.strokeStyle = k > 0 ? C.gold : C.teal; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(...P(c), Math.min(2000, s / Math.abs(k)), 0, 7); ctx.stroke();
          ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.moveTo(...P(p)); ctx.lineTo(...P(c)); ctx.stroke(); ctx.setLineDash([]); ctx.fillStyle = ctx.strokeStyle; ctx.beginPath(); ctx.arc(...P(c), 3, 0, 7); ctx.fill(); }
        ctx.strokeStyle = C.red; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(...P([p[0] - T[0] * .6, p[1] - T[1] * .6])); ctx.lineTo(...P([p[0] + T[0] * .6, p[1] + T[1] * .6])); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(...P(p), 4.5, 0, 7); ctx.fill();
        const turn = Math.round(total / (2 * Math.PI));
        out.innerHTML = `curvature κ = <span class="${k >= 0 ? "g" : "t"}">${fx(k, 3)}</span>   radius 1/|κ| = ${Math.abs(k) < 1e-3 ? "∞" : fx(1 / Math.abs(k), 3)}   ${k >= 0 ? "(turning left: gold circle)" : "(turning right: teal circle)"}\n` +
          `tangent has turned ∫κ ds = ${fx(deg(upto), 1)}° so far\n` +
          `<span class="g">total curvature ∮κ ds = ${fx(total / Math.PI, 4)}π = 2π × ${turn}</span>   turning number ${turn}`;
      }
      chipGroup(root, ".dg-pre", ds => { key = ds.k; run(); });
      tI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1673–1851 — the curvature of curves", who: "Christiaan Huygens 1673 · Newton · Euler · Jean Frenet 1847 · Joseph Serret 1851",
      lead: "At each point a curve has a best-fitting circle, whose radius measures how sharply it bends.",
      formula: "κ = (x′y″ − y′x″) / (x′² + y′²)^(3/2)      ∮ κ ds = 2π × turning number",
      what: "The osculating circle touches a curve to second order; the curvature κ is one over its radius. Huygens (1673) studied the curve traced by its centre — the evolute. Frenet and Serret described curves in space by two numbers at each point: curvature, and torsion, which measures twisting out of the plane.",
      how: "The total signed curvature of a closed plane curve is 2π times its turning number, always a whole number (Hopf's Umlaufsatz, 1935): the lab's limaçon turns twice, the figure eight not at all.",
      story: "Huygens needed evolutes for his pendulum clock: the evolute of a cycloid is another cycloid, so a pendulum hung between cycloidal cheeks swings along a cycloid and keeps the same period whatever its amplitude.",
      today: "Road and railway designers use clothoids, curves whose curvature grows in proportion to length, so that steering and sideways force change smoothly; font and CAD designers check curvature plots." },
    { icon: "⚙️", title: "1827 — Gauss's remarkable theorem", who: "Carl Friedrich Gauss, Disquisitiones generales circa superficies curvas 1827",
      lead: "The curvature of a surface can be measured by an ant that never leaves it.",
      formula: "K = κ₁κ₂ = (LN − M²)/(EG − F²),  and K depends only on E, F, G",
      what: "At each point of a surface the principal curvatures κ₁, κ₂ are the greatest and least curvatures of the curves cut by planes through the normal; their product is the Gaussian curvature K. Gauss's Theorema Egregium: K can be computed from distances measured within the surface alone.",
      how: "That is why a flat sheet (K = 0) rolls into a cylinder without stretching, but can't be wrapped smoothly round a sphere (K > 0) — and why every flat map of the Earth distorts something.",
      story: "Gauss came to the subject through his geodetic survey of the Kingdom of Hanover (1818–32), measuring huge triangles between hilltops. The story that he checked whether the Brocken–Hohenhagen–Inselsberg triangle summed to 180° is probably a legend, but the survey did drive the theory.",
      today: "Fold a slice of pizza along its length and the tip stops drooping — the Theorema Egregium at work. Gauss–Bonnet, ∫K dA = 2πχ, ties curvature to topology." },
    { icon: "🏛", title: "1854–1917 — Riemann's curved spaces", who: "Bernhard Riemann 1854 · Elwin Christoffel 1869 · Gregorio Ricci & Tullio Levi-Civita 1900 · Levi-Civita 1917",
      lead: "Riemann imagined spaces of any dimension, with a way of measuring distance that changes from point to point.",
      formula: "ds² = Σ gᵢⱼ dxⁱ dxʲ",
      what: "A Riemannian metric gives lengths and angles in every tangent space. Riemann found that its curvature is a tensor — at each point a whole family of sectional curvatures, one for each 2-plane. Christoffel (1869) and the tensor calculus of Ricci and Levi-Civita (1900) made it computable.",
      how: "Levi-Civita's parallel transport (1917) carries a vector along a curve without turning it; around a closed loop it returns rotated by the curvature enclosed — the parallel-transport atom.",
      story: "Riemann gave his lecture 'On the hypotheses which lie at the foundations of geometry' on 10 June 1854 to qualify as a university lecturer. Gauss, aged 77, had chosen that topic from the three Riemann offered, and was deeply impressed. It was published only in 1868, after Riemann's death.",
      today: "GPS satellites correct for curved space-time; Riemannian optimisation and information geometry use curvature in statistics and machine learning." },
    { icon: "🔥", title: "1915–today — Einstein, Ricci flow and beyond", who: "Albert Einstein & Marcel Grossmann 1913–15 · Richard Hamilton 1982 · Grigori Perelman 2002–03",
      lead: "Gravity is curvature — and curvature can be made to flow until a shape reveals itself.",
      formula: "R_μν − ½ R g_μν = 8πG T_μν      ∂g/∂t = −2 Ric(g)",
      what: "Einstein's field equations (1915): matter tells space-time how to curve, and curvature tells matter how to move. Hamilton's Ricci flow (1982) evolves a metric like heat, smoothing out its curvature; Perelman (2002–03) used it, with surgery, to prove Thurston's geometrization conjecture and the Poincaré conjecture.",
      how: "Symplectic geometry (from Hamilton's mechanics, 1834) and Kähler geometry (1933) study spaces with extra structure; Yau's proof of the Calabi conjecture (1977) produced the Calabi–Yau manifolds of string theory.",
      story: "Einstein learned Riemannian geometry from his friend Grossmann, and wrote to Sommerfeld in 1912 that he had come to have great respect for mathematics, whose subtler parts he had until then considered pure luxury. Perelman declined both the Fields Medal (2006) and the Millennium Prize (2010).",
      today: "LIGO's detection of gravitational waves (2015) measured ripples of curvature; numerical relativity solves Einstein's equations on supercomputers." }
  ],
  challenges: [
    "On the ellipse, where is the curvature greatest and where least? Check κ = a/b² and b/a² with a = 2, b = 1.2.",
    "The limaçon's total curvature is 4π. Where does the extra 2π come from?",
    "The figure eight bends everywhere, yet its total curvature is 0. Watch the colour of the circle: how do the two lobes cancel?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "Manfredo do Carmo — Differential Geometry of Curves and Surfaces", note: "The classic first course.", url: null },
    { type: "BOOK", title: "Tristan Needham — Visual Differential Geometry and Forms", note: "Curvature seen, not just computed (2021).", url: null },
    { type: "ORIGINAL · 1854", title: "Riemann — On the Hypotheses which lie at the Bases of Geometry", note: "The German text and Clifford's English translation, edited by David Wilkins.", url: "https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Geom/" },
    { type: "BIOGRAPHY", title: "MacTutor — Carl Friedrich Gauss", note: "The prince of mathematicians, and his survey.", url: MT("Gauss") }
  ]
});

/* ================================================================ LOW-DIMENSIONAL TOPOLOGY & KNOTS */
const torusKnot = (p, q) => t => { const r = 2 + Math.cos(q * t); return [r * Math.cos(p * t), r * Math.sin(p * t), Math.sin(q * t)]; };
const KNOTS = {
  unknot: { name: "twisted unknot", f: t => { const r = .5 + Math.cos(t); return [r * Math.cos(t) - .3, r * Math.sin(t), Math.sin(t)]; } },
  trefoil: { name: "trefoil 3₁", f: torusKnot(2, 3) },
  fig8: { name: "figure-eight 4₁", f: t => [(2 + Math.cos(2 * t)) * Math.cos(3 * t), (2 + Math.cos(2 * t)) * Math.sin(3 * t), Math.sin(4 * t)] },
  cinq: { name: "cinquefoil 5₁", f: torusKnot(2, 5) },
  t34: { name: "torus knot T(3,4)", f: torusKnot(3, 4) }
};
function knotData(f, M = 720) {
  const P = Array.from({ length: M }, (_, i) => f(2 * Math.PI * i / M)), X = [];
  for (let i = 0; i < M; i++) for (let j = i + 2; j < M; j++) {
    if (i === 0 && j === M - 1) continue;
    const a = P[i], b = P[(i + 1) % M], c = P[j], d = P[(j + 1) % M];
    const den = (b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]); if (Math.abs(den) < 1e-12) continue;
    const u = ((c[0] - a[0]) * (d[1] - c[1]) - (c[1] - a[1]) * (d[0] - c[0])) / den, v = ((c[0] - a[0]) * (b[1] - a[1]) - (c[1] - a[1]) * (b[0] - a[0])) / den;
    if (u < 0 || u >= 1 || v < 0 || v >= 1) continue;
    const zi = a[2] + u * (b[2] - a[2]), zj = c[2] + v * (d[2] - c[2]);
    X.push({ over: zi > zj ? i + u : j + v, under: zi > zj ? j + v : i + u, pt: [a[0] + u * (b[0] - a[0]), a[1] + u * (b[1] - a[1])] });
  }
  const U = X.map(x => x.under).sort((a, b) => a - b), n = U.length;
  const arcOf = s => { if (s < U[0]) return n - 1; let k = 0; for (let m = 0; m < n; m++) if (s >= U[m]) k = m; return k; };
  const cross = X.map(x => { const k = U.indexOf(x.under); return { o: arcOf(x.over), a: (k - 1 + n) % n, b: k, pt: x.pt, under: x.under }; });
  const arcPt = P.map((_, i) => arcOf(i + .5));
  // count colourings and determinant
  let cnt = 0, first = null; const tot = Math.pow(3, n);
  for (let m = 0; m < tot; m++) { const col = []; let x = m; for (let i = 0; i < n; i++) { col.push(x % 3); x = Math.floor(x / 3); }
    if (cross.every(({ o, a, b }) => (col[o] === col[a] && col[a] === col[b]) || (col[o] !== col[a] && col[a] !== col[b] && col[o] !== col[b]))) { cnt++; if (!first && new Set(col).size > 1) first = col; } }
  const red = cross.slice(1).map(({ o, a, b }) => { const r = Array(n).fill(0); r[o] += 2; r[a] -= 1; r[b] -= 1; return r.slice(1); });
  let det = 1; { const A = red.map(r => r.slice()), N = A.length; for (let c = 0; c < N; c++) { let p = c; while (p < N && Math.abs(A[p][c]) < 1e-9) p++; if (p === N) { det = 0; break; } if (p !== c) { [A[p], A[c]] = [A[c], A[p]]; det = -det; } det *= A[c][c]; for (let r = c + 1; r < N; r++) { const q = A[r][c] / A[c][c]; for (let k = c; k < N; k++) A[r][k] -= q * A[c][k]; } } }
  return { P, cross, n, arcPt, cnt, first, det: Math.round(Math.abs(det)) };
}
register("low-dim-topology", {
  kicker: "KNOTS, SURFACES AND 3-MANIFOLDS · ABOUT 30 MIN",
  hook: "How can you prove a knot can't be untied — without trying every possible move?",
  intro: "Low-dimensional topology studies spaces of dimension 2, 3 and 4 — the ones we can almost see, and the hardest to understand. Knots were first tabulated by physicists who thought atoms were knotted vortices; proving that two diagrams really show different knots needs invariants. The simplest, colouring with three colours, already proves the trefoil is knotted. The lab colours knot diagrams.",
  timeline: [[1863, "Möbius: classifying surfaces"], [1876, "Tait's knot tables"], [1927, "Reidemeister moves"], [1928, "Alexander polynomial"], [1984, "Jones polynomial"], [2003, "Perelman: geometrization"]],
  labs: [{
    kicker: "FOX · TRICOLOURABILITY", title: "Colour the knot",
    intro: "A diagram breaks into arcs at each under-crossing. Click an arc to cycle its colour. The rule: at every crossing the three arcs that meet must be all the same colour or all different. Use at least two colours and you have proved the knot is knotted.",
    html: `<div class="gk-chips kn-pre">${Object.entries(KNOTS).map(([k, v], i) => `<button class="gk-chip${i === 1 ? " on" : ""}" data-k="${k}">${v.name}</button>`).join("")}</div>
      <canvas class="gk-canvas kn-cv" style="cursor:pointer"></canvas>
      <div class="it-lab-actions"><button class="gk-ghost kn-show">show a colouring</button><button class="gk-ghost kn-clear">clear</button></div>
      <div class="gk-out kn-out"></div>`,
    caveat: "Tricolourability survives all three Reidemeister moves, so it is a knot invariant. It is decided by the determinant: a knot is 3-colourable exactly when 3 divides its determinant (3 for the trefoil, 5 for the figure-eight, 1 for the unknot). It cannot tell the figure-eight from the unknot — that needs a stronger invariant, such as the determinant itself.",
    init(root) {
      let key = "trefoil", K, col, geo;
      const cv = root.querySelector(".kn-cv"), out = root.querySelector(".kn-out");
      const PAL = ["rgba(255,255,255,.55)", C.red, C.green, C.blue];
      function load() { K = knotData(KNOTS[key].f); col = Array(K.n).fill(0); draw(); }
      function draw() {
        const { ctx, w, h } = canvas(cv, 260), xs = K.P.map(p => p[0]), ys = K.P.map(p => p[1]);
        const lx = Math.min(...xs), hx = Math.max(...xs), ly = Math.min(...ys), hy = Math.max(...ys), s = Math.min((w - 40) / (hx - lx), (h - 40) / (hy - ly));
        const Q = ([x, y]) => [w / 2 + (x - (lx + hx) / 2) * s, h / 2 - (y - (ly + hy) / 2) * s];
        geo = { Q };
        const M = K.P.length, hidden = new Uint8Array(M);
        K.cross.forEach(c => { const i0 = Math.floor(c.under), cp = Q(c.pt); for (let d = -8; d <= 8; d++) { const i = (i0 + d + M) % M; if (Math.hypot(...Q(K.P[i]).map((v, k) => v - cp[k])) < 9) hidden[i] = 1; } });
        ctx.lineCap = "round"; ctx.lineWidth = 4.5;
        for (let i = 0; i < M; i++) { const j = (i + 1) % M; if (hidden[i] || hidden[j]) continue; ctx.strokeStyle = PAL[col[K.arcPt[i]]]; ctx.beginPath(); ctx.moveTo(...Q(K.P[i])); ctx.lineTo(...Q(K.P[j])); ctx.stroke(); }
        let bad = 0, done = 0;
        K.cross.forEach(({ o, a, b, pt }) => { const cs = [col[o], col[a], col[b]]; if (cs.some(c => !c)) return; done++;
          const ok = (cs[0] === cs[1] && cs[1] === cs[2]) || new Set(cs).size === 3; if (!ok) bad++;
          const [x, y] = Q(pt); ctx.strokeStyle = ok ? "rgba(87,224,138,.9)" : "rgba(255,120,71,.95)"; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x, y, 12, 0, 7); ctx.stroke(); });
        const used = new Set(col.filter(Boolean)).size, full = col.every(Boolean);
        out.innerHTML = `${KNOTS[key].name}: ${K.cross.length} crossings, ${K.n} arcs\n` +
          (full && !bad ? (used > 1 ? `<span class="t">a valid ${used}-colouring with more than one colour — the knot is knotted!</span>` : `<span class="d">valid, but only one colour: every knot allows that.</span>`) :
            bad ? `<span class="r">${bad} crossing${bad > 1 ? "s break" : " breaks"} the rule</span> (red circles)` : `${done} of ${K.cross.length} crossings fully coloured`) +
          `\n<span class="g">colourings with 3 colours: ${K.cnt}${K.cnt > 3 ? " — more than the 3 one-colour ones: tricolourable" : " — only the 3 trivial ones: not tricolourable"}</span>\ndeterminant |Δ(−1)| = ${K.det}${K.det % 3 === 0 ? "  (divisible by 3 ✓)" : ""}`;
      }
      cv.addEventListener("click", e => {
        const r = cv.getBoundingClientRect(), p = [e.clientX - r.left, e.clientY - r.top]; let best = 1e9, bi = -1;
        K.P.forEach((q, i) => { const d = Math.hypot(...geo.Q(q).map((v, k) => v - p[k])); if (d < best) { best = d; bi = i; } });
        if (best < 14) { const a = K.arcPt[bi]; col[a] = (col[a] + 1) % 4; draw(); }
      });
      root.querySelector(".kn-show").addEventListener("click", () => { if (K.first) col = K.first.map(c => c + 1); else col = Array(K.n).fill(1); draw(); });
      root.querySelector(".kn-clear").addEventListener("click", () => { col = Array(K.n).fill(0); draw(); });
      chipGroup(root, ".kn-pre", ds => { key = ds.k; load(); });
      load();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1858–1925 — classifying surfaces", who: "August Möbius & Johann Listing 1858 · Möbius 1863 · Walther von Dyck 1888 · Dehn & Heegaard 1907",
      lead: "Every closed surface is a sphere with handles or with cross-caps — nothing else.",
      formula: "χ = 2 − 2g (orientable, genus g)      χ = 2 − k (k cross-caps)",
      what: "Möbius (1863) classified closed orientable surfaces by their number of handles, the genus; Dyck (1888) added the non-orientable ones, built from cross-caps like the projective plane and the Klein bottle. Two facts — orientable or not, and the Euler characteristic — decide the surface completely.",
      how: "Cut the surface open into a polygon with its edges glued in pairs, and simplify the gluing word: every surface reduces to a normal form such as aba⁻¹b⁻¹ (the torus) or aabb (the Klein bottle).",
      story: "Möbius and Listing discovered the one-sided band independently in 1858. Rigorous proofs of the classification came from Dehn and Heegaard (1907), Brahana (1921) and Radó, who showed every surface can be triangulated (1925).",
      today: "The surfaces atom rotates the torus, Möbius band and Klein bottle; the classification underlies string theory's worldsheets and the topology of two-dimensional materials." },
    { icon: "⚙️", title: "1867–1927 — knot tables and Reidemeister moves", who: "William Thomson (Kelvin) 1867 · Peter Guthrie Tait 1876–85 · Kurt Reidemeister 1927",
      lead: "A failed theory of atoms produced the first tables of knots.",
      formula: "Reidemeister moves: I twist · II poke · III slide",
      what: "Kelvin proposed in 1867 that atoms were knotted vortex tubes in the ether. Tait set out to list knots by their number of crossings, by hand, and with Kirkman and Little reached ten crossings. Reidemeister (1927) proved that two diagrams show the same knot exactly when three local moves connect them.",
      how: "An invariant is anything the three moves can't change. Tricolourability is one (the lab): at a crossing a twist, poke or slide never breaks the all-same-or-all-different rule.",
      story: "The vortex atom died with the ether, but Tait's tables lived on — with one duplicate, the 'Perko pair' of ten-crossing knots, spotted in 1974 by Kenneth Perko, a lawyer and amateur topologist.",
      today: "Computer-generated tables (Burton, 2020) list all prime knots up to 19 crossings — some 352 million of them." },
    { icon: "🏛", title: "1928–2011 — invariants, from Alexander to Khovanov", who: "James Alexander 1928 · Ralph Fox 1950s · Vaughan Jones 1984 · Edward Witten 1989 · Mikhail Khovanov 1999",
      lead: "Polynomials that tell knots apart — and a surprise from operator algebras.",
      formula: "trefoil: Δ(t) = t − 1 + t⁻¹,   V(t) = t + t³ − t⁴",
      what: "The Alexander polynomial (1928) comes from the homology of a covering space of the knot's complement; at t = −1 it gives the determinant that the lab computes. Fox's colourings are its hands-on shadow: a knot is 3-colourable exactly when 3 divides the determinant. The Jones polynomial (1984) can tell a knot from its mirror image.",
      how: "Jones found his polynomial while studying von Neumann algebras; Witten (1989) explained it through quantum field theory. Both received Fields Medals in 1990.",
      story: "Whether the Jones polynomial detects the unknot is still open. Its refinement, Khovanov homology (1999), does: Kronheimer and Mrowka proved in 2011 that it recognises the unknot.",
      today: "Knot invariants help biologists study enzymes that knot and unknot DNA, and appear in topological quantum computing." },
    { icon: "🔥", title: "1982–2003 — three and four dimensions", who: "William Thurston 1982 · Michael Freedman 1982 · Simon Donaldson 1983 · Grigori Perelman 2003",
      lead: "Every 3-manifold splits into pieces with one of eight geometries; four dimensions are stranger than all the others.",
      formula: "Thurston's eight geometries: S³, ℝ³, ℍ³, S²×ℝ, ℍ²×ℝ, Nil, Sol, SL₂(ℝ)~",
      what: "Thurston's geometrization conjecture (1982): every closed 3-manifold can be cut along spheres and tori into pieces that each carry one of eight geometries, most often hyperbolic. Perelman proved it (2002–03), settling the Poincaré conjecture. In four dimensions Freedman classified the simply connected topological manifolds (1982), while Donaldson showed that smooth ones behave completely differently (1983).",
      how: "The complement of most knots is a hyperbolic 3-manifold whose volume is a knot invariant; the figure-eight knot's complement has volume 2.0298…, the smallest possible for a knot.",
      story: "Thurston, Freedman and Donaldson received Fields Medals (1982 and 1986); Perelman declined his in 2006. The smooth four-dimensional Poincaré conjecture remains open.",
      today: "The SnapPy program computes the hyperbolic structure of a knot complement in seconds, and cosmologists test whether the universe could have a nontrivial topology." }
  ],
  challenges: [
    "Colour the trefoil with three colours so that every crossing is valid. How many valid colourings does the lab report, and how many use all three colours?",
    "Try the figure-eight knot. Why does every valid colouring end up using a single colour?",
    "The T(3,4) torus knot has 8 crossings. Is it tricolourable? Check your answer against its determinant."
  ],
  sources: [
    { type: "BOOK", title: "Colin Adams — The Knot Book", note: "The friendliest introduction, full of open problems.", url: null },
    { type: "DATABASE", title: "KnotInfo", note: "Invariants of every knot up to 13 crossings.", url: "https://knotinfo.math.indiana.edu/" },
    { type: "SOFTWARE", title: "SnapPy", note: "Hyperbolic structures on knot complements and 3-manifolds.", url: "https://snappy.computop.org/" },
    { type: "BIOGRAPHY", title: "MacTutor — William Thurston", note: "Geometry in three dimensions.", url: MT("Thurston") }
  ]
});

/* ================================================================ ALGEBRAIC GEOMETRY */
const CONICS = {
  circle: { name: "circle x² + y² = 1", q: [1, 0, 1, 0, 0, -1], draw: t => [[Math.cos(t), Math.sin(t)]] },
  ellipse: { name: "ellipse x²/4 + y² = 1", q: [.25, 0, 1, 0, 0, -1], draw: t => [[2 * Math.cos(t), Math.sin(t)]] },
  parabola: { name: "parabola y = x² − 1", q: [1, 0, 0, 0, -1, -1], draw: t => { const x = 3 * (t / Math.PI - 1); return [[x, x * x - 1]]; }, asym: 90 },
  hyperbola: { name: "hyperbola x² − y² = 1", q: [1, 0, -1, 0, 0, -1], draw: t => { const u = 2.2 * (t / Math.PI - 1); return [[Math.cosh(u), Math.sinh(u)], [-Math.cosh(u), Math.sinh(u)]]; }, asym: 45 }
};
register("algebraic-geometry", {
  kicker: "SHAPES CUT OUT BY EQUATIONS · ABOUT 25 MIN",
  hook: "Why does a line always meet a circle in exactly two points — even when they don't touch?",
  intro: "Algebraic geometry studies shapes defined by polynomial equations. Descartes and Fermat (1637) turned curves into equations; turning equations back into geometry exactly needed complex numbers, points at infinity and, eventually, Grothendieck's schemes. Its first great theorem, Bézout's, counts intersections: curves of degrees m and n meet in exactly mn points — once you count properly. The lab shows how.",
  timeline: [[1637, "Descartes & Fermat: coordinates"], [1779, "Bézout's theorem"], [1857, "Riemann: moduli"], [1893, "Hilbert's Nullstellensatz"], [1946, "Leray: sheaves"], [1960, "Grothendieck: schemes"]],
  labs: [{
    kicker: "BÉZOUT 1779 · PONCELET 1822", title: "Count the intersections properly",
    intro: "Move a line across a conic, or a circle across a circle. Real intersections are gold dots. When they disappear they have not gone: they have become complex (teal rings mark their shared real part) or gone off to infinity (arrows). The total never changes.",
    html: `<div class="gk-chips ag-mode"><button class="gk-chip on" data-m="line">line × conic (2)</button><button class="gk-chip" data-m="circ">circle × circle (4)</button></div>
      <div class="gk-chips ag-con">${Object.entries(CONICS).map(([k, c], i) => `<button class="gk-chip${i === 0 ? " on" : ""}" data-k="${k}">${c.name}</button>`).join("")}</div>
      <div class="it-control"><label><span class="ag-l1">line direction θ</span><output data-o="a">20°</output></label><input type="range" data-i="a" min="0" max="180" step="0.5" value="20"></div>
      <div class="it-control"><label><span class="ag-l2">line offset</span><output data-o="b">0.40</output></label><input type="range" data-i="b" min="-2.5" max="2.5" step="0.01" value="0.4"></div>
      <div class="gk-chips ag-asym"><button class="gk-chip" data-x="asym">point the line at infinity's special direction</button></div>
      <canvas class="gk-canvas ag-cv"></canvas>
      <div class="gk-out ag-out"></div>`,
    caveat: "Every circle passes through the two 'circular points at infinity' (1 : i : 0) and (1 : −i : 0) — Poncelet's discovery. That is why two circles, which Bézout says meet in 4 points, never share more than 2 real points: the other 2 are always those.",
    init(root) {
      let mode = "line", key = "circle";
      const aI = root.querySelector("[data-i=a]"), bI = root.querySelector("[data-i=b]"), out = root.querySelector(".ag-out"), cv = root.querySelector(".ag-cv");
      const cx = z => (z.im && Math.abs(z.im) > 1e-9) ? `${fx(z.re, 2)} ${z.im < 0 ? "−" : "+"} ${fx(Math.abs(z.im), 2)}i` : fx(z.re, 3);
      function run() {
        const circ = mode === "circ";
        root.querySelector(".ag-con").hidden = circ; root.querySelector(".ag-asym").hidden = circ || !CONICS[key].asym;
        if (circ) { aI.min = 0; aI.max = 3.5; aI.step = .01; bI.min = .2; bI.max = 2; bI.step = .01; }
        else { aI.min = 0; aI.max = 180; aI.step = .5; bI.min = -2.5; bI.max = 2.5; bI.step = .01; }
        root.querySelector(".ag-l1").textContent = circ ? "distance between centres d" : "line direction θ";
        root.querySelector(".ag-l2").textContent = circ ? "second radius r" : "line offset";
        const A = +aI.value, B = +bI.value;
        root.querySelector("[data-o=a]").textContent = circ ? A.toFixed(2) : A + "°"; root.querySelector("[data-o=b]").textContent = B.toFixed(2);
        const { ctx, w, h } = canvas(cv, 250), s = Math.min(w, h) / 6.4, ox = w / 2, oy = h / 2, P = ([x, y]) => [ox + x * s, oy - y * s];
        ctx.strokeStyle = "rgba(255,255,255,.1)"; ctx.beginPath(); ctx.moveTo(0, oy); ctx.lineTo(w, oy); ctx.moveTo(ox, 0); ctx.lineTo(ox, h); ctx.stroke();
        const pts = [], cpx = [], inf = []; let lines = [];
        if (!circ) {
          const Cn = CONICS[key], [a, b, c, d, e, f] = Cn.q, th = A * Math.PI / 180, u = [Math.cos(th), Math.sin(th)], n = [-u[1], u[0]], p0 = [B * n[0], B * n[1]];
          ctx.strokeStyle = "rgba(255,255,255,.8)"; ctx.lineWidth = 1.8;
          ctx.beginPath(); for (let i = 0; i <= 400; i++) { const seg = Cn.draw(2 * Math.PI * i / 400); seg.forEach((q, k) => { if (k === 0) i ? ctx.lineTo(...P(q)) : ctx.moveTo(...P(q)); }); } ctx.stroke();
          if (key === "hyperbola") { ctx.beginPath(); for (let i = 0; i <= 400; i++) { const q = Cn.draw(2 * Math.PI * i / 400)[1]; i ? ctx.lineTo(...P(q)) : ctx.moveTo(...P(q)); } ctx.stroke(); }
          lines = [[[p0[0] - 9 * u[0], p0[1] - 9 * u[1]], [p0[0] + 9 * u[0], p0[1] + 9 * u[1]]]];
          const QA = a * u[0] ** 2 + b * u[0] * u[1] + c * u[1] ** 2;
          const QB = 2 * a * p0[0] * u[0] + b * (p0[0] * u[1] + p0[1] * u[0]) + 2 * c * p0[1] * u[1] + d * u[0] + e * u[1];
          const QC = a * p0[0] ** 2 + b * p0[0] * p0[1] + c * p0[1] ** 2 + d * p0[0] + e * p0[1] + f;
          const at = t => [p0[0] + t * u[0], p0[1] + t * u[1]];
          if (Math.abs(QA) > 1e-9) {
            const D = QB * QB - 4 * QA * QC;
            if (Math.abs(D) < 1e-6) pts.push({ p: at(-QB / (2 * QA)), mult: 2 });
            else if (D > 0) [1, -1].forEach(sg => pts.push({ p: at((-QB + sg * Math.sqrt(D)) / (2 * QA)), mult: 1 }));
            else { const re = -QB / (2 * QA), im = Math.sqrt(-D) / (2 * Math.abs(QA)); cpx.push({ re: at(re), im: [im * u[0], im * u[1]] }); }
          } else {
            if (Math.abs(QB) > 1e-9) { pts.push({ p: at(-QC / QB), mult: 1 }); inf.push({ dir: u, mult: 1 }); }
            else inf.push({ dir: u, mult: 2 });
          }
        } else {
          const d = A, r = B;
          ctx.strokeStyle = "rgba(255,255,255,.8)"; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(...P([0, 0]), s, 0, 7); ctx.stroke();
          ctx.strokeStyle = "rgba(180,140,255,.9)"; ctx.beginPath(); ctx.arc(...P([d, 0]), r * s, 0, 7); ctx.stroke();
          if (d < 1e-6) { inf.push({ circ: true, mult: 2 }); }
          else { const x = (d * d + 1 - r * r) / (2 * d), y2 = 1 - x * x;
            if (Math.abs(y2) < 1e-6) pts.push({ p: [x, 0], mult: 2 }); else if (y2 > 0) { pts.push({ p: [x, Math.sqrt(y2)], mult: 1 }); pts.push({ p: [x, -Math.sqrt(y2)], mult: 1 }); }
            else cpx.push({ re: [x, 0], im: [0, Math.sqrt(-y2)] });
            ctx.setLineDash([3, 4]); ctx.strokeStyle = "rgba(63,208,201,.4)"; ctx.beginPath(); ctx.moveTo(...P([x, -4])); ctx.lineTo(...P([x, 4])); ctx.stroke(); ctx.setLineDash([]);
            inf.push({ circ: true, mult: 1 });
          }
        }
        lines.forEach(([p, q]) => { ctx.strokeStyle = C.gold; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(...P(p)); ctx.lineTo(...P(q)); ctx.stroke(); });
        pts.forEach(({ p, mult }) => { ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(...P(p), mult > 1 ? 7 : 5, 0, 7); ctx.fill(); });
        cpx.forEach(({ re }) => { ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.setLineDash([3, 3]); ctx.beginPath(); ctx.arc(...P(re), 8, 0, 7); ctx.stroke(); ctx.setLineDash([]); });
        inf.filter(i => i.dir).forEach(({ dir }) => { [1, -1].forEach(sg => { const q = P([sg * dir[0] * 2.9, sg * dir[1] * 2.9]); ctx.fillStyle = C.teal; ctx.font = "16px IBM Plex Mono"; ctx.textAlign = "center"; ctx.fillText("→∞", q[0], q[1]); }); });
        const nReal = pts.reduce((s, p) => s + p.mult, 0), nC = cpx.length * 2, nInf = inf.reduce((s, i) => s + (i.circ ? 2 * i.mult : i.mult), 0), total = nReal + nC + nInf;
        out.innerHTML = (pts.length ? pts.map(({ p, mult }) => `<span class="g">real point (${fx(p[0], 3)}, ${fx(p[1], 3)})${mult > 1 ? " — tangent, counts twice" : ""}</span>`).join("\n") + "\n" : "") +
          cpx.map(({ re, im }) => `<span class="t">complex pair (${cx({ re: re[0], im: im[0] })}, ${cx({ re: re[1], im: im[1] })}) and its conjugate</span>`).join("\n") + (cpx.length ? "\n" : "") +
          inf.map(i => i.circ ? `<span class="t">the circular points (1 : i : 0), (1 : −i : 0)${i.mult > 1 ? ", each counted twice (concentric circles)" : ""}</span>` : `<span class="t">a point at infinity in the line's direction${i.mult > 1 ? ", counted twice: the line is tangent there (an asymptote)" : ""}</span>`).join("\n") +
          `\n\nreal ${nReal} + complex ${nC} + at infinity ${nInf} = <span class="g">${total}</span> = ${circ ? "2 × 2" : "1 × 2"} (Bézout) ✓`;
      }
      chipGroup(root, ".ag-mode", ds => { mode = ds.m; if (mode === "circ") { aI.value = 1.6; bI.value = .9; } else { aI.value = 20; bI.value = .4; } run(); });
      chipGroup(root, ".ag-con", ds => { key = ds.k; run(); });
      root.querySelector(".ag-asym .gk-chip").addEventListener("click", () => { aI.value = CONICS[key].asym; run(); });
      aI.addEventListener("input", run); bI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1637 — curves become equations", who: "René Descartes, La Géométrie 1637 · Pierre de Fermat 1636 · Isaac Newton 1704",
      lead: "With coordinates, every curve is an equation and every equation a curve.",
      formula: "conic: ax² + bxy + cy² + dx + ey + f = 0",
      what: "Descartes and Fermat independently introduced coordinates, so the conic sections of Apollonius became equations of degree 2. Degree is the first invariant of a curve: lines have degree 1, conics degree 2. Newton (1704) sorted cubic curves into 72 species; six more were found later.",
      how: "The discriminant b² − 4ac decides ellipse, parabola or hyperbola — which is really about how the conic meets the line at infinity: in two complex points, once tangentially, or in two real points.",
      story: "La Géométrie appeared as an appendix to Descartes' Discourse on Method; Fermat's introduction to loci circulated in manuscript from 1636.",
      today: "The curves of computer graphics and fonts (Bézier curves) are pieces of algebraic curves, and the positions of a robot arm form an algebraic variety." },
    { icon: "⚙️", title: "1779 — Bézout's theorem", who: "Étienne Bézout 1779 · Jean-Victor Poncelet 1822 · van der Waerden & Weil (multiplicity)",
      lead: "Curves of degrees m and n meet in exactly mn points — counting complex points, points at infinity and multiplicity.",
      formula: "#(C ∩ D) = deg C · deg D   in the complex projective plane",
      what: "A line meets a conic in 2 points: two real ones, a complex-conjugate pair, one double point (tangency), or a point at infinity when the line runs parallel to an asymptote. Two circles meet in 4 points: at most 2 real ones, plus the two 'circular points at infinity' that lie on every circle. The lab counts them all.",
      how: "Work in the projective plane with complex coordinates. Then a polynomial of degree d in one variable always has exactly d roots, and eliminating a variable with the resultant gives the count.",
      story: "Bézout proved it in his Théorie générale des équations algébriques (1779); the rigorous definition of intersection multiplicity took until the twentieth century. Poncelet introduced the circular points at infinity in 1822.",
      today: "Bézout's bound tells numerical algebraic geometry (homotopy continuation) how many solutions a polynomial system can have, so it knows when it has found them all." },
    { icon: "🏛", title: "1857–1946 — moduli, surfaces and sheaves", who: "Riemann 1857 · Castelnuovo, Enriques & Severi · Oscar Zariski & André Weil · Jean Leray 1946",
      lead: "The Italian school built a geometry of surfaces on intuition; the next generation rebuilt it on algebra.",
      formula: "dimension of the moduli of curves of genus g = 3g − 3   (g ≥ 2)",
      what: "Riemann (1857) counted the parameters of curves of genus g: 3g − 3, the dimension of what is now called their moduli space. The Italian school classified algebraic surfaces between about 1890 and 1930 with brilliant but not always rigorous arguments; Zariski and Weil rebuilt the foundations on commutative algebra.",
      how: "A sheaf attaches data, such as functions, to open sets in a compatible way; sheaf cohomology measures the obstruction to gluing local solutions into a global one. Serre's paper FAC (1955) brought sheaves into algebraic geometry.",
      story: "Leray developed sheaves as a prisoner of war in Austria (1940–45). Zariski, trained in Rome, emigrated to the United States and rebuilt algebraic geometry with algebraic tools.",
      today: "Moduli spaces — spaces whose points are themselves geometric objects — are central to string theory and to enumerative geometry." },
    { icon: "🔥", title: "1960–today — schemes and the arithmetic frontier", who: "Alexander Grothendieck 1960 · Pierre Deligne 1974 · Gerd Faltings 1983 · Peter Scholze",
      lead: "One language for geometry over ℂ, over finite fields and over the integers.",
      formula: "#C(𝔽_q) = q + 1 − (α₁ + ⋯ + α₂g),   |αᵢ| = √q",
      what: "Grothendieck's schemes treat any commutative ring as geometry, so curves over finite fields and over ℤ are as geometric as curves over ℂ. The Weil conjectures (1949), proved by Dwork, Grothendieck and Deligne (1974), control the number of points of varieties over finite fields. Faltings (1983) proved Mordell's conjecture: a curve of genus 2 or more has only finitely many rational points.",
      how: "Étale cohomology gives topological invariants of varieties over any field; counting points becomes a trace formula, like Lefschetz's fixed-point theorem.",
      story: "Grothendieck's seminar ran at the IHÉS through the 1960s; Deligne, his student, proved the last Weil conjecture in 1974 by a route Grothendieck had not foreseen.",
      today: "Elliptic-curve cryptography, error-correcting codes from curves (Goppa codes) and the mirror symmetry of string theory all run on algebraic geometry." }
  ],
  challenges: [
    "Slide the line off the circle. Where did the two intersection points go?",
    "Choose the hyperbola and point the line along an asymptote. One intersection escapes — where to? Now move the line onto the asymptote itself.",
    "Switch to two circles that don't touch. Bézout promises 4 intersections: name all four."
  ],
  sources: [
    { type: "TEXTBOOK", title: "Cox, Little & O'Shea — Ideals, Varieties, and Algorithms", note: "Algebraic geometry with computation, for undergraduates.", url: null },
    { type: "TEXTBOOK", title: "Miles Reid — Undergraduate Algebraic Geometry", note: "Short, opinionated and historical.", url: null },
    { type: "FREE BOOK", title: "Ravi Vakil — The Rising Sea", note: "Schemes, sheaves and cohomology.", url: "https://math.stanford.edu/~vakil/216blog/" },
    { type: "BIOGRAPHY", title: "MacTutor — Étienne Bézout", note: "The textbook writer behind the theorem.", url: MT("Bezout") }
  ]
});

/* ================================================================ FIBER BUNDLES */
register("fiber-bundles", {
  kicker: "TWISTED PRODUCTS · ABOUT 25 MIN",
  hook: "Why must every section of a Möbius band cross zero somewhere?",
  intro: "A fiber bundle looks locally like a product — a little piece of the base times a fiber — but may be twisted globally, like the Möbius band compared with a cylinder. The twisting is measured by characteristic classes: invariants that obstruct things from existing, such as nowhere-zero sections, global frames or combings. The lab lets you draw a section and see the twist force a zero.",
  timeline: [[1858, "Möbius & Listing: the band"], [1931, "Hopf fibration"], [1935, "Whitney & Stiefel: characteristic classes"], [1946, "Chern classes"], [1950, "Ehresmann: connections"], [1954, "Yang–Mills"]],
  labs: [{
    kicker: "WHITNEY 1935 · SECTIONS OF LINE BUNDLES", title: "Draw a section of a twisted band",
    intro: "A section picks one point in each fiber — a height between −1 and 1 above every point of the circle. Drag the handles in the strip. The right end is glued to the left end, flipped once for every half-twist, so the curve must come back to its start value — or minus it. Red dots mark zeros.",
    html: `<div class="gk-chips fb-tw">${[0, 1, 2, 3].map(n => `<button class="gk-chip${n === 1 ? " on" : ""}" data-n="${n}">${n} half-twist${n === 1 ? "" : "s"}${n === 0 ? " (cylinder)" : n === 1 ? " (Möbius)" : ""}</button>`).join("")}</div>
      <canvas class="gk-canvas fb-band"></canvas>
      <canvas class="gk-canvas fb-strip" style="cursor:ns-resize"></canvas>
      <div class="it-lab-actions"><button class="gk-ghost fb-flat">constant section</button><button class="gk-ghost fb-rand">random section</button></div>
      <div class="gk-out fb-out"></div>`,
    caveat: "With an odd number of half-twists the section must return as minus its starting value, so by the intermediate value theorem it crosses zero — an odd number of times, if it crosses cleanly. That obstruction is the first Stiefel–Whitney class w₁ ≠ 0. With an even number of twists the band is secretly a cylinder, and a nowhere-zero section exists.",
    init(root) {
      const K = 8; let n = 1, v = Array(K).fill(.55), drag = -1, spin = 0, stop;
      const band = root.querySelector(".fb-band"), strip = root.querySelector(".fb-strip"), out = root.querySelector(".fb-out");
      const wrap = () => (n % 2 ? -1 : 1) * v[0];
      const sec = th => { const x = th / (2 * Math.PI) * K, k = Math.min(K - 1, Math.floor(x)), f = x - k, a = v[k], b = k + 1 < K ? v[k + 1] : wrap(); return a + (b - a) * f; };
      const zeros = () => { const z = []; for (let k = 0; k < K; k++) { const a = v[k], b = k + 1 < K ? v[k + 1] : wrap(); if (a === 0) z.push(k / K); else if (a * b < 0) z.push((k + a / (a - b)) / K); } return z; };
      let S;
      function drawStrip() {
        const { ctx, w, h } = canvas(strip, 130); S = { w, h, pad: 22 };
        const X = t => S.pad + (w - 2 * S.pad) * t, Y = y => h / 2 - y * (h / 2 - 14);
        ctx.fillStyle = "rgba(63,208,201,.08)"; ctx.fillRect(X(0), Y(1), X(1) - X(0), Y(-1) - Y(1));
        ctx.strokeStyle = "rgba(255,255,255,.25)"; ctx.beginPath(); ctx.moveTo(X(0), h / 2); ctx.lineTo(X(1), h / 2); ctx.stroke();
        const arrow = (x, up) => { ctx.strokeStyle = C.teal; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, Y(-1)); ctx.lineTo(x, Y(1)); ctx.stroke(); const y = up ? Y(1) : Y(-1); ctx.beginPath(); ctx.moveTo(x - 5, y + (up ? 7 : -7)); ctx.lineTo(x, y); ctx.lineTo(x + 5, y + (up ? 7 : -7)); ctx.stroke(); };
        arrow(X(0), true); arrow(X(1), n % 2 === 0);
        ctx.strokeStyle = C.gold; ctx.lineWidth = 2; ctx.beginPath(); for (let i = 0; i <= 200; i++) { const t = i / 200, y = sec(2 * Math.PI * Math.min(t, .99999)); i ? ctx.lineTo(X(t), Y(i === 200 ? wrap() : y)) : ctx.moveTo(X(t), Y(y)); } ctx.stroke();
        v.forEach((y, k) => { ctx.fillStyle = C.gold; ctx.beginPath(); ctx.arc(X(k / K), Y(y), 6, 0, 7); ctx.fill(); });
        ctx.strokeStyle = C.gold; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(X(1), Y(wrap()), 6, 0, 7); ctx.stroke();
        zeros().forEach(t => { ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(X(t), h / 2, 4.5, 0, 7); ctx.fill(); });
        ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("θ = 0", 4, h - 3); ctx.fillText("2π", w - 18, h - 3);
      }
      function drawBand() {
        const { ctx, w, h } = canvas(band, 190), R = 1, Wd = .38, tilt = 1.05, sc = Math.min(w / 3.1, h / 1.9), cx = w / 2, cy = h / 2;
        const pt = (th, u) => { const c = Math.cos(n * th / 2), s = Math.sin(n * th / 2), r = R + u * Wd * c; let x = r * Math.cos(th), y = r * Math.sin(th), z = u * Wd * s;
          const xr = x * Math.cos(spin) - y * Math.sin(spin), yr = x * Math.sin(spin) + y * Math.cos(spin); const y2 = yr * Math.cos(tilt) - z * Math.sin(tilt), z2 = yr * Math.sin(tilt) + z * Math.cos(tilt); return [cx + xr * sc, cy + y2 * sc * .9, z2]; };
        const quads = [], NT = 96, NU = 4;
        for (let i = 0; i < NT; i++) for (let j = 0; j < NU; j++) { const t0 = 2 * Math.PI * i / NT, t1 = 2 * Math.PI * (i + 1) / NT, u0 = -1 + 2 * j / NU, u1 = -1 + 2 * (j + 1) / NU;
          const q = [pt(t0, u0), pt(t1, u0), pt(t1, u1), pt(t0, u1)]; quads.push({ q, z: q.reduce((s, p) => s + p[2], 0) / 4 }); }
        quads.sort((a, b) => a.z - b.z);
        quads.forEach(({ q, z }) => { const l = 30 + 25 * (z + 1.4) / 2.8; ctx.fillStyle = `hsla(175, 55%, ${l}%, .55)`; ctx.beginPath(); q.forEach((p, k) => k ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1])); ctx.closePath(); ctx.fill(); });
        ctx.strokeStyle = "rgba(255,255,255,.35)"; ctx.lineWidth = 1; ctx.beginPath(); for (let i = 0; i <= NT; i++) { const p = pt(2 * Math.PI * i / NT, 0); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
        ctx.strokeStyle = C.gold; ctx.lineWidth = 2.4; ctx.beginPath(); for (let i = 0; i <= 240; i++) { const th = 2 * Math.PI * Math.min(i / 240, .99999), p = pt(th, sec(th)); i ? ctx.lineTo(p[0], p[1]) : ctx.moveTo(p[0], p[1]); } ctx.stroke();
        zeros().forEach(t => { const p = pt(2 * Math.PI * t, 0); ctx.fillStyle = C.red; ctx.beginPath(); ctx.arc(p[0], p[1], 4.5, 0, 7); ctx.fill(); });
      }
      function report() {
        const z = zeros().length;
        out.innerHTML = `${n} half-twist${n === 1 ? "" : "s"}: the band is ${n % 2 ? "twisted (a Möbius band)" : "a cylinder in disguise"}\n` +
          `the section returns as ${n % 2 ? "MINUS" : "plus"} its starting value: ${fx(v[0], 2)} → ${fx(wrap(), 2)}\n` +
          `<span class="${z ? "r" : "t"}">zeros: ${z}</span>` + (n % 2 ? `   <span class="d">an odd twist forces an odd number of clean crossings — at least one.</span>` : z ? `   <span class="d">this band allows a section with no zeros: try the constant one.</span>` : `   <span class="t">a nowhere-zero section: the bundle is trivial.</span>`);
      }
      const redraw = () => { drawStrip(); drawBand(); report(); };
      const pickY = e => { const r = strip.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top; return { k: Math.round((x - S.pad) / (S.w - 2 * S.pad) * K), val: Math.max(-1, Math.min(1, (S.h / 2 - y) / (S.h / 2 - 14))) }; };
      strip.addEventListener("pointerdown", e => { const { k, val } = pickY(e); if (k >= 0 && k < K) { drag = k; v[k] = val; strip.setPointerCapture(e.pointerId); redraw(); } });
      strip.addEventListener("pointermove", e => { if (drag < 0) return; v[drag] = pickY(e).val; redraw(); });
      strip.addEventListener("pointerup", () => { drag = -1; });
      chipGroup(root, ".fb-tw", ds => { n = +ds.n; redraw(); });
      root.querySelector(".fb-flat").addEventListener("click", () => { v = Array(K).fill(.55); redraw(); });
      root.querySelector(".fb-rand").addEventListener("click", () => { v = v.map(() => Math.round((Math.random() * 1.8 - .9) * 100) / 100); redraw(); });
      redraw();
      stop = loop(root, () => { spin += .006; drawBand(); });
      void stop;
    }
  }],
  chapters: [
    { icon: "🏛", title: "1858–1935 — twisted products", who: "Möbius & Listing 1858 · Heinz Hopf 1931 · Herbert Seifert 1933 · Hassler Whitney 1935",
      lead: "Locally a product; globally twisted.",
      formula: "Möbius band = [0, 1] × [−1, 1] / (0, y) ~ (1, −y)",
      what: "A fiber bundle E → B has the same fiber F over every point of the base B, and near each point it looks like (a piece of B) × F. The cylinder is the trivial line bundle over the circle, the Möbius band the twisted one. The tangent planes of a surface fit together into its tangent bundle.",
      how: "The Hopf fibration (1931) writes the 3-sphere as a bundle of circles over the 2-sphere; any two of its circles are linked once, which shows that this map S³ → S² can't be deformed to a constant.",
      story: "Whitney (1935) defined sphere bundles and the first characteristic classes; in his thesis the same year Stiefel found the obstructions to having several independent vector fields on a manifold.",
      today: "Bundles describe a robot arm's configurations, the phase of a quantum wave function and every gauge field of particle physics." },
    { icon: "⚙️", title: "1935–1946 — characteristic classes", who: "Whitney & Eduard Stiefel 1935 · Lev Pontryagin 1942 · Shiing-Shen Chern 1946",
      lead: "Cohomology classes that measure how twisted a bundle is.",
      formula: "w₁(Möbius band) ≠ 0      ∫_S² c₁(T S²) = χ(S²) = 2",
      what: "The first Stiefel–Whitney class w₁ detects orientability: it is nonzero exactly for twisted real line bundles like the Möbius band, and it forces every section to vanish somewhere (the lab). Chern classes do the same for complex bundles; the first Chern class of a surface's tangent bundle integrates to its Euler characteristic — Gauss–Bonnet once more.",
      how: "A characteristic class is natural — it pulls back consistently along maps — so it can be computed once on a universal example (a Grassmannian) and then read off for every bundle.",
      story: "Chern, visiting Weil at the Institute for Advanced Study in the 1940s, gave an intrinsic proof of the Gauss–Bonnet theorem in all dimensions (1944) and then defined Chern classes (1946).",
      today: "Chern numbers are measured in the lab: the quantised Hall conductance of the quantum Hall effect is a first Chern number (Thouless, Kohmoto, Nightingale and den Nijs, 1982)." },
    { icon: "🏛", title: "1950–1975 — connections and gauge fields", who: "Charles Ehresmann 1950 · C. N. Yang & Robert Mills 1954 · T. T. Wu & C. N. Yang 1975",
      lead: "A connection says how to compare neighbouring fibres; its curvature is a force field.",
      formula: "F = dA + A ∧ A      (the curvature of a connection)",
      what: "A connection on a bundle defines parallel transport — how to carry an element of one fiber along a path to another — and its curvature measures the failure to come back unchanged around a loop (the parallel-transport atom). Electromagnetism is a U(1) connection whose curvature is the field strength; Yang and Mills (1954) built physics on SU(2) connections.",
      how: "Wu and Yang (1975) wrote out the dictionary: gauge potential = connection, field strength = curvature, and Dirac's magnetic monopole = a nontrivial U(1) bundle over the sphere whose Chern number is the monopole's charge.",
      story: "Yang recalled telling Chern that it was both thrilling and puzzling that gauge fields were exactly connections on fiber bundles, which mathematicians had developed without reference to the physical world. Chern objected: 'No, no. These concepts were not dreamed up. They were natural and real.'",
      today: "The Standard Model is a Yang–Mills theory with gauge group SU(3) × SU(2) × U(1); proving that Yang–Mills theory has a 'mass gap' is a Millennium Prize problem." },
    { icon: "🔥", title: "1963–today — index theory and topological matter", who: "Michael Atiyah & Isadore Singer 1963 · Simon Donaldson 1983 · Nathan Seiberg & Edward Witten 1994",
      lead: "An analytic count of solutions equals a topological count of twisting.",
      formula: "index(D) = ∫_M ch(σ(D)) · Td(M)",
      what: "The Atiyah–Singer index theorem (1963): the number of independent solutions of an elliptic differential equation, minus those of its adjoint, is given by characteristic classes. Gauss–Bonnet, Riemann–Roch and Hirzebruch's signature theorem are all special cases. Donaldson (1983) used spaces of Yang–Mills instantons to study 4-manifolds; the Seiberg–Witten equations (1994) made those computations far simpler.",
      how: "The index can't change under continuous deformation, so it can be computed in the simplest case and trusted in all the others.",
      story: "Atiyah and Singer shared the Abel Prize in 2004. After Seiberg and Witten's 1994 paper, topologists re-proved years of results within weeks using the new equations.",
      today: "Topological insulators (2005–07) are classified by K-theory and characteristic classes; the 2016 Nobel Prize in Physics honoured topological phases of matter." }
  ],
  challenges: [
    "With one half-twist, try to drag the handles so the curve never touches zero. Where does it fail, and why?",
    "Switch to two half-twists. Find a section with no zeros at all.",
    "With three half-twists, can you make a section with exactly two zeros? With one? With three?"
  ],
  sources: [
    { type: "CLASSIC", title: "Norman Steenrod — The Topology of Fibre Bundles", note: "The book that founded the subject (1951).", url: null },
    { type: "CLASSIC", title: "Milnor & Stasheff — Characteristic Classes", note: "Stiefel–Whitney, Chern and Pontryagin classes.", url: null },
    { type: "TEXTBOOK", title: "Mikio Nakahara — Geometry, Topology and Physics", note: "Bundles and connections for physicists.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Shiing-Shen Chern", note: "Characteristic classes, and institutes on two continents.", url: MT("Chern") }
  ]
});

/* ================================================================ GEOMETRIC GROUP THEORY */
const HEIS = (() => { // ball sizes in the discrete Heisenberg group, generators a, b
  const key = (x, y, z) => x + "," + y + "," + z, seen = new Map([[key(0, 0, 0), [0, 0, 0]]]); let front = [[0, 0, 0]]; const sizes = [1], layers = [[[0, 0, 0]]];
  for (let r = 1; r <= 10; r++) { const nx = [];
    for (const [x, y, z] of front) for (const [a, b, c] of [[x + 1, y, z], [x - 1, y, z], [x, y + 1, z + x], [x, y - 1, z - x]]) { const k = key(a, b, c); if (!seen.has(k)) { seen.set(k, [a, b, c]); nx.push([a, b, c]); } }
    front = nx; layers.push(nx); sizes.push(sizes[r - 1] + nx.length); }
  return { sizes, layers };
})();
const GROUPS = {
  Z: { name: "ℤ", size: n => 2 * n + 1, note: "polynomial, degree 1" },
  Z2: { name: "ℤ²", size: n => 2 * n * n + 2 * n + 1, note: "polynomial, degree 2" },
  H: { name: "Heisenberg H₃(ℤ)", size: n => HEIS.sizes[n], note: "polynomial, degree 4 (Bass–Guivarc'h: 1·2 + 2·1)" },
  F2: { name: "free group F₂", size: n => 2 * Math.pow(3, n) - 1, note: "exponential, rate 3" }
};
register("geometric-group-theory", {
  kicker: "GROUPS AS GEOMETRIC OBJECTS · ABOUT 25 MIN",
  hook: "How fast does a group grow — and why does the answer reveal its algebra?",
  intro: "Geometric group theory treats a finitely generated group as a space. Draw its Cayley graph, with an edge for each generator, and measure distance by word length. From far away the lattice ℤ² looks like the flat plane and the free group like a hyperbolic tree. Gromov showed in the 1980s that this large-scale geometry controls algebra. The lab grows balls in four groups.",
  timeline: [[1878, "Cayley graphs"], [1911, "Dehn's decision problems"], [1955, "Švarc: quasi-isometry"], [1968, "Milnor & Wolf: growth"], [1981, "Gromov: polynomial growth"], [1987, "Gromov: hyperbolic groups"]],
  labs: [{
    kicker: "MILNOR 1968 · GROMOV 1981", title: "Grow a ball in the Cayley graph",
    intro: "The ball of radius n contains every element you can write with at most n generators and their inverses. Pick a group and grow the ball. Polynomial growth looks like nᵈ; exponential growth multiplies by a fixed factor at every step.",
    html: `<div class="gk-chips gg-pre">${Object.entries(GROUPS).map(([k, g], i) => `<button class="gk-chip${i === 1 ? " on" : ""}" data-k="${k}">${g.name}</button>`).join("")}</div>
      <div class="it-control"><label><span>radius n</span><output data-o="n">4</output></label><input type="range" data-i="n" min="1" max="10" value="4"></div>
      <canvas class="gk-canvas gg-cv"></canvas>
      <table class="gk-table gg-tab"></table>
      <div class="gk-out gg-out"></div>`,
    caveat: "Gromov's theorem (1981): a finitely generated group has polynomial growth exactly when it has a nilpotent subgroup of finite index. The Heisenberg picture shows only the shadow (x, y); the hidden third coordinate grows like n², which is why the ball grows like n⁴.",
    init(root) {
      let key = "Z2";
      const nI = root.querySelector("[data-i=n]"), cv = root.querySelector(".gg-cv"), tab = root.querySelector(".gg-tab"), out = root.querySelector(".gg-out");
      function run() {
        const n = +nI.value; root.querySelector("[data-o=n]").textContent = n;
        const { ctx, w, h } = canvas(cv, 240), cx = w / 2, cy = h / 2;
        if (key === "Z" || key === "Z2") {
          const s = Math.min(w, h) / (2 * n + 3); ctx.strokeStyle = "rgba(245,196,81,.5)"; ctx.lineWidth = 1.2;
          for (let x = -n; x <= n; x++) for (let y = key === "Z" ? 0 : -n; y <= (key === "Z" ? 0 : n); y++) { if (Math.abs(x) + Math.abs(y) > n) continue;
            [[1, 0], [0, 1]].forEach(([a, b]) => { if (key === "Z" && b) return; if (Math.abs(x + a) + Math.abs(y + b) <= n) { ctx.beginPath(); ctx.moveTo(cx + x * s, cy - y * s); ctx.lineTo(cx + (x + a) * s, cy - (y + b) * s); ctx.stroke(); } });
            const d = Math.abs(x) + Math.abs(y); ctx.fillStyle = d === n ? C.gold : "rgba(255,255,255,.8)"; ctx.beginPath(); ctx.arc(cx + x * s, cy - y * s, Math.max(1.5, Math.min(4, s / 5)), 0, 7); ctx.fill(); }
        } else if (key === "F2") {
          const m = Math.min(n, 6), L0 = Math.min(w, h) * .23;
          const rec = (x, y, dir, len, depth) => { if (depth > m) return;
            [[1, 0], [0, 1], [-1, 0], [0, -1]].forEach(([a, b]) => { if (dir && a === -dir[0] && b === -dir[1]) return; const X = x + a * len, Y = y + b * len;
              ctx.strokeStyle = `hsla(${45 + depth * 25}, 80%, 64%, ${1 - depth * .1})`; ctx.lineWidth = Math.max(.6, 2.4 - depth * .35); ctx.beginPath(); ctx.moveTo(cx + x, cy - y); ctx.lineTo(cx + X, cy - Y); ctx.stroke(); rec(X, Y, [a, b], len * .48, depth + 1); }); };
          rec(0, 0, null, L0, 1); ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(cx, cy, 3.5, 0, 7); ctx.fill();
          if (n > 6) { ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("drawn to radius 6", 8, h - 8); }
        } else {
          const cnt = new Map(); for (let r = 0; r <= n; r++) for (const [x, y] of HEIS.layers[r]) cnt.set(x + "," + y, (cnt.get(x + "," + y) || 0) + 1);
          const mx = Math.max(...cnt.values()), s = Math.min(w, h) / (2 * n + 3);
          cnt.forEach((c, k) => { const [x, y] = k.split(",").map(Number); ctx.fillStyle = `rgba(245,196,81,${.2 + .8 * c / mx})`; ctx.beginPath(); ctx.arc(cx + x * s, cy - y * s, Math.max(1.8, s * .38), 0, 7); ctx.fill(); });
          ctx.fillStyle = "#9a93b8"; ctx.font = "10px IBM Plex Mono"; ctx.fillText("shadow (x, y); brightness = how many z lie above", 8, h - 8);
        }
        const rows = Array.from({ length: 10 }, (_, i) => i + 1);
        tab.innerHTML = `<tr><th>n</th>${rows.map(r => `<th>${r}</th>`).join("")}</tr>` + Object.entries(GROUPS).map(([k, g]) => `<tr><td class="tl">${g.name}</td>${rows.map(r => `<td class="${k === key && r === n ? "hl" : ""}" style="${k === key ? "color:#fff" : ""}">${g.size(r) > 99999 ? (g.size(r) / 1000).toFixed(0) + "k" : g.size(r)}</td>`).join("")}</tr>`).join("");
        const G = GROUPS[key], b = G.size(n), b2 = n <= 5 ? G.size(2 * n) : null, ratio = G.size(n) / G.size(n - 1);
        out.innerHTML = `${G.name}: |B(${n})| = <span class="g">${b.toLocaleString()}</span>\n` +
          (b2 ? `degree estimate log₂(|B(${2 * n})| / |B(${n})|) = ${fx(Math.log2(b2 / b), 2)}   ` : "") + `growth ratio |B(${n})| / |B(${n - 1})| = ${fx(ratio, 3)}\n<span class="t">${G.note}</span>`;
      }
      chipGroup(root, ".gg-pre", ds => { key = ds.k; run(); });
      nI.addEventListener("input", run); run();
    }
  }],
  chapters: [
    { icon: "🏛", title: "1878–1912 — Cayley graphs and Dehn's problems", who: "Arthur Cayley 1878 · Max Dehn 1911–12",
      lead: "Draw the group, and algebraic questions become questions about paths.",
      formula: "d(g, h) = length of the shortest word in the generators equal to g⁻¹h",
      what: "The Cayley graph (1878) has a vertex for every group element and an edge from g to gs for every generator s; the word metric measures distance in it. Dehn (1911) posed three decision problems — the word, conjugacy and isomorphism problems — and solved the word problem for surface groups using hyperbolic geometry.",
      how: "Dehn's algorithm for a surface group of genus 2 or more keeps shortening a word by replacing more than half of a relator by the inverse of the rest. It works because the Cayley graph looks like the hyperbolic plane.",
      story: "The word problem turned out to be undecidable in general (Novikov 1955, Boone 1959). Dehn fled Nazi Germany in 1940, crossing Siberia and Japan to reach the United States, and ended his career at Black Mountain College.",
      today: "Cayley graphs with strong expansion (Ramanujan graphs, Lubotzky–Phillips–Sarnak 1988) are used to design communication networks and hash functions." },
    { icon: "⚙️", title: "1955–1984 — quasi-isometry and growth", who: "Albert Švarc 1955 · John Milnor 1968 · Joseph Wolf 1968 · Rostislav Grigorchuk 1984",
      lead: "Look at a group from far away and only its coarse geometry remains.",
      formula: "|B(n)| ≈ nᵈ   or   |B(n)| ≈ λⁿ",
      what: "Two spaces are quasi-isometric if some map distorts distances by at most a bounded factor plus a constant: from far away ℤ² and ℝ² are the same. The Švarc–Milnor lemma says a group acting nicely on a space is quasi-isometric to it. Growth — the size of balls, as in the lab — is a quasi-isometry invariant.",
      how: "Milnor (1968) proved that fundamental groups of negatively curved manifolds grow exponentially; Wolf proved that nilpotent groups grow polynomially. Milnor then asked whether anything could grow faster than every polynomial but slower than exponentially.",
      story: "Grigorchuk answered Milnor in 1984 with a group of 'intermediate growth', built from symmetries of an infinite binary tree.",
      today: "Growth and quasi-isometry invariants organise the classification of infinite groups; the Heisenberg group in the lab looks three-dimensional but grows like n⁴." },
    { icon: "🏛", title: "1981 — Gromov's polynomial growth theorem", who: "Mikhail Gromov 1981 · Hyman Bass & Yves Guivarc'h 1972–73 · Bruce Kleiner 2010",
      lead: "Polynomial growth forces a group to be almost nilpotent.",
      formula: "|B(n)| ≤ C nᵈ   ⇔   G has a nilpotent subgroup of finite index",
      what: "Gromov proved that a finitely generated group of polynomial growth is virtually nilpotent. Bass and Guivarc'h had computed the degree for nilpotent groups: d = Σ k · rank(k-th layer of the lower central series). For the Heisenberg group that is 1·2 + 2·1 = 4, the lab's estimate.",
      how: "Gromov rescaled the Cayley graph by 1/n and took a limit — the 'asymptotic cone' — then used the solution of Hilbert's fifth problem to find a Lie group acting on it.",
      story: "Kleiner (2010) gave a new proof with harmonic functions that avoids Hilbert's fifth problem; Shalom and Tao made it quantitative.",
      today: "Rescaling limits (Gromov–Hausdorff convergence) are now standard across geometry, and Breuillard, Green and Tao (2012) classified 'approximate groups' with related ideas." },
    { icon: "🔥", title: "1987–today — hyperbolic groups and beyond", who: "Mikhail Gromov 1987 · Daniel Wise · Ian Agol 2012",
      lead: "Groups whose Cayley graphs have thin triangles behave like negatively curved spaces.",
      formula: "δ-hyperbolic: every side of a geodesic triangle lies within δ of the other two",
      what: "Gromov's essay 'Hyperbolic groups' (1987) defined groups whose Cayley graphs are negatively curved in a coarse sense. Free groups (trees are 0-hyperbolic) and surface groups are examples, and in a precise sense a 'random' group is hyperbolic. Their word problem can be solved in linear time.",
      how: "Hyperbolic groups grow exponentially, have a boundary at infinity (a circle, for surface groups) and many well-behaved subgroups, so the tools of hyperbolic geometry apply directly to algebra.",
      story: "Agol's proof of the virtual Haken and virtual fibering conjectures (2012) — the last of Thurston's great questions about 3-manifolds — rested on Wise's theory of special cube complexes, built inside geometric group theory.",
      today: "The subject now reaches into random walks on groups, automatic groups in computation, and expander graphs." }
  ],
  challenges: [
    "Compare ℤ² and F₂ at radius 6. How many times bigger is the free group's ball?",
    "The Heisenberg shadow looks two-dimensional. Why does its ball grow like n⁴ rather than n²?",
    "From the table, estimate the growth ratio of F₂ for large n. Why is it exactly 3?"
  ],
  sources: [
    { type: "TEXTBOOK", title: "Clara Löh — Geometric Group Theory: An Introduction", note: "Cayley graphs, quasi-isometry, growth and hyperbolic groups (Springer, 2017).", url: null },
    { type: "BOOK", title: "Matt Clay & Dan Margalit (eds.) — Office Hours with a Geometric Group Theorist", note: "Twenty chapters, each an informal conversation (Princeton, 2017).", url: null },
    { type: "TEXTBOOK", title: "Pierre de la Harpe — Topics in Geometric Group Theory", note: "Growth and its history in detail.", url: null },
    { type: "BIOGRAPHY", title: "MacTutor — Max Dehn", note: "Decision problems and a flight across Siberia.", url: MT("Dehn") }
  ]
});
})();
