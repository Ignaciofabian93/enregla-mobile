import { Vehicle } from "@/types/vehicle";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalVehicles({ vehicle }: { vehicle: Omit<Vehicle, "id"> }) {
  const db = await openDatabaseAsync("local.db");
  const statement = await db.prepareAsync(`
    INSERT INTO vehicles (vehicle_id, brand, logo)
    VALUES (?, ?, ?)
  `);
  try {
    await statement.executeAsync([vehicle.vehicle_id, vehicle.brand, vehicle.logo]);
  } catch (error) {
    throw new Error(`Error al intentar guardar vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function GetLocalVehicles() {
  const db = await openDatabaseAsync("local.db");
  const statement = await db.prepareAsync(`SELECT * FROM vehicles`);
  try {
    const response = await statement.executeAsync();
    const data = await response.getAllAsync();
    return data as Vehicle[];
  } catch (error) {
    throw new Error(`Error al intentar obtener vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function CleanLocalVehicles() {
  const db = await openDatabaseAsync("local.db");
  const statement = await db.prepareAsync(`DELETE FROM vehicles`);
  try {
    await statement.executeAsync();
  } catch (error) {
    throw new Error(`Error al intentar eliminar vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}
