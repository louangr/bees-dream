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

const MonodosePage: React.FC = () => {
    const [data, setData] = useState<any>()
    
    useEffect(() => {
        fetchInfoMonodose().then( (infos:Monodose) => {
            setData(infos);
        })
    }, []);

    return (
        <div className='background-container'>
        <div className='monodose-page-container'>
            {data ? <div className='alveole'>
                <img src={Logo} className='logo'/>
                <Info icon={Apiculteur} description={'Apiculteur'} informations={[data.beekeeper.firstname+' '+data.beekeeper.lastname,data.beekeeper.company,data.beekeeper.age+' ans']} className='apiculteur'/>
                <Info icon={Localisation} description='Localisation' informations={[data.location]} className='localisation'/>
                <Info icon={DateFabrication} description='Date de fabrication' informations={[data.dates.startofproduction]} className='date_fabrication'/>
                <Info icon={Date_DLUO} description='Date DLUO' informations={[data.dates.dluo]} className='date_dluo'/>
                <Info icon={Variete} description='Variété' informations={[data.honeyvariety]} className='variete'/>
            </div> : "loading..."}
            
        </div>
        </div>
    )
}

export default MonodosePage