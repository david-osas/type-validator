import { Router } from "express";
import multer from "multer";
import * as detectControllers from "../controllers/detect";
import { csvFilter, csvMaxSize } from "../utils/csvFilter";

const schemaDetectUpload = multer({
  dest: "uploads/",
  fileFilter: csvFilter,
  limits: { fileSize: csvMaxSize, files: 1 },
}).single("data");

const router = Router();

router.post("/", schemaDetectUpload, detectControllers.detectSchema);

export default router;
