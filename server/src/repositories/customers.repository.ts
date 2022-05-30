import database from "../db";
import { propertyExistsInType } from "../global/utils/typeCheck";
import { Customer, SelectQueryParams } from "../global/types";

const selectCustomers = async (selectQueryArgs: SelectQueryParams) => {
  let { offset, limit, order, desc } = selectQueryArgs;

  if (!propertyExistsInType(order, "Customer")) order = "id";

  const { rows } = await database.query(
    `SELECT * FROM customers ORDER BY "${order}" ${
      desc ? "DESC" : ""
    } OFFSET $1 LIMIT $2;`,
    [offset, limit]
  );
  return rows;
};

const selectCustomerById = async (id: number) => {
  const { rows } = await database.query("SELECT * FROM customers WHERE id = $1;", [id]);

  return rows[0];
};

const selectCustomerByCpf = async (cpf: string) => {
  const { rows } = await database.query("SELECT * FROM customers WHERE cpf = $1;", [cpf]);

  return rows[0];
};

const selectCpfInOtherCustomers = async (customerId: number, cpf: string) => {
  const { rows } = await database.query(
    "SELECT * FROM CUSTOMERS WHERE cpf = $1 AND id != $2;",
    [cpf, customerId]
  );
  return rows[0];
};

const insertCustomer = async (customer: Customer) => {
  const { name, phone, cpf, birthday } = customer;
  await database.query(
    'INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ($1,$2,$3,$4);',
    [name, phone, cpf, birthday]
  );
};

const updateCustomer = async (customerId: number, customer: Customer) => {
  const { name, phone, cpf, birthday } = customer;
  await database.query(
    'UPDATE customers SET "name" = $1, "phone" = $2, "cpf" = $3, "birthday" = $4 WHERE id = $5;',
    [name, phone, cpf, birthday, customerId]
  );
};

export {
  selectCustomers,
  selectCustomerById,
  selectCustomerByCpf,
  selectCpfInOtherCustomers,
  insertCustomer,
  updateCustomer,
};
