const Comment = require("../models/Comment");
const Post = require("../models/Post");

//add

async function addComment(postId, comment) {
  const newComment = await Comment.create(comment);

  await Post.findByIdAndUpdate(postId, { $push: { comments: newComment } }); //привязали комент к посту

  await newComment.populate("author"); //получили автора коментария из ID

  return newComment;
}

//delete
async function deleteComment(postId, commentId) {
  await Comment.deleteOne({ _id: commentId }); //удаление коментария
  await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } }); //удаление коментария из поста
}

module.exports = {
  addComment,
  deleteComment,
};
