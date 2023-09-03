import card from "../../models/card.js";
import NotFoundIdError from "../../middlewares/Errors/customErrors/NotFoundIdError.js";
import NotEnoughRightsError from "../../middlewares/Errors/customErrors/notEnoughRightsError.js";

const deleteCard = async (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  try {
    const foundCard = await card.findById({ _id: cardId });
    if (!foundCard) {
      throw new NotFoundIdError("card");
    }
    if (foundCard.owner.valueOf() !== userId) {
      throw new NotEnoughRightsError();
    }
    const removedCard = await card.deleteOne({ _id: cardId });
    res.send({ removedCard, message: "Пост удалён" });
  } catch (err) {
    next(err);
  }
};
export default deleteCard;
