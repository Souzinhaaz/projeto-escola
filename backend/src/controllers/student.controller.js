import {
  createStudentService,
  deleteStudentService,
  findStudentByIdService,
  findStudentsService,
} from "../services/student.service.js";
import mongoose from "mongoose";

export const createStudent = async (req, res) => {
  try {
    const studentData = req.student;

    const student = await createStudentService(studentData);

    if (!student) {
      return res
        .status(400)
        .send({ message: "Occured an error trying to create the student" });
    }

    res
      .status(201)
      .send({ message: "Student created succesfully", student: student });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findStudents = async (req, res) => {
  try {
    const students = await findStudentsService();

    if (students.length === 0) {
      return res.status(404).send({ message: "There isn't any student" });
    }

    res.status(200).send(students);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const findStudentById = async (req, res) => {
  try {
    const id = req.id;

    const student = await findStudentByIdService(id);

    if (!student) {
      res.status(404).send({ message: "Student not found" });
    }

    res.status(200).send(student);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const { schoolClass, name, email, parentTelephone } = req.student;
    const id = req.id;



  } catch (err) {
    res.status(500).send({message: err.message})
  }
}

export const deleteStudentById = async (req, res) => {
  try {
    const id = req.id;

    await deleteStudentService(id);

    res.status(200).send({message: "Student deleted successfully!"})
  } catch (err) {
    res.status(500).send({message: err.message})
  }
}
