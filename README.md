# The Web of Mathematics

An interactive deep-space map of mathematics — from a Babylonian clay tablet (c. 1800 BCE)
to the proofs of today. Companion to the [Web of Computation](https://github.com/Astrophysicist-Abhi26/web-of-computation),
with the same sky, the same glow and the same controls.
Pure HTML/CSS/JS, no build step, GitHub-Pages ready.

## Deploy

```bash
git add . && git commit -m "Web of Mathematics"
git push origin main
# GitHub → Settings → Pages → Source: main / root
```

Or preview locally: `python3 -m http.server` then open http://localhost:8000

## What's on the map

- **8 domain nebulae** — Foundations, Algebra, Analysis, Geometry & Topology, Number Theory,
  Discrete & Combinatorics, Probability, Order & Universal Algebra. Click one to zoom into its
  **fields**; click a field for its **topics** (discoverer · year · definition), its landmark
  theorems, its canonical textbook and every bridge that touches it.
- **The time scrubber** (bottom): drag from 1800 BCE to 2026 or press ▶. The sky tints by era
  (Ancient World → Medieval Flowering → Renaissance → Age of Calculus → Age of Rigour →
  the ❄ Foundational Crisis of 1901–1931 → the Structural Age → the Modern Frontier), and every
  node ignites at its birth year. The scale is stretched so that 3,800 years fit without
  crushing the last three centuries. Gold dots on the track are load-bearing moments
  (Euclid's Elements, al-jabr, Descartes & Fermat, Newton, Euler's bridges, Gauss, Galois,
  Riemann, Cantor, Gödel, Wiles, Perelman).
- **Number shells** — ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ drawn as nested orbits. Click a shell for the equation
  that forced it into being (x + 5 = 3, 2x = 1, x² = 2, x² = −1) and who built it.
- **Pioneer constellation** (top): portraits of the people who built mathematics, in
  chronological order. Click one for a biography; everyone is in the **▦ pioneer gallery**.
- **Status weather** on every field and topic: 🏛 foundational · 🔥 frontier · ⚙️ workhorse ·
  🪦 closed chapter · 🧟 revived.
- **Gold bridges** between domains, each carrying the field-level bridges it stands for —
  the mediating concept, who built it and when, and the theory of the bridge (Galois
  correspondence, Gauss–Bonnet, Ricci flow ⇒ Poincaré, Kolmogorov's axioms, Stone duality, …).
- **Red lightning** for the great disputes: Newton vs Leibniz, Kronecker vs Cantor,
  Brouwer vs Hilbert, the Axiom of Choice, the four colour computer proof, Bayesians vs
  frequentists, and the abc conjecture. Each sets out both sides and where it stands; you can
  pick a side (saved only in your browser).
- **⌕ search the map** (or press `/`): fields, topics and their long-form text, theorems,
  bridges, disputes and people. With an empty box it lists every bridge, oldest first.

## Crack-open animations (`crack.js`)

Clicking a domain cracks it open into exactly as many pieces as it has fields; clicking a
field cracks it into its topics, which then orbit it (click a topic to jump to its card in
the panel, with its "deeper" drawer open). Five styles — walnut, glass, peel, iris,
supernova — and the **✦ crack style** picker (bottom-left) forces one everywhere.

## Going deeper (`topics-data.js`, `extras.js`)

- **Every topic has a "deeper" drawer**: *the idea · a worked example you can check by hand ·
  why it matters*, plus chips for any pioneer involved. "open all" expands a whole field.
- **Bridges and disputes are full stories** (`EDGE_DETAIL` in `extras.js`).

## Editing (the whole point)

All content lives in data files — no code changes needed:

- **`data.js`** — eras, domains, number shells, gold bridges, disputes, fields and topics, and
  `LINKS` (the field-to-field bridges: `via`, `who`, `story`, `note`).
  - Add a topic: append `{n, y, who, s, d}` to a field's `topics` (and optionally its
    `"fieldId|name"` entry in `topics-data.js`).
  - Add a field: append to `FIELDS.<domain>` — it auto-orbits its domain.
  - Add a bridge: append to `LINKS`; it appears on both fields and inside the gold bridge
    joining their domains.
  - Negative years are BCE. Statuses: `found` 🏛 · `fire` 🔥 · `work` ⚙️ · `obs` 🪦 · `rev` 🧟.
- **`topics-data.js`** — long-form depth for each topic: `i` (idea), `ex` (worked example),
  `n` (why it matters), optional `s` (story) and `src`.
- **`pioneers-data.js`** — the people (see the header comment for the fields).
- **`portraits/`** — drop a photo at `portraits/<id>.jpg` and it appears everywhere
  (see `portraits/README.md`); anyone without one gets a medallion.

## Playable atoms

Open via **⚛ playable atoms** (grouped by domain), or from the gold "⚛ play" buttons inside the
matching fields' panels. 28 atoms; each registers itself with `registerAtom({...})`
(`atoms.js` has the recipe), in one file per continent:

| Domain | Atoms |
|---|---|
| Foundations (`atoms-foundations.js`) | **Hilbert's Hotel & Cantor's diagonal** — one new guest, a bus, infinitely many buses; why ℝ is uncountable · **Truth tables** — type any formula, get tautology / contradiction / satisfiable |
| Algebra (`atoms-algebra.js`) | **Symmetries of a polygon** — the dihedral group with a live Cayley table · **Linear maps** — determinant as area, eigenvectors as fixed directions · **Times-table circles** — multiplication mod n draws cardioids |
| Analysis (`atoms-analysis.js`) | **ε–δ game** · **Riemann vs Lebesgue** (and the Dirichlet function) · **Fourier epicycles** (draw your own) · **Domain colouring** of complex functions · **Brachistochrone race** & tautochrone · **Phase portraits** (pendulum, Van der Pol, Lotka–Volterra, Lorenz) · **Logistic map** (bifurcation + cobweb + Lyapunov) · **Mandelbrot & Julia** (zoom, pick c) |
| Geometry (`atoms/*.html`) | **Poincaré disk** · **Structure ladder** · **Torus · Möbius · Klein** · **Parallel transport** |
| Number Theory (`atoms-number.js`) | **Primes** — Eratosthenes' sieve, Ulam spiral, π(x) vs x/ln x vs Li(x) · **Euclid's algorithm** as squares cut from a rectangle, with Bézout · **Elliptic curve group law** over ℝ and over 𝔽ₚ (Hasse bound) |
| Discrete (`atoms-discrete.js`) | **Königsberg bridges** — walk it yourself, Euler paths · **Ramsey party** — R(3,3) = 6 · **Pascal mod m** — Sierpiński appears · **Partitions** as Young diagrams, distinct = odd |
| Probability (`atoms-probability.js`) | **Chance lab** — Galton board, sums of dice, law of large numbers, Monty Hall · **Random walks** — √t spreading, Pólya · **Buffon's needle** — π from sticks |
| Order (`atoms-foundations.js`) | **Lattices** — divisors (gcd/lcm), subsets, M₃ and N₅, distributivity check |
