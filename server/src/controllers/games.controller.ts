import { Response } from "express";
import { Game, GetRequest, TypedBodyRequest } from "../global/types";
import { categoryAlreadyExists } from "../services/categories.service";
import { insertGame, selectGames } from "../services/games.service";

const getGames = async (req: GetRequest, res: Response) => {
  try {
    const { offset, limit, desc, order } = req.query;
    const rows = await selectGames(offset, limit, order, desc);
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

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while posting game",
      detail: err,
    });
  }
};

export { getGames, postGame };
