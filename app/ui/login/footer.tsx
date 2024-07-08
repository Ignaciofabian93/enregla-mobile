import { colors, fontStyles } from "@/constants/theme";
import { Text, View, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <>
      <View style={styles.container}>
        <Text style={fontStyles.mark}>enregla&copy;</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "5%",
    alignItems: "center",
  },
  text: {
    color: colors.text.white,
  },
});
