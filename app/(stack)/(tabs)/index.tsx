import Layout from "@/app/ui/layout";
import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { GetBluetoothDevices, PrintLabelBluetooth } from "@/app/printer/printer";
import LabelTemplate from "@/app/printer/template";
import Container from "@/app/ui/container";
import Header from "@/app/ui/home/header";
import Content from "@/app/ui/home/content";
import Footer from "@/app/ui/home/footer";
import { NissanBase64_1, NissanBase64_2 } from "@/assets/icons/icon";

type Devices = {
  deviceName: string;
  macAddress: string;
};

export default function Home() {
  const [devices, setDevices] = useState<Devices[]>([]);
  const targetMacAddress = "00:11:22:33:44:55"; // ESC/POS device bluetooth MAC address
  const [vin, setVin] = useState("ABCDEFGHIJKLM123");
  const [carPlate, setCarPlate] = useState("AB-CD-12");

  useEffect(() => {
    handleGetDevices();
  }, []);

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
          <Header />
          {/* <Content /> */}
          <View>
            {devices.map((device) => (
              <Text key={device.deviceName}>
                {device.deviceName} - {device.macAddress}
              </Text>
            ))}
          </View>
          <View style={{ width: "100%", height: "20%", justifyContent: "space-evenly" }}>
            <Button title="Imprimir Etiqueta 1" onPress={handlePrintLabel_1} />
            <Button title="Imprimir Etiqueta 2" onPress={handlePrintLabel_2} />
          </View>
          <Footer />
        </Container>
      </Layout>
    </>
  );
}
