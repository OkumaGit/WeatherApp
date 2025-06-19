import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ props }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // GETTING FORECAST
  useEffect(() => {
    const fetchWeather = async () => {
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: props.latitude,
            longitude: props.longitude,
            daily: "temperature_2m_max,temperature_2m_min",
            hourly: "wind_speed_10m,temperature_2m",
            time: "2024-12-22T00:00",
            timezone: "auto",
            hourly_units: {
              temperature_2m: "°C",
            },
          },
        }
      );
      setWeatherData(response.data ? response.data : null);
      setLoading(false);
    };
    // console.log("props in Weather.jsx is:", props);
    fetchWeather();
  }, [props.name, props.latitude, props.longitude]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const currentTime = new Date().toLocaleString("en-EU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: props.timezone,
  });

  const currentTemperature = weatherData
    ? weatherData.hourly.temperature_2m[0]
    : null;

  const currentTemperatureForecast = weatherData ? weatherData : null;

  const currentWind = weatherData ? weatherData.hourly.wind_speed_10m[0] : null;

  return (
    <div style={{ paddingBottom: "20px", paddingTop: "10px" }}>
      {/* Revealing the weather data */}
      <p style={{ paddingBottom: "10px" }}>
        {props.name ? (
          <>
            Results for <b>{props.name}</b>
          </>
        ) : (
          "Choose a city"
        )}
      </p>
      {weatherData != undefined ? (
        <p>
          {weatherData ? (
            <span style={{ fontWeight: "bold", fontSize: "28px" }}>
              {currentTemperature}°C
            </span>
          ) : null}
          <br />
          {weatherData ? `Local time: ${currentTime}` : null}
          <br />

          {weatherData ? `Wind speed: ${currentWind}km/h` : null}
          <br />
          <br />
          <span>Tomorrow:</span>
          <br />
          <span style={{ fontWeight: "bold" }}>
            {weatherData
              ? `${currentTemperatureForecast.daily.temperature_2m_max[1]}°C `
              : null}
          </span>
          <span>
            {weatherData
              ? `/ ${currentTemperatureForecast.daily.temperature_2m_min[1]}°C`
              : null}
          </span>
          {/* <br />
          {`Let's understand the weather data: ${JSON.stringify(
            currentTemperatureForecast.daily
          )}`} */}
          {weatherData ? console.log(weatherData) : null}
        </p>
      ) : null}
    </div>
  );
};

export default Weather;
