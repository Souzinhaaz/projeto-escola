import mongoose from "mongoose";

export const validId = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message: "Invalid ID"})
    }

    req.id = id;
    next();
  } catch (err) {
    res.status(500).send({message: err.message})
  }
}