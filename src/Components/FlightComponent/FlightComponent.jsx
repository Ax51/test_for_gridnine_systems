//components
import OneFlight from '../OneFlight/OneFlight.jsx'

//styles
import styles from './FlightComponent.module.scss'

export default function FlightComponent() {
    return (
        <div className={styles.flightComponent}>
            <header>
                <img/>
                <div>
                    <h3 className={styles.price}>34456 ₽</h3>
                    <p>Стоимость для одного взрослого пассажира</p>
                </div>
            </header>
            <main>
                <OneFlight/>
                <OneFlight/>
            </main>
            <button>ВЫБРАТЬ</button>
        </div>
    )
}