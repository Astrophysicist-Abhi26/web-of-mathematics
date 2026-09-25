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
  dom:["number","probability","analysis"], fields:["elementary-nt","diophantine","prob-spaces","variations","computational-nt"],
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
  dom:["number","geometry","analysis"], fields:["elementary-nt","algebraic-nt","differential-geometry","complex-analysis","statistics"],
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
  dom:["foundations","analysis"], fields:["set-theory","real-analysis","fractals"],
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
  dom:["foundations"], fields:["computability","logic","computational-nt"],
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
  dom:["discrete","number","probability"], fields:["ramsey","graph-theory","analytic-nt","prob-spaces","additive-combinatorics"],
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
// ================================================================
// more pioneers, by era (the gallery and constellation sort by y)
// ================================================================

// ---------------- the ancient world ----------------
{ id:"diophantus", name:"Diophantus of Alexandria", born:null, died:null, dates:"fl. c. 250 CE", y:250,
  dom:["number","algebra"], fields:["diophantine","elementary-nt"],
  role:"Greek mathematician in Alexandria",
  epitaph:"Solved equations in whole and rational numbers — and began writing them in symbols.",
  legacy:"His Arithmetica, of which six of thirteen books survive in Greek and four more in Arabic, inspired Fermat, whose margin note in a 1621 Latin edition became Fermat's Last Theorem. A 'Diophantine equation' now means any polynomial equation to be solved in integers.",
  life:[
    [250,"Arithmetica","Some 130 problems solved in positive rational numbers, with an abbreviated notation for the unknown and its powers — a step from words towards algebraic symbols."],
    [250,"His age as a riddle","A later epigram says his boyhood lasted a sixth of his life, his beard grew after a twelfth more, … — which gives 84 years."],
    [1621,"Bachet's Latin edition","The edition in which Fermat wrote his famous note."],
    [1968,"Lost books found","Four more books are identified in an Arabic manuscript in Mashhad."]
  ],
  works:[[250,"Arithmetica",null]]},

{ id:"hypatia", name:"Hypatia of Alexandria", born:355, died:415, dates:"c. 355–415", y:400,
  dom:["geometry","number"], fields:["classical-geometry","diophantine"],
  role:"Greek mathematician, astronomer and philosopher in Alexandria",
  epitaph:"The first woman mathematician whose life is well recorded.",
  legacy:"None of her writings survives under her name, but she is believed to have edited her father Theon's commentary on Ptolemy's Almagest and written commentaries on Diophantus's Arithmetica and Apollonius's Conics. For many later writers her murder marked the end of classical Alexandria.",
  life:[
    [355,"Born in Alexandria (c. 355)","Taught by her father, the mathematician Theon."],
    [390,"Teacher","Heads the city's Neoplatonist school; students travel from across the Mediterranean to hear her."],
    [400,"Commentaries","On Diophantus and Apollonius, and work with Theon on Ptolemy's astronomical tables."],
    [415,"Murdered","Killed by a Christian mob during a political struggle in the city."]
  ],
  works:[]},

// ---------------- the medieval flowering ----------------
{ id:"brahmagupta", name:"Brahmagupta", born:598, died:668, dates:"598 – c. 668", y:628,
  dom:["number","algebra"], fields:["elementary-nt","diophantine","ring-theory"],
  role:"Indian mathematician and astronomer",
  epitaph:"Wrote down the rules of arithmetic with zero and negative numbers.",
  legacy:"His Brāhmasphuṭasiddhānta treats zero as a number and gives rules for 'fortunes' and 'debts' — positive and negative numbers. His composition rule for Pell's equation x² − Ny² = 1 grew, in Bhāskara II's hands (1150), into a complete method; Europe found it again with Fermat, Euler and Lagrange.",
  life:[
    [598,"Born","Probably in Bhillamala, Rajasthan."],
    [628,"Brāhmasphuṭasiddhānta","Rules for zero (a + 0 = a, a × 0 = 0) and for negatives ('a debt times a debt is a fortune'), quadratic equations, and the area of a cyclic quadrilateral."],
    [628,"Pell's equation","A composition law that builds new solutions of x² − Ny² = 1 from old ones."],
    [665,"Khaṇḍakhādyaka","A practical handbook of astronomy."],
    [668,"Dies c. 668",""]
  ],
  works:[[628,"Brāhmasphuṭasiddhānta",null]]},

{ id:"khayyam", name:"Omar Khayyam", born:1048, died:1131, y:1070,
  dom:["algebra","geometry"], fields:["galois-theory","classical-geometry"],
  role:"Persian mathematician, astronomer and poet",
  epitaph:"Solved cubic equations by intersecting conic sections — and wrote the Rubáiyát.",
  legacy:"His Treatise on the Demonstration of Problems of Algebra (c. 1070) classified equations up to degree three and solved every cubic as an intersection of conics. His Jalali calendar (1079) was more accurate than the Gregorian calendar adopted five centuries later. In the West he is best known for the quatrains translated by Edward FitzGerald.",
  life:[
    [1048,"Born in Nishapur",""],
    [1070,"Treatise on algebra","Classifies cubics and solves them geometrically, hoping someone will one day find an algebraic solution."],
    [1077,"Euclid's parallel postulate","A commentary on its difficulties, using the quadrilaterals later studied by Saccheri."],
    [1079,"The Jalali calendar","Leads the observatory at Isfahan."],
    [1131,"Dies in Nishapur",""]
  ],
  works:[[1070,"Treatise on the Demonstration of Problems of Algebra and Muqabala",null]]},

{ id:"fibonacci", name:"Leonardo of Pisa (Fibonacci)", born:1170, died:1250, dates:"c. 1170 – c. 1250", y:1202,
  dom:["number","discrete"], fields:["enumerative","elementary-nt"],
  role:"Italian mathematician from Pisa",
  epitaph:"Brought Hindu–Arabic numerals to Europe — and a rabbit problem that never stopped breeding.",
  legacy:"Liber Abaci (1202) persuaded European merchants to adopt decimal place value. Its rabbit problem gives 1, 1, 2, 3, 5, 8, 13, …, the Fibonacci numbers, whose ratios approach the golden ratio φ.",
  life:[
    [1170,"Born in Pisa (c. 1170)","Leonardo, son of Guglielmo Bonacci, a merchant."],
    [1185,"Bugia, North Africa","Learns Hindu–Arabic numerals while his father runs a trading post."],
    [1202,"Liber Abaci","Arithmetic, bookkeeping, and the rabbit problem."],
    [1225,"Liber Quadratorum","The Book of Squares, dedicated to Emperor Frederick II."],
    [1240,"Honoured by Pisa","The republic grants him a salary for his services to the city."],
    [1250,"Dies c. 1250",""]
  ],
  works:[[1202,"Liber Abaci",null]]},

{ id:"madhava", name:"Mādhava of Saṅgamagrāma", born:1340, died:1425, dates:"c. 1340 – c. 1425", y:1400,
  dom:["analysis"], fields:["real-analysis","harmonic-analysis"],
  role:"Indian mathematician and astronomer, founder of the Kerala school",
  epitaph:"Found infinite series for π, sine and cosine two centuries before Europe.",
  legacy:"Mādhava's series π/4 = 1 − 1/3 + 1/5 − …, and the power series for sine, cosine and arctangent, survive through later Kerala texts such as Jyeṣṭhadeva's Yuktibhāṣā (c. 1530). Europe rediscovered them with Gregory, Newton and Leibniz in the 1660s–70s.",
  life:[
    [1340,"Born in Saṅgamagrāma, Kerala (c. 1340)",""],
    [1400,"Infinite series","π/4 = 1 − 1/3 + 1/5 − 1/7 + …, with correction terms that make it converge fast; series for sine, cosine and arctangent."],
    [1400,"π to 11 decimals","Using an accelerated series."],
    [1425,"Dies c. 1425",""],
    [1530,"Yuktibhāṣā","Jyeṣṭhadeva writes down proofs of the Kerala series in Malayalam."]
  ],
  works:[]},

// ---------------- renaissance & the new algebra ----------------
{ id:"cardano", name:"Gerolamo Cardano", born:1501, died:1576, y:1545,
  dom:["algebra","probability"], fields:["galois-theory","prob-spaces"],
  role:"Italian physician, mathematician and gambler",
  epitaph:"Published the solution of the cubic — and met the square root of a negative number.",
  legacy:"Ars Magna (1545) gave the first printed solutions of cubic and quartic equations, crediting del Ferro, Tartaglia and his student Ferrari. His Book on Games of Chance, published in 1663, is the first systematic treatment of probability.",
  life:[
    [1501,"Born in Pavia",""],
    [1539,"Tartaglia's secret","Persuades Niccolò Tartaglia to reveal his solution of the cubic, under an oath of secrecy."],
    [1545,"Ars Magna","Publishes it anyway, having seen del Ferro's earlier solution, with Ferrari's solution of the quartic. Meets √−15 and calls it 'as subtle as it is useless'."],
    [1564,"On games of chance","Probability as favourable cases over all cases (published 1663)."],
    [1570,"Imprisoned","By the Inquisition, for casting the horoscope of Jesus."],
    [1576,"Dies in Rome",""]
  ],
  works:[[1545,"Ars Magna",null]]},

