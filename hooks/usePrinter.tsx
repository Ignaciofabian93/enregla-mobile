import { useEffect, useState } from "react";
import { printAsync } from "expo-print";
import { Label } from "@/types/label";
import { VehicleBrand, VehicleModel } from "@/types/vehicle";
import { GetLocalBrands } from "@/sqlite/brands";
import { GetLocalModels } from "@/sqlite/models";
import useImagePicker from "./useImagePicker";
import { PrintTemplate } from "@/constants/templates";

type Message = {
  content: string;
  type: "error" | "success" | "info";
};

export default function usePrinter() {
  const { takePlatePhoto, takeVINPhoto, vinImage, vinText, plateImage, plateText } = useImagePicker();
  const [vehicleBrands, setVehicleBrands] = useState<VehicleBrand[]>([]);
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
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
    vehicle_brand_id: 0,
    vehicle_model: "",
    vehicle_model_id: 0,
    vehicle_year: "",
    show_vin: false,
    vehicle_vin: "",
    show_plate: false,
    vehicle_plate: "",
    show_logo: false,
    vehicle_logo: "",
  });

  console.log("FORM: ", form);

  useEffect(() => {
    getLocalBrands();
    getLocalModels();
  }, []);

  const getLocalBrands = async () => {
    const response = await GetLocalBrands();
    setVehicleBrands(response);
  };

  const getLocalModels = async () => {
    const response = await GetLocalModels();
    setVehicleModels(response);
  };

  const handleForm = (field: string, value: string | boolean) => {
    if (field === "vehicle_brand") {
      const brand = vehicleBrands.find((brand) => brand.brand === value);
      console.log("brand , id: ", brand, value);
      setForm({
        ...form,
        vehicle_brand_id: brand?.brand_id as number,
        vehicle_brand: value as string,
        vehicle_logo: brand?.logo as string,
      });
    } else if (field === "vehicle_model") {
      const model = vehicleModels.find((model) => model.model === value);
      setForm({ ...form, vehicle_model_id: model?.model_id as number, vehicle_model: value as string });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const openPreview = () => setShowPreview(true);
  const closePreview = () => setShowPreview(false);

  const print = async () => {
    const html = PrintTemplate({ vin: form.vehicle_vin, plate: form.vehicle_plate, logo: form.vehicle_logo });
    await printAsync({ html, orientation: "portrait", height: 74, width: 105 });
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
    vehicleBrands,
    vehicleModels,
  };
}
