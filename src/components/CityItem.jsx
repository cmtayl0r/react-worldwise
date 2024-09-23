import { Link } from "react-router-dom";
// import { useCities } from "../contexts/CitiesContext";

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
  //   const { currentCity, deleteCity } = useCities();

  // Destructure city object
  const { cityName, emoji, date, notes } = city;

  //   function handleClick(e) {
  //     e.preventDefault();
  //     deleteCity(id);
  //   }

  return (
    <li>
      {/* <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link> */}
      <Link className={`${styles.cityItem}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
      </Link>
    </li>
  );
}

export default CityItem;
