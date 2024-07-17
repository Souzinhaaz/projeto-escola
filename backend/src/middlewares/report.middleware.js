import mongoose from "mongoose";
import { findStudentByReportCard } from "../services/reportCard.service.js";

export const validReportCard = async (req, res, next) => {
  try {
    const { studentId, grades, faults } = req.body;

    if (!studentId) {
      return res
        .status(400)
        .send({ message: "Need to refer a student to create a report card." });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const student = await findStudentByIdService(studentId);

    if (!student) {
      return res.status(404).send({ message: "Student does not exist!" });
    }

    const reportCard = await findStudentByReportCard(student._id);

    if (reportCard.length > 0) {
      return res.status(400).send({message: "Student already have a Report Card"});
    }

    req.reportCard = { studentId, grades, faults };

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};