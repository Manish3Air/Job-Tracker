// src/pages/AddApplication.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddApplication = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);

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
      await axios.post("/api/applications", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Success Toast
    //   window.toast("Application Added Successfully!", { type: "success" });

      // Redirect
      navigate("/tracker");
    } catch (error) {
      console.error("Failed to add application:", error);
    //   window.toast("Something went wrong. Try again.", { type: "error" });
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
        <h1 className="text-3xl font-bold text-center text-primary">Add Application</h1>

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
          {submitting ? "Adding..." : "Add Application"}
        </button>
      </form>
    </motion.div>
  );
};

export default AddApplication;
