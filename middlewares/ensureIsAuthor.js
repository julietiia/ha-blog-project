const { Article } = require("../models");

async function ensureIsAuthor(req, res, next) {
  console.log(req.body);
  const article = await Article.findByPk(req.params.id);
  if (req.user.id === article.userId) {
    return next();
  } else {
    res.redirect("/admin");
  }
}

module.exports = ensureIsAuthor;
