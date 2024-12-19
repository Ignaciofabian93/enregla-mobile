import { useEffect, useState } from "react";
import { printAsync, printToFileAsync } from "expo-print";
import { Label } from "@/types/label";
import { Vehicle } from "@/types/vehicle";
import { GetLocalVehicles } from "@/sqlite/vehicles";
import { SaveLocalLabels } from "@/sqlite/labels";
import { Alert } from "react-native";
import { useRouter } from "expo-router";
import { User } from "@/types/user";
import { GetLocalOperators } from "@/sqlite/operators";
import { FullTemplate } from "@/constants/templates/full";
import { LogoPlateTemplate } from "@/constants/templates/logo_plate";
import { LogoTemplate } from "@/constants/templates/logo";
import { PlateTemplate } from "@/constants/templates/plate";
import { PlateVinTemplate } from "@/constants/templates/plate_vin";
import { VinLogoTemplate } from "@/constants/templates/logo_vin";
import { VinTemplate } from "@/constants/templates/vin";
import moment from "moment";
import useImagePicker from "./useImagePicker";
import useSessionStore from "@/store/session";
import useLocation from "./useLocation";

type Message = {
  content: string;
  type: "error" | "success" | "info";
};

const defaultLabel: Label = {
  id: 0,
  label_id: 0,
  work_order: "",
  operator: "",
  operator_id: 0,
  date: moment().format("DD-MM-YYYY HH:mm"),
  branch_id: 0,
  label_quantity: 0,
  wrong_labels: 0,
  coordinates: "",
  vehicle_id: 0,
  vehicle_brand: "",
  show_vin: false,
  show_plate: false,
  show_logo: false,
  vehicle_vin: "",
  vehicle_plate: "",
  vehicle_logo: "",
  description: "",
};

