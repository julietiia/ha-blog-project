const { Author, Article, Comment } = require("../models");
const formidable = require("formidable");

// Display a listing of the resource.

async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [Author, { model: Comment, include: Author }],
  });
  const title = article.title;
  const text = `Creado por ${article.author.firstname} ${article.author.lastname} el ${article.createdAt}`;
  res.render("articles", { title: title, text: text, article });
}

// Show the form for creating a new resource
async function create(req, res) {
  const authors = await Author.findAll();
  res.render("new-article", { authors });
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.send("Algo falló intentá más tarde..");
    await Article.create({
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
      authorId: fields.authorId,
    });
    // Hacer algo con fields y files...
    res.redirect("admin");
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  const authors = await Author.findAll();
  res.render("edit-article", { article, authors });
}

// Update the specified resource in storage.
async function update(req, res) {
  const article = await Article.findByPk(req.params.id);
  console.log(article);
  console.log(req.body);
  //article.update({req.body});

  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.send("Algo falló intentá más tarde..");
    await Article.create({
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
      authorId: fields.authorId,
    });
    // Hacer algo con fields y files...
    res.redirect("admin");
  });
}

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
