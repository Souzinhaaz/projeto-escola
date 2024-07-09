const Student = require("../models/Student");

const createStudentService = (body) => Student.create(body);


module.exports = {
  createStudentService
}