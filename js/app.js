/* Navigation entre pages, animation du mot PORTFOLIO et galerie modale. */

window.addEventListener("error", function (e) {
    console.error("[app] Erreur JavaScript interceptée :", e.message, e.filename, e.lineno);
});
window.addEventListener("unhandledrejection", function (e) {
    console.error("[app] Promesse rejetée non gérée :", e.reason);
});

function getEl(id) {
    const el = document.getElementById(id);
    if (!el) {
        console.warn("[app] Élément #" + id + " introuvable dans la page.");
    }
    return el;
}

/* --------------------------------------------------------------------------
   Durées d'animation, centralisées ici plutôt qu'éparpillées dans le code.
   -------------------------------------------------------------------------- */
const DURATIONS = {
    CATEGORY_OUT: 600,   // page2 -> page3/page4 : disparition du menu de catégories
    CATEGORY_IN: 800,    // apparition de la page de destination (expériences/projets)
    DETAIL_OUT: 500,     // page4 -> page5 : disparition de la grille de projets
    DETAIL_IN: 700,      // apparition de la page de détail projet
    DETAIL_CLOSE: 600,   // page5 -> page4 : retour à la grille de projets
    PROJECT_NAV: 350     // fondu "Projet précédent/suivant" (reste sur page5)
};

/* --------------------------------------------------------------------------
   Transition générique entre deux "pages" (divs) du site : remplace les
   4 fonctions quasi identiques openExperiences/closeExperiences/openProjects/
   closeProjects qui existaient avant. Fait disparaître fromEl, puis affiche
   toEl. onBeforeShow (optionnel) s'exécute juste avant que toEl ne réapparaisse
   (utilisé pour rendre le contenu d'un projet avant d'afficher page5).
   -------------------------------------------------------------------------- */
function switchPage(fromEl, toEl, options) {
    const opts = options || {};
    const outDuration = opts.outDuration || DURATIONS.CATEGORY_OUT;
    const inDuration = opts.inDuration || DURATIONS.CATEGORY_IN;
    const display = opts.display || "block";
    const onBeforeShow = opts.onBeforeShow;

    try {
        if (!fromEl || !toEl) return;

        fromEl.style.transition = "opacity " + outDuration + "ms ease";
        fromEl.style.opacity = "0";
        fromEl.style.pointerEvents = "none";

        setTimeout(() => {
            fromEl.style.display = "none";

            if (typeof onBeforeShow === "function") onBeforeShow();

            toEl.style.display = display;
            toEl.scrollTop = 0;

            void toEl.offsetWidth; // force reflow pour que la transition d'entrée se joue

            toEl.style.transition = "opacity " + inDuration + "ms ease";
            toEl.style.opacity = "1";
            toEl.style.pointerEvents = "auto";
        }, outDuration);
    } catch (err) {
        console.error("[app] Erreur dans switchPage :", err);
    }
}

function openExperiences(e) {
    if (e) e.preventDefault();
    switchPage(getEl("page2"), getEl("page3"), {
        outDuration: DURATIONS.CATEGORY_OUT,
        inDuration: DURATIONS.CATEGORY_IN,
        display: "block"
    });
    setRoute("#/experiences");
}

function closeExperiences() {
    switchPage(getEl("page3"), getEl("page2"), {
        outDuration: DURATIONS.CATEGORY_IN,
        inDuration: DURATIONS.CATEGORY_OUT,
        display: "flex"
    });
    setRoute("#/");
}

function openProjects(e) {
    if (e) e.preventDefault();
    switchPage(getEl("page2"), getEl("page4"), {
        outDuration: DURATIONS.CATEGORY_OUT,
        inDuration: DURATIONS.CATEGORY_IN,
        display: "block"
    });
    setRoute("#/projets");
}

function closeProjects() {
    switchPage(getEl("page4"), getEl("page2"), {
        outDuration: DURATIONS.CATEGORY_IN,
        inDuration: DURATIONS.CATEGORY_OUT,
        display: "flex"
    });
    setRoute("#/");
}

