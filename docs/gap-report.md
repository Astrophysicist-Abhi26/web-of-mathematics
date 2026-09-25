# Gap report — the atom catalog against the site

Automatic keyword comparison of the 904 catalog atoms (`docs/atom-catalog.md`) with everything on the site: map fields and topics, topic drawers, pioneer biographies, bridge and dispute stories, field guides and playable atoms.

- ✅ **covered** — the atom's name appears verbatim somewhere on the site (where: first place found)
- 🟡 **mentioned** — all of its key words occur together in one passage; probably touched on, worth a human check
- ⬜ **missing** — not found; a candidate for new content

Keyword matching is a first pass, not a verdict: synonyms are missed and passing mentions count. Use it as a to-do list.

## Summary

**286 covered · 156 mentioned · 462 missing** (of 904)

| # | Pillar | ✅ | 🟡 | ⬜ |
|---|---|---|---|---|
| 1 | Foundations — Logic, Sets, Infinity & Computability | 24 | 7 | 26 |
| 2 | Numbers & Number Theory | 42 | 19 | 33 |
| 3 | Algebra | 31 | 16 | 25 |
| 4 | Real Analysis | 29 | 26 | 34 |
| 5 | Complex Analysis | 13 | 3 | 7 |
| 6 | Geometry | 16 | 16 | 67 |
| 7 | Topology | 33 | 10 | 19 |
| 8 | Differential Geometry | 13 | 11 | 19 |
| 9 | Combinatorics | 10 | 9 | 20 |
| 10 | Graph Theory & Networks | 10 | 2 | 17 |
| 11 | Puzzles & Recreational Games | 1 | 1 | 23 |
| 12 | Probability | 11 | 5 | 25 |
| 13 | Statistics — Frequentist & Bayesian | 7 | 5 | 26 |
| 14 | Differential Equations | 8 | 4 | 20 |
| 15 | Dynamical Systems, Chaos & Fractals | 14 | 4 | 17 |
| 16 | Computation — Algorithms & Complexity | 4 | 1 | 15 |
| 17 | Information, Coding & Cryptography | 7 | 4 | 14 |
| 18 | Game Theory & Social Choice | 1 | 2 | 19 |
| 19 | Optimization & Numerical Analysis | 7 | 1 | 12 |
| 20 | Mathematical Physics | 5 | 6 | 5 |
| 21 | Mathematics in the World | 0 | 4 | 19 |

## 1. Foundations — Logic, Sets, Infinity & Computability

24 covered · 7 mentioned · 26 missing


**1.1 Paradoxes of self-reference**

- ✅ ⚡ Liar paradox — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Epimenides paradox
- ✅ ⚡ Russell's paradox (1901) — *map topic/field* (`data.js`)
- ⬜ ⚡ Barber paradox
- ⬜ ⚡ Grelling–Nelson paradox
- ⬜ ⚡ Berry paradox
- ⬜ ⚡ Richard's paradox
- 🟡 ⚡ Curry's paradox — *map topic/field* (`data.js`)
- ⬜ ⚡ Yablo's paradox
- ⬜ ⚡ Unexpected hanging / surprise exam
- ⬜ ⚡ Sorites (heap) paradox

**1.2 Logic & the art of proof**

- 🟡 🔷 Truth tables & Boolean logic — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Vacuous truth
- ⬜ ⚡ Principle of explosion
- ✅ 🏆 √2 is irrational — *map topic/field* (`data.js`)
- 🟡 🏆 Euclid: infinitely many primes — *map topic/field* (`data.js`)
- ⬜ ⚡ "All horses are the same color"
- ⬜ 👾 Fake proofs
- ⬜ 🧩 Mutilated chessboard
- ⬜ 🏆 Pigeonhole principle
- ⬜ 🔷 Proofs without words
- ✅ ⚡ Non-constructive proof — *field guide* (`guides/algebra.js`)
- ⬜ 🧩 Knights and knaves
- ⬜ 🧩 Blue-eyed islanders
- 🟡 📜 Proofs from THE BOOK — *map topic/field* (`data.js`)

**1.3 Sets & infinity**

- ⬜ ⚡ Galileo's paradox (1638)
- ⬜ ⚡ Hilbert's Grand Hotel (1924)
- 🟡 🏆 The rationals are countable — *field guide* (`guides/analysis.js`)
- ✅ 🏆 Cantor's diagonal argument (1891) — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Cantor's theorem — *map topic/field* (`data.js`)
- ✅ 🔷 Ordinals — *map topic/field* (`data.js`)
- ✅ ❓🏆 Continuum hypothesis — *map topic/field* (`data.js`)
- ✅ ⚡ Axiom of choice — *map topic/field* (`data.js`)
- ⬜ ⚡ Infinite hat puzzle
- ⬜ ⚡ Ross–Littlewood vase
- ⬜ ⚡ Thomson's lamp
- ✅ ⚡ Skolem's paradox — *field guide* (`guides/foundations.js`)
- ✅ 🔷 Von Neumann ordinals — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Schröder–Bernstein theorem — *map topic/field* (`data.js`)
- ✅ 🔷 Large cardinals — *topic drawer* (`topics-data.js`)

**1.4 Limits of proof & computation**

- ✅ 🏆 Gödel's incompleteness theorems (1931) — *map topic/field* (`data.js`)
- ✅ 🔷 Gödel numbering — *map topic/field* (`data.js`)
- ✅ 🏆 Halting problem (Turing 1936) — *map topic/field* (`data.js`)
- ✅ 🔷 Turing machine — *map topic/field* (`data.js`)
- ⬜ 🔷 Lambda calculus & the Church–Turing thesis
- 🟡 🏆 Tarski's undefinability of truth — *field guide* (`guides/foundations.js`)
- ✅ 🏆 Hilbert's 10th problem (1970) — *map topic/field* (`data.js`)
- ✅ 🏆 Rice's theorem — *map topic/field* (`data.js`)
- ⬜ 🔷 Busy Beaver
- ✅ 🔷 Chaitin's Ω — *map topic/field* (`data.js`)
- 🟡 🏆 Kolmogorov complexity — *map topic/field* (`data.js`)
- ✅ 👾 Goodstein sequences — *field guide* (`guides/foundations.js`)
- ⬜ 🧩 Hydra game (Kirby–Paris 1982)
- ✅ 🏆 Paris–Harrington theorem (1977) — *map topic/field* (`data.js`)
- ✅ 🔷 Quines — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Curry–Howard correspondence — *map topic/field* (`data.js`)
- ⬜ 👾 Undecidable tilings (Berger 1966)

## 2. Numbers & Number Theory

42 covered · 19 mentioned · 33 missing


**2.1 Number systems — the number shells**

- ✅ 🔷 Peano axioms — *map topic/field* (`data.js`)
- ⬜ 🔷 ℕ → ℤ → ℚ → ℝ → ℂ → ℍ → 𝕆
- ✅ ⚡ 0.999… = 1 — *field guide* (`guides/analysis.js`)
- 🟡 🔷 Dedekind cuts & Cauchy sequences — *map topic/field* (`data.js`)
- ✅ 🔷 Euler's identity — *field guide* (`guides/number.js`)
- ✅ 🔷 Golden ratio φ — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Transcendental numbers — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Almost every number is transcendental
- 🟡 ❓ Normal numbers — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Continued fractions — *map topic/field* (`data.js`)
- ✅ 🔷 Surreal numbers (Conway) — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Hyperreals
- ✅ ⚡ p-adic numbers — *map topic/field* (`data.js`)
- 🟡 🔷 Dual numbers — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Strange bases
- 🟡 🔷 Egyptian fractions — *map topic/field* (`data.js`)

**2.2 Primes**

