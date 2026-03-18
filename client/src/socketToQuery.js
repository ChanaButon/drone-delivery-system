import { socket } from "./socket";

export const registerSocketNotifications = (userId, queryClient) => {
  if (!userId) return;

  socket.emit("register", userId);

  socket.off("newNotification");

  socket.on("newNotification", (newNotification) => {
    queryClient.setQueryData(["userNotifications"], (old = []) => {
      return [newNotification, ...old];
    });
  });
};