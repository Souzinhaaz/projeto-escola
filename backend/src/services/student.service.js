import Student from "../models/Student.js";

export const createStudentService = (body) => Student.create(body);

export const findStudentsService = () => Student.find().populate("schoolClass");

export const findStudentByQuery = (filter) => Student.find(filter);

export const findStudentInClass = (classId) => Student.find({schoolClass: classId}).select("_id");

export const findOneStudentByQuery = (filter) => Student.findOne(filter);

export const findStudentByIdService = (id) =>
  Student.findById(id).populate("schoolClass");

export const updateStudentService = (
  id,
  name,
  email,
  parentTelephone,
  schoolClass
) =>
  Student.findOneAndUpdate(
    { _id: id },
    { name, email, parentTelephone, schoolClass }
  );

export const deleteStudentService = (id) => Student.findByIdAndDelete(id);
