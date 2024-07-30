const express = require('express')
const QuestionsController = require('../controllers/questions.controller')
const router = express.Router()

router.post('/', QuestionsController.createQuestion)
router.get('/', QuestionsController.getAllQuestion)

module.exports = router