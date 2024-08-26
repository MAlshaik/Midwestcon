import {
  pgTableCreator,
  uuid,
  pgSchema,
  varchar,
  jsonb
} from "drizzle-orm/pg-core";


export const createTable = pgTableCreator((name) => `midwestcon_${name}`);

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email").notNull(),
  raw_user_meta_data: jsonb("raw_user_meta_data").notNull(),
});

