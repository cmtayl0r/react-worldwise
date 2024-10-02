import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import styles from "./Map.module.css";
import { useCities } from "../contexts/CitiesContext";

function Map() {
  // Navigate to a new location
  // const navigate = useNavigate();

  // Get the cities from the context via useCities
  const { cities } = useCities();

  // State to store the map position
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

  // Get the lat and lng from the query string via useSearchParams
  // Display the current city on the map
  const [searchParams, setSearchParams] = useSearchParams();
  const mapLat = searchParams.get("lat");
  const mapLng = searchParams.get("lng");

  // Update the map position when the lat and lng change
  // This will be triggered when the user clicks on a city
  // map position will be remembered when the user navigates back to the map
  useEffect(() => {
    if (mapLat && mapLng) {
      setMapPosition([mapLat, mapLng]);
    }
  }, [mapLat, mapLng]);

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
      </MapContainer>
    </div>
  );
}

// Leaflet component to change the center of the map
function ChangeCenter({ position }) {
  const map = useMap(); // Get access to the map
  map.setView(position); // Change the center of the map
  return null;
}

export default Map;
