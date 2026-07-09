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
            address: "196 impasse du limon, Carpentras, France",
            email: "pablovaro@orange.fr",
            phone: "+33 7 49 39 19 72",
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
            description: "Découverte et expérimentations de différentes techniques de la construction en terre avec 2 architectes/maçons spécialistes : bauge, pisé, adobe, torchis.",
            detail: "Application directe pour l'isolation en terre allégée et en terre paille d'un mur.",
            images: [
                "img/terre/bauge.jpg",
                "img/terre/adobe.jpg",
                "img/terre/fresque.jpg",
                "img/terre/barquette.jpg",
                "img/terre/paille.jpg",
                "img/terre/terre_paille.jpg",
                "img/terre/iso_face.jpg",
                "img/terre/tas.jpg",
                "img/terre/planche.jpg",
            ]
        },
        {
            id: "imhotep",
            period: "2025-26",
            title: "Président de l'Association Imhotep",
            subtitle: "ENSASE • Saint-Étienne",
            description: "Recherche de subventions et organisation d'événements.",
            detail: "Paniers de fruits et légumes, partenariat avec De la ferme au quartier et Vrac en vert.",
            images: []
        },
        {
            id: "taille-pierre",
            period: "07/2025",
            title: "Chantier de Taille de Pierre",
            subtitle: "Porterie de l'Abbaye de Morimont • Rempart",
            description: "Apprentissage et pratique des techniques de construction traditionnelles.",
            detail: "Fabrication de mortier, montage de murs, terrassement, taille de pierre.",
            images: [
                "img/morimond/taille.jpg",
                "img/morimond/niveau.jpg",
                "img/morimond/pose.jpg",
                "img/morimond/joints.jpg",
                "img/morimond/remplissage.jpg",
                "img/morimond/niveau.jpg",
                "img/morimond/angle.jpg"
            ]
        },
        {
            id: "voyage-philippines",
            period: "07/2024",
            title: "Voyage Humanitaire — Scouts",
            subtitle: "Philippines (Projet Scout de 10 ans)",
            description: "Recherche de partenaires et de financements, planification du projet. Apprentissage et pratique de l'agriculture biologique.",
            detail: "Vinaigre de bois, greffe, engrais, marcottage, plantation de divers fruits et légumes.",
            images: [
                "img/philippines/class.jpg",
                "img/philippines/riz.jpg",
                "img/philippines/sillon.jpg",
                "img/philippines/graines.jpg",
                "img/philippines/plantes.jpg",
                "img/philippines/vers.jpg",
                "img/philippines/vinaigre.jpg",
                "img/philippines/photo.jpg"
            ]
        },
        {
            id: "stage-agence",
            period: "05/2023",
            title: "Stage en Agence d'Architecture",
            subtitle: "83 Arquitectos • Madrid",
            description: "Découverte du métier d'architecte en agence — différents types de projets (neuf et rénovation), fonctionnement d'une agence, et différentes méthodes de travail et de réflexion.",
            detail: "",
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
    //           { image: "img/plan_s2.jpg", pdf: "pdf/plan_s2.pdf", caption: "Plan de rez-de-chaussée" }
    //       ],
    //       tectonic: "img/coupe_pers_s2.jpg",
    //       tectonicPdf: "pdf/coupe_pers_s2.pdf"
    //   Mets tes PDF dans un dossier "pdf/" à la racine (à créer), à côté de "img/".
    projects: {
        conception: [
            {
                id: "conception-01",
                title: "Logement pour 3 personnes",
                meta: "L1 — S2",
                image: "img/coloc/maquette.png",
                alt: "Projet de conception 01",
                detail: {
                    year: "2024-2025",
                    semester: "L1 — S2",
                    teacher: "Sebastien MARTINEZ-BARAT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "“Less in enought”, Pier Vittorio Aureli",
                    hero: "img/coloc/detail.jpg",
                    technical: [
                        { image: "img/coloc/plan.jpg", caption: "Plan" },
                        { image: "img/coloc/elevation.jpg", caption: "Elevation" }
                    ],
                    technicalOrientation: "landscape",
                    tectonic: "img/coloc/pers.jpg"
                }
            },
            {
                id: "conception-02",
                title: "Extension de l'école de jacquard (St Etienne)",
                meta: "L2 — S3",
                image: "img/ecole/maquette_site.png",
                alt: "Projet de conception 02",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S3",
                    teacher: "Jérome GLAIROUX",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "la conservation de l'existant. En le dupliquant, l'extension s'élance dans le parc pour s'y ancrer.",
                    hero: "img/ecole/maquette.png",
                    process: [
                        { image: "img/ecole/dedoublement.jpg", caption: "Intention initiale" },
                        { image: "img/ecole/circulation.jpg", caption: "Circulation" },
                        { image: "img/ecole/axo.jpg", caption: "Axonometrie" }
                    ],
                    technical: [
                        { image: "img/ecole/plan_rez_de_chausse.jpg", caption: "Plan de rez-de-chaussée" },
                        { image: "img/ecole/coupes.jpg", caption: "Coupes" }
                    ],
                    technicalOrientation: "landscape",
                    tectonic: "img/ecole/plan_etages.jpg"
                }
            },
            {
                id: "conception-03",
                title: "Salle polyvalente et café (St Victor sur Loire)",
                meta: "L2 — S4",
                image: "img/cafe/maquette_site.jpg",
                alt: "Projet de conception 03",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S4",
                    teacher: "Severin PERREAULT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "Rester dans le village, c'est poursuivre le chemin de ronde et y fixer le projet. Enterrer et poser.",
                    hero: "img/cafe/maquette.png",
                    process: [
                        { image: "img/cafe/installer.png", caption: "Installer" },
                        { image: "img/cafe/integrer.png", caption: "Intégrer" },
                        { image: "img/cafe/organiser.png", caption: "organiser" }
                    ],
                    technical: [
                        { image: "img/cafe/plan_masse.jpg", caption: "Plan masse" },
                        { image: "img/cafe/plans.jpg", caption: "Plans" },
                        { image: "img/cafe/coupes.jpg", caption: "Coupes" }
                    ],
                    // 3 planches côte à côte sur ce projet (plan masse, plans,
                    // coupes) au lieu de 2 par défaut : elles sont verticales,
                    // donc les 3 tiennent bien sur un même écran.
                    technicalGroupSize: 3,
                    tectonic: "img/cafe/maquette_3d.png"
                }
            }
        ],
        analyse: [
            {
                id: "analyse-01",
                title: "Ospedale degli innocenti, Filipo BRUNELESCHI, Florence (ITALIE)",
                meta: "L2 — S3",
                image: "img/ospedale/maquette_site.png",
                alt: "Projet d'analyse 01",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S3",
                    teacher: "Jérome GLAIROUX",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "construire un bâtiment, pour façonner une place, pour façonner une ville.",
                    hero: "img/ospedale/maquette.png",
                    process: [
                        { image: "img/ospedale/lien.svg", caption: "Lien" },
                        { image: "img/ospedale/prop.svg", caption: "Proportions" },
                        { image: "img/ospedale/miroir.svg", caption: "Miroir" }

                    ],
                    technical: [
                        { image: "img/ospedale/plan.jpg", caption: "Plan" },
                        { image: "img/ospedale/coupe.jpg", caption: "Coupe" }
                    ],
                    tectonic: "img/ospedale/axo.jpg"
                }
            },
            {
                id: "analyse-02",
                title: "Pavillon de tennis, Fernando TAVORA, Quinta de conceiçao (PORTUGAL)",
                meta: "L2 — S4",
                image: "img/tavora/maquette_site.png",
                alt: "Projet d'analyse 02",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S4",
                    teacher: "Severin PERREAULT",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "Un pavillon, comme moyen de voir. un dessous et un dessus, ouvrant sur le paysage, partitionnant la nature.",
                    hero: "img/tavora/maquette.png",
                    process: [
                        { image: "img/tavora/installer.jpg", caption: "Installer" },
                        { image: "img/tavora/organiser.jpg", caption: "Organiser" },
                        { image: "img/tavora/unifier.jpg", caption: "Unifier" },
                        { image: "img/tavora/vues.jpg", caption: "Vues" }
                    ],
                    // 2 cadres par ligne (2 paires) au lieu de 3, pour que les
                    // 4 planches du process restent côte à côte deux par deux.
                    processColumns: 2,
                    technical: [
                        { image: "img/tavora/plan_de_masse.jpg", caption: "Plan masse" },
                        { image: "img/tavora/plan_et_coupes.jpg", caption: "Plan et coupes" }
                    ],
                    tectonic: "img/tavora/axo.jpg"
                }
            },
            {
                id: "analyse-03",
                title: "Dymaxion House 1, Richard BUCKMINSTER FULLER (non réalisée)",
                meta: "L2 — S4",
                image: "img/dymaxion/maquette_site.png",
                alt: "Projet d'analyse 03",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S4",
                    teacher: "Boris HAMZEIAN",
                    manifesto: "Une machine à habiter, un environnement artificiel.",
                    hero: "img/dymaxion/maquette.png",

                    technical: [
                        { image: "img/dymaxion/plan.jpg", caption: "Plan" },
                        { image: "img/dymaxion/coupe.jpg", caption: "Coupe" }
                    ],
                    tectonic: "img/dymaxion/pers.jpg"
                }
            }
        ],
        objet: [
            {
                id: "objet-01",
                title: "Construction en Bois",
                meta: "L1 — S2",
                image: "img/bois/maquette.png",
                alt: "Workshop 01",
                detail: {
                    year: "2024-2025",
                    semester: "L1 — S2",
                    teacher: "Rémi COLLET",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "De simples assemblages, pour distribuer des charges et former une structure.",
                    hero: "img/bois/maquette.png",
                    technical: [
                        { image: "img/bois/plan_et_coupe.jpg", caption: "Plan et coupe" },
                        { image: "img/bois/axo.jpg", caption: "Axonométrie et détails" }
                    ],
                    tectonic: ["img/bois/forces.jpg", "img/bois/forces2.jpg"],
                    tectonicTitle: "Etude des forces"
                }
            },
            {
                id: "objet-02",
                title: "Charpente metallique",
                meta: "L2 — S3",
                image: "img/metal/charpente.jpg",
                alt: "Workshop 02",
                detail: {
                    year: "2025-2026",
                    semester: "L2 — S3",
                    teacher: "Rémi COLLET",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "Une structure spatiale triangulée en trois dimensions, où chaque rotule fixe participe à la stabilité de l'ensemble.",
                    hero: "img/metal/affiche.jpg",
                    technical: [
                        { image: "img/metal/plan.jpg", caption: "Plan" },
                        { image: "img/metal/plan.jpg", caption: "Coupe" }
                    ],
                    tectonic: ["img/metal/boule.jpg", "img/metal/coupé.jpg"]
                }
            },
            {
                id: "objet-03",
                title: "Construction en Pierre",
                meta: "L2 — S4",
                image: "img/pierre/maquette_site.png",
                alt: "Workshop 03",
                detail: {
                    year: "2025",
                    semester: "L2 — S4",
                    teacher: "À définir",
                    location: "ENSASE, Saint-Étienne",
                    manifesto: "Ici, l'équilibre ne vient pas de la légèreté mais du poids : la masse de pierre travaille contre la gravité plutôt qu'avec elle.",
                    hero: "img/pierre/maquette.jpg",
                    process: [
                        { image: "img/pierre/schema_01.jpg", caption: "L’assise (la fondation) : On creuse une tranchée pour poser les plus grosses pierres au sol. Elles doivent être enterrées pour éviter que le mur ne glisse." },
                        { image: "img/pierre/schema_02.jpg", caption: "Le fruit (l’inclinaison) : Le mur ne doit pas être parfaitement vertical. Il doit s’incliner légèrement vers l’intérieur (entre 10% et 15%). Cela déplace le centre de gravité vers le cœur de la structure." },
                        { image: "img/pierre/schema_03.jpg", caption: "Les boutisses : Ce sont des pierres longues posées dans le sens de l’épaisseur du mur. Elles traversent le mur de part en part pour lier le parement extérieur et intérieur. Ce sont les «clous» de la structure." },
                        { image: "img/pierre/schema_04.jpg", caption: "Le calage et le remplissage : On remplit l’intérieur du mur avec de la petite caillasse (le «tout-venant»). Attention : ces petits cailloux ne sont pas jetés au hasard, ils sont bloqués fermement pour empêcher les grosses pierres de bouger" }
                    ],
                    // 2 cadres par ligne (2x2) pour les 4 planches du process,
                    // comme sur la page d'analyse du pavillon de tennis.
                    processColumns: 2,
                    technical: [
                        { image: "img/pierre/plans_coupes.jpg", caption: "Plan et coupes" },
                        { image: "img/pierre/analyse.jpg", caption: "Etude" }
                    ],
                    tectonic: "img/pierre/axo.jpg"
                }
            }
        ]
    }
};