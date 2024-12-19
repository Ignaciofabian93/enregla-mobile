import { LocalLabel } from "@/types/label";
import { openDatabaseAsync } from "expo-sqlite";

export async function SaveLocalLabels({ label }: { label: Omit<LocalLabel, "id"> }) {
  const db = await openDatabaseAsync("local.db");
  const statement = await db.prepareAsync(`
    INSERT INTO labels 
      (label_id, work_order, operator, operator_id, date, branch_id, label_quantity, wrong_labels, 
      coordinates, vehicle_id, vehicle_brand, show_vin, 
      show_plate, show_logo, vehicle_vin, vehicle_plate, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  try {
    const response = await statement.executeAsync([
      label.work_order,
      label.label_id,
      label.operator,
      label.operator_id,
      label.date,
      label.branch_id,
      label.label_quantity,
      label.wrong_labels,
      label.coordinates,
      label.vehicle_id,
      label.vehicle_brand,
      label.show_vin,
      label.show_plate,
      label.show_logo,
      label.vehicle_vin,
      label.vehicle_plate,
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
  const db = await openDatabaseAsync("local.db");
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
  const db = await openDatabaseAsync("local.db");
  const statement = await db.prepareAsync(`DELETE FROM labels`);
  try {
    await statement.executeAsync();
  } catch (error) {
    throw new Error(`Error al intentar eliminar información de etiquetas: ${error}`);
  } finally {
    await statement.finalizeAsync();
  }
}
