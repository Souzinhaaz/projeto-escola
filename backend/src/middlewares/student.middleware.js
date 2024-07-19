import mongoose from "mongoose";
import { findStudentByIdService } from "../services/student.service.js";
import { findClassByIdService } from "../services/class.service.js";

export const validStudent = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const student = await findStudentByIdService(id);

    if (!student) {
      return res.status(404).send({ message: "Student does not exist!" });
    }

    req.id = id;
    req.student = student;

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validClassStudent = async (req, res, next) => {
  try {
    const { classId, name, email, parentTelephone } = req.body;

    if (!classId || !name || !email || !parentTelephone) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration!" });
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const schoolClass = await findClassByIdService(classId);

    if (!schoolClass) {
      return res.status(404).send({ message: "Class does no exist!" });
    }

    req.student = { classId, name, email, parentTelephone };
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUpdateStudent = async (req, res, next) => {
  try {
    const { classId, name, email, parentTelephone } = req.body;

    if (!classId && !name && !email && !parentTelephone) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration!" });
    }

    if (!mongoose.Types.ObjectId.isValid(classId)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const schoolClass = await findClassByIdService(classId);

    if (!schoolClass) {
      return res.status(404).send({ message: "Class does no exist!" });
    }

    req.student = { classId, name, email, parentTelephone };
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}