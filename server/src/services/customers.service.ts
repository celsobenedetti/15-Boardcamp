import { Customer } from "../global/types";
import * as db from "../persistence/customers.repository";

const selectCustomers = async () => db.selectCustomers();

const selectCustomerById = async (id: number) => db.selectCustomerById(id);

const customerAlreadyExists = async (cpf: string) => {
  const rows = await db.selectCustomerByCpf(cpf);
  return rows.length > 0;
};

const insertCustomer = async (customer: Customer) => {
  const error = await customerAlreadyExists(customer.cpf);
  if (error) return { error: `CPF ${customer.cpf} already registered` };

  await db.insertCustomer(customer);
};

export { selectCustomers, selectCustomerById, insertCustomer };
