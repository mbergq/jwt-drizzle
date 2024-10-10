import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { drizzle } from "drizzle-orm/connect";
import { usersTable } from "./db/schema";

import createUser from "./controllers/user";

dotenv.config({ path: "../.env" });
const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;

app.use("/user", createUser);

async function main() {
  const db = await drizzle("node-postgres", process.env.DATABASE_URL!);

  const result = await db.select().from(usersTable);
  console.log(result);
}

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
