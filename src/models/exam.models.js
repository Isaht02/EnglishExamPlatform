const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ExamSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	level: {
		type: String,
		enum: ["primarySchool", "secondarySchool", "highSchool", "IELTS", "TOEIC", "TOEFL"],
		required: true
	},
	questions: [{ 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'questions' 
	}],
  	createdBy: { 
		type: mongoose.Schema.Types.ObjectId, 
		ref: 'users' 
	},
  	createdAt: { 
		type: Date, default: 
		Date.now 
	},
  	updatedAt: { 
		type: Date, 
		default: Date.now 
	}

})

module.exports = mongoose.model('exam', ExamSchema)