import { Bell } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getUserNotifications,
  markNotificationsRead
} from "../../../api/notificationUser-function";
import "./Notification.css";

const NotificationBell = () => {

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["userNotifications"],
    queryFn: getUserNotifications,
    refetchInterval: 4000
  });

  const unread = notifications.filter(n => !n.read);

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

      <div onClick={togglePanel}>
        <Bell size={24} />
        {unread.length > 0 && (
          <span>{unread.length}</span>
        )}
      </div>

      {open && (
        <div className="panel">

          {notifications.length === 0 && <div>No notifications</div>}

          {notifications.map(n => (
            <div key={n._id}>
              <div>{n.message}</div>
              <div>{new Date(n.createdAt).toLocaleString()}</div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default NotificationBell;