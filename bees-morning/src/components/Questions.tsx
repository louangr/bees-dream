import React, { useEffect, useState } from 'react';
import "../styles/Questions.css";
import Alveole from "../assets/image/abeille-svg-yellow.svg"
import Logo from "../assets/image/LogoBeesDream.webp";
import { PrismicRichText, usePrismicDocumentByUID } from "@prismicio/react";

interface IQuestion{
    question: string
}

const Questions = ({question}: IQuestion) => {

    const [doc] = usePrismicDocumentByUID("quizz-question", "questions");
    console.log(question)
    /* function refreshImage(imgElement, imgURL){     
        var timestamp = new Date().getTime();  
      
        var el = document.getElementById(imgElement);  
      
        var queryString = "?t=" + timestamp;    
       
        el.src = imgURL + queryString;    
    } */

    const alv = document.querySelector(".s1");
    const questFromPris = ()=>{
        for(let i=0; doc?.data.body?.length; i++){
            //console.log(i);
            question = doc?.data.body?.[i].primary.question?.["0"].text;
           /*  reponse = doc?.data.body?.[i].primary.answer?.["0"].text;
            console.log(doc)
            if (flag){
                return <p>{reponse}</p>
                console.log("Réponse", i+1, ":", reponse)
            } */
            //console.log("Question", i+1, ":", question)
            return <p>{question}</p>
        }
    }
    
    const [flag, setflag] = useState(false)

   /*  const displayQuestion = ()=>{
        if (flag){
            return <p>{reponse}</p>

        }
        return <p>{question}</p>
    } */

    const change = ()=>{
        setTimeout(() => {
            setflag (true)
        }, 9000);
        setTimeout(() => {
            setflag (false)
        }, 13000);
    }

    useEffect(()=>{
        change()
    }, [])
    return (
        <div className="Questions">
            
            <img src= {Logo} className="Logo" alt="Logo"/>
            <div className='containerText'>
                {/* {displayQuestion()} */}
                {questFromPris()}
                <img src={Alveole} className="Alveole" id="Alveole" alt="Alveole"/>
            </div>
        </div>
    );
};


export default Questions
