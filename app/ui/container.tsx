import { View, StyleSheet } from "react-native";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <View style={styles.container}>{children}</View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "96%",
    paddingHorizontal: 12,
    paddingTop: 56,
    paddingBottom: 24,
    marginBottom: 88,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
