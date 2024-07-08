import Layout from "../ui/layout";
import Header from "../ui/login/header";
import Form from "../ui/login/form";
import Footer from "../ui/login/footer";
import Container from "../ui/login/container";
import KeyBoardDismiss from "../ui/keyboarddismiss";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Login() {
  return (
    <>
      <KeyBoardDismiss>
        <KeyboardAwareScrollView contentContainerStyle={styles.scrollView} scrollEnabled>
          <Layout>
            <Container>
              <Header />
              <Form />
              <Footer />
            </Container>
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
});
