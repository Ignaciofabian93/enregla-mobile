import { ActivityIndicator, View } from "react-native";
import { useEffect } from "react";
import { Href, useRouter } from "expo-router";
import { colors } from "@/constants/theme";
import { GetLocalSession } from "@/sqlite/session";
import useSessionStore from "@/store/session";
import useSync from "@/hooks/useSync";

export default function Auth() {
  const router = useRouter();
  const { setSession } = useSessionStore();
  const { loadData } = useSync();

  const navigateTo = (path: Href<string | object>) => {
    setTimeout(() => router.replace(path), 1000);
  };

  useEffect(() => {
    const getLocalSession = async () => {
      // const response = await GetLocalSession();
      // if (!response) navigateTo("/(stack)/login");
      // else if (response.token) {
      //   loadData({ token: response.token });
      //   setSession(response);
      navigateTo("/(tabs)");
    };
    // };

    getLocalSession();
  }, []);

  return (
    <>
      <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
        <ActivityIndicator size={"large"} color={colors.primary[500]} />
      </View>
    </>
  );
}
