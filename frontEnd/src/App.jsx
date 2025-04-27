// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Tracker from './pages/Tracker';
import Docs from './pages/Docs';
import Me from './pages/Me';
import AddApplication from './pages/AddApplication'; // ✅ NEW Import
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import  Analytics  from './pages/Analytics';

function App() {
  return (
    <div>
      <Router>
        <div className="min-h-screen flex flex-col bg-amber-100">
          <Navbar />
          <div className="flex-grow">
            <Routes>
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
            </Routes>
          </div>
          <Footer />
          <BackToTop />
        </div>
      </Router>
    </div>
  );
}

export default App;
