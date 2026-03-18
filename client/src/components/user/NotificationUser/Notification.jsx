import LocalPostOfficeOutlinedIcon from '@mui/icons-material/LocalPostOfficeOutlined';
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserNotifications,
  markNotificationsRead
} from "../../../api/notificationUser-function";
import { socket } from "../../../socket"; 
import "./Notification.css";

const NotificationBell = ({ user }) => {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch התראות קיימות
  const { data: notifications = [] } = useQuery({
    queryKey: ["userNotifications"],
    queryFn: getUserNotifications,
    onSuccess: () => {
      if (!user?._id) return;
      socket.emit("register", user._id);
      socket.off("newNotification");

      socket.on("newNotification", (newNotification) => {
        queryClient.setQueryData(["userNotifications"], (old = []) => {
          return [newNotification, ...old];
        });
      });
    }
  });

 const unread = Array.isArray(notifications) ? notifications.filter(n => !n.read) : [];

  const togglePanel = async () => {
    const newState = !open;
    setOpen(newState);

    if (newState && unread.length > 0) {
      await markNotificationsRead();
      queryClient.invalidateQueries(["userNotifications"]);
    }
  };

  return (
    <div className="notification-container">
      <div onClick={togglePanel} className="bell-icon">
        <LocalPostOfficeOutlinedIcon size={27} />
        {unread.length > 0 && <span className="badge">{unread.length}</span>}
      </div>

      {open && (
        <div className="panel">
          {notifications.length === 0 && <div>No notifications</div>}

          {notifications.map(n => (
            <div key={n._id} className="notification-item">
              <div>{n.message}</div>
              <div className="timestamp">
                {new Date(n.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;