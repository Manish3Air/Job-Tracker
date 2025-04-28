// src/pages/AddApplication.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";

const AddApplication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const editingApplicationId = location.state?.applicationId || null;
//   console.log("id in add-application",editingApplicationId);

  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // If editing, fetch existing application details
  useEffect(() => {
    const fetchApplication = async () => {
      if (!editingApplicationId) return;
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/applications/${editingApplicationId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const app = response.data.application;
        // console.log("Data fetched according to id",app);
        setFormData({
          company: app.company || "",
          position: app.position || "",
          status: app.status || "Applied",
          appliedDate: app.appliedDate ? app.appliedDate.split("T")[0] : "",
          notes: app.notes || "",
        });
      } catch (error) {
        console.error("Failed to fetch application for editing:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [editingApplicationId]);

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (editingApplicationId) {
        // Update application
        await axios.put(`/api/applications/${editingApplicationId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Application updated!");
      } else {
        // Add new application
        await axios.post("/api/applications", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Application added!");
      }

      navigate("/tracker"); // Redirect after add/edit
    } catch (error) {
      console.error("Failed to submit application:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="px-6 py-26 min-h-screen bg-base-200 flex justify-center items-start"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-lg bg-base-100 p-8 rounded-2xl shadow-lg space-y-6"
      >
        <h1 className="text-3xl font-bold text-center text-primary">
          {editingApplicationId ? "Edit Application" : "Add Application"}
        </h1>

        {loading ? (
          <div className="text-center">Loading application details...</div>
        ) : (
          <>
            {/* Company */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Company</span>
              </label>
              <input 
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Position */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Position</span>
              </label>
              <input 
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Status */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select 
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="select select-bordered w-full"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            {/* Applied Date */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Applied Date</span>
              </label>
              <input 
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Notes */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Notes (optional)</span>
              </label>
              <textarea 
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                rows="4"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={submitting}
              className="btn btn-primary w-full"
            >
              {submitting 
                ? (editingApplicationId ? "Updating..." : "Adding...") 
                : (editingApplicationId ? "Update Application" : "Add Application")
              }
            </button>
          </>
        )}
      </form>
    </motion.div>
  );
};

export default AddApplication;
