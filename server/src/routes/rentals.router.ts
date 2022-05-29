import { Router } from "express";
import {
  getRentals,
  postRental,
  postReturnRental,
} from "../controllers/rentals.controller";
import validateRental from "../middleware/rental.validator";

const router = Router();

router.get("/", getRentals);
router.post("/", validateRental, postRental);
router.post("/:id/return", postReturnRental);

export default router;
