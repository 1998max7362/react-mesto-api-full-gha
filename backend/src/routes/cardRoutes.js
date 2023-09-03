import { Router } from "express";
import { celebrate } from "celebrate";
import getCards from "../controllers/Cards/getCards.js";
import getCardById from "../controllers/Cards/getCardById.js";
import postCard from "../controllers/Cards/postCard.js";
import likeCard from "../controllers/Cards/likeCard.js";
import dislikeCard from "../controllers/Cards/dislikeCard.js";
import deleteCard from "../controllers/Cards/deleteCard.js";
import {
  cardIdSchema,
  postCardSchema,
  likeCardAchema,
  authorizedUserSchema,
} from "../ValidationSchemas/ValidationSchemas.js";

const cardRouter = Router();

cardRouter.get("/", celebrate(authorizedUserSchema), getCards);
cardRouter.get("/:cardId", celebrate(cardIdSchema), getCardById);
cardRouter.post("/", celebrate(postCardSchema), postCard);
cardRouter.delete("/:cardId", celebrate(likeCardAchema), deleteCard);
cardRouter.put("/:cardId/likes", celebrate(likeCardAchema), likeCard);
cardRouter.delete("/:cardId/likes", celebrate(likeCardAchema), dislikeCard);

export default cardRouter;
