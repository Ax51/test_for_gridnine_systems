//compoents
import FlightComponent from '../FlightComponent/FlightComponent.jsx'

//styles
import styles from './MainTab.module.scss'

export default function MainTab() {
    return (
        <div className={styles.mainTab}>
            <FlightComponent/>
        </div>
    )
}
