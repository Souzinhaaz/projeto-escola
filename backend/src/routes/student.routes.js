import Router from "express";
import { createStudent, findStudents, findStudentById, deleteStudentById } from "../controllers/student.controller.js";
import { validStudent, validClassStudent } from "../middlewares/student.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", validClassStudent, createStudent);
router.get("/", findStudents);
router.get("/:id", validStudent, findStudentById)
router.delete("/:id", validId, deleteStudentById)

export default router;