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


const app = express();

app.use(
  cors({
    origin: env.FRONTEND_URL,
    credentials: true,
  }),
);
app.use(express.json());
app.use(helmet());

app.use("/uploads", express.static("uploads"));

app.use("/api/boards", boardRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/comments", commentRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  return res.json({
    status: "ok",
    service: "canny-clone-api",
  });
});

export default app;
