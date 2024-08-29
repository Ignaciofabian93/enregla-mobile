import { VehicleModel } from "@/types/vehicle";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalModels({ vehicle_model }: { vehicle_model: Omit<VehicleModel, "id"> }) {
  const db = await openDatabaseAsync("enregla-mobile.db");
  const statement = await db.prepareAsync(`
    INSERT INTO vehicle_models (brand_id, model_id, model)
    VALUES (?, ?, ?)
  `);
  try {
    await statement.executeAsync([vehicle_model.brand_id, vehicle_model.model_id, vehicle_model.model]);
  } catch (error) {
    throw new Error(`Error al intentar guardar modelos de vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function GetLocalModels() {
  const db = await openDatabaseAsync("enregla-mobile.db");
  const statement = await db.prepareAsync(`SELECT * FROM vehicle_models`);
  try {
    const response = await statement.executeAsync();
    const data = await response.getAllAsync();
    return data as VehicleModel[];
  } catch (error) {
    throw new Error(`Error al intentar obtener modelos de vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function CleanLocalModels() {
  const db = await openDatabaseAsync("enregla-mobile.db");
  const statement = await db.prepareAsync(`DELETE FROM vehicle_models`);
  try {
    await statement.executeAsync();
  } catch (error) {
    throw new Error(`Error al intentar eliminar modelos de vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}
