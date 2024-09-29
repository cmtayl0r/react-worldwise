import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
// import { useCities } from "../contexts/CitiesContext";
// import BackButton from "./BackButton";
import styles from "./City.module.css";
// import Spinner from "./Spinner";

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
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.city}>
      <h2>City {id}</h2>
      <p>
        Position: {lng}, {lat}
      </p>
    </div>
  );
}

export default City;
