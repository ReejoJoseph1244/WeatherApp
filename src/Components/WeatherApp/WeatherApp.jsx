import React, { useState } from 'react'
import './WeatherApp.css'

import search_icon from "../Assets/search.png"
import clear_icon from "../Assets/clear.png"
import cloud_icon from "../Assets/cloud.png"
import drizzle_icon from "../Assets/drizzle.png"
import rain_icon from "../Assets/rain.png"
import snow_icon from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import humidity_icon from "../Assets/humidity.png"
import background_video from "../Assets/pexels_videos.mp4"
import sunny_day from "../Assets/sunny_day.mp4"
import rainny_day from "../Assets/rainny_day.mp4"
import clear_day from "../Assets/clear_day.mp4"
import snow_day from "../Assets/snow_day.mp4"
import cloudy_day from "../Assets/cloudy_day.mp4"
import drizzly_day from "../Assets/drizzly_day.mp4"

const WeatherApp = () => {

    let api_key = process.env.REACT_APP_API_KEY;

    const [wicon,setWicon] = useState(cloud_icon);
    const [bgvideo,Setbgvideo]=useState(background_video);
   

    const search = async ()=>{
        const element = document.getElementsByClassName("cityInput");

        if(element[0].value==="")
        {
            return 0;
        }
        let url= `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`; //template iterals

        let response = await fetch(url);

        let data = await response.json();
        
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temperature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + " %";
        wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        temperature[0].innerHTML = Math.floor(data.main.temp) +"°C";
        location[0].innerHTML = data.name;

        const temperature_value = Math.floor(data.main.temp);

        

        if(data.weather[0].icon==="01d" ||data.weather[0].icon==="01n")
        {
            setWicon(clear_icon);
            Setbgvideo(clear_day);

        }
        else if(data.weather[0].icon==="02d" ||data.weather[0].icon==="02n")
        {
            setWicon(cloud_icon);
            Setbgvideo(cloudy_day);
            
        }
        else if(data.weather[0].icon==="03d" ||data.weather[0].icon==="03n")
        {
           if(temperature_value<=0){
            setWicon(snow_icon);
            Setbgvideo(snow_day);
           } else{
            setWicon(drizzle_icon);
            Setbgvideo(drizzly_day);
           }
        }
        else if(data.weather[0].icon==="04d" ||data.weather[0].icon==="04n")
        {
          if(temperature_value<=0){
            setWicon(snow_icon);
            Setbgvideo(snow_day);
           } else{
            setWicon(drizzle_icon);
            Setbgvideo(drizzly_day);
           }
        }
        else if(data.weather[0].icon==="09d" ||data.weather[0].icon==="09n")
        {
            setWicon(rain_icon);
            Setbgvideo(rainny_day);
            
        }
        else if(data.weather[0].icon==="10d" ||data.weather[0].icon==="10n")
        {
            setWicon(rain_icon);
            Setbgvideo(rainny_day);
        }
        else if(data.weather[0].icon==="13d" ||data.weather[0].icon==="13n")
        {
            setWicon(snow_icon);
            Setbgvideo(snow_day);
        }
        else{
          if(temperature_value<=0){
            setWicon(snow_icon);
            Setbgvideo(snow_day);
           } else{
            setWicon(clear_icon);
            Setbgvideo(sunny_day);
           }
        }
    }

  return (
    <div className='bodyblock'>
        <video autoPlay loop muted key={bgvideo}>
		<source src={bgvideo} type='video/mp4' />
	  </video>
      <div className="container">
        <div className="top-bar">
          <input type="text" className="cityInput" placeholder="Search" />
          <div
            className="search-icon"
            onClick={() => {
              search();
            }}
          >
            <img src={search_icon} alt="" />
          </div>
        </div>
        <div className="weather-image">
          <img src={wicon} alt="" />
        </div>

        <div className="weather-temp">24 °C</div>
        <div className="weather-location">London</div>
        <div className="data-container">
          <div className="element">
            <img src={humidity_icon} alt="" className="icon" />
            <div className="data">
              <div className="humidity-percent">64%</div>
              <div className="text">Humidity</div>
            </div>
          </div>

          <div className="element">
            <img src={wind_icon} alt="" className="icon" />
            <div className="data">
              <div className="wind-rate">18 km/h</div>
              <div className="text">Wind Speed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;