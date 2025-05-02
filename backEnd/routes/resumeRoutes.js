// routes/resumeRoutes.js
const express = require("express");
const multer = require("multer");
const Resume = require("../models/resumeModel");
const { uploadResume, getResumeByID, deleteResume } = require("../controllers/resumeController");
const { storage } = require("../config/cloudinary"); // Make sure filename matches your file
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Cloudinary-based storage middleware
const upload = multer({ storage });

// GET all resumes for logged-in user
router.get("/", protect, async (req, res) => {
  try {
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    // console.log(resumes);
    res.status(200).json({ resumes });
  } catch (err) {
    console.error("Failed to fetch resumes:", err);
    res.status(500).json({ message: "Failed to fetch resumes" });
  }
});

// GET a specific resume by ID
router.get("/:id", protect, getResumeByID);

// POST a new resume (upload)
router.post("/", protect, upload.single("file"), uploadResume);

router.delete("/:id", protect, deleteResume);

module.exports = router;
