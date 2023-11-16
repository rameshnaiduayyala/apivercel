import express from "express";
const router = express.Router();
import userRoleController from "../controllers/user.role.controller.js";

router.post("/", userRoleController.createUserRole);
router.put("/:id", userRoleController.updateUserRole);
router.get("/", userRoleController.getAllUserRoles);
router.get("/:id", userRoleController.getOneUserRole);
router.delete("/:id", userRoleController.deleteUserRole);

export default router;
