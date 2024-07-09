const mongoose = require("mongoose");
const classService = require("../services/class.service");

const validId = (req, res, next) => {
  try {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({message: "ID not valid"})
    }
  
    next();
  } catch (err) {
    res.status(500).send({message: err.message})
  }
};

const validClass = async (req, res, next) => {
  try {
    const id = req.params.id;
    
    const user = await classService.findClassService(id);

    if (!user) {
      return res.status(404).send({message: "User does not exist!"})
    }

    req.id = id;
    req.user = user;

    next();
  } catch (err) {
    res.status(500).send({message: err.message})
  }
}

module.exports = {
  validId,
  validClass
}