import express from "express";
import { protect} from "../middleware/auth.js";
import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  getDeliveriesByUser,
  assignDroneToDelivery,
  updateDeliveryStatus,
  updateDelivery,
deleteDelivery
} from "../controllers/Delivery.js";

const router = express.Router();

router.post("/",protect, createDelivery);
router.get("/", getAllDeliveries);

router.get("/user/:userId", getDeliveriesByUser);
router.get("/:id", getDeliveryById);
router.patch("/:id", protect, updateDelivery);
router.delete("/:id", protect, deleteDelivery);

router.patch("/:id/assign-drone", assignDroneToDelivery);
router.patch("/:id/status", updateDeliveryStatus);

export default router;