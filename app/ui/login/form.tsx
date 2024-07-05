import { View, StyleSheet } from "react-native";
import CustomTextInput from "@/components/inputs/textinput";
import MainButton from "@/components/buttons/mainbutton";
import useSession from "@/hooks/useSession";

export default function Form() {
  const { login } = useSession();
  return (
    <>
      <View style={styles.form}>
        <CustomTextInput size="lg" placeholder="Correo" />
        <CustomTextInput size="lg" placeholder="Contraseña" />
        <MainButton text="Iniciar sesión" onPress={login} type="primary" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
  },
});
