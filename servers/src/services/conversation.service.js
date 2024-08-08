/** @format */
const ReviewExam = require("../models/schemas/reviewExam.model");

class ConversationService {
  async getConversations({ sender_id, receiver_id }) {
  const match = {
    $or: [
      {
        sender_id: new ObjectId(sender_id),
        receiver_id: new ObjectId(receiver_id)
      },
      {
        sender_id: new ObjectId(receiver_id),
        receiver_id: new ObjectId(sender_id)
      }
    ]
  };
  const conversations = await databaseService.conversations
    .find(match)
    .sort({ created_at: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
  const total = await databaseService.conversations.countDocuments(match);
  return {
    conversations,
    total
  };
}
}

module.exports = new ConversationService();
