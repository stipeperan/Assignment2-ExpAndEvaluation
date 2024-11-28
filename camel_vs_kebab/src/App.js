import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from 'react';
import WelcomePage from "./components/WelcomePage";
import DemographicsForm from "./components/DemographicsForm";
import Experiment from "./components/Experiment";
import Results from "./components/Results";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/form" element={<DemographicsForm />} />
        <Route path="/experiment" element={<Experiment />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
