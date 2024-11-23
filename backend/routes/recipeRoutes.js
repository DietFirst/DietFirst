const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/details", async (req, res) => {
  const { uris } = req.body;

  if (!uris || !Array.isArray(uris)) {
    return res
      .status(400)
      .json({ error: "An array of recipe URIs is required" });
  }

  try {
    const response = await axios.get(
      "https://api.edamam.com/api/recipes/v2/by-uri",
      {
        params: {
          app_id: process.env.EDAMAM_APP_ID,
          app_key: process.env.EDAMAM_APP_KEY,
          uri: uris,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching recipe details:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch recipe details" });
  }
});

module.exports = router;
