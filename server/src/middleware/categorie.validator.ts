import { NextFunction, Response } from "express";
import Joi from "joi";
import { CategoryRequest } from "../global/types";

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

const validateCategory = (
  req: CategoryRequest,
  res: Response,
  next: NextFunction
) => {
  const { error } = categorySchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  next();
};

export default validateCategory;
