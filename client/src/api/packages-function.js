const BASE_URL = "http://localhost:3000/api/package";


export const createPackage = async (packageData) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(packageData)
  });

  if (!res.ok) {
    throw new Error("Failed to create package");
  }

  return await res.json();
};


export const getAllPackages = async () => {
  const res = await fetch(BASE_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch packages");
  }

  return await res.json();
};


export const getPackageById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("Package not found");
  }

  return await res.json();
};


export const deletePackage = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete package");
  }

  return await res.json();
};


export const assignDroneToPackage = async (id, droneId) => {
  const res = await fetch(`${BASE_URL}/${id}/assign-drone`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ droneId })
  });

  if (!res.ok) {
    throw new Error("Failed to assign drone");
  }

  return await res.json();
};


export const markPackageInTransit = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/in-transit`, {
    method: "PATCH"
  });

  if (!res.ok) {
    throw new Error("Failed to mark as in transit");
  }

  return await res.json();
};


export const markPackageDelivered = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/delivered`, {
    method: "PATCH"
  });

  if (!res.ok) {
    throw new Error("Failed to mark as delivered");
  }

  return await res.json();
};


export const markPackageFailed = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/failed`, {
    method: "PATCH"
  });

  if (!res.ok) {
    throw new Error("Failed to mark as failed");
  }

  return await res.json();
};


export const completeDelivery = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/complete`, {
    method: "PATCH"
  });

  if (!res.ok) {
    throw new Error("Failed to complete delivery");
  }

  return await res.json();
};