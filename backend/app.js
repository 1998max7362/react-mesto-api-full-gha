import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { errors } from "celebrate";
import { mongoose } from "mongoose";
import cookieParser from "cookie-parser";
// import helmet from "helmet"; // c Helmet падают автотесты
import corsAllow from "./src/middlewares/CORS.js";
import errorHandler from "./src/middlewares/Errors/errorHandler.js";
import cardRouter from "./src/routes/cardRoutes.js";
import userRouter from "./src/routes/userRoutes.js";
import limiter from "./src/middlewares/rateLimit.js";
import authRouter from "./src/routes/authRoutes.js";
import auth from "./src/middlewares/auth.js";
import WrongRouteError from "./src/middlewares/Errors/customErrors/WrongRouteError.js";
import { requestLogger, errorLogger } from "./src/middlewares/logger.js";

const { PORT = 3000, MONGODB_URL = "mongodb://0.0.0.0:27017/mestodb " } = process.env;

try {
  await mongoose.connect(MONGODB_URL);
  console.log("Database connection success");
} catch (err) {
  console.log(err);
}

const app = express();
app.use(cookieParser());
app.disable("x-powered-by");
app.use(limiter);
// app.use(helmet);
app.all("*", corsAllow);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use("/", authRouter);
app.use("/users", auth, userRouter);
app.use("/cards", auth, cardRouter);
app.use("*", () => {
  throw new WrongRouteError();
});
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
