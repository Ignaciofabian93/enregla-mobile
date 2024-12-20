import Card from "@/components/card";
import Layout from "@/components/layout";
import CustomTextInput from "@/components/textinput";
import Notification from "@/components/toast";
import { FullTemplate } from "@/constants/templates/full";
import { LogoTemplate } from "@/constants/templates/logo";
import { LogoPlateTemplate } from "@/constants/templates/logo_plate";
import { VinLogoTemplate } from "@/constants/templates/logo_vin";
import { PlateTemplate } from "@/constants/templates/plate";
import { PlateVinTemplate } from "@/constants/templates/plate_vin";
import { VinTemplate } from "@/constants/templates/vin";
import usePrinter from "@/hooks/usePrinter";
import { GetLocalLabels } from "@/sqlite/labels";
import { GetLocalVehicles } from "@/sqlite/vehicles";
import { LocalLabel } from "@/types/label";
import { Vehicle } from "@/types/vehicle";
import { useFocusEffect } from "@react-navigation/native";
import { printAsync, printToFileAsync } from "expo-print";
import { useCallback, useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";

export default function RecordedLabels() {
  const [labels, setLabels] = useState<LocalLabel[]>([]);
  const [searched, setSearched] = useState<string>("");
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const { showMessage, message } = usePrinter();

  useFocusEffect(
    useCallback(() => {
      fetchLocalLabels();
    }, [])
  );

  const fetchLocalLabels = async () => {
    const response = await GetLocalLabels();
    setLabels(response);
  };

  useEffect(() => {
    getLocalVehicles();
  }, []);

  const getLocalVehicles = async () => {
    const response = await GetLocalVehicles();
    setVehicles(response);
  };

  const filtered = labels.filter((l) => {
    return (
      l.vehicle_plate.toLowerCase().includes(searched.toLowerCase()) || l.date.toLowerCase().includes(searched.toLowerCase())
    );
  });

  const handleSearch = (e: string) => setSearched(e);

  const rendered = searched !== "" ? filtered : labels;

  const print = async (label: LocalLabel) => {
    let html;
    const logo = vehicles.find((v) => v.brand === label.vehicle_brand);
    if (logo && label.show_vin && label.show_plate) {
      html = FullTemplate({
        vin: label.vehicle_vin,
        plate: label.vehicle_plate,
        logo: logo.logo,
      });
    } else if (logo && label.show_plate) {
      html = LogoPlateTemplate({
        plate: label.vehicle_plate,
        logo: logo.logo,
      });
    } else if (label.show_vin && label.show_plate) {
      html = PlateVinTemplate({
        plate: label.vehicle_plate,
        vin: label.vehicle_vin,
      });
    } else if (label.show_vin && logo) {
      html = VinLogoTemplate({
        vin: label.vehicle_vin,
        logo: logo.logo,
      });
    } else if (logo) {
      html = LogoTemplate({
        logo: logo.logo,
      });
    } else if (label.show_plate) {
      html = PlateTemplate({
        plate: label.vehicle_plate,
      });
    } else if (label.show_vin) {
      html = VinTemplate({ vin: label.vehicle_vin });
    }

    const file = await printToFileAsync({
      html,
      height: 397, // A7 height in px
      width: 279, // A7 width in px
      base64: false,
    });
    if (file.uri) {
      await printAsync({
        uri: file.uri,
        height: 397, // A7 height in px
        width: 279, // A7 width in px
        orientation: "portrait",
      });
    }
  };

  const confirmPrint = (label: LocalLabel) => {
    Alert.alert("Atención", "Desea reimprimir la etiqueta seleccionada?", [
      { text: "Cancelar", onPress: () => {} },
      { text: "Aceptar", onPress: () => print(label) },
    ]);
  };

  return (
    <>
      <Layout>
        <View style={styles.view}>
          <Notification visible={showMessage} message={message.content} type={message.type} />
          <View style={{ width: "100%" }}>
            <Text style={styles.title}>Reimprimir etiqueta</Text>
            <View style={{ width: "100%", marginBottom: 16 }}>
              <Text style={styles.field}>Buscar patente:</Text>
              <CustomTextInput
                value={searched}
                placeholder="ABCD12"
                multiline={false}
                verticalAlign="top"
                size="lg"
                onChangeText={(e) => handleSearch(e)}
              />
            </View>
          </View>
          <View style={{ width: "100%", paddingBottom: "50%", justifyContent: "flex-start" }}>
            <ScrollView contentContainerStyle={{ width: "100%", height: "auto" }}>
              <View style={{ marginBottom: 20, alignItems: "center" }}>
                <View style={{ width: "100%", height: "80%", paddingBottom: "10%" }}>
                  {rendered.map((l) => (
                    <View key={l.id} style={{ alignItems: "center", height: 100 }}>
                      <Card plate={l.vehicle_plate} date={l.date} onPress={() => confirmPrint(l)} />
                    </View>
                  ))}
                </View>
              </View>
            </ScrollView>
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
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontFamily: "Sora_SemiBold",
    fontSize: 22,
    paddingBottom: 16,
  },
  field: {
    width: "100%",
    textAlign: "left",
    fontFamily: "Sora_SemiBold",
    fontSize: 16,
  },
});
