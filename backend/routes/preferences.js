const express = require("express");
const mongoose = require("mongoose");
const UserPreference = require("../models/UserPreference");
const router = express.Router();

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
    // Check if all required fields are present
    if (!userId || !dietaryRestrictions) {
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

module.exports = router;
