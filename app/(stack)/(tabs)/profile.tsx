import { StyleSheet, Text, View } from "react-native";
import CustomButton from "@/components/button";
import Layout from "@/components/layout";

export default function Profile() {
  return (
    <>
      <Layout>
        <View style={styles.view}>
          <Text style={styles.title}>Información</Text>
          <View>
            <CustomButton text="Solicitar insumos" onPress={() => {}} type="primary" isLoading={false} />
            <CustomButton text="Cerrar sesión" onPress={() => {}} type="secondary" isLoading={false} />
          </View>
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
