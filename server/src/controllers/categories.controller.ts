import { Response } from "express";
import { Category, GetRequest, TypedBodyRequest } from "../global/types";
import { insertCategory, selectCategories } from "../services/categories.service";

const getCategories = async (req: GetRequest, res: Response) => {
  try {
    const { offset, limit, desc } = req.query;
    const order = req.query.order || "id";

    const categories = await selectCategories(offset, limit, order, desc);
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

    res.sendStatus(201);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while posting category",
      detail: err,
    });
  }
};

export { getCategories, postCategory };
