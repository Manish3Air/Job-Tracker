// src/context/ResumeContext.jsx
import { createContext, useState, useContext } from "react";

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [resumes, setResumes] = useState([]);

  return (
    <ResumeContext.Provider value={{ resumes, setResumes }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => useContext(ResumeContext);