- 🟡 🔷 Sieve of Eratosthenes — *playable atom* (`atoms-number.js`)
- ✅ 🏆 Fundamental theorem of arithmetic — *map topic/field* (`data.js`)
- ✅ 🏆 Prime number theorem (1896) — *map topic/field* (`data.js`)
- ✅ 🔷 Ulam spiral (1963) — *playable atom* (`atoms-number.js`)
- 🟡 ❓ Twin prime conjecture — *map topic/field* (`data.js`)
- ⬜ ❓ Goldbach's conjecture
- ✅ ❓🏆 Riemann hypothesis — *map topic/field* (`data.js`)
- 🟡 🔷 Mersenne primes & GIMPS — *field guide* (`guides/number.js`)
- 🟡 ❓ Perfect numbers — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Green–Tao theorem (2004) — *map topic/field* (`data.js`)
- ✅ 🏆 Dirichlet's theorem — *map topic/field* (`data.js`)
- ✅ 🏆 Bertrand's postulate — *pioneer bio* (`pioneers-data.js`)
- ⬜ ⚡ Arbitrarily long prime deserts
- ⬜ ⚡ Chebyshev's bias
- ✅ 👾 Carmichael numbers (561) — *map topic/field* (`data.js`)
- 🟡 🏆 PRIMES is in P (AKS 2002) — *map topic/field* (`data.js`)
- ✅ ⚡ Euler's n² + n + 41 — *playable atom* (`atoms-number.js`)
- 🟡 🏆 Wilson's theorem — *topic drawer* (`topics-data.js`)
- ⬜ ❓ Landau's four problems (1912)

**2.3 Divisibility & modular arithmetic**

- ✅ 🔷 Clock arithmetic — *map topic/field* (`data.js`)
- ⬜ 🔷 Divisibility tricks
- ✅ 🏆 Euclidean algorithm — *map topic/field* (`data.js`)
- ⬜ 🧩 Water jug puzzle (Die Hard 3)
- ✅ 🏆 Chinese remainder theorem — *map topic/field* (`data.js`)
- 🟡 🏆 Fermat's little theorem & Euler's theorem — *map topic/field* (`data.js`)
- ✅ 🏆 Quadratic reciprocity — *map topic/field* (`data.js`)
- ⬜ 🏆 Fermat's Christmas theorem
- 🟡 🏆 Lagrange's four-square theorem — *map topic/field* (`data.js`)
- ⬜ 🏆 15 and 290 theorems
- ⬜ 🏆 Gauss's Eureka theorem

**2.4 Diophantine equations**

- ✅ 🔷 Pythagorean triples — *topic drawer* (`topics-data.js`)
- ✅ 🏆📜 Fermat's Last Theorem — *map topic/field* (`data.js`)
- ✅ 🔷 Pell's equation — *map topic/field* (`data.js`)
- ✅ 🔷 1729 — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🧩 Sums of three cubes
- ⬜ 🏆 Catalan's conjecture (2002)
- 🟡 👾 Euler's sum-of-powers conjecture — *map topic/field* (`data.js`)
- ⬜ ❓ Beal conjecture
- ✅ ❓📜 abc conjecture — *bridge/dispute story* (`extras.js`)
- ✅ 🔷 Elliptic curves — *map topic/field* (`data.js`)
- ⬜ ❓ Congruent number problem
- ⬜ ⚡ Failure of the Hasse principle

**2.5 Famous sequences & special numbers**

- ✅ 🔷 Fibonacci numbers — *map topic/field* (`data.js`)
- ✅ 🔷 Pascal's triangle — *map topic/field* (`data.js`)
- ✅ ❓ Collatz (3n+1) — *map topic/field* (`data.js`)
- 🟡 🔷 Look-and-say — *map topic/field* (`data.js`)
- ⬜ 🔷 Recamán's sequence
- ⬜ 🔷 Thue–Morse sequence
- ⬜ 🔷 Kolakoski sequence
- ⬜ 🔷 Kaprekar's 6174
- ✅ 🏆 Partitions (Hardy–Ramanujan) — *map topic/field* (`data.js`)
- ⬜ 🔷 Triangular & figurate numbers
- ⬜ 🔷 Amicable numbers
- ⬜ 🔷 Skewes' number
- 🟡 ⚡ Strong law of small numbers — *topic drawer* (`topics-data.js`)
- ⬜ 👾 Pólya and Mertens conjectures
- ✅ 🔷 OEIS — *field guide* (`guides/discrete.js`)

**2.6 Analytic number theory**

- ✅ 🏆 Basel problem (Euler 1734) — *pioneer bio* (`pioneers-data.js`)
- ✅ 🏆 Euler product — *map topic/field* (`data.js`)
- ⬜ ⚡ 1 + 2 + 3 + … = −1/12
- ⬜ ⚡ The prime reciprocals diverge
- ⬜ ⚡ Kempner series
- ⬜ 🏆 Apéry's theorem (1978)
- ⬜ ⚡ Zeta zeros look like random-matrix eigenvalues
- 🟡 ❓ Gauss circle problem — *topic drawer* (`topics-data.js`)

**2.7 Algebraic number theory & the Langlands web**

- ✅ 🔷 Gaussian integers — *topic drawer* (`topics-data.js`)
- ✅ ⚡ Unique factorization fails — *map topic/field* (`data.js`)
- 🟡 ⚡ e^(π√163) is almost an integer — *map topic/field* (`data.js`)
- ✅ ⚡ Monstrous moonshine — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Modularity theorem — *map topic/field* (`data.js`)
- ✅ 🔷 Modular forms — *map topic/field* (`data.js`)
- ⬜ 🏆 Ostrowski's theorem
- ✅ 🔷 Langlands program — *map topic/field* (`data.js`)

**2.8 Approximation & transcendence**

