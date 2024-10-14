import { eq } from "drizzle-orm";
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { drizzle } from "drizzle-orm/connect";
import { user } from "./db/schema.ts";

import userRoute from "./routes/user.ts";

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

app.use("/auth", userRoute);

const PORT = process.env.PORT;

export const db = await drizzle("node-postgres", process.env.DATABASE_URL!);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});

// const findUser = await db.select().from(user).where(eq(user.name, "hej"));

// console.log(findUser);
