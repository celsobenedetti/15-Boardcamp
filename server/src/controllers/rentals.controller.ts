import { Request, Response } from "express";
import { BaseRental, TypedBodyRequest, GetRentalsRequest } from "../global/types";
import {
  customerAndGameExist,
  insertRental,
  formatSelectRentals,
} from "../services/rentals.service";

const getRentals = async (req: GetRentalsRequest, res: Response) => {
  const { customerId, gameId } = req.query;
  try {
    const rentalsData = await formatSelectRentals(customerId, gameId);
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

    res.status(201).send();
  } catch (err) {
    res.status(500).send({
      message: "Internal error while posting rental",
      detail: err,
    });
  }
};

export { getRentals, postRental };
