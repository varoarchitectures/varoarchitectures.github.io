# Portfolio — Pablo Varo

## Comment ouvrir le site

Double-clique sur `index.html`. Aucun serveur n'est nécessaire, tout fonctionne
en local (les fichiers CSS/JS sont chargés en relatif).

## Structure du projet

```
portfolio/
├── index.html          → structure des 4 "pages", ne contient plus de texte figé
├── css/
│   ├── tailwind.css     → Tailwind compilé (généré, ne pas éditer à la main)
│   └── style.css        → tous les styles personnalisés (hors Tailwind)
├── src/
│   └── input.css         → point d'entrée Tailwind (@tailwind base/components/utilities)
├── js/
│   ├── data.js           → TOUT le contenu du site (textes, images, projets)
│   ├── render.js          → transforme data.js en HTML dans la page
│   └── app.js              → navigation entre pages + animation du mot PORTFOLIO
├── tailwind.config.js  → config Tailwind (fichiers scannés, classes forcées)
├── package.json        → dépendance Tailwind + commandes `npm run build`/`watch`
└── README.md
```

## Pour modifier le contenu (le plus courant)

Tout se passe dans **`js/data.js`** :
- `profile` → nom, bio, contact, formation, logiciels, langues
- `experiences` → chaque entrée de la timeline CV (ajoute/enlève un objet dans le tableau)
- `projects.conception` / `projects.analyse` / `projects.objet` → les projets de la page PROJECTS

Tu n'as jamais besoin de toucher au HTML ou au JS pour ajouter un projet ou une
expérience : ajoute juste un objet dans le bon tableau, en suivant le modèle
des objets déjà présents.

⚠️ Le nombre de colonnes de chaque grille de projets suit automatiquement le
nombre d'éléments dans le tableau correspondant (3 pour conception, 2 pour
analyse). Si tu ajoutes un 4e projet en conception, la grille s'adaptera mais
tu voudras peut-être ajuster manuellement `lg:grid-cols-3` dans `index.html`
si la mise en page devient trop dense.

## Insérer tes plans, coupes et images (PDF → JPG)

Tes fichiers sont des PDF (souvent des planches A1 verticales). Un `<img>`
HTML ne peut pas afficher un PDF directement : il faut d'abord l'exporter en
JPG (Aperçu sur Mac, ou n'importe quel convertisseur PDF→JPG en ligne).
Pense aussi à générer une version allégée (~800px de large) pour la vignette
de la grille de la page PROJETS : les pages se chargeront plus vite.

Une fois les JPG générés, dépose-les dans `img/` (par exemple
`img/logement-3-personnes/plan-rdc.jpg`) et référence ce chemin dans
`js/data.js`, exactement comme les URLs Unsplash actuelles (qui ne sont que
des exemples à remplacer).

### En-tête de page projet : texte à gauche, image à droite

Le haut de chaque page projet ("cartouche") affiche maintenant le titre, la
citation et le cartouche (année, encadrant, lieu...) **à côté** de l'image
d'appel, sur un seul écran — plutôt que le titre au-dessus puis un grand
bandeau image paysage en dessous. L'image est en **format portrait**
(comme les autres documents du site), ce qui colle mieux à des rendus ou
plans verticaux qu'un large 16:9. Le texte est à gauche et l'image à
droite, pour rester cohérent avec la page Expériences (profil à gauche,
contenu à droite). Sur mobile, l'image reste en premier (impact visuel)
puis le texte suit en dessous.

### Deux familles de cadres : vignettes recadrées, documents jamais recadrés

Le site distingue deux types d'images, avec deux comportements différents :

**1. Vignettes / photos d'ambiance** (grilles de projets, mosaïque
Expériences, héro par défaut) → cadre à **taille fixe qui recadre l'image**
(`object-cover`), comme une photo de profil. C'est un choix éditorial : tu
décides du cadrage. Si ton export n'a pas exactement le bon ratio, le
dépassement est coupé. Prépare ces images-là dans le bon ratio avant de les
insérer.

