import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const profile = sqliteTable("profile", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

const account = sqliteTable("account", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  profileId: integer("profile_id").references(() => profile.id),
});

const schema = { account, profile };

export { account, profile, schema };
