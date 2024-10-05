import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // Get the lat and lng from the query string via useSearchParams
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
