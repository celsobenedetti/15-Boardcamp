import * as db from "../repositories/rentals.repository";
import { Rental } from "../global/types";

const selectRental = async () => db.selectRentals();

const insertRental = async (rental: Rental) => {};

export { selectRental };
