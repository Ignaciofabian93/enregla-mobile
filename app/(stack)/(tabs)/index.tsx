import { Image, Text, View, StyleSheet } from "react-native";
import Layout from "@/app/ui/layout";
import Container from "@/app/ui/container";
import CustomButton from "@/components/button";

const enregla = require("@/assets/icons/splash.png");

export default function Home() {
  return (
    <>
      <Layout>
        <Container>
          <View style={styles.header}>
            <Image source={enregla} resizeMode="contain" style={{ width: "50%" }} />
          </View>
          <View style={styles.footer}>
            <CustomButton text="Enviar datos" onPress={() => {}} type="primary" isLoading={false} />
            <CustomButton
              text="Cargar datos"
              onPress={() => {}}
              type="secondary"
              isLoading={false}
            />
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
    alignItems: "flex-start",
    justifyContent: "center",
  },
  footer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
