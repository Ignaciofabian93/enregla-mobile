import { StyleSheet, Text, View } from "react-native";
import { colors } from "@/constants/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import PrintForm from "@/app/ui/printForm";

export default function Printer() {
  const Title = () => {
    return (
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontFamily: "Sora_SemiBold" }}>Editar Etiqueta</Text>
      </View>
    );
  };

  return (
    <>
      <Layout>
        <Container>
          <Title />
          <View style={styles.content}>
            <KeyboardAwareScrollView
              style={{ width: "100%" }}
              contentContainerStyle={styles.scrollView}
              scrollEnabled
            >
              <PrintForm />
            </KeyboardAwareScrollView>
          </View>
        </Container>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "10%",
    marginBottom: 20,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  content: {
    width: "100%",
    height: "90%",
    justifyContent: "flex-start",
  },
  section: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    paddingBottom: 24,
    borderBottomColor: colors.light[300],
  },
  field: {
    width: "100%",
    textAlign: "left",
    fontFamily: "Sora_SemiBold",
    fontSize: 16,
    marginBottom: 16,
  },
  checkboxList: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
