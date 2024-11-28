import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import DataContext from "../context/DataContext";

function Experiment() {
  const { formData, taskData, setTaskData, setCsvData } = useContext(DataContext);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [countdown, setCountdown] = useState(3);
  const [feedbackColor, setFeedbackColor] = useState({});
  const [disableButtons, setDisableButtons] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [incorrectOptions, setIncorrectOptions] = useState([]);
  const navigate = useNavigate();

  const tasks = [
    {
      identifier: "moveSouth",
      type: "camelCase",
      distractors: ["moveSource", "moreSouth", "moverSound"],
      sentence: "move south",
    },
    {
      identifier: "calculateTotal",
      type: "camelCase",
      distractors: ["calculateSum", "totalCalculation", "sumCalculate"],
      sentence: "calculate total",
    },
    {
      identifier: "userLoginDetails",
      type: "camelCase",
      distractors: ["userDetails", "loginUserDetails", "userLogins"],
      sentence: "user login details",
    },
    {
      identifier: "move-south",
      type: "kebabCase",
      distractors: ["move-source", "more-south", "mover-sound"],
      sentence: "move south",
    },
    {
      identifier: "calculate-total",
      type: "kebabCase",
      distractors: ["calculate-sum", "total-calculation", "sum-calculate"],
      sentence: "calculate total",
    },
    {
      identifier: "user-login-details",
      type: "kebabCase",
      distractors: ["user-details", "login-user-details", "user-logins"],
      sentence: "user login details",
    },
  ];

  useEffect(() => {
    setTaskData([]); // Clear previous experiment data
  }, [setTaskData]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (startTime === null) {
      setStartTime(Date.now());
    }
  }, [countdown, startTime]);

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const options = [tasks[currentTaskIndex].identifier, ...tasks[currentTaskIndex].distractors];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
      setIncorrectOptions([]);
    }
  // eslint-disable-next-line
  }, [currentTaskIndex]);


  const handleOptionClick = (isCorrect, option) => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;
  
    if (disableButtons) return;
  
    if (isCorrect) {
      setFeedbackColor({ [option]: "green" });
      setDisableButtons(true);
  
      setTaskData((prev) => {
        const updatedData = prev.filter((task) => task.identifier !== tasks[currentTaskIndex].identifier);
        return [
          ...updatedData,
          {
            ...tasks[currentTaskIndex],
            timeTaken,
            isCorrect: true,
          },
        ];
      });
  
      setTimeout(() => {
        if (currentTaskIndex + 1 < tasks.length) {
          setCurrentTaskIndex(currentTaskIndex + 1);
          setStartTime(Date.now());
          setFeedbackColor({});
          setDisableButtons(false);
        } else {
          generateCsvData();
          navigate("/results");
        }
      }, 1000);
    } else {
      if (!disableButtons) {
        setTaskData((prev) => {
          const existingTask = prev.find((task) => task.identifier === tasks[currentTaskIndex].identifier);
          if (existingTask && existingTask.isCorrect) {
            return prev;
          }
          const updatedData = prev.filter((task) => task.identifier !== tasks[currentTaskIndex].identifier);
          return [
            ...updatedData,
            {
              ...tasks[currentTaskIndex],
              timeTaken,
              isCorrect: false,
            },
          ];
        });
      }
  
      setIncorrectOptions((prev) => [...prev, option]);
    }
  };
  
  

  const generateCsvData = () => {
    const csvContent = Papa.unparse(
      taskData.map((task) => ({
        name: formData.name,
        age: formData.age,
        experience: formData.experience,
        identifier: task.identifier,
        type: task.type,
        timeTaken: task.timeTaken,
        isCorrect: task.isCorrect,
      }))
    );

    setCsvData(csvContent);
  };

  return (
    <div>
      <header>
        <h1>Experiment</h1>
      </header>
      <main>
        {countdown > 0 ? (
          <div>
            <h1>The experiment will start in:</h1>
            <h1>{countdown}</h1>
          </div>
        ) : currentTaskIndex < tasks.length ? (
          <div>
            <p>
              Identify the corresponding identifier for:
            </p>
            <h1>
              <strong>{tasks[currentTaskIndex].sentence}</strong>
            </h1>
            <div className="card-grid">
              {shuffledOptions.map((option, index) => (
                <button
                  key={index}
                  className="card-button"
                  onClick={() =>
                    handleOptionClick(option === tasks[currentTaskIndex].identifier, option)
                  }
                  style={{
                    backgroundColor:
                      feedbackColor[option] || (incorrectOptions.includes(option) ? "red" : ""),
                    pointerEvents: disableButtons ? "none" : "auto",
                  }}                  
                >
                  {option}
                </button>
              ))}
            </div>
            <p>Task {currentTaskIndex + 1} of {tasks.length}</p>
          </div>
        ) : (
          <p>Experiment completed!</p>
        )}
      </main>
    </div>
  );
}

export default Experiment;
