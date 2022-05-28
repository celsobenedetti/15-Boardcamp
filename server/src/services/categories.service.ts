import { Category } from "../global/types";
import * as db from "../repositories/categories.repository";

const selectCategories = async () => db.selectCategories();

const categoryAlreadyExists = async (id: number) => {
  const rows = await db.selectCategoryById(id);
  return rows.length > 0;
};

const insertCategory = async (category: Category) => {
  const { name } = category;

  const rows = await db.selectCategoryByName(name);
  if (rows.length > 0) return { error: `Category ${name} already exists` };

  await db.insertCategory({ name });
};

export { selectCategories, insertCategory, categoryAlreadyExists };
