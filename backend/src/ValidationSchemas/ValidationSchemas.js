import Joi from "joi";
import urlRegex from "../utils/constants.js";

export const signInSchema = {
  body: Joi.object()
    .keys({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().uri().regex(urlRegex),
    })
    .unknown(true),
};

export const cardIdSchema = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
};

export const likeCardAchema = {
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
    user: Joi.object().keys({
      _id: Joi.string().length(24).hex().required(),
    }),
  }),
};

export const postCardSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).required(),
      link: Joi.string().uri().required().regex(urlRegex),
    })
    .unknown(true),
  params: Joi.object()
    .keys({
      user: Joi.object().keys({
        _id: Joi.string().length(24).hex().required(),
      }),
    })
    .unknown(true),
};

export const authorizedUserSchema = {
  params: Joi.object()
    .keys({
      user: Joi.object().keys({
        _id: Joi.string().length(24).hex().required(),
      }),
    })
    .unknown(true),
};

export const patchUserSchema = {
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    })
    .unknown(true),
  params: Joi.object()
    .keys({
      user: Joi.object().keys({
        _id: Joi.string().length(24).hex().required(),
      }),
    })
    .unknown(true),
};

export const patchAvatarSchema = {
  body: Joi.object()
    .keys({
      avatar: Joi.string().uri().required().regex(urlRegex),
    })
    .unknown(true),
  params: Joi.object()
    .keys({
      user: Joi.object().keys({
        _id: Joi.string().length(24).hex().required(),
      }),
    })
    .unknown(true),
};

export const userIdSchema = {
  params: Joi.object()
    .keys({
      userId: Joi.string().length(24).hex().required(),
      user: Joi.object().keys({
        _id: Joi.string().length(24).hex().required(),
      }),
    })
    .unknown(true),
};
