import React, { useEffect, useState } from "react";
import Presentation from "./pages/Presentation";
import "./styles/_app.scss";
import Questions from "./components/Questions";
import { usePrismicDocumentByUID } from "@prismicio/react";

let length = 0;

function App() {
  const [document] = usePrismicDocumentByUID("quizz-question", "questions");
  const [index, setIndex] = useState(0);

  length = document?.data.body?.length;
  let q = document?.data.body?.["0"].primary.question?.["0"].text;

useEffect(()=>{
  const interval = setInterval(() => {
    console.log("length :", length);
    console.log(index <= length-1);
    if(index <= length-1){
      setIndex (index => index + 1);
      console.log("index if:", index);
    } 
     else if(index >= length){
      setIndex (0)
    }
  }, 2000);
  return () => clearInterval(interval);
}, [])

console.log("Index :", index)
  return (
    <div>
      <h1 className="title">Bee's Morning</h1>
      <Presentation />
      <Questions question={document?.data.body?.[index].primary}/>
    </div>
  );
}

export default App;
