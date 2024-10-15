import { user } from "./db/schema";
import { db } from "./index.ts";

const reuslt = await db.select().from(user);

console.log(reuslt);
