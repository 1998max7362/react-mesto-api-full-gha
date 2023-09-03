import user from "../../models/user.js";
import NotFoundIdError from "../../middlewares/Errors/customErrors/NotFoundIdError.js";

const getUserById = async (req, res, next) => {
  const _id = req.params.userId;
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

export default getUserById;
