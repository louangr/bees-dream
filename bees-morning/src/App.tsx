import React, { useEffect, useState } from "react";
import Presentation from "./pages/Presentation";
import "./styles/_app.scss";
import Questions from "./components/Questions";
import { usePrismicDocumentByUID } from "@prismicio/react";

function App() {
  const [document, documentState] = usePrismicDocumentByUID(
    "quizz-question",
    "questions"
  );
  const [indexQuestion, setIndexQuestion] = useState(0);

  useEffect(() => {
    if (documentState.state === "failed") {
      console.warn(
        "Blog Home document was not found. Make sure it exists in your Prismic repository"
      );
    } else {
      const numberQuestion = document?.data.body.length;

      console.log(document);
      console.log(numberQuestion);
      const interval = setInterval(() => {
        if (indexQuestion < numberQuestion - 1) {
          setIndexQuestion(indexQuestion + 1);
        } else if (indexQuestion === numberQuestion - 1) {
          setIndexQuestion(0);
        }
      }, 4000);
      console.log(indexQuestion);
      return () => clearInterval(interval);
    }
  }, [documentState.state, indexQuestion, document]);

  return (
    <div>
      <h1 className="title">Bee's Morning</h1>
      <Presentation />
      {document && (
        <Questions value={document?.data.body?.[indexQuestion].primary} />
      )}
    </div>
  );
}

export default App;
