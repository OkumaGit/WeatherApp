import React from "react";
import Weather from "../Components/Weather";
import { Nav } from "../Components/Nav";
import { Counter } from "../Components/Counter";

const props = {
  name: "Berlin",
  latitude: 52.52437,
  longitude: 13.41053,
};

export const WeatherPage = () => {
  return (
    <div className="row table-bordered">
      <Nav />
      <div className="border col-sm-4">
        {/* <Weather props={props} /> */}
        <Counter /> {/* Just a a test feature */}
      </div>
      <div className="border col-sm-4"></div>
    </div>
  );
};
