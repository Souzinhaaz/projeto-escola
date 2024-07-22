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
    const { name, email, parentTelephone, schoolClass } = req.body;

    if (!name || !email || !parentTelephone || !schoolClass) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration!" });
    }

    if (!mongoose.Types.ObjectId.isValid(schoolClass)) {
      return res.status(400).send({ message: "Invalid ID" });
    }

    const classSchool = await findClassByIdService(schoolClass);

    if (!classSchool) {
      return res.status(404).send({ message: "Class does no exist!" });
    }

    req.student = { name, email, parentTelephone, schoolClass };
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validSearch = async (req, res, next) => {
  try {
    const { classId, name } = req.query;

    let filter = {};
    if (name) filter.name = { $regex: `${name || ""}`, $options: "i" };
    if (classId && mongoose.Types.ObjectId.isValid(classId)) {
      filter.schoolClass = classId;
    }

    req.filter = filter;
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const validUpdateStudent = async (req, res, next) => {
  try {
    const { name, email, parentTelephone, classId } = req.body;

    if (!name && !email && !parentTelephone && !classId) {
      return res
        .status(400)
        .send({ message: "Submit at least one field for registration!" });
    }

    if (classId) {
      if (!mongoose.Types.ObjectId.isValid(classId)) {
        return res.status(400).send({ message: "Invalid ID" });
      }

      const schoolClass = await findClassByIdService(classId);
      if (!schoolClass) {
        return res.status(404).send({ message: "Class does no exist!" });
      }
    }

    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
