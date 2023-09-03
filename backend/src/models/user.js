import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import validator from "validator";
import IncorrectUserEmailOrPasswordError from "../middlewares/Errors/customErrors/incorrectUserEmailOrPasswordError.js";

const userSchema = new Schema({
  name: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: "Жак-Ив Кусто",
  },
  about: {
    type: String, // about — это строка
    required: true, // оно должно быть у каждого пользователя, так что about — обязательное поле
    minlength: 2, // минимальная длина  — 2 символа
    maxlength: 30, // а максимальная — 30 символов
    default: "Исследователь",
  },
  avatar: {
    type: String, // имя — это строка
    required: true, // оно должно быть у каждого пользователя, так что имя — обязательное поле
    default:
      "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Некорректный e-mail", // это собщение никуда не выводится, но для себя я его добавли
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema
  .statics
  .findUserByCredentials = async function findUserByCredentials({ email, password }) {
    const foundUser = await this.findOne({ email }).select("+password");
    if (!foundUser) {
      throw new IncorrectUserEmailOrPasswordError();
    }
    const matchPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchPassword) {
      throw new IncorrectUserEmailOrPasswordError();
    }
    return foundUser;
  };

export default model("user", userSchema);
