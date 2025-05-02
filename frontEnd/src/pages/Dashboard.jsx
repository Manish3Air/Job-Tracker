import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import ApplicationCard from "../components/ApplicationCard";
import CountUp from "react-countup";
import axios from "../api/axios";
import {  useNavigate } from "react-router-dom";

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const statContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState(""); // <- new filter state
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(response.data.applications || []);
        console.log("Fetched applications:", response.data.applications);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const handleEdit = (applicationId) => {
    // console.log("Edit clicked..." , applicationId);
    navigate("/add-application", { state: { applicationId } });
  };

  const handleDelete = async (applicationId) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/applications/${applicationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // After delete, refetch or update UI manually
      setApplications((prev) =>
        prev.filter((app) => app._id !== applicationId)
      );
      console.log("Deleted successfully!");
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const totalApplications = applications.length;
  const offersReceived = applications.filter(
    (app) => app.status === "Offer"
  ).length;
  const interviewsScheduled = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const rejections = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const filteredApplications = statusFilter
    ? applications.filter((app) => app.status === statusFilter)
    : applications;

  const recentApplications = [...filteredApplications]
    .sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate))
    .slice(0, 6);

  const handleCardClick = (status) => {
    if (statusFilter === status) {
      setStatusFilter(""); // Unselect if already selected
    } else {
      setStatusFilter(status);
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-26 bg-base-200 min-h-screen"
    >
      <h1 className="text-3xl font-bold mb-10 text-center text-secondary">
        Welcome back, {user?.name || "User"} 👋
      </h1>

      {/* Stat Cards */}
      <motion.div
        variants={statContainerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        <motion.div
          variants={cardVariants}
          onClick={() => handleCardClick("")} // Show all
          className={`cursor-pointer bg-primary text-primary-content rounded-lg p-6 shadow-md ${
            statusFilter === "" && "ring-4 ring-primary-content"
          }`}
        >
          <h2 className="text-xl font-semibold">Total Applications</h2>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={totalApplications} duration={2} />
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          onClick={() => handleCardClick("Offer")}
          className={`cursor-pointer bg-success text-success-content rounded-lg p-6 shadow-md ${
            statusFilter === "Offer" && "ring-4 ring-success-content"
          }`}
        >
          <h2 className="text-xl font-semibold">Offers Received</h2>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={offersReceived} duration={2} />
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          onClick={() => handleCardClick("Interview")}
          className={`cursor-pointer bg-info text-info-content rounded-lg p-6 shadow-md ${
            statusFilter === "Interview" && "ring-4 ring-info-content"
          }`}
        >
          <h2 className="text-xl font-semibold">Interviews Scheduled</h2>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={interviewsScheduled} duration={2} />
          </p>
        </motion.div>

        <motion.div
          variants={cardVariants}
          onClick={() => handleCardClick("Rejected")}
          className={`cursor-pointer bg-error text-error-content rounded-lg p-6 shadow-md ${
            statusFilter === "Rejected" && "ring-4 ring-error-content"
          }`}
        >
          <h2 className="text-xl font-semibold">Rejections</h2>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={rejections} duration={2} />
          </p>
        </motion.div>
      </motion.div>

      {/* Recent Applications List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">
            {statusFilter
              ? `Showing ${statusFilter} Applications`
              : "Recent Applications"}
          </h2>

          {statusFilter && (
            <button
              onClick={() => setStatusFilter("")}
              className="btn btn-sm btn-outline btn-secondary"
            >
              Clear Filter
            </button>
          )}
        </div>

        {loading ? (
          <div>Loading recent applications...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentApplications.length === 0 ? (
              <div className="col-span-3 text-center">
                No applications found.
              </div>
            ) : (
              recentApplications.map((app) => (
                <ApplicationCard
                  key={app._id}
                  company={app.company}
                  position={app.position}
                  status={app.status}
                  resume={app.resume}
                  appliedDate={new Date(app.appliedDate).toLocaleDateString()}
                  onEdit={() => handleEdit(app._id)}
                  onDelete={() => handleDelete(app._id)}
                />
              ))
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;
