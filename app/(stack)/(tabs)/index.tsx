import Layout from "@/app/ui/layout";
import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { GetBluetoothDevices, PrintLabelBluetooth } from "@/app/printer/printer";
import LabelTemplate from "@/app/printer/template";
import Container from "@/app/ui/container";
import Header from "@/app/ui/home/header";
import Content from "@/app/ui/home/content";
import Footer from "@/app/ui/home/footer";

type Devices = {
  deviceName: string;
  macAddress: string;
};

export default function Home() {
  const [devices, setDevices] = useState<Devices[]>([]);
  const targetMacAddress = "00:11:22:33:44:55"; // ESC/POS device bluetooth MAC address

  useEffect(() => {
    handleGetDevices();
  }, []);

  const handleGetDevices = async () => {
    const devices = await GetBluetoothDevices();
    setDevices(devices);
  };

  const handlePrintLabel = async () => {
    const targetDevice = devices.find((device) => device.macAddress === targetMacAddress);
    if (targetDevice) {
      Alert.alert("Impresora ESC/POS detectada");
    } else {
      Alert.alert("Impresora ESC/POS no detectada");
    }
    // await PrintLabelBluetooth(LabelTemplate(), targetMacAddress);
  };

  console.log("devices: ", devices);

  return (
    <>
      <Layout>
        <Container>
          <Header />
          <Content />
          <Footer />
        </Container>
      </Layout>
    </>
  );
}
