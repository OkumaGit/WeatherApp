import React from "react";

const Header = ({ props }) => {
  return (
    <header>
      <h1 style={{ paddingBottom: "20px", paddingTop: "20px" }}>{props}</h1>
    </header>
  );
};

export default Header;
