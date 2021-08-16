import { AppError } from "./../types/error";
import { FileFilterCallback } from "multer";
import { Request } from "express";

export function csvFilter(
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  console.log(file.mimetype);
  if (file.mimetype === "text/csv") {
    cb(null, true);
  } else {
    cb(null, false);

    const error: AppError = new Error("only csv files are allowed");
    error.status = 404;
    cb(error);
  }
}

export const csvMaxSize = 1024 * 1024;
