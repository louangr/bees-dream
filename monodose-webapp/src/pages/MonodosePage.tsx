import '../assets/info/styles/MonodosePage.css'
import Info from '../components/Info'
import Apiculteur from '../assets/info/images/apiculteur.png'

const MonodosePage: React.FC = () => {
    return (
        <div className='monodose-page-container'>
            <Info icon={Apiculteur} description='Apiculteur' informations={['Dorian','Beerian','23']}/>
        </div>
    )
}

export default MonodosePage