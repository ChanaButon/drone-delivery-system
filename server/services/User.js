import { User } from "../models/User.js";
import { createNotification } from "../services/Notification.js";


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

  user.address = address; 
  await user.save();
  await createNotification({
    userId: user._id,
    message: "Your address has been updated 📍"
  });


  return user;
};

export const findUsersByEmail = async (partialEmail) => {
 
  if (!partialEmail) return [];
  return await User.find({
    email: { $regex: partialEmail, $options: "i" }
  }).select("_id email fullName");
};
    
export const getUserIdByEmail = async (email) => {
  const user = await User.findOne({ email });
  return user ? user._id : null;
};

