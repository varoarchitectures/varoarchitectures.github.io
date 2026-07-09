/* Lit window.SITE_DATA (js/data.js) et construit le HTML des pages EXPERIENCES et PROJECTS. */

(function () {
    "use strict";

    function attachImageFallback(imgEl) {
        imgEl.addEventListener("error", function onError() {
            imgEl.removeEventListener("error", onError);
            imgEl.classList.add("img-broken");
            imgEl.src =
                "data:image/svg+xml;charset=UTF-8," +
                encodeURIComponent(
                    '<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">' +
                    '<rect width="100%" height="100%" fill="#e5e5e5"/>' +
                    '<text x="50%" y="50%" font-family="sans-serif" font-size="24" ' +
                    'fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">' +
                    "Image indisponible</text></svg>"
                );
        });
    }

    function escapeHtml(str) {
        if (typeof str !== "string") return "";
        return str
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }

    // Décode un champ de contact obfusqué (tableau de codes de caractères, voir
    // js/data.js). But : éviter que l'email/téléphone traînent en clair dans le
    // HTML/JS statique, moissonnable par un simple robot spammeur, tout en
    // gardant un lien mailto/tel normal et cliquable pour un visiteur humain.
    function decodeContactField(parts) {
        if (!Array.isArray(parts)) return "";
        return String.fromCharCode.apply(null, parts);
    }

    function showSectionError(container, message) {
        if (!container) return;
        container.innerHTML =
            '<p class="content-error">' + escapeHtml(message) + "</p>";
    }

    // ------------------------------------------------------------------
    // PROFIL (colonne gauche de la page EXPERIENCES)
    // ------------------------------------------------------------------
    function renderProfile() {
        const container = document.getElementById("profile-content");
        if (!container) return;

        try {
            const p = window.SITE_DATA.profile;
            if (!p) throw new Error("Aucune donnée de profil (SITE_DATA.profile manquant)");

            const formationHtml = (p.formation || [])
                .map(
                    (f) =>
                        '<div class="flex gap-4">' +
                        '<span class="font-medium min-w-[40px]">' + escapeHtml(f.year) + "</span>" +
                        '<span class="text-gray-700">' + escapeHtml(f.label) + "</span>" +
                        "</div>"
                )
                .join("");

            const softwareHtml = (p.software || [])
                .map((s) => "<li>" + escapeHtml(s) + "</li>")
                .join("");

            const languagesHtml = (p.languages || [])
                .map((l) => "<li>" + escapeHtml(l) + "</li>")
                .join("");

            const email = decodeContactField(p.contact.emailParts);
            const phone = decodeContactField(p.contact.phoneParts);
            const phoneHref = phone.replace(/[^+\d]/g, "");

            container.innerHTML = `
                <div>
                    <h2 class="text-4xl md:text-5xl font-light tracking-widest uppercase mb-2">${escapeHtml(p.name)}</h2>
                    <p class="text-gray-500 uppercase tracking-widest text-sm mb-6">${escapeHtml(p.role)}</p>
                    <p class="font-light leading-relaxed text-gray-800">${escapeHtml(p.bio)}</p>
                </div>

                <div class="w-full h-px bg-black/20"></div>

                <div>
                    <h3 class="uppercase tracking-[0.15em] text-sm font-medium mb-4">Contact</h3>
                    <ul class="space-y-2 font-light text-sm text-gray-700">
                        <li>${escapeHtml(p.contact.address)}</li>
                        <li><a href="mailto:${escapeHtml(email)}" class="hover:text-black hover:underline underline-offset-4">${escapeHtml(email)}</a></li>
                        <li><a href="tel:${escapeHtml(phoneHref)}" class="hover:text-black hover:underline underline-offset-4">${escapeHtml(phone)}</a></li>
                        <li>${escapeHtml(p.contact.permit)}</li>
                    </ul>
                </div>

                <div class="w-full h-px bg-black/20"></div>

                <div>
                    <h3 class="uppercase tracking-[0.15em] text-sm font-medium mb-4">Formation</h3>
                    <div class="space-y-4 font-light text-sm">${formationHtml}</div>
                </div>

                <div class="w-full h-px bg-black/20"></div>

                <div class="grid grid-cols-2 gap-8">
                    <div>
                        <h3 class="uppercase tracking-[0.15em] text-sm font-medium mb-4">Logiciels</h3>
                        <ul class="space-y-1 font-light text-sm text-gray-700">${softwareHtml}</ul>
                    </div>
                    <div>
                        <h3 class="uppercase tracking-[0.15em] text-sm font-medium mb-4">Langues</h3>
                        <ul class="space-y-1 font-light text-sm text-gray-700">${languagesHtml}</ul>
                    </div>
                </div>
            `;
        } catch (err) {
            console.error("[render] Erreur lors de l'affichage du profil :", err);
            showSectionError(container, "Le profil n'a pas pu être chargé.");
        }
    }

    // ------------------------------------------------------------------
    // EXPÉRIENCES (timeline, sans images inline)
    // ------------------------------------------------------------------
    function renderExperiences() {
        const container = document.getElementById("experiences-list");
        if (!container) return;

        try {
            const list = window.SITE_DATA.experiences;
            if (!Array.isArray(list) || list.length === 0) {
                throw new Error("Aucune expérience à afficher (SITE_DATA.experiences vide ou manquant)");
            }

            container.innerHTML = list
                .map((exp, i) => {
                    const isLast = i === list.length - 1;
                    const detailHtml = exp.detail
                        ? '<br><span class="text-black">→</span> ' + escapeHtml(exp.detail)
                        : "";

                    const hasImages = Array.isArray(exp.images) && exp.images.length > 0;

                    const titleHtml = hasImages
                        ? `<button type="button" data-gallery-id="${escapeHtml(exp.id)}"
                               class="gallery-trigger group relative block text-left mb-2 h-8 md:h-9 overflow-hidden cursor-pointer">
                               <span class="block text-xl md:text-2xl font-medium uppercase tracking-wider transition-all duration-300 ease-out group-hover:-translate-y-8 group-hover:opacity-0">
                                   ${escapeHtml(exp.title)}
                               </span>
                               <span class="absolute inset-0 flex items-center text-xl md:text-2xl font-medium uppercase tracking-wider text-gray-400 translate-y-8 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                                   Voir la Galerie
                               </span>
                           </button>`
                        : `<h3 class="text-xl md:text-2xl font-medium uppercase tracking-wider mb-2">${escapeHtml(exp.title)}</h3>`;

                    return `
                        <div class="border-t border-black py-10 grid grid-cols-1 md:grid-cols-4 gap-6 group${isLast ? " border-b" : ""}">
                            <div class="md:col-span-1 text-2xl font-light tracking-wide text-gray-400 group-hover:text-black transition-colors">
                                ${escapeHtml(exp.period)}
                            </div>
                            <div class="md:col-span-3">
                                ${titleHtml}
                                <p class="text-sm uppercase tracking-widest text-gray-500 mb-4">${escapeHtml(exp.subtitle)}</p>
                                <p class="text-gray-600 font-light leading-relaxed">
                                    ${escapeHtml(exp.description)}${detailHtml}
                                </p>
                            </div>
                        </div>
                    `;
                })
                .join("");

            container.querySelectorAll(".gallery-trigger").forEach((btn) => {
                btn.addEventListener("click", function () {
                    const id = btn.getAttribute("data-gallery-id");
                    if (typeof window.openGallery === "function") {
                        window.openGallery(id);
                    } else {
                        console.warn("[render] openGallery() n'est pas défini pour :", id);
                    }
                });
            });
        } catch (err) {
            console.error("[render] Erreur lors de l'affichage des expériences :", err);
            showSectionError(container, "Les expériences n'ont pas pu être chargées.");
        }
    }

    // ------------------------------------------------------------------
    // PROJETS (3 grilles : conception / analyse / objet)
    // ------------------------------------------------------------------
    function renderProjectGrid(containerId, items, aspectClass) {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            if (!Array.isArray(items) || items.length === 0) {
                throw new Error("Aucun projet à afficher pour #" + containerId);
            }

            container.innerHTML = items
                .map(
                    (proj) => `
                        <a href="#/projets/${escapeHtml(proj.id)}" data-project-id="${escapeHtml(proj.id)}" class="project-link group block">
                            <div class="relative w-full ${aspectClass} overflow-hidden bg-gray-100">
                                <img src="${escapeHtml(proj.image)}" alt="${escapeHtml(proj.alt || proj.title)}"
                                     loading="lazy" decoding="async"
                                     class="cv-image w-full h-full object-cover object-top" data-fallback="true">
                                <div class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 pointer-events-none"></div>
                            </div>
                            <div class="pt-4 flex items-start justify-between gap-4">
                                <h3 class="text-base md:text-lg font-medium uppercase tracking-wider">${escapeHtml(proj.title)}</h3>
                                <span class="text-xs uppercase tracking-widest text-gray-400 whitespace-nowrap">${escapeHtml(proj.meta)}</span>
                            </div>
                        </a>
                    `
                )
                .join("");

            container.querySelectorAll("img[data-fallback='true']").forEach(attachImageFallback);

            container.querySelectorAll(".project-link").forEach((link) => {
                link.addEventListener("click", function (e) {
                    e.preventDefault();
                    const id = link.getAttribute("data-project-id");
                    if (typeof window.openProject === "function") {
                        window.openProject(id);
                    } else {
                        console.warn("[render] openProject() n'est pas défini pour le projet :", id);
                    }
                });
            });
        } catch (err) {
            console.error("[render] Erreur lors de l'affichage de la grille '" + containerId + "' :", err);
            showSectionError(container, "Ces projets n'ont pas pu être chargés.");
        }
    }

    function renderProjects() {
        try {
            const data = window.SITE_DATA.projects || {};
            renderProjectGrid("conception-grid", data.conception, "aspect-[10/13]");
            renderProjectGrid("analyse-grid", data.analyse, "aspect-[10/13]");
            renderProjectGrid("objet-grid", data.objet, "aspect-[10/13]");
        } catch (err) {
            console.error("[render] Erreur générale sur la page projets :", err);
        }
    }

    // ------------------------------------------------------------------
    // PROJECT DETAIL PAGE ("Cartouche" layout)
    // ------------------------------------------------------------------
    function flattenProjects() {
        const data = window.SITE_DATA.projects || {};
        return [].concat(data.conception || [], data.analyse || [], data.objet || []);
    }

    function renderProjectDetail(projectId) {
        try {
            const all = flattenProjects();
            const idx = all.findIndex((p) => p.id === projectId);
            if (idx === -1) throw new Error("Project not found: " + projectId);

            const proj = all[idx];
            const d = proj.detail || {};

            const breadcrumb = document.getElementById("detail-breadcrumb-title");
            if (breadcrumb) breadcrumb.textContent = proj.title;

            const titleEl = document.getElementById("detail-title");
            if (titleEl) titleEl.textContent = proj.title;

            const manifestoEl = document.getElementById("detail-manifesto");
            if (manifestoEl) manifestoEl.textContent = d.manifesto || "";

            const metaEl = document.getElementById("detail-meta");
            if (metaEl) {
                const rows = [
                    ["Année", d.year],
                    ["Semestre", d.semester],
                    ["Enseignant", d.teacher],
                    ["Lieu", d.location]
                ];
                metaEl.innerHTML = rows
                    .filter(([, value]) => !!value)
                    .map(
                        ([label, value]) =>
                            '<div class="text-gray-400">' + escapeHtml(label) + "</div>" +
                            '<div class="text-black font-medium">' + escapeHtml(value) + "</div>"
                    )
                    .join("");
            }

            const heroImg = document.getElementById("detail-hero-image");
            const heroFrame = document.getElementById("detail-hero-frame");
            if (heroImg) {
                heroImg.src = d.hero || proj.image || "";
                heroImg.alt = proj.alt || proj.title;
                attachImageFallback(heroImg);

                // Par défaut : portrait 10:13 recadré (object-cover). Si l'image héro
                // est un plan/une planche, "heroFit: 'contain'" dans data.js l'affiche entière.
                if (heroFrame) {
                    if (d.heroFit === "contain") {
                        heroFrame.className = "w-full flex items-center justify-center overflow-hidden";
                        heroFrame.style.cssText = "max-height: 78vh; max-width: 100%;";
                        heroImg.className = "max-w-full max-h-full object-contain";
                        heroImg.style.cssText = "";
                    } else {
                        heroFrame.className = "w-full bg-gray-100 overflow-hidden";
                        heroFrame.style.cssText = "aspect-ratio: 10 / 13; max-height: 78vh; max-width: 100%;";
                        heroImg.className = "w-full h-full object-cover object-center";
                        heroImg.style.cssText = "";
                    }
                }
            }

            const processSection = document.getElementById("detail-process-section");
            const processGrid = document.getElementById("detail-process-grid");
            if (processGrid) {
                const items = Array.isArray(d.process) ? d.process : [];
                if (items.length === 0) {
                    if (processSection) processSection.classList.add("hidden");
                } else {
                    if (processSection) processSection.classList.remove("hidden");

                    // 3 cadres par ligne par défaut, ajustable via "processColumns" dans data.js.
                    const processColumns = d.processColumns || 3;
                    processGrid.className = "grid grid-cols-1 sm:grid-cols-" + processColumns + " gap-16 md:gap-24";

                    processGrid.innerHTML = items
                        .map(
                            (item) => `
                                <figure class="flex flex-col items-center text-center">
                                    <div class="w-full max-w-[220px] aspect-square bg-gray-50 overflow-hidden">
                                        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.caption || "")}" loading="lazy" decoding="async" class="w-full h-full object-cover" data-fallback="true">
                                    </div>
                                    ${item.caption ? '<figcaption class="mt-4 text-xs uppercase tracking-[0.15em] text-gray-400">' + escapeHtml(item.caption) + "</figcaption>" : ""}
                                </figure>
                            `
                        )
                        .join("");
                    processGrid.querySelectorAll("img[data-fallback='true']").forEach(attachImageFallback);
                }
            }

            // Liste des documents "visionnables" (plans, coupes, détail constructif),
            // pour la visionneuse partagée avec la galerie des expériences.
            // "tectonic" peut être une image unique ou un tableau : normalisé ici.
            const tectonicList = Array.isArray(d.tectonic) ? d.tectonic : (d.tectonic ? [d.tectonic] : []);
            const tectonicDocs = tectonicList.map((img) => ({
                image: img,
                pdf: !Array.isArray(d.tectonic) ? d.tectonicPdf : undefined,
                caption: d.tectonicTitle || "Détail constructif"
            }));

            const projectDocuments = []
                .concat(Array.isArray(d.technical) ? d.technical : [])
                .concat(tectonicDocs);

            const technicalSection = document.getElementById("detail-technical-section");
            const technicalGrid = document.getElementById("detail-technical-grid");
            if (technicalGrid) {
                const items = Array.isArray(d.technical) ? d.technical : [];
                if (items.length === 0) {
                    if (technicalSection) technicalSection.classList.add("hidden");
                } else {
                    if (technicalSection) technicalSection.classList.remove("hidden");

                    // Calage selon l'orientation des documents (voir "technicalOrientation"
                    // dans data.js) : plan + coupe toujours côte à côte, seule la hauteur
                    // du cadre change (plus basse en "landscape" pour tenir en largeur).
                    const orientation = d.technicalOrientation === "landscape" ? "landscape" : "portrait";
                    // 2 documents par groupe par défaut, ajustable via "technicalGroupSize".
                    const groupSize = d.technicalGroupSize || 2;
                    const frameHeight = orientation === "landscape" ? "42vh" : "62vh";

                    const groups = [];
                    for (let i = 0; i < items.length; i += groupSize) {
                        groups.push(items.slice(i, i + groupSize));
                    }

                    technicalGrid.innerHTML = groups
                        .map((group, i) => {
                            const frames = group
                                .map(
                                    (item) => `
                                        <figure class="flex flex-col items-center">
                                            <button type="button" class="doc-viewer-trigger group/doc relative bg-white flex items-center justify-center overflow-hidden cursor-zoom-in appearance-none border-0 p-0 m-0" style="height: ${frameHeight}; max-width: 100%;"
                                                    data-doc-index="${projectDocuments.indexOf(item)}">
                                                <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.caption || "")}" loading="lazy" decoding="async" class="max-w-full max-h-full object-contain" data-fallback="true">
                                                <span class="absolute inset-0 bg-black/0 group-hover/doc:bg-black/5 transition-colors duration-300 pointer-events-none"></span>
                                                <span class="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.15em] bg-white/90 px-2 py-1 opacity-0 group-hover/doc:opacity-100 transition-opacity duration-300">Agrandir</span>
                                            </button>
                                            ${item.caption ? '<figcaption class="mt-6 text-xs uppercase tracking-[0.15em] text-gray-400 text-center">' + escapeHtml(item.caption) + "</figcaption>" : ""}
                                        </figure>
                                    `
                                )
                                .join("");
                            return `
                                <div class="min-h-screen flex flex-col items-center justify-center py-16${i > 0 ? " border-t border-black/10" : ""}">
                                    <div class="flex flex-col md:flex-row items-center md:items-start justify-center gap-10 md:gap-16 w-full px-6">
                                        ${frames}
                                    </div>
                                </div>
                            `;
                        })
                        .join("");
                    technicalGrid.querySelectorAll("img[data-fallback='true']").forEach(attachImageFallback);
                    technicalGrid.querySelectorAll(".doc-viewer-trigger").forEach((btn) => {
                        btn.addEventListener("click", function () {
                            if (typeof window.openProjectDocuments === "function") {
                                window.openProjectDocuments(projectDocuments, proj.title, parseInt(btn.getAttribute("data-doc-index"), 10));
                            }
                        });
                    });
                }
            }

            const tectonicSection = document.getElementById("detail-tectonic-section");
            const tectonicGrid = document.getElementById("detail-tectonic-grid");
            const tectonicTitleEl = document.getElementById("detail-tectonic-title");
            if (tectonicGrid) {
                if (tectonicDocs.length === 0) {
                    if (tectonicSection) tectonicSection.classList.add("hidden");
                } else {
                    if (tectonicSection) tectonicSection.classList.remove("hidden");
                    if (tectonicTitleEl) tectonicTitleEl.textContent = d.tectonicTitle || "Détail";

                    tectonicGrid.innerHTML = tectonicDocs
                        .map(
                            (item) => `
                                <button type="button" class="doc-viewer-trigger group/doc relative bg-white flex items-center justify-center overflow-hidden cursor-zoom-in appearance-none border-0 p-0 m-0 w-full" style="height: 62vh; max-width: 100%;"
                                        data-doc-index="${projectDocuments.indexOf(item)}">
                                    <img src="${escapeHtml(item.image)}" alt="${escapeHtml(proj.title)} \u2014 ${escapeHtml(item.caption || "")}" loading="lazy" decoding="async" class="max-w-full max-h-full object-contain" data-fallback="true">
                                    <span class="absolute inset-0 bg-black/0 group-hover/doc:bg-black/5 transition-colors duration-300 pointer-events-none"></span>
                                    <span class="absolute bottom-3 right-3 text-[10px] uppercase tracking-[0.15em] bg-white/90 px-2 py-1 opacity-0 group-hover/doc:opacity-100 transition-opacity duration-300">Agrandir</span>
                                </button>
                            `
                        )
                        .join("");
                    tectonicGrid.querySelectorAll("img[data-fallback='true']").forEach(attachImageFallback);
                    tectonicGrid.querySelectorAll(".doc-viewer-trigger").forEach((btn) => {
                        btn.addEventListener("click", function () {
                            if (typeof window.openProjectDocuments === "function") {
                                window.openProjectDocuments(projectDocuments, proj.title, parseInt(btn.getAttribute("data-doc-index"), 10));
                            }
                        });
                    });
                }
            }

            const prevProj = all[(idx - 1 + all.length) % all.length];
            const nextProj = all[(idx + 1) % all.length];

            const prevBtn = document.getElementById("detail-prev-btn");
            const nextBtn = document.getElementById("detail-next-btn");
            if (prevBtn) {
                prevBtn.onclick = function () {
                    if (typeof window.navigateProjectDetail === "function") {
                        window.navigateProjectDetail(prevProj.id);
                    }
                };
            }
            if (nextBtn) {
                nextBtn.onclick = function () {
                    if (typeof window.navigateProjectDetail === "function") {
                        window.navigateProjectDetail(nextProj.id);
                    }
                };
            }
        } catch (err) {
            console.error("[render] Erreur lors de l'affichage du détail projet :", err);
        }
    }

    // Exposed so js/app.js (gallery + project detail navigation) can
    // reuse the same helpers as the rest of the site.
    window.attachImageFallback = attachImageFallback;
    window.escapeHtml = escapeHtml;
    window.renderProjectDetail = renderProjectDetail;

    // ------------------------------------------------------------------
    // Point d'entrée : on attend que le DOM soit prêt avant de rendre.
    // ------------------------------------------------------------------
    function init() {
        if (!window.SITE_DATA) {
            console.error("[render] js/data.js n'a pas pu être chargé : le contenu du site est indisponible.");
            return;
        }
        renderProfile();
        renderExperiences();
        renderProjects();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();