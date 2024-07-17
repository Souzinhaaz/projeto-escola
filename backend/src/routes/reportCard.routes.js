import Router from "express";
import {
  createReportCard,
  findReportCards,
  findReportCard,
  updateReportCard,
} from "../controllers/reportCard.controller.js";
import { validReportCard } from "../middlewares/report.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", validReportCard, createReportCard);
router.get("/", findReportCards);
router.get("/:id", validId, findReportCard);
router.patch("/:id", validId, updateReportCard);

export default router;
