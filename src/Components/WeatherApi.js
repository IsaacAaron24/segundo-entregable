import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react'; 
const WeatherApi = () => {

    const color = ["#4DD0E1"]
    const [ pos, setPos ] = useState({});
    const [ temp, setTemp ] = useState(0)
    console.log(pos);
    const success = position => {   
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=adc32b7dca3ab0c562154e8cbded87a3`) 
            .then(res => {
                setPos(res.data) 
                setTemp(res.data?.main.temp)
            })
    } 
    const [Celcius, setCelcius] = useState(true);
    const [Fahrenheit, setFahrenheit] = useState(false);

    const soCelcius = () =>{
      setCelcius(!Celcius);
      setFahrenheit(false);
    }

    const soFahrenheit = () =>{
      setFahrenheit(!Fahrenheit);
      setCelcius(false);
    }

    const Units = (temp) => {
        temp = parseInt(temp);
        if (Celcius === false && Fahrenheit === false) {
          return temp.toFixed();
        } else if (Celcius) {
          temp = (temp - 273.15);
          return temp.toFixed();
        } else if (Fahrenheit) {
          temp = ((temp - 273.15) * (9 / 5) + 32);
          return temp.toFixed();
        }
      };


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success)
    },[])
    
    document.body.style = `background: ${color}`
    
    return (  
        <div className='Card'>
            <h1>Weather App</h1>
            <h3><i className='fa-solid fa-earth-americas'> </i> {pos.name}, {pos.sys?.country}</h3> 
            <p className='Temp'>{Units(temp)}°</p>
            <button className='button' onClick={soCelcius}> {Celcius ? `°C` : `°C`} </button>
            <button className='button' onClick={soFahrenheit}> {Fahrenheit ? `°F`: `°F`} </button>
            <img src={`http://openweathermap.org/img/wn/${pos.weather?.[0].icon}@2x.png`} alt="" />
            <p className='Des'><b>"{pos.weather?.[0].description}"</b></p>
            <p><i className='fa-solid fa-wind'></i> <b>Speed:</b> {pos.wind?.speed} m/s</p>
            <p><i className='fa-solid fa-cloud'></i> <b>Clouds:</b> {pos.clouds?.all} %</p>
            <p><i className='fa-solid fa-droplet'></i> <b>Humidity:</b> {pos.main?.humidity} %</p>
        </div>
    );
};

export default WeatherApi;