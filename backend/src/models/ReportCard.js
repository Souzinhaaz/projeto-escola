import mongoose from "mongoose"

const ReportCardSchema = new mongoose.Schema({
  grades: {
    type: Array,
    required: true
  },
  faults: {
    type: Number,
    required: true
  },
  approved: {
    type: Boolean,
    required: true
  },
  student: {
    type: mongoose.Types.ObjectId,
    ref: "Student",
    required: true
  }
})

const ReportCard = mongoose.model("ReportCard", ReportCardSchema);

export default ReportCard;