import closeIcon from "./src/close.png";

export const ModalWindow = ({ props }) => {
  console.log("props in ModalWindow:", props);

  return (
    <div className="bgOverlay">
      <div className="modalWindow">
        {/* <button className="closeButton" onClick={() => setShow(false)}> */}
        <div className="closeButton">
          {/* Close */}
          <img onClick={props} src={closeIcon} alt="close"></img>
        </div>
        <ul className="citiesList">
          <li>
            <input
              className="button"
              onClick={props}
              type="button"
              value="Essen"
            />
          </li>
          <li>
            <input
              className="button"
              onClick={props}
              type="button"
              value="Berlin"
            />
          </li>
          <li>
            <input
              className="button"
              onClick={props}
              type="button"
              value="Hannover"
            />
          </li>
          <li>
            <input
              className="button"
              onClick={props}
              type="button"
              value="Kyiv"
            />
          </li>
          <li>
            <input
              className="button"
              onClick={props}
              type="button"
              value="Amsterdam"
            />
          </li>
          <li>
            <input
              className="button"
              onClick={props}
              type="button"
              value="New York"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};
