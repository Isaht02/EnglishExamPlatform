const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
	answers: [{
		text: { 
			type: String, 
			required: true 
		},
		isCorrectAnswer: { 
			type: Boolean, 
			required: true, 
			default: false
		},
	}],
	createdAt: {
		type: Date,
	},
})

module.exports = mongoose.model('questions', QuestionSchema)