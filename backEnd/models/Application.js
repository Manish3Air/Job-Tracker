// models/Application.js
const mongoose = require('mongoose');
const User = require('./User');

const applicationSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    appPlatform: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "Interview", "Offer", "Rejected"],
      default: "Applied",
    },
    appliedDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      required: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Linking application to the User
      required: true,
    },
    resume: {
      type: String,
      required: true, // assuming you have a Resume model
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);




