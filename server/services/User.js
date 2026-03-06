import { User } from "../models/User.js";
import bcrypt from "bcryptjs";


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

export const updateUserAddress = async (userId, address) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.address = address; // אם אין כתובת – יווצרה, אם יש – תתעדכן
  await user.save();

  return user;
};


