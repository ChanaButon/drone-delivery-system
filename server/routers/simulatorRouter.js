import express from "express";
import {
  startSimulatorController,
  stopSimulatorController,
  getSimulatorStatusController,
  getSimulatorLogsController,
  markLogsReadController
} from "../controllers/simulatorController.js";

const router = express.Router();

router.post("/simulator/start", startSimulatorController);
router.post("/simulator/stop", stopSimulatorController);
router.get("/simulator/status", getSimulatorStatusController);
router.get("/simulator/logs", getSimulatorLogsController);
router.patch("/simulator/logs/read-all", markLogsReadController);

export default router;