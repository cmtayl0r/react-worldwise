import { useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  // Get the lat and lng from the query string via useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return (
    <div className={styles.mapContainer}>
      <h1>Map</h1>
      <h2>
        Position: {lat}, {lng}
      </h2>
    </div>
  );
}

export default Map;
