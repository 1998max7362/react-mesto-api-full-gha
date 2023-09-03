import user from "../../../models/user.js";

const updateProfile = async (req, res, next) => {
  const { name, about } = req.body;
  const { _id } = req.user;
  try {
    const newUser = await user.findByIdAndUpdate(
      _id,
      { name, about },
      { runValidators: true, new: true },
    );
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

export default updateProfile;
