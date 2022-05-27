import { database } from "../app";
import { Category } from "../global/types";

const selectCategories = async () => {
  const { rows } = await database.query("SELECT * FROM categories;", []);
  return rows;
};

const selectCategoryByName = async (name: string) => {
  const { rows } = await database.query(
    "SELECT * FROM categories WHERE name = $1;",
    [name]
  );
  return rows;
};

const insertCategory = async (category: Category) => {
  const { name } = category;
  await database.query("INSERT INTO categories (name) VALUES ($1);", [name]);
};

export { selectCategories, selectCategoryByName, insertCategory };
