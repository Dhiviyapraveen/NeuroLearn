import express from "express";
import { forgotPassword, getProfile, login, register, updateProfile } from "../controller/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);

export default router;
