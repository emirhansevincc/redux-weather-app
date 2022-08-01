import React, { useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { GEO_API_URL, geoApiOptions } from '../api'

import { useSelector } from 'react-redux/es/exports'


const WEEK_DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function Content({ onSearchChange, forecastData }) {

    // console.log(forecastData);

    const [search, setSearch] = useState(null)

    const {
        city,
        currentWeather,
        feelsLike,
        tempMax,
        tempMin,
        icon,
        desc,
    } = useSelector((state) => state.weather)
    // console.log(city);

    const loadOptions = (inputValue) => {
        return fetch(`${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`, geoApiOptions)
        .then((response) => response.json())
        .then((response) => {
            // console.log(response.data);
            return {
                options: response.data.map((city) => {
                    return {
                        value: `${city.latitude} ${city.longitude}`,
                        label: `${city.name} ${city.countryCode}`,
                    }
                })
            }
        })
        .catch((err) => console.error(err));
    }

    const handleOnChange = (searchData) => {
        setSearch(searchData)
        onSearchChange(searchData)
    }

   

    const dayInAWeek = new Date().getDay()
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))
    console.log(forecastDays);

    return (
        <>
            <div className='input-div'>

                <AsyncPaginate
                    placeholder='Enter for city'
                    debounceTimeout={600}
                    value={search}
                    onChange={handleOnChange}
                    loadOptions={loadOptions}
                    className="input"
                />
            </div>

            <div className='container'>
                <div>
                    <h2 className='name'>{city}</h2>
                </div>
                <div className="weather-part">
                    <div className="image">
                        <img src={`icons/${icon}.png`} alt="icon" />
                    </div>
                    <div className="weather-status">
                        <h1>{currentWeather.toFixed(1)}°C</h1>
                    </div>
                    <div className="weather-info">
                        <div className="info">
                            <span>
                                Feels like: {feelsLike.toFixed(1)}
                            </span>
                            <span>
                                Temp max: {tempMax.toFixed(1)}
                            </span>
                            <span>
                                Temp min: {tempMin.toFixed(1)}
                            </span>
                            <span>
                                description: {desc}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="forecast-part">
                    <div className="forecast">

                        {forecastData.list.splice(0, 6).map((item, index) => (
                            <div 
                                key={index}
                                className="forecast-container"
                            >
                                <img 
                                    src={`icons/${item.weather[0].icon}.png`}
                                    alt=""
                                    className='icons'
                                />
                                <span>{forecastDays[index]}</span>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </>
    )
}

export default Content