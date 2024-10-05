import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
const BASE_URL = "http://localhost:9000";

// 1 - Create a new context
const CitiesContext = createContext();

// 1.1 - Create an initial state
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

// 1.2 - Create a reducer
function Reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

// 2 - Create a provider
function CitiesProvider({ children }) {
  // Reducer --------------------------------------------------------
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    Reducer,
    initialState
  );

  // Effects -------------------------------------------------------------------
  // Fetch the cities from the API when the component mounts
  useEffect(() => {
    async function fetchCities() {
      // Dispatch the loading action
      dispatch({ type: "loading" });
      try {
        const response = await fetch(`${BASE_URL}/cities`);
        const data = await response.json();
        // Dispatch the loaded action
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        // Dispatch the rejected action
        dispatch({ type: "rejected", payload: "Fetch cities error" });
      }
    }
    fetchCities();
  }, []);

  // Event handler Functions -----------------------------------------------------------------

  // These functions will be used in components to interact with the API
  // They mimic the CRUD operations of a RESTful API

  // Function to get a city by id
  // Used in the Map component
  async function getCity(id) {
    // Guard clause to check if the id is the same as the current city id
    if (id === currentCity.id) return;

    // Dispatch the loading action
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await response.json();
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      // Dispatch the rejected action
      dispatch({ type: "rejected", payload: "Fetch city error" });
    }
  }

  // Function to create a new city
  // Used in the Form component
  async function createCity(newCity) {
    // Dispatch the loading action
    dispatch({ type: "loading" });
    try {
      const response = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCity),
      });
      const data = await response.json();
      // Add the new city to the cities array (JSON Server)
      dispatch({ type: "city/created", payload: data });
    } catch {
      // Dispatch the rejected action
      dispatch({
        type: "rejected",
        payload: "There was an error creating city",
      });
    }
  }

  // Function to delete a city
  // Used in the CityItem component
  async function deleteCity(id) {
    // Dispatch the loading action
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });
      // Remove the city from the cities array (JSON Server)
      // Filter out the city with the id that matches the id passed in
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      // Dispatch the rejected action
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city",
      });
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
