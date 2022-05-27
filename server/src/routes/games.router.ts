import { Router } from "express";
import { getGames, postGame } from "../controllers/games.controller";
import validateGame from "../middleware/game.validator";

const router = Router();

router.get("/", getGames);
router.post("/", validateGame, postGame);

export default router;