{ id:"descartes", name:"René Descartes", born:1596, died:1650, y:1637,
  dom:["geometry","algebra"], fields:["algebraic-geometry","classical-geometry"],
  role:"French philosopher and mathematician",
  epitaph:"Married algebra to geometry: a curve is an equation.",
  legacy:"La Géométrie, an appendix to his Discourse on Method (1637), introduced coordinates, the use of x, y, z for unknowns and a, b, c for constants, and exponent notation x². It made calculus possible a generation later.",
  life:[
    [1596,"Born in La Haye, Touraine",""],
    [1619,"Three dreams","On 10 November, near Ulm, dreams that set him searching for a universal method."],
    [1628,"The Dutch Republic","Lives there for twenty years."],
    [1637,"La Géométrie","Geometry by algebra, and the rule of signs for counting positive roots."],
    [1649,"Stockholm","Invited to tutor Queen Christina — at five in the morning."],
    [1650,"Dies in Stockholm","Of pneumonia."]
  ],
  works:[[1637,"La Géométrie (appendix to the Discours de la méthode)",null]]},

// ---------------- the age of calculus ----------------
{ id:"bernoulli", name:"Jacob Bernoulli", born:1655, died:1705, y:1713,
  dom:["probability","analysis"], fields:["limit-theorems","variations","enumerative"],
  role:"Swiss mathematician in Basel",
  epitaph:"Proved the first law of large numbers: frequencies settle down.",
  legacy:"Ars Conjectandi (1713) founded probability as mathematics, with Bernoulli trials, Bernoulli numbers and the law of large numbers. The Bernoulli family produced eight notable mathematicians; Jacob's feud with his brother Johann was as famous as their work.",
  life:[
    [1655,"Born in Basel",""],
    [1683,"Compound interest","Studying continuous compounding, meets the number e = lim (1 + 1/n)ⁿ."],
    [1687,"Professor at Basel","Teaches his younger brother Johann."],
    [1690,"The word 'integral'","First used in print, in his solution of the isochrone problem."],
    [1697,"The brachistochrone rivalry","Solves his brother's problem and poses harder ones: the calculus of variations begins."],
    [1705,"Dies in Basel","He asked for a logarithmic spiral on his tombstone, with 'Eadem mutata resurgo'; the mason carved an Archimedean one."],
    [1713,"Ars Conjectandi","Published after his death: the law of large numbers."]
  ],
  works:[[1713,"Ars Conjectandi",null]]},

{ id:"lagrange", name:"Joseph-Louis Lagrange", born:1736, died:1813, y:1788,
  dom:["analysis","algebra","number"], fields:["variations","group-theory","elementary-nt","odes"],
  role:"Italian-French mathematician, born in Turin",
  epitaph:"Rewrote mechanics without a single diagram.",
  legacy:"Mécanique analytique (1788) turned mechanics into the calculus of variations; its preface boasts that no figures will be found in it. His 1770–71 study of why equations of degree five resist solution prepared the ground for Galois, and he led the commission that created the metric system.",
  life:[
    [1736,"Born in Turin",""],
    [1755,"The δ-method","At 19 sends Euler his method for the calculus of variations; Euler adopts it."],
    [1766,"Berlin","Succeeds Euler at Frederick the Great's academy."],
    [1770,"Four squares; roots of equations","Proves every positive integer is a sum of four squares, and studies permutations of the roots of equations."],
    [1788,"Mécanique analytique","Mechanics from the principle of least action."],
    [1794,"École Polytechnique","First professor of analysis at the new school."],
    [1813,"Dies in Paris","Buried in the Panthéon."]
  ],
  works:[[1788,"Mécanique analytique",null]]},

{ id:"laplace", name:"Pierre-Simon Laplace", born:1749, died:1827, y:1812,
  dom:["probability","analysis"], fields:["prob-spaces","limit-theorems","pdes","statistics"],
  role:"French mathematician and astronomer",
  epitaph:"Turned probability into a calculus for reasoning under uncertainty.",
  legacy:"Théorie analytique des probabilités (1812) proved a general central limit theorem and developed Bayesian inference; the Laplace transform and Laplace's equation Δu = 0 run through physics. Asked by Napoleon why his Mécanique céleste never mentions God, he is said to have replied: 'I had no need of that hypothesis.'",
  life:[
    [1749,"Born in Beaumont-en-Auge",""],
    [1774,"Inverse probability","Rediscovers Bayes's rule and uses it to reason from effects to causes."],
    [1785,"Laplace's equation","Potential theory: Δu = 0."],
    [1799,"Mécanique céleste","Five volumes (1799–1825) on the stability of the solar system."],
    [1810,"The central limit theorem","The normal law for sums of many independent errors."],
    [1812,"Théorie analytique des probabilités",""],
    [1827,"Dies in Paris",""]
  ],
  works:[[1812,"Théorie analytique des probabilités",null]]},

{ id:"fourier", name:"Joseph Fourier", born:1768, died:1830, y:1807,
  dom:["analysis"], fields:["harmonic-analysis","pdes"],
  role:"French mathematician and physicist",
  epitaph:"Claimed any function is a sum of sines — and was nearly right.",
  legacy:"His heat equation and his trigonometric series (1807) forced mathematicians to ask what a function is and when a series converges, driving the rigour of Dirichlet, Riemann and Cantor. The Fourier transform now runs through signal processing, quantum mechanics and every JPEG.",
  life:[
    [1768,"Born in Auxerre","Orphaned at nine."],
    [1798,"Egypt","Scientific adviser on Napoleon's expedition."],
    [1807,"On the propagation of heat in solid bodies","Trigonometric series presented to the Academy; Lagrange objects."],
    [1811,"Prize essay","Wins the Academy's prize, though the jury complains of a lack of rigour."],
    [1822,"Théorie analytique de la chaleur","The book that made Fourier series famous."],
    [1824,"The greenhouse effect","Argues the atmosphere keeps the Earth warmer than it would otherwise be."],
    [1830,"Dies in Paris",""]
  ],
  works:[[1822,"Théorie analytique de la chaleur",null]]},

// ---------------- the age of rigour ----------------
{ id:"germain", name:"Sophie Germain", born:1776, died:1831, y:1816,
  dom:["number","analysis"], fields:["diophantine","elementary-nt","pdes"],
  role:"French mathematician",
  epitaph:"Taught herself mathematics against her family's wishes, and made the first big attack on Fermat's Last Theorem.",
  legacy:"Sophie Germain primes (p with 2p + 1 also prime) come from her attack on Fermat: her theorem settled the 'first case' for every prime exponent below 100. Her prize-winning work on vibrating elastic plates helped found elasticity theory. Gauss recommended her for an honorary degree at Göttingen, but she died before it could be awarded.",
  life:[
    [1776,"Born in Paris",""],
    [1789,"The death of Archimedes","Reading how Archimedes was killed while absorbed in geometry, she decides to study mathematics — by candlelight, against her parents' wishes."],
    [1794,"Monsieur Le Blanc","Obtains lecture notes from the École Polytechnique, closed to women, and submits work under a male student's name."],
    [1804,"Letters to Gauss","Writes to Gauss under the same pseudonym; he learns who she is in 1806 and praises her courage."],
    [1816,"The Academy's prize","For the theory of vibrating elastic plates — the first woman to win it."],
    [1825,"Fermat's Last Theorem","Legendre publishes her theorem on the first case."],
    [1831,"Dies in Paris",""]
  ],
  works:[]},

{ id:"lobachevsky", name:"Nikolai Lobachevsky", born:1792, died:1856, y:1829,
  dom:["geometry"], fields:["classical-geometry","differential-geometry"],
  role:"Russian mathematician at Kazan",
  epitaph:"Published the first non-Euclidean geometry — and was ignored for the rest of his life.",
  legacy:"His 'imaginary geometry', in which infinitely many parallels pass through a point, was mocked in Russia and barely read abroad. Beltrami's models (1868) showed it is exactly as consistent as Euclid's. Gauss, who had reached the same ideas privately, praised it in letters but never in print.",
  life:[
    [1792,"Born in Nizhny Novgorod",""],
    [1807,"Kazan University","Student, then professor for forty years."],
    [1826,"The lecture","Presents his new geometry to the Kazan faculty (the manuscript is lost)."],
    [1827,"Rector","Of Kazan University for nineteen years; fights the 1830 cholera epidemic."],
    [1829,"On the principles of geometry","Published in the Kazan Messenger."],
    [1840,"Geometrische Untersuchungen","A German summary, which Gauss reads."],
    [1855,"Pangeometry","Dictated after he has gone blind."],
    [1856,"Dies in Kazan",""]
  ],
  works:[[1829,"On the Principles of Geometry",null]]},

