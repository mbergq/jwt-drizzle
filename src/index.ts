import * as dotenv from "dotenv";

import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { usersTable } from "./db/schema";

dotenv.config({ path: "../.env" });

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
  });
  const db = drizzle(pool);

  const test = await db.select().from(usersTable);
  console.log(test);
}

main();
