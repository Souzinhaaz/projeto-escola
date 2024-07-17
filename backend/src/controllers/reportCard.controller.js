import {
  createReportCardService,
  findByIdCardService,
  findCardsService,
  updateReportCardService,
} from "../services/reportCard.service.js";
import { getSituation } from "../utils/getSituation.js";

export const createReportCard = async (req, res) => {
  try {
    const { studentId, grades, faults } = req.reportCard;

    const approved = getSituation(grades);

    const reportData = {
      studentId,
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

export const findReportCard = async (req, res) => {
  try {
    const id = req.id;

    const reportCard = await findByIdCardService(id);

    if (!reportCard) {
      res.status(404).send({ message: "Card not found" });
    }

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

    if (grades.length !== 4) {
      return res
        .status(400)
        .send({ message: "Must be passed 4 notes in the grades" });
    }

    const approved = getSituation(grades);

    await updateReportCardService(id, grades, faults, approved)

    res.status(200).send({ message: "Report card succesfully updated" });
  } catch (err) {
    res.status(500).send({ message: err.msg });
  }
};
