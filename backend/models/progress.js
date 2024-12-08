const mongoose = require("mongoose");

const ProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: String, required: true },
  weight: { type: Number },
  bloodSugar: { type: Number },
  bloodPressure: { type: String },
  cholesterol: { type: Number },
});

ProgressSchema.index({ userId: 1, date: 1 }, { unique: true });

const Progress = mongoose.model("Progress", ProgressSchema);
module.exports = Progress;
