import { User } from "@/types/user";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalOperators({ user }: { user: User }) {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`
    INSERT INTO operators (user_id, name, email, role_id, branch_id)
    VALUES (?, ?, ?, ?, ?)
  `);
  try {
    await statement.executeAsync([user.id, user.name, user.email, user.role_id, user.branch_id]);
  } catch (error) {
    throw new Error(`Error al intentar guardar operadores: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function GetLocalOperators() {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`SELECT * FROM operators`);
  try {
    const response = await statement.executeAsync();
    const data = await response.getAllAsync();
    return data as User[];
  } catch (error) {
    throw new Error(`Error al intentar obtener operadores: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function CleanLocalOperators() {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`DELETE FROM operators`);
  try {
    await statement.executeAsync();
  } catch (error) {
    throw new Error(`Error al intentar eliminar operadores: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}
