/** @format */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Conversation = new Schema({
  sender_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  receiver_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("conversation", Conversation);
