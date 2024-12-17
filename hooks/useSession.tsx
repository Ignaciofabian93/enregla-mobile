import { useRouter } from "expo-router";
import { useState } from "react";
import { Auth } from "@/services/auth";
import { Session } from "@/types/session";
import { DeleteLocalSession, SaveLocalSession } from "@/sqlite/session";
import useSessionStore, { defaultSession } from "@/store/session";
import useSync from "./useSync";

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
    email: "",
    password: "",
  });

  const handleForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleMessageShow = () => setTimeout(() => setShowMessage(false), 3000);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const login = async () => {
    // const { email, password } = form;
    // if (!email || !password) {
    //   setMessage({
    //     content: "Todos los campos son obligatorios",
    //     type: "error",
    //   });
    //   setShowMessage(true);
    //   handleMessageShow();
    //   return;
    // }
    // setLoading(true);
    // try {
    //   const response = await Auth({ email, password });
    //   if (response.error) {
    //     setMessage({
    //       content: response.error,
    //       type: "error",
    //     });
    //     setShowMessage(true);
    //     handleMessageShow();
    //     setLoading(false);
    //     return;
    //   }
    //   setMessage({
    //     content: "Iniciando sesión",
    //     type: "success",
    //   });
    //   const result: Session = {
    //     token: response.token,
    //     id: response.user.id,
    //     name: response.user.name,
    //     email: response.user.email,
    //     branch_id: response.user.branch_id,
    //     role_id: response.user.role_id,
    //   };
    //   setShowMessage(true);
    //   // handleMessageShow();
    //   setSession(result);
    //   await SaveLocalSession({ session: result });
    //   loadData({ token: response.token });
    //   setMessage({
    //     content: "Cargando datos",
    //     type: "success",
    //   });
    setTimeout(() => {
      router.replace("/(tabs)");
      setLoading(false);
    }, 3000);
    // } catch (error) {
    //   setMessage({
    //     content: "Error al iniciar sesión",
    //     type: "error",
    //   });
    //   setShowMessage(true);
    //   handleMessageShow();
    //   setLoading(false);
    //   console.error("Login error: ", error);
    // }
  };

  const closeSession = async () => {
    setLoading(true);
    setSession(defaultSession);
    await DeleteLocalSession();
    setTimeout(() => {
      setLoading(false);
      router.replace("/login");
      setLoading(false);
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
