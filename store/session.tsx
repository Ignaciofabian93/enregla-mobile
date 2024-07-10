import { User } from "@/types/user";
import { create } from "zustand";

export const defaultUser: User = {
  id: 0,
  name: "",
  email: "",
  rut: "",
  branch_id: 0,
  role_id: 0,
};

type sessionStore = {
  token: string;
  user: User;
  setToken: (token: string) => void;
  setUser: (user: User) => void;
};

const useSessionStore = create<sessionStore>((set) => ({
  token: "",
  user: {} as User,
  setToken: (token: string) => set({ token }),
  setUser: (user: User) => set({ user }),
}));

export default useSessionStore;