{ id:"abel", name:"Niels Henrik Abel", born:1802, died:1829, y:1824,
  dom:["algebra","analysis"], fields:["galois-theory","complex-analysis","group-theory"],
  role:"Norwegian mathematician",
  epitaph:"Proved the quintic cannot be solved by radicals, and died in poverty at 26.",
  legacy:"Commutative groups are called abelian in his honour, and the Abel Prize, awarded since 2003, is mathematics' highest lifetime award. His work on elliptic integrals founded the theory of elliptic and abelian functions.",
  life:[
    [1802,"Born near Stavanger","Son of a pastor."],
    [1824,"The quintic","In a six-page pamphlet printed at his own expense, proves the general equation of degree five cannot be solved by radicals."],
    [1826,"Berlin and Paris","Crelle publishes him in the first volume of his new journal; the memoir he submits in Paris is mislaid."],
    [1827,"Elliptic functions","Inverts elliptic integrals, in a race with Jacobi."],
    [1829,"Dies at 26","Of tuberculosis, at Froland. Two days later a letter arrives offering him a professorship in Berlin."],
    [2003,"The Abel Prize","First awarded, to Jean-Pierre Serre."]
  ],
  works:[]},

{ id:"hamilton", name:"William Rowan Hamilton", born:1805, died:1865, y:1843,
  dom:["algebra","analysis","geometry"], fields:["linear-algebra","variations","differential-geometry"],
  role:"Irish mathematician, physicist and astronomer",
  epitaph:"Carved the rules of the quaternions into a Dublin bridge.",
  legacy:"Quaternions were the first number system to give up commutativity, opening the door to modern algebra; they now rotate objects in video games and spacecraft. Hamiltonian mechanics, from his 1834 reformulation, became the language of quantum mechanics and symplectic geometry.",
  life:[
    [1805,"Born in Dublin","A prodigy in languages as well as mathematics."],
    [1827,"Royal Astronomer of Ireland","Appointed while still an undergraduate at Trinity College Dublin."],
    [1834,"Hamiltonian mechanics","Dynamics from a single function and his equations of motion."],
    [1843,"Quaternions","On 16 October, walking by the Royal Canal, finds i² = j² = k² = ijk = −1 and carves it into Broom Bridge."],
    [1853,"Lectures on Quaternions",""],
    [1865,"Dies in Dublin",""]
  ],
  works:[]},

{ id:"weierstrass", name:"Karl Weierstrass", born:1815, died:1897, y:1861,
  dom:["analysis"], fields:["real-analysis","complex-analysis"],
  role:"German mathematician in Berlin",
  epitaph:"The father of modern analysis: made ε and δ the rules of the game.",
  legacy:"Weierstrass's Berlin lectures set the standard of rigour for analysis: ε–δ definitions, uniform convergence, and a continuous function that is nowhere differentiable (1872). His students included Sofia Kovalevskaya, Georg Cantor and Hermann Schwarz.",
  life:[
    [1815,"Born in Ostenfelde, Westphalia",""],
    [1838,"Leaves Bonn without a degree","After four years of fencing and drinking."],
    [1841,"Schoolteacher","Teaches in provincial schools, doing research at night."],
    [1854,"Abelian functions","A paper in Crelle's journal makes him famous overnight."],
    [1856,"Berlin",""],
    [1861,"ε–δ lectures","His Berlin course gives analysis its rigorous form."],
    [1872,"A monster","A continuous function that is nowhere differentiable."],
    [1897,"Dies in Berlin",""]
  ],
  works:[]},

{ id:"kronecker", name:"Leopold Kronecker", born:1823, died:1891, y:1853,
  dom:["number","algebra"], fields:["algebraic-nt","galois-theory"],
  role:"German mathematician in Berlin",
  epitaph:"'God made the integers; all else is the work of man.'",
  legacy:"Kronecker's theorem that abelian extensions of ℚ lie in cyclotomic fields (the Kronecker–Weber theorem), and his 'dearest dream of youth' about imaginary quadratic fields, became Hilbert's twelfth problem and class field theory. His insistence on finite constructions made him Cantor's fiercest critic and a forerunner of constructive mathematics.",
  life:[
    [1823,"Born in Liegnitz",""],
    [1845,"Doctorate in Berlin","Then years running the family's estate and business."],
    [1853,"Abelian equations","Every abelian extension of ℚ lies inside a cyclotomic field."],
    [1861,"Berlin Academy","Lectures at the University as an Academy member."],
    [1882,"Divisor theory","An arithmetic theory of algebraic quantities."],
    [1887,"Splitting fields","Builds field extensions as quotients of polynomial rings."],
    [1891,"Dies in Berlin",""]
  ],
  works:[]},

{ id:"dedekind", name:"Richard Dedekind", born:1831, died:1916, y:1872,
  dom:["algebra","number","analysis","order"], fields:["ring-theory","algebraic-nt","real-analysis","lattices"],
  role:"German mathematician in Brunswick",
  epitaph:"Built the real numbers from cuts, and gave algebra its ideals.",
  legacy:"Dedekind cuts (1872), ideals (1871), axioms for the natural numbers (1888) and early lattice theory (1897): much of the conceptual vocabulary of modern algebra is his. He was a close friend and correspondent of Cantor.",
  life:[
    [1831,"Born in Brunswick",""],
    [1852,"Doctorate under Gauss","Gauss's last doctoral student."],
    [1858,"Zürich","Teaching calculus, decides the real numbers need a proper foundation."],
    [1871,"Ideals","In his supplements to Dirichlet's lectures on number theory."],
    [1872,"Continuity and Irrational Numbers","Dedekind cuts."],
    [1888,"What are numbers and what should they be?","Axioms for the natural numbers and a definition of infinite sets."],
    [1897,"Dual groups","Lattices, under another name."],
    [1916,"Dies in Brunswick",""]
  ],
  works:[[1872,"Stetigkeit und irrationale Zahlen (Continuity and Irrational Numbers)",null]]},

{ id:"kovalevskaya", name:"Sofia Kovalevskaya", born:1850, died:1891, y:1874,
  dom:["analysis"], fields:["pdes","odes"],
  role:"Russian mathematician in Stockholm",
  epitaph:"The first woman in modern Europe to earn a doctorate in mathematics, and to hold a full professorship.",
  legacy:"The Cauchy–Kovalevskaya theorem guarantees analytic solutions of analytic PDEs; the Kovalevskaya top (1888) is one of the few integrable cases of a spinning rigid body. She also wrote novels and a memoir of her childhood.",
  life:[
    [1850,"Born in Moscow","As a child, studies the calculus lecture notes papering one wall of her room."],
    [1868,"A marriage of convenience","Marries Vladimir Kovalevsky so that she can study abroad."],
    [1870,"Berlin","Barred from the university, is taught privately by Weierstrass."],
    [1874,"Doctorate from Göttingen","Awarded in absentia, for three papers including the Cauchy–Kovalevskaya theorem."],
    [1884,"Stockholm","Lecturer, then (1889) full professor."],
    [1888,"The Prix Bordin","The Paris Academy's prize, raised because of the quality of her work on the rotating top."],
    [1891,"Dies at 41","Of pneumonia, in Stockholm."]
  ],
  works:[]},

{ id:"lie", name:"Sophus Lie", born:1842, died:1899, y:1873,
  dom:["algebra","geometry"], fields:["lie-theory","odes","differential-geometry"],
  role:"Norwegian mathematician",
  epitaph:"Turned continuous symmetry into algebra: Lie groups and Lie algebras.",
  legacy:"Lie wanted a Galois theory for differential equations. What he found — continuous groups of transformations and their infinitesimal generators — became Lie groups and Lie algebras, the mathematics of symmetry in modern physics.",
  life:[
    [1842,"Born in Nordfjordeid",""],
    [1870,"Paris with Klein","Arrested as a spy at the start of the Franco-Prussian war; his mathematical notes are taken for a code."],
    [1872,"Professor in Christiania (Oslo)",""],
    [1873,"Continuous groups","Transformation groups and their infinitesimal generators."],
    [1886,"Leipzig","Succeeds Klein."],
    [1888,"Theorie der Transformationsgruppen","Three volumes (1888–93) with Friedrich Engel."],
    [1899,"Dies in Christiania",""]
  ],
  works:[]},

{ id:"klein", name:"Felix Klein", born:1849, died:1925, y:1872,
  dom:["geometry","algebra"], fields:["classical-geometry","group-theory","low-dim-topology","modular-forms"],
  role:"German mathematician at Göttingen",
  epitaph:"A geometry is what a group of symmetries leaves unchanged.",
  legacy:"Klein's Erlangen programme (1872) organised geometry by symmetry groups. He built models of non-Euclidean geometry, described the Klein bottle (1882), studied modular functions, and made Göttingen a world centre of mathematics and of teaching reform. He also fought for women's admission to German universities.",
  life:[
    [1849,"Born in Düsseldorf",""],
    [1871,"Models of non-Euclidean geometry","Hyperbolic geometry lives inside projective geometry."],
    [1872,"The Erlangen programme","Published on his appointment at Erlangen, aged 23."],
    [1882,"The Klein bottle","A closed surface with no inside."],
    [1884,"Lectures on the icosahedron","Symmetry and the quintic equation."],
    [1886,"Göttingen","With Hilbert, builds the world's leading mathematics department."],
    [1925,"Dies in Göttingen",""]
  ],
  works:[]},