| Cadre | Ratio L:H | Taille affichée (desktop ~1536px) | Export recommandé |
|---|---|---|---|
| Vignette grille **Conception** | 10:13 (raisin, 0.769) | ~432 × 562 px | ~900 × 1170 px |
| Vignette grille **Analyse** | 10:13 (raisin, 0.769) | ~428 × 556 px | ~900 × 1170 px |
| Vignette grille **Workshops** | 1:1 (carré) | ~256 × 256 px | ~600 × 600 px |
| **Héro** par défaut (`heroFit` non défini, photo/rendu) | 10:13 (raisin, 0.769) | ~ moitié d'écran en largeur, jusqu'à 78vh de haut | ~1400 × 1820 px |
| **Processus** (croquis/schémas) | 1:1 (carré) | ≤ 220 × 220 px | ~500 × 500 px |
| Mosaïque galerie (page Expériences) | 1:1 (carré) | ~105 × 105 px | ~400 × 400 px |
| Image principale galerie | libre (jamais recadrée) | plein écran dispo | haute résolution |

Comme toujours pour ces cadres : la résolution absolue n'a pas d'importance
pour le recadrage, seul le **ratio** compte — exporte en plus grand que la
"taille affichée" si tu veux plus de netteté, sans risque de coupe
supplémentaire.

**2. Documents à lire** (`technical` — plans/coupes, `tectonic` — détail
constructif, et héro avec `heroFit: "contain"`) → cadre à **hauteur fixe
(62vh) et largeur libre**, l'image s'affichant **entière** dedans
(`object-contain`), jamais recadrée. C'est fait pour ça : tes documents
n'ont pas tous le même format d'un semestre à l'autre (A3 horizontal, A1
vertical, autre...), et ici ça n'a **aucune importance** — chaque image
prend simplement toute la hauteur disponible avec la largeur que son propre
ratio impose (étroite pour un A1 vertical, large pour une coupe A3
horizontale), centrée sur un fond neutre. Tu n'as **rien à préparer côté
ratio** pour ces images : exporte-les simplement dans leur format d'origine,
en bonne résolution (~1800-2200 px sur le grand côté suffit largement pour
un écran).

### Mise en page selon le format dominant du semestre (`technicalOrientation`)

Au-delà du recadrage, la **mise en page** des plans/coupes (`technical`)
change aussi selon leur format, pour rester lisible et élégante — comme le
font les sites d'agences : un dessin large gagne à occuper tout l'écran,
deux dessins étroits se lisent bien côte à côte.

Renseigne `technicalOrientation` dans le `detail{}` du projet concerné, dans
`js/data.js` :

- **`"portrait"`** (valeur par défaut, ne rien mettre) : pour des documents
  plutôt verticaux (ex. format raisin).
- **`"landscape"`** : pour des documents plutôt horizontaux (ex. planches
  A3 à l'italienne).

Dans les deux cas, le plan et la coupe sont affichés **côte à côte**, sur
le même cran de molette — seule la hauteur du cadre change (plus basse en
`"landscape"`) pour que deux documents larges tiennent côte à côte sans
déborder de l'écran en largeur.

C'est purement un choix de mise en page (aucun recadrage n'est appliqué
dans les deux cas). Exemple actuel dans `data.js` :

| Projet | Format des documents | `technicalOrientation` |
|---|---|---|
| Logement pour 3 personnes (S2) | A3 horizontal | `"landscape"` |
| Extension école Jacquard (S3) | A3 horizontal | `"landscape"` |
| Salle polyvalente et café (S4) | Raisin vertical | *(rien — `"portrait"` par défaut)* |

## Pour modifier le style

Deux systèmes cohabitent :
- **Tailwind** (classes directement dans `index.html`/`js/render.js`, ex. `text-4xl`, `gap-10`) → compilé dans `css/tailwind.css`. Ce fichier est **généré**, ne l'édite jamais à la main.
- **`css/style.css`** → pour tout le reste (l'effet de survol des images, l'animation du titre, etc.).

Le site n'utilise plus le CDN Tailwind (`cdn.tailwindcss.com`) : trop lourd, non
optimisé pour un site en ligne. À la place, `css/tailwind.css` est généré
localement et ne contient que les classes réellement utilisées (~19 Ko au lieu
de plusieurs centaines de Ko).

**Si tu ajoutes une nouvelle classe Tailwind** (ex. `bg-blue-500`) quelque
part dans `index.html` ou `js/render.js`, il faut régénérer ce fichier :

