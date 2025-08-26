import axios from "axios";
import { icons } from "./icons";

const LocationComponent = ({ onCoordinatesChange }) => {
  // Function to get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!onCoordinatesChange)
            return console.log("No coordinates provided");
          try {
            // BigDataCloud API (Free, CORS-friendly)
            const response = await axios.get(
              "https://api.bigdatacloud.net/data/reverse-geocode-client",
              {
                params: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  localityLanguage: "en",
                },
              }
            );
            const city =
              response.data &&
              (response.data.city ? response.data.city : "No city found");
            console.log("response in LC:", response);

            console.log("city from LocationComponent's API:", city);

            onCoordinatesChange({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              name: city ? city : "No city found",
            });

            console.log("Props we have after getLocation", onCoordinatesChange);
          } catch (error) {
            console.error("Error fetching location data:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
    }
  };
  return (
    <button
      className="button"
      onClick={getLocation}
      value="Use my location"
      style={{ display: "flex", alignItems: "center" }}
    >
      {icons.navigation}
      Use my location
    </button>
  );
};

export default LocationComponent;
