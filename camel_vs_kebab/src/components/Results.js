import React, { useContext } from 'react';
import DataContext from '../context/DataContext';
import Papa from 'papaparse';

function downloadCSV(taskData, formData) {
  const csvData = Papa.unparse(
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

  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'experiment_results.csv');
  link.click();
}

function ResultPage() {
  const { taskData, formData } = useContext(DataContext); // Access context values

  return (
    <div>
      <header>
        <h1>Experiment Results</h1>
      </header>
      <main>
        <p>Thank you for participating in the experiment!</p>
        <h2>Summary</h2>
        <p>Name: {formData.name}</p>
        <p>Age: {formData.age}</p>
        <p>Experience: {formData.experience}</p>
        <h3>Task Performance</h3>
        <ul>
          {taskData.map((task, index) => (
            <li key={index}>
              <strong>{task.identifier}</strong> ({task.type}): {task.timeTaken}ms,{' '}
              {task.isCorrect ? 'Correct' : 'Incorrect'}
            </li>
          ))}
        </ul>
        <button onClick={() => downloadCSV(taskData, formData)}>Download Results</button>
      </main>
      <footer>
        <p>Experimentation & Evaluation - 2024</p>
      </footer>
    </div>
  );
}

export default ResultPage;
