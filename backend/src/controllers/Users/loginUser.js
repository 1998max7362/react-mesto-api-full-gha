import jwt from "jsonwebtoken";
import user from "../../models/user.js";

const { NODE_ENV = "dev", SECRET_KEY = "some-secret-key" } = process.env;
let jwtSecret = SECRET_KEY;
if (NODE_ENV !== "production") {
  jwtSecret = "dev_secret";
}

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const foundUser = await user.findUserByCredentials({ email, password });
    const token = jwt.sign({ _id: foundUser._id }, jwtSecret, {
      expiresIn: "7d",
    });
    res
      .cookie("jwt", token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        // браузер говорит, что куки и-за перенаправления пришли не с оригинального сайта.
        //  Полный текст ошибки в браузере. Не смог разобраться:(
        // this attempt to set a cookie via a set-cookie header was blocked because it had the
        //  {PH1} attribute but came from a cross-site response wich was not the response to
        //  a top-level navigation
        sameSite: true,
      })
      .send({ message: "Авторизация прошла успешно", token }); // Добавил токен в тело, чтоб не переделывать фронт под куки
  } catch (err) {
    next(err);
  }
};

export default loginUser;
