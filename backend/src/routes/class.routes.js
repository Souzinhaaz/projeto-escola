import Router from "express";
import {
  createClass,
  findClasses,
  findClassById,
  searchClass,
  searchStudentsAndCards,
  updateClass,
  deleteClass,
} from "../controllers/class.controller.js";
import { validId } from "../middlewares/global.middleware.js";
import { validClass, validSearchStudent } from "../middlewares/class.middleware.js";

const router = Router();

router.post("/", createClass);
router.get("/", findClasses);
router.get("/search", searchClass);
router.get("/searchstudents", validSearchStudent, searchStudentsAndCards);
router.get("/:id", validClass, findClassById);
router.patch("/:id", validId, updateClass);
router.delete("/:id", validId, deleteClass);

export default router;
