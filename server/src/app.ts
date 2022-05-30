import cors from "cors";
import express, { json } from "express";
import helmet from "helmet";
import categoriesRouter from "./routes/categories.router";
import gamesRouter from "./routes/games.router";
import customersRouter from "./routes/customers.router";
import rentalsRouter from "./routes/rentals.router";

const app = express();
app.use(cors());
app.use(helmet());
app.use(json());

app.get("/", (_req, res) => res.send("Hello from Boardcamp"));
app.use("/categories", categoriesRouter);
app.use("/games", gamesRouter);
app.use("/customers", customersRouter);
app.use("/rentals", rentalsRouter);

export default app;
