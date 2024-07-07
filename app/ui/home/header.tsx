import { fontStyles } from "@/constants/theme";
import { View, StyleSheet, Image, Text } from "react-native";

const enregla = require("@/assets/icons/enregla.png");

export default function Header() {
  return (
    <>
      <View style={styles.header}>
        <Text style={fontStyles.title}>enregla</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
