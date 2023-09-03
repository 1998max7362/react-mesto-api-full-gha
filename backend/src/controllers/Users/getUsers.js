import user from "../../models/user.js";

const getUsers = async (req, res, next) => {
  try {
    const users = await user.find({});
    res.send(users);
  } catch (err) {
    next(err);
  }
};
export default getUsers;
