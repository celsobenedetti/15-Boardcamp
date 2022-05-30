import database from "../db";
import { Game, propertyExistsInType } from "../global/types";

const gameExample: Game = {
  name: "",
  image: "",
  stockTotal: 0,
  categoryId: 0,
  pricePerDay: 0,
};

const selectGames = async (
  offset: number,
  limit: number,
  order: string,
  desc: boolean
) => {
  order = propertyExistsInType(order, gameExample) ? order : "id";

  const { rows } = await database.query(
    `SELECT * FROM games ORDER BY "${order}" ${desc ? "DESC" : ""} OFFSET $1 LIMIT $2;`,
    [offset, limit]
  );
  return rows;
};

const selectGameById = async (id: number) => {
  const { rows } = await database.query("SELECT * FROM games WHERE id = $1;", [id]);
  return rows[0];
};

const selectGameByName = async (name: string) => {
  const { rows } = await database.query("SELECT * FROM games WHERE name = $1;", [name]);
  return rows;
};

const insertGame = async (game: Game) => {
  const { name, image, categoryId, stockTotal, pricePerDay } = game;
  await database.query(
    'INSERT INTO games ("name", "image", "categoryId", "stockTotal", "pricePerDay") VALUES ($1,$2,$3,$4,$5);',
    [name, image, categoryId, stockTotal, pricePerDay]
  );
};

export { selectGames, selectGameByName, insertGame, selectGameById };
