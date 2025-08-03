const Post = require("../models/Post");
//add

async function addPost(post) {
  const newPost = await Post.create(post);
  await newPost.populate({
    path: "comments",
    populate: "author",
  });
  return newPost;
}
//edit

async function editPost(id, post) {
  const newPost = await Post.findByIdAndUpdate(id, post, {
    returnDocument: true,
  });
  await newPost.populate({
    path: "comments",
    populate: "author",
  });
  return newPost;
}

//delete

function deletePost(id) {
  return Post.deleteOne({ _id: id });
}

//get list with search and pagination
async function getPosts(search = "", limit = 10, page = 1) {
  // limit сколько страниц выводить,  page номер страницы
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: "i" } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }), // поиск поcтов, i - 'регистронезависимый', limit для того чтобы отрезать нужное количество постов
    //skip - какое количество постов пропустить
    //sort - сортировка по убыванию, если 1 - по возрастанию то есть самые старые посты были бы в начале
    Post.countDocuments({ title: { $regex: search, $options: "i" } }), //посчитаем а сколько вообще постов есть
  ]);

  return {
    posts,
    lastPage: Math.ceil(count / limit),
  };
}

// get item
function getPost(id) {
  return Post.findById(id).populate({
    path: "comments",
    populate: "author",
  });
}

module.exports = {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getPost,
};
