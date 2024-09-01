import { addEventListener } from "@react-native-community/netinfo";
import { GetSupplyList } from "@/services/supplies";
import { GetVehicleBrands, GetVehicleModels } from "@/services/vehicles";
import { CleanLocalBrands, SaveLocalBrands } from "@/sqlite/brands";
import { CleanLocalModels, SaveLocalModels } from "@/sqlite/models";
import { CleanLocalSupplies, SaveLocalSupplies } from "@/sqlite/supplies";
import { Supply } from "@/types/supply";
import { VehicleBrand, VehicleModel } from "@/types/vehicle";
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
import useSessionStore from "@/store/session";

export default function useSync() {
  const { session } = useSessionStore();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

  const fetchVehicleBrands = async ({ token }: { token: string }) => {
    const response = await GetVehicleBrands({ token });
    if (response.error) {
      return Alert.alert("Error", response.error);
    }
    await CleanLocalBrands();
    for (const brand of response.brands) {
      const brandObject: Omit<VehicleBrand, "id"> = {
        brand: brand.brand,
        brand_id: brand.id,
        logo: brand.logo,
      };
      await SaveLocalBrands({ vehicle_brand: brandObject });
    }
  };

  const fetchVehicleModels = async ({ token }: { token: string }) => {
    const response = await GetVehicleModels({ token });
    if (response.error) {
      return Alert.alert("Error", response.error);
    }
    await CleanLocalModels();
    for (const model of response.models) {
      const modelObject: Omit<VehicleModel, "id"> = {
        brand_id: model.brand_id,
        model_id: model.id,
        model: model.model,
      };
      await SaveLocalModels({ vehicle_model: modelObject });
    }
  };

  const fetchSupplyList = async ({ token }: { token: string }) => {
    const response = await GetSupplyList({ token });

    if (response.error) {
      return Alert.alert("Error", response.error);
    }
    await CleanLocalSupplies();
    for (const supply of response.supplies) {
      const supplyObject: Omit<Supply, "id"> = {
        supply_id: supply.id,
        name: supply.name,
        category: supply.category,
        price: supply.price,
        quantity: supply.quantity,
        branch: supply.branch,
        agency: supply.agency,
      };
      await SaveLocalSupplies({ supply: supplyObject });
    }
  };

  const fetchOperatorsList = async ({ token }: { token: string }) => {
    const response = await GetAllOperators({ token });

    if (response.error) {
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
  };

  const fetchBranchData = async ({ token }: { token: string }) => {
    const response = await GetBranchData({ token });

    if (response.error) {
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
  };

  const fetchLabelsData = async ({ token }: { token: string }) => {
    const response = await GetLabels({ token });
    if (response.error) {
      Alert.alert("Error", response.error);
      return;
    }
    await CleanLocalLabels();
    for (const label of response.labels) {
      const labelObject: Omit<LocalLabel, "id"> = {
        label_id: label.id,
        operator: label.operator,
        operator_id: label.user_id,
        date: label.date,
        branch_id: label.branch_id,
        label_quantity: label.label_quantity,
        wrong_labels: label.wrong_labels,
        coordinates: label.coordinates,
        // vehicle_brand: label.vehicle_brand,
        vehicle_brand_id: label.vehicle_brand_id,
        // vehicle_model: label.vehicle_model,
        vehicle_model_id: label.vehicle_model_id,
        vehicle_year: label.vehicle_year,
        show_vin: label.show_vin,
        vehicle_vin: label.vehicle_vin,
        show_plate: label.show_plate,
        vehicle_plate: label.vehicle_plate,
        show_logo: label.show_logo,
        // vehicle_logo: label.vehicle_logo,
        print_type: label.print_type,
        description: label.description,
      };
      await SaveLocalLabels({ label: labelObject });
    }
  };

  const loadData = ({ token }: { token: string }) => {
    setLoading(true);
    fetchOperatorsList({ token });
    fetchVehicleBrands({ token });
    fetchVehicleModels({ token });
    fetchSupplyList({ token });
    fetchBranchData({ token });
    fetchLabelsData({ token });
    setLoading(false);
  };

  const generateAndSendLabelData = async ({ token }: { token: string }) => {
    setLoading(true);
    const labels = await GetLocalLabels();
    if (labels.length) {
      const formattedLabels: Label[] = labels
        .filter((el) => el.label_id === 0)
        .map((label) => ({
          id: label.id,
          label_id: label.label_id,
          operator: label.operator,
          operator_id: label.operator_id,
          date: label.date,
          branch_id: label.branch_id,
          label_quantity: label.label_quantity,
          wrong_labels: label.wrong_labels,
          coordinates: label.coordinates,
          vehicle_brand: "",
          vehicle_brand_id: label.vehicle_brand_id,
          vehicle_model: "",
          vehicle_model_id: label.vehicle_model_id,
          vehicle_year: label.vehicle_year,
          show_vin: label.show_vin === 1 ? true : false,
          vehicle_vin: label.vehicle_vin,
          show_plate: label.show_plate === 1 ? true : false,
          vehicle_plate: label.vehicle_plate,
          show_logo: label.show_logo === 1 ? true : false,
          vehicle_logo: "",
          print_type: label.print_type,
          description: label.description,
        }));
      const response = await SaveLabel({ token, labels: formattedLabels });
      if (response.error) {
        Alert.alert("Error", response.error);
        setLoading(false);
      } else {
        Alert.alert("Éxito", "Datos enviados correctamente");
        setLoading(false);
      }
    }
    setLoading(false);
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

  return { loadData, isConnected, connectionType, refreshData, loading, sendLabelsData };
}
