import { SimulatorLog } from "../models/SimulatorLog.js";

let simulatorInterval = null;
let simulatorRunning = false;

export const addLog = async ({ type = "INFO", droneId = null, deliveryId = null, message }) => {
  if (!message) return;

  const log = new SimulatorLog({ type, droneId, deliveryId, message });
  try {
    await log.save();
    
  } catch (err) {
    console.error("Failed to save simulator log:", err.message);
  }
  console.log(`[SIMULATOR] ${new Date().toISOString()} - ${message}`);
};

export const startSimulator = (callback) => {
  if (simulatorRunning) {
    addLog("Attempted to start simulator, but it's already running.", "WARN");
    return false;
  }

  simulatorRunning = true;
  addLog("Simulator started.", "INFO");

  simulatorInterval = setInterval(() => {
    try {
      callback();
    } catch (err) {
      addLog(`Error in simulator callback: ${err.message}`, "ERROR");
    }
  }, 3000);

  return true;
};

export const stopSimulator = () => {
  if (!simulatorRunning) {
    addLog("Attempted to stop simulator, but it's not running.", "WARN");
    return false;
  }

  clearInterval(simulatorInterval);
  simulatorInterval = null;
  simulatorRunning = false;
  addLog("Simulator stopped.", "INFO");

  return true;
};

export const getSimulatorStatus = () => simulatorRunning;

export const getSimulatorLogs = async () => {
  return await SimulatorLog.find().sort({ timestamp: -1 }).limit(100); // אחרונים 100 לוגים
};

export const markLogsRead = async () => {
  await SimulatorLog.updateMany({ readByAdmin: false }, { readByAdmin: true });
};