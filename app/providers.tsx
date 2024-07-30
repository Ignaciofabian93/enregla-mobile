import { SQLiteProvider } from "expo-sqlite";
import initDatabase from "@/sqlite/db";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SQLiteProvider databaseName="enregla" onInit={initDatabase}>
      {children}
    </SQLiteProvider>
  );
}
