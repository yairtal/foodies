const express = require("express");
const router = express.Router();
const NewsItem = require("../models/newsItem");

// Route to get all items or by user if userID is provided
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    let filter = {};

    if (userId) {
      filter.$or = [
        { allowedUsers: userId },
        { allowedUsers: { $exists: false } },
        { allowedUsers: [] },
      ];
    } else {
      filter.$or = [{ allowedUsers: { $exists: false } }, { allowedUsers: [] }];
    }

    const newsItems = await NewsItem.find(filter);
    res.json(newsItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving news items" });
  }
});

// Route to get all items without filtering
router.get("/all", async (req, res) => {
  try {
    const newsItems = await NewsItem.find({});

    res.json(newsItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving all news items" });
  }
});

// Route to create a new item
router.post("/", async (req, res) => {
  try {
    const newsItem = new NewsItem(req.body);
    await newsItem.save();
    res.status(201).json(newsItem);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      res.status(400).json({ message: "Validation Error", errors: err.errors });
    } else {
      res.status(500).json({ message: "Error adding news item" });
    }
  }
});

// Route to update an item by ID
router.patch("/:id", async (req, res) => {
  try {
    const updates = req.body;
    const newsItem = await NewsItem.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!newsItem) {
      return res.status(404).json({ message: "News item not found." });
    }
    res.json(newsItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating news item." });
  }
});

// Route to get an item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await NewsItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found." });
    }

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving item by ID" });
  }
});

module.exports = router;
