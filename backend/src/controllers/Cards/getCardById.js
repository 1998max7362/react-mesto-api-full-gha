import card from "../../models/card.js";
import NotFoundIdError from "../../middlewares/Errors/customErrors/NotFoundIdError.js";

const getCardById = async (req, res, next) => {
  const { cardId } = req.params;
  try {
    const cards = await card.findById(cardId);
    if (!cards) {
      throw new NotFoundIdError("card");
    }
    res.send(cards);
  } catch (err) {
    next(err);
  }
};
export default getCardById;
