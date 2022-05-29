import { Request, Response } from "express";
import { Customer, TypedBodyRequest } from "../global/types";

import {
  insertCustomer,
  selectCustomerById,
  selectCustomers,
  updateCustomer,
} from "../services/customers.service";

const getCustomers = async (_req: Request, res: Response) => {
  try {
    const rows = await selectCustomers();
    res.status(200).send(rows);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while getting customers",
      detail: err,
    });
  }
};

const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await selectCustomerById(parseInt(id));

    if (!customer) return res.status(404).send({ error: `Customer ${id} not found in database` });

    res.status(200).send(customer);
  } catch (err) {
    res.status(500).send({
      message: "Internal error while getting customer",
      detail: err,
    });
  }
};

const postCustomer = async (req: TypedBodyRequest<Customer>, res: Response) => {
  try {
    const cpfAlreadyRegistered = await insertCustomer(req.body);
    if (cpfAlreadyRegistered) res.status(409).send(cpfAlreadyRegistered);

    res.status(201).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Internal error while inserting customer ${req.body.name}`,
      detail: err,
    });
  }
};

const putCustomer = async (req: TypedBodyRequest<Customer>, res: Response) => {
  const { id } = req.params;
  try {
    const cpfBelongsToAnotherUser = await updateCustomer(id, req.body);
    if (cpfBelongsToAnotherUser) res.status(409).send(cpfBelongsToAnotherUser);

    res.status(200).send();
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: `Internal error while updating customer ${req.body.name}`,
      detail: err,
    });
  }
};

export { getCustomers, getCustomerById, postCustomer, putCustomer };
