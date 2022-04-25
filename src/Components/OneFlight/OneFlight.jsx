//styles
import styles from './OneFlight.module.scss'

export default function OneFlight({ data }) {
    try {
        const {
                duration,
                segments: [
                    {
                        airline: { caption: airlineName },
                        departureAirport: {
                            caption: departureAirportName,
                            uid: departureAirportCode
                        },
                        departureCity: { caption: departureCity },
                        departureDate
                    }
                ]
            } = data,
            {
                arrivalAirport: { caption: arrivalAirportName, uid: arrivalAirportCode },
                arrivalCity: { caption: arrivalCity },
                arrivalDate
            } = data.segments[data.segments.length - 1],
            transferCount = data.segments.length - 1

        function countTime() {
            const hoursRemain = Math.floor(duration / 60)
            const minsRemain = duration % 60
            return hoursRemain ? `${hoursRemain} ч ${minsRemain} мин` : `${minsRemain} мин`
        }
        function formatDate(date) {
            const monthMap = [
                    'янв',
                    'фев',
                    'мар',
                    'апр',
                    'май',
                    'июн',
                    'июл',
                    'авг',
                    'сен',
                    'окт',
                    'ноя',
                    'дек'
                ],
                dayMap = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
                dateObj = new Date(date)
            const timeStr = (
                    <span className={styles.time}>{`${dateObj.getHours()}:${
                        dateObj.getMinutes() || '00'
                    }`}</span>
                ),
                dateStr = (
                    <span className={styles.blueText}>{`${dateObj.getDate()} ${
                        monthMap[dateObj.getMonth()]
                    }. ${dayMap[dateObj.getDay()]}`}</span>
                )
            return [timeStr, dateStr]
        }
        const departureTimeArr = formatDate(departureDate), //Call once, use twice
            arrivalTimeArr = formatDate(arrivalDate).reverse() //Call once, use twice
        return (
            <div className={styles.oneFlight}>
                <div className={styles.route}>
                    {departureCity}, {departureAirportName}
                    <span className={styles.blueText}> ({departureAirportCode}) ➞ </span>
                    {arrivalCity}, {arrivalAirportName}
                    <span className={styles.blueText}> ({arrivalAirportCode})</span>
                </div>
                <div className={styles.timing}>
                    <div>
                        {departureTimeArr[0]} {departureTimeArr[1]}
                    </div>
                    <div className={styles.travelTime}>
                        🕓 {countTime()}
                        {!!transferCount && (
                            <span className={styles.transfer}>{transferCount} пересадка</span>
                        )}
                    </div>
                    <div>
                        {arrivalTimeArr[0]} {arrivalTimeArr[1]}
                    </div>
                </div>
                <div>Рейс выполняет {airlineName}</div>
            </div>
        )
    } catch (e) {
        console.warn(data)
    }
}
