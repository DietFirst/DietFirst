require("dotenv").config();
console.log("Meal Planner App ID:", process.env.EDAMAM_MP_APP_ID);
console.log("Meal Planner App Key:", process.env.EDAMAM_MP_APP_KEY);

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const preferenceRoutes = require("./routes/preferences");
const cors = require("cors");
const axios = require("axios");
const mealPlanRoutes = require("./routes/mealPlanRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const shoppingListRoutes = require("./routes/shoppingListRoutes");
const savedRecipesRoutes = require("./routes/savedRecipe");
const progressRoutes = require("./routes/progress");

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("backend is running");
});

// Allow preflight requests
app.options("*", cors());

app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/preferences", preferenceRoutes);

app.get("/api/recipes", async (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const response = await axios.get("https://api.edamam.com/api/recipes/v2", {
      params: {
        type: "public",
        q: query,
        app_id: process.env.EDAMAM_APP_ID,
        app_key: process.env.EDAMAM_APP_KEY,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error fetching recipes from Edamam:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.post("/api/analyze", async (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
    return res.status(400).json({ error: "Ingredients are required" });
  }
  try {
    const response = await axios.post(
      "https://api.edamam.com/api/nutrition-details",
      {
        title: "Recipe",
        ingr: ingredients,
      },
      {
        params: {
          app_id: process.env.EDAMAM_APP_ID,
          app_key: process.env.EDAMAM_APP_KEY,
        },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(
      "Error analyzing nutrition:",
      error.response ? error.response.data : error.message
    );
    res.status(500).json({ error: "Failed to analyze nutrition" });
  }
});

app.use("/api/mealplan", mealPlanRoutes);
app.use("/api/recipes", recipeRoutes);
app.use("/api/shoppinglist", shoppingListRoutes);
app.use("/api/recipes", savedRecipesRoutes);
app.use("/api/progress", progressRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
