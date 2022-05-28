import { BaseRental } from "../global/types";
import { selectCustomerById } from "../repositories/customers.repository";
import { selectGameById } from "../repositories/games.repository";
import * as db from "../repositories/rentals.repository";

const selectRentals = async () => {
  const rentals = await db.selectRentals();

  return rentals.map((rental) => {
    const { customerName, gameName, categoryId, categoryName, ...restRental } = rental;

    return {
      ...restRental,
      customer: {
        id: rental.customerId,
        name: customerName,
      },
      game: {
        id: rental.gameId,
        name: gameName,
        categoryId: categoryId,
        categoryName: categoryName,
      },
    };
  });
};

const customerAndGameExist = async (customerId: number, gameId: number) => {
  const customer = await selectCustomerById(customerId);
  if (!customer) return { error: `Customer ${customerId} not registered in database` };

  const game = await selectGameById(gameId);
  if (!game) return { error: `Game ${gameId} not registered in database` };
};

const insertRental = async (rentalInfo: BaseRental) => {
  const { customerId, gameId, daysRented } = rentalInfo;

  const game = await selectGameById(gameId);

  const rental = {
    customerId,
    gameId,
    daysRented,
    rentDate: new Date(),
    originalPrice: daysRented * game.pricePerDay,
    returnDate: null,
    delayFee: null,
  };

  await db.insertRental(rental);
};

export { selectRentals, customerAndGameExist, insertRental };
