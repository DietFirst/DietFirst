const express = require("express");
const mongoose = require("mongoose");
const UserPreference = require("../models/UserPreference");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

// Route to save user preferences
router.post("/", async (req, res) => {
  console.log("Preferences route hit");

  const {
    userId,
    dietaryRestrictions,
    allergyRestrictions,
    caloriesInTake,
    nutrientsSelection,
  } = req.body;

  try {
    // Check if required fields are present
    if (!userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate user ID
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    // Create and save new pref
    const newPreference = new UserPreference({
      userId,
      dietaryRestrictions,
      allergyRestrictions,
      caloriesInTake,
      nutrientsSelection,
    });

    const savedPreference = await newPreference.save();
    res.status(201).json({
      message: "Preferences saved successfully",
      data: savedPreference,
    });
  } catch (error) {
    console.error("Error saving preferences:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

router.get("/my", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const preferences = await UserPreference.findOne({ userId });
    if (!preferences) {
      return res
        .status(404)
        .json({ error: "No preferences found for this user." });
    }
    res.json(preferences);
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    res.status(500).json({ error: "Failed to fetch user preferences" });
  }
});

module.exports = router;
