import db from "./db";
import app from "./app";

const PORT = process.env.PORT;

db.query("SELECT * FROM customers WHERE id=$1", [1]).then((res) =>
  console.log(res)
);

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
