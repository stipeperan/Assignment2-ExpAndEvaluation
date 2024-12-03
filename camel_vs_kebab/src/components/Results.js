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

    const participantName = formData.name || 'participant';
    const filename = `experiment_results_${participantName}.csv`;

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function ResultPage() {
    const { taskData, formData } = useContext(DataContext);

    // Automatically download the CSV file when the component mounts
    useEffect(() => {
        if (taskData && formData) {
            downloadCSV(taskData, formData);
        }
    }, [taskData, formData]);

    // Calculate total and average times in seconds
    const totalOverallTimeMs = taskData.reduce((sum, task) => sum + task.timeTaken, 0);
    const totalOverallTime = (totalOverallTimeMs / 1000).toFixed(2);

    const camelCaseTasks = taskData.filter((task) => task.type === 'camelCase');
    const kebabCaseTasks = taskData.filter((task) => task.type === 'kebabCase');

    const totalCamelCaseTimeMs = camelCaseTasks.reduce((sum, task) => sum + task.timeTaken, 0);
    const totalKebabCaseTimeMs = kebabCaseTasks.reduce((sum, task) => sum + task.timeTaken, 0);

    const totalCamelCaseTime = (totalCamelCaseTimeMs / 1000).toFixed(2);
    const totalKebabCaseTime = (totalKebabCaseTimeMs / 1000).toFixed(2);

    return (
        <div>
            <header>
                <h1>Experiment Results</h1>
            </header>
            <main>
                <h3>Thank you for participating in the experiment!</h3>
                <h3>Summary</h3>
                <ul>
                    <li><b>Total time on the experiment:</b> {totalOverallTime} seconds</li>
                    <li><b>Time for camelCase tasks:</b> {totalCamelCaseTime} seconds</li>
                    <li><b>Time for kebab-case tasks:</b> {totalKebabCaseTime} seconds</li>
                </ul>
            </main>
            <footer>
                <p>Experimentation & Evaluation - 2024</p>
            </footer>
        </div>
    );
}

export default ResultPage;
