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

export default function useSync() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectionType, setConnectionType] = useState<string>("");

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

  const fetchSupplyList = async ({ token, branch_id }: { token: string; branch_id: number }) => {
    const response = await GetSupplyList({ token, branch_id });
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

  const loadData = ({ token, branch_id }: { token: string; branch_id: number }) => {
    fetchVehicleBrands({ token });
    fetchVehicleModels({ token });
    fetchSupplyList({ token, branch_id });
  };

  return { loadData, isConnected, connectionType };
}
