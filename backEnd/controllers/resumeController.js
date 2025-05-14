// controllers/resumeController.js
const Resume = require("../models/resumeModel");
const {cloudinary} = require("../config/cloudinary");

const updateResume = async (req, res) => {
  try {
    const { title, role, skills, summary } = req.body;
    const resumeId = req.params.id;

    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Only allow user to update their own resume
    if (resume.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized to update this resume" });
    }

    // If a new file is uploaded, replace the existing one on Cloudinary
    if (req.file) {
      // Delete old file from Cloudinary
      if (resume.publicId) {
        await cloudinary.uploader.destroy(resume.publicId);
      }

      // Upload new file
      const uploaded = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        folder: "resumes",
        access_mode: "public",
      });

      resume.cloudinaryUrl = uploaded.secure_url;
      resume.publicId = uploaded.public_id;
    }

    // Update fields
    resume.title = title || resume.title;
    resume.role = role || resume.role;
    resume.skills = skills ? skills.split(",").map(s => s.trim()) : resume.skills;
    resume.summary = summary || resume.summary;

    await resume.save();

    res.status(200).json({ message: "Resume updated successfully", resume });
  } catch (err) {
    console.error("Error updating resume:", err);
    res.status(500).json({ message: "Server error updating resume" });
  }
};


const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume || resume.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: "Resume not found" });
    }
     // Delete from Cloudinary if publicId exists
     if (resume.publicId) {
      await cloudinary.uploader.destroy(resume.publicId, {
        resource_type: "raw",
      });
    }

    // Delete from MongoDB
    await resume.deleteOne();

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (err) {
    console.error("Error deleting resume:", err);
    res.status(500).json({ message: "Failed to delete resume" });
  }
};

const uploadResume = async (req, res) => {
  try {
    const { title, role, summary, skills } = req.body;
    const file = req.file;

    if (!file || !file.path) {
      return res.status(400).json({ message: "File upload failed" });
    }

    const newResume = new Resume({
      title,
      role,
      summary,
      skills: skills?.split(",") || [],
      fileUrl: file.path, // Cloudinary secure_url
      publicId: file.filename, // If needed for delete later
      user: req.user._id,
    });
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    console.error("Resume upload error:", error);
    res.status(500).json({ message: "Resume upload failed" });
  }
};



const getResumeByID = async(req,res) => {
    try {
          const resume = await Resume.findOne({ 
            _id: req.params.id, 
            user: req.user.id // To make sure the user can only access their own applications
          });
      
          if (!resume) {
            // console.log("Resume Not found");
            return res.status(404).json({ success: false, message: "Resume not found" });
          }
      
          res.status(200).json({ success: true, resume });
        } catch (error) {
          console.error("Get Resume By ID Error:", error);
          res.status(500).json({ success: false, message: "Server Error" });
        }
      };

      


module.exports={getResumeByID,uploadResume,deleteResume,updateResume};