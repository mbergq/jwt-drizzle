import { drizzle } from "drizzle-orm/connect";
import { users } from "./schema";

const db = await drizzle("node-postgres", process.env.DATABASE_URL ?? "");
const pool = db.$client;

const usersCount = await db.$count(users);
