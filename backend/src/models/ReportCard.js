import mongoose from "mongoose"

const ReportCardSchema = new mongoose.Schema({
  student: {
    type: mongoose.Types.ObjectId,
    required: true
  },
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
})

const ReportCard = mongoose.model("reportCard", ReportCardSchema);

export default ReportCard;