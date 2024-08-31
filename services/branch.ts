import { endpoint } from "@/services/endpoint";

export async function GetBranchData({ token }: { token: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/branches`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener información de sucursal: ${error}`);
  }
}
