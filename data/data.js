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
     "def": "Five postulates from which plane geometry unfolds. The fifth (parallels) resisted proof for two millennia — because it is independent of the others.",
     "detail": "Euclid's Elements (c. 300 BC) builds all of plane geometry from five postulates about undefined primitives — point, line, circle — plus common notions about equality. The first four are innocuous (two points span a line; segments extend; circles exist; right angles agree). The fifth, the parallel postulate, is different in kind: through a point not on a line passes exactly one line missing it. Hilbert's 1899 axiomatization closed the gaps Euclid glossed over (betweenness, continuity, congruence as primitive relations), making the system genuinely formal.\n\nA canonical instance of the method: the base angles of an isosceles triangle are equal (Elements I.5) — proved by pure congruence-pushing (SAS), with no measurement anywhere. By contrast, \"the angles of a triangle sum to two right angles\" cannot be proved without the fifth postulate; it is equivalent to it.\n\nTwo millennia of failed attempts to prove the fifth postulate from the other four ended with Bolyai and Lobachevsky constructing geometries where it fails. That reversal — axioms define a space rather than describe the space — created the modern axiomatic method, and with it model theory's core question: what is provable from what?"
    },
    {
     "label": "Hyperbolic geometry",
     "def": "Constant negative curvature: through a point, infinitely many parallels; triangle angles sum to less than π, with deficit proportional to area.",
     "detail": "The geometry of constant curvature −1: all of Euclid's axioms hold except the fifth — through a point off a line pass infinitely many lines that never meet it. Its standard models put the whole infinite plane inside finite pictures: the Poincaré disk (geodesics are diameters and circular arcs meeting the boundary at right angles, angles are honest), the upper half-plane with metric (dx²+dy²)/y², and the hyperboloid model where the isometry group is the Lorentz group O(2,1).\n\nTriangles here are thin: the angle sum is always less than π, and the deficit IS the area — a triangle with angles α, β, γ has area π−(α+β+γ), so triangles can never have area exceeding π. This makes tilings possible that Euclid forbids: the {7,3} tiling by regular heptagons, three around each vertex, floods the disk with congruent tiles (the interactive hyperbolic-disk atom on this map draws it).\n\nHyperbolic geometry proved the parallel postulate independent — but its afterlife matters more: almost every surface (genus ≥ 2) carries hyperbolic geometry, it is the generic geometry of 3-manifolds in Thurston's picture, and its isometry group PSL(2,ℝ) ties it to modular forms and number theory. In geometric group theory, Gromov's hyperbolic groups export its thin-triangles behaviour to algebra at large."
    },
    {
     "label": "Spherical geometry",
     "def": "Constant positive curvature: no parallels exist, triangle angles exceed π, and geodesics are great circles.",
     "detail": "Geometry on the sphere S²: \"lines\" are great circles, the curves cut by planes through the centre. There are no parallels at all — any two great circles meet in a pair of antipodal points. Distances are arc lengths, and the curvature is constant +1 (for the unit sphere). Identifying antipodal points yields elliptic geometry on the projective plane, where two lines meet exactly once.\n\nTriangles here are fat: the angle sum exceeds π, and Girard's theorem says the excess is the area — a triangle with three right angles (one octant of the sphere, vertices at the pole and two equatorial points a quarter-turn apart) has excess π/2, which is exactly its area. Spherical trigonometry turns this into formulas that navigators and astronomers used for centuries; great-circle routes are why flights from Delhi to San Francisco pass near the pole.\n\nThe sphere is the oldest worked example of a non-Euclidean geometry — practiced by Menelaus and al-Bīrūnī long before anyone called it that — and in modern Riemannian geometry it is the model space of positive curvature: comparison theorems (Bonnet–Myers, Toponogov) measure every other space against it."
    },
    {
     "label": "Projective geometry",
     "def": "Add points at infinity so that any two lines meet. Perspective made rigorous — and duality swaps points with lines.",
     "detail": "Enlarge the plane with a point at infinity for each direction, and parallel lines lose their exceptional status: every two lines meet in exactly one point. The result is the projective plane ℝP², coordinatized by homogeneous coordinates [x:y:z] (nonzero triples up to scale), with projective space ℙⁿ the general construction. Its transformations are the projectivities PGL(n+1) — exactly the maps a camera or a perspective drawing performs — and its fundamental invariant is the cross-ratio of four collinear points, since distance and even ratios of lengths are not preserved.\n\nProjective duality swaps points with lines and theorems with theorems: Pappus and Desargues come in dual pairs. And the conics collapse into one: ellipse, parabola, and hyperbola are the same projective curve, distinguished only by how they meet the line at infinity (missing it, tangent to it, crossing it) — one theorem about conics now does the work of three.\n\nProjective space is the natural home of algebraic geometry: only there does Bézout's count of intersection points come out exact. Via Cayley–Klein metrics, Euclidean, hyperbolic, and elliptic geometry all sit inside projective geometry as subgeometries — the observation that set up Klein's Erlangen program."
    },
    {
     "label": "Erlangen program",
     "def": "Klein 1872: a geometry is the study of invariants of a transformation group. The group is the geometry.",
     "detail": "Klein's 1872 manifesto defines a geometry as a space together with a transformation group acting on it; the geometry's content is whatever the group leaves invariant. Euclidean geometry is the invariant theory of the isometry group (distances, angles); affine geometry of the affine group (parallelism, ratios along lines); projective geometry of PGL (incidence, cross-ratio). Each enlargement of the group coarsens the geometry, giving the hierarchy projective ⊃ affine ⊃ similarity ⊃ Euclidean.\n\nThe program explains at a glance facts that look like coincidences. Why is cross-ratio \"the\" projective invariant? Because PGL(2) acts sharply 3-transitively on the projective line: three points can be sent anywhere, so the first nontrivial invariant needs four. Why does every affine theorem about parallelograms survive shearing but not every Euclidean theorem about squares? The shear is in the affine group but not the Euclidean one.\n\nErlangen turned geometry into group theory and gave symmetry its modern, structural meaning. Lie's continuous groups grew alongside it, Cartan geometrized it into connections modeled on homogeneous spaces, and twentieth-century physics adopted it wholesale: special relativity is the invariant theory of the Poincaré group, gauge theory of local symmetry groups. When this map's bridges cite \"symmetry,\" they cite Erlangen."
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
     "def": "A set plus a family of 'open' subsets closed under unions and finite intersections — the minimal structure in which limits and continuity make sense.",
     "detail": "A topological space is a set X with a chosen family τ of \"open\" subsets, required only to contain ∅ and X and to be closed under arbitrary unions and finite intersections. That single asymmetry — arbitrary unions, finite intersections — is the whole axiom system. Continuity becomes: preimages of open sets are open; homeomorphism (continuous bijection with continuous inverse) is the notion of \"same space.\" Every metric space gives a topology via open balls, but so do stranger beasts: the discrete and indiscrete topologies, the cofinite topology, the Zariski topology of algebraic geometry.\n\nThe classic computation: the open interval (0,1) is homeomorphic to the whole line ℝ — stretch it with t ↦ tan(π(t−½)). So \"length\" and \"boundedness\" are not topological properties. But [0,1] is NOT homeomorphic to (0,1): removing an endpoint leaves [0,1) connected, while removing any point of (0,1) disconnects it — and compactness separates them too.\n\nThis minimal vocabulary of nearness is the substrate everything else on this map stands on: manifolds are locally-Euclidean topological spaces, analysis runs on limits and continuity, algebraic geometry reads ring theory through the Zariski topology, and functional analysis lives on topologies (weak, weak-*) that no metric induces."
    },
    {
     "label": "Bases & subbases",
     "def": "Generating a topology from simple building blocks, exactly as metric balls generate the metric topology.",
     "detail": "A base for a topology is a family of opens such that every open set is a union of them — it generates the topology the way a spanning set generates a vector space. The criterion for a family to be a base of some topology: it covers X, and whenever x lies in the overlap of two basic sets, some third basic set contains x inside that overlap. A subbase is even cheaper: any family at all, whose finite intersections then form a base. A space with a countable base is called second countable — the size condition that keeps spaces tame.\n\nThe plane's standard topology has as base the open rectangles (a,b)×(c,d) — this is the product topology of two copies of ℝ. For infinite products, the right topology is defined by the subbase of \"cylinders\" constraining one coordinate at a time; finite intersections constrain finitely many coordinates, and that finiteness is precisely why Tychonoff's compactness theorem works for arbitrary products.\n\nBases are how topologies are specified in practice — nobody lists all open sets. The Zariski topology is given by its closed sets (zero sets of polynomials), the Sorgenfrey line by half-open intervals [a,b), and metrization theory (Urysohn: regular + second countable ⇒ metrizable) runs on counting a base."
    },
    {
     "label": "Hausdorff & separation axioms",
     "def": "A ladder of axioms grading how well open sets can tell points apart. Hausdorff is the one that makes limits unique.",
     "detail": "The separation axioms grade how well a topology distinguishes points and sets. T1: singletons are closed. T2 (Hausdorff): distinct points have disjoint open neighborhoods — the axiom that makes limits unique. T3 (regular): a point can be separated from a closed set. T4 (normal): two disjoint closed sets can be separated — the strongest, and the one carrying the two workhorse theorems: Urysohn's lemma (disjoint closed sets are separated by a continuous [0,1]-valued function) and Tietze extension (continuous functions on closed subsets extend).\n\nTwo instructive failures. The line with two origins — glue two copies of ℝ everywhere except at 0 — is locally exactly like ℝ, yet a sequence approaching zero converges to both origins at once: locally Euclidean does not imply Hausdorff, which is why the manifold definition demands Hausdorff separately. And the Zariski topology on affine space is T1 but never Hausdorff: any two nonempty opens intersect, since two polynomials cannot vanish on complementary dense sets.\n\nThe ladder calibrates every geometric construction: quotients are where Hausdorffness typically breaks (moduli problems!), normality is what makes partitions of unity exist — and partitions of unity are how every global object in differential geometry (metrics, connections) gets built from local pieces."
    },
    {
     "label": "Compactness",
     "def": "Every open cover admits a finite subcover — 'the next best thing to being finite'. Heine–Borel: in ℝⁿ, compact = closed and bounded.",
     "detail": "A space is compact when every open cover admits a finite subcover — an \"arbitrary\" reduced to a \"finite\" with no loss. In metric spaces compactness is equivalent to sequential compactness (every sequence has a convergent subsequence) and to complete + totally bounded. Heine–Borel makes it concrete in ℝⁿ: compact means closed and bounded. Tychonoff's theorem — any product of compact spaces is compact — is the axiom of choice wearing topology's clothes, and powers half of functional analysis.\n\nThe interval [0,1] is compact; (0,1) is not — the cover by intervals (1/n, 1) has no finite subcover, which is the honest reason a continuous function on (0,1) like 1/x can escape to infinity while a continuous function on [0,1] must attain a maximum. Every existence-of-extrema argument in optimization is this one fact.\n\nCompactness is analysis's finiteness principle: it upgrades local to global (continuous on compact ⇒ uniformly continuous), it makes limits exist (Arzelà–Ascoli, Banach–Alaoglu), it makes spectra of operators behave, and in algebraic geometry its cousin properness is what makes projective varieties complete. When an existence proof feels like magic, compactness is usually the trick."
    },
    {
     "label": "Connectedness",
     "def": "The space cannot be split into two disjoint nonempty open pieces; path-connectedness is the walkable version. Both survive continuous maps.",
     "detail": "A space is connected if it cannot be split into two disjoint nonempty open pieces; equivalently, its only subsets that are both open and closed are ∅ and the whole space. Path-connectedness — any two points joined by a continuous path — is stronger. Every space shatters uniquely into connected components. The connected subsets of ℝ are exactly the intervals, and that single fact IS the intermediate value theorem: a continuous image of a connected set is connected.\n\nThe standard counterexample separating the two notions is the topologist's sine curve — the graph of sin(1/x) for x>0 together with the segment {0}×[−1,1]: connected (the segment lies in the closure) but not path-connected (no path can cross the infinitely-oscillating gap). Cheaper but deeper: ℝ minus a point is disconnected, ℝ² minus a point is not — the first proof that the line and the plane are not homeomorphic, and the first hint that dimension is a topological invariant.\n\nConnectedness is the crudest topological invariant — π₀ in the modern indexing — and the start of the algebraic-topology program of counting qualitative features. It even reads algebraically: a ring's Zariski spectrum is connected exactly when the ring has no idempotents besides 0 and 1, one of the cleanest entries in the algebra–geometry dictionary."
    },
    {
     "label": "Quotient spaces",
     "def": "Gluing: identify points, inherit the topology. A torus is a square with opposite edges glued; glue one pair with a flip and you get the Klein bottle.",
     "detail": "The quotient X/~ of a space by an equivalence relation carries the finest topology making the projection continuous: a set downstairs is open iff its preimage upstairs is open. This is the topology of gluing — declare points identified and let the definition sort out nearness. Its universal property: a map out of the quotient is continuous exactly when its composition with the projection is.\n\nAll the familiar surfaces are quotients of a square: glue opposite edges straight and get the torus; give one pair a flip and get the Klein bottle; glue the boundary circle of a disk to itself antipodally and get ℝP². Even the circle is [0,1] with 0 ~ 1. The cone and suspension constructions of algebraic topology are quotients; so are orbit spaces of group actions, from cyclic quotient singularities to moduli of curves.\n\nQuotients are how spaces are actually manufactured — CW complexes are nothing but iterated gluings — but they are also where good behaviour goes to die: quotients of Hausdorff spaces need not be Hausdorff (collapse a dense subset and watch separation fail). That standing tension, \"the natural quotient is not a nice space,\" is what forces orbifolds, stacks, and GIT into existence further up this map."
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
     "def": "Loops at a basepoint, up to continuous deformation, form a group. π₁ detects 1-dimensional holes: trivial for the sphere, ℤ for the circle.",
     "detail": "Two continuous maps are homotopic if one deforms into the other through a continuous family; homotopy equivalence of spaces (maps composing to something homotopic to the identity both ways) is the working notion of \"same shape.\" Fix a basepoint and take loops up to homotopy: concatenation makes them a group, the fundamental group π₁(X,x₀). It is a homotopy invariant, and \"simply connected\" means it is trivial — every loop contracts.\n\nThe first computation is the important one: π₁(S¹) = ℤ, a loop's class being its winding number. That single isomorphism proves the fundamental theorem of algebra (a root-free polynomial would give a contractible loop of nonzero winding) and Brouwer's fixed-point theorem in the plane. Beyond the circle: π₁(torus) = ℤ² is abelian, but π₁(figure-eight) is the free group F₂ — the first genuinely noncommutative fundamental group, whose elements are words in two letters.\n\nπ₁ is the prototype functor: it turns spaces into groups and continuous maps into homomorphisms, so topological problems become algebra. It classifies covering spaces, it distinguishes knots via the knot group, and its failure to see higher-dimensional holes is exactly what homology and higher homotopy groups were invented to fix."
    },
    {
     "label": "Covering spaces",
     "def": "Unwrappings of a space, classified exactly by the subgroups of π₁ — Galois theory's topological twin.",
     "detail": "A covering map p: X̃ → X is a surjection that is a local homeomorphism in a strong sense: every point of X has a neighborhood whose preimage is a disjoint stack of copies, each mapped homeomorphically. The fundamental machinery is lifting: paths and homotopies downstairs lift uniquely upstairs once a starting point is chosen. Every reasonable space has a universal cover — a simply connected one covering all others.\n\nThe universal example: ℝ → S¹, t ↦ e^{2πit}, the line spiraling onto the circle. Path lifting here IS the winding number, which is how π₁(S¹) = ℤ gets its cleanest proof. The sphere double-covers the projective plane, S² → ℝP², exhibiting π₁(ℝP²) = ℤ/2. And the whole subject is organized by a Galois correspondence, precisely parallel to field theory's: connected covers of X correspond to subgroups of π₁(X), with deck transformation groups playing the role of Galois groups — the gold bridge from this field to Fields & Galois Theory on the map.\n\nCovering spaces geometrize group theory: Nielsen–Schreier (subgroups of free groups are free) falls out of covers of graphs. They organize Riemann surfaces via uniformization, and monodromy — how solutions of a differential equation shuffle when continued around a singularity — is covering-space theory applied to analysis."
    },
    {
     "label": "Homology",
     "def": "Abelian hole-counters Hₙ computed from formal sums of simplices; the Euler characteristic drops out as an alternating sum of ranks.",
     "detail": "Homology counts holes by linear algebra. Triangulate a space (or use singular simplices or cells); form chain groups of formal sums; the boundary map ∂ sends a simplex to its faces with signs, and the fundamental identity ∂² = 0 makes \"cycles mod boundaries\" well-defined: Hₙ = ker ∂ / im ∂. The ranks are the Betti numbers, their alternating sum the Euler characteristic, and the whole construction is functorial and homotopy-invariant.\n\nCellular homology makes computation mechanical. For the 2-sphere: H₀ = ℤ, H₁ = 0, H₂ = ℤ (a hollow shell: one component, no loops that fail to bound, one enclosed void). For the torus: ℤ, ℤ², ℤ — the two independent 1-cycles are the meridian and longitude. The Klein bottle's H₁ = ℤ ⊕ ℤ/2 exhibits torsion: a cycle that is not a boundary, though twice it is — homology seeing the twist that orientability language describes.\n\nUnlike homotopy groups, homology is computable at industrial scale, and it powers the classical theorems: Brouwer's fixed point in all dimensions, invariance of domain, the Lefschetz fixed-point count, the Jordan curve theorem. Its axiomatization (Eilenberg–Steenrod) made \"a homology theory\" a concept, opening the door to K-theory and cobordism — and its 21st-century incarnation, persistent homology, reads the shape of data sets."
    },
    {
     "label": "Cohomology & cup products",
     "def": "Homology's dual, enriched with a ring structure via the cup product — finer invariants, and Poincaré duality in its natural home.",
     "detail": "Cohomology dualizes homology — cochains assign numbers to chains, and Hⁿ(X) results — but the payoff is structure homology lacks: the cup product makes H*(X) a graded ring, not just a list of groups. It is contravariant (maps pull back), which is what lets it compare spaces along maps. On a closed oriented n-manifold, Poincaré duality pairs Hᵏ with H^{n−k} perfectly — the deepest general fact about manifolds. And by de Rham's theorem, over ℝ the whole ring is computed by differential forms: d² = 0, closed mod exact.\n\nThe ring structure is strictly finer than the groups. The torus T² and the wedge S¹ ∨ S¹ ∨ S² have identical homology in every degree — but on the torus the two 1-dimensional generators multiply to the volume class (α ∪ β generates H²), while on the wedge all products of positive-degree classes vanish. The cup product remembers that the torus's two circles genuinely link through a 2-cell; no group-level invariant does.\n\nThe ring-with-duality is where the heavy machinery lives: intersection theory (cup product IS transverse intersection, dually), characteristic classes, obstruction theory. Via de Rham and Hodge theory it welds topology to PDE — harmonic forms represent cohomology — and Poincaré duality's signature pairing governs 4-manifold topology outright."
    },
    {
     "label": "Higher homotopy groups",
     "def": "πₙ uses n-spheres in place of loops. Abelian for n ≥ 2, yet ferociously hard: the groups πₙ(S²) are still not fully known.",
     "detail": "πₙ(X) is the set of maps Sⁿ → X up to homotopy, a group for n ≥ 1 and — unlike π₁ — abelian for n ≥ 2 (the Eckmann–Hilton argument: two compatible multiplications force commutativity). The computational engine is the long exact sequence of a fibration F → E → B, which chains the homotopy groups of the three spaces together; Whitehead's theorem says a map of CW complexes inducing isomorphisms on all πₙ is a homotopy equivalence.\n\nThe founding surprise is Hopf's fibration S¹ → S³ → S²: the 3-sphere maps onto the 2-sphere with circle fibers, any two fibers linked once. Its exact sequence gives π₃(S²) = ℤ — a sphere wrapping a LOWER-dimensional sphere nontrivially, something homology is structurally blind to (H₃(S²) = 0). Meanwhile πₙ(Sⁿ) = ℤ by degree, and the table of πₖ(Sⁿ) beyond that is famously irregular: π₄(S²)=ℤ/2, π₅(S²)=ℤ/2, and no general formula is known.\n\nThat very difficulty built modern topology: stable homotopy theory, spectral sequences, and spectra all exist because these groups resist. The EHP and Adams spectral sequences, chromatic homotopy theory — the field's deepest machinery — are all organized assaults on πₖ(Sⁿ), and their byproducts (K-theory, cobordism) escaped to transform geometry at large."
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
     "def": "Local coordinate systems ℝⁿ ↔ patches of the space, with smooth transition maps on overlaps. A maximal atlas is a smooth structure.",
     "detail": "A manifold is a space that is locally indistinguishable from ℝⁿ: charts are homeomorphisms from open patches to open subsets of ℝⁿ, and an atlas is a family of charts covering the space. Where two charts overlap, the transition map between their ℝⁿ-pictures is a map between open subsets of ℝⁿ — and requiring all transitions to be C^∞ defines a smooth structure (a maximal such atlas). Smoothness of a map between manifolds is then checked in charts, and it doesn't matter which ones: that is the point of the compatibility condition.\n\nThe sphere needs at least two charts (one would make it homeomorphic to an open subset of the plane, impossible by compactness), and two stereographic projections — from the north and south poles — suffice. The transition map on the overlap is inversion in the unit circle, which on ℂ = ℝ² reads z ↦ 1/z̄, smooth away from the origin; using z ↦ 1/z instead makes the atlas holomorphic and exhibits the Riemann sphere ℂP¹.\n\nCharts make \"a space where calculus works\" precise with no ambient Euclidean space — general relativity's spacetimes never sit inside anything. And the definition sharpened into one of the great discoveries of the 20th century: the same topological manifold can carry genuinely different smooth structures. Milnor's exotic 7-spheres and the uncountably many exotic ℝ⁴'s say the atlas is not bookkeeping — it is geometry."
    },
    {
     "label": "Tangent spaces",
     "def": "The best linear approximation to a manifold at a point — defined intrinsically as directional derivatives, with no ambient space required.",
     "detail": "The tangent space TₚM is the linear-algebra shadow of M at p: the space of velocities γ′(0) of smooth curves through p, or equivalently (and chart-freely) the space of derivations — linear operators on smooth functions obeying the Leibniz rule. It has exactly dim M dimensions, and a smooth map f: M → N linearizes to the differential dfₚ: TₚM → T_{f(p)}N. Bundled over all points, the tangent spaces form the tangent bundle TM, itself a smooth manifold of twice the dimension.\n\nFor a sphere sitting in ℝ³ the abstraction collapses to the picture: TₚS² is the plane through the origin perpendicular to p. A function on a manifold has a critical point where its differential vanishes; the height function on the standing torus has four (bottom, inner saddle, outer saddle, top) while on the sphere it has two — a count which, by Morse theory further along this field, already reveals χ(torus) = 0 versus χ(S²) = 2.\n\nLinearization is the entire strategy of differential topology: immersions, submersions, and embeddings are defined by the rank of df; Sard's theorem says critical values are measure-zero, making regular values generic; and the preimage theorem — a regular value's preimage is a submanifold — is how manifolds are produced on demand (every level set S² = f⁻¹(1) for f = |x|² starts here)."
    },
    {
     "label": "Vector fields & flows",
     "def": "A smooth choice of tangent vector at every point integrates to a flow: ordinary differential equations living on manifolds.",
     "detail": "A vector field assigns to each point a tangent vector, smoothly — a section of the tangent bundle. Feeding it to the existence-and-uniqueness theorem for ODEs produces integral curves through every point, and on a compact manifold these knit into a flow: a one-parameter group φₜ of diffeomorphisms. Two fields generally do not commute; the Lie bracket [X,Y] measures the failure (flow along X, then Y, then back along each — the gap is the bracket to second order), and it closes vector fields into a Lie algebra.\n\nThe hairy ball theorem is the classic global obstruction: every vector field on S² vanishes somewhere — you cannot comb a sphere flat — while the torus combs perfectly (constant field in the flat coordinates). The reason is the Euler characteristic: Poincaré–Hopf says the indices of a field's zeros sum to χ, and χ(S²) = 2 ≠ 0 = χ(T²). A local count of zeros is thus pinned by global topology.\n\nVector fields are dynamics made geometric — fixed points, periodic orbits, and stability questions on manifolds start here — and the bracket is the infinitesimal Erlangen program: the Lie algebra of the symmetry group. The Frobenius theorem decides when a system of fields integrates into a foliation, which is the geometric form of \"when is a PDE system solvable,\" recurring from control theory to general relativity."
    },
    {
     "label": "Transversality",
     "def": "Generic position (Thom): after arbitrarily small perturbation, submanifolds intersect cleanly. The subject's licence to say 'generically'.",
     "detail": "Two submanifolds (or a map and a submanifold) are transverse when their tangent spaces together span the ambient tangent space at every meeting point — crossings, never tangencies. The payoff theorem: if f: M → N is transverse to Z ⊂ N, then f⁻¹(Z) is a submanifold of M of codimension equal to Z's. Thom's transversality theorem, powered by Sard, says transversality is generic: an arbitrarily small perturbation achieves it, and it persists under further small perturbation.\n\nIn the plane, two curves are transverse when they cross non-tangentially: the parabola y = x² and the line y = 0 meet tangentially (not transverse — the double point is unstable), but tilting the line to y = εx splits it into two honest crossings. Counting transverse intersection points with signs is deformation-invariant: that is the differential-topology definition of intersection number and of the degree of a map — count a generic preimage.\n\nTransversality is the rigorous form of \"general position,\" and it is the licence behind nearly every construction in the field: intersection theory, degree, linking numbers, cobordism (Thom's thesis makes manifolds-up-to-boundary into computable algebra via transversality), and surgery theory. When a modern proof says \"after a small perturbation, we may assume…,\" Thom's theorem is footing the bill."
    },
    {
     "label": "Morse theory",
     "def": "A generic function's critical points dictate the manifold's shape: the space assembles from one handle per critical point.",
     "detail": "A Morse function has only nondegenerate critical points — the Hessian at each is invertible — and each carries an index: the number of independent downhill directions. The fundamental theorem: as the level rises past a critical point of index λ, the sublevel set changes by attaching a λ-cell, so a Morse function builds the manifold as a CW complex with one cell per critical point. The Morse inequalities follow: the number of index-λ critical points bounds the λ-th Betti number.\n\nRun it on the standing torus with the height function: one minimum (index 0), two saddles (index 1), one maximum (index 2) — cells 1, 2, 1, exactly recovering H*(T²) = ℤ, ℤ², ℤ. On the sphere, min and max alone give a 0-cell and a 2-cell: S² = point with a disk glued on. Reeb's theorem sharpens this into recognition: a closed manifold admitting a Morse function with only two critical points is homeomorphic to a sphere.\n\nMorse theory is the two-way street between analysis and topology: functions read the topology of the space, and topology constrains every function on it. Its descendants run deep — handle decompositions and the h-cobordism theorem (hence the high-dimensional Poincaré conjecture, Smale), Bott's periodicity via geodesic energy, Witten's rewriting of Morse homology, and Floer's infinite-dimensional version powering symplectic topology and low-dimensional gauge theory."
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
     "def": "The Frenet frame: κ measures bending, τ measures twisting out of a plane — together they determine a space curve up to rigid motion.",
     "detail": "Parametrize a space curve by arc length s; its unit tangent T = γ′ then changes at a rate that is pure geometry: κ(s) = |T′(s)| is the curvature, and the plane spanned by T and N = T′/κ (the osculating plane) tilts at a rate τ(s), the torsion. The orthonormal Frenet frame (T, N, B = T×N) obeys the Frenet–Serret equations — a linear ODE system driven entirely by κ and τ — and the fundamental theorem of curves follows: κ(s) > 0 and τ(s) determine the curve uniquely up to a rigid motion of space.\n\nThe dictionary's first entries: a circle of radius r has κ = 1/r, τ = 0 (curving, never leaving its plane); a helix (a cos t, a sin t, bt) has constant κ = a/(a²+b²) and constant τ = b/(a²+b²), and the converse holds — constant nonzero curvature and torsion characterize helices, with the circle and line as degenerate cases.\n\nThis is geometry's prototype: attach a moving frame, differentiate it, and the structure functions that appear ARE the local invariants, which then integrate to global statements — Fenchel's theorem (a closed space curve has total curvature ≥ 2π) and Fáry–Milnor (a knotted one needs > 4π: enough bending forces knotting to be visible). The same frame-and-invariants strategy, run on surfaces and then on manifolds, produces the second fundamental form and eventually the Riemann tensor."
    },
    {
     "label": "Surfaces & fundamental forms",
     "def": "First fundamental form: measurement inside the surface. Second: how it sits in space. Gauss curvature K is built from both — and belongs, astonishingly, only to the first.",
     "detail": "A surface in ℝ³ carries two quadratic forms. The first fundamental form is the induced inner product on tangent planes — it knows lengths of curves, angles, and areas, everything measurable by an inhabitant of the surface. The second fundamental form differentiates the unit normal (the shape operator) and knows how the surface bends in space; its eigenvalues are the principal curvatures κ₁, κ₂. Gauss curvature is their product K = κ₁κ₂, mean curvature their average. Gauss's Theorema Egregium is the shock: K, defined through the extrinsic second form, is computable from the first form alone — curvature is intrinsic.\n\nThe cylinder makes the theorem tactile: it shares its first fundamental form with the plane (unroll it — no stretching), so K = 0 for both, even though the cylinder visibly bends (κ₁ ≠ 0). The sphere of radius r has K = 1/r² everywhere — and since the plane has K = 0, no map of the Earth can preserve distances, a theorem cartographers live inside. The helicoid and catenoid are locally isometric minimal surfaces (H = 0) — one form, two embeddings.\n\nThe Egregium's split of geometry into intrinsic versus extrinsic is what made Riemannian geometry conceivable: Riemann's habilitation drops the ambient space entirely and keeps only the first form. And Gauss–Bonnet — ∫∫ K dA = 2πχ — is the first full curvature-topology bridge: total bending is a homeomorphism invariant, the pattern that characteristic classes industrialize."
    },
    {
     "label": "Riemannian metrics",
     "def": "A smoothly varying inner product on each tangent space. With it, a bare manifold acquires lengths, angles, and volume — the whole structure ladder in one object.",
     "detail": "A Riemannian metric g puts a smoothly varying inner product on every tangent space. That one structure funds all of measurement: lengths of curves (integrate |γ′|), angles, volumes, and distance itself (infimum of path lengths), making the manifold a metric space whose isometries are its \"rigid motions.\" Every smooth manifold admits Riemannian metrics — patch local ones together with a partition of unity — so the interesting question is never existence but which metric, and what its invariants say. The model spaces are Euclidean ℝⁿ, the round sphere Sⁿ, and hyperbolic space ℍⁿ: constant curvature 0, +1, −1.\n\nOne underlying set, two geometries: on the upper half-plane {y > 0}, replace the Euclidean metric with g = (dx² + dy²)/y². Lengths near the boundary blow up, geodesics become vertical rays and semicircles meeting the boundary orthogonally, and the space is the hyperbolic plane — the parallel postulate dies not by changing the points but by changing the ruler. That is the whole Riemannian idea in one example: geometry lives in g, not in the point set.\n\nThe metric is the input to everything downstream on this map — Levi-Civita connection, geodesics, curvature, volume comparison, Hodge theory, spectral geometry (\"can you hear the shape of a drum?\") — and, with signature (−+++), it is the field variable of general relativity: Einstein's equations are a PDE for g."
    },
    {
     "label": "Connections & parallel transport",
     "def": "The Levi-Civita rule for differentiating vector fields and sliding vectors along curves. A vector returning rotated from a round trip is curvature made visible.",
     "detail": "Vector fields on a curved manifold cannot be compared at different points without a rule; a connection ∇ is that rule — a way to differentiate a vector field along a direction, written in coordinates via Christoffel symbols. It defines parallel transport: slide a vector along a curve keeping ∇-derivative zero, a path-dependent identification of tangent spaces. The fundamental theorem of Riemannian geometry singles out the Levi-Civita connection: the unique one that is torsion-free and preserves the metric. Holonomy — what transport around closed loops does — measures the geometry's global twist.\n\nThe sphere makes path-dependence visible: parallel-transport a vector around the geodesic triangle with a vertex at the pole and two on the equator, a quarter-turn apart. The vector returns rotated by exactly 90° — the triangle's area on the unit sphere. In general the rotation equals the enclosed integral of curvature (this map's parallel-transport atom animates precisely this). On the plane, transport is trivial: vectors return unchanged.\n\nConnections make \"constant\" meaningful on curved spaces, and curvature is revealed as infinitesimal holonomy. The same structure, run on principal bundles instead of tangent bundles, IS gauge theory: the electromagnetic potential is a connection, the Wilson line is parallel transport, and the curvature 2-form is the field strength — one geometry underwriting both general relativity and the Standard Model."
    },
    {
     "label": "Geodesics",
     "def": "The straightest possible curves — critical points of the length functional, solutions of a second-order ODE, locally shortest paths.",
     "detail": "A geodesic is a curve with zero intrinsic acceleration: ∇_{γ′}γ′ = 0 — the straightest possible path, and locally the shortest. Through every point, in every direction, exactly one geodesic runs (an ODE fact), giving the exponential map that radiates geodesics out of a point. Hopf–Rinow ties the global picture together: geodesic completeness (geodesics extend forever), metric completeness, and the Heine–Borel property are all equivalent, and any of them guarantees minimizing geodesics between all pairs of points. Jacobi fields — the linearization of the geodesic flow — measure how nearby geodesics spread, at a rate set by curvature.\n\nOn the sphere, geodesics are great circles: the polar route a Delhi–San Francisco flight flies. In the plane they are straight lines. In the hyperbolic upper half-plane they are vertical rays and semicircles orthogonal to the boundary — and through a point off a given geodesic run infinitely many geodesics that miss it, the parallel postulate's failure drawn concretely.\n\nGeodesics are where the calculus of variations was born (shortest-path problems), and their global behaviour encodes topology: Bonnet–Myers turns a curvature bound Ric ≥ (n−1)k > 0 into compactness and a diameter bound; closed geodesics count via Morse theory on the loop space; geodesic flows are the model chaotic systems of dynamics (negative curvature ⇒ ergodicity, Anosov). In general relativity, free fall is geodesic motion in a Lorentzian metric — planets follow the straightest lines spacetime offers."
    },
    {
     "label": "Riemann curvature tensor",
     "def": "The complete obstruction to flatness: the failure of second covariant derivatives to commute. Contracts to Ricci and scalar curvature.",
     "detail": "The full curvature of a Riemannian manifold is the tensor R(X,Y)Z = ∇ₓ∇ᵧZ − ∇ᵧ∇ₓZ − ∇_{[X,Y]}Z — the failure of covariant derivatives to commute, equivalently the infinitesimal holonomy of parallel transport around tiny parallelograms. Packaged differently: sectional curvature K(σ) assigns a number to each tangent 2-plane (the Gauss curvature of the surface swept by geodesics in that plane); contracting gives the Ricci tensor, contracting again the scalar curvature. The tensor's symmetries and the Bianchi identities govern the whole calculus, and R ≡ 0 characterizes flat space: locally isometric to ℝⁿ.\n\nCalibration: the round sphere has K ≡ +1/r², hyperbolic space K ≡ −1, and on any surface the tensor collapses to the single Gauss curvature. In relativity, the Schwarzschild metric around a star is Ricci-flat (vacuum Einstein equations) yet has nonzero Riemann tensor — tidal forces are curvature that Ricci cannot see, which is why the full tensor is the honest field.\n\nCurvature is the local invariant, and its sign hypotheses drive global theorems: Bonnet–Myers (positive Ricci ⇒ compact, finite π₁), Cartan–Hadamard (nonpositive K ⇒ universal cover diffeomorphic to ℝⁿ), the sphere theorems (pinched positive curvature ⇒ sphere). Einstein's equations set Ricci proportional to matter; Hamilton's Ricci flow ∂g/∂t = −2Ric evolves the metric by its own curvature and, in Perelman's hands, proved the Poincaré and geometrization conjectures — the tensor at maximum power."
    },
    {
     "label": "Symplectic geometry",
     "def": "Manifolds carrying a closed nondegenerate 2-form — the phase spaces of classical mechanics, where area, not length, is the conserved quantity.",
     "detail": "A symplectic manifold carries a closed, nondegenerate 2-form ω — an area-measuring rather than length-measuring structure, forcing even dimension. Darboux's theorem is the anti-Riemannian surprise: there are no local invariants — every symplectic form is locally Σ dpᵢ∧dqᵢ, so the subject is entirely global. Functions generate dynamics: each H defines a Hamiltonian vector field X_H by ω(X_H, ·) = dH, the Poisson bracket makes functions a Lie algebra, and Lagrangian submanifolds (half-dimensional, ω-null) are the geometry's distinguished objects — \"everything is a Lagrangian\" (Weinstein).\n\nThe founding example is phase space: the cotangent bundle T*Q of any configuration space, with ω = Σ dpᵢ∧dqᵢ. Hamilton's equations of classical mechanics are exactly the flow of X_H, and Liouville's theorem (phase volume preservation) is immediate since the flow preserves ω. The modern surprise is Gromov's non-squeezing (1985): a ball of radius R cannot be symplectically embedded into a cylinder of smaller radius, however long — despite Darboux flexibility, a hidden rigidity (\"symplectic camel\") that pseudoholomorphic curves detect.\n\nSymplectic geometry is classical mechanics made into geometry and the launch pad for quantization. Its modern core — Gromov's curves, Floer homology (the Morse theory of the action functional), Fukaya categories — powers Arnold's conjectures on fixed points and, via homological mirror symmetry, ties symplectic topology to algebraic geometry in one of mathematics' deepest open dialogues with string theory."
    },
    {
     "label": "Kähler geometry",
     "def": "Where Riemannian, complex, and symplectic structures coexist compatibly — geometry's three flavors meeting; home of Calabi–Yau spaces.",
     "detail": "A Kähler manifold is where three geometries agree: a complex structure J, a Riemannian metric g, and a symplectic form ω, locked together by ω(X,Y) = g(JX,Y) with dω = 0. Locally everything comes from one function — g_{ij̄} = ∂²φ/∂zᵢ∂z̄ⱼ for a Kähler potential φ. The integrability pays in cohomology: on a compact Kähler manifold, Hodge theory refines de Rham cohomology into the bigraded decomposition Hᵏ = ⊕_{p+q=k} H^{p,q} with h^{p,q} = h^{q,p} — immediately forcing, e.g., odd Betti numbers to be even.\n\nThe master example is complex projective space ℂPⁿ with the Fubini–Study metric: every smooth projective variety inherits a Kähler structure by restriction, so all of complex algebraic geometry lives inside Kähler geometry. Complex tori, K3 surfaces, and — after Yau's solution of the Calabi conjecture — Calabi–Yau manifolds (compact Kähler, vanishing first Chern class, hence Ricci-flat metrics) fill out the bestiary; the quintic threefold in ℂP⁴ is the emblem, its Hodge numbers h^{1,1}=1, h^{2,1}=101 famously mirrored.\n\nKähler geometry is the meeting hall of the map's analytic and algebraic wings: Hodge theory constrains which topologies projective varieties can have (the Hodge conjecture — a Millennium Problem — lives here), Kodaira's embedding theorem says positive curvature characterizes projectivity, and Calabi–Yau metrics are the compactification spaces of string theory, whence mirror symmetry flowed back into mathematics."
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
     "def": "Every closed surface is a sphere with g handles (orientable) or with cross-caps (non-orientable: projective plane, Klein bottle). Dimension 2 is completely solved.",
     "detail": "The classification of closed surfaces is topology's model success: every connected closed surface is exactly one of — the sphere; a connected sum of g tori (orientable, genus g, Euler characteristic χ = 2−2g); or a connected sum of k projective planes (non-orientable, χ = 2−k). Two invariants, orientability and χ, decide everything. The proof normalizes any polygon-with-edge-identifications presentation: every surface is a polygon with edges glued in pairs, reducible to a normal form like the genus-2 octagon with boundary word a₁b₁a₁⁻¹b₁⁻¹a₂b₂a₂⁻¹b₂⁻¹.\n\nThe Klein bottle illustrates the non-orientable arithmetic: it is ℝP² # ℝP² (k = 2, χ = 0) — the same Euler characteristic as the torus, distinguished from it by orientability alone; and adding a third cross-cap gives Dyck's theorem's surface ℝP² # T² ≅ ℝP² # ℝP² # ℝP². An inhabitant walking a suitable loop on any non-orientable surface comes home mirror-reversed.\n\nThis theorem is the base camp for everything above dimension two: mapping class groups and Teichmüller theory study the symmetries and shapes one topological surface can carry, and the trichotomy g = 0, g = 1, g ≥ 2 (spherical, flat, hyperbolic geometry — positive, zero, negative curvature) is the two-dimensional case of the geometrization philosophy that Thurston exported to dimension three."
    },
    {
     "label": "Knots & Reidemeister moves",
     "def": "Circles embedded in 3-space up to deformation. Two diagrams depict the same knot exactly when three local moves connect them.",
     "detail": "A knot is a smooth embedding of the circle into 3-space (or S³), considered up to ambient isotopy — deformations of the surrounding space, so no cutting or passing-through. Knots are handled through diagrams: generic projections to the plane with over/under data at each crossing. Reidemeister's theorem (1927) makes diagrams sufficient: two diagrams represent the same knot exactly when they are connected by planar isotopy and three local moves — R1 (add/remove a kink), R2 (slide one strand over another, creating or cancelling two crossings), R3 (slide a strand past a crossing). An invariant, therefore, is precisely a diagram quantity unchanged by three checkable moves.\n\nTricolorability shows the method at its cheapest: color each arc of a diagram with one of three colors so that at every crossing the three meeting arcs use all three colors or just one; count whether a nontrivial coloring exists. Each Reidemeister move preserves this property. The standard trefoil diagram tricolors; the round unknot diagram cannot (one arc, one color). Therefore the trefoil is genuinely knotted — a complete rigorous proof in a paragraph.\n\nKnots are the hands-on gateway to 3-manifold topology: every closed orientable 3-manifold arises by surgery on a link (Lickorish–Wallace), knot complements carry the geometry that drives the field, and the subject's tools flowed outward — to DNA topology (topoisomerases perform crossing changes), fluid vortex lines, and topological quantum field theory."
    },
    {
     "label": "Knot invariants",
     "def": "Quantities unchanged by the moves — the Alexander and Jones polynomials — certifying that two knots are genuinely different.",
     "detail": "A knot invariant assigns to each knot something — number, polynomial, group, homology — unchanged by isotopy, i.e. by Reidemeister moves. The classical layers: the knot group π₁(S³ ∖ K); Alexander's polynomial (1928), the first polynomial invariant; the Seifert genus (least genus of a surface bounding the knot); and for hyperbolic knots the volume of the complement, a single real number of remarkable distinguishing power. The 1984 earthquake was the Jones polynomial, arriving not from topology but from von Neumann algebras; HOMFLY-PT generalizes both Alexander and Jones; Khovanov homology (2000) categorifies Jones — a bigraded homology whose Euler characteristic is the polynomial.\n\nThe Kauffman bracket makes Jones a pencil computation: resolve each crossing in two planar ways with weights A and A⁻¹, expand the diagram into a weighted sum of circle collections, normalize by the writhe. For the trefoil, eight resolutions give (after normalization) V(t) = −t⁻⁴ + t⁻³ + t⁻¹: not symmetric under t ↔ t⁻¹, so the trefoil differs from its mirror image — a fact provably beyond the Alexander polynomial, which cannot see chirality.\n\nInvariants are how knot theory converses with the rest of mathematics: Witten reinterpreted Jones as Chern–Simons quantum field theory (knot theory ↔ physics), quantum groups systematized the new invariants, and the categorified generation carries geometric content — knot Floer homology detects the genus, Khovanov homology detects the unknot, and both see into 4-dimensional questions (slice genus, exotic phenomena) that polynomials cannot reach."
    },
    {
     "label": "3-manifolds & geometrization",
     "def": "Thurston's vision, Perelman's theorem: every closed 3-manifold decomposes into pieces carrying one of eight geometries. Poincaré falls as a corollary.",
     "detail": "Three-manifolds decompose canonically: first into prime pieces (connected sum), then along essential tori (JSJ decomposition). Thurston's insight was that the resulting pieces should each carry one of exactly eight homogeneous geometries — Euclidean E³, spherical S³, hyperbolic ℍ³, the products S²×ℝ and ℍ²×ℝ, and the twisted trio Nil, Sol, and the universal cover of SL₂ℝ — with hyperbolic as the overwhelmingly generic case. The geometrization conjecture, proved by Perelman (2002–03) via Hamilton's Ricci flow with surgery, says this always works: every closed orientable 3-manifold is built from geometric pieces.\n\nThe Poincaré conjecture — a simply connected closed 3-manifold is S³ — is the special case that made the program famous, open for a century before Ricci flow closed it. On the hyperbolic side, the figure-eight knot's complement is the emblem: it decomposes into two ideal regular tetrahedra and has volume 2.02988…, and by Mostow rigidity that number — like every hyperbolic invariant — is a topological invariant of the manifold, not a feature of a chosen metric. Geometry and topology fuse in dimension three.\n\nGeometrization means dimension three is, in principle, understood — a complete structure theory, with hyperbolic geometry carrying the complexity (census enumeration by volume, arithmetic invariants via number fields). The proof itself changed mathematics: geometric analysis — flowing a metric by a curvature PDE until the topology surrenders — became a central method, and virtual properties of hyperbolic 3-manifold groups (Agol, Wise) connected the field to geometric group theory."
    },
    {
     "label": "4-manifold strangeness",
     "def": "The rogue dimension: ℝ⁴ alone carries uncountably many inequivalent smooth structures, and smooth vs topological classifications diverge (Donaldson, Freedman).",
     "detail": "Dimension four is where the standard machinery breaks. In dimensions ≥ 5, the h-cobordism theorem and surgery theory make classification tractable (Whitney's trick works: disks can be embedded to untangle intersections); in dimension 3, geometry rules. In dimension 4 the Whitney trick fails smoothly, and the subject splits in two. Freedman (1982) classified simply connected TOPOLOGICAL 4-manifolds by their intersection form (the symmetric bilinear form on H² given by cup product) plus one ℤ/2 invariant. Donaldson (1983), using Yang–Mills instantons, showed SMOOTH 4-manifolds obey brutal extra constraints — a definite intersection form of a smooth manifold must be diagonalizable — so the topological and smooth worlds genuinely diverge. Seiberg–Witten invariants (1994) streamlined and extended the gauge-theoretic toolkit.\n\nThe signature strangeness: ℝ⁴ admits uncountably many pairwise non-diffeomorphic smooth structures — \"exotic ℝ⁴'s\" — while ℝⁿ for every n ≠ 4 has exactly one. Freedman's E8-manifold is a topological 4-manifold with no smooth structure at all (Rokhlin's theorem obstructs it). Compact candidates for exotica abound: many pairs of homeomorphic, non-diffeomorphic 4-manifolds are known, produced by logarithmic transforms and knot surgery.\n\nThe frontier runs through here: the smooth 4-dimensional Poincaré conjecture — is every smooth 4-manifold homeomorphic to S⁴ also diffeomorphic to it? — is arguably THE open problem of topology. And the deepest tools are physics' gifts: instantons and monopoles turned quantum field theory into a topological weapon, a trade that continues through Khovanov-type theories and Floer homologies for 4-manifolds with boundary."
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
     "def": "Zero sets of polynomial systems — in affine space, or completed with points at infinity, where intersection counts become exact (Bézout).",
     "detail": "An affine variety is the common zero set V(S) ⊂ 𝔸ⁿ of a family of polynomials; declaring these zero sets closed defines the Zariski topology, coarse but exactly right for algebra. A variety's ring of polynomial functions is its coordinate ring k[x₁,…,xₙ]/I(V), and morphisms of varieties correspond to ring homomorphisms backwards — the first page of the algebra–geometry dictionary. Projective varieties, cut by homogeneous polynomials in ℙⁿ, add the points at infinity; dimension and degree are the basic measures.\n\nPlane curves already show the texture. The cuspidal cubic y² = x³ and the nodal cubic y² = x³ + x² are both irreducible curves, but singular — the cusp and the node are visible in their coordinate rings, not just their pictures — while y² = x³ − x is smooth. Projectivize and Bézout's theorem becomes exact: curves of degrees d and e in ℙ² meet in exactly de points, counted with multiplicity — two conics in 4 points, a line meets any cubic in 3. In affine space these counts leak through infinity; in projective space nothing escapes.\n\nVarieties are the geometry of polynomial equation systems — the oldest computational subject — and the modern gateway drug: their coordinate rings motivate commutative algebra (the map's bridge to Rings & Modules), their function fields motivate the curves–number fields analogy, and their limitations (why can't we glue? why no nilpotents? what about ℤ-coefficients?) are precisely the questions schemes were invented to answer."
    },
    {
     "label": "Nullstellensatz",
     "def": "Hilbert's dictionary: radical ideals ↔ varieties. Every question about polynomial equations becomes a question about rings, and back.",
     "detail": "Hilbert's Nullstellensatz is the exactness theorem for the algebra–geometry dictionary, over an algebraically closed field k. Weak form: a system of polynomials with no common zero must generate the unit ideal — there is an algebraic certificate Σ gᵢfᵢ = 1 of unsolvability. Strong form: the polynomials vanishing on V(J) are exactly the radical √J = {f : fᵐ ∈ J}. Consequences: maximal ideals of k[x₁,…,xₙ] correspond bijectively to points of 𝔸ⁿ (the point a giving mₐ = (x₁−a₁,…,xₙ−aₙ)), and radical ideals correspond to varieties — a perfect two-way translation.\n\nAlgebraic closure is essential, and ℝ shows why: x² + 1 has no real zeros, yet (x²+1) is a proper ideal — over ℝ the dictionary has missing pages (real algebraic geometry patches them with orderings and the Positivstellensatz). Over ℂ, by contrast, \"no solutions\" always has the finite algebraic witness the weak form promises.\n\nThe Nullstellensatz makes solvability of polynomial systems an ideal-membership problem, which Gröbner bases turn into an actual algorithm — the engine inside computer algebra systems. Conceptually it is the template Grothendieck generalized: if maximal ideals are points, why not let ALL prime ideals be points? That question is the definition of Spec, and the reason schemes exist."
    },
    {
     "label": "Sheaves",
     "def": "Data assigned coherently to open sets — things you can restrict and glue. The bookkeeping device on which modern geometry runs.",
     "detail": "A sheaf assigns data to every open set — functions, sections, solutions — together with restriction maps, subject to the gluing axiom: compatible local data patch uniquely into global data. Stalks capture germs at a point; morphisms of sheaves work open-set-wise. On a variety or scheme, the structure sheaf O_X of regular functions is the fundamental example, and quasi-coherent sheaves of O_X-modules are the geometric form of modules over a ring. The failure of local-to-global — locally solvable, globally obstructed — is measured by sheaf cohomology Hⁱ(X, F).\n\nThe eternal example: on the punctured complex plane ℂ ∖ {0}, a branch of log z exists near every point, but no global branch exists — walk around the origin and the branches disagree by 2πi. The exponential exact sequence 0 → ℤ → O → O* → 0 turns this story into cohomology: the obstruction to global logarithms lives in H¹, and the connecting map c₁: H¹(X, O*) → H²(X, ℤ) is the first Chern class — line bundles classified by cohomology.\n\nSheaf theory is THE local-to-global technology. Serre's coherent cohomology (FAC, 1955) rebuilt algebraic geometry with it; Grothendieck's general machinery (derived functors, Čech comparison) made it the common language of geometry; and its descendants — D-modules, perverse sheaves, étale sheaves, and topos theory (a bridge on this map to Foundations) — carry the method everywhere from representation theory to logic."
    },
    {
     "label": "Schemes",
     "def": "Grothendieck's rebuild: Spec of any commutative ring is a geometric space. Geometry over ℤ — arithmetic made geometric.",
     "detail": "Grothendieck's generalization begins by taking the Nullstellensatz's hint seriously: for ANY commutative ring R, let Spec R be the set of all prime ideals, topologized à la Zariski and equipped with a structure sheaf whose stalks are the localizations. A scheme is a space locally isomorphic to some Spec R. Points need not be classical: a generic point sits inside every subvariety (its closure is the whole component), and nilpotent functions — invisible to point-set eyes — survive to remember infinitesimal information. The relative viewpoint completes the shift: study morphisms X → S, families over a base, stable under base change via fiber products.\n\nTwo small examples carry the philosophy. Spec ℤ makes arithmetic into geometry: primes are the points, integers are the functions on this \"curve,\" and a number-theoretic congruence becomes a local condition at a point — the picture behind the number-fields/function-fields analogy. And Spec k[x]/(x²) is a point thickened with one infinitesimal direction: the scheme-theoretic intersection of the parabola y = x² with its tangent line y = 0 is exactly this double point, making \"intersection multiplicity 2\" a literal geometric object rather than a bookkeeping convention.\n\nSchemes unified number theory and geometry in one language — the setting in which étale cohomology could be built to prove the Weil conjectures (Deligne 1974), in which Faltings and then Wiles could work, and in which moduli problems (via the functor of points: a scheme IS what it represents) became geometry. The price of abstraction bought the subject its twentieth-century triumphs."
    },
    {
     "label": "Divisors & line bundles",
     "def": "Formal sums of codimension-one subvarieties correspond to line bundles; Riemann–Roch counts the functions they allow.",
     "detail": "A divisor on a variety is a formal integer combination of codimension-one subvarieties — on a curve, a finite multiset of points with multiplicities. Functions have divisors (zeros minus poles), and two divisors are linearly equivalent if they differ by one; the quotient is the class group. The multiplicative shadow: line bundles (invertible sheaves), forming the Picard group Pic(X) under tensor product, with Cartier divisors ↔ line bundles the working dictionary. The sections of O(D) are the functions with poles no worse than D — finite-dimensional spaces whose dimensions ℓ(D) are the subject's basic quantities. Ample bundles, with enough sections to embed X in projective space, connect the abstract theory back to equations.\n\nOn ℙ¹ everything is visible: Pic = ℤ, generated by O(1), and the global sections of O(n) are the homogeneous polynomials of degree n — a space of dimension n+1. On an elliptic curve the theory turns magical: degree-zero divisor classes correspond bijectively to points of the curve itself, and this correspondence IS the group law — the chord-and-tangent addition is linear equivalence in disguise. Riemann–Roch, ℓ(D) − ℓ(K−D) = deg D + 1 − g, computes section counts from the genus and governs everything from the group law to the projective embeddings of curves.\n\nLine bundles are the currency of projective geometry: embeddings, degree, and intersection theory are all transacted in them. Through Jacobians (the group of degree-0 classes as a geometric object) they lead to abelian varieties; through heights on divisors they enter Diophantine geometry; and through their curvature they connect to the map's differential-geometric wing — positivity of a line bundle is both an algebraic and an analytic statement (Kodaira)."
    },
    {
     "label": "Moduli spaces",
     "def": "Spaces whose points are themselves geometric objects — all curves of genus g, say. Geometry classifying geometry.",
     "detail": "A moduli space is a variety (or scheme, or stack) whose points ARE the objects being classified: M_g parametrizes smooth curves of genus g, Hilbert schemes parametrize subschemes with fixed invariants, moduli of vector bundles parametrize bundles. The defining property is functorial: families of objects over a base T correspond to maps T → M — classification becomes geometry. \"Fine\" moduli (with a universal family) usually fail to exist because objects have automorphisms; the fixes are coarse spaces, rigidification, or honestly enlarging geometry to stacks. Deformation theory computes the local structure: dim M_g = 3g − 3 (Riemann's count of 1857, made rigorous a century later).\n\nElliptic curves are the worked example: the j-invariant identifies the coarse moduli space with the affine line — every j ∈ k is realized, and two elliptic curves are isomorphic iff their j-invariants agree. But the curves at j = 0 and j = 1728 have extra automorphisms, so the fine moduli problem needs the stack M_{1,1}; level structures (marking torsion points) rigidify it into the modular curves of number theory. For higher genus, Teichmüller space (a complex ball-like domain) covers M_g with the mapping class group as deck group — hyperbolic geometry computing algebraic moduli.\n\nModuli spaces are how modern geometry asks questions about ALL objects at once: Deligne–Mumford's compactification M̄_g (allowing stable nodal curves) launched stack theory; Gromov–Witten invariants integrate over moduli of maps, feeding mirror symmetry's predictions; and arithmetic moduli (Shimura varieties, moduli of abelian varieties) are the stage for the Langlands program — this map's number-theory wing repeatedly lands here."
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
     "def": "A vector space attached smoothly to every point — the tangent bundle first among them. The Möbius band is the simplest twisted example.",
     "detail": "A vector bundle of rank k over a space X is a family of k-dimensional vector spaces varying continuously — locally a product U × ℝᵏ, globally glued by transition functions valued in GL(k) satisfying the cocycle condition. Sections (continuous choices of a vector in each fiber) generalize vector-valued functions; bundles pull back along maps, and linear algebra lifts fiberwise: duals, direct sums, tensor and exterior products all make sense bundle-wise. Homotopy theory classifies them: bundles over X correspond to homotopy classes of maps from X to a Grassmannian, and stabilizing (adding trivial bundles) yields K-theory, where bundles become elements of a ring of formal differences.\n\nThe Möbius band, viewed as a line bundle over its core circle, is the primal nontrivial example: any continuous section must cross zero (follow a nonzero vector once around and it comes back negated), so the bundle admits no nonvanishing section and cannot be the product S¹ × ℝ. The tangent bundle TS² is nontrivial for the same style of reason (hairy ball theorem) — while TS³ IS trivial (quaternions parallelize the 3-sphere). On projective spaces, the tautological line bundle (each point of ℙⁿ remembering the line it names) generates the whole theory.\n\nVector bundles are linear algebra fibered over topology, and they are load-bearing across this map: connections and curvature live on them, characteristic classes measure them, the Atiyah–Singer index theorem counts solutions of PDE by their topology, and K-theory — born from bundles — became a cohomology theory powering everything from Bott periodicity to the topology of C*-algebras. In physics, matter fields are sections of vector bundles associated to the gauge bundle."
    },
    {
     "label": "Principal bundles",
     "def": "Bundles whose fiber is a Lie group acting on itself — the symmetry-first formulation on which every gauge theory stands.",
     "detail": "A principal G-bundle is a space P with a free right action of a Lie group G whose orbit space is X, locally trivial as X × G. It is the master object of symmetry-over-a-space: from P and any representation of G one manufactures the associated vector bundles, and geometric structures on a manifold are reductions of the structure group of its frame bundle — the GL(n)-bundle of all bases of the tangent spaces. Choosing a metric reduces GL(n) to O(n); an orientation, to SO(n); a spin structure lifts to Spin(n); a complex structure reduces to GL(n/2, ℂ). Connections on P are g-valued 1-forms (equivalently, G-invariant horizontal distributions), with curvature F = dA + A∧A.\n\nThe Hopf bundle S¹ → S³ → S² is the founding nontrivial example: the 3-sphere fibered in circles over the 2-sphere, any two fibers linked. It is the unit-sphere bundle of the tautological line bundle over ℂP¹ = S², its Chern number is 1, and it generates the theory of U(1)-bundles the way the Möbius band generates line bundles — every magnetic monopole calculation in physics is secretly this bundle.\n\nPrincipal bundles are the geometry of gauge theory, literally: a gauge field IS a connection on a principal bundle (U(1) for electromagnetism, SU(3)×SU(2)×U(1) for the Standard Model), gauge transformations are bundle automorphisms, and matter multiplets are associated bundles' sections. Inside mathematics, the frame-bundle viewpoint unifies all geometric structures (Cartan geometry), and the moduli of connections on principal bundles — instanton moduli — became Donaldson's tools for 4-manifolds."
    },
    {
     "label": "Connections & curvature",
     "def": "A splitting of directions into horizontal and vertical lets you differentiate along the base; the failure of horizontal lifts to close up is curvature.",
     "detail": "A connection on a bundle chooses, smoothly, a horizontal complement to the fibers — equivalently, a covariant derivative on sections, or a g-valued 1-form A on the principal bundle. It defines parallel transport along curves; curvature is the obstruction to that transport being path-independent, packaged as the 2-form F = dA + A∧A and obeying the Bianchi identity dF + [A,F] = 0. A connection is flat when F ≡ 0, in which case parallel transport depends only on homotopy class: flat bundles correspond to representations of π₁(X) — topology, not geometry, carries all the information.\n\nOn a U(1)-bundle over S², the integral ∫ F/2π is always an integer — the Chern number of the bundle — and cannot be changed by any deformation of the connection: Dirac's monopole quantization, discovered in physics before its geometry was recognized. The Aharonov–Bohm effect is the flat counterexample made physical: outside a solenoid the field strength vanishes (F = 0), yet an electron circling it acquires a phase — holonomy of a flat connection with nontrivial π₁, measurable in interference fringes.\n\nThis is one structure with three famous faces: the Levi-Civita connection of Riemannian geometry, the gauge potentials of physics (Yang–Mills theory is the study of a curvature functional's critical connections, whose 4-dimensional instantons became Donaldson theory), and the monodromy of differential equations. Chern–Weil theory, next door on this map, closes the circle: invariant polynomials in F represent characteristic classes, turning curvature integrals into topological invariants."
    },
    {
     "label": "Chern & Pontryagin classes",
     "def": "Cohomology classes measuring a bundle's global twist, computable from curvature (Chern–Weil): topology extracted from geometry.",
     "detail": "Characteristic classes are the universal obstructions of bundle theory: to each bundle they assign cohomology classes of the base, naturally under pullback, measuring how far the bundle is from trivial. Complex bundles carry Chern classes cᵢ ∈ H²ⁱ; real bundles carry Pontryagin classes pᵢ ∈ H⁴ⁱ and Stiefel–Whitney classes wᵢ ∈ Hⁱ(·; ℤ/2); oriented even-rank bundles carry the Euler class. The Whitney sum formula c(E⊕F) = c(E)c(F) makes them computable, and Chern–Weil theory constructs them from geometry: evaluate invariant polynomials (trace powers) on the curvature form of any connection — the de Rham class does not depend on the connection chosen.\n\nThe first computation is Gauss–Bonnet in modern dress: for the tangent bundle of S², the integral of c₁ (equivalently the Euler class) over the sphere is χ = 2 — total curvature is a topological invariant because it is a characteristic number. For line bundles, c₁ is a complete invariant, identifying Pic(X) topologically with H²(X;ℤ). One dimension up, Hirzebruch's signature theorem says the signature of a closed oriented 4-manifold equals p₁/3 evaluated on the fundamental class — an integrality constraint with teeth (it is Rokhlin's obstruction's cousin, and the seed of the E8-manifold story in low-dimensional topology).\n\nCharacteristic classes are the dictionary between curvature and obstruction: w₁ = 0 is orientability, w₂ = 0 permits spin structures (hence fermions), c₁ governs line-bundle theory and Kähler geometry, and the grand synthesis is the Atiyah–Singer index theorem — the analytic index of an elliptic operator equals a characteristic-number integral — the single equation where analysis, geometry, and topology of this whole map converge."
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
