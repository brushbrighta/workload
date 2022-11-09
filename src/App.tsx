import React from "react";
import Story from "./Story/Story";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="container" style={{ color: "#fff" }}>
        <h1>Eine Projektplanung</h1>
        <p className="lead">
          Hier eine stark stilisierte, in keinster Weise irgendeiner Realität
          entsprechende, visuelle Darstellung einer an anderer Stelle
          erläuterten These.
        </p>
      </header>
      <main className="container">
        <Story></Story>
      </main>
    </div>
  );
}

export default App;
