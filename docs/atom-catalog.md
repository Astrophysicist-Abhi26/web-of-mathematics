# Web of Mathematics v2 — Flagship Atom Catalog

A master checklist of the famous, intuitive hooks of mathematics — paradoxes, monsters, landmark
theorems, iconic objects, puzzles and open problems — organised as **Pillar → Branch → Atom**
(904 atoms in 21 pillars, plus cross-cutting layers). Converted from the PDF catalog; the
comparison with what the site already contains is in [`gap-report.md`](gap-report.md).

**Legend** — ⚡ paradox / counterintuitive · 👾 monster or counterexample · 🏆 landmark theorem ·
🔷 famous object, shape or number · 🧩 puzzle or game · ❓ open problem · 📜 great story

**Suggested fields per atom** — `id`, `title`, `pillar`, `branch`, `type`, `status`
(🏛 foundational / 🔥 frontier / ⚙️ workhorse / 🪦 closed / 🧟 revived), `year`, `pioneers`,
`hook` (one line), `prerequisites`, `bridges`, `playable_idea`.
Verify dates and records before publishing, especially anything from 2020 onward.

## 1. Foundations — Logic, Sets, Infinity & Computability


### 1.1 Paradoxes of self-reference

- ⚡ **Liar paradox** — "This sentence is false."
- ⚡ **Epimenides paradox** — a Cretan says all Cretans are liars.
- ⚡ **Russell's paradox (1901)** — the set of all sets that don't contain themselves; it broke naive set theory.
- ⚡ **Barber paradox** — the barber who shaves exactly those who don't shave themselves.
- ⚡ **Grelling–Nelson paradox** — is the word "heterological" heterological?
- ⚡ **Berry paradox** — "the smallest number not definable in under sixty letters."
- ⚡ **Richard's paradox** — diagonalizing over the definable real numbers.
- ⚡ **Curry's paradox** — "If this sentence is true, then Santa Claus exists."
- ⚡ **Yablo's paradox** — an infinite liar chain in which no sentence refers to itself.
- ⚡ **Unexpected hanging / surprise exam** — a surprise that logic says can't happen, happens.
- ⚡ **Sorites (heap) paradox** — removing one grain never destroys a heap… until it does.

### 1.2 Logic & the art of proof

- 🔷 **Truth tables & Boolean logic** — AND, OR, NOT: the atoms of reasoning and of circuits.
- ⚡ **Vacuous truth** — "every unicorn can fly" is true.
- ⚡ **Principle of explosion** — from one contradiction, anything follows.
- 🏆 **√2 is irrational** — the classic proof by contradiction (and the Hippasus legend).
- 🏆 **Euclid: infinitely many primes** — perhaps the most famous proof ever written.
- ⚡ **"All horses are the same color"** — an induction proof with a hidden flaw.
- 👾 **Fake proofs** — 1 = 2 by dividing by zero; "every triangle is isosceles."
- 🧩 **Mutilated chessboard** — remove two opposite corners and no domino tiling exists (a coloring invariant).
- 🏆 **Pigeonhole principle** — two Londoners have exactly the same number of hairs.
- 🔷 **Proofs without words** — odd numbers sum to squares; Nicomachus' sum of cubes.
- ⚡ **Non-constructive proof** — irrational a, b with a^b rational, without knowing which pair works (√2^√2).
- 🧩 **Knights and knaves** — Smullyan's truth-teller and liar puzzles.
- 🧩 **Blue-eyed islanders** — common knowledge created by a statement everyone already knew.
- 📜 **Proofs from THE BOOK** — Erdős's idea of God's book of perfect proofs.

### 1.3 Sets & infinity

- ⚡ **Galileo's paradox (1638)** — there are as many perfect squares as whole numbers.
- ⚡ **Hilbert's Grand Hotel (1924)** — a full infinite hotel still fits infinitely many new guests.
- 🏆 **The rationals are countable** — zig-zag through the fraction grid; Calkin–Wilf and Stern– Brocot trees.
- 🏆 **Cantor's diagonal argument (1891)** — the reals can't be listed; some infinities are bigger.
- 🏆 **Cantor's theorem** — a power set is always bigger, so there is no largest infinity.
- 🔷 **Ordinals** — ω, ω+1, ω·2, ω², ω^ω, ε₀: counting past infinity.
- ❓🏆 **Continuum hypothesis** — neither provable nor disprovable from the standard axioms (Gödel 1940, Cohen 1963).
- ⚡ **Axiom of choice** — obvious-sounding, yet it implies Banach–Tarski (see 4.4).
- ⚡ **Infinite hat puzzle** — with choice, infinitely many prisoners can ensure all but finitely many guess right.
- ⚡ **Ross–Littlewood vase** — add 10 balls, remove 1, forever: the vase ends up empty?
- ⚡ **Thomson's lamp** — toggled infinitely often within a minute: on or off?
- ⚡ **Skolem's paradox** — a countable model of set theory that "believes" in uncountable sets.
- 🔷 **Von Neumann ordinals** — all numbers built from the empty set: 0 = {}, 1 = {{}}, …
- 🏆 **Schröder–Bernstein theorem** — two one- way injections give a perfect matching.
- 🔷 **Large cardinals** — infinities so large their existence can't be proved from the usual axioms.

### 1.4 Limits of proof & computation

