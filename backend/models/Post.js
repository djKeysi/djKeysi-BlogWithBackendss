const mongoose = require("mongoose");
const validator = require("validator");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: validator.isURL,
        message: "Image should be a valid URL",
      },
    },
    content: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true } // монгуст создаст два поля createdAt и updatedAt(дата создания и дата редактирования этого документа)
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
