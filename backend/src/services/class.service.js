import Class from "../models/Class.js";

export const createClassService = (body) => Class.create(body);

export const findClassesService = () => Class.find();

export const findClassByIdService = (id) => Class.findById(id);

export const findClassByQuery = (filter) => Class.find(filter);

export const updateClassService = (id, name, shift, year) =>
  Class.findOneAndUpdate({ _id: id }, { name, shift, year });

export const deleteClassService = (id) => Class.findByIdAndDelete(id);
