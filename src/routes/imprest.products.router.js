import express from "express"
import imprestProductsController from "../controllers/imprest.product.controller.js";

const router = express.Router();

router.get("/", imprestProductsController.getImprestProducts);
router.post("/", imprestProductsController.createImprestProduct);
router.get("/:id", imprestProductsController.getImprestProductById);
router.put("/:id", imprestProductsController.updateImprestProduct);
router.delete("/:id", imprestProductsController.deleteImprestProduct);
export default router;
