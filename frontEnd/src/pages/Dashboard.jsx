import { useContext } from "react";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import ApplicationCard from "../components/ApplicationCard";
import CountUp from "react-countup";

const recentApplications = [
  {
    id: 1,
    company: "Google",
    position: "Frontend Developer",
    status: "Interview",
    appliedDate: "April 24, 2025",
  },
  {
    id: 2,
    company: "Amazon",
    position: "Backend Engineer",
    status: "Applied",
    appliedDate: "April 22, 2025",
  },
];

// 🔥 Variants for whole page
const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

// 🔥 Variants for stat cards container
const statContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2, // Delay between cards
    },
  },
};

// 🔥 Variants for each stat card
const cardVariants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const recentContainerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.15, // a bit faster than stats
    },
  },
};

const recentCardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  // console.log("User in Dashboard:", user); // Debugging line
  // console.log(user?.name)
// Add these variants above inside Dashboard.jsx


  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="px-6 py-26 bg-base-200 min-h-screen"
    >
      {/* Page Title */}
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
        {/* Card 1 */}
        <motion.div variants={cardVariants} className="bg-primary text-primary-content rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold">Total Applications</h2>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={1124} duration={4} />
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div variants={cardVariants} className="bg-success text-success-content rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold">Offers Received</h2>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={1115} duration={4} />
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div variants={cardVariants} className="bg-info text-info-content rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold">Interviews Scheduled</h2>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={1117} duration={4} />
          </p>
        </motion.div>

        {/* Card 4 */}
        <motion.div variants={cardVariants} className="bg-error text-error-content rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold">Rejections</h2>
          <p className="text-4xl font-bold mt-2">
            <CountUp end={1112} duration={4} />
          </p>
        </motion.div>
      </motion.div>

      {/* Recent Applications List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Applications</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentApplications.map((app) => (
            <ApplicationCard
              key={app.id}
              company={app.company}
              position={app.position}
              status={app.status}
              appliedDate={app.appliedDate}
              onEdit={() => console.log("Edit", app.id)}
              onDelete={() => console.log("Delete", app.id)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
