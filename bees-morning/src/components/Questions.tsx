import React, { useEffect, useState } from "react";
import "../styles/_questions.scss";
import Alveole from "../assets/image/abeille-svg-yellow.svg";
import Logo from "../assets/image/LogoBeesDream.webp";
import { PrismicRichText } from "@prismicio/react";

const Questions = ({ value }: any) => {
  const [flag, setflag] = useState(false);

  let reponse = <PrismicRichText field={value?.answer} />;
  let question = <PrismicRichText field={value?.question} />;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      console.log(flag);
      setflag(!flag);
    }, 10000);

    return () => clearInterval(timeOut);
  }, [flag]);

  return (
    <div className="questions">
      <img src={Logo} className="logo" alt="Logo" />
      <div className="containerText">
        {flag ? reponse : question}
        <img src={Alveole} className="alveole" id="alveole" alt="Alveole" />
      </div>
    </div>
  );
};

export default Questions;
