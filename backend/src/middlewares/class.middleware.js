import mongoose from "mongoose";
import {
  findClassByIdService
} from "../services/class.service.js";
import { findStudentByQuery } from "../services/student.service.js";
import { searchByStudentService } from "../services/reportCard.service.js";

export const validClass = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const schoolClass = await findClassByIdService(id);

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

export const validSearchStudent = async (req, res, next) => {
  try {
    const { classId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const classSchool = await findClassByIdService(classId);

    if (!classSchool) {
      return res.status(404).send({ message: "Class doesn't exist!" });
    }
    let student = await findStudentByQuery({ schoolClass: classId });
    if (student.length === 0) {
      student = "There aren't any students;";
    }
    let reportCard = await searchByStudentService(student._id);
    if (reportCard.length === 0) {
      reportCard = "There aren't any report cards!";
    }

    req.classSchool = classSchool;
    req.student = student;
    req.reportCard = reportCard;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
