import { SQLiteDatabase } from "expo-sqlite";

const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY NOT NULL,
      token TEXT NOT NULL,
      name TEXT NOT NULL,
      rut TEXT NOT NULL,
      email TEXT NOT NULL,
      role TEXT NOT NULL,
      role_id INTEGER NOT NULL,
      branch_id INTEGER NOT NULL
      location TEXT NOT NULL,
      municipality TEXT NOT NULL,
      address TEXT NOT NULL,
      agency TEXT NOT NULL,
      agency_id INTEGER NOT NULL
    );
  `);
};

export default initDatabase;
