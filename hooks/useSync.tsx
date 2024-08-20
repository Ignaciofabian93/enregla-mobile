import { GetSupplyList } from "@/services/supplies";
import { GetVehicleBrands, GetVehicleModels } from "@/services/vehicles";
import { CleanLocalBrands, SaveLocalBrands } from "@/sqlite/brands";
import { CleanLocalModels, SaveLocalModels } from "@/sqlite/models";
import { CleanLocalSupplies, SaveLocalSupplies } from "@/sqlite/supplies";
import { Supply } from "@/types/supply";
import { VehicleBrand, VehicleModel } from "@/types/vehicle";
import { Alert } from "react-native";

export default function useSync() {
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

  const loadData = ({ token }: { token: string }) => {
    fetchVehicleBrands({ token });
    fetchVehicleModels({ token });
    fetchSupplyList({ token });
  };

  return { loadData };
}
