import database from "../db";
import { Category } from "../global/types";

const selectCategories = async (
  offset: number,
  limit: number,
  order: string,
  desc: boolean
) => {
  const { rows } = await database.query(
    `SELECT * FROM categories ORDER BY $1 ${desc ? "DESC" : ""} OFFSET $2 LIMIT $3 ;`,
    [order, offset, limit]
  );
  return rows;
};

const selectCategoryByName = async (name: string) => {
  const { rows } = await database.query("SELECT * FROM categories WHERE name = $1;", [
    name,
  ]);
  return rows;
};

const selectCategoryById = async (id: number) => {
  const { rows } = await database.query("SELECT * FROM categories WHERE id = $1;", [id]);
  return rows;
};

const insertCategory = async (category: Category) => {
  const { name } = category;
  await database.query("INSERT INTO categories (name) VALUES ($1);", [name]);
};

export { selectCategories, selectCategoryByName, selectCategoryById, insertCategory };
