import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true
  }
})

const Class = mongoose.model("class", ClassSchema);

export default Class;