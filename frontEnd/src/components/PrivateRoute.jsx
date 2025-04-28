import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // 🛑 Important: don't render anything until we know user's auth status
    // console.log("Loading user authentication status...");
    return (
      <div className="flex items-center justify-center h-screen">
        <span className="loading loading-spinner loading-lg text-black-600 bg-amber-500"
         style={{
          animationDelay: `${2 * 0.1}s`,
          animationDuration: '10s',
        }}
        ></span> 
      </div>
    );
  }

  if (!user) {
    // console.log("User not authenticated, redirecting to login...",user);
    return <Navigate to="/login" replace />;
  }
return children;
  
};

export default PrivateRoute;