{ id:"poincare", name:"Henri Poincaré", born:1854, died:1912, y:1895,
  dom:["geometry","analysis"], fields:["algebraic-topology","dynamical-systems","odes","low-dim-topology","complex-analysis"],
  role:"French mathematician, physicist and philosopher",
  epitaph:"Founded topology and discovered chaos.",
  legacy:"Analysis Situs (1895) created algebraic topology — homology and the fundamental group — and led to the Poincaré conjecture, solved by Perelman in 2003. His work on the three-body problem found chaotic motion. He was one of the last mathematicians to master the whole subject.",
  life:[
    [1854,"Born in Nancy",""],
    [1881,"Qualitative theory of ODEs","Curves defined by differential equations, studied geometrically."],
    [1882,"Fuchsian functions","Realises, stepping onto a bus, that they come from non-Euclidean geometry."],
    [1889,"The three-body prize","Wins King Oscar's prize; an error found before printing leads him to chaotic orbits."],
    [1895,"Analysis Situs","Homology and the fundamental group; the Poincaré conjecture follows in 1904."],
    [1905,"Relativity","On the dynamics of the electron, weeks after Einstein."],
    [1912,"Dies in Paris",""]
  ],
  works:[]},

// ---------------- the foundational crisis ----------------
{ id:"frege", name:"Gottlob Frege", born:1848, died:1925, y:1879,
  dom:["foundations"], fields:["logic"],
  role:"German logician and philosopher in Jena",
  epitaph:"Invented modern logic, and saw his life's work shaken by one letter.",
  legacy:"Frege's Begriffsschrift (1879) introduced quantifiers and a fully formal language for proof. His plan to derive arithmetic from logic collapsed when Russell found a paradox in his axioms (1902), but his logic and his philosophy of language founded analytic philosophy.",
  life:[
    [1848,"Born in Wismar",""],
    [1879,"Begriffsschrift","Predicate logic with quantifiers."],
    [1884,"The Foundations of Arithmetic","Numbers as classes of equinumerous concepts."],
    [1893,"Basic Laws of Arithmetic, volume I",""],
    [1902,"Russell's letter","Arrives as volume II is in press: Basic Law V is contradictory. 'Arithmetic totters.'"],
    [1925,"Dies in Bad Kleinen",""]
  ],
  works:[]},

{ id:"russell", name:"Bertrand Russell", born:1872, died:1970, y:1901,
  dom:["foundations"], fields:["logic","set-theory","type-theory"],
  role:"British philosopher, logician and campaigner",
  epitaph:"Found the paradox at the heart of naive set theory: the set of all sets that do not contain themselves.",
  legacy:"Russell's paradox (1901) triggered the foundational crisis. His theory of types, and Principia Mathematica (1910–13) with Whitehead, tried to rebuild mathematics on logic; the proposition from which 1 + 1 = 2 follows appears on page 379 of volume I. He won the Nobel Prize in Literature in 1950.",
  life:[
    [1872,"Born in Trellech, Wales","Grandson of a prime minister."],
    [1901,"The paradox","Let R be the set of all sets that are not members of themselves. Is R a member of R?"],
    [1902,"Letter to Frege",""],
    [1908,"The theory of types","Sets stratified by level to block the paradox."],
    [1910,"Principia Mathematica","Three volumes (1910–13) with A. N. Whitehead."],
    [1950,"Nobel Prize in Literature",""],
    [1970,"Dies in Wales","Aged 97."]
  ],
  works:[]},

{ id:"zermelo", name:"Ernst Zermelo", born:1871, died:1953, y:1908,
  dom:["foundations"], fields:["set-theory"],
  role:"German mathematician",
  epitaph:"Wrote the axioms of set theory — and made the Axiom of Choice explicit.",
  legacy:"Zermelo's 1904 proof that every set can be well-ordered made the Axiom of Choice explicit and controversial. His 1908 axioms, extended by Fraenkel and Skolem, became ZFC, the standard foundation of mathematics. He also proved an early theorem of game theory (1913): chess is determined.",
  life:[
    [1871,"Born in Berlin",""],
    [1904,"The well-ordering theorem","Every set can be well-ordered, using the Axiom of Choice."],
    [1908,"Axioms for set theory","Designed to avoid Russell's paradox."],
    [1913,"Chess","Either White can force a win, or Black can, or either side can force a draw."],
    [1930,"Models of set theory","The cumulative hierarchy."],
    [1935,"Forced out","Refuses to give the Hitler salute and loses his Freiburg post."],
    [1953,"Dies in Freiburg",""]
  ],
  works:[]},

{ id:"hausdorff", name:"Felix Hausdorff", born:1868, died:1942, y:1914,
  dom:["geometry","foundations","analysis"], fields:["point-set-topology","set-theory","measure-theory","fractals"],
  role:"German mathematician — and, as Paul Mongré, a poet and playwright",
  epitaph:"Wrote the axioms for topological spaces.",
  legacy:"Grundzüge der Mengenlehre (1914) defined topological and metric spaces as we use them today; Hausdorff spaces, Hausdorff dimension (1918) and the Hausdorff paradox carry his name. Facing deportation by the Nazis, he, his wife and her sister took their own lives in 1942.",
  life:[
    [1868,"Born in Breslau",""],
    [1897,"Paul Mongré","Publishes philosophy, poetry and later a play under a pseudonym."],
    [1914,"Grundzüge der Mengenlehre","Topological spaces from neighbourhood axioms."],
    [1914,"The Hausdorff paradox","A sphere, minus a countable set, split into pieces that make two copies — the ancestor of Banach–Tarski."],
    [1918,"Hausdorff dimension","A dimension that can be a fraction."],
    [1935,"Forced to retire","Under the Nazi racial laws."],
    [1942,"Dies in Bonn","With his wife and her sister, the night before their deportation."]
  ],
  works:[]},

{ id:"lebesgue", name:"Henri Lebesgue", born:1875, died:1941, y:1902,
  dom:["analysis"], fields:["measure-theory","real-analysis"],
  role:"French mathematician",
  epitaph:"Reinvented the integral: count the coins by value, not in the order they come out of your pocket.",
  legacy:"Lebesgue's integral (1902) measures how much of the domain sends f into each range of values, instead of chopping the domain into intervals. It handles limits gracefully — the dominated convergence theorem — and underlies Fourier analysis, probability and quantum mechanics.",
  life:[
    [1875,"Born in Beauvais",""],
    [1902,"Intégrale, longueur, aire","Doctoral thesis: Lebesgue measure and integral."],
    [1904,"Lessons on integration",""],
    [1905,"A doubter of choice","With Borel and Baire, questions Zermelo's Axiom of Choice."],
    [1910,"The Sorbonne",""],
    [1922,"Academy of Sciences",""],
    [1941,"Dies in Paris",""]
  ],
  works:[]},

{ id:"hardy", name:"G. H. Hardy", born:1877, died:1947, y:1918,
  dom:["number","analysis"], fields:["analytic-nt","partitions","harmonic-analysis"],
  role:"English mathematician at Cambridge and Oxford",
  epitaph:"Recognised Ramanujan's genius from a letter — 'the one romantic incident in my life'.",
  legacy:"With Littlewood, Hardy wrote nearly a hundred papers on analysis and number theory; with Ramanujan he created the circle method. His essay A Mathematician's Apology (1940) is the most famous defence of pure mathematics — though the 'useless' number theory he loved now secures the internet.",
  life:[
    [1877,"Born in Cranleigh, Surrey",""],
    [1911,"Hardy and Littlewood","Begin one of the most productive partnerships in mathematics."],
    [1913,"Ramanujan's letter","Recognises a genius and brings him to Cambridge."],
    [1914,"Infinitely many zeros","Proves that infinitely many zeros of ζ lie on the critical line."],
    [1918,"The circle method","With Ramanujan: the asymptotic formula for partitions."],
    [1940,"A Mathematician's Apology",""],
    [1947,"Dies in Cambridge",""]
  ],
  works:[[1940,"A Mathematician's Apology",null]]},

{ id:"brouwer", name:"L. E. J. Brouwer", born:1881, died:1966, y:1912,
  dom:["foundations","geometry"], fields:["logic","algebraic-topology"],
  role:"Dutch mathematician and philosopher",
  epitaph:"Proved the fixed-point theorem — then decided that proofs like it don't count.",
  legacy:"Brouwer's topology — the fixed-point theorem and the invariance of dimension (1910–12) — is classical. His intuitionism, which rejects the law of excluded middle for infinite collections, split the foundations of mathematics and lives on in constructive logic and type theory.",
  life:[
    [1881,"Born in Overschie",""],
    [1907,"On the foundations of mathematics","Doctoral thesis: mathematics as mental construction."],
    [1910,"Topology","Invariance of dimension and the fixed-point theorem (1910–12): every continuous map of a disc to itself fixes a point."],
    [1912,"Professor in Amsterdam",""],
    [1918,"Intuitionistic analysis","Analysis rebuilt without the excluded middle."],
    [1928,"The Annalen affair","Removed by Hilbert from the board of Mathematische Annalen."],
    [1966,"Dies in Blaricum","Struck by a car."]
  ],
  works:[]},