/* --------------------------------------------------------------------------
   Page détail projet (page5, layout "Cartouche")
   -------------------------------------------------------------------------- */
window.openProject = function (projectId, options) {
    const opts = options || {};
    switchPage(getEl("page4"), getEl("page5"), {
        outDuration: DURATIONS.DETAIL_OUT,
        inDuration: DURATIONS.DETAIL_IN,
        display: "block",
        onBeforeShow: function () {
            if (typeof window.renderProjectDetail === "function") {
                window.renderProjectDetail(projectId);
            } else {
                console.warn("[app] renderProjectDetail() n'est pas défini pour :", projectId);
            }
        }
    });
    if (opts.updateRoute !== false) setRoute("#/projets/" + encodeURIComponent(projectId));
};

window.closeProjectDetail = function () {
    switchPage(getEl("page5"), getEl("page4"), {
        outDuration: DURATIONS.DETAIL_CLOSE,
        inDuration: DURATIONS.DETAIL_CLOSE,
        display: "block"
    });
    setRoute("#/projets");
};

// Navigation discrète "Projet Précédent / Suivant" : on reste sur page5,
// on ne fait qu'un léger fondu puis on re-rend le contenu pour le nouveau projet.
window.navigateProjectDetail = function (projectId) {
    try {
        const p5 = getEl("page5");
        if (!p5 || !projectId) return;

        p5.style.transition = "opacity " + DURATIONS.PROJECT_NAV + "ms ease";
        p5.style.opacity = "0";

        setTimeout(() => {
            if (typeof window.renderProjectDetail === "function") {
                window.renderProjectDetail(projectId);
            }
            p5.scrollTop = 0;

            void p5.offsetWidth;

            p5.style.opacity = "1";
        }, DURATIONS.PROJECT_NAV);

        setRoute("#/projets/" + encodeURIComponent(projectId));
    } catch (err) {
        console.error("[app] Erreur dans navigateProjectDetail :", err);
    }
};

/* Galerie modale, réutilisée pour les expériences et les documents de projet. */
const galleryState = {
    images: [],
    index: 0,
    title: ""
};

function normalizeGalleryItem(item) {
    if (typeof item === "string") {
        return { src: item, caption: "", pdf: "" };
    }
    return {
        src: (item && (item.src || item.image)) || "",
        caption: (item && item.caption) || "",
        pdf: (item && item.pdf) || ""
    };
}

function renderGalleryImage() {
    try {
        const img = getEl("gallery-image");
        const caption = getEl("gallery-caption");
        const counter = getEl("gallery-counter");
        const pdfLink = getEl("gallery-pdf-link");
        if (!img) return;

        const total = galleryState.images.length;
        if (total === 0) return;

        const current = galleryState.images[galleryState.index];

        resetZoom();
        img.style.transition = "opacity 0.25s ease";
        img.style.opacity = "0";

        // Évite un "reflash" de l'ancienne image pendant le chargement de la nouvelle.
        const reveal = () => {
            img.style.opacity = "1";
        };

        setTimeout(() => {
            img.addEventListener("load", reveal, { once: true });
            img.src = current.src;
            if (typeof window.attachImageFallback === "function") {
                window.attachImageFallback(img);
            }
            if (img.complete && img.naturalWidth > 0) {
                img.removeEventListener("load", reveal);
                reveal();
            }
        }, 120);

        if (caption) caption.textContent = current.caption || galleryState.title;
        if (counter) counter.textContent = (galleryState.index + 1) + " / " + total;

        if (pdfLink) {
            if (current.pdf) {
                pdfLink.href = current.pdf;
                pdfLink.classList.remove("hidden");
            } else {
                pdfLink.removeAttribute("href");
                pdfLink.classList.add("hidden");
            }
        }
    } catch (err) {
        console.error("[app] Erreur lors de l'affichage de l'image de la galerie :", err);
    }
}

