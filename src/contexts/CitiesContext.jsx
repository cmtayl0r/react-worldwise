import { createContext, useContext, useState, useEffect } from "react";
const BASE_URL = "http://localhost:9000";

// 1 - Create a new context
const CitiesContext = createContext();

// 2 - Create a provider
function CitiesProvider({ children }) {
  // State ---------------------------------------------------------------------
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  // Context value -------------------------------------------------------------
  const contextValue = {
    cities,
    isLoading,
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
