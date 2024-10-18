import useSession from "@/hooks/useSession";
import Notification from "@/components/toast";
import CustomTextInput from "@/components/textinput";
import CustomButton from "@/components/button";
import { View } from "react-native";
import { validate_email } from "@/utils/regex";

export default function LoginForm() {
  const { login, form, handleForm, isPasswordVisible, togglePasswordVisibility, message, showMessage, loading } = useSession();
  return (
    <View style={{ width: "100%", height: "50%", justifyContent: "flex-start" }}>
      <Notification visible={showMessage} message={message.content} type={message.type} />
      <View style={{ marginBottom: 20 }}>
        <CustomTextInput
          value={form.email}
          onChangeText={(e) => handleForm("email", e)}
          size="lg"
          placeholder="Email"
          isInvalid={validate_email(form.email)}
          errorMessage="Formato de email inválido"
          icon={true}
          iconName="person"
          keyboardType="default"
          autoCapitalize="none"
        />
        <CustomTextInput
          value={form.password}
          onChangeText={(e) => handleForm("password", e)}
          size="lg"
          placeholder="Contraseña"
          icon={true}
          iconName={isPasswordVisible ? "eye-off" : "eye"}
          onIconPress={togglePasswordVisibility}
          secureTextEntry={!isPasswordVisible}
        />
      </View>
      <View>
        <CustomButton text="Iniciar sesión" onPress={login} type="primary" size="lg" isLoading={loading} />
      </View>
    </View>
  );
}