function showGalleryModal(items, title, startIndex) {
    const modal = getEl("gallery-modal");
    if (!modal) return;

    galleryState.images = items.map(normalizeGalleryItem).filter((it) => it.src);
    galleryState.index = Math.min(Math.max(startIndex || 0, 0), Math.max(galleryState.images.length - 1, 0));
    galleryState.title = title || "";

    if (galleryState.images.length === 0) return;

    renderGalleryImage();

    const nav = getEl("gallery-nav");
    if (nav) nav.style.display = galleryState.images.length > 1 ? "flex" : "none";

    modal.classList.remove("hidden");
    modal.classList.add("flex");
    modal.scrollTop = 0;
    document.body.style.overflow = "hidden";
}

window.openGallery = function (experienceId) {
    try {
        const experiences = (window.SITE_DATA && window.SITE_DATA.experiences) || [];
        const exp = experiences.find((e) => e.id === experienceId);

        if (!exp || !Array.isArray(exp.images) || exp.images.length === 0) {
            console.warn("[app] Aucune image trouvée pour l'expérience :", experienceId);
            return;
        }

        showGalleryModal(exp.images, exp.title || "", 0);
    } catch (err) {
        console.error("[app] Erreur dans openGallery :", err);
    }
};

// Même visionneuse que la galerie d'expériences, pour les documents de projet.
window.openProjectDocuments = function (docs, projectTitle, startIndex) {
    try {
        if (!Array.isArray(docs) || docs.length === 0) {
            console.warn("[app] Aucun document à afficher pour ce projet.");
            return;
        }
        showGalleryModal(docs, projectTitle || "", startIndex);
    } catch (err) {
        console.error("[app] Erreur dans openProjectDocuments :", err);
    }
};

window.closeGallery = function () {
    try {
        const modal = getEl("gallery-modal");
        if (!modal) return;

        modal.classList.add("hidden");
        modal.classList.remove("flex");
        document.body.style.overflow = "auto";
    } catch (err) {
        console.error("[app] Erreur dans closeGallery :", err);
    }
};

window.navigateGallery = function (direction) {
    try {
        const total = galleryState.images.length;
        if (total === 0) return;
        galleryState.index = (galleryState.index + direction + total) % total;
        renderGalleryImage();
    } catch (err) {
        console.error("[app] Erreur dans navigateGallery :", err);
    }
};

/* Zoom & déplacement dans la visionneuse : molette, double-clic, glisser, pincement. */
const zoomState = {
    scale: 1,
    x: 0,
    y: 0,
    minScale: 1,
    maxScale: 5
};

function clampZoomScale(s) {
    return Math.min(zoomState.maxScale, Math.max(zoomState.minScale, s));
}

function applyZoomTransform() {
    const img = getEl("gallery-image");
    if (!img) return;
    img.style.transform = "translate(" + zoomState.x + "px, " + zoomState.y + "px) scale(" + zoomState.scale + ")";
    img.style.cursor = zoomState.scale > 1 ? "grab" : "zoom-in";
}

function resetZoom() {
    zoomState.scale = 1;
    zoomState.x = 0;
    zoomState.y = 0;
    const img = getEl("gallery-image");
    if (img) img.style.transition = "transform 0.15s ease-out";
    applyZoomTransform();
}

