import mongoose from "mongoose";
import { findClassService } from "../services/class.service.js";

export const validClass = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message: "Invalid ID"})
    }

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