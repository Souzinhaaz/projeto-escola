import Router from "express";
import {
  createClass,
  findClasses,
  findClassById,
  searchClass,
  updateClass,
  deleteClass,
} from "../controllers/class.controller.js";
import { validId } from "../middlewares/global.middleware.js";
import { validClass } from "../middlewares/class.middleware.js";

const router = Router();

router.post("/", createClass);
router.get("/", findClasses);
router.get("/search", searchClass);
router.get("/:id", validClass, findClassById);
router.patch("/:id", validId, updateClass);
router.delete("/:id", validId, deleteClass);

export default router;
