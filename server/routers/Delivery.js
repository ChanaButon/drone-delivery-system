import express from "express";
import {
  createDelivery,
  getAllDeliveries,
  getDeliveryById,
  getDeliveriesByUser,
  assignDroneToDelivery,
  updateDeliveryStatus
} from "../controllers/Delivery.js";

const router = express.Router();

// יצירת משלוח (לקוח)
router.post("/", createDelivery);

// שליפת כל המשלוחים (ממשק חברה)
router.get("/", getAllDeliveries);

// שליפת משלוח לפי ID
router.get("/:id", getDeliveryById);

// משלוחים של לקוח (שולח או מקבל)
router.get("/user/:userId", getDeliveriesByUser);

// שיבוץ רחפן למשלוח
router.patch("/:id/assign-drone", assignDroneToDelivery);

// עדכון סטטוס משלוח
router.patch("/:id/status", updateDeliveryStatus);

export default router;
