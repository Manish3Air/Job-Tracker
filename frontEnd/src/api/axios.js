import axios from "axios";

// Set baseURL depending on environment
const baseURL = process.env.NODE_ENV === "development"
  ? "http://localhost:5000"  // your local backend URL
  : "https://job-tracker-tx9v.onrender.com"; // your deployed backend URL

const instance = axios.create({
  baseURL,
  withCredentials: true, // if you use cookies / sessions
});

export default instance;
