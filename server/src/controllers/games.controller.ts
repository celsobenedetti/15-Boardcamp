import { Response } from "express";
import { Game, GameRequest, TypedBodyRequest } from "../global/types";
import { categoryAlreadyExists } from "../services/categories.service";
import { selectGames, insertGame } from "../services/games.service";

const getGames = async (_req: GameRequest, res: Response) => {
  try {
    const rows = await selectGames();
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while getting games",
      detail: err,
    });
  }
};

const postGame = async (req: TypedBodyRequest<Game>, res: Response) => {
  try {
    if (!(await categoryAlreadyExists(req.body.categoryId)))
      return res.status(400).send({
        error: `Category ${req.body.categoryId} not found in database`,
      });

    const gameAlreadyExists = await insertGame(req.body);
    if (gameAlreadyExists) return res.status(409).send(gameAlreadyExists);

    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal error while posting game",
      detail: err,
    });
  }
};

export { getGames, postGame };
