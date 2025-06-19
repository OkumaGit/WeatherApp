import { useState, useEffect } from "react";
import Header from "../Components/Header";
import { Nav } from "../Components/Nav";
import Weather from "../Components/Weather";
import { ModalWindow } from "../Components/ModalWindow/ModalWindow";
import LocationComponent from "../Components/LocationComponent";
import { fetchCity } from "../Components/FetchCity";

export const Home = () => {
  const [props, setProps] = useState({});
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // .get langitude && latitude. fetchCity() function
  useEffect(() => {
    setInputValue(props.name ? props.name : ""); // Set input value from props
    fetchCity(props, setProps);
  }, [props.name]);

  // CLEARING INPUT VALUE
  const resetInput = () => {
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
      <div className="container row table-bordered">
        <Nav />
        <Header props="Weather, time and wind speed in any city" />
        <div
          style={{ paddingBottom: "20px", paddingTop: "20px" }}
          className="border col-sm-4"
        >
          <Weather props={props} />
          {/* Input field */}
          <input
            onChange={
              // (event) => setProps({ ...props, name: event.target.value })
              (event) => setInputValue(event.target.value)
            }
            // value={inputValue ? inputValue.target.value : ""}
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
            props={({ latitude, longitude, name, event }) => {
              setProps((prev) => ({
                ...prev,
                latitude,
                longitude,
                name: name ? name : "No city found",
              }));
            }}
          />
        </div>
        <div className="col-sm-4"></div>
      </div>
    </>
  );
};
