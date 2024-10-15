import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { drizzle } from "drizzle-orm/connect";

import userRoutes from "./routes/user.ts";
// import protectedRoutes from "./routes/protected.ts";

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

app.use("/auth", userRoutes);
// app.use("/protected", protectedRoutes);

const PORT = process.env.PORT;

export const db = await drizzle("node-postgres", process.env.DATABASE_URL!);

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});
