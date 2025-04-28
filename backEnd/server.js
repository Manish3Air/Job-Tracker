const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');




dotenv.config(); // ✅ Load env variables early

const app = express();

// ✅ Connect to DB
connectDB();

// ✅ Middlewares
app.use(express.json());

// ✅ CORS config
app.use(
  cors({
    origin: ["http://localhost:5173", "https://job-tracker-j43u.vercel.app"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


// ✅ Routes
app.use('/api/auth', authRoutes); // ✅ Auth routes
app.use('/api/applications', applicationRoutes);


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
