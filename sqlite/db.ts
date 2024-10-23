import { SQLiteDatabase } from "expo-sqlite";

export const initDatabase = async (db: SQLiteDatabase) => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS session (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      token TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      branch_id INTEGER NOT NULL,
      role_id INTEGER NOT NULL
    );  
  `);
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS operators (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      branch_id INTEGER NOT NULL,
      role_id INTEGER NOT NULL
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
    CREATE TABLE IF NOT EXISTS branch (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      branch_id INTEGER NOT NULL,
      address TEXT NOT NULL,
      location TEXT NOT NULL,
      telephone TEXT NOT NULL
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
      label_id INTEGER,
      work_order TEXT,
      operator TEXT,
      operator_id INTEGER,
      date TEXT,
      branch_id INTEGER,
      label_quantity INTEGER,
      wrong_labels INTEGER,
      coordinates TEXT,
      vehicle_brand_id INTEGER,
      vehicle_model_id INTEGER,
      vehicle_year TEXT,
      show_vin INTEGER,
      show_plate INTEGER,
      show_logo INTEGER,
      vehicle_vin TEXT,
      vehicle_plate TEXT,
      print_type TEXT,
      description TEXT
    )  
  `);
};
