import { createContext, useContext, useState, useEffect } from "react";
const BASE_URL = "http://localhost:9000";

// 1 - Create a new context
const CitiesContext = createContext();

// 2 - Create a provider
function CitiesProvider({ children }) {
  // State ---------------------------------------------------------------------
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // Effects -------------------------------------------------------------------
  // Fetch the cities from the API when the component mounts
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Fetch cities error", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // Functions -----------------------------------------------------------------

  // These functions will be used in components to interact with the API
  // They mimic the CRUD operations of a RESTful API

  // Function to get a city by id
  // Used in the Map component
  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.error("Fetch cities error", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to create a new city
  // Used in the Form component
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      // Add the new city to the cities array (JSON Server)
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.error("There was an error creating city", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Function to delete a city
  // Used in the CityItem component
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // Remove the city from the cities array (JSON Server)
      // Filter out the city with the id that matches the id passed in
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.error("There was an error deleting city", error);
    } finally {
      setIsLoading(false);
    }
  }

  // Context value -------------------------------------------------------------
  const contextValue = {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    deleteCity,
  };

  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
}

// 3 - Create a custom hook
// This hook will be used in components to consume the context
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

// 4 - Export the context and the custom hook
export { CitiesProvider, useCities };
