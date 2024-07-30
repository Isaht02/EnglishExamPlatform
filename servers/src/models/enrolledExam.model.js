const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EnrolledExamSchema = new Schema({
	examID: {
		type: String,
		required: true
	},
	answers: [{ 
		type: String,
	}],
  	score: { 
		type: Number, 
	},
  	startTime: { 
		type: Date, 
		default: Date.now 
	},
	completed: { 
		type: Boolean,
		required: true,
		defaut: false
	},

})

module.exports = mongoose.model('enrolledExam', EnrolledExamSchema)