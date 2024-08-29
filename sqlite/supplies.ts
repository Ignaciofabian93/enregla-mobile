import { Supply } from "@/types/supply";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalSupplies({ supply }: { supply: Omit<Supply, "id"> }) {
  const db = await openDatabaseAsync("enregla-mobile.db");
  const statement = await db.prepareAsync(`
    INSERT INTO supplies (supply_id, name, category, price, quantity, branch, agency)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);
  try {
    const response = await statement.executeAsync([
      supply.supply_id,
      supply.name,
      supply.category,
      supply.price,
      supply.quantity,
      supply.branch,
      supply.agency,
    ]);
    return response.changes;
  } catch (error) {
    throw new Error(`Error al intentar guardar insumos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function GetLocalSupplies() {
  const db = await openDatabaseAsync("enregla-mobile.db");
  const statement = await db.prepareAsync(`SELECT * FROM supplies`);
  try {
    const response = await statement.executeAsync();
    const data = await response.getAllAsync();
    return data as Supply[];
  } catch (error) {
    throw new Error(`Error al intentar obtener insumos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function CleanLocalSupplies() {
  const db = await openDatabaseAsync("enregla-mobile.db");
  const statement = await db.prepareAsync(`DELETE FROM supplies`);
  try {
    await statement.executeAsync();
  } catch (error) {
    throw new Error(`Error al intentar eliminar insumos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}
