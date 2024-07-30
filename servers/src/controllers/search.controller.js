/** @format */
const Exam = require("../models/exam.model");
const QuestionsSchema = require("../models/questions.model");
const searchService = require("../services/search.service");

module.exports = {
  searchController: async function (req, res, next) {
    try {
      const result = await searchService.search({
        type: req.query.type || "",
        level: req.query.level || "",
        title: req.query.title || "",
        createdBy: req.query.createdBy || "",
        user_tests_min: req.query.user_tests_min || "",
        user_tests_max: req.query.user_tests_max || "",
        user_views_min: req.query.user_views_min || "",
        user_views_max: req.query.user_views_max || "",
        test_rate: req.query.test_rate || "",
      });
      return res.status(200).json({ message: "Get all exams", data: result});
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
