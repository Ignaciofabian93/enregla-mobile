import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Image, Text, View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { GetLocalLabels } from "@/sqlite/labels";
import { LocalLabel } from "@/types/label";
import CustomButton from "@/components/button";
import Card from "@/components/card";
import Layout from "@/components/layout";
import useSync from "@/hooks/useSync";
import useSessionStore from "@/store/session";
import useLabelStore from "@/store/label";
import { useRouter } from "expo-router";

const enregla = require("@/assets/icons/splash.png");

export default function Home() {
  const router = useRouter();
  const { session } = useSessionStore();
  const { setLabelSelected } = useLabelStore();
  const [labels, setLabels] = useState<LocalLabel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { refreshData, loadingData, sendLabelsData, sendingData } = useSync();
  const [haveToSync, setHaveToSync] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchLocalLabels();
    }, [haveToSync, sendingData])
  );



  const selectLabel = (label: LocalLabel) => {
    setLabelSelected(label);
    setTimeout(() => {
      router.push("/(tabs)/print");
    }, 1000);
  };

  const fetchLocalLabels = async () => {
    setLoading(true);
    const response = await GetLocalLabels();
    if (response.some((label) => label.label_id === 0)) {
      setHaveToSync(true);
    } else {
      setHaveToSync(false);
    }
    setLabels(response);
    setLoading(false);
  };

  return (
    <>
      <Layout>
        <View style={styles.view}>
          <View style={styles.logo}>
            <Image source={enregla} resizeMode="contain" style={{ width: "40%", height: "100%" }} />
          </View>
          <View style={{ width: "100%", height: "8%", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
            <Text style={styles.title}>Bienvenido</Text>
          </View>
          <View>
            <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 14 }}>
              {haveToSync ? "Hay etiquetas sin enviar" : "Todo actualizado"}
            </Text>
          </View>
          <View style={{ width: "100%", height: "38%", maxHeight: 200 }}>
            <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 16, marginBottom: 8 }}>Actividad reciente</Text>
            {loading ? (
              <View style={{ width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                <ActivityIndicator size="large" color="#00ffff" />
              </View>
            ) : labels.length ? (
              <ScrollView
                horizontal={true}
                contentContainerStyle={{
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                {labels.map((label) => (
                  <Card
                    key={label.id}
                    plate={label.vehicle_plate}
                    vin={label.vehicle_vin}
                    operator={label.operator}
                    date={label.date}
                    onPress={() => selectLabel(label)}
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
              isLoading={sendingData}
            />
            <CustomButton
              text="Cargar datos"
              onPress={() => refreshData({ token: session.token })}
              type="secondary"
              isLoading={loadingData}
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
    height: "5%",
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
    fontSize: 22,
  },
});
