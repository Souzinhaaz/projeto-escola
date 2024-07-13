import mongoose from "mongoose"

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/api-escola")
    console.log("MongoDB connected Succesfully")
  } catch (err) {
    console.error("Occured an error trying to connect to the database")
  }
}

export default connectDB;