//components
import OneFlight from '../OneFlight/OneFlight.jsx'

//logos
import aeroflotLogo from '../../img/Aeroflot_logo.png'
import airFranceLogo from '../../img/Air_France-Logo-PNG1.png'
import klmLogo from '../../img/Air_France-Logo-PNG4.png'
import turkLogo from '../../img/Turkish_Airlines-Logo-PNG8.png'
import noLogo from '../../img/unknown_airlines.png'

//styles
import styles from './FlightComponent.module.scss'

export default function FlightComponent({ flightData }) {
    const {
        carrier: { uid, captire: airlineName },
        price: {
            total: { amount: price }
        },
        legs
    } = flightData

    const logoMap = {
        AF: airFranceLogo,
        KL: klmLogo,
        SU1: aeroflotLogo,
        TK: turkLogo
    }
    const renderOneFlight = legs.map((item, k) => <OneFlight key={k} data={item} />)
    return (
        <div className={styles.flightComponent}>
            <div className={styles.flightComponentHead}>
                <img src={logoMap[uid] ?? noLogo} />
                <div>
                    <h3 className={styles.price}>{price} ₽</h3>
                    <p>Стоимость для одного взрослого пассажира</p>
                </div>
            </div>
            <div className={styles.flightComponentBody}>{renderOneFlight}</div>
            <button onClick={() => alert('futher logic')}>ВЫБРАТЬ</button>
        </div>
    )
}
