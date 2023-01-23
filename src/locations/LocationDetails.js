import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import WeatherApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import Alert from "../common/Alert";

function LocationDetails() {
  const { username, id } = useParams();

  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [advice, setAdvice] = useState(null);
  const [hasError, setHasError] = useState(false);

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
          try {
            let res = await WeatherApi.getWeather(
              location.latt,
              location.longt
            );
            setWeather(res.weather);
            setAdvice(res.advice);
          } catch {
            setHasError(true);
          }
        }
      }

      getWeather();
    },
    [location]
  );

  console.log("Locd details", weather, advice);

  if (hasError === true) {
    return (
      <Alert
      type="danger"
      messages={["Unable to process the request, please try again later."]}
    />
    );
  }

  return (
    <div>
      {advice ? (
        <div className="LocationDetail col-md-8 offset-md-2">
          <div className="container mx-auto">
            <div className="card text-center">
              <h2 className="mb-3 mt-3 ml-3 mr-3">
                The weather forecast for {location.label} is:
              </h2>
              <h4 className="mb-3 mt-3 ml-3 mr-3">
                It is currently experiencing:
                <img
                  src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
                />{" "}
                {weather.current.weather[0].description}
              </h4>

              <p className="no-bullets font-weight-bold">
                It is currently {weather.current.temp}°F
              </p>
              <p className="no-bullets font-weight-bold">
                It feels like {weather.current.feels_like}°F
              </p>
              <p className="no-bullets font-weight-bold">
                The wind is blowing at {weather.current.wind_speed} mph
              </p>
              {weather.current.rain ? (
                <p className="no-bullets font-weight-bold">
                  It has rained {weather.current.rain["1h"]}mm over the past
                  hour
                </p>
              ) : (
                ""
              )}
              {weather.current.snow ? (
                <p className="no-bullets font-weight-bold">
                  It has snowed {weather.current.snow["1h"]}mm over the past
                  hour
                </p>
              ) : (
                ""
              )}
              <p className="no-bullets font-weight-bold">
                The sky is roughly {weather.current.clouds}% covered by clouds
              </p>
              <p className="no-bullets font-weight-bold">
                The current humidity is {weather.current.humidity}%
              </p>
              <p className="no-bullets font-weight-bold">
                The current ultraviolet index is {weather.current.uvi}
              </p>
              <h3 className="mb-3 mt-3 ml-3 mr-3">
                We suggest the following advice to best deal with the current
                weather:
              </h3>
              <p className="no-bullets font-weight-bold">{advice.feelsLike}</p>
              {advice.snowfall ? (
                <p className="no-bullets font-weight-bold">{advice.snowfall}</p>
              ) : (
                ""
              )}
              {advice.rainfall ? (
                <p className="no-bullets font-weight-bold">{advice.rainfall}</p>
              ) : (
                ""
              )}
              <p className="no-bullets font-weight-bold">{advice.uv}</p>
              <p className="no-bullets font-weight-bold">{advice.wind}</p>
            </div>
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default LocationDetails;
