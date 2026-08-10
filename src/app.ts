import express from "express";
import boardRouter from "@/apps/board/index.js";
import postRouter from "@/apps/post/index.js";
import userRouter from "@/apps/user/index.js";
import authRouter from "@/apps/auth/index.js";
import commentRouter from "@/apps/comment/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import helmet from "helmet";
import cors from "cors";
import env from "./config/env.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "@/docs/swagger.js";
import { httpLogger } from "./middlewares/logger.middleware.js";

const app = express();
// app.use(httpLogger);
app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(helmet());

app.use("/uploads", express.static("uploads"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  return res.json({
    status: "ok",
    service: "canny-clone-api",
  });
});

export default app;
