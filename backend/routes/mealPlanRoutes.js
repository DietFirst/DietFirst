const express = require("express");
const router = express.Router();
const axios = require("axios");
const authenticate = require("../middleware/authenticate");

router.post("/create", authenticate, async (req, res) => {
  const { startDate, endDate, preferences } = req.body;

  if (!startDate || !endDate || !preferences) {
    return res
      .status(400)
      .json({ error: "startDate, endDate, and preferences are required" });
  }

  const userId = req.userId;
  const userEmail = req.userEmail;
  console.log("Authenticated userId:", userId);

  try {
    const response = await axios.post(
      `https://api.edamam.com/api/mealplanner/v1/user/${userId}/recommendation`,
      {
        timeWindow: 7,
        preferences,
      },
      {
        params: {
          app_id: process.env.EDAMAM_MP_APP_ID,
          app_key: process.env.EDAMAM_MP_APP_KEY,
        },
        headers: {
          "Content-Type": "application/json",
          "Edamam-Account-User": userEmail,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error creating meal plan:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to create meal plan",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
