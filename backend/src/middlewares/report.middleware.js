import mongoose from "mongoose";
import { findStudentByReportCard } from "../services/reportCard.service.js";
import { findStudentByIdService } from "../services/student.service.js";

export const validReportCard = async (req, res, next) => {
  try {
    const { studentId, grades, faults } = req.body;

    if (!studentId || !grades || !faults) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration!" });
    }

    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    if (grades.length !== 4) {
      return res
        .status(400)
        .send({ message: "Must be passed 4 notes in the grades" });
    }

    const student = await findStudentByIdService(studentId);

    if (!student) {
      return res.status(404).send({ message: "Student does not exist!" });
    }

    const reportCard = await findStudentByReportCard(student._id);

    if (reportCard) {
      return res
        .status(400)
        .send({ message: "Student already have a Report Card" });
    }

    req.reportCard = { studentId, grades, faults };

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
