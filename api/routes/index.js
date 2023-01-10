const express = require("express");
const router = express.Router();
const clientRoutes = require("./clients");
const guardRoutes = require("./guards");
const branchRoutes = require("./branches");
const shiftRoutes = require("./shifts");
const guardShiftRoutes = require("./guardShifts");
const eventRoutes = require("./events");

router.use("/clients", clientRoutes);
router.use("/guards", guardRoutes);
router.use("/branches", branchRoutes);
router.use("/shifts", shiftRoutes);
router.use("/guardShifts", guardShiftRoutes);
router.use("/events", eventRoutes);

module.exports = router;
