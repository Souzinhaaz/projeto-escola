import Student from "../models/Student.js";

export const createStudentService = (body) => Student.create(body);

export const findStudentsService = () => Student.find();

export const findStudentByIdService = (id) => Student.findById(id);

export const deleteStudentService = (id) => Student.findByIdAndDelete(id);