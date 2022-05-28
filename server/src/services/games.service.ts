import * as db from "../repositories/games.repository";
import { Game } from "../global/types";

const selectGames = async () => db.selectGames();

const insertGame = async (game: Game) => {
  const rows = await db.selectGameByName(game.name);
  if (rows.length > 0)
    return { error: `Game ${game.name} already exists in database` };

  await db.insertGame(game);
};

export { selectGames, insertGame };
