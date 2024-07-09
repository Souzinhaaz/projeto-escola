const Class = require("../models/Class");
const classService = require("../services/class.service");

const createClass = async (req, res) => {
  try {
    const { name, shift, year } = req.body;

    if (!name || !shift || !year) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration!" });
    }

    if (
      shift.toUpperCase() !== "MATUTINO" &&
      shift.toUpperCase() !== "VESPERTINO" &&
      shift.toUpperCase() !== "NOTURNO"
    ) {
      return res.status(400).send({
        message: "The shift field must be [MATUTINO or VESPERTINO or NOTURNO]",
      });
    }

    const schoolClass = await classService.createClassService(req.body);

    if (!schoolClass) {
      res
        .status(400)
        .send({ message: "Occured an error trying to create the class" });
    }

    res.status(201).send({ message: "Class created succesfully", schoolClass });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findClasses = async (req, res) => {
  try {
    const schoolClasses = await classService.findClassesService();

    if (!schoolClasses) {
      res.status(404).send({ message: "There are no classes registered" });
    }

    res.status(200).send(schoolClasses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const findClass = (req, res) => {
  try {
    const user = req.user;

    res.send(user);
  } catch (err) {
    res.status(500).send({ message: "Occured an error in the server!" });
  }
};

const updateClass = async (req, res) => {
  try {
    const { name, shift, year } = req.body;
    const id = req.id;

    if (!name && !shift && !year) {
      return res
        .status(400)
        .send({ message: "At least one field must be submit to update" });
    }

    if (
      shift.toUpperCase() !== "MATUTINO" &&
      shift.toUpperCase() !== "VESPERTINO" &&
      shift.toUpperCase() !== "NOTURNO"
    ) {
      return res.status(400).send({
        message: "The shift field must be [MATUTINO or VESPERTINO or NOTURNO]",
      });
    }

    await classService.updateClassService(id, name, shift, year);

    res.status(200).send({ message: "Class updated succesfully" });
  } catch (err) {
    res.status(500).send({ message: "Ocurred some internal error!" });
  }
};

const deleteClass = async (req, res) => {
  try {
    const id = req.id;

    await classService.deleteClassService(id);

    res.status(200).send({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Occured a internal error" });
  }
};

module.exports = {
  createClass,
  findClasses,
  findClass,
  updateClass,
  deleteClass,
};
