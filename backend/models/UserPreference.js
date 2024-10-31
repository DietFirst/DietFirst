const mongoose = require("mongoose");

const UserPreferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dietaryRestrictions: [{ type: String }],
  allergyRestrictions: [{ type: String }],
  caloriesInTake: {
    min: { type: Number },
    max: { type: Number },
  },
  nutrientsSelection: [{ type: String }],
});

const UserPreference = mongoose.model("UserPreference", UserPreferenceSchema);
module.exports = UserPreference;
