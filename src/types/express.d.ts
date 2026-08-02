import type { PublicUser } from "@/apps/user/user.types.js";

declare global {
  namespace Express {
    interface Request {
      user: PublicUser;
    }
  }
}

export {};