import express from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "./user.controller.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);
router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
