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

  const currentWind = weatherData ? weatherData.hourly.wind_speed_10m[0] : null;

  return (
    <div style={{ paddingBottom: "20px", paddingTop: "20px" }}>
      {/* Revealing the weather data */}
      <h1>{props.name ? `${props.name}` : "Choose a city"}</h1>
      {weatherData != undefined ? (
        <p>
          <br />
          {weatherData ? `Time & timezone: ${currentTime}` : null}
          <br />
          {weatherData ? `Temperature: ${currentTemperature}°C` : null}
          <br />
          {weatherData ? `Wind speed: ${currentWind}km/h` : null}
        </p>
      ) : null}
    </div>
  );
};

export default Weather;
