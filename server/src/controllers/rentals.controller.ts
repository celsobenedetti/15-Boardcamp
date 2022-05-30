import { Response } from "express";
import {
  BaseRental,
  ParamsIdRequest,
  Rental,
  RentalMetricsParams,
  SelectRentalsParams,
  TypedBodyRequest,
  TypedQueryRequest,
} from "../global/types";
import {
  customerAndGameExist,
  deleteRentalById,
  formatRentalMetrics,
  formatSelectedRentals,
  insertRental,
  rentalExists,
  returnRental,
} from "../services/rentals.service";

const getRentals = async (req: TypedQueryRequest<SelectRentalsParams>, res: Response) => {
  try {
    const selectRentalsArgs: SelectRentalsParams = req.query;
    const rentalsData = await formatSelectedRentals(selectRentalsArgs);

    res.status(200).send(rentalsData);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while getting rentals",
      detail: err,
    });
  }
};

const getRentalsMetrics = async (
  req: TypedQueryRequest<RentalMetricsParams>,
  res: Response
) => {
  try {
    const selectRentalsArgs: RentalMetricsParams = req.query;
    const rentalMetrics = await formatRentalMetrics(selectRentalsArgs);

    res.status(200).send(rentalMetrics);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while getting rentals metrics",
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
    const rental: Rental = await rentalExists(id);

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

export { getRentals, getRentalsMetrics, postRental, postReturnRental, deleteRental };
