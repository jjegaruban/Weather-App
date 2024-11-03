import React, { useEffect, useState } from 'react';
import './Weather.css';
import search_icon from '../assets/04 Weather App React Assets/Assets/search.png';
import clear_icon from '../assets/04 Weather App React Assets/Assets/clear.png';
import cloud_icon from '../assets/04 Weather App React Assets/Assets/cloud.png';
import drizzle_icon from '../assets/04 Weather App React Assets/Assets/drizzle.png';
import rain_icon from '../assets/04 Weather App React Assets/Assets/rain.png';
import snow_icon from '../assets/04 Weather App React Assets/Assets/snow.png';
import wind_icon from '../assets/04 Weather App React Assets/Assets/wind.png';
import humidity_icon from '../assets/04 Weather App React Assets/Assets/humidity.png';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('London');
  const [searchTerm, setSearchTerm] = useState('');

  const allicons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    if(city===""){
        alert("Enter City Name");
        return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

      const response = await fetch(url);
      const data = await response.json();

      if(! response.ok){
        alert(data.message);
        return;
      }
    
      
      const icon = allicons[data.weather[0].icon] || clear_icon;
      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching Weather Data");
    }
  };

  useEffect(() => {
    search(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCity(searchTerm);
  };

  return (
    <div className='weather'>
      <div className="search-bar">
        <input
          type='text'
          placeholder='Enter city'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>
          <img src={search_icon} alt="search" />
        </button>
      </div>
      {weatherData? <>
        <img src={weatherData.icon} alt="weather icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt="humidity icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt="wind icon" />
              <div>
                <p>{weatherData.windspeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
      </>:<></>}

      {weatherData && (
        <>
         
        </>
      )}
    </div>
  );
};

export default Weather;




