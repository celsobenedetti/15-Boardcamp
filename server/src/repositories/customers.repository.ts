import database from "../db";
import { Customer } from "../global/types";

const selectCustomers = async () => {
  const { rows } = await database.query("SELECT * FROM customers;", []);
  return rows;
};

const selectCustomerById = async (id: number) => {
  const { rows } = await database.query(
    "SELECT * FROM customers WHERE id = $1;",
    [id]
  );

  return rows[0];
};

const selectCustomerByCpf = async (cpf: string) => {
  const { rows } = await database.query(
    "SELECT * FROM customers WHERE cpf = $1;",
    [cpf]
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

export {
  selectCustomers,
  selectCustomerById,
  selectCustomerByCpf,
  insertCustomer,
};
