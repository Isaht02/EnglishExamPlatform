const express = require('express')
const ExamController = require('../controllers/exam.controller')
const router = express.Router()

router.post('/', ExamController.createExamByLevel)
router.get('/', ExamController.getExams)

module.exports = router