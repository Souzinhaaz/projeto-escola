import {
  createReportCardService,
  deleteCardService,
  findCardsService,
  searchByStudentService,
  updateReportCardService,
} from "../services/reportCard.service.js";
import { findOneStudentByQuery } from "../services/student.service.js";
import { getSituation } from "../utils/getSituation.js";

export const createReportCard = async (req, res) => {
  try {
    const { studentId, grades, faults } = req.reportCard;

    const approved = getSituation(grades, faults);

    const reportData = {
      student: studentId,
      grades,
      faults,
      approved,
    };

    const reportCard = await createReportCardService(reportData);

    if (!reportCard) {
      return res
        .status(400)
        .send({ message: "Occured an error trying to create the class" });
    }

    res
      .status(201)
      .send({ message: "Report Data created succesfully", reportCard });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findReportCards = async (req, res) => {
  try {
    const reportCards = await findCardsService();

    if (reportCards.length === 0) {
      return res.status(404).send({ message: "Report Cards not found" });
    }

    res.status(200).send(reportCards);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const searchReport = async (req, res) => {
  try {
    const { name } = req.query;

    const filter = { name: { $regex: `${name || ""}`, $options: "i" } };

    const student = await findOneStudentByQuery(filter);

    if (!student) {
      return res.status(404).send({message: "User not found!"})
    }

    const reportCards = await searchByStudentService(student._id);

    res.status(200).send(reportCards);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findReportCard = async (req, res) => {
  try {
    const reportCard = req.reportCard;

    res.status(200).send(reportCard);
  } catch (err) {
    res.status(500).send({ message: err.msg });
  }
};

export const updateReportCard = async (req, res) => {
  try {
    const { grades, faults } = req.body;
    const id = req.id;

    if (!grades && !faults) {
      return res
        .status(400)
        .send({ message: "At least one field must be submit to update" });
    }

    if (faults < 0) {
      return res.status(400).send({ message: "Invalid value to faults" });
    }

    if (grades.length !== 4) {
      return res
        .status(400)
        .send({ message: "Must be passed 4 notes in the grades" });
    }

    const approved = getSituation(grades, faults);

    await updateReportCardService(id, grades, faults, approved);

    res.status(200).send({ message: "Report card succesfully updated" });
  } catch (err) {
    res.status(500).send({ message: err.msg });
  }
};

export const deleteReportCard = async (req, res) => {
  try {
    const id = req.id;

    await deleteCardService(id);

    res.status(200).send({ message: "Report Card deleted successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
