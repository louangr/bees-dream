import React from "react";
import Presentation from "./pages/Presentation";
import "./styles/_app.scss";
import Questions from "./components/Questions";

function App() {
  return (
    <div>
      <h1 className="title">Bee's Morning</h1>
      <Presentation />
      <Questions/>
    </div>
  );
}

export default App;
