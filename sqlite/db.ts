import { SQLiteDatabase } from "expo-sqlite";

export const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      rut TEXT NOT NULL
    );  
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS vehicle_brands (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand_id INTEGER NOT NULL,
      brand TEXT NOT NULL,
      logo TEXT
    )  
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS vehicle_models (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand_id INTEGER NOT NULL,
      model_id INTEGER NOT NULL,
      model TEXT NOT NULL
    )  
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS supplies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      supply_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      price INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      branch TEXT NOT NULL,
      agency TEXT NOT NULL
    )
  `);
};
