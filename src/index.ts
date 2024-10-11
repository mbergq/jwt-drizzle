import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { drizzle } from "drizzle-orm/connect";

import createUser from "./controllers/createUser";
import getUser from "./controllers/getUser";

dotenv.config({ path: "../.env" });
const app = express();

app.use(
  cors({
    origin: ["http://localhost:8080"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/createuser", createUser);
app.use("/getUser", getUser);
const PORT = process.env.PORT || 5000;

export const db = await drizzle("node-postgres", process.env.DATABASE_URL!);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
