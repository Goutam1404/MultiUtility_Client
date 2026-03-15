import { createContext, useContext, useEffect, useState } from "react";

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  //service= true => user login is required
  //service= false => all data are stored in locale storage
  const [service, setService] = useState(() => {
    const savedState = localStorage.getItem("service_mode");
    // localStorage stores everything as strings, so we parse it back to a boolean
    return savedState !== null ? JSON.parse(savedState) : true;
  });

  // 2. Every time 'service' changes, save it to localStorage
  useEffect(() => {
    localStorage.setItem("service_mode", JSON.stringify(service));
  }, [service]);

  console.log(service,"In service context");
  
  const values = {service, setService};
  return (
    <ServiceContext.Provider value={values}>{children}</ServiceContext.Provider>
  );
};

export const useService = () => useContext(ServiceContext);
