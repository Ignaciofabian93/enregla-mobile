import { colors } from "@/constants/theme";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("screen");

export default function Layout({ children }: { children: React.ReactNode }) {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <View style={[styles.container, { paddingTop: top }]}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.dark,
    paddingBottom: 50,
  },
});
