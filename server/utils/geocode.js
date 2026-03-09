import axios from "axios";

export const getLatLngFromAddress = async (city, street, number) => {
  const address = `${street} ${number}, ${city}, Israel`;

  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: address,
        format: "json",
        limit: 1
      },
      headers: {
        "User-Agent": "drone-delivery-app"
      }
    }
  );

  if (!response.data || response.data.length === 0) {
    throw new Error("Address not found");
  }

  const location = response.data[0];

  return {
    lat: parseFloat(location.lat),
    lng: parseFloat(location.lon)
  };
};