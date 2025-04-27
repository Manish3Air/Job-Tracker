// src/pages/Analytics.jsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample Data for the Line Chart
const data = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'Applications',
      data: [30, 45, 70, 90, 120],
      fill: false,
      borderColor: 'rgba(75,192,192,1)',
      tension: 0.1,
    },
    {
      label: 'Interviews',
      data: [10, 15, 25, 40, 60],
      fill: false,
      borderColor: 'rgba(255,99,132,1)',
      tension: 0.1,
    },
  ],
};

// Sample Stats
const stats = {
  totalApplications: 150,
  totalOffers: 45,
  totalInterviews: 60,
  totalRejections: 30,
};

const Analytics = () => {
  return (
    <div className="px-6 py-26 bg-base-200">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-primary mb-6">Analytics Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-primary text-primary-content rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold">Total Applications</h2>
            <p className="text-4xl font-bold mt-2">{stats.totalApplications}</p>
          </div>

          <div className="bg-success text-success-content rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold">Offers Received</h2>
            <p className="text-4xl font-bold mt-2">{stats.totalOffers}</p>
          </div>

          <div className="bg-info text-info-content rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold">Interviews Scheduled</h2>
            <p className="text-4xl font-bold mt-2">{stats.totalInterviews}</p>
          </div>

          <div className="bg-error text-error-content rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-semibold">Rejections</h2>
            <p className="text-4xl font-bold mt-2">{stats.totalRejections}</p>
          </div>
        </div>

        {/* Applications Over Time Chart */}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Applications Over Time</h2>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Line data={data} options={{ responsive: true, plugins: { title: { display: true, text: 'Applications & Interviews Over Time' } } }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
