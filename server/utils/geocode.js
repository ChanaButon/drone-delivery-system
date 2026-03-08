import axios from "axios";

const apiKey = process.env.POSITIONSTACK_KEY;

export const getLatLngFromZip = async (zip) => {
  try {
    const response = await axios.get(
      `http://api.positionstack.com/v1/forward`,
      {
        params: {
          access_key: apiKey,
          query: `${zip}, Israel`,
          limit: 1
        }
      }
    );

    if (!response.data.data || response.data.data.length === 0) {
      throw new Error(`Zip code ${zip} not found`);
    }

    const location = response.data.data[0];
    return { lat: location.latitude, lng: location.longitude };
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    throw new Error("Unable to get coordinates from zip code");
  }
};