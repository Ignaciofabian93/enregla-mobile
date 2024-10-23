import { initDatabase } from "@/sqlite/db";
import { SQLiteProvider } from "expo-sqlite";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SQLiteProvider databaseName="enregla-integral.db" onInit={initDatabase}>
      {children}
    </SQLiteProvider>
  );
}
