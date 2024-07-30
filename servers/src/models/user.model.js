const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
		type: mongoose.Schema.Types.ObjectID,
		ref: "exam",
	}],
	questions: [{ // lists quest by
		type: mongoose.Schema.Types.ObjectId,
		ref: "questions",
	}],
	createdAt: {
		type: Date,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;