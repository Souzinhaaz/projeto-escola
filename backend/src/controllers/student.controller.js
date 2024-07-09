const studentService = require("../services/student.service");

const createStudent = async (req, res) => {
  try {
    const { name, email, parentTelephone, schoolClass, reportCard } = req.body;

    if (!name || !email || !parentTelephone || !schoolClass || !reportCard) {
      res.status(400).send({ message: "Submit all fields for registration!" });
    }

    const student = await studentService.createStudentService(req.body);

    if (!student) {
      res
        .status(400)
        .send({ message: "Occured an error trying to create the student" });
    }

    res.status(201).send({ message: "Student created succesfully", student });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  createStudent,
};
