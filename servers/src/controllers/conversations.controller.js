/** @format */
const conversationService = require("../services/conversation.service");

module.exports = {
  getConversationsController: async function (req, res, next) {
    try {
      const { receiver_id } = req.params;
      const sender_id = req.user._id;
      const result = await conversationService.getConversations({
        sender_id,
        receiver_id,
      });
      return res.json({
        result: {
          conversations: result.conversations,
        },
        message: "Get conversations successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  },
};
