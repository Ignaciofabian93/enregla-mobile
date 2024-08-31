import { useEffect, useState } from "react";
import { printAsync } from "expo-print";
import { Label } from "@/types/label";
import { VehicleBrand, VehicleModel } from "@/types/vehicle";
import { GetLocalBrands } from "@/sqlite/brands";
import { GetLocalModels } from "@/sqlite/models";
import { PrintTemplate } from "@/constants/templates";
import { SaveLocalLabels } from "@/sqlite/labels";
import moment from "moment";
import useImagePicker from "./useImagePicker";
import useSessionStore from "@/store/session";
import useLocation from "./useLocation";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { User } from "@/types/user";

type Message = {
  content: string;
  type: "error" | "success" | "info";
};

const defaultLabel: Label = {
  id: 0,
  label_id: 0,
  user_id: 0,
  date: moment().format("DD-MM-YYYY"),
  branch_id: 0,
  label_quantity: 0,
  wrong_labels: 0,
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
  print_type: "",
  description: "",
};

export default function usePrinter() {
  const router = useRouter();
  const { session } = useSessionStore();
  const { coordinates } = useLocation();
  const { takePlatePhoto, takeVINPhoto, vinText, plateText } = useImagePicker();
  const [operators, setOperators] = useState<User[]>([]);
  const [vehicleBrands, setVehicleBrands] = useState<VehicleBrand[]>([]);
  const [vehicleModels, setVehicleModels] = useState<VehicleModel[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    content: "",
    type: "error",
  });
  const [form, setForm] = useState<Label>(defaultLabel);

  const handleMessageShow = () => setTimeout(() => setShowMessage(false), 2000);

  useEffect(() => {
    getLocalBrands();
    getLocalModels();
  }, []);

  useEffect(() => {
    if (session) {
      setForm({ ...form, branch_id: session.branch_id });
    }
  }, [session]);

  useEffect(() => {
    if (coordinates.latitude !== 0) {
      setForm({ ...form, coordinates: `${coordinates.latitude}, ${coordinates.longitude}` });
    }
  }, [coordinates]);

  useEffect(() => {
    if (plateText) {
      setForm({ ...form, vehicle_plate: plateText });
    } else if (vinText) {
      setForm({ ...form, vehicle_vin: vinText });
    }
  }, [plateText, vinText]);

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

  const labelIsOk = () => {
    setForm({ ...form, label_quantity: form.label_quantity + 1 });
    setConfirm(false);
  };

  const labelIsNotOk = () => {
    setForm({ ...form, label_quantity: form.label_quantity + 1, wrong_labels: form.wrong_labels + 1 });
    setConfirm(false);
  };

  const print = async () => {
    const html = PrintTemplate({ vin: form.vehicle_vin, plate: form.vehicle_plate, logo: form.vehicle_logo });
    await printAsync({ html, orientation: "portrait", height: 74, width: 105 });
    setConfirm(true);
  };

  const saveLabelData = () => {
    Alert.alert("Atención", "¿Está seguro de finalizar las impresiones de este registro?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Aceptar",
        onPress: async () => {
          setLoading(true);
          const localLabel = {
            id: form.id,
            label_id: form.label_id,
            user_id: form.user_id,
            date: form.date,
            branch_id: form.branch_id,
            label_quantity: form.label_quantity,
            wrong_labels: form.wrong_labels,
            coordinates: form.coordinates,
            vehicle_brand_id: form.vehicle_brand_id,
            vehicle_model_id: form.vehicle_model_id,
            vehicle_year: form.vehicle_year,
            show_vin: form.show_vin ? 1 : 0,
            vehicle_vin: form.vehicle_vin.toUpperCase(),
            show_plate: form.show_plate ? 1 : 0,
            vehicle_plate: form.vehicle_plate.toUpperCase(),
            show_logo: form.show_logo ? 1 : 0,
            print_type: form.print_type,
            description: form.description,
          };
          const response = await SaveLocalLabels({ label: localLabel });
          if (response > 0) {
            setMessage({ content: "Etiqueta guardada correctamente", type: "success" });
            setShowMessage(true);
            handleMessageShow();
            setForm(defaultLabel);
            setTimeout(() => {
              setLoading(false);
              router.replace("/(tabs)/");
            }, 2000);
          } else {
            setMessage({ content: "Error al guardar la etiqueta", type: "error" });
            setShowMessage(true);
            handleMessageShow();
            setLoading(false);
          }
        },
      },
    ]);
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
    vinText,
    plateText,
    showPreview,
    openPreview,
    closePreview,
    vehicleBrands,
    vehicleModels,
    confirm,
    labelIsOk,
    labelIsNotOk,
    saveLabelData,
  };
}
