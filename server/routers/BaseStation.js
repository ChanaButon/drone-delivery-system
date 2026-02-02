import express from "express";
import {
  createStation,
  getStations,
  getStationById,
  updateStation,
<<<<<<< HEAD
  deleteStation
=======
  deleteStation,
  countDrones,
  checkCapacity
>>>>>>> c7aabc8c7ce8036d099ce080d6a994de10b7bf5c
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
