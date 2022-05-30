import { Category, Customer, Game, Rental } from "./types";

const categoryExample: Category = { name: "" };

const customerExample: Customer = {
  name: "",
  phone: "",
  cpf: "",
  birthday: new Date(),
};

const rentalExample: Rental = {
  customerId: 0,
  gameId: 0,
  rentDate: new Date(),
  daysRented: 0,
  returnDate: new Date(),
  originalPrice: 0,
  delayFee: 0,
};

const gameExample: Game = {
  name: "",
  image: "",
  stockTotal: 0,
  categoryId: 0,
  pricePerDay: 0,
};

export function propertyExistsInType(property: string, type: string) {
  if (!property) return false;
  if (type === "Category") return property in categoryExample;
  if (type === "Game") return property in gameExample;
  if (type === "Customer") return property in customerExample;
  if (type === "Rental") return property in rentalExample;
  return false;
}
