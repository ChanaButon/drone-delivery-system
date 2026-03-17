import "./AdminHeader.css";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import NotificationBell from "../NotificationBell/NotificationBell";
import { getSimulationStatus, startSimulation, stopSimulation } from "../../../api/admin-function";
import { Switch, FormControlLabel } from "@mui/material";

const titles = {
  drones: "Fleet Control",
  stations: "Stations Network",
  packages: "Global Packages",
  users: "User Management",
};

const AdminHeader = ({ activeTab }) => {
  const queryClient = useQueryClient();
  const [simRunning, setSimRunning] = useState(false);

  // בודק סטטוס הסימולטור כל 4 שניות
  useQuery({
    queryKey: ["simulatorStatus"],
    queryFn: getSimulationStatus,
    refetchInterval: 4000,
    onSuccess: (res) => setSimRunning(res.running)
  });

  const startMutation = useMutation({
    mutationFn: startSimulation,
    onSuccess: () => {
      setSimRunning(true);
      queryClient.invalidateQueries({ queryKey: ["simulatorStatus"] });
    }
  });

  const stopMutation = useMutation({
    mutationFn: stopSimulation,
    onSuccess: () => {
      setSimRunning(false);
      queryClient.invalidateQueries({ queryKey: ["simulatorStatus"] });
    }
  });

  const handleSwitch = () => {
    if (simRunning) stopMutation.mutate();
    else startMutation.mutate();
  };

  return (
    <header className="admin-header">
      <div>
        <h1>{titles[activeTab]}</h1>
        <p>System administration overview</p>
      </div>

      <div className="admin-controls">
        <FormControlLabel
          control={
            <Switch
              checked={simRunning}
              onChange={handleSwitch}
              color="success"
            />
          }
          label={simRunning ? "Simulator ON" : "Simulator OFF"}
        />

        <NotificationBell />
      </div>
    </header>
  );
};

export default AdminHeader;