import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";

export default function useLocation() {
  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    permissions();
  }, []);

  const permissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
    }
  };

  return { coordinates };
}
