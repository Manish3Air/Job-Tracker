import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { toast } from "sonner";
import { XCircleIcon } from "@heroicons/react/24/solid";

const ResumeList = ({ onSelect, refreshTrigger }) => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/resumes", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes(res.data.resumes);
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
    setDeletingId(id);
    try {
      await axios.delete(`/api/resumes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResumes((prev) => prev.filter((resume) => resume._id !== id));
      toast(
        <div className="flex items-start gap-3 animate-slide-in">
          <XCircleIcon className="w-6 h-6 text-red-500 mt-1" />
          <div>
            <p className="text-sm font-semibold text-red-600">Deleted!</p>
            <p className="text-sm text-gray-800">
              Your resume has been deleted.
            </p>
          </div>
        </div>,
        {
          duration: 4000,
          style: {
            background: "#fef2f2",
            border: "1px solid #fecaca",
            boxShadow: "0 4px 20px rgba(239, 68, 68, 0.1)",
          },
        }
      );
    } catch (err) {
      console.error("Failed to delete resume", err);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading resumes...</p>;
  }

  return (
    <div className="mt-2 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Your Resumes</h2>
      {resumes.length === 0 ? (
        <p className="text-center">No resumes uploaded yet.</p>
      ) : (
        <div className="grid grid-rows-1 md:grid-rows-2 gap-4">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-base-100 p-2 rounded-lg shadow-md border"
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
                  onClick={() => handleDelete(resume._id)}
                  disabled={deletingId === resume._id}
                  className="btn btn-sm btn-error"
                >
                  {deletingId === resume._id ? "Deleting..." : "Delete"}
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
