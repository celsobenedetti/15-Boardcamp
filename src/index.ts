import db from "./db";

(async () => {
  const res = await db.query("SELECT * FROM categories");
  console.log(res);
})();
