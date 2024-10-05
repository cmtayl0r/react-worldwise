import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// CONTEXTS
import { useCities } from "../contexts/CitiesContext";

// 3RD PARTY LIBRARIES
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// COMPONENTS
import Button from "./Button";
import BackButton from "./BackButton";
import Message from "./Message";
import Spinner from "./Spinner";

// HOOKS
import { useUrlPosition } from "../hooks/useUrlPosition";

// STYLES
import styles from "./Form.module.css";

// HELPER FUNCTIONS
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// CONSTANTS
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  // STATE -------------------------------------------------

  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [geocodingError, setGeocodingError] = useState("");

  // Get the lat and lng from the query string via useUrlPosition
  const [lat, lng] = useUrlPosition();

  // Get the createCity function from the context
  const { createCity, isLoading } = useCities();

  // Set useNavigate to a variable called navigate
  const navigate = useNavigate();

  // EFFECTS -------------------------------------------------

  // Get the city data when the component mounts
  useEffect(() => {
    // Guard clause to check if lat and lng are available
    if (!lat || !lng) {
      setGeocodingError(
        "No latitude and longitude found. Click somewhere else"
      );
      return;
    }

    // If the lat and lng are available, fetch the city data
    async function fetchCityData() {
      try {
        // Set isLoadingGeocoding to true because we are fetching data
        setIsLoadingGeocoding(true);
        // Reset the geocoding error
        setGeocodingError("");
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();
        console.log(data);

        // If the country code is not found, throw an error
        if (!data.countryCode)
          throw new Error("Country code not found. Click somewhere else");

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        console.log(err);
        // Set the error message to the error message
        setGeocodingError(err.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    // Call the fetchCityData function
    fetchCityData();
  }, [lat, lng]); // Call the function when the lat and lng change

  // FUNCTIONS -------------------------------------------------

  // Handle the form submission
  function handleSubmit(e) {
    e.preventDefault();
    // Guard clause to check if the cityName and date are available
    if (!cityName || !date) return;
    // Create a new city object
    const newCity = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position: { lat, lng },
    };
    createCity(newCity);
  }

  // CONDITIONAL RENDERING -------------------------------------

  // If the lat and lng are not available, show a message
  if (!lat || !lng) return <Message message="Start by clicking on the map" />;
  // If the geocoding is loading, show a spinner
  if (isLoadingGeocoding) return <Spinner />;
  // If there is an error, show the error message
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      // Add the loading class when the form is loading
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)} // set the date when the user selects a date
          selected={date} // current value of the date (today)
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
