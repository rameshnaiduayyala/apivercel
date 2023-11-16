import express from "express";
import authController from "../controllers/auth.controller.js";
import HasRole from "../controllers/external.auth.controler.js";
const router = express.Router();

router.post("/login", authController.Login);
router.post("/register", authController.Register);
router.post("/userdata",authController.userData)

export default router;