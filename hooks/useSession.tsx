import { useRouter } from "expo-router";

export default function useSession() {
  const router = useRouter();

  const login = () => {
    router.replace("(tabs)");
  };

  const closeSession = () => {
    router.replace("(stack)/login");
  };

  return { login, closeSession };
}
