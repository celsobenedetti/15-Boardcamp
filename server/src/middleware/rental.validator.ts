import { NextFunction, Response } from "express";
import Joi from "joi";
import { BaseRental, TypedBodyRequest } from "../global/types";

const rentalSchema = Joi.object({
  customerId: Joi.number().required(),
  gameId: Joi.number().required(),
  daysRented: Joi.number().required().min(1),
});

const validateRental = async (
  req: TypedBodyRequest<BaseRental>,
  res: Response,
  next: NextFunction
) => {
  const { error } = rentalSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  next();
};

export default validateRental;
