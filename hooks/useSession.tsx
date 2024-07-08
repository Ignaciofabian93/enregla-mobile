import { useRouter } from "expo-router";
import { useState } from "react";

export default function useSession() {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const login = () => {
    router.replace("(tabs)");
  };

  const closeSession = () => {
    router.replace("(stack)/login");
  };

  return { login, closeSession, handleForm, form, isPasswordVisible, togglePasswordVisibility };
}
