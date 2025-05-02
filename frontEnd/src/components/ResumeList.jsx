import React, { useEffect, useState } from "react";
import axios from "../api/axios";

const ResumeList = ({ onSelect, refreshTrigger }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const [Deleting,SetDeleting] = useState(false);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes(res.data.resumes);
      console.log("resume fetched....", res.data.resumes);
    } catch (err) {
      console.error("Failed to fetch resumes", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, [token, refreshTrigger]);

  const handleDelete = async (id) => {
    SetDeleting(true);
    try {
      await axios.delete(`/api/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
      console.log("Deleted Successfully");
    } catch (err) {
      console.error("Failed to delete resume", err);
    }finally{
      SetDeleting(false);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading resumes...</p>;
  }

  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Resumes</h2>
      {resumes.length === 0 ? (
        <p className="text-center text-gray-500">No resumes uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-base-100 p-4 rounded-lg shadow-md border"
            >
              <h3 className="text-xl font-semibold">{resume.title}</h3>
              <p className="text-sm">Role: {resume.role}</p>
              {resume.skills && (
                <p className="text-sm mt-1">
                  Skills:{" "}
                  {Array.isArray(resume.skills)
                    ? resume.skills.join(", ")
                    : resume.skills}
                </p>
              )}
              {resume.summary && (
                <p className="text-sm mt-1 italic">{resume.summary}</p>
              )}

              <div className="mt-4 space-x-2">
                <a
                  href={resume.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-info"
                >
                  View Resume
                </a>

                {onSelect && (
                  <button
                    onClick={() => onSelect(resume)}
                    className="btn btn-sm btn-primary"
                  >
                    Use this Resume
                  </button>
                )}

                <button
                  type = "Delete"
                  onClick={() => handleDelete(resume._id)}
                  disabled = {Deleting}
                  className="btn btn-sm btn-error"
                >
                  {Deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumeList;
