import db from "./db";

const customerId = 1;

db.query("SELECT * FROM customers WHERE id=$1", [customerId]).then((res) =>
  console.log(res)
);
