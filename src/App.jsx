import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// PAGES
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";

// CONTEXTS
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="login" element={<Login />} />
            {/* 
              // The AppLayout component is wrapped in a ProtectedRoute component 
              // This means that the AppLayout component will only be rendered if the user is authenticated
            */}
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              {/* 
            // When the user goes to /app, they will be redirected to /app/cities
            // This is because the Route index element is a Navigate component
          */}
              <Route index element={<Navigate replace to="/app/cities" />} />
              <Route path="cities" element={<CityList />} />
              {/*
            // When the user clicks on a city, the City component will be rendered 
            // name of param is id, same as the one set in the Route path
          */}
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
