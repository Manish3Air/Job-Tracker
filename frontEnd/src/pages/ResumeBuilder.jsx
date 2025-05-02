import React, { useState } from "react";
import axios from "../api/axios";
import ResumeList from "../components/ResumeList";

const ResumeBuilder = () => {
  const [title, setTitle] = useState("");
  const [role, setRole] = useState("");
  const [skills, setSkills] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0); // <-- Add refresh trigger

  const token = localStorage.getItem("token");

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
      formData.append("file", file);

      const res = await axios.post("/api/resumes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Resume uploaded:", res.data);

      // Reset form
      setTitle("");
      setRole("");
      setSkills("");
      setSummary("");
      setFile(null); // Changed from "" to null

      // Refresh resume list
      setRefreshKey((prev) => prev + 1);
    } catch (err) {
      console.error("Upload failed", err);
      setError("Failed to upload. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-6 py-10 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-primary">
        Make / Update Resume
      </h1>

      {/* Resume Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-base-100 p-6 rounded-lg shadow-lg max-w-3xl mx-auto space-y-4"
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
            required
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
          {submitting ? "Saving..." : "Add Resume"}
        </button>
      </form>

      {/* Resume List */}
      <div className="mt-12 max-w-4xl mx-auto">
        <ResumeList refreshTrigger={refreshKey} />
      </div>
    </div>
  );
};

export default ResumeBuilder;
