const BASE_URL = "http://localhost:3000/api/deliveries";

export const getAllDeliveries = async () => {
  const res = await fetch(BASE_URL, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch deliveries");
  }
  return await res.json();
};

export const getDeliveriesByUser = async (userId) => {
  const res = await fetch(`${BASE_URL}/user/${userId}`, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch user deliveries");
  }
  return await res.json();
};

export const createDelivery = async (data) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to create delivery");
  }
  return await res.json();
};

export const updateDeliveryStatus = async (deliveryId, status) => {
  const res = await fetch(`${BASE_URL}/${deliveryId}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ status })
  });

  if (!res.ok) {
    throw new Error("Failed to update delivery status");
  }
  return await res.json();
};

export const assignDroneToDelivery = async (deliveryId, droneId) => {
  const res = await fetch(`${BASE_URL}/${deliveryId}/assign-drone`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ droneId })
  });

  if (!res.ok) {
    throw new Error("Failed to assign drone");
  }
  return await res.json();
};