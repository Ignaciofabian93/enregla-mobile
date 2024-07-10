import { API_URL } from "./endpoint";

export const authUser = async ({ email, password }: { email: string; password: string }) => {
  console.log(email, password);

  try {
    const options: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };
    const response = await fetch(`${API_URL}/auth`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error al intentar iniciar sesión: ${error}`);
  }
};
