import { Alert, StyleSheet, Text, View } from "react-native";
import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import { BleManager, BleError, Device } from "react-native-ble-plx";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";

const manager = new BleManager();

const targetMacAddress = "00:11:22:33:44:55"; // ESC/POS device bluetooth MAC address

export default function Printer() {
  const [vin, setVin] = useState<string>("ABCDEFGHIJKLM123");
  const [carPlate, setCarPlate] = useState<string>("AB-CD-12");
  const [logo, setLogo] = useState<string>("");
  const [device, setDevice] = useState<Device>();

  const labelContent = `VIN LABEL\n================================\nVIN: ${vin}\nPlate: ${carPlate}\n================================`;

  useEffect(() => {
    connectToPrinter()
      .then((connectedDevice) => {
        setDevice(connectedDevice as Device);
        console.log("Connected to printer: ", connectedDevice);
      })
      .catch((error) => {
        console.log("Error connecting to printer: ", error);
      });

    return () => {
      manager.destroy();
    };
  }, []);

  async function connectToPrinter() {
    return new Promise((resolve, reject) => {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log("Device scan error: ", error);
          return;
        }

        if ((device as Device).id === targetMacAddress) {
          manager.stopDeviceScan();
          device
            ?.connect()
            .then((device) => device.discoverAllServicesAndCharacteristics())
            .then((device) => resolve(device))
            .catch((error) => reject(error));
        }
      });
    });
  }

  async function printLabel() {
    if (!device) {
      Alert.alert("Printer not connected");
      return;
    }

    const serviceUUID = "YOUR_PRINTER_SERVICE_UUID"; // Replace with your printer's service UUID
    const characteristicUUID = "YOUR_PRINTER_CHARACTERISTIC_UUID"; // Replace with your printer's characteristic UUID

    const command = Buffer.from(labelContent, "utf8");

    try {
      await device.writeCharacteristicWithoutResponseForService(serviceUUID, characteristicUUID, command.toString("base64"));
      console.log("Label printed successfully");
    } catch (error) {
      console.error("Printing failed:", error);
    }
  }

  return (
    <>
      <Layout>
        <Container>
          <View style={styles.header}>
            <Text style={{ fontSize: 24 }}>Formulario</Text>
          </View>
          <View style={styles.content}>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginBottom: 24 }}>
              <Text>Patente</Text>
              <Text>Logo</Text>
              <Text>VIN</Text>
            </View>
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
              <View style={{ width: 50, height: 30, borderWidth: 2 }}></View>
              <Text>-</Text>
              <View style={{ width: 50, height: 30, borderWidth: 2 }}></View>
              <Text>-</Text>
              <View style={{ width: 50, height: 30, borderWidth: 2 }}></View>
            </View>
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
  },
  content: {
    width: "100%",
    height: "85%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  footer: {},
});
