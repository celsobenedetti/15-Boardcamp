import database from "../db";
import { Rental } from "../global/types";

const selectRentals = async () => {
  const { rows } = await database.query(
    `SELECT r.*, c.*, g.* FROM customers AS c JOIN rentals AS r ON r."customerId" = c.id JOIN games AS g ON r."gameId" = g.id;`,
    []
  );
  return rows;
};

const insertRental = async (rental: Rental) => {
  const {
    gameId,
    customerId,
    delayFee,
    rentDate,
    daysRented,
    returnDate,
    originalPrice,
  } = rental;

  await database.query(
    `INSERT INTO rentals 
    ("gameId", "customerId", "delayFee", "rentDate", "daysRented", "returnDate", "originalPrice") 
    VALUES ($1,$2,$3,$4,$5,$6,$7);`,
    [
      gameId,
      customerId,
      delayFee,
      rentDate,
      daysRented,
      returnDate,
      originalPrice,
    ]
  );
};

export { selectRentals, insertRental };
