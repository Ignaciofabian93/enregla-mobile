import MainButton from "@/components/buttons/mainbutton";
import useSession from "@/hooks/useSession";
import { View, StyleSheet } from "react-native";

export default function Footer() {
  const { closeSession } = useSession();
  return (
    <>
      <View style={styles.container}>
        <MainButton text="Cerrar sesión" onPress={closeSession} type="warning" size="lg" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
