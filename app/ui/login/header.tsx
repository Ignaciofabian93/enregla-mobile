import { colors, fontStyles } from "@/constants/theme";
import { Text, View, StyleSheet } from "react-native";

export default function Header() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>EnRegla</Text>
        <Text style={styles.subtitle}>Seguridad automotriz</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    color: colors.text.white,
  },
  subtitle: {
    color: colors.text.white,
  },
});
