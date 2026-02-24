const BASE_URL = "http://localhost:3000/api/base-stations";


export const createBaseStation = async (stationData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(stationData)
  });

  if (!res.ok) {
    throw new Error("Failed to create station");
  }

  return await res.json();
};


export const getAllStations = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch stations");
  }

  return await res.json();
};


export const getStationById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Station not found");
  }

  return await res.json();
};


export const updateStation = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to update station");
  }

  return await res.json();
};


export const deleteStation = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete station");
  }

  return await res.json();
};

export const countDronesInStation = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/drones-count`);

  if (!res.ok) {
    throw new Error("Failed to count drones");
  }

  return await res.json();
};

export const checkStationCapacity = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/has-capacity`);

  if (!res.ok) {
    throw new Error("Failed to check capacity");
  }

  return await res.json();
};