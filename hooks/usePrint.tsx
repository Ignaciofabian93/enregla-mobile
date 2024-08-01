import { useEffect, useState } from "react";
import useImagePicker from "./useImagePicker";
import { GetBluetoothDevices, PrintLabelBluetooth } from "@/app/printer/printer";
import { NissanBase64_1, NissanHEX_1 } from "@/assets/icons/icon";
import { Alert } from "react-native";
import {
  FullLabelTemplate,
  VINPlateLabelTemplate,
  Logo64LabelTemplate,
  PNGLabelTemplate,
  URLLabelTemplate,
} from "@/app/printer/template";
import { LabelForm } from "@/types/label";

type Devices = {
  deviceName: string;
  macAddress: string;
};

type Message = {
  content: string;
  type: "error" | "success" | "info";
};

const pnglogo = require("@/assets/icons/CbiNissan.png");

export default function usePrint() {
  const targetMacAddress = "00:11:22:33:44:55"; // ESC/POS device bluetooth MAC address
  const { takePlatePhoto, plate, vin, plateText, vinText, takeVINPhoto } = useImagePicker();
  const [devices, setDevices] = useState<Devices[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    content: "",
    type: "error",
  });
  const [labelInformation, setLabelInformation] = useState<LabelForm>({
    car_brand: "",
    car_model: "",
    car_year: "",
    show_vin: false,
    car_vin: "",
    vin_img: "",
    show_plate: false,
    car_plate: "",
    plate_img: "",
    show_logo: false,
    car_logo: "",
  });

  useEffect(() => {
    handleGetDevices();
  }, []);

  useEffect(() => {
    if (plateText) {
      console.log("PLATE TEXT: ", plateText);
      setLabelInformation({ ...labelInformation, car_plate: plateText });
    }
    if (vinText) {
      console.log("VIN TEXT: ", vinText);
      setLabelInformation({ ...labelInformation, car_vin: vinText });
    }
  }, [plateText, vinText]);

  const handleGetDevices = async () => {
    const devices = await GetBluetoothDevices();
    setDevices(devices);
  };

  const handleMessageShow = () => setTimeout(() => setShowMessage(false), 2000);

  const handleLabelInformation = (field: string, value: string | boolean) => {
    setLabelInformation({ ...labelInformation, [field]: value });
  };

  const handlePrintLabel = async () => {
    const targetDevice = devices.find((device) => device.macAddress === targetMacAddress);
    if (targetDevice) {
      setMessage({ content: "Imprimiendo etiqueta", type: "success" });
      handleMessageShow();
      await PrintLabelBluetooth(
        FullLabelTemplate({
          vin: labelInformation.car_vin,
          logo: NissanBase64_1,
          carPlate: labelInformation.car_plate,
        }),
        targetMacAddress
      );
    }
  };

  const handlePrintLabel_2 = async () => {
    const targetDevice = devices.find((device) => device.macAddress === targetMacAddress);
    if (targetDevice) {
      setMessage({ content: "Imprimiendo etiqueta", type: "success" });
      handleMessageShow();
      await PrintLabelBluetooth(
        VINPlateLabelTemplate({
          vin: labelInformation.car_vin,
          carPlate: labelInformation.car_plate,
        }),
        targetMacAddress
      );
    }
  };

  const handlePrintLabel_3 = async () => {
    const targetDevice = devices.find((device) => device.macAddress === targetMacAddress);
    if (targetDevice) {
      setMessage({ content: "Imprimiendo etiqueta", type: "success" });
      handleMessageShow();
      await PrintLabelBluetooth(
        Logo64LabelTemplate({
          logo: NissanBase64_1,
        }),
        targetMacAddress
      );
    }
  };

  const handlePrintLabel_4 = async () => {
    const targetDevice = devices.find((device) => device.macAddress === targetMacAddress);
    if (targetDevice) {
      setMessage({ content: "Imprimiendo etiqueta", type: "success" });
      handleMessageShow();
      await PrintLabelBluetooth(
        PNGLabelTemplate({
          logo: pnglogo,
        }),
        targetMacAddress
      );
    }
  };

  const handlePrintLabel_5 = async () => {
    const targetDevice = devices.find((device) => device.macAddress === targetMacAddress);
    if (targetDevice) {
      setMessage({ content: "Imprimiendo etiqueta", type: "success" });
      handleMessageShow();
      await PrintLabelBluetooth(URLLabelTemplate(), targetMacAddress);
    }
  };

  const openPreview = () => setShowPreview(true);
  const closePreview = () => setShowPreview(false);

  return {
    takePlatePhoto,
    takeVINPhoto,
    handlePrintLabel,
    handleLabelInformation,
    labelInformation,
    message,
    loading,
    showMessage,
    handlePrintLabel_2,
    handlePrintLabel_3,
    handlePrintLabel_4,
    handlePrintLabel_5,
    openPreview,
    closePreview,
    showPreview,
  };
}
