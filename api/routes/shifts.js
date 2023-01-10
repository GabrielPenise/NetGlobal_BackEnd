const express = require("express");
const ShiftsController = require("../controllers/ShiftsController");
const { validateClient } = require("../middlewares/auth");
const router = express.Router();

// api/shifts
router.get("/", ShiftsController.getAll);
router.get("/:id", ShiftsController.getSingle);
router.post("/", validateClient, ShiftsController.createShift);
router.put("/:id", validateClient, ShiftsController.updateShift);
router.delete("/:id", validateClient, ShiftsController.deleteShift);

module.exports = router;
