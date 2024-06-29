const Exam = require('../models/exam.model')
const EnrolledExam = require('../models/enrolledExam.model')
const questionsController = require('./questions.controller')

module.exports = {
	doAnExam: async function(req, res, next) {
		const { examID, answers } = req.body;
		try {
			let exam = await Exam.findById(req.params.id).populate("questions")
			if (exam == null) {
				return res.status(400)
			}

			let score = 0
			for (let quest of exam.questions) {
				for ({answerID, questionID} of answer) {
					if (questionID == quest._id) {
						let actualCorrectAnswer = quest.answer.find((answer) => answer.isCorrectAnswer == true)
					}
					if (actualCorrectAnswer._id == answerID) {
						overallScore += 10/exam.questions.length
					}
				}
			}

			let newEnrolledExam = new EnrolledExam({
				examID: examID,
				answers: answers,
				score: overallScore
			})
			const enrolledExam = await newEnrolledExam.save()

			return res.status(200).json(enrolledExam);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		}
	},

}
