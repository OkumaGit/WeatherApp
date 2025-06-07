import React, { useEffect, useState } from "react";
import axios from "axios";

const LocationComponent = ({ props }) => {
  // Function to get the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          if (!props) return console.log("No coordinates provided");
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
            console.log("response", response);

            props({
              ...props,
              name: city ? city : "No city found",
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            console.log("Props we have after getLocation", props);
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
  return <input type="button" value="Use my location" onClick={getLocation} />;
};

export default LocationComponent;
