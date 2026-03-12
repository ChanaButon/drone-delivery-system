import express from "express";
import {
createStation,
getStations,
getStationById,
updateStation,
deleteStation,
countDrones,
checkCapacity,
getNearestStation,
getStationsWithCapacity
} from "../controllers/BaseStation.js";

const router = express.Router();

router.post("/", createStation);
router.get("/", getStations);
router.get("/with-capacity", getStationsWithCapacity);
router.get("/:id", getStationById);
router.put("/:id", updateStation);
router.delete("/:id", deleteStation);

router.get("/:id/drones-count", countDrones);
router.get("/:id/has-capacity", checkCapacity);


router.post("/nearest", getNearestStation);

export default router;