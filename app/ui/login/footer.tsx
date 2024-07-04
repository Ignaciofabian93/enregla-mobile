import { colors, fontStyles } from "@/constants/theme";
import { Text, View, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>enregla&copy;</Text>
        <Text style={styles.text}>Todos los derechos reservados</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  text: {
    fontSize: fontStyles.sm,
    color: colors.textWhite,
  },
});
