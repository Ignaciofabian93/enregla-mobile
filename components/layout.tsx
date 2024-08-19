import { View, StyleSheet, Dimensions, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("screen");

export default function Layout({ children }: { children: React.ReactNode }) {
  const { top } = useSafeAreaInsets();
  return (
    <>
      <View style={[styles.container, { paddingTop: top }]}>
        <StatusBar barStyle="dark-content" />
        {children}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
});
