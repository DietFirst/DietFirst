const mongoose = require("mongoose");

const SavedRecipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  label: { type: String, required: true },
  image: { type: String },
  source: { type: String },
  shareAs: { type: String },
  ingredients: [{ type: String }],
  healthLabels: [{ type: String }],
  dietLabels: [{ type: String }],
  mealType: { type: String },
  calories: { type: Number },
  uri: { type: String, unique: false },
});

const SavedRecipe = mongoose.model("SavedRecipe", SavedRecipeSchema);
module.exports = SavedRecipe;
