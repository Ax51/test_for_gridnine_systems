import styles from './Sidebar.module.scss'

export default function Sidebar() {
    return (
        <nav className={styles.sidebar}>
            <ul>
                <li>Сортировать</li>
                <li>Фильтровать</li>
                <li>Цена</li>
                <li>Авиакомпании</li>
            </ul>
        </nav>
    )
}
