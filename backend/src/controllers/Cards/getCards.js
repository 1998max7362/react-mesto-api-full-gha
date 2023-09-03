import card from "../../models/card.js";

const getCards = async (req, res, next) => {
  try {
    const cards = await card.find({});
    res.send(cards);
  } catch (err) {
    next(err);
  }
};

export default getCards;
