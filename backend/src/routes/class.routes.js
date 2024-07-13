import Router from "express";
import { createClass, findClasses, findClass, updateClass, deleteClass } from "../controllers/class.controller.js";
import { validId, validClass } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", createClass);
router.get("/", findClasses);
router.get("/:id", validId, validClass, findClass)
router.patch("/:id", validId, validClass, updateClass)
router.delete("/:id", validId, validClass, deleteClass)

export default router;
