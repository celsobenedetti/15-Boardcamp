import { Router } from "express";
import {
  getCategories,
  postCategory,
} from "../controllers/categories.controller";
import validateCategory from "../middleware/categorie.validator";

const router = Router();

router.get("/", getCategories);
router.post("/", validateCategory, postCategory);

export default router;
