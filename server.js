require("dotenv").config();

const methodOverride = require("method-override");
const express = require("express");
const routes = require("./routes");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

app.use(methodOverride("_method"));
app.set("view engine", "ejs");

// arranca acá

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { User } = require("./models");

app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false, // Docs: "The default value is true, but using the default has been deprecated".
    saveUninitialized: false, // Docs: "The default value is true, but using the default has been deprecated".
  }),
);
app.use(passport.session());

passport.use(
  new LocalStrategy(async (email, password, cb) => {
    console.log(email, password);
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        console.log("Nombre de usuario no existe.");
        return cb(null, false, { message: "Credenciales incorrectas." });
      }

      const match = password === user.password;
      if (!match) {
        console.log("La contraseña es inválida.");
        return cb(null, false, { message: "Credenciales incorrectas. Por favor, reintentar." });
      }

      console.log("Credenciales verificadas correctamente");
      return cb(null, user);
    } catch (error) {
      cb(null, false, { message: "Ocurrió un error inesperado. Por favor, reintentar." });
    }
  }),
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id);
    cb(null, user); // Usuario queda disponible en req.user.
  } catch (err) {
    cb(err);
  }
});

// Passport aqui arriba

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

routes(app);

app.listen(APP_PORT, () => {
  console.log(`\n[Express] Servidor corriendo en el puerto ${APP_PORT}.`);
  console.log(`[Express] Ingresar a http://localhost:${APP_PORT}.\n`);
});
