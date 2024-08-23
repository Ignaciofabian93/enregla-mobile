import { SQLiteDatabase } from "expo-sqlite";

export const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      rut TEXT NOT NULL,
      branch_id INTEGER NOT NULL
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
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS labels (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      branch_id INTEGER NOT NULL,
      label_quantity INTEGER NOT NULL,
      wrong_labels INTEGER NOT NULL,
      purchase_number TEXT NOT NULL,
      price INTEGER NOT NULL,
      coordinates TEXT NOT NULL,
      vehicle_brand_id INTEGER NOT NULL,
      vehicle_model_id INTEGER NOT NULL,
      vehicle_year TEXT NOT NULL,
      show_vin INTEGER NOT NULL,
      show_plate INTEGER NOT NULL,
      show_logo INTEGER NOT NULL,
      vehicle_vin TEXT NOT NULL,
      vehicle_plate TEXT NOT NULL
    )  
  `);
};
