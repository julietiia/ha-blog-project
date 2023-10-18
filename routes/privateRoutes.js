const express = require("express");
const router = express.Router();
const pagesController = require("../controllers/pagesController");
const ensureIsAuthenticated = require("../middlewares/ensureIsAuthenticated");

// Rutas relacionadas al panel de control (Admin):
// ...

router.get("/", ensureIsAuthenticated, pagesController.showAdmin);

module.exports = router;