{ id:"banach", name:"Stefan Banach", born:1892, died:1945, y:1932,
  dom:["analysis"], fields:["functional-analysis","measure-theory"],
  role:"Polish mathematician in Lwów",
  epitaph:"Founded functional analysis — much of it at a table in a café.",
  legacy:"Banach's Théorie des opérations linéaires (1932) founded functional analysis; Banach spaces and the Hahn–Banach, Banach–Steinhaus and Banach fixed-point theorems are standard tools. The Lwów school recorded its problems in the 'Scottish Book' at the Scottish Café.",
  life:[
    [1892,"Born in Kraków",""],
    [1916,"Discovered","Hugo Steinhaus overhears him discussing the Lebesgue integral on a park bench."],
    [1920,"Doctorate","Complete normed spaces — Banach spaces (published 1922)."],
    [1924,"Banach–Tarski","With Alfred Tarski: the paradoxical decomposition of the ball."],
    [1932,"Théorie des opérations linéaires",""],
    [1935,"The Scottish Book","Problems written in a notebook at the Scottish Café, with prizes such as a live goose."],
    [1945,"Dies in Lwów","Having survived the occupation feeding lice for typhus research."]
  ],
  works:[]},

{ id:"vonneumann", name:"John von Neumann", born:1903, died:1957, y:1929,
  dom:["analysis","foundations","probability"], fields:["functional-analysis","set-theory","dynamical-systems"],
  role:"Hungarian-American mathematician",
  epitaph:"Gave quantum mechanics its mathematics, game theory its theorem, and the computer its architecture.",
  legacy:"Von Neumann ordinals, von Neumann algebras, the minimax theorem (1928), the mean ergodic theorem (1932) and the stored-program computer design (1945) are all his. Few mathematicians have worked across so many fields.",
  life:[
    [1903,"Born in Budapest",""],
    [1923,"Ordinals","Each ordinal is the set of all smaller ones."],
    [1928,"The minimax theorem","The first theorem of game theory."],
    [1929,"Hilbert space","Abstract Hilbert space and unbounded operators for quantum mechanics (the book follows in 1932)."],
    [1932,"The mean ergodic theorem",""],
    [1933,"Institute for Advanced Study","One of its first professors."],
    [1945,"The EDVAC report","The stored-program computer."],
    [1957,"Dies in Washington, DC",""]
  ],
  works:[]},

// ---------------- the structural age ----------------
{ id:"weil", name:"André Weil", born:1906, died:1998, y:1949,
  dom:["number","geometry"], fields:["algebraic-geometry","modular-forms","algebraic-nt"],
  role:"French mathematician",
  epitaph:"Proved the Riemann Hypothesis for curves while in prison — and co-founded Bourbaki.",
  legacy:"The Weil conjectures (1949) linked counting points over finite fields to topology and drove Grothendieck's rebuilding of algebraic geometry until Deligne finished them in 1974. As a founder of Bourbaki, Weil helped set the axiomatic style of 20th-century mathematics.",
  life:[
    [1906,"Born in Paris","Brother of the philosopher Simone Weil."],
    [1928,"Mordell–Weil","Rational points on abelian varieties form a finitely generated group."],
    [1935,"Bourbaki","Co-founds the collective that rewrites mathematics under a fictitious name."],
    [1940,"Prison","Jailed in Rouen for failing to report for military service; works out the Riemann Hypothesis for curves over finite fields."],
    [1949,"The Weil conjectures","For all varieties over finite fields."],
    [1958,"Institute for Advanced Study",""],
    [1998,"Dies in Princeton",""]
  ],
  works:[]},

{ id:"eilenberg", name:"Samuel Eilenberg", born:1913, died:1998, y:1945,
  dom:["foundations","algebra","geometry"], fields:["category-theory","homological-algebra","algebraic-topology"],
  role:"Polish-American mathematician",
  epitaph:"Invented category theory with Mac Lane, to say precisely what 'natural' means.",
  legacy:"The 1945 paper defining categories, functors and natural transformations was meant as a clarification for topologists; it became a language for all of mathematics. Eilenberg also axiomatised homology (with Steenrod) and wrote Homological Algebra (1956) with Henri Cartan.",
  life:[
    [1913,"Born in Warsaw",""],
    [1939,"America","Emigrates just before the war."],
    [1942,"Ext","With Mac Lane: group extensions and cohomology."],
    [1945,"General theory of natural equivalences","With Mac Lane: categories, functors, natural transformations."],
    [1952,"Foundations of Algebraic Topology","With Norman Steenrod: the axioms for homology."],
    [1956,"Homological Algebra","With Henri Cartan."],
    [1998,"Dies in New York",""]
  ],
  works:[[1945,"General theory of natural equivalences (with S. Mac Lane)",null]]},

{ id:"maclane", name:"Saunders Mac Lane", born:1909, died:2005, y:1945,
  dom:["foundations","algebra","order"], fields:["category-theory","homological-algebra","universal-algebra"],
  role:"American mathematician at Chicago",
  epitaph:"Co-invented category theory, and wrote the book that teaches it.",
  legacy:"Categories for the Working Mathematician (1971) is still the standard text. With Garrett Birkhoff he wrote A Survey of Modern Algebra (1941), and he championed categories as a foundation for mathematics.",
  life:[
    [1909,"Born in Taftville, Connecticut",""],
    [1934,"Doctorate at Göttingen","Leaves as the Nazis tear the department apart."],
    [1941,"A Survey of Modern Algebra","With Garrett Birkhoff."],
    [1945,"Categories","With Samuel Eilenberg."],
    [1963,"Coherence","Mac Lane's coherence theorem for monoidal categories."],
    [1971,"Categories for the Working Mathematician",""],
    [2005,"Dies in San Francisco",""]
  ],
  works:[[1971,"Categories for the Working Mathematician",null]]},

{ id:"chern", name:"Shiing-Shen Chern", born:1911, died:2004, y:1946,
  dom:["geometry"], fields:["fiber-bundles","differential-geometry"],
  role:"Chinese-American mathematician",
  epitaph:"Found the intrinsic proof of Gauss–Bonnet — and the Chern classes that measure how bundles twist.",
  legacy:"Chern classes are the basic invariants of complex vector bundles, used across geometry, topology and physics (Chern–Simons theory). Chern founded the Mathematical Sciences Research Institute in Berkeley (1982) and the Nankai Institute of Mathematics in China (1985).",
  life:[
    [1911,"Born in Jiaxing",""],
    [1936,"Doctorate in Hamburg","Under Wilhelm Blaschke; then a year with Élie Cartan in Paris."],
    [1944,"Gauss–Bonnet","An intrinsic proof for closed manifolds of any even dimension."],
    [1946,"Chern classes","Characteristic classes of complex vector bundles."],
    [1974,"Chern–Simons forms","With James Simons."],
    [1982,"MSRI","Founding director in Berkeley."],
    [2004,"Dies in Tianjin",""]
  ],
  works:[]},

{ id:"stone", name:"Marshall Stone", born:1903, died:1989, y:1936,
  dom:["order","analysis","geometry"], fields:["boolean","functional-analysis","point-set-topology"],
  role:"American mathematician",
  epitaph:"'One must always topologize.'",
  legacy:"Stone's representation theorem for Boolean algebras (1936), the Stone–Weierstrass theorem (1937) and the Stone–von Neumann theorem of quantum mechanics carry his name. As chair at Chicago (1946–52) he built one of the world's great mathematics departments.",
  life:[
    [1903,"Born in New York","Son of Harlan Fiske Stone, later Chief Justice of the United States."],
    [1926,"Doctorate at Harvard",""],
    [1932,"Linear Transformations in Hilbert Space","And Stone's theorem on one-parameter unitary groups."],
    [1936,"Stone duality","Boolean algebras as spaces."],
    [1937,"Stone–Weierstrass",""],
    [1946,"Chicago","Builds its department."],
    [1989,"Dies in Madras","While travelling in India."]
  ],
  works:[]},

