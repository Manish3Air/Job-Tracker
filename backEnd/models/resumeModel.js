// models/resumeModel.js
const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  role: { type: String, required: true },
  skills: [String],
  summary: String,
  publicId: String,
  fileUrl: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);
