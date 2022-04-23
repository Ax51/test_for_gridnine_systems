import { useState } from 'react'

// components
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import MainTab from './Components/MainTab/MainTab.jsx'

// styles
import styles from './App.module.scss'

function App() {
    return (
        <div className={styles.app}>
            <Sidebar />
            <MainTab/>
        </div>
    )
}

export default App
