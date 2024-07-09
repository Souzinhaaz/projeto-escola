const router = require("express").Router();
const classController = require("../controllers/class.controller");
const { validId, validClass } = require("../middlewares/global.middleware");

router.post("/", classController.createClass);
router.get("/", classController.findClasses);
router.get("/:id", validId, validClass, classController.findClass)
router.patch("/:id", validId, validClass, classController.updateClass)
router.delete("/:id", validId, validClass, classController.deleteClass)

module.exports = router;
