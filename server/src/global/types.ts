export type Category = {
  name: string;
};

export interface CategoryRequest extends Express.Request {
  body: Category;
}
