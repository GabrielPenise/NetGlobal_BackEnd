const express = require("express");
const BranchesController = require("../controllers/BranchesController");
const { validateClient } = require("../middlewares/auth");
const router = express.Router();

// GET ALL BRANCHES /api/branches
router.get("/", BranchesController.getAll);

// GET ALL BRANCHES /api/branches
router.get("/inactives", BranchesController.getInactives);

// GET BRANCH BY ID /api/branches/:id
router.get("/:id", BranchesController.getSingle);

// GET ALL BRANCHES BY CLIENT /api/branches/byClient/:id
router.get(
  "/byClient/:id",
  validateClient,
  BranchesController.getClientBranches
);

// CREATE BRANCH /api/branches/create
router.post("/create", validateClient, BranchesController.createBranch);

// UPDATE BRANCH /api/branches/edit/:id
router.put("/edit/:id", validateClient, BranchesController.updateBranch);

// DELETE BRANCH (soft delete) /api/branches/delete/:id
router.put("/delete/:id", validateClient, BranchesController.deleteBranch);

// RESTORE BRANCH (soft delete) /api/branches/restore/:id
router.put("/restore/:id", validateClient, BranchesController.restoreBranch);

module.exports = router;