- ⬜ 🏆 Hurwitz's theorem
- ✅ 🏆 Gelfond–Schneider (Hilbert's 7th problem) — *topic drawer* (`topics-data.js`)
- 🟡 ❓ Is e + π irrational? — *map topic/field* (`data.js`)
- 🟡 🏆 Three-distance theorem — *map topic/field* (`data.js`)
- ✅ 🏆 Weyl equidistribution — *topic drawer* (`topics-data.js`)

## 3. Algebra

31 covered · 16 mentioned · 25 missing


**3.1 Equations & polynomials**

- ⬜ 📜 Completing the square, geometrically
- ⬜ 📜 The cubic formula feud
- ⬜ ⚡ Casus irreducibilis
- ⬜ 🏆 The quintic is unsolvable (Abel–Ruffini)
- ✅ 🏆 Fundamental theorem of algebra — *map topic/field* (`data.js`)
- ⬜ 🔷 Vieta's formulas & Descartes' rule of signs
- ⬜ ⚡ Any finite pattern can continue any way

**3.2 Groups — the mathematics of symmetry**

- ✅ 🔷 Symmetry groups — *map topic/field* (`data.js`)
- ⬜ 🏆 17 wallpaper groups & 7 frieze groups
- 🟡 🏆 230 space groups — *field guide* (`guides/algebra.js`)
- 🟡 🧩 Rubik's Cube group — *field guide* (`guides/algebra.js`)
- 🟡 🧩📜 15 puzzle — *map topic/field* (`data.js`)
- ⬜ ⚡ Socks and shoes
- ✅ 🏆 Lagrange's theorem — *map topic/field* (`data.js`)
- 🟡 🏆 Cayley's theorem — *map topic/field* (`data.js`)
- ✅ 🔷 Cayley graphs — *map topic/field* (`data.js`)
- 🟡 🏆 Burnside's lemma & Pólya counting — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Classification of finite simple groups — *map topic/field* (`data.js`)
- ✅ 🔷 The Monster — *map topic/field* (`data.js`)
- ⬜ 🧩 Lights Out
- ✅ 👾 The word problem — *map topic/field* (`data.js`)
- 🟡 👾 Grigorchuk group — *map topic/field* (`data.js`)
- ⬜ ⚡ Dirac's belt / plate trick

**3.3 Rings, fields & Galois theory**

- ✅ 📜 Galois (1811–1832) — *map topic/field* (`data.js`)
- ⬜ 🏆 Three impossible constructions
- ✅ 🏆 Constructible polygons — *field guide* (`guides/algebra.js`)
- ⬜ 🧩 Origami beats the compass
- 🟡 🔷 Finite fields GF(pⁿ) — *map topic/field* (`data.js`)
- ✅ 🔷📜 Quaternions (1843) — *map topic/field* (`data.js`)
- ⬜ 🏆 Only four normed division algebras
- ⬜ 🔷 The hierarchy of nice rings

**3.4 Linear algebra**

- 🟡 🔷 Matrices as transformations — *topic drawer* (`topics-data.js`)
- 🟡 🔷 Determinant = volume scaling — *map topic/field* (`data.js`)
- ✅ 🔷 Eigenvectors — *map topic/field* (`data.js`)
- ⬜ 🏆 Singular value decomposition
- ✅ 🏆 Cayley–Hamilton theorem — *field guide* (`guides/algebra.js`)
- ✅ 🏆 Spectral theorem — *map topic/field* (`data.js`)
- ✅ 🏆 Rank–nullity theorem — *map topic/field* (`data.js`)
- 🟡 🔷 Fibonacci by matrix powers — *topic drawer* (`topics-data.js`)
- 🟡 🔷 Least squares as projection — *map topic/field* (`data.js`)
- ⬜ ⚡ Gimbal lock
- ⬜ 🏆 Strassen (1969)
- 🟡 ❓ Hadamard conjecture — *map topic/field* (`data.js`)
- ✅ 👾 Hamel basis — *topic drawer* (`topics-data.js`)

**3.5 Representation theory & Lie theory**

- ✅ 🔷 Representations — *map topic/field* (`data.js`)
- ✅ 🔷 Character tables — *topic drawer* (`topics-data.js`)
- ⬜ 🏆 Counting irreducibles
- ✅ 🏆 Hook length formula — *field guide* (`guides/algebra.js`)
- 🟡 🔷 Fourier analysis as representation theory — *map topic/field* (`data.js`)
- ⬜ 🔷 Spherical harmonics
- ✅ 📜 The Eightfold Way — *field guide* (`guides/algebra.js`)
- 🟡 🔷 Lie algebras & root systems — *map topic/field* (`data.js`)
- 🟡 🏆 Dynkin diagrams & ADE — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 E8
- ✅ ⚡ Monstrous moonshine — *topic drawer* (`topics-data.js`)

**3.6 Category theory & abstract structures**

- ✅ 🔷 Objects and arrows — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Yoneda lemma — *map topic/field* (`data.js`)
- ✅ 🔷 Functors & natural transformations — *pioneer bio* (`pioneers-data.js`)
- ⬜ ⚡ "A monad is just a monoid in the category of endofunctors"
- ✅ 🔷 Duality — *map topic/field* (`data.js`)
- ⬜ 📜 Snake lemma on film
- ✅ 🔷 Boolean algebras & lattices — *playable atom* (`atoms-foundations.js`)

**3.7 Algebraic geometry**

- ✅ 🔷 Conics — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Bézout's theorem — *map topic/field* (`data.js`)
- 🟡 🏆 Pascal's hexagon theorem — *field guide* (`guides/geometry.js`)
- ⬜ 🔷 27 lines on a cubic surface
- ⬜ 📜 3264 conics
- ✅ ⚡ Mirror symmetry — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Hilbert's Nullstellensatz — *map topic/field* (`data.js`)
- ✅ 🏆 Weil conjectures (Deligne 1974) — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Tropical geometry
- ✅ 📜 Grothendieck's schemes — *map topic/field* (`data.js`)

## 4. Real Analysis

29 covered · 26 mentioned · 34 missing


**4.1 Limits & sequences**

- ⬜ ⚡ Zeno's paradoxes
- 🟡 🔷 ε–δ as a game — *map topic/field* (`data.js`)
- ✅ 🏆 Completeness of ℝ — *map topic/field* (`data.js`)
- ✅ 🏆 Bolzano–Weierstrass — *map topic/field* (`data.js`)
- 🟡 🔷 e from compound interest — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🏆 Stirling's formula
- 🟡 🔷 Infinite products for π — *map topic/field* (`data.js`)
- 🟡 🔷 Madhava–Leibniz series — *pioneer bio* (`pioneers-data.js`)

**4.2 Series**

- 🟡 🏆 The harmonic series diverges — *topic drawer* (`topics-data.js`)
- ⬜ 🧩 Book-stacking overhang
- ⬜ ⚡ Ant on a rubber rope
- ✅ 🔷 Geometric series — *map topic/field* (`data.js`)
- ⬜ ⚡ Grandi's series
- ✅ ⚡ Riemann rearrangement theorem — *topic drawer* (`topics-data.js`)
- 🟡 ⚡ Alternating harmonic series = ln 2 — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Taylor series — *topic drawer* (`topics-data.js`)
- 🟡 ⚡ Why 1/(1+x²) converges only for |x| < 1 — *topic drawer* (`topics-data.js`)
- 🟡 🔷 Summation methods — *topic drawer* (`topics-data.js`)
- ✅ 📜 Bernoulli numbers — *pioneer bio* (`pioneers-data.js`)

**4.3 Continuity, derivatives & the monster zoo**

- ✅ 🏆 Intermediate value theorem — *topic drawer* (`topics-data.js`)
- ⬜ 🧩 Wobbly table theorem
- ✅ 🏆 Mean value theorem — *map topic/field* (`data.js`)
- ⬜ 📜 L'Hôpital's rule
- 🟡 👾 Weierstrass function (1872) — *map topic/field* (`data.js`)
- ⬜ 👾 Blancmange (Takagi) function
- ✅ 👾 Dirichlet function — *topic drawer* (`topics-data.js`)
- ⬜ 👾 Thomae's popcorn function
- 🟡 ⚡ No function is continuous at exactly the rationals — *topic drawer* (`topics-data.js`)
- ⬜ 👾 Devil's staircase (Cantor function)
- ⬜ 👾 Conway's base-13 function
- ⬜ 👾 Minkowski's question-mark function
- ⬜ 👾 e^(−1/x²)
- 🟡 👾 x² sin(1/x) — *map topic/field* (`data.js`)
- 🟡 ⚡ Most continuous functions are nowhere differentiable — *field guide* (`guides/analysis.js`)
- 🟡 👾 Peano & Hilbert curves — *bridge/dispute story* (`extras.js`)
- ⬜ 👾 Osgood curve
- 🟡 👾 Cauchy's functional equation — *topic drawer* (`topics-data.js`)

**4.4 Integration & measure**

- 🟡 📜 Archimedes' method — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🏆 Cavalieri's principle
- ⬜ ⚡ Napkin ring problem
- ⬜ ⚡ Gabriel's horn
- 🟡 🔷 Gaussian integral — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Feynman's trick
- ⬜ ⚡ Sophomore's dream
- ⬜ ⚡ Borwein integrals
- ✅ 🏆 No elementary antiderivative — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Pappus's centroid theorem
- ✅ 🔷 Lebesgue integral — *map topic/field* (`data.js`)
- ✅ 👾 Cantor set — *map topic/field* (`data.js`)
- ✅ 👾 Fat Cantor set — *field guide* (`guides/analysis.js`)
- 🟡 👾 Vitali set — *topic drawer* (`topics-data.js`)
- ✅ ⚡ Banach–Tarski paradox (1924) — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Tarski's circle-squaring
- 🟡 👾 Volterra's function — *field guide* (`guides/analysis.js`)

**4.5 Multivariable & vector calculus**

- ⬜ 🔷 Gradient, divergence, curl
- ⬜ 🏆 Generalized Stokes' theorem
- ⬜ 🔷 Planimeter
- ⬜ 🔷 Saddles & monkey saddles
- ✅ 🔷 Lagrange multipliers — *map topic/field* (`data.js`)
- ⬜ 👾 Unequal mixed partials
- ⬜ 👾 Directional but discontinuous

**4.6 Fourier & harmonic analysis**

- ✅ 🔷 Fourier series — *map topic/field* (`data.js`)
- ✅ 👾 Gibbs phenomenon — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Uncertainty principle — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Fast Fourier Transform (1965) — *field guide* (`guides/analysis.js`)
- 🟡 🏆 Sampling theorem — *map topic/field* (`data.js`)
- 🟡 🔷 JPEG & MP3 — *field guide* (`guides/analysis.js`)
- ✅ 🔷 Wavelets — *topic drawer* (`topics-data.js`)
- ⬜ 👾 Kolmogorov's divergent series (1923)
- ✅ 🏆 Carleson's theorem (1966) — *map topic/field* (`data.js`)
- ⬜ ⚡ Kakeya needle problem
- ⬜ 🏆 Poisson summation

**4.7 Functional analysis**

- ✅ 🔷 Hilbert space — *map topic/field* (`data.js`)
- ⬜ ⚡ The unit ball isn't compact
- ✅ 🏆 Banach fixed-point theorem — *map topic/field* (`data.js`)
- ✅ 🏆 Weierstrass approximation — *topic drawer* (`topics-data.js`)
- 🟡 🏆 Hahn–Banach, open mapping, uniform boundedness — *map topic/field* (`data.js`)
- ✅ 🔷 Dirac delta — *topic drawer* (`topics-data.js`)
- 🟡 📜 Mazur's goose — *field guide* (`guides/analysis.js`)
- 🟡 ❓ Invariant subspace problem — *topic drawer* (`topics-data.js`)

**4.8 Calculus of variations**

- ✅ 📜 Brachistochrone (1696) — *map topic/field* (`data.js`)
- ✅ 🔷 Tautochrone — *playable atom* (`atoms-analysis.js`)
- ⬜ 🔷 Catenary
- 🟡 🏆 Dido's isoperimetric problem — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Euler–Lagrange equation — *map topic/field* (`data.js`)
- ✅ 🔷 Fermat's least time — *field guide* (`guides/analysis.js`)
- 🟡 🔷 Soap films & Plateau's problem — *field guide* (`guides/analysis.js`)
- ⬜ 🏆 Double bubble theorem (2000)
- 🟡 🔷 Kelvin's problem — *field guide* (`guides/analysis.js`)

## 5. Complex Analysis

13 covered · 3 mentioned · 7 missing

- ⬜ 🔷 Multiplying by i = rotating 90°
- ✅ 🏆 Euler's formula — *map topic/field* (`data.js`)
- 🟡 ⚡ i^i is real — *map topic/field* (`data.js`)
- ✅ 🔷 Roots of unity — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Domain coloring
- 🟡 🔷 Holomorphic = conformal — *map topic/field* (`data.js`)
- ✅ 🏆 Cauchy's integral formula — *map topic/field* (`data.js`)
- ✅ 🏆 Liouville's theorem — *map topic/field* (`data.js`)
- ✅ ⚡ Analytic continuation — *map topic/field* (`data.js`)
- ✅ 🏆 Residue theorem — *map topic/field* (`data.js`)
- 🟡 🏆 Argument principle & Rouché's theorem — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Riemann sphere — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Möbius transformations — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Riemann mapping theorem — *map topic/field* (`data.js`)
- ✅ 🔷 Riemann surfaces — *map topic/field* (`data.js`)
- ⬜ ⚡ Picard's great theorem
- ✅ 🏆 Maximum modulus principle — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Gamma function — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Joukowski airfoil
- ⬜ 📜 Escher's Print Gallery
- ✅ 🔷 Elliptic functions — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🏆 Bieberbach conjecture (de Branges 1984)
- ⬜ ⚡ Hartogs' phenomenon

## 6. Geometry

16 covered · 16 mentioned · 67 missing


**6.1 Euclidean plane geometry**

- ✅ 📜 Euclid's Elements — *map topic/field* (`data.js`)
- 🟡 🏆 Pythagorean theorem — *topic drawer* (`topics-data.js`)
- ⬜ 🏆 Thales' theorem
- ⬜ 🔷 Triangle centers & the Euler line
- ⬜ 🏆 Nine-point circle
- ⬜ 🏆 Morley's trisector theorem (1899)
- 🟡 🏆 Napoleon's theorem — *pioneer bio* (`pioneers-data.js`)
- 🟡 🏆 Ptolemy's theorem — *field guide* (`guides/geometry.js`)
- ⬜ 🔷 Heron's & Brahmagupta's formulas
- 🟡 🏆 Pick's theorem — *map topic/field* (`data.js`)
- 🟡 🏆 Butterfly theorem — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Apollonius' problem
- 🟡 🏆 Descartes' circle theorem — *field guide* (`guides/geometry.js`)
- ⬜ 🔷 Apollonian gasket
- ⬜ 🏆 Poncelet's porism
- 🟡 🔷 Circle inversion — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Arbelos
- ⬜ 🏆 Viviani's theorem
- 🟡 🔷 Fermat point — *map topic/field* (`data.js`)
- ⬜ 🏆 Mohr–Mascheroni theorem
- ⬜ 👾 Malfatti circles
- ⬜ 🧩 Langley's adventitious angles
- ⬜ 🔷 Lune of Hippocrates
- ⬜ 🏆 Wallace–Bolyai–Gerwien theorem
- ⬜ 🧩 Dudeney's hinged dissection (1907)
- 🟡 🔷 Squared squares — *map topic/field* (`data.js`)
- ⬜ ⚡ Missing square puzzle
- 🟡 🔷 Archimedes and π — *pioneer bio* (`pioneers-data.js`)
- ⬜ 📜 Golden-ratio myths

**6.2 Solids, polyhedra & higher dimensions**

- ✅ 🔷 Platonic solids — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Archimedean (13), Catalan and Johnson (92) solids
- ⬜ 🔷 Kepler–Poinsot polyhedra
- ✅ 🏆 Euler's formula V − E + F = 2 — *map topic/field* (`data.js`)
- ⬜ 🏆 Descartes' angle defect
- ⬜ 🔷 The six regular 4D polytopes
- ⬜ 🔷 Tesseract
- ⬜ 📜 Flatland (1884)
- ⬜ ⚡ High-dimensional balls
- ⬜ ⚡ Spheres poking out of boxes
- ⬜ ⚡ Prince Rupert's cube
- ⬜ 🏆 Rigid vs flexible polyhedra
- ⬜ 🏆 Hilbert's 3rd problem (Dehn 1900)
- ⬜ ❓ Dürer's unfolding problem
- ✅ 🏆 Kepler conjecture — *map topic/field* (`data.js`)
- ✅ 🏆 Viazovska (2016) — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Kissing numbers
- ⬜ 🏆 Honeycomb conjecture (Hales 1999)
- ⬜ 🔷 Space-filling solids
- ⬜ 🔷 Gömböc (2006)
- ⬜ 🔷 Reuleaux triangle
- ⬜ 🏆 Barbier & Blaschke–Lebesgue
- ⬜ 🔷 Sphericon & oloid
- ⬜ 🔷 Buckyball
- ⬜ 🔷 Szilassi & Császár polyhedra

**6.3 Non-Euclidean geometry**

- ⬜ 📜 The parallel postulate saga
- ✅ 🔷 Hyperbolic plane — *map topic/field* (`data.js`)
- ✅ 🔷 Models of the hyperbolic plane — *field guide* (`guides/geometry.js`)
- ⬜ 🔷 Escher's Circle Limit
- ⬜ 🔷 Crocheted hyperbolic planes
- 🟡 🏆 Spherical excess (Girard) — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Great-circle routes — *topic drawer* (`topics-data.js`)
- 🟡 ⚡ Map projections — *map topic/field* (`data.js`)
- ⬜ 🔷 Pseudosphere
- ✅ 🏆 Hilbert's theorem (1901) — *topic drawer* (`topics-data.js`)
- 🟡 🔷 Taxicab geometry — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Klein's Erlangen program (1872) — *map topic/field* (`data.js`)
- ⬜ 🔷 Ideal triangles
- ⬜ 🧩 HyperRogue

**6.4 Projective geometry**

- ✅ 📜 Perspective drawing — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Points at infinity — *map topic/field* (`data.js`)
- 🟡 🏆 Desargues' & Pappus's theorems — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Duality — *map topic/field* (`data.js`)
- ⬜ 🔷 Fano plane
- ⬜ 🧩 Dobble / Spot It!
- ✅ 🔷 Cross-ratio — *topic drawer* (`topics-data.js`)
- 🟡 ⚡ All conics are one — *topic drawer* (`topics-data.js`)
- ⬜ 🏆 No projective plane of order 10 (Lam 1989)

**6.5 Tilings & discrete geometry**

- ⬜ 🔷 Regular & Archimedean tilings
- ⬜ 📜 The 15 pentagon tilings
- ⬜ 🔷 Penrose tilings
- ⬜ 🔷📜 The hat & the spectre (2023)
- ⬜ 👾 Wang tiles
- ⬜ 🔷 Rep-tiles
- ⬜ 🏆 Sylvester–Gallai theorem
- ✅ 📜 Happy ending problem — *pioneer bio* (`pioneers-data.js`)
- ⬜ ❓ Chromatic number of the plane
- ⬜ 🏆 Art gallery theorem
- ⬜ 👾 Unilluminable rooms
- ⬜ 🧩 Moving sofa problem
- ⬜ 🔷 Circle & square packings
- 🟡 🏆 Minkowski's theorem — *map topic/field* (`data.js`)
- ⬜ 🏆 Helly, Radon & Carathéodory
- ⬜ 👾 Borsuk's conjecture
- ✅ 🏆 Keller's conjecture — *field guide* (`guides/order.js`)
- ⬜ 🔷 Voronoi diagrams
- ⬜ 🏆 Fold-and-cut theorem
- ⬜ 🔷 Origami axioms & the Miura fold
- ⬜ ⚡ The paper-folding limit
- ⬜ 🏆 Erdős distinct distances (Guth–Katz 2010)

## 7. Topology

33 covered · 10 mentioned · 19 missing


**7.1 Rubber-sheet intuition & surfaces**

- ⬜ ⚡ Coffee mug = donut
- ⬜ 🧩 Topology of the alphabet
- 🟡 🔷 Möbius strip — *field guide* (`guides/geometry.js`)
- ✅ 🔷 Klein bottle — *map topic/field* (`data.js`)
- ✅ 🔷 Projective plane — *map topic/field* (`data.js`)
- ✅ 🔷 Torus — *map topic/field* (`data.js`)
- ✅ 🏆 Classification of surfaces — *map topic/field* (`data.js`)
- ✅ 🏆 Euler characteristic — *map topic/field* (`data.js`)
- 🟡 📜 Seven Bridges of Königsberg (1736) — *map topic/field* (`data.js`)
- ✅ ⚡ Jordan curve theorem — *topic drawer* (`topics-data.js`)
- ⬜ 👾 Alexander horned sphere (1924)
- ⬜ ⚡ Sphere eversion
- ⬜ 🧩 Vest-without-jacket trick
- ✅ 🔷 Borromean rings — *playable atom* (`atoms-knots.js`)

**7.2 Fixed points & existence theorems**

- ✅ 🏆 Brouwer fixed-point theorem — *map topic/field* (`data.js`)
- ✅ 🏆 Hairy ball theorem — *topic drawer* (`topics-data.js`)
- ⬜ 🏆 Borsuk–Ulam theorem
- ⬜ 🏆 Ham sandwich theorem
- ⬜ 🧩 Necklace splitting
- 🟡 🏆 Poincaré–Hopf theorem — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Lefschetz fixed-point theorem — *field guide* (`guides/geometry.js`)
- ⬜ ❓ Inscribed square problem (1911)

**7.3 Point-set topology & its monsters**

- ✅ 🔷 Open sets — *map topic/field* (`data.js`)
- ✅ 👾 Topologist's sine curve — *topic drawer* (`topics-data.js`)
- ⬜ 👾 Lakes of Wada
- ⬜ 👾 Hawaiian earring
- ⬜ 👾 Long line & Warsaw circle
- ⬜ ⚡ Ultrametric worlds
- ✅ 🔷 Compactness — *map topic/field* (`data.js`)
- ✅ 🏆 Invariance of dimension (Brouwer) — *pioneer bio* (`pioneers-data.js`)
- ✅ 🏆 Tychonoff's theorem — *map topic/field* (`data.js`)

**7.4 Algebraic topology**

- ✅ 🔷 Fundamental group — *map topic/field* (`data.js`)
- ⬜ ⚡ Dirac's belt trick
- 🟡 🔷 Homology & Betti numbers — *map topic/field* (`data.js`)
- ✅ 🔷 Hopf fibration — *topic drawer* (`topics-data.js`)
- ✅ ⚡ Homotopy groups of spheres — *pioneer bio* (`pioneers-data.js`)
- ✅ 🔷 Covering spaces — *map topic/field* (`data.js`)
- ✅ 🔷 Persistent homology — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Homotopy type theory — *map topic/field* (`data.js`)

**7.5 Manifolds & low dimensions**

- ✅ 🔷 Manifolds — *map topic/field* (`data.js`)
- ✅ 🏆📜 Poincaré conjecture — *map topic/field* (`data.js`)
- ✅ 🏆 Thurston's geometrization — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Poincaré dodecahedral space
- ✅ ⚡ Exotic spheres — *field guide* (`guides/geometry.js`)
- ✅ ⚡ Exotic ℝ ⁴ — *topic drawer* (`topics-data.js`)
- 🟡 ❓ Smooth 4D Poincaré conjecture — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Mostow rigidity — *topic drawer* (`topics-data.js`)

**7.6 Knot theory**

- 🟡 🔷 Unknot, trefoil, figure-eight — *field guide* (`guides/geometry.js`)
- ✅ 🔷 Reidemeister moves — *map topic/field* (`data.js`)
- ✅ 🧩 Tricolorability — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Knot invariants — *map topic/field* (`data.js`)
- 🟡 📜 Kelvin's vortex atoms — *field guide* (`guides/geometry.js`)
- ✅ 📜 Perko pair (1974) — *field guide* (`guides/geometry.js`)
- 🟡 📜 Conway knot — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Seifert surfaces
- ⬜ ⚡ Every knot unties in 4D
- ✅ 🔷 Braid groups — *field guide* (`guides/geometry.js`)
- ✅ 🔷 Linking number — *playable atom* (`atoms-knots.js`)
- 🟡 🔷 DNA knots — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Why earbuds tangle
- ⬜ 🏆 Unknot recognition
- 🟡 🏆 Fáry–Milnor theorem — *topic drawer* (`topics-data.js`)

## 8. Differential Geometry

13 covered · 11 mentioned · 19 missing


**8.1 Curves**

- ✅ 🔷 Curvature — *map topic/field* (`data.js`)
- 🟡 🔷 Frenet frame & torsion — *map topic/field* (`data.js`)
- 🟡 🔷 Euler spiral (clothoid) — *map topic/field* (`data.js`)
- 🟡 🏆 Four vertex theorem — *map topic/field* (`data.js`)
- ⬜ 🔷 Cycloid, involutes & evolutes
- ✅ 🔷 Logarithmic spiral — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Tractrix
- ⬜ 🧩 Which way did the bicycle go?
- ⬜ 🏆 Whitney–Graustein theorem
- ⬜ 🏆 Curve-shortening flow
- ⬜ 🔷 Bézier curves & splines

**8.2 Surfaces**

- ✅ 🔷 Gaussian curvature — *field guide* (`guides/geometry.js`)
- ✅ 🏆 Theorema Egregium (1827) — *map topic/field* (`data.js`)
- ✅ 🏆 Gauss–Bonnet theorem — *field guide* (`guides/geometry.js`)
- ✅ 🔷 Geodesics — *map topic/field* (`data.js`)
- ⬜ 🧩 The spider and the fly (Dudeney)
- ✅ 🔷 Minimal surfaces — *topic drawer* (`topics-data.js`)
- ⬜ 📜 Costa's surface (1982)
- ⬜ 🔷 Gyroid
- ⬜ 👾 Wente torus (1986)
- ⬜ 🏆 Willmore conjecture
- ⬜ 🔷 Ruled & developable surfaces
- ⬜ 🔷 Crumpled flat torus

**8.3 Riemannian geometry, Lie groups & connections**

- 🟡 🔷 Manifolds & atlases — *map topic/field* (`data.js`)
- 🟡 🔷 Parallel transport & holonomy — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Foucault pendulum
- ⬜ 🔷 Falling cat problem
- ⬜ 🔷 Parallel parking
- ✅ 🏆 Ricci flow — *map topic/field* (`data.js`)
- 🟡 🏆 Uniformization theorem — *topic drawer* (`topics-data.js`)
- 🟡 🏆 Nash embedding theorem — *pioneer bio* (`pioneers-data.js`)
- ✅ 🏆 Atiyah–Singer index theorem — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Lie groups — *map topic/field* (`data.js`)
- 🟡 🔷 Fiber bundles & gauge theory — *map topic/field* (`data.js`)
- ✅ 🔷 Calabi–Yau manifolds — *topic drawer* (`topics-data.js`)
- ✅ ⚡ Symplectic camel — *topic drawer* (`topics-data.js`)
- 🟡 🏆 Sphere theorem — *map topic/field* (`data.js`)

**8.4 Spacetime geometry**

- ⬜ 🔷 Minkowski spacetime
- 🟡 ⚡ Twin paradox — *topic drawer* (`topics-data.js`)
- ✅ 🔷 General relativity — *topic drawer* (`topics-data.js`)
- 🟡 🔷 GPS — *field guide* (`guides/geometry.js`)
- ⬜ 🔷 Black holes, wormholes & Penrose diagrams
- ⬜ 🏆 Penrose singularity theorem (1965)

## 9. Combinatorics

10 covered · 9 mentioned · 20 missing


**9.1 Counting**

- ⬜ 🔷 Permutations, combinations, stars and bars
- 🟡 ⚡ 52! orderings — *topic drawer* (`topics-data.js`)
- ⬜ 🏆 Seven riffle shuffles suffice (1992)
- ⬜ 🔷 Perfect (faro) shuffles
- ⬜ ⚡ Derangements
- ✅ 🔷 Catalan numbers — *map topic/field* (`data.js`)
- ⬜ 🔷 Stirling & Bell numbers
- 🟡 🏆 Euler's partition theorem — *map topic/field* (`data.js`)
- ✅ 🔷 Generating functions — *map topic/field* (`data.js`)
- ✅ 🏆 Cayley's formula — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Domino tilings
- ⬜ ⚡ Arctic circle theorem
- ⬜ 🔷 de Bruijn sequences
- ⬜ 🔷 Gray codes
- ⬜ 🔷 Young tableaux & RSK
- ⬜ 🏆 Sperner's lemma
- ⬜ 🔷 Polyominoes

**9.2 Designs & Latin squares**

- ✅ 🔷 Sudoku — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Magic squares
- ⬜ ❓ 3×3 magic square of squares
- ⬜ 📜 Euler's 36 officers
- ⬜ 🧩 Kirkman's schoolgirls (1850)
- ⬜ 🔷 Steiner system S(5,8,24)
- ⬜ 🏆 Existence of designs (Keevash 2014)

**9.3 Ramsey theory & additive combinatorics**

- ✅ 🏆 Ramsey's theorem — *map topic/field* (`data.js`)
- 🟡 🧩 Party problem — *field guide* (`guides/discrete.js`)
- 🟡 📜 Erdős's aliens — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Van der Waerden's theorem — *map topic/field* (`data.js`)
- 🟡 🏆 Schur's theorem — *map topic/field* (`data.js`)
- ✅ 🧩 Boolean Pythagorean triples (2016) — *field guide* (`guides/order.js`)
- 🟡 🏆 Hales–Jewett theorem — *topic drawer* (`topics-data.js`)
- 🟡 🔷 Graham's number — *map topic/field* (`data.js`)
- ✅ 🔷 TREE(3) — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Szemerédi's theorem — *map topic/field* (`data.js`)
- 🟡 🧩 Cap sets & SET — *field guide* (`guides/discrete.js`)
- ✅ 🏆 Erdős discrepancy problem (Tao 2015) — *pioneer bio* (`pioneers-data.js`)
- 🟡 ❓ Erdős progressions conjecture — *topic drawer* (`topics-data.js`)
- ⬜ 🏆 Sensitivity conjecture (Huang 2019)
- ⬜ ❓ Frankl's union-closed sets conjecture

## 10. Graph Theory & Networks

10 covered · 2 mentioned · 17 missing

- 🟡 📜 Seven Bridges of Königsberg (1736) — *map topic/field* (`data.js`)
- ⬜ 🏆 Handshake lemma
- ⬜ 🧩 Icosian game & knight's tour
- ✅ 🏆📜 Four color theorem — *map topic/field* (`data.js`)
- ⬜ 🏆 Seven colors on a torus
- ⬜ 🧩 Three utilities problem
- ✅ 🏆 Kuratowski's theorem — *map topic/field* (`data.js`)
- ⬜ 🔷 Petersen graph
- ⬜ 🏆 Friendship theorem
- ⬜ ⚡ Friendship paradox
- ⬜ 🔷 Six degrees & small worlds
- ⬜ 🔷 Scale-free networks
- ⬜ ⚡ Random-graph phase transition
- ✅ 🔷 Shortest paths — *map topic/field* (`data.js`)
- ⬜ 🔷 Minimum spanning trees
- ✅ 🏆 Max-flow min-cut — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Hall's marriage theorem — *map topic/field* (`data.js`)
- ✅ 🏆 Stable marriage (Gale–Shapley 1962) — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Graph coloring — *topic drawer* (`topics-data.js`)
- 🟡 🏆 Mantel & Turán — *map topic/field* (`data.js`)
- ✅ 🏆 Matrix-tree theorem — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Expander graphs — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Graph minor theorem — *bridge/dispute story* (`extras.js`)
- ⬜ 🏆 Graph isomorphism in quasi-polynomial time (Babai 2015)
- ⬜ 🏆 Kneser graphs (Lovász 1978)
- ⬜ 📜 Turán's brick factory
- ⬜ ❓ Reconstruction conjecture
- ⬜ ❓ Graceful tree & Hadwiger conjectures
- ⬜ ⚡ Braess's paradox

## 11. Puzzles & Recreational Games

1 covered · 1 mentioned · 23 missing

- ⬜ 🧩 Nim
- ⬜ 🧩 Chomp
- ⬜ 🧩 Hex
- ⬜ 🧩 Tic-tac-toe
- ⬜ 🧩 Solved games
- ✅ 🧩 Chess — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🧩 Wheat and chessboard
- ⬜ 🧩 Go
- 🟡 🔷 Conway's surreal games — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🧩 Dots and boxes
- ⬜ ⚡ Conway's soldiers
- ⬜ 🧩 Peg solitaire
- ⬜ 🧩 Tower of Hanoi
- ⬜ 🧩 Josephus problem
- ⬜ ⚡ 100 prisoners and 100 drawers
- ⬜ 🧩 100 prisoners and a light bulb
- ⬜ 🧩 Hat puzzles
- ⬜ 🧩 12 coins, 3 weighings
- ⬜ 🧩 River crossings
- ⬜ 🧩 Pirate game
- ⬜ 🧩 Kruskal count
- ⬜ 🧩 Fitch Cheney's five-card trick
- ⬜ 🧩 Gilbreath principle
- ⬜ ⚡ Games are hard
- ⬜ 📜 The puzzle masters

## 12. Probability

11 covered · 5 mentioned · 25 missing

- ✅ 📜 Pascal–Fermat letters (1654) — *field guide* (`guides/probability.js`)
- ⬜ ⚡ Birthday paradox
- ⬜ ⚡📜 Monty Hall problem
- ⬜ ⚡ Boy-or-girl & the Tuesday boy
- ⬜ ⚡ Bertrand's box & the three prisoners
- ⬜ ⚡ Bertrand's chord paradox
- ⬜ ⚡ Sleeping Beauty problem
- 🟡 ⚡ St. Petersburg paradox — *pioneer bio* (`pioneers-data.js`)
- ⬜ ⚡ Two envelopes
- ⬜ ⚡ Gambler's fallacy vs the law of large numbers
- ✅ 🏆 Central limit theorem — *map topic/field* (`data.js`)
- ⬜ 🏆 Pólya's random walk (1921)
- 🟡 🔷 Poisson distribution — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Buffon's needle — *map topic/field* (`data.js`)
- 🟡 🔷 Monte Carlo methods — *bridge/dispute story* (`extras.js`)
- ⬜ 🔷 Coupon collector
- ⬜ 🏆 Secretary problem
- ⬜ ⚡ Random numbers past 1
- ⬜ ⚡ Broken stick
- ⬜ ⚡ Penney's game
- ⬜ ⚡ Nontransitive dice
- ⬜ ⚡ Parrondo's paradox
- ✅ ⚡ Benford's law — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Inspection paradox
- ✅ 🏆 Bayes' theorem — *map topic/field* (`data.js`)
- ⬜ 📜 Prosecutor's fallacy
- ⬜ ⚡ Borel–Kolmogorov paradox
- 🟡 🔷 Infinite monkey theorem — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Kolmogorov's axioms (1933) — *map topic/field* (`data.js`)
- ✅ 🔷 Markov chains — *map topic/field* (`data.js`)
- ✅ 🔷 Brownian motion — *map topic/field* (`data.js`)
- ✅ 🔷 Martingales — *map topic/field* (`data.js`)
- ⬜ 🔷 Percolation
- 🟡 🔷 SLE — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Random matrices — *map topic/field* (`data.js`)
- ✅ 🏆 Probabilistic method — *map topic/field* (`data.js`)
- ⬜ 🔷 Branching processes
- ⬜ 🔷 Pólya's urn
- ⬜ 📜 Gaussian correlation inequality (2014)
- ⬜ 🔷 Von Neumann's fair coin
- ⬜ 🔷 Kelly criterion

## 13. Statistics — Frequentist & Bayesian

7 covered · 5 mentioned · 26 missing


**13.1 Seeing data**

- ⬜ 🔷 Mean vs median
- ⬜ ⚡ Anscombe's quartet & the Datasaurus
- ⬜ ⚡ Simpson's paradox
- ⬜ ⚡ Correlation ≠ causation
- ⬜ ⚡ Berkson's paradox
- ✅ ⚡ Regression to the mean — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Survivorship bias
- ⬜ ⚡ Small samples, extreme rates
- ⬜ 📜 Nightingale's rose, Minard's march, Snow's map

**13.2 Frequentist inference**

- ✅ 📜 The lady tasting tea — *field guide* (`guides/probability.js`)
- ⬜ 📜 Literary Digest poll (1936)
- 🟡 🔷 p-values & the replication crisis — *map topic/field* (`data.js`)
- ✅ 📜 Student's t — *field guide* (`guides/probability.js`)
- ⬜ 🧩 German tank problem
- ⬜ 🔷 Capture–recapture
- 🟡 📜 Least squares & Ceres (1801) — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Bootstrap (1979) — *field guide* (`guides/probability.js`)
- ⬜ ⚡ Stein's paradox
- ⬜ 🔷 Overfitting & the bias–variance trade-off
- ⬜ 🔷 Randomized controlled trials
- 🟡 🔷 Galton's ox (1906) — *map topic/field* (`data.js`)

**13.3 Bayesian thinking**

- 🟡 📜 Bayes & Price (1763) — *map topic/field* (`data.js`)
- ⬜ ⚡ Base-rate fallacy
- 🟡 🔷 Prior → likelihood → posterior — *map topic/field* (`data.js`)
- ⬜ 🔷 Laplace's sunrise problem
- ⬜ 📜 Bayesian search
- ⬜ 📜 Turing's Banburismus
- ⬜ 🔷 Good–Turing estimation
- ✅ 🔷 Spam filters — *field guide* (`guides/probability.js`)
- ⬜ 🔷 Kalman filter
- ✅ 🔷 MCMC — *map topic/field* (`data.js`)
- ⬜ 🔷 Hierarchical models & shrinkage
- ⬜ ⚡ Lindley's paradox
- ⬜ 🔷 Causal diagrams (Pearl)
- ⬜ 🔷 Cromwell's rule
- ⬜ ⚡ The hot hand, revisited
- ⬜ 🔷 Zipf's law & power laws
- ✅ 🔷 Topological data analysis — *bridge/dispute story* (`extras.js`)

## 14. Differential Equations

8 covered · 4 mentioned · 20 missing


**14.1 Ordinary differential equations**

- 🟡 🔷 Exponential growth & decay — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Logistic growth
- ✅ 🔷 Lotka–Volterra — *playable atom* (`atoms-analysis.js`)
- ⬜ 🔷 SIR epidemic model
- ⬜ 🔷 Harmonic oscillator & resonance
- ⬜ 📜 Tacoma Narrows (1940)
- 🟡 ⚡ Pendulum period — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Three-body problem — *pioneer bio* (`pioneers-data.js`)
- ⬜ ⚡ Norton's dome
- ⬜ 🔷 Phase portraits & limit cycles
- ⬜ ❓ Hilbert's 16th problem
- ⬜ 🔷 Tsiolkovsky rocket equation
- ⬜ 🔷 Hodgkin–Huxley model
- ⬜ 🔷 Belousov–Zhabotinsky reaction
- ⬜ 🔷 Kuramoto model

**14.2 Partial differential equations**

- ✅ 🔷 Heat equation — *map topic/field* (`data.js`)
- ✅ 🔷 Wave equation — *map topic/field* (`data.js`)
- ⬜ ⚡ Huygens' principle holds only in odd dimensions
- ✅ 🔷 Laplace's equation — *topic drawer* (`topics-data.js`)
- 🟡 🔷 Schrödinger equation — *topic drawer* (`topics-data.js`)
- ✅ ❓ Navier–Stokes — *field guide* (`guides/analysis.js`)
- ⬜ 🔷 Maxwell's equations
- 🟡 ⚡ Black–Scholes is the heat equation — *topic drawer* (`topics-data.js`)
- ⬜ 🔷📜 Solitons
- ⬜ 🔷 Turing patterns (1952)
- ⬜ 🔷 Traffic waves
- ⬜ 🔷📜 Chladni figures
- ✅ ⚡ Can you hear the shape of a drum? — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Kelvin wake
- ⬜ ⚡ d'Alembert's paradox
- ⬜ 🔷 Random walks solve Laplace's equation
- ✅ 🔷 Finite element method — *topic drawer* (`topics-data.js`)

## 15. Dynamical Systems, Chaos & Fractals

14 covered · 4 mentioned · 17 missing


**15.1 Chaos**

- ✅ 🔷 Logistic map — *topic drawer* (`topics-data.js`)
- ✅ 🏆 Feigenbaum constant δ ≈ 4.669 — *playable atom* (`atoms-analysis.js`)
- ✅ 🏆 Period three implies chaos (1975) — *field guide* (`guides/analysis.js`)
- ✅ 🔷📜 Lorenz attractor — *map topic/field* (`data.js`)
- ⬜ 🔷 Double pendulum
- ⬜ 📜 Poincaré's prize-winning error (1889)
- ✅ 🏆 KAM theorem — *map topic/field* (`data.js`)
- 🟡 🏆 Poincaré recurrence — *map topic/field* (`data.js`)
- ⬜ 🔷 Arnold's cat map
- ✅ 🔷 Smale horseshoe — *field guide* (`guides/analysis.js`)
- ⬜ 🔷 Mathematical billiards
- ⬜ ❓ Periodic billiards in obtuse triangles
- ⬜ 🏆 The Lorenz attractor exists (Tucker 2002)
- ⬜ 🔷 Synchronization
- ⬜ 🔷 Catastrophe theory
- ⬜ 🔷 Dottie number
- ⬜ 🔷 Sandpiles & self-organized criticality
- ⬜ 🔷 Hofstadter's butterfly

**15.2 Cellular automata**

- ✅ 🔷 Game of Life (1970) — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Rule 30 & Rule 110
- ⬜ ❓ Langton's ant

**15.3 Fractals**

- ✅ 🔷 Koch snowflake — *map topic/field* (`data.js`)
- 🟡 🔷 Sierpiński triangle & carpet — *field guide* (`guides/analysis.js`)
- ⬜ 🔷 Menger sponge
- ⬜ ⚡ Coastline paradox (1967)
- 🟡 🔷 Fractal dimension — *map topic/field* (`data.js`)
- ✅ 🔷 Mandelbrot set — *map topic/field* (`data.js`)
- ✅ ⚡ π in the Mandelbrot set — *playable atom* (`atoms-analysis.js`)
- ✅ ❓ MLC conjecture — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Julia sets — *map topic/field* (`data.js`)
- ⬜ 🔷 Newton fractals
- ✅ 🔷 Barnsley fern — *map topic/field* (`data.js`)
- ⬜ 🔷 Dragon curve
- 🟡 🔷 Fractals in nature — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Fractal antennas — *field guide* (`guides/analysis.js`)

## 16. Computation — Algorithms & Complexity

4 covered · 1 mentioned · 15 missing

- ⬜ ❓🏆 P vs NP
- ⬜ 🏆 Cook–Levin (1971) & Karp's 21 problems
- ⬜ 🧩 Traveling salesman
- ⬜ 🧩 Knapsack, Sudoku, Minesweeper
- ⬜ 🔷 Sorting & the n log n barrier
- ⬜ 🏆 Karatsuba (1960)
- ⬜ 📜 Pancake sorting
- ⬜ 🔷 Dynamic programming
- ✅ 🔷 Ackermann function — *field guide* (`guides/foundations.js`)
- ⬜ 🔷 Finite automata & the Chomsky hierarchy
- ✅ 🏆 Shor's algorithm (1994) — *map topic/field* (`data.js`)
- ⬜ 🔷 Zero-knowledge proofs
- ⬜ 🏆 PCP theorem
- ⬜ 🏆 MIP = RE (2020)*
- ⬜ ⚡ Undecidable spectral gap (2015)
- ⬜ ⚡ Magic: The Gathering is Turing complete (2019)
- ✅ 🏆 Computer-assisted proofs — *bridge/dispute story* (`extras.js`)
- ✅ 🔷 Proof assistants — *map topic/field* (`data.js`)
- 🟡 📜 AI and mathematics — *map topic/field* (`data.js`)
- ⬜ 📜 Gödel's lost letter (1956)

## 17. Information, Coding & Cryptography

7 covered · 4 mentioned · 14 missing


**17.1 Information theory**

- 🟡 🏆 Shannon entropy (1948) — *topic drawer* (`topics-data.js`)
- 🟡 🔷 Twenty questions — *field guide* (`guides/foundations.js`)
- ⬜ 📜 Huffman coding (1952)
- ⬜ 🏆 Noisy-channel coding theorem
- ✅ 🔷 Compression — *topic drawer* (`topics-data.js`)
- ⬜ ⚡ Landauer's principle
- ⬜ 🔷 Entropy of English

**17.2 Error-correcting codes**

- ✅ 🔷 Check digits — *field guide* (`guides/number.js`)
- ⬜ 📜 Hamming codes (1950)
- ✅ 🔷 Reed–Solomon codes — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Golay code
- ⬜ 🔷 LDPC & polar codes
- ⬜ 🔷 Shamir secret sharing

**17.3 Cryptography**

- ⬜ 🔷 Caesar & substitution ciphers
- ⬜ 📜 Vigenère cipher
- 🟡 🏆 One-time pad — *field guide* (`guides/analysis.js`)
- ✅ 📜 Enigma — *pioneer bio* (`pioneers-data.js`)
- ✅ 🔷 Diffie–Hellman (1976) — *map topic/field* (`data.js`)
- 🟡 📜 RSA (1977) — *map topic/field* (`data.js`)
- ✅ 🔷 Elliptic-curve cryptography — *map topic/field* (`data.js`)
- ⬜ 🔷 Hash functions & birthday attacks
- ✅ 🔷 Post-quantum cryptography — *topic drawer* (`topics-data.js`)
- ⬜ 🧩 Yao's millionaires' problem
- ⬜ 🧩 Mental poker
- ⬜ 📜 Zodiac 340 cipher

## 18. Game Theory & Social Choice

1 covered · 2 mentioned · 19 missing

- ⬜ 🔷 Prisoner's dilemma
- ⬜ 📜 Axelrod's tournament (1980)
- ✅ 🏆 Nash equilibrium — *pioneer bio* (`pioneers-data.js`)
- 🟡 🏆 Von Neumann's minimax theorem (1928) — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Chicken, stag hunt, tragedy of the commons
- ⬜ ⚡ Braess's paradox
- ⬜ 🔷 Vickrey auctions
- ⬜ 🧩 Fair cake cutting
- ⬜ ⚡ Condorcet paradox
- ⬜ 🏆 Arrow's impossibility theorem (1951)
- ⬜ 🏆 Gibbard–Satterthwaite theorem
- ⬜ 🔷 Voting methods
- ⬜ 🔷 Gerrymandering math
- ⬜ ⚡ Alabama paradox (1880)
- 🟡 🔷 Shapley value — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Evolutionary game theory
- ⬜ 🧩 Keynesian beauty contest
- ⬜ 🧩 Dollar auction
- ⬜ ⚡ Truels
- ⬜ 🔷 Two generals & Byzantine generals
- ⬜ ⚡ Allais & Ellsberg paradoxes
- ⬜ ⚡ Newcomb's paradox

## 19. Optimization & Numerical Analysis

7 covered · 1 mentioned · 12 missing

- ✅ 📜 Linear programming — *topic drawer* (`topics-data.js`)
- ⬜ 👾 Klee–Minty cube
- 🟡 🏆 LP duality — *map topic/field* (`data.js`)
- ✅ 🔷 Optimal transport — *field guide* (`guides/analysis.js`)
- ⬜ 🔷 Gradient descent
- ⬜ 🔷 Convexity
- ✅ 🔷 Hungarian algorithm — *topic drawer* (`topics-data.js`)
- ⬜ 🔷 Queueing theory & Little's law
- ⬜ 🔷 Simulated annealing & genetic algorithms
- ✅ 🏆 Compressed sensing (2006) — *pioneer bio* (`pioneers-data.js`)
- ✅ ⚡ 0.1 + 0.2 ≠ 0.3 — *playable atom* (`atoms-discrete.js`)
- ⬜ 📜 Numerical disasters
- ⬜ 📜 Pentium FDIV bug (1994)
- ⬜ 👾 Wilkinson's polynomial
- ⬜ 👾 Runge's phenomenon
- ✅ 🔷 Newton's (Heron's) method — *field guide* (`guides/analysis.js`)
- ⬜ 🔷 Fast inverse square root
- ⬜ 🔷 CORDIC
- ⬜ ⚡ BBP formula (1995)
- ✅ 🔷 Computing π — *map topic/field* (`data.js`)