{ id:"ito", name:"Kiyosi Itô", born:1915, died:2008, y:1944,
  dom:["probability","analysis"], fields:["stochastic-processes","pdes"],
  role:"Japanese mathematician",
  epitaph:"Made calculus work along random paths.",
  legacy:"Itô's stochastic integral and Itô's formula (1944–51) let mathematicians integrate and differentiate along Brownian motion, where ordinary calculus fails. The Black–Scholes formula of finance, stochastic control and much of mathematical physics rest on them. He received the first Gauss Prize (2006).",
  life:[
    [1915,"Born in Hokusei, Mie Prefecture",""],
    [1938,"Cabinet Statistics Bureau","A government statistician, studying Lévy's work."],
    [1942,"Stochastic differential equations","First published in Japanese, in a mimeographed journal."],
    [1944,"The Itô integral","Integrals with respect to Brownian motion."],
    [1951,"Itô's formula","The chain rule of stochastic calculus."],
    [2006,"Gauss Prize","The first."],
    [2008,"Dies in Kyoto",""]
  ],
  works:[]},

{ id:"nash", name:"John Nash", born:1928, died:2015, y:1950,
  dom:["analysis","geometry"], fields:["pdes","differential-geometry"],
  role:"American mathematician",
  epitaph:"An equilibrium in game theory, an embedding theorem in geometry, and regularity for PDEs.",
  legacy:"Nash's 28-page thesis on non-cooperative games (1950) earned the 1994 Nobel Prize in Economics; his embedding theorems showed every Riemannian manifold fits isometrically inside Euclidean space; his 1958 work on parabolic PDEs paralleled De Giorgi's. He recovered from decades of schizophrenia, a story told in A Beautiful Mind.",
  life:[
    [1928,"Born in Bluefield, West Virginia",""],
    [1950,"Non-cooperative games","Doctoral thesis at Princeton: the Nash equilibrium."],
    [1954,"Embedding theorems","C¹ (1954) and smooth (1956) isometric embeddings."],
    [1958,"Parabolic regularity","Hölder continuity for elliptic and parabolic equations (De Giorgi–Nash)."],
    [1959,"Illness","Schizophrenia takes hold for three decades."],
    [1994,"Nobel Prize in Economics",""],
    [2015,"Abel Prize","He and his wife Alicia die in a taxi crash days after the ceremony."]
  ],
  works:[]},

{ id:"arobinson", name:"Abraham Robinson", born:1918, died:1974, y:1961,
  dom:["foundations","analysis"], fields:["model-theory","real-analysis"],
  role:"German-born mathematician, working in Britain, Canada, Israel and the US",
  epitaph:"Made Leibniz's infinitesimals rigorous, 290 years late.",
  legacy:"Nonstandard analysis (1961) gives calculus with genuine infinitesimals, built with model theory. Robinson also founded model-theoretic algebra (model completeness) and worked on aircraft wing design in wartime Britain.",
  life:[
    [1918,"Born in Waldenburg",""],
    [1933,"Palestine","Emigrates with his family."],
    [1940,"Britain","Escapes France; joins the Free French air force, then works on aerodynamics at the Royal Aircraft Establishment."],
    [1949,"Doctorate in London","Model theory and algebra."],
    [1961,"Nonstandard analysis",""],
    [1966,"Non-standard Analysis (the book)",""],
    [1974,"Dies in New Haven",""]
  ],
  works:[]},

{ id:"juliarobinson", name:"Julia Robinson", born:1919, died:1985, y:1961,
  dom:["foundations","number"], fields:["computability","diophantine"],
  role:"American mathematician at Berkeley",
  epitaph:"Did the decisive groundwork on Hilbert's tenth problem.",
  legacy:"Robinson's hypothesis — that some Diophantine relation grows exponentially — was the key Matiyasevich supplied in 1970. She was the first woman elected to the mathematics section of the US National Academy of Sciences (1976) and the first woman president of the American Mathematical Society (1983).",
  life:[
    [1919,"Born in St Louis",""],
    [1948,"Doctorate at Berkeley","Under Alfred Tarski: the arithmetic of the rationals is undecidable."],
    [1950,"The exponential hypothesis","If one Diophantine relation grows exponentially, exponentiation itself is Diophantine."],
    [1961,"Davis–Putnam–Robinson","Exponential Diophantine equations are undecidable."],
    [1970,"The last step","Matiyasevich completes the proof."],
    [1976,"National Academy of Sciences",""],
    [1983,"President of the AMS",""],
    [1985,"Dies in Oakland",""]
  ],
  works:[]},

{ id:"serre", name:"Jean-Pierre Serre", born:1926, died:null, y:1955,
  dom:["geometry","algebra","number"], fields:["algebraic-geometry","algebraic-topology","modular-forms","homological-algebra"],
  role:"French mathematician",
  epitaph:"The youngest Fields medallist, and the first Abel laureate.",
  legacy:"Serre computed homotopy groups of spheres with spectral sequences (1951), brought sheaf cohomology to algebraic geometry (1955), and made the modularity conjectures that underlie Wiles's proof. His books, from A Course in Arithmetic to Linear Representations of Finite Groups, are models of clarity.",
  life:[
    [1926,"Born in Bages",""],
    [1951,"Thesis","Spectral sequences and homotopy groups of spheres."],
    [1954,"Fields Medal","At 27 — still the youngest ever."],
    [1955,"Faisceaux algébriques cohérents","Sheaves come to algebraic geometry."],
    [1956,"GAGA","Algebraic and analytic geometry agree on projective varieties."],
    [1987,"Serre's conjecture","On modular Galois representations; proved by Khare and Wintenberger (2008)."],
    [2003,"Abel Prize","The first."]
  ],
  works:[]},

{ id:"atiyah", name:"Michael Atiyah", born:1929, died:2019, y:1963,
  dom:["geometry","analysis"], fields:["fiber-bundles","algebraic-topology","pdes","differential-geometry"],
  role:"British-Lebanese mathematician",
  epitaph:"The index theorem: counting solutions of equations with topology.",
  legacy:"The Atiyah–Singer index theorem (1963) says the analytic index of an elliptic operator equals a topological formula — unifying Gauss–Bonnet, Riemann–Roch and more. Atiyah's K-theory and his work with physicists on gauge theory made him a bridge between mathematics and physics.",
  life:[
    [1929,"Born in London","Grows up in Sudan and Egypt."],
    [1961,"K-theory","With Friedrich Hirzebruch."],
    [1963,"The index theorem","With Isadore Singer."],
    [1966,"Fields Medal",""],
    [1978,"Instantons","The ADHM construction of Yang–Mills instantons."],
    [2004,"Abel Prize","With Singer."],
    [2019,"Dies in Edinburgh",""]
  ],
  works:[]},

{ id:"langlands", name:"Robert Langlands", born:1936, died:null, y:1967,
  dom:["number","algebra"], fields:["modular-forms","representation-theory","algebraic-nt"],
  role:"Canadian mathematician at the Institute for Advanced Study",
  epitaph:"Wrote a letter that became a grand unified theory of mathematics.",
  legacy:"In a 17-page letter to André Weil (1967), Langlands proposed deep correspondences between Galois representations in number theory and automorphic forms in harmonic analysis. The Langlands programme now spans number theory, representation theory, geometry and physics; a proof of the geometric Langlands conjecture was announced in 2024 by a team led by Dennis Gaitsgory and Sam Raskin.",
  life:[
    [1936,"Born in New Westminster, British Columbia",""],
    [1960,"Doctorate at Yale",""],
    [1967,"The letter to Weil","'If you are willing to read it as pure speculation I would appreciate that…'"],
    [1970,"Problems in the theory of automorphic forms","The programme in print."],
    [1972,"Institute for Advanced Study","Later in Einstein's old office."],
    [2018,"Abel Prize",""]
  ],
  works:[]},

{ id:"drinfeld", name:"Vladimir Drinfeld", born:1954, died:null, y:1974,
  dom:["number","algebra","geometry"], fields:["langlands","representation-theory","algebraic-geometry"],
  role:"Ukrainian-American mathematician at the University of Chicago",
  epitaph:"Proved the first big case of Langlands over function fields and invented quantum groups.",
  legacy:"Drinfeld's 'elliptic modules' and shtukas (1974–80) proved the Langlands correspondence for GL₂ over function fields; he founded the geometric Langlands programme, co-invented the ADHM construction of instantons and introduced quantum groups. Fields Medal 1990.",
  life:[
    [1954,"Born in Kharkiv",""],
    [1969,"International Mathematical Olympiad","Gold medal with a perfect score, aged 15."],
    [1974,"Elliptic modules","Now called Drinfeld modules: function-field analogues of elliptic curves."],
    [1978,"ADHM construction","With Atiyah, Hitchin and Manin: all instantons on the four-sphere, from linear algebra."],
    [1980,"Langlands for GL₂ over function fields","Built from moduli of shtukas."],
    [1986,"Quantum groups","His ICM address creates the subject."],
    [1990,"Fields Medal",""],
    [1998,"University of Chicago",""]
  ],
  works:[]},

