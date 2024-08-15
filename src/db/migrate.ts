import { readDir, readTextFile } from "@tauri-apps/api/fs";
import { resourceDir } from "@tauri-apps/api/path";

import { __sqLite } from ".";

type Migration = { created_at: number; hash: string; id: number };

/**
 * Executes database migrations.
 *
 * @param db The database instance.
 * @returns A promise that resolves when the migrations are complete.
 */
const migrate = async (): Promise<void> => {
  const resourcePath = await resourceDir();
  const files = await readDir(`${resourcePath}migrations`);
  let migrations = files.filter((file) => file.name?.endsWith(".sql"));

  // sort migrations by the first 4 characters of the file name
  migrations = migrations.sort((a, b) => {
    const aHash = a.name?.replace(".sql", "").slice(0, 4);
    const bHash = b.name?.replace(".sql", "").slice(0, 4);

    if (aHash && bHash) {
      return aHash.localeCompare(bHash);
    }

    return 0;
  });

  const migrationTableCreate = /*sql*/ `
		CREATE TABLE IF NOT EXISTS "__drizzle_migrations" (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            hash text NOT NULL UNIQUE,
			created_at numeric
		)
	`;

  await __sqLite.execute(migrationTableCreate, []);

  for (const migration of migrations) {
    const hash = migration.name?.replace(".sql", "");

    const dbMigrations = await __sqLite.select<Migration[]>(
      /*sql*/ `SELECT id, hash, created_at FROM "__drizzle_migrations" ORDER BY created_at DESC`,
    );

    const hasBeenRun = (hash: string): Migration | undefined =>
      dbMigrations.find((dbMigration) => {
        return dbMigration.hash === hash;
      });

    if (hash && hasBeenRun(hash) === undefined) {
      const sql = await readTextFile(migration.path);

      await __sqLite.execute(sql, []);
      await __sqLite.execute(
        /*sql*/ `INSERT INTO "__drizzle_migrations" (hash, created_at) VALUES ($1, $2)`,
        [hash, Date.now()],
      );
    }
  }

  console.info("Migrations complete");

  return Promise.resolve();
};

export { migrate };
