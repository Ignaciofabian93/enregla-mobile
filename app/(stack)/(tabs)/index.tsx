import CustomButton from "@/components/button";
import Card from "@/components/card";
import Layout from "@/components/layout";
import useHome from "@/hooks/useHome";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";

const enregla = require("@/assets/icons/splash.png");

export default function Home() {
  const { labels } = useHome();
  console.log(labels);

  return (
    <>
      <Layout>
        <View style={styles.view}>
          <View style={styles.logo}>
            <Image source={enregla} resizeMode="contain" style={{ width: "42%", height: "100%" }} />
          </View>
          <View style={{ width: "100%", height: "8%", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Text style={styles.title}>Bienvenido</Text>
          </View>
          <View style={{ width: "100%", height: "45%" }}>
            {labels.length ? (
              labels.map((label) => (
                <>
                  <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 16, marginBottom: 12 }}>Actividad reciente</Text>
                  <ScrollView contentContainerStyle={{ width: "auto", height: "100%" }}>
                    <Card
                      plate={label.vehicle_plate}
                      vin={label.vehicle_vin}
                      price={Number(label.price)}
                      print_type={label.print_type}
                      date={label.date}
                    />
                  </ScrollView>
                </>
              ))
            ) : (
              <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 18 }}>No hay registros</Text>
              </View>
            )}
          </View>
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
    paddingTop: 32,
  },
  title: {
    fontFamily: "Sora_SemiBold",
    fontSize: 24,
  },
});