{ id:"gaitsgory", name:"Dennis Gaitsgory", born:1973, died:null, y:2024,
  dom:["geometry","number","algebra"], fields:["langlands","algebraic-geometry","homological-algebra"],
  role:"Mathematician, director at the Max Planck Institute for Mathematics in Bonn",
  epitaph:"Led the proof of the geometric Langlands conjecture.",
  legacy:"Over two decades Gaitsgory built the derived-algebraic-geometry machinery that geometric Langlands required. In 2024 he, Sam Raskin and seven collaborators announced a proof of the conjecture in five papers of about 800 pages; he received the 2025 Breakthrough Prize in Mathematics.",
  life:[
    [1973,"Born in Chișinău",""],
    [1997,"Doctorate at Tel Aviv University","Under Joseph Bernstein."],
    [2005,"Professor at Harvard",""],
    [2021,"Max Planck Institute for Mathematics","Director, in Bonn."],
    [2024,"Geometric Langlands proved","With Arinkin, Beraldo, Campbell, Chen, Faergeman, Lin, Raskin and Rozenblyum."],
    [2025,"Breakthrough Prize in Mathematics",""]
  ],
  works:[]},

{ id:"cohen", name:"Paul Cohen", born:1934, died:2007, y:1963,
  dom:["foundations"], fields:["set-theory","logic"],
  role:"American mathematician at Stanford",
  epitaph:"Proved the continuum hypothesis can be neither proved nor disproved from the usual axioms.",
  legacy:"Cohen's forcing (1963) showed that the continuum hypothesis and the Axiom of Choice are independent of the other axioms of set theory, completing what Gödel began in 1938. Forcing became the central tool of set theory, and his remains the only Fields Medal awarded for work in logic.",
  life:[
    [1934,"Born in Long Branch, New Jersey",""],
    [1958,"Doctorate at Chicago","In harmonic analysis, not logic."],
    [1963,"Forcing","A method for building new models of set theory: the continuum hypothesis is independent of ZFC."],
    [1966,"Fields Medal",""],
    [2007,"Dies in Stanford",""]
  ],
  works:[[1963,"The independence of the continuum hypothesis (PNAS)","https://doi.org/10.1073/pnas.50.6.1143"]]},

{ id:"conway", name:"John Horton Conway", born:1937, died:2020, y:1970,
  dom:["discrete","algebra","geometry"], fields:["group-theory","low-dim-topology","enumerative"],
  role:"English mathematician at Cambridge and Princeton",
  epitaph:"Invented the Game of Life and found sporadic groups — and loved them equally.",
  legacy:"Conway found three sporadic simple groups (1968), invented surreal numbers, the Game of Life (1970), knot notation and the 'Doomsday' calendar rule, and co-wrote the ATLAS of Finite Groups. He died of COVID-19 in 2020.",
  life:[
    [1937,"Born in Liverpool",""],
    [1968,"Conway groups","Three sporadic simple groups from the symmetries of the Leech lattice."],
    [1970,"The Game of Life","A cellular automaton that turns out to be a universal computer."],
    [1974,"Surreal numbers","Numbers built from games; Knuth writes a novel about them."],
    [1985,"ATLAS of Finite Groups","With Curtis, Norton, Parker and Wilson."],
    [1987,"Princeton",""],
    [2020,"Dies in New Brunswick, New Jersey","Of COVID-19."]
  ],
  works:[]},

// ---------------- the modern frontier ----------------
{ id:"matiyasevich", name:"Yuri Matiyasevich", born:1947, died:null, y:1970,
  dom:["foundations","number"], fields:["computability","diophantine"],
  role:"Russian mathematician in St Petersburg",
  epitaph:"At 22, finished Hilbert's tenth problem: no algorithm can decide Diophantine equations.",
  legacy:"Matiyasevich showed (1970) that the exponential growth of the Fibonacci numbers can be captured by a Diophantine equation, completing the Davis–Putnam–Robinson programme. One consequence: there is a polynomial whose positive values, as its variables run over the natural numbers, are exactly the primes.",
  life:[
    [1947,"Born in Leningrad",""],
    [1970,"Hilbert's tenth problem","Computably enumerable sets are Diophantine."],
    [1976,"A prime-producing polynomial","Jones, Sato, Wada and Wiens write one down, in 26 variables."],
    [1993,"Hilbert's Tenth Problem","His book on the whole story."]
  ],
  works:[]},

{ id:"thurston", name:"William Thurston", born:1946, died:2012, y:1982,
  dom:["geometry"], fields:["low-dim-topology","differential-geometry"],
  role:"American mathematician",
  epitaph:"Saw that most three-dimensional spaces are hyperbolic.",
  legacy:"Thurston's geometrization conjecture (1982) said every 3-manifold splits into pieces carrying one of eight geometries; he proved it for Haken manifolds, and Perelman finished it in 2003. His essay On Proof and Progress in Mathematics (1994) is one of the best descriptions of how mathematicians actually think.",
  life:[
    [1946,"Born in Washington, DC",""],
    [1972,"Doctorate at Berkeley","On foliations."],
    [1976,"Hyperbolic 3-manifolds","The Princeton lectures that became The Geometry and Topology of Three-Manifolds."],
    [1982,"The geometrization conjecture","And a Fields Medal."],
    [1994,"On Proof and Progress in Mathematics",""],
    [2012,"Dies in Rochester, New York",""]
  ],
  works:[[1994,"On proof and progress in mathematics","https://arxiv.org/abs/math/9404236"]]},

{ id:"mandelbrot", name:"Benoit Mandelbrot", born:1924, died:2010, y:1980,
  dom:["analysis","geometry"], fields:["dynamical-systems","measure-theory","fractals"],
  role:"Polish-born French-American mathematician",
  epitaph:"Named the fractals and made them visible.",
  legacy:"The Fractal Geometry of Nature (1982) showed that coastlines, clouds and markets have fractional dimension. The Mandelbrot set, plotted by computer around 1980, became an icon of chaos theory and of mathematics itself.",
  life:[
    [1924,"Born in Warsaw",""],
    [1958,"IBM","Joins IBM Research for 35 years."],
    [1967,"How long is the coast of Britain?","Self-similarity and fractional dimension, in Science."],
    [1975,"'Fractal'","Coins the word, from the Latin fractus, broken."],
    [1980,"The Mandelbrot set","The c for which z ↦ z² + c stays bounded."],
    [1982,"The Fractal Geometry of Nature",""],
    [2010,"Dies in Cambridge, Massachusetts",""]
  ],
  works:[]},

{ id:"uhlenbeck", name:"Karen Uhlenbeck", born:1942, died:null, y:1982,
  dom:["analysis","geometry"], fields:["pdes","variations","fiber-bundles","differential-geometry"],
  role:"American mathematician",
  epitaph:"A founder of geometric analysis, and the first woman to win the Abel Prize.",
  legacy:"Uhlenbeck's analysis of harmonic maps (with Sacks, 1981) and of Yang–Mills connections (1982) — how solutions can concentrate and 'bubble' — became basic tools of geometric analysis and underpinned Donaldson's work on 4-manifolds. She co-founded programmes to support women in mathematics.",
  life:[
    [1942,"Born in Cleveland, Ohio",""],
    [1968,"Doctorate at Brandeis",""],
    [1981,"Bubbling","With Jonathan Sacks: minimal spheres and the bubbling phenomenon."],
    [1982,"Yang–Mills","Removable singularities and compactness for gauge fields."],
    [1990,"ICM plenary lecture","The second woman to give one, after Emmy Noether in 1932."],
    [2019,"Abel Prize","The first woman to receive it."]
  ],
  works:[]},

{ id:"wiles", name:"Andrew Wiles", born:1953, died:null, y:1994,
  dom:["number","geometry"], fields:["modular-forms","diophantine","algebraic-geometry"],
  role:"English mathematician at Princeton and Oxford",
  epitaph:"Proved Fermat's Last Theorem after seven years of work in secret.",
  legacy:"Wiles read about Fermat's Last Theorem at ten. His proof of the modularity of semistable elliptic curves (1994–95) settled it and opened the modern era of modularity. He received the Abel Prize in 2016.",
  life:[
    [1953,"Born in Cambridge",""],
    [1963,"A library book","Reads about Fermat's Last Theorem and decides to solve it."],
    [1986,"Ribet's theorem","Modularity would imply Fermat; he begins seven years of secret work."],
    [1993,"The announcement","Cambridge, June; in September a gap is found."],
    [1994,"The repair","On 19 September, with Richard Taylor's help, sees how to fix it."],
    [1995,"Published","Annals of Mathematics."],
    [2016,"Abel Prize",""]
  ],
  works:[[1995,"Modular elliptic curves and Fermat's Last Theorem","https://doi.org/10.2307/2118559"]]},

{ id:"tao", name:"Terence Tao", born:1975, died:null, y:2004,
  dom:["analysis","number","discrete"], fields:["harmonic-analysis","analytic-nt","ramsey","pdes","additive-combinatorics"],
  role:"Australian-American mathematician at UCLA",
  epitaph:"Proved, with Ben Green, that the primes contain arithmetic progressions of every length.",
  legacy:"Tao works across harmonic analysis, PDE, combinatorics and number theory. The Green–Tao theorem (2004), compressed sensing and his widely read blog made him the public face of modern mathematics; he is also a leading advocate of proof assistants and AI tools in research.",
  life:[
    [1975,"Born in Adelaide",""],
    [1988,"Olympiad gold","At 13, the youngest gold medallist ever."],
    [1996,"Doctorate at Princeton","Under Elias Stein."],
    [2004,"The Green–Tao theorem","Arbitrarily long arithmetic progressions of primes."],
    [2006,"Fields Medal",""],
    [2015,"The Erdős discrepancy problem","Solves a question Erdős asked in the 1930s."],
    [2023,"Formalisation","Leads a community formalisation in Lean of the polynomial Freiman–Ruzsa conjecture's proof within weeks."]
  ],
  works:[[2004,"The primes contain arbitrarily long arithmetic progressions (with B. Green)","https://arxiv.org/abs/math/0404188"]]},

