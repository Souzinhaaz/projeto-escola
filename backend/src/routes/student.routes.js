import Router from "express";
import { createStudent } from "../controllers/student.controller.js";
import { validStudent } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", validStudent, createStudent);

export default router;