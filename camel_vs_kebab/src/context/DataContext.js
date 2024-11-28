import React, { createContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    experience: "",
  });
  const [taskData, setTaskData] = useState([]);
  const [csvData, setCsvData] = useState("");

  return (
    <DataContext.Provider
      value={{
        formData,
        setFormData,
        taskData,
        setTaskData,
        csvData,
        setCsvData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
