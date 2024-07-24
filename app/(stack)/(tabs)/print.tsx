import { Alert, StyleSheet, Text, View } from "react-native";
import Container from "@/app/ui/container";
import Layout from "@/app/ui/layout";
import { BleManager, BleError, Device } from "react-native-ble-plx";
import { Buffer } from "buffer";
import { useEffect, useState } from "react";
import CustomCheckBox from "@/components/checkbox";
import PlateInput from "@/components/plateInput";

const manager = new BleManager();

const targetMacAddress = "00:11:22:33:44:55"; // ESC/POS device bluetooth MAC address

export default function Printer() {
  const [vin, setVin] = useState<string>("ABCDEFGHIJKLM123");
  const [carPlate, setCarPlate] = useState<string[]>([]);
  const [logo, setLogo] = useState<string>("");
  const [device, setDevice] = useState<Device>();
  const [hasVin, setHasVin] = useState<boolean>(false);
  const [hasPlate, setHasPlate] = useState<boolean>(false);
  const [hasLogo, setHasLogo] = useState<boolean>(false);

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
      // manager.destroy();
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

  const handlePlate = (position: number, value: string) => {
    if (position === 1) setCarPlate({ ...carPlate, [0]: value.toUpperCase() });
    else if (position === 2) setCarPlate({ ...carPlate, [1]: value.toUpperCase() });
    else if (position === 3) setCarPlate({ ...carPlate, [2]: value.toUpperCase() });
  };

  return (
    <>
      <Layout>
        <Container>
          <View style={styles.header}>
            <Text style={{ fontSize: 24 }}>Editar etiqueta</Text>
          </View>
          <View style={styles.content}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginBottom: "10%",
              }}
            >
              <CustomCheckBox title="VIN" checked={hasVin} onChange={() => setHasVin(!hasVin)} />
              <CustomCheckBox title="Patente" checked={hasPlate} onChange={() => setHasPlate(!hasPlate)} />
              <CustomCheckBox title="Logo" checked={hasLogo} onChange={() => setHasLogo(!hasLogo)} />
            </View>
            {hasPlate && (
              <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly" }}>
                <PlateInput plate={carPlate} handlePlate={handlePlate} />
              </View>
            )}
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
