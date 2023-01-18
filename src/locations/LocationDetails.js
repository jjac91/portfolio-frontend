import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WeatherApi from "../api/api";


function LocationDetails() {
  const { username, id } = useParams();

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [advice, setAdvice] = useState(null);

  useEffect(function getLocationDetails() {
    async function getLocation() {
      setLocation(await WeatherApi.getLocation(username, id));
    }

    getLocation();
  }, []);

  useEffect(
    function getweatherDetails() {
      async function getWeather() {
        if (location) {
          let res = await WeatherApi.getWeather(location.latt, location.longt);
          setWeather(res.weather);
          setAdvice(res.advice);
        }
      }

      getWeather();
    },
    [location]
  );
  
  console.log("Locd details", weather, advice);

  return (
    <div>
      {advice ? (
        <div className="LocationDetail col-md-8 offset-md-2">
          <h2>The weather for {location.label} is currently:</h2>
          <ul>
            <li>It is currently {weather.current.temp}°F</li>
            <li>It feels like {weather.current.feels_like}°F</li>
            {weather.current.rain ? (
              <li>
                It has rained {weather.current.rain["1h"]}mm over the past hour
              </li>
            ) : (
              ""
            )}
            {weather.current.snow ? (
              <li>
                It has snowed {weather.current.snow["1h"]}mm over the past hour
              </li>
            ) : (
              ""
            )}
            <li>
              The sky is roughly {weather.current.clouds}% covered by clouds
            </li>
            <li>The current humidity is {weather.current.humidity}%</li>
            <li>The current ultraviolet index is {weather.current.uvi}</li>
          </ul>
          <h3>
            We suggest the following advice to best deal with the current
            weather:
          </h3>
          <ul>
            <li>{advice.feelsLike}</li>
            {advice.snowfall ? (
              <li>
                {advice.snowfall}
              </li>
            ) : (
              ""
            )}
             {advice.snowfall ? (
              <li>
                {advice.snowfall}
              </li>
            ) : (
              ""
            )}
             {advice.rainfall ? (
              <li>
                {advice.rainfall}
              </li>
            ) : (
              ""
            )}
            <li>{advice.uv}</li>
            <li>{advice.wind}</li>
          </ul>
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default LocationDetails;
