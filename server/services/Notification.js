import { Notification } from "../models/Notification.js";
import { io } from "../main.js";

export const createNotification = async ({ userId, deliveryId, message, type }) => {
  const notification = await Notification.create({
    userId,
    deliveryId,
    message,
    type
  });

  io.to(userId.toString()).emit("newNotification", notification);

  return notification;
};

export const getUserNotifications = async (userId) => {
  return await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .limit(50);
};

export const markAllAsRead = async (userId) => {
  return await Notification.updateMany(
    { userId, read: false },
    { read: true }
  );
};