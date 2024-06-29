const express = require('express')
const QuestionsController = require('../src/controllers/questions.controllers')
const router = express.Router()

router.post('/', QuestionsController.createQuestion)
router.get('/', QuestionsController.createQuestion)

module.exports = router