const { Author, Article, Comment } = require("../models");

// Display a listing of the resource.

async function index(req, res) {

}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, { include: [Author,{model: Comment, include: Author}] });
  const title = article.title;
  const text = `Creado por ${article.author.firstname} ${article.author.lastname} el ${article.createdAt}`;
  res.render("articles", { title: title, text: text, article });
}

// Show the form for creating a new resource
async function create(req, res) {}

// Store a newly created resource in storage.
async function store(req, res) {}

// Show the form for editing the specified resource.
async function edit(req, res) {
  // const result = await Article.findByPk(req.params.id);
  // res.render("edit", { result });
}

// Update the specified resource in storage.
async function update(req, res) {}

// Remove the specified resource from storage.
async function destroy(req, res) {}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
};
