import React from "react";
import { WeatherPage } from "./Pages/WeatherPage";
import { Home } from "./Pages/Home";
import { BrowserRouter, Routes, Route } from "react-router";

const useRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/Pages/WeatherPage" element={<WeatherPage />} />
          {/* <Route path="/Pages/GermanPage" element={<GermanPage />} /> */}
          {/* <Route path="/About" element={<About />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default useRoutes;
