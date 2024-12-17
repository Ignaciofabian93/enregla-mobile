import { StyleSheet, Text, View } from "react-native";
import Layout from "@/components/layout";
import PrintForm from "@/components/forms/print";

export default function Print() {
  return (
    <>
      <Layout>
        <View style={styles.view}>
          <Text style={styles.title}>Imprimir Etiqueta</Text>
          <PrintForm />
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingVertical: 32,
  },
  title: {
    fontFamily: "Sora_SemiBold",
    fontSize: 22,
    paddingBottom: 16,
  },
});
