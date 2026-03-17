import { Notification } from "../models/Notification.js";

export const createNotification = async ({ userId, deliveryId, message, type }) => {
  return await Notification.create({
    userId,
    deliveryId,
    message,
    type
  });
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