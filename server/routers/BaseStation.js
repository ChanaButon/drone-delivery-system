import express from "express";
import {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation,
  countDrones,
  checkCapacity
} from "../controllers/BaseStation.js";

const router = express.Router();

router.post("/", createStation);
router.get("/", getStations);
router.get("/:id", getStationById);
router.put("/:id", updateStation);
router.delete("/:id", deleteStation);

router.get("/:id/drones-count", countDrones);
router.get("/:id/has-capacity", checkCapacity);

export default router;
