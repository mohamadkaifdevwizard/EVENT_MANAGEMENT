const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  name: String,
  price: Number,
  features: String,
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
  availableTickets: {
    type: Number,
    default: 0,
  },
  totalTickets: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  packages: [packageSchema],
});

module.exports = mongoose.model("Event", eventSchema);