import { Bell } from "lucide-react";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSimulatorLogs, markAllLogsAsRead } from "../../../api/admin-function";
import "./NotificationBell.css";

const NotificationBell = () => {

  const [open,setOpen] = useState(false);
  const [filter,setFilter] = useState("all");

  const queryClient = useQueryClient();

  const {data:logs=[]} = useQuery({
    queryKey:["simulatorLogs",filter],
    queryFn:()=>getSimulatorLogs(filter),
    refetchInterval:4000
  });

  const unread = logs.filter(log=>!log.readByAdmin);

  const togglePanel = async () => {

    const newState = !open;
    setOpen(newState);

    if(newState && unread.length>0){

      await markAllLogsAsRead();

      queryClient.invalidateQueries(["simulatorLogs"]);
    }
  };

  return (

    <div className="notification-container">

      <div className="bell-wrapper" onClick={togglePanel}>

        <Bell size={26}/>

        {unread.length>0 && (
          <span className="notification-badge">
            {unread.length}
          </span>
        )}

      </div>

      {open && (

        <div className="notification-panel">

          <div className="notification-filter">

            <select
              value={filter}
              onChange={(e)=>setFilter(e.target.value)}
            >

              <option value="all">All</option>
              <option value="hour">Last Hour</option>
              <option value="day">Last Day</option>
              <option value="week">Last Week</option>

            </select>

          </div>

          <div className="notification-list">

            {logs.length===0 && (
              <div className="no-events">
                No events
              </div>
            )}

           {logs.map(log => (
  <div key={log._id} className={`log-row ${!log.readByAdmin ? "new" : ""}`}>
    <div className="log-message">
      {log.message}
      {log.droneId && <div>Drone ID: {log.droneId._id || log.droneId}</div>}
      {log.deliveryId && <div>Delivery ID: {log.deliveryId._id || log.deliveryId}</div>}
    </div>
    <div className="log-time">
      {new Date(log.timestamp).toLocaleString()}
    </div>
  </div>
))}

          </div>

        </div>

      )}

    </div>

  );

};

export default NotificationBell;