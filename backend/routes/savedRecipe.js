const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const SavedRecipe = require("../models/SavedRecipe");

router.post("/save", authenticate, async (req, res) => {
  const userId = req.userId;
  const {
    label,
    image,
    source,
    shareAs,
    ingredients,
    healthLabels,
    dietLabels,
    mealType,
    calories,
    uri,
  } = req.body;

  if (!label || !uri) {
    return res
      .status(400)
      .json({ error: "Missing required fields (label, uri)." });
  }

  try {
    const savedRecipe = new SavedRecipe({
      userId,
      label,
      image,
      source,
      shareAs,
      ingredients,
      healthLabels,
      dietLabels,
      mealType,
      calories,
      uri,
    });

    await savedRecipe.save();
    res
      .status(201)
      .json({ message: "Recipe saved successfully", recipe: savedRecipe });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Failed to save recipe" });
  }
});

router.get("/saved", authenticate, async (req, res) => {
  try {
    const userId = req.userId;
    const savedRecipes = await SavedRecipe.find({ userId });
    res.json(savedRecipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    res.status(500).json({ error: "Failed to fetch saved recipes" });
  }
});

module.exports = router;
