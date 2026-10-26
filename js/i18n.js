/* Gestion des langues (FR / EN).

   - Les textes du contenu (js/data.js) s'écrivent { fr: "…", en: "…" } ;
     I18N.t(valeur) renvoie la bonne langue (une simple chaîne reste telle quelle).
   - Les textes fixes de l'interface sont dans le dictionnaire UI ci-dessous
     (clés utilisées par render.js, app.js et les attributs data-i18n d'index.html).
   - La langue vient, dans l'ordre : de l'URL (?lang=en), du dernier choix
     mémorisé, puis de la langue du navigateur. Le français est la langue par défaut. */

(function () {
    "use strict";

    var SUPPORTED = ["fr", "en"];
    var STORAGE_KEY = "portfolio-lang";

    var UI = {
        fr: {
            openPortfolio: "Ouvrir le portfolio",
            wordProjects: "PROJETS",
            wordExperiences: "EXPERIENCES",
            back: "Retour",
            langSwitch: "Changer de langue",

            headingDesign: "Conception",
            subDesign: "Projets de conception d'architectures",
            headingAnalysis: "Analyses",
            subAnalysis: "Études et analyses d'architectures",
            headingWorkshops: "Workshops",
            subWorkshops: "Étude et travail des matériaux",

            profileContact: "Contact",
            profileEducation: "Formation",
            profileSoftware: "Logiciels",
            profileLanguages: "Langues",
            downloadCv: "Télécharger le CV (PDF)",
            viewGallery: "Voir la Galerie",

            metaYear: "Année",
            metaSemester: "Semestre",
            metaTeacher: "Enseignant",
            metaLocation: "Lieu",
            sectionProcess: "Processus",
            sectionDrawings: "Dessins",
            sectionDetail: "Détail",
            detailConstructive: "Détail constructif",
            enlarge: "Agrandir",
            prevProject: "Projet Précédent",
            nextProject: "Projet Suivant",

            galleryLabel: "Galerie d'images",
            galleryClose: "Fermer la galerie",
            galleryPrev: "Image précédente",
            galleryNext: "Image suivante",
            galleryHint: "— Molette ou double-clic pour zoomer",
            galleryPdf: "Voir le PDF ↗",
            galleryImage: "Image de la galerie",

            imgUnavailable: "Image indisponible",
            errProfile: "Le profil n'a pas pu être chargé.",
            errExperiences: "Les expériences n'ont pas pu être chargées.",
            errProjects: "Ces projets n'ont pas pu être chargés.",

            notFoundTitle: "Page introuvable - Pablo VARO",
            notFoundText: "Cette page n'existe pas, ou a été déplacée.",
            notFoundBack: "Retour à l'accueil",

            metaDescription: "Portfolio de Pablo Varo, étudiant en architecture à l'ENSASE Saint-Étienne — projets de conception, analyses d'architecture et workshops.",
            ogDescription: "Étudiant en architecture à l'ENSASE Saint-Étienne — projets de conception, analyses d'architecture et workshops."
        },
        en: {
            openPortfolio: "Open the portfolio",
            wordProjects: "PROJECTS",
            wordExperiences: "EXPERIENCE",
            back: "Back",
            langSwitch: "Change language",

            headingDesign: "Design",
            subDesign: "Architectural design projects",
            headingAnalysis: "Analysis",
            subAnalysis: "Studies and analyses of architecture",
            headingWorkshops: "Workshops",
            subWorkshops: "Study and working of materials",

            profileContact: "Contact",
            profileEducation: "Education",
            profileSoftware: "Software",
            profileLanguages: "Languages",
            downloadCv: "Download CV (PDF)",
            downloadCvFrench: "Download CV (PDF, in French)",
            viewGallery: "View the Gallery",

            metaYear: "Year",
            metaSemester: "Semester",
            metaTeacher: "Instructor",
            metaLocation: "Location",
            sectionProcess: "Process",
            sectionDrawings: "Drawings",
            sectionDetail: "Detail",
            detailConstructive: "Construction detail",
            enlarge: "Enlarge",
            prevProject: "Previous Project",
            nextProject: "Next Project",

            galleryLabel: "Image gallery",
            galleryClose: "Close the gallery",
            galleryPrev: "Previous image",
            galleryNext: "Next image",
            galleryHint: "— Scroll or double-click to zoom",
            galleryPdf: "View PDF ↗",
            galleryImage: "Gallery image",

            imgUnavailable: "Image unavailable",
            errProfile: "The profile could not be loaded.",
            errExperiences: "The experiences could not be loaded.",
            errProjects: "These projects could not be loaded.",

            notFoundTitle: "Page not found - Pablo VARO",
            notFoundText: "This page does not exist, or has been moved.",
            notFoundBack: "Back to the home page",

            metaDescription: "Portfolio of Pablo Varo, architecture student at ENSASE Saint-Étienne — design projects, architectural analyses and construction workshops.",
            ogDescription: "Architecture student at ENSASE Saint-Étienne — design projects, architectural analyses and construction workshops."
        }
    };

    var listeners = [];
    var current = "fr";

    function readStored() {
        try {
            var v = window.localStorage.getItem(STORAGE_KEY);
            return SUPPORTED.indexOf(v) !== -1 ? v : null;
        } catch (e) {
            return null; // stockage indisponible (navigation privée, etc.)
        }
    }

    function writeStored(lang) {
        try {
            window.localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) { /* sans importance */ }
    }

    function detect() {
        var m = /[?&]lang=(fr|en)\b/i.exec(window.location.search || "");
        if (m) {
            var fromUrl = m[1].toLowerCase();
            writeStored(fromUrl);
            return fromUrl;
        }
        var stored = readStored();
        if (stored) return stored;

        var prefs = (navigator.languages && navigator.languages.length)
            ? navigator.languages
            : [navigator.language || "fr"];
        for (var i = 0; i < prefs.length; i++) {
            var code = String(prefs[i] || "").slice(0, 2).toLowerCase();
            if (SUPPORTED.indexOf(code) !== -1) return code;
        }
        return "fr";
    }

    // Valeur de contenu : chaîne, tableau, ou { fr, en }.
    function t(value) {
        if (value && typeof value === "object" && !Array.isArray(value)) {
            if (value[current] !== undefined && value[current] !== null) return value[current];
            return value.fr !== undefined ? value.fr : "";
        }
        return value === undefined || value === null ? "" : value;
    }

    function ui(key) {
        var dict = UI[current] || UI.fr;
        if (dict[key] !== undefined) return dict[key];
        return UI.fr[key] !== undefined ? UI.fr[key] : key;
    }

    function setMeta(selector, attr, value) {
        var el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
    }

    // Met à jour tout ce qui est statique dans la page.
    function applyStatic() {
        document.documentElement.setAttribute("lang", current);

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            el.textContent = ui(el.getAttribute("data-i18n"));
        });
        document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
            el.setAttribute("aria-label", ui(el.getAttribute("data-i18n-aria")));
        });

        var notFound = document.body && document.body.hasAttribute("data-page-404");
        if (notFound) document.title = ui("notFoundTitle");

        setMeta('meta[name="description"]', "content", ui("metaDescription"));
        setMeta('meta[property="og:description"]', "content", ui("ogDescription"));
        setMeta('meta[name="twitter:description"]', "content", ui("ogDescription"));
        setMeta('meta[property="og:locale"]', "content", current === "en" ? "en_US" : "fr_FR");

        document.querySelectorAll("#lang-switch button[data-lang]").forEach(function (btn) {
            btn.setAttribute("aria-pressed", btn.getAttribute("data-lang") === current ? "true" : "false");
        });
    }

    function setLang(lang, options) {
        if (SUPPORTED.indexOf(lang) === -1) return;
        var silent = options && options.silent;
        var changed = lang !== current;
        current = lang;
        if (!silent) writeStored(lang);
        applyStatic();
        if (changed || silent) {
            listeners.slice().forEach(function (fn) {
                try { fn(current); } catch (err) { console.error("[i18n] écouteur en erreur :", err); }
            });
        }
    }

    function onChange(fn) {
        if (typeof fn === "function") listeners.push(fn);
    }

    window.I18N = {
        get lang() { return current; },
        t: t,
        ui: ui,
        setLang: setLang,
        onChange: onChange,
        supported: SUPPORTED
    };

    // Langue initiale : appliquée tout de suite, avant render.js et app.js
    // (les écouteurs ne sont pas encore enregistrés, donc rien n'est notifié).
    current = detect();

    function bindSwitch() {
        document.querySelectorAll("#lang-switch button[data-lang]").forEach(function (btn) {
            btn.addEventListener("click", function () {
                setLang(btn.getAttribute("data-lang"));
            });
        });
        applyStatic();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", bindSwitch);
    } else {
        bindSwitch();
    }
})();
