import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
  schoolClass: {
    type: mongoose.Types.ObjectId,
    required: true
  },
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
  }
})

const Student = mongoose.model("student", StudentSchema);

export default Student;