import ReportCard from "../models/ReportCard.js";

export const createReportCardService = (body) => ReportCard.create(body);

export const findStudentByReportCard = (studentId) =>
  ReportCard.findOne({ student: studentId }).populate("student");

export const findCardsService = () => ReportCard.find().populate("student");

export const findByIdCardService = (id) => ReportCard.findById(id).populate("student");

export const updateReportCardService = (id, grades, faults, approved) =>
  ReportCard.findOneAndUpdate({ _id: id }, { grades, faults, approved });

export const deleteCardService = (id) => ReportCard.findOneAndDelete({_id: id});