## 20. Mathematical Physics

5 covered · 6 mentioned · 5 missing

- ✅ 🏆 Noether's theorem (1918) — *map topic/field* (`data.js`)
- ✅ 🔷 Principle of least action — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Special relativity — *topic drawer* (`topics-data.js`)
- ✅ 🔷 Quantum mechanics — *map topic/field* (`data.js`)
- 🟡 🏆 Bell's theorem — *map topic/field* (`data.js`)
- ⬜ 🔷 Ising model
- ⬜ 🔷 Renormalization
- 🟡 📜 S = k log W — *map topic/field* (`data.js`)
- ⬜ ⚡ The unreasonable effectiveness of mathematics
- 🟡 📜 Dimensional analysis — *map topic/field* (`data.js`)
- ⬜ 🔷 Fermi problems
- ⬜ ⚡ Square–cube law
- ✅ 🔷 Topological phases of matter — *field guide* (`guides/geometry.js`)
- 🟡 🔷 Anyons & braids — *playable atom* (`atoms-knots.js`)
- 🟡 ❓ Yang–Mills mass gap — *field guide* (`guides/geometry.js`)
- 🟡 🔷 Mathematics of string theory — *topic drawer* (`topics-data.js`)

## 21. Mathematics in the World

0 covered · 4 mentioned · 19 missing


