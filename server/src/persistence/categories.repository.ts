import { PoolFactory } from "../db";
import { Category } from "../global/types";

const poolFactory = new PoolFactory();

const selectCategories = async () => {
  const connection = await poolFactory.createConnection();
  const { rows } = await connection.query("SELECT * FROM categories;");
  await connection.end();
  return rows;
};

const insertCategory = async (category: Category) => {
  const { name } = category;
  const connection = await poolFactory.createConnection();
  try {
    const { rows } = await connection.query(
      "SELECT * FROM categories WHERE name = $1;",
      [name]
    );

    if (rows.length > 0) throw { error: `Category ${name} already exists` };

    await connection.query("INSERT INTO categories (name) VALUES ($1);", [
      name,
    ]);
  } catch (err) {
    return err;
  } finally {
    await connection.end();
  }
};

export { selectCategories, insertCategory };
