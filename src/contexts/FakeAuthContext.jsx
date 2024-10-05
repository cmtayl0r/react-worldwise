import { createContext, useContext, useReducer } from "react";

// Fake user object
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u-zz",
};

// https://i.pravatar.cc/100?u-zz

// 1 - Create a new context
const AuthContext = createContext();

// 1.1 - Create an initial state
const initialState = {
  user: null,
  isAuthenticated: false,
};

// 1.2 - Create a reducer
function Reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

// 2 - Create a provider
function AuthProvider({ children }) {
  const [user, isAuthenticated, dispatch] = useReducer(Reducer, initialState);

  function login(email, password) {
    // Fake login function

    // if the email and password match the fake user, dispatch the login action
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    // Fake logout function
    dispatch({ type: "logout" });
  }

  const contextValue = { user, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={{ contextValue }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3 - Create a custom hook
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
}

// 4 - Export the provider and the custom hook
export { AuthProvider, useAuth };
