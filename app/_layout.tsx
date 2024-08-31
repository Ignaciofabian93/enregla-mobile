import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import Providers from "./providers";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Sora_Bold: require("../assets/fonts/Sora-Bold.ttf"),
    Sora_SemiBold: require("../assets/fonts/Sora-SemiBold.ttf"),
    Sora_Regular: require("../assets/fonts/Sora-Regular.ttf"),
    Sora_Light: require("../assets/fonts/Sora-Light.ttf"),
    Sora_ExtraLight: require("../assets/fonts/Sora-ExtraLight.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Providers>
      <RootSiblingParent>
        <SafeAreaProvider>
          <Stack screenOptions={{ navigationBarColor: "#2f2f2f", animationTypeForReplace: "pop" }}>
            <Stack.Screen name="(stack)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </SafeAreaProvider>
      </RootSiblingParent>
    </Providers>
  );
}
