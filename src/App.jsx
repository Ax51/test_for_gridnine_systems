import { useState, useEffect, useTransition } from 'react'

// data
import data from '../data/flights.json'

// components
import Sidebar from './Components/Sidebar/Sidebar.jsx'
import MainTab from './Components/MainTab/MainTab.jsx'

// styles
import styles from './App.module.scss'

function App() {
    const initialFlightsArr = data.result.flights
    const uniqueAirlines = [...new Set(initialFlightsArr.map(i => i.flight.carrier.caption))]
    const amountOfRenderedFlights = 5
    const [transitFilterArr, setTransitFilterArr] = useState([true, true])
    const [defSort, setDefSort] = useState('rize')
    const [flightArrLen, setFlightArrLen] = useState(amountOfRenderedFlights)
    const [flightsArr, setFlightsArr] = useState(initialFlightsArr.slice(0, flightArrLen))
    const [isPending, startTransition] = useTransition({ timeoutMs: 1000 })

    function showMore() {
        if (data.result.flights.length - flightsArr.length > amountOfRenderedFlights) {
            setFlightArrLen(prevState => prevState + amountOfRenderedFlights)
        } else if (data.result.flights.length - flightsArr.length > 0) {
            setFlightArrLen(
                prevState => prevState + (data.result.flights.length - flightsArr.length)
            )
        }
    }

    function sortBy(typeSort = defSort) {
        switch (typeSort) {
            case 'rize':
                setDefSort('rize')
                setFlightsArr(() => {
                    const sortedArr = initialFlightsArr
                        .sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount)
                        .slice(0, flightArrLen)
                    return sortedArr
                })
                break
            case 'low':
                setDefSort('low')
                setFlightsArr(() => {
                    const sortedArr = initialFlightsArr
                        .sort((a, b) => b.flight.price.total.amount - a.flight.price.total.amount)
                        .slice(0, flightArrLen)
                    return sortedArr
                })
                break
            case 'time':
                setDefSort('time')
                setFlightsArr(() => {
                    const sortedArr = initialFlightsArr
                        .sort((a, b) => {
                            const aTime = a.flight.legs.reduce(
                                    (prev, cur) => prev + cur.duration,
                                    0
                                ),
                                bTime = b.flight.legs.reduce((prev, cur) => prev + cur.duration, 0)
                            return aTime - bTime
                        })
                        .slice(0, flightArrLen)
                    return sortedArr
                })
                break
            default:
                break
        }
    }

    function transitFilter() {
        if (transitFilterArr[0] && transitFilterArr[1]) {
            setFlightsArr(initialFlightsArr.slice(0, flightArrLen))
        }
        if (transitFilterArr[0] && !transitFilterArr[1]) {
            setFlightsArr(() =>
                initialFlightsArr
                    .filter(i => {
                        const arr = i.flight.legs.map(i => i.segments.length < 2)
                        if (arr[0] && arr[1]) {
                            return true
                        }
                    })
                    .slice(0, flightArrLen)
            )
        }
        if (!transitFilterArr[0] && transitFilterArr[1]) {
            setFlightsArr(() =>
                initialFlightsArr
                    .filter(i => {
                        const arr = i.flight.legs.map(i => i.segments.length > 1)
                        if (arr[0] || arr[1]) {
                            return true
                        }
                    })
                    .slice(0, flightArrLen)
            )
        }
        if (!transitFilterArr[0] && !transitFilterArr[1]) {
            setFlightsArr(initialFlightsArr.slice(0, 0))
        }
    }

    function priceFilter(priceRange = [0, 1000000]) {
        startTransition(() => {
            setFlightsArr(() =>
                initialFlightsArr
                    .filter(
                        i =>
                            i.flight.price.total.amount > priceRange[0] &&
                            i.flight.price.total.amount < priceRange[1]
                    )
                    .slice(0, flightArrLen)
            )
        })
    }

    function airlineFilter(selectedAirlines) {
        setFlightsArr(() =>
            initialFlightsArr
                .filter(i => selectedAirlines.indexOf(i.flight.carrier.caption) + 1)
                .slice(0, flightArrLen)
        )
    }

    useEffect(() => {
        setFlightsArr(initialFlightsArr.slice(0, flightArrLen))
        sortBy()
    }, [flightArrLen])

    useEffect(() => {
        transitFilter()
    }, [transitFilterArr])

    return (
        <div className={styles.app}>
            <Sidebar
                airlinesArr={uniqueAirlines}
                sortBy={sortBy}
                setTransitFilterArr={setTransitFilterArr}
                priceFilter={priceFilter}
                airlineFilter={airlineFilter}
            />
            <MainTab flightsArr={flightsArr} showMore={showMore} />
        </div>
    )
}

export default App
