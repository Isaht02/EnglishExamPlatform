const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	email: {
		type:String,
		required: true,
		unique: true
	},
	password: { 
		type: String,
		required: true
	},
	fullname: {
		type: String,
		require: true
	},
	type: {
		enum: ["student", "teacher", "admin"],
		type: String,
		default: "student",
	},
	enrolledExams: [{ // view exam done => check final grade
		type: mongoose.Schema.Types.ObjectId,
		ref: "enrolledExam"
	}],
	createdExams: [{// exam create by
		type: ObjectID,
		ref: "exam",
	}],
	questions: [{ // lists quest by
		type: mongoose.Schema.Types.ObjectId,
		ref: "questions",
	}],
	createdAt: {
		type: Date,
	},
})

module.exports = mongoose.model('user', UserSchema)