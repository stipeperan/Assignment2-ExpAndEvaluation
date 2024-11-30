import React, { useContext, useEffect } from 'react';
import DataContext from '../context/DataContext';
import Papa from 'papaparse';

function downloadCSV(taskData, formData) {
    const csvData = Papa.unparse(
        taskData.map((task) => ({
            age: formData.age,
            experience: formData.experience,
            identifier: task.identifier,
            type: task.type,
            timeTaken: task.timeTaken,
        }))
    );

    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    // Append the participant's name to the filename
    const participantName = formData.name || 'participant'; // Default to 'participant' if name is not provided
    const filename = `experiment_results_${participantName}.csv`;

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link); // Clean up
}

function ResultPage() {
    const { taskData, formData } = useContext(DataContext); // Access context values

    // Automatically download the CSV file when the component mounts
    useEffect(() => {
        if (taskData && formData) {
            downloadCSV(taskData, formData);
        }
    }, [taskData, formData]);

    return (
        <div>
            <header>
                <h1>Experiment Results</h1>
            </header>
            <main>
                <h3>Thank you for participating in the experiment!</h3>
                <h3>Summary</h3>
                <ul>
                    {taskData.map((task, index) => (
                        <li key={index}>
                            <strong>{task.identifier}</strong> ({task.type}): {task.timeTaken}ms
                        </li>
                    ))}
                </ul>
            </main>
            <footer>
                <p>Experimentation & Evaluation - 2024</p>
            </footer>
        </div>
    );
}

export default ResultPage;
