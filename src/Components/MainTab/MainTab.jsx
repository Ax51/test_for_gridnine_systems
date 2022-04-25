//compoents
import FlightComponent from '../FlightComponent/FlightComponent.jsx'

//styles
import styles from './MainTab.module.scss'

export default function MainTab({ flightsArr, showMore }) {
    const renderFlightComp = flightsArr.map(item => {
        return <FlightComponent key={item.flightToken} flightData={item.flight} />
    })
    return (
        <div className={styles.mainTab}>
            {renderFlightComp}
            <button onClick={showMore}>показать больше</button>
        </div>
    )
}
