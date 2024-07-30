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
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS supplies (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      quantity INTEGER NOT NULL,
    );
  `);
  await db.execAsync(`
      CREATE TABLE IF NOT EXISTS labels (
      id INTEGER PRIMARY KEY NOT NULL,
      car_brand TEXT NOT NULL,
      car_model TEXT NOT NULL,
      car_year INTEGER NOT NULL,
      car_chasisnumber TEXT NOT NULL,
      chasis_img TEXT NOT NULL,
      show_vin INTEGER NOT NULL,
      car_vin TEXT NOT NULL,
      show_plate INTEGER NOT NULL,
      car_plate TEXT NOT NULL,
      plate_img TEXT NOT NULL,
      show_logo INTEGER NOT NULL,
      car_logo TEXT NOT NULL
    );
  `);
};

export default initDatabase;
