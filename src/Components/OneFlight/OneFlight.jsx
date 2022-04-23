//styles
import styles from './OneFlight.module.scss'

export default function OneFlight() {
    return (
        <div className={styles.oneFlight}>
            <div>
                откуда-куда
            </div>
            <div>
                время, маршрут, ?пересадки
            </div>
            <div>
                Рейс выполняет {'Аерофлот'}
            </div>
        </div>
    )
}