import { fontStyles } from "@/constants/theme";
import { Text, View, StyleSheet, Image } from "react-native";

const enregla = require("@/assets/icons/splash.png");

export default function Header() {
  return (
    <>
      <View style={styles.container}>
        <Image source={enregla} resizeMode="contain" style={{ width: "70%", height: "80%" }} />
        <Text style={fontStyles.detail}>Etiquetadora VIN</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
});
