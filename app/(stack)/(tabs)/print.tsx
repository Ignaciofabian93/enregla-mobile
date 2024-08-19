import { StyleSheet, Text, View } from "react-native";
import CustomButton from "@/components/button";
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
  },
  title: {
    fontFamily: "Sora_SemiBold",
    fontSize: 24,
  },
});
