import '../assets/info/styles/MonodosePage.css'
//import '../assets/info/styles/ScreenFormat.css'
import Info from '../components/Info'
import Apiculteur from '../assets/info/images/apiculteur.png'
import Localisation from '../assets/info/images/Localisation.png'
import DateFabrication from '../assets/info/images/Date_Fabrication.png'
import Date_DLUO from '../assets/info/images/Date_DLUO.png'
import Variete from '../assets/info/images/Variete.png'

const MonodosePage: React.FC = () => {
    return (
        <div className='monodose-page-container'>
            <div className='alveole'>
                <Info icon={Apiculteur} description='Apiculteur' informations={['Dorian','Beerian','23']}/>
                <Info icon={Localisation} description='Localisation' informations={['Nantes']}/>
                <Info icon={DateFabrication} description='Date de fabrication' informations={['23/05/2020']}/>
                <Info icon={Date_DLUO} description='Date DLUO' informations={['23/05/2022']}/>
                <Info icon={Variete} description='Variété' informations={['Acacia']}/>
            </div>
        </div>
    )
}

export default MonodosePage