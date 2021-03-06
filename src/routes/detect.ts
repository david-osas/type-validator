import { Router } from "express";
import * as detectControllers from "../controllers/detect";
import { parseCsv, csvUpload } from "../middlewares/handleCsv";

const router = Router();

router.post("/", csvUpload, parseCsv, detectControllers.detectTypes);

export default router;
