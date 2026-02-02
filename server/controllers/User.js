import * as userService from "../services/User.js";

export const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.authenticateUser(email, password);

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json(user);
};

export const getProfile = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json(user);
};

export const updateProfile = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};