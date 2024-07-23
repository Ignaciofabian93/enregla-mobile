import { useEffect, useState } from "react";
import { Alert, Image, Text, View, StyleSheet } from "react-native";
import { GetBluetoothDevices, PrintLabelBluetooth } from "@/app/printer/printer";
import { NissanBase64_1, NissanBase64_2 } from "@/assets/icons/icon";
import Layout from "@/app/ui/layout";
import Container from "@/app/ui/container";
import LabelTemplate from "@/app/printer/template";
import EscPosPrinter from "react-native-esc-pos-printer";
import CustomButton from "@/components/button";

const enregla = require("@/assets/icons/splash.png");

type Devices = {
  deviceName: string;
  macAddress: string;
};

export default function Home() {
  const [devices, setDevices] = useState<Devices[]>([]);
  const targetMacAddress = "00:11:22:33:44:55"; // ESC/POS device bluetooth MAC address
  const [vin, setVin] = useState("ABCDEFGHIJKLM123");
  const [carPlate, setCarPlate] = useState("AB-CD-12");

  // const printer = new EscPosPrinter.

  useEffect(() => {
    // handleGetDevices();
  }, []);

  useEffect(() => {
    initializePrinter();
  }, []);

  async function initializePrinter() {
    try {
      const seriesName = "TM_T20"; // Replace with your printer's series name
      const language = "EPOS2_LANG_EN"; // Language for the printer

      const initResult = await EscPosPrinter.init({ target: targetMacAddress, seriesName: "EPOS2_TM_T88", language });
      console.log("Printer initialized:", initResult);
    } catch (error) {
      console.error("Initialization failed:", error);
    }
  }

  async function connectToPrinter() {
    try {
      const connectResult = await EscPosPrinter.connect(targetMacAddress);
      console.log("Printer connected:", connectResult);
    } catch (error) {
      console.error("Connection failed:", error);
    }
  }

  async function printLabel() {
    const labelContent = `VIN LABEL\n================================\nVIN: ${vin}\nPlate: ${carPlate}\n================================`;
  }

  const handleGetDevices = async () => {
    const devices = await GetBluetoothDevices();
    setDevices(devices);
  };

  const handlePrintLabel_1 = async () => {
    const targetDevice = devices.find((device) => device.macAddress === targetMacAddress);
    if (targetDevice) {
      Alert.alert("Impresora ESC/POS detectada");
    } else {
      Alert.alert("Impresora ESC/POS no detectada");
    }
    await PrintLabelBluetooth(LabelTemplate(vin, carPlate, NissanBase64_1), targetMacAddress);
  };

  const handlePrintLabel_2 = async () => {
    const targetDevice = devices.find((device) => device.macAddress === targetMacAddress);
    if (targetDevice) {
      Alert.alert("Impresora ESC/POS detectada");
    } else {
      Alert.alert("Impresora ESC/POS no detectada");
    }
    await PrintLabelBluetooth(LabelTemplate(vin, carPlate, NissanBase64_2), targetMacAddress);
  };

  console.log("devices: ", devices);

  return (
    <>
      <Layout>
        <Container>
          <View style={styles.header}>
            <Image source={enregla} resizeMode="contain" style={{ width: "50%" }} />
          </View>
          <View>
            {devices.map((device) => (
              <Text key={device.deviceName}>
                {device.deviceName} - {device.macAddress}
              </Text>
            ))}
          </View>
          <View style={styles.footer}>
            <CustomButton text="Enviar datos" onPress={printLabel} type="primary" isLoading={false} />
            <CustomButton text="Cargar datos" onPress={printLabel} type="secondary" isLoading={false} />
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
