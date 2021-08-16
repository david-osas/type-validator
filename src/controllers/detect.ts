import { RequestHandler } from "express";

export const detectSchema: RequestHandler = (req, res, next) => {
  return res.json({ data: "osas says hi" });
};
