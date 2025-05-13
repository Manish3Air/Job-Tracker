import React, { useState } from "react";
import axios from "../api/axios";
import ResumeList from "../components/ResumeList";
import { toast } from "sonner";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const ResumeBuilder = () => {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const resetForm = () => {
    setTitle("");
    setRole("");
    setSkills("");
    setSummary("");
    setFile(null);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("role", role);
      formData.append("skills", skills);
      formData.append("summary", summary);
      if (file) formData.append("file", file);

      if (isEditing) {
        await axios.put(`/api/resumes/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Resume updated successfully!");
      } else {
        await axios.post("/api/resumes", formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast(
          <div className="flex items-start gap-3 animate-slide-in">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mt-1" />
            <div>
              <p className="text-sm font-semibold text-green-600">Success!</p>
              <p className="text-sm text-gray-800">
                Your resume has been uploaded successfully.
              </p>
            </div>
          </div>,
          {
            duration: 4000,
            style: {
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              boxShadow: "0 4px 20px rgba(34, 197, 94, 0.1)",
            },
          }
        );
      }

      resetForm();
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectResume = (resume) => {
    setTitle(resume.title || "");
    setRole(resume.role || "");
    setSkills(Array.isArray(resume.skills) ? resume.skills.join(", ") : resume.skills || "");
    setSummary(resume.summary || "");
    setEditingId(resume._id);
    setIsEditing(true);
    toast.success("Resume loaded for editing.");
  };

  return (
    <div className="px-4 sm:px-6 py-6 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mt-20 mb-8 text-center text-primary">
        Make / Update Resume
      </h1>

      <div className="flex flex-col lg:flex-row gap-12 justify-between">
        {/* Resume Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-base-100 px-6 py-8 rounded-lg shadow-lg w-full lg:max-w-3xl space-y-4"
        >
          <div>
            <label className="block font-medium">Resume Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Role</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-medium">Upload Resume (PDF)</label>
            <input
              type="file"
              accept=".pdf"
              className="file-input file-input-bordered w-full"
              onChange={(e) => setFile(e.target.files[0])}
              required={!isEditing}
            />
          </div>

          <div>
            <label className="block font-medium">Skills (comma-separated)</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium">Summary</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          {error && <p className="text-error text-sm">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full"
          >
            {submitting
              ? isEditing
                ? "Updating..."
                : "Saving..."
              : isEditing
              ? "Update Resume"
              : "Add Resume"}
          </button>

          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary w-full"
              onClick={resetForm}
            >
              Cancel Editing
            </button>
          )}
        </form>

        {/* Resume List */}
        <div className="w-full lg:max-w-2xl mr-0 lg:mr-5">
          <ResumeList onSelect={handleSelectResume} refreshTrigger={refreshKey} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
