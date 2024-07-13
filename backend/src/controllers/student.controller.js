import { createStudentService } from "../services/student.service.js"

export const createStudent = async (req, res) => {
  try {
    const { name, email, parentTelephone } = req.body;
    const schoolClass = req.studentClass;

    if (!name || !email || !parentTelephone) {
      return res.status(400).send({ message: "Submit all fields for registration!" });
    }

    const studentData = {
      schoolClass,
      name,
      email,
      parentTelephone,
    }

    const student = await createStudentService(studentData);

    if (!student) {
      return res
        .status(400)
        .send({ message: "Occured an error trying to create the student" });
    }

    res.status(201).send({ message: "Student created succesfully", student: student });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
