import express from "express";
import boardRouter from "./apps/board/index.js";

const app = express();

app.use(express.json())
app.use("/api/boards", boardRouter);

app.get("/", (req, res) => {
  return res.json({
    status: "ok",
    service: "canny-clone-api",
  });
});

export default app;
