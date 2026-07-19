/* ============================================================
   THE WEB OF MATHEMATICS - data layer
   Edit this file (and only this file) to grow the map.

   Each edge now carries the human story of the bridge:
     via   - the mediating concept
     who   - the mathematician(s) who built the bridge, and when
     story - the theory of the bridge: how the two fields connect
     note  - the short technical gloss (kept from earlier drafts)
   ============================================================ */
window.MATH_DATA = {
 "domains": [
  {
   "id": "foundations",
   "label": "Foundations",
   "color": "#aab9cf",
   "x": 350,
   "y": 820,
   "tag": "logic · sets · categories",
   "def": "The rules of the game itself: what a proof is, what a set is, what a mathematical structure is. Everything else on this map is written in this language."
  },
  {
   "id": "algebra",
   "label": "Algebra",
   "color": "#ec6a4f",
   "x": 1050,
   "y": 360,
   "tag": "structure · symmetry",
   "def": "The study of operations and the structures they generate — groups, rings, fields, vector spaces. Algebra is what symmetry looks like when you write it down."
  },
  {
   "id": "analysis",
   "label": "Analysis",
   "color": "#549bee",
   "x": 1050,
   "y": 1280,
   "tag": "limits · the infinite",
   "def": "The mathematics of the infinite and the infinitesimal: limits, continuity, integration. Born from making calculus honest."
  },
  {
   "id": "geometry",
   "label": "Geometry & Topology",
   "color": "#4cc596",
   "x": 1760,
   "y": 860,
   "tag": "shape · space · curvature",
   "def": "The study of space — from Euclid's ruler-and-compass to spaces where only 'nearness' survives (topology) and spaces where curvature can be measured from inside (differential geometry)."
  },
  {
   "id": "number",
   "label": "Number Theory",
   "color": "#f0b23e",
   "x": 1830,
   "y": 300,
   "tag": "integers · primes",
   "def": "The oldest questions — about whole numbers and primes — which turned out to secretly require nearly every other domain on this map to answer."
  },
  {
   "id": "discrete",
   "label": "Discrete & Combinatorics",
   "color": "#d873b8",
   "x": 430,
   "y": 280,
   "tag": "counting · graphs",
   "def": "Finite structures: counting them, coloring them, connecting them. The domain where clever ideas beat heavy machinery most often."
  },
  {
   "id": "probability",
   "label": "Probability",
   "color": "#9f8cf2",
   "x": 1760,
   "y": 1400,
   "tag": "rigorous randomness",
   "def": "Randomness made rigorous. Since Kolmogorov (1933), a probability space is literally a measure space of total mass 1 — probability is a child of analysis."
  },
  {
   "id": "order",
   "label": "Order & Universal Algebra",
   "color": "#56c4b0",
   "x": 380,
   "y": 1400,
   "tag": "lattices · posets",
   "def": "The small, often-forgotten domain studying order itself — posets, lattices, Boolean algebras — and what all algebraic structures have in common."
  }
 ],
 "fields": [
  {
   "id": "logic",
   "domain": "foundations",
   "label": "Logic",
   "def": "The formal study of valid reasoning: propositional connectives, then predicate logic with quantifiers ∀ and ∃. Fixes exactly what counts as a proof.",
   "theorems": [
    "Gödel's completeness theorem",
    "Gödel's incompleteness theorems",
    "Compactness theorem"
   ],
   "book": "Enderton — A Mathematical Introduction to Logic",
   "children": [
    {
     "label": "Propositional logic",
     "def": "Statements combined by ¬ ∧ ∨ →, truth decided by truth tables alone. Tautologies are the sentences true under every valuation."
    },
    {
     "label": "Predicate logic & quantifiers",
     "def": "Adds variables, relations, and ∀/∃ ranging over a domain — expressive enough for essentially all of mathematics. This is the logic ZFC is written in."
    },
    {
     "label": "Proof systems",
     "def": "Formal calculi (natural deduction, sequent calculus, Hilbert-style) whose finite symbol-pushing derivations certify theorems mechanically."
    },
    {
     "label": "Soundness & completeness",
     "def": "Gödel 1930: a first-order sentence is provable exactly when it holds in every model. Syntax and semantics agree perfectly."
    },
    {
     "label": "Incompleteness",
     "def": "Gödel 1931: any consistent, effectively axiomatized theory containing arithmetic leaves true sentences unprovable — and cannot prove its own consistency."
    }
   ],
   "schuller": "Lecture 1 — logic of propositions and predicates"
  },
  {
   "id": "set-theory",
   "domain": "foundations",
   "label": "Set Theory",
   "def": "Sets, relations, functions — plus the ZFC axioms that keep Russell's paradox out. Provides ordinals, cardinals, and the ladder of infinities.",
   "theorems": [
    "Cantor's theorem (|X| < |P(X)|)",
    "Zorn's lemma ⇔ Axiom of Choice",
    "Independence of the Continuum Hypothesis"
   ],
   "book": "Halmos — Naive Set Theory; Jech — Set Theory",
   "children": [
    {
     "label": "ZFC axioms",
     "def": "Nine axioms about membership ∈, from which ℕ, ℝ, functions, and the rest of mathematics are constructed. The official foundation."
    },
    {
     "label": "Ordinals & transfinite induction",
     "def": "Order-types of well-ordered sets: 0,1,2,…,ω,ω+1,…. Induction extended past infinity, powering constructions of arbitrary length."
    },
    {
     "label": "Cardinals & CH",
     "def": "Sizes of infinite sets: ℵ₀ = |ℕ| < 2^ℵ₀ = |ℝ|. The Continuum Hypothesis asks whether any size lies strictly between."
    },
    {
     "label": "Axiom of Choice",
     "def": "From any family of nonempty sets, a choice function exists. Equivalent to Zorn's lemma and well-ordering; buys bases for every vector space at the price of non-measurable sets."
    },
    {
     "label": "Forcing",
     "def": "Cohen's technique for building models of ZFC to order — proving CH independent: neither provable nor refutable from the axioms."
    }
   ],
   "schuller": "Lectures 2–3 — axioms of set theory; classification of sets"
  },
  {
   "id": "category-theory",
   "domain": "foundations",
   "label": "Category Theory",
   "def": "The mathematics of mathematics: objects and the maps between them, studied without looking inside. Its key insight — adjoint functors — organizes half of modern math.",
   "theorems": [
    "Yoneda lemma",
    "Adjoint functor theorems"
   ],
   "book": "Riehl — Category Theory in Context",
   "children": [
    {
     "label": "Categories & functors",
     "def": "A category is objects plus composable arrows; a functor maps categories to categories preserving composition. Structure lives in the arrows, not inside objects."
    },
    {
     "label": "Natural transformations",
     "def": "Morphisms between functors — the concept the whole subject was invented to define (Eilenberg–Mac Lane, 1945)."
    },
    {
     "label": "Limits & colimits",
     "def": "Universal solutions to diagram-completion problems: products, pullbacks, equalizers and their duals — all instances of one definition."
    },
    {
     "label": "Adjunctions",
     "def": "Functor pairs F ⊣ G exchanging mapping problems: Hom(FX,Y) ≅ Hom(X,GY). Free ⊣ forgetful everywhere; the most load-bearing idea in the subject."
    },
    {
     "label": "Topoi",
     "def": "Categories that behave like the universe of sets and carry an internal logic — where geometry and logic literally merge."
    }
   ]
  },
  {
   "id": "model-theory",
   "domain": "foundations",
   "label": "Model Theory",
   "def": "Studies the relationship between formal theories and the structures that satisfy them. Surprisingly geometric in its modern form.",
   "theorems": [
    "Löwenheim–Skolem",
    "Compactness",
    "Morley's categoricity theorem"
   ],
   "book": "Marker — Model Theory: An Introduction",
   "children": [
    {
     "label": "Structures & satisfaction",
     "def": "A structure interprets a formal language; Tarski's definition makes 'φ is true in M' precise. Theories are sentence sets, models are where they hold."
    },
    {
     "label": "Ultraproducts",
     "def": "Averaging infinitely many structures through an ultrafilter — yielding slick compactness proofs and nonstandard models of ℝ with genuine infinitesimals."
    },
    {
     "label": "o-minimality",
     "def": "Tame real geometry: definable subsets of ℝ are finite unions of points and intervals. Model theory exporting finiteness theorems to real geometry."
    }
   ]
  },
  {
   "id": "computability",
   "domain": "foundations",
   "label": "Computability",
   "def": "What can be computed at all? Turing machines, the halting problem, and degrees of unsolvability — the mathematical boundary of the algorithmic.",
   "theorems": [
    "Undecidability of the halting problem",
    "Rice's theorem"
   ],
   "book": "Sipser — Introduction to the Theory of Computation",
   "children": [
    {
     "label": "Turing machines",
     "def": "The formal model of mechanical computation. Church–Turing thesis: whatever is effectively calculable at all, a Turing machine calculates."
    },
    {
     "label": "Halting problem",
     "def": "No algorithm decides whether an arbitrary program halts — the original diagonal impossibility, ancestor of every undecidability result."
    },
    {
     "label": "Recursion theorem",
     "def": "Kleene: programs may legitimately use their own source code. Self-reference made rigorous rather than paradoxical."
    },
    {
     "label": "Turing degrees",
     "def": "Grading unsolvable problems by relative computability — an intricate infinite hierarchy above the halting problem."
    }
   ]
  },
  {
   "id": "linear-algebra",
   "domain": "algebra",
   "label": "Linear Algebra",
   "def": "Vector spaces and the linear maps between them. Matrices are merely coordinates for those maps. The single most-reused toolkit on this entire map.",
   "theorems": [
    "Rank–nullity theorem",
    "Spectral theorem",
    "Jordan canonical form",
    "Cayley–Hamilton"
   ],
   "book": "Axler — Linear Algebra Done Right",
   "children": [
    {
     "label": "Vector spaces & bases",
     "def": "A set closed under addition and scaling by a field. A basis is a minimal spanning set; every vector is a unique combination of it, and the number of basis vectors — the dimension — is the space's only invariant."
    },
    {
     "label": "Linear maps & rank",
     "def": "Structure-preserving maps T(av+bw)=aT(v)+bT(w). Rank–nullity: dim(domain)=rank+nullity, so what a map collapses (kernel) and what it hits (image) are bookkept exactly."
    },
    {
     "label": "Determinants as volume",
     "def": "The signed factor by which a linear map scales oriented volume. Zero determinant = the map squashes space into lower dimension = non-invertible. Everything else about det follows from this one idea."
    },
    {
     "label": "Eigentheory",
     "def": "Directions a map merely stretches: Tv=λv. Diagonalizable maps are just stretches in a clever basis; the spectral theorem guarantees this for symmetric/Hermitian maps, with orthogonal eigenvectors."
    },
    {
     "label": "Inner products → angles",
     "def": "⟨u,v⟩ upgrades a vector space with length |v|=√⟨v,v⟩ and angle cos θ=⟨u,v⟩/|u||v|. Orthogonality, projections, and Gram–Schmidt all flow from this single extra structure."
    },
    {
     "label": "Bilinear forms",
     "def": "Maps linear in each argument separately; symmetric ones are classified by signature (Sylvester's law of inertia) — the invariant behind Lorentzian signatures (−+++) in relativity."
    },
    {
     "label": "Tensors & exterior algebra",
     "def": "Multilinear maps packaged coordinate-free. The wedge ∧ is the antisymmetric part; iterating it builds the exterior algebra whose elements become differential forms on a manifold."
    }
   ],
   "schuller": "Lectures 8 & 11 — tensor space theory"
  },
  {
   "id": "group-theory",
   "domain": "algebra",
   "label": "Group Theory",
   "def": "Symmetry distilled to its axioms: a set with one associative operation, identity, and inverses. Group actions turn abstract groups back into concrete motion.",
   "theorems": [
    "Lagrange's theorem",
    "Sylow theorems",
    "Classification of finite simple groups"
   ],
   "book": "Artin — Algebra (ch. 2, 6, 7)",
   "children": [
    {
     "label": "Subgroups & cosets",
     "def": "A subgroup partitions its parent into equal-sized translated copies (cosets). Lagrange's theorem is the immediate consequence: subgroup order divides group order."
    },
    {
     "label": "Quotients & isomorphism theorems",
     "def": "Collapsing a normal subgroup to the identity yields the quotient G/N. The isomorphism theorems say homomorphisms are exactly quotients-followed-by-injections — the structural core of the subject."
    },
    {
     "label": "Group actions & orbits",
     "def": "A group acting on a set partitions it into orbits, with orbit size = index of a stabilizer (orbit–stabilizer). Counting orbits gives Burnside's lemma — symmetry made quantitative."
    },
    {
     "label": "Sylow theory",
     "def": "For a prime power dividing |G|, subgroups of that order exist, are all conjugate, and their count is constrained mod p. The finest arithmetic control we have over finite-group structure."
    },
    {
     "label": "Free groups & presentations",
     "def": "The freest possible group on a set of generators, with no relations except those forced. Every group is a quotient of a free one — a presentation ⟨generators | relations⟩."
    },
    {
     "label": "Simple groups",
     "def": "Groups with no nontrivial normal subgroups — the primes of group theory. Their complete classification (finished 2004, including the Monster) runs to tens of thousands of pages."
    }
   ]
  },
  {
   "id": "ring-theory",
   "domain": "algebra",
   "label": "Rings & Modules",
   "def": "Two operations now — addition and multiplication — and the ideals that let you form quotients. Modules generalize vector spaces to rings of scalars.",
   "theorems": [
    "Structure theorem for modules over a PID",
    "Hilbert basis theorem",
    "Chinese remainder theorem"
   ],
   "book": "Dummit & Foote — Abstract Algebra",
   "children": [
    {
     "label": "Ideals & quotient rings",
     "def": "Ideals are the subsets you can quotient by and still get a ring — the ring-theoretic analogue of normal subgroups. Maximal ideals give fields; prime ideals give domains."
    },
    {
     "label": "Euclidean → PID → UFD ladder",
     "def": "A tower of increasingly weak divisibility guarantees: Euclidean domains (division algorithm) ⊂ principal ideal domains ⊂ unique factorization domains. ℤ and k[x] sit at the top; the ladder explains exactly when unique factorization survives."
    },
    {
     "label": "Polynomial rings",
     "def": "k[x] behaves like the integers; k[x,y] does not (not a PID). Irreducibility criteria (Eisenstein, reduction mod p) decide when a polynomial is 'prime'."
    },
    {
     "label": "Modules",
     "def": "Vector spaces over a ring instead of a field. Over a PID they classify completely — and that one structure theorem yields both Jordan canonical form and the classification of finite abelian groups."
    },
    {
     "label": "Noetherian rings",
     "def": "Rings with no infinite ascending chains of ideals — Hilbert's basis theorem shows polynomial rings qualify. The finiteness condition that makes algebraic geometry tractable."
    }
   ]
  },
  {
   "id": "galois-theory",
   "domain": "algebra",
   "label": "Fields & Galois Theory",
   "def": "Field extensions and the symmetry groups of their roots. The Galois correspondence — subgroups ↔ subfields — killed the quintic formula and three ancient Greek construction problems in one blow.",
   "theorems": [
    "Fundamental theorem of Galois theory",
    "Abel–Ruffini (unsolvability of the quintic)",
    "Impossibility of angle trisection"
   ],
   "book": "Stewart — Galois Theory",
   "children": [
    {
     "label": "Field extensions",
     "def": "Enlarging a field by adjoining roots, e.g. ℚ(√2) or ℚ(i). Degree [L:K] measures the extension as a vector-space dimension; algebraic vs transcendental splits the elements."
    },
    {
     "label": "Splitting fields",
     "def": "The smallest extension where a polynomial fully factors into linear pieces — unique up to isomorphism, and the natural stage on which its Galois group acts."
    },
    {
     "label": "Galois correspondence",
     "def": "A perfect order-reversing dictionary: intermediate fields ↔ subgroups of the Galois group. Symmetry of the roots is translated into the subgroup lattice, where it can be computed."
    },
    {
     "label": "Solvability by radicals",
     "def": "An equation is solvable by nested roots exactly when its Galois group is solvable. The symmetric group S₅ is not — so the general quintic has no radical formula (Abel–Ruffini, explained)."
    },
    {
     "label": "Finite fields",
     "def": "Exactly one field of each prime-power size 𝔽_{pⁿ}, with cyclic multiplicative group. The backbone of coding theory and cryptography."
    }
   ]
  },
  {
   "id": "commutative-algebra",
   "domain": "algebra",
   "label": "Commutative Algebra",
   "def": "The deep theory of commutative rings — localization, prime spectra, dimension. Exists largely as the engine room of algebraic geometry.",
   "theorems": [
    "Nakayama's lemma",
    "Krull's principal ideal theorem",
    "Noether normalization"
   ],
   "book": "Atiyah & Macdonald — Introduction to Commutative Algebra",
   "children": [
    {
     "label": "Localization",
     "def": "Formally inverting elements to 'zoom in' near a prime — the algebraic analogue of restricting to a neighborhood. Turns global rings into local ones with a single maximal ideal."
    },
    {
     "label": "Spec of a ring",
     "def": "The set of prime ideals, topologized (Zariski) so it becomes a geometric space. This is the object glued together to build schemes — the point where algebra becomes geometry."
    },
    {
     "label": "Krull dimension",
     "def": "Length of the longest chain of nested primes — the algebraic definition of dimension, matching geometric intuition (a plane is 2, a curve is 1)."
    },
    {
     "label": "Integral extensions",
     "def": "Elements satisfying monic polynomials over a subring — the 'algebraic integers' idea generalized. Underlies normalization and the going-up/going-down theorems."
    }
   ]
  },
  {
   "id": "lie-theory",
   "domain": "algebra",
   "label": "Lie Theory",
   "def": "Groups that are simultaneously smooth manifolds — continuous symmetry. Linearized at the identity they become Lie algebras, which are fully classified by Dynkin diagrams.",
   "theorems": [
    "Lie's theorems (group ↔ algebra correspondence)",
    "Classification of simple Lie algebras (A–G)"
   ],
   "book": "Hall — Lie Groups, Lie Algebras, and Representations",
   "children": [
    {
     "label": "Lie groups",
     "def": "Groups that are also smooth manifolds, so symmetry becomes continuous and differentiable — rotations SO(3), unitaries U(n), the Lorentz group. Continuous symmetry is their entire subject."
    },
    {
     "label": "Lie algebras & exponential map",
     "def": "The tangent space at the identity, equipped with a bracket [X,Y]; exp maps it back to the group. Linearizing a hard nonlinear group into tractable algebra."
    },
    {
     "label": "Root systems",
     "def": "Highly symmetric vector configurations encoding a semisimple Lie algebra's structure. Their rigid geometry is what makes complete classification possible."
    },
    {
     "label": "Dynkin diagrams",
     "def": "A handful of small graphs (Aₙ,Bₙ,Cₙ,Dₙ,E₆,E₇,E₈,F₄,G₂) that classify every simple Lie algebra — one of mathematics' most surprising finite lists."
    }
   ],
   "schuller": "Lectures 13–18 — Lie groups, Lie algebras, Dynkin diagrams, representations"
  },
  {
   "id": "representation-theory",
   "domain": "algebra",
   "label": "Representation Theory",
   "def": "Study an abstract group by making it act on vector spaces — turning symmetry into matrices. Characters compress an entire representation into one function.",
   "theorems": [
    "Schur's lemma",
    "Maschke's theorem",
    "Character orthogonality relations"
   ],
   "book": "Fulton & Harris — Representation Theory",
   "children": [
    {
     "label": "Group representations",
     "def": "Realizing abstract group elements as matrices acting on a vector space — turning symmetry into linear algebra where it can be computed. Maschke: over ℂ, representations decompose into irreducibles."
    },
    {
     "label": "Characters",
     "def": "The trace of each representing matrix. Characters are constant on conjugacy classes and orthogonal to one another — a whole representation is recoverable from these few numbers."
    },
    {
     "label": "Highest weight theory",
     "def": "Irreducible representations of a semisimple Lie algebra are catalogued by a single dominant 'highest weight'. The organizing principle behind particle multiplets in physics."
    }
   ]
  },
  {
   "id": "homological-algebra",
   "domain": "algebra",
   "label": "Homological Algebra",
   "def": "Chain complexes and the functors (Ext, Tor) that measure how far modules are from being free. Born inside topology, now infrastructure everywhere.",
   "theorems": [
    "Snake lemma",
    "Long exact sequence",
    "Derived functor existence"
   ],
   "book": "Weibel — An Introduction to Homological Algebra",
   "children": [
    {
     "label": "Chain complexes",
     "def": "Sequences of maps with consecutive composites zero (∂²=0). Homology measures how far 'kernel exceeds image' — the failure of exactness, made into an invariant."
    },
    {
     "label": "Exact sequences",
     "def": "Chains where image exactly equals kernel at each step. Short exact sequences 0→A→B→C→0 encode 'B is built from A and C', and the snake lemma tracks the bookkeeping."
    },
    {
     "label": "Ext & Tor",
     "def": "Derived functors measuring how badly Hom and ⊗ fail to be exact. Ext classifies extensions; Tor detects torsion — abstract tools with concrete payoffs across algebra and topology."
    },
    {
     "label": "Derived functors",
     "def": "A systematic machine turning a functor into a whole sequence of them via resolutions, capturing information the original functor discards. The engine of modern homological methods."
    }
   ]
  },
  {
   "id": "real-analysis",
   "domain": "analysis",
   "label": "Real Analysis",
   "def": "Calculus made honest: ℝ constructed from scratch, limits by ε–δ, and completeness as the axiom everything else leans on.",
   "theorems": [
    "Bolzano–Weierstrass",
    "Heine–Borel",
    "Mean value theorem",
    "Baire category theorem"
   ],
   "book": "Abbott — Understanding Analysis; Rudin — Principles",
   "children": [
    {
     "label": "Construction of ℝ",
     "def": "Filling the gaps in ℚ, via Dedekind cuts or Cauchy sequences. Completeness — every bounded set has a least upper bound — is the single axiom that separates ℝ from ℚ and powers all of analysis."
    },
    {
     "label": "Sequences & series",
     "def": "Convergence made precise: tails eventually trapped in every ε-window. Convergence tests decide infinite sums; absolute vs conditional convergence is where intuition first breaks."
    },
    {
     "label": "ε–δ continuity",
     "def": "'f is continuous' means: force outputs within ε by confining inputs within δ. The definition that finally made 'no sudden jumps' rigorous after two centuries of vagueness."
    },
    {
     "label": "Differentiation",
     "def": "The derivative as the best linear approximation, i.e. a limit of slopes. The Mean Value Theorem converts this local data into global control, and Taylor's theorem into polynomial approximation."
    },
    {
     "label": "Riemann integration",
     "def": "Area via shrinking rectangles. It works beautifully for continuous functions but fails to commute with limits — the defect that forces the invention of the Lebesgue integral."
    },
    {
     "label": "Uniform convergence",
     "def": "Convergence at one rate everywhere at once, strong enough to preserve continuity and permit swapping limits with integrals — the failure mode behind many classical 'paradoxes'."
    },
    {
     "label": "Metric spaces",
     "def": "Sets with an abstract distance obeying the triangle inequality. Completeness, compactness, and the Baire category theorem all live at this level, before any calculus."
    }
   ]
  },
  {
   "id": "measure-theory",
   "domain": "analysis",
   "label": "Measure Theory",
   "def": "'Length, area, volume' rebuilt to survive the pathologies Riemann integration can't handle. The Lebesgue integral and its convergence theorems power both functional analysis and probability.",
   "theorems": [
    "Monotone & dominated convergence",
    "Radon–Nikodym",
    "Fubini–Tonelli"
   ],
   "book": "Folland — Real Analysis; Tao — An Introduction to Measure Theory",
   "children": [
    {
     "label": "σ-algebras & measures",
     "def": "A σ-algebra is the family of 'measurable' sets, closed under countable operations; a measure assigns them consistent sizes. The rigorous replacement for naive length/area/volume."
    },
    {
     "label": "Lebesgue integral",
     "def": "Integrate by slicing the range, not the domain — summing over level sets. It handles far more functions than Riemann and, crucially, plays well with limits."
    },
    {
     "label": "Convergence theorems",
     "def": "Monotone convergence, Fatou, dominated convergence: the licences to exchange limit and integral. The everyday power tools measure theory exists to provide."
    },
    {
     "label": "Lᵖ spaces",
     "def": "Spaces of functions with integrable p-th power, complete under their norms (Hölder & Minkowski inequalities). L² is a Hilbert space — the natural home of Fourier analysis and quantum states."
    },
    {
     "label": "Product measures",
     "def": "Building measures on products and integrating iteratively (Fubini–Tonelli). The rigorous justification for swapping the order of a double integral."
    }
   ]
  },
  {
   "id": "complex-analysis",
   "domain": "analysis",
   "label": "Complex Analysis",
   "def": "Calculus over ℂ, and astonishingly rigid: one complex derivative forces infinitely many. Contour integration turns hard real integrals into residue bookkeeping.",
   "theorems": [
    "Cauchy's integral formula",
    "Residue theorem",
    "Riemann mapping theorem",
    "Liouville's theorem"
   ],
   "book": "Ahlfors — Complex Analysis; Stein & Shakarchi II",
   "children": [
    {
     "label": "Holomorphy & Cauchy–Riemann",
     "def": "Complex differentiability is far stronger than real: the Cauchy–Riemann equations force it, and it instantly implies infinite differentiability and analyticity. Rigidity is the theme."
    },
    {
     "label": "Cauchy's theorem",
     "def": "The integral of a holomorphic function around a closed loop is zero; the integral formula then recovers all interior values from the boundary. Local behavior globally determined."
    },
    {
     "label": "Laurent series & singularities",
     "def": "Expansions allowing negative powers, classifying singularities as removable, poles, or essential. The essential ones are wild (Picard: they hit every value infinitely often)."
    },
    {
     "label": "Residues",
     "def": "A single coefficient at each pole; summing residues evaluates real integrals and infinite sums that resist every real-variable method. Complex analysis' most practical export."
    },
    {
     "label": "Conformal maps",
     "def": "Holomorphic maps preserve angles. The Riemann mapping theorem: any simply-connected proper region is conformally a disk — a startling uniformity."
    },
    {
     "label": "Analytic continuation",
     "def": "A holomorphic function is so rigid that a tiny piece determines it everywhere it can extend. This is how ζ(s) reaches beyond its defining series — the mechanism behind the Riemann Hypothesis."
    },
    {
     "label": "Riemann surfaces",
     "def": "The natural domains of multivalued functions like √z or log z, where they become single-valued. The meeting point of complex analysis, topology, and algebraic geometry."
    }
   ]
  },
  {
   "id": "functional-analysis",
   "domain": "analysis",
   "label": "Functional Analysis",
   "def": "Linear algebra in infinite dimensions, fused with topology: Banach and Hilbert spaces, operators, spectra. The mathematical home of quantum mechanics.",
   "theorems": [
    "Hahn–Banach",
    "Open mapping / closed graph",
    "Uniform boundedness",
    "Spectral theorem for operators"
   ],
   "book": "Brezis — Functional Analysis, Sobolev Spaces and PDEs",
   "children": [
    {
     "label": "Banach & Hilbert spaces",
     "def": "Complete normed spaces (Banach) and those with an inner product (Hilbert). Infinite-dimensional geometry where completeness must be imposed — the arena for quantum mechanics and PDE."
    },
    {
     "label": "Dual spaces",
     "def": "The space of continuous linear functionals. Hahn–Banach guarantees it is rich enough to separate points; reflexivity asks whether the dual's dual returns you home."
    },
    {
     "label": "Bounded operators",
     "def": "Continuous linear maps between such spaces, with an operator norm. The three pillars — open mapping, closed graph, uniform boundedness — govern their behavior."
    },
    {
     "label": "Spectral theory",
     "def": "Generalizing eigenvalues to infinite dimensions, where the spectrum can be continuous. The spectral theorem for self-adjoint operators is the mathematical heart of quantum observables."
    },
    {
     "label": "Compact operators",
     "def": "Operators that nearly reduce to finite-dimensional ones; their spectral theory (Fredholm) mirrors matrices and underlies integral equations."
    },
    {
     "label": "Distributions & Sobolev spaces",
     "def": "Generalized functions (the delta 'function' made legitimate) and spaces measuring weak derivatives. The modern language in which PDEs are posed and solved."
    }
   ]
  },
  {
   "id": "harmonic-analysis",
   "domain": "analysis",
   "label": "Harmonic Analysis",
   "def": "Decompose functions into frequencies. The Fourier transform is secretly the representation theory of abelian groups — and the workhorse of PDE and number theory alike.",
   "theorems": [
    "Plancherel theorem",
    "Fourier inversion",
    "Carleson's theorem"
   ],
   "book": "Stein & Shakarchi I — Fourier Analysis",
   "children": [
    {
     "label": "Fourier series",
     "def": "Any reasonable periodic function is a sum of pure sinusoids. Convergence subtleties (Gibbs, Carleson) launched much of modern analysis; physically, it is decomposition into harmonics."
    },
    {
     "label": "Fourier transform",
     "def": "The continuous analogue, trading a function for its frequency spectrum and turning differentiation into multiplication — which is why it trivializes constant-coefficient PDEs."
    },
    {
     "label": "Convolution",
     "def": "A blending operation that becomes plain multiplication under the transform. Approximate identities use it to smooth rough functions into nice ones."
    },
    {
     "label": "Uncertainty principles",
     "def": "A function and its transform cannot both be sharply localized. The same theorem is Heisenberg's uncertainty in quantum mechanics — analysis and physics as one statement."
    }
   ]
  },
  {
   "id": "odes",
   "domain": "analysis",
   "label": "Ordinary Differential Equations",
   "def": "Evolution in time: existence, uniqueness, and the qualitative geometry of solutions — fixed points, stability, phase portraits.",
   "theorems": [
    "Picard–Lindelöf existence & uniqueness",
    "Poincaré–Bendixson",
    "Hartman–Grobman"
   ],
   "book": "Arnold — Ordinary Differential Equations",
   "children": [
    {
     "label": "Existence & uniqueness",
     "def": "Picard–Lindelöf: a Lipschitz vector field gives exactly one solution through each point. The guarantee that a differential equation actually determines a trajectory."
    },
    {
     "label": "Linear systems",
     "def": "x'=Ax solved through eigenvalues of A; the matrix exponential e^{At} propagates initial data. The fully understood, exactly solvable core."
    },
    {
     "label": "Phase portraits",
     "def": "The qualitative geometric picture of all trajectories at once — nodes, saddles, spirals, centers. Understanding dynamics without solving formulas."
    },
    {
     "label": "Stability theory",
     "def": "Whether nearby solutions stay nearby. Lyapunov functions certify stability without solving the equation — an energy-like quantity that only decreases."
    }
   ]
  },
  {
   "id": "pdes",
   "domain": "analysis",
   "label": "Partial Differential Equations",
   "def": "The trinity — Laplace, heat, wave — and the modern weak-solution machinery built on Sobolev spaces. The language in which physical law is written.",
   "theorems": [
    "Maximum principles",
    "Lax–Milgram",
    "Elliptic regularity"
   ],
   "book": "Evans — Partial Differential Equations",
   "children": [
    {
     "label": "Elliptic / parabolic / hyperbolic",
     "def": "The three archetypes — Laplace (equilibrium), heat (diffusion), wave (propagation) — with fundamentally different behavior. Classification dictates which methods apply."
    },
    {
     "label": "Green's functions",
     "def": "The response to a point source; convolving against it solves the inhomogeneous problem. The propagator of the equation, and a bridge to physics."
    },
    {
     "label": "Weak solutions",
     "def": "Solutions defined by integration against test functions, allowing kinks and shocks classical derivatives forbid. This is why PDE theory lives in Sobolev spaces."
    },
    {
     "label": "Regularity theory",
     "def": "Showing that weak solutions are secretly smooth after all (elliptic regularity), or precisely how smooth. The reconciliation of generalized and classical solutions."
    }
   ]
  },
  {
   "id": "variations",
   "domain": "analysis",
   "label": "Calculus of Variations",
   "def": "Optimize over spaces of functions instead of points: the Euler–Lagrange equations, and geodesics as critical points of length.",
   "theorems": [
    "Euler–Lagrange equations",
    "Noether's theorem",
    "Direct method"
   ],
   "book": "Gelfand & Fomin — Calculus of Variations",
   "children": [
    {
     "label": "Functionals",
     "def": "Maps from a space of functions to numbers — arc length, energy, action. The unknown is an entire function, and we seek the one making the functional stationary."
    },
    {
     "label": "Euler–Lagrange",
     "def": "The equation a minimizer must satisfy, converting an optimization over functions into a differential equation. The engine translating 'least action' into the laws of motion."
    },
    {
     "label": "Constraints & multipliers",
     "def": "Optimizing subject to side conditions via Lagrange multipliers, now in infinite dimensions — isoperimetric problems and constrained mechanics."
    },
    {
     "label": "Geodesic variational principle",
     "def": "Shortest/straightest paths as critical points of the length or energy functional. The exact door from analysis into Riemannian geometry — geodesics on both sides."
    }
   ]
  },
  {
   "id": "dynamical-systems",
   "domain": "analysis",
   "label": "Dynamical Systems & Ergodic Theory",
   "def": "Long-time behavior of systems that evolve: chaos, attractors, and the ergodic theorems that connect time averages to space averages.",
   "theorems": [
    "Birkhoff ergodic theorem",
    "KAM theorem",
    "Sharkovskii's theorem"
   ],
   "book": "Strogatz — Nonlinear Dynamics; Walters — Ergodic Theory",
   "children": [
    {
     "label": "Fixed points & bifurcations",
     "def": "Equilibria and the qualitative changes that occur as a parameter crosses a threshold — where new behaviors are suddenly born."
    },
    {
     "label": "Chaos & Lyapunov exponents",
     "def": "Deterministic yet unpredictable motion; positive Lyapunov exponents quantify exponential sensitivity to initial conditions — the butterfly effect, measured."
    },
    {
     "label": "Ergodicity & mixing",
     "def": "When a single trajectory samples the whole space so that time averages equal space averages (Birkhoff). The rigorous foundation under statistical mechanics."
    },
    {
     "label": "Entropy",
     "def": "A single number measuring a system's rate of information production or orbit complexity — connecting dynamics to information theory and thermodynamics."
    }
   ]
  },
  {
   "id": "classical-geometry",
   "domain": "geometry",
   "label": "Classical & Non-Euclidean Geometry",
   "def": "Euclid's axioms, and the 2000-year struggle with the parallel postulate that ended with hyperbolic geometry — the discovery that geometry is plural, not singular.",
   "theorems": [
    "Independence of the parallel postulate",
    "Klein's Erlangen program"
   ],
   "book": "Hartshorne — Geometry: Euclid and Beyond",
   "children": [
    {
     "label": "Euclid's axioms",
     "def": "Five postulates from which plane geometry unfolds. The fifth (parallels) resisted proof for two millennia — because it is independent of the others."
    },
    {
     "label": "Hyperbolic geometry",
     "def": "Constant negative curvature: through a point, infinitely many parallels; triangle angles sum to less than π, with deficit proportional to area."
    },
    {
     "label": "Spherical geometry",
     "def": "Constant positive curvature: no parallels exist, triangle angles exceed π, and geodesics are great circles."
    },
    {
     "label": "Projective geometry",
     "def": "Add points at infinity so that any two lines meet. Perspective made rigorous — and duality swaps points with lines."
    },
    {
     "label": "Erlangen program",
     "def": "Klein 1872: a geometry is the study of invariants of a transformation group. The group is the geometry."
    }
   ],
   "atom": {
    "href": "atoms/hyperbolic-disk.html",
    "label": "The Poincaré disk — geodesics, angle defect, and the failure of the parallel postulate"
   }
  },
  {
   "id": "point-set-topology",
   "domain": "geometry",
   "label": "Point-Set Topology",
   "def": "Strip a set down to just its open sets — no distance, no angles — and continuity, compactness, and connectedness still make sense. The minimal structure for doing analysis.",
   "theorems": [
    "Tychonoff's theorem",
    "Urysohn's lemma",
    "Heine–Borel (metric case)"
   ],
   "book": "Munkres — Topology",
   "children": [
    {
     "label": "Topological spaces",
     "def": "A set plus a family of 'open' subsets closed under unions and finite intersections — the minimal structure in which limits and continuity make sense."
    },
    {
     "label": "Bases & subbases",
     "def": "Generating a topology from simple building blocks, exactly as metric balls generate the metric topology."
    },
    {
     "label": "Hausdorff & separation axioms",
     "def": "A ladder of axioms grading how well open sets can tell points apart. Hausdorff is the one that makes limits unique."
    },
    {
     "label": "Compactness",
     "def": "Every open cover admits a finite subcover — 'the next best thing to being finite'. Heine–Borel: in ℝⁿ, compact = closed and bounded."
    },
    {
     "label": "Connectedness",
     "def": "The space cannot be split into two disjoint nonempty open pieces; path-connectedness is the walkable version. Both survive continuous maps."
    },
    {
     "label": "Quotient spaces",
     "def": "Gluing: identify points, inherit the topology. A torus is a square with opposite edges glued; glue one pair with a flip and you get the Klein bottle."
    }
   ],
   "schuller": "Lectures 4–5 — topological spaces: construction, invariants",
   "atom": {
    "href": "atoms/structure-ladder.html",
    "label": "The structure ladder — a bare set gains topology, metric, angles, volume"
   }
  },
  {
   "id": "algebraic-topology",
   "domain": "geometry",
   "label": "Algebraic Topology",
   "def": "A machine that converts shapes into algebra: loops become the fundamental group, holes become homology. Two spaces with different invariants can never be the same.",
   "theorems": [
    "Brouwer fixed point theorem",
    "Poincaré duality",
    "Van Kampen's theorem",
    "Hurewicz theorem"
   ],
   "book": "Hatcher — Algebraic Topology",
   "children": [
    {
     "label": "Homotopy & π₁",
     "def": "Loops at a basepoint, up to continuous deformation, form a group. π₁ detects 1-dimensional holes: trivial for the sphere, ℤ for the circle."
    },
    {
     "label": "Covering spaces",
     "def": "Unwrappings of a space, classified exactly by the subgroups of π₁ — Galois theory's topological twin."
    },
    {
     "label": "Homology",
     "def": "Abelian hole-counters Hₙ computed from formal sums of simplices; the Euler characteristic drops out as an alternating sum of ranks."
    },
    {
     "label": "Cohomology & cup products",
     "def": "Homology's dual, enriched with a ring structure via the cup product — finer invariants, and Poincaré duality in its natural home."
    },
    {
     "label": "Higher homotopy groups",
     "def": "πₙ uses n-spheres in place of loops. Abelian for n ≥ 2, yet ferociously hard: the groups πₙ(S²) are still not fully known."
    }
   ]
  },
  {
   "id": "differential-topology",
   "domain": "geometry",
   "label": "Differential Topology",
   "def": "Smooth manifolds — spaces that locally look like ℝⁿ with enough structure to do calculus — studied up to smooth deformation. Home of transversality and Morse theory.",
   "theorems": [
    "Whitney embedding theorem",
    "Sard's theorem",
    "Morse lemma",
    "Exotic ℝ⁴s exist"
   ],
   "book": "Lee — Introduction to Smooth Manifolds",
   "children": [
    {
     "label": "Charts & atlases",
     "def": "Local coordinate systems ℝⁿ ↔ patches of the space, with smooth transition maps on overlaps. A maximal atlas is a smooth structure."
    },
    {
     "label": "Tangent spaces",
     "def": "The best linear approximation to a manifold at a point — defined intrinsically as directional derivatives, with no ambient space required."
    },
    {
     "label": "Vector fields & flows",
     "def": "A smooth choice of tangent vector at every point integrates to a flow: ordinary differential equations living on manifolds."
    },
    {
     "label": "Transversality",
     "def": "Generic position (Thom): after arbitrarily small perturbation, submanifolds intersect cleanly. The subject's licence to say 'generically'."
    },
    {
     "label": "Morse theory",
     "def": "A generic function's critical points dictate the manifold's shape: the space assembles from one handle per critical point."
    }
   ],
   "schuller": "Lectures 6–7 & 9–12 — manifolds, smooth structures, tangent spaces, forms & de Rham",
   "atom": {
    "href": "atoms/structure-ladder.html",
    "label": "The structure ladder — a bare set gains topology, smoothness, metric, angles, volume"
   }
  },
  {
   "id": "differential-geometry",
   "domain": "geometry",
   "label": "Differential Geometry",
   "def": "Put a metric on a smooth manifold and suddenly a dull space has distances, angles, volume — and curvature you can measure without ever leaving it (Theorema Egregium).",
   "theorems": [
    "Theorema Egregium",
    "Gauss–Bonnet",
    "Hopf–Rinow",
    "Bonnet–Myers"
   ],
   "book": "do Carmo — Curves & Surfaces; Lee — Riemannian Manifolds",
   "children": [
    {
     "label": "Curves: curvature & torsion",
     "def": "The Frenet frame: κ measures bending, τ measures twisting out of a plane — together they determine a space curve up to rigid motion."
    },
    {
     "label": "Surfaces & fundamental forms",
     "def": "First fundamental form: measurement inside the surface. Second: how it sits in space. Gauss curvature K is built from both — and belongs, astonishingly, only to the first."
    },
    {
     "label": "Riemannian metrics",
     "def": "A smoothly varying inner product on each tangent space. With it, a bare manifold acquires lengths, angles, and volume — the whole structure ladder in one object."
    },
    {
     "label": "Connections & parallel transport",
     "def": "The Levi-Civita rule for differentiating vector fields and sliding vectors along curves. A vector returning rotated from a round trip is curvature made visible."
    },
    {
     "label": "Geodesics",
     "def": "The straightest possible curves — critical points of the length functional, solutions of a second-order ODE, locally shortest paths."
    },
    {
     "label": "Riemann curvature tensor",
     "def": "The complete obstruction to flatness: the failure of second covariant derivatives to commute. Contracts to Ricci and scalar curvature."
    },
    {
     "label": "Symplectic geometry",
     "def": "Manifolds carrying a closed nondegenerate 2-form — the phase spaces of classical mechanics, where area, not length, is the conserved quantity."
    },
    {
     "label": "Kähler geometry",
     "def": "Where Riemannian, complex, and symplectic structures coexist compatibly — geometry's three flavors meeting; home of Calabi–Yau spaces."
    }
   ],
   "schuller": "Lectures 21–25 — connection 1-forms, parallel transport, curvature & torsion",
   "atom": {
    "href": "atoms/parallel-transport.html",
    "label": "Parallel transport — carry a vector around a loop; the rotation is the curvature"
   }
  },
  {
   "id": "low-dim-topology",
   "domain": "geometry",
   "label": "Low-Dimensional Topology & Knots",
   "def": "Dimensions 2, 3, 4 — where topology is hardest and strangest. Surfaces are fully classified; 3-manifolds succumbed to geometry (and a PDE); dimension 4 remains wild.",
   "theorems": [
    "Classification of surfaces",
    "Poincaré conjecture (Perelman, via Ricci flow)",
    "Jones polynomial invariance"
   ],
   "book": "Adams — The Knot Book; Thurston — Three-Dimensional Geometry",
   "children": [
    {
     "label": "Classification of surfaces (torus, Klein bottle, genus)",
     "def": "Every closed surface is a sphere with g handles (orientable) or with cross-caps (non-orientable: projective plane, Klein bottle). Dimension 2 is completely solved."
    },
    {
     "label": "Knots & Reidemeister moves",
     "def": "Circles embedded in 3-space up to deformation. Two diagrams depict the same knot exactly when three local moves connect them."
    },
    {
     "label": "Knot invariants",
     "def": "Quantities unchanged by the moves — the Alexander and Jones polynomials — certifying that two knots are genuinely different."
    },
    {
     "label": "3-manifolds & geometrization",
     "def": "Thurston's vision, Perelman's theorem: every closed 3-manifold decomposes into pieces carrying one of eight geometries. Poincaré falls as a corollary."
    },
    {
     "label": "4-manifold strangeness",
     "def": "The rogue dimension: ℝ⁴ alone carries uncountably many inequivalent smooth structures, and smooth vs topological classifications diverge (Donaldson, Freedman)."
    }
   ],
   "atom": {
    "href": "atoms/surfaces.html",
    "label": "Torus · Möbius band · Klein bottle — orientability in motion"
   }
  },
  {
   "id": "algebraic-geometry",
   "domain": "geometry",
   "label": "Algebraic Geometry",
   "def": "Geometry of polynomial equation sets. The Nullstellensatz makes a literal dictionary between ideals and point-sets; Grothendieck's schemes rebuilt the whole subject on ring theory.",
   "theorems": [
    "Hilbert's Nullstellensatz",
    "Bézout's theorem",
    "Riemann–Roch"
   ],
   "book": "Shafarevich — Basic Algebraic Geometry; Hartshorne",
   "children": [
    {
     "label": "Affine & projective varieties",
     "def": "Zero sets of polynomial systems — in affine space, or completed with points at infinity, where intersection counts become exact (Bézout)."
    },
    {
     "label": "Nullstellensatz",
     "def": "Hilbert's dictionary: radical ideals ↔ varieties. Every question about polynomial equations becomes a question about rings, and back."
    },
    {
     "label": "Sheaves",
     "def": "Data assigned coherently to open sets — things you can restrict and glue. The bookkeeping device on which modern geometry runs."
    },
    {
     "label": "Schemes",
     "def": "Grothendieck's rebuild: Spec of any commutative ring is a geometric space. Geometry over ℤ — arithmetic made geometric."
    },
    {
     "label": "Divisors & line bundles",
     "def": "Formal sums of codimension-one subvarieties correspond to line bundles; Riemann–Roch counts the functions they allow."
    },
    {
     "label": "Moduli spaces",
     "def": "Spaces whose points are themselves geometric objects — all curves of genus g, say. Geometry classifying geometry."
    }
   ]
  },
  {
   "id": "fiber-bundles",
   "domain": "geometry",
   "label": "Fiber Bundles & Characteristic Classes",
   "def": "Attach a copy of a fiber (a vector space, a group) smoothly to every point of a base manifold. Connections and curvature on bundles unify geometry's deepest structures.",
   "theorems": [
    "Chern–Weil theory",
    "Classification of bundles by homotopy"
   ],
   "book": "Milnor & Stasheff — Characteristic Classes",
   "children": [
    {
     "label": "Vector bundles",
     "def": "A vector space attached smoothly to every point — the tangent bundle first among them. The Möbius band is the simplest twisted example."
    },
    {
     "label": "Principal bundles",
     "def": "Bundles whose fiber is a Lie group acting on itself — the symmetry-first formulation on which every gauge theory stands."
    },
    {
     "label": "Connections & curvature",
     "def": "A splitting of directions into horizontal and vertical lets you differentiate along the base; the failure of horizontal lifts to close up is curvature."
    },
    {
     "label": "Chern & Pontryagin classes",
     "def": "Cohomology classes measuring a bundle's global twist, computable from curvature (Chern–Weil): topology extracted from geometry."
    }
   ],
   "schuller": "Lectures 19–25 — principal & associated bundles, connections, parallel transport, curvature"
  },
  {
   "id": "elementary-nt",
   "domain": "number",
   "label": "Elementary Number Theory",
   "def": "Divisibility, primes, and congruences — arithmetic mod n. Elementary in prerequisites, not in difficulty: its open problems are among the hardest known.",
   "theorems": [
    "Fundamental theorem of arithmetic",
    "Fermat's little theorem",
    "Quadratic reciprocity",
    "Chinese remainder theorem"
   ],
   "book": "Hardy & Wright — An Introduction to the Theory of Numbers",
   "children": [
    {
     "label": "Divisibility & gcd",
     "def": "The arithmetic of remainders; the Euclidean algorithm computes gcd fast and, run backwards, solves ax+by=gcd. The oldest nontrivial algorithm still in daily use."
    },
    {
     "label": "Primes",
     "def": "The multiplicative atoms. Infinitely many (Euclid), yet thinning out (roughly one in ln n) and erratically spaced — the source of number theory's hardest questions."
    },
    {
     "label": "Congruences",
     "def": "Arithmetic modulo n — clock arithmetic. The Chinese Remainder Theorem reassembles a number from its residues; Fermat and Euler's theorems govern powers mod n."
    },
    {
     "label": "Quadratic reciprocity",
     "def": "Gauss's 'golden theorem': whether p is a square mod q secretly controls whether q is a square mod p. The first deep hint that primes talk to each other."
    },
    {
     "label": "Arithmetic functions",
     "def": "Functions of the integers built from divisor structure (φ, μ, σ). Möbius inversion inverts divisor sums — the combinatorial backbone of analytic number theory."
    },
    {
     "label": "Continued fractions",
     "def": "Expansions [a₀;a₁,a₂,…] giving the best rational approximations to a real number, and solving Pell's equation. Where number theory meets Diophantine approximation."
    }
   ]
  },
  {
   "id": "analytic-nt",
   "domain": "number",
   "label": "Analytic Number Theory",
   "def": "Count primes with complex analysis. Euler's product ties the zeta function to the primes; its zeros govern their distribution. The Riemann Hypothesis lives here.",
   "theorems": [
    "Prime number theorem",
    "Dirichlet's theorem on primes in progressions",
    "Hardy–Ramanujan partition asymptotics"
   ],
   "book": "Apostol — Introduction to Analytic Number Theory",
   "children": [
    {
     "label": "Riemann zeta & Euler product",
     "def": "ζ(s)=Σn⁻ˢ=∏(1−p⁻ˢ)⁻¹ encodes every prime into one analytic object. The Euler product is the analytic form of unique factorization."
    },
    {
     "label": "Prime number theorem",
     "def": "π(x)~x/ln x: the primes' asymptotic density. Its proof, via ζ's zeros off the line Re(s)=1, first revealed that prime distribution is a problem in complex analysis."
    },
    {
     "label": "L-functions",
     "def": "Vast generalizations of ζ attached to characters, forms, and varieties. Their analytic behavior conjecturally controls deep arithmetic (Birch–Swinnerton-Dyer, Langlands)."
    },
    {
     "label": "Riemann Hypothesis",
     "def": "The conjecture that every nontrivial zero of ζ has real part exactly ½ — equivalent to the sharpest possible error term in the prime count. Mathematics' most famous open problem."
    },
    {
     "label": "Circle method & partitions",
     "def": "Hardy–Littlewood–Ramanujan: extract asymptotics of counting functions by integrating a generating function over the unit circle. It delivers the exact growth of the partition function p(n)."
    }
   ]
  },
  {
   "id": "algebraic-nt",
   "domain": "number",
   "label": "Algebraic Number Theory",
   "def": "Do arithmetic in number fields beyond ℚ, where unique factorization can fail — and is repaired at the level of ideals. p-adic numbers give each prime its own analysis.",
   "theorems": [
    "Unique factorization of ideals",
    "Dirichlet's unit theorem",
    "Finiteness of the class group"
   ],
   "book": "Neukirch — Algebraic Number Theory",
   "children": [
    {
     "label": "Number fields",
     "def": "Finite extensions of ℚ like ℚ(√−5), the natural habitats where Diophantine questions live. Their arithmetic is subtler than ℤ's."
    },
    {
     "label": "Rings of integers",
     "def": "The 'whole numbers' inside a number field. Unique factorization can fail here — the discovery that broke naive attempts at Fermat's Last Theorem."
    },
    {
     "label": "Ideal class groups",
     "def": "A finite group measuring exactly how badly unique factorization fails; it is trivial precisely when factorization is unique. Dedekind's repair to the crisis."
    },
    {
     "label": "Ramification",
     "def": "How primes split, stay inert, or ramify when lifted into a bigger ring of integers — the arithmetic analogue of branching in covering spaces."
    },
    {
     "label": "p-adic numbers",
     "def": "An alternative completion of ℚ where 'close' means 'divisible by a high power of p'. Local fields that let you solve one prime at a time (Hasse's local–global principle)."
    }
   ]
  },
  {
   "id": "modular-forms",
   "domain": "number",
   "label": "Modular Forms & Elliptic Curves",
   "def": "Highly symmetric complex functions whose coefficients encode arithmetic — Ramanujan's τ and mock theta functions live here. Their marriage to elliptic curves proved Fermat's Last Theorem.",
   "theorems": [
    "Modularity theorem",
    "Fermat's Last Theorem (Wiles)",
    "Mordell–Weil theorem"
   ],
   "book": "Diamond & Shurman — A First Course in Modular Forms",
   "children": [
    {
     "label": "Modular forms & q-expansions",
     "def": "Functions on the upper half-plane with enormous symmetry under SL₂(ℤ); their Fourier (q-) coefficients are laden with arithmetic. A finite-dimensional space controlling infinitely much data."
    },
    {
     "label": "Ramanujan's τ and congruences",
     "def": "The coefficients of the discriminant modular form Δ define τ(n); Ramanujan's conjectured multiplicativity and size bounds (proved by Mordell and Deligne) launched the modern theory."
    },
    {
     "label": "Elliptic curves over ℚ",
     "def": "Cubic curves y²=x³+ax+b whose rational points form a finitely generated abelian group (Mordell–Weil). Rank is subtle; the object at the center of modern arithmetic."
    },
    {
     "label": "Modularity → FLT",
     "def": "Every rational elliptic curve is modular (Wiles, Taylor–Wiles). Applied to a hypothetical Fermat solution, this contradiction proves Fermat's Last Theorem after 350 years."
    },
    {
     "label": "Langlands program",
     "def": "A sweeping web of conjectures unifying Galois representations with automorphic forms — a 'grand unified theory' of number theory, with representation theory as its language."
    }
   ]
  },
  {
   "id": "diophantine",
   "domain": "number",
   "label": "Diophantine & Transcendence",
   "def": "Which equations have integer solutions, and which numbers escape all polynomial equations entirely (e, π). Approximation of irrationals by rationals is the shared engine.",
   "theorems": [
    "Roth's theorem",
    "Lindemann–Weierstrass (π is transcendental)",
    "Faltings' theorem"
   ],
   "book": "Baker — Transcendental Number Theory",
   "children": [
    {
     "label": "Diophantine equations",
     "def": "Polynomial equations sought in integers or rationals. Hilbert's 10th problem asks for an algorithm to decide solvability — proved impossible (Matiyasevich), linking directly to computability."
    },
    {
     "label": "Diophantine approximation",
     "def": "How closely irrationals can be approximated by rationals. Liouville's bound builds transcendentals; Roth's theorem gives the sharp exponent for algebraic numbers."
    },
    {
     "label": "Transcendence of e and π",
     "def": "Proofs that these constants satisfy no polynomial with rational coefficients (Hermite, Lindemann) — and Lindemann's result finally proved squaring the circle impossible."
    }
   ]
  },
  {
   "id": "enumerative",
   "domain": "discrete",
   "label": "Enumerative Combinatorics",
   "def": "How many? Binomial identities, recurrences, and the generating function — a power series used as a clothesline to hang a counting sequence on.",
   "theorems": [
    "Binomial theorem",
    "Inclusion–exclusion",
    "Exponential formula"
   ],
   "book": "Stanley — Enumerative Combinatorics",
   "children": [
    {
     "label": "Binomial coefficients",
     "def": "The counts C(n,k) organizing choice, Pascal's triangle, and the binomial theorem. The atoms of finite counting."
    },
    {
     "label": "Generating functions",
     "def": "Encode a sequence as coefficients of a power series, then manipulate the series algebraically — 'a clothesline on which to hang a sequence' (Wilf). Counting becomes algebra."
    },
    {
     "label": "Recurrences",
     "def": "Sequences defined by earlier terms (Fibonacci); solved in closed form via characteristic roots or generating functions. The discrete analogue of differential equations."
    },
    {
     "label": "Catalan numbers",
     "def": "One sequence counting a hundred different things — balanced parentheses, triangulations, binary trees. The recurring signature of recursive structure."
    }
   ]
  },
  {
   "id": "graph-theory",
   "domain": "discrete",
   "label": "Graph Theory",
   "def": "Dots and the lines between them — the minimal mathematics of connection. Colorings, flows, planarity, and the spectra of adjacency matrices.",
   "theorems": [
    "Four color theorem",
    "Euler's formula V−E+F=2",
    "Kuratowski's theorem"
   ],
   "book": "Diestel — Graph Theory",
   "children": [
    {
     "label": "Connectivity",
     "def": "How robustly a graph hangs together — paths, cuts, and Menger's theorem equating them. The foundation of network reliability."
    },
    {
     "label": "Colorings",
     "def": "Assigning labels so adjacent vertices differ. The Four Color Theorem (every planar map needs ≤4) was the first major theorem proved with essential computer aid."
    },
    {
     "label": "Planarity",
     "def": "Which graphs draw in the plane without crossings — exactly those avoiding K₅ and K₃,₃ as minors (Kuratowski). Euler's V−E+F=2 lives here."
    },
    {
     "label": "Matchings",
     "def": "Pairing up vertices; Hall's marriage theorem gives the exact condition. The combinatorial core of assignment and optimization problems."
    },
    {
     "label": "Spectral graph theory",
     "def": "Reading a graph's structure from its adjacency/Laplacian eigenvalues — connectivity, expansion, clustering. The linear-algebra lens on combinatorics."
    }
   ]
  },
  {
   "id": "ramsey",
   "domain": "discrete",
   "label": "Ramsey & Extremal Theory",
   "def": "'Complete disorder is impossible': any sufficiently large structure contains ordered substructures. Extremal theory asks how large before order is forced.",
   "theorems": [
    "Ramsey's theorem",
    "Szemerédi's theorem",
    "Turán's theorem"
   ],
   "book": "Graham, Rothschild & Spencer — Ramsey Theory",
   "children": [
    {
     "label": "Ramsey numbers",
     "def": "R(m,n): the size at which order becomes unavoidable — any 2-coloring of a large enough complete graph forces a monochromatic clique. 'Complete disorder is impossible.'"
    },
    {
     "label": "Extremal graph theory",
     "def": "How dense a graph can be while avoiding a given subgraph (Turán, Erdős–Stone). The systematic study of forced structure."
    },
    {
     "label": "The probabilistic method (Erdős)",
     "def": "Prove an object exists by showing a random one works with positive probability — nonconstructive yet devastatingly effective, and the birthplace of the random-graph field."
    }
   ]
  },
  {
   "id": "partitions",
   "domain": "discrete",
   "label": "Partition Theory",
   "def": "In how many ways can n be written as a sum? Deceptively simple, and the doorway to Ramanujan's congruences, q-series, and modular forms.",
   "theorems": [
    "Euler's pentagonal number theorem",
    "Ramanujan's congruences p(5n+4) ≡ 0 (mod 5)",
    "Rogers–Ramanujan identities"
   ],
   "book": "Andrews — The Theory of Partitions",
   "children": [
    {
     "label": "Partition function p(n)",
     "def": "The number of ways to write n as a sum of positive integers. Innocent to state, its growth (Hardy–Ramanujan) and divisibility hide astonishing depth."
    },
    {
     "label": "q-series",
     "def": "Infinite products and sums in a variable q that generate partitions and connect to modular forms. Euler's pentagonal number theorem is the prototype."
    },
    {
     "label": "Ramanujan congruences",
     "def": "The stunning regularities p(5n+4)≡0 (mod 5), p(7n+5)≡0 (mod 7), p(11n+6)≡0 (mod 11) — discovered by Ramanujan, explained by modular forms."
    },
    {
     "label": "Rogers–Ramanujan",
     "def": "Two identities equating partitions with congruence restrictions to partitions with gap conditions — deep, surprising, and central to combinatorics and statistical mechanics."
    }
   ]
  },
  {
   "id": "prob-spaces",
   "domain": "probability",
   "label": "Probability Spaces",
   "def": "Kolmogorov's move: a probability space is a measure space of total mass 1. Events are measurable sets, random variables are measurable functions — randomness inherits all of measure theory.",
   "theorems": [
    "Kolmogorov's axioms",
    "Borel–Cantelli lemmas",
    "Kolmogorov 0–1 law"
   ],
   "book": "Durrett — Probability: Theory and Examples",
   "children": [
    {
     "label": "Probability measures",
     "def": "A measure of total mass one on a sample space (Kolmogorov). This single definition put all of probability on rigorous measure-theoretic footing in 1933."
    },
    {
     "label": "Random variables",
     "def": "Measurable functions from the sample space to ℝ; their distributions push the probability measure forward. The objects whose behavior probability actually studies."
    },
    {
     "label": "Independence",
     "def": "Joint probabilities factor — the defining structural feature separating probability from general measure theory, and the hypothesis behind the limit theorems."
    },
    {
     "label": "Borel–Cantelli",
     "def": "Two lemmas deciding whether infinitely many events occur, from the convergence or divergence of their probability sum. The basic tool for almost-sure statements."
    }
   ]
  },
  {
   "id": "limit-theorems",
   "domain": "probability",
   "label": "Limit Theorems",
   "def": "What happens when you average many independent random things: the law of large numbers stabilizes, the central limit theorem reveals the universal Gaussian shape.",
   "theorems": [
    "Strong law of large numbers",
    "Central limit theorem",
    "Large deviations (Cramér)"
   ],
   "book": "Durrett — Probability (ch. 2–3)",
   "children": [
    {
     "label": "Weak & strong LLN",
     "def": "Averages of independent samples converge to the mean — in probability (weak) or almost surely (strong). The theorem that makes 'expected value' empirically meaningful."
    },
    {
     "label": "Central limit theorem",
     "def": "Sums of many independent effects become Gaussian regardless of the pieces' distribution. Why the bell curve is everywhere — and why Gaussian likelihoods dominate inference."
    },
    {
     "label": "Convergence modes",
     "def": "Almost sure, in probability, in Lᵖ, in distribution — a hierarchy of senses in which random variables converge, each with its own theorems and counterexamples."
    },
    {
     "label": "Large deviations",
     "def": "The exponentially small probabilities of rare events, governed by a rate function (Cramér, Sanov). The mathematics of tail risk and statistical mechanics."
    }
   ]
  },
  {
   "id": "stochastic-processes",
   "domain": "probability",
   "label": "Stochastic Processes",
   "def": "Randomness with a time axis: Markov chains forget their past; martingales are fair games; Brownian motion is a continuous path that is nowhere differentiable.",
   "theorems": [
    "Martingale convergence theorem",
    "Existence of Brownian motion (Wiener)",
    "Doob's optional stopping"
   ],
   "book": "Williams — Probability with Martingales",
   "children": [
    {
     "label": "Markov chains",
     "def": "Processes that forget their past given the present. Stationary distributions and mixing times govern their long-run behavior — the engine under MCMC sampling."
    },
    {
     "label": "Martingales",
     "def": "Models of fair games where the expected future equals the present. Optional stopping and convergence theorems make them a razor-sharp analytical tool."
    },
    {
     "label": "Brownian motion",
     "def": "The continuous scaling limit of random walks — a path continuous everywhere yet differentiable nowhere. The universal noise underlying diffusion and finance."
    },
    {
     "label": "Itô calculus",
     "def": "Calculus along Brownian paths, where the chain rule gains a second-order correction (Itô's lemma). The language of stochastic differential equations."
    }
   ]
  },
  {
   "id": "lattices",
   "domain": "order",
   "label": "Posets & Lattices",
   "def": "Order studied for its own sake: partially ordered sets, and lattices where any two elements have a meet and join. Fixed-point theorems here power logic and computer science.",
   "theorems": [
    "Knaster–Tarski fixed point theorem",
    "Dilworth's theorem"
   ],
   "book": "Davey & Priestley — Introduction to Lattices and Order",
   "children": [
    {
     "label": "Posets",
     "def": "Sets with a partial order — some pairs comparable, some not (subsets, divisibility, logical implication). The abstract skeleton of hierarchy."
    },
    {
     "label": "Lattices",
     "def": "Posets where every pair has a least upper bound (join) and greatest lower bound (meet). Subgroups, ideals, and subspaces all form lattices — a unifying shadow structure."
    },
    {
     "label": "Complete lattices",
     "def": "Lattices where every subset, not just pairs, has sups and infs. The setting for closure operators and the guaranteed existence of fixed points."
    },
    {
     "label": "Fixed points",
     "def": "Knaster–Tarski: an order-preserving map on a complete lattice always has a fixed point. This one theorem underlies denotational semantics, the Cantor–Schröder–Bernstein theorem, and recursion."
    }
   ]
  },
  {
   "id": "boolean",
   "domain": "order",
   "label": "Boolean Algebras",
   "def": "The algebra of true and false — logic's algebraic shadow. Stone duality reveals every Boolean algebra as the clopen sets of a topological space.",
   "theorems": [
    "Stone representation theorem"
   ],
   "book": "Givant & Halmos — Introduction to Boolean Algebras",
   "children": [
    {
     "label": "Boolean operations",
     "def": "AND, OR, NOT satisfying distributive and complement laws — the algebra of propositional logic and of subsets of a set, one structure wearing two hats."
    },
    {
     "label": "Ideals & filters",
     "def": "Dual notions of 'small' and 'large' subsets in a Boolean algebra. Ultrafilters (maximal filters) power ultraproducts and nonstandard analysis."
    },
    {
     "label": "Stone duality",
     "def": "Every Boolean algebra is the clopen-set algebra of a unique compact totally-disconnected space. Logic's algebra and topology's spaces revealed as one thing — a template for all later dualities."
    }
   ]
  },
  {
   "id": "universal-algebra",
   "domain": "order",
   "label": "Universal Algebra",
   "def": "What do groups, rings, and lattices have in common? Study 'an algebra' in general — operations satisfying equations — and prove theorems about all of them at once.",
   "theorems": [
    "Birkhoff's HSP theorem"
   ],
   "book": "Burris & Sankappanavar — A Course in Universal Algebra",
   "children": [
    {
     "label": "Algebras & signatures",
     "def": "A uniform framework: a set with operations of specified arities. Groups, rings, lattices become instances, and theorems proved once apply to all."
    },
    {
     "label": "Varieties",
     "def": "Classes of algebras defined by equations. Birkhoff's theorem: a class is a variety iff it is closed under subalgebras, products, and homomorphic images (HSP)."
    },
    {
     "label": "Free algebras",
     "def": "The most general algebra on a set of generators in a variety, from which every other is a quotient. The universal-algebra parent of free groups and polynomial rings."
    }
   ]
  }
 ],
 "edges": [
  {
   "from": "logic",
   "to": "set-theory",
   "type": "pre",
   "via": "Axiomatization",
   "note": "Set theory is a first-order theory: ZFC is written in predicate logic. Logic supplies the grammar; set theory supplies the universe.",
   "who": "Ernst Zermelo (1908); Fraenkel & Skolem (1922)",
   "story": "Zermelo wrote the first axioms for sets to defuse Russell's paradox; Fraenkel and Skolem added Replacement to get ZFC. The whole edifice is a first-order theory — logic supplies the grammar, ZFC supplies the universe every other object lives in."
  },
  {
   "from": "set-theory",
   "to": "point-set-topology",
   "type": "sig",
   "via": "Open-set axioms",
   "note": "A topology is nothing but a chosen family of subsets of a bare set, closed under unions and finite intersections. Structure added to a structureless set — the map's founding move.",
   "who": "Felix Hausdorff (1914)",
   "story": "In *Grundzüge der Mengenlehre* Hausdorff defined a space by nothing more than a chosen family of 'open' subsets of a bare set. This is the map's founding move: structure imposed on a structureless set, so that 'nearness' can be discussed without any notion of distance."
  },
  {
   "from": "logic",
   "to": "boolean",
   "type": "sig",
   "via": "Lindenbaum algebra",
   "note": "Quotient the sentences of a logic by provable equivalence and you get a Boolean algebra. Logic literally becomes algebra.",
   "who": "George Boole (1847); Adolf Lindenbaum (1920s)",
   "story": "Boole turned the laws of thought into algebra (AND, OR, NOT as ×, +, complement). Lindenbaum made it exact: quotient the sentences of a theory by provable equivalence and you get a Boolean algebra — logic literally becomes an algebraic object."
  },
  {
   "from": "logic",
   "to": "computability",
   "type": "pre",
   "via": "Formal systems",
   "note": "Incompleteness and undecidability are two faces of the same phenomenon: Gödel numbering turns proofs into computations.",
   "who": "Kurt Gödel (1931); Alan Turing (1936)",
   "story": "Gödel numbered proofs so that statements could talk about their own provability; Turing built the abstract machine that makes 'computation' precise. Undecidability and incompleteness are one phenomenon seen from two sides — proofs are computations."
  },
  {
   "from": "logic",
   "to": "model-theory",
   "type": "pre",
   "via": "Satisfaction relation",
   "note": "Model theory studies the ⊨ side of logic: which structures make which sentences true.",
   "who": "Alfred Tarski (1933)",
   "story": "Tarski defined truth: what it means for a structure to *satisfy* a sentence (the ⊨ relation). Model theory studies the gap between what a set of axioms says and the zoo of structures that obey them."
  },
  {
   "from": "set-theory",
   "to": "category-theory",
   "type": "pre",
   "via": "Foundational alternative",
   "note": "Category theory can be built on set theory — or proposed as a replacement foundation. The tension is productive.",
   "who": "Eilenberg & Mac Lane (1945); Lawvere (1964)",
   "story": "Categories were first a language for 'natural' constructions; Lawvere then proposed them as an alternative foundation (ETCS), describing sets by how functions compose rather than by membership. The rivalry between ∈ and ∘ as bedrock is still productive."
  },
  {
   "from": "category-theory",
   "to": "algebraic-topology",
   "type": "sig",
   "via": "Homology is a functor",
   "note": "Homology assigns groups to spaces and homomorphisms to maps, respecting composition. Category theory was invented (Eilenberg–Mac Lane, 1945) to say exactly this.",
   "who": "Samuel Eilenberg & Saunders Mac Lane (1945)",
   "story": "Category theory was invented precisely to make one sentence rigorous: homology is a functor. It assigns groups to spaces and homomorphisms to continuous maps while respecting composition, so topological facts become algebraic ones."
  },
  {
   "from": "category-theory",
   "to": "algebraic-geometry",
   "type": "sig",
   "via": "Sheaves & schemes",
   "note": "Grothendieck rebuilt algebraic geometry on categorical foundations: schemes, sheaves, and functors of points.",
   "who": "Alexander Grothendieck (1958–1970)",
   "story": "Grothendieck rebuilt geometry on categorical foundations — schemes, sheaves, and the functor-of-points view — dissolving the old boundary between a space and the ring of functions on it. Geometry became the study of certain categories."
  },
  {
   "from": "universal-algebra",
   "to": "category-theory",
   "type": "pre",
   "via": "Algebraic theories",
   "note": "Universal algebra's 'varieties' become Lawvere theories — one of category theory's first triumphs.",
   "who": "William Lawvere (1963)",
   "story": "In his thesis Lawvere recast an algebraic 'variety' (groups, rings, …) as a category with product-preserving functors — a Lawvere theory. The syntax of algebra became a diagram, one of category theory's first triumphs."
  },
  {
   "from": "linear-algebra",
   "to": "group-theory",
   "type": "pre",
   "via": "Matrix groups",
   "note": "GL(n), SO(n), U(n): the most important groups are groups of matrices.",
   "who": "Arthur Cayley (1854); Camille Jordan (1870)",
   "story": "Cayley gave the abstract definition of a group; Jordan showed the richest examples are groups of invertible matrices — GL(n), SO(n), U(n). Symmetry, written down, is linear algebra with a group law."
  },
  {
   "from": "group-theory",
   "to": "ring-theory",
   "type": "pre",
   "via": "Add a second operation",
   "note": "A ring is an abelian group with a compatible multiplication.",
   "who": "Richard Dedekind (1871); Emmy Noether (1921)",
   "story": "Dedekind isolated 'rings' of algebraic integers; Noether stripped them to axioms — one abelian group under +, a second operation ×, linked by distributivity. A ring is a group that learned to multiply."
  },
  {
   "from": "ring-theory",
   "to": "galois-theory",
   "type": "pre",
   "via": "Fields as rings",
   "note": "Fields are rings where division works; polynomial rings over them drive the whole theory of equations.",
   "who": "Évariste Galois (1832); reframed by Dedekind & Artin",
   "story": "Galois, at 20 and the night before a duel, tied solvability of an equation to a group of symmetries of its roots. Dedekind and Artin later recast the whole theory in the language of fields (special rings) and their automorphisms."
  },
  {
   "from": "ring-theory",
   "to": "commutative-algebra",
   "type": "pre",
   "via": "Commutativity",
   "note": "Restrict to commutative rings and a far deeper structure theory opens.",
   "who": "Hilbert (1890); Emmy Noether & Krull (1920s)",
   "story": "Hilbert's basis and Nullstellensatz theorems showed polynomial rings are tame; Noether and Krull built the axiomatic theory of commutative rings and their ideals — the local algebra that geometry is written in."
  },
  {
   "from": "galois-theory",
   "to": "group-theory",
   "type": "sig",
   "via": "Galois correspondence",
   "note": "Subfields of a splitting field correspond exactly to subgroups of its symmetry group. Solving equations becomes decomposing groups — arguably the single most beautiful bridge in algebra.",
   "who": "Évariste Galois (1832)",
   "story": "The Galois correspondence is a perfect dictionary: subfields of a field extension match subgroups of its symmetry group, order-reversing and exact. Solving a quintic by radicals fails because the group S₅ is not solvable — a geometric fact about symmetry, not arithmetic luck."
  },
  {
   "from": "group-theory",
   "to": "representation-theory",
   "type": "pre",
   "via": "Actions on vector spaces",
   "note": "Make the abstract group act linearly, then study the matrices.",
   "who": "Ferdinand Georg Frobenius (1896)",
   "story": "Frobenius asked how an abstract group can *act* — and found that every finite group is a group of matrices in essentially one best way, encoded by its characters. Abstract symmetry is made visible as linear symmetry."
  },
  {
   "from": "linear-algebra",
   "to": "representation-theory",
   "type": "pre",
   "via": "The target category",
   "note": "Representations land in vector spaces; character theory is applied linear algebra.",
   "who": "Frobenius, Schur & Maschke (1897–1905)",
   "story": "Representation theory lives in the category of vector spaces: a representation is a homomorphism from a group into GL(V). Schur's lemma and Maschke's theorem make the linear-algebra target the whole point — irreducible pieces are the atoms of symmetry."
  },
  {
   "from": "group-theory",
   "to": "lie-theory",
   "type": "pre",
   "via": "Continuous groups",
   "note": "Let the group be a smooth manifold and symmetry becomes continuous.",
   "who": "Sophus Lie (1873)",
   "story": "Lie asked what Galois's idea becomes when the group is *continuous* — a group that is also a smooth manifold. Differentiating at the identity linearises the group into a Lie algebra, trading geometry for bracket algebra."
  },
  {
   "from": "linear-algebra",
   "to": "homological-algebra",
   "type": "pre",
   "via": "Chain complexes",
   "note": "A chain complex is a sequence of vector spaces (or modules) with maps composing to zero.",
   "who": "Henri Cartan & Samuel Eilenberg (1956)",
   "story": "A chain complex is a sequence of linear maps whose composites vanish; its homology measures how far exactness fails. Cartan and Eilenberg abstracted this out of topology into pure algebra in their landmark book."
  },
  {
   "from": "real-analysis",
   "to": "measure-theory",
   "type": "pre",
   "via": "Riemann's failure modes",
   "note": "The Riemann integral chokes on limits of functions; Lebesgue's measure-first rebuild fixes exactly that.",
   "who": "Henri Lebesgue (1902)",
   "story": "Riemann's integral chokes on badly discontinuous functions and doesn't play well with limits. Lebesgue rebuilt integration by measuring the *domain* instead of slicing the range, taming the pathologies and making convergence theorems clean."
  },
  {
   "from": "real-analysis",
   "to": "complex-analysis",
   "type": "pre",
   "via": "ℝ² with multiplication",
   "note": "Complex differentiability is real differentiability plus the Cauchy–Riemann constraint — and that one constraint changes everything.",
   "who": "Cauchy (1825); Riemann (1851)",
   "story": "Give the plane ℝ² a multiplication (i²=−1) and demand differentiability, and rigidity erupts: a complex-differentiable function is analytic, determined by its values on any little disc. Cauchy's integral theorem and Riemann's geometric view opened the whole subject."
  },
  {
   "from": "measure-theory",
   "to": "functional-analysis",
   "type": "pre",
   "via": "Lᵖ spaces",
   "note": "The most important Banach spaces are spaces of integrable functions.",
   "who": "Frigyes Riesz (1910); Stefan Banach (1932)",
   "story": "The Lᵖ spaces — measurable functions with integrable p-th power — are complete normed vector spaces of *functions*. Riesz and Banach treated functions as points in an infinite-dimensional geometry, where analysis becomes linear algebra."
  },
  {
   "from": "linear-algebra",
   "to": "functional-analysis",
   "type": "sig",
   "via": "Hilbert space",
   "note": "Take inner-product linear algebra, let the dimension become infinite, add completeness: quantum mechanics' state space appears.",
   "who": "David Hilbert (1906); John von Neumann (1929)",
   "story": "A Hilbert space is finite-dimensional Euclidean geometry (dot product, angle, orthogonality) pushed to infinitely many dimensions and completed. Von Neumann's axioms made it the exact stage for quantum mechanics."
  },
  {
   "from": "functional-analysis",
   "to": "harmonic-analysis",
   "type": "pre",
   "via": "Orthonormal bases",
   "note": "Fourier series = expansion in the orthonormal basis e^{inx} of L².",
   "who": "Joseph Fourier (1807); Hilbert-space framing (1900s)",
   "story": "Fourier claimed any function is a sum of sines; a century later this became the statement that certain functions form an *orthonormal basis* of a Hilbert space. Decomposition into frequencies is choosing coordinates in an infinite-dimensional space."
  },
  {
   "from": "representation-theory",
   "to": "harmonic-analysis",
   "type": "sig",
   "via": "Fourier = reps of the circle",
   "note": "The functions e^{inθ} are exactly the irreducible representations of the circle group. Fourier analysis is representation theory of abelian groups — Pontryagin duality makes it precise.",
   "who": "Peter & Weyl (1927); Pontryagin (1934)",
   "story": "Fourier analysis on the circle *is* the representation theory of the group of rotations. Peter–Weyl and Pontryagin duality generalised this: harmonic analysis is representation theory of symmetry groups, and frequencies are irreducible representations."
  },
  {
   "from": "real-analysis",
   "to": "odes",
   "type": "pre",
   "via": "Fixed-point arguments",
   "note": "Picard–Lindelöf is the Banach fixed point theorem applied to an integral operator.",
   "who": "Cauchy; Picard & Lindelöf (1890s)",
   "story": "Does a differential equation have a solution, and only one? Picard turned the equation into a contraction map and let its unique fixed point *be* the solution — existence and uniqueness fall out of a limiting process in analysis."
  },
  {
   "from": "odes",
   "to": "pdes",
   "type": "pre",
   "via": "More variables",
   "note": "Let the unknown depend on several variables and derivatives couple.",
   "who": "Euler & d'Alembert (18th century)",
   "story": "Let the unknown depend on several variables — space as well as time — and ordinary derivatives become partial ones. D'Alembert's wave equation and Euler's fluid equations were the first, and physics has lived here ever since."
  },
  {
   "from": "functional-analysis",
   "to": "pdes",
   "type": "pre",
   "via": "Sobolev spaces & weak solutions",
   "note": "Modern PDE is operator theory on Sobolev spaces: solve first in a weak sense, then upgrade regularity.",
   "who": "Sergei Sobolev (1936); Laurent Schwartz (1945)",
   "story": "Classical solutions are too rigid; Sobolev and Schwartz allowed *weak* ones — functions differentiable only in an averaged, distributional sense, living in Sobolev spaces. Modern PDE theory is functional analysis on these spaces."
  },
  {
   "from": "pdes",
   "to": "variations",
   "type": "pre",
   "via": "Euler–Lagrange",
   "note": "Minimizers of functionals satisfy PDEs; many PDEs are secretly optimality conditions.",
   "who": "Euler & Lagrange (1755)",
   "story": "The Euler–Lagrange equation is the bridge: minimising an integral (least action, least area) is equivalent to solving a PDE. Nature's optimisation principles and its differential laws are two readings of the same statement."
  },
  {
   "from": "odes",
   "to": "dynamical-systems",
   "type": "pre",
   "via": "Flows",
   "note": "Follow solutions for infinite time and qualitative questions take over: stability, recurrence, chaos.",
   "who": "Henri Poincaré (1881)",
   "story": "Poincaré stopped trying to solve orbits by formula and studied the *flow* qualitatively — fixed points, periodic orbits, stability, chaos. The geometry of the phase portrait replaced the search for a closed-form solution."
  },
  {
   "from": "measure-theory",
   "to": "dynamical-systems",
   "type": "pre",
   "via": "Invariant measures",
   "note": "Ergodic theory is dynamics on a measure space: time average = space average.",
   "who": "George Birkhoff & John von Neumann (1931)",
   "story": "If a flow preserves a measure, long-time averages equal space averages — Birkhoff's ergodic theorem. Measure theory turns 'where does an orbit spend its time?' into a rigorous, computable question."
  },
  {
   "from": "classical-geometry",
   "to": "point-set-topology",
   "type": "pre",
   "via": "Abstracting space",
   "note": "Drop distances and angles, keep only nearness.",
   "who": "Maurice Fréchet (1906); Felix Hausdorff (1914)",
   "story": "Fréchet abstracted distance into a metric space; Hausdorff then dropped distance entirely, keeping only open sets. Geometry's rigid figures dissolve into topology's rubber-sheet spaces where only connectivity and nearness survive."
  },
  {
   "from": "point-set-topology",
   "to": "algebraic-topology",
   "type": "pre",
   "via": "Invariants",
   "note": "Point-set methods can't distinguish a sphere from a torus; algebraic invariants can.",
   "who": "Henri Poincaré (1895)",
   "story": "In *Analysis Situs* Poincaré attached groups to spaces — the fundamental group counts loops that cannot be shrunk. A hole, an inherently topological thing, becomes a nonzero element of an algebraic object you can compute with."
  },
  {
   "from": "point-set-topology",
   "to": "differential-topology",
   "type": "pre",
   "via": "Manifolds = locally ℝⁿ",
   "note": "A manifold is a topological space glued from Euclidean patches; smoothness makes calculus possible on it.",
   "who": "Bernhard Riemann (1854); Hassler Whitney (1936)",
   "story": "A manifold is a space that looks like ℝⁿ up close, so calculus can run locally and be patched globally. Whitney's embedding theorems put these abstract spaces on rigorous footing as the natural home of smoothness."
  },
  {
   "from": "real-analysis",
   "to": "differential-topology",
   "type": "pre",
   "via": "Calculus on charts",
   "note": "Everything smooth on a manifold is defined by pulling back to ℝⁿ through charts.",
   "who": "Hassler Whitney (1936)",
   "story": "Charts let you import the derivative from ℝⁿ onto a curved manifold; the chain rule guarantees the answer is chart-independent. Whitney's foundations make differential calculus a global, coordinate-free enterprise."
  },
  {
   "from": "differential-topology",
   "to": "differential-geometry",
   "type": "pre",
   "via": "Add a metric",
   "note": "A Riemannian metric — an inner product on each tangent space — gives the bare manifold distances, angles, volume, curvature. Structure added one layer at a time.",
   "who": "Bernhard Riemann (1854)",
   "story": "A smooth manifold knows shape but not size. Riemann added a metric — an inner product in every tangent space — and suddenly length, angle, and curvature can be *measured from the inside*, with no ambient space needed."
  },
  {
   "from": "variations",
   "to": "differential-geometry",
   "type": "sig",
   "via": "Geodesics as critical points",
   "note": "Geodesics are critical points of the length functional. The straightest possible line, defined by optimization.",
   "who": "Euler, Lagrange & Jacobi (18th–19th c.)",
   "story": "A geodesic is a critical point of the length (or energy) functional — the calculus of variations applied on a curved space. 'Straightest possible path' and 'locally shortest path' are made the same statement by the Euler–Lagrange equations."
  },
  {
   "from": "differential-geometry",
   "to": "algebraic-topology",
   "type": "sig",
   "via": "Gauss–Bonnet",
   "note": "∫ K dA = 2πχ: total curvature (geometry, local) equals Euler characteristic (topology, global). Bend a surface however you like — the integral never moves.",
   "who": "Gauss (1827) & Bonnet (1848); Chern (1944)",
   "story": "Gauss–Bonnet is the miracle: integrate local curvature over a closed surface and you always get 2π times its Euler characteristic — a topological integer. Chern's generalisation made this the template for the entire theory of characteristic classes."
  },
  {
   "from": "pdes",
   "to": "low-dim-topology",
   "type": "sig",
   "via": "Ricci flow ⇒ Poincaré",
   "note": "Perelman proved the Poincaré conjecture — a pure topology statement — by running a PDE (Ricci flow) on the space of metrics. The maximal cross-domain edge on this map.",
   "who": "Richard Hamilton (1982); Grigori Perelman (2003)",
   "story": "Hamilton's Ricci flow is a PDE that evolves a metric like heat diffusing, smoothing a 3-manifold toward a round sphere. Perelman controlled its singularities to prove the Poincaré conjecture — an analysis argument settling a purely topological question."
  },
  {
   "from": "group-theory",
   "to": "classical-geometry",
   "type": "sig",
   "via": "Erlangen program",
   "note": "Klein, 1872: a geometry is defined by its group of allowed transformations. Euclidean, hyperbolic, projective geometry differ only by which group acts.",
   "who": "Felix Klein (1872)",
   "story": "Klein's Erlangen program redefined a geometry as the study of whatever a group of transformations leaves invariant. Euclidean, affine, projective, hyperbolic geometry become one hierarchy — chosen by choosing a symmetry group."
  },
  {
   "from": "algebraic-topology",
   "to": "low-dim-topology",
   "type": "pre",
   "via": "Invariants of knots & 3-manifolds",
   "note": "Fundamental groups of knot complements, homology of 3-manifolds.",
   "who": "J.W. Alexander (1928); Vaughan Jones (1984)",
   "story": "Algebraic invariants tell knots and 3-manifolds apart: Alexander's polynomial, then Jones's polynomial from operator algebras, distinguish shapes that look hopelessly alike. Topology in low dimensions is unreasonably rich and needs this algebra."
  },
  {
   "from": "commutative-algebra",
   "to": "algebraic-geometry",
   "type": "sig",
   "via": "Nullstellensatz / Spec",
   "note": "Hilbert's Nullstellensatz is a dictionary: radical ideals ↔ point sets. Grothendieck's Spec turns any commutative ring into a geometric space. Algebra ↔ geometry, verbatim.",
   "who": "Hilbert (1893); Grothendieck (Spec, 1960)",
   "story": "Hilbert's Nullstellensatz makes a perfect dictionary between geometric solution sets and ideals in a polynomial ring. Grothendieck completed it: every commutative ring *is* a space, its 'points' the prime ideals — Spec(R). Algebra and geometry become the same subject."
  },
  {
   "from": "complex-analysis",
   "to": "algebraic-geometry",
   "type": "pre",
   "via": "Riemann surfaces = algebraic curves",
   "note": "Every compact Riemann surface is a smooth projective algebraic curve — analysis and algebra describe the same objects.",
   "who": "Bernhard Riemann (1857)",
   "story": "Riemann realised a multivalued complex function is best seen as a single-valued function on a curved surface — a Riemann surface — and that these surfaces are exactly the complex algebraic curves. Analysis and algebra meet in one geometric object."
  },
  {
   "from": "differential-geometry",
   "to": "fiber-bundles",
   "type": "pre",
   "via": "Tangent bundle",
   "note": "The tangent spaces of a manifold assemble into the first and most important vector bundle.",
   "who": "Hassler Whitney (1935); Charles Ehresmann (1940s)",
   "story": "The tangent bundle glues a vector space (the tangent plane) to every point of a manifold, twisted globally even when locally trivial. Whitney and Ehresmann abstracted this into fiber bundles — the geometry of 'a space attached to every point'."
  },
  {
   "from": "lie-theory",
   "to": "fiber-bundles",
   "type": "pre",
   "via": "Principal bundles",
   "note": "A principal bundle has a Lie group acting on its fibers — the structure underlying every gauge theory.",
   "who": "Élie Cartan & Charles Ehresmann (1940s)",
   "story": "A principal bundle attaches a whole Lie group to each point of space; a connection tells you how to compare fibers as you move. This is the exact mathematics of a gauge field — the framework of the Standard Model."
  },
  {
   "from": "lie-theory",
   "to": "differential-geometry",
   "type": "pre",
   "via": "Groups as manifolds",
   "note": "Lie groups are the symmetric spaces of differential geometry; homogeneous spaces are their quotients.",
   "who": "Sophus Lie; Élie Cartan (1920s)",
   "story": "A Lie group is simultaneously an algebraic group and a smooth manifold, so it carries its own geometry. Cartan used the group's structure to build canonical connections and curvature — symmetry and shape fused in one object."
  },
  {
   "from": "homological-algebra",
   "to": "algebraic-topology",
   "type": "pre",
   "via": "Born here",
   "note": "Chain complexes and exact sequences were invented to compute homology of spaces, then abstracted.",
   "who": "Emmy Noether (1925); Cartan–Eilenberg (1956)",
   "story": "Noether pointed out that Poincaré's Betti *numbers* were really the ranks of homology *groups* — turning bookkeeping into algebra. Chain complexes and exact sequences then grew into an independent subject that feeds back into topology everywhere."
  },
  {
   "from": "algebraic-topology",
   "to": "fiber-bundles",
   "type": "pre",
   "via": "Characteristic classes",
   "note": "Bundles are measured by cohomology classes — Chern, Pontryagin, Euler.",
   "who": "Stiefel–Whitney (1935); Chern (1946)",
   "story": "Characteristic classes are cohomology elements that measure how badly a bundle is twisted — obstruction to it being trivial. Chern and Stiefel–Whitney classes let topology detect and classify the twisting quantitatively."
  },
  {
   "from": "elementary-nt",
   "to": "analytic-nt",
   "type": "pre",
   "via": "Counting primes",
   "note": "How many primes below x? The question is elementary; the answer needs complex analysis.",
   "who": "Leonhard Euler (1737); Peter Dirichlet (1837)",
   "story": "Euler factored the harmonic series over primes, linking a sum to the primes' distribution; Dirichlet used infinite series to prove primes crowd every arithmetic progression. Counting primes became a problem in analysis."
  },
  {
   "from": "complex-analysis",
   "to": "analytic-nt",
   "type": "sig",
   "via": "Riemann zeta function",
   "note": "Euler: ζ(s) = Σ n^{-s} = Π (1−p^{-s})^{-1}. A sum over integers equals a product over primes — and the zeros of ζ in the complex plane control the error term in the prime number theorem.",
   "who": "Bernhard Riemann (1859)",
   "story": "In a six-page paper Riemann continued the zeta function into the complex plane and tied the primes' distribution to the zeros of ζ(s). The Riemann Hypothesis — that the nontrivial zeros lie on one line — is the deepest open bridge on this map."
  },
  {
   "from": "elementary-nt",
   "to": "algebraic-nt",
   "type": "pre",
   "via": "Factorization beyond ℤ",
   "note": "Fermat-type equations force you into rings like ℤ[√−5], where unique factorization fails and ideals repair it.",
   "who": "Ernst Kummer (1847); Richard Dedekind (1871)",
   "story": "Unique factorisation fails in rings like ℤ[√−5], which sank early attempts at Fermat's Last Theorem. Kummer's 'ideal numbers', made rigorous as Dedekind's ideals, restored a factorisation theory beyond the ordinary integers."
  },
  {
   "from": "ring-theory",
   "to": "algebraic-nt",
   "type": "pre",
   "via": "Dedekind domains",
   "note": "Rings of integers in number fields are the motivating examples of ideal theory.",
   "who": "Richard Dedekind (1871)",
   "story": "Dedekind domains are the rings where ideals — not elements — factor uniquely into primes. This single ring-theoretic notion is what makes arithmetic possible inside the integers of any number field."
  },
  {
   "from": "galois-theory",
   "to": "algebraic-nt",
   "type": "pre",
   "via": "Galois groups of number fields",
   "note": "Ramification and splitting of primes are read off Galois groups — class field theory grows from here.",
   "who": "David Hilbert (1897); Takagi & Artin (1920s)",
   "story": "The Galois group of a number field controls how primes split inside it. Class field theory — Hilbert's vision, proved by Takagi and Artin — makes the abelian part of that symmetry match the field's arithmetic exactly."
  },
  {
   "from": "algebraic-nt",
   "to": "modular-forms",
   "type": "pre",
   "via": "L-functions",
   "note": "To every arithmetic object, an L-function; to many L-functions, a modular form.",
   "who": "Erich Hecke (1936)",
   "story": "Hecke attached an L-function to each modular form and showed its arithmetic mirrors that of number fields. These L-functions are the currency in which number theory and modular forms trade information."
  },
  {
   "from": "analytic-nt",
   "to": "modular-forms",
   "type": "pre",
   "via": "q-expansions",
   "note": "Modular forms are the natural generating functions of analytic number theory.",
   "who": "Carl Jacobi (1829); Erich Hecke (1930s)",
   "story": "A modular form is encoded by its q-expansion — a power series whose coefficients are arithmetic sequences. Jacobi's theta functions were the first examples; Hecke turned the coefficients into a systematic analytic theory."
  },
  {
   "from": "algebraic-geometry",
   "to": "modular-forms",
   "type": "sig",
   "via": "Elliptic curves",
   "note": "An elliptic curve is simultaneously a cubic equation (algebraic geometry), a torus ℂ/Λ (complex analysis), and a group (algebra). The modularity theorem ties them to modular forms — and Fermat's Last Theorem fell as a corollary.",
   "who": "Eichler & Shimura (1950s); Andrew Wiles (1994)",
   "story": "Every elliptic curve over ℚ secretly comes from a modular form — the Modularity Theorem. Eichler–Shimura opened the correspondence; Wiles proved enough of it to kill Fermat's Last Theorem after 350 years."
  },
  {
   "from": "partitions",
   "to": "analytic-nt",
   "type": "sig",
   "via": "Hardy–Ramanujan circle method",
   "note": "Counting partitions exactly required inventing the circle method — contour integration applied to a combinatorial generating function. Ramanujan's fingerprints are on both ends of this edge.",
   "who": "G. H. Hardy & Srinivasa Ramanujan (1918)",
   "story": "To count the partitions of n, Hardy and Ramanujan integrated a generating function around the unit circle, extracting an astonishingly accurate asymptotic formula. Their circle method became a workhorse of analytic number theory."
  },
  {
   "from": "partitions",
   "to": "modular-forms",
   "type": "sig",
   "via": "Ramanujan's congruences",
   "note": "p(5n+4) ≡ 0 mod 5 — explained by the modular transformation properties of the eta function. Combinatorics governed by hidden modular symmetry.",
   "who": "Srinivasa Ramanujan (1919)",
   "story": "Ramanujan spotted that p(5n+4) is always divisible by 5, and similar congruences mod 7 and 11. The explanation is that the partition generating function is essentially a modular form — a bare counting fact revealing deep symmetry."
  },
  {
   "from": "elementary-nt",
   "to": "diophantine",
   "type": "pre",
   "via": "Integer solutions",
   "note": "Pell equations and continued fractions open the approximation theory of irrationals.",
   "who": "Diophantus (c. 250 AD); Pierre de Fermat (1637)",
   "story": "Diophantine equations demand *integer* solutions, which turns easy-looking equations into ferociously hard ones. Fermat's marginal note launched three centuries of number theory; Matiyasevich later proved no general algorithm can decide them."
  },
  {
   "from": "enumerative",
   "to": "partitions",
   "type": "pre",
   "via": "Generating functions",
   "note": "The partition generating function Π(1−qⁿ)^{-1} is enumerative combinatorics' most famous product.",
   "who": "Leonhard Euler (1748)",
   "story": "Euler encoded a counting problem as a product of geometric series — a generating function — so that partition identities become algebraic manipulations of power series. Counting and analysis merge in a single formal object."
  },
  {
   "from": "enumerative",
   "to": "graph-theory",
   "type": "pre",
   "via": "Counting structures",
   "note": "Counting trees, matchings, colorings.",
   "who": "Leonhard Euler (1736); Arthur Cayley (1857)",
   "story": "Euler's Königsberg-bridges argument abstracted a city into dots and lines, founding graph theory as the combinatorics of connection. Cayley's count of labelled trees showed how deep the enumeration of such structures runs."
  },
  {
   "from": "graph-theory",
   "to": "ramsey",
   "type": "pre",
   "via": "Colorings of complete graphs",
   "note": "Ramsey's theorem is a statement about edge-colorings of Kₙ.",
   "who": "Frank Ramsey (1930)",
   "story": "Ramsey proved that complete disorder is impossible: colour a large enough complete graph any way you like and a monochromatic clique is forced. Structure emerges purely from size — the origin of Ramsey theory."
  },
  {
   "from": "prob-spaces",
   "to": "ramsey",
   "type": "sig",
   "via": "The probabilistic method",
   "note": "Erdős: to prove a graph with property X exists, show a random graph has X with positive probability. Existence proofs with no construction — probability as pure logic.",
   "who": "Paul Erdős (1947)",
   "story": "To prove a graph with no large clique or independent set exists, Erdős built a *random* one and showed the bad event has probability below 1. Proving existence without construction — the probabilistic method — reshaped combinatorics."
  },
  {
   "from": "linear-algebra",
   "to": "graph-theory",
   "type": "pre",
   "via": "Spectral graph theory",
   "note": "A graph's adjacency matrix has eigenvalues; they know the graph's connectivity, expansion, and more.",
   "who": "Gustav Kirchhoff (1847); modern spectral theory",
   "story": "Encode a graph as a matrix and its eigenvalues expose hidden structure — connectivity, expansion, the number of spanning trees (Kirchhoff's theorem). Spectral graph theory reads combinatorics off the spectrum of linear algebra."
  },
  {
   "from": "measure-theory",
   "to": "prob-spaces",
   "type": "sig",
   "via": "Kolmogorov's axioms",
   "note": "1933: probability is a measure of total mass 1; random variables are measurable functions; expectation is the Lebesgue integral. Probability becomes a theorem-safe branch of analysis overnight.",
   "who": "Andrey Kolmogorov (1933)",
   "story": "Kolmogorov identified probability with measure theory: a sample space is a measure space of total mass 1, events are measurable sets, expectation is the integral. This axiomatisation turned probability into rigorous mathematics overnight."
  },
  {
   "from": "prob-spaces",
   "to": "limit-theorems",
   "type": "pre",
   "via": "Independence + averaging",
   "note": "The LLN and CLT are statements about sums of independent random variables.",
   "who": "Jacob Bernoulli (1713); Aleksandr Lyapunov (1901)",
   "story": "Average many independent random quantities and the mess collapses to a law: Bernoulli's law of large numbers, then the central limit theorem's universal bell curve. Lyapunov gave the modern proof via characteristic functions."
  },
  {
   "from": "limit-theorems",
   "to": "stochastic-processes",
   "type": "pre",
   "via": "Time enters",
   "note": "Index random variables by time; convergence questions become path questions.",
   "who": "Andrey Markov (1906); Norbert Wiener (1923)",
   "story": "Let randomness unfold in time and you get a stochastic process — Markov chains where only the present matters, or Wiener's Brownian motion, a rigorous model of the continuous random walk. Limit theorems become statements about whole trajectories."
  },
  {
   "from": "functional-analysis",
   "to": "stochastic-processes",
   "type": "pre",
   "via": "Semigroups & generators",
   "note": "Markov processes correspond to operator semigroups; Brownian motion's generator is the Laplacian — probability meets PDE.",
   "who": "Hille & Yosida (1948); William Feller (1950s)",
   "story": "A Markov process is run by a semigroup of operators; its generator is an (often differential) operator on a function space. The Hille–Yosida theorem ties the probabilistic dynamics to functional analysis, linking diffusions to PDEs."
  },
  {
   "from": "real-analysis",
   "to": "prob-spaces",
   "type": "pre",
   "via": "Pathologies made natural",
   "note": "A nowhere-differentiable continuous function is an analysis pathology — and the typical Brownian path.",
   "who": "Émile Borel (1909)",
   "story": "Borel's normal-number theorem showed that measure-theoretic 'almost every' is the natural language for chance: pick a real number at random and it is almost surely normal. Analytic pathologies become probabilistic certainties."
  },
  {
   "from": "set-theory",
   "to": "lattices",
   "type": "pre",
   "via": "Partial orders",
   "note": "Orders are relations; the subject begins where set theory's relation chapter ends.",
   "who": "Richard Dedekind (1900); Garrett Birkhoff (1940)",
   "story": "Order a set by ⊆ and every pair of elements has a least upper and greatest lower bound — a lattice. Dedekind found the first laws; Birkhoff built lattice theory into the general study of order-structure."
  },
  {
   "from": "lattices",
   "to": "boolean",
   "type": "pre",
   "via": "Distributive + complemented",
   "note": "Boolean algebras are the best-behaved lattices.",
   "who": "George Boole (1847); Birkhoff & Stone (1930s)",
   "story": "A Boolean algebra is exactly a distributive, complemented lattice — the algebra of AND/OR/NOT seen as an order structure. Logic, set operations, and switching circuits all turn out to be the same lattice."
  },
  {
   "from": "lattices",
   "to": "universal-algebra",
   "type": "pre",
   "via": "Congruence lattices",
   "note": "The congruences of any algebra form a lattice; universal algebra studies algebras through them.",
   "who": "Garrett Birkhoff (1935)",
   "story": "The congruences (compatible equivalence relations) of any algebra themselves form a lattice, and its shape controls the algebra's structure. Birkhoff made this the organising principle of universal algebra."
  },
  {
   "from": "boolean",
   "to": "point-set-topology",
   "type": "sig",
   "via": "Stone duality",
   "note": "Every Boolean algebra is the algebra of clopen sets of a compact space. Logic's algebra and topology's spaces are two descriptions of one thing.",
   "who": "Marshall Stone (1936)",
   "story": "Stone duality is a perfect mirror: every Boolean algebra is the algebra of clopen sets of a compact totally-disconnected space, and vice versa. Pure logic (Boolean algebras) and geometry (Stone spaces) are the same information twice."
  }
 ]
};
