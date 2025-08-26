import { useState, useEffect } from "react";
import axios from "axios";
import { weatherIcons } from "./weatherIcons";
import LocationComponent from "./LocationComponent";
import { ModalWindow } from "../Components/ModalWindow/ModalWindow";
import { fetchCity } from "./fetchCity";

const Weather = ({}) => {
  const [weatherData, setWeatherData] = useState(null);
  const [currentCoordinates, setCurrentCoordinates] = useState({});
  const [show, setShow] = useState(false); // For ModalWindow
  const [inputValue, setInputValue] = useState("");

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // DEBUGGING
  useEffect(() => {
    console.log(
      "currentCoordinates in WeatherModule.jsx is:",
      currentCoordinates ? currentCoordinates : "No coordinates provided"
    );
  }, [currentCoordinates]);

  // GETTING FORECAST FROM OPEN-METEO API

  useEffect(() => {
    const fetchWeather = async () => {
      fetchCity(currentCoordinates, setCurrentCoordinates);
      const response = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
          params: {
            latitude: currentCoordinates.latitude,
            longitude: currentCoordinates.longitude,
            daily: "temperature_2m_max,temperature_2m_min,weathercode",
            hourly: "wind_speed_10m,temperature_2m,weathercode",
            time: "2024-12-22T00:00",
            timezone: "auto",
            hourly_units: {
              temperature_2m: "°C",
            },
          },
        }
      );
      setWeatherData(response.data ? response.data : null);
      // setLoading(false);
    };
    fetchWeather();
  }, [
    currentCoordinates.name,
    currentCoordinates.latitude,
    currentCoordinates.longitude,
  ]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  const currentTime = new Date().toLocaleString("en-EU", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: currentCoordinates.timezone,
  });
  const currentTemperature = weatherData
    ? weatherData.hourly.temperature_2m[0]
    : null;
  const currentTemperatureForecast = weatherData ? weatherData : null;
  const currentWind = weatherData ? weatherData.hourly.wind_speed_10m[0] : null;

  // CLEARING INPUT VALUE
  const resetInput = () => {
    if (document.getElementById("cityInput").value.length > 0) {
      document.getElementById("cityInput").value = "";
      setCurrentCoordinates({});
      setInputValue("");
    } else null;
  };

  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Function to handle city selection from the modal
  const citySelected = (event) => {
    setCurrentCoordinates({ ...currentCoordinates, name: event.target.value });
    setShow(false);
  };

  // {
  //   console.log("Weather hourly:", weatherData.hourly.weathercode[0]);
  // }
  // {
  //   console.log("Weather hourly:", weatherData.daily.weathercode[0]);
  // }

  return (
    <div>
      {/* Revealing the weather data */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingBottom: "10px",
        }}
      >
        {/* Displayed city */}
        <p style={{ paddingRight: "10px" }}>
          {currentCoordinates.name ? (
            <span>
              Now in <b>{currentCoordinates.name}</b>
            </span>
          ) : (
            "Choose a city"
          )}
        </p>
        <LocationComponent
          onCoordinatesChange={({ name, latitude, longitude }) => {
            setCurrentCoordinates((prev) => ({
              ...prev,
              latitude,
              longitude,
              name: name ? name : "No city found",
            }));
          }}
        />
      </div>

      {/* Displaying the weather data */}
      {weatherData != undefined ? (
        <div
          style={{
            paddingBottom: "1rem",
          }}
        >
          <span style={{ paddingRight: "5px" }}>
            {weatherIcons[weatherData.hourly.weathercode[0]] || null}
          </span>
          {/* Current Temperature */}
          {(
            <span style={{ fontWeight: "bold", fontSize: "28px" }}>
              {currentTemperature}°C
            </span>
          ) || null}
          <br />
          {`Local time: ${currentTime}` || null}
          <br />
          {`Wind speed: ${currentWind}km/h` || null}
          <br />
          <br />

          <span
            className="weeklyForecast"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {currentTemperatureForecast.daily.temperature_2m_max.map(
              (temp, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexFlow: "column wrap",
                      paddinRight: "10px",
                      alignContent: "center",
                      justifyContent: "center",
                      alignItems: "center",
                      paddingRight: "20px",
                    }}
                  >
                    <span>{weekDays[index]}</span>
                    <span>
                      {weatherIcons[weatherData.hourly.weathercode[index]] || (
                        <div style={{ height: "24px", width: "24px" }}></div>
                      )}
                    </span>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        {
                          currentTemperatureForecast.daily.temperature_2m_max[
                            index
                          ]
                        }
                        {"° "}
                      </span>
                      {"  "}
                      <span>
                        {
                          currentTemperatureForecast.daily.temperature_2m_min[
                            index
                          ]
                        }
                        {"° "}
                      </span>
                    </div>
                  </div>
                );
              }
            )}
          </span>
        </div>
      ) : null}
      {/* Input field */}
      <input
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        value={inputValue ? inputValue : currentCoordinates.name}
        id="cityInput"
        placeholder="Enter a city"
        autoComplete="off"
      />
      {/* Submit button */}
      <input
        onClick={() =>
          setCurrentCoordinates({
            name: document.getElementById("cityInput").value,
          })
        }
        type="button"
        value="Submit"
      />
      {/* Reset */}
      <input
        onClick={(event) => resetInput(event)}
        type="button"
        value="Reset"
      />
      {/* Pick from a list */}
      <button className="button" onClick={() => setShow(true)}>
        Pick from a list
      </button>
      {show && ( //modal with props
        <>
          <ModalWindow props={citySelected} />
        </>
      )}
    </div>
  );
};

export default Weather;
