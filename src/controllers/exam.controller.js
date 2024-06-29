const Exam = require('../models/exam.model')
const QuestionsSchema = require('../models/questions.model')

module.exports = {
	
	createExamByLevel: async function(req, res, next) {
		try {
			let randomQuestion = new Set()
			let questions = await QuestionsSchema.find({level: req.body.level}).limit(30)

			for (let question in questions) {
				if (randomQuestion.size >= 5) 
					break
				randomQuestion.add(questions[Math.floor(Math.random() * questions.length)]._id)
			}
			const newExam = new Exam({
				title: req.body.title,
				questions: Array.from(randomQuestion)
			})
			const examByLevel = await newExam.save();
			return res.status(200).json(examByLevel);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		}
	},
	getExams: async function(req, res, next) {
		try {
			let exams = await Exam.find().populate("questions")
			return res.status(200).json(exams);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		} 
	},
	getExamById: async function(req, res, next) {
		try {
			let exams = await Exam.findById(req.params.id).populate("questions")
			return res.status(200).json(exams);
		}
		catch (error) {
			console.log(error)
			res.status(500)
		} 
	}
}
