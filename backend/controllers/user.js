const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generate, verify } = require("../helpers/token");
const ROLES = require("../constants/roles");
//register

async function register(login, password) {
  if (!password) {
    throw new Error("Password is empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ login, password: passwordHash });
  const token = generate({ id: user.id }); //вход сразу после регистрации
  return { user, token };
}

//login

async function login(login, password) {
  const user = await User.findOne({ login });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password); //сравниваем наш пароль и пароль  который хранится
  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = generate({ id: user.id });

  return { user, token };
}

//ищим всех пользователей
function getUsers() {
  return User.find();
}
//получение ролей пользователя
function getRoles() {
  return [
    { id: ROLES.ADMIN, name: "Admin" },
    { id: ROLES.MODERATOR, name: "Moderator" },
    { id: ROLES.USER, name: "User" },
  ];
}

//delete user
function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

//edit (roles) user
function updateUser(id, userData) {
  return User.findByIdAndUpdate(id, userData, { returnDocument: "after" }); // { returnDocument: "after" } - возвращаем обновленного пользователя
}

module.exports = {
  register,
  login,
  getUsers,
  getRoles,
  deleteUser,
  updateUser,
};
