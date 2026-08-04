import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "./post.controller.js";
import { authMiddleware } from "@/middlewares/auth.middleware.js";
import { toggleVote } from "../vote/vote.controller.js";
import { createComment, getComments } from "../comment/comment.controller.js";
import upload from "@/middlewares/upload.middleware.js";

const router = express.Router();
/**
 * @openapi
 * /posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts
 *     description: Returns a paginated list of posts with optional filtering and search.
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 */
router.get("/", getPosts);
/**
 * @openapi
 * /posts/{id}/comments:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comments of a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123abc456def789
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       404:
 *         description: Post not found
 */
router.get("/:id/comments", getComments);
/**
 * @openapi
 * /posts/{id}/comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Create a comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123abc456def789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             content: This is a great idea!
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/:id/comments", authMiddleware, createComment);
/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get a single post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123abc456def789
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 */
router.get("/:id", getPost);
/**
 * @openapi
 * /posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           example:
 *             title: New feature request
 *             description: Add dark mode
 *             board: 65f123abc456def789
 *             status: OPEN
 *             image: example.jpg
 *     responses:
 *       201:
 *         description: Post created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/",authMiddleware,upload.single("image"), createPost);
/**
 * @openapi
 * /posts/{id}:
 *   patch:
 *     tags:
 *       - Posts
 *     summary: Update a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65f123abc456def789
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Updated title
 *             description: Updated description
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       401:
 *         description: Unauthorized
 */
router.patch("/:id",authMiddleware, updatePost);
/**
 * @openapi
 * /posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id",authMiddleware, deletePost);
/**
 * @openapi
 * /posts/{id}/vote:
 *   post:
 *     tags:
 *       - Votes
 *     summary: Toggle vote on a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Vote toggled successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/vote', authMiddleware, toggleVote);



export default router;
