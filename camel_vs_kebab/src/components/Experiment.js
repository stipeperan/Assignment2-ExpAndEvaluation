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
      identifier: "user-login-details",
      type: "kebabCase",
      distractors: ["user-details", "login-user-details", "user-logins"],
      sentence: "user login details",
    },
    {
      identifier: "send-message",
      type: "kebabCase",
      distractors: ["seed-mastodon", "sand-messenger", "deliverMessage"],
      sentence: "send message",
    },
    {
      identifier: "startProcess",
      type: "camelCase",
      distractors: ["processStart", "initiateProcess", "streamProcess"],
      sentence: "start process",
    },
    {
      identifier: "refresh-page",
      type: "kebabCase",
      distractors: ["reload-page", "reset-page", "update-page"],
      sentence: "refresh page",
    },
    {
      identifier: "noPainNoGain",
      type: "camelCase",
      distractors: ["noPaceNoTaste", "noPainNogain", "noPastNoGassed"],
      sentence: "no pain no gain",
    },
    {
      identifier: "delete-item",
      type: "kebabCase",
      distractors: ["remove-item", "erase-item", "discard-item"],
      sentence: "delete item",
    },
    {
      identifier: "add-to-cart",
      type: "kebabCase",
      distractors: ["add-cart", "place-cart", "cart-add"],
      sentence: "add to cart",
    },
    {
      identifier: "openFile",
      type: "camelCase",
      distractors: ["openFolder", "openFiles", "startFile"],
      sentence: "open file",
    },
    {
      identifier: "goodGame",
      type: "camelCase",
      distractors: ["goodgame", "badGame", "goodDay"],
      sentence: "good game",
    },
    {
      identifier: "as-soon-as-possible",
      type: "kebabCase",
      distractors: ["as-soon-possible", "soon-as-possible", "as-soup-as-possible"],
      sentence: "as soon as possible",
    },
    {
      identifier: "noWay",
      type: "camelCase",
      distractors: ["noShame", "noWave", "noPhase"],
      sentence: "no way",
    },
    {
      identifier: "yes-man",
      type: "kebabCase",
      distractors: ["no-man", "yes-men", "yes-can"],
      sentence: "yes man",
    },
    {
      identifier: "frontEnd",
      type: "camelCase",
      distractors: ["backEnd", "frontMen", "frontMad"],
      sentence: "front end",
    },
    {
      identifier: "appleCare",
      type: "camelCase",
      distractors: ["appleStare", "apleCare", "apppleCare"],
      sentence: "apple care",
    },
    {
      identifier: "hugoBoss",
      type: "camelCase",
      distractors: ["hugoBros", "hugeBoss", "bossHugo"],
      sentence: "hugo boss",
    },
    {
      identifier: "pop-punk",
      type: "kebabCase",
      distractors: ["pro-funk", "per-punk", "pop-drunk"],
      sentence: "pop punk",
    },
    {
      identifier: "ciao-a-tutti",
      type: "kebabCase",
      distractors: ["ciao-tutti", "ciao-ai-brutti", "cioa-a-tutti"],
      sentence: "ciao a tutti",
    },
    {
      identifier: "end-of-experiment",
      type: "kebabCase",
      distractors: ["sand-of-experiment", "end-or-experiment", "end-of-ecsperiment"],
      sentence: "end of experiment",
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
