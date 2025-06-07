import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Nav } from "../Components/Nav";
import Weather from "../Components/Weather";
import axios from "axios";
import { ModalWindow } from "../Components/ModalWindow/ModalWindow";
import LocationComponent from "../Components/LocationComponent";

export const Home = () => {
  const [props, setProps] = useState({});
  const [show, setShow] = useState(false);

  // .get langitude && latitude
  useEffect(() => {
    const fetchCity = async () => {
      const response = await axios.get(
        "https://geocoding-api.open-meteo.com/v1/search",
        {
          params: {
            name: props.name ? props.name : "", // Pass city directly
            count: 5,
            language: "en",
            format: "json",
          },
        }
      );

      if (!response.data.results?.[0]) return;
      try {
        setProps({
          ...props,
          latitude: response.data.results[0].latitude,
          longitude: response.data.results[0].longitude,
          timezone: response.data.results[0].timezone,
        });
      } catch (error) {
        console.log("City not found!", error);
      }

      console.log("props in Home.jsx", props.timezone);
    };

    fetchCity();
  }, [props.name]);

  // GETTING INPUT VALUE - CITY

  function updateInputValue(event) {
    setProps({ ...props, name: document.getElementById("cityInput").value });
  }

  // CLEARING INPUT VALUE
  const resetInput = (event) => {
    if (document.getElementById("cityInput").value.length > 0) {
      (document.getElementById("cityInput").value = ""), setProps({});
    } else null;
  };

  const citySelected = (event) => {
    setProps({ ...props, name: event.target.value });
    setShow(false);
  };

  return (
    <>
      {show && ( //modal with props
        <>
          <ModalWindow props={citySelected} />
        </>
      )}
      <div className="row table-bordered">
        <Nav />
        <Header props="Weather, time and wind speed in any city" />
        <div
          style={{ paddingBottom: "20px", paddingTop: "20px" }}
          className="border col-sm-4"
        >
          <Weather props={props} />
          <input
            onChange={(event) =>
              setProps({ ...props, name: event.target.value })
            }
            defaultValue=""
            id="cityInput"
            placeholder="Enter a city"
            autoComplete="off"
          />
          <input
            onClick={(event) => updateInputValue(event)}
            type="button"
            value="Submit"
          />
          <input
            onClick={(event) => resetInput(event)}
            type="button"
            value="Reset"
          />
          <input
            onClick={() => setShow(true)}
            type="button"
            value="Pick from a list"
          />
          <LocationComponent
            props={({ latitude, longitude, name }) => {
              setProps((prev) => ({ ...prev, latitude, longitude, name }));
            }}
          />
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
};
