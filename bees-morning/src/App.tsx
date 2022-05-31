import { useState } from "react";
import Presentation from "./pages/Presentation";
import "./styles/_app.scss";
import PresentoireForm from "./pages/PresentoireForm";

function App() {
  const [presentoireId] = useState(() => {
    const localValue = localStorage.getItem("id-presentoire") || null;
    if (localValue != null) {
      return JSON.parse(localValue);
    }
    return null;
  });

  return (
    <div>
      <h1 className="title">Bee's Morning</h1>
      {presentoireId === null ? (
        <PresentoireForm />
      ) : (
        <Presentation idPresentoire={presentoireId} />
      )}
    </div>
  );
}

export default App;
