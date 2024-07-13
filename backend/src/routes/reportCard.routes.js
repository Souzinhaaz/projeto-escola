import Router from "express";
import { createReportCard, findCards } from "../controllers/reportCard.controller.js"
import { validReportCard } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", validReportCard, createReportCard);
router.get("/", findCards);

export default router;