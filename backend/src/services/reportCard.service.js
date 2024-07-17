import ReportCard from "../models/ReportCard.js";

export const createReportCardService = (body) => ReportCard.create(body);

export const findStudentByReportCard = (studentId) =>
  ReportCard.findOne({ student: studentId });

export const findCardsService = () => ReportCard.find();

export const findByIdCardService = (id) => ReportCard.findById(id);

export const updateReportCardService = (id, grades, faults, approved) =>
  ReportCard.findByIdAndUpdate({ _id: id }, { grades, faults, approved });

export const deleteCardService = (id) => ReportCard.findByIdAndDelete(id);
