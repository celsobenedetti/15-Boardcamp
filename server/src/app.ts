import express, { json } from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
app.use(cors());
app.use(helmet());
app.use(json());

app.get("/", (_req, res) => res.status(200).send("Hello World"));

export default app;
