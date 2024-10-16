import { pgTable, serial, text, unique, integer } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const user = pgTable("user", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  userName: text("name").notNull(),
  password: text("password").notNull(),
  ...timestamps,
});

export const refreshToken = pgTable("refresh_token", {
  id: serial("id").primaryKey(),
  refreshToken: text("refresh_token").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => user.id),
});
