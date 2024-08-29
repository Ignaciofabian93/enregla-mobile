import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { GetLocalLabels } from "@/sqlite/labels";
import { LocalLabel } from "@/types/label";
import CustomButton from "@/components/button";
import Card from "@/components/card";
import Layout from "@/components/layout";
import useSync from "@/hooks/useSync";
import useSessionStore from "@/store/session";

const enregla = require("@/assets/icons/splash.png");

export default function Home() {
  const { session } = useSessionStore();
  const { refreshData, loading, sendLabelsData } = useSync();
  const [labels, setLabels] = useState<LocalLabel[]>([]);

  useFocusEffect(
    useCallback(() => {
      fetchLocalLabels();
    }, [])
  );

  const fetchLocalLabels = async () => {
    const response = await GetLocalLabels();
    setLabels(response);
  };

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
            <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 16, marginBottom: 12 }}>Actividad reciente</Text>
            {labels.length ? (
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  width: "auto",
                  height: "100%",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                {labels.map((label) => (
                  <Card
                    key={label.id}
                    plate={label.vehicle_plate}
                    vin={label.vehicle_vin}
                    price={Number(label.price)}
                    print_type={label.print_type}
                    date={label.date}
                  />
                ))}
              </ScrollView>
            ) : (
              <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 18 }}>No hay registros</Text>
              </View>
            )}
          </View>
          <View>
            <CustomButton
              text="Enviar datos"
              onPress={() => sendLabelsData({ token: session.token })}
              type="primary"
              isLoading={false}
            />
            <CustomButton
              text="Cargar datos"
              onPress={() => refreshData({ token: session.token, branch_id: session.branch_id })}
              type="secondary"
              isLoading={loading}
            />
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
