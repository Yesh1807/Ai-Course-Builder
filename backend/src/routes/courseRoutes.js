const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { createCourse } = require("../controllers/courseController");
const {
  getMyCourses,
  getCourseById,
} = require("../controllers/courseQueryController");

const router = express.Router();

router.use(authenticate);

router.get("/", getMyCourses);
router.get("/:id", getCourseById);
router.post("/", createCourse);

module.exports = router;
