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
  const { takePlatePhoto, plate, chasis, takeChasisPhoto } = useImagePicker();
  const [devices, setDevices] = useState<Devices[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    content: "",
    type: "error",
  });
  const [labelInformation, setLabelInformation] = useState({
    car_brand: "",
    car_model: "",
    car_year: "",
    car_chasisnumber: "",
    chasis_img: "",
    show_vin: false,
    car_vin: "JDSJDUWEYUWEJ8237",
    show_plate: false,
    car_plate: ["", "", ""],
    plate_img: "",
    show_logo: false,
    car_logo: "",
  });

  useEffect(() => {
    handleGetDevices();
  }, []);

  useEffect(() => {
    if (plate) {
      setLabelInformation({ ...labelInformation, plate_img: plate });
    } else if (chasis) {
      setLabelInformation({ ...labelInformation, chasis_img: chasis });
    }
  }, [plate, chasis]);

  const handleGetDevices = async () => {
    const devices = await GetBluetoothDevices();
    setDevices(devices);
  };

  const handleMessageShow = () => setTimeout(() => setShowMessage(false), 2000);

  const handleLabelInformation = (field: string, value: string | boolean) => {
    setLabelInformation({ ...labelInformation, [field]: value });
  };

  const handleCarPlate = (section: number, value: string) => {
    if (section === 0) {
      setLabelInformation({
        ...labelInformation,
        car_plate: [value, labelInformation.car_plate[1], labelInformation.car_plate[2]],
      });
    } else if (section === 1) {
      setLabelInformation({
        ...labelInformation,
        car_plate: [labelInformation.car_plate[0], value, labelInformation.car_plate[2]],
      });
    } else if (section === 2) {
      setLabelInformation({
        ...labelInformation,
        car_plate: [labelInformation.car_plate[0], labelInformation.car_plate[1], value],
      });
    }
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
          carPlate: labelInformation.car_plate.join("-"),
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
          carPlate: labelInformation.car_plate.join("-"),
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

  return {
    takePlatePhoto,
    takeChasisPhoto,
    plate,
    chasis,
    handlePrintLabel,
    handleLabelInformation,
    handleCarPlate,
    labelInformation,
    message,
    loading,
    showMessage,
    handlePrintLabel_2,
    handlePrintLabel_3,
    handlePrintLabel_4,
    handlePrintLabel_5,
  };
}
