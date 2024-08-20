import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import { Href, useRouter } from "expo-router";
import { colors } from "@/constants/theme";
import useSessionStore from "@/store/session";
import useSync from "@/hooks/useSync";
import { GetLocalSession } from "@/sqlite/session";

export default function Auth() {
  const { session } = useSessionStore();
  const { loadData } = useSync();
  const router = useRouter();

  const navigateTo = (path: Href<string | object>) => {
    setTimeout(() => router.replace(path), 1000);
  };

  useEffect(() => {
    const getLocalSession = async () => {
      const response = await GetLocalSession();
      console.log("SESSION. ", response);
      if (response === null) navigateTo("/(stack)/login");
      if (response.token) navigateTo("/(tabs)");
      else navigateTo("/(stack)/login");
    };

    getLocalSession();
  }, [session]);

  return (
    <>
      <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={colors.primary[500]} />
      </View>
    </>
  );
}
