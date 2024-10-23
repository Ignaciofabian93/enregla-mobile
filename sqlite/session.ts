import { Session } from "@/types/session";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalSession({ session }: { session: Session }) {
  const db = await openDatabaseAsync("enregla-integral.db");
  const statement = await db.prepareAsync(`
    INSERT INTO session (token, user_id, name, email, role_id, branch_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  try {
    await statement.executeAsync([session.token, session.id, session.name, session.email, session.role_id, session.branch_id]);
  } catch (error) {
    throw new Error(`Error al intentar guardar la sesión: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function GetLocalSession() {
  const db = await openDatabaseAsync("enregla-integral.db");
  const statement = await db.prepareAsync(`SELECT * FROM session LIMIT 1`);
  try {
    const response = await statement.executeAsync();
    const data = await response.getFirstAsync();
    return data as Session;
  } catch (error) {
    throw new Error(`Error al intentar obtener la sesión: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function DeleteLocalSession() {
  const db = await openDatabaseAsync("enregla-integral.db");
  const tables = ["session", "vehicle_brands", "vehicle_models", "supplies", "labels", "branch"];
  tables.map(async (table) => {
    const statement = await db.prepareAsync(`DELETE FROM ${table}`);
    try {
      await statement.executeAsync();
    } catch (error) {
      throw new Error(`Error al intentar eliminar la sesión: ${error}`);
    } finally {
      await statement.finalizeAsync();
    }
  });
}
