import "dotenv/config";
import db from "./db";
import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
