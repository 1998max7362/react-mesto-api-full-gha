/* eslint-disable no-param-reassign */
const error11000Transform = (err) => {
  err.statusCode = 409;
  err.message = "Пользователь с данным e-mail уже существует";
};

export default error11000Transform;
