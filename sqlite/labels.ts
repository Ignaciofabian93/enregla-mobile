import { LocalLabel } from "@/types/label";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalLabels({ label }: { label: Omit<LocalLabel, "id"> }) {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`
    INSERT INTO labels 
      (label_id, user_id, date, branch_id, label_quantity, wrong_labels, 
      coordinates, vehicle_brand_id, vehicle_model_id, vehicle_year, show_vin, 
      show_plate, show_logo, vehicle_vin, vehicle_plate, print_type, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  try {
    const response = await statement.executeAsync([
      label.label_id,
      label.user_id,
      label.date,
      label.branch_id,
      label.label_quantity,
      label.wrong_labels,
      label.coordinates,
      label.vehicle_brand_id,
      label.vehicle_model_id,
      label.vehicle_year,
      label.show_vin,
      label.show_plate,
      label.show_logo,
      label.vehicle_vin,
      label.vehicle_plate,
      label.print_type,
      label.description,
    ]);
    return response.changes;
  } catch (error) {
    throw new Error(`Error al intentar guardar información de etiquetas: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function GetLocalLabels() {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`SELECT * FROM labels`);
  try {
    const response = await statement.executeAsync();
    const data = await response.getAllAsync();
    return data as LocalLabel[];
  } catch (error) {
    throw new Error(`Error al intentar obtener información de etiquetas: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}

export async function CleanLocalLabels() {
  const db = await openDatabaseAsync("enregla.db");
  const statement = await db.prepareAsync(`DELETE FROM labels`);
  try {
    await statement.executeAsync();
  } catch (error) {
    throw new Error(`Error al intentar eliminar información de etiquetas: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}
