import { NextFunction, Response } from "express";
import Joi from "joi";
import { CustomerRequest } from "../global/types";

const customerSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required().min(10).max(11),
  cpf: Joi.string().required().length(11),
  birthday: Joi.date().required(),
});

const validateCustomer = async (
  req: CustomerRequest,
  res: Response,
  next: NextFunction
) => {
  const { error } = customerSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  next();
};

export default validateCustomer;
