import CustomButton from "@/components/button";
import Layout from "@/components/layout";
import { Image, Text, View, StyleSheet } from "react-native";

const enregla = require("@/assets/icons/splash.png");

export default function Home() {
  return (
    <>
      <Layout>
        <View style={styles.view}>
          <View style={styles.logo}>
            <Image source={enregla} resizeMode="contain" style={{ width: "42%", height: "100%" }} />
          </View>
          <Text style={styles.title}>Bienvenido</Text>
          <View>
            <CustomButton text="Enviar datos" onPress={() => {}} type="primary" isLoading={false} />
            <CustomButton text="Cargar datos" onPress={() => {}} type="secondary" isLoading={false} />
          </View>
        </View>
      </Layout>
    </>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "10%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
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
