import express from "express";
import {
  createUser,
  deleteUser,
  getMe,
  getUser,
  getUsers,
  updateUser,
} from "./user.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/me", authMiddleware, getMe);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