(function setupGalleryZoom() {
    const img = getEl("gallery-image");
    if (!img) return;

    img.style.transformOrigin = "center center";
    img.style.transition = "transform 0.15s ease-out";
    img.style.touchAction = "none"; // le geste (pan/pinch) est géré à la main

    img.addEventListener(
        "wheel",
        function (e) {
            e.preventDefault();
            const rect = img.getBoundingClientRect();
            const offsetX = e.clientX - (rect.left + rect.width / 2);
            const offsetY = e.clientY - (rect.top + rect.height / 2);

            const prevScale = zoomState.scale;
            const nextScale = clampZoomScale(prevScale * (1 - e.deltaY * 0.0015));
            const ratio = nextScale / prevScale;

            zoomState.x = (zoomState.x - offsetX) * ratio + offsetX;
            zoomState.y = (zoomState.y - offsetY) * ratio + offsetY;
            zoomState.scale = nextScale;

            img.style.transition = "none";
            if (zoomState.scale <= 1.01) {
                resetZoom();
            } else {
                applyZoomTransform();
            }
        },
        { passive: false }
    );

    img.addEventListener("dblclick", function (e) {
        if (zoomState.scale > 1) {
            resetZoom();
            return;
        }
        const rect = img.getBoundingClientRect();
        const offsetX = e.clientX - (rect.left + rect.width / 2);
        const offsetY = e.clientY - (rect.top + rect.height / 2);
        const nextScale = 2.5;

        img.style.transition = "transform 0.2s ease-out";
        zoomState.x = -offsetX * (nextScale - 1);
        zoomState.y = -offsetY * (nextScale - 1);
        zoomState.scale = nextScale;
        applyZoomTransform();
    });

    const pointers = new Map();
    let isPanning = false;
    let panStart = { x: 0, y: 0 };
    let translateStart = { x: 0, y: 0 };
    let pinchStartDistance = 0;
    let pinchStartScale = 1;
    let pinchMidpoint = { x: 0, y: 0 };

    function pointerDistance(p1, p2) {
        return Math.hypot(p1.x - p2.x, p1.y - p2.y);
    }

    img.addEventListener("pointerdown", function (e) {
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
        try {
            img.setPointerCapture(e.pointerId);
        } catch (err) {
            // certains navigateurs refusent la capture sur <img>, sans conséquence
        }

        if (pointers.size === 1 && zoomState.scale > 1) {
            isPanning = true;
            panStart = { x: e.clientX, y: e.clientY };
            translateStart = { x: zoomState.x, y: zoomState.y };
            img.style.transition = "none";
            img.style.cursor = "grabbing";
        } else if (pointers.size === 2) {
            isPanning = false;
            const pts = Array.from(pointers.values());
            pinchStartDistance = pointerDistance(pts[0], pts[1]);
            pinchStartScale = zoomState.scale;
            const rect = img.getBoundingClientRect();
            pinchMidpoint = {
                x: (pts[0].x + pts[1].x) / 2 - (rect.left + rect.width / 2),
                y: (pts[0].y + pts[1].y) / 2 - (rect.top + rect.height / 2)
            };
        }
    });

    img.addEventListener("pointermove", function (e) {
        if (!pointers.has(e.pointerId)) return;
        pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

        if (pointers.size === 2 && pinchStartDistance > 0) {
            const pts = Array.from(pointers.values());
            const newDistance = pointerDistance(pts[0], pts[1]);
            const nextScale = clampZoomScale(pinchStartScale * (newDistance / pinchStartDistance));
            const ratio = nextScale / zoomState.scale;

            zoomState.x = (zoomState.x - pinchMidpoint.x) * ratio + pinchMidpoint.x;
            zoomState.y = (zoomState.y - pinchMidpoint.y) * ratio + pinchMidpoint.y;
            zoomState.scale = nextScale;

            img.style.transition = "none";
            applyZoomTransform();
        } else if (isPanning && pointers.size === 1) {
            zoomState.x = translateStart.x + (e.clientX - panStart.x);
            zoomState.y = translateStart.y + (e.clientY - panStart.y);
            img.style.transition = "none";
            applyZoomTransform();
        }
    });

    function endPointer(e) {
        pointers.delete(e.pointerId);
        if (pointers.size < 2) pinchStartDistance = 0;
        if (pointers.size === 0) {
            isPanning = false;
            img.style.transition = "transform 0.15s ease-out";
            if (zoomState.scale <= 1.01) {
                resetZoom();
            } else {
                applyZoomTransform();
            }
        }
    }

    img.addEventListener("pointerup", endPointer);
    img.addEventListener("pointercancel", endPointer);
    img.addEventListener("pointerleave", function (e) {
        if (e.buttons === 0) endPointer(e);
    });
})();

