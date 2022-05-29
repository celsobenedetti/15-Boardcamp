import { Router } from "express";
import {
  deleteRental,
  getRentals,
  postRental,
  postReturnRental,
} from "../controllers/rentals.controller";
import validateRental from "../middleware/rental.validator";

const router = Router();

router.get("/", getRentals);
router.post("/", validateRental, postRental);
router.post("/:id/return", postReturnRental);
router.delete("/:id", deleteRental);

export default router;
