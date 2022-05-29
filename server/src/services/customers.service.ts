import { Customer } from "../global/types";
import * as db from "../repositories/customers.repository";

const selectCustomers = async (offset: number, limit: number) =>
  db.selectCustomers(offset, limit);

const selectCustomerById = async (id: number) => db.selectCustomerById(id);

const customerAlreadyExists = async (cpf: string) => {
  const rows = await db.selectCustomerByCpf(cpf);
  return rows;
};

const insertCustomer = async (customer: Customer) => {
  const cpfExists = await customerAlreadyExists(customer.cpf);
  if (cpfExists) return { error: `CPF ${customer.cpf} already registered` };

  await db.insertCustomer(customer);
};

const updateCustomer = async (customerId: number, customer: Customer) => {
  const cpfAlreadyExists = await db.selectCpfInOtherCustomers(customerId, customer.cpf);
  if (cpfAlreadyExists)
    return { error: `CPF ${customer.cpf} belongs to another customer` };

  await db.updateCustomer(customerId, customer);
};

export { selectCustomers, selectCustomerById, insertCustomer, updateCustomer };
