import { View, ActivityIndicator } from "react-native";
import Layout from "../ui/layout";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constants/theme";
import useSessionStore from "@/store/session";

export default function Auth() {
  const { token } = useSessionStore();
  const router = useRouter();

  const navigateTo = (path: string) => {
    setTimeout(() => router.replace(path), 1000);
  };

  useEffect(() => {
    if (!token) navigateTo("login");
    else navigateTo("(tabs)");
  }, [token]);

  return (
    <>
      <Layout>
        <View>
          <ActivityIndicator size={"large"} color={colors.primary.default} />
        </View>
      </Layout>
    </>
  );
}
