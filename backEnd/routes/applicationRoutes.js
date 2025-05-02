// routes/applicationRoutes.js
const express = require('express');
const { createApplication, getApplications, updateApplication, deleteApplication, getApplicationById } = require( "../controllers/applicationController.js");
const protect = require('../middleware/authMiddleware').protect;
const Application = require("../models/Application.js");

const router = express.Router();

// Protected Routes (User must be logged in)
router.post("/", protect, createApplication);       // Create new application
router.get("/", protect, getApplications);          // Get all user's applications
router.get("/:id",protect,getApplicationById);      // Gett application by id
router.put("/:id", protect, updateApplication);      // Update an application
router.delete("/:id", protect, deleteApplication);   // Delete an application

// router.get("/", protect, async (req, res) => {
//     try {
//       const apps = await Application.find({ user: req.user.id }).populate("resume");
//       res.json(apps);
//     } catch (err) {
//       res.status(500).json({ error: "Failed to fetch applications" });
//     }
//   });
  

module.exports = router;
