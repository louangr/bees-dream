import React, { useEffect, useState } from "react";
import "../styles/_questions.scss";
import AlveoleAnimated from "../assets/image/abeille-svg-yellow.svg";
import AlveoleFixed from "../assets/image/fix-abeille-svg-yellow.svg";
import Logo from "../assets/image/LogoBeesDream.webp";
import { PrismicRichText } from "@prismicio/react";

const Questions = ({ value }: any) => {
  const [flag, setflag] = useState(false);

  let reponse = <PrismicRichText field={value?.answer} />;
  let question = <PrismicRichText field={value?.question} />;

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setflag(!flag);
    }, 9000);

    return () => clearInterval(timeOut);
  }, [flag]);

  return (
    <div className="questions">
      <img src={Logo} className="logo" alt="Logo" />
      <div className="containerText">
        {flag ? reponse : question}
        {!flag ? (
          <object
            type="image/svg+xml"
            data={AlveoleAnimated}
            className="alveole"
            id="alveole"
          />
        ) : (
          <img src={AlveoleFixed} className="alveole" alt="Alveole" />
        )}
      </div>
    </div>
  );
};

export default Questions;
