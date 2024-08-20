import { useRouter } from "expo-router";
import { useState } from "react";
import useSessionStore, { defaultSession } from "@/store/session";
import { Auth } from "@/services/auth";
import { Session } from "@/types/session";
import useSync from "./useSync";
import { DeleteLocalSession, SaveLocalSession } from "@/sqlite/session";

type Message = {
  content: string;
  type: "error" | "success" | "info";
};

export default function useSession() {
  const router = useRouter();
  const { loadData } = useSync();
  const { setSession } = useSessionStore();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    content: "",
    type: "error",
  });
  const [form, setForm] = useState({
    rut: "",
    password: "",
  });

  const handleForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleMessageShow = () => setTimeout(() => setShowMessage(false), 2000);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const login = async () => {
    const { rut, password } = form;
    if (!rut || !password) {
      setMessage({
        content: "Todos los campos son obligatorios",
        type: "error",
      });
      setShowMessage(true);
      handleMessageShow();
      return;
    }
    const response = await Auth({ rut, password });
    setLoading(true);
    if (response.error) {
      setMessage({
        content: response.error,
        type: "error",
      });
      setShowMessage(true);
      handleMessageShow();
      setLoading(false);
      return;
    }
    setMessage({
      content: "Iniciando sesión",
      type: "success",
    });
    const result: Session = {
      token: response.token,
      id: response.user.id,
      name: response.user.name,
      rut: response.user.rut,
      email: response.user.email,
    };
    setShowMessage(true);
    handleMessageShow();
    setSession(result);
    await SaveLocalSession({ session: result });
    loadData({ token: response.token });
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 2000);
  };

  const closeSession = async () => {
    setSession(defaultSession);
    await DeleteLocalSession();
    setTimeout(() => {
      setLoading(false);
      router.replace("/login");
    }, 2000);
  };

  return {
    login,
    closeSession,
    handleForm,
    form,
    isPasswordVisible,
    togglePasswordVisibility,
    showMessage,
    message,
    loading,
  };
}
