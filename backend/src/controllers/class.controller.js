import {
  createClassService,
  findClassesService,
  findClassByQuery,
  updateClassService,
  deleteClassService,
} from "../services/class.service.js";

export const createClass = async (req, res) => {
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

    const schoolClass = await createClassService(req.body);

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

export const findClasses = async (req, res) => {
  try {
    const schoolClasses = await findClassesService();

    if (schoolClasses.length === 0) {
      return res
        .status(404)
        .send({ message: "There are no classes registered" });
    }

    res.status(200).send(schoolClasses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findClassById = (req, res) => {
  try {
    const schoolClass = req.schoolClass;

    res.send(schoolClass);
  } catch (err) {
    res.status(500).send({ message: "Occured an error in the server!" });
  }
};

export const searchClass = async (req, res) => {
  try {
    const { name, shift, year } = req.query;

    const createFilter = ({ name, shift, year }) => {
      let filter = {};
      if (name) filter.name = { $regex: `${name || ""}`, $options: "i" };
      if (shift) filter.shift = { $regex: `${shift || ""}`, $options: "i" };
      if (year) filter.year = year;
      return filter;
    };

    const filter = createFilter({ name, shift, year });

    const classes = await findClassByQuery(filter);

    res.status(200).send(classes);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const searchStudentsAndCards = async (req, res) => {
  try {
    const classSchool = req.classSchool;
    const student = req.student;
    const reportCard = req.reportCard;

    let sum = 0;
    console.log(reportCard)
    for (let i = 0; i < reportCard.grades.length; i++) {
      sum += reportCard.grades[i];
    }
    const average = sum / reportCard.grades.length;

    res.status(200).send({
      class: classSchool,
      student: student,
      reportCard: {
        _id: reportCard._id,
        student: student.name,
        grades: reportCard.grades,
        faults: reportCard.faults,
        average: average,
        approved: reportCard.approved
      },
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateClass = async (req, res) => {
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

    await updateClassService(id, name, shift, year);

    res.status(200).send({ message: "Class updated succesfully" });
  } catch (err) {
    res.status(500).send({ message: "Ocurred some internal error!" });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const id = req.id;

    await deleteClassService(id);

    res.status(200).send({ message: "Class deleted successfully" });
  } catch (err) {
    res.status(500).send({ message: "Occured a internal error" });
  }
};
