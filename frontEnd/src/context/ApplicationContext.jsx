// src/context/ResumeContext.jsx
import { createContext, useState, useContext } from "react";

const ApplicationContext = createContext();

export const Application = ({ children }) => {
  const [Application, setApplication] = useState([]);

  return (
    <ApplicationContext.Provider value={{ Application, setApplication }}>
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () => useContext(ApplicationContext);
