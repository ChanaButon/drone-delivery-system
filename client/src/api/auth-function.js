const AUTH_URL = "http://localhost:3000/api/auth";

export const registerUser = async (data) => {
  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Registration failed");
  }

  return await res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    throw new Error("Invalid credentials");
  }

  return await res.json();
};

export const refreshToken = async () => {
  const res = await fetch(`${AUTH_URL}/refresh`, {
    method: "POST",
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Refresh failed");
  }

  return await res.json();
};

export const logoutUser = async () => {
  const res = await fetch(`${AUTH_URL}/logout`, {
    method: "POST",
    credentials: "include"
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return await res.json();
};

export const changePassword = async ({ oldPassword, newPassword }) => {
  const res = await fetch(`${AUTH_URL}/changePassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({
      oldPassword,
      newPassword
    })
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to change password");
  }

  return data;
};