import '../assets/info/styles/MonodosePage.css'
import Info from '../components/Info'
import Apiculteur from '../assets/info/images/apiculteur.png'
import Localisation from '../assets/info/images/Localisation.png'
import DateFabrication from '../assets/info/images/Date_Fabrication.png'
import Date_DLUO from '../assets/info/images/Date_DLUO.png'
import Variete from '../assets/info/images/Variete.png'
import Logo from '../assets/info/images/logo.png'
import { useEffect, useState } from 'react'
import LoadingSVG from '../assets/info/images/loadingSvg.svg'
import { MonodoseApiClient } from '../api/main'

const MonodosePage: React.FC = () => {
    const [data, setData] = useState<any>()
    
    useEffect(() => {
        window.setTimeout(async () => {
            const queryParams = new URLSearchParams(window.location.search)
            const id = queryParams.get("id")

            if(id != undefined){
                const infos = await MonodoseApiClient.getMonodoseById({id:id})
                setData(infos);
            }
        },2000)},[]);

    return (
        <div className='background-container'>
        <div className='monodose-page-container'>
            {data ?
            
            <div className='alveole'>
                <img src={Logo} className='logo'/>
                <Info icon={Apiculteur} description={'Apiculteur'} informations={[data.beekeeper.firstname+' '+data.beekeeper.lastname,data.beekeeper.company,data.beekeeper.age+' ans']} className='apiculteur'/>
                <Info icon={Localisation} description='Localisation' informations={[data.location]} className='localisation'/>
                <Info icon={DateFabrication} description='Date de fabrication' informations={[data.dates.startOfProduction]} className='date_fabrication'/>
                <Info icon={Date_DLUO} description='Date DLUO' informations={[data.dates.dluo]} className='date_dluo'/>
                <Info icon={Variete} description='Variété' informations={[data.honeyVariety]} className='variete'/>
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