import express from "express";
import {
  getNotificationsController,
  markAllReadController
} from "../controllers/Notification.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/notifications",protect, getNotificationsController);
router.patch("/notifications/read-all",protect,  markAllReadController);

export default router;