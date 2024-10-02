import { Link } from "react-router-dom";

// CONTEXTS
import { useCities } from "../contexts/CitiesContext";

// CSS Modules
import styles from "./CityItem.module.css";

// Function to format date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity } = useCities();

  // Destructure city object
  const { cityName, emoji, date, id, position } = city;

  console.log(position);
  return (
    <li>
      {/* 
        // Opens the City.jsx component with the city's details
        // params: id
        // query string: lat, lng
      */}
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
      </Link>
    </li>
  );
}

export default CityItem;
