const express = require('express')
const ExamController = require('../controllers/exam.controller')
const StudentController = require('../controllers/student.controller')
const router = express.Router()

router.post('/', ExamController.createExamByLevel)
router.get('/', ExamController.getExams)
router.post('/taketest/:id', StudentController.doAnExam)

module.exports = router