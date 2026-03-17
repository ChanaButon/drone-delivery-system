export const getSimulatorLogs = async (timeFilter = "all") => {
  let url = "http://localhost:3000/api/simulator/logs";

  const now = new Date();
  let from;

  if (timeFilter === "hour") {
    from = new Date(now.getTime() - 60 * 60 * 1000);
  }

  if (timeFilter === "day") {
    from = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  }

  if (timeFilter === "week") {
    from = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  }

  if (from) {
    url += `?from=${from.toISOString()}`;
  }

  const res = await fetch(url, {
    credentials: "include"
  });

  return res.json();
};

export const markAllLogsAsRead = async () => {
  await fetch("http://localhost:3000/api/simulator/logs/read-all", {
    method: "PATCH",
    credentials: "include"
  });
};


export const startSimulation = async () => {
  const res = await fetch("http://localhost:3000/api/simulator/start", {
    method: "POST",
    credentials: "include"
  });

  return res.json();
};

export const stopSimulation = async () => {
  const res = await fetch("http://localhost:3000/api/simulator/stop", {
    method: "POST",
    credentials: "include"
  });

  return res.json();
};

export const getSimulationStatus = async () => {
  const res = await fetch("http://localhost:3000/api/simulator/status", {
    credentials: "include"
  });

  return res.json();
};