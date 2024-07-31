import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  ScrollView,
  Dimensions,
} from "react-native";
import Layout from "@/app/ui/layout";
import Container from "@/app/ui/container";
import CustomButton from "@/components/button";
import Card from "@/components/card";
import { colors } from "@/constants/theme";

const { width } = Dimensions.get("window");

const enregla = require("@/assets/icons/splash.png");

const Info = ({ style }: TouchableOpacityProps) => {
  return (
    <>
      <TouchableOpacity
        style={[
          style,
          {
            borderRadius: 12,
            backgroundColor: "#fff",
            elevation: 2,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: colors.light[400],
          },
        ]}
      >
        <Text>Info</Text>
      </TouchableOpacity>
    </>
  );
};

export default function Home() {
  return (
    <>
      <Layout>
        <Container>
          <View style={styles.header}>
            <Image source={enregla} resizeMode="contain" style={{ width: "50%" }} />
          </View>
          <View style={styles.content}>
            <View
              style={{
                width: "100%",
                height: "45%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontFamily: "Sora_SemiBold",
                  fontSize: 22,
                  marginBottom: 10,
                  textAlign: "left",
                  width: "100%",
                }}
              >
                Bienvenido
              </Text>
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    fontFamily: "Sora_SemiBold",
                    fontSize: 16,
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  Última sincronización: {new Date().toISOString().slice(0, 10)}
                </Text>
              </View>
              <View
                style={{
                  width: "90%",
                  height: "40%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Info style={{ width: "30%", height: "100%" }} />
                <Info style={{ width: "30%", height: "100%" }} />
                <Info style={{ width: "30%", height: "100%" }} />
              </View>
            </View>
            <View style={styles.scrollViewContainer}>
              <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 16, marginBottom: 10 }}>
                Etiquetas recientes:
              </Text>
              <ScrollView
                horizontal
                contentContainerStyle={styles.scrollViewContent}
                showsHorizontalScrollIndicator={false}
              >
                <Card />
                <Card />
                <Card />
                <Card />
                <Card />
              </ScrollView>
            </View>
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
  content: {
    width: "100%",
    height: "64%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scrollViewContainer: {
    width: "100%",
    height: "50%",
  },
  scrollViewContent: {
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  footer: {
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
