import express from "express";
import {
  register,
  login,
  refresh,
  logout,
  changePassword
} from "../controllers/auth.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.put("/changePassword", authMiddleware, changePassword);


export default router;