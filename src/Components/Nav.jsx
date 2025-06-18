import React from "react";
import { Link } from "react-router";

export const Nav = () => {
  return (
    <div style={{ padding: "10px" }}>
      <nav>
        <Link to="/" className="button-link">
          <button>Home</button>
        </Link>
        <Link
          style={{ display: "none" }}
          to="/Pages/WeatherPage"
          className="button-link"
        >
          <button>Test</button>
        </Link>
      </nav>
    </div>
  );
};
