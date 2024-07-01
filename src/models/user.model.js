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
	createdAt: {
		type: Date,
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;