export default function usePrinter() {
  const router = useRouter();
  const { session } = useSessionStore();
  const { coordinates } = useLocation();
  const { takePlatePhoto, takeVINPhoto, vinText, plateText } = useImagePicker();
  const [operators, setOperators] = useState<User[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [confirm, setConfirm] = useState<boolean>(false);
  const [askAgain, setAskAgain] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [message, setMessage] = useState<Message>({
    content: "",
    type: "error",
  });
  const [form, setForm] = useState<Label>(defaultLabel);

  console.log("form: ", form);

  const onRefresh = () => {
    setRefreshing(true);
    setForm(defaultLabel);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const handleMessageShow = () => setTimeout(() => setShowMessage(false), 2000);

  useEffect(() => {
    getLocalVehicles();
    getLocalOperators();
  }, []);

  // useEffect(() => {
  //   if (labelSelected) {
  //     fillForm();
  //   }
  // }, [labelSelected]);

  // const fillForm = () => {
  //   const findBrand = vehicles.find((el) => el.id === labelSelected.vehicle_id);
  //   setForm({
  //     id: labelSelected.id,
  //     label_id: labelSelected.label_id,
  //     work_order: labelSelected.work_order,
  //     operator: labelSelected.operator,
  //     operator_id: labelSelected.operator_id,
  //     date: moment().format("DD-MM-YYYY"),
  //     branch_id: labelSelected.branch_id,
  //     label_quantity: labelSelected.label_quantity,
  //     wrong_labels: labelSelected.wrong_labels,
  //     coordinates: labelSelected.coordinates,
  //     vehicle_id: labelSelected.vehicle_id,
  //     show_vin: labelSelected.show_vin === 1 ? true : false,
  //     vehicle_vin: labelSelected.vehicle_vin,
  //     show_plate: labelSelected.show_plate === 1 ? true : false,
  //     vehicle_plate: labelSelected.vehicle_plate,
  //     show_logo: labelSelected.show_logo === 1 ? true : false,
  //     vehicle_logo: findBrand?.logo as string,
  //     description: labelSelected.description,
  //   });
  // };

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
    if (vinText) {
      setForm({ ...form, vehicle_vin: vinText });
    }
  }, [vinText]);

  useEffect(() => {
    if (plateText) {
      setForm({ ...form, vehicle_plate: plateText });
    }
  }, [plateText]);

  const getLocalVehicles = async () => {
    const response = await GetLocalVehicles();
    setVehicles(response);
  };

  const getLocalOperators = async () => {
    const response = await GetLocalOperators();
    const filteredOperators = response.filter((operator) => operator.role_id === 3);

    setOperators(filteredOperators);
  };

  const handleForm = (field: string, value: string | boolean) => {
    if (field === "operator") {
      const operator = operators.find((operator) => operator.name === value);
      setForm({ ...form, operator_id: Number(operator?.user_id), operator: value as string });
    } else if (field === "vehicle_id") {
      const vehicle = vehicles.find((vehicle) => vehicle.brand === value);
      setForm({
        ...form,
        vehicle_id: vehicle?.vehicle_id as number,
        vehicle_brand: vehicle?.brand as string,
        vehicle_logo: vehicle?.logo as string,
      });
    } else {
      setForm({ ...form, [field]: value });
    }
  };

  const openPreview = () => setShowPreview(true);
  const closePreview = () => setShowPreview(false);

  const labelIsOk = () => {
    setConfirm(false);
    setAskAgain(false);
  };

  const labelIsNotOk = () => {
    setForm({ ...form, label_quantity: form.label_quantity + 1, wrong_labels: form.wrong_labels + 1 });
    setConfirm(false);
  };

  const print = async () => {
    let html;

    if (form.show_logo && form.show_vin && form.show_plate) {
      html = FullTemplate({
        vin: form.vehicle_vin,
        plate: form.vehicle_plate,
        logo: form.vehicle_logo,
      });
    } else if (form.show_logo && form.show_plate) {
      html = LogoPlateTemplate({
        plate: form.vehicle_plate,
        logo: form.vehicle_logo,
      });
    } else if (form.show_vin && form.show_plate) {
      html = PlateVinTemplate({
        plate: form.vehicle_plate,
        vin: form.vehicle_vin,
      });
    } else if (form.show_vin && form.show_logo) {
      html = VinLogoTemplate({
        vin: form.vehicle_vin,
        logo: form.vehicle_logo,
      });
    } else if (form.show_logo) {
      html = LogoTemplate({
        logo: form.vehicle_logo,
      });
    } else if (form.show_plate) {
      html = PlateTemplate({
        plate: form.vehicle_plate,
      });
    } else if (form.show_vin) {
      html = VinTemplate({ vin: form.vehicle_vin });
    }

    const file = await printToFileAsync({
      html,
      height: 397, // A7 height in px
      width: 279, // A7 width in px
      base64: false,
    });
    if (file.uri) {
      await printAsync({
        uri: file.uri,
        height: 397, // A7 height in px
        width: 279, // A7 width in px
        orientation: "portrait",
      });

      setConfirm(true);
      setForm({ ...form, label_quantity: form.label_quantity + 1 });
    }
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
            work_order: form.work_order,
            label_id: form.label_id,
            operator: form.operator,
            operator_id: form.operator_id,
            date: form.date,
            branch_id: form.branch_id,
            label_quantity: form.label_quantity,
            wrong_labels: form.wrong_labels,
            coordinates: form.coordinates,
            vehicle_id: form.vehicle_id,
            vehicle_brand: form.vehicle_brand,
            show_vin: form.show_vin ? 1 : 0,
            show_plate: form.show_plate ? 1 : 0,
            show_logo: form.show_logo ? 1 : 0,
            vehicle_vin: form.vehicle_vin.toUpperCase(),
            vehicle_plate: form.vehicle_plate.toUpperCase(),
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
    vehicles,
    confirm,
    labelIsOk,
    labelIsNotOk,
    saveLabelData,
    operators,
    askAgain,
    onRefresh,
    refreshing,
  };
}
