import axios from "axios";

export const fetchCity = (props, setProps) => {
  const fetchCity = async () => {
    const response = await axios.get(
      "https://geocoding-api.open-meteo.com/v1/search",
      {
        params: {
          name: props.name ? props.name : "", // Pass city directly
          count: 5,
          language: "en",
          format: "json",
        },
      }
    );

    if (!response.data.results?.[0]) return;
    try {
      setProps({
        ...props,
        latitude: response.data.results[0].latitude,
        longitude: response.data.results[0].longitude,
        timezone: response.data.results[0].timezone,
      });
    } catch (error) {
      console.log("City not found!", error);
    }
  };

  fetchCity();
};
