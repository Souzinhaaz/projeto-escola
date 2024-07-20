import Router from "express";
import { createStudent, findStudents, searchStudent, findStudentById, updateStudent, deleteStudentById } from "../controllers/student.controller.js";
import { validStudent, validClassStudent, validUpdateStudent } from "../middlewares/student.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", validClassStudent, createStudent);
router.get("/", findStudents);
router.get("/search", searchStudent)
router.get("/:id", validStudent, findStudentById)
router.patch("/:id", validUpdateStudent, updateStudent)
router.delete("/:id", validId, deleteStudentById)

export default router;