// Fermeture au clavier (Échap) et navigation (flèches) quand la galerie est ouverte.
document.addEventListener("keydown", function (e) {
    const modal = document.getElementById("gallery-modal");
    if (!modal || modal.classList.contains("hidden")) return;

    if (e.key === "Escape") window.closeGallery();
    if (e.key === "ArrowRight") window.navigateGallery(1);
    if (e.key === "ArrowLeft") window.navigateGallery(-1);
});

// Passage en plein écran ; callback appelé une fois le viewport stabilisé.
function requestSiteFullscreen(callback) {
    try {
        const el = document.documentElement;
        const request =
            el.requestFullscreen ||
            el.webkitRequestFullscreen || // Safari
            el.msRequestFullscreen; // vieux Edge/IE

        const alreadyFullscreen = document.fullscreenElement || document.webkitFullscreenElement;

        if (request && !alreadyFullscreen) {
            const result = request.call(el);

            if (result && typeof result.then === "function") {
                result
                    .then(() => {
                        requestAnimationFrame(() => requestAnimationFrame(callback));
                    })
                    .catch(() => {
                        callback();
                    });
                return;
            }

            setTimeout(callback, 50);
            return;
        }
    } catch (err) {
        console.warn("[app] Passage en plein écran impossible :", err);
    }

    callback();
}

// Empêche de relancer l'animation si elle est déjà en cours (double-clic, etc.).
let introAnimationStarted = false;

function explodePortfolio() {
    if (introAnimationStarted) return;
    introAnimationStarted = true;

    const title = getEl("portfolio-title");
    if (title) title.style.pointerEvents = "none";

    requestSiteFullscreen(runExplodeAnimation);
}

