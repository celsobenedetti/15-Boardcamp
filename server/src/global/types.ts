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

export interface CategoryRequest extends Express.Request {
  body: Category;
}

export interface GameRequest extends Express.Request {
  body: Game;
}
