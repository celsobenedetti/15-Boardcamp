import database from "../db";
import { propertyExistsInType } from "../global/typeCheck";
import { Game, SelectQueryParams } from "../global/types";

const selectGames = async (selectQueryArgs: SelectQueryParams) => {
  let { offset, limit, order, desc } = selectQueryArgs;

  if (!propertyExistsInType(order, "Game")) order = "id";

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
