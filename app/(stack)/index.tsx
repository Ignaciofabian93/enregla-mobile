import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import { Href, useRouter } from "expo-router";
import { colors } from "@/constants/theme";
import useSessionStore from "@/store/session";

export default function Auth() {
  const { token } = useSessionStore();
  const router = useRouter();

  const navigateTo = (path: Href<string | object>) => {
    setTimeout(() => router.replace(path), 1000);
  };

  useEffect(() => {
    if (!token) navigateTo("/(tabs)");
    else navigateTo("/(tabs)");
  }, [token]);

  return (
    <>
      <View>
        <ActivityIndicator size={"large"} color={colors.primary[500]} />
      </View>
    </>
  );
}
