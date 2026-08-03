import type z from "zod";
import type { paginationSchema } from "./pagination.validation.js";

export type PaginationQuery = z.infer<typeof paginationSchema>;