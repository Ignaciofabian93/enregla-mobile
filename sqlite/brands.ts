import { VehicleBrand } from "@/types/vehicle";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalBrands({ vehicle_brand }: { vehicle_brand: Omit<VehicleBrand, "id"> }) {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`
    INSERT INTO vehicle_brands (brand_id, brand, logo)
    VALUES (?, ?, ?)
  `);
  try {
    await statement.executeAsync([vehicle_brand.brand_id, vehicle_brand.brand, vehicle_brand.logo]);
  } catch (error) {
    throw new Error(`Error al intentar guardar marcas de vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function GetLocalBrands() {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`SELECT * FROM vehicle_brands`);
  try {
    const response = await statement.executeAsync();
    const data = await response.getAllAsync();
    return data as VehicleBrand[];
  } catch (error) {
    throw new Error(`Error al intentar obtener marcas de vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function CleanLocalBrands() {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`DELETE FROM vehicle_brands`);
  try {
    await statement.executeAsync();
  } catch (error) {
    throw new Error(`Error al intentar eliminar marcas de vehículos: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}
