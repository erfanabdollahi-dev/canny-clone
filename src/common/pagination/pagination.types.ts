import type z from "zod";
import type { paginationSchema } from "./pagination.validation.js";

export type PaginationQuery = z.infer<typeof paginationSchema>;


export interface PaginatedResult<T> {

  data : T[];

  pagination : {
    page : number;
    limit : number;
    total : number;
    pages : number;
  }

}