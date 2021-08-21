import { RequestHandler } from "express";

// TYPES
//
// Boolean
// Float
// Integer
// String
// unknown

export const getTypes: RequestHandler = (req, res, next) => {
  return res.json({
    status: "success",
    message: "currently supported types",
    data: ["boolean", "float", "integer", "string", "unknown"],
  });
};
