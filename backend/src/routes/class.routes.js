import Router from "express";
import { createClass, findClasses, findClass, updateClass, deleteClass } from "../controllers/class.controller.js";
import { validId } from "../middlewares/global.middleware.js";
import { validClass } from "../middlewares/class.middleware.js";

const router = Router();

router.post("/", createClass);
router.get("/", findClasses);
router.get("/:id", validClass, findClass)
router.patch("/:id", validId, updateClass)
router.delete("/:id", validId, deleteClass)

export default router;
