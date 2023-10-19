const { User, Article, Comment } = require("../models");
const formidable = require("formidable");

// Display a listing of the resource.

async function index(req, res) {}

// Display the specified resource.
async function show(req, res) {
  const article = await Article.findByPk(req.params.id, {
    include: [User, { model: Comment, include: User }],
    // aqui arriba en la linea 10 y 11 estas diciendo que en el modelo Article se busque
    //  por su id en la tabla ("findByPk") un id que viene del HTTP (req.params.id) y que luego de encotrarlo traiga la informacion que del articulo que incluya o se relacione con el modelo User. Además le dices que haga lo mismo con el modelo Comment pero debes traer solamente al comment que incluya o se relacione a su vez con User. En caso que no hubiera necesidad de esto ultimo se podría escribir  include: [User,  Comment, ].
  });
  const users = await User.findAll();
  const title = article.title;
  const text = `Creado por ${article.user.firstname} ${article.user.lastname} el ${article.createdAt}`;
  res.render("articles", { title: title, text: text, article, users });
}

// Show the form for creating a new resource
async function create(req, res) {
  const users = await User.findAll();
  res.render("new-article", { users });
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
      userId: fields.userId,
    });
    // Hacer algo con fields y files...
    res.redirect("/admin");
  });
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const article = await Article.findByPk(req.params.id);
  const users = await User.findAll();
  res.render("edit-article", { article, users });
}

// Update the specified resource in storage.
async function update(req, res) {
  const article = await Article.findByPk(req.params.id);

  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    if (err) return res.send("Algo falló intentá más tarde..");
    await article.update({
      title: fields.title,
      content: fields.content,
      image: files.image.newFilename,
      userId: fields.userId,
    });
    // Hacer algo con fields y files...
    res.redirect("/admin");
  });
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  await Article.destroy({
    where: {
      id: req.params.id,
    },
  });
  console.log(req.params.id);
  res.redirect("/admin");
}

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
