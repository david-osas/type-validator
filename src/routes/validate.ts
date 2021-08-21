import { Router } from "express";
import * as validateControllers from "../controllers/validate";
import { parseCsv, csvUpload } from "../middlewares/handleCsv";

const router = Router();

router.post("/", csvUpload, parseCsv, validateControllers.validateCsv);

export default router;
