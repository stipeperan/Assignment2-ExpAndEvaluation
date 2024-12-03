import React from "react";

function WelcomePage() {
  return (
      <div>
        <header>
          <h1>Welcome to the Experiment!</h1>
        </header>

        <main>
          <section>
            <h2>About the Experiment</h2>
            <p>
              The purpose of this experiment is to understand how people process and recognize different naming conventions used in programming, specifically <b>camelCase</b> and <b>kebab-case</b>.
            </p>
          </section>

          <section>
            <h2>How to Participate</h2>
            <p>
              You will be shown a phrase and asked to select the identifier (programming-style representation) that matches it best from a set of options.
            </p>
          </section>

          <section>
            <h2>What to Expect</h2>
            <p>
              Below is an example of how a test will look during the experiment. You will see a phrase at the top and several buttons below it. Your task is to click on the button with the correct identifier.
            </p>
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <img
                  src="/Test.png"
                  style={{ maxWidth: "100%", height: "auto", padding: "10px" }}
              />
            </div>
            <p>
              Here’s how the feedback works:
            </p>
            <ul>
              <li>
                If you select the <b>correct answer</b>, the button will turn <span style={{ color: "green", fontWeight: "bold" }}>green</span>, indicating success. After a brief moment, the experiment will automatically proceed to the next test.
              </li>
              <li>
                If you select an <b>incorrect answer</b>, the button will turn <span style={{ color: "red", fontWeight: "bold" }}>red</span>. You can still try again until you find the correct identifier.
              </li>
            </ul>
            <p>
              The goal is to be as <b>fast</b> and <b>accurate</b> as possible!
            </p>
          </section>

          <section>
            <h2>Ready to Begin?</h2>
            <p>
              When you click the "Start Experiment" button, you will be taken to a form to provide basic demographic information. After submitting the form, the experiment will begin.
            </p>
            <button onClick={() => (window.location.href = "/form")}>
              Start Experiment
            </button>
          </section>
        </main>

        <footer>
          <p>Experimentation & Evaluation - 2024</p>
          <p>&copy; Noah Salvi, Alessandro Della Flora, Stipe Peran</p>
        </footer>
      </div>
  );
}

export default WelcomePage;
