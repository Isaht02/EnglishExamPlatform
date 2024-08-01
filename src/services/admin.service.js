const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin.model");
const User = require("../models/user.model");
const Role = require("../models/role.model")
const Exam = require("../models/exam.model");
const Question = require("../models/questions.model");
const Document = require("../models/document.model");
require("dotenv").config();

const signIn = async ({ email, password }) => {
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Email does not exist");
  }

  // if (admin.isBlocked) {
  //   throw new Error("Your account has been blocked");
  // }

  const validPassword = await bcrypt.compare(password, admin.password);
  if (!validPassword) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      level: admin.level,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "168h",
    }
  );

  return { token, admin };
};

//Admin
const createAdmin = async ({
  username,
  password,
  email,
  roleName,
}) => {
  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new Error("Email already exists");
  }

  const role = await Role.findOne({ roleName });
  if (!role) {
    throw new Error("Role not found!")
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newAdmin = await Admin.create({
    username,
    password: hashedPassword,
    email,
    role: role._id,
  });

  await newAdmin.save();
  return newAdmin;
};

const createUser = async ({
  email,
  password,
  firstname,
  lastname,
}) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    email,
    password: hashedPassword,
    firstname,
    lastname,
  });

  return newUser;
};

const getUser = async () => {
  const user = await User.find();
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const getExams = async () => {
  const exam = await Exam.find();
  if (!exam) {
    throw new Error("Exam not found");
  }
  return exam;
}

const getQuestions = async () => {
  const question = await Question.find();
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
}

const getDocuments = async () => {
  const document = await Document.find();
  if (!document) {
    throw new Error("Document not found");
  }
  return document;
}

const getExamById = async (id) => {
  const exam = await Exam.findById(id);
  if (!exam) {
    throw new Error("Exam not found");
  }
  return exam;
}

const getQuestionById = async (id) => {
  const question = await Question.findById(id);
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
}

const getDocumentById = async (id) => {
  const document = await Document.findById(id);
  if (!document) {
    throw new Error("Document not found");
  }
  return document;
}

const deleteExam = async (id) => {  
  const exam = await Exam.findByIdAndDelete(id);
  if (!exam) {
    throw new Error("Exam not found");
  }
  return exam;
}

const deleteQuestion = async (id) => {
  const question = await Question.findByIdAndDelete(id);
  if (!question) {
    throw new Error("Question not found");
  }
  return question;
}

const deleteDocument = async (id) => {
  const document = await Document.findByIdAndDelete(id);
  if (!document) {
    throw new Error("Document not found");
  }
  return document;
}

module.exports = {
  signIn,
  createAdmin,
  createUser,
  getUser,
  getUserById,
  deleteUser,
  getExams,
  getQuestions,
  getDocuments,
  getExamById,
  getQuestionById,
  getDocumentById,
  deleteExam,
  deleteQuestion,
  deleteDocument,
};
