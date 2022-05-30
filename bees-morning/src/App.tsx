import React, { useEffect, useState } from "react";
import Presentation from "./pages/Presentation";
import "./styles/_app.scss";
import Questions from "./components/Questions";
import { usePrismicDocumentByUID } from "@prismicio/react";

function App() {
  const [document] = usePrismicDocumentByUID("quizz-question", "questions");
  const [indexQuestion, setIndexQuestion] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (indexQuestion < document?.data?.body?.length - 1) {
        setIndexQuestion(indexQuestion + 1);
      } else if (indexQuestion === document?.data?.body?.length - 1) {
        setIndexQuestion(0);
      }
    }, 2000);
    console.log(indexQuestion);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="title">Bee's Morning</h1>
      <Presentation />
      <Questions value={document?.data.body?.[indexQuestion].primary} />
    </div>
  );
}

export default App;
