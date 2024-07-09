const mongoose = require("mongoose")

const ReportCardSchema = new mongoose.Schema({
  grades: {
    type: Array,
    required: true
  },
  faults: {
    type: Number,
    required: true
  },
  situation: {
    type: Boolean,
    required: true
  }
})

const ReportCard = mongoose.model("reportCard", ReportCardSchema);

module.exports = ReportCard;