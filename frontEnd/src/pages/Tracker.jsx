import  {React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ApplicationCard from "../components/ApplicationCard";
import { toast } from "sonner";
import { XCircleIcon } from '@heroicons/react/24/solid';

const Tracker = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch job applications from backend
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get("/api/applications", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setApplications(response.data.applications || []); // Safety fallback
          console.log("Fetched Applications:", response.data);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleEdit = (applicationId) => {
    navigate("/add-application", { state: { applicationId } });
  };

  const handleDelete = async (applicationId) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/applications/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApplications((prev) => prev.filter((app) => app._id !== applicationId));
      toast(
        <div className="flex items-start gap-3 animate-slide-in">
          <XCircleIcon className="w-6 h-6 text-red-500 mt-1" />
          <div>
            <p className="text-sm font-semibold text-red-600">Success!</p>
            <p className="text-sm text-gray-800">Your Application has been deleted.</p>
          </div>
        </div>,
        {
          duration: 4000,
          style: {
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            boxShadow: '0 4px 20px rgba(34, 197, 94, 0.1)',
          },
        }
      );
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  return (
    <div className="px-6 py-6 sm:py-12 lg:py-16 bg-base-200 min-h-screen">
      <div className="flex justify-between items-center mb-6 mt-14 ">
        <h1 className="text-2xl sm:text-3xl font-semibold text-secondary">
          Your Applications
        </h1>
        <Link
          to="/add-application"
          className="btn btn-primary btn-md rounded-full shadow-lg transition hover:scale-105 hover:shadow-xl"
        >
          ➕ Add New Application
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.isArray(applications) && applications.length === 0 ? (
            <div className="col-span-full text-center text-lg">
              No applications found.
            </div>
          ) : (
            applications.map((app) => (
              <ApplicationCard
                key={app._id}
                company={app.company}
                position={app.position}
                appPlatform={app.appPlatform}
                salary={app.salary}
                location={app.location}
                status={app.status}
                notes={app.notes}
                resume={app.resume}
                appliedDate={app.appliedDate}
                onEdit={() => handleEdit(app._id)}
                onDelete={() => handleDelete(app._id)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Tracker;
