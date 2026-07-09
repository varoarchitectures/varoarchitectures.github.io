/** Config Tailwind : scanne index.html + js/ pour ne garder que les classes utilisées. */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  // Classes construites dynamiquement dans render.js (ex. "sm:grid-cols-" + processColumns)
  // : le scanner ne peut pas les détecter automatiquement, il faut les lister ici.
  safelist: ["sm:grid-cols-2", "sm:grid-cols-3"],
  theme: {
    extend: {}
  },
  plugins: []
};
