import { BaseRental, Rental } from "../global/types";
import { selectCustomerById } from "../repositories/customers.repository";
import { selectGameById } from "../repositories/games.repository";
import * as db from "../repositories/rentals.repository";

const formatSelectRentals = async (customerId: number, gameId: number) => {
  const rentals = await db.selectRentals(customerId, gameId);

  return rentals.map((eachRental) => {
    const { customerName, gameName, categoryId, categoryName, ...rentalInfo } =
      eachRental;

    return {
      ...rentalInfo,
      customer: {
        id: rentalInfo.customerId,
        name: customerName,
      },
      game: {
        id: rentalInfo.gameId,
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

const rentalExists = async (rentalId: number): Promise<Rental> => {
  return await db.selectRentalById(rentalId);
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

const returnRental = async (rentalId: number, rental: Rental) => {
  rental.returnDate = new Date();
  const daysLate = Math.floor(
    (rental.returnDate.getTime() - rental.rentDate.getTime()) / (1000 * 3600 * 24) -
      rental.daysRented
  );

  const game = await selectGameById(rental.gameId);
  rental.delayFee = daysLate * game.pricePerDay;

  await db.updateRental(rentalId, rental);
};

const deleteRentalById = async (rentalId: number) => {
  await db.deleteRental(rentalId);
};

export {
  formatSelectRentals,
  customerAndGameExist,
  rentalExists,
  insertRental,
  returnRental,
  deleteRentalById,
};
