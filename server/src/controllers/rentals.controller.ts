import { Response } from "express";
import {
  BaseRental,
  GetRentalsRequest,
  ParamsIdRequest,
  TypedBodyRequest,
} from "../global/types";
import {
  customerAndGameExist,
  deleteRentalById,
  formatSelectRentals,
  insertRental,
  rentalExists,
  returnRental,
} from "../services/rentals.service";

const getRentals = async (req: GetRentalsRequest, res: Response) => {
  const { customerId, gameId, offset, limit, order, desc } = req.query;
  try {
    const rentalsData = await formatSelectRentals(
      customerId,
      gameId,
      offset,
      limit,
      order,
      desc
    );
    res.status(200).send(rentalsData);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Internal error while getting rentals",
      detail: err,
    });
  }
};

const postRental = async (req: TypedBodyRequest<BaseRental>, res: Response) => {
  const { gameId, customerId, daysRented } = req.body;
  try {
    const error = await customerAndGameExist(customerId, gameId);
    if (error) res.status(400).send(error);

    await insertRental({ customerId, gameId, daysRented });

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while posting rental",
      detail: err,
    });
  }
};

const postReturnRental = async (req: ParamsIdRequest, res: Response) => {
  try {
    const { id } = req.params;
    const rental = await rentalExists(id);
    if (!rental) return res.status(404).send({ error: `Rental ${id} not found` });
    if (rental.returnDate)
      return res.status(400).send({ error: `Rental ${id} has already been returned` });

    await returnRental(id, rental);

    res.sendStatus(201);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal error while returning rental",
      detail: err,
    });
  }
};

const deleteRental = async (req: ParamsIdRequest, res: Response) => {
  try {
    const { id } = req.params;
    const rental = await rentalExists(id);
    if (!rental) return res.status(404).send({ error: `Rental ${id} not found` });
    if (rental.returnDate)
      return res.status(400).send({ error: `Rental ${id} has already been returned` });

    await deleteRentalById(id);

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal error while deleting rental",
      detail: err,
    });
  }
};

export { getRentals, postRental, postReturnRental, deleteRental };
