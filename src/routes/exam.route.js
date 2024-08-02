const express = require('express')
const ExamController = require('../controllers/exam.controller')
const StudentController = require('../controllers/student.controller')
const authorization = require("../middlewares/authorization.middleware")
const router = express.Router()

router.post('/', authorization('teacher'), ExamController.createExamByLevel)
router.get('/', authorization('student'), ExamController.getExams)
router.post('/taketest/:id', authorization('student'), StudentController.doAnExam)

module.exports = router