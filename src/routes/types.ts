import { Router } from "express";
import * as typesControllers from "../controllers/types";

const router = Router();

router.get("/", typesControllers.getTypes);

export default router;
