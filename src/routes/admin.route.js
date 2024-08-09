const express = require("express");
const { 
  createAdmin,
  getUser,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
  getExams,
  getQuestions,
  getDocuments,
  getExamById,
  getQuestionById,
  getDocumentById,
  deleteExam,
  deleteQuestion,
  deleteDocument,
} = require("../controllers/admin.controller");
const QuestionsController = require('../controllers/questions.controller')
const ExamController = require('../controllers/exam.controller')
const authorization = require("../middlewares/authorization.middleware");
const router = express.Router();

router.post("/admin", authorization('admin'), createAdmin);

router
  .route("/admin/user")
  .get(authorization('admin'), getUser)
  .post(authorization('admin'), createUser)
  
router
  .route("/admin/user/:id")
  .get(authorization('admin'), getUserById)
  .delete(authorization('admin'), deleteUser)
  .put(authorization('admin'), updateUser)

router.get("/admin/exam", authorization('admin'), getExams)
router.post('/admin/exam', authorization('admin'), ExamController.createExamByLevel)
router.get("/admin/question", authorization('admin'), getQuestions)
router.post("/admin/question", authorization('admin'), QuestionsController.createQuestion)
router.get("/admin/document", authorization('admin'), getDocuments)

router.get("/admin/exam/:id", authorization('admin'), getExamById)
router.get("/admin/question/:id", authorization('admin'), getQuestionById)
router.get("/admin/document/:id", authorization('admin'), getDocumentById)

router.delete("/admin/exam/:id", authorization('admin'), deleteExam)
router.delete("/admin/question/:id", authorization('admin'), deleteQuestion)
router.delete("/admin/document/:id", authorization('admin'), deleteDocument)

module.exports = router;