1. Installe [Node.js](https://nodejs.org) (une seule fois).
2. Dans le dossier du projet : `npm install` (une seule fois, télécharge Tailwind).
3. À chaque modification de classe : `npm run build`.
   Ou, pendant que tu travailles : `npm run watch` (régénère automatiquement à chaque sauvegarde).

Si tu ne touches qu'au contenu (`js/data.js`) ou à `css/style.css`, tu n'as
**rien à reconstruire** : ouvre juste `index.html`, comme avant.

⚠️ Cas particulier : la grille "Processus" utilise une classe construite
dynamiquement (`sm:grid-cols-` + un nombre) selon `processColumns` dans
`data.js`. Ces classes sont explicitement forcées dans `tailwind.config.js`
(`safelist`) car Tailwind ne peut pas les détecter automatiquement. Si tu
utilises un `processColumns` autre que 2 ou 3, ajoute la classe correspondante
au `safelist`.

## Pour modifier la navigation / les animations

Tout est dans **`js/app.js`** (fondu entre les pages, éclatement du mot
PORTFOLIO en lettres).

## Gestion des erreurs déjà en place

- **Image qui ne charge pas** (mauvaise URL, fichier local absent, pas de
  réseau) → un cadre gris "Image indisponible" s'affiche à la place, le site
  ne casse pas.
- **Donnée manquante ou mal formée** dans `data.js` → la section concernée
  affiche un message discret ("n'a pas pu être chargé") au lieu de faire
  planter toute la page.
- **Élément HTML manquant** (si tu supprimes un `id` par erreur) → un
  avertissement clair apparaît dans la console du navigateur (F12 → Console),
  et les fonctions concernées s'arrêtent proprement au lieu de provoquer une
  erreur bloquante.
- **Erreur JS imprévue** → interceptée et journalisée dans la console au lieu
  de laisser le site figé sans explication. Pour l'animation du mot
  PORTFOLIO en particulier, si quelque chose échoue, le site bascule
  automatiquement sur la page des catégories (sans animation) plutôt que de
  rester bloqué sur la page 1.

Pour repérer un souci : ouvre la console du navigateur (touche F12, onglet
"Console"). Tous les messages commencent par `[app]` ou `[render]` pour
savoir d'où vient le problème.

## Statistiques de visite

Le site inclut [GoatCounter](https://www.goatcounter.com) (gratuit, open
source, sans cookies — pas besoin de bandeau RGPD). Pour l'activer :

1. Crée un compte gratuit sur https://www.goatcounter.com/signup.
2. Choisis un code de site (ex. `pablo-varo` → `pablo-varo.goatcounter.com`).
3. Dans `index.html`, remplace `TON-CODE` par ce code, dans la balise
   `<script data-goatcounter="...">` juste avant `</body>`.
4. Ton tableau de bord (visites, pages vues, provenance...) est ensuite sur
   `https://TON-CODE.goatcounter.com`.

## Référencement (SEO) et partage sur les réseaux

`index.html` contient déjà :
- une balise `<meta name="description">` (le résumé affiché sous le lien dans Google) ;
- des balises Open Graph / Twitter Card (le titre, la description et l'image
  qui apparaissent quand le lien est partagé sur LinkedIn, etc.) ;
- un favicon (`img/favicon.svg`, un simple monogramme "PV").

Une fois le site en ligne, pense à :
- remplacer `<meta property="og:url" content="">` par l'URL réelle du site ;
- vérifier que `img/accueil.png` (utilisée comme image de partage) existe bien à la racine du dossier `img/`.

## Chargement des images (lazy loading)

Les images des grilles de projets, des schémas ("Processus"), des plans/coupes
et des détails constructifs ont l'attribut `loading="lazy"` : le navigateur ne
les télécharge que lorsqu'elles approchent de l'écran, au lieu de tout charger
d'un coup à l'ouverture de la page. Rien à faire de ton côté, c'est automatique
pour toute nouvelle image ajoutée dans `js/data.js`.

## Prochaine étape

Les pages détail de chaque projet (`js/app.js`, fonction `openProject`) ne
sont pas encore branchées — pour l'instant un clic sur une vignette de projet
se contente d'un `console.log`.
