import {
  pgTableCreator,
  uuid,
  pgSchema,
  varchar,
  jsonb,
  text,
  timestamp,
  date,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const createTable = pgTableCreator((name) => `midwestcon_${name}`);

const authSchema = pgSchema("auth");

export const users = authSchema.table("users", {
  id: uuid("id").primaryKey(),
  email: varchar("email").notNull(),
  raw_user_meta_data: jsonb("raw_user_meta_data").notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  scenes: many(scenes),
}));

export const scenes = createTable("scenes", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  date: date("date"), // Make this nullable
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
});

export const sceneRelations = relations(scenes, ({ one }) => ({
  user: one(users, {
    fields: [scenes.userId],
    references: [users.id],
  }),
}));
