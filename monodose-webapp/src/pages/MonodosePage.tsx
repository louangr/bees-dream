import '../assets/info/styles/MonodosePage.css'
import Info from '../components/Info'
import Apiculteur from '../assets/info/images/apiculteur.png'
import Localisation from '../assets/info/images/Localisation.png'
import DateFabrication from '../assets/info/images/Date_Fabrication.png'
import Date_DLUO from '../assets/info/images/Date_DLUO.png'
import Variete from '../assets/info/images/Variete.png'
import Logo from '../assets/info/images/logo.png'
import { useEffect, useState } from 'react'
import fetchInfoMonodose from '../api/monodose_api'
import {Monodose} from '../models/Monodose'
import LoadingSVG from '../assets/info/images/loadingSvg.svg'

const MonodosePage: React.FC = () => {
    const [data, setData] = useState<any>()
    
    useEffect(() => {
        
        window.setTimeout(() => {fetchInfoMonodose().then( (infos:Monodose) => {
            setData(infos);
        })},2000)
    }, []);

    return (
        <div className='background-container'>
        <div className='monodose-page-container'>
            {data ?
            
            <div className='alveole'>
                <img src={Logo} className='logo'/>
                <Info icon={Apiculteur} description={'Apiculteur'} informations={[data.beekeeper.firstname+' '+data.beekeeper.lastname,data.beekeeper.company,data.beekeeper.age+' ans']} className='apiculteur'/>
                <Info icon={Localisation} description='Localisation' informations={[data.location]} className='localisation'/>
                <Info icon={DateFabrication} description='Date de fabrication' informations={[data.dates.startofproduction]} className='date_fabrication'/>
                <Info icon={Date_DLUO} description='Date DLUO' informations={[data.dates.dluo]} className='date_dluo'/>
                <Info icon={Variete} description='Variété' informations={[data.honeyvariety]} className='variete'/>
            </div> 
            : 
            <div> 
                <img src={LoadingSVG} className='loading-svg'/>
                <p className='chargement'>Chargement...</p>
            </div> 
            }
            
        </div>
        </div>
    )
}

export default MonodosePage