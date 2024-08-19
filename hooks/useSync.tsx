import { GetSupplyList } from "@/services/supplies";
import { GetVehicleBrands, GetVehicleModels } from "@/services/vehicles";
import useSessionStore from "@/store/session";

export default function useSync() {
  const { session } = useSessionStore();

  const fetchVehicleBrands = async () => {
    const response = await GetVehicleBrands({ token: session.token });
    console.log(response);
    if (response.error) {
      return;
    }
  };

  const fetchVehicleModels = async () => {
    const response = await GetVehicleModels({ token: session.token });
    console.log(response);
    if (response.error) {
      return;
    }
  };

  const fetchSupplyList = async () => {
    const response = await GetSupplyList({ token: session.token });
    console.log(response);
    if (response.error) {
      return;
    }
  };

  return {};
}
