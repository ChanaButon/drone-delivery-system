import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import { createNotification } from "../services/Notification.js";

export const registerService = async (data) => {
  const { name, email,phone , password } = data;

  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword
  });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = await bcrypt.hash(refreshToken, 10);
  await user.save();

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    },
    accessToken,
    refreshToken
  };
};

export const refreshService = async (token) => {
  if (!token) throw new Error("No refresh token");

  const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);

  if (!user || !user.refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const isMatch = await bcrypt.compare(token, user.refreshToken);
  if (!isMatch) throw new Error("Invalid refresh token");

  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = generateRefreshToken(user);

  user.refreshToken = await bcrypt.hash(newRefreshToken, 10);
  await user.save();

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken
  };
};

export const logoutService = async (token) => {
  if (!token) return;

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  } catch (err) {
    return;
  }
};

export const changePasswordService = async (userId, oldPassword, newPassword) => {

  if (!oldPassword || !newPassword) {
    throw new Error("All fields are required");
    console.log("2")
  }
  const user = await User.findById(userId);
  if (!user) {
    console.log("3")
    throw new Error("User not found");
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    console.log("4")
    throw new Error("Old password is incorrect");
  }
  console.log("5")
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  await createNotification({
  userId: user._id,
  message: "Your password was changed successfully 🔒"
});
  return true;
};