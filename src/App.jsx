import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const [forecastData, setForecastData] = useState({})
  const [forecastLoc, setForecastLoc] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=65e49f59506351175f9a6f2e7102c93f&lang=sv`

  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${forecastLoc}&units=metric&appid=65e49f59506351175f9a6f2e7102c93f&lang=sv`

  let d = document.querySelector(".container")

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        d.className += " grow"
        console.log(response.data)
        console.log(url)
      })
      setLocation('')
    }
  }


  const fetchForecast  = () =>  {{
    axios.get(forecastURL).then((response) =>  {
      setForecastData(response.forecastData)
      console.log(response.forecastData)
    })
    setForecastLoc(location)
    }
  }

  function getTime(dt, timezone) {
    const utc_seconds = parseInt(dt, 10) + parseInt(timezone, 10);
    const utc_milliseconds = utc_seconds * 1000;
    const local_time = new Date(utc_milliseconds).toUTCString().slice(17, 22);
    return local_time;
  }
/* Clear, Rain, Haze, Snow, Clouds, */

  
  return (
    <div className="container">
      <div className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text" />
        <button className="fa-solid fa-magnifying-glass"></button>
        
      </div>
          <div className="location">
        <p>{data.name} {data.sys ? <span>{data.sys.country}</span> : null}</p>
        {data.main ? getTime(data.dt, data.timezone) : null}
      </div>
      <div className="weatherImage">
         {data.weather ? 
          <img src={"/images/" + data.weather[0].main + ".gif"}></img>
          : null
        }
        <p className='yes'>{forecastData ? forecastData.cod : null}</p>

      </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}<span>°C</span></h1> : null}
      </div>
        {data.weather ? <h1 className='desc'>{data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1)}</h1> : null}


      {/*{data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }*/}



    </div>
  );
}

export default App;