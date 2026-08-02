import express from "express";
import boardRouter from "@/apps/board/index.js";
import postRouter from "@/apps/post/index.js";
import userRouter from "@/apps/user/index.js";
import authRouter from "@/apps/auth/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api/boards", boardRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  return res.json({
    status: "ok",
    service: "canny-clone-api",
  });
});

export default app;
