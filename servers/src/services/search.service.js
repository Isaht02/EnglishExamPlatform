/** @format */

const Exam = require("../models/exam.model");
const { ExamLevel } = require("../config/enums");
class SearchService {
  async search({
    type,
    level,
    title,
    createdBy,
    user_tests_min,
    user_tests_max,
    user_views_min,
    user_views_max,
    test_rate,
  }) {
    try {
      const $match = { $text: { $search: title } };

      if (type) $match.type = type;
      if (level) $match.level = level;
      if (createdBy) $match.createdBy = createdBy;
      if (user_tests_min && user_tests_max) {
        $match.user_tests = { $gte: user_tests_min, $lte: user_tests_max };
      } else {
        if (user_tests_min) $match.user_tests = { $gte: user_tests_min };
        if (user_tests_max) $match.user_tests = { $lte: user_tests_max };
      }
      if (user_views_min) $match.user_views = { $gte: user_views_min };
      if (user_views_max) $match.user_views = { $lte: user_views_max };
      if (test_rate) $match.test_rate = test_rate;

      console.log($match);
      console.log(level)
      const result = await Exam.aggregate([
        {
          $match: {
            $text: {
              $search: title,
            },
            level: Number(level),
            type: Number(type),
            user_tests: {
              $gte: Number(user_tests_min),
              $lte: Number(user_tests_max),
            },
            user_views: {
              $gte: Number(user_views_min),
              $lte: Number(user_views_max),
            },
          },
        },
        {
          $lookup: {
            from: "reviewexams",
            localField: "test_rate",
            foreignField: "_id",
            as: "result",
          },
        },
        {
          $addFields: {
            rate_count: {
              $size: "$result",
            },
            rate_avg: {
              $avg: "$result.test_rate",
            },
          },
        },
        {
          $match: {
            rate_avg: Number(test_rate)
          },
        },
      ]);
      return result;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

module.exports = new SearchService();
