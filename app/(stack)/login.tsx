import { Image, StyleSheet, Text, View, Dimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import LoginForm from "@/components/forms/login";
import KeyBoardDismiss from "@/components/keyboardDismiss";

const { width, height } = Dimensions.get("window");

const enregla = require("@/assets/icons/splash.png");

export default function Login() {
  return (
    <>
      <KeyBoardDismiss>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} scrollEnabled>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={enregla} resizeMode="contain" style={{ width: "70%", height: "80%" }} />
              <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 18 }}>Etiquetadora VIN</Text>
            </View>
            <LoginForm />
            <View style={styles.footer}>
              <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 12 }}>enregla&copy;</Text>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyBoardDismiss>
    </>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    width,
    height,
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 30,
    paddingHorizontal: 16,
    paddingTop: 60,
  },
  header: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%",
    height: "50%",
    justifyContent: "flex-start",
  },
  footer: {
    width: "100%",
    height: "5%",
    alignItems: "center",
  },
});
