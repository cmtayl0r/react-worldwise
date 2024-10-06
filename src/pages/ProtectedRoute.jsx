import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is not authenticated, redirect them to the login page
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]); // run this effect whenever isAuthenticated or navigate changes

  // if the user is authenticated, render the children
  return isAuthenticated ? children : null;
}

export default ProtectedRoute;
