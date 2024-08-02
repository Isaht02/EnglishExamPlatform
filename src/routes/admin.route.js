const express = require("express");
const { 
  createAdmin,
  getUser,
  getUserById,
  createUser,
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
} = require("../controllers/admin.controller");
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

router.get("/admin/exam", authorization('admin'), getExams)
router.get("/admin/question", authorization('admin'), getQuestions)
router.get("/admin/document", authorization('admin'), getDocuments)

router.get("/admin/exam/:id", authorization('admin'), getExamById)
router.get("/admin/question/:id", authorization('admin'), getQuestionById)
router.get("/admin/document/:id", authorization('admin'), getDocumentById)

router.delete("/admin/exam/:id", authorization('admin'), deleteExam)
router.delete("/admin/question/:id", authorization('admin'), deleteQuestion)
router.delete("/admin/document/:id", authorization('admin'), deleteDocument)

module.exports = router;