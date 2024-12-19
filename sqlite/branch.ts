import { Branch } from "@/types/branch";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalBranch({ branch }: { branch: Omit<Branch, "id"> }) {
  const db = await openDatabaseAsync("local.db");
  const statement = await db.prepareAsync(`
    INSERT INTO branch (branch_id, address, location, telephone)
    VALUES (?, ?, ?, ?)
  `);
  try {
    await statement.executeAsync([branch.branch_id, branch.address, branch.location, branch.telephone]);
  } catch (error) {
    throw new Error(`Error al intentar guardar sucursal: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function GetLocalBranch() {
  const db = await openDatabaseAsync("local.db");
  const statement = await db.prepareAsync(`
    SELECT * FROM branch LIMIT 1
  `);
  try {
    const result = await statement.executeAsync();
    const branch = await result.getFirstAsync();
    return branch;
  } catch (error) {
    throw new Error(`Error al intentar obtener sucursal: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function CleanLocalBranch() {
  const db = await openDatabaseAsync("local.db");
  const statement = await db.prepareAsync(`DELETE FROM branch`);
  try {
    await statement.executeAsync();
  } catch (error) {
    throw new Error(`Error al intentar eliminar sucursal: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}
