import * as simulatorService from "../services/simulatorService.js";

import { startAssignmentSimulator } from "../simulators/assignmentSimulator.js";

// דוגמה של callback לסימולציה
const simulatorCallback = () => {
  console.log("Simulator tick: updating drones...");
  startAssignmentSimulator()
  startAssignmentSimulator()

};

export const startSimulatorController = async (req, res) => {
  const started = simulatorService.startSimulator(simulatorCallback);
  if (started) return res.json({ success: true, message: "Simulator started." });
  return res.status(400).json({ success: false, message: "Simulator is already running." });
};

export const stopSimulatorController = async (req, res) => {
  const stopped = simulatorService.stopSimulator();
  if (stopped) return res.json({ success: true, message: "Simulator stopped." });
  return res.status(400).json({ success: false, message: "Simulator is not running." });
};

export const getSimulatorStatusController = async (req, res) => {
  const status = simulatorService.getSimulatorStatus();
  res.json({ running: status });
};

export const getSimulatorLogsController = async (req, res) => {
  const logs = await simulatorService.getSimulatorLogs();
  res.json(logs);
};

export const markLogsReadController = async (req, res) => {
  await simulatorService.markLogsRead();
  res.json({ success: true, message: "All logs marked as read." });
};