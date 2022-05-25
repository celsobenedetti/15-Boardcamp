import db from "./db";

(async () => {
  const res = await db.query("SELECT NOW()");
  console.log(res);
})();
