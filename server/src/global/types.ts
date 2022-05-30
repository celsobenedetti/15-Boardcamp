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
  daysRented: number;
  returnDate: Date | null;
  originalPrice: number;
  delayFee: number | null;
};

export interface TypedBodyRequest<T> extends Express.Request {
  body: T;
}

export interface GetRequest extends Express.Request {
  query: {
    limit: number;
    offset: number;
    order: string;
    desc: boolean;
  };
}

export interface ParamsIdRequest extends Express.Request {
  params: {
    id: number;
  };
}

export interface PutCustomerRequest extends ParamsIdRequest {
  body: Customer;
}

export interface GetRentalsRequest extends Express.Request {
  query: {
    gameId: number;
    customerId: number;
    offset: number;
    limit: number;
    order: string;
    desc: boolean;
  };
}
