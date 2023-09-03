import bcrypt from "bcrypt";
import user from "../../models/user.js";

const postUser = async (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    const resData = newUser.toObject();
    delete resData.password;
    res.status(201).send({ user: resData });
  } catch (err) {
    next(err);
  }
};

export default postUser;
