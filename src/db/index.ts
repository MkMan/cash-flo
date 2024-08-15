import { drizzle } from "drizzle-orm/sqlite-proxy";
import Database from "tauri-plugin-sql-api";

import { schema } from "./schema";

const dbName = "user-data.db";

const isSelectQuery = (sql: string): boolean => /^\s*SELECT\b/i.test(sql);

const getFields = (sqlQuery: string): string[] =>
  sqlQuery.match(/"(\w*)"/g)?.map((match) => match.replace(/"/g, "")) ?? [];

const formatRow =
  (fieldNames: string[]) =>
  (row: Record<string, unknown>): unknown[] => {
    const returnArray: unknown[] = [];

    fieldNames.forEach((fieldName) => {
      if (fieldName in row) returnArray.push(row[fieldName]);
    });

    return returnArray;
  };

const sqlite = await Database.load(`sqlite:${dbName}`);

const db = drizzle<typeof schema>(
  async (sql, params, method) => {
    let rows: Record<string, unknown>[] = [];
    let results: unknown[] = [];

    // If the query is a SELECT, use the select method
    if (isSelectQuery(sql)) {
      rows = await sqlite
        .select<Record<string, unknown>[]>(sql, params)
        .catch((error: unknown) => {
          console.error("SQL Error:", error);
          return [];
        });
    } else {
      // Otherwise, use the execute method
      rows = (await sqlite.execute(sql, params).catch((error: unknown) => {
        console.error("SQL Error:", error);
        return [];
      })) as Record<string, unknown>[];

      return { rows: [] };
    }

    const sqlFields = getFields(sql);

    // If the method is "all", return all rows
    results =
      method === "all"
        ? rows.map(formatRow(sqlFields))
        : rows.map(formatRow(sqlFields))[0];

    return { rows: results };
  },

  // Pass the schema to the drizzle instance
  { logger: true, schema },
);

type Profile = (typeof schema)["profile"]["$inferSelect"];
type Account = (typeof schema)["account"]["$inferSelect"];

export type { Account, Profile };
export { db, schema, sqlite as __sqLite };
