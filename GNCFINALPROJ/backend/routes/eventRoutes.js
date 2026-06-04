const express = require("express");
const router = express.Router();

const {
  getEvents,
  getEventById,
  createEvent,
  deleteEvent,
} = require("../controllers/eventController");

router.get("/", getEvents);
router.get("/:id", getEventById);
router.post("/", createEvent);
router.delete("/:id", deleteEvent);

module.exports = router;