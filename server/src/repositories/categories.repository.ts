import database from "../db";
import { Category, propertyExistsInType } from "../global/types";

const categoryExample: Category = { name: "" };

const selectCategories = async (
  offset: number,
  limit: number,
  order: string,
  desc: boolean
) => {
  order = propertyExistsInType(order, categoryExample) ? order : "id";

  const { rows } = await database.query(
    `SELECT * FROM categories ORDER BY "${order}" ${
      desc ? "DESC" : ""
    } OFFSET $1 LIMIT $2 ;`,
    [offset, limit]
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
