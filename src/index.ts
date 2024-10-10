import * as dotenv from "dotenv";
import { drizzle } from "drizzle-orm/connect";
import { usersTable } from "./db/schema";

dotenv.config({ path: "../.env" });

async function main() {
  const db = await drizzle("node-postgres", process.env.DATABASE_URL!);

  const result = await db.select().from(usersTable);
  console.log(result);
}

main();
