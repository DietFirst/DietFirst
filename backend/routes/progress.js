const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const Progress = require("../models/progress");

router.post("/", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const { date, weight, bloodSugar, bloodPressure, cholesterol } = req.body;

    if (!date) {
      return res.status(400).json({ error: "Date is required." });
    }

    const updated = await Progress.findOneAndUpdate(
      { userId, date },
      { weight, bloodSugar, bloodPressure, cholesterol },
      { upsert: true, new: true }
    );

    res.json({ message: "Progress saved successfully.", data: updated });
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ error: "Failed to save progress" });
  }
});

router.get("/", authenticate, async (req, res) => {
  try {
    const userId = req.userId;

    const { year, month } = req.query;

    let query = { userId };
    if (year && month) {
      const prefix = `${year}-${month.padStart(2, "0")}`;
      query.date = { $regex: `^${prefix}` };
    }

    const progressData = await Progress.find(query);
    res.json({ data: progressData });
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
});

module.exports = router;
