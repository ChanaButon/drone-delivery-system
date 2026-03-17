export const getUserNotifications = async () => {
  const res = await fetch("http://localhost:3000/api/notifications", {
    credentials: "include"
  });
  return res.json();
};

export const markNotificationsRead = async () => {
  await fetch("http://localhost:3000/api/notifications/read-all", {
    method: "PATCH",
    credentials: "include"
  });
};