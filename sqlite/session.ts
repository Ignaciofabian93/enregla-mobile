import { User } from "@/types/user";
import { openDatabaseAsync } from "expo-sqlite";

export const saveSession = async (token: string, user: User) => {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`
    INSERT INTO session (token, name, rut, email, role, role_id, branch_id, location, municipality, address, agency, agency_id) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  try {
    await statement.executeAsync([
      token,
      user.name,
      user.rut,
      user.email,
      user.role,
      user.role_id,
      user.branch_id,
      user.location,
      user.municipality,
      user.address,
      user.agency,
      user.agency_id,
    ]);
  } catch (error) {
    throw new Error(`Error al intentar registrar la sesión: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
};

export const getSession = async () => {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`SELECT * FROM session`);
  try {
    const response = await statement.executeAsync();
    const data = await response.getFirstAsync();
    return data as User;
  } catch (error) {
    throw new Error(`Error al intentar obtener la sesión: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
};

export const deleteSession = async () => {
  const db = await openDatabaseAsync("enregla.db");
  const tables = ["session"];
  tables.map(async (table: string) => {
    const statement = await db.prepareAsync(`DELETE FROM ${table}`);
    try {
      await statement.executeAsync();
    } catch (error) {
      throw new Error(`Error al intentar cerrar la sesión: ${error}`);
    } finally {
      await statement.finalizeAsync();
    }
  });
};
