const mongoose = require("mongoose")

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  parentTelephone: {
    type: String,
    required: true,
  },
  schoolClass: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  reportCard: {
    type: mongoose.Types.ObjectId,
    required: true
  }
})

const Student = mongoose.model("student", StudentSchema);

module.exports = Student;