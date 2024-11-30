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

  try {
    const endpoint = `https://api.edamam.com/api/meal-planner/v1/${process.env.EDAMAM_MP_APP_ID}/select`;

    const requestBody = {
      size: calculateDaysDifference(startDate, endDate),
      plan: preferences,
    };

    console.log(
      "Request body being sent to Edamam:",
      JSON.stringify(requestBody, null, 2)
    );

    const response = await axios.post(endpoint, requestBody, {
      headers: {
        "Content-Type": "application/json",
        "Edamam-Account-User": req.userId || req.userEmail,
      },
      auth: {
        username: process.env.EDAMAM_MP_APP_ID,
        password: process.env.EDAMAM_MP_APP_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    res.status(error.response?.status || 500).json({
      error: "Failed to create meal plan",
      details: error.response?.data || error.message,
    });
  }
});

router.get("/recipe/:recipeId", authenticate, async (req, res) => {
  try {
    const { recipeId } = req.params;
    const url = `https://api.edamam.com/api/recipes/v2/${recipeId}`;

    const response = await axios.get(url, {
      params: {
        type: "public",
        app_id: process.env.EDAMAM_R_APP_ID,
        app_key: process.env.EDAMAM_R_APP_KEY,
      },
    });

    res.json(response.data);
  } catch (error) {
    handleError(res, error, "Failed to fetch recipe details");
  }
});

function handleError(res, error, message) {
  if (error.response) {
    console.error("Error response data:", error.response.data);
    console.error("Error response status:", error.response.status);
    res.status(error.response.status).json({
      error: message,
      details: error.response.data,
    });
  } else if (error.request) {
    console.error("No response received:", error.request);
    res.status(500).json({ error: message, details: "No response received" });
  } else {
    console.error("Error setting up request:", error.message);
    res.status(500).json({ error: message, details: error.message });
  }
}

function calculateDaysDifference(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return diffDays;
}

module.exports = router;
