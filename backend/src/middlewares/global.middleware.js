import mongoose from "mongoose";
import { findClassService } from "../services/class.service.js";
import { findStudentByIdService } from "../services/student.service.js";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "ID not valid" });
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validClass = async (req, res, next) => {
  try {
    const id = req.params.id;

    const schoolClass = await findClassService(id);

    if (!schoolClass) {
      return res.status(404).send({ message: "Class does not exist!" });
    }

    req.id = id;
    req.schoolClass = schoolClass;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validStudent = async (req, res, next) => {
  try {
    const { schoolClass } = req.body;

    if (!schoolClass) {
      return res
        .status(400)
        .send({ message: "Need to refer a class to create a student." });
    }

    if (!mongoose.Types.ObjectId.isValid(schoolClass)) {
      return res.status(400).send({ message: "ID invalid" });
    }

    const studentClass = await findClassService(schoolClass);

    if (!studentClass) {
      return res.status(404).send({ message: "Class does not exist!" });
    }

    req.studentClass = studentClass;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validReportCard = async (req, res, next) => {
  try {
    const { studentId } = req.body;

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

    req.student = student;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
