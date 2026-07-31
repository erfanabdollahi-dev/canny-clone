import express from "express";
import { getBoards } from "./board.controller.js";

const router = express.Router();

router.get("/", getBoards);

export default router;
