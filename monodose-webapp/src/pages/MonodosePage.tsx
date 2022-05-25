import '../assets/info/styles/MonodosePage.css'
import Info from '../components/Info'
import Apiculteur from '../assets/info/images/apiculteur.png'
import Localisation from '../assets/info/images/Localisation.png'
import DateFabrication from '../assets/info/images/Date_Fabrication.png'
import Date_DLUO from '../assets/info/images/Date_DLUO.png'
import Variete from '../assets/info/images/Variete.png'
import Logo from '../assets/info/images/logo.png'

const MonodosePage: React.FC = () => {
    return (
        <div className='background-container'>
        <div className='monodose-page-container'>
            <div className='alveole'>
            <img src={Logo} className='logo'/>
                <Info icon={Apiculteur} description='Apiculteur' informations={['Dorian','Beerian','23']} className='apiculteur'/>
                <Info icon={Localisation} description='Localisation' informations={['Nantes']} className='localisation'/>
                <Info icon={DateFabrication} description='Date de fabrication' informations={['23/05/2020']} className='date_fabrication'/>
                <Info icon={Date_DLUO} description='Date DLUO' informations={['23/05/2022']} className='date_dluo'/>
                <Info icon={Variete} description='Variété' informations={['Acacia']} className='variete'/>
            </div>
        </div>
        </div>
    )
}

export default MonodosePage