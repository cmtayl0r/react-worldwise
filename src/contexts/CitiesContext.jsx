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

  // Function to get a city by id
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
      console.error("Add  error", error);
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
  };

  return (
    <CitiesContext.Provider value={contextValue}>
      {children}
    </CitiesContext.Provider>
  );
}

// 3 - Create a custom hook
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}

// 4 - Export the context and the custom hook
export { CitiesProvider, useCities };
