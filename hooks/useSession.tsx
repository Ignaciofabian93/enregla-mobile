import { useRouter } from "expo-router";
import { useState } from "react";
import useSessionStore, { defaultSession } from "@/store/session";
import { Auth } from "@/services/auth";

type Message = {
  content: string;
  type: "error" | "success" | "info";
};

export default function useSession() {
  const router = useRouter();
  const { setToken, setSession } = useSessionStore();
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
    console.log(response);
    setToken(response.token);
    setMessage({
      content: "Iniciando sesión",
      type: "success",
    });
    setShowMessage(true);
    handleMessageShow();
    setTimeout(() => {
      setLoading(false);
      router.replace("/(tabs)");
    }, 2000);
  };

  const closeSession = () => {
    setToken("");
    router.replace("/login");
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
