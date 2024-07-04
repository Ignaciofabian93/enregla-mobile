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
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
});