function runExplodeAnimation() {
    try {
        const title = getEl("portfolio-title");
        const p1 = getEl("page1");
        const p2 = getEl("page2");
        const overlay = getEl("white-overlay");
        const wordProjects = getEl("word-projects");
        const wordExperiences = getEl("word-experiences");

        if (!title || !p1 || !p2 || !overlay || !wordProjects || !wordExperiences) {
            console.error("[app] Éléments manquants : animation d'éclatement annulée.");
            return;
        }

        title.style.pointerEvents = "none";

        p2.style.opacity = "0";
        p2.style.display = "flex";

        const startSpans = title.querySelectorAll(".letter");
        const projSpans = wordProjects.querySelectorAll(".letter");
        const expSpans = wordExperiences.querySelectorAll(".letter");

        if (startSpans.length < 9 || projSpans.length < 7 || expSpans.length < 11) {
            console.error("[app] Le nombre de lettres attendu ne correspond pas au HTML : animation annulée.");
            title.style.pointerEvents = "auto";
            return;
        }

        const mapping = [
            { source: 0, targetWord: projSpans, targetIndex: 0 },
            { source: 1, targetWord: projSpans, targetIndex: 2 },
            { source: 2, targetWord: expSpans, targetIndex: 4 },
            { source: 3, targetWord: projSpans, targetIndex: 5 },
            { source: 4, targetWord: null, targetIndex: null },
            { source: 5, targetWord: null, targetIndex: null },
            { source: 6, targetWord: null, targetIndex: null },
            { source: 7, targetWord: expSpans, targetIndex: 5 },
            { source: 8, targetWord: null, targetIndex: null }
        ];

        const clones = [];

        startSpans.forEach((span, i) => {
            const rect = span.getBoundingClientRect();
            const style = window.getComputedStyle(span);

            const clone = document.createElement("span");
            clone.innerText = span.innerText;
            clone.className = "letter";

            clone.style.position = "fixed";
            clone.style.top = rect.top + "px";
            clone.style.left = rect.left + "px";
            clone.style.fontSize = style.fontSize;
            clone.style.fontWeight = style.fontWeight;
            clone.style.color = "white";
            clone.style.zIndex = "50";
            clone.style.margin = "0";

            clone.style.transition = "all 1s cubic-bezier(0.25, 1, 0.3, 1)";

            document.body.appendChild(clone);

            let targetEl = null;
            if (mapping[i].targetWord) {
                targetEl = mapping[i].targetWord[mapping[i].targetIndex];
            }
            clones.push({ element: clone, target: targetEl });
        });

        title.style.opacity = "0";
        projSpans.forEach((s) => (s.style.opacity = "0"));
        expSpans.forEach((s) => (s.style.opacity = "0"));

        document.body.offsetHeight; // force reflow

        overlay.style.opacity = "1";

        clones.forEach((cloneData) => {
            if (cloneData.target) {
                const targetRect = cloneData.target.getBoundingClientRect();
                const targetStyle = window.getComputedStyle(cloneData.target);

                cloneData.element.style.top = targetRect.top + "px";
                cloneData.element.style.left = targetRect.left + "px";
                cloneData.element.style.fontSize = targetStyle.fontSize;
                cloneData.element.style.color = "black";
            } else {
                const angle = Math.random() * Math.PI * 2;
                const distance = 150 + Math.random() * 300;
                const destX = Math.cos(angle) * distance;
                const destY = Math.sin(angle) * distance;
                const rot = Math.random() * 180 - 90;

                cloneData.element.style.transform =
                    "translate(" + destX + "px, " + destY + "px) rotate(" + rot + "deg) scale(0.2)";
                cloneData.element.style.opacity = "0";
                cloneData.element.style.color = "#ccc";
            }
        });

        const FLIGHT_DURATION = 1000; // ms, durée du vol des lettres (doit correspondre à la transition des clones et de l'overlay)

        setTimeout(() => {
            p2.style.opacity = "1";
            p2.style.pointerEvents = "auto";

            // Les lettres "capturées" par le vol basculent instantanément vers leur état final.
            projSpans.forEach((span, i) => {
                if (mapping.find((m) => m.targetWord === projSpans && m.targetIndex === i)) {
                    span.style.transition = "none";
                    span.style.opacity = "1";
                }
            });
            expSpans.forEach((span, i) => {
                if (mapping.find((m) => m.targetWord === expSpans && m.targetIndex === i)) {
                    span.style.transition = "none";
                    span.style.opacity = "1";
                }
            });

            clones.forEach((c) => c.element.remove());

            // Fait apparaître les lettres restantes en fondu, dans un ordre aléatoire.
            const fadeDuration = 1100;
            const stagger = 70;
            const easing = "cubic-bezier(0.45, 0, 0.15, 1)";

            const remainingLetters = [];

            projSpans.forEach((span, i) => {
                if (!mapping.find((m) => m.targetWord === projSpans && m.targetIndex === i)) {
                    remainingLetters.push(span);
                }
            });
            expSpans.forEach((span, i) => {
                if (!mapping.find((m) => m.targetWord === expSpans && m.targetIndex === i)) {
                    remainingLetters.push(span);
                }
            });

            // Fisher-Yates
            for (let i = remainingLetters.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const tmp = remainingLetters[i];
                remainingLetters[i] = remainingLetters[j];
                remainingLetters[j] = tmp;
            }

            let maxDelay = 0;

            remainingLetters.forEach((span, order) => {
                const delay = order * stagger;
                span.style.transition = "opacity " + fadeDuration + "ms " + easing + " " + delay + "ms";
                span.style.opacity = "1";
                if (delay > maxDelay) maxDelay = delay;
            });

            setTimeout(() => {
                try {
                    projSpans.forEach((s) => {
                        s.style.transition = "none";
                        s.style.opacity = "1";
                    });
                    expSpans.forEach((s) => {
                        s.style.transition = "none";
                        s.style.opacity = "1";
                    });

                    p1.style.display = "none";
                    overlay.style.display = "none";

                    document.body.style.overflow = "auto";
                } catch (err) {
                    console.error("[app] Erreur lors du nettoyage de l'animation :", err);
                }
            }, maxDelay + fadeDuration + 100);
        }, FLIGHT_DURATION);
    } catch (err) {
        console.error("[app] Erreur dans runExplodeAnimation :", err);
        const p1 = document.getElementById("page1");
        const p2 = document.getElementById("page2");
        if (p1 && p2) {
            p1.style.display = "none";
            p2.style.display = "flex";
            p2.style.opacity = "1";
            p2.style.pointerEvents = "auto";
            document.body.style.overflow = "auto";
        }
    }
}

