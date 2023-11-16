import express from "express";
import imprestController from "../controllers/imprest.controller.js";
const router = express.Router();

router.post("/", imprestController.createImprest);
router.get("/", imprestController.getImprests);
router.put("/:id", imprestController.updateImprest);
router.get("/:id", imprestController.getOneImprest);
router.delete("/:id", imprestController.deleteImprest);

export default router;
