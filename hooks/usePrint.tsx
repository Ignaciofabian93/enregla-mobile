import { useEffect, useState } from "react";
import useImagePicker from "./useImagePicker";
import { GetBluetoothDevices, PrintLabelBluetooth } from "@/app/printer/printer";
import { NissanBase64_1, NissanHEX_1 } from "@/assets/icons/icon";
import { Alert } from "react-native";
import LabelTemplate from "@/app/printer/template";

type Devices = {
  deviceName: string;
  macAddress: string;
};

export default function usePrint() {
  const targetMacAddress = "00:11:22:33:44:55"; // ESC/POS device bluetooth MAC address
  const { takePhoto, base64 } = useImagePicker();
  const [devices, setDevices] = useState<Devices[]>([]);
  const [vin, setVin] = useState<string>("ABCDEFGHIJKLM123");
  const [carPlate, setCarPlate] = useState<string[]>([]);
  const [logo, setLogo] = useState<string>("");
  const [hasVin, setHasVin] = useState<boolean>(false);
  const [hasPlate, setHasPlate] = useState<boolean>(false);
  const [hasLogo, setHasLogo] = useState<boolean>(false);

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
    // await PrintLabelBluetooth(
    //   LabelTemplate({ vin, logo: NissanHEX_1, carPlate: carPlate.join("-") }),
    //   targetMacAddress
    // );
  };

  const handlePlate = (position: number, value: string) => {
    if (position === 1) setCarPlate({ ...carPlate, [0]: value.toUpperCase() });
    else if (position === 2) setCarPlate({ ...carPlate, [1]: value.toUpperCase() });
    else if (position === 3) setCarPlate({ ...carPlate, [2]: value.toUpperCase() });
  };

  const handleChecks = (field: string) => {
    if (field === "hasVin") setHasVin(!hasVin);
    else if (field === "hasPlate") setHasPlate(!hasPlate);
    else if (field === "hasLogo") setHasLogo(!hasLogo);
  };

  return {
    vin,
    carPlate,
    logo,
    hasVin,
    hasPlate,
    hasLogo,
    handlePlate,
    handleChecks,
    takePhoto,
    base64,
    handlePrintLabel,
  };
}
