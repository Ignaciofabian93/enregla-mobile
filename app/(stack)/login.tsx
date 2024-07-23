import { Image, StyleSheet, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyBoardDismiss from "../ui/keyboarddismiss";
import Layout from "../ui/layout";
import LoginForm from "../ui/loginForm";

const enregla = require("@/assets/icons/splash.png");

export default function Login() {
  return (
    <>
      <KeyBoardDismiss>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} scrollEnabled>
          <Layout>
            <View style={styles.container}>
              <View style={styles.header}>
                <Image source={enregla} resizeMode="contain" style={{ width: "70%", height: "80%" }} />
                <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 18 }}>Etiquetadora VIN</Text>
              </View>
              {/* <View style={styles.form}> */}
              <LoginForm />
              {/* </View> */}
              <View style={styles.footer}>
                <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 12 }}>enregla&copy;</Text>
              </View>
            </View>
          </Layout>
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
  },
  container: {
    width: "100%",
    height: "100%",
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
