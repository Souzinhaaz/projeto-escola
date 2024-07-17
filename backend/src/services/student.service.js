import Student from "../models/Student.js";

export const createStudentService = (body) => Student.create(body);

export const findStudentsService = () => Student.find().populate("schoolClass");

export const findStudentByIdService = (id) => Student.findById(id).populate("schoolClass");

export const deleteStudentService = (id) => Student.findByIdAndDelete(id);