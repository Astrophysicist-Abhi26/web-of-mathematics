# The Web of Mathematics

An interactive, zoomable map of pure mathematics — built from minimal axioms upward.
Logic → set theory → structures added one layer at a time.

**Live demo:** deploy to GitHub Pages (instructions below), same as
[differential-geometry-lab-v2](https://astrophysicist-abhi26.github.io/differential-geometry-lab-v2/).

## How it works

- **Zoomed out** → 8 domains (Foundations, Algebra, Analysis, Geometry & Topology,
  Number Theory, Discrete, Probability, Order) as glowing clusters.
- **Zoom in** → each cluster resolves into its fields (45 total), with edges.
- **Gold edges (★)** are *signature bridges* — cross-domain connections. Tap an edge
  to read the **mediating concept**, **who built the bridge and when**, and the
  **theory of the bridge** — how the two fields actually connect (Galois correspondence,
  Gauss–Bonnet, Ricci flow ⇒ Poincaré, Kolmogorov's axioms, Stone duality, …).
- **✦ Browse all bridges** (top-right button) opens a scrollable index of all 72
  connections, each labelled with its builder — surf bridge → bridge without hunting
  on the map.
- **Tap a field** → definition, landmark theorems, canonical textbook, connections,
  and its internal topics (L3 — stubs for now, filled in during Part 3).
- **Search** filters fields, theorems, and bridges; Enter jumps to the first hit.

## Growing the map

Everything lives in `data/data.js`. To add a field, append an object to `fields`:

```js
{id:"sheaf-theory", domain:"geometry", label:"Sheaf Theory",
 def:"…", theorems:["…"], book:"…", children:["…"]}
```

To add a bridge, append to `edges`:

```js
{from:"sheaf-theory", to:"logic", type:"sig", via:"Topos semantics",
 who:"F. William Lawvere (1970)",
 story:"The theory of the bridge — how the two fields connect, in 1–3 sentences.",
 note:"Short technical gloss (optional)."}
```

`type` is `"sig"` for a signature (gold) bridge or `"pre"` for a natural prerequisite
flow. `who` and `story` are what render the human story panel.

No other file needs editing. Layout is computed automatically.

## Deploy to GitHub Pages

1. Create a repo (e.g. `math-web`), push these files to `main`.
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Visit `https://<username>.github.io/math-web/`.

## Part 3 status

- **3a — DONE:** topics are a live third zoom level. Keep zooming past the field layer
  and each field node sprouts its topic satellites (211 total). Foundations and
  Geometry & Topology topics (66) carry full definitions; the rest are stubs — turn any
  stub string in `data/data.js` into `{label, def}` and it goes live automatically.
- **3b — first two atoms shipped:**
  - `atoms/structure-ladder.html` — a bare set gains topology → smooth structure →
    metric → angles → orientation & volume, one tap at a time (linked from
    Point-Set Topology and Differential Geometry).
  - `atoms/surfaces.html` — rotating torus, Möbius band, and Klein bottle with
    orientability facts (linked from Low-Dimensional Topology).
- **All 211 topics now carry full definitions** across every one of the 8 domains.
- **Four interactive atoms shipped:**
  - `atoms/structure-ladder.html` — a bare set gains topology → smoothness → metric → angles → volume (linked from Point-Set & Differential Topology).
  - `atoms/surfaces.html` — rotating torus, Möbius band, Klein bottle (linked from Low-Dim Topology).
  - `atoms/hyperbolic-disk.html` — Poincaré disk: geodesics, triangle angle-defect, infinitely many parallels, {7,3} tiling (linked from Classical Geometry).
  - `atoms/parallel-transport.html` — a vector carried around a loop on sphere vs plane; holonomy = enclosed curvature (linked from Differential Geometry).
- **Future waves (optional):** more atoms (ε–δ slider, complex domain-coloring, modular-arithmetic clock, Ulam spiral); deeper L4 "named theorem" cards; MathJax rendering for inline formulas.
- Content follows `math-web-taxonomy.md` (Part 1 document).
