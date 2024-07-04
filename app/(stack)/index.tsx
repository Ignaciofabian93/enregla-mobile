import { View, ActivityIndicator } from "react-native";
import Layout from "../ui/layout";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { colors } from "@/constants/theme";

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("(tabs)");
    }, 2000);
  }, []);

  return (
    <>
      <Layout>
        <View>
          <ActivityIndicator size={"large"} color={colors.primary} />
        </View>
      </Layout>
    </>
  );
}
