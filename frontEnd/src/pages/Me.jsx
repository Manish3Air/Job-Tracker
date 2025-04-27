// src/pages/Me.jsx
import React, { useContext } from 'react';
import  AuthContext  from '../context/AuthContext';

const Me = () => {
  const { user } = useContext(AuthContext); // Accessing user data from AuthContext

  return (
    <div className="px-6 py-26 bg-base-200 ">
      <div className="max-w-4xl bg-base-100 mx-auto  rounded-lg shadow-lg p-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-primary">Profile</h1>
          <p className="text-lg text-base-content-600">Welcome to your profile page, {user?.name || 'User'} 👋</p>
        </div>

        {/* Profile Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex justify-between items-center">
            <label className="font-semibold text-lg text-base-content">Full Name:</label>
            <p className="text-base-content-600">{user?.name || 'Not Provided'}</p>
          </div>
          
          {/* Email */}
          <div className="flex justify-between items-center">
            <label className="font-semibold text-lg text-base-content">Email:</label>
            <p className="text-base-content-600">{user?.email || 'Not Provided'}</p>
          </div>

          {/* Job Applications Count */}
          <div className="flex justify-between items-center">
            <label className="font-semibold text-lg text-base-content">Total Applications:</label>
            <p className="text-base-content-600">24</p>
          </div>

          {/* Offers Received */}
          <div className="flex justify-between items-center">
            <label className="font-semibold text-lg text-base-content">Offers Received:</label>
            <p className="text-base-content-600">5</p>
          </div>

          {/* Interviews Scheduled */}
          <div className="flex justify-between items-center">
            <label className="font-semibold text-lg text-base-content">Interviews Scheduled:</label>
            <p className="text-base-content-600">7</p>
          </div>

          {/* Rejections */}
          <div className="flex justify-between items-center">
            <label className="font-semibold text-lg text-base-content">Rejections:</label>
            <p className="text-base-content-600">12</p>
          </div>
        </div>

        {/* Edit Button (future implementation) */}
        <div className="mt-8 text-center">
          <button className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-focus transition">
            Edit Profile (Coming Soon)
          </button>
        </div>
      </div>
    </div>
  );
};

export default Me;
