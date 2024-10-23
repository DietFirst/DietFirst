const mongoose = require("mongoose");

const UserPreferenceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dietaryRestrictions: [{ type: String }],
  healthDiseases: [{ type: String }],
  otherDietaryRestriction: { type: String, default: "" },
  otherHealthProblem: { type: String, default: "" },
});

const UserPreference = mongoose.model("UserPreference", UserPreferenceSchema);
module.exports = UserPreference;
