const express = require('express')
const ExamController = require('../controllers/exam.controller')
const StudentController = require('../controllers/student.controller')
const authorization = require("../middlewares/authorization.middleware")
const router = express.Router()

router.post('/', authorization, ExamController.createExamByLevel)
router.get('/', authorization, ExamController.getExams)
router.post('/taketest/:id', authorization, StudentController.doAnExam)

module.exports = router