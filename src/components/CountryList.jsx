import Spinner from "./Spinner";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
// import { useCities } from "../contexts/CitiesContext";

function CountryList({ cities, isLoading }) {
  // const { cities, isLoading } = useCities();

  // If countries are loading, display a spinner
  if (isLoading) return <Spinner />;

  // If there are no cities, display a message
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // Create a new array of unique countries
  const countries = cities.reduce((arr, city) => {
    // Map over the array of cities and check if the country is already
    if (!arr.map((el) => el.country).includes(city.country))
      // If not, add the country to the array
      return [...arr, { country: city.country, emoji: city.emoji }];
    // Otherwise, return the array as is
    else return arr;
    // Resulting array will have unique countries
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
