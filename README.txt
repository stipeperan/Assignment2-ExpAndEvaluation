Assignment 2 - README
This repository contains the materials for the experiment and evaluation project, structured as follows:
Directory Structure
    1. camel_vs_kebab
        ◦ Contains the source code and resources for the web application built with React.
        ◦ The application features an experiment with 20 tasks. Each task involves:
            1. A unique identifier displayed in either kebab-case or camelCase, chosen at random.
            2. Four options, where one is correct, and three are distractors.
            3. A timed response, measuring how quickly the user selects the correct answer.
    2. Data_Results
        ◦ Contains all collected raw data in CSV format, plus the JASP file for statistical analysis.
        ◦ Note: Some CSV files contain the value refreshPage in kebab-case instead of camelCase. This issue has been fixed in the experiment_all_results.csv file.
    3. Graphs
        ◦ Contains all screenshots of generated plots from JASP.
    4. Report
        ◦ Contains the detailed report documenting the experiment and evaluation process, available as a .docx file.
Running the React App
To use the React application located in the camel_vs_kebab directory:
    1. Navigate to the directory:
       cd camel_vs_kebab
    2. Install the required packages:
       npm install
    3. Start the development server:
       npm start
The application will then be available in your browser.
Authors
Developed by Alessandro Della Flora, Stipe Peran, and Noah Salvi.

