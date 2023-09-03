import { Router } from "express";
import { celebrate } from "celebrate";
import getUsers from "../controllers/Users/getUsers.js";
import getUserById from "../controllers/Users/getUserById.js";
import updateAvatar from "../controllers/Users/Me/updateAvatar.js";
import updateProfile from "../controllers/Users/Me/updateProfile.js";
import getMe from "../controllers/Users/Me/getMe.js";
import {
  authorizedUserSchema,
  patchUserSchema,
  patchAvatarSchema,
  userIdSchema,
} from "../ValidationSchemas/ValidationSchemas.js";

const userRouter = Router();

userRouter.get("/me", celebrate(authorizedUserSchema), getMe);
userRouter.patch("/me", celebrate(patchUserSchema), updateProfile);
userRouter.patch("/me/avatar", celebrate(patchAvatarSchema), updateAvatar);
userRouter.get("/", celebrate(authorizedUserSchema), getUsers);
userRouter.get("/:userId", celebrate(userIdSchema), getUserById);

export default userRouter;
