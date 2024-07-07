import MainButton from "@/components/buttons/mainbutton";
import { View, StyleSheet } from "react-native";

export default function Footer() {
  return (
    <>
      <View style={styles.footer}>
        <MainButton text="Enviar datos" onPress={() => {}} type="primary" size="lg" />
        <MainButton text="Cargar datos" onPress={() => {}} type="secondary" size="lg" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  footer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
