import Student from "../models/Student.js";

export const createStudentService = (body) => Student.create(body);

export const findStudentsService = () => Student.find().populate("schoolClass");

export const findStudentByQuery = (filter) => Student.find(filter);

export const findStudentByIdService = (id) =>
  Student.findById(id).populate("schoolClass");

export const updateStudentService = (
  id,
  schoolClass,
  name,
  email,
  parentTelephone
) =>
  Student.findOneAndUpdate(
    { _id: id },
    { schoolClass, name, email, parentTelephone }
  );

export const deleteStudentService = (id) => Student.findByIdAndDelete(id);
