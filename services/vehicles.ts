import { endpoint } from "./endpoint";

export async function GetVehicleBrands({ token }: { token: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };
    const response = await fetch(`${endpoint}/vehicle/brand`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener marcas de vehículos: ${error}`);
  }
}

export async function GetVehicleModels({ token }: { token: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };
    const response = await fetch(`${endpoint}/vehicle/model`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener modelos de vehículos: ${error}`);
  }
}
