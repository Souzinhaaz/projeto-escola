import Router from "express";
import {
  createReportCard,
  findReportCards,
  findReportCard,
  updateReportCard,
  deleteReportCard,
  searchReport
} from "../controllers/reportCard.controller.js";
import { validCreateReportCard, validReportCard } from "../middlewares/report.middleware.js";
import { validId } from "../middlewares/global.middleware.js";

const router = Router();

router.post("/", validCreateReportCard, createReportCard);
router.get("/", findReportCards);
router.get("/search", searchReport);
router.get("/:id", validId, validReportCard, findReportCard);
router.patch("/:id", validId, validReportCard, updateReportCard);
router.delete("/:id", validId, validReportCard, deleteReportCard);

export default router;
