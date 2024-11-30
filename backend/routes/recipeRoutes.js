const express = require("express");
const router = express.Router();
const axios = require("axios");
const authenticate = require("../middleware/authenticate");

router.post("/details", authenticate, async (req, res) => {
  const { uris } = req.body;

  if (!uris || !Array.isArray(uris) || uris.length === 0) {
    return res
      .status(400)
      .json({ error: "uris is required and must be an array" });
  }

  try {
    const recipes = [];

    for (const uri of uris) {
      const response = await axios.get(
        "https://api.edamam.com/api/recipes/v2",
        {
          params: {
            type: "public",
            app_id: process.env.EDAMAM_APP_ID,
            app_key: process.env.EDAMAM_APP_KEY,
            r: uri,
          },
        }
      );

      if (response.data && response.data.length > 0) {
        recipes.push(response.data[0]);
      }
    }

    res.json(recipes);
  } catch (error) {
    console.error(
      "Error fetching recipe details:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

module.exports = router;
