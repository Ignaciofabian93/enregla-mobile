import { View, StyleSheet } from "react-native";
import CustomTextInput from "@/components/inputs/textinput";
import MainButton from "@/components/buttons/mainbutton";
import useSession from "@/hooks/useSession";
import { validate_email, validate_password } from "@/utils/regexvalidations";

export default function Form() {
  const { login, form, handleForm, isPasswordVisible, togglePasswordVisibility } = useSession();
  return (
    <>
      <View style={styles.form}>
        <CustomTextInput
          value={form.email}
          onChangeText={(e) => handleForm("email", e)}
          size="lg"
          placeholder="Correo"
          isInvalid={validate_email(form.email)}
          errorMessage="Correo inválido"
          icon={true}
          iconName="mail"
        />
        <CustomTextInput
          value={form.password}
          onChangeText={(e) => handleForm("password", e)}
          size="lg"
          placeholder="Contraseña"
          isInvalid={validate_password(form.password)}
          errorMessage="Contraseña inválida"
          icon={true}
          iconName={isPasswordVisible ? "eye-off" : "eye"}
          onIconPress={togglePasswordVisibility}
          secureTextEntry={!isPasswordVisible}
        />
        <MainButton style={{ marginTop: 16 }} text="Iniciar sesión" onPress={login} type="primary" size="lg" />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  form: {
    width: "100%",
    height: "50%",
    justifyContent: "flex-start",
  },
});
