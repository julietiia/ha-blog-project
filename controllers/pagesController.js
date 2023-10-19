/**
 * Este archivo se utiliza en un proyecto donde se está utlizando server-side
 * rendering (ej: con un motor de templates como EJS). Tiene como objetivo
 * mostrar (renderear) páginas que no están directamente relacionandas con
 * una entidad del proyecto.
 *
 * Ejemplos:
 *   - Página de inicio (Home).
 *   - Página de contacto.
 *   - Página con política de privacidad.
 *   - Página con términos y condiciones.
 *   - Página con preguntas frecuentes (FAQ).
 *   - Etc.
 *
 * En caso de estar creando una API, este controlador carece de sentido y
 * no debería existir.
 */

const { Article, User } = require("../models");

async function showHome(req, res) {
  const articles = await Article.findAll({ include: User });
  const title = `Hack the blog`;
  const text = `El Blog de Hack Academy`;
  res.render("home", { title, text, articles });
}

async function showAdmin(req, res) {
  const articles = await Article.findAll({ include: User });
  res.render("admin", { articles });
}

// async function login(req, res) {
//   res.render("log-in");
// }

// Otros handlers...
// ...

module.exports = {
  showHome,
  showAdmin,
};
