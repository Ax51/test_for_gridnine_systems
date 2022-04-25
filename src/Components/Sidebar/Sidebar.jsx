import { useState, useEffect } from 'react'
import styles from './Sidebar.module.scss'

export default function Sidebar({
    airlinesArr,
    sortBy,
    setTransitFilterArr,
    priceFilter,
    airlineFilter
}) {
    const [inputPriceRange, setInputPriceRange] = useState([0, 1000000]),
        [selectedAirlines, setSelectedAirlines] = useState(airlinesArr)

    const renderCompanyName = airlinesArr.map((item, k) => {
        const substrLen = 15
        let subStrItem = item
        if (item.length > substrLen) {
            subStrItem = item.substring(0, substrLen) + '...'
        }
        function checkAirline(name) {
            if (selectedAirlines.indexOf(name) === -1) {
                setSelectedAirlines(prevState => [...prevState, name])
            } else {
                setSelectedAirlines(prevState => prevState.filter(i => i !== name))
            }
        }
        return (
            <div key={k}>
                <input
                    type="checkbox"
                    id={item.split(3)}
                    defaultChecked
                    onChange={() => checkAirline(item)}
                />
                <label htmlFor={item.split(3)}> {subStrItem}</label>
            </div>
        )
    })

    function handlePriceInput(e, valToChange) {
        let value = +e.target.value.replace(/\D/, '')
        const minVal = 0,
            maxVal = 1000000
        if (value < minVal) {
            value = minVal
        }
        if (value > maxVal) {
            value = maxVal
        }
        switch (valToChange) {
            case 'from':
                setInputPriceRange(prevState => {
                    return [(prevState[0] = value), ...prevState.slice(1)]
                })
                break
            case 'to':
                setInputPriceRange(prevState => {
                    return [...prevState.slice(0, 1), (prevState[1] = value)]
                })
                break

            default:
                break
        }
        priceFilter(inputPriceRange)
    }
    function handleFromPrice(e) {
        handlePriceInput(e, 'from')
    }
    function handleToPrice(e) {
        handlePriceInput(e, 'to')
    }
    useEffect(() => {
        airlineFilter(selectedAirlines)
    }, [selectedAirlines])
    return (
        <nav className={styles.sidebar}>
            <div className={styles.block}>
                <h4>Соритровать</h4>
                <input name="sort" type="radio" onClick={() => sortBy('rize')} defaultChecked /> по
                возрастанию цены
                <br />
                <input name="sort" type="radio" onClick={() => sortBy('low')} /> по убыванию цены
                <br />
                <input name="sort" type="radio" onClick={() => sortBy('time')} /> по времени в пути
            </div>
            <div className={styles.block}>
                <h4>Фильтровать</h4>
                <div>
                    <input
                        type="checkbox"
                        id="no-transit"
                        defaultChecked
                        onChange={e =>
                            setTransitFilterArr(prevState => [
                                ...prevState,
                                (prevState[0] = e.target.checked)
                            ])
                        }
                    />
                    <label htmlFor="no-transit"> Без пересадок</label>
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="transit"
                        defaultChecked
                        onChange={e =>
                            setTransitFilterArr(prevState => [
                                ...prevState,
                                (prevState[1] = e.target.checked)
                            ])
                        }
                    />
                    <label htmlFor="transit"> 1 пересадка</label>
                </div>
            </div>
            <div className={`${styles.block} ${styles.price}`}>
                <h4>Цена</h4>
                От <input type="text" value={inputPriceRange[0]} onChange={handleFromPrice} />
                До <input type="text" value={inputPriceRange[1]} onChange={handleToPrice} />
            </div>
            <div className={styles.block}>
                <h4>Авиакомпании</h4>
                <ul>{renderCompanyName}</ul>
            </div>
        </nav>
    )
}
