import { Request, Response } from "express";
import { Rental, TypedBodyRequest } from "../global/types";
import { selectRental } from "../services/rentals.service";

const getRentals = async (_req: Request, res: Response) => {
  try {
    const rows = await selectRental();
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while getting games",
      detail: err,
    });
  }
};

export { getRentals };
