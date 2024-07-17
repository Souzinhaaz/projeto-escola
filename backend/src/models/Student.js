import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
  schoolClass: {
    type: mongoose.Types.ObjectId,
    ref: "Class",
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

const Student = mongoose.model("Student", StudentSchema);

export default Student;