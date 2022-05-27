import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import categoriesRouter from "./routes/categories.router";
import gamesRouter from "./routes/games.router";
import customerRouter from "./routes/customers.router";

const app = express();
app.use(cors());
app.use(helmet());
app.use(json());

app.get("/", (_req, res) => res.status(200).send("Hello World"));
app.use("/categories", categoriesRouter);
app.use("/games", gamesRouter);
app.use("/customers", customerRouter);

export default app;
