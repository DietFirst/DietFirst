const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/generate", async (req, res) => {
  const { meals } = req.body;

  if (!meals || !Array.isArray(meals)) {
    return res.status(400).json({ error: "Meals array is required" });
  }

  try {
    const response = await axios.post(
      `https://api.edamam.com/api/meal-planner/v1/${process.env.EDAMAM_MP_APP_ID}/shopping-list`,
      { meals },
      {
        params: {
          app_key: process.env.EDAMAM_MP_APP_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error generating shopping list:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to generate shopping list" });
  }
});

module.exports = router;
