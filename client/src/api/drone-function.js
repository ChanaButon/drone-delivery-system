const BASE_URL = "http://localhost:3000/api/drones";


export const createDrone = async (droneData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(droneData)
  });

  if (!res.ok) {
    throw new Error("Failed to create drone");
  }

  return await res.json();
};

export const getAllDrones = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch drones");
  }

  return await res.json();
};


export const getAvailableDrones = async () => {
  const res = await fetch(`${BASE_URL}/available`);

  if (!res.ok) {
    throw new Error("Failed to fetch available drones");
  }

  return await res.json();
};


export const getDroneById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Drone not found");
  }

  return await res.json();
};

export const updateDrone = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to update drone");
  }

  return await res.json();
};


export const deleteDrone = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete drone");
  }

  return await res.json();
};

export const assignDroneToStation = async (id, stationId) => {
  const res = await fetch(`${BASE_URL}/${id}/assign-station`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ stationId })
  });

  if (!res.ok) {
    throw new Error("Failed to assign drone to station");
  }

  return await res.json();
};

export const sendDroneToCharging = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/charging`, {
    method: "PATCH"
  });

  if (!res.ok) {
    throw new Error("Failed to send drone to charging");
  }

  return await res.json();
};


export const sendDroneToMaintenance = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/maintenance`, {
    method: "PATCH"
  });

  if (!res.ok) {
    throw new Error("Failed to send drone to maintenance");
  }

  return await res.json();
};

export const setDroneAvailable = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/available`, {
    method: "PATCH"
  });

  if (!res.ok) {
    throw new Error("Failed to set drone available");
  }

  return await res.json();
};