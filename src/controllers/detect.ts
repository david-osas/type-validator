import { AppError } from "./../types/error";
import { RequestHandler } from "express";
import { promises as fs } from "fs";

export const detectSchema: RequestHandler = async (req, res, next) => {
  const fileError: AppError = new Error("error reading uploaded file");
  fileError.status = 404;

  if (req.file?.path) {
    try {
      await fs.access(req.file?.path);
      const file = await fs.readFile(req.file?.path, "utf8");
      const fileRows = file.split("\r\n");
      const data = fileRows.map((item) => item.split(","));
      console.log(data);
    } catch (err) {
      console.log(err);
      next(fileError);
    }
  } else {
    next(fileError);
  }

  return res.json({ data: "osas says hi" });
};
