import { Router } from "express";
import { getRentals, postRental } from "../controllers/rentals.controller";
import validateRental from "../middleware/rental.validator";

const router = Router();

router.get("/", getRentals);
router.post("/", validateRental, postRental);

export default router;
