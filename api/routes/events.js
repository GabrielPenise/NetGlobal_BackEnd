const express = require("express");
const router = express.Router();
const { validateClient } = require("../middlewares/auth");
const EventsController = require("../controllers/EventsController");

// CREATE A NEW EVENT  /api/events/
router.post("/", EventsController.createEvent);

// UPDATE A EVENT /api/events/:id
router.put("/", validateClient, EventsController.updateEvent);

// DELETE A EVENT /api/events/
router.delete("/", validateClient, EventsController.deleteEvent);

//CHECKIN GUARD /api/events/checkin/:id
router.put("/checkin/:id", EventsController.checkIn);

//CHECKOUT GUARD /api/events/checkout/:id
router.put("/checkout/:id", EventsController.checkOut);

// GET EVENT BY ID  /api/events/:id
router.get("/:id", EventsController.getOneEvent);

// GET ALL EVENTS BY BRANCH api/events/byBranch/:id
router.get(
  "/byBranch/:branchId",
  validateClient,
  EventsController.allEventsByBranch
);

// GET ALL EVENTS BY GUARD api/events/byGuard/:id
router.get("/byGuard/:guardId", EventsController.allEventsByGuard);

// GET EVENT BY GUARD ID AND DATE api/events/byDate/:guardId/:date
router.get("/byDate/:date/:guardId", EventsController.eventByDateYGuard);

// GET ALL EVENTS BY CLIENT api/events/byClient/:id
router.get("/byClient/:id", EventsController.eventsByClient);

module.exports = router;
