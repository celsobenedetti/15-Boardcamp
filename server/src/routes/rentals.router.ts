import { Router } from "express";
import { getRentals } from "../controllers/rentals.controller";

const router = Router();

router.get("/", getRentals);

export default router;
