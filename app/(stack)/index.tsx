import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constants/theme";
import Layout from "../ui/layout";
import useSessionStore from "@/store/session";

export default function Auth() {
  const { token } = useSessionStore();
  const router = useRouter();

  const navigateTo = (path: string) => {
    setTimeout(() => router.replace(path), 1000);
  };

  useEffect(() => {
    if (!token) navigateTo("(tabs)");
    else navigateTo("(tabs)");
  }, [token]);

  return (
    <>
      <Layout>
        <ActivityIndicator size={"large"} color={colors.primary[500]} />
      </Layout>
    </>
  );
}
