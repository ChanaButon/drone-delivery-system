import express from "express";
import {
  register,
  login,
  getProfile,
  updateProfile
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:id", getProfile);
router.put("/:id", updateProfile);

export default router;