- 🏆 **Gödel's incompleteness theorems (1931)** — consistent systems strong enough for arithmetic have true unprovable statements and can't prove their own consistency.
- 🔷 **Gödel numbering** — turning statements about mathematics into numbers.
- 🏆 **Halting problem (Turing 1936)** — no program can decide whether every program halts.
- 🔷 **Turing machine** — a tape, a head and a rule table: the definition of computation.
- 🔷 **Lambda calculus & the Church–Turing thesis** — functions alone can compute anything computable.
- 🏆 **Tarski's undefinability of truth** — arithmetic can't define its own truth.
- 🏆 **Hilbert's 10th problem (1970)** — no algorithm solves all Diophantine equations (Matiyasevich, Robinson, Davis, Putnam).
- 🏆 **Rice's theorem** — every non-trivial question about what programs do is undecidable.
- 🔷 **Busy Beaver** — outgrows every computable function; BB(5) = 47,176,870 was settled in 2024.
- 🔷 **Chaitin's Ω** — a well-defined number whose digits can't be computed.
- 🏆 **Kolmogorov complexity** — most strings are incompressible; randomness, defined.
- 👾 **Goodstein sequences** — explode astronomically yet always reach 0; unprovable in Peano arithmetic.
- 🧩 **Hydra game (Kirby–Paris 1982)** — Hercules always wins, but arithmetic can't prove it.
- 🏆 **Paris–Harrington theorem (1977)** — a natural Ramsey-type statement unprovable in Peano arithmetic.
- 🔷 **Quines** — programs that print their own source code (Kleene's recursion theorem).
- 🏆 **Curry–Howard correspondence** — proofs are programs, propositions are types.
- 👾 **Undecidable tilings (Berger 1966)** — no algorithm decides whether a set of Wang tiles tiles the plane.

## 2. Numbers & Number Theory


### 2.1 Number systems — the number shells

- 🔷 **Peano axioms** — all of ℕ from 0 and "next."
- 🔷 **ℕ → ℤ → ℚ → ℝ → ℂ → ℍ → 𝕆** — each shell gains power and loses a property (order, commutativity, associativity).
- ⚡ **0.999… = 1** — the most argued-about equation on the internet.
- 🔷 **Dedekind cuts & Cauchy sequences** — two ways to fill ℚ 's holes and build ℝ .
- 🔷 **Euler's identity** — e^(iπ) + 1 = 0 joins 0, 1, π, e and i.
- 🔷 **Golden ratio φ** — the "most irrational" number; pentagons and Fibonacci (plus many myths).
- 🏆 **Transcendental numbers** — Liouville's first example (1844); e (1873); π (1882).
- ⚡ **Almost every number is transcendental** — yet proving it for any specific number is hard.
- ❓ **Normal numbers** — almost all numbers are normal; nobody can prove π is.
- 🔷 **Continued fractions** — 355/113 for π; φ = [1; 1, 1, 1, …].
- 🔷 **Surreal numbers (Conway)** — one system holding every ordinal and every infinitesimal.
- 🔷 **Hyperreals** — Robinson's rigorous infinitesimals (nonstandard analysis).
- ⚡ **p-adic numbers** — where 1 + 2 + 4 + 8 + … = −1 and …999 = −1.
- 🔷 **Dual numbers** — ε² = 0, the secret behind automatic differentiation.
- 🔷 **Strange bases** — binary, balanced ternary, base −2, base φ, factorial base.
- 🔷 **Egyptian fractions** — sums of distinct unit fractions; the Erdős–Straus conjecture ❓ .

### 2.2 Primes

- 🔷 **Sieve of Eratosthenes** — the oldest prime- finding algorithm.
- 🏆 **Fundamental theorem of arithmetic** — every number factors into primes in exactly one way.
- 🏆 **Prime number theorem (1896)** — about x / ln x primes lie below x.
- 🔷 **Ulam spiral (1963)** — primes line up on diagonals (doodled during a dull talk).
- ❓ **Twin prime conjecture** — Zhang (2013) proved bounded gaps; the bound is now 246.
- ❓ **Goldbach's conjecture** — every even number above 2 is a sum of two primes; the weak version was proved (Helfgott 2013).
- ❓🏆 **Riemann hypothesis** — the zeros of ζ(s) control the fine structure of the primes.
- 🔷 **Mersenne primes & GIMPS** — record primes found by volunteers' computers.
- ❓ **Perfect numbers** — 6, 28, 496; even ones match Mersenne primes; is there an odd one?
- 🏆 **Green–Tao theorem (2004)** — the primes contain arithmetic progressions of every length.
- 🏆 **Dirichlet's theorem** — infinitely many primes in every allowable progression.
- 🏆 **Bertrand's postulate** — there is always a prime between n and 2n.
- ⚡ **Arbitrarily long prime deserts** — n!+2, …, n!+n are all composite.
- ⚡ **Chebyshev's bias** — primes ≡ 3 (mod 4) usually lead the race, but not always.
- 👾 **Carmichael numbers (561)** — composites that fool Fermat's primality test.
- 🏆 **PRIMES is in P (AKS 2002)** — primality can be tested in polynomial time.
- ⚡ **Euler's n² + n + 41** — prime for n = 0 to 39, then fails.
- 🏆 **Wilson's theorem** — p is prime exactly when (p−1)! ≡ −1 (mod p).
- ❓ **Landau's four problems (1912)** — all still open.

### 2.3 Divisibility & modular arithmetic

- 🔷 **Clock arithmetic** — where 9 + 5 = 2.
- 🔷 **Divisibility tricks** — casting out nines; rules for 3, 7 and 11.
- 🏆 **Euclidean algorithm** — the oldest algorithm still in use; slowest on Fibonacci numbers.
- 🧩 **Water jug puzzle (Die Hard 3)** — Bézout's identity in action.
- 🏆 **Chinese remainder theorem** — Sunzi's puzzle of counting by remainders.
- 🏆 **Fermat's little theorem & Euler's theorem** — the engine inside RSA (see 17).
- 🏆 **Quadratic reciprocity** — Gauss's "golden theorem," which he proved eight ways.
- 🏆 **Fermat's Christmas theorem** — an odd prime is a sum of two squares iff p ≡ 1 (mod 4); Zagier's one-sentence proof.
- 🏆 **Lagrange's four-square theorem** — every number is a sum of four squares.
- 🏆 **15 and 290 theorems** — if a form represents every number up to 15 (or 290), it represents them all.
- 🏆 **Gauss's Eureka theorem** — every number is a sum of three triangular numbers.

### 2.4 Diophantine equations

- 🔷 **Pythagorean triples** — Euclid's formula; the Babylonian tablet Plimpton 322.
- 🏆📜 **Fermat's Last Theorem** — a margin note, 358 years, and Wiles (1994).
- 🔷 **Pell's equation** — Archimedes' cattle problem has a 206,545-digit answer.
- 🔷 **1729** — Hardy's "dull" taxi number: the smallest sum of two cubes in two ways.
- 🧩 **Sums of three cubes** — 33 and 42 were finally cracked in 2019.
- 🏆 **Catalan's conjecture (2002)** — 8 and 9 are the only consecutive perfect powers.
- 👾 **Euler's sum-of-powers conjecture** — killed by 27⁵ + 84⁵ + 110⁵ + 133⁵ = 144⁵ (1966).
- ❓ **Beal conjecture** — a $1M prize problem generalizing Fermat.
- ❓📜 **abc conjecture** — Mochizuki's claimed proof remains disputed (see B).
- 🔷 **Elliptic curves** — adding points with chords and tangents.
- ❓ **Congruent number problem** — which numbers are areas of rational right triangles (tied to BSD).
- ⚡ **Failure of the Hasse principle** — 3x³ + 4y³ + 5z³ = 0 is solvable modulo everything but has no rational solution.

### 2.5 Famous sequences & special numbers

- 🔷 **Fibonacci numbers** — rabbits, sunflowers, Binet's formula, Zeckendorf representation.
- 🔷 **Pascal's triangle** — hidden Fibonacci numbers, powers of 11, a Sierpiński pattern mod 2.
- ❓ **Collatz (3n+1)** — halve or triple-plus-one; always reaches 1? Tao (2019): almost always, in a precise sense.
- 🔷 **Look-and-say** — 1, 11, 21, 1211…; grows by Conway's constant ≈ 1.3036.
- 🔷 **Recamán's sequence** — hypnotic back-and- forth arcs.
- 🔷 **Thue–Morse sequence** — the fairest turn- taking order; never repeats a block three times in a row.
- 🔷 **Kolakoski sequence** — a sequence that describes its own run lengths.
- 🔷 **Kaprekar's 6174** — almost any 4-digit number reaches 6174 within 7 steps.
- 🏆 **Partitions (Hardy–Ramanujan)** — an exact formula for p(n), and p(5n+4) ≡ 0 (mod 5).
- 🔷 **Triangular & figurate numbers** — young Gauss summing 1 to 100 (legend).
- 🔷 **Amicable numbers** — 220 and 284, each the sum of the other's divisors.
- 🔷 **Skewes' number** — an enormous bound for where π(x) first beats li(x).
- ⚡ **Strong law of small numbers** — circle regions go 1, 2, 4, 8, 16… then 31.
- 👾 **Pólya and Mertens conjectures** — plausible patterns disproved (the first fails near 906 million).
- 🔷 **OEIS** — the online encyclopedia of hundreds of thousands of integer sequences.

### 2.6 Analytic number theory

- 🏆 **Basel problem (Euler 1734)** — 1 + 1/4 + 1/9 + … = π²/6.
- 🏆 **Euler product** — ζ(s) as a product over primes: analysis meets arithmetic.
- ⚡ **1 + 2 + 3 + … = −1/12** — what zeta regularization really means, and what it doesn't.
- ⚡ **The prime reciprocals diverge** — the primes are dense enough to make Σ1/p infinite.
- ⚡ **Kempner series** — delete every term containing a 9 from the harmonic series and it converges (≈ 22.92).
- 🏆 **Apéry's theorem (1978)** — ζ(3) is irrational.
- ⚡ **Zeta zeros look like random-matrix eigenvalues** — Montgomery meets Dyson over tea (1972).
- ❓ **Gauss circle problem** — counting lattice points inside a circle.

### 2.7 Algebraic number theory & the Langlands web

- 🔷 **Gaussian integers** — 5 = (2+i)(2−i): primes that split.
- ⚡ **Unique factorization fails** — 6 = 2·3 = (1+√−5)(1−√−5); Kummer's ideals rescue it.
- ⚡ **e^(π√163) is almost an integer** — Heegner numbers (and Martin Gardner's April Fools' hoax).
- ⚡ **Monstrous moonshine** — 196884 = 196883 + 1 links the j-function to the Monster group.
- 🏆 **Modularity theorem** — every elliptic curve over ℚ is modular; the engine of Fermat's Last Theorem.
- 🔷 **Modular forms** — hyper-symmetric functions behind much of modern number theory.
- 🏆 **Ostrowski's theorem** — the only ways to measure size on ℚ are the usual one and the p- adic ones.
- 🔷 **Langlands program** — a grand unified theory linking number theory, geometry and symmetry; a proof of geometric Langlands was announced in 2024.

### 2.8 Approximation & transcendence

- 🏆 **Hurwitz's theorem** — φ is the hardest number to approximate by fractions.
- 🏆 **Gelfond–Schneider (Hilbert's 7th problem)** — 2^√2 is transcendental.
- ❓ **Is e + π irrational?** — nobody knows; nobody even knows whether Euler's γ is irrational.
- 🏆 **Three-distance theorem** — the points nα mod 1 split a circle into at most three gap lengths.
- 🏆 **Weyl equidistribution** — multiples of an irrational spread out evenly.

## 3. Algebra


### 3.1 Equations & polynomials

- 📜 **Completing the square, geometrically** — al- Khwarizmi's picture proof.
- 📜 **The cubic formula feud** — del Ferro, Tartaglia and Cardano's Ars Magna (1545).
- ⚡ **Casus irreducibilis** — real roots reachable only through complex numbers (Bombelli).
- 🏆 **The quintic is unsolvable (Abel–Ruffini)** — no formula in radicals for degree 5.
- 🏆 **Fundamental theorem of algebra** — every polynomial has a complex root (a winding- number picture proof).
- 🔷 **Vieta's formulas & Descartes' rule of signs** — reading roots from coefficients.
- ⚡ **Any finite pattern can continue any way** — "1, 2, 4, 8, 16, … 31" via interpolation.

### 3.2 Groups — the mathematics of symmetry

- 🔷 **Symmetry groups** — the dihedral group of a square: rotations and reflections.
- 🏆 **17 wallpaper groups & 7 frieze groups** — every repeating pattern classified (pattern hunts in the Alhambra).
- 🏆 **230 space groups** — every possible crystal symmetry.
- 🧩 **Rubik's Cube group** — 43,252,003,274,489,856,000 positions; God's number is 20 (2010).
- 🧩📜 **15 puzzle** — Sam Loyd's unsolvable swap, explained by permutation parity.
- ⚡ **Socks and shoes** — (AB)⁻¹ = B⁻¹A⁻¹: order matters.
- 🏆 **Lagrange's theorem** — subgroup sizes divide the group's size.
- 🏆 **Cayley's theorem** — every group is secretly a permutation group.
- 🔷 **Cayley graphs** — pictures of groups.
- 🏆 **Burnside's lemma & Pólya counting** — counting necklaces up to rotation.
- 🏆 **Classification of finite simple groups** — 18 infinite families plus 26 sporadic groups; tens of thousands of pages.
- 🔷 **The Monster** — about 8 × 10⁵³ elements, the largest sporadic group.
- 🧩 **Lights Out** — solved with linear algebra over {0, 1}.
- 👾 **The word problem** — no algorithm decides whether two words give the same group element (Novikov–Boone).
- 👾 **Grigorchuk group** — the first group of intermediate growth.
- ⚡ **Dirac's belt / plate trick** — a 360° twist can't be undone, but 720° can (see 7.4).

### 3.3 Rings, fields & Galois theory

- 📜 **Galois (1811–1832)** — the symmetry of roots decides solvability; dead after a duel at 20.
- 🏆 **Three impossible constructions** — doubling the cube, trisecting angles (Wantzel 1837), squaring the circle (Lindemann 1882).
- 🏆 **Constructible polygons** — Gauss's 17-gon (1796); Hermes spent about 10 years on the 65537-gon.
- 🧩 **Origami beats the compass** — paper folding can trisect angles and double cubes.
- 🔷 **Finite fields GF(pⁿ)** — the arithmetic inside QR codes and AES.
- 🔷📜 **Quaternions (1843)** — i² = j² = k² = ijk = −1, carved on Brougham Bridge; 3D rotations in games.
- 🏆 **Only four normed division algebras** — ℝ , ℂ , ℍ , 𝕆 (Hurwitz); the octonions aren't even associative.
- 🔷 **The hierarchy of nice rings** — Euclidean domains ⊂ PIDs ⊂ UFDs ⊂ integral domains.

### 3.4 Linear algebra

- 🔷 **Matrices as transformations** — every matrix is a way of moving space.
- 🔷 **Determinant = volume scaling** — its sign records a flip of orientation.
- 🔷 **Eigenvectors** — directions that don't turn; Google's PageRank is one.
- 🏆 **Singular value decomposition** — every matrix is rotate–stretch–rotate; image compression.
- 🏆 **Cayley–Hamilton theorem** — every matrix satisfies its own characteristic equation.
- 🏆 **Spectral theorem** — symmetric matrices have perpendicular eigen-axes.
- 🏆 **Rank–nullity theorem** — what a map kills plus what it hits equals the dimension.
- 🔷 **Fibonacci by matrix powers** — [[1,1],[1,0]]ⁿ.
- 🔷 **Least squares as projection** — fitting a line = dropping a perpendicular.
- ⚡ **Gimbal lock** — why Euler angles fail and quaternions don't (Apollo 11 lore).
- 🏆 **Strassen (1969)** — matrices multiply faster than n³; AlphaTensor (2022) found new schemes.
- ❓ **Hadamard conjecture** — ±1 matrices with orthogonal rows in every size divisible by 4?
- 👾 **Hamel basis** — ℝ as a vector space over ℚ needs the axiom of choice (see 4.3).

### 3.5 Representation theory & Lie theory

- 🔷 **Representations** — groups acting as matrices.
- 🔷 **Character tables** — a group's fingerprint.
- 🏆 **Counting irreducibles** — their number equals the number of conjugacy classes; squared dimensions sum to the group's order.
- 🏆 **Hook length formula** — counting Young tableaux with a single product.
- 🔷 **Fourier analysis as representation theory** — the circle group's representations are sines and cosines (see 4.6).
- 🔷 **Spherical harmonics** — rotation-group representations shape atomic orbitals.
- 📜 **The Eightfold Way** — SU(3) predicted the Ω⁻ particle (1962; found 1964).
- 🔷 **Lie algebras & root systems** — continuous symmetry, linearized.
- 🏆 **Dynkin diagrams & ADE** — one A-D-E list classifies simple Lie algebras, Platonic symmetries and surface singularities.
- 🔷 **E8** — a 248-dimensional symmetry with 240 roots; its giant 2007 computation.
- ⚡ **Monstrous moonshine** — proved by Borcherds (Fields Medal 1998; see 2.7).

### 3.6 Category theory & abstract structures

- 🔷 **Objects and arrows** — mathematics about relationships rather than things.
- 🏆 **Yoneda lemma** — an object is determined by its relationships.
- 🔷 **Functors & natural transformations** — the reason category theory was invented.
- ⚡ **"A monad is just a monoid in the category of endofunctors"** — the joke that is literally true.
- 🔷 **Duality** — reverse every arrow and get a second theorem free.
- 📜 **Snake lemma on film** — proved on screen in It's My Turn (1980).
- 🔷 **Boolean algebras & lattices** — order as algebra.

### 3.7 Algebraic geometry

- 🔷 **Conics** — circle, ellipse, parabola, hyperbola as slices of a cone.
- 🏆 **Bézout's theorem** — curves of degree m and n meet in mn points, counted correctly.
- 🏆 **Pascal's hexagon theorem** — for any hexagon on a conic, opposite sides meet on a line.
- 🔷 **27 lines on a cubic surface** — Clebsch's surface and its famous plaster models.
- 📜 **3264 conics** — Steiner said 7776; the true count of conics tangent to five given conics is 3264.
- ⚡ **Mirror symmetry** — string theorists' formula counted curves on the quintic threefold (2875 lines, 609,250 conics, and beyond).
- 🏆 **Hilbert's Nullstellensatz** — the dictionary between equations and shapes.
- 🏆 **Weil conjectures (Deligne 1974)** — counting points over finite fields reveals topology.
- 🔷 **Tropical geometry** — algebra with (min, +) turns curves into piecewise-linear graphs.
- 📜 **Grothendieck's schemes** — the "rising sea" rebuild of geometry.

## 4. Real Analysis


### 4.1 Limits & sequences

- ⚡ **Zeno's paradoxes** — Achilles and the tortoise, the dichotomy, the arrow.
- 🔷 **ε–δ as a game** — the challenger picks ε, the prover answers with δ.
- 🏆 **Completeness of ℝ** — no holes; ℚ has one at √2.
- 🏆 **Bolzano–Weierstrass** — every bounded sequence has a convergent subsequence.
- 🔷 **e from compound interest** — (1 + 1/n)ⁿ → e.
- 🏆 **Stirling's formula** — n! ≈ √(2πn)(n/e)ⁿ: π and e hide in factorials.
- 🔷 **Infinite products for π** — Viète (1593), Wallis (1656).
- 🔷 **Madhava–Leibniz series** — π/4 = 1 − 1/3 + 1/5 − … (Kerala school, c. 1400).

### 4.2 Series

- 🏆 **The harmonic series diverges** — Oresme's proof (c. 1350); it grows like ln n.
- 🧩 **Book-stacking overhang** — a stack of books can overhang a table by any distance.
- ⚡ **Ant on a rubber rope** — it reaches the end despite the stretching.
- 🔷 **Geometric series** — 1/2 + 1/4 + … = 1, as a square filling up.
- ⚡ **Grandi's series** — 1 − 1 + 1 − … = 0? 1? ½?
- ⚡ **Riemann rearrangement theorem** — reorder a conditionally convergent series to sum to anything.
- ⚡ **Alternating harmonic series = ln 2** — rearranged, it becomes (3/2) ln 2.
- 🔷 **Taylor series** — polynomials that impersonate e^x and sin x.
- ⚡ **Why 1/(1+x²) converges only for |x| < 1** — the reason hides at ±i (see 5).
- 🔷 **Summation methods** — Cesàro, Abel, Borel: honest values for divergent series.
- 📜 **Bernoulli numbers** — computed by the first published program (Ada Lovelace, 1843).

### 4.3 Continuity, derivatives & the monster zoo

- 🏆 **Intermediate value theorem** — the monk climbing and descending a mountain passes one spot at the same time both days.
- 🧩 **Wobbly table theorem** — rotate a four- legged table and it stops wobbling.
- 🏆 **Mean value theorem** — average speed = instantaneous speed somewhere (speed traps).
- 📜 **L'Hôpital's rule** — really Johann Bernoulli's; L'Hôpital paid for it.
- 👾 **Weierstrass function (1872)** — continuous everywhere, differentiable nowhere.
- 👾 **Blancmange (Takagi) function** — a friendlier nowhere-differentiable curve.
- 👾 **Dirichlet function** — 1 on rationals, 0 on irrationals: continuous nowhere.
- 👾 **Thomae's popcorn function** — continuous at irrationals, jumping at rationals.
- ⚡ **No function is continuous at exactly the rationals** — a Baire category argument.
- 👾 **Devil's staircase (Cantor function)** — climbs from 0 to 1 with zero slope almost everywhere.
- 👾 **Conway's base-13 function** — takes every value on every interval, yet is continuous nowhere.
- 👾 **Minkowski's question-mark function** — sends quadratic irrationals to rationals.
- 👾 **e^(−1/x²)** — every derivative is 0 at 0, yet the function isn't zero: smooth ≠ analytic.
- 👾 **x² sin(1/x)** — differentiable with a discontinuous derivative.
- ⚡ **Most continuous functions are nowhere differentiable** — Banach and Mazurkiewicz (1931).
- 👾 **Peano & Hilbert curves** — a continuous line that fills a whole square.
- 👾 **Osgood curve** — a non-self-crossing curve with positive area.
- 👾 **Cauchy's functional equation** — f(x+y) = f(x) + f(y) has wild non-linear solutions.

### 4.4 Integration & measure

- 📜 **Archimedes' method** — the parabola's 4/3 area; the sphere-in-cylinder on his tomb.
- 🏆 **Cavalieri's principle** — equal slices, equal volumes.
- ⚡ **Napkin ring problem** — the leftover band's volume depends only on its height.
- ⚡ **Gabriel's horn** — finite volume π, infinite surface area: you can fill it with paint but never paint it.
- 🔷 **Gaussian integral** — ∫e^(−x²) dx = √π via the polar-coordinates trick.
- 🔷 **Feynman's trick** — differentiate under the integral sign.
- ⚡ **Sophomore's dream** — ∫₀¹ x^(−x) dx = Σ n^(−n).
- ⚡ **Borwein integrals** — a π/2 pattern holds for seven integrals, then breaks.
- 🏆 **No elementary antiderivative** — ∫e^(−x²) dx can't be written in elementary functions (Liouville; Risch algorithm).
- 🔷 **Pappus's centroid theorem** — volumes from centers of mass.
- 🔷 **Lebesgue integral** — count money by sorting the bills, not by order of arrival.
- 👾 **Cantor set** — uncountable, yet of zero length.
- 👾 **Fat Cantor set** — full of holes everywhere, yet of positive length.
- 👾 **Vitali set** — a set that can have no length at all.
- ⚡ **Banach–Tarski paradox (1924)** — one ball becomes two identical balls using five pieces and the axiom of choice.
- ⚡ **Tarski's circle-squaring** — a disc can be cut up and rearranged into a square (Laczkovich 1990).
- 👾 **Volterra's function** — a bounded derivative that can't be Riemann-integrated.

### 4.5 Multivariable & vector calculus

- 🔷 **Gradient, divergence, curl** — the slopes, sources and swirls of a fluid.
- 🏆 **Generalized Stokes' theorem** — Green, Stokes and Gauss are one statement: ∫∂M ω = ∫M dω.
- 🔷 **Planimeter** — a gadget that measures area by tracing the boundary (Green's theorem in brass).
- 🔷 **Saddles & monkey saddles** — Pringles, and a seat for three legs.
- 🔷 **Lagrange multipliers** — optimize on a constraint by matching gradients.
- 👾 **Unequal mixed partials** — a function where the order of differentiation matters.
- 👾 **Directional but discontinuous** — x²y/(x⁴+y²) has every directional derivative at the origin yet isn't continuous there.

### 4.6 Fourier & harmonic analysis

- 🔷 **Fourier series** — any periodic signal as a sum of sines; epicycles drawing any picture.
- 👾 **Gibbs phenomenon** — an overshoot of about 9% that never goes away.
- 🏆 **Uncertainty principle** — no signal is sharp in both time and frequency.
- 🏆 **Fast Fourier Transform (1965)** — Cooley– Tukey (Gauss had it around 1805).
- 🏆 **Sampling theorem** — sample at twice the top frequency and lose nothing.
- 🔷 **JPEG & MP3** — cosine transforms discard what you won't notice.
- 🔷 **Wavelets** — zoomable Fourier analysis.
- 👾 **Kolmogorov's divergent series (1923)** — an integrable function whose Fourier series diverges almost everywhere.
- 🏆 **Carleson's theorem (1966)** — for square- integrable functions, Fourier series converge almost everywhere.
- ⚡ **Kakeya needle problem** — turn a needle around inside an arbitrarily small area; a proof of the 3D Kakeya conjecture was announced in 2025 (Wang–Zahl).
- 🏆 **Poisson summation** — a sum over a lattice equals a sum over its dual.

### 4.7 Functional analysis

- 🔷 **Hilbert space** — infinite-dimensional geometry; the stage of quantum mechanics.
- ⚡ **The unit ball isn't compact** — in infinite dimensions, bounded is not enough.
- 🏆 **Banach fixed-point theorem** — drop a map of a city inside that city: exactly one point lies on itself.
- 🏆 **Weierstrass approximation** — polynomials approximate any continuous function; Bernstein's proof uses probability.
- 🏆 **Hahn–Banach, open mapping, uniform boundedness** — the three pillars of Banach spaces.
- 🔷 **Dirac delta** — not a function but a distribution (Schwartz).
- 📜 **Mazur's goose** — Enflo won a live goose (1972) for solving a problem in the Scottish Book.
- ❓ **Invariant subspace problem** — still open for Hilbert spaces.

### 4.8 Calculus of variations

- 📜 **Brachistochrone (1696)** — the cycloid is the fastest slide; Newton solved it overnight.
- 🔷 **Tautochrone** — on a cycloid, every starting point reaches the bottom at the same time.
- 🔷 **Catenary** — the hanging chain, which is not a parabola.
- 🏆 **Dido's isoperimetric problem** — the circle encloses the most area for its perimeter.
- 🔷 **Euler–Lagrange equation** — the calculus behind "least action."
- 🔷 **Fermat's least time** — Snell's law from a lifeguard's fastest route.
- 🔷 **Soap films & Plateau's problem** — nature solving minimal-surface equations.
- 🏆 **Double bubble theorem (2000)** — the standard double bubble is optimal.
- 🔷 **Kelvin's problem** — the Weaire–Phelan foam (1993) beat Kelvin; Beijing's Water Cube.

## 5. Complex Analysis

- 🔷 **Multiplying by i = rotating 90°** — i² = −1 as two quarter turns.
- 🏆 **Euler's formula** — e^(iθ) = cos θ + i sin θ.
- ⚡ **i^i is real** — about 0.2079 (and infinitely many other values).
- 🔷 **Roots of unity** — the solutions of zⁿ = 1 form a regular polygon.
- 🔷 **Domain coloring** — seeing complex functions as color wheels.
- 🔷 **Holomorphic = conformal** — angle- preserving maps, like Mercator's.
- 🏆 **Cauchy's integral formula** — boundary values determine everything inside.
- 🏆 **Liouville's theorem** — bounded entire functions are constant, which proves the fundamental theorem of algebra.
- ⚡ **Analytic continuation** — a tiny arc determines the whole function.
- 🏆 **Residue theorem** — hard real integrals solved by a detour through ℂ .
- 🏆 **Argument principle & Rouché's theorem** — counting zeros by walking around them.
- 🔷 **Riemann sphere** — infinity as a single point (stereographic projection).
- 🔷 **Möbius transformations** — sphere motions in disguise ("Möbius Transformations Revealed").
- 🏆 **Riemann mapping theorem** — any simply connected proper region can be conformally mapped onto the disk.
- 🔷 **Riemann surfaces** — the spiral staircase of log z; branch cuts for √z.
- ⚡ **Picard's great theorem** — near e^(1/z)'s singularity, every value but one is hit infinitely often.
- 🏆 **Maximum modulus principle** — |f| has no interior peaks.
- 🔷 **Gamma function** — factorials of fractions: (1/2)! = √π/2.
- 🔷 **Joukowski airfoil** — conformal maps that design wings.
- 📜 **Escher's Print Gallery** — its mysterious blank center explained by complex maps (2003).
- 🔷 **Elliptic functions** — doubly periodic functions that live on a torus.
- 🏆 **Bieberbach conjecture (de Branges 1984)** — coefficient bounds for one-to-one functions.
- ⚡ **Hartogs' phenomenon** — in two or more complex variables, singularities can't be isolated.

## 6. Geometry


### 6.1 Euclidean plane geometry

- 📜 **Euclid's Elements** — five postulates, and the troublesome fifth.
- 🏆 **Pythagorean theorem** — hundreds of proofs, including President Garfield's and Bhaskara's "Behold!"
- 🏆 **Thales' theorem** — an angle inscribed in a semicircle is right.
- 🔷 **Triangle centers & the Euler line** — centroid, circumcenter and orthocenter in a row; tens of thousands of centers catalogued.
- 🏆 **Nine-point circle** — Feuerbach: it touches the incircle and all three excircles.
- 🏆 **Morley's trisector theorem (1899)** — every triangle hides an equilateral one.
- 🏆 **Napoleon's theorem** — equilateral triangles on the sides produce a new equilateral triangle.
- 🏆 **Ptolemy's theorem** — the diagonals of a cyclic quadrilateral.
- 🔷 **Heron's & Brahmagupta's formulas** — area from side lengths alone.
- 🏆 **Pick's theorem** — lattice polygon area = I + B/2 − 1.
- 🏆 **Butterfly theorem** — a chord's midpoint stays a midpoint.
- 🔷 **Apollonius' problem** — eight circles tangent to three given ones.
- 🏆 **Descartes' circle theorem** — four mutually kissing circles (Soddy's poem "The Kiss Precise").
- 🔷 **Apollonian gasket** — endlessly nested circles, some with all-integer curvatures.
- 🏆 **Poncelet's porism** — if a polygon closes once between two conics, it closes from every start.
- 🔷 **Circle inversion** — lines become circles; the key to Steiner chains.
- 🔷 **Arbelos** — Archimedes' shoemaker's knife and its twin circles.
- 🏆 **Viviani's theorem** — distances to an equilateral triangle's sides always sum to the same value.
- 🔷 **Fermat point** — the 120° meeting point; soap films find it too.
- 🏆 **Mohr–Mascheroni theorem** — a compass alone can do every compass-and-straightedge construction.
- 👾 **Malfatti circles** — the "obvious" solution is never the best one.
- 🧩 **Langley's adventitious angles** — the hardest easy geometry problem.
- 🔷 **Lune of Hippocrates** — the first curved region squared exactly.
- 🏆 **Wallace–Bolyai–Gerwien theorem** — equal- area polygons can always be cut and rearranged into each other.
- 🧩 **Dudeney's hinged dissection (1907)** — a triangle swings into a square.
- 🔷 **Squared squares** — squares tiled by all- different squares (21 is the minimum, 1978).
- ⚡ **Missing square puzzle** — rearranged pieces seem to lose a square.
- 🔷 **Archimedes and π** — 223/71 < π < 22/7 from 96-sided polygons.
- 📜 **Golden-ratio myths** — the Parthenon and Mona Lisa claims, examined.

### 6.2 Solids, polyhedra & higher dimensions

- 🔷 **Platonic solids** — exactly five; why not six?
- 🔷 **Archimedean (13), Catalan and Johnson (92) solids** — the extended polyhedral zoo.
- 🔷 **Kepler–Poinsot polyhedra** — the four regular star solids.
- 🏆 **Euler's formula V − E + F = 2** — the gateway to topology (see 7).
- 🏆 **Descartes' angle defect** — a convex polyhedron's corner deficits total 720°.
- 🔷 **The six regular 4D polytopes** — the 24-cell has no 3D cousin; from 5D on, only three exist.
- 🔷 **Tesseract** — the 4D cube, its shadows and its unfolding (Dalí's Corpus Hypercubus).
- 📜 **Flatland (1884)** — how a 2D being would meet a sphere.
- ⚡ **High-dimensional balls** — volume peaks in 5D then shrinks toward 0; almost all of it sits near the skin.
- ⚡ **Spheres poking out of boxes** — from 10 dimensions on, the inner sphere reaches outside the cube.
- ⚡ **Prince Rupert's cube** — a cube passes through a hole in an equal cube; in 2025 the first convex solid lacking this property was found.
- 🏆 **Rigid vs flexible polyhedra** — convex ones are rigid (Cauchy); Connelly's (1977) flexes, and the bellows theorem keeps its volume fixed.
- 🏆 **Hilbert's 3rd problem (Dehn 1900)** — a cube and a tetrahedron of equal volume can't be cut into each other.
- ❓ **Dürer's unfolding problem** — does every convex polyhedron have a flat net?
- 🏆 **Kepler conjecture** — oranges are already stacked best (~74%); Hales 1998, formally verified 2014.
- 🏆 **Viazovska (2016)** — perfect sphere packing in 8 and 24 dimensions (Fields Medal 2022).
- 🔷 **Kissing numbers** — 6 in 2D, 12 in 3D (Newton vs Gregory), 240 in 8D, 196,560 in 24D.
- 🏆 **Honeycomb conjecture (Hales 1999)** — hexagons divide the plane with the least wall.
- 🔷 **Space-filling solids** — cube, truncated octahedron, rhombic dodecahedron.
- 🔷 **Gömböc (2006)** — a uniform solid that always rights itself.
- 🔷 **Reuleaux triangle** — constant width: rollers, coins, drills for square holes.
- 🏆 **Barbier & Blaschke–Lebesgue** — perimeter = π × width; the Reuleaux triangle has the least area.
- 🔷 **Sphericon & oloid** — shapes that roll with every surface point touching the floor.
- 🔷 **Buckyball** — truncated icosahedron = soccer ball = C₆₀ (Nobel 1996).
- 🔷 **Szilassi & Császár polyhedra** — every face touches every other / every vertex joins every other.

### 6.3 Non-Euclidean geometry

- 📜 **The parallel postulate saga** — Saccheri, Gauss, Bolyai, Lobachevsky.
- 🔷 **Hyperbolic plane** — triangles sum to less than 180°; infinitely many parallels.
- 🔷 **Models of the hyperbolic plane** — Poincaré disk, upper half-plane, Klein disk, hyperboloid.
- 🔷 **Escher's Circle Limit** — hyperbolic tessellations as art.
- 🔷 **Crocheted hyperbolic planes** — Daina Taimiņa (1997); coral and kale grow them naturally.
- 🏆 **Spherical excess (Girard)** — a triangle's angle surplus equals its area; three right angles on a sphere.
- 🔷 **Great-circle routes** — why flights to Asia pass over the Arctic.
- ⚡ **Map projections** — every flat map lies (Greenland vs Africa on Mercator).
- 🔷 **Pseudosphere** — a surface of constant negative curvature (Beltrami).
- 🏆 **Hilbert's theorem (1901)** — no complete hyperbolic plane fits smoothly in 3D space.
- 🔷 **Taxicab geometry** — where circles are squares.
- 🏆 **Klein's Erlangen program (1872)** — a geometry is defined by its symmetry group.
- 🔷 **Ideal triangles** — vertices at infinity, area exactly π.
- 🧩 **HyperRogue** — games set in hyperbolic space.

### 6.4 Projective geometry

- 📜 **Perspective drawing** — Brunelleschi, Alberti, Dürer and vanishing points.
- 🔷 **Points at infinity** — parallel lines meet.
- 🏆 **Desargues' & Pappus's theorems** — miracles of lines and points.
- 🔷 **Duality** — swap points and lines, get a free theorem.
- 🔷 **Fano plane** — 7 points and 7 lines: the smallest projective plane.
- 🧩 **Dobble / Spot It!** — a card game built on a finite projective plane.
- 🔷 **Cross-ratio** — the one number perspective preserves.
- ⚡ **All conics are one** — projectively, ellipse = parabola = hyperbola.
- 🏆 **No projective plane of order 10 (Lam 1989)** — settled by a massive computer search.

### 6.5 Tilings & discrete geometry

- 🔷 **Regular & Archimedean tilings** — 3 regular, 8 semi-regular.
- 📜 **The 15 pentagon tilings** — amateur Marjorie Rice found four; the list was completed in 2015 and proved complete in 2017.
- 🔷 **Penrose tilings** — never repeating, five-fold symmetric; cousins of quasicrystals (Nobel 2011).
- 🔷📜 **The hat & the spectre (2023)** — single tiles that tile only non-periodically.
- 👾 **Wang tiles** — tiling is undecidable (see 1.4).
- 🔷 **Rep-tiles** — shapes built from smaller copies of themselves.
- 🏆 **Sylvester–Gallai theorem** — non-collinear points always give a line through exactly two of them.
- 📜 **Happy ending problem** — 5 points force a convex quadrilateral; the people who solved it married.
- ❓ **Chromatic number of the plane** — 5, 6 or 7? (at least 5: de Grey, 2018).
- 🏆 **Art gallery theorem** — ⌊ n/3 ⌋ guards suffice; Fisk's three-coloring proof.
- 👾 **Unilluminable rooms** — mirrored rooms with dark spots (Penrose 1958; Tokarsky 1995).
- 🧩 **Moving sofa problem** — the largest sofa around a corner; a proof that Gerver's sofa is optimal was announced in 2024 (Baek).
- 🔷 **Circle & square packings** — the strangely tilted best packing of 17 squares.
- 🏆 **Minkowski's theorem** — large symmetric convex shapes must contain lattice points.
- 🏆 **Helly, Radon & Carathéodory** — the combinatorics of convex sets.
- 👾 **Borsuk's conjecture** — false in high dimensions (Kahn–Kalai 1993).
- 🏆 **Keller's conjecture** — settled in dimension 7 by a SAT solver (2020).
- 🔷 **Voronoi diagrams** — nearest-neighbor maps (John Snow's cholera map).
- 🏆 **Fold-and-cut theorem** — any polygon can be cut out with one straight cut after folding.
- 🔷 **Origami axioms & the Miura fold** — folding math for satellites and solar panels.
- ⚡ **The paper-folding limit** — folded in half 12 times (Gallivan, 2002).
- 🏆 **Erdős distinct distances (Guth–Katz 2010)** — n points determine at least about n / log n distances.

## 7. Topology


### 7.1 Rubber-sheet intuition & surfaces

- ⚡ **Coffee mug = donut** — one hole each; topology ignores bending and stretching.
- 🧩 **Topology of the alphabet** — which letters are the same shape?
- 🔷 **Möbius strip** — one side, one edge; cutting it gives surprises.
- 🔷 **Klein bottle** — no inside or outside; can't sit in 3D without crossing itself.
- 🔷 **Projective plane** — Boy's surface (1901), the cross-cap, the Roman surface.
- 🔷 **Torus** — the world of Pac-Man and Asteroids.
- 🏆 **Classification of surfaces** — every closed surface is a sphere with handles or cross-caps.
- 🏆 **Euler characteristic** — V − E + F = 2 − 2g.
- 📜 **Seven Bridges of Königsberg (1736)** — the birth of topology and graph theory (see 10).
- ⚡ **Jordan curve theorem** — an "obvious" inside and outside, surprisingly hard to prove.
- 👾 **Alexander horned sphere (1924)** — a wild sphere whose outside isn't like a ball's outside.
- ⚡ **Sphere eversion** — turn a sphere inside out without creasing it (Smale 1957; the film Outside In).
- 🧩 **Vest-without-jacket trick** — remove your vest without removing your jacket.
- 🔷 **Borromean rings** — three rings linked together, though no two are linked.

### 7.2 Fixed points & existence theorems

- 🏆 **Brouwer fixed-point theorem** — stir your coffee and some point ends where it began.
- 🏆 **Hairy ball theorem** — you can't comb a coconut flat; somewhere on Earth there's no wind.
- 🏆 **Borsuk–Ulam theorem** — two opposite points on Earth share temperature and pressure.
- 🏆 **Ham sandwich theorem** — one cut halves the bread, the ham and the cheese.
- 🧩 **Necklace splitting** — two thieves need at most k cuts for k kinds of jewel.
- 🏆 **Poincaré–Hopf theorem** — a vector field's zeros add up to the Euler characteristic.
- 🏆 **Lefschetz fixed-point theorem** — counting fixed points with algebra.
- ❓ **Inscribed square problem (1911)** — does every closed curve contain a square? Rectangles of every shape: yes, for smooth curves (Greene– Lobb 2020).

### 7.3 Point-set topology & its monsters

- 🔷 **Open sets** — defining "nearness" without distance.
- 👾 **Topologist's sine curve** — connected but not path-connected.
- 👾 **Lakes of Wada** — three regions sharing one common boundary.
- 👾 **Hawaiian earring** — infinitely many shrinking loops through one point.
- 👾 **Long line & Warsaw circle** — spaces that break intuition.
- ⚡ **Ultrametric worlds** — in p-adic distance every triangle is isosceles.
- 🔷 **Compactness** — the next best thing to being finite.
- 🏆 **Invariance of dimension (Brouwer)** — space- filling curves exist, yet ℝ ² and ℝ ³ are not the same space.
- 🏆 **Tychonoff's theorem** — equivalent to the axiom of choice.

### 7.4 Algebraic topology

- 🔷 **Fundamental group** — loops detect holes; the circle's is ℤ .
- ⚡ **Dirac's belt trick** — a 720° turn is undoable but 360° isn't: why electrons are spin-½.
- 🔷 **Homology & Betti numbers** — counting holes in every dimension.
- 🔷 **Hopf fibration** — the 3-sphere woven from linked circles.
- ⚡ **Homotopy groups of spheres** — spheres wrap around lower spheres in chaotic, still- unfinished ways.
- 🔷 **Covering spaces** — the spiral staircase above the circle.
- 🔷 **Persistent homology** — the shape of data (see 13).
- 🔷 **Homotopy type theory** — topology as a new foundation for mathematics (Voevodsky).

### 7.5 Manifolds & low dimensions

- 🔷 **Manifolds** — spaces that look flat up close, like Earth.
- 🏆📜 **Poincaré conjecture** — proved by Perelman (2002–03), who declined the Fields Medal and the $1M prize.
- 🏆 **Thurston's geometrization** — eight geometries build every 3-manifold.
- 🔷 **Poincaré dodecahedral space** — once proposed as the shape of the universe.
- ⚡ **Exotic spheres** — Milnor (1956) found 7- spheres that are topologically but not smoothly standard; there are 28.
- ⚡ **Exotic ℝ ⁴** — only in dimension 4 does flat space have uncountably many smooth versions.
- ❓ **Smooth 4D Poincaré conjecture** — still open.
- 🏆 **Mostow rigidity** — a hyperbolic 3-manifold's geometry is fixed by its topology.

### 7.6 Knot theory

- 🔷 **Unknot, trefoil, figure-eight** — the first knots; left and right trefoils are different.
- 🔷 **Reidemeister moves** — three moves generate every deformation of a knot diagram.
- 🧩 **Tricolorability** — the simplest proof that the trefoil is really knotted.
- 🏆 **Knot invariants** — Alexander (1928), Jones (1984; Fields 1990), Khovanov homology.
- 📜 **Kelvin's vortex atoms** — knots were once thought to be atoms, which inspired the first knot tables.
- 📜 **Perko pair (1974)** — two "different" knots listed for 75 years turned out to be the same.
- 📜 **Conway knot** — a 50-year problem solved by graduate student Lisa Piccirillo (2020).
- 🔷 **Seifert surfaces** — every knot bounds an orientable surface.
- ⚡ **Every knot unties in 4D.**
- 🔷 **Braid groups** — braids have an algebra (Artin).
- 🔷 **Linking number** — Gauss's integral, born from astronomy.
- 🔷 **DNA knots** — enzymes that cut and rejoin strands.
- ⚡ **Why earbuds tangle** — an experiment on spontaneous knotting (2007).
- 🏆 **Unknot recognition** — decidable (Haken) and in NP (Hass–Lagarias–Pippenger).
- 🏆 **Fáry–Milnor theorem** — a knotted loop must bend more than 4π in total (Milnor, as an undergraduate).

## 8. Differential Geometry


### 8.1 Curves

- 🔷 **Curvature** — 1 / radius of the best-fitting circle.
- 🔷 **Frenet frame & torsion** — the helix; DNA.
- 🔷 **Euler spiral (clothoid)** — curvature grows steadily: railways, highways, loop-the-loops.
- 🏆 **Four vertex theorem** — every simple closed curve has at least four curvature extremes.
- 🔷 **Cycloid, involutes & evolutes** — gear teeth and pendulum clocks.
- 🔷 **Logarithmic spiral** — equiangular; Jacob Bernoulli's tombstone got the wrong spiral.
- 🔷 **Tractrix** — the dog-on-a-leash curve.
- 🧩 **Which way did the bicycle go?** — reading direction from tire tracks.
- 🏆 **Whitney–Graustein theorem** — closed curves classified by turning number.
- 🏆 **Curve-shortening flow** — every simple closed curve rounds out and shrinks to a point.
- 🔷 **Bézier curves & splines** — born in car design (Citroën, Renault).

### 8.2 Surfaces

- 🔷 **Gaussian curvature** — sphere (+), cylinder (0), saddle (−).
- 🏆 **Theorema Egregium (1827)** — curvature is intrinsic: the pizza-slice fold, the orange-peel problem.
- 🏆 **Gauss–Bonnet theorem** — total curvature = 2π × Euler characteristic.
- 🔷 **Geodesics** — shortest paths; unroll a cone to find them.
- 🧩 **The spider and the fly (Dudeney)** — the shortest path across a box.
- 🔷 **Minimal surfaces** — catenoid and helicoid (which bend into each other), Scherk, Enneper.
- 📜 **Costa's surface (1982)** — a new minimal surface after centuries of searching.
- 🔷 **Gyroid** — a triply periodic minimal surface found in butterfly wings.
- 👾 **Wente torus (1986)** — a constant-mean- curvature torus: not every closed bubble shape is round.
- 🏆 **Willmore conjecture** — the Clifford torus bends least (Marques–Neves 2012).
- 🔷 **Ruled & developable surfaces** — hyperboloid cooling towers, Shukhov towers, Gehry's curves.
- 🔷 **Crumpled flat torus** — a flat donut embedded in 3D via fractal corrugations (2012).

### 8.3 Riemannian geometry, Lie groups & connections

- 🔷 **Manifolds & atlases** — charts, literally.
- 🔷 **Parallel transport & holonomy** — carry an arrow around a sphere and it comes back rotated.
- 🔷 **Foucault pendulum** — holonomy you can watch.
- 🔷 **Falling cat problem** — cats turn over with zero angular momentum.
- 🔷 **Parallel parking** — a Lie bracket: two moves combine into a sideways move.
- 🏆 **Ricci flow** — Hamilton's heat flow for shapes; Perelman's tool.
- 🏆 **Uniformization theorem** — every surface is spherical, flat or hyperbolic.
- 🏆 **Nash embedding theorem** — every Riemannian manifold fits isometrically in some ℝ ⁿ.
- 🏆 **Atiyah–Singer index theorem** — analysis equals topology.
- 🔷 **Lie groups** — SO(3), SU(2), U(1): continuous symmetry.
- 🔷 **Fiber bundles & gauge theory** — the geometry of forces; Yang–Mills.
- 🔷 **Calabi–Yau manifolds** — the extra dimensions of string theory.
- ⚡ **Symplectic camel** — Gromov's non- squeezing: a phase-space ball won't pass through a smaller hole.
- 🏆 **Sphere theorem** — a quarter-pinched manifold is a sphere (smooth version 2007).

### 8.4 Spacetime geometry

- 🔷 **Minkowski spacetime** — geometry where the straight path ages the most.
- ⚡ **Twin paradox** — the reverse triangle inequality.
- 🔷 **General relativity** — gravity is curvature; free fall follows geodesics.
- 🔷 **GPS** — clocks would drift about 38 μs a day without relativity.
- 🔷 **Black holes, wormholes & Penrose diagrams** — infinity on a page.
- 🏆 **Penrose singularity theorem (1965)** — geometry forces singularities (Nobel 2020).

## 9. Combinatorics


### 9.1 Counting

- 🔷 **Permutations, combinations, stars and bars** — the counting toolkit.
- ⚡ **52! orderings** — every well-shuffled deck is almost surely unique in history.
- 🏆 **Seven riffle shuffles suffice (1992)** — Bayer– Diaconis.
- 🔷 **Perfect (faro) shuffles** — 8 out-shuffles restore a 52-card deck.
- ⚡ **Derangements** — the hat-check problem: the chance nobody gets their own hat → 1/e.
- 🔷 **Catalan numbers** — brackets, mountain paths, triangulations, binary trees (200+ interpretations).
- 🔷 **Stirling & Bell numbers** — counting the ways to split a set.
- 🏆 **Euler's partition theorem** — partitions into odd parts = partitions into distinct parts.
- 🔷 **Generating functions** — a sequence hung on a clothesline of powers of x.
- 🏆 **Cayley's formula** — nⁿ⁻² labeled trees; Prüfer codes.
- 🔷 **Domino tilings** — the chessboard has 12,988,816.
- ⚡ **Arctic circle theorem** — random domino tilings of an Aztec diamond freeze outside a circle.
- 🔷 **de Bruijn sequences** — the shortest string containing every PIN.
- 🔷 **Gray codes** — change one bit at a time (and solve the Chinese rings puzzle).
- 🔷 **Young tableaux & RSK** — longest increasing subsequences and the Tracy–Widom law.
- 🏆 **Sperner's lemma** — a combinatorial Brouwer; fair rent division.
- 🔷 **Polyominoes** — the 12 pentominoes and Tetris.

### 9.2 Designs & Latin squares

- 🔷 **Sudoku** — 6,670,903,752,021,072,936,960 grids; 17 clues is the minimum (2012).
- 🔷 **Magic squares** — Lo Shu, and Dürer's 1514 square in Melencolia I.
- ❓ **3×3 magic square of squares** — does one exist?
- 📜 **Euler's 36 officers** — impossible (Tarry 1901); Euler's wider guess was killed in 1959; a quantum solution exists (2022).
- 🧩 **Kirkman's schoolgirls (1850)** — Steiner triple systems.
- 🔷 **Steiner system S(5,8,24)** — tied to the Golay code and the Mathieu groups.
- 🏆 **Existence of designs (Keevash 2014)** — a century-old question settled.

### 9.3 Ramsey theory & additive combinatorics

- 🏆 **Ramsey's theorem** — complete disorder is impossible.
- 🧩 **Party problem** — R(3,3) = 6; R(4,4) = 18; 43 ≤ R(5,5) ≤ 46 (2024).
- 📜 **Erdős's aliens** — for R(5,5), marshal every computer; for R(6,6), attack the aliens.
- 🏆 **Van der Waerden's theorem** — color the integers and a monochromatic progression appears.
- 🏆 **Schur's theorem** — a monochromatic x + y = z.
- 🧩 **Boolean Pythagorean triples (2016)** — a 200-terabyte proof.
- 🏆 **Hales–Jewett theorem** — high-dimensional tic-tac-toe can't end in a draw.
- 🔷 **Graham's number** — from a Ramsey problem; once Guinness's largest number used in a proof.
- 🔷 **TREE(3)** — makes Graham's number look tiny (Kruskal's tree theorem).
- 🏆 **Szemerédi's theorem** — dense sets contain long progressions.
- 🧩 **Cap sets & SET** — the most cards with no SET (2016 breakthrough).
- 🏆 **Erdős discrepancy problem (Tao 2015).**
- ❓ **Erdős progressions conjecture** — do divergent reciprocal sums force long progressions?
- 🏆 **Sensitivity conjecture (Huang 2019)** — a famous two-page proof.
- ❓ **Frankl's union-closed sets conjecture** — big progress in 2022.

## 10. Graph Theory & Networks

- 📜 **Seven Bridges of Königsberg (1736)** — Euler paths.
- 🏆 **Handshake lemma** — the number of people with an odd number of handshakes is even.
- 🧩 **Icosian game & knight's tour** — Hamiltonian cycles.
- 🏆📜 **Four color theorem** — asked 1852, Kempe's false proof, Appel–Haken's computer proof (1976).
- 🏆 **Seven colors on a torus** — Heawood's map theorem.
- 🧩 **Three utilities problem** — impossible on paper, possible on a coffee mug.
- 🏆 **Kuratowski's theorem** — planar iff there is no K₅ or K₃,₃ inside.
- 🔷 **Petersen graph** — the universal counterexample.
- 🏆 **Friendship theorem** — if every pair has exactly one mutual friend, someone knows everyone.
- ⚡ **Friendship paradox** — on average, your friends have more friends than you.
- 🔷 **Six degrees & small worlds** — Milgram (1967), Watts–Strogatz (1998), Erdős numbers.
- 🔷 **Scale-free networks** — hubs from preferential attachment.
- ⚡ **Random-graph phase transition** — a giant component appears suddenly.
- 🔷 **Shortest paths** — Dijkstra inside every GPS.
- 🔷 **Minimum spanning trees** — Borůvka's 1926 Moravian power grid.
- 🏆 **Max-flow min-cut** — born from Cold War rail-network studies.
- 🏆 **Hall's marriage theorem** — when a perfect matching exists.
- 🏆 **Stable marriage (Gale–Shapley 1962)** — the medical residency match; Nobel 2012.
- 🔷 **Graph coloring** — exam scheduling and Sudoku.
- 🏆 **Mantel & Turán** — the most edges possible without a triangle.
- 🏆 **Matrix-tree theorem** — count spanning trees with a determinant.
- 🔷 **Expander graphs** — sparse yet super- connected.
- 🏆 **Graph minor theorem** — every minor-closed family has a finite list of forbidden minors.
- 🏆 **Graph isomorphism in quasi-polynomial time (Babai 2015).**
- 🏆 **Kneser graphs (Lovász 1978)** — topology proves a coloring fact.
- 📜 **Turán's brick factory** — crossing numbers born in a WWII labor camp.
- ❓ **Reconstruction conjecture** — is a graph determined by its vertex-deleted pieces?
- ❓ **Graceful tree & Hadwiger conjectures.**
- ⚡ **Braess's paradox** — adding a road can slow everyone down (see 18).

## 11. Puzzles & Recreational Games

- 🧩 **Nim** — XOR wins it; Sprague–Grundy: every impartial game is Nim in disguise.
- 🧩 **Chomp** — the first player wins by strategy- stealing, but no one knows how.
- 🧩 **Hex** — can't end in a draw (equivalent to Brouwer's theorem); the first player wins.
- 🧩 **Tic-tac-toe** — 255,168 possible games; perfect play draws.
- 🧩 **Solved games** — Connect Four (1988), checkers (2007).
- 🧩 **Chess** — Zermelo's theorem; ~10¹²⁰ possible games; eight queens (92 solutions).
- 🧩 **Wheat and chessboard** — 2⁶⁴ − 1 grains.
- 🧩 **Go** — about 2 × 10¹⁷⁰ legal positions; AlphaGo (2016).
- 🔷 **Conway's surreal games** — Hackenbush and Winning Ways.
- 🧩 **Dots and boxes** — a hidden parity strategy.
- ⚡ **Conway's soldiers** — no army reaches row five (a golden-ratio proof).
- 🧩 **Peg solitaire** — invariants decide what's possible.
- 🧩 **Tower of Hanoi** — 2ⁿ − 1 moves; hides the Sierpiński triangle.
- 🧩 **Josephus problem** — who survives the circle? A binary trick answers.
- ⚡ **100 prisoners and 100 drawers** — following cycles gives ~31% success instead of ~10⁻³⁰.
- 🧩 **100 prisoners and a light bulb** — building a protocol from almost nothing.
- 🧩 **Hat puzzles** — solved with Hamming codes (see 17).
- 🧩 **12 coins, 3 weighings** — information theory on a balance.
- 🧩 **River crossings** — wolf, goat and cabbage as a state graph.
- 🧩 **Pirate game** — backward induction splits the gold.
- 🧩 **Kruskal count** — a card trick powered by coupling.
- 🧩 **Fitch Cheney's five-card trick** — encode a hidden card using four others.
- 🧩 **Gilbreath principle** — shuffles that preserve hidden order.
- ⚡ **Games are hard** — Minesweeper is NP- complete; Tetris and Lemmings are hard too.
- 📜 **The puzzle masters** — Sam Loyd, Henry Dudeney, Martin Gardner.

## 12. Probability

- 📜 **Pascal–Fermat letters (1654)** — the unfinished game that birthed probability.
- ⚡ **Birthday paradox** — 23 people give a 50% chance of a shared birthday.
- ⚡📜 **Monty Hall problem** — switch! (the 1990 vos Savant storm; even Erdős doubted).
- ⚡ **Boy-or-girl & the Tuesday boy** — 1/3, 1/2… and 13/27.
- ⚡ **Bertrand's box & the three prisoners** — conditional-probability traps.
- ⚡ **Bertrand's chord paradox** — a "random" chord: 1/2, 1/3 or 1/4?
- ⚡ **Sleeping Beauty problem** — halfers vs thirders.
- ⚡ **St. Petersburg paradox** — an infinite expected value few would pay $20 for.
- ⚡ **Two envelopes** — always switch? That can't be right.
- ⚡ **Gambler's fallacy vs the law of large numbers.**
- 🏆 **Central limit theorem** — the Galton board makes a bell curve.
- 🏆 **Pólya's random walk (1921)** — a drunk man finds his way home; a drunk bird may not.
- 🔷 **Poisson distribution** — deaths by horse kicks in the Prussian cavalry (1898).
- 🔷 **Buffon's needle** — drop needles to estimate π.
- 🔷 **Monte Carlo methods** — randomness as a calculator (Manhattan Project).
- 🔷 **Coupon collector** — why the last sticker takes forever.
- 🏆 **Secretary problem** — skip the first ~37% (1/e), then take the best so far.
- ⚡ **Random numbers past 1** — it takes e uniform picks, on average, to sum past 1.
- ⚡ **Broken stick** — the pieces form a triangle with probability 1/4.
- ⚡ **Penney's game** — every coin pattern can be beaten by another.
- ⚡ **Nontransitive dice** — A beats B beats C beats A.
- ⚡ **Parrondo's paradox** — two losing games combine into a winning one.
- ⚡ **Benford's law** — about 30% of real-world numbers start with 1 (fraud detection).
- ⚡ **Inspection paradox** — buses and class sizes seem worse than average.
- 🏆 **Bayes' theorem** — the positive test that probably means you're healthy.
- 📜 **Prosecutor's fallacy** — the Sally Clark case (1999).
- ⚡ **Borel–Kolmogorov paradox** — conditioning on zero-probability events.
- 🔷 **Infinite monkey theorem** — Shakespeare, eventually.
- 🏆 **Kolmogorov's axioms (1933)** — probability built on measure theory.
- 🔷 **Markov chains** — Snakes and Ladders, Monopoly's jail, text prediction.
- 🔷 **Brownian motion** — Einstein (1905); paths continuous but nowhere smooth.
- 🔷 **Martingales** — why doubling your bet can't beat the casino.
- 🔷 **Percolation** — critical thresholds; Kesten's p = 1/2.
- 🔷 **SLE** — random fractal curves (Fields Medals 2006, 2010).
- 🔷 **Random matrices** — Wigner's semicircle law.
- 🏆 **Probabilistic method** — prove something exists by showing a random attempt works.
- 🔷 **Branching processes** — why surnames die out.
- 🔷 **Pólya's urn** — rich-get-richer with a random limit.
- 📜 **Gaussian correlation inequality (2014)** — a retired statistician's overlooked proof.
- 🔷 **Von Neumann's fair coin** — a fair flip from a biased coin.
- 🔷 **Kelly criterion** — how much to bet (Thorp and blackjack).

## 13. Statistics — Frequentist & Bayesian


### 13.1 Seeing data

- 🔷 **Mean vs median** — a billionaire walks into a bar.
- ⚡ **Anscombe's quartet & the Datasaurus** — identical statistics, completely different pictures.
- ⚡ **Simpson's paradox** — Berkeley admissions, kidney-stone treatments.
- ⚡ **Correlation ≠ causation** — spurious correlations.
- ⚡ **Berkson's paradox** — selection creates fake negative correlations.
- ⚡ **Regression to the mean** — the Sports Illustrated cover jinx; Galton's heights.
- ⚡ **Survivorship bias** — Wald's WWII bombers.
- ⚡ **Small samples, extreme rates** — the highest and lowest disease rates both come from small counties.
- 📜 **Nightingale's rose, Minard's march, Snow's map** — graphics that changed minds.

### 13.2 Frequentist inference

- 📜 **The lady tasting tea** — Fisher's birth of experimental design.
- 📜 **Literary Digest poll (1936)** — a huge sample, badly chosen.
- 🔷 **p-values & the replication crisis** — "green jelly beans cause acne" (multiple comparisons).
- 📜 **Student's t** — Gosset of the Guinness brewery (1908).
- 🧩 **German tank problem** — serial numbers beat the spies.
- 🔷 **Capture–recapture** — counting fish you can't see.
- 📜 **Least squares & Ceres (1801)** — Gauss finds a lost dwarf planet.
- 🔷 **Bootstrap (1979)** — resample your own data to learn its uncertainty.
- ⚡ **Stein's paradox** — in 3+ dimensions, shrinking your estimates beats the obvious ones.
- 🔷 **Overfitting & the bias–variance trade-off** — why perfect fits predict badly.
- 🔷 **Randomized controlled trials** — from Lind's scurvy test (1747) to vaccines.
- 🔷 **Galton's ox (1906)** — the wisdom of crowds.

### 13.3 Bayesian thinking

- 📜 **Bayes & Price (1763)** — published after Bayes' death.
- ⚡ **Base-rate fallacy** — the mammogram puzzle; natural frequencies fix it.
- 🔷 **Prior → likelihood → posterior** — watch a Beta curve learn from coin flips.
- 🔷 **Laplace's sunrise problem** — the rule of succession.
- 📜 **Bayesian search** — the Palomares H-bomb (1966), USS Scorpion (1968), Air France 447 (2011).
- 📜 **Turing's Banburismus** — Bayesian "bans" helped crack Enigma.
- 🔷 **Good–Turing estimation** — the probability of what you haven't seen yet.
- 🔷 **Spam filters** — naive Bayes (Graham 2002).
- 🔷 **Kalman filter** — Bayesian tracking that helped guide Apollo.
- 🔷 **MCMC** — Metropolis (1953): sampling from impossible distributions.
- 🔷 **Hierarchical models & shrinkage** — borrowing strength across groups.
- ⚡ **Lindley's paradox** — Bayesian and frequentist verdicts disagree.
- 🔷 **Causal diagrams (Pearl)** — confounders and the do-calculus.
- 🔷 **Cromwell's rule** — never assign probability 0 or 1.
- ⚡ **The hot hand, revisited** — a 2018 twist on a famous "fallacy."
- 🔷 **Zipf's law & power laws** — word frequencies and city sizes.
- 🔷 **Topological data analysis** — persistent homology finds shape in data.

## 14. Differential Equations


### 14.1 Ordinary differential equations

- 🔷 **Exponential growth & decay** — carbon dating; Newton's law of cooling in forensics.
- 🔷 **Logistic growth** — S-curves and carrying capacity.
- 🔷 **Lotka–Volterra** — lynx and hare cycles (Hudson's Bay fur records).
- 🔷 **SIR epidemic model** — R₀, the herd- immunity threshold 1 − 1/R₀, flattening the curve.
- 🔷 **Harmonic oscillator & resonance** — springs, swings, bridges.
- 📜 **Tacoma Narrows (1940)** — not simple resonance but flutter; the Millennium Bridge wobble (2000).
- ⚡ **Pendulum period** — "independent of amplitude" is only approximately true.
- 🏆 **Three-body problem** — no general formula; the figure-eight orbit (1993, proved 2000).
- ⚡ **Norton's dome** — Newtonian physics that isn't deterministic.
- 🔷 **Phase portraits & limit cycles** — the van der Pol heartbeat oscillator.
- ❓ **Hilbert's 16th problem** — how many limit cycles can a polynomial system have?
- 🔷 **Tsiolkovsky rocket equation** — why rockets are mostly fuel.
- 🔷 **Hodgkin–Huxley model** — the equations of a nerve impulse.
- 🔷 **Belousov–Zhabotinsky reaction** — a chemical clock.
- 🔷 **Kuramoto model** — fireflies and metronomes fall into sync.

### 14.2 Partial differential equations

- 🔷 **Heat equation** — Fourier invented his series to solve it.
- 🔷 **Wave equation** — vibrating strings and d'Alembert's solution.
- ⚡ **Huygens' principle holds only in odd dimensions** — in a 2D world, every sound would echo on.
- 🔷 **Laplace's equation** — harmonic functions, steady states, mean-value magic.
- 🔷 **Schrödinger equation** — waves of probability.
- ❓ **Navier–Stokes** — Millennium problem: do smooth fluid flows stay smooth?
- 🔷 **Maxwell's equations** — they predicted light as an electromagnetic wave (1865).
- ⚡ **Black–Scholes is the heat equation** — in disguise.
- 🔷📜 **Solitons** — John Scott Russell chased one on horseback (1834); the KdV equation.
- 🔷 **Turing patterns (1952)** — leopard spots; a spotted animal can have a striped tail, not the reverse.
- 🔷 **Traffic waves** — phantom jams as shock waves.
- 🔷📜 **Chladni figures** — sand on vibrating plates; Sophie Germain's prize (1816).
- ⚡ **Can you hear the shape of a drum?** — no (1992).
- ⚡ **Kelvin wake** — every duck and ship leaves the same ~39° wake.
- ⚡ **d'Alembert's paradox** — an ideal fluid produces no drag.
- 🔷 **Random walks solve Laplace's equation** — probability computes harmonic functions.
- 🔷 **Finite element method** — PDEs for bridges, cars and aircraft.

## 15. Dynamical Systems, Chaos & Fractals


### 15.1 Chaos

- 🔷 **Logistic map** — period doubling into chaos.
- 🏆 **Feigenbaum constant δ ≈ 4.669** — the same for every such cascade.
- 🏆 **Period three implies chaos (1975)** — and Sharkovskii's strange ordering of periods.
- 🔷📜 **Lorenz attractor** — the butterfly effect, found by rounding a number (1961).
- 🔷 **Double pendulum** — chaos on your desk.
- 📜 **Poincaré's prize-winning error (1889)** — fixing it revealed chaos.
- 🏆 **KAM theorem** — why the solar system mostly holds together; Kirkwood gaps in the asteroid belt.
- 🏆 **Poincaré recurrence** — a gas eventually returns arbitrarily close to its starting state.
- 🔷 **Arnold's cat map** — an image scrambled, then restored.
- 🔷 **Smale horseshoe** — the geometry of stretching and folding.
- 🔷 **Mathematical billiards** — ellipses, stadiums (chaotic), Sinai billiards.
- ❓ **Periodic billiards in obtuse triangles** — proved only for angles up to 100°.
- 🏆 **The Lorenz attractor exists (Tucker 2002)** — Smale's 14th problem.
- 🔷 **Synchronization** — Huygens' pendulum clocks (1665).
- 🔷 **Catastrophe theory** — sudden jumps (Zeeman's catastrophe machine).
- 🔷 **Dottie number** — press cos over and over: 0.739085…
- 🔷 **Sandpiles & self-organized criticality** — avalanches of every size.
- 🔷 **Hofstadter's butterfly** — a fractal energy spectrum.

### 15.2 Cellular automata

- 🔷 **Game of Life (1970)** — gliders, guns, Turing completeness, Life simulating Life.
- 🔷 **Rule 30 & Rule 110** — randomness and universality from one-line rules.
- ❓ **Langton's ant** — chaos, then a "highway" after ~10,000 steps; always?

### 15.3 Fractals

- 🔷 **Koch snowflake** — infinite perimeter, finite area (Gabriel's horn's 2D cousin).
- 🔷 **Sierpiński triangle & carpet** — the chaos game draws them from random dots.
- 🔷 **Menger sponge** — zero volume, infinite surface area.
- ⚡ **Coastline paradox (1967)** — Britain's coast has no fixed length.
- 🔷 **Fractal dimension** — Koch ≈ 1.26, Sierpiński ≈ 1.585.
- 🔷 **Mandelbrot set** — z² + c; connected; its boundary has dimension 2.
- ⚡ **π in the Mandelbrot set** — iteration counts at its "neck" converge to π.
- ❓ **MLC conjecture** — is the Mandelbrot set locally connected?
- 🔷 **Julia sets** — connected exactly when c lies in the Mandelbrot set.
- 🔷 **Newton fractals** — which root will Newton's method find?
- 🔷 **Barnsley fern** — four affine maps, one fern.
- 🔷 **Dragon curve** — from paper folding (the chapter pages of Jurassic Park).
- 🔷 **Fractals in nature** — Romanesco, lungs, lightning, river networks.
- 🔷 **Fractal antennas** — inside phones.

## 16. Computation — Algorithms & Complexity

- ❓🏆 **P vs NP** — easy to check vs easy to solve; a $1M Millennium problem.
- 🏆 **Cook–Levin (1971) & Karp's 21 problems** — NP-completeness.
- 🧩 **Traveling salesman** — NP-hard, yet enormous instances are solved exactly.
- 🧩 **Knapsack, Sudoku, Minesweeper** — hardness in everyday puzzles.
- 🔷 **Sorting & the n log n barrier** — the comparison lower bound.
- 🏆 **Karatsuba (1960)** — beat schoolbook multiplication, which Kolmogorov thought optimal; n log n reached in 2019.
- 📜 **Pancake sorting** — Bill Gates' only research paper (1979).
- 🔷 **Dynamic programming** — Bellman; edit distance and DNA alignment.
- 🔷 **Ackermann function** — computable, but not primitive recursive.
- 🔷 **Finite automata & the Chomsky hierarchy** — what regular expressions can't do.
- 🏆 **Shor's algorithm (1994)** — quantum factoring would break RSA; Grover's √N search.
- 🔷 **Zero-knowledge proofs** — Ali Baba's cave.
- 🏆 **PCP theorem** — proofs checkable by reading a few random bits.
- 🏆 **MIP = RE (2020)*** — quantum complexity refutes Connes' embedding conjecture.
- ⚡ **Undecidable spectral gap (2015)** — a physics question no algorithm can answer.
- ⚡ **Magic: The Gathering is Turing complete (2019).**
- 🏆 **Computer-assisted proofs** — four color, Kepler, Boolean triples, BB(5).
- 🔷 **Proof assistants** — Lean and Coq; the Liquid Tensor Experiment (2022).
- 📜 **AI and mathematics** — AlphaGo (2016); gold- medal-level IMO performances by AI (2025).
- 📜 **Gödel's lost letter (1956)** — P vs NP, foreseen in a letter to von Neumann.

## 17. Information, Coding & Cryptography


### 17.1 Information theory

- 🏆 **Shannon entropy (1948)** — information measured in bits.
- 🔷 **Twenty questions** — binary search as information.
- 📜 **Huffman coding (1952)** — a student's term paper beat his professor's method.
- 🏆 **Noisy-channel coding theorem** — nearly perfect communication through noise.
- 🔷 **Compression** — ZIP, and why random data won't shrink.
- ⚡ **Landauer's principle** — erasing a bit costs energy; Maxwell's demon exorcised.
- 🔷 **Entropy of English** — roughly one bit per letter.

### 17.2 Error-correcting codes

- 🔷 **Check digits** — ISBN and the Luhn algorithm catch typos.
- 📜 **Hamming codes (1950)** — born of weekend computer frustration.
- 🔷 **Reed–Solomon codes** — CDs and QR codes survive scratches (up to ~30% damage).
- 🔷 **Golay code** — Voyager's images; linked to the Leech lattice and M₂₄.
- 🔷 **LDPC & polar codes** — Wi-Fi and 5G.
- 🔷 **Shamir secret sharing** — split a secret with polynomials.

### 17.3 Cryptography

- 🔷 **Caesar & substitution ciphers** — broken by frequency analysis (al-Kindi, 9th century).
- 📜 **Vigenère cipher** — "indecipherable" until Babbage and Kasiski.
- 🏆 **One-time pad** — provably unbreakable; Venona exploited reused pads.
- 📜 **Enigma** — Rejewski's permutation math (1932) and Turing's bombes.
- 🔷 **Diffie–Hellman (1976)** — public key exchange, explained by mixing paint.
- 📜 **RSA (1977)** — GCHQ's Clifford Cocks found it in 1973; secret until 1997.
- 🔷 **Elliptic-curve cryptography** — smaller keys, same security.
- 🔷 **Hash functions & birthday attacks** — Bitcoin's proof-of-work.
- 🔷 **Post-quantum cryptography** — lattice-based schemes standardized by NIST (2024).
- 🧩 **Yao's millionaires' problem** — who is richer, without revealing wealth.
- 🧩 **Mental poker** — dealing cards fairly over the phone.
- 📜 **Zodiac 340 cipher** — cracked in 2020.

## 18. Game Theory & Social Choice

- 🔷 **Prisoner's dilemma** — rational choices, worse outcome.
- 📜 **Axelrod's tournament (1980)** — tit-for-tat wins.
- 🏆 **Nash equilibrium** — and what A Beautiful Mind got wrong.
- 🏆 **Von Neumann's minimax theorem (1928)** — zero-sum games and rock-paper-scissors.
- 🔷 **Chicken, stag hunt, tragedy of the commons** — the classic dilemmas.
- ⚡ **Braess's paradox** — removing a road can speed traffic (Seoul, New York).
- 🔷 **Vickrey auctions** — bid your true value; Nobel 2020 for auction design.
- 🧩 **Fair cake cutting** — "I cut, you choose"; envy- free for any number of people (2016).
- ⚡ **Condorcet paradox** — group preferences can go in circles.
- 🏆 **Arrow's impossibility theorem (1951)** — no perfect ranked voting system exists.
- 🏆 **Gibbard–Satterthwaite theorem** — every reasonable voting system can be gamed.
- 🔷 **Voting methods** — plurality, Borda, runoff, approval; the spoiler effect.
- 🔷 **Gerrymandering math** — measuring unfair maps.
- ⚡ **Alabama paradox (1880)** — more total seats, fewer for Alabama; the Balinski–Young impossibility theorem.
- 🔷 **Shapley value** — fair credit in coalitions; voting power indices.
- 🔷 **Evolutionary game theory** — hawk–dove; rock-paper-scissors lizards.
- 🧩 **Keynesian beauty contest** — guess 2/3 of the average guess.
- 🧩 **Dollar auction** — bidding $1.50 for a dollar.
- ⚡ **Truels** — in a three-way duel, the worst shot can fare best.
- 🔷 **Two generals & Byzantine generals** — consensus is hard (blockchains).
- ⚡ **Allais & Ellsberg paradoxes** — people violate expected utility.
- ⚡ **Newcomb's paradox** — one box or two?

## 19. Optimization & Numerical Analysis

- 📜 **Linear programming** — Dantzig solved two open problems he mistook for homework (1939); the simplex method (1947).
- 👾 **Klee–Minty cube** — simplex can take exponential time; smoothed analysis explains why it rarely does.
- 🏆 **LP duality** — every optimization problem has a shadow problem.
- 🔷 **Optimal transport** — Monge (1781), Kantorovich (Nobel 1975), later Fields Medals.
- 🔷 **Gradient descent** — rolling downhill; the engine of deep learning.
- 🔷 **Convexity** — where every local optimum is global.
- 🔷 **Hungarian algorithm** — optimal assignments.
- 🔷 **Queueing theory & Little's law** — Erlang's telephone exchanges; why the other line moves faster.
- 🔷 **Simulated annealing & genetic algorithms** — optimization borrowed from physics and biology.
- 🏆 **Compressed sensing (2006)** — recover sparse signals from few measurements (faster MRI).
- ⚡ **0.1 + 0.2 ≠ 0.3** — floating-point arithmetic.
- 📜 **Numerical disasters** — the Patriot missile (1991), Ariane 5 (1996), the Vancouver Stock Exchange index (1982).
- 📜 **Pentium FDIV bug (1994)** — found while summing twin-prime reciprocals.
- 👾 **Wilkinson's polynomial** — a tiny coefficient change sends the roots flying.
- 👾 **Runge's phenomenon** — interpolation blows up at the edges; Chebyshev nodes fix it.
- 🔷 **Newton's (Heron's) method** — square roots from Babylon to calculators.
- 🔷 **Fast inverse square root** — Quake III's 0x5f3759df.
- 🔷 **CORDIC** — how calculators compute sines.
- ⚡ **BBP formula (1995)** — compute a hex digit of π without the digits before it.
- 🔷 **Computing π** — Archimedes → Machin → Ramanujan → Chudnovsky.

## 20. Mathematical Physics

- 🏆 **Noether's theorem (1918)** — every symmetry gives a conservation law.
- 🔷 **Principle of least action** — nature optimizes.
- 🔷 **Special relativity** — Lorentz transformations; the ladder-in-the-barn paradox.
- 🔷 **Quantum mechanics** — Hilbert spaces, spin and SU(2).
- 🏆 **Bell's theorem** — no local hidden variables (Nobel 2022).
- 🔷 **Ising model** — Onsager's 2D solution (1944); phase transitions.
- 🔷 **Renormalization** — zooming out as a mathematical tool.
- 📜 **S = k log W** — Boltzmann's entropy formula, on his tombstone.
- ⚡ **The unreasonable effectiveness of mathematics** — Wigner (1960).
- 📜 **Dimensional analysis** — G. I. Taylor estimated an atomic bomb's yield from photos.
- 🔷 **Fermi problems** — estimate the number of piano tuners in Chicago.
- ⚡ **Square–cube law** — why giant ants can't exist.
- 🔷 **Topological phases of matter** — quantum Hall integers are topological invariants (Nobel 2016).
- 🔷 **Anyons & braids** — topological quantum computing.
- ❓ **Yang–Mills mass gap** — a Millennium problem.
- 🔷 **Mathematics of string theory** — Calabi–Yau spaces, mirror symmetry, moonshine.

## 21. Mathematics in the World


### 21.1 Life

- 🔷 **Phyllotaxis** — sunflowers use the golden angle (≈137.5°).
- 📜 **Hardy–Weinberg principle (1908)** — an applied result by a mathematician who scorned applications.
- 🔷 **Kleiber's law** — metabolism scales as mass^(3/4).
- 🔷 **Epidemics, Turing patterns, DNA knots** — see 14 and 7.6.

### 21.2 Money

- 🔷 **Compound interest & e** — see 4.1.
- 🔷 **Random walks, Black–Scholes, Kelly betting** — the mathematics of markets.
- 🔷 **Fat tails** — Mandelbrot's cotton prices.

### 21.3 Music

- 🔷 **Pythagorean tuning & the comma** — twelve perfect fifths overshoot seven octaves.
- ⚡ **Why 12 notes?** — the continued fraction of log₂(3/2).
- 🔷 **Equal temperament** — the 12th root of 2.
- 🔷 **Euclidean rhythms** — Euclid's algorithm generates rhythms from around the world.
- 🔷 **Tonnetz** — harmony lives on a torus.
- 🔷 **Bach's crab canon** — plays on a Möbius strip.

### 21.4 Art & architecture

- 🔷 **Perspective, Escher, Dürer, Dalí** — see 6.
- 🔷 **Islamic girih tiles** — medieval near- quasicrystalline patterns (2007 study).
- 🔷 **Gaudí's hanging-chain models** — catenary arches.
- 🔷 **Geodesic domes** — Buckminster Fuller.
- 🔷 **Knitting & crochet** — hyperbolic planes, Klein-bottle hats.

### 21.5 Everyday

- 🔷 **Doomsday rule** — Conway's mental calendar trick.
- 🔷 **Gauss's Easter algorithm** — computing the date of Easter.
- 🔷 **GPS** — trilateration plus relativity.
- 🔷 **PageRank & the Netflix Prize** — eigenvectors and SVD at scale.
- 🔷 **Sports** — tennis scoring amplifies skill; penalty kicks mix strategies; Moneyball.

## Cross-cutting layers


### A. Bridges — ideas that connect
- pillars (gold lines)
- Diagonalization — Cantor → Russell → Gödel → Turing → Tarski, unified by Lawvere's fixed-point theorem.
- Symmetry — Galois, Klein's Erlangen program, wallpaper groups, Noether, particle physics, crystals.
- Invariants — parity (15 puzzle, mutilated chessboard), Euler characteristic, knot invariants, Dehn invariant, Conway's soldiers.
- Fixed points — Brouwer, Banach, Kakutani → Nash equilibrium, Hex, Sperner's lemma, the Y combinator.
- Duality — dual polyhedra, projective duality, LP duality, Fourier/Pontryagin duality, Poincaré duality.
- Local vs global — Gauss–Bonnet, the Hasse principle, analytic continuation, sheaves.
- Linearization — derivatives, tangent spaces, Lie algebras, Newton's method.
- Dictionaries between worlds — Descartes (algebra ↔ geometry), Nullstellensatz, Galois correspondence, Curry–Howard, Langlands.
- Infinity & limits — Zeno → calculus → Cantor → ordinals → large cardinals.
- Classification theorems — Platonic solids, surfaces, wallpaper groups, finite simple groups, ADE.
- Impossibility theorems — √2, the quintic, compass constructions, Gödel, halting, Hilbert's 10th, Arrow.
- Self-similarity & recursion — induction, fractals, recursive algorithms, Tower of Hanoi.
- Curvature — curves, surfaces, spacetime, Ricci flow.
- Randomness as a tool — probabilistic method, Monte Carlo, random walks ↔ harmonic functions, random matrices ↔ zeta zeros.
- Dimension — vector spaces, manifolds, fractal dimension, invariance of domain.
- The golden ratio thread — pentagons, Fibonacci, phyllotaxis, Penrose tilings, Hurwitz's theorem, Conway's soldiers. π everywhere — circles, Basel problem, Gaussian integral, Stirling, Buffon's needle, the Mandelbrot neck. e everywhere — compound interest, derangements, the secretary problem, sums past 1, Stirling.
- Pigeonhole & double counting — hairs, handshakes, Erdős–Szekeres.
- Optimization principles — least action, soap films, Fermat's least time, linear programming, gradient descent.

### B. Disputes (red lines)
- Newton vs Leibniz — who invented calculus.
- Tartaglia vs Cardano — the published-without- permission cubic formula.
- Hobbes vs Wallis — a philosopher's decades- long feud over squaring the circle.
- Berkeley vs the infinitesimals — "ghosts of departed quantities" (1734).
- Gauss vs Bolyai — Gauss said he'd had non- Euclidean geometry first.
- Kronecker vs Cantor — finite integers vs actual infinity.
- Hilbert vs Brouwer — formalism vs intuitionism (the foundations crisis).
- The axiom of choice — accepted only after decades of controversy.
- The four color computer proof — is a computer check a proof? Fisher vs Neyman–Pearson; Bayesians vs frequentists — what counts as evidence? Poincaré conjecture credit — the 2006 priority controversy. abc conjecture — Mochizuki's IUT vs the Scholze–Stix objection.

### C. Open problems — the frontier
- ( 🔥 )
- Millennium Prize Problems (2000): P vs NP · Riemann hypothesis · Yang–Mills mass gap · Navier–Stokes · Hodge conjecture · Birch and Swinnerton-Dyer · (Poincaré — solved).
- Other famous open problems: Collatz · twin primes · Goldbach · odd perfect numbers · is π normal? · is e + π irrational? · chromatic number of the plane · inscribed square · lonely runner conjecture · union-closed sets · Erdős–Straus · Legendre's conjecture · MLC · smooth 4D Poincaré · invariant subspace problem · Hadamard conjecture · graceful tree · reconstruction conjecture · Dürer's unfolding · magic square of squares · perfect cuboid · Hilbert's 16th · Langton's ant · exact value of R(5,5) · Kakeya in higher dimensions · Schanuel's conjecture · Jacobian conjecture · abc (status disputed).

### D. Stories & pioneers timeline ( 📜 )
- c. 1800 BCE — Plimpton 322's Pythagorean triples
- c. 300 BCE — Euclid's Elements
- c. 250 BCE — Archimedes (his lost Method resurfaced in a palimpsest, 1906)
- Han China — Nine Chapters, including elimination methods for linear systems
- 628 — Brahmagupta's rules for zero
- c. 820 — al-Khwarizmi (the words "algorithm" and "algebra")
- c. 1070 — Omar Khayyam solves cubics geometrically
- 1202 — Fibonacci's Liber Abaci brings Hindu– Arabic numerals to Europe
- c. 1400 — Madhava's infinite series (Kerala school)
- 1545 — Cardano's Ars Magna
- 1637 — Descartes' coordinates; Fermat's margin note
- 1654 — Pascal and Fermat found probability
- 1666 / 1684 — Newton's and Leibniz's calculus
- 1683 — Seki Takakazu's determinants; Edo-era sangaku geometry tablets
- 1736 — Euler's Königsberg bridges
- 1796 — Gauss constructs the 17-gon
- 1801 — Gauss recovers Ceres
- 1816 — Sophie Germain's prize on vibrating plates
- 1829 — Lobachevsky's non-Euclidean geometry
- 1832 — Galois dies at 20
- 1843 — Hamilton's quaternions; Lovelace's program
- 1872 — Weierstrass's monster; Klein's Erlangen program
- 1874 / 1891 — Cantor's uncountability and diagonal argument
- 1900 — Hilbert's 23 problems
- 1913 — Ramanujan's letter to Hardy
- 1918 — Noether's theorem
- 1931 — Gödel's incompleteness
- 1935 — the Scottish Book; Bourbaki begins
- 1936 — Turing's machines
- 1948 — Shannon's information theory
- 1976 — the four color theorem by computer
- 1994 — Wiles proves Fermat's Last Theorem
- 2000 — the Millennium Prize Problems
- 2003 — Perelman proves the Poincaré conjecture
- 2014 — Maryam Mirzakhani, first woman awarded the Fields Medal
- 2016 — Viazovska's sphere packings
- 2023 — the hat aperiodic monotile
- 2024 — BB(5) determined

### E. Starter set of playable atoms
- (50)
- Strong interactive potential and good "from scratch" entry points:
- 1. Hilbert's Hotel
- 2. Cantor's diagonal machine
- 3. Zeno & the geometric series
- 4. 0.999… = 1
- 5. Sieve of Eratosthenes & Ulam spiral
- 6. Collatz explorer
- 7. Euclidean algorithm & water jugs
- 8. Pascal's triangle mod n
- 9. Fibonacci & sunflower phyllotaxis
- 10. Pythagorean proof gallery
- 11. Morley's triangle
- 12. Apollonian gasket
- 13. Platonic solid builder
- 14. Tesseract rotator
- 15. Hyperbolic disk tiler
- 16. Möbius strip cutter
- 17. Klein bottle viewer
- 18. Coffee mug ↔ donut morph
- 19. Hairy ball comber
- 20. Knot tricoloring
- 21. Gabriel's horn
- 22. Riemann rearrangement
- 23. Weierstrass function zoom
- 24. Fourier epicycles & Gibbs overshoot
- 25. Taylor series approximator
- 26. Domain-coloring playground
- 27. Mandelbrot & Julia explorer
- 28. Logistic-map bifurcation
- 29. Lorenz attractor
- 30. Double pendulum
- 31. Game of Life
- 32. Koch, Sierpiński & the chaos game
- 33. Birthday paradox simulator
- 34. Monty Hall simulator
- 35. Galton board
- 36. Buffon's needle
- 37. Bayes updater with a Beta prior
- 38. Simpson's paradox slider
- 39. Königsberg & Euler paths
- 40. Four-coloring a map
- 41. Three utilities on a torus
- 42. Nim with XOR hints
- 43. Tower of Hanoi
- 44. 15 puzzle parity
- 45. Rubik's cube group
- 46. Penrose & hat tilers
- 47. Brachistochrone race
- 48. Arctic circle domino tiler
- 49. Caesar & Vigenère cracker
- 50. RSA toy
