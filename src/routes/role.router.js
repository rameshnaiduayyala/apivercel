import express from "express";
import roleController from "../controllers/role.controller.js";

const router = express.Router();

router.post("/", roleController.createRole);
router.get("/", roleController.getRoles);
router.get("/:id", roleController.getRoleById);
router.put("/:id", roleController.updateRole);
router.delete("/:id", roleController.deleteRole);

export default router;