/* Contenu du site (textes, images, projets).
   BILINGUE : tout texte peut s'écrire { fr: "…", en: "…" }. Une simple chaîne
   "…" s'affiche à l'identique dans les deux langues (noms propres, dates...).
   Les chemins d'images ne se traduisent pas. Pour modifier un texte, une
   expérience ou un projet : tout se passe ici, pas besoin de toucher au
   HTML ou au JS. Si une image ne charge pas, un espace réservé neutre
   s'affiche automatiquement (voir js/render.js). */

window.SITE_DATA = {

    // Profil / CV (colonne de gauche de la page EXPÉRIENCES)
    profile: {
        name: "Pablo Varo",
        // CV par langue. Quand tu auras une version anglaise, dépose-la dans cv/ et
        // remplace le chemin "en" (ex. "cv/Pablo-Varo-CV-en.pdf").
        cv: { fr: "cv/Pablo-Varo-CV.pdf", en: "cv/Pablo-Varo-CV.pdf" },
        role: { fr: "Étudiant en Architecture", en: "Architecture student" },
        bio: { fr: "Étudiant en architecture à l’ENSASE, je m'appuie sur la rigueur du sol, la sensibilité du déjà là avec la maîtrise des outils contemporains de conception. J’explore le passage de l'analyse territoriale au détail constructif, avec une attention particulière portée à la simplicité, des choses, sans superflu. Ce qui est paradoxalement difficile à faire parfois. Mais aussi à la modularité des choses et des espaces.", en: "Architecture student at ENSASE, I build on the rigour of the ground and the sensitivity of what is already there, combined with command of contemporary design tools. I explore the passage from territorial analysis to constructional detail, with particular attention to simplicity, to things without superfluity — which is, paradoxically, sometimes hard to achieve — and to the modularity of objects and spaces." },
        contact: {
            address: "Saint-Étienne, France",
            // Email et téléphone stockés sous forme de codes de caractères plutôt
            // qu'en texte brut : ça évite qu'un robot spammeur les moissonne en
            // scannant simplement ce fichier, sans rien changer pour un recruteur
            // humain (js/render.js les décode et fabrique un lien mailto/tel normal,
            // cliquable, exactement comme avant).
            emailParts: [112, 97, 98, 108, 111, 118, 97, 114, 111, 64, 111, 114, 97, 110, 103, 101, 46, 102, 114],
            phoneParts: [43, 51, 51, 32, 55, 32, 52, 57, 32, 51, 57, 32, 49, 57, 32, 55, 50],
            permit: { fr: "Permis B", en: "Driving licence (category B)" }
        },
        formation: [
            { year: "2026", label: { fr: "2e année de Licence en Architecture, ENSASE", en: "2nd year of Bachelor’s degree in Architecture, ENSASE" } },
            { year: "2024", label: { fr: "1re année de Licence Histoire de l'Art & Archéologie, Lyon 2", en: "1st year of Bachelor’s degree in Art History & Archaeology, Lyon 2" } },
            { year: "2023", label: { fr: "Baccalauréat — Spécialités Maths, Physique-Chimie, SVT", en: "French Baccalauréat — Specialisations: Mathematics, Physics-Chemistry, Life & Earth Sciences" } }
        ],
        software: ["AutoCAD", "Rhino", { fr: "Impression 3D", en: "3D printing" }, { fr: "Découpe Laser", en: "Laser cutting" }, "QGIS"],
        languages: [{ fr: "Anglais (Courant)", en: "English (Fluent)" }, { fr: "Espagnol (Bilingue)", en: "Spanish (Bilingual)" }, { fr: "Français (Bilingue)", en: "French (Bilingual)" }]
    },

    // Expériences (chronologie sur la page EXPÉRIENCES, du plus récent au plus ancien).
    // "images": tableau d'URLs — vide [] = pas de galerie, sinon le survol du
    // titre révèle "Voir la galerie" et un clic l'ouvre.
    experiences: [
        {
            id: "terre-crue",
            period: { fr: "Intersemestre 2025-26", en: "Intersemester 2025-26" },
            title: { fr: "Construction en terre crue", en: "Raw earth construction" },
            subtitle: "ENSASE • Saint-Étienne",
            description: { fr: "Découverte et expérimentations de différentes techniques de la construction en terre avec 2 architectes/maçons spécialistes", en: "Introduction to and experimentation with different earth-building techniques, led by two specialist architect-masons." },
            detail: { fr: "Bauge, pisé, torchis, adobe, isolation en terre paille et en terre-allégée.", en: "Cob, rammed earth, wattle and daub, adobe, straw-clay and light-earth insulation." },
            images: [
                "img/terre/bauge.webp",
                "img/terre/adobe.webp",
                "img/terre/fresque.webp",
                "img/terre/barquette.webp",
                "img/terre/paille.webp",
                "img/terre/terre_paille.webp",
                "img/terre/iso_face.webp",
                "img/terre/tas.webp",
                "img/terre/planche.webp",
            ]
        },
        {
            id: "imhotep",
            period: "2025-26",
            title: { fr: "Président de l'Association Imhotep", en: "President of the Imhotep Association" },
            subtitle: "ENSASE • Saint-Étienne",
            description: { fr: "Distribution de denrées alimentaires et produits hygiéniques, organisation de divers projets. En partenariat avec l'ENSASE et des entreprises locales.", en: "Distribution of food and hygiene products, and organisation of various projects, in partnership with ENSASE and local businesses." },
            detail: { fr: "Distribution de produits alimentaires et d'hygiène, friperie autonome, repas.", en: "Food and hygiene product distribution, self-service thrift shop, shared meals." },
            images: []
        },
        {
            id: "taille-pierre",
            period: "07/2025",
            title: { fr: "Chantier de Taille de Pierre et Maçonnerie", en: "Stone Carving and Masonry Work Camp" },
            subtitle: { fr: "Porterie de l'Abbaye de Morimond • Rempart", en: "Gatehouse of Morimond Abbey • Rampart" },
            description: { fr: "Apprentissage et pratique des techniques de construction traditionnelles en pierre.", en: "Learning and practising traditional stone construction techniques." },
            detail: { fr: "Fabrication de mortier, montage de murs, terrassement, taille de pierre.", en: "Mortar making, wall building, earthworks, stone carving." },
            images: [
                "img/morimond/taille.webp",
                "img/morimond/niveau.webp",
                "img/morimond/pose.webp",
                "img/morimond/joints.webp",
                "img/morimond/remplissage.webp",
                "img/morimond/niveau.webp",
                "img/morimond/angle.webp"
            ]
        },
        {
            id: "voyage-philippines",
            period: "07/2024",
            title: { fr: "Voyage Humanitaire — Scouts et Guides de France", en: "Humanitarian Trip — Scouts et Guides de France" },
            subtitle: { fr: "Philippines (Projet Scout depuis 10 ans)", en: "Philippines (Scout project running for 10 years)" },
            description: { fr: "Travail dans une ferme biologique en partageant la vie locale.", en: "Work on an organic farm, sharing in local life." },
            detail: { fr: "Recherche de partenaires et de financements, planification du projet, vinaigre de bois, greffe, engrais, marcottage, plantation de divers fruits et légumes.", en: "Partner and funding search, project planning, wood vinegar, grafting, fertiliser, layering, planting of various fruits and vegetables." },
            images: [
                "img/philippines/class.webp",
                "img/philippines/riz.webp",
                "img/philippines/sillon.webp",
                "img/philippines/graines.webp",
                "img/philippines/plantes.webp",
                "img/philippines/vers.webp",
                "img/philippines/vinaigre.webp",
                "img/philippines/photo.webp"
            ]
        },
        {
            id: "stage-agence",
            period: "05/2023",
            title: { fr: "Stage en Agence d'Architecture", en: "Internship at an Architecture Firm" },
            subtitle: "83 Arquitectos • Madrid",
            description: { fr: "Découverte du métier d'architecte en agence et des différents projets : Maison individuelle, restauration de façade, restaurant.", en: "Introduction to the profession of architect in a firm and to various projects: single-family house, façade restoration, restaurant." },
            detail: { fr: "Recherche de références, réflexion du projet par la maquette", en: "Reference research, developing the project through models" },
            images: []
        },
        {
            id: "stage-menuiserie",
            period: "04/2020",
            title: { fr: "Stage en Menuiserie", en: "Carpentry Internship" },
            subtitle: "Axilom • Carpentras",
            description: { fr: "Apprentissage des outils, des machines et des techniques de menuiserie.", en: "Learning carpentry tools, machines and techniques." },
            detail: "",
            images: []
        }
    ],

    // Projets (page PROJETS). Chaque catégorie s'affiche dans une grille dont
    // le nombre de colonnes correspond au nombre d'éléments. L'"id" doit
    // rester unique : il gère la page de détail.
    //
    // "detail" alimente la page de détail (mise en page "Cartouche") :
    //   - year / semester / teacher / location / manifesto : données d'en-tête
    //   - description : texte d'intention (2 à 4 phrases : programme, site, parti pris).
    //                   Une chaîne, ou un tableau de chaînes pour plusieurs paragraphes.
    //                   Laisser "" pour ne rien afficher.
    //   - hero        : image d'en-tête, cadre portrait (10:13), recadrée (object-cover)
    //   - heroFit     : "cover" (défaut) ou "contain" — utiliser "contain" si l'image
    //                   hero est un plan/une planche (jamais recadrée, quelle que soit l'orientation)
    //   - process     : tableau de { image, caption } — croquis/schémas, cadre carré (1:1), recadrée
    //   - technical   : tableau de { image, caption } — plans/coupes, affichées entières (object-contain)
    //   - technicalOrientation : "portrait" (défaut) ou "landscape" — affecte seulement la mise en
    //                   page (paires côte à côte en portrait, un grand dessin par écran en landscape)
    //   - tectonic    : image (ou tableau d'images) — détail constructif, affichée entière
    //
    // Seuls le hero par défaut, les vignettes de grille et le process recadrent
    // l'image (object-cover) : si l'export n'a pas exactement le bon ratio, le
    // dépassement est coupé. Le hero en mode "contain", le technical et le
    // tectonic ne sont eux jamais recadrés, quel que soit leur format d'origine.
    //
    // VISIONNEUSE (clic sur un plan/une coupe) :
    //   Chaque item de "technical" (et le champ "tectonic") peut recevoir un
    //   champ optionnel "pdf" : cliquer sur l'image ouvre alors le PDF original
    //   dans un nouvel onglet (toujours net, contrairement au JPG affiché).
    //   Exemple :
    //       technical: [
    //           { image: "img/plan_s2.webp", pdf: "pdf/plan_s2.pdf", caption: { fr: "Plan de rez-de-chaussée", en: "Ground floor plan" } }
    //       ],
    //       tectonic: "img/coupe_pers_s2.webp",
    //       tectonicPdf: "pdf/coupe_pers_s2.pdf"
    //   Mets tes PDF dans un dossier "pdf/" à la racine (à créer), à côté de "img/".
    projects: {
        conception: [
            {
                id: "conception-01",
                title: { fr: "Logement pour 3 personnes", en: "Housing for 3 people" },
                meta: { fr: "L1 — S2", en: "Y1 — S2" },
                image: "img/coloc/maquette.webp",
                alt: { fr: "Projet de conception 01", en: "Design project 01" },
                detail: {
                    year: "2024-2025",
                    semester: { fr: "L1 — S2", en: "Year 1 — Semester 2" },
                    teacher: "Sébastien MARTINEZ-BARAT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "“Less is enough”, Pier Vittorio Aureli",
                    description: { fr: "", en: "" },
                    hero: "img/coloc/detail.webp",
                    technical: [
                        { image: "img/coloc/plan.webp", caption: "Plan" },
                        { image: "img/coloc/elevation.webp", caption: { fr: "Élévation", en: "Elevation" } }
                    ],
                    technicalOrientation: "landscape",
                    tectonic: "img/coloc/pers.webp"
                }
            },
            {
                id: "conception-02",
                title: { fr: "Extension de l'école de Jacquard (Saint-Étienne)", en: "Extension of the Jacquard school (Saint-Étienne)" },
                meta: { fr: "L2 — S3", en: "Y2 — S3" },
                image: "img/ecole/maquette_site.webp",
                alt: { fr: "Projet de conception 02", en: "Design project 02" },
                detail: {
                    year: "2025-2026",
                    semester: { fr: "L2 — S3", en: "Year 2 — Semester 3" },
                    teacher: "Jérôme GLAIROUX",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: { fr: "la conservation de l'existant. En le dupliquant, l'extension s'élance dans le parc pour s'y ancrer.", en: "preserving the existing. By duplicating it, the extension reaches out into the park to anchor itself there." },
                    description: { fr: "", en: "" },
                    hero: "img/ecole/maquette.webp",
                    process: [
                        { image: "img/ecole/dedoublement.webp", caption: { fr: "Intention initiale", en: "Initial intention" } },
                        { image: "img/ecole/circulation.webp", caption: "Circulation" },
                        { image: "img/ecole/axo.webp", caption: { fr: "Axonométrie", en: "Axonometry" } }
                    ],
                    technical: [
                        { image: "img/ecole/plan_rez_de_chausse.webp", caption: { fr: "Plan de rez-de-chaussée", en: "Ground floor plan" } },
                        { image: "img/ecole/coupes.webp", caption: { fr: "Coupes", en: "Sections" } }
                    ],
                    technicalOrientation: "landscape",
                    tectonic: "img/ecole/plan_etages.webp"
                }
            },
            {
                id: "conception-03",
                title: { fr: "Salle polyvalente et café (Saint-Victor-sur-Loire)", en: "Multipurpose hall and café (Saint-Victor-sur-Loire)" },
                meta: { fr: "L2 — S4", en: "Y2 — S4" },
                image: "img/cafe/maquette_site.webp",
                alt: { fr: "Projet de conception 03", en: "Design project 03" },
                detail: {
                    year: "2025-2026",
                    semester: { fr: "L2 — S4", en: "Year 2 — Semester 4" },
                    teacher: "Séverin PERREAULT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: { fr: "Rester dans le village, c'est poursuivre le chemin de ronde et y fixer le projet. Enterrer et poser.", en: "To stay within the village is to continue the wall walk and fix the project to it. Bury and place." },
                    description: { fr: "", en: "" },
                    hero: "img/cafe/maquette.webp",
                    process: [
                        { image: "img/cafe/installer.webp", caption: { fr: "Installer", en: "Install" } },
                        { image: "img/cafe/integrer.webp", caption: { fr: "Intégrer", en: "Integrate" } },
                        { image: "img/cafe/organiser.webp", caption: { fr: "Organiser", en: "Organise" } }
                    ],
                    technical: [
                        { image: "img/cafe/plan_masse.webp", caption: { fr: "Plan masse", en: "Site plan" } },
                        { image: "img/cafe/plans.webp", caption: "Plans" },
                        { image: "img/cafe/coupes.webp", caption: { fr: "Coupes", en: "Sections" } }
                    ],
                    // 3 planches côte à côte sur ce projet (plan masse, plans,
                    // coupes) au lieu de 2 par défaut : elles sont verticales,
                    // donc les 3 tiennent bien sur un même écran.
                    technicalGroupSize: 3,
                    tectonic: "img/cafe/maquette_3d.webp"
                }
            }
        ],
        analyse: [
            {
                id: "analyse-01",
                title: { fr: "Ospedale degli Innocenti, Filippo BRUNELLESCHI, Florence (ITALIE)", en: "Ospedale degli Innocenti, Filippo BRUNELLESCHI, Florence (ITALY)" },
                meta: { fr: "L2 — S3", en: "Y2 — S3" },
                image: "img/ospedale/maquette_site.webp",
                alt: { fr: "Projet d'analyse 01", en: "Analysis project 01" },
                detail: {
                    year: "2025-2026",
                    semester: { fr: "L2 — S3", en: "Year 2 — Semester 3" },
                    teacher: "Jérôme GLAIROUX",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: { fr: "construire un bâtiment, pour façonner une place, pour façonner une ville.", en: "building a building to shape a square, to shape a city." },
                    description: { fr: "", en: "" },
                    hero: "img/ospedale/maquette.webp",
                    process: [
                        { image: "img/ospedale/lien.svg", caption: { fr: "Lien", en: "Link" } },
                        { image: "img/ospedale/prop.svg", caption: "Proportions" },
                        { image: "img/ospedale/miroir.svg", caption: { fr: "Miroir", en: "Mirror" } }

                    ],
                    technical: [
                        { image: "img/ospedale/plan.webp", caption: "Plan" },
                        { image: "img/ospedale/coupe.webp", caption: { fr: "Coupe", en: "Section" } }
                    ],
                    tectonic: "img/ospedale/axo.webp"
                }
            },
            {
                id: "analyse-02",
                title: { fr: "Pavillon de tennis, Fernando TÁVORA, Quinta da Conceição (PORTUGAL)", en: "Tennis Pavilion, Fernando TÁVORA, Quinta da Conceição (PORTUGAL)" },
                meta: { fr: "L2 — S4", en: "Y2 — S4" },
                image: "img/tavora/maquette_site.webp",
                alt: { fr: "Projet d'analyse 02", en: "Analysis project 02" },
                detail: {
                    year: "2025-2026",
                    semester: { fr: "L2 — S4", en: "Year 2 — Semester 4" },
                    teacher: "Séverin PERREAULT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: { fr: "Un pavillon, comme moyen de voir. un dessous et un dessus, ouvrant sur le paysage, partitionnant la nature.", en: "A pavilion as a way of seeing: a below and an above, opening onto the landscape, partitioning nature." },
                    description: { fr: "", en: "" },
                    hero: "img/tavora/maquette.webp",
                    process: [
                        { image: "img/tavora/installer.webp", caption: { fr: "Installer", en: "Install" } },
                        { image: "img/tavora/organiser.webp", caption: { fr: "Organiser", en: "Organise" } },
                        { image: "img/tavora/unifier.webp", caption: { fr: "Unifier", en: "Unify" } },
                        { image: "img/tavora/vues.webp", caption: { fr: "Vues", en: "Views" } }
                    ],
                    // 2 cadres par ligne (2 paires) au lieu de 3, pour que les
                    // 4 planches du process restent côte à côte deux par deux.
                    processColumns: 2,
                    technical: [
                        { image: "img/tavora/plan_de_masse.webp", caption: { fr: "Plan masse", en: "Site plan" } },
                        { image: "img/tavora/plan_et_coupes.webp", caption: { fr: "Plan et coupes", en: "Plan and sections" } }
                    ],
                    tectonic: "img/tavora/axo.webp"
                }
            },
            {
                id: "analyse-03",
                title: { fr: "Dymaxion House 1, Richard BUCKMINSTER FULLER (non réalisée)", en: "Dymaxion House 1, Richard BUCKMINSTER FULLER (unbuilt)" },
                meta: { fr: "L2 — S4", en: "Y2 — S4" },
                image: "img/dymaxion/maquette_site.webp",
                alt: { fr: "Projet d'analyse 03", en: "Analysis project 03" },
                detail: {
                    year: "2025-2026",
                    semester: { fr: "L2 — S4", en: "Year 2 — Semester 4" },
                    teacher: "Boris HAMZEIAN",
                    manifesto: { fr: "Une machine à habiter, un environnement artificiel.", en: "A machine for living, an artificial environment." },
                    description: { fr: "", en: "" },
                    hero: "img/dymaxion/maquette.webp",

                    technical: [
                        { image: "img/dymaxion/plan.webp", caption: "Plan" },
                        { image: "img/dymaxion/coupe.webp", caption: { fr: "Coupe", en: "Section" } }
                    ],
                    tectonic: "img/dymaxion/pers.webp"
                }
            }
        ],
        objet: [
            {
                id: "objet-01",
                title: { fr: "Construction en Bois", en: "Timber Construction" },
                meta: { fr: "L1 — S2", en: "Y1 — S2" },
                image: "img/bois/maquette.webp",
                alt: "Workshop 01",
                detail: {
                    year: "2024-2025",
                    semester: { fr: "L1 — S2", en: "Year 1 — Semester 2" },
                    teacher: "Rémi COLLET",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: { fr: "De simples assemblages, pour distribuer des charges et former une structure.", en: "Simple joints, to distribute loads and form a structure." },
                    description: { fr: "", en: "" },
                    hero: "img/bois/maquette.webp",
                    technical: [
                        { image: "img/bois/plan_et_coupe.webp", caption: { fr: "Plan et coupe", en: "Plan and section" } },
                        { image: "img/bois/axo.webp", caption: { fr: "Axonométrie et détails", en: "Axonometry and details" } }
                    ],
                    tectonic: ["img/bois/forces.webp", "img/bois/forces2.webp"],
                    tectonicTitle: { fr: "Étude des forces", en: "Study of forces" }
                }
            },
            {
                id: "objet-02",
                title: { fr: "Charpente métallique", en: "Steel Frame" },
                meta: { fr: "L2 — S3", en: "Y2 — S3" },
                image: "img/metal/charpente.webp",
                alt: "Workshop 02",
                detail: {
                    year: "2025-2026",
                    semester: { fr: "L2 — S3", en: "Year 2 — Semester 3" },
                    teacher: "Rémi COLLET",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: { fr: "Une structure spatiale triangulée en trois dimensions, où chaque rotule fixe participe à la stabilité de l'ensemble.", en: "A triangulated three-dimensional space structure, where each fixed ball joint contributes to the stability of the whole." },
                    description: { fr: "", en: "" },
                    hero: "img/metal/affiche.webp",
                    technical: [
                        { image: "img/metal/plan.webp", caption: "Plan" },
                        { image: "img/metal/coupe.webp", caption: { fr: "Coupe", en: "Section" } }
                    ],
                    tectonic: ["img/metal/boule.webp", "img/metal/pillier.webp"]
                }
            },
            {
                id: "objet-03",
                title: { fr: "Construction en Pierre", en: "Stone Construction" },
                meta: { fr: "L2 — S4", en: "Y2 — S4" },
                image: "img/pierre/maquette_site.webp",
                alt: "Workshop 03",
                detail: {
                    year: "2025",
                    semester: { fr: "L2 — S4", en: "Year 2 — Semester 4" },
                    teacher: "Rémi COLLET",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: { fr: "Ici, l'équilibre ne vient pas de la légèreté mais du poids : la masse de pierre travaille contre la gravité plutôt qu'avec elle.", en: "Here, balance comes not from lightness but from weight: the mass of stone works against gravity rather than with it." },
                    description: { fr: "", en: "" },
                    hero: "img/pierre/maquette.webp",
                    process: [
                        { image: "img/pierre/schema_01.webp", caption: { fr: "L’assise (la fondation) : On creuse une tranchée pour poser les plus grosses pierres au sol. Elles doivent être enterrées pour éviter que le mur ne glisse.", en: "The foundation course (the base): A trench is dug to lay the largest stones on the ground. They must be buried to stop the wall from sliding." } },
                        { image: "img/pierre/schema_02.webp", caption: { fr: "Le fruit (l’inclinaison) : Le mur ne doit pas être parfaitement vertical. Il doit s’incliner légèrement vers l’intérieur (entre 10% et 15%). Cela déplace le centre de gravité vers le cœur de la structure.", en: "The batter (the slope): The wall must not be perfectly vertical. It should lean slightly inwards (between 10% and 15%). This shifts the centre of gravity towards the heart of the structure." } },
                        { image: "img/pierre/schema_03.webp", caption: { fr: "Les boutisses : Ce sont des pierres longues posées dans le sens de l’épaisseur du mur. Elles traversent le mur de part en part pour lier le parement extérieur et intérieur. Ce sont les « clous » de la structure.", en: "Through-stones (headers): These are long stones laid across the thickness of the wall. They pass right through it to tie the outer and inner faces together. They are the “nails” of the structure." } },
                        { image: "img/pierre/schema_04.webp", caption: { fr: "Le calage et le remplissage : On remplit l’intérieur du mur avec de la petite caillasse (le « tout-venant »). Attention : ces petits cailloux ne sont pas jetés au hasard, ils sont bloqués fermement pour empêcher les grosses pierres de bouger", en: "Wedging and filling: The inside of the wall is filled with small rubble (the “hearting”). Careful: these small stones are not thrown in at random; they are wedged firmly to stop the large stones from moving." } }
                    ],
                    // 2 cadres par ligne (2x2) pour les 4 planches du process,
                    // comme sur la page d'analyse du pavillon de tennis.
                    processColumns: 2,
                    technical: [
                        { image: "img/pierre/plans_coupes.webp", caption: { fr: "Plan et coupes", en: "Plan and sections" } },
                        { image: "img/pierre/analyse.webp", caption: { fr: "Étude", en: "Study" } }
                    ],
                    tectonic: "img/pierre/axo.webp"
                }
            }
        ]
    }
};