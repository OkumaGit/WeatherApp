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

  // useEffect(() => {
  //   setInputValue(props.name ? props.name : ""); // Set input value from props
  // }, [props.name]);

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
        <Nav />
        <Header props="Weather in any city" />
        <div style={{ padding: "20px" }} className="border">
          <WeatherModule props={props} />
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
