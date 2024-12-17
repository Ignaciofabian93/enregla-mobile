import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, StyleSheet } from "react-native";
import { GetLocalLabels } from "@/sqlite/labels";
import CustomButton from "@/components/button";
import Layout from "@/components/layout";
import useSync from "@/hooks/useSync";
import useSessionStore from "@/store/session";
import MenuCard from "@/components/navigation/menuCard";

export default function Home() {
  const { session } = useSessionStore();
  const { refreshData, loadingData, sendLabelsData, sendingData } = useSync();
  const [haveToSync, setHaveToSync] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      fetchLocalLabels();
    }, [haveToSync, sendingData])
  );

  const fetchLocalLabels = async () => {
    const response = await GetLocalLabels();
    if (response.some((label) => label.label_id === 0)) {
      setHaveToSync(true);
    } else {
      setHaveToSync(false);
    }
  };

  return (
    <>
      <Layout>
        <View style={styles.view}>
          <View style={{ width: "100%" }}>
            <View>
              <Text style={styles.title}>Bienvenido</Text>
            </View>
            <View>
              <Text style={{ fontFamily: "Sora_SemiBold", fontSize: 14 }}>
                {haveToSync ? "Hay etiquetas sin enviar" : "Todo actualizado"}
              </Text>
            </View>
          </View>
          <View
            style={{ width: "100%", height: "30%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}
          >
            <MenuCard title="Nueva etiqueta" link="/(tabs)/print" />
            <MenuCard title="Reimprimir etiqueta" link="/(tabs)/record" />
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
  view: {
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    paddingTop: 32,
  },
  title: {
    fontFamily: "Sora_SemiBold",
    fontSize: 22,
    marginBottom: 16,
  },
});
