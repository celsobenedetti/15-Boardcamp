import * as db from "../repositories/games.repository";
import { Game, SelectQueryParams } from "../global/types";

const selectGames = async (selectQueryArgs: SelectQueryParams) =>
  db.selectGames(selectQueryArgs);

const insertGame = async (game: Game) => {
  const rows = await db.selectGameByName(game.name);
  if (rows.length > 0) return { error: `Game ${game.name} already exists in database` };

  await db.insertGame(game);
};

export { selectGames, insertGame };
