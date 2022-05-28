import database from "../db";
import { Game } from "../global/types";

const selectGames = async () => {
  const { rows } = await database.query("SELECT * FROM games;", []);
  return rows;
};

const selectGameByName = async (name: string) => {
  const { rows } = await database.query(
    "SELECT * FROM categories WHERE name = $1;",
    [name]
  );
  return rows;
};

const insertGame = async (game: Game) => {
  const { name, image, categoryId, stockTotal, pricePerDay } = game;
  await database.query(
    'INSERT INTO games ("name", "image", "categoryId", "stockTotal", "pricePerDay") VALUES ($1,$2,$3,$4,$5);',
    [name, image, categoryId, stockTotal, pricePerDay]
  );
};

export { selectGames, selectGameByName, insertGame };
