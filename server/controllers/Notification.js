import * as notificationService from "../services/Notification.js";

export const getNotificationsController = async (req, res) => {
  const userId = req.user.id;
  const notifications = await notificationService.getUserNotifications(userId);
  res.json(notifications);
};

export const markAllReadController = async (req, res) => {
  const userId = req.user.id;

  await notificationService.markAllAsRead(userId);
  res.json({ success: true });
};