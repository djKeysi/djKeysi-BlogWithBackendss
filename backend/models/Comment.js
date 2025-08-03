const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true } // монгуст создаст два поля createdAt и updatedAt(дата создания и дата редактирования этого документа)
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
