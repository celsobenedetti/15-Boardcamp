import database from "../db";
import {
  Rental,
  RentalMetricsParams,
  RentalMetricsResult,
  SelectRentalsParams,
} from "../global/types";
import { validateDate } from "../global/utils/isValidDate";
import { propertyExistsInType } from "../global/utils/typeCheck";

const selectRentals = async (selectRentalsArgs: SelectRentalsParams) => {
  const { customerId, gameId, offset, limit, order, desc, status, startDate } =
    selectRentalsArgs;

  const statusExists = status && (status === "open" || status === "closed");
  const statusOpen = status === "open";
  const isValidDate = validateDate(startDate);
  const orderBy = propertyExistsInType(order, "Rental") ? order : "id";

  const { rows } = await database.query(
    `SELECT rentals.*, customers.name as "customerName", games.name as "gameName",  
      categories.id as "categoryId", categories.name as "categoryName" 
      FROM customers JOIN rentals ON rentals."customerId" = customers.id
      JOIN games ON rentals."gameId" = games.id
      JOIN categories ON games."categoryId" = categories.id 
      WHERE customers.id = (CASE WHEN $1::INTEGER IS NULL THEN customers.id ELSE $1 END)
      AND games.id = (CASE WHEN $2::INTEGER IS NULL THEN games.id ELSE $2 END) 
      ${
        statusExists
          ? `AND rentals."returnDate" IS ${statusOpen ? "NULL" : "NOT NULL"}`
          : ""
      }
      AND rentals."rentDate" >= '${isValidDate ? startDate : "1900-01-01"}'::date
      ORDER BY rentals."${orderBy}" ${desc ? "DESC" : ""}
      OFFSET $3 LIMIT $4;`,
    [customerId, gameId, offset, limit]
  );
  console.log(rows);
  return rows;
};

const selectRentalsMetrics = async (
  rentalMetricsArgs: RentalMetricsParams
): Promise<RentalMetricsResult> => {
  const { startDate, endDate } = rentalMetricsArgs;

  const isValidStartDate = validateDate(startDate);
  const isValidEndDate = validateDate(endDate);

  const { rows } = await database.query(
    `SELECT SUM("originalPrice" + "delayFee") AS "revenue", COUNT(*) as "rentals"
        FROM rentals
        WHERE "returnDate" IS NOT NULL
        AND "rentDate" >= '${isValidStartDate ? startDate : "1900-01-01"}'::date
        AND "rentDate" <= '${isValidEndDate ? endDate : "2900-01-01"}'::date;`,
    []
  );
  return rows[0];
};

const selectRentalById = async (rentalId: number): Promise<Rental> => {
  const { rows } = await database.query("SELECT * FROM rentals WHERE id = $1;", [
    rentalId,
  ]);
  return rows[0];
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
    [gameId, customerId, delayFee, rentDate, daysRented, returnDate, originalPrice]
  );
};

const updateRental = async (rentalId: number, rental: Rental) => {
  const { returnDate, delayFee } = rental;

  await database.query(
    `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3;`,
    [returnDate, delayFee, rentalId]
  );
};

const deleteRental = async (rentalId: number) => {
  await database.query("DELETE FROM rentals WHERE id = $1;", [rentalId]);
};

export {
  selectRentals,
  selectRentalById,
  insertRental,
  updateRental,
  deleteRental,
  selectRentalsMetrics,
};
