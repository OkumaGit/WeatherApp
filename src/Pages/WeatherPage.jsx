import { Nav } from "../Components/Nav";
import { Counter } from "../Components/Counter";

// const props = {
//   name: "Berlin",
//   latitude: 52.52437,
//   longitude: 13.41053,
// };

export const WeatherPage = () => {
  return (
    <div className="container table-bordered">
      <Nav />
      <div className="border col-sm-4">
        <Counter />
      </div>
      <div className="border col-sm-4"></div>
    </div>
  );
};
