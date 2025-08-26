import { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Nav } from "../Components/Nav";
import WeatherModule from "../Components/WeatherModule";
import { ModalWindow } from "../Components/ModalWindow/ModalWindow";
import LocationComponent from "../Components/LocationComponent";
// import { fetchCity } from "../Components/FetchCity";
import "../style.scss";

export const Home = () => {
  const [props, setProps] = useState({});
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // .get langitude && latitude. fetchCity() function
  useEffect(() => {
    setInputValue(props.name ? props.name : ""); // Set input value from props
    // fetchCity(props, setProps);
  }, [props.name]);

  // OLD CODE BELOW

  // // CLEARING INPUT VALUE
  // const resetInput = () => {
  //   if (document.getElementById("cityInput").value.length > 0) {
  //     (document.getElementById("cityInput").value = ""), setProps({});
  //   } else null;
  // };

  // const citySelected = (event) => {.
  //   setProps({ ...props, name: event.target.value });
  //   setShow(false);
  // };

  return (
    <>
      <div className="container" style={{ paddingBottom: "10px" }}>
        {/* {show && ( //modal with props
          <>
            <ModalWindow props={citySelected} />
          </>
        )} */}
        <Nav />
        <Header props="Weather in any city" />
        <div style={{ padding: "20px" }} className="border">
          <WeatherModule props={props} />

          {/* Block is commented */}
          {false && (
            <>
              {/* Input field */}
              <input
                onChange={(event) => setInputValue(event.target.value)}
                value={inputValue ? inputValue : ""}
                id="cityInput"
                placeholder="Enter a city"
                autoComplete="off"
              />
              {/* Submit button */}
              <input
                onClick={() =>
                  setProps({
                    ...props,
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
              <LocationComponent
                onCoordinatesChange={({ name, latitude, longitude }) => {
                  setProps((prev) => ({
                    ...prev,
                    latitude,
                    longitude,
                    name: name ? name : "No city found",
                  }));
                }}
              />
            </>
          )}
        </div>
      </div>
      {/* LICENCE */}
      <div className="container" style={{ paddingBottom: "30px" }}>
        <p style={{ fontSize: "0.8rem", color: "#666" }}>
          Weather data provided by{" "}
          <a
            href="https://open-meteo.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open-Meteo.com
          </a>
        </p>
      </div>
    </>
  );
};
