// src/pages/Analytics.jsx
import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import axios from "../api/axios";
import { motion } from "framer-motion";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/applications", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setApplications(response.data.applications);
      } catch (error) {
        console.error("Failed to fetch analytics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  // ✅ Calculate stats dynamically
  const totalApplications = applications.length;
  const totalOffers = applications.filter(
    (app) => app.status === "Offer"
  ).length;
  const totalInterviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;
  const totalRejections = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  // ✅ Prepare Line Chart Data
  const monthMap = {
    0: "January",
    1: "February",
    2: "March",
    3: "April",
    4: "May",
    5: "June",
    6: "July",
    7: "August",
    8: "September",
    9: "October",
    10: "November",
    11: "December",
  };

  const monthlyApplications = {};
  const monthlyInterviews = {};

  applications.forEach((app) => {
    const date = new Date(app.appliedDate);
    const month = monthMap[date.getMonth()];

    if (month) {
      monthlyApplications[month] = (monthlyApplications[month] || 0) + 1;
      if (app.status === "Interview") {
        monthlyInterviews[month] = (monthlyInterviews[month] || 0) + 1;
      }
    }
  });

  const chartLabels = Object.keys(monthMap).map((key) => monthMap[key]);
  const applicationsData = chartLabels.map(
    (month) => monthlyApplications[month] || 0
  );
  const interviewsData = chartLabels.map(
    (month) => monthlyInterviews[month] || 0
  );

  const lineChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Applications",
        data: applicationsData,
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.2,
      },
      {
        label: "Interviews",
        data: interviewsData,
        fill: false,
        borderColor: "rgba(255,99,132,1)",
        tension: 0.2,
      },
    ],
  };

  // ✅ Prepare Pie Chart Data
  const pieChartData = {
    labels: ["Applied", "Interview", "Offer", "Rejected"],
    datasets: [
      {
        label: "Status Distribution",
        data: [
          applications.filter((app) => app.status === "Applied").length,
          totalInterviews,
          totalOffers,
          totalRejections,
        ],
        backgroundColor: [
          "rgba(59, 130, 246, 0.7)", // Blue (Applied)
          "rgba(34, 197, 94, 0.7)", // Green (Interview)
          "rgba(234, 179, 8, 0.7)", // Yellow (Offer)
          "rgba(239, 68, 68, 0.7)", // Red (Rejected)
        ],
        borderColor: [
          "rgba(59, 130, 246, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(234, 179, 8, 1)",
          "rgba(239, 68, 68, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="px-6 py-26 bg-base-200 min-h-screen">
      <div className="max-w-6xl mx-auto bg-base-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-primary mb-6 text-center">
          Analytics Dashboard 📊
        </h1>

        {loading ? (
          <div className="text-center text-lg">Loading Analytics...</div>
        ) : (
          <>
            {/* Stats Overview */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.2, // 0.2s delay between cards
                  },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              {/* Each Card */}
              {[
                {
                  title: "Total Applications",
                  value: totalApplications,
                  bg: "bg-primary",
                  text: "text-primary-content",
                },
                {
                  title: "Offers Received",
                  value: totalOffers,
                  bg: "bg-success",
                  text: "text-success-content",
                },
                {
                  title: "Interviews Scheduled",
                  value: totalInterviews,
                  bg: "bg-info",
                  text: "text-info-content",
                },
                {
                  title: "Rejections",
                  value: totalRejections,
                  bg: "bg-error",
                  text: "text-error-content",
                },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: {
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.5, ease: "easeOut" },
                    },
                  }}
                  className={`${stat.bg} ${stat.text} rounded-lg p-6 shadow-md`}
                >
                  <h2 className="text-xl font-semibold">{stat.title}</h2>
                  <p className="text-4xl font-bold mt-2">{stat.value}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* Line Chart */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-100 p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Applications & Interviews Over Time
                </h2>
                <Line
                  data={lineChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Monthly Trend",
                      },
                    },
                  }}
                />
              </motion.div>

              {/* Pie Chart */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                className="bg-100 p-6 rounded-lg shadow-md"
              >
                <h2 className="text-2xl font-semibold mb-4">
                  Application Status Distribution
                </h2>
                <Pie
                  data={pieChartData}
                  options={{
                    responsive: true,
                    plugins: {
                      title: {
                        display: true,
                        text: "Current Status Split",
                      },
                      legend: {
                        position: "bottom",
                      },
                    },
                  }}
                />
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Analytics;
