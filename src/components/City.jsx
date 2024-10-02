import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";

// CONTEXTS
import { useCities } from "../contexts/CitiesContext";
// import BackButton from "./BackButton";

// COMPONENTS
import styles from "./City.module.css";
import Spinner from "./Spinner";

// Function to format date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  // param name is the same as the one set in the Route path
  const { id } = useParams();

  // Get the city and currentCity from the context
  const { getCity, currentCity, isLoading } = useCities();

  // Fetch the city when the component mounts
  useEffect(() => {
    // Call the getCity function with the id from the params
    getCity(id);
  }, [id]);

  // const [searchParams, setSearchParams] = useSearchParams();
  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  // Destructure the currentCity object
  const { cityName, emoji, date, notes } = currentCity;

  // If the city is loading, display a spinner
  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      {/* <div>
        <BackButton />
      </div> */}
    </div>
  );
}

export default City;
