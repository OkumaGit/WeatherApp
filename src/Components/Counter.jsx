import React, { useState } from "react";

export const Counter = () => {
  //Weather modifier
  const [weatherModifier, setWeatherModifier] = useState(
    Number(localStorage.getItem("weatherModifier")) || 0
  );

  function handleClickPlus() {
    setWeatherModifier(weatherModifier + 1);
    localStorage.setItem(
      "weatherModifier",
      JSON.stringify(weatherModifier + 1)
    );
  }

  function handleClickMinus() {
    weatherModifier > 0
      ? setWeatherModifier(weatherModifier - 1)
      : setWeatherModifier(0);
    localStorage.setItem(
      "weatherModifier",
      JSON.stringify(weatherModifier - 1)
    );
  }

  //Cities modifier
  const [cities, setCities] = useState(
    localStorage.getItem("cities")
      ? JSON.parse(localStorage.getItem("cities"))
      : ["Berlin", "Mallorca", "Charkiw", "NewYork", "Sydney"]
  );

  function citiesSort() {
    setCities(cities.filter((city) => city.length > 6));
    localStorage.setItem("cities", JSON.stringify(cities));
  }

  function resetCities() {
    setCities(["Berlin", "Mallorca", "Charkiw", "NewYork", "Sydney", "Sydney"]);
    localStorage.setItem(
      "cities",
      JSON.stringify(["Berlin", "Mallorca", "Charkiw", "NewYork", "Sydney"])
    );
  }

  return (
    <>
      <div>
        <p>Timer: {weatherModifier}</p>
        <button onClick={handleClickPlus}>+</button>
        <button onClick={handleClickMinus}>-</button>
      </div>
      <div>
        <button onClick={citiesSort}>Sort cities</button>
        <button onClick={resetCities}>Reset</button>
        <p>Cities: {cities}</p>
      </div>
    </>
  );
};
