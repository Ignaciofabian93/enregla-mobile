import { Label } from "@/types/label";
import { endpoint } from "./endpoint";

export async function GetLabels({ token }: { token: string }) {
  try {
    const options: RequestInit = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(`${endpoint}/label`, options);
    const data = await response.json();
    console.log("RES", data);
    return data;
  } catch (error) {
    throw new Error(`Error al intentar obtener etiquetas guardadas: ${error}`);
  }
}

export async function SaveLabel({ token, labels }: { token: string; labels: Label[] }) {
  try {
    const options: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ labels }),
    };
    const response = await fetch(`${endpoint}/label`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar guardar información de etiqueta: ${error}`);
  }
}
