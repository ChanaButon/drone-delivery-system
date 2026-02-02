import express from "express";
import {
  createStation,
  getStations,
  getStationById,
  updateStation,
  deleteStation
} from "../controllers/BaseStation.js";

const router = express.Router();

router.post("/", createStation);
router.get("/", getStations);
router.get("/:id", getStationById);
router.put("/:id", updateStation);
router.delete("/:id", deleteStation);

export default router;
