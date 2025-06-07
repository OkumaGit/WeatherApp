import React, { useState } from "react";
import closeIcon from "./src/close.png";

export const ModalWindow = ({ props }) => {
  return (
    <div className="bgOverlay">
      <div className="modalWindow">
        {/* <button className="closeButton" onClick={() => setShow(false)}> */}
        <div className="closeButton">
          <img onClick={props} src={closeIcon} als="close"></img>
        </div>

        <ul className="citiesList">
          <li>
            <input onClick={props} type="button" value="Essen" />
          </li>
          <li>
            <input onClick={props} type="button" value="Berlin" />
          </li>
          <li>
            <input onClick={props} type="button" value="Hannover" />
          </li>
          <li>
            <input onClick={props} type="button" value="Kyiv" />
          </li>
          <li>
            <input onClick={props} type="button" value="Amsterdam" />
          </li>
          <li>
            <input onClick={props} type="button" value="New York" />
          </li>
        </ul>
      </div>
    </div>
  );
};
