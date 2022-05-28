import { NextFunction, Response } from "express";
import Joi from "joi";
import { Customer, TypedBodyRequest } from "../global/types";

const customerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required().min(10).max(11).messages({
    "string.min": "Phone must be 10 or 11 characters long",
    "string.max": "Phone must be 10 or 11 characters long",
  }),
  cpf: Joi.string().required().length(11),
  birthday: Joi.date().required(),
});

const validateCustomer = async (
  req: TypedBodyRequest<Customer>,
  res: Response,
  next: NextFunction
) => {
  const { error } = customerSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  next();
};

export default validateCustomer;
