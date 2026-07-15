/* Contenu du site (textes, images, projets). Pour modifier un texte, une
   expérience ou un projet : tout se passe ici, pas besoin de toucher au
   HTML ou au JS. Si une image ne charge pas, un espace réservé neutre
   s'affiche automatiquement (voir js/render.js). */

window.SITE_DATA = {

    // Profil / CV (colonne de gauche de la page EXPÉRIENCES)
    profile: {
        name: "Pablo Varo",
        role: "Étudiant en Architecture",
        bio: "Engagé, sérieux, sociable et conscient du travail à accomplir. Je travaille en toute autonomie et je me donne à fond.",
        contact: {
            address: "5 place Jean Ploton, St Etienne, France",
            // Email et téléphone stockés sous forme de codes de caractères plutôt
            // qu'en texte brut : ça évite qu'un robot spammeur les moissonne en
            // scannant simplement ce fichier, sans rien changer pour un recruteur
            // humain (js/render.js les décode et fabrique un lien mailto/tel normal,
            // cliquable, exactement comme avant).
            emailParts: [112, 97, 98, 108, 111, 118, 97, 114, 111, 64, 111, 114, 97, 110, 103, 101, 46, 102, 114],
            phoneParts: [43, 51, 51, 32, 55, 32, 52, 57, 32, 51, 57, 32, 49, 57, 32, 55, 50],
            permit: "Permis B"
        },
        formation: [
            { year: "2026", label: "2ème année de Licence en Architecture, ENSASE" },
            { year: "2024", label: "1ère année de Licence Histoire de l'Art & Archéologie, Lyon 2" },
            { year: "2023", label: "Baccalauréat — Spécialités Maths, Physique-Chimie, SVT" }
        ],
        software: ["AutoCAD", "Rhinoceros", "Impression 3D", "Découpe Laser"],
        languages: ["Anglais (Courant)", "Espagnol (Bilingue)"]
    },

    // Expériences (chronologie sur la page EXPÉRIENCES, du plus récent au plus ancien).
    // "images": tableau d'URLs — vide [] = pas de galerie, sinon le survol du
    // titre révèle "Voir la galerie" et un clic l'ouvre.
    experiences: [
        {
            id: "terre-crue",
            period: "Intersemestre 2025-26",
            title: "Construction en terre crue",
            subtitle: "ENSASE • Saint-Étienne",
            description: "Découverte et expérimentations de différentes techniques de la construction en terre avec 2 architectes/maçons spécialistes",
            detail: "Bauge, pisé, torchis, adobe, isolation en terre paille et en terre-allégée.",
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
            title: "Président de l'Association Imhotep",
            subtitle: "ENSASE • Saint-Étienne",
            description: "Distribution de denrées alimentaires et produits hygiéniques, organisation de divers projets. En partenariat avec l'ENSASE et des entreprises locales.",
            detail: "Distribution de produits alimentaires et d'hygiène, friperie autonome, repas.",
            images: []
        },
        {
            id: "taille-pierre",
            period: "07/2025",
            title: "Chantier de Taille de Pierre et Maçonnerie",
            subtitle: "Porterie de l'Abbaye de Morimont • Rempart",
            description: "Apprentissage et pratique des techniques de construction traditionnelles en pierre.",
            detail: "Fabrication de mortier, montage de murs, terrassement, taille de pierre.",
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
            title: "Voyage Humanitaire — Scouts et Guides de France",
            subtitle: "Philippines (Projet Scout depuis 10 ans)",
            description: "Travail dans une ferme biologique en partageant la vie locale.",
            detail: "Recherche de partenaires et de financements, planification du projet, vinaigre de bois, greffe, engrais, marcottage, plantation de divers fruits et légumes.",
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
            title: "Stage en Agence d'Architecture",
            subtitle: "83 Arquitectos • Madrid",
            description: "Découverte du métier d'architecte en agence et des différents projets : Maison individuelle, restauration de façade, restaurant.",
            detail: "Recherche de reférences, reflexion du projet par la maquette",
            images: []
        },
        {
            id: "stage-menuiserie",
            period: "04/2020",
            title: "Stage en Menuiserie",
            subtitle: "Axilom • Carpentras",
            description: "Apprentissage des outils, des machines et des techniques de menuiserie.",
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
    //           { image: "img/plan_s2.webp", pdf: "pdf/plan_s2.pdf", caption: "Plan de rez-de-chaussée" }
    //       ],
    //       tectonic: "img/coupe_pers_s2.webp",
    //       tectonicPdf: "pdf/coupe_pers_s2.pdf"
    //   Mets tes PDF dans un dossier "pdf/" à la racine (à créer), à côté de "img/".
    projects: {
        conception: [
            {
                id: "conception-01",
                title: "Logement pour 3 personnes",
                meta: "L1 — S2",
                image: "img/coloc/maquette.webp",
                alt: "Projet de conception 01",
                detail: {
                    year: "2024-2025",
                    semester: "L1 — S2",
                    teacher: "Sebastien MARTINEZ-BARAT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "“Less in enought”, Pier Vittorio Aureli",
                    hero: "img/coloc/detail.webp",
                    technical: [
                        { image: "img/coloc/plan.webp", caption: "Plan" },
                        { image: "img/coloc/elevation.webp", caption: "Elevation" }
                    ],
                    technicalOrientation: "landscape",
                    tectonic: "img/coloc/pers.webp"
                }
            },
            {
                id: "conception-02",
                title: "Extension de l'école de jacquard (St Etienne)",
                meta: "L2 — S3",
                image: "img/ecole/maquette_site.webp",
                alt: "Projet de conception 02",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S3",
                    teacher: "Jérome GLAIROUX",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "la conservation de l'existant. En le dupliquant, l'extension s'élance dans le parc pour s'y ancrer.",
                    hero: "img/ecole/maquette.webp",
                    process: [
                        { image: "img/ecole/dedoublement.webp", caption: "Intention initiale" },
                        { image: "img/ecole/circulation.webp", caption: "Circulation" },
                        { image: "img/ecole/axo.webp", caption: "Axonometrie" }
                    ],
                    technical: [
                        { image: "img/ecole/plan_rez_de_chausse.webp", caption: "Plan de rez-de-chaussée" },
                        { image: "img/ecole/coupes.webp", caption: "Coupes" }
                    ],
                    technicalOrientation: "landscape",
                    tectonic: "img/ecole/plan_etages.webp"
                }
            },
            {
                id: "conception-03",
                title: "Salle polyvalente et café (St Victor sur Loire)",
                meta: "L2 — S4",
                image: "img/cafe/maquette_site.webp",
                alt: "Projet de conception 03",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S4",
                    teacher: "Severin PERREAULT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "Rester dans le village, c'est poursuivre le chemin de ronde et y fixer le projet. Enterrer et poser.",
                    hero: "img/cafe/maquette.webp",
                    process: [
                        { image: "img/cafe/installer.webp", caption: "Installer" },
                        { image: "img/cafe/integrer.webp", caption: "Intégrer" },
                        { image: "img/cafe/organiser.webp", caption: "organiser" }
                    ],
                    technical: [
                        { image: "img/cafe/plan_masse.webp", caption: "Plan masse" },
                        { image: "img/cafe/plans.webp", caption: "Plans" },
                        { image: "img/cafe/coupes.webp", caption: "Coupes" }
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
                title: "Ospedale degli innocenti, Filipo BRUNELESCHI, Florence (ITALIE)",
                meta: "L2 — S3",
                image: "img/ospedale/maquette_site.webp",
                alt: "Projet d'analyse 01",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S3",
                    teacher: "Jérome GLAIROUX",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "construire un bâtiment, pour façonner une place, pour façonner une ville.",
                    hero: "img/ospedale/maquette.webp",
                    process: [
                        { image: "img/ospedale/lien.svg", caption: "Lien" },
                        { image: "img/ospedale/prop.svg", caption: "Proportions" },
                        { image: "img/ospedale/miroir.svg", caption: "Miroir" }

                    ],
                    technical: [
                        { image: "img/ospedale/plan.webp", caption: "Plan" },
                        { image: "img/ospedale/coupe.webp", caption: "Coupe" }
                    ],
                    tectonic: "img/ospedale/axo.webp"
                }
            },
            {
                id: "analyse-02",
                title: "Pavillon de tennis, Fernando TAVORA, Quinta de conceiçao (PORTUGAL)",
                meta: "L2 — S4",
                image: "img/tavora/maquette_site.webp",
                alt: "Projet d'analyse 02",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S4",
                    teacher: "Severin PERREAULT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "Un pavillon, comme moyen de voir. un dessous et un dessus, ouvrant sur le paysage, partitionnant la nature.",
                    hero: "img/tavora/maquette.webp",
                    process: [
                        { image: "img/tavora/installer.webp", caption: "Installer" },
                        { image: "img/tavora/organiser.webp", caption: "Organiser" },
                        { image: "img/tavora/unifier.webp", caption: "Unifier" },
                        { image: "img/tavora/vues.webp", caption: "Vues" }
                    ],
                    // 2 cadres par ligne (2 paires) au lieu de 3, pour que les
                    // 4 planches du process restent côte à côte deux par deux.
                    processColumns: 2,
                    technical: [
                        { image: "img/tavora/plan_de_masse.webp", caption: "Plan masse" },
                        { image: "img/tavora/plan_et_coupes.webp", caption: "Plan et coupes" }
                    ],
                    tectonic: "img/tavora/axo.webp"
                }
            },
            {
                id: "analyse-03",
                title: "Dymaxion House 1, Richard BUCKMINSTER FULLER (non réalisée)",
                meta: "L2 — S4",
                image: "img/dymaxion/maquette_site.webp",
                alt: "Projet d'analyse 03",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S4",
                    teacher: "Boris HAMZEIAN",
                    manifesto: "Une machine à habiter, un environnement artificiel.",
                    hero: "img/dymaxion/maquette.webp",

                    technical: [
                        { image: "img/dymaxion/plan.webp", caption: "Plan" },
                        { image: "img/dymaxion/coupe.webp", caption: "Coupe" }
                    ],
                    tectonic: "img/dymaxion/pers.webp"
                }
            }
        ],
        objet: [
            {
                id: "objet-01",
                title: "Construction en Bois",
                meta: "L1 — S2",
                image: "img/bois/maquette.webp",
                alt: "Workshop 01",
                detail: {
                    year: "2024-2025",
                    semester: "L1 — S2",
                    teacher: "Rémi COLLET",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "De simples assemblages, pour distribuer des charges et former une structure.",
                    hero: "img/bois/maquette.webp",
                    technical: [
                        { image: "img/bois/plan_et_coupe.webp", caption: "Plan et coupe" },
                        { image: "img/bois/axo.webp", caption: "Axonométrie et détails" }
                    ],
                    tectonic: ["img/bois/forces.webp", "img/bois/forces2.webp"],
                    tectonicTitle: "Etude des forces"
                }
            },
            {
                id: "objet-02",
                title: "Charpente metallique",
                meta: "L2 — S3",
                image: "img/metal/charpente.webp",
                alt: "Workshop 02",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S3",
                    teacher: "Rémi COLLET",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "Une structure spatiale triangulée en trois dimensions, où chaque rotule fixe participe à la stabilité de l'ensemble.",
                    hero: "img/metal/affiche.webp",
                    technical: [
                        { image: "img/metal/plan.webp", caption: "Plan" },
                        { image: "img/metal/coupe.webp", caption: "Coupe" }
                    ],
                    tectonic: ["img/metal/boule.webp", "img/metal/pillier.webp"]
                }
            },
            {
                id: "objet-03",
                title: "Construction en Pierre",
                meta: "L2 — S4",
                image: "img/pierre/maquette_site.webp",
                alt: "Workshop 03",
                detail: {
                    year: "2025",
                    semester: "L2 — S4",
                    teacher: "Rémi COLLET",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "Ici, l'équilibre ne vient pas de la légèreté mais du poids : la masse de pierre travaille contre la gravité plutôt qu'avec elle.",
                    hero: "img/pierre/maquette.webp",
                    process: [
                        { image: "img/pierre/schema_01.webp", caption: "L’assise (la fondation) : On creuse une tranchée pour poser les plus grosses pierres au sol. Elles doivent être enterrées pour éviter que le mur ne glisse." },
                        { image: "img/pierre/schema_02.webp", caption: "Le fruit (l’inclinaison) : Le mur ne doit pas être parfaitement vertical. Il doit s’incliner légèrement vers l’intérieur (entre 10% et 15%). Cela déplace le centre de gravité vers le cœur de la structure." },
                        { image: "img/pierre/schema_03.webp", caption: "Les boutisses : Ce sont des pierres longues posées dans le sens de l’épaisseur du mur. Elles traversent le mur de part en part pour lier le parement extérieur et intérieur. Ce sont les «clous» de la structure." },
                        { image: "img/pierre/schema_04.webp", caption: "Le calage et le remplissage : On remplit l’intérieur du mur avec de la petite caillasse (le «tout-venant»). Attention : ces petits cailloux ne sont pas jetés au hasard, ils sont bloqués fermement pour empêcher les grosses pierres de bouger" }
                    ],
                    // 2 cadres par ligne (2x2) pour les 4 planches du process,
                    // comme sur la page d'analyse du pavillon de tennis.
                    processColumns: 2,
                    technical: [
                        { image: "img/pierre/plans_coupes.webp", caption: "Plan et coupes" },
                        { image: "img/pierre/analyse.webp", caption: "Etude" }
                    ],
                    tectonic: "img/pierre/axo.webp"
                }
            }
        ]
    }
};