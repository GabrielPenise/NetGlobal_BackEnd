const express = require("express");
const GuardShiftsController = require("../controllers/GuardShiftsController");
const { validateClient } = require("../middlewares/auth");
const router = express.Router();

router.get("/", GuardShiftsController.getAll);
router.get("/:id", GuardShiftsController.getSingle);
router.get("/byGuard/:id", GuardShiftsController.getByGuard);
//api/guardShift/
router.post("/", GuardShiftsController.createShift);
router.put("/:id", GuardShiftsController.updateShift);
router.delete("/:id", GuardShiftsController.deleteShift);

module.exports = router;
