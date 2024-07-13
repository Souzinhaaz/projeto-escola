import Class from "../models/Class.js";

export const createClassService = (body) => Class.create(body);

export const findClassesService = () => Class.find();

export const findClassService = (id) => Class.findById(id);

export const updateClassService = (id, name, shift, year) =>
  Class.findByIdAndUpdate({ _id: id }, { name, shift, year });

export const deleteClassService = (id) => Class.findByIdAndDelete(id);
