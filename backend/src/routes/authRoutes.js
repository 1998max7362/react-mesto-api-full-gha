import { Router } from "express";
import { celebrate } from "celebrate";

import postUser from "../controllers/Users/postUser.js";
import loginUser from "../controllers/Users/loginUser.js";
import { signInSchema } from "../ValidationSchemas/ValidationSchemas.js";

const authRouter = Router();

authRouter.post("/signup", celebrate(signInSchema), postUser);
authRouter.post("/signin", celebrate(signInSchema), loginUser);

export default authRouter;
