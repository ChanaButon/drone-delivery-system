import { User } from "../models/User.js";
import bcrypt from "bcryptjs";

export const createUser = async (userData) => {
  const hashedPassword = bcrypt.hashSync(userData.password, 10);
  const user = new User({ ...userData, password: hashedPassword });
  return await user.save();
};
export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true }).select("-password");
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};


export const getUserById = async (id) => {
  return await User.findById(id).select("-password");
};



