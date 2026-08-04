import express from "express";
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "./auth.controller.js";

const router = express.Router();
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Authenticate a user and return a JWT.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", login);
/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             full_name: John Doe
 *             email: john@example.com
 *             password: password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 *       409:
 *         description: Email already exists
 */
router.post("/register", register);
/**
 * @openapi
 * /auth/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Request password reset
 *     description: Sends a password reset email if the account exists.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             email: user@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: Validation error
 */
router.post("/forgot-password", forgotPassword);
/**
 * @openapi
 * /auth/reset-password/{resetToken}:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset password
 *     description: Reset user password using a valid reset token.
 *     parameters:
 *       - in: path
 *         name: resetToken
 *         required: true
 *         schema:
 *           type: string
 *         example: a8f92bd82f8c4d...
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             password: newPassword123
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid or expired token
 */
router.post("/reset-password/:resetToken", resetPassword);

export default router;
