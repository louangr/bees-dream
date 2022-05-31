import { useMemo, useState } from "react";
import Presentation from "./pages/Presentation";
import "./styles/_app.scss";
import PresentoireContext from "./context/PresentoireContext";

function App() {
  const [presentoire, setPresentoire] = useState(null);
  const providerValue = useMemo(
    () => [presentoire, setPresentoire],
    [presentoire, setPresentoire]
  );

  return (
    <PresentoireContext.Provider value={providerValue}>
      <div>
        <h1 className="title">Bee's Morning</h1>
        <Presentation />
      </div>
    </PresentoireContext.Provider>
  );
}

export default App;
