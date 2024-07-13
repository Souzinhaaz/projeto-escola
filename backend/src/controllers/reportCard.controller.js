import { createReportCardService, findCardsService } from "../services/reportCard.service.js";
import { getSituation } from "../utils/getSituation.js";

export const createReportCard = async (req, res) => {
  try {
    const { grades, faults } = req.body;
    const student = req.student;

    if (!grades || !faults) {
      return res
        .status(400)
        .send({ message: "Submit all fields for registration!" });
    }

    if (grades.length !== 4) {
      return res
        .status(400)
        .send({ message: "Must be passed 4 notes in the grades" });
    }

    const approved = getSituation(grades);

    const reportData = {
      student,
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

export const findCards = async (req, res) => {
  try {
    const reportCards = await findCardsService();

    if (reportCards.length === 0) {
      return res.status(404).send({message: "Report Cards not found"});
    }

    res.status(200).send(reportCards);
  } catch (err) {
    res.status(500).send({message: err.message})
  }
}