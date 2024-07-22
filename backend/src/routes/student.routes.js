import Router from "express";
import {
  createStudent,
  findStudents,
  searchStudent,
  findStudentById,
  updateStudent,
  deleteStudentById
} from "../controllers/student.controller.js";
import {
  validStudent,
  validSearch,
  validClassStudent,
} from "../middlewares/student.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", validClassStudent, createStudent);
router.get("/", findStudents);
router.get("/search", validSearch, searchStudent);
router.get("/:id", validStudent, findStudentById);
router.patch("/:id", validId, updateStudent);
router.delete("/:id", validId, deleteStudentById);

export default router;
