import { endpoint } from "./endpoint";

export async function GetVehicles({ token }: { token: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };
    const response = await fetch(`${endpoint}/vehicle/brand`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener vehículos: ${error}`);
  }
}
