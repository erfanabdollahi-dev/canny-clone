import { UserRole } from "@/apps/user/user.types.js"
import { AppError } from "@/error/app-error.js"
import type { NextFunction, Request, Response } from "express"



export const requireAdmin = (
  req: Request,
  res : Response,
  next : NextFunction
) => {

  if (req.user?.role !== UserRole.ADMIN){
    throw new AppError("Forbidden", 403);
  }

  next()

}

