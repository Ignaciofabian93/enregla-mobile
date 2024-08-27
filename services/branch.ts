import { endpoint } from "@/services/endpoint";

export async function GetBranchData({ token, branch_id }: { token: string; branch_id: number }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/branch/${branch_id}`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener información de sucursal: ${error}`);
  }
}
