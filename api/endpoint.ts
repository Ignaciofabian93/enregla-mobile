const environment: "development" | "testing" | "production" = "development";

const protocol: string = environment === "development" ? "http" : "https";
const host: string = environment === "development" ? "10.146.151.129" : "216.225.204.60";
const port: string = environment === "development" ? "4000" : "4000";

export const API_URL = `${protocol}://${host}:${port}`;
