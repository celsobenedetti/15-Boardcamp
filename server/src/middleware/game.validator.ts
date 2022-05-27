import { NextFunction, Response } from "express";
import Joi from "joi";
import { GameRequest } from "../global/types";

const gameSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  stockTotal: Joi.number().required().min(1),
  pricePerDay: Joi.number().required().min(1),
  categoryId: Joi.number(),
});

const validateGame = async (
  req: GameRequest,
  res: Response,
  next: NextFunction
) => {
  const { error } = gameSchema.validate(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  next();
};

export default validateGame;
