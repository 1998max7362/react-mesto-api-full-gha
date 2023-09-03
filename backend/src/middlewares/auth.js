import jwt from "jsonwebtoken";
import NotAuthorizedError from "./Errors/customErrors/NotAuthorizedError.js";

const { NODE_ENV = "dev", SECRET_KEY = "some-secret-key" } = process.env;
let jwtSecret = SECRET_KEY;
if (NODE_ENV !== "production") {
  jwtSecret = "dev_secret";
}

const auth = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    throw new NotAuthorizedError();
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};

export default auth;
