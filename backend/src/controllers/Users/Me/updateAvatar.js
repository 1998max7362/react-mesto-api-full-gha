import user from "../../../models/user.js";

const updateAvatar = async (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  try {
    const newUser = await user.findByIdAndUpdate(
      _id,
      { avatar },
      { runValidators: true, new: true },
    );
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

export default updateAvatar;
