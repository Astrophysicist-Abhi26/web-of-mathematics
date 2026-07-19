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
     "def": "Statements combined by ¬ ∧ ∨ →, truth decided by truth tables alone. Tautologies are the sentences true under every valuation.",
     "detail": "Propositional logic is the algebra of statements built from atoms by the connectives ¬ (not), ∧ (and), ∨ (or), → (implies), ↔ (iff). A valuation assigns each atom a truth value, and truth tables compute the value of any compound formula from it. The load-bearing notions are tautology (true under every valuation), contradiction (false under every valuation), and logical equivalence; a set of connectives is functionally complete if every truth table is expressible in it, and {¬, ∧, ∨} is — as is the single connective NAND.\n\nThe hypothetical syllogism ((p→q) ∧ (q→r)) → (p→r) is a tautology, checkable without the full 8-row table: it can only fail if the conclusion p→r is false, i.e. p true and r false, while both premises hold. But p true with p→q true forces q true, and then q true with q→r true forces r true — contradicting r false. No falsifying row exists. The same reasoning (find the would-be counterexample, watch it self-destruct) is the semantic method in miniature.\n\nPropositional logic is the base layer of deduction and the birthplace of Boolean algebra — the map's bridge to Order & lattices, where formulas-mod-equivalence form a Boolean algebra. Its satisfiability problem SAT is the original NP-complete problem (Cook–Levin), so the question \"is this formula ever true?\" sits at the center of complexity theory, while its circuits are the logic of physical hardware."
    },
    {
     "label": "Predicate logic & quantifiers",
     "def": "Adds variables, relations, and ∀/∃ ranging over a domain — expressive enough for essentially all of mathematics. This is the logic ZFC is written in.",
     "detail": "First-order (predicate) logic adds variables ranging over a domain, relation and function symbols, and the quantifiers ∀ (for all) and ∃ (there exists). This is the leap that makes mathematics expressible: \"every non-empty set bounded above has a least upper bound\" is a first-order sentence, and the axioms of groups, rings, and ZFC itself are written here. A sentence is true or false only relative to a structure that interprets its symbols.\n\nQuantifier order is where the expressiveness — and the subtlety — lives. Over (ℕ, <), the sentence ∀x ∃y (x < y) is true (there is no largest number), but swapping the quantifiers to ∃y ∀x (x < y) claims a single number exceeding all others, which is false. Same three symbols, opposite meanings: this ∀∃ vs ∃∀ distinction is exactly the gap between \"continuous\" and \"uniformly continuous\" in analysis, the ε–δ definitions made precise.\n\nFirst-order logic is expressive enough to carry essentially all of mathematics yet tame enough to obey the great metatheorems — completeness, compactness, Löwenheim–Skolem — which fail for richer logics. That balance is why it is the default foundation, and why the trade-off (it cannot pin down ℕ or ℝ up to isomorphism) drives model theory, the neighboring field that studies the unintended structures first-order axioms admit."
    },
    {
     "label": "Proof systems",
     "def": "Formal calculi (natural deduction, sequent calculus, Hilbert-style) whose finite symbol-pushing derivations certify theorems mechanically.",
     "detail": "A proof system turns \"provable\" into a finite, mechanically checkable object. Hilbert systems use many axioms and one rule (modus ponens); natural deduction (Gentzen) uses introduction/elimination rules for each connective, matching how mathematicians actually argue; the sequent calculus makes the structure of proofs symmetric and analyzable. In each, a proof is a finite tree of formulas whose every step is licensed by a rule — verifiable by a program that understands no mathematics, only pattern-matching.\n\nA one-line natural-deduction derivation: to prove p → p, assume p, then discharge the assumption by the →-introduction rule, concluding p → p with no premises. Slightly more: proving ¬¬p → p requires classical logic (the law of excluded middle or double-negation elimination) — and the fact that it is NOT derivable in the intuitionistic fragment is not a gap but a discovery, distinguishing constructive from classical mathematics.\n\nProof systems make proof itself a mathematical object, which is what proof theory studies: Gentzen's cut-elimination theorem shows proofs can be normalized, and his ordinal analysis measures the strength of theories (the consistency of arithmetic needs induction up to the ordinal ε₀). Practically, this is the foundation of proof assistants (Coq, Lean, Isabelle) — machines that check human mathematics line by line, and increasingly help write it."
    },
    {
     "label": "Soundness & completeness",
     "def": "Gödel 1930: a first-order sentence is provable exactly when it holds in every model. Syntax and semantics agree perfectly.",
     "detail": "Soundness says the proof system never lies: anything provable is true in every model. Completeness is the deep converse — Gödel's 1930 theorem — that anything true in every model is provable. Together they collapse the distinction between the syntactic ⊢ (there is a proof) and the semantic ⊨ (true in all structures): for first-order logic, provability and universal truth are the same relation. Proof, a finite combinatorial object, exactly captures truth across all possible interpretations.\n\nThe most useful corollary is compactness: if every finite subset of a set of sentences has a model, the whole set does (a proof of a contradiction could only use finitely many sentences). Deploy it: add to the axioms of arithmetic a new constant c with the sentences c > 0, c > 1, c > 2, … Every finite subset is satisfiable in ordinary ℕ (take c large enough), so by compactness the whole infinite set has a model — a structure obeying all true first-order arithmetic yet containing an \"infinite\" number larger than every numeral. Nonstandard models exist, unavoidably.\n\nCompleteness is the hinge between syntax and semantics and the founding theorem of model theory: it guarantees that the algebraic study of provability and the structural study of models are two views of one subject. Compactness, its shadow, is the workhorse that builds exotic structures on demand — nonstandard analysis, ultraproducts, and much of modern model theory descend from it."
    },
    {
     "label": "Incompleteness",
     "def": "Gödel 1931: any consistent, effectively axiomatized theory containing arithmetic leaves true sentences unprovable — and cannot prove its own consistency.",
     "detail": "Gödel's 1931 theorems mark the limits of formalization. Encode formulas and proofs as numbers (Gödel numbering), so a theory strong enough to do arithmetic can talk about its own provability. The first theorem: any consistent, effectively axiomatized theory T containing arithmetic has a true sentence it cannot prove. The second: such a T cannot prove its own consistency (Con(T)).\n\nThe construction is self-reference made rigorous. The diagonal lemma produces a sentence G with T ⊢ G ↔ ¬Prov(⌜G⌝) — \"G asserts its own unprovability.\" If T could prove G, then G is false, so T proves a falsehood (inconsistent); if T could prove ¬G, then G is provable, again contradiction (with a consistency hypothesis Rosser sharpened to plain consistency). So if T is consistent, G is undecidable — true (it really is unprovable) but beyond T's reach. It is the Liar paradox rebuilt as a theorem instead of a contradiction.\n\nIncompleteness ended Hilbert's program of a single complete, consistency-proving formal system, and its reach is enormous: it is the halting problem in arithmetic dress (Turing's undecidability is the computational twin), it forces the existence of true-but-unprovable statements in any rich theory (Paris–Harrington, Goodstein), and it permanently separated \"true\" from \"provable\" — the philosophical fault line all of foundations now works around."
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
     "def": "Nine axioms about membership ∈, from which ℕ, ℝ, functions, and the rest of mathematics are constructed. The official foundation.",
     "detail": "Zermelo–Fraenkel set theory with Choice is mathematics' standard foundation: everything is a set, and nine or so axioms say which sets exist. Extensionality (sets are equal iff they have the same members) fixes identity; Pairing, Union, Power Set, and Infinity build new sets; Separation and Replacement carve out subsets and images; Foundation forbids infinite descending ∈-chains; Choice (often listed separately) provides selectors. Crucially, Separation only forms {x ∈ A : φ(x)} from an existing set A — not {x : φ(x)} from nothing.\n\nThat restriction is what defuses Russell's paradox. Unrestricted comprehension would allow R = {x : x ∉ x}, and asking whether R ∈ R yields a contradiction either way; ZFC blocks it because R is not carved from any existing set, and indeed there is no universal set. Concretely, ZFC codes the natural numbers as von Neumann ordinals: 0 = ∅, 1 = {∅}, 2 = {∅, {∅}}, and n+1 = n ∪ {n}, so each number literally is the set of its predecessors — arithmetic reconstructed from the empty set and braces.\n\nZFC is the language in which every other structure on this map is ultimately coded — ℝ as Dedekind cuts, functions as sets of ordered pairs, groups as sets with operations. Its power is uniformity; its cost is that deep questions about it (the Continuum Hypothesis, large cardinals) are undecidable from the axioms, which is why set theory remains an active field rather than settled bedrock."
    },
    {
     "label": "Ordinals & transfinite induction",
     "def": "Order-types of well-ordered sets: 0,1,2,…,ω,ω+1,…. Induction extended past infinity, powering constructions of arbitrary length.",
     "detail": "Ordinals are the canonical well-ordered sets — orders in which every non-empty subset has a least element — generalizing counting past the finite. After 0, 1, 2, … comes the first infinite ordinal ω, then ω+1, ω+2, …, ω·2, …, ω², …, ω^ω, and on without end. Every well-ordered set is order-isomorphic to exactly one ordinal, and transfinite induction/recursion — proving or defining P(α) using all P(β) for β < α — is valid precisely because the ordinals are well-ordered.\n\nOrdinal arithmetic is where intuition must be retrained: addition is not commutative. Computing 1 + ω means placing one element before an ω-chain, which is still order type ω, so 1 + ω = ω. But ω + 1 places an element after the entire ω-chain, producing a well-order with a greatest element — something ω lacks — so ω + 1 ≠ ω. The order in which you concatenate changes the answer.\n\nOrdinals are the backbone of set theory's architecture: the cumulative hierarchy V_α that stratifies the universe is indexed by them, ranks and recursions throughout mathematics run on transfinite induction, and proof theory measures the strength of a theory by the largest ordinal up to which it can prove induction (ε₀ for Peano arithmetic). They are counting freed from finiteness, and the scaffolding on which the infinite is organized."
    },
    {
     "label": "Cardinals & CH",
     "def": "Sizes of infinite sets: ℵ₀ = |ℕ| < 2^ℵ₀ = |ℝ|. The Continuum Hypothesis asks whether any size lies strictly between.",
     "detail": "Cardinals measure size rather than order: two sets have the same cardinality when a bijection exists between them, and cardinal numbers are the ordinals that begin a new size — ℵ₀ (countable), ℵ₁, ℵ₂, … Cantor's theorem is the engine: |X| < |P(X)| always, so there is no largest set and an unending tower of infinities. Cardinal arithmetic is mostly collapse (ℵ₀ + ℵ₀ = ℵ₀ · ℵ₀ = ℵ₀), which makes exponentiation, where the real difficulty hides, all the more interesting.\n\nCantor's diagonal argument shows ℕ and ℝ have different sizes, concretely: given any list r₁, r₂, r₃, … of reals in [0,1], build a real differing from rₙ in the n-th decimal place; it is on no line of the list, so no list is complete and ℝ is uncountable. Thus |ℕ| = ℵ₀ < 2^{ℵ₀} = |ℝ|. The Continuum Hypothesis asks whether anything sits strictly between: is 2^{ℵ₀} = ℵ₁?\n\nCH is the question that broke naïve faith in the axioms. Gödel (1938) showed ZFC cannot refute it and Cohen (1963) showed ZFC cannot prove it — CH is independent, the first natural mathematical statement proven formally undecidable. That result opened the modern era of set theory: forcing, large cardinal axioms, and the ongoing search for principles that might settle the size of the continuum."
    },
    {
     "label": "Axiom of Choice",
     "def": "From any family of nonempty sets, a choice function exists. Equivalent to Zorn's lemma and well-ordering; buys bases for every vector space at the price of non-measurable sets.",
     "detail": "The Axiom of Choice states that for any collection of non-empty sets there is a function selecting one element from each — obvious for finite collections, a genuine assumption for infinite ones where no rule for choosing is given. It has many faces: Zorn's Lemma (every chain-bounded poset has a maximal element) and the Well-Ordering Theorem (every set can be well-ordered) are equivalent to it, and each is the form actually used in different corners of mathematics.\n\nChoice does real work: via Zorn's Lemma, every vector space has a basis — including ℝ as a vector space over ℚ, whose basis (a Hamel basis) no one can exhibit but which must exist — and every non-trivial ring has a maximal ideal. But it also produces monsters: the Banach–Tarski paradox decomposes a solid ball into five pieces that reassemble into two balls of the same size, and non-measurable sets of reals exist. The pieces are unconstructible precisely because Choice conjured them without a rule.\n\nAC is independent of the other axioms (Gödel and Cohen again): ZF neither proves nor refutes it. Most mathematics simply assumes it — analysis, algebra, and topology lean on it constantly (Tychonoff's theorem is equivalent to it) — while constructivists reject it and descriptive set theorists track exactly where it is needed. Its non-constructive power is both indispensable and the source of the field's strangest theorems."
    },
    {
     "label": "Forcing",
     "def": "Cohen's technique for building models of ZFC to order — proving CH independent: neither provable nor refutable from the axioms.",
     "detail": "Forcing is Cohen's 1963 technique for building new set-theoretic universes to order, the tool that proves independence results. Start with a model M of ZFC and a partial order P of \"conditions\" (finite approximations to a new object); a generic filter G ⊆ P meets every dense set and is chosen from outside M. The forcing extension M[G] is a new model of ZFC containing G, and — the technical heart — a forcing relation lets one decide, working inside M, exactly which statements M[G] will satisfy.\n\nThe paradigm case builds a universe where CH fails: force with finite partial functions from ℵ₂ × ℕ to {0,1}, adding ℵ₂ distinct new reals (\"Cohen reals\"). In the extension 2^{ℵ₀} ≥ ℵ₂ > ℵ₁, so the Continuum Hypothesis is false there. Combined with Gödel's constructible universe L (where CH holds), this bookends the independence: models exist on both sides, so ZFC decides nothing.\n\nForcing turned independence from a curiosity into an industry — the standard method for showing statements unprovable from ZFC, from CH to Suslin's Hypothesis to countless combinatorial principles. It reshaped set theory into the study of the multiverse of possible models, and its machinery (generic extensions, Boolean-valued models, iterated forcing) is among the most powerful and distinctive technology in all of mathematics."
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
     "def": "A category is objects plus composable arrows; a functor maps categories to categories preserving composition. Structure lives in the arrows, not inside objects.",
     "detail": "A category is objects plus morphisms (arrows) that compose associatively and have identities — an axiomatization of \"structure and structure-preserving maps\" that forgets what the objects are made of. Set, Grp, Top, Vec are the obvious examples, but the abstraction bites precisely when the objects are not \"sets with structure\": a monoid is a category with one object (its elements are the arrows, composition is the operation), and a preorder (P, ≤) is a category with at most one arrow x → y, present exactly when x ≤ y. A functor F: C → D maps objects to objects and arrows to arrows, preserving composition and identities.\n\nFunctoriality is a theorem-generating principle. The fundamental group π₁: Top* → Grp is a functor: a continuous map of spaces induces a homomorphism of groups, and because functors preserve composition and identities, a homeomorphism induces an isomorphism — so spaces with different fundamental groups cannot be homeomorphic. Topological invariance, one of the map's recurring tools, is just \"π₁ is a functor\" in disguise. Between two preorders, a functor is exactly a monotone map — the abstraction specializes correctly.\n\nCategory theory is the organizing language of modern mathematics: it makes \"structure-preserving\" precise across every field, lets constructions in one area be transported to another, and recognizes the same pattern (products, quotients, duals) wherever it recurs. On this map it is the connective tissue — algebraic topology, homological algebra, algebraic geometry, and even logic (via topoi) all speak it."
    },
    {
     "label": "Natural transformations",
     "def": "Morphisms between functors — the concept the whole subject was invented to define (Eilenberg–Mac Lane, 1945).",
     "detail": "A natural transformation is a morphism between functors: given F, G: C → D, it provides for each object X an arrow η_X: FX → GX so that every square commutes with the functors' action on morphisms (the naturality condition). This is the third rung — Eilenberg and Mac Lane's quip is that they invented categories to define functors and functors to define natural transformations, which formalize the elusive word \"canonical.\"\n\nThe defining example distinguishes canonical from arbitrary. For a finite-dimensional vector space V, the map V → V** into the double dual (send v to \"evaluate at v\") is a natural isomorphism: it is defined without choosing a basis, and the naturality squares commute for every linear map. By contrast the isomorphism V → V* to the single dual exists but requires choosing a basis, and is not natural — no basis-free rule produces it, and the naturality squares fail. \"Naturally isomorphic\" captures exactly the difference between a canonical identification and one that depends on arbitrary choices.\n\nNaturality is why category theory can talk about identifications being \"the same for the right reasons,\" and it underwrites the field's deepest tools: adjunctions and equivalences of categories are defined through natural transformations, the Yoneda lemma (an object is determined by its natural family of maps) is the subject's cornerstone, and in topology natural transformations are exactly the \"natural\" operations on (co)homology theories."
    },
    {
     "label": "Limits & colimits",
     "def": "Universal solutions to diagram-completion problems: products, pullbacks, equalizers and their duals — all instances of one definition.",
     "detail": "Limits and colimits are universal constructions that unify products, intersections, and gluings across all of mathematics. A limit of a diagram is the universal cone into it — the best object mapping compatibly to every object of the diagram; colimits are the dual, the best object receiving compatible maps out. Products, pullbacks (fiber products), and equalizers are limits; coproducts, pushouts, and coequalizers are colimits; terminal and initial objects are the empty cases. \"Universal\" means unique-up-to-unique-isomorphism, so these objects are canonical when they exist.\n\nThe shapes are familiar once decoded. In Set, the product is the Cartesian product with its projections, the coproduct is disjoint union, the terminal object is any singleton and the initial object is ∅. The pullback of f: X → Z and g: Y → Z is the fiber product {(x, y) : f(x) = g(y)} — which specializes to intersection, preimage, and the graph of a function. The coproduct changes with the category: disjoint union in Set, free product in Grp, tensor product in commutative rings.\n\nRecognizing a construction as a (co)limit instantly grants its universal property and its uniqueness, and lets theorems transfer between fields. It is also a completeness gauge: a category \"has all limits\" or not, and functors that preserve them (right adjoints preserve limits) are especially well-behaved. Limits and colimits are the vocabulary in which algebraic geometry glues schemes, topology builds CW complexes, and homological algebra forms kernels and cokernels."
    },
    {
     "label": "Adjunctions",
     "def": "Functor pairs F ⊣ G exchanging mapping problems: Hom(FX,Y) ≅ Hom(X,GY). Free ⊣ forgetful everywhere; the most load-bearing idea in the subject.",
     "detail": "An adjunction is a pair of functors F: C → D and G: D → C with a natural bijection Hom_D(FX, Y) ≅ Hom_C(X, GY) — \"F ⊣ G,\" F left adjoint to G. Equivalently, there are a unit X → GFX and counit FGY → Y satisfying triangle identities. Adjunctions are the most pervasive relationship in category theory: Mac Lane's slogan is that adjoint functors arise everywhere, and they capture \"best possible\" or \"freely generated\" constructions with a single formula.\n\nThe archetype is free ⊣ forgetful. Let F: Set → Grp build the free group on a set and U forget a group down to its underlying set; then Hom_Grp(F(S), G) ≅ Hom_Set(S, U(G)), because a homomorphism out of a free group is determined by where the generators go. Take S a one-point set: F(S) = ℤ, and the bijection says Hom_Grp(ℤ, G) ≅ U(G) — a homomorphism from ℤ is exactly a choice of one element of G (the image of 1). Currying is another instance: Hom(X × Y, Z) ≅ Hom(X, Z^Y), the adjunction that makes a category cartesian closed.\n\nAdjunctions organize enormous swaths of mathematics under one idea: free constructions, completions, and forgetful/underlying passages are all left/right adjoints; limits are right adjoints and colimits left adjoints (so right adjoints preserve limits — a theorem, not a coincidence); and in logic the quantifiers ∃ and ∀ are the left and right adjoints to substitution (Lawvere), tying this field back to the map's logic region."
    },
    {
     "label": "Topoi",
     "def": "Categories that behave like the universe of sets and carry an internal logic — where geometry and logic literally merge.",
     "detail": "A topos is a category rich enough to behave like the category of sets: it has all finite limits and colimits, is cartesian closed (function objects Y^X exist), and — the decisive ingredient — has a subobject classifier Ω, an object of \"truth values\" such that subobjects of any X correspond to maps X → Ω. Grothendieck introduced topoi as generalized spaces (categories of sheaves); Lawvere and Tierney recognized them as generalized universes of sets, each with its own internal logic.\n\nSet itself is the prototype: Ω = {true, false}, and a subset A ⊆ X is classified by its characteristic function χ_A: X → Ω, recovered as the pullback of \"true\" along χ_A. In a sheaf topos over a space, Ω is far larger — its \"truth values\" are open sets — and the internal logic becomes intuitionistic: the law of excluded middle can fail, and Ω is a Heyting algebra rather than a Boolean one. Different topos, different logic, computed the same way.\n\nTopoi are where category theory closes the loop back to foundations: they provide alternative universes for mathematics (models where the Axiom of Choice or excluded middle fails, where all functions are continuous or computable), they unify geometry and logic, and their internal language makes \"space\" and \"logical theory\" two views of one object. This is the technical content of the gold bridge from Topoi to Logic on the map — Lawvere's insight that a theory and its space of models are dual."
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
     "def": "A structure interprets a formal language; Tarski's definition makes 'φ is true in M' precise. Theories are sentence sets, models are where they hold.",
     "detail": "Model theory studies the structures that make sentences true. A structure for a language is a domain together with interpretations of the constant, function, and relation symbols; Tarski's definition of satisfaction M ⊨ φ then fixes, by recursion on the shape of φ, exactly when a structure makes a formula true — grounding the semantic ⊨ that completeness pairs with the syntactic ⊢. A theory is a set of sentences, and its models are the structures satisfying them all.\n\nElementary equivalence — satisfying the same first-order sentences — is coarser than isomorphism, and the gap is the subject's engine. The dense linear orders without endpoints, (ℚ, <) and (ℝ, <), are elementarily equivalent: their common theory is complete (any first-order sentence is decided the same way in both), so no first-order statement distinguishes them. Yet they are not isomorphic — one is countable, the other is not. First-order logic simply cannot see the difference between these two orders.\n\nThat controlled blindness is what makes model theory possible: the Löwenheim–Skolem theorems say a theory with an infinite model has models of every infinite cardinality, so first-order axioms never pin down an infinite structure uniquely. Studying the class of all models of a theory — how many, of which sizes, with what definable sets — turns logic into a structural, almost geometric subject, and connects it to algebra (fields, groups) and combinatorics."
    },
    {
     "label": "Ultraproducts",
     "def": "Averaging infinitely many structures through an ultrafilter — yielding slick compactness proofs and nonstandard models of ℝ with genuine infinitesimals.",
     "detail": "An ultraproduct averages a family of structures using an ultrafilter — a maximal consistent notion of \"large\" subsets of the index set. Given structures Mᵢ and an ultrafilter U on the index set, form the product and identify two sequences when they agree on a U-large set. Łoś's theorem is the payoff: a first-order sentence holds in the ultraproduct exactly when it holds in \"almost all\" (a U-large set of) the factors. Truth in the average is the average of the truths.\n\nTake an ultrapower of the real field: ℝ^ℕ modulo a non-principal ultrafilter U. By Łoś's theorem it satisfies every first-order truth about ℝ (it is a real closed field), yet it is strictly larger — the class of the sequence (1, ½, ⅓, …) is positive but smaller than every standard real, a genuine infinitesimal, while (1, 2, 3, …) names an infinite element. This is Robinson's nonstandard analysis: infinitesimals rigorously realized, with the transfer principle (Łoś) guaranteeing standard theorems carry over.\n\nUltraproducts give a purely algebraic proof of the compactness theorem and are a versatile construction machine: they produce nonstandard models, ultrafilter limits in combinatorics, and — in the Ax–Kochen theorem — a bridge between p-adic fields and fields of formal power series that resolved a conjecture of Artin for almost all primes. They are one of model theory's most portable exports to the rest of mathematics."
    },
    {
     "label": "o-minimality",
     "def": "Tame real geometry: definable subsets of ℝ are finite unions of points and intervals. Model theory exporting finiteness theorems to real geometry.",
     "detail": "An ordered structure is o-minimal when every definable subset of the line is a finite union of points and open intervals — the simplest possible definable sets, forbidding any infinite discrete or fractal-like definable subset. This tameness condition, imposed in one dimension, propagates: definable sets in every dimension are then finite unions of well-behaved cells, with uniform bounds on their topological complexity. It is Grothendieck's dream of a \"tame topology\" made precise.\n\nThe real field (ℝ, +, ·, <) is o-minimal — Tarski's quantifier elimination shows every definable set is semialgebraic (built from polynomial inequalities), hence in one variable a finite union of points and intervals. For example {x : ∃y (y² = x)} is exactly [0, ∞), an interval; no formula, however cleverly nested, carves out something like the integers or a Cantor set. Wilkie's theorem extends o-minimality to the real exponential field (ℝ, +, ·, exp, <), so even transcendental definable sets stay tame.\n\no-minimality gives a robust notion of \"geometrically tame\" set that avoids the pathologies general topology allows, and it has become a surprising bridge to number theory: the Pila–Wilkie counting theorem bounds rational points on definable sets, and this powered proofs of the André–Oort conjecture on special points of Shimura varieties — a striking case of the map's foundations region reaching directly into its number-theory region."
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
     "def": "The formal model of mechanical computation. Church–Turing thesis: whatever is effectively calculable at all, a Turing machine calculates.",
     "detail": "A Turing machine is the mathematical definition of an algorithm: a finite control (states and a transition table) reading and writing symbols on an unbounded tape, one cell at a time. Despite the primitive mechanism, Turing machines compute exactly the functions any reasonable model computes — the Church–Turing thesis identifies \"effectively calculable\" with \"Turing-computable,\" and every alternative (λ-calculus, register machines, general recursive functions) has been proven equivalent. A universal Turing machine takes another machine's description as input and simulates it, the theoretical seed of the stored-program computer.\n\nConcretely, a machine to increment a binary number scans to the least significant bit, then flips 1s to 0s moving left until it hits a 0 (or blank), which it flips to 1 — carrying by local rewriting alone. Such small machines compose, and the universal machine shows one fixed program can run all others: this is why a single laptop, given the code, can execute any algorithm whatsoever.\n\nTuring machines make \"computable\" and \"algorithm\" rigorous, which is the prerequisite for proving that some problems have NO algorithm. They found complexity theory (measuring the time and space a machine uses, giving P, NP, and the rest) and, through the universal machine, underwrite the entire architecture of general-purpose computers — the theoretical object arriving decades before the physical one."
    },
    {
     "label": "Halting problem",
     "def": "No algorithm decides whether an arbitrary program halts — the original diagonal impossibility, ancestor of every undecidability result.",
     "detail": "The halting problem asks for an algorithm that, given any program and input, decides whether the program eventually halts. Turing proved in 1936 that no such algorithm exists — the first proof that a precisely-stated problem is absolutely unsolvable, not merely hard. The argument is diagonalization, the same weapon Cantor used against the reals, aimed now at programs.\n\nSuppose a program H(p, x) always halts and correctly reports whether program p halts on input x. Build a program D that, on input a program p, computes H(p, p): if H says \"p halts on p,\" then D loops forever; otherwise D halts. Now run D on its own code. D(D) halts ⟺ H(D, D) reports \"does not halt\" ⟺ D(D) does not halt — a flat contradiction. The assumption that H exists is therefore false: halting is undecidable.\n\nThe halting problem is the fountainhead of undecidability. Rice's theorem generalizes it — every non-trivial property of a program's input/output behavior is undecidable — so no algorithm can decide in general whether two programs are equivalent, whether code is malware, or whether a loop terminates. It is Gödel's incompleteness in computational form (an unsolvable problem yields unprovable truths), and it marks the permanent horizon of what software can decide about software."
    },
    {
     "label": "Recursion theorem",
     "def": "Kleene: programs may legitimately use their own source code. Self-reference made rigorous rather than paradoxical.",
     "detail": "Kleene's recursion theorem legitimizes self-reference in computation: for any computable transformation f of programs, there is a program e that behaves identically to f(e) — a fixed point at the level of code. Informally, a program can obtain and use its own source text, and any construction that refers to \"this very program\" can be carried out. What looks like a paradox of self-reference is instead a theorem guaranteeing such programs exist.\n\nThe tangible witnesses are quines: programs that print their own source code with no input and no cheating (no reading of their own file). The recursion theorem guarantees a quine exists in every general-purpose language, and more usefully, it licenses definitions like \"the program that, given n, simulates its own behavior on n and then does the opposite\" — precisely the kind of self-referential machine that diagonal arguments require.\n\nThe recursion theorem is the computational engine behind self-reference proofs: it gives a clean route to the undecidability of the halting problem, to Gödel's incompleteness (the Gödel sentence is a program's fixed point saying \"I am not provable\"), and to Kleene's theory of self-reproducing automata — the abstraction underlying computer viruses and, historically, von Neumann's self-replicating machines. It is the theorem that makes \"a program that talks about itself\" rigorous mathematics rather than a trick."
    },
    {
     "label": "Turing degrees",
     "def": "Grading unsolvable problems by relative computability — an intricate infinite hierarchy above the halting problem.",
     "detail": "Turing reducibility compares problems by relative difficulty: A ≤_T B means A is decidable by an algorithm allowed to consult an oracle for B. Mutual reducibility bundles problems into Turing degrees — equivalence classes of \"the same computational hardness.\" Degree 0 is the computable sets; the jump operator sends a degree to the halting problem relative to it, producing a strictly harder degree, so 0 <_T 0′ <_T 0″ <_T ⋯, an infinite ascending tower of unsolvability with the ordinary halting problem 0′ at the first rung.\n\nPost's problem asked whether the story between 0 and 0′ is empty — is every computably enumerable set either decidable or as hard as halting? The Friedberg–Muchnik theorem (1956) answers no: there exist c.e. degrees strictly between 0 and 0′, constructed by the priority method, which builds two sets while satisfying infinitely many competing requirements, each allowed to injure lower-priority ones finitely often. Intermediate difficulty genuinely exists.\n\nTuring degrees chart the vast landscape above the computable, and the priority method invented to explore it became the central technique of computability theory. The structure is intricate — the degrees are dense, undecidable as a partial order, and full of surprising configurations — and it connects outward: reverse mathematics calibrates theorems by the oracle power needed to prove them, and the arithmetical hierarchy aligns the jumps 0′, 0″, … with the quantifier complexity of the sentences they decide, tying this field back to the map's logic region."
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
     "def": "A set closed under addition and scaling by a field. A basis is a minimal spanning set; every vector is a unique combination of it, and the number of basis vectors — the dimension — is the space's only invariant.",
     "detail": "A vector space over a field is a set with addition and scalar multiplication obeying eight axioms — the abstraction of \"things you can add and scale.\" The structural notions are span (what a set of vectors reaches), linear independence (no redundancy), and basis (both at once: a minimal spanning set). The Steinitz exchange lemma forces every basis of a space to have the same size, so dimension is well-defined — the single most important invariant in the subject, and two spaces over the same field are isomorphic exactly when their dimensions agree.\n\nBases are everywhere once you look: {1, x, x²} for polynomials of degree ≤ 2 (dimension 3, nothing to do with arrows); the standard basis of 𝔽₂ⁿ making bit-strings a vector space over the two-element field (coding theory's home); and ℝ as a vector space over ℚ, which has a basis only by the axiom of choice and is infinite-dimensional — the same set, wildly different dimensions depending on the field of scalars.\n\nChoosing a basis converts abstract vectors into coordinate columns and linear maps into matrices — the bridge between structure and computation. That freedom of choice is the deep point: objects exist without coordinates, and the art (diagonalization, orthonormalization, Jordan form) is choosing coordinates in which a problem becomes transparent."
    },
    {
     "label": "Linear maps & rank",
     "def": "Structure-preserving maps T(av+bw)=aT(v)+bT(w). Rank–nullity: dim(domain)=rank+nullity, so what a map collapses (kernel) and what it hits (image) are bookkept exactly.",
     "detail": "Linear maps are the structure-preserving functions T(u+v) = Tu + Tv, T(cv) = cTv; each carries a kernel (what dies) and an image (what's reached). The rank–nullity theorem is the subject's conservation law: dim ker T + dim im T = dim of the domain. After choosing bases a map becomes a matrix, and changing bases changes the matrix by conjugation — so the honest invariants are the ones conjugation preserves, of which the first is rank, computable by row reduction.\n\nRun rank–nullity on differentiation acting on polynomials of degree ≤ 3: the domain has dimension 4, the kernel is the constants (dimension 1), the image is all polynomials of degree ≤ 2 (dimension 3), and 1 + 3 = 4. A map with no matrix in sight, yet the bookkeeping is exact — and it instantly shows differentiation is not injective and not surjective on this space.\n\nRank classifies maps completely up to change of bases on both sides: every rank-r map is \"identity on r coordinates, zero elsewhere\" in the right coordinates. This is why solving Ax = b is a rank computation, why systems have 0, 1, or ∞ solutions, and why so much of applied mathematics (least squares, low-rank approximation, the SVD) is the study of how a map's rank structure degrades."
    },
    {
     "label": "Determinants as volume",
     "def": "The signed factor by which a linear map scales oriented volume. Zero determinant = the map squashes space into lower dimension = non-invertible. Everything else about det follows from this one idea.",
     "detail": "The determinant is the unique function of a matrix's columns that is multilinear, alternating (swapping two columns flips the sign), and normalized (det I = 1). Those three properties force the cofactor formula — and they say what det MEANS: it is the signed volume-scaling factor of the linear map, with sign recording whether orientation is preserved. Multiplicativity det(AB) = det A · det B follows from the characterization, and invertibility is exactly det ≠ 0: a map collapses volume precisely when it flattens space.\n\nFor a 2×2 matrix with rows (a,b), (c,d): det = ad − bc is the signed area of the parallelogram spanned by the columns — check it on the unit square. A shear (1 1; 0 1) has determinant 1: it slants the square but preserves area exactly, which is why shear-based row reduction leaves determinants alone. A reflection has determinant −1: area preserved, orientation flipped.\n\nVolume-scaling is why the Jacobian determinant runs the change-of-variables formula in integration, why det appears in the characteristic polynomial det(A − λI) that starts eigentheory, and why \"orientation\" makes sense on manifolds at all. When a differential equation's flow preserves volume (Liouville), that is a determinant statement about the flow's derivative."
    },
    {
     "label": "Eigentheory",
     "def": "Directions a map merely stretches: Tv=λv. Diagonalizable maps are just stretches in a clever basis; the spectral theorem guarantees this for symmetric/Hermitian maps, with orthogonal eigenvectors.",
     "detail": "An eigenvector is a direction a map only stretches: Av = λv; the stretch factors λ are roots of the characteristic polynomial det(A − λI). When a basis of eigenvectors exists the map diagonalizes — in eigencoordinates it is just independent scalings — and the spectral theorem guarantees this, with orthonormal eigenvectors, for every real symmetric matrix. When diagonalization fails (repeated eigenvalues with too few eigenvectors), the Jordan form is the canonical fallback.\n\nThe Fibonacci numbers are the standard miracle: the step (F_{n+1}, F_n) ↦ (F_{n+2}, F_{n+1}) is the matrix (1 1; 1 0), whose eigenvalues are φ = (1+√5)/2 and ψ = (1−√5)/2. Diagonalize, take the n-th power, and Binet's closed form Fₙ = (φⁿ − ψⁿ)/√5 falls out — a recursion solved by finding the directions the recursion merely scales. Meanwhile a plane rotation has no real eigenvalues at all: not every map has invariant directions, and complex numbers exist to fix that.\n\nEigentheory is how linear dynamics is understood: powers of A, stability of equilibria, resonant frequencies, Markov chains' stationary distributions (PageRank is an eigenvector), principal component analysis (eigenvectors of a covariance matrix), and quantum mechanics — where observables are self-adjoint operators and the measurable values ARE their eigenvalues, the spectral theorem holding the entire formalism up."
    },
    {
     "label": "Inner products → angles",
     "def": "⟨u,v⟩ upgrades a vector space with length |v|=√⟨v,v⟩ and angle cos θ=⟨u,v⟩/|u||v|. Orthogonality, projections, and Gram–Schmidt all flow from this single extra structure.",
     "detail": "An inner product adds metric geometry to a vector space: a symmetric, positive-definite bilinear form ⟨u,v⟩ defining lengths ‖v‖ = √⟨v,v⟩ and, via the Cauchy–Schwarz inequality |⟨u,v⟩| ≤ ‖u‖‖v‖, honest angles cos θ = ⟨u,v⟩/‖u‖‖v‖. Orthogonality (⟨u,v⟩ = 0) is the workhorse: Gram–Schmidt turns any basis into an orthonormal one, and orthogonal projection gives the closest point in a subspace — the geometric fact behind least squares.\n\nThe example that built modern analysis: on functions on [0, 2π] with ⟨f,g⟩ = ∫fg, the family 1, cos nx, sin nx is orthogonal — so the Fourier coefficients of f are just projections onto these directions, and a Fourier series is \"write the vector in an orthonormal basis\" said in function space. Fitting a line by least squares is the same operation: project the data vector orthogonally onto the plane spanned by (1,…,1) and (x₁,…,xₙ).\n\nInner products are where algebra meets geometry and analysis: they define Hilbert spaces (quantum mechanics' state spaces, where probability amplitudes are inner products), they make \"best approximation\" a theorem rather than a hope, and their available symmetries — the orthogonal and unitary groups — are the compact Lie groups that dominate representation theory and physics."
    },
    {
     "label": "Bilinear forms",
     "def": "Maps linear in each argument separately; symmetric ones are classified by signature (Sylvester's law of inertia) — the invariant behind Lorentzian signatures (−+++) in relativity.",
     "detail": "Drop positivity (and sometimes symmetry) from the inner product and you get bilinear forms at large: B(u,v) linear in each slot, represented by a matrix that transforms by congruence B ↦ PᵀBP under change of basis. For real symmetric forms, Sylvester's law of inertia says the only congruence invariants are the counts of positive, negative, and zero diagonal entries after diagonalization — the signature. Nondegenerate alternating forms (B(v,v) = 0) are the other great family: they force even dimension and have a single canonical shape, the symplectic form.\n\nSignature in the wild: on ℝ⁴, the Minkowski form t² − x² − y² − z² has signature (1,3); its null directions form the light cone, and the isometries of this ONE bilinear form are exactly the Lorentz group — special relativity is the geometry of a signature. In the plane, classifying x² + y² versus x² − y² versus x² is the conic classification, done by inertia rather than pictures.\n\nBilinear forms are classification engines across the map: intersection forms (symmetric, over ℤ) classify simply connected topological 4-manifolds; quadratic form theory over ℚ is a pillar of number theory (Hasse–Minkowski local-global principle); and the symplectic case seeds an entire field — symplectic geometry is the study of a closed, nondegenerate alternating form varying over a manifold."
    },
    {
     "label": "Tensors & exterior algebra",
     "def": "Multilinear maps packaged coordinate-free. The wedge ∧ is the antisymmetric part; iterating it builds the exterior algebra whose elements become differential forms on a manifold.",
     "detail": "The tensor product V ⊗ W is the universal home for bilinear maps: bilinear maps out of V × W correspond exactly to linear maps out of V ⊗ W — multilinearity converted to linearity by decree. Iterating gives tensors of all types (the multilinear machines of geometry: metrics, curvatures). The exterior algebra antisymmetrizes: Λᵏ V is spanned by wedges v₁∧⋯∧vₖ that flip sign under swaps and vanish on repeats, with dim Λᵏ(ℝⁿ) = C(n,k), and the determinant revealed as the action of a map on the one-dimensional top power Λⁿ.\n\nIn ℝ³, Λ² has dimension C(3,2) = 3 — and that numerical accident IS the cross product: u × v is the wedge u∧v wearing a disguise only available in three dimensions, which is why the cross product refuses to generalize while the wedge does. In calculus, dx∧dy is the signed area element, and the sign rule dy∧dx = −dx∧dy is exactly the orientation bookkeeping of surface integrals.\n\nTensors and wedges are the grammar of multilinear mathematics: differential forms (the integrands of Stokes' theorem) are exterior algebra varying over a manifold, curvature tensors live in tensor spaces, entangled quantum states are non-decomposable tensors in ⊗ of state spaces, and representation theory builds new representations from old by ⊗ and Λ — the constructions this map's Lie-theory and geometry regions consume constantly."
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
     "def": "A subgroup partitions its parent into equal-sized translated copies (cosets). Lagrange's theorem is the immediate consequence: subgroup order divides group order.",
     "detail": "A subgroup is a subset closed under the operation and inverses — a symmetry system inside a symmetry system. Each subgroup H slices the group into cosets gH, all of the same size, partitioning G; the count of slices is the index [G:H]. Lagrange's theorem falls out immediately: |H| divides |G|. Cyclic subgroups ⟨g⟩ track single elements, and the element's order divides the group's order — from which Fermat's little theorem a^{p−1} ≡ 1 (mod p) is one line: the order of a divides |(ℤ/p)*| = p−1.\n\nIn ℤ/12, the subgroups are exactly the multiples of each divisor of 12 — the subgroup lattice mirrors the divisor lattice. But Lagrange's converse fails, and the standard witness is A₄: order 12, yet no subgroup of order 6 (a subgroup of index 2 would be normal and force a sign homomorphism A₄ → ℤ/2, which cannot exist since A₄ is generated by 3-cycles, each a square). Divisibility is necessary, not sufficient.\n\nCosets are the first genuinely structural idea in algebra: they make counting arguments possible (orbit sizes, index computations), they are the points of quotient groups when H is normal, and coset spaces G/H are the homogeneous spaces of geometry — the sphere is SO(3)/SO(2) before it is anything else."
    },
    {
     "label": "Quotients & isomorphism theorems",
     "def": "Collapsing a normal subgroup to the identity yields the quotient G/N. The isomorphism theorems say homomorphisms are exactly quotients-followed-by-injections — the structural core of the subject.",
     "detail": "A subgroup N is normal when conjugation preserves it (gNg⁻¹ = N) — exactly the condition making the set of cosets a group, the quotient G/N, with multiplication (gN)(hN) = ghN. Normal subgroups are precisely the kernels of homomorphisms, and the first isomorphism theorem completes the triangle: for any homomorphism φ, G/ker φ ≅ im φ. The correspondence theorem adds the bookkeeping: subgroups of G/N match subgroups of G containing N, normality preserved both ways.\n\nThree quotients worth holding in mind: ℝ/ℤ is the circle group — wrap the line around, and addition of reals becomes addition of angles. S₃/A₃ ≅ ℤ/2 is the sign of a permutation: the quotient forgets everything except parity. And det: GLₙ(ℝ) → ℝ* has kernel SLₙ, so GLₙ/SLₙ ≅ ℝ* — the determinant is exactly \"what remains of a matrix when volume is all you keep.\"\n\nQuotienting is how algebra forgets on purpose: every homomorphic image of G is a quotient, so the quotients ARE the possible \"shadows\" of G. Iterating — take a maximal normal subgroup, quotient, repeat — produces composition series, and Jordan–Hölder says the simple factors are unique up to order: every finite group has a well-defined list of atomic pieces, setting up the classification quest."
    },
    {
     "label": "Group actions & orbits",
     "def": "A group acting on a set partitions it into orbits, with orbit size = index of a stabilizer (orbit–stabilizer). Counting orbits gives Burnside's lemma — symmetry made quantitative.",
     "detail": "A group action is a homomorphism G → Sym(X): each group element permutes the set X, compatibly. Orbits partition X (the equivalence \"reachable from\"), stabilizers are the subgroups fixing a point, and the orbit–stabilizer theorem is the master count: |orbit of x| = [G : Stab(x)]. Burnside's lemma converts it into a counting tool: the number of orbits equals the average number of fixed points of the group's elements.\n\nTwo checks. The rotation group of the cube acts on its 6 faces: one orbit (any face reaches any other), each face's stabilizer is the 4 rotations about the axis through it, so |G| = 6 × 4 = 24 — the group counted without listing an element. Necklaces: 6 beads, 2 colors, up to rotation and flip (dihedral group of order 12). Fixed-point counts: identity 2⁶ = 64; rotations by 1,2,3,4,5 steps fix 2, 4, 8, 4, 2; three flips through beads fix 2⁴ = 16 each, three through gaps fix 2³ = 8 each. Total 156, divided by 12: exactly 13 necklaces.\n\n\"Group\" and \"action\" were born together — Galois's groups act on roots, geometry's groups act on space (Cayley: every group acts on itself). Actions are how groups touch everything else: Sylow's theorems are proved by clever self-actions, Pólya counting powers chemistry's isomer counts, and the Erlangen program (on this map's geometry side) defines geometry itself as a group action's invariant theory."
    },
    {
     "label": "Sylow theory",
     "def": "For a prime power dividing |G|, subgroups of that order exist, are all conjugate, and their count is constrained mod p. The finest arithmetic control we have over finite-group structure.",
     "detail": "For the largest prime power pᵏ dividing |G|, Sylow's three theorems say: subgroups of that order exist (Sylow p-subgroups); any two are conjugate; and their number nₚ satisfies nₚ ≡ 1 (mod p) and nₚ divides |G|/pᵏ. This is the strongest general existence theorem in finite group theory — a partial converse to Lagrange that never fails.\n\nThe arithmetic bites immediately. Order 15: n₅ divides 3 and is ≡ 1 (mod 5), forcing n₅ = 1; n₃ divides 5 and is ≡ 1 (mod 3), forcing n₃ = 1. Both Sylow subgroups are unique, hence normal; the group is their internal product ℤ/5 × ℤ/3 ≅ ℤ/15. Conclusion: every group of order 15 is cyclic — a complete classification from congruences alone. The same style of squeeze shows no group of order 30 is simple, and powers most small-order classifications.\n\nSylow theory is the local-to-global principle in its original habitat: understand a group one prime at a time, then reassemble. Its descendants — fusion systems, local analysis — carried the classification of finite simple groups, and the \"p-local\" philosophy migrated outward into topology (localization of spaces) and number theory."
    },
    {
     "label": "Free groups & presentations",
     "def": "The freest possible group on a set of generators, with no relations except those forced. Every group is a quotient of a free one — a presentation ⟨generators | relations⟩.",
     "detail": "The free group F(S) on a set S consists of all reduced words in the letters of S and their inverses — a group with no relations beyond the forced cancellations. Its universal property: any map from S into any group G extends uniquely to a homomorphism F(S) → G. Consequently every group is a quotient of a free group, written as a presentation ⟨S | R⟩: generators S, relations R. The economy is real but treacherous: Novikov and Boone proved the word problem — does this word equal the identity in this finitely presented group? — is algorithmically undecidable in general.\n\nPresentations in action: ℤ × ℤ = ⟨a, b | ab = ba⟩ — one relation, commutativity, is all that separates it from the free group F₂. The trefoil knot's group is ⟨a, b | aba = bab⟩ — the braid relation — and distinguishing it from ℤ (the unknot's group) is how the trefoil was first proved knotted. In F₂ itself, the words a and b generate freely, but so do a² and b³aba⁻¹ — free groups teem with free subgroups of every rank.\n\nFree groups are where combinatorial and geometric group theory begin: Nielsen–Schreier (every subgroup of a free group is free) has a one-line topological proof — a subgroup corresponds to a covering space of a wedge of circles, which is a graph, whose fundamental group is free — the covering-space bridge on this map paying algebra back. Undecidability of the word problem, meanwhile, marks the exact spot where group theory touches the limits of computation."
    },
    {
     "label": "Simple groups",
     "def": "Groups with no nontrivial normal subgroups — the primes of group theory. Their complete classification (finished 2004, including the Monster) runs to tens of thousands of pages.",
     "detail": "A group is simple when its only normal subgroups are trivial — no quotients, no collapses, nothing to project onto. By Jordan–Hölder, simple groups are the prime factors of finite group theory: every finite group is assembled from a unique multiset of them. The classification of finite simple groups (CFSG) — thousands of pages, hundreds of authors, completed in the 1980s–2004 — gives the full list: cyclic groups of prime order, alternating groups Aₙ for n ≥ 5, sixteen families of Lie type, and exactly 26 sporadic exceptions, the largest being the Monster, of order about 8 × 10⁵³.\n\nA₅, of order 60, is the smallest nonabelian simple group, and its simplicity is a hands-on computation: its conjugacy classes have sizes 1, 15, 20, 12, 12, and no sub-collection containing 1 sums to a proper divisor of 60 — so no normal subgroup can exist. That one fact, fed through the Galois correspondence, is why the general quintic has no radical formula: S₅'s composition factors include the unbreakable A₅.\n\nSimple groups are the periodic table of symmetry, and the sporadics are its strangest entries: the Monster's smallest faithful representation has dimension 196883, and 196883 + 1 appears as a coefficient of the modular j-function — \"monstrous moonshine,\" proved by Borcherds via string-theoretic vertex algebras, tying the deepest finite symmetry to the number theory on this map's far side."
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
     "def": "Ideals are the subsets you can quotient by and still get a ring — the ring-theoretic analogue of normal subgroups. Maximal ideals give fields; prime ideals give domains.",
     "detail": "An ideal I ⊆ R is a subgroup that swallows multiplication by anything in the ring (rI ⊆ I) — exactly the condition making the cosets a ring, the quotient R/I. Ideals are precisely kernels of ring homomorphisms. The quality of the quotient reads off the ideal: R/I is an integral domain iff I is prime (ab ∈ I forces a or b in I), and a field iff I is maximal. The Chinese remainder theorem splits quotients by coprime ideals: R/(I∩J) ≅ R/I × R/J.\n\nTwo computations carry the theory. ℤ/12: the ideals of ℤ are (n), the quotient is clock arithmetic, and CRT gives ℤ/12 ≅ ℤ/4 × ℤ/3 — solve congruences componentwise. And ℝ[x]/(x²+1): pass to the quotient and x becomes an element whose square is −1; the quotient IS the complex numbers, constructed rather than postulated. Every field extension on this map is built by exactly this move: quotient a polynomial ring by the ideal of an irreducible.\n\nIdeals were invented (by Kummer and Dedekind) to repair failed unique factorization — \"ideal numbers\" that restore arithmetic where elements can't. They became algebra's all-purpose instrument: quotienting by them constructs new rings to order, prime ideals become the points of geometry (Spec, one field over on this map), and the ideal-theoretic reading of congruence unifies number theory with polynomial algebra."
    },
    {
     "label": "Euclidean → PID → UFD ladder",
     "def": "A tower of increasingly weak divisibility guarantees: Euclidean domains (division algorithm) ⊂ principal ideal domains ⊂ unique factorization domains. ℤ and k[x] sit at the top; the ladder explains exactly when unique factorization survives.",
     "detail": "Three grades of arithmetic quality for integral domains. Euclidean: there is a division algorithm with remainder (a size function shrinks on remainders). PID: every ideal is generated by one element. UFD: every element factors into irreducibles uniquely up to order and units. The implications Euclidean ⇒ PID ⇒ UFD are theorems (gcd's exist by descending through remainders; factorizations compare via prime ideals); both converses fail, and the failures are famous.\n\nℤ and k[x] are Euclidean — long division is the whole story. ℤ[(1+√−19)/2] is a PID that is provably not Euclidean under any size function — the standard counterexample. ℤ[x] is a UFD that is not a PID: the ideal (2, x) needs two generators. And ℤ[√−5] falls off the ladder entirely: 6 = 2·3 = (1+√−5)(1−√−5) are two genuinely different factorizations into irreducibles — unique factorization is FALSE there, checkable by computing norms (4, 9, 6, 6 admit no elements of norm 2 or 3).\n\nThat last failure is one of the most productive in mathematics: Kummer's response (ideal numbers) and Dedekind's (ideals proper) founded algebraic number theory — in rings of integers, IDEALS factor uniquely into prime ideals even when elements don't, and the class group measures the gap. The ladder is also a practical diagnostic: it tells you exactly which rings support gcd's, Bézout identities, and clean linear algebra (Smith normal form needs a PID)."
    },
    {
     "label": "Polynomial rings",
     "def": "k[x] behaves like the integers; k[x,y] does not (not a PID). Irreducibility criteria (Eisenstein, reduction mod p) decide when a polynomial is 'prime'.",
     "detail": "R[x] is the freest way to add one element to a ring: its universal property says a homomorphism out of R[x] is exactly a choice of where x goes (evaluation). Degree gives k[x] a division algorithm, hence the whole Euclidean ladder. Hilbert's basis theorem transmits finiteness: if R is Noetherian so is R[x] — hence k[x₁,…,xₙ] is Noetherian, and every system of polynomial equations is equivalent to a finite one. For several variables, monomial orders and Gröbner bases restore an effective division algorithm, making ideal membership computable.\n\nIrreducibility is the practical art, and Eisenstein's criterion the sharpest everyday tool: if a prime p divides every coefficient except the leading one and p² misses the constant term, the polynomial is irreducible over ℚ. Check x⁴ + 2x + 2 at p = 2: coefficients 1, 0, 0, 2, 2 — irreducible, instantly. The trick x ↦ x+1 extends its reach: it proves the cyclotomic polynomial x^{p−1} + ⋯ + x + 1 irreducible, the fact cyclotomic field theory stands on.\n\nPolynomial rings are the generic objects of commutative algebra — every finitely generated algebra is a quotient of one — so their ideal theory IS affine algebraic geometry: solution sets of polynomial systems are the varieties one field over on this map, and Gröbner bases are how computer algebra systems actually solve, eliminate, and project them."
    },
    {
     "label": "Modules",
     "def": "Vector spaces over a ring instead of a field. Over a PID they classify completely — and that one structure theorem yields both Jordan canonical form and the classification of finite abelian groups.",
     "detail": "A module is a vector space whose scalars form only a ring: addition plus scalar multiplication by ring elements, no division available. That one loss changes everything — modules can have torsion (elements killed by nonzero scalars), need not have bases, and free ≠ arbitrary. Abelian groups are exactly ℤ-modules; a vector space with a chosen linear operator is exactly a k[x]-module (x acts as the operator). Submodules, quotients, and homomorphisms behave as expected; the structure theorem over a PID is the payoff: every finitely generated module is a direct sum of cyclic modules R/(d₁) ⊕ ⋯ ⊕ R/(dₖ) ⊕ Rʳ with d₁ | d₂ | ⋯.\n\nBoth classical classification theorems are this one theorem. Over ℤ: every finite abelian group splits into cyclic prime-power pieces — ℤ/60 ≅ ℤ/4 ⊕ ℤ/3 ⊕ ℤ/5, and the abelian groups of order 8 are exactly ℤ/8, ℤ/4⊕ℤ/2, (ℤ/2)³. Over k[x]: applying the theorem to the k[x]-module of an operator yields rational canonical form and, over ℂ, the Jordan form — eigentheory's endgame is a module computation.\n\nModules are the common language: representation theory is modules over group rings, homological algebra (Ext, Tor, one field over) is built from module resolutions, and algebraic geometry's sheaves are modules varying over a space. Whenever two classification problems look eerily alike, a module-theoretic theorem is usually standing behind both."
    },
    {
     "label": "Noetherian rings",
     "def": "Rings with no infinite ascending chains of ideals — Hilbert's basis theorem shows polynomial rings qualify. The finiteness condition that makes algebraic geometry tractable.",
     "detail": "A ring is Noetherian when every ascending chain of ideals stabilizes — equivalently, every ideal is finitely generated. This is finiteness as an axiom: it licenses induction on ideals (\"pick a maximal counterexample\") and underwrites the Lasker–Noether theorem, which decomposes every ideal in a Noetherian ring into an intersection of primary ideals — the algebraic ancestor of \"every variety is finitely many irreducible components.\" Hilbert's basis theorem feeds the property forward: R Noetherian ⇒ R[x] Noetherian, so all finitely generated algebras over a field or over ℤ qualify.\n\nThe failure case makes the definition vivid: in k[x₁, x₂, x₃, …] with infinitely many variables, the chain (x₁) ⊂ (x₁,x₂) ⊂ (x₁,x₂,x₃) ⊂ ⋯ climbs forever. Contrast k[x₁,…,xₙ]: Noetherian, so any set of polynomial equations, however large, has the same solutions as some finite subset — the reason algebraic geometry can speak of \"the\" equations of a variety.\n\nNoether's axiom (from her 1921 Idealtheorie in Ringbereichen — the paper that made abstract algebra abstract) is the standing hypothesis of commutative algebra and algebraic geometry: dimension theory, completion, regularity all assume it. It is the precise dividing line between rings that behave like geometry and rings too large to control."
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
     "def": "Enlarging a field by adjoining roots, e.g. ℚ(√2) or ℚ(i). Degree [L:K] measures the extension as a vector-space dimension; algebraic vs transcendental splits the elements.",
     "detail": "A field extension L/K is one field sitting inside another; its degree [L:K] is the dimension of L as a K-vector space — field theory annexed by linear algebra. The tower law [M:K] = [M:L][L:K] multiplies degrees up a tower. An element α is algebraic over K when it satisfies a polynomial with K-coefficients; its minimal polynomial is the unique monic irreducible one, and K(α) ≅ K[x]/(minimal polynomial) has degree equal to that polynomial's degree. Elements like π satisfy no such polynomial: transcendental.\n\nThe degrees are computable and they decide ancient questions: [ℚ(√2):ℚ] = 2 (minimal polynomial x²−2), [ℚ(∛2):ℚ] = 3 (x³−2, irreducible by Eisenstein at 2). Every compass-and-straightedge construction builds coordinates through quadratic steps, so any constructible number lies in a tower of degree 2ⁿ over ℚ. But doubling the cube demands ∛2, of degree 3 — and 3 divides no power of 2. Two millennia of attempts, closed by an arithmetic of dimensions.\n\nDegree bookkeeping is the skeleton all of Galois theory hangs on: splitting fields, the correspondence, solvability — each argument is ultimately a count of dimensions in a tower. The same machinery classifies finite fields and, pushed further, organizes algebraic number theory: a number field is nothing but a finite extension of ℚ studied arithmetically."
    },
    {
     "label": "Splitting fields",
     "def": "The smallest extension where a polynomial fully factors into linear pieces — unique up to isomorphism, and the natural stage on which its Galois group acts.",
     "detail": "The splitting field of a polynomial f over K is the smallest extension where f factors completely into linear pieces — adjoin all the roots, nothing more. It exists (adjoin roots one irreducible factor at a time) and is unique up to isomorphism over K, which is what makes \"the\" Galois group of a polynomial well-defined. Extensions that are splitting fields are exactly the normal ones: whenever an irreducible polynomial has one root there, it has all of them.\n\nx³ − 2 over ℚ is the instructive case. Adjoining the real cube root gives ℚ(∛2), degree 3 — but the other two roots are complex, so x³−2 does NOT split there: ℚ(∛2)/ℚ is not normal. The genuine splitting field is ℚ(∛2, ω) with ω a primitive cube root of unity; by the tower law its degree is 3 · 2 = 6, and its six automorphisms permute the three roots as the full symmetric group S₃.\n\nSplitting fields are the stage on which Galois groups act — automorphisms can only shuffle roots of the same irreducible, so one needs all the roots present before symmetry can be total. Their uniqueness theorem is also the engine behind the classification of finite fields: 𝔽_{pⁿ} is THE splitting field of x^{pⁿ} − x, whence existence and uniqueness in one stroke."
    },
    {
     "label": "Galois correspondence",
     "def": "A perfect order-reversing dictionary: intermediate fields ↔ subgroups of the Galois group. Symmetry of the roots is translated into the subgroup lattice, where it can be computed.",
     "detail": "For a finite Galois extension L/K (normal and separable), the Galois group Gal(L/K) is the group of automorphisms of L fixing K, and its order equals [L:K]. The fundamental theorem is a perfect duality: subgroups of Gal(L/K) correspond to intermediate fields K ⊆ F ⊆ L, by H ↦ its fixed field and F ↦ the subgroup fixing it. The correspondence reverses inclusions, converts index to degree, and matches normal subgroups exactly with the intermediate fields normal over K — whose Galois groups are the quotients.\n\nDraw it once and it's yours forever: L = ℚ(√2, √3) over ℚ has group ℤ/2 × ℤ/2 (four automorphisms: flip √2, flip √3, independently). The three subgroups of order 2 have fixed fields ℚ(√3), ℚ(√2), and ℚ(√6) — that last one easy to miss without the theorem: the automorphism flipping BOTH square roots fixes their product. Two four-element lattices, one flipped, matching node for node.\n\nThis is the map's archetypal gold bridge: a lossless dictionary between two kinds of structure, letting field problems be solved by finite group theory (solvability, constructibility, cyclotomy) and group problems be realized in fields. Its pattern repeats across mathematics — covering spaces/subgroups of π₁ in topology, and Grothendieck's version unifying both — and its infinite-degree limit (absolute Galois groups) is the central object of modern number theory."
    },
    {
     "label": "Solvability by radicals",
     "def": "An equation is solvable by nested roots exactly when its Galois group is solvable. The symmetric group S₅ is not — so the general quintic has no radical formula (Abel–Ruffini, explained).",
     "detail": "\"Solvable by radicals\" means: the roots are reachable from the coefficients by field operations and n-th roots — a tower of radical extensions. Galois's theorem converts this to group theory: a polynomial is solvable by radicals iff its Galois group is a solvable group (a chain of normal subgroups with abelian quotients; each abelian layer is where one radical gets adjoined, cyclotomy handling the details). Degrees 2, 3, 4 have formulas because S₂, S₃, S₄ are solvable — S₄'s chain runs through A₄ and the Klein four-group.\n\nFor degree 5, exhibit one bad polynomial: x⁵ − 4x + 2. Eisenstein at 2 gives irreducibility, so 5 divides the group's order and a 5-cycle is present. A sketch of the graph shows exactly three real roots, so complex conjugation acts as a transposition. A subgroup of S₅ containing a 5-cycle and a transposition is all of S₅ — and S₅ is not solvable, because its only proper normal subgroup A₅ is simple and nonabelian. No radical expression for these roots exists. Not \"none found\": none possible.\n\nThis is the result that ended a 350-year search (del Ferro through Lagrange) with a structural impossibility, and the method outlived the problem: it created group theory as the science of symmetry, and its philosophy — obstructions live in groups — recurs in topology's π₁, in differential Galois theory (why ∫e^{−x²} has no elementary antiderivative), and everywhere this map draws a gold edge into algebra."
    },
    {
     "label": "Finite fields",
     "def": "Exactly one field of each prime-power size 𝔽_{pⁿ}, with cyclic multiplicative group. The backbone of coding theory and cryptography.",
     "detail": "A finite field's order must be a prime power pⁿ (it's a vector space over its prime subfield 𝔽_p), and for each pⁿ there is exactly one field 𝔽_{pⁿ} up to isomorphism: the splitting field of x^{pⁿ} − x over 𝔽_p. Two structural gems: the multiplicative group 𝔽_q* is always cyclic, and the Galois theory is as clean as it gets — Gal(𝔽_{pⁿ}/𝔽_p) is cyclic of order n, generated by the Frobenius map x ↦ xᵖ (a homomorphism precisely because binomial coefficients C(p,k) vanish mod p: the \"freshman's dream\" is a theorem here).\n\nBuild the four-element field by hand: 𝔽₄ = 𝔽₂[x]/(x² + x + 1), elements {0, 1, α, α+1} with the rule α² = α + 1. Its multiplication table takes a minute: α·(α+1) = α²+α = 1, so α and α+1 are mutual inverses, and 𝔽₄* = {1, α, α²} is cyclic of order 3. Note 𝔽₄ is NOT ℤ/4 — the integers mod 4 have zero divisors (2·2 = 0) and are not a field at all.\n\nFinite fields are the most heavily deployed abstract algebra on Earth: Reed–Solomon codes (QR codes, CDs, deep-space telemetry) do linear algebra over 𝔽₂₅₆, AES arithmetic lives in 𝔽₂₈, elliptic-curve cryptography works over large prime fields, and in number theory 𝔽_p is where global problems are reduced (\"mod p\") — with Frobenius, via Weil and Deligne, growing into one of the deepest tools in mathematics."
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
     "def": "Formally inverting elements to 'zoom in' near a prime — the algebraic analogue of restricting to a neighborhood. Turns global rings into local ones with a single maximal ideal.",
     "detail": "Localization formally inverts a chosen multiplicative set S in a ring: S⁻¹R consists of fractions r/s with the usual arithmetic, universal among R-algebras where S becomes invertible. The two canonical choices: invert everything outside a prime ideal 𝔭 to get R_𝔭 — a local ring, meaning it has a unique maximal ideal — and invert powers of one element f to get R_f. Localization is exact (it preserves kernels and images), which makes it a safe, information-preserving zoom.\n\nℚ is ℤ localized at all nonzero integers. Localizing ℤ at the prime (5) instead keeps only 5 in focus: fractions with denominator coprime to 5, a local ring whose unique maximal ideal is generated by 5, and where every other prime has become invisible (invertible). Geometrically the same move zooms a variety to a point: localizing a coordinate ring at the maximal ideal of a point yields the germs of functions there — infinitesimal neighborhood as a ring.\n\nThe local-global philosophy this enables is commutative algebra's daily method: a module is zero iff all its localizations at primes are zero, and many properties (flatness, regularity) are checked prime by prime. On the geometric side of this map, localization is literally the structure of schemes — the stalks of the structure sheaf ARE the localizations R_𝔭 — and \"local ring at a point\" is where smoothness and singularity are diagnosed."
    },
    {
     "label": "Spec of a ring",
     "def": "The set of prime ideals, topologized (Zariski) so it becomes a geometric space. This is the object glued together to build schemes — the point where algebra becomes geometry.",
     "detail": "Spec R is the set of ALL prime ideals of R, topologized by declaring V(I) = {primes containing I} closed — the Zariski topology. Maximal ideals give the classical points; non-maximal primes are new: each irreducible closed subset acquires a generic point whose closure is the whole subset. The construction is functorial (a ring map pulls primes back), and equipping Spec R with its structure sheaf — built from localizations — makes it the local model from which all schemes are glued.\n\nSpec ℤ = {(0)} ∪ {(p) : p prime}: the primes 2, 3, 5, … as closed points strung along a line, plus a generic point (0) dense in everything — arithmetic drawn as a curve. Spec k[x] looks the same with irreducible polynomials as points. Spec k[x,y] shows the full hierarchy: closed points (a,b), a generic point for each irreducible curve f = 0, and one generic point for the plane — three tiers of \"point,\" each remembering a different scale of geometry.\n\nSpec is the single most consequential definition in modern algebraic geometry: it makes EVERY commutative ring a geometric object — nilpotents, number rings, and all — and reverses the classical direction: instead of starting with a space and taking its functions, start with the functions and manufacture the space. The Nullstellensatz becomes the statement that over ℂ the classical points suffice; over ℤ, the new points are where arithmetic geometry lives."
    },
    {
     "label": "Krull dimension",
     "def": "Length of the longest chain of nested primes — the algebraic definition of dimension, matching geometric intuition (a plane is 2, a curve is 1).",
     "detail": "The Krull dimension of a ring is the length of the longest chain of prime ideals 𝔭₀ ⊊ 𝔭₁ ⊊ ⋯ ⊊ 𝔭ₙ (counting steps, not primes). Since primes correspond to irreducible closed subsets of Spec, this is geometry's dimension done in pure algebra: point inside curve inside surface inside… The height of a single prime is the dimension of the chain below it, and for finitely generated algebras over a field, Noether normalization gives the reconciliation: Krull dimension equals transcendence degree of the function field.\n\ndim k[x₁,…,xₙ] = n, with the explicit chain (0) ⊂ (x₁) ⊂ (x₁,x₂) ⊂ ⋯ ⊂ (x₁,…,xₙ) — plane inside 3-space inside…, algebraically. And dim ℤ = 1: the only chains are (0) ⊂ (p). The integers are one-dimensional — a curve — which is not wordplay but load-bearing analogy: it is why number fields behave like curves over finite fields, the analogy driving the Weil conjectures and much of arithmetic geometry.\n\nDimension theory organizes commutative algebra's deepest layer: a local ring is regular when its maximal ideal needs exactly dim-many generators — the algebraic definition of a smooth point — and the gap between dimension and depth (Cohen–Macaulay theory) measures how far a singularity deviates from well-behaved. Krull's principal ideal theorem (one equation cuts dimension by at most one) is the rigorous form of geometric intuition's most basic count."
    },
    {
     "label": "Integral extensions",
     "def": "Elements satisfying monic polynomials over a subring — the 'algebraic integers' idea generalized. Underlies normalization and the going-up/going-down theorems.",
     "detail": "An element is integral over a subring R when it satisfies a MONIC polynomial with R-coefficients — algebraic with leading coefficient 1, which over rings is a genuinely stronger demand. The integral elements in an extension form a ring (the integral closure), and R is integrally closed if it equals its closure in its fraction field. The Cohen–Seidenberg going-up theorem makes integral extensions dimension-preserving: chains of primes lift, so finite integral extensions have equal Krull dimension.\n\nThe golden ratio exposes the subtlety: (1+√5)/2 looks like a fraction, but it satisfies x² − x − 1 = 0, monic over ℤ — integral. So ℤ[√5] is NOT integrally closed, and the true ring of integers of ℚ(√5) is ℤ[(1+√5)/2]. Getting this boundary right is why quadratic fields' arithmetic works: discriminants, factorization of primes, and class numbers all presuppose the honest, integrally closed ring.\n\nIntegrality is how \"ring of integers\" is defined in every number field — the number-theoretic backbone of this map's bridge to arithmetic — and geometrically the same operation is normalization: replacing a variety's coordinate ring by its integral closure resolves mild singularities (the cusp y² = x³ normalizes to a line via t ↦ (t², t³)). One definition, two faces: arithmetic's correct integers, geometry's first desingularization."
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
     "def": "Groups that are also smooth manifolds, so symmetry becomes continuous and differentiable — rotations SO(3), unitaries U(n), the Lorentz group. Continuous symmetry is their entire subject.",
     "detail": "A Lie group is a smooth manifold that is also a group, with smooth multiplication and inversion — continuous symmetry as a single geometric object. The working examples are matrix groups: GLₙ (invertible matrices), SLₙ (determinant 1), the orthogonal and special orthogonal groups O(n), SO(n) (isometries), the unitary groups U(n), SU(n), and the symplectic groups. Compactness (SO(n), SU(n)) versus non-compactness (SLₙ(ℝ), the Lorentz group) is the first structural divide; a deep rigidity theorem says continuous homomorphisms between Lie groups are automatically smooth.\n\nSO(3), the rotations of space, shows how much geometry a group can carry: it is a 3-dimensional manifold diffeomorphic to real projective space ℝP³, hence π₁(SO(3)) = ℤ/2 — a loop of rotations by 2π cannot be contracted, but its double can. The belt trick performs this fact with a physical belt, and the double cover SU(2) → SO(3) realizes it algebraically: this is exactly why quantum spin-½ exists — electrons transform under SU(2), seeing the \"twice around\" that classical rotations forget.\n\nLie groups are the symmetry objects of geometry and physics simultaneously: isometry groups of the model geometries (Erlangen, on this map's geometry side), gauge groups of the Standard Model (U(1) × SU(2) × SU(3)), and the setting for harmonic analysis beyond Fourier. Their global topology — as the SO(3) example shows — is not decoration; it is physically measurable."
    },
    {
     "label": "Lie algebras & exponential map",
     "def": "The tangent space at the identity, equipped with a bracket [X,Y]; exp maps it back to the group. Linearizing a hard nonlinear group into tractable algebra.",
     "detail": "The tangent space at a Lie group's identity inherits an algebraic structure: the Lie algebra 𝔤, with the bracket [X,Y] (for matrix groups, literally XY − YX) — antisymmetric, satisfying the Jacobi identity, and measuring the group's infinitesimal non-commutativity. The exponential map exp: 𝔤 → G (the matrix series I + X + X²/2! + ⋯) rebuilds group elements from infinitesimal ones; the Baker–Campbell–Hausdorff formula expresses exp X · exp Y entirely in brackets, and Lie's theorems make the correspondence precise: connected, simply connected Lie groups match Lie algebras perfectly.\n\nCompute one exponential and the theory becomes concrete: the generator of z-rotations is the matrix X with X e₁ = e₂, X e₂ = −e₁ (zeros elsewhere). Its powers cycle with period 4, and summing the series groups the even powers into cosine and the odd into sine: exp(θX) is exactly the rotation matrix by angle θ. The bracket relations of the three rotation generators reproduce the cross product — 𝔰𝔬(3) ≅ (ℝ³, ×) — which physicists know as the angular momentum commutation relations.\n\nLinearization is total here in a way it never is for general manifolds: the algebra knows the group locally, so classification of Lie groups reduces to classification of Lie algebras — finite-dimensional linear algebra plus a bracket — which root systems then finish. This is the paradigm of studying a nonlinear object through its infinitesimal shadow, and quantum mechanics is written in it: observables form Lie algebras, and exp carries them to the symmetries they generate."
    },
    {
     "label": "Root systems",
     "def": "Highly symmetric vector configurations encoding a semisimple Lie algebra's structure. Their rigid geometry is what makes complete classification possible.",
     "detail": "Inside a semisimple Lie algebra, fix a Cartan subalgebra 𝔥 (maximal commuting, diagonalizably acting). The rest of the algebra splits into simultaneous eigenspaces under 𝔥's adjoint action; the nonzero eigenvalue functionals α ∈ 𝔥* are the roots. They obey shockingly rigid axioms — finitely many, spanning, closed under the reflection each defines, with integrality conditions on pairings — which define an abstract root system independent of any algebra. The reflections generate the Weyl group; choosing positive roots isolates the simple ones, a basis from which all others grow.\n\n𝔰𝔩₂ is the atom: one pair of roots ±α, corresponding to the raising and lowering matrices e, f with [e,f] = h — the ladder-operator algebra. 𝔰𝔩₃ shows the geometry: its six roots form a perfect hexagon (the A₂ system), and the Weyl group is S₃, the hexagon's reflection symmetries. Every root of every system spans a copy of 𝔰𝔩₂ — the whole classification is 𝔰𝔩₂'s arithmetic propagated through Euclidean reflection geometry.\n\nRoot systems execute one of mathematics' great compressions: infinite-dimensional classification problems (which simple Lie algebras exist?) reduced to finite configurations of vectors and integers. The Weyl group's combinatorics computes characters and dimensions; affine and Kac–Moody extensions power conformal field theory; and the same reflection-group axiomatics (Coxeter groups) reappear in polytopes, buildings, and singularity theory."
    },
    {
     "label": "Dynkin diagrams",
     "def": "A handful of small graphs (Aₙ,Bₙ,Cₙ,Dₙ,E₆,E₇,E₈,F₄,G₂) that classify every simple Lie algebra — one of mathematics' most surprising finite lists.",
     "detail": "Encode a root system's simple roots as a graph: one node per simple root, edges (single, double, triple, with arrows for length differences) recording the angle between them. The classification theorem then reads off every possible connected diagram: four infinite families Aₙ, Bₙ, Cₙ, Dₙ (the classical algebras 𝔰𝔩, 𝔰𝔬 odd, 𝔰𝔭, 𝔰𝔬 even) and exactly five exceptions — G₂, F₄, E₆, E₇, E₈. That short list IS the complete classification of simple complex Lie algebras: all possible atoms of continuous symmetry, determined by graphs drawable in seconds.\n\nE₈ is the showpiece: eight nodes, an algebra of dimension 248, a root system of 240 vectors packing ℝ⁸ (the densest lattice sphere packing in dimension 8, proved optimal in 2016). Coincidences of small diagrams are theorems of linear algebra: A₃ = D₃ forces 𝔰𝔩₄ ≅ 𝔰𝔬₆, and B₂ = C₂ forces 𝔰𝔬₅ ≅ 𝔰𝔭₄ — isomorphisms you would never guess from the matrix definitions.\n\nThe stunning afterlife is the ADE pattern: the simply-laced diagrams Aₙ, Dₙ, E₆, E₇, E₈ classify, verbatim, the finite subgroups of SU(2) (McKay correspondence), the simple surface singularities, quivers of finite representation type (Gabriel's theorem), and more. The same five graphs surfacing across algebra, geometry, and mathematical physics is one of the deepest unexplained-then-explained recurrences in mathematics — a pattern this map's bridges keep touching."
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
     "def": "Realizing abstract group elements as matrices acting on a vector space — turning symmetry into linear algebra where it can be computed. Maschke: over ℂ, representations decompose into irreducibles.",
     "detail": "A representation of a group G is a homomorphism G → GL(V): the abstract group realized as actual linear transformations of a vector space. Subrepresentations are invariant subspaces; a representation with none (except 0 and V) is irreducible. Over ℂ, for finite groups, Maschke's theorem gives complete reducibility — every representation is a direct sum of irreducibles — and Schur's lemma pins the irreducibles rigid: the only maps commuting with an irreducible action are scalars. The group algebra ℂ[G] packages the whole theory: representations of G are exactly modules over it.\n\nS₃ from scratch: the trivial representation (everything ↦ 1), the sign representation (±1 by parity), and the standard representation — S₃ permutes the coordinates of ℂ³, and the plane x+y+z = 0 is invariant, 2-dimensional, irreducible. That's all of them, and the completeness check is the sum-of-squares formula: 1² + 1² + 2² = 6 = |S₃|. Three irreducibles, three conjugacy classes — the numerology is a theorem.\n\nRepresentation theory is how group theory gets applied: an abstract symmetry becomes matrices, eigenvalues, and invariant subspaces. Quantum mechanics speaks it natively (states transform in representations of the symmetry group; degeneracies ARE irreducible dimensions), Fourier analysis is the representation theory of the circle, and this map's bridges into number theory (automorphic forms) and geometry (homogeneous spaces) both run through it."
    },
    {
     "label": "Characters",
     "def": "The trace of each representing matrix. Characters are constant on conjugacy classes and orthogonal to one another — a whole representation is recoverable from these few numbers.",
     "detail": "The character of a representation is the trace function χ(g) = tr ρ(g) — one number per group element, constant on conjugacy classes. Characters are astonishingly complete: over ℂ, two representations are isomorphic iff their characters are equal, so an entire matrix-valued object compresses to a class function with no loss. The orthogonality relations make the irreducible characters an orthonormal basis of class functions; consequently the number of irreducibles equals the number of conjugacy classes, and everything is organized in a finite grid — the character table.\n\nBuild S₃'s table by hand in five minutes. Classes: identity, the three transpositions, the two 3-cycles. Trivial row: (1, 1, 1). Sign row: (1, −1, 1). The standard representation's row starts at its dimension, 2; orthogonality with the first two rows (weighted by class sizes 1, 3, 2) forces (2, 0, −1). Check: 1·2² + 3·0² + 2·(−1)² = 6 = |S₃|. The table is complete — and it just computed, e.g., that a transposition acting on the plane x+y+z=0 has trace 0 (eigenvalues +1, −1: a reflection), without writing a single matrix.\n\nCharacter tables are among algebra's most concentrated artifacts: Burnside's p^a q^b theorem (groups of such order are solvable) was proved by character theory in 1904, decades before any purely group-theoretic proof existed. Frobenius invented the whole theory to answer a question of Dedekind's about factoring group determinants — and a century later, McKay and Conway noticed 196883 + 1 = 196884 in the Monster's character table matching the j-function's coefficient: moonshine begins in a character table."
    },
    {
     "label": "Highest weight theory",
     "def": "Irreducible representations of a semisimple Lie algebra are catalogued by a single dominant 'highest weight'. The organizing principle behind particle multiplets in physics.",
     "detail": "For a semisimple Lie algebra, representations diagonalize under the Cartan subalgebra: a representation splits into weight spaces, the simultaneous eigenvalues (weights) living in the same space as the roots. In a finite-dimensional irreducible representation, a unique highest weight vector is annihilated by all raising operators, and the theorem of the highest weight completes the classification: irreducibles correspond exactly to dominant integral weights. The Weyl character formula then computes every character, and its corollary the dimension formula makes representation sizes a polynomial evaluation.\n\n𝔰𝔩₂ in full: e raises, f lowers, h measures. Starting from a highest weight vector with h-eigenvalue n and applying f repeatedly produces the ladder n, n−2, …, −n before terminating — exactly one irreducible of each dimension n+1. Physics reads the same ladder as spin: multiplets of dimensions 1, 2, 3, 4, … are spin 0, ½, 1, …; the odd dimensions 1, 3, 5, 7 are chemistry's s, p, d, f orbital multiplets. Every semisimple representation theory is this ladder run once per root.\n\nHighest weight theory is one of mathematics' complete classifications, and its reach is enormous: quark multiplets are 𝔰𝔲(3) weight diagrams (Gell-Mann predicted the Ω⁻ particle from a gap in one), Borel–Weil–Bott realizes every irreducible geometrically in cohomology of line bundles on flag varieties, and its infinite-dimensional extensions (Verma modules, category O, crystal bases) are where modern representation theory — including the geometric Langlands program — actually lives."
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
     "def": "Sequences of maps with consecutive composites zero (∂²=0). Homology measures how far 'kernel exceeds image' — the failure of exactness, made into an invariant.",
     "detail": "A chain complex is a sequence of modules connected by maps dₙ with the single axiom d² = 0 — every boundary has no boundary. That inequality im d ⊆ ker d makes homology Hₙ = ker dₙ / im dₙ₊₁ well-defined: it measures the exactness gap, the cycles that are not boundaries. Chain maps (commuting with d) induce maps on homology; chain homotopies are the algebraic shadow of topological homotopies, and homotopic chain maps induce THE SAME map on homology — the invariance principle in its purest form.\n\nSmallest nontrivial example: 0 → ℤ →^{×2} ℤ → 0. Kernel of ×2 is 0, so H₁ = 0; H₀ = ℤ/im(×2) = ℤ/2. Two integers and one map already produce torsion. One size up, the simplicial chain complex of a hollow triangle (three vertices, three edges) has d encoded by a 3×3 incidence matrix, and computing kernels and images by hand yields H₀ = ℤ, H₁ = ℤ — the circle's homology, extracted from linear algebra.\n\nThe axiom d² = 0 abstracts \"the boundary of a boundary is empty,\" and the abstraction paid for itself many times over: singular homology, de Rham cohomology (d² = 0 for the exterior derivative), group cohomology, and Hochschild homology are all chain complexes first. The complex, not its homology, is now understood as the fundamental object — the viewpoint (derived categories) that reorganized modern algebra and geometry."
    },
    {
     "label": "Exact sequences",
     "def": "Chains where image exactly equals kernel at each step. Short exact sequences 0→A→B→C→0 encode 'B is built from A and C', and the snake lemma tracks the bookkeeping.",
     "detail": "A sequence of maps is exact at a spot when image equals kernel — no gap, no slack. Short exact sequences 0 → A → B → C → 0 say precisely: A is a submodule of B with quotient C; the module B is an extension of C by A. Splitting (B ≅ A ⊕ C) is the trivial case, and its failure is measurable. The machinery theorems — snake lemma, five lemma, long exact sequence of a short exact sequence of complexes — are the field's power tools, all proved by diagram chasing: element-by-element pursuit around a commutative grid.\n\nTwo ℤ-examples calibrate splitness. 0 → ℤ →^{×2} ℤ → ℤ/2 → 0 does NOT split: ℤ contains no copy of ℤ/2, so the middle cannot be ℤ ⊕ ℤ/2 — even though the two ends are the same in both cases. By contrast 0 → ℤ/2 → ℤ/2 ⊕ ℤ/3 → ℤ/3 → 0 splits outright (coprime orders leave no room for twisting). Which extensions exist and which split is exactly what Ext¹ computes, one field over.\n\nExact sequences are the grammar in which modern algebra states relationships: kernels and cokernels of interesting maps chain into long exact sequences, and reading information off them — \"this group is trapped between two zeros, hence vanishes\" — is the daily reasoning style of algebraic topology, algebraic geometry, and number theory alike. The snake lemma even has a movie scene (It's My Turn, 1980); more importantly it manufactures the connecting homomorphism on which every long exact sequence runs."
    },
    {
     "label": "Ext & Tor",
     "def": "Derived functors measuring how badly Hom and ⊗ fail to be exact. Ext classifies extensions; Tor detects torsion — abstract tools with concrete payoffs across algebra and topology.",
     "detail": "Hom and ⊗ are only half-exact: applying Hom(−, N) or − ⊗ N to a short exact sequence loses exactness at one end. Ext and Tor are the systematic repair — the derived functors: resolve a module by projectives (or injectives), apply the functor to the resolution, take homology. The result is independent of the chosen resolution, which is the small miracle making everything well-defined. Extⁿ continues Hom; Torₙ continues ⊗; both vanish for n ≥ 1 on nice (projective/flat) modules, so they measure precisely the failure of niceness.\n\nExt¹_ℤ(ℤ/2, ℤ): resolve 0 → ℤ →^{×2} ℤ → ℤ/2 → 0, apply Hom(−, ℤ), get ℤ →^{×2} ℤ, whose cokernel is ℤ/2. And the answer means something: Ext¹ classifies extensions, and there are indeed exactly two extensions of ℤ/2 by ℤ — the split ℤ ⊕ ℤ/2 and the nonsplit 0 → ℤ →^{×2} ℤ → ℤ/2 → 0 itself. Similarly Tor₁^ℤ(ℤ/2, ℤ/2) = ℤ/2, detecting torsion exactly as its name promises.\n\nExt and Tor are the universal obstruction calculators: the universal coefficient theorems express cohomology in terms of homology with an Ext correction term; group cohomology (classifying group extensions, crossed homomorphisms) is Ext over the group ring; sheaf cohomology is Ext for sheaves. Whenever mathematics asks \"does this local construction glue?\" or \"how many ways can this be assembled?\", the answer is stated in Ext."
    },
    {
     "label": "Derived functors",
     "def": "A systematic machine turning a functor into a whole sequence of them via resolutions, capturing information the original functor discards. The engine of modern homological methods.",
     "detail": "The derived-functor recipe generalizes Ext and Tor to any additive functor that is only half-exact: resolve the object (projectively or injectively as the variance demands), apply the functor to the whole resolution, take homology. Independence of resolution makes the output canonical; the long exact sequences connecting the derived functors of a short exact sequence make them computable; and the axioms of a δ-functor (Grothendieck's Tôhoku paper, 1957) characterize the construction uniquely. The modern formulation absorbs all of it into derived categories, where one works with complexes up to quasi-isomorphism and the functor is derived once and for all.\n\nThe recipe manufactures cohomology theories to order. Group cohomology: Hⁿ(G, M) = Extⁿ over the group ring ℤG; in degree 1 it is crossed homomorphisms modulo principal ones, and the classical Hilbert's Theorem 90 — H¹(Gal(L/K), L*) = 1 — becomes a two-line cohomological statement whose degree-2 sibling classifies central simple algebras (the Brauer group). Sheaf cohomology: the derived functors of global sections, which is exactly the machinery computing the log z obstruction and line-bundle classifications on this map's geometry side.\n\nThis is the great unification move of mid-century algebra: Grothendieck's insight that topology's cohomology, Galois theory's H¹ and H², and module theory's Ext are ONE construction applied to different inputs. Derived categories, its mature form, are now the shared language of algebraic geometry (coherent duality, D-modules), representation theory (category O, geometric Langlands), and mathematical physics (mirror symmetry equates two derived categories) — the deepest infrastructure this map's algebra region exports."
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
     "def": "Filling the gaps in ℚ, via Dedekind cuts or Cauchy sequences. Completeness — every bounded set has a least upper bound — is the single axiom that separates ℝ from ℚ and powers all of analysis.",
     "detail": "The real numbers are what you get by plugging the holes in ℚ. Two standard constructions do it: Dedekind cuts (a real is a downward-closed set of rationals with no greatest element) and Cauchy completion (a real is an equivalence class of Cauchy sequences of rationals). Either way the payoff is a single axiom the rationals lack — completeness: every non-empty set bounded above has a least upper bound.\n\nThe hole is concrete. The set {q ∈ ℚ : q < 0 or q² < 2} is bounded above in ℚ, but has no least rational upper bound — squeeze from above and you approach √2, which is not rational (if √2 = a/b in lowest terms, a² = 2b² makes a even, then b even, contradiction). In ℝ that same set has a supremum, and it is √2. Completeness manufactures exactly the missing limit.\n\nCompleteness is the axiom the whole subject rests on: the Bolzano–Weierstrass theorem, the intermediate and extreme value theorems, convergence of monotone bounded sequences, and the fact that Cauchy sequences converge all fail over ℚ and hold over ℝ for this one reason. Construct ℝ honestly and every later limit is earned rather than assumed."
    },
    {
     "label": "Sequences & series",
     "def": "Convergence made precise: tails eventually trapped in every ε-window. Convergence tests decide infinite sums; absolute vs conditional convergence is where intuition first breaks.",
     "detail": "A sequence converges when its terms cluster arbitrarily tightly around a limit; the internal test for this, needing no prior knowledge of the limit, is the Cauchy criterion (terms eventually all within ε of each other), which characterizes convergence exactly because ℝ is complete. A series Σaₙ converges when its partial sums do, and a battery of tests (comparison, ratio, root, integral, alternating) decides the common cases.\n\nTwo series make the subtlety vivid. The harmonic series Σ1/n diverges — group terms as 1/2 + (1/3+1/4) + (1/5+…+1/8) + …, each block ≥ 1/2, so the sum grows without bound — while Σ1/n² converges (to π²/6, Euler). Conditional convergence is stranger still: the alternating harmonic series Σ(−1)ⁿ⁺¹/n converges to ln 2, but by Riemann's rearrangement theorem its terms can be reordered to sum to any real number at all, because the positive and negative parts each diverge.\n\nSequences and series are the atoms of analysis: continuity, derivatives, and integrals are all limits, power series define the elementary and special functions, and the distinction between absolute and conditional convergence governs when you may reorder, regroup, or integrate term by term — the licences the rest of the subject quietly depends on."
    },
    {
     "label": "ε–δ continuity",
     "def": "'f is continuous' means: force outputs within ε by confining inputs within δ. The definition that finally made 'no sudden jumps' rigorous after two centuries of vagueness.",
     "detail": "Continuity of f at a point means: for every tolerance ε on the output there is a tolerance δ on the input forcing |f(x) − f(a)| < ε whenever |x − a| < δ. The quantifier order (∀ε ∃δ) is the whole content — δ is allowed to depend on both ε and the point a. Demanding a single δ that works uniformly across all points is the stronger notion of uniform continuity, and the gap between them is one of the subject's recurring themes.\n\nThe difference is checkable. f(x) = x² is continuous everywhere, and on a bounded interval uniformly so; but f(x) = 1/x on (0,1) is continuous at every point yet not uniformly continuous — near 0 the graph steepens without limit, so no fixed δ controls the output tolerance everywhere. The Heine–Cantor theorem rescues the situation on compact sets: continuous on a closed bounded interval implies uniformly continuous, one of compactness's quiet payoffs.\n\nThe ε–δ formulation, Weierstrass's rigorization of Cauchy's intuition, is what made analysis rigorous, and it has a purely topological restatement: f is continuous iff preimages of open sets are open. That reformulation is the bridge to the map's topology region — the same definition powering point-set topology, where \"nearness\" is axiomatized without any metric at all."
    },
    {
     "label": "Differentiation",
     "def": "The derivative as the best linear approximation, i.e. a limit of slopes. The Mean Value Theorem converts this local data into global control, and Taylor's theorem into polynomial approximation.",
     "detail": "The derivative f′(a) is the limit of difference quotients (f(a+h) − f(a))/h — the best linear approximation to f near a, geometrically the slope of the tangent line. The mean value theorem is the workhorse that converts local derivative information into global statements: if f is continuous on [a,b] and differentiable inside, some interior c has f′(c) equal to the average slope (f(b) − f(a))/(b − a).\n\nApply it to f(x) = x³ on [0,1]: the average slope is 1, so the MVT guarantees a point where 3c² = 1, namely c = 1/√3 ≈ 0.577, which indeed lies in (0,1). The theorem also has teeth in reverse — a function with everywhere-zero derivative must be constant (MVT with equal endpoints) — and it warns against naïve intuition: x²sin(1/x) is differentiable everywhere yet its derivative is discontinuous at 0, so \"differentiable\" does not imply \"continuously differentiable.\"\n\nDifferentiation is the engine of local analysis and optimization: critical points (f′ = 0) locate extrema, Taylor's theorem expands functions into polynomial approximations with controlled error, and the entire apparatus generalizes — to gradients and Jacobians in several variables, to the exterior derivative on manifolds, and to the derivative maps that linearize the map's geometry region."
    },
    {
     "label": "Riemann integration",
     "def": "Area via shrinking rectangles. It works beautifully for continuous functions but fails to commute with limits — the defect that forces the invention of the Lebesgue integral.",
     "detail": "The Riemann integral approximates the area under a curve by partitioning the domain, forming upper and lower sums from the function's sup and inf on each piece, and taking the limit as the partition refines; f is integrable when upper and lower sums squeeze to a common value. The fundamental theorem of calculus then ties integration to differentiation: ∫ₐˣ f is an antiderivative of f, and ∫ₐᵇ F′ = F(b) − F(a).\n\nCompute ∫₀¹ x dx directly from the definition: partition [0,1] into n equal pieces, the right-endpoint sum is (1/n)·Σ(k/n) = (1/n²)·n(n+1)/2 = (n+1)/(2n) → 1/2. The definition also exposes its own limits: the Dirichlet function (1 on rationals, 0 on irrationals) has lower sum 0 and upper sum 1 on every partition, so it is not Riemann integrable — a tame-looking function the theory simply cannot handle.\n\nThat failure is productive: it is exactly the motivation for the Lebesgue integral one field over, which integrates by slicing the range rather than the domain and handles the Dirichlet function (answer 0) with ease. Meanwhile the fundamental theorem remains the computational heart of calculus, converting the geometric problem of area into the algebraic search for antiderivatives."
    },
    {
     "label": "Uniform convergence",
     "def": "Convergence at one rate everywhere at once, strong enough to preserve continuity and permit swapping limits with integrals — the failure mode behind many classical 'paradoxes'.",
     "detail": "A sequence of functions fₙ converges pointwise if fₙ(x) → f(x) at each x separately, and uniformly if the worst-case error supₓ|fₙ(x) − f(x)| → 0 — a single rate controlling all points at once. The distinction decides whether limits interchange with continuity, integration, and differentiation: uniform limits of continuous functions are continuous, and one may integrate uniformly convergent series term by term.\n\nPointwise is not enough, as fₙ(x) = xⁿ on [0,1] shows: the pointwise limit is 0 for x < 1 and 1 at x = 1 — a discontinuous limit of continuous functions, because the convergence is not uniform (near x = 1 the functions lag arbitrarily). The supremum of |xⁿ − limit| stays at 1 for every n, flagging the failure exactly. The Weierstrass M-test provides the standard sufficient condition for a series to converge uniformly.\n\nUniform convergence is the licence to swap limit operations, and its absence is behind many analysis \"paradoxes.\" It underlies the completeness of spaces of continuous functions under the sup norm (the gateway to functional analysis), the Weierstrass approximation theorem (polynomials are uniformly dense among continuous functions), and the rigorous manipulation of power and Fourier series."
    },
    {
     "label": "Metric spaces",
     "def": "Sets with an abstract distance obeying the triangle inequality. Completeness, compactness, and the Baire category theorem all live at this level, before any calculus.",
     "detail": "A metric space abstracts distance: a set with a function d(x,y) that is positive, symmetric, and satisfies the triangle inequality. This one structure carries all of analysis's limit notions — open balls, convergence, continuity, completeness (Cauchy sequences converge), compactness — with no linear or Euclidean structure assumed. ℝⁿ, spaces of functions, and discrete graphs are all metric spaces on equal footing.\n\nThe Banach fixed-point theorem shows how much leverage the axioms give: a contraction (a map shrinking all distances by a fixed factor k < 1) on a complete metric space has a unique fixed point, reached by iterating from any start. This single theorem proves existence and uniqueness for differential equations (Picard iteration), the inverse function theorem, and the convergence of countless numerical schemes — a fixed point found by nothing more than \"apply the map repeatedly.\"\n\nMetric spaces are analysis's common language, and stripping distance down to its axioms reveals which theorems need which hypotheses: completeness for fixed points and Baire category, compactness for extrema and uniform continuity. Loosening the axioms further — keeping only which sets are open — is the passage to topology, the map's neighboring foundation for \"nearness.\""
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
     "def": "A σ-algebra is the family of 'measurable' sets, closed under countable operations; a measure assigns them consistent sizes. The rigorous replacement for naive length/area/volume.",
     "detail": "Measure theory assigns sizes to sets consistently. A σ-algebra is a collection of \"measurable\" subsets closed under complement and countable unions; a measure μ assigns each a size in [0,∞], countably additive over disjoint pieces. Lebesgue measure on ℝ is the canonical example, extending length so that intervals get their length and the construction is translation-invariant and complete.\n\nThe theory is subtle enough to have genuine surprises. The Cantor set — remove middle thirds forever — is uncountable yet has Lebesgue measure 0 (the removed intervals total length 1), so \"large in cardinality\" and \"large in measure\" are independent. Worse, not every set is measurable: using the axiom of choice, Vitali built a subset of [0,1] whose translates partition the line into countably many congruent copies, which cannot consistently be assigned any translation-invariant measure. Measurability is a real restriction, not a technicality.\n\nσ-algebras and measures are the rigorous foundation for integration and probability alike: a probability space is exactly a measure space of total mass 1 (Kolmogorov's axioms, the map's bridge from probability to analysis), and the measurable-set framework is what lets analysis handle limits of sets and functions without the pathologies naïve area would invite."
    },
    {
     "label": "Lebesgue integral",
     "def": "Integrate by slicing the range, not the domain — summing over level sets. It handles far more functions than Riemann and, crucially, plays well with limits.",
     "detail": "The Lebesgue integral integrates by slicing the range, not the domain: approximate a non-negative measurable function from below by simple functions (finite combinations of indicators of measurable sets), integrate those by \"value times measure of the set where it is attained,\" and take the supremum. General functions split into positive and negative parts. The reward is a class of integrable functions far wider than Riemann's, and convergence theorems Riemann cannot support.\n\nThe Dirichlet function is the clean test: 1 on the rationals, 0 elsewhere. Riemann cannot integrate it, but for Lebesgue it equals 1 only on ℚ, a set of measure zero, so its integral over [0,1] is simply 0 — the \"size\" of where it is nonzero. Every Riemann-integrable function is Lebesgue-integrable with the same value, so nothing is lost and much is gained.\n\nThe Lebesgue integral is the integral of modern analysis and probability: it makes the Lᵖ spaces complete (Riesz–Fischer), it is the expectation of a random variable, and its flexible convergence theorems (next topic) are what let analysts pass limits through integrals routinely — the manipulation on which Fourier analysis, PDE, and probability all depend."
    },
    {
     "label": "Convergence theorems",
     "def": "Monotone convergence, Fatou, dominated convergence: the licences to exchange limit and integral. The everyday power tools measure theory exists to provide.",
     "detail": "The reason to build the Lebesgue integral is that limits and integrals interchange under mild hypotheses. The monotone convergence theorem: for an increasing sequence of non-negative measurable functions, ∫lim = lim∫. Fatou's lemma: ∫liminf ≤ liminf∫ always. The dominated convergence theorem (DCT): if fₙ → f pointwise and |fₙ| ≤ g for one integrable g, then ∫fₙ → ∫f. These are the daily tools of analysis.\n\nDomination is not optional, as the \"escaping mass\" example shows: fₙ = n·1_{(0,1/n)} converges to 0 at every point, yet ∫fₙ = 1 for all n, so lim∫ = 1 ≠ 0 = ∫lim. No integrable function dominates the whole sequence (the smallest candidate is 1/x, not integrable near 0), and DCT correctly does not apply — the theorem's hypothesis is exactly what rules this out.\n\nThese theorems are the practical superiority of Lebesgue over Riemann. They justify differentiating under the integral sign, computing limits of expectations, and manipulating Fourier integrals; in probability they become statements about limits of random variables, underpinning the law of large numbers and the machinery of convergence in distribution."
    },
    {
     "label": "Lᵖ spaces",
     "def": "Spaces of functions with integrable p-th power, complete under their norms (Hölder & Minkowski inequalities). L² is a Hilbert space — the natural home of Fourier analysis and quantum states.",
     "detail": "For 1 ≤ p ≤ ∞, Lᵖ collects measurable functions whose p-th power is integrable, normed by ‖f‖ₚ = (∫|f|ᵖ)^{1/p} (and the essential sup for p = ∞). Hölder's inequality (∫|fg| ≤ ‖f‖ₚ‖g‖_q with 1/p + 1/q = 1) and Minkowski's inequality (the triangle inequality for the norm) make these genuine normed spaces, and the Riesz–Fischer theorem makes them complete — Banach spaces, with L² additionally a Hilbert space under ⟨f,g⟩ = ∫fḡ.\n\nThe parameter p matters and the inclusions can go either way. On a finite measure space like [0,1], Hölder gives L^q ⊂ L^p for p < q (higher powers are the stronger constraint), so L² ⊂ L¹ there; but on all of ℝ neither inclusion holds — 1/√x·1_{(0,1)} sits in L¹ but not L², while 1/x·1_{(1,∞)} does the reverse. The example pins down exactly how integrability at small and large scales trade off.\n\nLᵖ spaces are the arena of modern analysis: L² is the state space of quantum mechanics and the home of Fourier analysis (Plancherel makes the Fourier transform a unitary map L² → L²), Sobolev spaces refine them with derivatives for PDE, and duality (Lᵖ)* = L^q is a foundational example in functional analysis. Completeness is what makes limits, and hence existence proofs, work in all of them."
    },
    {
     "label": "Product measures",
     "def": "Building measures on products and integrating iteratively (Fubini–Tonelli). The rigorous justification for swapping the order of a double integral.",
     "detail": "To integrate over a product space, one builds the product measure μ × ν on the product σ-algebra, characterized by giving a rectangle A × B the size μ(A)·ν(B). The Fubini and Tonelli theorems then justify computing a double integral as an iterated one: Tonelli for non-negative measurable functions (no integrability needed), Fubini for functions already known to be integrable, in which case the order of integration may be swapped freely.\n\nBoth the power and the caveat are checkable. Over a rectangle, ∫∫ xy dx dy factors into (∫x dx)(∫y dy), the iteration Tonelli licenses. But Fubini's integrability hypothesis is essential: on [0,1]² the function (x² − y²)/(x² + y²)² gives the two iterated integrals the values +π/4 and −π/4 — they disagree, because the function is not absolutely integrable, and neither iterated value equals a genuine double integral. Order matters exactly when domination fails.\n\nProduct measures are how analysis handles several variables and how probability encodes independence: a product measure is precisely the joint law of independent random variables, so Fubini becomes the statement that expectations factor. The construction iterates to infinite products, giving the measure spaces on which stochastic processes — Brownian motion and beyond — are built."
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
     "def": "Complex differentiability is far stronger than real: the Cauchy–Riemann equations force it, and it instantly implies infinite differentiability and analyticity. Rigidity is the theme.",
     "detail": "A function of a complex variable is holomorphic if it is complex-differentiable — the difference quotient has a limit independent of the direction of approach. Writing f = u + iv, that directional independence forces the Cauchy–Riemann equations uₓ = v_y and u_y = −vₓ. This is a far stronger demand than real differentiability, and its consequence is startling: holomorphic functions are automatically infinitely differentiable and equal to their own power series (analytic).\n\nThe equations discriminate instantly. f(z) = z² = (x² − y²) + i(2xy) satisfies Cauchy–Riemann (uₓ = 2x = v_y, u_y = −2y = −vₓ) and is holomorphic. But f(z) = z̄ = x − iy fails them (uₓ = 1 ≠ −1 = v_y), so complex conjugation — smooth as a real map of ℝ² — is nowhere holomorphic. Complex differentiability is a genuine rigidity, not a repackaging of real calculus.\n\nHolomorphy's rigidity is the source of the whole subject's magic: real and imaginary parts of a holomorphic function are harmonic (solutions of Laplace's equation), so complex analysis solves two-dimensional potential problems, and the analytic-continuation and identity theorems that make holomorphic functions almost impossibly determined all trace back to the Cauchy–Riemann constraint."
    },
    {
     "label": "Cauchy's theorem",
     "def": "The integral of a holomorphic function around a closed loop is zero; the integral formula then recovers all interior values from the boundary. Local behavior globally determined.",
     "detail": "Cauchy's theorem states that the contour integral of a holomorphic function around a closed loop in a simply connected domain is zero. Its companion, the Cauchy integral formula, then recovers the function's interior values from its boundary values: f(a) = (1/2πi)∮ f(z)/(z − a) dz. From these two facts, essentially all of complex analysis follows — the integral of a holomorphic function depends only on endpoints, and knowing f on a boundary determines it inside.\n\nThe one indispensable computation is ∮ dz/z = 2πi around a loop encircling the origin (parametrize z = e^{iθ}, dz/z = i dθ, integrate over [0,2π]). It is nonzero precisely because 1/z is not holomorphic at 0 — the theorem's hypothesis fails there — and this single integral is the seed of the residue calculus and of winding numbers.\n\nCauchy's theorem is the foundation the field is built on. It yields that holomorphic functions are analytic, Liouville's theorem (a bounded entire function is constant) and hence the fundamental theorem of algebra, the maximum modulus principle, and the residue theorem for evaluating real integrals. Its topological content — that the value depends only on which singularities a loop encircles — is an early meeting of analysis and topology."
    },
    {
     "label": "Laurent series & singularities",
     "def": "Expansions allowing negative powers, classifying singularities as removable, poles, or essential. The essential ones are wild (Picard: they hit every value infinitely often).",
     "detail": "Where a Taylor series expands a holomorphic function in non-negative powers, a Laurent series allows negative powers too, expanding a function holomorphic on an annulus as Σ cₙ(z − a)ⁿ over all integers n. The negative-power tail classifies an isolated singularity: none means removable, finitely many means a pole (of order the most negative power), infinitely many means an essential singularity — the wild case.\n\nThe trichotomy is concrete. sin(z)/z has a removable singularity at 0 (its Laurent series has no negative powers; define the value as 1). 1/z² has a pole of order 2. And e^{1/z} = Σ (1/n!)z^{−n} has an essential singularity — infinitely many negative powers — near which, by the Casorati–Weierstrass and Picard theorems, the function comes arbitrarily close to every complex value (in fact hits all but at most one) in every neighborhood.\n\nLaurent series are the local anatomy of meromorphic functions — those holomorphic except for poles — and the coefficient of (z − a)^{−1}, the residue, is the one that survives integration, launching the residue calculus. The classification of singularities organizes the global theory of complex functions and, through Riemann surfaces, connects to the algebraic geometry of curves."
    },
    {
     "label": "Residues",
     "def": "A single coefficient at each pole; summing residues evaluates real integrals and infinite sums that resist every real-variable method. Complex analysis' most practical export.",
     "detail": "The residue of a function at an isolated singularity is the coefficient of (z − a)^{−1} in its Laurent expansion — the only term whose loop integral is nonzero. The residue theorem packages this: the integral of f around a closed contour equals 2πi times the sum of the residues enclosed. It converts contour integration into the algebra of extracting single Laurent coefficients.\n\nThe signature application is evaluating real integrals that resist elementary antiderivatives. For ∫_{−∞}^{∞} dx/(1 + x²), close the contour with a large semicircle in the upper half-plane; the only enclosed singularity is the simple pole at z = i, where the residue is 1/(2i); the semicircle's contribution vanishes as the radius grows, so the integral equals 2πi·(1/(2i)) = π — matching the arctangent answer, obtained with no antiderivative at all.\n\nResidues are among analysis's most powerful computational tools, evaluating integrals and infinite series that appear throughout physics and engineering, summing series via cotangent kernels, and — via the argument principle — counting zeros and poles inside a contour. That counting connects to Rouché's theorem and to the analytic study of the Riemann zeta function's zeros in the map's number-theory region."
    },
    {
     "label": "Conformal maps",
     "def": "Holomorphic maps preserve angles. The Riemann mapping theorem: any simply-connected proper region is conformally a disk — a startling uniformity.",
     "detail": "A holomorphic function with non-vanishing derivative is conformal: it preserves angles (including their orientation) between curves, because near each point it acts as a rotation-and-scaling. Möbius transformations z ↦ (az + b)/(cz + d) are the conformal automorphisms of the Riemann sphere, mapping circles-and-lines to circles-and-lines and acting sharply triply transitively on the sphere.\n\nThe Riemann mapping theorem is the field's great existence result: any simply connected proper open subset of ℂ, however irregular its boundary, is conformally equivalent to the unit disk. Explicitly, z ↦ (z − i)/(z + i) maps the upper half-plane bijectively and conformally onto the disk. So \"solve a potential problem on a complicated simply connected region\" reduces to \"solve it on the disk, then transport the answer back\" — angles, and hence Laplace's equation, are preserved.\n\nConformal mapping is how two-dimensional potential theory is actually done — in electrostatics, fluid flow, and heat conduction — by transplanting problems to standard domains. It also seeds deep mathematics: the disk's conformal self-maps are the hyperbolic isometries (the map's geometry region), and uniformization classifies all Riemann surfaces by three model geometries, tying complex analysis to topology and number theory."
    },
    {
     "label": "Analytic continuation",
     "def": "A holomorphic function is so rigid that a tiny piece determines it everywhere it can extend. This is how ζ(s) reaches beyond its defining series — the mechanism behind the Riemann Hypothesis.",
     "detail": "A holomorphic function is so rigid that its values on any set with a limit point determine it everywhere it can be extended — the identity theorem. Analytic continuation exploits this: a function defined by a formula on a small region can be extended, uniquely, to a larger domain, and the extension is forced, not chosen. Overlapping power-series disks or functional equations are the usual vehicles.\n\nThe geometric series Σzⁿ converges only on the unit disk, but it equals 1/(1 − z) there — and 1/(1 − z) is holomorphic on all of ℂ except z = 1, so it is the unique analytic continuation of the series to the whole plane minus a point. The series \"knew\" about the singularity at 1 all along; continuation reveals it. The same idea extends the factorial to the Gamma function and, most famously, the Riemann zeta function beyond its defining half-plane.\n\nAnalytic continuation is why complex analysis reaches into number theory: ζ(s), defined by Σn^{−s} only for Re(s) > 1, is continued to the whole plane, and the location of its continued zeros is the Riemann Hypothesis. Continuation also has topological content — continuing around a singularity can change branches (monodromy), which is precisely what Riemann surfaces are built to organize."
    },
    {
     "label": "Riemann surfaces",
     "def": "The natural domains of multivalued functions like √z or log z, where they become single-valued. The meeting point of complex analysis, topology, and algebraic geometry.",
     "detail": "Multivalued functions like √z and log z become single-valued and holomorphic once their domain is enlarged to a Riemann surface — a one-complex-dimensional manifold assembled from complex charts with holomorphic transitions. The surface encodes exactly the branching: √z lives on a two-sheeted cover of the plane joined along a cut, and log z on an infinite helical cover, so that continuing around the origin moves you between sheets rather than contradicting yourself.\n\nCompact Riemann surfaces are classified topologically by genus — sphere, torus, and higher-handled surfaces — and this number controls the analysis on them. The Riemann–Roch theorem relates the genus to the dimensions of spaces of meromorphic functions and differentials, and uniformization gives every surface one of three geometries (spherical, flat, or hyperbolic) according to genus 0, 1, or ≥ 2 — the same trichotomy the map's geometry region draws.\n\nRiemann surfaces are where complex analysis, topology, and algebraic geometry fuse: every compact Riemann surface is the same object as a smooth projective algebraic curve, so questions about √(cubic) become questions about elliptic curves in the number-theory region, and the analytic theory of these surfaces underwrites modular forms, moduli spaces, and much of modern arithmetic geometry."
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
     "def": "Complete normed spaces (Banach) and those with an inner product (Hilbert). Infinite-dimensional geometry where completeness must be imposed — the arena for quantum mechanics and PDE.",
     "detail": "Functional analysis does linear algebra in infinite dimensions, where completeness becomes essential. A Banach space is a complete normed vector space; a Hilbert space is a Banach space whose norm comes from an inner product, so it also has orthogonality and angles. The inner-product structure makes Hilbert spaces the closest infinite-dimensional analogue of Euclidean space, with orthonormal bases, projections, and Pythagoras all intact.\n\nA norm comes from an inner product exactly when it satisfies the parallelogram law ‖x+y‖² + ‖x−y‖² = 2‖x‖² + 2‖y‖². This distinguishes the two worlds concretely: ℓ² and L²[0,1] are Hilbert spaces, but C[0,1] with the sup norm and Lᵖ for p ≠ 2 are Banach spaces that fail the parallelogram law and have no compatible inner product — no notion of orthogonality exists there.\n\nThese spaces are where modern analysis lives: L² is the state space of quantum mechanics (states are unit vectors, observables self-adjoint operators), Fourier series are orthonormal expansions in a Hilbert space, and the completeness that defines them is exactly what makes existence proofs — of solutions to differential and integral equations — go through by extracting limits."
    },
    {
     "label": "Dual spaces",
     "def": "The space of continuous linear functionals. Hahn–Banach guarantees it is rich enough to separate points; reflexivity asks whether the dual's dual returns you home.",
     "detail": "The dual X* of a normed space is the space of continuous linear functionals X → ℝ (or ℂ), itself a Banach space under the operator norm. Two theorems make duals powerful: Hahn–Banach guarantees functionals can be extended from subspaces without increasing norm (so X* is always rich enough to separate points), and the Riesz representation theorem identifies a Hilbert space with its own dual — every continuous functional is ⟨·, y⟩ for a unique y.\n\nDuals are computable in the standard examples: (ℓᵖ)* = ℓ^q for 1 ≤ p < ∞ with 1/p + 1/q = 1, and likewise (Lᵖ)* = L^q. The self-duality of L² (the case p = q = 2) is the Riesz theorem in action. A subtlety worth noting: (ℓ¹)* = ℓ^∞ but (ℓ^∞)* is strictly larger than ℓ¹, so ℓ¹ is not reflexive — the natural map into the double dual is not onto.\n\nDual spaces are the source of weak topologies — weak convergence is convergence tested against every functional — and the Banach–Alaoglu theorem makes the dual unit ball weak-* compact, restoring a compactness that infinite dimensions otherwise destroy. This is the machinery behind existence proofs in the calculus of variations and PDE, where one extracts a weakly convergent subsequence and passes to the limit."
    },
    {
     "label": "Bounded operators",
     "def": "Continuous linear maps between such spaces, with an operator norm. The three pillars — open mapping, closed graph, uniform boundedness — govern their behavior.",
     "detail": "A linear map between normed spaces is bounded — equivalently continuous — when it magnifies norms by at most a fixed factor, the operator norm ‖T‖ = sup_{‖x‖=1}‖Tx‖. The bounded operators on a space form a Banach algebra under composition, the setting for the whole theory: spectra, functional calculus, and the classification of operators all live here. On a Hilbert space, each T has an adjoint T*, and self-adjoint (T = T*) and unitary (T*T = I) operators are the well-behaved classes.\n\nConcrete operators anchor the theory. On ℓ², the right shift (x₁, x₂, …) ↦ (0, x₁, x₂, …) has norm 1 and is an isometry but not surjective — an injective non-invertible operator, impossible in finite dimensions. Multiplication operators (Mf)(x) = m(x)f(x) on L² have norm equal to the essential sup of m and are the model for the spectral theorem's conclusion.\n\nBounded operators are the morphisms of functional analysis, and understanding a single operator — its spectrum, invariant subspaces, and functional calculus — is the subject's central problem. In quantum mechanics observables are (often unbounded) self-adjoint operators, time evolution is a unitary group, and the operator-algebra viewpoint (C*- and von Neumann algebras) grew into a field of its own."
    },
    {
     "label": "Spectral theory",
     "def": "Generalizing eigenvalues to infinite dimensions, where the spectrum can be continuous. The spectral theorem for self-adjoint operators is the mathematical heart of quantum observables.",
     "detail": "The spectrum of an operator T is the set of λ for which T − λI fails to be invertible — the infinite-dimensional replacement for eigenvalues, and it can include more than eigenvalues (continuous and residual spectrum). The spectral theorem is the crown jewel: every self-adjoint (or normal) operator is unitarily equivalent to multiplication by a real function on some L² space, the exact generalization of diagonalizing a symmetric matrix by an orthonormal eigenbasis.\n\nThe multiplication operator (Mf)(x) = x·f(x) on L²[0,1] shows what changes: it is self-adjoint with spectrum [0,1], yet has no eigenvalues at all — there is no nonzero f with x·f(x) = λf(x) almost everywhere. The spectrum has gone \"continuous,\" a phenomenon with no finite-dimensional analogue, and the spectral theorem still applies because M is already in multiplication form.\n\nSpectral theory is the mathematical backbone of quantum mechanics — the possible measured values of an observable are exactly its spectrum, and the spectral theorem provides the probability distribution of outcomes — and it governs the long-time behavior of evolution equations, the stability of PDE, and, through the spectra of Laplacians, the geometry-hears-itself questions (\"can you hear the shape of a drum?\") linking analysis to the map's geometry region."
    },
    {
     "label": "Compact operators",
     "def": "Operators that nearly reduce to finite-dimensional ones; their spectral theory (Fredholm) mirrors matrices and underlies integral equations.",
     "detail": "Compact operators are the closest infinite-dimensional cousins of matrices: they map bounded sets to relatively compact ones, equivalently they are norm-limits of finite-rank operators. Their spectral theory is almost finite-dimensional — the Riesz–Schauder theory gives a discrete spectrum of eigenvalues that can only accumulate at 0, each nonzero eigenvalue of finite multiplicity — and the Fredholm alternative makes solving (I − K)x = y behave like a finite linear system.\n\nIntegral operators are the canonical examples: (Kf)(x) = ∫ k(x,y)f(y) dy with a continuous kernel is compact on L², by the Arzelà–Ascoli theorem, which supplies the required compactness through equicontinuity. Their eigenvalues march to zero, so unlike a multiplication operator they have a genuine eigenbasis — the spectral theorem for compact self-adjoint operators gives an orthonormal basis of eigenvectors, exactly as for symmetric matrices.\n\nCompactness is what tames infinite dimensions: it underlies the theory of integral equations (Fredholm's original motivation), the eigenfunction expansions (Sturm–Liouville) that solve boundary-value problems in physics, and the existence proofs where a compact solution operator turns a differential equation into a manageable spectral problem. The Fredholm index it supports is an early avatar of the analysis–topology bridge (Atiyah–Singer)."
    },
    {
     "label": "Distributions & Sobolev spaces",
     "def": "Generalized functions (the delta 'function' made legitimate) and spaces measuring weak derivatives. The modern language in which PDEs are posed and solved.",
     "detail": "Distributions extend the notion of function so that everything can be differentiated. A distribution is a continuous linear functional on smooth compactly-supported test functions, and its derivative is defined by shifting the derivative onto the test function (integration by parts made into a definition). Sobolev spaces H^k collect functions whose derivatives up to order k, taken in this weak sense, are square-integrable — the natural spaces for PDE, where solutions may not be classically differentiable.\n\nThe Dirac delta δ is the prototype: the functional sending a test function φ to φ(0), representing an idealized unit point mass, no ordinary function. Weak differentiation is checkable — the Heaviside step function H (0 then 1) has weak derivative δ, since ∫H·φ′ = −∫_{0}^{∞}φ′ = φ(0) — so the non-differentiable step acquires a derivative as a distribution. Sobolev embedding theorems then say when enough weak derivatives force genuine smoothness or continuity.\n\nDistributions and Sobolev spaces are the modern language of PDE: they define weak solutions (letting existence be proved before regularity), they make the Fourier transform apply to objects like δ and polynomials, and they are the functional-analytic setting for the finite element method and for the map's PDE region, where elliptic regularity upgrades weak solutions back to classical ones."
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
     "def": "Any reasonable periodic function is a sum of pure sinusoids. Convergence subtleties (Gibbs, Carleson) launched much of modern analysis; physically, it is decomposition into harmonics.",
     "detail": "A periodic function is a superposition of pure oscillations: its Fourier series Σ cₙe^{inx} has coefficients cₙ = (1/2π)∫ f(x)e^{−inx} dx obtained by projecting onto each frequency. In L² the exponentials form an orthonormal basis, so the series converges in the mean-square sense and Parseval's identity equates ‖f‖² with Σ|cₙ|² — energy is the sum of energies across frequencies. Pointwise convergence is more delicate, governed by Dirichlet's theorem and marred by the Gibbs overshoot at jumps.\n\nThe theory computes closed forms for free. Expanding f(x) = x on (−π, π) and applying Parseval turns ∫x² into a statement about Σ1/n², recovering Euler's Σ1/n² = π²/6 — a number-theory identity falling out of an orthogonality calculation. The square wave's Fourier series Σ sin((2k−1)x)/(2k−1) exhibits the Gibbs phenomenon: the partial sums overshoot each jump by a fixed ~9%, no matter how many terms are taken.\n\nFourier series were born from Fourier's study of heat conduction, and they remain the tool for solving linear PDE on bounded domains by separating variables into eigenfunction expansions. They are the mathematical basis of signal and audio processing, and the convergence questions they raised (does a Fourier series represent its function?) drove the development of measure theory, set theory, and much of modern analysis."
    },
    {
     "label": "Fourier transform",
     "def": "The continuous analogue, trading a function for its frequency spectrum and turning differentiation into multiplication — which is why it trivializes constant-coefficient PDEs.",
     "detail": "For functions on the whole line, the discrete frequencies of a series become a continuum: the Fourier transform f̂(ξ) = ∫ f(x)e^{−2πixξ} dx decomposes f into oscillations of every frequency, inverted by the symmetric formula f(x) = ∫ f̂(ξ)e^{2πixξ} dξ. On L² it is a unitary map (Plancherel's theorem, ‖f‖ = ‖f̂‖), and its defining virtue is that it converts differentiation into multiplication: the transform of f′ is 2πiξ f̂(ξ).\n\nThe Gaussian is the transform's fixed point — e^{−πx²} transforms to itself — which is why it is ubiquitous in the theory and in probability (the normal distribution). A box function transforms to a sinc, illustrating the reciprocal spreading between a function and its transform. Turning derivatives into multiplication is the whole payoff: the heat equation ∂ₜu = ∂ₓₓu becomes the ODE ∂ₜû = −4π²ξ²û, solved instantly and inverted.\n\nThe Fourier transform is the master tool of linear analysis: it diagonalizes every constant-coefficient differential operator (hence solves the heat, wave, and Schrödinger equations), it is the mathematical heart of quantum mechanics (position and momentum are Fourier-conjugate), and its fast algorithm (the FFT) underlies essentially all of digital signal processing, imaging, and data compression."
    },
    {
     "label": "Convolution",
     "def": "A blending operation that becomes plain multiplication under the transform. Approximate identities use it to smooth rough functions into nice ones.",
     "detail": "The convolution (f * g)(x) = ∫ f(y)g(x − y) dy blends two functions by sliding one across the other — a weighted moving average. Its defining algebraic virtue is the convolution theorem: the Fourier transform turns convolution into ordinary multiplication, (f * g)^ = f̂ · ĝ. Convolution is commutative, associative, and smoothing: f * g is at least as regular as the smoother of its factors.\n\nConvolving against a concentrated bump (an approximate identity, e.g. a narrow Gaussian) smooths a function while barely moving it, and letting the bump shrink recovers the original — the basis of mollification, which approximates rough functions by smooth ones. This is how one proves smooth functions are dense, and how singular objects like the delta are realized as limits (δ is the convolution identity: f * δ = f).\n\nConvolution is where analysis, probability, and applications meet: the probability density of a sum of independent random variables is the convolution of their densities (so the Fourier transform, the characteristic function, multiplies — the route to the central limit theorem), fundamental solutions of PDE act by convolution, and every linear time-invariant filter in engineering is convolution against an impulse response."
    },
    {
     "label": "Uncertainty principles",
     "def": "A function and its transform cannot both be sharply localized. The same theorem is Heisenberg's uncertainty in quantum mechanics — analysis and physics as one statement.",
     "detail": "A function and its Fourier transform cannot both be sharply concentrated: squeezing f in space forces f̂ to spread in frequency. Quantitatively, the Heisenberg inequality bounds the product of the spreads (variances) of |f|² and |f̂|² from below by a fixed constant, so there is a hard floor on simultaneous localization. Qualitative versions (Hardy's theorem, the Benedicks theorem) sharpen this: a function and its transform cannot both have small support.\n\nThe bound is saturated exactly by Gaussians — e^{−ax²} and its transform have the minimal spread product — which is why the Gaussian is the \"most localized\" joint signal and why coherent states in physics are Gaussian. The everyday consequence is checkable in spirit: a very short pulse in time necessarily contains a broad band of frequencies (a click is wideband), while a pure tone must last a long time.\n\nThis is the mathematics behind Heisenberg's quantum uncertainty principle — position and momentum, being Fourier conjugates, cannot be simultaneously sharp — and behind the fundamental limits of signal processing (the time-bandwidth product) and imaging resolution. It also motivates wavelets and time-frequency analysis, which manage the unavoidable trade-off rather than trying to defeat it."
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
     "def": "Picard–Lindelöf: a Lipschitz vector field gives exactly one solution through each point. The guarantee that a differential equation actually determines a trajectory.",
     "detail": "An initial value problem y′ = f(t, y), y(t₀) = y₀ asks for a trajectory through a given point following a prescribed velocity field. The Picard–Lindelöf theorem guarantees a unique solution on a small time interval when f is continuous and Lipschitz in y — proved by rewriting the ODE as an integral equation and applying the Banach fixed-point theorem, so Picard iteration converges to the unique solution. Continuity of f alone (Peano) still gives existence, but can lose uniqueness.\n\nThe Lipschitz condition is exactly what separates the two outcomes. y′ = y, y(0) = 1 is Lipschitz and has the unique solution eᵗ. But y′ = √y, y(0) = 0 has a non-Lipschitz right side at 0, and uniqueness fails: both y ≡ 0 and y = t²/4 solve it (and so do solutions that stay at 0 then take off later). A leaky bucket really can empty in a way its equation cannot predict from the initial state alone.\n\nThis theorem is the well-posedness foundation for all of differential equations: it licenses the phase-space picture (trajectories exist and do not cross), it underlies numerical solvers (which approximate the guaranteed-unique solution), and its hypotheses flag exactly where models can develop non-uniqueness or blow-up — essential in mechanics, control, and every field that models change by rates."
    },
    {
     "label": "Linear systems",
     "def": "x'=Ax solved through eigenvalues of A; the matrix exponential e^{At} propagates initial data. The fully understood, exactly solvable core.",
     "detail": "A linear system x′ = Ax with constant matrix A is the one class solved completely: the solution is x(t) = e^{tA}x₀, where the matrix exponential is defined by the same power series as the scalar one. Diagonalizing A reduces the system to decoupled scalar equations, so the eigenvalues and eigenvectors of A dictate everything — growth or decay rates from the real parts, oscillation from the imaginary parts.\n\nA 2×2 example makes the recipe concrete. The system for the harmonic oscillator, x′ = v, v′ = −x, has matrix with eigenvalues ±i, so e^{tA} is a rotation and the solutions are sines and cosines circling the origin — undamped oscillation, read straight off the imaginary eigenvalues. Add damping and the eigenvalues acquire negative real parts, turning the circles into inward spirals.\n\nLinear systems are the backbone of the subject because every nonlinear system is, near an equilibrium, approximated by its linearization — so the eigenvalues of the Jacobian classify local behavior (the next topics). They are also the whole of linear control theory, the normal-mode analysis of coupled oscillators, and the discretized engine behind numerical linear algebra for differential equations."
    },
    {
     "label": "Phase portraits",
     "def": "The qualitative geometric picture of all trajectories at once — nodes, saddles, spirals, centers. Understanding dynamics without solving formulas.",
     "detail": "A phase portrait draws the trajectories of a system directly in state space, revealing the qualitative structure — equilibria, periodic orbits, and the flow between them — without solving anything explicitly. For a planar system the equilibria are classified by the eigenvalues of the linearization: real same-sign gives a node, real opposite-sign a saddle, complex a spiral (or a center if purely imaginary), with the trace and determinant of the Jacobian summarizing the type in one diagram.\n\nThe undamped pendulum shows the method's power. Its phase plane has centers at the hanging-down positions (closed orbits = oscillations) and saddles at the standing-up positions, with special trajectories (separatrices) dividing swinging from over-the-top rotation. All of this qualitative structure — which motions are periodic, which are unstable — is read from the geometry of the field, no closed-form solution required.\n\nPhase portraits are how nonlinear dynamics is understood when formulas are unavailable, which is almost always. Poincaré founded the qualitative theory this way, and it remains the working language for studying stability, oscillations, and bifurcations across physics, biology (predator–prey and neuron models), and engineering — the picture standing in for the unsolvable equation."
    },
    {
     "label": "Stability theory",
     "def": "Whether nearby solutions stay nearby. Lyapunov functions certify stability without solving the equation — an energy-like quantity that only decreases.",
     "detail": "Stability asks whether small perturbations of an equilibrium stay small (Lyapunov stable) or die out (asymptotically stable). Two methods decide it. Linearization: if every eigenvalue of the Jacobian at the equilibrium has negative real part, the equilibrium is asymptotically stable, and the Hartman–Grobman theorem says the nonlinear flow looks like its linearization near a hyperbolic equilibrium. Lyapunov's direct method: an \"energy\" function that decreases along trajectories proves stability without solving or linearizing.\n\nThe damped pendulum illustrates both. Its total energy E = ½v² + (1 − cos θ) decreases along trajectories at rate −(damping)·v² ≤ 0, so E is a Lyapunov function and the downward equilibrium is asymptotically stable — the pendulum settles, proven by energy dissipation alone. Linearizing at that equilibrium gives eigenvalues with negative real parts, confirming the same conclusion.\n\nStability theory is where differential equations meet engineering reality: control systems are designed to place eigenvalues in the stable half-plane, structures and circuits are analyzed for stable operating points, and Lyapunov functions certify safety of nonlinear systems from robotics to power grids. The same ideas scale up to the stability of periodic orbits (Floquet theory) and of patterns in PDE."
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
     "def": "The three archetypes — Laplace (equilibrium), heat (diffusion), wave (propagation) — with fundamentally different behavior. Classification dictates which methods apply.",
     "detail": "Second-order linear PDEs split into three types by the algebraic sign-pattern (the discriminant) of their principal part, and the three types behave utterly differently. Laplace's equation Δu = 0 is elliptic (steady states, no time), the heat equation uₜ = Δu is parabolic (irreversible diffusion), and the wave equation uₜₜ = Δu is hyperbolic (reversible propagation). The classification is not bookkeeping — it dictates what data determine a solution and how that solution behaves.\n\nThe contrast is checkable in their qualitative laws. The heat equation smooths instantly and irreversibly: any initial spike becomes analytic for t > 0, and you cannot run it backward. The wave equation instead propagates signals at finite speed with no smoothing, so a sharp pulse stays sharp and information travels along characteristics (in one dimension, d'Alembert's f(x − ct) + g(x + ct)). Laplace's equation has neither dynamics nor rough solutions — its solutions are as smooth as functions get, and satisfy the mean-value property.\n\nThis trichotomy organizes the entire subject: each type demands its own well-posed boundary/initial conditions (Dirichlet data for elliptic, initial data for parabolic and hyperbolic) and its own methods, and the three archetypes model the three basic physical regimes — equilibrium, diffusion, and waves — that recur throughout physics and engineering."
    },
    {
     "label": "Green's functions",
     "def": "The response to a point source; convolving against it solves the inhomogeneous problem. The propagator of the equation, and a bridge to physics.",
     "detail": "A Green's function is the response of a linear differential operator to a point source — the solution of L G = δ (a delta at one point) with the given boundary conditions. Because the operator is linear, the solution for a general source f is then the superposition (convolution) u(x) = ∫ G(x, y) f(y) dy: the Green's function inverts the operator, turning a differential equation into an integral.\n\nFor the Laplacian in three dimensions the Green's function on all of space is G(x, y) = 1/(4π|x − y|) — the Newtonian/Coulomb potential of a unit point charge. So the solution of Poisson's equation −Δu = f is u(x) = ∫ f(y)/(4π|x − y|) dy, which is exactly how the electrostatic potential of a charge distribution is computed. The 1/|x| is not a coincidence but the fundamental solution the delta source demands.\n\nGreen's functions are the systematic way to solve inhomogeneous linear PDEs and the language of potential theory, quantum propagators, and the boundary-integral and boundary-element numerical methods. They also connect to probability — the Green's function of the Laplacian is the expected occupation density of Brownian motion — one of the deep links between the map's analysis and probability regions."
    },
    {
     "label": "Weak solutions",
     "def": "Solutions defined by integration against test functions, allowing kinks and shocks classical derivatives forbid. This is why PDE theory lives in Sobolev spaces.",
     "detail": "Many PDEs have no smooth solution, yet a physically correct one exists if we relax what \"solution\" means. A weak solution is required only to satisfy the equation after integrating against arbitrary smooth test functions — moving derivatives onto the test function via integration by parts, so the solution itself need not be differentiable. This is the natural setting for conservation laws with shocks and for equations solved by energy methods in Sobolev spaces.\n\nBurgers' equation uₜ + u uₓ = 0 shows why weakness is unavoidable: smooth initial data develop crossing characteristics in finite time, producing a shock where no classical derivative exists. The weak formulation admits the discontinuous shock solution and, with an entropy condition to pick the physical one, gives the right answer. For elliptic problems, the weak form of −Δu = f (∫∇u·∇φ = ∫fφ for all test φ) is the basis of existence proofs via the Lax–Milgram theorem.\n\nWeak solutions decoupled existence from smoothness — the modern strategy is to prove a weak solution exists first (often by functional-analytic compactness), then study its regularity separately. This underpins the finite element method (which computes weak solutions) and the entire rigorous theory of nonlinear PDE, from fluid dynamics to general relativity."
    },
    {
     "label": "Regularity theory",
     "def": "Showing that weak solutions are secretly smooth after all (elliptic regularity), or precisely how smooth. The reconciliation of generalized and classical solutions.",
     "detail": "Having produced a weak solution, regularity theory asks whether it is secretly smooth. For elliptic equations the answer is often yes and dramatically so: solutions inherit smoothness from the coefficients and data, a bootstrapping in which each gain of derivatives feeds the next. Elliptic regularity states, for instance, that a weak solution of Δu = f is two derivatives smoother than f (in Sobolev or Hölder scales), and harmonic functions (f = 0) are automatically C^∞ — indeed real-analytic.\n\nThe hard case — equations in divergence form with merely bounded, measurable coefficients — is the content of Hilbert's 19th problem, resolved by De Giorgi and Nash (independently, 1957) and streamlined by Moser: weak solutions are Hölder continuous despite the coefficients being nowhere smooth. This was a landmark, showing regularity can be forced by the equation's structure even when nothing in the data suggests it.\n\nRegularity theory is what makes weak solutions trustworthy: it certifies that the objects produced by abstract existence arguments are genuine, classical solutions where it counts, and it controls their singularities where they are not. Its techniques (Schauder estimates, De Giorgi–Nash–Moser, and for nonlinear equations the partial-regularity theory) are central to geometric analysis and were essential background to the Ricci-flow proof of the Poincaré conjecture in the map's geometry region."
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
     "def": "Maps from a space of functions to numbers — arc length, energy, action. The unknown is an entire function, and we seek the one making the functional stationary.",
     "detail": "The calculus of variations optimizes over functions rather than numbers: a functional assigns a real value to each function in some class, typically as an integral J[y] = ∫ L(x, y, y′) dx of a Lagrangian. The goal is to find the function that makes J stationary — the shortest path, the least-energy shape, the least-time descent — so the \"variables\" are entire curves or fields, an infinite-dimensional optimization.\n\nClassic functionals set the agenda. Arc length ∫√(1 + y′²) dx measures curve length; the Dirichlet energy ∫|∇u|² measures smoothness; and the brachistochrone functional measures the time for a bead to slide down a curve between two points under gravity. Asking which curve minimizes the descent time — Johann Bernoulli's 1696 challenge — is asking for the minimizer of a specific functional, and the answer (a cycloid) is famously not the straight line.\n\nFunctionals are how physics states its laws economically: an astonishing range of physical systems evolve so as to make an action functional stationary (the principle of least action), so mechanics, optics, and field theory are all variational. Turning \"find the optimal function\" into a solvable equation is the subject's central move, accomplished by the Euler–Lagrange equation."
    },
    {
     "label": "Euler–Lagrange",
     "def": "The equation a minimizer must satisfy, converting an optimization over functions into a differential equation. The engine translating 'least action' into the laws of motion.",
     "detail": "Setting the first variation of J[y] = ∫ L(x, y, y′) dx to zero — demanding stationarity against all small perturbations that fix the endpoints — yields the Euler–Lagrange equation d/dx(∂L/∂y′) − ∂L/∂y = 0. It is the infinite-dimensional analogue of \"set the derivative to zero,\" converting the search for an optimal function into a differential equation the optimum must satisfy.\n\nThe method reproduces geometry and predicts physics. For arc length, L = √(1 + y′²) depends only on y′, so ∂L/∂y = 0 and the equation forces ∂L/∂y′ constant, hence y′ constant — the shortest path between two points is a straight line, derived rather than assumed. Applied to the brachistochrone Lagrangian the same equation yields a cycloid, and applied to the mechanical action ∫(kinetic − potential) it yields Newton's F = ma in Lagrangian form.\n\nEuler–Lagrange is one of the most consequential equations in science: it is the engine of Lagrangian and Hamiltonian mechanics, it produces the geodesic and minimal-surface equations of the map's geometry region, and via Noether's theorem it ties each continuous symmetry of a Lagrangian to a conservation law — energy, momentum, and charge all arising this way."
    },
    {
     "label": "Constraints & multipliers",
     "def": "Optimizing subject to side conditions via Lagrange multipliers, now in infinite dimensions — isoperimetric problems and constrained mechanics.",
     "detail": "Constrained variational problems optimize a functional subject to a side condition, and Lagrange multipliers extend from calculus to function space to handle them. For an isoperimetric constraint (a second integral held fixed) one makes stationary the combination J − λK, where the multiplier λ is determined by the constraint; for pointwise (holonomic) constraints the multiplier becomes a function. The critical functions of the modified problem are the constrained optima.\n\nThe namesake problem is the isoperimetric one: among all closed curves of a fixed perimeter, which encloses the greatest area? Setting up \"maximize area subject to fixed length\" with a multiplier and solving the resulting Euler–Lagrange equation forces constant curvature — the curve is a circle. This is Dido's legendary problem (the most land one can enclose with an oxhide cut into a thin strip), and the variational method proves the circle optimal.\n\nConstrained variation is everywhere optimization meets a restriction: equilibrium shapes of soap films and elastic rods, constrained mechanical systems (a bead on a wire, via multiplier forces), and the reduction of physical fields subject to gauge conditions. The multiplier itself is often physically meaningful — a pressure, a tension, or a reaction force — reading off the \"cost\" of the constraint."
    },
    {
     "label": "Geodesic variational principle",
     "def": "Shortest/straightest paths as critical points of the length or energy functional. The exact door from analysis into Riemannian geometry — geodesics on both sides.",
     "detail": "Geodesics — the straightest, locally shortest paths on a curved space — arise as the critical curves of a variational principle, either of the length functional ∫|γ′| or, more conveniently, the energy functional ∫|γ′|²/2. The Euler–Lagrange equations of the energy functional are exactly the geodesic equations, with the metric's Christoffel symbols appearing as the coefficients — so \"straightest path\" is literally \"stationary energy.\"\n\nOn the sphere the principle gives great circles: the energy-minimizing curves between two points are arcs of the great circle through them, which is why long-haul flight paths bow toward the poles. In the plane the same variational principle returns straight lines. Using energy rather than length is a technical convenience (it avoids the square root and fixes the parametrization to constant speed) that yields the same geodesics as critical points.\n\nThis principle is the bridge from analysis to the map's geometry region and to physics: it defines geodesics on any Riemannian manifold, it is how the geodesic equation is derived in differential geometry, and in general relativity it becomes the law of motion — free-falling particles trace geodesics of spacetime, so gravity itself is a variational principle in disguise."
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
     "def": "Equilibria and the qualitative changes that occur as a parameter crosses a threshold — where new behaviors are suddenly born.",
     "detail": "A dynamical system evolves a state by a fixed rule — a flow (continuous time) or a map (discrete time) — and its skeleton is the set of fixed points and periodic orbits together with their stability. A bifurcation is a qualitative change in this skeleton as a parameter varies: fixed points collide and annihilate (saddle-node), exchange stability (transcritical), split (pitchfork), or spawn an oscillation (Hopf). Bifurcation theory catalogues these transitions and their normal forms.\n\nThe one-dimensional system ẋ = μ − x² is the saddle-node prototype: for μ > 0 it has two equilibria ±√μ (one stable, one unstable), which merge at μ = 0 and vanish for μ < 0 — equilibria created out of nothing as the parameter crosses zero. The Hopf bifurcation is the oscillatory analogue: a stable equilibrium loses stability and a small limit cycle is born, the mechanism behind the onset of periodic behavior in chemical reactions, lasers, and heartbeats.\n\nBifurcations are how systems change character — the mathematics of tipping points, phase transitions, and pattern formation. They explain the sudden onset of oscillations, the buckling of loaded structures, and the cascade of period-doublings that leads to chaos, providing a universal vocabulary for qualitative change that recurs across physics, biology, and engineering."
    },
    {
     "label": "Chaos & Lyapunov exponents",
     "def": "Deterministic yet unpredictable motion; positive Lyapunov exponents quantify exponential sensitivity to initial conditions — the butterfly effect, measured.",
     "detail": "Chaos is deterministic unpredictability: a system with no randomness in its rule can nonetheless amplify tiny differences in initial conditions exponentially, so long-term prediction becomes impossible. The Lyapunov exponent quantifies this — the average exponential rate at which nearby trajectories separate; a positive exponent is the signature of chaos. Chaotic systems typically settle onto strange attractors, fractal sets on which the dynamics are recurrent yet never repeating.\n\nThe doubling map x ↦ 2x mod 1 is chaos stripped bare: it stretches distances by exactly 2 each step, so its Lyapunov exponent is ln 2 > 0, and in binary the map is just \"delete the leading digit\" — the future is the tail of the initial condition's binary expansion, so uncomputable digits become tomorrow's state. The logistic map at r = 4 is conjugate to it, and Lorenz's three-equation weather model produces the iconic butterfly attractor.\n\nChaos reshaped science's expectations: determinism does not imply predictability, which is why weather is forecastable only days ahead despite obeying exact laws (Lorenz's \"butterfly effect\"). The theory provides tools — Lyapunov exponents, symbolic dynamics, fractal dimensions — to quantify unpredictability, and it recurs wherever nonlinear feedback dominates, from fluid turbulence to population dynamics to celestial mechanics."
    },
    {
     "label": "Ergodicity & mixing",
     "def": "When a single trajectory samples the whole space so that time averages equal space averages (Birkhoff). The rigorous foundation under statistical mechanics.",
     "detail": "Ergodic theory studies dynamical systems through an invariant measure, asking whether time averages equal space averages. A system is ergodic when it cannot be split into two nontrivial invariant pieces; then Birkhoff's ergodic theorem guarantees that, for almost every starting point, the long-run time average of any observable equals its average over the whole space. Mixing is stronger — the system asymptotically forgets initial correlations, so any region spreads to equidistribute.\n\nIrrational rotation of the circle, x ↦ x + α (mod 1) with α irrational, is the model ergodic system: every orbit is dense and equidistributes, so the fraction of time an orbit spends in any arc equals that arc's length — this is Weyl's equidistribution theorem, and it makes the leading digits of 2ⁿ obey Benford's law. Rotation is ergodic but not mixing (it rigidly rotates without spreading); the doubling map is both ergodic and mixing.\n\nErgodic theory is the rigorous foundation of statistical mechanics — Boltzmann's hypothesis that time averages equal ensemble averages is exactly ergodicity — and it has become a powerful tool in number theory, where equidistribution and Furstenberg's ergodic proof of Szemerédi's theorem on arithmetic progressions connect the map's analysis and discrete regions."
    },
    {
     "label": "Entropy",
     "def": "A single number measuring a system's rate of information production or orbit complexity — connecting dynamics to information theory and thermodynamics.",
     "detail": "Entropy measures the rate at which a dynamical system generates information — how fast knowing the present to finite precision loses predictive power. The Kolmogorov–Sinai (metric) entropy is defined by partitioning the space and measuring the exponential growth of distinguishable orbit-histories; topological entropy is its coarser, measure-free cousin. Positive entropy is a hallmark of complexity and, for smooth systems, is tied to the positive Lyapunov exponents by Pesin's formula.\n\nThe doubling map again gives the clean number: each step reveals one new binary digit of the initial condition, one bit of information, so its entropy is ln 2 per step. This matches its Lyapunov exponent, as Pesin's theory predicts. Entropy is also a conjugacy invariant, and Ornstein's theorem makes it a complete one for Bernoulli systems — two such systems are dynamically identical exactly when their entropies agree, a rare classification result in dynamics.\n\nEntropy links dynamics to information theory (Shannon) and thermodynamics (Boltzmann–Gibbs), quantifying unpredictability in a single number that is invariant under change of coordinates. It classifies systems up to isomorphism in important cases, measures the complexity of everything from coding schemes to geodesic flows on negatively curved surfaces, and is a central invariant tying together the map's analysis, probability, and discrete regions."
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
     "def": "The arithmetic of remainders; the Euclidean algorithm computes gcd fast and, run backwards, solves ax+by=gcd. The oldest nontrivial algorithm still in daily use.",
     "detail": "Divisibility is the multiplicative skeleton of the integers: a divides b when b = ac for some integer c. The greatest common divisor gcd(a,b) is computed without factoring by the Euclidean algorithm — repeatedly replace the larger number by its remainder on division by the smaller — and Bézout's identity says the gcd is an integer combination gcd(a,b) = ax + by, recoverable by unwinding those divisions.\n\nRun it on gcd(48, 18): 48 = 2·18 + 12, then 18 = 1·12 + 6, then 12 = 2·6 + 0, so the gcd is 6. Back-substituting gives Bézout's coefficients: 6 = 18 − 12 = 18 − (48 − 2·18) = 3·18 − 48, so (x,y) = (−1, 3). The algorithm is fast (logarithmic in the inputs) and constructive — it hands you the certificate, not just the answer.\n\nDivisibility and the Euclidean algorithm are the computational foundation of number theory: Bézout's identity produces modular inverses (hence solves linear congruences and powers RSA key generation), the algorithm underlies the fundamental theorem of arithmetic, and its polynomial analogue runs the same way in k[x], the shared structure the map's algebra region calls a Euclidean domain."
    },
    {
     "label": "Primes",
     "def": "The multiplicative atoms. Infinitely many (Euclid), yet thinning out (roughly one in ln n) and erratically spaced — the source of number theory's hardest questions.",
     "detail": "A prime is an integer greater than 1 divisible only by 1 and itself — the multiplicative atoms. The fundamental theorem of arithmetic says every integer factors into primes uniquely up to order, so the primes generate all integers under multiplication with no redundancy. Their most basic global fact, known since antiquity, is that there are infinitely many.\n\nEuclid's proof is the model of elegance: given any finite list of primes p₁, …, pₖ, the number N = p₁p₂⋯pₖ + 1 leaves remainder 1 when divided by each pᵢ, so none of them divides N; yet N has some prime factor, which must therefore be a new prime outside the list. No finite list can be complete. (The same idea, applied to 4k−1 or via other tweaks, shows specific arithmetic progressions contain infinitely many primes.)\n\nPrimes are where number theory begins and returns: unique factorization makes them the coordinates of the integers, their apparent randomness fuels the analytic theory (prime number theorem, Riemann Hypothesis), and the practical difficulty of factoring large numbers into primes is the hardness assumption underneath RSA and much of modern cryptography."
    },
    {
     "label": "Congruences",
     "def": "Arithmetic modulo n — clock arithmetic. The Chinese Remainder Theorem reassembles a number from its residues; Fermat and Euler's theorems govern powers mod n.",
     "detail": "Congruence mod n — agreeing on remainder after division by n — turns the integers into the finite ring ℤ/n, where arithmetic becomes cyclic. The key structural theorems are Fermat's little theorem (a^{p−1} ≡ 1 mod p for p prime, a coprime to p), its generalization Euler's theorem (a^{φ(n)} ≡ 1), and the Chinese remainder theorem, which reassembles ℤ/mn as ℤ/m × ℤ/n for coprime moduli.\n\nThese make hard-looking computations instant. To find 2^{100} mod 11, Fermat gives 2^{10} ≡ 1, so 2^{100} = (2^{10})^{10} ≡ 1. To solve x ≡ 2 (mod 3) and x ≡ 3 (mod 5), the CRT guarantees a unique solution mod 15 — checking, x = 8 works (8 = 2·3+2 and 8 = 5+3), so x ≡ 8 (mod 15). Reasoning one prime at a time and recombining is the whole method.\n\nCongruences are the language of computational number theory: Fermat's little theorem is the basis of primality tests and the correctness of RSA decryption, the CRT speeds cryptographic arithmetic and underlies secret-sharing, and the study of ℤ/n as a ring is the elementary face of the algebra region's ideal theory and the arithmetic of finite fields."
    },
    {
     "label": "Quadratic reciprocity",
     "def": "Gauss's 'golden theorem': whether p is a square mod q secretly controls whether q is a square mod p. The first deep hint that primes talk to each other.",
     "detail": "Which numbers are perfect squares modulo a prime? The Legendre symbol (a/p) records the answer (+1 if a is a nonzero square mod p, −1 if not), and Gauss's law of quadratic reciprocity relates (p/q) to (q/p) for odd primes by (p/q)(q/p) = (−1)^{((p−1)/2)((q−1)/2)} — the two questions have the same answer unless both primes are ≡ 3 mod 4, when the answers flip. Two supplements handle (−1/p) and (2/p).\n\nThe law makes such questions mechanical. Is 3 a square mod 7? Both are ≡ 3 mod 4, so (3/7) = −(7/3) = −(1/3) = −1: no. Directly, the squares mod 7 are {1, 2, 4}, and 3 is absent — the law and the brute-force list agree. Reciprocity lets one compute any Legendre symbol quickly by flipping and reducing, without listing squares.\n\nGauss called quadratic reciprocity the \"golden theorem\" and proved it many ways; it is the first deep law of number theory and the seed of an enormous generalization. Higher reciprocity laws led Kummer, Hilbert, and Artin to class field theory, and Artin reciprocity — the abelian case of the map's Langlands program — is the modern statement of which reciprocity was the first glimpse."
    },
    {
     "label": "Arithmetic functions",
     "def": "Functions of the integers built from divisor structure (φ, μ, σ). Möbius inversion inverts divisor sums — the combinatorial backbone of analytic number theory.",
     "detail": "Arithmetic functions assign values to integers based on their multiplicative structure: Euler's totient φ(n) (integers up to n coprime to it), the divisor-sum σ(n) and count d(n), and the Möbius function μ(n). Most are multiplicative (f(mn) = f(m)f(n) for coprime m, n), so they are determined by their values on prime powers. Dirichlet convolution makes them a ring, and Möbius inversion inverts summation over divisors.\n\nThe functions compute and connect. φ(12) = 4 (the units 1, 5, 7, 11), and σ(6) = 1+2+3+6 = 12 = 2·6 — so 6 is a perfect number, exactly the condition σ(n) = 2n that ties to Mersenne primes. Möbius inversion turns \"n = Σ_{d|n} φ(d)\" around to express φ via μ, the prototype of countless such inversions.\n\nArithmetic functions are the bridge from elementary to analytic number theory: their Dirichlet series are built from the Riemann zeta function (Σ d(n)/n^s = ζ(s)², Σ φ(n)/n^s = ζ(s−1)/ζ(s)), so statements about average behavior of φ, σ, and d become contour-integral computations, and Möbius inversion is the combinatorial heart of sieve methods."
    },
    {
     "label": "Continued fractions",
     "def": "Expansions [a₀;a₁,a₂,…] giving the best rational approximations to a real number, and solving Pell's equation. Where number theory meets Diophantine approximation.",
     "detail": "Every real number has a continued fraction expansion [a₀; a₁, a₂, …], built by repeatedly separating integer part from reciprocal of the fractional part. Its truncations, the convergents p_k/q_k, are the best rational approximations in a precise sense: no fraction with a smaller denominator comes closer. Rationals give finite expansions; quadratic irrationals give eventually periodic ones (Lagrange).\n\nThe expansions are strikingly clean. The golden ratio is [1; 1, 1, 1, …] (all ones — the \"most irrational\" number, hardest to approximate), and √2 = [1; 2, 2, 2, …]. For π = [3; 7, 15, 1, 292, …], the convergents are 3, 22/7, 333/106, 355/113 — the famous 22/7 and the extraordinarily accurate 355/113 (correct to six decimals) appear immediately, the large partial quotient 292 explaining why 355/113 is so good.\n\nContinued fractions are the theory of best rational approximation (the map's Diophantine-approximation region) and the tool for solving Pell's equation x² − Dy² = 1, whose solutions are convergents of √D. They compute fundamental units in real quadratic fields, appear in the dynamics of the Gauss map, and give the sharpest irrationality measures."
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
     "def": "ζ(s)=Σn⁻ˢ=∏(1−p⁻ˢ)⁻¹ encodes every prime into one analytic object. The Euler product is the analytic form of unique factorization.",
     "detail": "The Riemann zeta function ζ(s) = Σ 1/n^s converges for Re(s) > 1, and Euler's product formula rewrites it as ∏_p (1 − p^{−s})^{−1} over primes — an identity that IS unique factorization in analytic form, since expanding each geometric factor and multiplying reconstructs every n exactly once. The zeta function thereby encodes the primes into a single analytic object, the starting point of analytic number theory.\n\nThe product already proves theorems. At s = 1 the sum ζ(1) is the divergent harmonic series, so the product ∏(1 − 1/p)^{−1} must diverge too — which forces infinitely many primes (a finite product would be finite), Euler's analytic reincarnation of Euclid's theorem. Pushed further, the rate of divergence gives Σ 1/p = ∞, quantifying how the primes thin out. Special values like ζ(2) = π²/6 and ζ(4) = π⁴/90 fall out of the same function.\n\nThe Euler product is the hinge between multiplicative structure (primes) and analysis (a function of a complex variable), and every L-function generalizes it. Continuing ζ analytically to the whole plane and studying its zeros is the route to the prime number theorem and the Riemann Hypothesis — the deepest questions about primes translated into complex analysis."
    },
    {
     "label": "Prime number theorem",
     "def": "π(x)~x/ln x: the primes' asymptotic density. Its proof, via ζ's zeros off the line Re(s)=1, first revealed that prime distribution is a problem in complex analysis.",
     "detail": "The prime number theorem pins down how primes thin out: π(x), the count of primes up to x, is asymptotic to x/ln x, and even better to the logarithmic integral li(x). Equivalently, the n-th prime is about n ln n, and a random integer near x is prime with \"probability\" about 1/ln x. Proved independently by Hadamard and de la Vallée Poussin (1896), it was the first confirmation that the primes have a precise large-scale density despite local irregularity.\n\nThe estimate is checkable and improves with the better approximation: there are 50,847,534 primes below 10⁹; the crude x/ln x gives about 48.3 million, while li(x) gives about 50.85 million — strikingly close. The theorem's proof reveals its true nature: it is equivalent to the statement that ζ(s) has no zeros on the line Re(s) = 1, so a fact about prime counting is really a fact about where a complex function vanishes.\n\nThe prime number theorem is the crown of classical analytic number theory and the reason the Riemann zeta function matters: the size of the error term π(x) − li(x) is controlled exactly by how far left the zeros of ζ sit, so improving the theorem is the Riemann Hypothesis. Its methods — relating a counting function to the zeros of a generating Dirichlet series — became the template for the whole field."
    },
    {
     "label": "L-functions",
     "def": "Vast generalizations of ζ attached to characters, forms, and varieties. Their analytic behavior conjecturally controls deep arithmetic (Birch–Swinnerton-Dyer, Langlands).",
     "detail": "L-functions generalize the Riemann zeta function by twisting the sum with a character: a Dirichlet L-function is L(s, χ) = Σ χ(n)/n^s for a periodic multiplicative character χ, again with an Euler product over primes. Each encodes arithmetic in a specific residue class, and the non-vanishing of these functions at s = 1 is the analytic engine behind distribution results.\n\nTheir landmark application is Dirichlet's theorem on primes in arithmetic progressions: any progression a, a+d, a+2d, … with gcd(a,d) = 1 contains infinitely many primes, and they are equidistributed among the valid residue classes. The proof hinges on showing L(1, χ) ≠ 0 for every non-trivial character mod d — for example, mod 4 the two classes 1 and 3 each get \"half\" the primes, forced by the non-vanishing of the single non-trivial L-function. Zeta's pole handles the divergence; the L-functions handle the balance.\n\nL-functions are the central objects of modern number theory: Dedekind zeta functions of number fields, Hecke L-functions, and the L-functions of elliptic curves and modular forms all share the pattern (Euler product, analytic continuation, functional equation, critical zeros). The conjecture that they all come from automorphic representations, and share the Riemann Hypothesis, is the analytic heart of the map's Langlands program."
    },
    {
     "label": "Riemann Hypothesis",
     "def": "The conjecture that every nontrivial zero of ζ has real part exactly ½ — equivalent to the sharpest possible error term in the prime count. Mathematics' most famous open problem.",
     "detail": "The Riemann Hypothesis asserts that all non-trivial zeros of the analytically-continued zeta function lie on the critical line Re(s) = 1/2. The trivial zeros sit at the negative even integers; the interesting ones cluster in the critical strip 0 < Re(s) < 1, and RH says they line up exactly on its center. It is equivalent to the sharpest possible error term in the prime number theorem: π(x) − li(x) = O(√x ln x), meaning the primes are as regularly distributed as they could conceivably be.\n\nThe evidence is overwhelming but not a proof. The first non-trivial zeros are at 1/2 ± 14.1347…i, 1/2 ± 21.022…i, and so on up the line; the first several trillion zeros have been computed and every one lies exactly on Re(s) = 1/2. Their spacing statistics match the eigenvalue distributions of random Hermitian matrices (the Montgomery–Odlyzko law), hinting at a hidden spectral interpretation.\n\nRH is the most famous open problem in mathematics — a Clay Millennium Problem — because a proof would sharpen essentially everything known about the distribution of primes and validate hundreds of theorems proved \"assuming RH.\" Its generalization to all L-functions (GRH) would settle a vast web of questions, from the least prime in a progression to the security margins of number-theoretic cryptography."
    },
    {
     "label": "Circle method & partitions",
     "def": "Hardy–Littlewood–Ramanujan: extract asymptotics of counting functions by integrating a generating function over the unit circle. It delivers the exact growth of the partition function p(n).",
     "detail": "The Hardy–Littlewood circle method extracts asymptotics for additive problems by encoding a counting sequence as the coefficients of a generating function and recovering them by a contour integral around the unit circle. The circle is split into \"major arcs\" near rational points (which contribute the main term) and \"minor arcs\" (which are shown to be negligible). It is the premier tool of additive number theory.\n\nIts triumph is the partition function p(n), the number of ways to write n as a sum of positive integers. Hardy and Ramanujan (1918) used the method on the generating function ∏(1 − q^k)^{−1} to prove p(n) ~ e^{π√(2n/3)} / (4n√3) — an exact-looking asymptotic for a purely combinatorial count, later refined by Rademacher into a convergent exact series. For a check, p(100) = 190,569,292, and the Hardy–Ramanujan formula lands within about 0.4%.\n\nThe circle method solves problems where structure is scarce and only counting remains: Waring's problem (every integer is a bounded sum of k-th powers), Vinogradov's theorem (every large odd number is a sum of three primes, toward Goldbach), and countless equidistribution results. It is the analytic backbone of additive combinatorics and a recurring bridge between the map's number-theory and discrete regions."
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
     "def": "Finite extensions of ℚ like ℚ(√−5), the natural habitats where Diophantine questions live. Their arithmetic is subtler than ℤ's.",
     "detail": "A number field is a finite extension of ℚ — a field obtained by adjoining algebraic numbers, finite-dimensional as a ℚ-vector space, with the degree recording that dimension. Quadratic fields ℚ(√d), cyclotomic fields ℚ(ζ_n) (adjoining roots of unity), and their combinations are the basic examples, and each carries a set of embeddings into ℂ (real and complex) that control its arithmetic and geometry.\n\nThe simplest are already rich. ℚ(√2) has degree 2 with two real embeddings (√2 ↦ ±√2); ℚ(i) has degree 2 with a pair of complex embeddings; ℚ(ζ_5) has degree 4, its Galois group cyclic of order 4. The number ζ_p + ζ_p^{−1} = 2cos(2π/p) generates the real subfield of a cyclotomic field, linking these algebraic objects to explicit trigonometry.\n\nNumber fields are the arena of algebraic number theory: they are where ℤ generalizes to rings of integers, where unique factorization can fail and be repaired by ideals, and where the Galois theory of the map's algebra region becomes arithmetic. Studying primes, units, and class groups across all number fields at once is the subject's program, and the reciprocity laws governing it are the abelian shadow of Langlands."
    },
    {
     "label": "Rings of integers",
     "def": "The 'whole numbers' inside a number field. Unique factorization can fail here — the discovery that broke naive attempts at Fermat's Last Theorem.",
     "detail": "Inside each number field K sits its ring of integers O_K, the elements satisfying a monic polynomial with integer coefficients — the correct generalization of ℤ. Determining O_K exactly is the first subtlety of the subject, because it is often larger than the obvious ℤ[√d]. The ring has an integral basis (a ℤ-basis of the field), and its discriminant measures the field's arithmetic complexity.\n\nThe boundary cases are instructive. For ℚ(i), O_K = ℤ[i], the Gaussian integers. But for ℚ(√5), the golden ratio (1+√5)/2 is an algebraic integer (it satisfies x² − x − 1 = 0), so O_K = ℤ[(1+√5)/2] strictly contains ℤ[√5] — getting this right is essential, since the wrong ring gives the wrong primes and the wrong discriminant. In general O_{ℚ(√d)} is ℤ[√d] when d ≡ 2,3 (mod 4) and ℤ[(1+√d)/2] when d ≡ 1 (mod 4).\n\nRings of integers are where the arithmetic happens: their ideals factor uniquely into primes even when elements do not, their unit groups are described by Dirichlet's unit theorem, and their prime factorization behavior (ramification) is governed by the discriminant. They are the number-theoretic analogue of coordinate rings of curves, the analogy driving much of arithmetic geometry."
    },
    {
     "label": "Ideal class groups",
     "def": "A finite group measuring exactly how badly unique factorization fails; it is trivial precisely when factorization is unique. Dedekind's repair to the crisis.",
     "detail": "Unique factorization of elements can fail in a ring of integers, and the ideal class group measures exactly how badly. Ideals always factor uniquely into prime ideals (Dedekind), so the failure is not in factorization itself but in whether ideals are principal (generated by one element). The class group is the quotient of all ideals by the principal ones; its order, the class number h, is finite, and h = 1 means the ring is a principal ideal domain, hence a unique factorization domain.\n\nThe canonical failure is ℤ[√−5], where 6 = 2·3 = (1 + √−5)(1 − √−5) are two genuinely different factorizations into irreducibles (norm computations show none of the factors splits further). Unique factorization of elements fails — but at the level of ideals, both sides refine to the same product of prime ideals, and the class number is 2, the smallest possible obstruction. Imaginary quadratic fields with class number 1 are rare: only nine exist (Heegner–Baker–Stark).\n\nThe class group is the central invariant of a number field, and controlling it drives much of the subject: Kummer's study of cyclotomic class numbers was the first serious assault on Fermat's Last Theorem (his \"regular primes\"), the class number formula ties h analytically to L-function values, and class field theory constructs the field's abelian extensions directly from its ideal class structure."
    },
    {
     "label": "Ramification",
     "def": "How primes split, stay inert, or ramify when lifted into a bigger ring of integers — the arithmetic analogue of branching in covering spaces.",
     "detail": "When a prime p of ℤ is viewed inside a ring of integers O_K, it factors into prime ideals there, and the pattern — how many primes, with what exponents — is the ramification behavior. A prime splits (into distinct primes), stays inert (remains prime), or ramifies (a repeated prime factor). The ramified primes are precisely those dividing the field's discriminant, so ramification is finite and computable.\n\nThe Gaussian integers show all three cases. In ℤ[i], the prime 5 = (2 + i)(2 − i) splits (because −1 is a square mod 5); 3 stays inert (−1 is not a square mod 3, so x² + 1 is irreducible mod 3); and 2 = −i(1 + i)² ramifies (the repeated factor 1 + i), matching that 2 divides the discriminant −4. The splitting of p in ℤ[i] is exactly whether p is a sum of two squares — Fermat's theorem, recovered as ramification.\n\nRamification is the local structure of number fields and the meeting point of several theories: it is governed by Galois theory (the decomposition and inertia groups), it encodes reciprocity laws (how p splits in ℚ(ζ_n) depends only on p mod n), and it is the arithmetic analogue of branching for the map's Riemann surfaces — the same word, the same phenomenon of a point covered with multiplicity."
    },
    {
     "label": "p-adic numbers",
     "def": "An alternative completion of ℚ where 'close' means 'divisible by a high power of p'. Local fields that let you solve one prime at a time (Hasse's local–global principle).",
     "detail": "Fixing a prime p, the p-adic absolute value declares a number small when it is divisible by a high power of p (|p|_p = 1/p), and completing ℚ in this metric yields the field ℚ_p of p-adic numbers — a parallel number system for each prime, as fundamental as the real completion ℝ. Its integers ℤ_p are the numbers with non-negative p-adic valuation, and every p-adic number is a (possibly infinite) base-p expansion running to the left.\n\nThe metric inverts intuition usefully: since |p|_p is small, the series Σ p^n converges p-adically (to 1/(1 − p)), and \"close\" means \"congruent mod a high power of p.\" Hensel's lemma exploits this to lift solutions: a simple root of a polynomial mod p refines to an exact root in ℤ_p — for instance x² = 2 has a solution in ℚ_7 because 2 is a square mod 7 (3² = 2 mod 7), lifted digit by digit, even though √2 is not rational.\n\nThe p-adic numbers realize the local–global philosophy: a Diophantine equation is studied over ℝ and over every ℚ_p (the \"local\" fields), and the Hasse principle asks when local solvability everywhere implies a global rational solution — true for quadratic forms (Hasse–Minkowski), false in general. Local fields are the natural home of much of modern number theory, from local class field theory to the p-adic L-functions and Galois representations behind the map's modularity results."
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
     "def": "Functions on the upper half-plane with enormous symmetry under SL₂(ℤ); their Fourier (q-) coefficients are laden with arithmetic. A finite-dimensional space controlling infinitely much data.",
     "detail": "A modular form of weight k is a holomorphic function on the upper half-plane that transforms in a controlled way under the modular group SL₂(ℤ) — f((aτ+b)/(cτ+d)) = (cτ+d)^k f(τ) — plus a growth condition at the cusp. Because translation τ ↦ τ+1 is in the group, every modular form has a q-expansion Σ aₙ qⁿ in q = e^{2πiτ}, and its arithmetic lives in these Fourier coefficients. The space of forms of each weight is finite-dimensional, an extraordinary rigidity.\n\nThe examples are explicit and structured. The Eisenstein series E₄ and E₆ generate everything; the discriminant Δ = q ∏_{n≥1}(1 − qⁿ)^{24} is the first cusp form (vanishing at the cusp), of weight 12; and the modular j-function j = E₄³/Δ = q^{−1} + 744 + 196884q + … classifies elliptic curves. That finite-dimensionality forces identities: since weight-8 forms are one-dimensional, E₄² = E₈ outright, which spells out as a nontrivial convolution identity among divisor sums.\n\nModular forms are a central crossroads of mathematics: their coefficients are arithmetic (divisor sums, representation numbers of quadratic forms, traces of Frobenius on elliptic curves), Hecke operators act on them to explain multiplicativity, and the modularity of elliptic curves — every rational elliptic curve \"is\" a modular form — is what proved Fermat's Last Theorem and anchors the map's Langlands region."
    },
    {
     "label": "Ramanujan's τ and congruences",
     "def": "The coefficients of the discriminant modular form Δ define τ(n); Ramanujan's conjectured multiplicativity and size bounds (proved by Mordell and Deligne) launched the modern theory.",
     "detail": "The Ramanujan tau function is the sequence of Fourier coefficients of the weight-12 cusp form Δ = Σ τ(n) qⁿ. Ramanujan (1916) observed, and Mordell proved, that τ is multiplicative — τ(mn) = τ(m)τ(n) for coprime m, n — with a precise recursion at prime powers, all explained by Δ being an eigenform of the Hecke operators. He also conjectured the deep size bound |τ(p)| ≤ 2p^{11/2}.\n\nThe values look arbitrary but obey hidden laws: τ(2) = −24, τ(3) = 252, τ(4) = τ(2)² − 2^{11} = −1472 (the Hecke recursion in action), τ(5) = 4830. Ramanujan's congruences are the surprise — for example τ(n) ≡ σ_{11}(n) (mod 691), tying the mysterious τ to an ordinary divisor sum modulo a prime that appears because 691 divides the numerator of a Bernoulli number. Such congruences are the first sightings of Galois representations mod p.\n\nTau is the historical gateway to the modern theory: the multiplicativity is the Hecke eigenform phenomenon, the congruences launched the theory of congruences between modular forms (Serre, Swinnerton-Dyer, Deligne), and the size conjecture |τ(p)| ≤ 2p^{11/2} was proved by Deligne only as a consequence of his proof of the Weil conjectures — a single number sequence pulling in the deepest machinery of arithmetic geometry."
    },
    {
     "label": "Elliptic curves over ℚ",
     "def": "Cubic curves y²=x³+ax+b whose rational points form a finitely generated abelian group (Mordell–Weil). Rank is subtle; the object at the center of modern arithmetic.",
     "detail": "An elliptic curve over ℚ is a smooth cubic y² = x³ + ax + b with rational coefficients, and its rational points form an abelian group under the chord-and-tangent construction: to add two points, draw the line through them, find the third intersection with the curve, and reflect. The Mordell–Weil theorem states this group is finitely generated — E(ℚ) ≅ ℤ^r ⊕ (finite torsion) — so all infinitely many rational points come from finitely many generators plus a finite torsion part.\n\nThe structure is concretely constrained. Mazur's theorem completely classifies the possible torsion subgroups: only 15 groups occur, and the torsion has order at most 16. The rank r, by contrast, is deeply mysterious — no algorithm is proven to compute it, curves of rank 28 are known, and whether ranks are bounded is open. On y² = x³ − 2, the point (3, 5) generates infinitely many rational points by repeated tangent-doubling, exhibiting positive rank by hand.\n\nElliptic curves sit at the center of modern number theory and its applications: the Birch and Swinnerton-Dyer conjecture (a Millennium Problem) predicts the rank from the order of vanishing of the curve's L-function at s = 1, their modularity proved Fermat's Last Theorem, and their group law over finite fields is the basis of elliptic-curve cryptography securing much of digital communication."
    },
    {
     "label": "Modularity → FLT",
     "def": "Every rational elliptic curve is modular (Wiles, Taylor–Wiles). Applied to a hypothetical Fermat solution, this contradiction proves Fermat's Last Theorem after 350 years.",
     "detail": "The modularity theorem (Wiles, with Taylor, and completed by Breuil–Conrad–Diamond–Taylor) says every elliptic curve over ℚ is modular — its L-function equals that of a weight-2 modular form, equivalently its Frobenius traces are the Hecke eigenvalues of a modular form. This was conjectured by Taniyama and Shimura and is the case of the Langlands correspondence that Wiles proved to reach Fermat.\n\nThe link to Fermat's Last Theorem is Frey's brilliant reframing. A hypothetical solution aⁿ + bⁿ = cⁿ (n ≥ 5, prime) would produce the Frey curve y² = x(x − aⁿ)(x + bⁿ), whose discriminant is a perfect n-th power times a square — so exotic that Ribet proved (via level-lowering) it could not be modular. But modularity says every elliptic curve over ℚ is modular. The Frey curve cannot exist, so neither can the Fermat solution: contradiction, and Fermat's 350-year-old claim is a theorem (1995).\n\nBeyond settling Fermat, modularity reorganized number theory: it made the L-function of an elliptic curve accessible through the analytic theory of modular forms (crucial for BSD), it validated the philosophy that arithmetic objects are governed by automorphic forms, and the deformation-theory techniques Wiles invented became standard tools in the broader modularity results that continue to extend the Langlands program."
    },
    {
     "label": "Langlands program",
     "def": "A sweeping web of conjectures unifying Galois representations with automorphic forms — a 'grand unified theory' of number theory, with representation theory as its language.",
     "detail": "The Langlands program is a vast web of conjectures predicting that two very different worlds are the same: on one side, Galois representations (the symmetries of number fields, packaged as representations of the absolute Galois group); on the other, automorphic forms (a sweeping generalization of modular forms, living on the adelic points of reductive groups). The dictionary matches their L-functions, so arithmetic data and analytic data encode each other.\n\nEvery reciprocity law is a special case. Quadratic reciprocity, class field theory (the abelian case, where 1-dimensional Galois characters match Dirichlet-type characters), and the modularity of elliptic curves (2-dimensional Galois representations matching weight-2 modular forms) are all instances of one principle. Functoriality — that maps between the groups induce maps between automorphic forms — would generate an avalanche of new identities among L-functions, most still conjectural.\n\nOften called a \"grand unified theory\" of mathematics, the Langlands program organizes number theory, representation theory, and (via the geometric Langlands correspondence) even parts of mathematical physics under a single vision. Its proven cases already delivered Fermat's Last Theorem and the Sato–Tate conjecture; its full scope is the horizon toward which much of the map's number-theory and algebra regions are oriented."
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
     "def": "Polynomial equations sought in integers or rationals. Hilbert's 10th problem asks for an algorithm to decide solvability — proved impossible (Matiyasevich), linking directly to computability.",
     "detail": "A Diophantine equation asks for integer or rational solutions of a polynomial equation — the oldest and most stubborn questions in mathematics, where the discreteness of the unknowns changes everything. Some families are completely solved: the Pythagorean triples x² + y² = z² are parametrized by (m² − n², 2mn, m² + n²), and Pell's equation x² − Dy² = 1 always has infinitely many solutions generated by a fundamental one (for D = 2, the solution (3, 2) generates all others via powers of 3 + 2√2).\n\nOthers are famously hard or impossible. Fermat's x^n + y^n = z^n has no positive solutions for n ≥ 3 (proved only in 1995), and the general problem has no algorithm at all: Hilbert's tenth problem asked for a procedure to decide any Diophantine equation, and Matiyasevich (building on Davis–Putnam–Robinson) proved in 1970 that none exists — Diophantine solvability is undecidable, tying this ancient subject directly to the map's computability region.\n\nDiophantine equations are where number theory concentrates its difficulty and its methods: elliptic curves, modular forms, p-adic analysis, and Galois cohomology were all developed or sharpened to attack them, and results like Faltings' theorem (a curve of genus ≥ 2 has only finitely many rational points) show how deeply the geometry of an equation controls its arithmetic."
    },
    {
     "label": "Diophantine approximation",
     "def": "How closely irrationals can be approximated by rationals. Liouville's bound builds transcendentals; Roth's theorem gives the sharp exponent for algebraic numbers.",
     "detail": "Diophantine approximation studies how well real numbers can be approximated by rationals. Dirichlet's theorem gives the baseline: every irrational α has infinitely many rationals p/q with |α − p/q| < 1/q², approximation to order 2, achieved by the convergents of its continued fraction. The question is whether algebraic irrationals can be approximated better than this — and the answer, hard-won, is essentially no.\n\nLiouville (1844) showed algebraic numbers of degree d resist approximation beyond order d, which let him construct the first explicit transcendental numbers (Liouville numbers like Σ 10^{−n!}, approximable to every order, hence not algebraic). Roth's theorem (1955, a Fields Medal) is the sharp modern statement: for any algebraic irrational α and any ε > 0, |α − p/q| < 1/q^{2+ε} has only finitely many solutions — algebraic numbers are approximable to order 2 and no better, exactly matching Dirichlet's universal bound.\n\nDiophantine approximation is the quantitative core of transcendence theory and has surprising reach: Roth's theorem bounds the number of solutions to families of Diophantine equations (Thue equations), the theory feeds the subject of transcendence (next topic), and its dynamical incarnation — how orbits of the Gauss map and geodesic flows equidistribute — connects it to the map's analysis and dynamical-systems regions."
    },
    {
     "label": "Transcendence of e and π",
     "def": "Proofs that these constants satisfy no polynomial with rational coefficients (Hermite, Lindemann) — and Lindemann's result finally proved squaring the circle impossible.",
     "detail": "A transcendental number satisfies no polynomial equation with integer coefficients — it escapes algebra entirely. That such numbers exist is easy (they are uncountable, while algebraic numbers are countable), but proving a specific familiar constant is transcendental is hard. Hermite (1873) proved e transcendental, and Lindemann (1882) proved π transcendental, each by showing a certain integer combination of exponentials could not vanish.\n\nLindemann's result settles an ancient problem. The Lindemann–Weierstrass theorem says e^α is transcendental for every nonzero algebraic α; if π were algebraic, then iπ would be algebraic and e^{iπ} = −1 would be transcendental — but −1 is an integer, a contradiction. So π is transcendental. Since every compass-and-straightedge construction produces only algebraic numbers, the transcendence of π proves that squaring the circle is impossible, closing a question open since antiquity.\n\nTranscendence theory sits at the far frontier of number theory, where even simple-looking questions are brutal: the Gelfond–Schneider theorem (Hilbert's seventh problem) proved a^b transcendental for algebraic a ≠ 0,1 and irrational algebraic b (so 2^{√2} and e^π are transcendental), yet whether e + π or the Euler–Mascheroni constant is even irrational remains unknown — a reminder of how much about the most familiar constants is still out of reach."
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
