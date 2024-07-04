import Layout from "@/app/ui/layout";
import { useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { GetBluetoothDevices, PrintLabelBluetooth } from "@/app/printer/printer";
import LabelTemplate from "@/app/printer/template";

type Devices = {
  deviceName: string;
  macAddress: string;
};

export default function Home() {
  const [devices, setDevices] = useState<Devices[]>([]);
  const targetMacAddress = "88:12:e4:41:78:39"; // ESC/POS device bluetooth MAC address

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
        <View>
          {devices &&
            devices.map((device, index) => (
              <View key={index}>
                <Text style={{ color: "#fff", fontSize: 18 }}>
                  Nombre: {device.deviceName} -- MAC: {device.macAddress}
                </Text>
              </View>
            ))}
          <Button title="Print" onPress={handlePrintLabel} />
        </View>
      </Layout>
    </>
  );
}
