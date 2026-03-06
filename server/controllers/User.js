import * as userService from "../services/User.js";

import { generateAccessToken, generateRefreshToken } from "../utils/token.js";


export const getAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};

export const removeUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getProfile = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
};

export const getCurrentUser = async (req, res) => {
  const user = await userService.getUserById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
};

export const updateAddress = async (req, res) => {
  try {
    const { city, street, number } = req.body;

    if (!city || !street || !number) {
      return res.status(400).json({ message: "All address fields are required" });
    }

    const updatedUser = await updateUserAddress(req.user.id, { city, street, number });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

