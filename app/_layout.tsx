import { colors } from "@/constants/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Sora_Bold: require("../assets/fonts/Sora-Bold.ttf"),
    Sora_Semi_Bold: require("../assets/fonts/Sora-SemiBold.ttf"),
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
    <Stack screenOptions={{ navigationBarColor: colors.light[100] }}>
      <Stack.Screen name="(stack)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}