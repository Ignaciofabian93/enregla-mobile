import { addEventListener } from "@react-native-community/netinfo";
import { GetVehicles } from "@/services/vehicles";
import { SaveLocalVehicles, CleanLocalVehicles } from "@/sqlite/vehicles";
import { Vehicle } from "@/types/vehicle";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { GetBranchData } from "@/services/branch";
import { CleanLocalBranch, SaveLocalBranch } from "@/sqlite/branch";
import { Branch } from "@/types/branch";
import { CleanLocalLabels, GetLocalLabels, SaveLocalLabels } from "@/sqlite/labels";
import { GetLabels, SaveLabel } from "@/services/labels";
import { Label, LocalLabel } from "@/types/label";
import { GetAllOperators } from "@/services/operators";
import { CleanLocalOperators, SaveLocalOperators } from "@/sqlite/operators";
import { User } from "@/types/user";

export default function useSync() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<string>("");
  const [sendingData, setSendingData] = useState<boolean>(false);
  const [loadingData, setLoadingData] = useState<boolean>(false);

  useEffect(() => {
    // Subscription to network status changes
    const unsubscribe = addEventListener((state) => {
      setIsConnected(state.isConnected || false);
      setConnectionType(state.type || null);
    });

    // Clean up the subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchVehicles = async ({ token }: { token: string }) => {
    setLoadingData(true);
    const response = await GetVehicles({ token });
    if (response.error) {
      setLoadingData(false);
      return Alert.alert("Error", response.error);
    }
    await CleanLocalVehicles();
    for (const v of response.vehicles) {
      const vehicle: Omit<Vehicle, "id"> = {
        brand: v.brand,
        vehicle_id: v.id,
        logo: v.logo,
      };
      await SaveLocalVehicles({ vehicle });
    }
    setLoadingData(false);
  };

  const fetchOperatorsList = async ({ token }: { token: string }) => {
    setLoadingData(true);
    const response = await GetAllOperators({ token });
    if (response.error) {
      setLoadingData(false);
      return Alert.alert("Error", response.error);
    }
    await CleanLocalOperators();
    for (const operator of response.users) {
      const operatorObject: User = {
        id: operator.id,
        user_id: operator.id,
        name: operator.name,
        email: operator.email,
        role_id: operator.role_id,
        branch_id: operator.branch_id,
      };
      await SaveLocalOperators({ user: operatorObject });
    }
    setLoadingData(false);
  };

  const fetchBranchData = async ({ token }: { token: string }) => {
    setLoadingData(true);
    const response = await GetBranchData({ token });
    if (response.error) {
      setLoadingData(false);
      return Alert.alert("Error", response.error);
    }
    await CleanLocalBranch();
    const branchObject: Omit<Branch, "id"> = {
      branch_id: response.branches[0].id,
      address: response.branches[0].address,
      location: response.branches[0].location,
      telephone: response.branches[0].telephone,
    };
    await SaveLocalBranch({ branch: branchObject });
    setLoadingData(false);
  };

  const fetchLabelsData = async ({ token }: { token: string }) => {
    setLoadingData(true);
    const response = await GetLabels({ token });
    if (response.error) {
      setLoadingData(false);
      return Alert.alert("Error", response.error);
    }
    await CleanLocalLabels();
    for (const label of response.labels) {
      const labelObject: Omit<LocalLabel, "id"> = {
        label_id: label.id,
        work_order: label.work_order,
        operator: label.operator,
        operator_id: label.operator_id,
        date: label.date,
        branch_id: label.branch_id,
        label_quantity: label.label_quantity,
        wrong_labels: label.wrong_labels,
        coordinates: label.coordinates,
        vehicle_id: label.vehicle_brand_id,
        vehicle_brand: label.vehicle_brand,
        show_vin: label.show_vin,
        vehicle_vin: label.vehicle_vin,
        show_plate: label.show_plate,
        vehicle_plate: label.vehicle_plate,
        show_logo: label.show_logo,
        description: label.description,
      };
      await SaveLocalLabels({ label: labelObject });
    }
    setLoadingData(false);
  };

  const loadData = ({ token }: { token: string }) => {
    Promise.all([
      fetchOperatorsList({ token }),
      fetchVehicles({ token }),
      fetchBranchData({ token }),
      fetchLabelsData({ token }),
    ]);
  };

  const generateAndSendLabelData = async ({ token }: { token: string }) => {
    setSendingData(true);
    const labels = await GetLocalLabels();

    if (labels.length) {
      const formattedLabels: Label[] = labels
        .filter((el) => el.label_id === 0)
        .map((label) => ({
          id: label.id,
          work_order: label.work_order,
          label_id: label.label_id,
          operator: label.operator,
          operator_id: label.operator_id,
          date: label.date,
          branch_id: label.branch_id,
          label_quantity: label.label_quantity,
          wrong_labels: label.wrong_labels,
          coordinates: label.coordinates,
          vehicle_id: label.vehicle_id,
          vehicle_brand: label.vehicle_brand,
          show_vin: label.show_vin === 1 ? true : false,
          vehicle_vin: label.vehicle_vin,
          show_plate: label.show_plate === 1 ? true : false,
          vehicle_plate: label.vehicle_plate,
          show_logo: label.show_logo === 1 ? true : false,
          vehicle_logo: "",
          description: label.description,
        }));
      const response = await SaveLabel({ token, labels: formattedLabels });
      if (response.error) {
        Alert.alert("Error", response.error);
        setSendingData(false);
      } else {
        Alert.alert("Éxito", "Datos enviados correctamente");
        setSendingData(false);
        fetchLabelsData({ token });
      }
    } else {
      Alert.alert("Atención", "No hay datos para enviar");
      setSendingData(false);
    }
  };

  const sendLabelsData = async ({ token }: { token: string }) => {
    if (!isConnected) {
      Alert.alert("Error", "No hay conexión a internet");
      return;
    } else if (isConnected && connectionType !== "wifi") {
      Alert.alert("Atención", "Está usando datos móviles. El envió de datos puede tardar más de lo normal", [
        {
          text: "Cancelar",
          onPress: () => null,
        },
        {
          text: "Aceptar",
          onPress: () => generateAndSendLabelData({ token }),
        },
      ]);
      return;
    } else {
      generateAndSendLabelData({ token });
    }
  };

  const refreshData = ({ token }: { token: string }) => {
    if (!isConnected) {
      Alert.alert("Error", "No hay conexión a internet");
      return;
    } else if (isConnected && connectionType !== "wifi") {
      Alert.alert(
        "Atención",
        "Está usando datos móviles. El envió de datos puede tardar más de lo normal. Los datos locales no enviados se perderán",
        [
          {
            text: "Cancelar",
            onPress: () => null,
          },
          {
            text: "Aceptar",
            onPress: () => loadData({ token }),
          },
        ]
      );
    } else {
      loadData({ token });
    }
  };

  return { loadData, isConnected, connectionType, refreshData, loadingData, sendLabelsData, sendingData };
}
