import { AppError } from "@/error/app-error.js";
import type { NextFunction, Request, Response } from "express";
import fs from "node:fs/promises";
import { ZodError } from "zod";
type ExpressError = Error & {
  status?: number;
  body?: unknown;
};
export const errorMiddleware = async (
  err: ExpressError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (req.file) {
    try {
      await fs.unlink(req.file.path);
    } catch {
      // Ignore cleanup errors
    }
  }

  // Invalid JSON body
  if (err instanceof SyntaxError && err.status === 400 && err.body) {
    return res.status(400).json({
      message: "Invalid JSON format",
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      message: "Validation Faild",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  console.error(err);

  return res.status(500).json({
    message: "Internal Server Error",
  });
};
