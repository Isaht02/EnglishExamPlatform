const Questions = require('../models/questions.models')
const mongoose = require('mongoose')

module.exports = {
	
	createQuestion: async function(req, res, next) {
        
        try {
            const newQuestion = new Question({
                text: req.body.questionText,
                answers: req.body.answers
            });
      
            const question = await newQuestion.save();
      
            res.json(question);
        }
		catch (error) {
			console.log(error)
			res.status(500)
		}
	},
}
