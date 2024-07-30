const express = require('express')
const QuestionsController = require('../controllers/questions.controller')
const authorization = require("../middlewares/authorization.middleware")
const router = express.Router()

router.post('/', authorization, QuestionsController.createQuestion)
router.get('/', authorization, QuestionsController.getAllQuestion)

module.exports = router