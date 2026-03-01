const BASE_URL = "http://localhost:3000/api/user";

export const getAllUsers = async () => {
  const res = await fetch(BASE_URL, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return await res.json();
};

export const getUserById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);

  if (!res.ok) {
    throw new Error("User not found");
  }

  return await res.json();
};


export const updateUser = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Failed to update user");
  }

  return await res.json();
};


export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });

  if (!res.ok) {
    throw new Error("Failed to delete user");
  }

  return await res.json();
};

export const getCurrentUser = async () => {
  const res = await fetch(`${BASE_URL}/me`, {
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
};
