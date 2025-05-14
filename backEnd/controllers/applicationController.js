// controllers/applicationController.js
// import Application from "../models/Application.js";
const Application = require("../models/Application.js")

// Create a new application
const createApplication = async (req, res) => {
  try {
    const { company, position, status, appliedDate, resume, notes, appPlatform, salary, location } = req.body;

    const application = new Application({
      company,
      position,
      appPlatform,
      salary,
      location,
      status,
      appliedDate,
      resume,
      notes,
      user: req.user.id, // from auth middleware
    });

    const savedApp = await application.save();
    // const populatedApp = await savedApp.populate("resume");

    res.status(201).json({ success: true, application: savedApp });
  } catch (error) {
    console.error("Create Application Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


// Get all applications of logged-in user
 const getApplications = async (req, res) => {
  try {
    const applications = await Application.find({ user: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, applications });
  } catch (error) {
    console.error("Get Applications Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// get application by id  
const getApplicationById = async (req, res) => {
    try {
      const application = await Application.findOne({ 
        _id: req.params.id, 
        user: req.user.id // To make sure the user can only access their own applications
      });
  
      if (!application) {
        return res.status(404).json({ success: false, message: "Application not found" });
      }
  
      res.status(200).json({ success: true, application });
    } catch (error) {
      console.error("Get Application By ID Error:", error);
      res.status(500).json({ success: false, message: "Server Error" });
    }
  };

  // get resume by id 
  // const applications = await Application.find({ user: req.user.id }).populate("resume");

  

// Update an application
 const updateApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOneAndUpdate(
      { _id: id, user: req.user.id }, // ensure only user's own apps
      req.body,
      { new: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, application });
  } catch (error) {
    console.error("Update Application Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Delete an application
 const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;

    const application = await Application.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    res.status(200).json({ success: true, message: "Application deleted" });
  } catch (error) {
    console.error("Delete Application Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = {createApplication,getApplications,updateApplication,deleteApplication,getApplicationById};
