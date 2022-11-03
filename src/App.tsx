import React from "react";
import Story from "./Story/Story";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="container">
        {/*        <h1>UX:UI:FAE:BE</h1>*/}
        {/*        <p className="lead">*/}
        {/*In den Diskussionen zu und zwischen den "Gewerken" bestehen m.E. hier und da Verständnisprobleme. Dieses führt oft dazu, dass aneinander vorbei geredet wird.*/}
        {/*          Aus Sicht einer Person, die im "Ui-Kosmos" unterwegs war und nun wohl im "FAE-Kosmos" unterwegs ist, hier ein paar illustrierte Gedanken, die hoffentlich der*/}
        {/*          Diskussion dienlich sind.*/}
        {/*        </p>*/}
        {/*        <p><strong>Disclaimer</strong>: Es geht hier nicht, um DAS eine Problem und dementsprechend nicht um DIE Lösung. Und natürlich ist das Ganze stark gefärbt durch meine ganz persönlichen Erfahrungen. Es geht um einen Teilaspekt, dessen Diskussion ich für sinnvoll erachte.</p>*/}
      </header>
      <main className="container">
        <Story></Story>
      </main>
    </div>
  );
}

export default App;
