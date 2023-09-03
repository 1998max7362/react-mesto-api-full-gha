// import user from "../../models/user.js";
import user from "../../../models/user.js";
import NotFoundIdError from "../../../middlewares/Errors/customErrors/NotFoundIdError.js";

const getMe = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const users = await user.findById(_id);
    if (!users) {
      throw new NotFoundIdError("user");
    }
    res.send(users);
  } catch (err) {
    next(err);
  }
};

export default getMe;
