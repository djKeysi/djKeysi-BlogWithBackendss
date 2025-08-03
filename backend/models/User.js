const mongoose = require("mongoose");
const roles = require("../constants/roles");

const UserSchema = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: roles.USER,
    },
  },
  { timestamps: true } // монгуст создаст два поля createdAt и updatedAt(дата создания и дата редактирования этого документа)
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
