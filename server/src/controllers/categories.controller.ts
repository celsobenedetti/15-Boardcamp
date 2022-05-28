import { Request, Response } from "express";
import { Category, TypedBodyRequest } from "../global/types";
import {
  insertCategory,
  selectCategories,
} from "../services/categories.service";

const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await selectCategories();
    res.status(200).send(categories);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while getting categories",
      detail: err,
    });
  }
};

const postCategory = async (req: TypedBodyRequest<Category>, res: Response) => {
  try {
    const alreadyExists = await insertCategory(req.body);
    if (alreadyExists) return res.status(409).send(alreadyExists);

    res.status(201).send();
  } catch (err) {
    res.status(500).send({
      message: "Internal error while posting category",
      detail: err,
    });
  }
};

export { getCategories, postCategory };
