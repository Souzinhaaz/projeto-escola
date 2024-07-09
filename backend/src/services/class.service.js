const Class = require("../models/Class");

const createClassService = (body) => Class.create(body);

const findClassesService = () => Class.find();

const findClassService = (id) => Class.findById(id);

const updateClassService = (id, name, shift, year) =>
  Class.findByIdAndUpdate({ _id: id }, { name, shift, year });

const deleteClassService = (id) => Class.findByIdAndDelete(id);

module.exports = {
  createClassService,
  findClassesService,
  findClassService,
  updateClassService,
  deleteClassService,
};
