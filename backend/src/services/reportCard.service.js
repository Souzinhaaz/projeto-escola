import ReportCard from "../models/ReportCard.js";

export const createReportCardService = (body) => ReportCard.create(body);

export const findCardsService = () => ReportCard.find();

export const deleteCardService = (id) => ReportCard.findByIdAndDelete(id);