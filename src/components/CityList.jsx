import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
// import { useCities } from "../contexts/CitiesContext";

function CityList({ cities, isLoading }) {
  // const { cities, isLoading } = useCities();

  // If cities are loading, display a spinner
  if (isLoading) return <Spinner />;

  // If there are no cities, display a message
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // If there are cities, display them
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
