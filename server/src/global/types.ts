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

export interface CategoryRequest extends Express.Request {
  body: Category;
}

export interface GameRequest extends Express.Request {
  body: Game;
}

export interface CustomerRequest extends Express.Request {
  body: Customer;
}
