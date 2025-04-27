// routes/applicationRoutes.js
const express = require('express');
const { createApplication, getApplications, updateApplication, deleteApplication } = require( "../controllers/applicationController.js");
const protect = require('../middleware/authMiddleware').protect;

const router = express.Router();

// Protected Routes (User must be logged in)
router.post("/", protect, createApplication);       // Create new application
router.get("/", protect, getApplications);          // Get all user's applications
router.put("/:id", protect, updateApplication);      // Update an application
router.delete("/:id", protect, deleteApplication);   // Delete an application

module.exports = router;
