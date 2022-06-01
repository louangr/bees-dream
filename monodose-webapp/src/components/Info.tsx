import IInfo from "../models/IInfo";
import '../assets/info/styles/Info.css'

const Info = ({icon, description, informations,className}:IInfo) =>{
    
    return(
        <div className={"info-container "+className}>
           <img src={icon}/>

           <div className="info-text">
                <h2>{description}</h2>

                <ul className="informations">
                    {informations.map((info:string, index:number)=>{
                    return(<li key={index}>{info}</li>)
                })}
                </ul>
            </div>

        </div>
    );
};

export default Info;