/* --------------------------------------------------------------------------
   Page 1 : ouverture au clic, au clavier (Entrée/Espace) et à la molette.
   Remplace l'ancien "onclick" inline dans le HTML, qui n'était accessible
   qu'à la souris (un <div> n'est pas focusable/activable au clavier par défaut).
   -------------------------------------------------------------------------- */
function setupPage1Entry() {
    const page1 = getEl("page1");
    if (!page1) return;

    page1.addEventListener("click", explodePortfolio);

    page1.addEventListener("keydown", function (e) {
        // Ignore les touches qui remontent depuis un enfant interactif (ex. le
        // lien ENSASE) : on ne veut déclencher l'ouverture que si c'est bien
        // la page elle-même qui a le focus, pas un élément qu'elle contient.
        if (e.target !== page1) return;
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
            e.preventDefault();
            explodePortfolio();
        }
    });
}

/* --------------------------------------------------------------------------
   Routing léger par hash : #/, #/experiences, #/projets, #/projets/<id>
   Permet de partager un lien direct vers un projet précis, d'utiliser les
   boutons précédent/suivant du navigateur, et donne une URL par page utile
   pour le référencement (voir aussi robots.txt et sitemap.xml).
   -------------------------------------------------------------------------- */
let isApplyingRoute = false;

function setRoute(hash) {
    if (isApplyingRoute) return; // évite de redéclencher applyRoute en boucle
    if (location.hash === hash) return;
    try {
        history.pushState(null, "", hash);
    } catch (err) {
        location.hash = hash;
    }
}

function parseRoute() {
    const raw = (location.hash || "").replace(/^#\/?/, "");
    const parts = raw.split("/").filter(Boolean).map(decodeURIComponent);

    if (parts[0] === "projets" && parts[1]) return { page: "detail", projectId: parts[1] };
    if (parts[0] === "projets") return { page: "projects" };
    if (parts[0] === "experiences") return { page: "experiences" };
    return { page: "home" };
}

// Affiche directement la bonne page (chargement d'un lien direct, ou clic sur
// précédent/suivant du navigateur), sans rejouer l'animation d'introduction.
function showPageImmediately(pageId, displayValue) {
    ["page1", "page2", "page3", "page4", "page5"].forEach((id) => {
        const el = getEl(id);
        if (!el) return;
        const isTarget = id === pageId;
        el.style.transition = "none";
        el.style.display = isTarget ? displayValue : "none";
        el.style.opacity = isTarget ? "1" : "0";
        el.style.pointerEvents = isTarget ? "auto" : "none";
    });
    document.body.style.overflow = "auto";
}

function applyRoute() {
    try {
        isApplyingRoute = true;
        const route = parseRoute();

        if (route.page === "home") return; // l'accueil (page1) reste tel quel

        // On saute l'animation d'intro : la page 1 ne doit plus réagir au clic.
        introAnimationStarted = true;

        if (route.page === "experiences") {
            showPageImmediately("page3", "block");
        } else if (route.page === "projects") {
            showPageImmediately("page4", "block");
        } else if (route.page === "detail") {
            if (typeof window.renderProjectDetail === "function") {
                window.renderProjectDetail(route.projectId);
            }
            showPageImmediately("page5", "block");
        }
    } catch (err) {
        console.error("[app] Erreur lors de l'application de la route :", err);
    } finally {
        isApplyingRoute = false;
    }
}

window.addEventListener("popstate", applyRoute);

function initApp() {
    setupPage1Entry();
    applyRoute();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
