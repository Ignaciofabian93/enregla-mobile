import { useState } from "react";
import { printAsync } from "expo-print";
import { Label } from "@/types/label";
import useImagePicker from "./useImagePicker";

type Message = {
  content: string;
  type: "error" | "success" | "info";
};

export default function usePrinter() {
  const { takePlatePhoto, takeVINPhoto, vinImage, vinText, plateImage, plateText } = useImagePicker();
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    content: "",
    type: "error",
  });
  const [form, setForm] = useState<Label>({
    id: 0,
    user_id: 0,
    date: "",
    branch_id: 0,
    label_quantity: 0,
    purchase_number: "",
    price: "",
    coordinates: "",
    vehicle_brand: "",
    vehicle_model: "",
    vehicle_year: "",
    show_vin: false,
    vehicle_vin: "",
    show_plate: false,
    vehicle_plate: "",
    show_logo: false,
    vehicle_logo: "",
  });

  const handleForm = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  const openPreview = () => setShowPreview(true);
  const closePreview = () => setShowPreview(false);

  const print = async () => {
    // await printAsync({ html, orientation: "portrait", height: 74, width: 105 });
  };

  return {
    print,
    showMessage,
    loading,
    message,
    form,
    handleForm,
    takePlatePhoto,
    takeVINPhoto,
    vinImage,
    vinText,
    plateImage,
    plateText,
    showPreview,
    openPreview,
    closePreview,
  };
}
