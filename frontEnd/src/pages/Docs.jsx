// src/pages/Docs.jsx
import React from 'react';

const Docs = () => {
  return (
    <div className="px-6 py-26 bg-base-200">
      <div className="max-w-4xl mx-auto bg-base-100 rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-semibold text-primary mb-6">Documentation</h1>
        <p className="text-lg  mb-6">Welcome to the JobTracker Documentation. Here you can find helpful guides and API references to get the most out of our application.</p>

        {/* Docs Sections */}
        <div className="space-y-8">
          {/* Section 1: Getting Started */}
          <div>
            <h2 className="text-2xl font-semibold">1. Getting Started</h2>
            <p className=" mt-2">Learn how to get started with JobTracker, including setting up your account, understanding the interface, and using the job application tracker.</p>
            <a href="#getting-started" className="text-primary hover:underline">Read More →</a>
          </div>

          {/* Section 2: Managing Applications */}
          <div>
            <h2 className="text-2xl font-semibold">2. Managing Applications</h2>
            <p className=" mt-2">Understand how to add, track, and manage your job applications effectively with JobTracker.</p>
            <a href="#managing-applications" className="text-primary hover:underline">Read More →</a>
          </div>

          {/* Section 3: Analytics & Reports */}
          <div>
            <h2 className="text-2xl font-semibold ">3. Analytics & Reports</h2>
            <p className=" mt-2">Get insights into your job application trends, success rates, and more.</p>
            <a href="#analytics-reports" className="text-primary hover:underline">Read More →</a>
          </div>

          {/* Section 4: Account & Settings */}
          <div>
            <h2 className="text-2xl font-semibold ">4. Account & Settings</h2>
            <p className=" mt-2">Learn how to manage your account settings, preferences, and privacy settings.</p>
            <a href="#account-settings" className="text-primary hover:underline">Read More →</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
