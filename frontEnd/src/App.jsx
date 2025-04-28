// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Docs from './pages/Docs';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Analytics from './pages/Analytics';
import Me from './pages/Me';
import AddApplication from './pages/AddApplication'; // ✅ NEW Import

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import PrivateRoute from './components/PrivateRoute';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/docs" element={<Docs />} />

        {/* Private Routes */}
        <Route path="/me" element={<PrivateRoute><Me /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/tracker" element={<PrivateRoute><Tracker /></PrivateRoute>} />
        <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
        <Route path="/add-application" element={<PrivateRoute><AddApplication /></PrivateRoute>} /> {/* ✅ Added Route */}

        {/* Fallback 404 */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow">
          <AnimatedRoutes />
        </div>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