**21.1 Life**

- ⬜ 🔷 Phyllotaxis
- ⬜ 📜 Hardy–Weinberg principle (1908)
- ⬜ 🔷 Kleiber's law
- ⬜ 🔷 Epidemics, Turing patterns, DNA knots

**21.2 Money**

- 🟡 🔷 Compound interest & e — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Random walks, Black–Scholes, Kelly betting
- ⬜ 🔷 Fat tails

**21.3 Music**

- ⬜ 🔷 Pythagorean tuning & the comma
- 🟡 ⚡ Why 12 notes? — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Equal temperament
- ⬜ 🔷 Euclidean rhythms
- ⬜ 🔷 Tonnetz
- ⬜ 🔷 Bach's crab canon

**21.4 Art & architecture**

- ⬜ 🔷 Perspective, Escher, Dürer, Dalí
- ⬜ 🔷 Islamic girih tiles
- ⬜ 🔷 Gaudí's hanging-chain models
- ⬜ 🔷 Geodesic domes
- ⬜ 🔷 Knitting & crochet

**21.5 Everyday**

- 🟡 🔷 Doomsday rule — *pioneer bio* (`pioneers-data.js`)
- ⬜ 🔷 Gauss's Easter algorithm
- 🟡 🔷 GPS — *field guide* (`guides/geometry.js`)
- ⬜ 🔷 PageRank & the Netflix Prize
- ⬜ 🔷 Sports
