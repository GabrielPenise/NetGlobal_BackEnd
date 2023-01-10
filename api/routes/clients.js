const express = require("express");
const router = express.Router();
const {
  validateAuth,
  validateSuperAdmin,
  validateClient,
} = require("../middlewares/auth");
const { validateCuix } = require("../middlewares/cuix");
const ClientController = require("../controllers/ClientsController");

// REGISTER api/clients/create

router.post(
  "/create",
  validateSuperAdmin,
  validateCuix,
  ClientController.createClient
);

// LOG IN api/clients/login
router.post("/login", ClientController.loginClient);

// LOG OUT api/clients/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

// PERSISTENCIA  api/clients/validate
router.get("/validate", validateAuth, (req, res) => {
  res.send(req.user);
});

//GET ALL CLIENTS  api/clients/
router.get("/", validateSuperAdmin, ClientController.allClients);

//GET ALL INACTIVES CLIENTS api/clients/inactives
router.get(
  "/inactives",
  validateSuperAdmin,
  ClientController.allInactivesClients
);

//GET ONE CLIENT api/clients/:id ------> acá debería agregar validación superAdmin?
router.get("/:id", validateAuth, ClientController.getOneClient);

//CHANGE PASSWORD api/clients/change-password/:id
router.put(
  "/change-password/:id",
  validateClient,
  ClientController.changePassword
);

//UPDATE CLIENT api/clients/edit/:id
router.put(
  "/edit/:id",
  validateSuperAdmin,
  validateCuix,
  ClientController.updateClient
);

//UNSUSCRIBE - DELETE  api/clients/delete/:id
router.put("/delete/:id", validateSuperAdmin, ClientController.delete);

//SUSCRIBE CLIENT - RESTORE api/clients/restore/:id
router.put("/restore/:id", validateSuperAdmin, ClientController.restore);

module.exports = router;
