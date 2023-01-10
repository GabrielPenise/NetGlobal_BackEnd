const express = require("express");
const router = express.Router();
const { validateAuth, validateClient } = require("../middlewares/auth");
const { validateCuix } = require("../middlewares/cuix");
const GuardsController = require("../controllers/GuardsController");

//GET ALL GUARDS api/guards
router.get("/", GuardsController.getAll);

//GET ALL INACTIVES GUARDS api/guards/inactives
router.get("/inactives", GuardsController.getInactivesGuards);

//GET GUARD BY DISTANCE TO BRANCH api/guards/byDistance/:id
router.get(
  "/byDistance/:branchId/:date/:shiftId",
  GuardsController.getByDistance
);

//PERSISTENCE api/guards/validate
router.get("/validate", validateAuth, (req, res) => {
  console.log("hola", req.user);
  res.send(req.user);
});

//GET GUARD BY ID api/guards/:id
router.get("/:id", validateAuth, GuardsController.getSingle);

//GET GUARDS BY CLIENT api/guards/byClient/:id
router.get("/byClient/:id", GuardsController.getGuardsByClient);

//CREATE GUARD api/guards/create
router.post(
  "/create",
  validateClient,
  validateCuix,
  GuardsController.createGuard
);

//LOG IN GUARD api/guards/login
router.post("/login", GuardsController.loginGuard);

//LOG OUT GUARD api/guards/logout
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

//CHANGE PASSWORD api/guards/change-password/:id
router.put(
  "/change-password/:id",
  validateAuth,
  GuardsController.changePassword
);

//UPDATE GUARD api/guards/edit/:id
router.put(
  "/edit/:id",
  validateAuth,
  validateCuix,
  GuardsController.updateGuard
);

//DELETE GUARD api/guards/delete/:id
router.put("/delete/:id", validateClient, GuardsController.deleteGuard);

//RESTORE GUARD api/guards/restore/:id
router.put("/restore/:id", validateClient, GuardsController.restoreGuard);

module.exports = router;
