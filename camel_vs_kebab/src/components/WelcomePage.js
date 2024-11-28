import React from "react";

function WelcomePage() {
  return (
    <div>
      <header>
        <h1>Welcome to the Experiment!</h1>
      </header>

      <main>
        <p>
          The goal of this experiment is to study how different 
          identifier styles - <b>camelCase</b> and <b>kebab-case</b> - 
          affect reading speed and accuracy.
        </p>
        <p>
          Here is what you are asked to do:
        </p>
        <p>
          <ul>
            <li>Start by filling out a short demographics form.</li>
            <li>Find the correct identifier matching a given phrase 
              as quickly as possible.</li>
            <li>Complete all the tasks!</li>
          </ul>
        </p>
        <p>
          Please ensure you are in a distraction-free environment. 
          Whenever you're ready, click the button below to begin.
        </p>
        <button onClick={() => (window.location.href = "/form")}>
          Start Experiment
        </button>
      </main>

      <footer>
        <p>Experimentation & Evaluation - 2024</p>
        <p>&copy; Noah Salvi, Alessandro Della Flora, Stipe Peran</p>
      </footer>
    </div>
  );
}

export default WelcomePage;
