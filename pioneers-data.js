// ============================================================
// THE WEB OF MATHEMATICS — pioneers (edit me)
// One entry per person. The constellation, the biography panel
// and the Pioneers gallery are all generated from this list.
//
//   id      stable key; also the portrait file name: portraits/<id>.jpg
//   born    year (number; negative = BCE) or null if unknown
//   died    year, or null if living
//   dates   optional text that replaces born–died (e.g. "fl. c. 300 BCE")
//   y       the year of their defining contribution (drives the time
//           scrubber and chronological order)
//   dom     domain ids (foundations, algebra, analysis, geometry,
//           number, discrete, probability, order)
//   fields  field ids from data.js; shown as "on the map" links
//   role    one line: nationality and occupation
//   epitaph one line: why they matter
//   legacy  a short closing paragraph
//   life    timeline rows: [year, title, detail]
//   works   key works: [year, title, url or null]
//
// Portraits and their credits live in portraits/credits.js.
// Ancient dates are approximate ("c.") and worth re-checking.
// ============================================================

const PEOPLE = [

// ---------------- the ancient world ----------------
{ id:"euclid", name:"Euclid", born:null, died:null, dates:"fl. c. 300 BCE", y:-300,
  dom:["geometry","number"], fields:["classical-geometry","elementary-nt"],
  role:"Greek mathematician in Alexandria",
  epitaph:"Wrote the textbook that taught the world what a proof is.",
  legacy:"The Elements was used as a textbook for over two thousand years. Its fifth postulate, about parallel lines, resisted every attempt at proof — until Gauss, Bolyai and Lobachevsky showed that geometry can do without it.",
  life:[
    [-300,"Teaches in Alexandria","Works at the new Museum under Ptolemy I. Almost nothing else is known of his life."],
    [-300,"The Elements","Thirteen books — plane geometry, proportion, number theory, the five Platonic solids — all derived from definitions, five postulates and common notions."],
    [-300,"Infinitely many primes","Book IX, Proposition 20: multiply any finite list of primes and add one."],
    [-300,"The Euclidean algorithm","Book VII, Propositions 1–2: the greatest common divisor by repeated subtraction — still in every computer."],
    [800,"Translated in Baghdad","Al-Ḥajjāj translates the Elements into Arabic; Europe relearns it from Arabic in the 12th century."],
    [1482,"First printed edition","Erhard Ratdolt prints the Elements in Venice."],
    [1899,"Hilbert repairs the axioms","Hilbert's Foundations of Geometry supplies the axioms Euclid used without stating."]
  ],
  works:[
    [-300,"Elements (David Joyce's online edition)","https://mathcs.clarku.edu/~djoyce/java/elements/elements.html"]
  ]},

{ id:"archimedes", name:"Archimedes", born:-287, died:-212, dates:"c. 287–212 BCE", y:-250,
  dom:["analysis","geometry"], fields:["real-analysis","classical-geometry"],
  role:"Greek mathematician, physicist and engineer of Syracuse",
  epitaph:"Squeezed π between polygons and summed a parabola — integral calculus, 1,900 years early.",
  legacy:"His method of exhaustion anticipated the integral. His letter The Method, recovered from a palimpsest prayer book in 1906 and re-imaged after 1998, shows him using infinitesimal slices to discover results before proving them rigorously. The Fields Medal carries his portrait.",
  life:[
    [-287,"Born in Syracuse","Son of the astronomer Phidias; probably studied in Alexandria with Euclid's successors."],
    [-250,"Measurement of a Circle","Traps π between 3 10⁄71 and 3 1⁄7 with 96-sided polygons."],
    [-250,"Quadrature of the Parabola","Sums a geometric series to show a parabolic segment is 4⁄3 of its inscribed triangle."],
    [-225,"On the Sphere and Cylinder","A sphere has two-thirds the volume and surface of its circumscribing cylinder — the figure he asked to have on his tomb."],
    [-212,"Killed at the fall of Syracuse","Slain by a Roman soldier during the siege, by tradition while drawing in the sand."],
    [1906,"The Method rediscovered","Johan Heiberg reads the Archimedes Palimpsest in Constantinople."]
  ],
  works:[
    [-250,"The Method of Mechanical Theorems (the Archimedes Palimpsest)",null]
  ]},

// ---------------- the medieval flowering ----------------
{ id:"khwarizmi", name:"Muḥammad ibn Mūsā al-Khwārizmī", born:780, died:850, dates:"c. 780 – c. 850", y:820,
  dom:["algebra","number"], fields:["galois-theory","elementary-nt"],
  role:"Persian mathematician and astronomer at the House of Wisdom, Baghdad",
  epitaph:"Gave us the word 'algebra' — and, through his own name, the word 'algorithm'.",
  legacy:"His book on Indian numerals, known in Latin as Algoritmi de numero Indorum, spread decimal place-value arithmetic through Europe, and 'algorism' became 'algorithm'. His al-jabr treated equations as objects to be solved by general procedures — the start of algebra as a subject.",
  life:[
    [780,"Born c. 780","Probably in Khwarazm, south of the Aral Sea."],
    [813,"The House of Wisdom","Works in Baghdad under the caliph al-Maʾmūn, where Greek and Indian works are translated into Arabic."],
    [820,"The Compendious Book on Calculation by Completion and Balancing","Solves linear and quadratic equations in six standard forms, with geometric proofs by completing the square. Al-jabr — 'restoring' — names the subject."],
    [825,"On the Indian numerals","Explains decimal place value with zero; it survives only in Latin translation."],
    [850,"Dies c. 850",""],
    [1145,"Algebra reaches Europe","Robert of Chester translates al-jabr into Latin."]
  ],
  works:[
    [820,"Al-Kitāb al-mukhtaṣar fī ḥisāb al-jabr wa-l-muqābala",null]
  ]},

// ---------------- renaissance & the new algebra ----------------
{ id:"fermat", name:"Pierre de Fermat", born:1601, died:1665, y:1637,
  dom:["number","probability","analysis"], fields:["elementary-nt","diophantine","prob-spaces","variations"],
  role:"French lawyer and amateur mathematician",
  epitaph:"Wrote the most famous marginal note in history, and left the proof to others for 358 years.",
  legacy:"Fermat published almost nothing; his results survive in letters and margins. His Last Theorem was proved by Andrew Wiles in 1994, and his little theorem is the engine of RSA encryption.",
  life:[
    [1601,"Born in Beaumont-de-Lomagne","Son of a leather merchant; trained in law. (Some scholars date his birth to 1607.)"],
    [1631,"Councillor in Toulouse","Serves in the parliament of Toulouse for the rest of his life; mathematics is his pastime."],
    [1636,"Curves as equations","Independently of Descartes, describes curves by equations, and finds maxima, minima and tangents by 'adequality'."],
    [1637,"The margin note","Writes in his copy of Diophantus that xⁿ + yⁿ = zⁿ has no solutions in whole numbers for n > 2 — and that the margin is too small for his proof."],
    [1640,"Fermat's little theorem","aᵖ ≡ a (mod p) for every prime p, stated in a letter to Frénicle, without proof."],
    [1654,"Letters with Pascal","On splitting the stakes of an unfinished game: probability theory begins."],
    [1665,"Dies in Castres",""],
    [1994,"The Last Theorem proved","Andrew Wiles, with Richard Taylor, completes the proof."]
  ],
  works:[
    [1670,"Diophantus's Arithmetica with Fermat's observations (published by his son Samuel)",null]
  ]},

{ id:"pascal", name:"Blaise Pascal", born:1623, died:1662, y:1654,
  dom:["probability","discrete","geometry"], fields:["prob-spaces","enumerative","classical-geometry"],
  role:"French mathematician, physicist and philosopher",
  epitaph:"Founded probability with Fermat, and built one of the first calculating machines.",
  legacy:"Pascal's triangle, Pascal's wager and the pascal (the unit of pressure) carry his name. His letters with Fermat turned gamblers' puzzles into a mathematics of expectation.",
  life:[
    [1623,"Born in Clermont",""],
    [1640,"The mystic hexagram","At 16: the opposite sides of any hexagon inscribed in a conic meet in three collinear points."],
    [1642,"The Pascaline","Builds a mechanical adding machine to help his father, a tax commissioner."],
    [1654,"The problem of points","Letters with Fermat on dividing the stakes of an interrupted game."],
    [1654,"Treatise on the Arithmetical Triangle","Binomial coefficients, with one of the first clear uses of proof by induction."],
    [1654,"The night of fire","A religious experience on 23 November; he turns to theology."],
    [1662,"Dies in Paris","His Pensées are published after his death."]
  ],
  works:[
    [1665,"Traité du triangle arithmétique",null]
  ]},

// ---------------- the age of calculus ----------------
{ id:"newton", name:"Isaac Newton", born:1643, died:1727, y:1665,
  dom:["analysis"], fields:["real-analysis","odes","variations"],
  role:"English mathematician and physicist",
  epitaph:"Invented calculus to write down the laws of motion — then proved his theorems in Greek geometry.",
  legacy:"The Principia (1687) put falling apples and orbiting moons under one law of gravitation. The priority dispute with Leibniz split English and Continental mathematics for a century; Britain kept Newton's dot notation and fell behind.",
  life:[
    [1643,"Born in Woolsthorpe","Premature, and after his father's death; raised by his grandmother."],
    [1665,"The miracle years","With Cambridge closed by plague, develops fluxions (calculus), the general binomial series, optics and the beginnings of gravitation (1665–66)."],
    [1669,"Lucasian Professor","Succeeds Isaac Barrow at Cambridge."],
    [1671,"Method of Fluxions","His calculus treatise, not published until 1736."],
    [1687,"Principia Mathematica","The laws of motion and universal gravitation."],
    [1697,"The brachistochrone","Solves Johann Bernoulli's challenge overnight; Bernoulli recognises 'the lion by his claw'."],
    [1712,"The priority report","A Royal Society committee, quietly steered by Newton, credits him with the calculus."],
    [1727,"Dies in London","Buried in Westminster Abbey."]
  ],
  works:[
    [1687,"Philosophiæ Naturalis Principia Mathematica",null],
    [1736,"The Method of Fluxions and Infinite Series",null]
  ]},

{ id:"leibniz", name:"Gottfried Wilhelm Leibniz", born:1646, died:1716, y:1684,
  dom:["analysis","foundations","algebra"], fields:["real-analysis","logic","linear-algebra"],
  role:"German philosopher, mathematician and diplomat",
  epitaph:"Invented calculus with the notation we still use: dx, dy and ∫.",
  legacy:"His notation won. Continental mathematicians who used it — the Bernoullis, Euler — raced ahead. His dream of a calculus of reasoning anticipated symbolic logic, and his binary arithmetic (1703) anticipated the computer.",
  life:[
    [1646,"Born in Leipzig",""],
    [1672,"Paris","On a diplomatic mission; Christiaan Huygens teaches him modern mathematics."],
    [1675,"∫ and d","On 29 October introduces ∫ — a long S for summa — in his notebooks."],
    [1684,"Nova Methodus","Publishes the differential calculus in Acta Eruditorum, before Newton publishes his."],
    [1693,"Determinants","Uses determinants to solve linear systems (Seki Takakazu had done so in Japan in 1683)."],
    [1703,"Binary arithmetic","Explication de l'arithmétique binaire."],
    [1711,"The priority dispute","Accused of plagiarism by Newton's supporters; the Royal Society rules against him in 1712."],
    [1716,"Dies in Hanover","Neglected; only his secretary follows the coffin."]
  ],
  works:[
    [1684,"Nova Methodus pro Maximis et Minimis",null]
  ]},

{ id:"euler", name:"Leonhard Euler", born:1707, died:1783, y:1736,
  dom:["analysis","number","discrete","geometry"], fields:["graph-theory","analytic-nt","partitions","variations","elementary-nt"],
  role:"Swiss mathematician in St Petersburg and Berlin",
  epitaph:"The most prolific mathematician in history. 'Read Euler, read Euler, he is the master of us all.' — Laplace",
  legacy:"His collected works run to more than 80 volumes. He gave us the notation f(x), e, i, Σ and π in its modern sense, and e^{iπ} + 1 = 0. Blind in one eye from 1738 and almost totally blind from 1771, he kept going: nearly half his work came after he lost his sight.",
  life:[
    [1707,"Born in Basel","Studies with Johann Bernoulli."],
    [1727,"St Petersburg","Joins the new Academy of Sciences."],
    [1735,"The Basel problem","1 + 1⁄4 + 1⁄9 + 1⁄16 + … = π²⁄6."],
    [1736,"The bridges of Königsberg","No walk crosses all seven bridges exactly once: the first theorem of graph theory."],
    [1737,"The Euler product","Σ 1/nˢ = Π 1/(1 − p⁻ˢ): the first bridge between analysis and the primes."],
    [1741,"Berlin","25 years at Frederick the Great's academy."],
    [1744,"Calculus of variations","Methodus inveniendi: the Euler equation for extremal curves."],
    [1748,"Introductio in analysin infinitorum","Functions, e^{ix} = cos x + i sin x, and partitions by generating functions."],
    [1766,"Back to St Petersburg","Soon loses the sight of his other eye."],
    [1783,"Dies in St Petersburg","Having spent the day calculating the orbit of the new planet Uranus."]
  ],
  works:[
    [1748,"Introductio in analysin infinitorum",null],
    [1736,"Solutio problematis ad geometriam situs pertinentis (the Königsberg bridges)",null]
  ]},

// ---------------- the age of rigour ----------------
{ id:"gauss", name:"Carl Friedrich Gauss", born:1777, died:1855, y:1801,
  dom:["number","geometry","analysis"], fields:["elementary-nt","algebraic-nt","differential-geometry","complex-analysis"],
  role:"German mathematician, astronomer and physicist",
  epitaph:"'Few, but ripe': the prince of mathematicians published only what was perfect.",
  legacy:"The Disquisitiones Arithmeticae (1801) made number theory a discipline. His diary and letters show that he found non-Euclidean geometry, elliptic functions and much else first, but kept them to himself. The normal distribution is often named after him.",
  life:[
    [1777,"Born in Brunswick","Son of a labourer; the Duke of Brunswick pays for his education."],
    [1796,"The 17-gon","Shows the regular 17-sided polygon can be built with ruler and compass, and decides to become a mathematician. Proves quadratic reciprocity the same spring."],
    [1799,"The fundamental theorem of algebra","Doctoral thesis: every polynomial has a complex root — the first of his four proofs."],
    [1801,"Disquisitiones Arithmeticae","Congruences, quadratic forms, cyclotomy. The same year he predicts where the lost dwarf planet Ceres will reappear."],
    [1807,"Göttingen Observatory","Director for the rest of his life."],
    [1827,"Theorema Egregium","The curvature of a surface can be measured from inside it — the seed of Riemannian geometry."],
    [1833,"The telegraph","With Wilhelm Weber, builds one of the first electromagnetic telegraphs."],
    [1855,"Dies in Göttingen",""]
  ],
  works:[
    [1801,"Disquisitiones Arithmeticae",null],
    [1827,"Disquisitiones generales circa superficies curvas",null]
  ]},

{ id:"cauchy", name:"Augustin-Louis Cauchy", born:1789, died:1857, y:1821,
  dom:["analysis","algebra"], fields:["real-analysis","complex-analysis","linear-algebra"],
  role:"French mathematician",
  epitaph:"Made calculus rigorous, and founded complex analysis along the way.",
  legacy:"Cauchy wrote about 800 papers; the Academy's journal limited the length of papers partly because of him. Cauchy sequences, the Cauchy–Schwarz inequality, Cauchy's integral theorem and the Cauchy–Riemann equations meet every student of analysis.",
  life:[
    [1789,"Born in Paris","Five weeks after the storming of the Bastille."],
    [1814,"Complex integrals","A memoir on definite integrals taken between complex limits."],
    [1816,"Academy of Sciences","Appointed after the restoration of the monarchy."],
    [1821,"Cours d'analyse","Limits, continuity and convergence at the centre of calculus."],
    [1825,"Cauchy's integral theorem","The integral of a holomorphic function depends only on its endpoints."],
    [1830,"Exile","Refuses the oath to the new king; lives in Turin and Prague."],
    [1857,"Dies in Sceaux",""]
  ],
  works:[
    [1821,"Cours d'analyse de l'École royale polytechnique",null]
  ]},

{ id:"galois", name:"Évariste Galois", born:1811, died:1832, y:1832,
  dom:["algebra"], fields:["galois-theory","group-theory"],
  role:"French mathematician and republican revolutionary",
  epitaph:"Founded group theory, and died in a duel at 20.",
  legacy:"His memoirs were lost or rejected; Joseph Liouville published them in 1846, and it took decades more for mathematicians to absorb them. 'Galois theory' — the dictionary between field extensions and groups — is now taught in every algebra course.",
  life:[
    [1811,"Born in Bourg-la-Reine","His father is the town's mayor."],
    [1827,"Discovers mathematics","Reads Legendre's geometry like a novel."],
    [1829,"A terrible year","Fails the École Polytechnique entrance exam for the second time; his father takes his own life. A memoir sent to the Academy through Cauchy goes nowhere."],
    [1830,"A memoir lost","Submitted for the Academy's Grand Prize; Fourier takes it home and dies before reading it."],
    [1831,"Prison","Arrested for republican activity. Poisson rejects his memoir as incomprehensible."],
    [1832,"The last night","On 29 May, before a duel, writes his mathematical testament to Auguste Chevalier. Dies on 31 May, aged 20."],
    [1846,"Published","Liouville prints his works in his journal."]
  ],
  works:[
    [1846,"Œuvres mathématiques d'Évariste Galois (ed. Liouville)",null]
  ]},

{ id:"riemann", name:"Bernhard Riemann", born:1826, died:1866, y:1854,
  dom:["geometry","analysis","number"], fields:["differential-geometry","complex-analysis","analytic-nt","real-analysis"],
  role:"German mathematician",
  epitaph:"In a handful of papers he reinvented space, functions and the primes.",
  legacy:"Riemannian geometry became the language of Einstein's general relativity (1915). The Riemann Hypothesis, stated in his only paper on number theory, is the most famous open problem in mathematics and one of the Clay Millennium Prize Problems.",
  life:[
    [1826,"Born in Breselenz","Son of a Lutheran pastor; shy and often ill."],
    [1851,"Doctorate under Gauss","Complex functions as geometry: Riemann surfaces."],
    [1854,"On the hypotheses which lie at the foundations of geometry","Habilitation lecture: curved spaces of any dimension, measured by a metric. Gauss, in the audience, is deeply impressed."],
    [1854,"The Riemann integral","Defined in the same habilitation (published in 1868)."],
    [1857,"Abelian functions","Riemann surfaces, the count of moduli, and what became the Riemann–Roch theorem."],
    [1859,"On the number of primes less than a given magnitude","Eight pages linking the primes to the zeros of the zeta function — and the Riemann Hypothesis."],
    [1866,"Dies at 39","Of tuberculosis at Selasca in Italy. His housekeeper burns some of his papers."]
  ],
  works:[
    [1859,"Ueber die Anzahl der Primzahlen unter einer gegebenen Grösse (English translation by D. R. Wilkins)","https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Zeta/"],
    [1854,"Ueber die Hypothesen, welche der Geometrie zu Grunde liegen","https://www.maths.tcd.ie/pub/HistMath/People/Riemann/Geom/"]
  ]},

{ id:"boole", name:"George Boole", born:1815, died:1864, y:1847,
  dom:["order","foundations"], fields:["boolean","logic"],
  role:"English mathematician and logician in Cork",
  epitaph:"Turned logic into algebra. Every chip is applied Boole.",
  legacy:"His algebra lay mostly unused for 90 years until Claude Shannon showed in 1937 that it describes switching circuits exactly.",
  life:[
    [1815,"Born in Lincoln","Son of a shoemaker; left school at 16 to support his family."],
    [1847,"The Mathematical Analysis of Logic","Shows that logical reasoning can be written as equations."],
    [1849,"Professor at Queen's College, Cork","Appointed without a university degree."],
    [1854,"The Laws of Thought","The full system of what we now call Boolean algebra."],
    [1864,"Dies at 49","Pneumonia, after walking to a lecture in heavy rain."]
  ],
  works:[
    [1854,"An Investigation of the Laws of Thought","https://www.gutenberg.org/ebooks/15114"]
  ]},

{ id:"cantor", name:"Georg Cantor", born:1845, died:1918, y:1874,
  dom:["foundations","analysis"], fields:["set-theory","real-analysis"],
  role:"German mathematician, born in St Petersburg",
  epitaph:"Proved that some infinities are bigger than others.",
  legacy:"Kronecker called him a 'corrupter of youth'; Hilbert declared that 'no one shall expel us from the paradise that Cantor has created'. Set theory became the foundation of mathematics — and its paradoxes set off the foundational crisis.",
  life:[
    [1845,"Born in St Petersburg","The family moves to Germany in 1856."],
    [1869,"Halle","Spends his whole career at the modest University of Halle."],
    [1872,"Real numbers from sequences","Builds ℝ from Cauchy sequences of rationals — the same year as Dedekind's cuts."],
    [1874,"The reals are uncountable","His first set-theory paper: the algebraic numbers can be listed, the reals cannot, so transcendental numbers are everywhere."],
    [1878,"The continuum hypothesis","Conjectures there is no size strictly between ℕ and ℝ."],
    [1883,"Transfinite ordinals","Grundlagen einer allgemeinen Mannigfaltigkeitslehre."],
    [1884,"The first breakdown","The first of recurring depressions, amid Kronecker's hostility."],
    [1891,"The diagonal argument","A cleaner proof that no list contains every real — and that every set is smaller than its power set."],
    [1918,"Dies in Halle","In a sanatorium, during wartime food shortages."]
  ],
  works:[
    [1874,"Ueber eine Eigenschaft des Inbegriffes aller reellen algebraischen Zahlen",null],
    [1891,"Ueber eine elementare Frage der Mannigfaltigkeitslehre (the diagonal argument)",null]
  ]},

// ---------------- the foundational crisis ----------------
{ id:"hilbert", name:"David Hilbert", born:1862, died:1943, y:1900,
  dom:["foundations","geometry","analysis","algebra"], fields:["logic","classical-geometry","functional-analysis","commutative-algebra","algebraic-geometry"],
  role:"German mathematician at Göttingen",
  epitaph:"'We must know — we will know.' Set the agenda for 20th-century mathematics in one lecture.",
  legacy:"His 23 problems (1900) guided a century of research. Gödel showed in 1931 that his dream of a complete, provably consistent foundation was impossible, yet Hilbert's axiomatic method shaped modern mathematics and computing. Hilbert space is the stage of quantum mechanics.",
  life:[
    [1862,"Born in Königsberg","The city of Euler's bridges."],
    [1888,"The basis theorem","Finitely many invariants suffice — proved without constructing them. 'This is not mathematics, it is theology,' says Paul Gordan."],
    [1893,"The Nullstellensatz","The dictionary between polynomial ideals and algebraic sets."],
    [1895,"Göttingen","Makes it the world's centre of mathematics."],
    [1899,"Foundations of Geometry","Complete axioms for Euclidean geometry."],
    [1900,"The 23 problems","Paris congress: the continuum hypothesis, the Riemann Hypothesis, solving Diophantine equations…"],
    [1915,"General relativity","Derives the field equations from an action principle, days before Einstein publishes them."],
    [1920,"Hilbert's programme","To prove mathematics consistent by finite means."],
    [1930,"'We must know, we will know'","Retirement address in Königsberg — the day after Gödel quietly announced incompleteness in the same city."],
    [1943,"Dies in Göttingen","The Nazis have emptied his institute."]
  ],
  works:[
    [1900,"Mathematical Problems (Bulletin of the AMS, 1902)","https://doi.org/10.1090/S0002-9904-1902-00923-3"],
    [1899,"Grundlagen der Geometrie",null]
  ]},

{ id:"noether", name:"Emmy Noether", born:1882, died:1935, y:1921,
  dom:["algebra","analysis","geometry"], fields:["ring-theory","commutative-algebra","homological-algebra","variations"],
  role:"German mathematician",
  epitaph:"Rebuilt algebra around structures instead of formulas — and tied every symmetry to a conservation law.",
  legacy:"Einstein called her the most significant creative mathematical genius since the higher education of women began. Noetherian rings, Noether's theorem in physics, and the abstract, axiomatic style of modern algebra all descend from her.",
  life:[
    [1882,"Born in Erlangen","Daughter of the mathematician Max Noether."],
    [1907,"Doctorate","Under Paul Gordan, a computation of invariants she later called 'Mist' (rubbish)."],
    [1915,"Göttingen","Hilbert and Klein invite her. For years she lectures unpaid, under Hilbert's name. 'We are a university, not a bathhouse,' Hilbert tells the objectors."],
    [1918,"Noether's theorem","Every continuous symmetry of a physical system gives a conserved quantity."],
    [1921,"Idealtheorie in Ringbereichen","The ascending chain condition: modern commutative algebra begins."],
    [1925,"Homology as groups","Persuades topologists that Betti numbers are shadows of homology groups."],
    [1933,"Dismissed","Expelled by the Nazis; emigrates to Bryn Mawr College, Pennsylvania."],
    [1935,"Dies at 53","After surgery. Einstein writes her obituary in the New York Times."]
  ],
  works:[
    [1918,"Invariante Variationsprobleme (Noether's theorem)",null],
    [1921,"Idealtheorie in Ringbereichen",null]
  ]},

{ id:"ramanujan", name:"Srinivasa Ramanujan", born:1887, died:1920, y:1913,
  dom:["number","discrete"], fields:["partitions","analytic-nt","modular-forms"],
  role:"Indian mathematician",
  epitaph:"A clerk from Madras whose notebooks are still yielding theorems a century later.",
  legacy:"His 'lost notebook', found by George Andrews in 1976, held mock theta functions that were understood only in 2002 and now appear in black-hole physics. The taxicab number 1729 = 1³ + 12³ = 9³ + 10³ is named after his conversation with Hardy.",
  life:[
    [1887,"Born in Erode","Grows up in Kumbakonam, Tamil Nadu."],
    [1903,"Carr's Synopsis","Works through a list of some 5,000 theorems, and begins his own notebooks."],
    [1912,"Clerk at the Madras Port Trust",""],
    [1913,"Letter to Hardy","Sends G. H. Hardy pages of formulas. Hardy decides they 'must be true, because no one would have the imagination to invent them'."],
    [1914,"Cambridge","Works with Hardy and Littlewood."],
    [1918,"The partition formula","With Hardy, an asymptotic formula for p(n) by the circle method. Elected Fellow of the Royal Society."],
    [1919,"Partition congruences","p(5n+4) ≡ 0 (mod 5), p(7n+5) ≡ 0 (mod 7), p(11n+6) ≡ 0 (mod 11)."],
    [1920,"Dies at 32","In Kumbakonam, after returning to India ill. His last letter describes mock theta functions."]
  ],
  works:[
    [1918,"Asymptotic formulæ in combinatory analysis (with G. H. Hardy)",null]
  ]},

{ id:"birkhoff", name:"Garrett Birkhoff", born:1911, died:1996, y:1935,
  dom:["order","algebra"], fields:["lattices","universal-algebra","boolean"],
  role:"American mathematician at Harvard",
  epitaph:"Made lattices and universal algebra into subjects of their own.",
  legacy:"His Lattice Theory (1940) and the HSP theorem founded universal algebra. With Saunders Mac Lane he wrote A Survey of Modern Algebra (1941), which taught abstract algebra to generations of students. His father, George David Birkhoff, proved the ergodic theorem.",
  life:[
    [1911,"Born in Princeton","Son of the mathematician George D. Birkhoff."],
    [1933,"On the combination of subalgebras","Lattice theory in its modern form."],
    [1935,"The HSP theorem","A class of algebras is defined by equations exactly when it is closed under homomorphic images, subalgebras and products."],
    [1940,"Lattice Theory","The book that defined the field."],
    [1941,"A Survey of Modern Algebra","With Saunders Mac Lane."],
    [1996,"Dies in Water Mill, New York",""]
  ],
  works:[
    [1940,"Lattice Theory (AMS Colloquium Publications 25)",null]
  ]},

{ id:"godel", name:"Kurt Gödel", born:1906, died:1978, y:1931,
  dom:["foundations"], fields:["logic","set-theory","computability"],
  role:"Austrian-American logician",
  epitaph:"Proved that every consistent system rich enough for arithmetic has true statements it cannot prove.",
  legacy:"Incompleteness ended Hilbert's programme and, through Turing, led to the theory of computation. Gödel also showed that the axiom of choice and the continuum hypothesis cannot be disproved from the other axioms of set theory (1938–40), and found a rotating universe in Einstein's equations as a birthday present for his friend.",
  life:[
    [1906,"Born in Brno","Then Brünn, in Austria-Hungary."],
    [1929,"The completeness theorem","Doctoral thesis in Vienna: first-order logic proves every valid sentence."],
    [1930,"Königsberg","Mentions incompleteness at a round table; John von Neumann grasps it at once."],
    [1931,"On formally undecidable propositions","The incompleteness theorems."],
    [1938,"The constructible universe L","The axiom of choice and the continuum hypothesis are consistent with ZF."],
    [1940,"Princeton","Escapes across Siberia to the Institute for Advanced Study; walks home each day with Einstein."],
    [1949,"A rotating universe","A solution of general relativity with closed timelike curves."],
    [1978,"Dies in Princeton","Of self-starvation, fearing poison."]
  ],
  works:[
    [1931,"Über formal unentscheidbare Sätze der Principia Mathematica und verwandter Systeme I","https://doi.org/10.1007/BF01700692"]
  ]},

{ id:"kolmogorov", name:"Andrey Kolmogorov", born:1903, died:1987, y:1933,
  dom:["probability","analysis","foundations"], fields:["prob-spaces","limit-theorems","stochastic-processes","dynamical-systems","harmonic-analysis"],
  role:"Soviet mathematician",
  epitaph:"Turned probability into measure theory with a handful of axioms.",
  legacy:"Kolmogorov also founded the modern theory of turbulence (1941), the KAM theorem in dynamics (1954) and algorithmic information theory (1965) — and as a student built a Fourier series that diverges almost everywhere. In later life he poured his energy into school education.",
  life:[
    [1903,"Born in Tambov",""],
    [1922,"A divergent Fourier series","At 19: an integrable function whose Fourier series diverges almost everywhere (everywhere, in 1926)."],
    [1933,"Grundbegriffe der Wahrscheinlichkeitsrechnung","The axioms of probability."],
    [1941,"Turbulence","The −5⁄3 law for the energy spectrum of turbulent flow."],
    [1954,"KAM","Invariant tori survive small perturbations (completed by Arnold and Moser)."],
    [1958,"Entropy in dynamics","The Kolmogorov–Sinai entropy."],
    [1965,"Algorithmic complexity","Information as the length of the shortest description."],
    [1987,"Dies in Moscow",""]
  ],
  works:[
    [1933,"Grundbegriffe der Wahrscheinlichkeitsrechnung (Foundations of the Theory of Probability)",null]
  ]},

{ id:"turing", name:"Alan Turing", born:1912, died:1954, y:1936,
  dom:["foundations"], fields:["computability","logic"],
  role:"English mathematician and logician",
  epitaph:"Defined what an algorithm is — and proved there are problems no algorithm can solve.",
  legacy:"The Turing machine is the standard definition of computation. His codebreaking at Bletchley Park, his 1950 question 'Can machines think?' and his late work on morphogenesis each founded a field. Prosecuted for homosexuality in 1952, he died two years later; the UK government apologised in 2009. He is on the Bank of England £50 note.",
  life:[
    [1912,"Born in London",""],
    [1936,"On Computable Numbers","Turing machines, the universal machine, and the undecidability of Hilbert's Entscheidungsproblem."],
    [1938,"PhD at Princeton","Under Alonzo Church, on ordinal logics."],
    [1939,"Bletchley Park","Designs the Bombe to break Enigma."],
    [1950,"Computing Machinery and Intelligence","The imitation game."],
    [1952,"Morphogenesis","Reaction–diffusion equations for patterns in nature. The same year he is convicted of 'gross indecency'."],
    [1954,"Dies in Wilmslow","Of cyanide poisoning, aged 41."]
  ],
  works:[
    [1936,"On Computable Numbers, with an Application to the Entscheidungsproblem","https://doi.org/10.1112/plms/s2-42.1.230"]
  ]},

// ---------------- the structural age ----------------
{ id:"erdos", name:"Paul Erdős", born:1913, died:1996, y:1947,
  dom:["discrete","number","probability"], fields:["ramsey","graph-theory","analytic-nt","prob-spaces"],
  role:"Hungarian mathematician",
  epitaph:"Wrote about 1,500 papers with more than 500 co-authors, living out of a suitcase.",
  legacy:"The Erdős number — your collaboration distance to him — maps the social web of mathematics. The probabilistic method he pioneered is now a standard tool, and the cash prizes he offered for open problems still motivate research.",
  life:[
    [1913,"Born in Budapest","Both parents teach mathematics."],
    [1932,"Bertrand's postulate","At 19, a new elementary proof that there is always a prime between n and 2n."],
    [1935,"Erdős–Szekeres","The 'happy ending problem', and a first bound for Ramsey numbers."],
    [1940,"Erdős–Kac","The number of prime factors follows a bell curve."],
    [1947,"The probabilistic method","Proves R(k, k) > 2^{k/2} without constructing anything."],
    [1949,"The elementary prime number theorem","With Atle Selberg, a proof without complex analysis — and a priority quarrel."],
    [1959,"Random graphs","With Alfréd Rényi, founds the theory of random graphs."],
    [1996,"Dies in Warsaw","At a conference, still working."]
  ],
  works:[
    [1947,"Some remarks on the theory of graphs","https://doi.org/10.1090/S0002-9904-1947-08785-1"]
  ]},

{ id:"grothendieck", name:"Alexander Grothendieck", born:1928, died:2014, y:1960,
  dom:["geometry","algebra","foundations"], fields:["algebraic-geometry","commutative-algebra","category-theory","homological-algebra"],
  role:"Stateless French mathematician, born in Berlin",
  epitaph:"Rebuilt algebraic geometry from the ground up — then walked away from mathematics.",
  legacy:"Schemes, topoi, étale cohomology and the 'rising sea' style — solving problems by building general theories until they dissolve — transformed mathematics. His ideas carried Deligne's proof of the Weil conjectures (1974) and underlie Wiles's proof of Fermat's Last Theorem.",
  life:[
    [1928,"Born in Berlin","His father, an anarchist, later dies in Auschwitz."],
    [1940,"Internment","Survives the war in France, partly in the Rieucros camp with his mother."],
    [1953,"Functional analysis","Thesis on topological tensor products and nuclear spaces."],
    [1957,"The Tôhoku paper","Abelian categories and derived functors: homological algebra reorganised."],
    [1958,"IHÉS and schemes","Begins the EGA and SGA: schemes, étale cohomology, topoi."],
    [1966,"Fields Medal","Refuses to travel to Moscow to receive it, in protest at Soviet military action."],
    [1970,"Leaves the IHÉS","Over its military funding; turns to ecology and pacifism."],
    [1991,"Withdraws","Disappears to a village in the Pyrenees."],
    [2014,"Dies in Saint-Girons",""]
  ],
  works:[
    [1957,"Sur quelques points d'algèbre homologique (the Tôhoku paper)",null],
    [1960,"Éléments de géométrie algébrique (with Jean Dieudonné)",null]
  ]},

// ---------------- the modern frontier ----------------
{ id:"perelman", name:"Grigori Perelman", born:1966, died:null, y:2003,
  dom:["geometry","analysis"], fields:["low-dim-topology","differential-geometry","pdes"],
  role:"Russian mathematician",
  epitaph:"Proved the Poincaré conjecture — and turned down both the Fields Medal and a million dollars.",
  legacy:"Perelman posted three papers on arXiv in 2002–03 that completed Richard Hamilton's Ricci-flow programme and proved Thurston's geometrization conjecture, which contains the Poincaré conjecture. It is the only Millennium Prize Problem solved so far. He has since withdrawn from mathematics.",
  life:[
    [1966,"Born in Leningrad",""],
    [1982,"Olympiad gold","A perfect score at the International Mathematical Olympiad."],
    [1994,"The soul conjecture","Proves Cheeger and Gromoll's conjecture in a few pages."],
    [2002,"The entropy formula for the Ricci flow","The first of three arXiv preprints."],
    [2003,"Ricci flow with surgery","The other two preprints complete the proof."],
    [2006,"Declines the Fields Medal","'I'm not interested in money or fame.'"],
    [2010,"Declines the Millennium Prize","Saying Hamilton's contribution was no less than his own."]
  ],
  works:[
    [2002,"The entropy formula for the Ricci flow and its geometric applications","https://arxiv.org/abs/math/0211159"],
    [2003,"Ricci flow with surgery on three-manifolds","https://arxiv.org/abs/math/0303109"],
    [2003,"Finite extinction time for the solutions to the Ricci flow on certain three-manifolds","https://arxiv.org/abs/math/0307245"]
  ]},

{ id:"mirzakhani", name:"Maryam Mirzakhani", born:1977, died:2017, y:2014,
  dom:["geometry","analysis"], fields:["differential-geometry","low-dim-topology","algebraic-geometry","dynamical-systems"],
  role:"Iranian mathematician at Stanford",
  epitaph:"The first woman to win the Fields Medal, for the geometry and dynamics of Riemann surfaces.",
  legacy:"Her work on moduli spaces joined hyperbolic geometry, dynamics and algebraic geometry. With Alex Eskin (and later Amir Mohammadi) she proved a 'magic wand' theorem about orbits in moduli space. Her birthday, 12 May, is celebrated as International Day of Women in Mathematics.",
  life:[
    [1977,"Born in Tehran",""],
    [1994,"Olympiad gold","Gold at the International Mathematical Olympiad; a perfect score the next year."],
    [2004,"PhD at Harvard","Under Curtis McMullen: counts simple closed geodesics on hyperbolic surfaces, and gives a new proof of Witten's conjecture along the way."],
    [2008,"Stanford","Professor of mathematics."],
    [2013,"The magic wand theorem","With Alex Eskin (and Amir Mohammadi, 2015): orbit closures in moduli space are algebraic."],
    [2014,"Fields Medal","The first woman and the first Iranian to receive it."],
    [2017,"Dies at 40","Of breast cancer."]
  ],
  works:[
    [2007,"Simple geodesics and Weil–Petersson volumes of moduli spaces of bordered Riemann surfaces","https://doi.org/10.1007/s00222-006-0013-2"]
  ]},

];
