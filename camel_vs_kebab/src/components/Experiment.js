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
  const [shuffledTasks, setShuffledTasks] = useState([]);
  const navigate = useNavigate();

  const tasks = [
    // Task objects
    {
      identifier: "moveSouth",
      type: "camelCase",
      distractors: ["moveSource", "moreSouth", "moverSound"],
      sentence: "move south",
    },
    {
      identifier: "move-south",
      type: "kebabCase",
      distractors: ["move-source", "more-south", "mover-sound"],
      sentence: "move south",
    },
    {
      identifier: "calculateTotal",
      type: "camelCase",
      distractors: ["calculateSum", "totalCalculation", "sumCalculate"],
      sentence: "calculate total",
    },
    {
      identifier: "calculate-total",
      type: "kebabCase",
      distractors: ["calculate-sum", "total-calculation", "sum-calculate"],
      sentence: "calculate total",
    },
    {
      identifier: "userLoginDetails",
      type: "camelCase",
      distractors: ["userDetails", "loginUserDetails", "userLogins"],
      sentence: "user login details",
    },
    {
      identifier: "user-login-details",
      type: "kebabCase",
      distractors: ["user-details", "login-user-details", "user-logins"],
      sentence: "user login details",
    },
    {
      identifier: "sendMessage",
      type: "camelCase",
      distractors: ["seedMastodon", "sandMessenger", "deliverMessage"],
      sentence: "send message",
    },
    {
      identifier: "send-message",
      type: "kebabCase",
      distractors: ["seed-mastodon", "sand-messenger", "deliver-message"],
      sentence: "send message",
    },
    {
      identifier: "startProcess",
      type: "camelCase",
      distractors: ["processStart", "initiateProcess", "streamProcess"],
      sentence: "start process",
    },
    {
      identifier: "start-process",
      type: "kebabCase",
      distractors: ["process-start", "initiates-process", "stream-process"],
      sentence: "start process",
    },
    {
      identifier: "refreshPage",
      type: "camelCase",
      distractors: ["reloadPage", "resetPage", "updatePage"],
      sentence: "refresh page",
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
      identifier: "no-pain-no-gain",
      type: "kebabCase",
      distractors: ["no-pace-no-taste", "no-pane-no-gain", "no-past-no-gassed"],
      sentence: "no pain no gain",
    },
    {
      identifier: "asSoonAsPossible",
      type: "camelCase",
      distractors: ["asSoonPossible", "soonAsPossible", "asSoupAsPossible"],
      sentence: "as soon as possible",
    },
    {
      identifier: "as-soon-as-possible",
      type: "kebabCase",
      distractors: ["as-soon-possible", "soon-as-possible", "as-soup-as-possible"],
      sentence: "as soon as possible",
    },
    {
      identifier: "appleCare",
      type: "camelCase",
      distractors: ["appleStare", "apleCare", "apppleCare"],
      sentence: "apple care",
    },
    {
      identifier: "apple-care",
      type: "kebabCase",
      distractors: ["apple-stare", "aple-care", "appple-care"],
      sentence: "apple care",
    },
    {
      identifier: "ciao-a-tutti",
      type: "kebabCase",
      distractors: ["ciao-tutti", "ciao-ai-brutti", "cioa-a-tutti"],
      sentence: "ciao a tutti",
    },
    {
      identifier: "ciaoATutti",
      type: "camelCase",
      distractors: ["ciaoTutti", "ciaoAiBrutti", "cioaATutti"],
      sentence: "ciao a tutti",
    },
  ];

  useEffect(() => {
    // Shuffle tasks when the component mounts
    const shuffled = tasks.sort(() => Math.random() - 0.5);
    setShuffledTasks(shuffled);
    setTaskData([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (shuffledTasks && shuffledTasks.length > 0) {
      const options = [
        shuffledTasks[currentTaskIndex].identifier,
        ...shuffledTasks[currentTaskIndex].distractors,
      ];
      setShuffledOptions(options.sort(() => Math.random() - 0.5));
      setIncorrectOptions([]);
    }
  }, [currentTaskIndex, shuffledTasks]);

  const handleOptionClick = (isCorrect, option) => {
    const endTime = Date.now();
    const timeTaken = endTime - startTime;

    if (disableButtons) return;

    if (isCorrect) {
      setFeedbackColor({ [option]: "green" });
      setDisableButtons(true);

      setTaskData((prev) => {
        const updatedData = prev.filter(
            (task) => task.identifier !== shuffledTasks[currentTaskIndex].identifier
        );
        return [
          ...updatedData,
          {
            ...shuffledTasks[currentTaskIndex],
            timeTaken,
            isCorrect: true,
          },
        ];
      });

      setTimeout(() => {
        if (currentTaskIndex + 1 < shuffledTasks.length) {
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
          const existingTask = prev.find(
              (task) => task.identifier === shuffledTasks[currentTaskIndex].identifier
          );
          if (existingTask && existingTask.isCorrect) {
            return prev;
          }
          const updatedData = prev.filter(
              (task) => task.identifier !== shuffledTasks[currentTaskIndex].identifier
          );
          return [
            ...updatedData,
            {
              ...shuffledTasks[currentTaskIndex],
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
          ) : currentTaskIndex < shuffledTasks.length ? (
              <div>
                <p>Identify the corresponding identifier for:</p>
                <h1>
                  <strong>{shuffledTasks[currentTaskIndex].sentence}</strong>
                </h1>
                <div className="card-grid">
                  {shuffledOptions.map((option, index) => (
                      <button
                          key={index}
                          className="card-button"
                          onClick={() =>
                              handleOptionClick(option === shuffledTasks[currentTaskIndex].identifier, option)
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
                <p>Task {currentTaskIndex + 1} of {shuffledTasks.length}</p>
              </div>
          ) : (
              <p>Experiment completed!</p>
          )}
        </main>
      </div>
  );
}

export default Experiment;
