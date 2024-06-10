require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Message = require("./models/message");


const app = express();

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/learnexpress", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware for parsing JSON
app.use(express.json());

// Route for fetching a single message by ID
app.get("/messages/:id", async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json(message);
  } catch (err) {
    console.error("Error fetching message:", err);
    if (err.kind === "ObjectId") {
      return res.status(400).json({ message: "Invalid message ID" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
