import { useEffect, useState } from "react";
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from "expo-location";

export default function useLocation() {
  const [coordinates, setCoordinates] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    permissions();
  }, []);

  const permissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status === "granted") {
      const location = await getCurrentPositionAsync();
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  return { coordinates };
}
