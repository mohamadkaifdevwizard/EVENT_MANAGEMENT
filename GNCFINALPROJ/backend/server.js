const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");

const eventRoutes = require("./routes/eventRoutes");

dotenv.config();
console.log(process.env.MONGO_URI);
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err));

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/events", eventRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Event Management Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});