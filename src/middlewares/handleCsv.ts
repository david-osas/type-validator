import { RequestHandler } from "express";
import multer from "multer";
import { promises as fs } from "fs";
import { readCsvFile, deleteFile } from "../utils/csvFile";
import { csvFilter, csvMaxSize } from "../utils/csvFilter";
import { AppError } from "../types/error";
import { Data } from "../types/csv";

export const csvUpload = multer({
  dest: "uploads/",
  fileFilter: csvFilter,
  limits: { fileSize: csvMaxSize, files: 1 },
}).single("data");

export const parseCsv: RequestHandler = async (req, res, next) => {
  const fileError: AppError = new Error("error reading uploaded file");
  fileError.status = 404;

  if (!req.file || !req.file.path) return next(fileError);

  try {
    await fs.access(req.file.path);
    const data: Data = await readCsvFile(req.file.path);
    if (data.length < 2) {
      fileError.message = "Atleast 2 rows are required";
      throw fileError;
    }

    res.locals.data = data;
    deleteFile(req.file.path);
    next();
  } catch (err) {
    console.error(err);
    return next(fileError);
  }
};
