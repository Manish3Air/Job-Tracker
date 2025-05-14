import { Pencil, Trash2, Download } from "lucide-react";
import React, { useEffect, useState } from "react";
import axios from "../api/axios";

export default function ApplicationCard({
  company,
  position,
  appPlatform,
  salary,
  location,
  status,
  appliedDate,
  notes,
  resume,
  onEdit,
  onDelete,
}) {
  const [resumeData, setResumeData] = useState(null);
  // const [Delete,SetDeleting] = useState(false);

  const statusColor =
    {
      Applied: "badge-primary",
      Interview: "badge-info",
      Offer: "badge-success",
      Rejected: "badge-error",
    }[status] || "badge-ghost";

  useEffect(() => {
    const fetchResume = async () => {
      if (!resume) return;

      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(`/api/resumes/${resume}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResumeData(res.data.resume || []);
      } catch (err) {
        console.error("Failed to fetch resume", err);
        setResumeData({ title: "Deleted Resume", fileUrl: "" });
      }
    };

    fetchResume();
  }, [resume]);

  return (
    <div className="card bg-base-200 shadow-md hover:shadow-lg transition duration-300">
      <div className="card-body bg-base-100 space-y-2">
        {/* Top: Company, Position, Actions */}
        <div className="flex justify-between items-start p-4 rounded-2xl">
          <div className="space-y-1">
            <h2 className="text-lg font-bold">
              {company || "Unknown Company"}
            </h2>
            <p className="text-md font-medium ">
              {position || "No Position"}
            </p>
            <p className="text-md font-medium ">
              {appPlatform || "Unknown Platform"}
            </p>
            <p className="text-md font-medium ">
              <span className="font-normal text-md">Salary : </span>{salary || "Unpaid"}
            </p>
            <p className="text-md font-medium ">
              <span className="font-normal text-md">Location : </span>{location || "India"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="p-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-150"
              onClick={onEdit}
              title="Edit"
            >
              <Pencil size={16} />
            </button>
            <button
              className="p-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-150"
              onClick={onDelete}
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Notes */}
        {notes && (
          <div className="text-sm italic">
            {notes.length > 100 ? notes.substring(0, 100) + "..." : notes}
          </div>
        )}

        {/* Resume Display */}
        {resumeData && (
          <div className="text-sm space-y-1">
            <p>
              Resume: <strong>{resumeData.title}</strong>
            </p>
            {resumeData.fileUrl ? (
              <div className="flex space-x-2">
                <a
                  href={resumeData.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-xs btn-info"
                >
                  View
                </a>
                <a
                  href={resumeData.fileUrl}
                  download
                  className="btn btn-xs btn-secondary flex items-center gap-1"
                >
                  <Download size={14} />
                  Download
                </a>
              </div>
            ) : (
              <p className="text-xs text-error">Resume file not available.</p>
            )}
          </div>
        )}

        {/* Status and Date */}
        <div className="flex justify-between items-center">
          <div className={`badge ${statusColor} text-xs capitalize`}>
            {status || "No Status"}
          </div>
          <div className="text-xs">
            {appliedDate
              ? new Date(appliedDate).toDateString()
              : "Unknown Date"}
          </div>
        </div>
      </div>
    </div>
  );
}
