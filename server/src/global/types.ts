export type Category = {
  name: string;
};

export type Game = {
  name: string;
  image: string;
  stockTotal: number;
  categoryId: number;
  pricePerDay: number;
};

export type Customer = {
  name: string;
  phone: string;
  cpf: string;
  birthday: Date;
};

export type BaseRental = {
  customerId: number;
  gameId: number;
  daysRented: 3;
};

export type Rental = {
  customerId: number;
  gameId: number;
  rentDate: Date;
  daysRented: 3;
  returnDate: Date | null;
  originalPrice: number;
  delayFee: number | null;
};

export interface TypedBodyRequest<T> extends Express.Request {
  body: T;
}