{ id:"scholze", name:"Peter Scholze", born:1987, died:null, y:2012,
  dom:["geometry","number"], fields:["algebraic-nt","algebraic-geometry"],
  role:"German mathematician in Bonn",
  epitaph:"Perfectoid spaces: arithmetic geometry rebuilt at 24.",
  legacy:"Scholze's perfectoid spaces (2012) move problems between p-adic and characteristic-p worlds, reshaping arithmetic geometry. With Dustin Clausen he is developing condensed mathematics, a new way to combine topology and algebra; one of its key theorems was checked in the Lean proof assistant (the Liquid Tensor Experiment, 2021–22).",
  life:[
    [1987,"Born in Dresden",""],
    [2004,"Olympiad medals","A silver, then three golds (2005–07)."],
    [2012,"Perfectoid spaces","Doctoral thesis at Bonn."],
    [2012,"Professor at Bonn","At 24, the youngest full professor in Germany."],
    [2018,"Fields Medal",""],
    [2019,"Condensed mathematics","With Dustin Clausen."],
    [2022,"The Liquid Tensor Experiment","A key theorem verified in Lean by a community effort."]
  ],
  works:[[2012,"Perfectoid spaces","https://arxiv.org/abs/1111.4914"]]},

{ id:"viazovska", name:"Maryna Viazovska", born:1984, died:null, y:2016,
  dom:["geometry","number"], fields:["classical-geometry","modular-forms"],
  role:"Ukrainian mathematician at EPFL",
  epitaph:"Solved sphere packing in 8 and 24 dimensions with a magic modular form.",
  legacy:"Viazovska proved (2016) that the E₈ lattice gives the densest packing of spheres in eight dimensions, and, with Cohn, Kumar, Miller and Radchenko, the Leech lattice in twenty-four. The key was a 'magic function' built from modular forms. In 2022 she became the second woman to receive the Fields Medal.",
  life:[
    [1984,"Born in Kyiv",""],
    [2013,"Doctorate at Bonn",""],
    [2016,"Dimension 8","The E₈ lattice is the densest sphere packing in eight dimensions."],
    [2016,"Dimension 24","With Cohn, Kumar, Miller and Radchenko: the Leech lattice."],
    [2017,"EPFL","Professor in Lausanne."],
    [2022,"Fields Medal",""]
  ],
  works:[[2016,"The sphere packing problem in dimension 8","https://arxiv.org/abs/1603.04246"]]},
{ id:"bayes", name:"Thomas Bayes", born:1701, died:1761, dates:"c. 1701–1761", y:1763,
  dom:["probability"], fields:["statistics","prob-spaces"],
  role:"English statistician and Presbyterian minister",
  epitaph:"Showed how to update beliefs with evidence — in an essay he never published.",
  legacy:"Richard Price found Bayes's essay among his papers and presented it to the Royal Society in 1763. Laplace developed the method independently; today 'Bayesian' names a whole school of statistics and much of machine learning.",
  life:[
    [1701,"Born in London (c. 1701)","Son of a Nonconformist minister."],
    [1734,"Tunbridge Wells","Minister of the Presbyterian chapel there."],
    [1736,"A defence of fluxions","Answers Bishop Berkeley's attack on the logic of Newton's calculus."],
    [1742,"Fellow of the Royal Society",""],
    [1761,"Dies in Tunbridge Wells",""],
    [1763,"An Essay towards solving a Problem in the Doctrine of Chances","Published by Richard Price, two years after Bayes's death."]
  ],
  works:[[1763,"An Essay towards solving a Problem in the Doctrine of Chances","https://doi.org/10.1098/rstl.1763.0053"]]},

{ id:"dyson", name:"Freeman Dyson", born:1923, died:2020, y:1962,
  dom:["probability","number","discrete"], fields:["random-matrices","partitions","analytic-nt"],
  role:"English-American theoretical physicist and mathematician",
  epitaph:"Recognised the zeros of the zeta function as eigenvalues, over a cup of tea.",
  legacy:"Dyson unified the quantum electrodynamics of Feynman, Schwinger and Tomonaga (1949), founded much of random matrix theory, and as a student defined the rank of a partition to explain two of Ramanujan's congruences. He never took a PhD.",
  life:[
    [1923,"Born in Crowthorne, England",""],
    [1944,"The rank of a partition","As a Cambridge student, conjectures that the rank splits the partitions of 5n + 4 into five equal classes — proved by Atkin and Swinnerton-Dyer in 1954."],
    [1949,"Quantum electrodynamics","Shows the theories of Feynman, Schwinger and Tomonaga are equivalent."],
    [1953,"Institute for Advanced Study","Professor at Princeton for the rest of his career."],
    [1962,"The threefold way","Classifies random matrix ensembles and introduces Dyson Brownian motion."],
    [1972,"Tea with Montgomery","Recognises the pair correlation of zeta zeros as that of random unitary matrices."],
    [2020,"Dies in Princeton",""]
  ],
  works:[]},

{ id:"szemeredi", name:"Endre Szemerédi", born:1940, died:null, y:1975,
  dom:["discrete","number"], fields:["additive-combinatorics","ramsey","graph-theory"],
  role:"Hungarian mathematician",
  epitaph:"Proved that every dense set of whole numbers contains arbitrarily long arithmetic progressions.",
  legacy:"Szemerédi's theorem (1975), and the regularity lemma inside its proof, became central tools of combinatorics and inspired new proofs through ergodic theory, Fourier analysis and hypergraphs. He received the Abel Prize in 2012.",
  life:[
    [1940,"Born in Budapest","Studies medicine briefly and works in a factory before turning to mathematics."],
    [1970,"Doctorate in Moscow","Under Israel Gelfand."],
    [1975,"Szemerédi's theorem","Dense sets contain arbitrarily long progressions; the regularity lemma is born."],
    [1983,"Szemerédi–Trotter","A sharp bound on how often points and lines can meet, with William Trotter."],
    [2012,"Abel Prize",""]
  ],
  works:[]},

{ id:"gromov", name:"Mikhail Gromov", born:1943, died:null, y:1987,
  dom:["geometry","algebra"], fields:["geometric-group-theory","differential-geometry","group-theory"],
  role:"Russian-French mathematician at the IHÉS",
  epitaph:"Taught mathematicians to look at groups — and spaces — from very far away.",
  legacy:"Gromov's h-principle, polynomial growth theorem (1981), pseudoholomorphic curves (1985), hyperbolic groups (1987) and his notion of convergence for metric spaces reshaped geometry, symplectic topology and group theory. He received the Abel Prize in 2009.",
  life:[
    [1943,"Born in Boksitogorsk, USSR",""],
    [1969,"The h-principle","When a geometric problem has a formal solution, it often has a genuine one."],
    [1974,"Emigrates","Leaves the Soviet Union; from 1982 a permanent professor at the IHÉS near Paris."],
    [1981,"Polynomial growth","Groups of polynomial growth are virtually nilpotent."],
    [1985,"Pseudoholomorphic curves","Founds modern symplectic topology, with the non-squeezing theorem."],
    [1987,"Hyperbolic groups","The essay that created geometric group theory."],
    [2009,"Abel Prize",""]
  ],
  works:[]},

{ id:"voevodsky", name:"Vladimir Voevodsky", born:1966, died:2017, y:2009,
  dom:["foundations","geometry"], fields:["type-theory","algebraic-geometry","homological-algebra"],
  role:"Russian-American mathematician at the Institute for Advanced Study",
  epitaph:"Won a Fields Medal for motivic cohomology — then rebuilt the foundations of mathematics so that computers could check them.",
  legacy:"Voevodsky's motivic cohomology proved the Milnor conjecture and, with Markus Rost, the Bloch–Kato conjecture. Worried by errors in published proofs, including one of his own, he turned to foundations and proposed univalent foundations — homotopy type theory.",
  life:[
    [1966,"Born in Moscow",""],
    [1992,"PhD at Harvard","Under David Kazhdan, admitted without an undergraduate degree."],
    [1996,"The Milnor conjecture","Proved with motivic cohomology."],
    [2002,"Fields Medal",""],
    [2009,"The univalence axiom","A foundation in which equivalent structures are equal."],
    [2013,"The HoTT Book","Written collectively during the special year at the Institute for Advanced Study."],
    [2017,"Dies in Princeton",""]
  ],
  works:[]},

];
