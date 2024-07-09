const router = require("express").Router();
const studentController = require("../controllers/student.controller")

router.get("/", studentController.createStudent);

module.exports = router;