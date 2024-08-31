import { Session } from "@/types/session";
import { create } from "zustand";

export const defaultSession: Session = {
  token: "",
  id: 0,
  email: "",
  name: "",
  branch_id: 0,
  role_id: 0,
};

type sessionStore = {
  session: Session;
  setSession: (session: Session) => void;
};

const useSessionStore = create<sessionStore>((set) => ({
  session: defaultSession,
  setSession: (session: Session) => set({ session }),
}));

export default useSessionStore;
