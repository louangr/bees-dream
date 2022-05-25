import React from 'react';
import "../styles/Questions.css";
import Alveole from "../assets/image/abeille-svg-yellow.svg"
import Logo from "../assets/image/LogoBeesDream.webp";

const Questions = () => {
    return (
        <div className="Questions">
            <img src= {Logo} className="Logo" alt="Logo"/>
            <div className='containerText'>
                <p>Quelle est la couleur du cheval blanc d'Henry IV ?</p>
                <img src={Alveole} className="Alveole" id="Alveole" alt="Alveole"/>
            </div>
        </div>
    );
};

export default Questions;
