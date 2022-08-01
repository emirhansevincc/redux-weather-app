import Content from "./components/Content"
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";

import { useDispatch } from "react-redux";
import { useState } from "react";

import { 
  addCurrentWeather,
  addCity,
  feelsLike,
  tempMax,
  tempMin,
  icon,
  desc,
} from "./redux/weatherSlice";

function App() {

  const dispatch = useDispatch()

  const [forecast, setForecast] = useState("")

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`)

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        dispatch(addCurrentWeather(weatherResponse.main.temp))
        dispatch(addCity(weatherResponse.name))
        dispatch(feelsLike(weatherResponse.main.feels_like))
        dispatch(tempMax(weatherResponse.main.temp_max))
        dispatch(tempMin(weatherResponse.main.temp_min))
        dispatch(icon(weatherResponse.weather[0].icon))
        dispatch(desc(weatherResponse.weather[0].description))

        setForecast(forecastResponse)

        // console.log(weatherResponse);
      })
      .catch((err) => console.log(err))
    

  }

  return (
    <div>
      <Content 
        onSearchChange={handleOnSearchChange} 
        forecastData={forecast}
      />
      {/* {forecast && <Content onSearchChange={handleOnSearchChange} forecastData={forecast}  />} */}

    </div>
  );
}

export default App;
